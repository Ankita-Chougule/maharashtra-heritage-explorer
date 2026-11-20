import React, { useState } from 'react';
import { FortItem } from '../../data/fortsData';
import { getUserProfile } from '../../data/userProfile';
import { 
  GraduationCap, 
  BookOpen, 
  Send, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Download, 
  ExternalLink,
  Plus,
  Compass
} from 'lucide-react';

interface ResearcherDashboardProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  onSignOut: () => void;
  onNavigateHome?: () => void;
}

interface ResearchPaper {
  id: string;
  fortName: string;
  title: string;
  date: string;
  status: 'Published in Catalog' | 'Under Peer Review' | 'Revision Requested';
  abstract: string;
  sourceReferences: string;
  reviewerFeedback?: string;
}

const HISTORICAL_ARCHIVES = [
  {
    id: "arc-01",
    title: "Sabhasad Bakhar (सभासद बखर) - 1697 Annotated Digitization",
    author: "Krishnaji Anant Sabhasad",
    language: "Marathi (Historical Devanagari)",
    type: "Primary Chronicle",
    description: "The earliest authoritative biographical chronicle composed at Jinji recounting the military conquests and administrative policies of Chhatrapati Shivaji Maharaj.",
    fileFormat: "PDF Transliteration · 14.2 MB",
  },
  {
    id: "arc-02",
    title: "Ajnyapatra (आज्ञापत्र) - Royal Decree on Fort Architecture",
    author: "Ramchandra Pant Amatya (1715)",
    language: "Marathi (Bilingual Notes)",
    type: "Governance Treatise",
    description: "Fundamental royal mandate containing the renowned chapters on fort construction, water harvesting (Devtaki), bastion repair, and siege defense.",
    fileFormat: "PDF Research Edition · 8.6 MB",
  },
  {
    id: "arc-03",
    title: "Modi Script Primer & Fort Land Grant Epigraphy (मोडी लिपी परिचय)",
    author: "Sahyadri Epigraphy & Inscriptions Corpus",
    language: "Modi & Modern Marathi",
    type: "Palaeography Guide",
    description: "Key reference tables for deciphering 17th-century Marathi cursive Modi script found on copper plates, farmans, and stone inscriptions of Raigad.",
    fileFormat: "High-Res Plate Scans · 22.4 MB",
  }
];

