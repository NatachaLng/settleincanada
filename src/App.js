import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsSection from './components/ToolsSection';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';
import CalculatorWizard from './components/CalculatorWizard';
import FAQPage from './components/FAQPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ToolsSection />
                <BenefitsSection />
                <main>
                  <section id="wizard" style={{padding: '3rem 0'}}>
                    {/* Citizenship Eligibility Wizard will go here */}
                  </section>
                  <section id="faq" style={{padding: '3rem 0'}}>
                    {/* FAQ will go here */}
                  </section>
                </main>
              </>
            }
          />
          <Route path="/calculator" element={<CalculatorWizard />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
