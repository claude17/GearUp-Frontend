// import FeaturedGear from "./_components/FeaturedGear";

// export default function HomePage() {
//     return (
//         <main>
//             <section className="flex h-[70vh] items-center justify-center border-b">
//                 <div className="space-y-6 text-center">
//                     <h1 className="text-6xl font-bold">
//                         Rent Sports & Outdoor Gear Instantly
//                     </h1>

//                     <p className="mx-auto max-w-2xl text-muted-foreground">
//                         Discover premium sports and outdoor equipment from trusted providers.
//                     </p>
//                 </div>
//             </section>

//             <FeaturedGear />
//         </main>
//     );
// }







import { getMe } from '@/service/getMe';
import { FeaturedGear } from './_components/homepage/FeaturedGear';
import { HeroSection } from './_components/homepage/HeroSection';
import { HowItWorks } from './_components/homepage/HowItWorks';
import { SiteFooter } from '@/components/shared/footer';

export default function HomePage() {
 
  return <main><HeroSection /><FeaturedGear /><HowItWorks /><SiteFooter/></main>
}
