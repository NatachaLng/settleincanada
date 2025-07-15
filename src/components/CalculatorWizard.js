import React, { useState } from 'react';
import styles from './CalculatorWizard.module.css';

const steps = [
  'Your Status',
  'Out of the Country',
  'Results',
];

const today = new Date().toISOString().split('T')[0];

const CalculatorWizard = () => {
  const [step, setStep] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(today);
  const [prDate, setPrDate] = useState(today);
  const [showArrivalTip, setShowArrivalTip] = useState(false);
  const [showPrTip, setShowPrTip] = useState(false);
  const [daysOutsideTemp, setDaysOutsideTemp] = useState('');
  const [daysOutsidePr, setDaysOutsidePr] = useState('');

  // --- Calculation logic for temp resident period ---
  function calculateTempResidentDays() {
    const start = new Date(arrivalDate);
    const end = new Date(prDate);
    if (isNaN(start) || isNaN(end) || end < start) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((end - start) / msPerDay) + 1;
    const outside = parseInt(daysOutsideTemp, 10) || 0;
    let eligibleDays = totalDays - outside;
    eligibleDays = Math.floor(eligibleDays / 2);
    return Math.max(0, Math.min(eligibleDays, 365));
  }

  // --- Calculation logic for PR period ---
  function calculatePrResidentDays() {
    const prStart = new Date(prDate);
    const now = new Date();
    if (isNaN(prStart) || prStart > now) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((now - prStart) / msPerDay) + 1;
    const outside = parseInt(daysOutsidePr, 10) || 0;
    let eligibleDays = totalDays - outside;
    return Math.max(0, eligibleDays);
  }

  // --- Total eligible days ---
  function calculateTotalEligibleDays() {
    return calculateTempResidentDays() + calculatePrResidentDays();
  }

  // --- Calculate the date when 1095 days will be reached ---
  function calculateEligibilityDate() {
    const tempDays = calculateTempResidentDays();
    const prStart = new Date(prDate);
    const outside = parseInt(daysOutsidePr, 10) || 0;
    const needed = 1095 - tempDays;
    if (needed <= 0) return prStart; // Already eligible on PR date
    // The user needs 'needed' eligible PR days (excluding days outside)
    // So, eligibility date = prStart + (needed + daysOutsidePr - 1) days
    // (since days outside don't count, they extend the period)
    const eligibilityDate = new Date(prStart.getTime() + (needed + outside - 1) * 24 * 60 * 60 * 1000);
    return eligibilityDate;
  }

  // --- Format date for display ---
  function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) return '';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <>
      <div style={{
        maxWidth: 540,
        margin: '4rem auto 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#f7f8fa',
          color: '#222',
          fontSize: '1.05rem',
          fontWeight: 600,
          borderRadius: '2rem',
          padding: '0.4rem 1.2rem',
          marginBottom: '1.2rem',
          textAlign: 'center',
          letterSpacing: '0.2px',
        }}>
          Citizenship Day Calculator
        </div>
        <h1 style={{
          fontFamily: 'Urbanist, Arial, Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: '2.3rem',
          color: '#181818',
          marginBottom: '2.2rem',
          textAlign: 'center',
          letterSpacing: '-1px'
        }}>
          Find Out When You Can Apply for Canadian Citizenship
        </h1>
      </div>
      <div className={styles.wizardWrap}>
        <div className={styles.stepsNav}>
          {steps.map((label, i) => {
            const isCompleted = i < step;
            const isActive = step === i;
            return (
              <div
                key={i}
                className={
                  isActive
                    ? styles.activeStep
                    : isCompleted
                    ? styles.completedStep
                    : styles.step
                }
                onClick={() => {
                  if (i <= step) setStep(i);
                }}
                style={{ cursor: i <= step ? 'pointer' : 'default' }}
              >
                <span className={styles.stepNum}>
                  {isCompleted ? '✓' : i + 1}
                </span>
                <span className={styles.stepLabel}>{label}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.stepContent}>
          {step === 0 && (
            <>
              <label className={styles.fieldLabel}>
                Date you arrived in Canada as a temporary resident
                <span
                  className={styles.tooltipIcon}
                  onMouseEnter={() => setShowArrivalTip(true)}
                  onMouseLeave={() => setShowArrivalTip(false)}
                >&#9432;
                  {showArrivalTip && (
                    <span className={styles.tooltip}>
                      This should be the date you first arrived in Canada as a student or work permit holder. Visitor status does not count.
                    </span>
                  )}
                </span>
              </label>
              <input
                type="date"
                className={styles.dateInput}
                value={arrivalDate}
                onChange={e => setArrivalDate(e.target.value)}
                max={today}
              />
              <label className={styles.fieldLabel} style={{marginTop: '2rem'}}>
                Date you became a Permanent Resident (PR)
                <span
                  className={styles.tooltipIcon}
                  onMouseEnter={() => setShowPrTip(true)}
                  onMouseLeave={() => setShowPrTip(false)}
                >&#9432;
                  {showPrTip && (
                    <span className={styles.tooltip}>
                      This is the date on your eCOPR (electronic Confirmation of Permanent Residence).
                    </span>
                  )}
                </span>
              </label>
              <input
                type="date"
                className={styles.dateInput}
                value={prDate}
                onChange={e => setPrDate(e.target.value)}
                max={today}
              />
            </>
          )}
          {step === 1 && (
            <>
              <label className={styles.fieldLabel}>
                Days spent outside Canada as a temporary resident
              </label>
              <input
                type="number"
                min="0"
                className={styles.dateInput}
                value={daysOutsideTemp}
                onChange={e => setDaysOutsideTemp(e.target.value)}
                placeholder="0"
              />
              <label className={styles.fieldLabel} style={{marginTop: '2rem'}}>
                Days spent (or intended to spend) outside Canada as a permanent resident
              </label>
              <input
                type="number"
                min="0"
                className={styles.dateInput}
                value={daysOutsidePr}
                onChange={e => setDaysOutsidePr(e.target.value)}
                placeholder="0"
              />
            </>
          )}
          {step === 2 && (
            <>
              {calculateTotalEligibleDays() >= 1095 ? (
                <div style={{
                  marginBottom: '2.2rem',
                  textAlign: 'center',
                  background: '#e6f9e8',
                  borderRadius: '1.5rem',
                  padding: '2rem 1rem',
                  boxShadow: '0 2px 12px rgba(0,180,80,0.07)'
                }}>
                  <div style={{fontSize: '2.2rem', fontWeight: 900, color: '#1a7f3c', marginBottom: '0.7rem'}}>
                    🎉 Congratulations!
                  </div>
                  <div style={{fontSize: '1.35rem', fontWeight: 700, color: '#181818', marginBottom: '0.7rem'}}>
                    You are eligible to apply to Citizenship
                  </div>
                  <div style={{color: '#888', fontSize: '1.08rem', marginBottom: '2.2rem'}}>
                    You have already reached 1,095 eligible days.
                  </div>
                </div>
              ) : (
                <div style={{marginBottom: '2.2rem', textAlign: 'center'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 900, color: '#181818', marginBottom: '0.7rem'}}>
                    You will be eligible on {formatDate(calculateEligibilityDate())}
                  </div>
                  <div style={{color: '#888', fontSize: '1.08rem', marginBottom: '2.2rem'}}>
                    This is the earliest date you will reach 1,095 eligible days, based on your entries below.
                  </div>
                </div>
              )}
              <div style={{fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.2rem', textAlign: 'left'}}>Results</div>
              <div style={{marginBottom: '1.5rem'}}>
                <strong>Temporary Resident Days (for eligibility):</strong>
                <div style={{fontSize: '1.3rem', marginTop: '0.7rem', fontWeight: 700}}>
                  {calculateTempResidentDays()} days
                </div>
                <div style={{color: '#888', fontSize: '1rem', marginTop: '0.5rem'}}>
                  This is the number of days that will count towards your citizenship eligibility from your time as a temporary resident (max 365).
                </div>
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <strong>Permanent Resident Days (for eligibility):</strong>
                <div style={{fontSize: '1.3rem', marginTop: '0.7rem', fontWeight: 700}}>
                  {calculatePrResidentDays()} days
                </div>
                <div style={{color: '#888', fontSize: '1rem', marginTop: '0.5rem'}}>
                  This is the number of days that will count towards your citizenship eligibility from your time as a permanent resident (every day counts, minus days outside Canada).
                </div>
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <strong>Total Eligible Days:</strong>
                <div style={{fontSize: '1.3rem', marginTop: '0.7rem', fontWeight: 700}}>
                  {calculateTotalEligibleDays()} days
                </div>
                <div style={{color: '#888', fontSize: '1rem', marginTop: '0.5rem'}}>
                  You need 1,095 eligible days to apply for Canadian citizenship.
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            className={styles.btn}
            onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CalculatorWizard; 