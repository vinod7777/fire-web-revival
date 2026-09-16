import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ThemesSection from "@/components/ThemesSection";
import HackathonSection from "@/components/HackathonSection";
import GallerySection from "@/components/GallerySection";
import RealisticGLBJellyfish from "@/components/RealisticGLBJellyfish";
import SponsorsSection from "@/components/SponsorsSection";
import PartnersSection from "@/components/PartnersSection";
import FAQSection from "@/components/FAQSection";
import WelcomeSection from "@/components/WelcomeSection";
import Footer from "@/components/Footer";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import ScrollFrameAnimation from "@/components/ScrollFrameAnimation";
import LazySection from "@/components/LazySection";
import ScrollTurtle3D from "@/components/ScrollTurtle3D";
import SmoothScroll from "@/components/SmoothScroll";
import CinematicDiveIntro from "@/components/CinematicDiveIntro";
import { ParallaxSection } from "@/components/Parallax";
import SEO from "@/components/SEO";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="National Innovation Hackathon 2025 - AITAM"
        description="Avishkaar Season 4 is India's premier national innovation hackathon organized by AITAM. 48-hour challenge across AI, Web3, IoT, and Robotics with ₹1,00,000+ prize pool."
        canonicalPath="/"
      />
      <video
        src="/videos/hero-bg.mp4"
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
        className="hidden"
      />
      {!introDone && <CinematicDiveIntro onDone={() => setIntroDone(true)} />}
      
      {introDone && (
        <>
          <Navbar />
          <ScrollTurtle3D />
          <RealisticGLBJellyfish />
          <DeepOceanWrapper>
        <main className="relative z-10">
          <ScrollFrameAnimation>
            <HeroSection />
          </ScrollFrameAnimation>

          <ParallaxSection variant="zoom">
            <LazySection animation="fade-up">
              <AboutSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise" intensity={0.4}>
            <LazySection animation="fade-left" delay={0.1}>
              <ThemesSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise" intensity={0.4}>
            <LazySection animation="scale">
              <HackathonSection />
            </LazySection>
          </ParallaxSection>

          <LazySection animation="fade-up">
            <GallerySection />
          </LazySection>



          <ParallaxSection variant="rise">
            <LazySection animation="fade-up">
              <SponsorsSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise" intensity={0.7}>
            <LazySection animation="fade-up" delay={0.1}>
              <PartnersSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise" intensity={0.8}>
            <LazySection animation="scale">
              <FAQSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="zoom">
            <LazySection animation="fade-up">
              <WelcomeSection />
            </LazySection>
          </ParallaxSection>
        </main>
        <Footer />
      </DeepOceanWrapper>
        </>
      )}
    </div>
  );
};

export default Index;
