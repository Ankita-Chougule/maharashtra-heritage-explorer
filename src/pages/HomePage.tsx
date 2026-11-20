import React from 'react';
import { FortItem } from '../data/fortsData';
import { HeritageEvent } from '../data/sampleEvents';
import { TourismServiceItem } from '../data/sampleServices';
import { Hero } from '../components/Hero';
import { FeaturedForts } from '../components/FeaturedForts';
import { CultureHeritageCategoriesSection } from '../components/CultureHeritageCategoriesSection';
import { ChatbotPreviewSection } from '../components/ChatbotPreviewSection';
import { ServicesSection } from '../components/ServicesSection';
import { EventsSection } from '../components/EventsSection';
import { AboutProjectSection } from '../components/AboutProjectSection';

interface HomePageProps {
  forts: FortItem[];
  onSelectFort: (fort: FortItem) => void;
  onNavigateTab: (tab: string, query?: string) => void;
  onSelectService: (service: TourismServiceItem) => void;
  onSelectEvent: (event: HeritageEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  forts,
  onSelectFort,
  onNavigateTab,
  onSelectService,
  onSelectEvent,
}) => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => onNavigateTab('forts')}
        onDiscoverEventsClick={() => onNavigateTab('events')}
        onAskAIClick={() => onNavigateTab('chatbot')}
      />

      {/* 2. Featured Historical Fortresses (Raigad, Shivneri, Pratapgad, Sinhagad) */}
      <FeaturedForts
        forts={forts}
        onSelectFort={onSelectFort}
        onViewAllClick={() => onNavigateTab('forts')}
      />

      {/* 3. Explore Maharashtra's Culture & Heritage (10 Pillars) */}
      <CultureHeritageCategoriesSection
        onSelectCategory={(categoryId) => onNavigateTab('forts')}
        onOpenChatbot={(promptQuery) => onNavigateTab('chatbot', promptQuery)}
      />

      {/* 4. AI Marathi Heritage Chatbot Introduction */}
      <ChatbotPreviewSection
        onOpenChatbot={(promptQuery) => onNavigateTab('chatbot', promptQuery)}
      />

      {/* 4. Tourism Services (Tickets, Treks, Local Guides) */}
      <ServicesSection
        onViewAllServices={() => onNavigateTab('services')}
        onSelectService={onSelectService}
      />

      {/* 5. Heritage Events Calendar (Demonstration Data) */}
      <EventsSection
        onViewAllEvents={() => onNavigateTab('events')}
        onSelectEvent={onSelectEvent}
      />

      {/* 6. About Our Project (Maharashtra Culture & Heritage Initiative) */}
      <AboutProjectSection />
    </div>
  );
};
