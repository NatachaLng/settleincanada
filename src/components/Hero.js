import React from 'react';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.donors}><span className={styles.avatars}></span>1000+ active members</div>
        <h1>From new PR to Citizen — Together</h1>
        <p>Join a growing community helping each other succeed on the path to Canadian citizenship, with honest advice and shared experience.
</p>
        <div className={styles.ctas}>
          <button type="button" className={styles.primaryBtn}>Join the community <span className={styles.arrow}>&rarr;</span></button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageWrap}>
          <img src="/img/hero.jpg" alt="volunteers" className={styles.heroImg} />
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 