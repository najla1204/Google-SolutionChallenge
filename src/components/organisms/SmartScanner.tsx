"use client";

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Upload, FileText, Scan, Loader2, CheckCircle2 } from 'lucide-react';
import { NeedService } from '@/services/needs';
import { useRouter } from 'next/navigation';

export const SmartScanner = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleSimulateScan = () => {
    setStatus('uploading');
    setFileName("emergency_report_042.pdf"); // Pre-filling name for demo
    setTimeout(() => {
      setStatus('processing');
      setTimeout(() => {
        setExtractedData({
            title: "Water Filtration Kits (40 qty)",
            location: "East Side District",
            urgency_level: "CRITICAL",
            tags: ["water", "infrastructure"]
        });
        setStatus('done');
      }, 2000);
    }, 1000);
  };

  const handlePushToFeed = async () => {
    if (!extractedData) return;
    setStatus('uploading'); 
    try {
        await NeedService.create(extractedData);
        setStatus('idle');
        setFileName(null);
        setExtractedData(null);
        router.push('/needs');
    } catch (error) {
        console.error('Failed to push data:', error);
        setStatus('done');
    }
  };

  return (
    <div className="border-2 border-black bg-white overflow-hidden flex flex-col md:flex-row h-full min-h-[500px]">
      {/* Upload/Preview Area */}
      <div className="flex-1 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-slate-50 flex flex-col justify-center items-center text-center">
        {status === 'idle' ? (
          <div className="w-full max-w-sm border-2 border-dashed border-black/20 p-12 flex flex-col items-center">
            <Upload className="w-12 h-12 text-black/20 mb-4" />
            <h3 className="font-black text-lg mb-2">UPLOAD REPORT</h3>
            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-6 leading-relaxed">
              Drop paper report scans (PDF/JPG) here <br /> for AI data extraction
            </p>
            <input 
              type="file" 
              className="hidden" 
              id="file-upload" 
              onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} 
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer px-6 py-2 bg-white border-2 border-black font-black text-xs hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
            >
              SELECT FILE
            </label>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white border-2 border-black p-4 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
             <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
                <span className="font-black text-[10px] uppercase tracking-tighter">Preview: {fileName || "report.pdf"}</span>
                <Badge variant={status === 'done' ? 'primary' : 'outline'}>{status}</Badge>
             </div>
             <div className="aspect-video bg-slate-100 border-2 border-black relative overflow-hidden flex items-center justify-center">
                {status === 'done' ? (
                   <div className="p-4 w-full h-full flex flex-col bg-slate-50 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-4">
                         <CheckCircle2 className="w-4 h-4 text-green-600" />
                         <span className="text-xs font-black uppercase tracking-widest">Extraction Successful</span>
                      </div>
                      <div className="space-y-3 text-left">
                         <div className="p-2 border border-black/10 bg-white">
                            <p className="text-[8px] font-black text-black/30 uppercase">Detected Location</p>
                            <p className="text-[10px] font-bold">{extractedData?.location}</p>
                         </div>
                         <div className="p-2 border border-black/10 bg-white">
                            <p className="text-[8px] font-black text-black/30 uppercase">Requirement</p>
                            <p className="text-[10px] font-bold text-brand italic uppercase">{extractedData?.title}</p>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="animate-pulse flex flex-col items-center">
                      <FileText className="w-12 h-12 text-black/20" />
                      <div className="mt-4 flex gap-1">
                         <div className="w-1 h-1 rounded-full bg-black/20 animate-bounce"></div>
                         <div className="w-1 h-1 rounded-full bg-black/20 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-1 h-1 rounded-full bg-black/20 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                   </div>
                )}
                
                {status === 'processing' && (
                  <div className="absolute inset-0 bg-brand/5">
                     <div className="h-0.5 w-full bg-brand absolute top-0 animate-[scan_2s_infinite]"></div>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-[350px] p-8 flex flex-col">
        <div className="mb-8">
           <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-4 underline decoration-brand decoration-4">Smart <br />Scanner</h2>
           <p className="text-[11px] font-bold text-black/60 leading-relaxed">
             Digitizing fragmented paper reports into the live database. 
             Connecting isolated communities through AI data harvesting.
           </p>
        </div>

        <div className="space-y-4 mb-auto">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center border-2 border-black font-black text-xs ${status !== 'idle' ? 'bg-black text-white' : 'bg-white'}`}>01</div>
              <span className="text-[10px] font-black uppercase tracking-widest">Upload Scan</span>
           </div>
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center border-2 border-black font-black text-xs ${status === 'processing' || status === 'done' ? 'bg-black text-white' : 'bg-white text-black/20 border-black/20'}`}>02</div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'idle' ? 'text-black/20' : ''}`}>AI Harvest</span>
           </div>
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center border-2 border-black font-black text-xs ${status === 'done' ? 'bg-black text-white' : 'bg-white text-black/20 border-black/20'}`}>03</div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${status !== 'done' ? 'text-black/20' : ''}`}>Push to DB</span>
           </div>
        </div>

        <div className="mt-12">
           {status === 'idle' ? (
              <Button 
                onClick={handleSimulateScan} 
                className="w-full gap-2 h-14" 
                disabled={!fileName}
              >
                <Scan className="w-5 h-5" /> START EXTRACTION
              </Button>
           ) : status === 'done' ? (
              <Button 
                onClick={handlePushToFeed} 
                className="w-full gap-2 h-14 bg-brand border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <CheckCircle2 className="w-5 h-5" /> SYNC TO SYSTEM
              </Button>
           ) : (
              <Button disabled className="w-full gap-2 h-14 opacity-50 cursor-not-allowed">
                <Loader2 className="w-5 h-5 animate-spin" /> HARVESTING...
              </Button>
           )
          }
           <p className="mt-4 text-[9px] font-bold text-center text-black/30 uppercase tracking-[0.2em]">
             ImpactFlow Core Engine v2.0
           </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};
