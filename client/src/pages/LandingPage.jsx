// src/pages/LandingPage.jsx
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}
