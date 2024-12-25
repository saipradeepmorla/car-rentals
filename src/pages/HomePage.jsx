import AboutUs from "../components/AboutUs";
import CarCategorySection from "../components/CarCategorySection";
import CarFilterSection from "../components/CarFilterSection";
import ContactSection from "../components/ContactSection";
import FAQSection from "../components/FAQSection";
import Form from "../components/Form";

import HeroSection from "../components/HeroSection";
import ReviewForm from "../components/ReviewForm";
import ServicesSection from "../components/ServiceSection";
import Testimonials from "../components/Testimonials";
import Adds from "../Adds/adds";
import ContactLocations from "../components/ContactLocations";
import FloatingButtons from "../components/FloatingButtons";

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <Form />
      <AboutUs />
      <CarFilterSection />
      <CarCategorySection />
      <ServicesSection />
      <ReviewForm />
      <Testimonials />
      {/* <ContactSection /> */}
      <ContactLocations />
      <FAQSection />
     <FloatingButtons/>
      <Adds />
    </>
  );
};

export default HomePage;
