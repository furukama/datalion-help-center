// ABOUTME: Homepage features component showcasing main documentation sections
// ABOUTME: Provides quick access to key areas of the help center

import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Getting Started',
    description: (
      <>
        New to DataLion? Start here to learn the basics and get up and running
        quickly with our comprehensive onboarding guides.
      </>
    ),
    link: '/docs/intro',
  },
  {
    title: 'User Guide',
    description: (
      <>
        Explore detailed documentation on all DataLion features, from dashboards
        to advanced analytics and reporting capabilities.
      </>
    ),
    link: '/docs/user-guide/overview',
  },
  {
    title: 'Administration',
    description: (
      <>
        Learn how to manage users, configure settings, and maintain your
        DataLion instance for optimal performance.
      </>
    ),
    link: '/docs/admin/overview',
  },
  {
    title: 'API & Integrations',
    description: (
      <>
        Connect DataLion with your existing tools and build custom integrations
        using our comprehensive API documentation.
      </>
    ),
    link: '/docs/integrations/overview',
  },
  {
    title: 'Troubleshooting',
    description: (
      <>
        Find solutions to common issues, error code references, and frequently
        asked questions from our support team.
      </>
    ),
    link: '/docs/troubleshooting/common-issues',
  },
  {
    title: 'What\'s New',
    description: (
      <>
        Stay updated with the latest features, improvements, and changes in
        DataLion with our release notes and updates.
      </>
    ),
    link: '/docs/updates',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.feature}>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className={styles.featureLink}>
          Learn more →
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}