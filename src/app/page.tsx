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
      
      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white border-b-2 border-black">
        <div className="max-w-[1550px] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
             <div className="max-w-2xl">
                <h2 className="text-6xl font-black italic tracking-tighter uppercase mb-6">How <span className="text-brand">ImpactFlow</span> Works</h2>
                <p className="text-lg font-bold uppercase text-black/50 tracking-tight">Our end-to-end community resilience workflow, designed for immediate response and long-term recovery.</p>
             </div>
             <div className="hidden md:block h-0.5 flex-1 bg-black/10 mb-4 mx-8"></div>
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 w-32 pb-4">Protocol v2.1</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
             <div className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black group hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl mb-8 group-hover:bg-brand transition-colors">01</div>
                <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">Discovery</h3>
                <p className="font-bold text-black/60 leading-snug">Upload paper reports or live updates. Our AI harvests critical data, identifying urgent community needs automatically.</p>
             </div>
             <div className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black group hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl mb-8 group-hover:bg-brand transition-colors">02</div>
                <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">Matching</h3>
                <p className="font-bold text-black/60 leading-snug">The system connects identified needs with verified volunteers and resources based on skills, location, and priority.</p>
             </div>
             <div className="p-10 group hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl mb-8 group-hover:bg-brand transition-colors">03</div>
                <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">Impact</h3>
                <p className="font-bold text-black/60 leading-snug">Track real-time progress and success rates. Every action contributes to a transparent, data-driven map of community recovery.</p>
             </div>
          </div>
        </div>
      </section>
      
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
