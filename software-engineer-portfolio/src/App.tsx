import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Search,
  Mail,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Code,
  Layers,
  Cpu,
  Sparkles,
  MapPin,
  Clock,
  BookOpenCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ENGINEER_PROFILE, PROJECTS, BLOG_POSTS, EXPERIENCES } from "./data";
import { Project, BlogPost } from "./types";
import ProjectCard from "./components/ProjectCard";
import ProjectDetails from "./components/ProjectDetails";
import BlogCard from "./components/BlogCard";
import BlogPostReader from "./components/BlogPostReader";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "blog" | "experience" | "contact">("home");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Project states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectCategory, setProjectCategory] = useState<string>("All");
  const [projectSearch, setProjectSearch] = useState("");

  // Blog states
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogCategory, setBlogCategory] = useState<string>("All");
  const [blogSearch, setBlogSearch] = useState("");

  // Handle system dark mode initial matching
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  // Sync scroll to top on tab navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [activeTab]);

  // Project filtering calculations
  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = projectCategory === "All" || proj.category === projectCategory;
    const searchLower = projectSearch.toLowerCase();
    const matchesSearch =
      proj.title.toLowerCase().includes(searchLower) ||
      proj.subtitle.toLowerCase().includes(searchLower) ||
      proj.description.toLowerCase().includes(searchLower) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  // Blog filtering calculations
  const filteredBlogPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = blogCategory === "All" || post.category === blogCategory;
    const searchLower = blogSearch.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchLower) ||
      post.summary.toLowerCase().includes(searchLower) ||
      post.tags.some((t) => t.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-[#050505] dark:text-neutral-100 font-sans antialiased">
        
        {/* Navigation bar */}
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800/90 dark:bg-[#050505]/95">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  setActiveTab("home");
                  setSelectedPost(null);
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-none border border-neutral-250 bg-[#0E0E0E] text-white font-mono font-bold text-lg dark:border-neutral-800 dark:bg-black shadow-none">
                  {ENGINEER_PROFILE.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white leading-none">
                    {ENGINEER_PROFILE.name}
                  </span>
                  <span className="block text-[9px] font-mono font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                    SYSTEMS_ENGINEER //
                  </span>
                </div>
              </div>

              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-1">
                {(["home", "projects", "blog", "experience", "contact"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedPost(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-neutral-100 text-neutral-900 border-b-2 border-emerald-500 dark:bg-neutral-900 dark:text-white dark:border-emerald-400"
                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950 dark:text-neutral-450 dark:hover:bg-neutral-900/40 dark:hover:text-white"
                    }`}
                    id={`nav-link-${tab}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              {/* Right utility buttons */}
              <div className="flex items-center gap-2">
                {/* Dark mode button */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-none border border-neutral-200 hover:bg-neutral-100 text-neutral-500 dark:border-neutral-850 dark:hover:bg-neutral-900 dark:text-neutral-450 transition-colors cursor-pointer"
                  id="theme-toggle-btn"
                  title="Toggle Visual Theme"
                >
                  {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Mobile menu trigger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-none md:hidden border border-neutral-200 text-neutral-500 hover:bg-neutral-100 dark:border-neutral-850 dark:hover:bg-neutral-900 dark:text-neutral-450 cursor-pointer"
                  id="mobile-menu-toggle"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
              >
                <div className="space-y-1 p-4">
                  {(["home", "projects", "blog", "experience", "contact"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedPost(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-widest ${
                        activeTab === tab
                          ? "bg-neutral-100 text-neutral-900 border-l-4 border-emerald-500 dark:bg-neutral-900 dark:text-white"
                          : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900/40"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Primary Page Canvas */}
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            
            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <motion.div
                key="home-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-16"
              >
                {/* Hero / Pitch block */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-emerald-500/20 bg-emerald-50 text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:border-emerald-950 dark:bg-[#0E1F16] dark:text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                      Systems Architect & Full Stack Engineer //
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white leading-none">
                      Architecting systems at <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 underline-offset-4">scale</span>.
                    </h1>
                    
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-2xl">
                      {ENGINEER_PROFILE.tagline} {ENGINEER_PROFILE.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab("projects")}
                        className="inline-flex items-center gap-2 rounded-none bg-neutral-900 hover:bg-neutral-850 dark:bg-emerald-600 dark:hover:bg-emerald-750 px-5 py-3.5 text-xs font-mono font-bold tracking-widest uppercase text-white transition-colors cursor-pointer"
                      >
                        Explore Project Gallery //
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      
                      <button
                        onClick={() => setActiveTab("blog")}
                        className="inline-flex items-center gap-2 rounded-none border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 px-5 py-3.5 text-xs font-mono font-bold tracking-widest uppercase text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                      >
                        Read Engineering Blog //
                      </button>
                    </div>
                  </div>

                  {/* Profile Info Card */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#0A0A0A]">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src="https://picsum.photos/seed/engineer-profile/150/150"
                          alt={ENGINEER_PROFILE.name}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-none object-cover border border-neutral-200 dark:border-neutral-800 grayscale contrast-110 brightness-95"
                        />
                        <div>
                          <h4 className="text-lg font-black italic uppercase tracking-tight text-neutral-900 dark:text-white">{ENGINEER_PROFILE.name}</h4>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase">
                            <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                            <span>{ENGINEER_PROFILE.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3.5 border-t border-neutral-100 dark:border-neutral-850 pt-5 text-xs font-sans">
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          Let's synchronize! I build lightweight backends, manage container architectures, and specialize in high-performance React frontends.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-neutral-400 dark:text-neutral-500">
                          <a href={ENGINEER_PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                            <Github className="h-4.5 w-4.5" />
                          </a>
                          <a href={ENGINEER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                            <Linkedin className="h-4.5 w-4.5" />
                          </a>
                          <a href={ENGINEER_PROFILE.twitter} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                            <Twitter className="h-4.5 w-4.5" />
                          </a>
                          <span className="text-neutral-200 dark:text-neutral-800">|</span>
                          <button
                            onClick={() => setActiveTab("contact")}
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer"
                          >
                            <Mail className="h-3.5 w-3.5 text-emerald-500" />
                            GET_IN_TOUCH //
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance stats bento */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {ENGINEER_PROFILE.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="rounded-none border border-neutral-200 bg-neutral-50/50 p-5 text-center dark:border-neutral-850 dark:bg-[#070707]/30"
                    >
                      <span className="block text-2xl sm:text-4xl font-black italic tracking-tighter text-neutral-900 dark:text-white">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-[9px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                        {stat.label.replace(" ", "_")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Core Stack visual grids */}
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white">Core Engineering Stack //</h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Primary technologies vetted in high-load production environments.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Frontend */}
                    <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-[#070707]">
                      <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                        <Code className="h-4 w-4" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider">UI & Frontend</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ENGINEER_PROFILE.skills.frontend.map((skill) => (
                          <span key={skill} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-350 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Backend */}
                    <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-[#070707]">
                      <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                        <Layers className="h-4 w-4" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Backend & Databases</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ENGINEER_PROFILE.skills.backend.map((skill) => (
                          <span key={skill} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-350 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Infrastructure */}
                    <div className="rounded-none border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-[#070707]">
                      <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                        <Cpu className="h-4 w-4" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Cloud & Infra</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ENGINEER_PROFILE.skills.cloud.map((skill) => (
                          <span key={skill} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-350 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Projects Highlight */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white">// Featured Project Systems</h2>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-750 transition-colors cursor-pointer"
                    >
                      All Projects
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {PROJECTS.slice(0, 2).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={(proj) => {
                          setSelectedProject(proj);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Latest Technical Ledger */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white">// Latest Technical Articles</h2>
                    <button
                      onClick={() => setActiveTab("blog")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-750 transition-colors cursor-pointer"
                    >
                      All Articles
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid gap-6">
                    {BLOG_POSTS.slice(0, 2).map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onRead={(p) => {
                          setSelectedPost(p);
                          setActiveTab("blog");
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. PROJECTS TAB */}
            {activeTab === "projects" && (
              <motion.div
                key="projects-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Header title */}
                <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white">Project Gallery //</h1>
                  <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
                    Explore functional deep-dives of my latest full-stack structures, database architectures, and systems design utilities.
                  </p>
                </div>

                {/* Filters and search panel */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-150 pb-5 dark:border-neutral-850">
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {["All", "Full Stack", "System Design", "Cloud Infrastructure"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProjectCategory(cat)}
                        className={`px-3 py-1.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                          projectCategory === cat
                            ? "bg-emerald-600 text-white border-emerald-500 dark:bg-emerald-600 dark:border-emerald-500"
                            : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-[#111] dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-850"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search stack, design patterns..."
                      className="w-full rounded-none border border-neutral-200 bg-white pl-9 pr-4 py-2 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white"
                    />
                    {projectSearch && (
                      <button
                        onClick={() => setProjectSearch("")}
                        className="absolute right-3 top-2 text-[10px] font-mono font-semibold uppercase text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                      >
                        [clear]
                      </button>
                    )}
                  </div>
                </div>

                {/* Gallery Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={(proj) => {
                          setSelectedProject(proj);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 rounded-none border border-dashed border-neutral-250 dark:border-neutral-800 bg-[#FCFCFC] dark:bg-black">
                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">No project configurations matched your filter criteria.</p>
                    <button
                      onClick={() => {
                        setProjectCategory("All");
                        setProjectSearch("");
                      }}
                      className="mt-4 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest border border-neutral-200 bg-white hover:bg-neutral-50 dark:bg-[#0E0E0E] dark:hover:bg-[#151515] dark:border-neutral-800 rounded-none transition-colors cursor-pointer"
                    >
                      Reset active queries //
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. BLOG TAB */}
            {activeTab === "blog" && (
              <motion.div
                key="blog-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {selectedPost ? (
                  /* Read Single post state */
                  <BlogPostReader
                    post={selectedPost}
                    onBack={() => {
                      setSelectedPost(null);
                    }}
                  />
                ) : (
                  /* Default list archive state */
                  <div className="space-y-8">
                    {/* Header title */}
                    <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                      <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white">Technical Ledger //</h1>
                      <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
                        Deep engineering analyses, database designs, caching strategies, and performance breakthroughs.
                      </p>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-150 pb-5 dark:border-neutral-850">
                      {/* Category pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "Engineering", "System Design", "Career", "Tutorials"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setBlogCategory(cat)}
                            className={`px-3 py-1.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              blogCategory === cat
                                ? "bg-emerald-600 text-white border-emerald-500 dark:bg-emerald-600 dark:border-emerald-500"
                                : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-[#111] dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-850"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Search box */}
                      <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          type="text"
                          value={blogSearch}
                          onChange={(e) => setBlogSearch(e.target.value)}
                          placeholder="Search keywords, frameworks..."
                          className="w-full rounded-none border border-neutral-200 bg-white pl-9 pr-4 py-2 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:border-neutral-800 dark:bg-black dark:text-white"
                        />
                        {blogSearch && (
                          <button
                            onClick={() => setBlogSearch("")}
                            className="absolute right-3 top-2 text-[10px] font-mono font-semibold uppercase text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                          >
                            [clear]
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Blog posts feed */}
                    {filteredBlogPosts.length > 0 ? (
                      <div className="grid gap-6">
                        {filteredBlogPosts.map((post) => (
                          <BlogCard
                            key={post.id}
                            post={post}
                            onRead={(p) => setSelectedPost(p)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 rounded-none border border-dashed border-neutral-250 dark:border-neutral-800 bg-[#FCFCFC] dark:bg-black">
                        <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">No ledger articles matched your filtering guidelines.</p>
                        <button
                          onClick={() => {
                            setBlogCategory("All");
                            setBlogSearch("");
                          }}
                          className="mt-4 px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest border border-neutral-200 bg-white hover:bg-neutral-50 dark:bg-[#0E0E0E] dark:hover:bg-[#151515] dark:border-neutral-800 rounded-none transition-colors cursor-pointer"
                        >
                          Reset filters //
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* 4. EXPERIENCE TIMELINE TAB */}
            {activeTab === "experience" && (
              <motion.div
                key="experience-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 max-w-4xl mx-auto"
              >
                <div className="space-y-2 text-center md:text-left border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white">Career Milestones //</h1>
                  <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
                    A comprehensive timeline of my engineering impact, roles, and software architecture scaling milestones.
                  </p>
                </div>

                <div className="pt-6">
                  <ExperienceTimeline experiences={EXPERIENCES} />
                </div>
              </motion.div>
            )}

            {/* 5. CONTACT TAB */}
            {activeTab === "contact" && (
              <motion.div
                key="contact-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 max-w-4xl mx-auto"
              >
                <div className="space-y-2 text-center md:text-left border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white">Let's Connect //</h1>
                  <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400">
                    Looking to hire, consult on distributed database architectures, or discuss software engineering innovations? Drop me a line below!
                  </p>
                </div>

                <div className="pt-2">
                  <ContactForm />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Unified footer */}
        <footer className="mt-20 border-t border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-850 dark:bg-[#070707]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-sm font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white">
                  {ENGINEER_PROFILE.name} Portfolio
                </span>
                <p className="mt-1 text-xs font-mono text-neutral-450 dark:text-neutral-500 uppercase">
                  Designing resilient technical systems. Created in July 2026 //
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <button onClick={() => { setActiveTab("home"); setSelectedPost(null); }} className="hover:text-emerald-500 transition-colors cursor-pointer">HOME</button>
                <button onClick={() => { setActiveTab("projects"); setSelectedPost(null); }} className="hover:text-emerald-500 transition-colors cursor-pointer">PROJECTS</button>
                <button onClick={() => { setActiveTab("blog"); setSelectedPost(null); }} className="hover:text-emerald-500 transition-colors cursor-pointer">BLOG</button>
                <button onClick={() => { setActiveTab("experience"); setSelectedPost(null); }} className="hover:text-emerald-500 transition-colors cursor-pointer">EXPERIENCE</button>
                <button onClick={() => { setActiveTab("contact"); setSelectedPost(null); }} className="hover:text-emerald-500 transition-colors cursor-pointer">CONTACT</button>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800/60 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
              <p>© 2026 {ENGINEER_PROFILE.name}. All rights reserved.</p>
              <div className="flex justify-center gap-4">
                <a href={ENGINEER_PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">GITHUB</a>
                <a href={ENGINEER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">LINKEDIN</a>
                <a href={ENGINEER_PROFILE.twitter} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">TWITTER</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
