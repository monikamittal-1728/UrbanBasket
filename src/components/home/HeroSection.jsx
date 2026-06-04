import React from "react";

// HeroSection component: displays a promotional hero banner
// with a headline, description, and featured image.
const HeroSection = () => {
  return (
    <section className="px-8 md:px-16 py-12 md:py-12 overflow-hidden">
      <div className="mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Text Content Area */}
        <div className="flex-1 text-center md:text-left">
          {/* Promotional Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-primary font-semibold text-sm">
            BIG SAVINGS UP TO 60% OFF
          </span>

          {/* Main Heading */}
          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-secondary">
            Everything you need,
            <br />
            <span className="text-primary">All in one place.</span>
          </h2>

          {/* Supporting Description */}
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            From electronics to fashion, grocery to lifestyle — discover
            thousands of products at unbeatable prices.
          </p>
        </div>
        
        {/* Image Area */}
        <div className="flex-1 flex justify-center relative">
          {/* Decorative Background Glow */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-orange-100 rounded-full blur-3xl opacity-60" />

          {/* Hero Image */}
          <img
            src="/hero-image.png"
            alt="Featured Products"
            className="relative z-10 w-full max-w-md md:max-w-xl object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
