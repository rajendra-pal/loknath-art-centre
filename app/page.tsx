import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { About } from '@/components/sections/about';
import { Courses } from '@/components/sections/courses';
import { Gallery } from '@/components/sections/gallery';
import { FeaturedArtwork } from '@/components/sections/featured-artwork';
import { Store } from '@/components/sections/store';
import { Events } from '@/components/sections/events';
import { Testimonials } from '@/components/sections/testimonials';
import { Blog } from '@/components/sections/blog';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { CTABanner } from '@/components/sections/cta-banner';
import { OrderDeliveryNotification } from '@/components/order-delivery-notification';

export default function Home() {
  return (
    <>
      <OrderDeliveryNotification />
      <Hero />
      <Stats />
      <WhyChooseUs />
      <About />
      <Courses />
      <Gallery />
      <FeaturedArtwork />
      <Store />
      <Events />
      <Testimonials />
      <Blog />
      <CTABanner />
      <FAQ />
      <Contact />
    </>
  );
}
