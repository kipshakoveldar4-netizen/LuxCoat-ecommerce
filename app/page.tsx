import { Benefits } from "@/components/sections/Benefits";
import { Hero } from "@/components/sections/Hero";
import {
  ApplyStepsSection,
  BeforeAfterSection,
  CertificatesSection,
  ConfidenceSection,
  FaqSection,
  FeaturedProductSection,
  HowItWorksSection,
  ReviewsSection
} from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <BeforeAfterSection />
      <HowItWorksSection />
      <ApplyStepsSection />
      <FeaturedProductSection />
      <ConfidenceSection />
      <ReviewsSection />
      <FaqSection />
      <CertificatesSection />
    </>
  );
}
