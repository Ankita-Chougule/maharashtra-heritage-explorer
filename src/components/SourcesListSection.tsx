import React from 'react';
import { ReferenceSource, OFFICIAL_REFERENCE_SOURCES } from '../data/referenceSourcesData';
import { BookOpen, ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface SourcesListSectionProps {
  categoryId?: string;
  sourceIds?: string[];
  title?: string;
}

export const SourcesListSection: React.FC<SourcesListSectionProps> = ({
  categoryId,
  sourceIds,
  title
}) => {
  const { language } = useThemeLanguage();

  const sectionTitle = title || (language === 'mr' 
    ? "प्रमाणित ऐतिहासिक संदर्भ ग्रंथ व दस्तऐवज (Archival Sources)" 
    : "Authoritative Reference Sources & Gazetteers");

  // Filter relevant sources based on props or show all
  const filteredSources = OFFICIAL_REFERENCE_SOURCES.filter((source) => {
    if (sourceIds && sourceIds.length > 0) {
      return sourceIds.includes(source.id);
    }
    if (categoryId) {
      return source.categoryId === categoryId || source.categoryId === 'all';
    }
    return true;
  });

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'Government Gazetteer':
        return 'bg-[#35251D] dark:bg-[#25201A] text-[#FAF5EC] border-[#35251D] dark:border-[#352C22]';
      case 'Archival Document':
        return 'bg-[#C65D24] dark:bg-[#E67E22] text-white border-[#C65D24] dark:border-[#E67E22]';
      case 'Historical Book':
      case 'Scholarly Article':
        return 'bg-[#777A50] dark:bg-[#A3A67D] text-white dark:text-[#12100E] border-[#777A50] dark:border-[#A3A67D]';
      case 'Historical Novel':
        return 'bg-[#E7D5BC] dark:bg-[#25201A] text-[#35251D] dark:text-[#F5EAE0] border-[#C65D24]/50';
      case 'Field Survey & ASI Report':
      default:
        return 'bg-[#FAF5EC] dark:bg-[#1B1713] text-[#35251D] dark:text-[#F5EAE0] border-[#E7D5BC] dark:border-[#352C22]';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'mr' ? 'प्रमाणित संदर्भ' : 'Verified Source'}</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>{language === 'mr' ? 'पडताळणी चालू' : 'Under Review'}</span>
          </span>
        );
      case 'Pending Verification':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            <AlertCircle className="w-3 h-3 text-slate-500" />
            <span>{language === 'mr' ? 'पडताळणी बाकी' : 'Requires Verification'}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-[#FAF5EC] dark:bg-[#1B1713] border border-[#E7D5BC] dark:border-[#352C22] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-[#E7D5BC] dark:border-[#352C22] pb-3">
        <div className="flex items-center gap-2 font-heritage font-bold text-[#35251D] dark:text-[#F5EAE0] text-sm sm:text-base">
          <BookOpen className="w-4 h-4 text-[#C65D24] dark:text-[#E67E22]" />
          <span>{sectionTitle}</span>
        </div>
        <span className="text-[11px] font-mono text-[#777A50] dark:text-[#A3A67D]">
          {language === 'mr' ? 'प्राधिकृत ऐतिहासिक पुरावे' : 'Authoritative Reference System'}
        </span>
      </div>

      <div className="space-y-3.5">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="p-4 rounded-xl bg-[#E7D5BC]/30 dark:bg-[#25201A] border border-[#E7D5BC] dark:border-[#352C22] space-y-2 hover:border-[#C65D24]/50 dark:hover:border-[#E67E22]/50 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getSourceTypeColor(src.sourceType)}`}>
                  {src.sourceType}
                </span>
                {getStatusBadge(src.verificationStatus)}
              </div>

              {src.locationOrUrl && src.locationOrUrl.startsWith('http') && (
                <a
                  href={src.locationOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C65D24] dark:text-[#E67E22] hover:underline cursor-pointer font-mono"
                >
                  <span>{language === 'mr' ? 'अधिकृत दस्तऐवज' : 'Official Record'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div>
              <h4 className="font-heritage text-sm font-bold text-[#35251D] dark:text-[#F5EAE0]">
                {language === 'mr' ? src.marathiTitle : src.title}
              </h4>
              <p className="font-devanagari text-xs text-[#777A50] dark:text-[#A3A67D] font-medium">
                {language === 'mr' ? src.title : src.marathiTitle}
              </p>
            </div>

            <div className="text-xs text-[#35251D]/80 dark:text-[#F5EAE0]/80 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
              <span><strong>{language === 'mr' ? 'प्रकाशक / संस्था:' : 'Issuing Body:'}</strong> {src.authorOrIssuingBody}</span>
              {src.publicationYear && <span><strong>{language === 'mr' ? 'वर्ष:' : 'Year:'}</strong> {src.publicationYear}</span>}
              {src.pageOrSection && <span><strong>{language === 'mr' ? 'प्रकरण / पृष्ठ:' : 'Section:'}</strong> {src.pageOrSection}</span>}
            </div>

            {src.notes && (
              <p className="text-[11px] text-[#35251D]/75 dark:text-[#F5EAE0]/75 italic bg-[#FAF5EC] dark:bg-[#12100E] p-2 rounded border border-[#E7D5BC]/60 dark:border-[#352C22]">
                {src.notes}
              </p>
            )}
          </div>
        ))}

        {filteredSources.length === 0 && (
          <div className="p-4 text-center text-xs text-[#777A50] dark:text-[#A3A67D] italic">
            {language === 'mr'
              ? 'या नोंदीचे प्रत्यक्ष क्षेत्रीय सर्वेक्षण पूर्ण झाले आहे. शासकीय गॅझेटिअर तपासणी प्रक्रिया सुरू आहे.'
              : 'This entry is currently categorized under primary field observation. Verified government gazetteer references are currently pending review.'
            }
          </div>
        )}
      </div>

      <div className="text-[11px] text-[#777A50] dark:text-[#A3A67D] border-t border-[#E7D5BC] dark:border-[#352C22] pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <span>{language === 'mr' ? 'धोरण: प्राथमिक बखरी आणि गॅझेटिअर्सना काल्पनिक साहित्यापेक्षा प्राधान्य.' : 'Policy: Primary Bakhars & Gazetteers prioritized over literary dramatizations.'}</span>
        <span className="font-mono">{language === 'mr' ? 'प्रमाणीकरण: महा. शासन गॅझेटिअर व ASI' : 'Verification Standard: Govt. Gazetteers & ASI'}</span>
      </div>
    </div>
  );
};
