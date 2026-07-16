import { Experience } from "../types";
import { Briefcase, MapPin, Calendar, CheckSquare2 } from "lucide-react";
import { motion } from "motion/react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative"
          id={`experience-timeline-item-${exp.id}`}
        >
          {/* Milestone marker */}
          <span className="absolute -left-[39px] md:-left-[47px] top-1.5 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-none border border-neutral-200 bg-white text-emerald-600 dark:border-neutral-800 dark:bg-[#0A0A0A] dark:text-emerald-400">
            <Briefcase className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </span>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-1.5 md:gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white">
                {exp.role}
              </h3>
              <p className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 mt-1 uppercase">
                // {exp.company}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                {exp.period}
              </span>
              <span className="hidden md:inline text-neutral-300 dark:text-neutral-800">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                {exp.location}
              </span>
            </div>
          </div>

          {/* Bullet achievements */}
          <ul className="mt-4 space-y-2.5">
            {exp.bullets.map((bullet, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                <span className="text-emerald-500 font-mono font-bold shrink-0 mt-0.5">//</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Tools / Tech section */}
          <div className="mt-4 pt-1.5 flex flex-wrap gap-1.5">
            {exp.skillsUsed.map(skill => (
              <span
                key={skill}
                className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-850 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
