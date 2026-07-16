import { Project } from "../types";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "Full Stack":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30";
      case "System Design":
        return "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/30";
      case "Cloud Infrastructure":
        return "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900/30";
      case "AI & Data Science":
        return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-none border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0F0F0F] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors duration-300"
    >
      {/* Top indicator tag */}
      <span className="absolute top-2 right-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-wider uppercase z-10">
        [{project.category.replace(" ", "_")}]
      </span>

      {/* Thumbnail Container */}
      <div className="relative h-44 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-neutral-150 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mt-1">
            // {project.subtitle}
          </p>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-[#090909]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 border border-dashed border-neutral-200 dark:border-neutral-800 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 bg-transparent">
              +{project.tags.length - 4} MORE
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/60 pt-4">
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="GitHub Repository"
              id={`github-link-${project.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="Live Demo"
              id={`live-link-${project.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </a>
          </div>

          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-neutral-800 hover:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            id={`details-btn-${project.id}`}
          >
            VIEW_SPECS //
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
