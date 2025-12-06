import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import MoviesSection from '@/components/MoviesSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'HillyPix - Northeast India\'s Cultural Cinema Theatre | HillyWood Movement';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience HillyPix - the premier online cultural theatre showcasing films from all eight states of Northeast India. Buy tickets for premieres, explore our cultural library, and join the HillyWood movement.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HillyPix",
      "alternateName": "HillyWood",
      "description": "Northeast India's premier cultural cinema theatre platform",
      "url": "https://hillypix.com",
      "areaServed": ["Assam", "Manipur", "Nagaland", "Meghalaya", "Tripura", "Arunachal Pradesh", "Mizoram", "Sikkim"],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <MoviesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
