import { Project } from "../types";
import { X, Github, ExternalLink, Cpu, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="project-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-white dark:bg-[#0A0A0A] rounded-none border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero banner */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale contrast-110 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-none border border-neutral-700 bg-black/70 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            id="close-detail-modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Banner text */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-2 py-0.5 border border-emerald-500 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/85">
              [{project.category.replace(" ", "_")}]
            </span>
            <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
              {project.title}
            </h2>
            <p className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase">
              // {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[calc(100vh-14rem)] overflow-y-auto">
          {/* Action links */}
          <div className="flex flex-wrap items-center gap-4 justify-between border-b border-neutral-150 dark:border-neutral-800/80 pb-5">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/40"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <Github className="h-3.5 w-3.5" />
                REPOSITORY //
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                LIVE_DEMO //
              </a>
            </div>
          </div>

          {/* Deep-dive description */}
          <div className="space-y-3">
            <h3 className="text-lg font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white border-b border-neutral-150 dark:border-neutral-800 pb-1.5">// Project Deep Dive</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
              {project.longDescription}
            </p>
          </div>

          {/* Key Achievements */}
          <div className="space-y-4">
            <h3 className="text-lg font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white border-b border-neutral-150 dark:border-neutral-800 pb-1.5">// Key Engineering Milestones</h3>
            <div className="grid gap-3">
              {project.achievements.map((achievement, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3.5 rounded-none bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-150 dark:border-neutral-800/50">
                  <span className="text-emerald-500 font-mono font-bold select-none">//</span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture flow */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-emerald-500" />
              <h3 className="text-lg font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white border-b border-neutral-150 dark:border-neutral-800 pb-1.5">// System Architecture & Data Flow</h3>
            </div>
            
            <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 pl-6 space-y-6">
              {project.architecture.map((step, idx) => {
                const [title, desc] = step.split(": ");
                return (
                  <div key={idx} className="relative">
                    {/* Bullet marker */}
                    <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-none bg-emerald-500 border border-white dark:border-neutral-900" />
                    
                    <h4 className="text-xs font-mono font-bold tracking-wide uppercase text-neutral-900 dark:text-white">
                      {title}
                    </h4>
                    {desc && (
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
