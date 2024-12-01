import React from 'react';
import { CssBaseline } from '@mui/material';

import FeaturedWorkouts from '../components/FeaturedWorkouts';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function Home() {

    return (
    <div>
      <CssBaseline />
      <HeroSection />
      <FeaturedWorkouts />
      <Footer />
    </div>
  );
}