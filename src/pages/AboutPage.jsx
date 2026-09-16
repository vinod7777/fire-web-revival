import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="About Us - National Innovation Hackathon"
        description="Learn about Avishkaar Season 4 organized by AITAM, celebrating creativity, innovation, and technological leadership with ₹1,00,000+ prize pool."
        canonicalPath="/about"
        keywords="About Avishkaar, AITAM hackathon history, student innovation, tech fest"
      />
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <AboutSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default AboutPage;
