import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Brain,
  Briefcase,
  Award,
  MessageSquare,
  ExternalLink,
  Mail,
  Linkedin,
  ChevronRight,
  Cpu,
  Globe,
  Sparkles,
  Sun,
  Moon,
  Send,
  BarChart2,
  Menu,
  X,
  Bot,
  User,
  Loader2,
  Download,
  FileText,
  File,
  Star,
  Quote,
  ThumbsUp,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  ShieldCheck,
  MapPin,
  ScrollText,
  Trophy
} from 'lucide-react';

const Portfolio = () => {
  // --- CONFIGURATION ---
  // API keys are now stored in .env file for security
  // Get your Gemini API key here: https://aistudio.google.com/app/apikey
  // Get your Google Analytics Measurement ID from: Analytics Admin > Data Streams
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

  const RESUME_CONTEXT = `
  You are an AI assistant for Ashfaque Rifaye, a Technical Business Analyst and Product Owner with 9 years of experience.
  Your goal is to answer questions about Ashfaque's professional background professionally and accurately based ONLY on the following resume data.
  
  RESUME DATA:
  - Name: Ashfaque Rifaye
  - Role: Tech Business Analyst | AI Product Manager
  - Location: Chennai, IND (Open to Relocate: Bangalore, Hyderabad, Dubai, Remote)
  - Contact: ashfaque_rifaye@outlook.com, linkedin.com/ashfaque-rifaye
  - Summary: 9 years exp in AI-driven digital solutions, virtual assistants, and enterprise automation. Skilled in Genesys/Google Dialogflow, AI/ML, CRM integrations, and SAFe Agile.
  
  - Experience 1: AT&T (Aug 2022 - Present) - AI Business Analyst / Product Owner.
    - Lead E2E functional ownership for GenAI-powered Virtual Assistant (Google CCAI/Dialogflow), driving omnichannel enablement across chat, voice, WhatsApp, and RCS.
    - Defined end-to-end customer journeys, managed project with large team intents/entities, fallback logic, and RAG-powered conversational search.
    - Delivered 45% containment and reduced live-agent escalations.
    - Enabled seamless orchestration between AI layer, telephony systems, and backend CRMs through REST APIs.
    - Managed backlog grooming, sprint planning, and cross-squad coordination in SAFe Agile framework.
    - Designed KPI dashboards (Power BI, SQL) for performance tracking.
  
  - Experience 2: Verizon Data Services (Mar 2020 - Aug 2022) - Consultant.
    - Conducted analysis with data-backed recommendations, funnel analysis, and A/B testing.
    - Overcame technical challenges to drive $1.5M+ revenue growth for Verizon.
    - Key Projects: Hum+ Wi-Fi Plan ($100K/yr revenue), Omni Universal Cart (11% growth).
  
  - Experience 3: Infosys (May 2016 - Feb 2020) - Senior Software Engineer.
    - Modernized legacy Work Statement Requirement Database (WSRD) for Boeing.
    - Reduced downtime by 40% and increased throughput by 30%.
    - Tech Stack: Java 8, React, Angular, Spring Boot, PostgreSQL, Oracle, Python.
  
  - Core Competencies: Product Ownership, Strategy Roadmaps, SAFe Agile, Scrum, Conversational AI, RAG, LLMs, Google CCAI, Dialogflow CX/ES, NLP, Python, SQL, REST APIs.
  - Education: B.E. Mechanical Engineering, Velammal Engineering College (2016).
  - Certifications: SAFe 6 Lean Portfolio Manager (2024), SAFe 6 Agilist (2023), CSPO (2022), Azure AI Fundamentals (2023).
  
  - Awards: 
    - 2025: AT&T Hackathon 1st Place Winner ("Hyper-Personalization of International Travel Experience").
    - 2025: "Most Impactful Business Solution" (Hackathon Idea).
    - 2023: AT&T Connection Award.
    - 2021: Verizon Spotlight Award for Customer Excellence.
  
  Tone: Professional, confident, helpful.
  If asked about something not in the resume, say: "I don't see that specific detail in Ashfaque's resume, but I can tell you about his expertise in Conversational AI and Product Ownership. Would you like to know about that?"
  `;

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Ashfaque's AI Twin. Ask me anything about his experience, skills, or projects! ✨" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const fullText = "Delivering Scalable AI Solutions & Digital Transformation.";

  // --- ANALYTICS ENGINE (Google Analytics 4) ---
  useEffect(() => {
    // 1. Inject GA Script dynamically
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);

  const trackEvent = (eventName, params = {}) => {
    console.log(`[Analytics] ${eventName}:`, params);
    if (window.gtag && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      window.gtag('event', eventName, params);
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }

    trackEvent('page_view', { page_title: 'Portfolio Home' });
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // --- HANDLERS ---
  const handleThemeToggle = () => {
    setIsDark(!isDark);
    trackEvent('toggle_theme', { mode: !isDark ? 'dark' : 'light' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close mobile menu on selection
    trackEvent('view_section', { section_name: tab });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', { method: 'email_client' });
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:ashfaque_rifaye@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownload = (format) => {
    trackEvent('file_download', {
      file_name: 'Ashfaque_Resume',
      file_extension: format
    });
    alert(`Downloading Resume in ${format} format...`);
    setShowDownloadOptions(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsChatLoading(true);
    trackEvent('ai_assistant_query', { query_length: userMessage.length });

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...chatHistory.map(msg => ({
              role: msg.role === 'model' ? 'model' : 'user',
              parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
          ],
          systemInstruction: { parts: [{ text: RESUME_CONTEXT }] }
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
      setChatHistory(prev => [...prev, { role: 'model', text: aiResponse }]);

    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered a connection error. Please make sure the API Key is configured in the code." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- THEME CLASSES ---
  const bgClass = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textClass = isDark ? 'text-slate-200' : 'text-slate-800';
  const cardBgClass = isDark
    ? 'bg-slate-900/50 backdrop-blur-sm border-white/5'
    : 'bg-white/70 backdrop-blur-sm border-slate-200 shadow-sm';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';
  const subTextClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const accentTextClass = isDark ? 'text-indigo-400' : 'text-indigo-600';

  // --- SKILL ICONS ---
  const skills = [
    { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'Dialogflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Confluence', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg' },
  ];

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-indigo-500/30 transition-colors duration-500`}>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse ${!isDark && 'opacity-30'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse delay-1000 ${!isDark && 'opacity-30'}`}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- STICKY HEADER --- */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleTabChange('overview')}>
              <div className={`p-2 rounded-xl border transition-colors ${isDark ? 'border-indigo-500/30 bg-indigo-500/10 group-hover:bg-indigo-500/20' : 'border-indigo-200 bg-indigo-50 group-hover:bg-indigo-100'}`}>
                <Terminal size={22} className={accentTextClass} />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-lg md:text-xl font-bold ${headingClass} tracking-tight leading-none`}>Ashfaque Rifaye</h1>
                <p className={`text-[10px] md:text-xs ${subTextClass} font-mono uppercase tracking-wide mt-0.5`}>Tech BA | AI PM</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-3">
              <nav className={`flex items-center space-x-1 p-1 rounded-full border ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                {['overview', 'experience', 'works', 'awards', 'AI Assistant', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : `${subTextClass} hover:${headingClass} hover:bg-black/5 dark:hover:bg-white/5`
                      }`}
                  >
                    {tab === 'AI Assistant' && <Sparkles size={12} className={activeTab === tab ? "text-yellow-300" : "text-indigo-400"} />}
                    {tab === 'awards' ? 'Awards' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>

              <button
                onClick={handleThemeToggle}
                className={`p-2 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-white/10 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={handleThemeToggle}
                className={`p-2 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${headingClass} hover:bg-white/10`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className={`md:hidden absolute left-0 right-0 top-full p-4 border-b shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 z-40 ${isDark ? 'bg-slate-950/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
              <nav className="flex flex-col space-y-1">
                {['overview', 'experience', 'works', 'awards', 'AI Assistant', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : `${textClass} hover:bg-white/5`
                      }`}
                  >
                    {tab === 'AI Assistant' && <Sparkles size={16} />}
                    {tab === 'awards' ? 'Awards & Testimonials' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8">

          {/* --- OVERVIEW PAGE (BENTO GRID) --- */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* 1. HERO SECTION (2x2) */}
              <div className={`md:col-span-2 md:row-span-2 ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-white'} rounded-3xl p-6 md:p-8 border ${isDark ? 'border-white/5' : 'border-slate-200'} shadow-xl relative overflow-hidden group`}>

                {/* BRAIN ICON - Opacity reduced to 5% */}
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                  <Brain size={120} />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-6">
                      <div className="relative shrink-0">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ashfaque&backgroundColor=b6e3f4"
                          alt="Profile"
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                          <div className="w-full h-full rounded-full animate-ping bg-emerald-400 opacity-75 absolute"></div>
                        </div>
                      </div>

                      {/* RESUME & OPEN TO WORK STACK */}
                      <div className="flex flex-col gap-3 w-full sm:w-auto sm:items-end">
                        <div className="flex flex-wrap items-center gap-3">
                          {/* RESUME BUTTON (LEFT) */}
                          <div className="relative">
                            <button
                              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/50`}
                            >
                              <Download size={16} /> Resume
                            </button>

                            {showDownloadOptions && (
                              <div className={`absolute left-0 top-full mt-2 w-44 rounded-xl shadow-xl border overflow-hidden z-20 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                                <button onClick={() => handleDownload('PDF')} className={`w-full text-left px-4 py-3 text-xs flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors ${subTextClass}`}>
                                  <FileText size={14} /> Download PDF
                                </button>
                                <button onClick={() => handleDownload('Word')} className={`w-full text-left px-4 py-3 text-xs flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors ${subTextClass}`}>
                                  <File size={14} /> Download Word
                                </button>
                              </div>
                            )}
                          </div>

                          {/* OPEN TO WORK BADGE (RIGHT) */}
                          <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Open to Work</span>
                          </div>
                        </div>

                        {/* LOCATION INFO IN HERO */}
                        <div className={`flex flex-col items-start sm:items-end text-left sm:text-right mt-1`}>
                          <div className={`flex items-center gap-1.5 text-sm font-bold ${headingClass}`}>
                            <MapPin size={16} className={accentTextClass} /> Chennai, IND
                          </div>
                          <p className={`text-[10px] ${subTextClass} mt-0.5 opacity-80`}>Open to: BLR, HYD, DXB, Remote</p>
                        </div>
                      </div>
                    </div>

                    <h2 className={`text-2xl md:text-5xl font-bold ${headingClass} leading-tight`}>
                      Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Intelligent Products</span> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">AI Era</span>.
                    </h2>
                  </div>

                  <div className={`font-mono ${accentTextClass} h-6 text-sm md:text-base`}>
                    &gt; {typedText}<span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* 2. EXPERIENCE TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Briefcase size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>9+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Years Experience</span>
                </div>
              </div>

              {/* 3. CERTIFICATIONS TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>4+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Global Certifications</span>
                </div>
              </div>

              {/* 4. REVENUE TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>$1.5M+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Revenue Growth</span>
                </div>
              </div>

              {/* 5. AWARDS TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <Award size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>4</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Industry Awards</span>
                </div>
              </div>

              {/* 6. SKILLS SECTION (2 cols) */}
              <div className={`md:col-span-2 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                <h3 className={`text-xl font-bold ${headingClass} mb-6 flex items-center`}>
                  <Cpu className={`mr-2 ${accentTextClass}`} /> Core Competencies
                </h3>

                <div className="mb-8">
                  <h4 className={`text-xs font-bold ${subTextClass} mb-4 uppercase tracking-wider`}>Tech Stack</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all hover:scale-105 ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:shadow-md'}`}>
                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 mb-2" />
                        <span className={`text-[10px] font-medium ${subTextClass}`}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}><Target size={16} className="text-indigo-500" /> Product Strategy</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Product Ownership', 'Strategy Roadmap', 'SAFe Agile', 'Scrum', 'Data Driven'].map(skill => (
                        <span key={skill} className={`px-2 py-1 rounded-lg text-[10px] font-medium border cursor-default ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}><Bot size={16} className="text-emerald-500" /> AI & Tech</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Generative AI', 'RAG', 'Google CCAI', 'Dialogflow', 'LLMs', 'NLP', 'API'].map(skill => (
                        <span key={skill} className={`px-2 py-1 rounded-lg text-[10px] font-medium border cursor-default ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. ABOUT ME (2 cols) */}
              <div className={`md:col-span-2 rounded-3xl p-8 border flex flex-col justify-between ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <div>
                  <h3 className={`text-xl font-bold ${headingClass} mb-4`}>About Me</h3>
                  <p className={`${subTextClass} leading-relaxed mb-4`}>
                    I'm a <strong>Business Analyst</strong> with 9 years of experience delivering Enterprise-level Scalable Digital Transformation and AI solutions.
                    I specialize in bridging the gap between business strategy and technical execution, particularly in the <strong>Telecom, Airlines and E-Commerce Domains</strong>.
                  </p>
                </div>
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h4 className={`text-sm font-semibold ${headingClass} mb-2`}>Education</h4>
                  <p className={`text-sm ${subTextClass}`}>B.E. Mechanical Engineering</p>
                  <p className={`text-xs ${subTextClass} opacity-70`}>Velammal Engineering College (2016)</p>
                </div>
              </div>

              {/* 8. CERTIFICATIONS (Full Width) */}
              <div className={`md:col-span-4 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <h3 className={`text-lg font-bold ${headingClass}`}>Professional Credentials</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "SAFe 6 LPM", desc: "Lean Portfolio Manager", year: "2024", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { name: "SAFe 6 Agilist", desc: "Product Owner/Manager", year: "2023", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { name: "CSPO", desc: "Certified Scrum PO", year: "2022", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { name: "Azure AI", desc: "AI Fundamentals", year: "2023", color: "text-cyan-500", bg: "bg-cyan-500/10" }
                  ].map((cert, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border transition-all hover:scale-105 ${isDark ? 'bg-slate-800/50 border-white/5 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg ${cert.bg} ${cert.color}`}>
                          <CheckCircle size={18} />
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-1 rounded ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>{cert.year}</span>
                      </div>
                      <h4 className={`font-bold text-sm ${headingClass} mb-1`}>{cert.name}</h4>
                      <p className={`text-xs ${subTextClass}`}>{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ANALYTICS BADGE (ADMIN ONLY) */}
              {isAdmin && (
                <div className={`md:col-span-4 rounded-3xl p-6 flex items-center justify-center gap-2 shadow-lg ${isDark ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-indigo-600 text-white'}`}>
                  <BarChart2 size={24} className="text-white/80" />
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-mono">Analytics Ready</p>
                    <p className="text-sm font-bold text-white">Track Visits</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- EXPERIENCE PAGE --- */}
          {activeTab === 'experience' && (
            <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in duration-300 max-w-4xl mx-auto py-4">
              <h2 className={`text-3xl font-bold ${headingClass} mb-6`}>Professional Experience</h2>

              {/* AT&T */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>AT&T</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>AI Business Analyst / Product Owner</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-3 py-1.5 rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>Aug 2022 - Present</span>
                </div>

                <div className="mb-4">
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                  <ul className="space-y-4">
                    {[
                      "Product Ownership & PM for AI Platforms: Lead E2E functional ownership for GenAI-powered Virtual Assistant (Google CCAI/Dialogflow), driving omnichannel enablement.",
                      "Process Design & AI Automation: Defined E2E customer journeys, managed project intents/entities, fallback logic, and RAG search.",
                      "Delivered 45% containment and reduced live-agent escalations via optimized conversational search.",
                      "Integration Architecture: Enabled seamless orchestration between AI layer, telephony systems, and backend CRMs through REST APIs.",
                      "Created process flow charts, data flow diagrams, and requirements documentation aligned to enterprise AI strategy.",
                      "Managed project backlog grooming, sprint planning, and cross-squad coordination in SAFe Agile framework.",
                      "Designed KPI dashboards (Power BI, SQL) for performance tracking & optimization across consumer LOB.",
                      "Stakeholder Management: Partnered with US-based Product Owners, Architects, and SMEs to align AI capabilities with CX goals."
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                        <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verizon */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Verizon Data Services</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>Consultant (Digital Sales)</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-3 py-1.5 rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>Mar 2020 - Aug 2022</span>
                </div>

                <div className="mb-4">
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                  <ul className="space-y-4">
                    {[
                      "Conducted analysis with data-backed recommendations, funnel analysis, market research, and A/B testing.",
                      "Contributed to BRDs, PRDs, and product roadmaps.",
                      "Collaborated with UX, Data, and Product teams to deliver customer-centric digital solutions aligned with KPIs and OKRs.",
                      "Organized Scrum meetings with Scrum Masters, stakeholders, and dev teams, enforcing Agile practices.",
                      "Overcame technical challenges to drive $1.5M+ revenue growth for Verizon."
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                        <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Infosys */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Infosys</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>Senior Software Engineer</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono py-1 px-3 rounded-lg w-fit ${isDark ? 'bg-slate-800' : 'bg-slate-100'} ${subTextClass}`}>May 2016 - Feb 2020</span>
                </div>
                <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                <p className={`text-sm md:text-base ${subTextClass} mb-4 leading-relaxed`}>
                  Modernized legacy Work Statement Requirement Database (WSRD) for Boeing and developed applications integrating REST APIs.
                </p>
                <ul className="space-y-4">
                  {[
                    "Coordinated with design teams to identify and mitigate risks, ensuring data accuracy.",
                    "Troubleshot production issues and resolved critical incidents, reducing downtime by 40% and increasing throughput by 30%.",
                    "Developed end-to-end applications: Data encapsulation, REST API Blending, Task management.",
                    "Leveraged Java 8, React, Angular, Spring Boot, PostgreSQL, Oracle, Python."
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                      <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* --- WORKS PAGE --- */}
          {activeTab === 'works' && (
            <div className="animate-in fade-in zoom-in duration-300 py-4">
              <div className="mb-8">
                <h2 className={`text-3xl font-bold ${headingClass}`}>Featured Projects</h2>
                <p className={`${subTextClass} mt-2`}>Delivering business value through AI and automation.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-indigo-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <MessageSquare className="text-indigo-400 mb-4" size={32} />
                  <h3 className={`text-xl font-bold ${headingClass} mb-2`}>GenAI Virtual Assistant</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>RAG-powered CCAI implementation for AT&T. Orchestrated seamless integrations between AI layer and backend CRMs.</p>
                  <div className="flex gap-2"><span className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Dialogflow</span></div>
                </div>
                <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-violet-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <Sparkles className="text-violet-400 mb-4" size={32} />
                  <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Retail Hyper-Personalization</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>Tailoring retail experiences using data analytics to drive customer engagement and sales optimization.</p>
                  <div className="flex gap-2"><span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">Analytics</span></div>
                </div>
                <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-green-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <TrendingUp className="text-green-400 mb-4" size={32} />
                  <h3 className={`text-xl font-bold ${headingClass} mb-2`}>KPI-Driven AI Performance Dashboards</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>Designed comprehensive dashboards (Power BI, SQL) for performance tracking and optimization across consumer lines of business.</p>
                  <div className="flex gap-2"><span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">Power BI</span></div>
                </div>
                <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-blue-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <Zap className="text-blue-400 mb-4" size={32} />
                  <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Hum+ Wi-Fi Plan</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>Revenue generating project adding $100K annually through strategic planning and digital sales optimization.</p>
                  <div className="flex gap-2"><span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Strategy</span></div>
                </div>
              </div>
            </div>
          )}

          {/* --- AWARDS PAGE --- */}
          {activeTab === 'awards' && (
            <div className="animate-in fade-in zoom-in duration-300 py-4 max-w-4xl mx-auto">
              <h2 className={`text-3xl font-bold ${headingClass} mb-6`}>Honors & Recommendations</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* AWARD 1 */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-amber-900/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                  <Trophy className="text-amber-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Hackathon 1st Place Winner (2025)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-amber-500 mb-2`}>AT&T Hackathon</p>
                  <p className={`text-sm ${subTextClass}`}>"Hyper-Personalization of International Travel Experience". Also awarded "Most Impactful Business Solution".</p>
                </div>

                {/* AWARD 2 */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-amber-900/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                  <Award className="text-amber-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Connection Award (2023)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-amber-500 mb-2`}>AT&T CTX Team</p>
                  <p className={`text-sm ${subTextClass}`}>Recognized for outstanding contribution to the Virtual Assistant project.</p>
                </div>

                {/* AWARD 3 */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-blue-900/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                  <Award className="text-blue-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Spotlight Award (2021)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-blue-500 mb-2`}>Verizon GTS Team</p>
                  <p className={`text-sm ${subTextClass}`}>Awarded for Customer Excellence and driving revenue impact.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-dashed border-slate-700/50">
                <h3 className={`text-xl font-bold ${headingClass} mb-6`}>Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommendation 1 */}
                  <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                    <Quote className={`mb-6 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={32} />
                    <p className={`text-base ${subTextClass} mb-6 italic leading-relaxed`}>
                      "Ashfaque brought the best of innovation, product development and teamwork to our hackathon. He and his team won the Best in Show Award... His creative thinking enabled us to take a novel approach to improving an important aspect of customer experience."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>LM</div>
                      <div>
                        <h4 className={`text-sm font-bold ${headingClass}`}>Lynn Morgan</h4>
                        <p className={`text-xs ${subTextClass}`}>Senior Leader</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation 2 (Placeholder) */}
                  <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                    <Quote className={`mb-6 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={32} />
                    <p className={`text-base ${subTextClass} mb-6 italic leading-relaxed`}>
                      "Ashfaque is a fantastic Product Owner who truly understands how to bridge the gap between technical constraints and business requirements."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>JD</div>
                      <div>
                        <h4 className={`text-sm font-bold ${headingClass}`}>Jane Doe</h4>
                        <p className={`text-xs ${subTextClass}`}>Product Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- AI & CONTACT (Simplified for brevity in switch) --- */}
          {activeTab === 'AI Assistant' && (
            <div className="h-[600px] flex flex-col md:flex-row gap-6 animate-in fade-in py-4">
              {/* Re-use chat component logic from previous code, simplified view here */}
              <div className={`flex-1 ${cardBgClass} rounded-3xl border flex flex-col overflow-hidden`}>
                <div className="p-4 border-b border-white/5"><h3 className={`font-bold ${headingClass}`}>Ashfaque's AI Twin</h3></div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{msg.text}</div>
                    </div>
                  ))}
                  {isChatLoading && <div className="text-xs text-slate-500">Thinking...</div>}
                  <div ref={chatEndRef}></div>
                </div>
                <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/5 flex gap-2">
                  <input className={`flex-1 bg-transparent border rounded-lg p-2 ${isDark ? 'border-slate-700 text-white' : 'border-slate-200 text-black'}`} value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about my resume..." />
                  <button type="submit" className="p-2 bg-indigo-600 rounded-lg text-white"><Send size={20} /></button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto py-8 animate-in fade-in">
              <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                <h2 className={`text-2xl font-bold ${headingClass} mb-6`}>Get in Touch</h2>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} placeholder="Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} rows="4" placeholder="Message" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Send Message</button>
                </form>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className={`mt-auto py-8 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${subTextClass}`}>© {new Date().getFullYear()} Ashfaque Rifaye. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/ashfaque-rifaye/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-400"><Linkedin size={16} /> LinkedIn</a>
              <a href="mailto:ashfaque_rifaye@outlook.com" className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-400"><Mail size={16} /> Email</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Portfolio;