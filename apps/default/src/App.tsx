import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Radio, TrendingUp, Users, FileText, Bell, MessageSquare, Clock, ExternalLink, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Agent Chat Integration
const AGENT_ID = '01KGHDSE4M5T2GXGXJZG75ZNNW';
const PUBLIC_AGENT_ID = '01KGHDSSEV81N1SVR0YA1RDH9Y';

interface StrikeEvent {
  id: string;
  title: string;
  source: string;
  url: string;
  timestamp: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  topic: string;
  summary: string;
}

const App: React.FC = function () {
  const [activeView, setActiveView] = useState<'timeline' | 'analysis' | 'context'>('timeline');
  const [events, setEvents] = useState<StrikeEvent[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [filterTopic, setFilterTopic] = useState<string>('all');

  // Mock data - in production this would fetch from API
  useEffect(() => {
    const mockEvents: StrikeEvent[] = [
      {
        id: '1',
        title: 'High Court drama - Liberty seeks urgent interdict',
        source: 'Citizen - Middelburg Observer',
        url: 'https://www.citizen.co.za/middelburg-observer/news/2026/02/03/watch-drama-at-high-court-where-liberty-coal-seeks-urgent-interdict-against-optimum-protests/',
        timestamp: '2026-02-03',
        sentiment: 'Negative',
        topic: 'Court Proceedings',
        summary: 'Hundreds of protesters gathered outside Middelburg High Court as Liberty Coal seeks interdict. Community opposes exclusion from Optimum turnaround strategy. EFF and ANC support protesters.'
      },
      {
        id: '2',
        title: 'Liberty Coal applies for interim interdict - armed protesters alleged',
        source: 'Daily Sun',
        url: 'https://www.snl24.com/dailysun/news/gupta-mine-fights-armed-men-20260130',
        timestamp: '2026-01-30',
        sentiment: 'Negative',
        topic: 'Protest Action',
        summary: 'Liberty Coal filed urgent application seeking interdict. Company alleges protesters brandished high-calibre semi-automatic weapons. Claims armed intimidation and unlawful blockade.'
      },
      {
        id: '3',
        title: 'Mining dispute exposes political fault lines',
        source: 'Sunday World',
        url: 'https://sundayworld.co.za/politics/mining-dispute-exposes-fault-lines-in-mpumalanga-power-politics/',
        timestamp: '2026-01-28',
        sentiment: 'Neutral',
        topic: 'Political Involvement',
        summary: 'Police accused of standing by while armed protesters blocked access. Four separate gathering notices submitted between Dec 2025 and Jan 2026. Municipal councillors allegedly attended gatherings.'
      },
      {
        id: '4',
        title: 'Community accuses Liberty of dissolving stakeholder forum',
        source: 'Highveld Chronicle',
        url: 'https://hconline.co.za/community-members-accuse-liberty-coal-of-unilaterally-dissolving-community-led-forum/',
        timestamp: '2026-01-24',
        sentiment: 'Negative',
        topic: 'Community Demands',
        summary: 'Steve Tshwete Community Forum says Liberty dissolved stakeholder engagement forum without consultation. Community march held Jan 13 in Pullenshope.'
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = filterTopic === 'all' 
    ? events 
    : events.filter(e => e.topic === filterTopic);

  const topics = ['all', ...Array.from(new Set(events.map(e => e.topic)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">Strike Monitor</h1>
                </div>
                <p className="text-slate-400">Middelburg | Liberty Coal Dispute | Real-time Intelligence</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30">
                  <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-red-400 text-sm font-medium">LIVE MONITORING</span>
                </div>
                
                <button 
                  onClick={() => setShowChat(!showChat)}
                  className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl border border-blue-500/30 transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2 mt-6">
              {[
                { id: 'timeline', label: 'Live Timeline', icon: Clock },
                { id: 'analysis', label: 'Analysis Hub', icon: TrendingUp },
                { id: 'context', label: 'Context', icon: FileText }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    activeView === id
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {activeView === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Filter Bar */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <div className="flex gap-2 flex-wrap">
                    {topics.map(topic => (
                      <button
                        key={topic}
                        onClick={() => setFilterTopic(topic)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm transition-all duration-300",
                          filterTopic === topic
                            ? "bg-blue-500/30 text-blue-400 border border-blue-500/50"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {topic === 'all' ? 'All Topics' : topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Events Timeline */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredEvents.map((event, index) => {
                      const sentimentColor = {
                        Positive: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
                        Neutral: 'from-slate-500/20 to-slate-500/10 border-slate-500/30',
                        Negative: 'from-red-500/20 to-rose-500/10 border-red-500/30'
                      }[event.sentiment];

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className={cn(
                            "p-6 rounded-xl border backdrop-blur-lg bg-gradient-to-br",
                            sentimentColor
                          )}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 bg-black/30 rounded text-xs font-medium text-slate-300">
                                  {event.topic}
                                </span>
                                <span className="text-xs text-slate-400">{event.timestamp}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                              <p className="text-sm text-slate-300 leading-relaxed">{event.summary}</p>
                            </div>
                            <a 
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                            >
                              <ExternalLink className="w-4 h-4 text-slate-400" />
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{event.source}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeView === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Sentiment Analysis */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Sentiment Breakdown</h3>
                  <div className="space-y-3">
                    {['Negative', 'Neutral', 'Positive'].map(sentiment => {
                      const count = events.filter(e => e.sentiment === sentiment).length;
                      const percentage = (count / events.length) * 100;
                      const color = {
                        Positive: 'bg-green-500',
                        Neutral: 'bg-slate-500',
                        Negative: 'bg-red-500'
                      }[sentiment];

                      return (
                        <div key={sentiment}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{sentiment}</span>
                            <span className="text-slate-400">{count} events</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className={cn("h-full", color)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Topic Distribution */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Topic Distribution</h3>
                  <div className="space-y-3">
                    {Array.from(new Set(events.map(e => e.topic))).map(topic => {
                      const count = events.filter(e => e.topic === topic).length;
                      return (
                        <div key={topic} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">{topic}</span>
                          <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-slate-400">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Developments */}
                <div className="md:col-span-2 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl border border-blue-500/20 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Key Patterns
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Legal escalation: Liberty Coal seeking court intervention via urgent interdict application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Political involvement: EFF and ANC actively supporting community protesters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Core grievance: Community claims stakeholder forum dissolved without consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Security concerns: Allegations of armed protesters and weapons at demonstrations</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeView === 'context' && (
              <motion.div
                key="context"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Background */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Background</h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>Liberty Coal operates the Optimum Coal Mine in Pullenshope, Hendrina (Mpumalanga). The mine was formerly owned by the Gupta family and emerged from business rescue in 2024.</p>
                    <p>The current dispute centers on allegations that Liberty Coal unilaterally dissolved the Steve Tshwete Community stakeholder engagement forum and appointed Liberty Mining Services (LMS) as principal contractor without community consultation.</p>
                  </div>
                </div>

                {/* Key Stakeholders */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-400" />
                    Key Stakeholders
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Liberty Coal', role: 'Mining Company (CEO: Hlayiseka Chauke)' },
                      { name: 'Steve Tshwete Community Forum', role: 'Community Representative Body' },
                      { name: 'EFF & ANC', role: 'Political Support for Community' },
                      { name: 'Municipal Manager Mandla Mnguni', role: 'Steve Tshwete Municipality' }
                    ].map(({ name, role }) => (
                      <div key={name} className="p-4 bg-white/5 rounded-lg">
                        <div className="font-medium text-white text-sm mb-1">{name}</div>
                        <div className="text-xs text-slate-400">{role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Issues */}
                <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-xl border border-orange-500/20 backdrop-blur-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Core Dispute Issues</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">→</span>
                      <span>Alleged dissolution of stakeholder forum without community consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">→</span>
                      <span>Appointment of Liberty Mining Services (LMS) without community involvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">→</span>
                      <span>Protests blocking mine access and national roads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">→</span>
                      <span>Liberty seeking urgent court interdict to halt protests</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Agent Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-slate-900/95 border-l border-white/10 backdrop-blur-xl shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">Strike Monitor Agent</h3>
                  <button 
                    onClick={() => setShowChat(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <span className="text-slate-400">×</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400">Ask me about the strike situation</p>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe 
                  src={`https://www.taskade.com/a/${PUBLIC_AGENT_ID}`}
                  className="w-full h-full border-0"
                  allow="clipboard-read; clipboard-write"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Status Footer */}
      <div className="fixed bottom-6 left-6 p-4 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Bell className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Automated Updates Active</div>
            <div className="text-xs text-slate-400">Checking every 30 minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
