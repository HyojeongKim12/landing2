import { useRef } from 'react';
import { useApplyForm } from './hooks.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SectionMarket from './components/SectionMarket.jsx';
import SectionDifference from './components/SectionDifference.jsx';
import SectionIntro from './components/SectionIntro.jsx';
import SectionCases from './components/SectionCases.jsx';
import SectionProgram from './components/SectionProgram.jsx';
import SectionSchedule from './components/SectionSchedule.jsx';
import SectionTalk from './components/SectionTalk.jsx';
import SectionApply from './components/SectionApply.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const heroRef = useRef(null);
  const applyRef = useRef(null);
  const form = useApplyForm();

  return (
    <>
      <Header heroRef={heroRef} applyRef={applyRef} />
      <Hero ref={heroRef} />
      <SectionMarket />
      <SectionDifference />
      <SectionIntro />
      <SectionCases />
      <SectionProgram />
      <SectionSchedule onApplyRegion={form.setRegionFromCard} />
      <SectionTalk />
      <SectionApply ref={applyRef} form={form} />
      <Footer />
    </>
  );
}
