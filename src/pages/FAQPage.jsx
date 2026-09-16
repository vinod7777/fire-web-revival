import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import SEO from "@/components/SEO";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Frequently Asked Questions (FAQ)"
        description="Have questions about Avishkaar Season 4? Read answers regarding eligibility, team size, food, accommodation, and evaluation."
        canonicalPath="/faq"
        keywords="Avishkaar FAQ, hackathon eligibility, team size, accommodation, registration fee"
      />
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <FAQSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default FAQPage;
