import React, { useState } from "react";
import { BlogPost } from "../types";
import { ENGINEER_PROFILE } from "../data";
import { ArrowLeft, Calendar, Clock, Copy, Check, Bookmark, Share2, ThumbsUp, Send } from "lucide-react";
import { motion } from "motion/react";

interface BlogPostReaderProps {
  post: BlogPost;
  onBack: () => void;
}

export default function BlogPostReader({ post, onBack }: BlogPostReaderProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleCopyCode = (code: string, blockId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(blockId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Custom high-fidelity text parser for formatting markdown-style syntax elegantly
  const renderContentBlocks = (rawContent: string) => {
    const lines = rawContent.split("\n");
    const blocks: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: string) => {
      if (listBuffer.length > 0) {
        blocks.push(
          <ul key={key} className="my-5 pl-6 list-none space-y-2.5">
            {listBuffer.map((item, idx) => (
              <li key={idx} className="relative text-gray-700 dark:text-gray-300 text-base leading-relaxed pl-5">
                <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code Block Boundary
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // Close Code Block
          const codeString = codeBuffer.join("\n");
          const blockId = `code-block-${i}`;
          const currentLang = codeLanguage || "typescript";
          blocks.push(
            <div key={blockId} className="relative my-6 rounded-none border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] overflow-hidden font-mono text-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#111] text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider uppercase">
                <span>{currentLang}</span>
                <button
                  onClick={() => handleCopyCode(codeString, blockId)}
                  className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedId === blockId ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs md:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-mono">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // Open Code Block
          flushList(`list-before-code-${i}`);
          inCodeBlock = true;
          codeLanguage = line.trim().substring(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Headers (H3)
      if (line.startsWith("### ")) {
        flushList(`list-before-h3-${i}`);
        const text = line.substring(4).trim();
        blocks.push(
          <h3 key={`h3-${i}`} className="text-xl md:text-2xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white mt-8 mb-4 pt-4">
            {text}
          </h3>
        );
        continue;
      }

      // Headers (H2)
      if (line.startsWith("## ")) {
        flushList(`list-before-h2-${i}`);
        const text = line.substring(3).trim();
        blocks.push(
          <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white mt-10 mb-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            {text}
          </h2>
        );
        continue;
      }

      // Bullet Lists
      if (line.trim().startsWith("- ")) {
        const text = line.trim().substring(2).trim();
        listBuffer.push(text);
        continue;
      }

      // Numbered Lists
      if (/^\d+\.\s/.test(line.trim())) {
        flushList(`list-before-numbered-${i}`);
        const match = line.trim().match(/^(\d+)\.\s(.*)/);
        if (match) {
          const num = match[1];
          const text = match[2];
          blocks.push(
            <div key={`num-${i}`} className="flex gap-3.5 items-start my-3.5 pl-2">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">
                [{num}]
              </span>
              <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed pt-0.5">
                {text}
              </p>
            </div>
          );
        }
        continue;
      }

      // Paragraph text
      if (line.trim().length > 0) {
        flushList(`list-before-p-${i}`);
        blocks.push(
          <p key={`p-${i}`} className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed md:leading-loose my-5 font-sans">
            {line}
          </p>
        );
      }
    }

    // Edge case flush remaining lists
    flushList("final-list");

    return blocks;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 md:px-0 py-8 space-y-8"
      id="blog-post-reader"
    >
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
        id="back-to-blog-list-btn"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        RETURN_TO_ARCHIVE //
      </button>

      {/* Header and publication detail */}
      <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <span className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-neutral-50 dark:bg-[#090909]">
          {post.category}
        </span>
        
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-neutral-900 dark:text-white leading-none">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-neutral-400 dark:text-neutral-500">
          <div className="flex items-center gap-1.5 uppercase">
            <Calendar className="h-4 w-4 text-emerald-500" />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5 uppercase">
            <Clock className="h-4 w-4 text-emerald-500" />
            <span>{post.readTime}</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <div className="flex gap-2">
            {post.tags.map(t => (
              <span key={t} className="uppercase text-[10px] tracking-wider text-neutral-500 dark:text-neutral-400">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="h-64 md:h-96 w-full rounded-none overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <img
          src={post.imageUrl}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Readable Content */}
      <article className="prose prose-emerald max-w-none dark:prose-invert">
        {renderContentBlocks(post.content)}
      </article>

      {/* Article Utilities Footer */}
      <div className="flex flex-wrap items-center justify-between border-t border-b border-neutral-200 dark:border-neutral-800 py-6 my-10 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-none text-xs font-mono font-bold tracking-wider border transition-all cursor-pointer uppercase ${
              liked
                ? "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-400"
                : "border-neutral-200 text-neutral-600 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
            <span>{likesCount} LIKES</span>
          </button>
          
          <button className="p-2 rounded-none border border-neutral-200 text-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:hover:text-neutral-200 transition-colors cursor-pointer">
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <button className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer uppercase">
          <Bookmark className="h-3.5 w-3.5" />
          <span>Save reference</span>
        </button>
      </div>

      {/* Professional Newsletter Card */}
      <div className="rounded-none border border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-[#0E0E0E]">
        {subscribed ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-4 space-y-2"
          >
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-none border border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-2">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-black italic uppercase tracking-tight text-neutral-900 dark:text-white">SUBSCRIBED_SUCCESSFULLY</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Welcome to {ENGINEER_PROFILE.name}'s technical ledger. You will receive real-time, zero-spam engineering and systems design posts directly.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white">
              Subscribe to the Systems Engineering Ledger
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl">
              I publish articles on database engines, React internals, scale pipelines, and API latency optimization. Zero fluff, pure engineering deep dives.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@workplace.com"
                className="flex-1 rounded-none border border-neutral-250 bg-white px-4 py-2 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:border-neutral-800 dark:bg-[#070707] dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-none bg-emerald-600 hover:bg-emerald-700 px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase text-white transition-colors cursor-pointer"
              >
                Join ledger
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}
