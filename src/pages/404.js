// ABOUTME: Custom 404 error page for DataLion help center
// ABOUTME: Provides helpful navigation options when pages are not found

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you are looking for could not be found.">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className="text--center">
              <h1 className="hero__title" style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
              <p className="hero__subtitle" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Page Not Found
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                We couldn't find the page you're looking for. It might have been moved or no longer exists.
              </p>
              
              <div className="margin-bottom--lg">
                <h3>Here are some helpful links:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link to="/docs">📚 Documentation Home</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link to="/docs/getting-started">🚀 Getting Started Guide</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link to="/docs/user-guide">📖 User Guide</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link to="/docs/troubleshooting">🔧 Troubleshooting</Link>
                  </li>
                </ul>
              </div>
              
              <div className="margin-top--lg">
                <Link
                  className="button button--primary button--lg"
                  to="/docs">
                  Go to Documentation
                </Link>
              </div>
              
              <div className="margin-top--md">
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  If you believe this is an error, please contact{' '}
                  <a href="mailto:support@datalion.com">support@datalion.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}