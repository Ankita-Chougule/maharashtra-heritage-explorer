import React, { useState, useMemo } from 'react';
import { FortItem } from '../data/fortsData';
import { HERITAGE_CATEGORIES, HERITAGE_ARTIFACTS, HeritageArtifactItem } from '../data/heritageData';
import { SourcesListSection } from '../components/SourcesListSection';
import { Search, MapPin, Mountain, Clock, Filter, X, ArrowUpDown, Landmark, BookOpen, Sparkles, Calendar, Utensils, Music, Languages, FileText, Feather, Scissors, Compass, CheckCircle2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface ExploreFortsPageProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  initialCategory?: string;
  onAskAIAboutTopic?: (topic: string) => void;
}

export const ExploreFortsPage: React.FC<ExploreFortsPageProps> = ({ 
  forts, 
  onSelectFort,
  initialCategory = 'all',
  onAskAIAboutTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'name'>('default');
  const [selectedArtifact, setSelectedArtifact] = useState<HeritageArtifactItem | null>(null);

  const districts = useMemo(() => {
    const list = Array.from(new Set(forts.map((f) => f.district.split(' ')[0]))).sort();
    return ['All', ...list];
  }, [forts]);

  // Filter Forts
  const filteredForts = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'forts') return [];
    return forts
      .filter((fort) => {
        const matchesSearch =
          fort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fort.marathiName.includes(searchQuery) ||
          fort.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fort.historicalSignificance.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty =
          selectedDifficulty === 'All' || fort.difficulty === selectedDifficulty;

        const matchesDistrict =
          selectedDistrict === 'All' || fort.district.includes(selectedDistrict);

        return matchesSearch && matchesDifficulty && matchesDistrict;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [forts, searchQuery, selectedDifficulty, selectedDistrict, sortBy, activeCategory]);

  // Filter Heritage Artifacts (Categories 2 to 10)
  const filteredArtifacts = useMemo(() => {
    if (activeCategory === 'forts') return [];
    return HERITAGE_ARTIFACTS.filter((art) => {
      const matchesCat = activeCategory === 'all' || art.categoryId === activeCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.marathiTitle.includes(searchQuery) ||
        art.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.significance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.marathiSignificance.includes(searchQuery);

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setSelectedDistrict('All');
    setActiveCategory('all');
    setSortBy('default');
  };

  const getCategoryTitle = (catId: string) => {
    const found = HERITAGE_CATEGORIES.find(c => c.id === catId);
    return found ? found.title : catId;
  };

  const { language, t } = useThemeLanguage();

  return (
    <div className="py-12 bg-[#FAF5EC] dark:bg-[#12100E] min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2 font-mono">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#777A50] dark:text-[#A3A67D]">
              {language === 'mr' ? 'महाराष्ट्र शासन राजपत्रक व पुरातत्त्व दस्तऐवजीकरण' : 'MAHARASHTRA HERITAGE & FORT REPOSITORY'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'mr' ? 'ASI व गॅझेटिअर प्रमाणित' : 'Archival Verified'}</span>
            </span>
          </div>
          <h1 className="font-heritage text-3xl sm:text-5xl font-bold text-[#35251D] dark:text-[#F5EAE0] tracking-tight">
            {language === 'mr' ? 'ऐतिहासिक गडकोट, वारसा व संस्कृती' : 'Explore Culture, Forts & History'}
          </h1>
          <p className="mt-3 text-base text-[#35251D]/80 dark:text-[#F5EAE0]/80 leading-relaxed font-devanagari">
            {language === 'mr'
              ? 'महाराष्ट्र शासनाच्या राजपत्रक (District Gazetteers), सभासद बखर आणि पुरातत्त्व दस्तऐवजांवर आधारित किल्ले, इतिहास, उत्सव, लोककला आणि संस्कृतीचा संपूर्ण संग्रह.'
              : 'A comprehensive archive grounded in the Maharashtra District Gazetteers, Sabhasad Bakhar, and Archaeological Survey of India (ASI) monographs.'
            }
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#C65D24] text-white shadow-sm'
                : 'bg-[#E7D5BC]/50 text-[#35251D] hover:bg-[#E7D5BC]'
            }`}
          >
            All Categories ({forts.length + HERITAGE_ARTIFACTS.length})
          </button>
          
          <button
            onClick={() => setActiveCategory('forts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'forts'
                ? 'bg-[#C65D24] text-white shadow-sm'
                : 'bg-[#E7D5BC]/50 text-[#35251D] hover:bg-[#E7D5BC]'
            }`}
          >
            1. Forts & Places ({forts.length})
          </button>

          {HERITAGE_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C65D24] text-white shadow-sm'
                  : 'bg-[#E7D5BC]/50 text-[#35251D] hover:bg-[#E7D5BC]'
              }`}
            >
              {idx + 2}. {cat.title}
            </button>
          ))}
        </div>

        {/* Filter and Search Bar Container */}
        <div className="bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-xl p-5 mb-8 shadow-xs space-y-4">
          
          {/* Search Input Row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777A50] dark:text-[#A3A67D]" />
              <input
                type="text"
                placeholder={language === 'mr' ? "किल्ले, इतिहास, उत्सव, खाद्यसंस्कृती, बोलीभाषा शोधा..." : "Search across forts, history, festivals, folk arts, food, dialects..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FAF5EC] dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22] text-sm text-[#35251D] dark:text-[#F5EAE0] placeholder:text-[#35251D]/50 dark:placeholder:text-[#F5EAE0]/40 focus:outline-none focus:border-[#C65D24] dark:focus:border-[#E67E22] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777A50] dark:text-[#A3A67D] hover:text-[#35251D] dark:hover:text-[#F5EAE0]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-[#777A50] dark:text-[#A3A67D]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-lg bg-[#FAF5EC] dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22] text-xs font-medium text-[#35251D] dark:text-[#F5EAE0] focus:outline-none focus:border-[#C65D24] dark:focus:border-[#E67E22]"
              >
                <option value="default">{language === 'mr' ? 'क्रमवारी: पूर्वनिर्धारित' : 'Sort by: Default'}</option>
                <option value="name">{language === 'mr' ? 'नावानुसार (A – Z)' : 'Name (A – Z)'}</option>
              </select>
            </div>
          </div>

          {/* Interactive Filter Segmented Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E7D5BC]/80 dark:border-[#352C22] text-xs">
            <div className="flex flex-wrap items-center gap-3">
              
              {activeCategory === 'forts' || activeCategory === 'all' ? (
                <>
                  {/* District Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#777A50] dark:text-[#A3A67D]">{language === 'mr' ? 'जिल्हा:' : 'District:'}</span>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="px-2.5 py-1 rounded-md bg-[#FAF5EC] dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22] text-xs text-[#35251D] dark:text-[#F5EAE0] focus:outline-none focus:border-[#C65D24] dark:focus:border-[#E67E22]"
                    >
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#777A50] dark:text-[#A3A67D]">{language === 'mr' ? 'काठिण्य पातळी:' : 'Trek Difficulty:'}</span>
                    <div className="inline-flex rounded-lg bg-[#E7D5BC]/40 dark:bg-[#25201A] p-0.5 border border-[#E7D5BC] dark:border-[#352C22]">
                      {['All', 'Easy', 'Moderate', 'Challenging'].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            selectedDifficulty === diff
                              ? 'bg-[#C65D24] dark:bg-[#E67E22] text-white shadow-xs'
                              : 'text-[#35251D] dark:text-[#F5EAE0] hover:text-[#C65D24]'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-xs text-[#777A50] font-mono">
                  Showing records for: <span className="font-bold text-[#35251D]">{getCategoryTitle(activeCategory)}</span>
                </div>
              )}
            </div>

            {(searchQuery || selectedDifficulty !== 'All' || selectedDistrict !== 'All' || activeCategory !== 'all') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#C65D24] hover:underline font-semibold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#777A50]">
          <div>
            Found <span className="font-bold text-[#35251D]">{filteredForts.length + filteredArtifacts.length}</span> heritage records matching your criteria.
          </div>
          <div className="font-mono">
            Verified Archives & Gazetteer Sources
          </div>
        </div>

        {/* 1. Forts Grid */}
        {filteredForts.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heritage text-xl font-bold text-[#35251D] mb-4 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-[#C65D24]" />
              <span>Historical Fortresses & Places</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForts.map((fort) => (
                <div
                  key={fort.id}
                  onClick={() => onSelectFort(fort)}
                  className="bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-2xl overflow-hidden shadow-xs hover:border-[#C65D24] dark:hover:border-[#E67E22] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-[#E7D5BC] dark:bg-[#25201A]">
                    <img
                      src={fort.image}
                      alt={fort.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#35251D]/80 dark:bg-[#12100E]/80 backdrop-blur-xs text-[#FAF5EC] px-2.5 py-1 rounded-md text-xs font-mono font-medium">
                      {fort.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#C65D24] dark:bg-[#E67E22] text-white px-2.5 py-1 rounded-md text-xs font-mono font-bold">
                      {fort.difficulty}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#777A50] dark:text-[#A3A67D] mb-1 font-mono">
                        <span>{fort.district} District</span>
                        <span>{fort.altitudeFeet} ft / {fort.altitudeMeters} m</span>
                      </div>

                      <h3 className="font-heritage text-lg font-bold text-[#35251D] dark:text-[#F5EAE0] group-hover:text-[#C65D24] dark:group-hover:text-[#E67E22] transition-colors">
                        {language === 'mr' ? fort.marathiName : fort.name}
                      </h3>
                      <p className="font-devanagari text-xs text-[#777A50] dark:text-[#A3A67D] font-medium mb-3">
                        {language === 'mr' ? fort.name : fort.marathiName}
                      </p>

                      <p className="text-xs text-[#35251D]/80 dark:text-[#F5EAE0]/80 line-clamp-2 leading-relaxed mb-4">
                        {fort.historicalSignificance}
                      </p>

                      {/* Citation verification badge */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#777A50] dark:text-[#A3A67D] font-mono mb-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">
                          {language === 'mr' ? 'नोंद: शासन गॅझेटिअर व सभासद बखर' : 'Ref: Gazetteer & Sabhasad Bakhar'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E7D5BC] dark:border-[#352C22] flex items-center justify-between text-xs font-semibold text-[#C65D24] dark:text-[#E67E22]">
                      <span>{language === 'mr' ? 'तपशील व इतिहास पहा' : 'View Blueprint & History'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Heritage Artifacts Grid (History, Festivals, Folk Arts, Food, Clothing, Dialects, Modi Script, Literature, Tourism) */}
        {filteredArtifacts.length > 0 && (
          <div>
            <h2 className="font-heritage text-xl font-bold text-[#35251D] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C65D24]" />
              <span>Cultural & Historical Heritage Records</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtifacts.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtifact(art)}
                  className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl p-6 shadow-xs hover:border-[#C65D24] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#777A50] mb-2 font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#E7D5BC]/50 font-bold text-[#35251D]">
                        {getCategoryTitle(art.categoryId)}
                      </span>
                      <span>{art.region}</span>
                    </div>

                    <h3 className="font-heritage text-lg font-bold text-[#35251D] group-hover:text-[#C65D24] transition-colors mb-1">
                      {art.title}
                    </h3>
                    <p className="font-devanagari text-xs text-[#777A50] font-medium mb-3">
                      {art.marathiTitle}
                    </p>

                    <p className="text-xs text-[#35251D]/80 leading-relaxed line-clamp-3 mb-4">
                      {art.significance}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7D5BC] flex items-center justify-between text-xs font-semibold text-[#C65D24]">
                    <span>Read Verified Details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredForts.length === 0 && filteredArtifacts.length === 0 && (
          <div className="text-center py-16 bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl">
            <p className="text-base text-[#35251D] font-medium mb-2">No heritage records found matching your search.</p>
            <p className="text-xs text-[#777A50] mb-4">Try adjusting your search terms or resetting filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-[#C65D24] text-white text-xs font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Heritage Artifact Detail Modal */}
        {selectedArtifact && (
          <div className="fixed inset-0 z-50 bg-[#35251D]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FAF5EC] border border-[#E7D5BC] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
              
              <div className="flex items-start justify-between border-b border-[#E7D5BC] pb-4">
                <div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#E7D5BC]/60 text-[#35251D]">
                    {getCategoryTitle(selectedArtifact.categoryId)}
                  </span>
                  <h2 className="font-heritage text-2xl font-bold text-[#35251D] mt-2">
                    {selectedArtifact.title}
                  </h2>
                  <p className="font-devanagari text-sm text-[#777A50] font-semibold mt-0.5">
                    {selectedArtifact.marathiTitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="p-2 rounded-lg bg-[#E7D5BC]/40 hover:bg-[#E7D5BC] text-[#35251D] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#35251D]">
                <div>
                  <h4 className="font-bold text-[#C65D24] mb-1 font-mono uppercase text-xs">Historical Significance & Overview</h4>
                  <p className="leading-relaxed mb-2">{selectedArtifact.significance}</p>
                  <p className="font-devanagari text-[#777A50] leading-relaxed">{selectedArtifact.marathiSignificance}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#C65D24] mb-2 font-mono uppercase text-xs">Key Archival Details</h4>
                  <ul className="space-y-1.5 list-disc pl-5">
                    {selectedArtifact.details.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#E7D5BC]/30 border border-[#E7D5BC] space-y-1">
                  <div className="text-[11px] font-mono text-[#777A50] uppercase">Reference Source / Citation</div>
                  <div className="text-xs font-semibold text-[#35251D]">{selectedArtifact.referenceSource}</div>
                  <div className="text-[11px] text-[#777A50]">Era: {selectedArtifact.periodOrEra} | Region: {selectedArtifact.region}</div>
                </div>

                {/* Structured Reference Gazetteers Section */}
                <SourcesListSection categoryId={selectedArtifact.categoryId} title="Category Reference Gazetteers & Documents" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7D5BC]">
                {onAskAIAboutTopic && (
                  <button
                    onClick={() => {
                      const topic = selectedArtifact.title;
                      setSelectedArtifact(null);
                      onAskAIAboutTopic(`${topic} या ऐतिहासिक व सांस्कृतिक वारशाबद्दल सविस्तर माहिती सांगा.`);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#C65D24] hover:bg-[#9D4226] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ask AI About This Topic</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#E7D5BC]/60 hover:bg-[#E7D5BC] text-[#35251D] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
