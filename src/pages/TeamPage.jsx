import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import SEO from "@/components/SEO";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Organizing Team & Mentors"
        description="Meet the core organizing committee, faculty coordinators, and student leads behind Avishkaar Season 4 at AITAM."
        canonicalPath="/team"
        keywords="Avishkaar organizing team, AITAM coordinators, student leads, mentors"
      />
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <TeamSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default TeamPage;
