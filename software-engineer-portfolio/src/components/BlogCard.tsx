import { BlogPost } from "../types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface BlogCardProps {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
}

export default function BlogCard({ post, onRead }: BlogCardProps) {
  const getCategoryColor = (category: BlogPost["category"]) => {
    switch (category) {
      case "Engineering":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "System Design":
        return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400";
      case "Career":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
      case "Tutorials":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400";
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.article
      id={`blog-card-${post.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col md:flex-row gap-6 p-5 md:p-6 rounded-none border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0F0F0F] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors duration-300"
    >
      {/* Blog Thumbnail */}
      <div className="w-full md:w-56 h-40 shrink-0 overflow-hidden rounded-none border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <img
          src={post.imageUrl}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
        />
      </div>

      {/* Meta Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          {/* Tags / Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-2">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              // {post.category.replace(" ", "_")}
            </span>
            <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1 uppercase">
                <Calendar className="h-3 w-3" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 uppercase">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-neutral-150 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
            {post.title}
          </h3>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-neutral-150 dark:border-neutral-850 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-[#0A0A0A]">
                #{t}
              </span>
            ))}
          </div>

          <button
            onClick={() => onRead(post)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-neutral-800 hover:text-emerald-600 dark:text-neutral-200 dark:hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            id={`read-article-btn-${post.id}`}
          >
            READ_ARTICLE //
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
