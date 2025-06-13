// ABOUTME: Image download and processing utilities for the scraper
// ABOUTME: Handles downloading, organizing, and optimizing images from Atlassian

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

async function downloadImages(images, outputDir, articleSlug) {
  const downloadedImages = [];
  
  console.log(`📸 Downloading ${images.length} images for article: ${articleSlug}`);
  
  // Create article-specific image directory
  const articleImageDir = path.join(outputDir, articleSlug);
  await fs.ensureDir(articleImageDir);
  
  for (const [index, image] of images.entries()) {
    try {
      const localPath = await downloadImage(image, articleImageDir, index);
      if (localPath) {
        downloadedImages.push({
          ...image,
          originalSrc: image.src,
          localPath: localPath,
          relativePath: path.relative('./static', localPath)
        });
      }
    } catch (error) {
      console.error(`❌ Failed to download image: ${image.src}`, error.message);
    }
  }
  
  console.log(`✅ Downloaded ${downloadedImages.length}/${images.length} images`);
  return downloadedImages;
}

async function downloadImage(image, outputDir, index) {
  try {
    // Generate filename
    const imageUrl = new URL(image.src);
    const extension = getImageExtension(imageUrl.pathname) || 'png';
    const hash = crypto.createHash('md5').update(image.src).digest('hex').substring(0, 8);
    const filename = `image-${index + 1}-${hash}.${extension}`;
    const outputPath = path.join(outputDir, filename);
    
    // Check if already downloaded
    if (await fs.pathExists(outputPath)) {
      console.log(`⏭️  Image already exists: ${filename}`);
      return outputPath;
    }
    
    // Download image
    const response = await axios({
      method: 'GET',
      url: image.src,
      responseType: 'stream',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DataLion-Scraper/1.0)'
      }
    });
    
    // Save to file
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Downloaded: ${filename}`);
        resolve(outputPath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Error downloading image:`, error.message);
    return null;
  }
}

function getImageExtension(pathname) {
  const ext = path.extname(pathname).toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];
  return validExtensions.includes(ext) ? ext.substring(1) : null;
}

async function optimizeImages(imagePaths) {
  // Placeholder for image optimization
  // In a production environment, you might use sharp or imagemin
  console.log(`🎨 Image optimization: ${imagePaths.length} images`);
  
  // For now, just return the paths unchanged
  return imagePaths;
}

async function updateImageReferences(content, imageMap) {
  let updatedContent = content;
  
  for (const [originalSrc, localPath] of Object.entries(imageMap)) {
    const relativePath = `/${path.relative('./static', localPath)}`;
    updatedContent = updatedContent.replace(
      new RegExp(escapeRegExp(originalSrc), 'g'),
      relativePath
    );
  }
  
  return updatedContent;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function cleanupOrphanedImages(imageDir, usedImages) {
  const allImages = await fs.readdir(imageDir, { recursive: true });
  const orphaned = [];
  
  for (const imagePath of allImages) {
    const fullPath = path.join(imageDir, imagePath);
    const stat = await fs.stat(fullPath);
    
    if (stat.isFile() && !usedImages.includes(fullPath)) {
      orphaned.push(fullPath);
    }
  }
  
  if (orphaned.length > 0) {
    console.log(`🧹 Found ${orphaned.length} orphaned images`);
    // Could delete them here if needed
  }
  
  return orphaned;
}

module.exports = {
  downloadImages,
  downloadImage,
  optimizeImages,
  updateImageReferences,
  cleanupOrphanedImages
};