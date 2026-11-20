import React from 'react';
import { BRANDING_CONFIG } from '../config/branding';
import { BookOpen, GraduationCap, ShieldCheck, HeartHandshake, Layers } from 'lucide-react';

export const AboutProjectSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 bg-[#FAF5EC] border-b border-[#E7D5BC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#777A50] mb-2 font-mono">
            RESEARCH CONVENTION PRESENTATION
          </div>
          <h2 className="font-heritage text-2xl sm:text-3xl lg:text-4xl font-bold text-[#35251D] tracking-tight text-balance">
            About Our Research Initiative
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#35251D]/85 leading-relaxed">
            Preserving Maharashtra’s civil and military fort legacy by uniting 17th-century historical records with modern artificial intelligence, conversational Marathi interfaces, and sustainable community tourism frameworks.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#E7D5BC]/60 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-[#C65D24]" />
            </div>
            <h3 className="font-heritage text-lg font-bold text-[#35251D] mb-2">
              1. Cultural Heritage Digitization
            </h3>
            <p className="text-xs text-[#35251D]/80 leading-relaxed">
              Maharashtra boasts over 350 hill, sea, and forest fortresses. Our project digitizes architectural layouts, rainwater harvesting cisterns, strategic bastion alignments, and epigraphic inscriptions to make them accessible to youth and researchers worldwide.
            </p>
          </div>

          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#E7D5BC]/60 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5 text-[#C65D24]" />
            </div>
            <h3 className="font-heritage text-lg font-bold text-[#35251D] mb-2">
              2. Vernacular Marathi AI Corpus
            </h3>
            <p className="text-xs text-[#35251D]/80 leading-relaxed">
              Standard commercial LLMs often fail when interpreting historical Marathi vocabulary, Modi script terminology, or local architectural terms like <em>Machi, Buruj, Chor Darwaja, and Devtaki</em>. We develop an authentic bilingual knowledge layer.
            </p>
          </div>

          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#E7D5BC]/60 flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5 text-[#C65D24]" />
            </div>
            <h3 className="font-heritage text-lg font-bold text-[#35251D] mb-2">
              3. Sustainable Community Tourism
            </h3>
            <p className="text-xs text-[#35251D]/80 leading-relaxed">
              By directly connecting mountain hikers with certified local Mavala guides and authentic village homestays, this system channels economic benefits directly to foothill villages while enforcing leave-no-trace conservation standards.
            </p>
          </div>

        </div>

        {/* Academic Presentation Card */}
        <div className="rounded-xl border border-[#E7D5BC] bg-[#E7D5BC]/30 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#777A50] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#C65D24]" />
                <span>MAHARASHTRA HERITAGE & CULTURE INITIATIVE</span>
              </div>
              <h4 className="font-heritage text-lg font-bold text-[#35251D]">
                Interdisciplinary Category: Humanities, Cultural Heritage & Computer Science
              </h4>
              <p className="text-xs text-[#35251D]/80 mt-2 leading-relaxed">
                {BRANDING_CONFIG.academicInfo.researchAbstract}
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-lg bg-[#FAF5EC] border border-[#E7D5BC] text-xs text-[#35251D] w-full md:w-auto">
              <div className="flex items-center gap-2 text-[#777A50] font-mono text-[11px] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#C65D24]" />
                <span>MODULAR ARCHITECTURE</span>
              </div>
              <div className="font-semibold text-sm">
                Centralized Branding Layer
              </div>
              <div className="text-[11px] text-[#35251D]/70 mt-1 max-w-[220px]">
                Configured in a single source file to facilitate institutional branding and partner integration.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
