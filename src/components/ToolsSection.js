import React from 'react';
import styles from './ToolsSection.module.css';

const tools = [
  {
    number: 'Checklist',
    subtitle: 'Step-by-step Checklist',
    desc: 'Track every requirement for Canadian citizenship.',
    bg: styles.cardBlue,
    img: '/img/tool01.png',
    link: null, // Not clickable for now
    comingSoon: true,
  },
  {
    number: 'Calculator',
    subtitle: 'Step-by-step Calculator',
    desc: 'Quickly find out when you’re eligible to apply.',
    bg: styles.cardBlack,
    img: '/img/tool02.png',
    link: '/calculator',
  },
  {
    number: 'FAQ',
    subtitle: 'Post eCOPR FAQ',
    desc: 'Get answers to the most common questions.',
    bg: styles.cardYellow,
    img: '/img/tool03.png',
    link: '#faq',
  },
];

const ArrowIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="14" fill="#fff"/>
    <path d="M10.5 14H17.5" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 11.5L17.5 14L15 16.5" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ToolsSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.metrics}><span className={styles.metricsIcon}>✔️</span> Essential tools</div>
      <h2 className={styles.title}>Essential tools for your Canadian journey</h2>
      <p className={styles.subtitle}>Everything you need to track your progress, calculate your eligibility, and get answers—right at your fingertips.</p>
      <div className={styles.cards}>
        {tools.map((tool, i) => (
          tool.comingSoon ? (
            <div className={`${styles.card} ${tool.bg}`} key={i} style={{ opacity: 0.7, cursor: 'not-allowed', position: 'relative' }}>
              <div className={styles.cardContent}>
                <div className={styles.cardNumber}>{tool.number}</div>
                <div className={styles.cardSubtitle}>{tool.subtitle}</div>
                <div className={styles.cardPill}>{tool.desc}</div>
                <div style={{ marginTop: 12, fontWeight: 700, color: '#861F2B', fontSize: '1.08rem' }}>Coming soon</div>
              </div>
              <img src={tool.img} alt="" className={styles.cardImg} />
            </div>
          ) : (
            <a href={tool.link} className={`${styles.card} ${tool.bg}`} key={i}>
              <div className={styles.cardContent}>
                <div className={styles.cardNumber}>{tool.number}</div>
                <div className={styles.cardSubtitle}>{tool.subtitle}</div>
                <div className={styles.cardPill}>{tool.desc}</div>
              </div>
              <img src={tool.img} alt="" className={styles.cardImg} />
              <div className={styles.arrowBtn}><ArrowIcon /></div>
            </a>
          )
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection; 