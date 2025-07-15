import React from 'react';
import styles from './BenefitsSection.module.css';

const stats = [
  {
    icon: '👥',
    label: 'Active Members',
    value: '1,000+',
  },
  {
    icon: '💬',
    label: 'Questions Answered',
    value: '5,000+',
  },
];

const BenefitsSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.pill}>Why Join?</div>
        <h2 className={styles.title}>Unlock Your Path to Canadian Citizenship</h2>
        <p className={styles.desc}>
          Get personalized guidance, connect with others on the same journey, and access exclusive tools to make your settlement in Canada easier.
        </p>
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <div className={styles.statCard} key={i}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>
        <button type="button" className={styles.ctaBtn}>Join the Community</button>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrap}>
          <img src="/img/benefit.jpg" alt="Canadian newcomer community" className={styles.heroImg} />
          <div className={styles.floatingCard}>
            <span className={styles.floatingTitle}>Real people, real support</span>
            <span className={styles.floatingDesc}>Get answers and encouragement from those who’ve been there.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BenefitsSection; 