export const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({ forts, onSelectFort, onSignOut, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'new-submission' | 'archives'>('submissions');
  const researcherProfile = getUserProfile();
  
  // Research submissions state
  const [papers, setPapers] = useState<ResearchPaper[]>([
    {
      id: "RP-2026-08",
      fortName: "Shivneri Fort",
      title: "Basalt Hydraulic Engineering: The Seven Step Cistern Network of Junnar",
      date: "22 Oct 2026",
      status: "Published in Catalog",
      abstract: "Geological analysis of volcanic basalt rock porosity and gravity-fed stone aquifers that supplied water to Shivneri's upper citadel during seasonal droughts.",
      sourceReferences: "Sabhasad Bakhar; Geological Survey of Maharashtra Bulletin 1984.",
      reviewerFeedback: "Approved by Editorial Committee. Incorporated into Shivneri digital catalog."
    },
    {
      id: "RP-2026-14",
      fortName: "Pratapgad Fort",
      title: "Tactical Blind Turns of the Gomukhi Entrance Bastion at Pratapgad",
      date: "25 Oct 2026",
      status: "Under Peer Review",
      abstract: "Computer-aided architectural reconstruction of arrow-slit fields of fire and acoustic reverberation along the outer ramparts.",
      sourceReferences: "Chhatrapati Shivaji Maharaj Bakhar & Field Topography Survey.",
      reviewerFeedback: "Under evaluation by archaeological reviewer."
    }
  ]);

  // New submission form fields
  const [selectedFortId, setSelectedFortId] = useState(forts[0]?.name || "Raigad Fort");
  const [paperTitle, setPaperTitle] = useState("");
  const [paperAbstract, setPaperAbstract] = useState("");
  const [primarySources, setPrimarySources] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim() || !paperAbstract.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry: ResearchPaper = {
        id: `RP-2026-${Math.floor(10 + Math.random() * 90)}`,
        fortName: selectedFortId,
        title: paperTitle,
        date: "Today",
        status: "Under Peer Review",
        abstract: paperAbstract,
        sourceReferences: primarySources || "Oral and archival primary documentation.",
        reviewerFeedback: "Submission received. Sent to academic peer-review committee."
      };

      setPapers([newEntry, ...papers]);
      setPaperTitle("");
      setPaperAbstract("");
      setPrimarySources("");
      setIsSubmitting(false);
      setActiveTab('submissions');
      setSuccessNote("Your research submission was uploaded successfully and is now under peer review!");
      setTimeout(() => setSuccessNote(null), 4000);
    }, 600);
  };

  return (
    <div className="py-10 bg-[#FAF5EC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E7D5BC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#C65D24] mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>STUDENT RESEARCHER PORTAL</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#777A50]">HISTORICAL INFORMATICS & EPIGRAPHY</span>
            </div>
            <h1 className="font-heritage text-2xl sm:text-3xl font-bold text-[#35251D]">
              Researcher Workspace & Archival Repository
            </h1>
            <p className="text-xs text-[#35251D]/75 mt-1">
              Submit peer-reviewed fort documentation, analyze Modi-script historical materials, and enrich the vernacular Marathi knowledge base.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-md bg-[#E7D5BC]/60 border border-[#E7D5BC] text-[#35251D] font-medium">
              {researcherProfile?.name ? researcherProfile.name : 'Scholar ID: RS-2026-4401'}
              {researcherProfile?.licenseOrInstitute ? ` · ${researcherProfile.licenseOrInstitute}` : ''}
            </span>
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#C65D24]" />
                <span>Browse Public Site</span>
              </button>
            )}
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-[#E7D5BC] hover:bg-[#E7D5BC]/50 text-xs font-semibold text-[#35251D] transition-colors cursor-pointer"
            >
              Sign Out to Guest
            </button>
          </div>
        </div>

        {/* Global Success Notification */}
        {successNote && (
          <div className="mb-6 p-3 rounded-lg bg-[#E7D5BC]/80 border border-[#C65D24]/40 flex items-center gap-2 text-xs text-[#35251D]">
            <CheckCircle2 className="w-4 h-4 text-[#C65D24] shrink-0" />
            <span>{successNote}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E7D5BC] pb-3">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Research Contributions ({papers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new-submission')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'new-submission'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit New Research Contribution</span>
          </button>

          <button
            onClick={() => setActiveTab('archives')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'archives'
                ? 'bg-[#C65D24] text-white shadow-xs'
                : 'bg-[#FAF5EC] text-[#35251D] border border-[#E7D5BC] hover:bg-[#E7D5BC]/30'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digitized Modi Script & Historical Archives</span>
          </button>
        </div>

        {/* 1. MY SUBMISSIONS TRACKER */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">TOTAL CONTRIBUTIONS</span>
                <div className="font-heritage text-2xl font-bold text-[#35251D] mt-1 tabular-nums">
                  {papers.length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">PUBLISHED IN CATALOG</span>
                <div className="font-heritage text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
                  {papers.filter(p => p.status === 'Published in Catalog').length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF5EC] border border-[#E7D5BC]">
                <span className="text-[11px] text-[#777A50] font-mono">PEER REVIEW PENDING</span>
                <div className="font-heritage text-2xl font-bold text-[#C65D24] mt-1 tabular-nums">
                  {papers.filter(p => p.status === 'Under Peer Review').length}
                </div>
              </div>
            </div>

            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D] mb-4">
                Research Submissions & Peer-Review Status
              </h3>

              <div className="space-y-4">
                {papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7D5BC]/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#C65D24]">{paper.id}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#35251D]">{paper.fortName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#777A50]">{paper.date}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold self-start sm:self-auto ${
                        paper.status === 'Published in Catalog'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#E7D5BC] text-[#C65D24]'
                      }`}>
                        {paper.status}
                      </span>
                    </div>

                    <h4 className="font-heritage text-base font-bold text-[#35251D]">
                      {paper.title}
                    </h4>

                    <p className="text-xs text-[#35251D]/80 leading-relaxed bg-[#E7D5BC]/20 p-3 rounded-lg border border-[#E7D5BC]/60">
                      "{paper.abstract}"
                    </p>

                    <div className="text-[11px] text-[#777A50]">
                      <strong>Historical References:</strong> {paper.sourceReferences}
                    </div>

                    {paper.reviewerFeedback && (
                      <div className="p-2.5 rounded-lg bg-[#E7D5BC]/40 border border-[#E7D5BC] text-[11px] text-[#35251D] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D24] shrink-0" />
                        <span><strong>Reviewer Feedback:</strong> {paper.reviewerFeedback}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. SUBMIT NEW RESEARCH CONTRIBUTION FORM */}
        {activeTab === 'new-submission' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6 sm:p-8 max-w-3xl">
            <div className="mb-6">
              <h3 className="font-heritage text-xl font-bold text-[#35251D]">
                Submit Historical & Epigraphic Research
              </h3>
              <p className="text-xs text-[#777A50] mt-1">
                Contribute architectural measurements, newly analyzed Modi documents, or archaeological findings to be peer-reviewed by the historical editorial team.
              </p>
            </div>

            <form onSubmit={handleSubmitPaper} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Target Historical Fort:
                </label>
                <select
                  value={selectedFortId}
                  onChange={(e) => setSelectedFortId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] focus:outline-none focus:border-[#C65D24]"
                >
                  {forts.map(f => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.district})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Paper or Research Contribution Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inscription Translation of Kalyan Darwaja Bastion Inscriptions"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] placeholder:text-[#35251D]/40 focus:outline-none focus:border-[#C65D24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Abstract & Historical Findings (Marathi or English):
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summarize your methodology, epigraphic readings, architectural observations, and historical context..."
                  value={paperAbstract}
                  onChange={(e) => setPaperAbstract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] placeholder:text-[#35251D]/40 focus:outline-none focus:border-[#C65D24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#35251D] mb-1 font-mono uppercase">
                  Primary Sources, Bakhars, or Archival Catalog Numbers:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sabhasad Bakhar p. 45; Pune Archives Rumal #124; Modi manuscript plate 3"
                  value={primarySources}
                  onChange={(e) => setPrimarySources(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E7D5BC] bg-[#FAF5EC] text-xs text-[#35251D] placeholder:text-[#35251D]/40 focus:outline-none focus:border-[#C65D24]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#E7D5BC]/30 border border-[#E7D5BC] text-[11px] text-[#35251D]/80">
                <strong>Academic Notice:</strong> All submissions are preserved in the research archive and credited under your scholar ID in the public digital catalogue.
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('submissions')}
                  className="px-4 py-2 rounded-lg border border-[#E7D5BC] text-xs font-medium text-[#35251D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Submitting Paper..." : "Submit for Peer Review"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. DIGITIZED MODI SCRIPT & ARCHIVAL REPOSITORY */}
        {activeTab === 'archives' && (
          <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="font-heritage text-lg font-bold text-[#35251D]">
                Digitized Historical Resources & Modi Script Materials
              </h3>
              <p className="text-xs text-[#777A50]">
                Access high-resolution primary chronicles, Modi manuscripts, and 17th-century fortification treatises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HISTORICAL_ARCHIVES.map((arc) => (
                <div
                  key={arc.id}
                  className="p-5 rounded-xl border border-[#E7D5BC] bg-[#FAF5EC] text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[#777A50] font-mono text-[10px] uppercase mb-2">
                      <span>{arc.type}</span>
                      <span>{arc.language}</span>
                    </div>

                    <h4 className="font-heritage text-base font-bold text-[#35251D] mb-1">
                      {arc.title}
                    </h4>

                    <p className="text-[11px] text-[#777A50] mb-3 font-medium">
                      Chronicler: {arc.author}
                    </p>

                    <p className="text-xs text-[#35251D]/80 leading-relaxed mb-4">
                      {arc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7D5BC] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#777A50]">{arc.fileFormat}</span>
                    <button
                      onClick={() => {
                        setSuccessNote(`Simulating archival download: ${arc.title}`);
                        setTimeout(() => setSuccessNote(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded bg-[#E7D5BC]/60 hover:bg-[#C65D24] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Access File</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
