import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonSection from "@/components/HackathonSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import SEO from "@/components/SEO";

const HackathonPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Hackathon Details, Schedule & Prizes"
        description="Explore Avishkaar Season 4 hackathon structure, timeline, evaluation criteria, and prize pools. Join the 48-hour ocean innovation challenge."
        canonicalPath="/hackathon"
        keywords="Avishkaar hackathon schedule, prizes, rules, 48 hour hackathon, AITAM"
      />
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <HackathonSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default HackathonPage;
