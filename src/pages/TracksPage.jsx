import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemesSection from "@/components/ThemesSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import SEO from "@/components/SEO";

const TracksPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Hackathon Tracks & Problem Statements"
        description="Discover the innovation tracks for Avishkaar Season 4: Artificial Intelligence, Web3 & Blockchain, IoT & Robotics, CleanTech, and Open Innovation."
        canonicalPath="/tracks"
        keywords="Avishkaar tracks, AI hackathon track, Web3 track, IoT robotics, problem statements"
      />
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <ThemesSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default TracksPage;
