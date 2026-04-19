import { Navbar } from "@/components/organisms/Navbar";
import { LandingHero as Hero } from "@/components/organisms/LandingHero";
import { ResourceGrid } from "@/components/organisms/ResourceGrid";
import { SmartScanner } from "@/components/organisms/SmartScanner";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-brand selection:text-white">
      <Navbar />
      <Hero />
      <section className="bg-slate-50 border-b-2 border-black py-20 px-6">
        <ResourceGrid />
      </section>
      <SmartScanner />
      
      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t-2 border-black bg-white">
        <div className="max-w-[1550px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-brand p-1 border-2 border-black">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl italic tracking-tighter uppercase">IMPACTFLOW</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-black/40">
            <a href="#" className="hover:text-black hover:underline">Accessibility</a>
            <a href="#" className="hover:text-black hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-black hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-black hover:underline">Community Guidelines</a>
          </div>
          
          <div className="text-[10px] font-bold text-black/50">
            © 2024 IMPACTFLOW. PROUDLY OPEN SOURCE.
          </div>
        </div>
      </footer>
    </main>
  );
}
