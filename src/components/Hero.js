import React from 'react';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.donors}><span className={styles.avatars}></span>1000+ active members</div>
        <h1>From Newcomers to Citizens — Together</h1>
        <p>Join a growing community helping each other succeed on the path to Canadian citizenship, with honest advice and shared experience.
</p>
        <div className={styles.ctas}>
          <a href="#" className={styles.primaryBtn}>Join the community <span className={styles.arrow}>&rarr;</span></a>
          <a href="#" className={styles.secondaryBtn}>Learn More</a>
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