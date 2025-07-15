import React from 'react';
import styles from './ToolsSection.module.css';

const tools = [
  {
    number: 'Checklist',
    subtitle: 'Step-by-step Checklist',
    desc: 'Track every requirement for Canadian citizenship.',
    bg: styles.cardBlue,
    img: '/img/tool01.png',
    link: '#checklist',
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
    subtitle: 'Citizenship FAQ',
    desc: 'Get answers to the most common questions.',
    bg: styles.cardYellow,
    img: '/img/tool03.png',
    link: '#faq',
  },
];

const ToolsSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.metrics}><span className={styles.metricsIcon}>✔️</span> Essential tools</div>
      <h2 className={styles.title}>Essential tools for your Canadian journey</h2>
      <p className={styles.subtitle}>Everything you need to track your progress, calculate your eligibility, and get answers—right at your fingertips.</p>
      <div className={styles.cards}>
        {tools.map((tool, i) => (
          <a href={tool.link} className={`${styles.card} ${tool.bg}`} key={i}>
            <div className={styles.cardContent}>
              <div className={styles.cardNumber}>{tool.number}</div>
              <div className={styles.cardSubtitle}>{tool.subtitle}</div>
              <div className={styles.cardPill}>{tool.desc}</div>
            </div>
            <img src={tool.img} alt="" className={styles.cardImg} />
            <div className={styles.arrowBtn}>&rarr;</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection; 