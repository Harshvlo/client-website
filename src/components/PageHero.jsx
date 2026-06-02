import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaLocationArrow } from "react-icons/fa";
import { fadeUp } from "../animations/variants";

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="bg-light-blue pt-36 pb-16 relative overflow-hidden border-b border-soft-border">
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#1A3A8F_1px,transparent_1px),linear-gradient(to_bottom,#1A3A8F_1px,transparent_1px)] bg-[size:34px_34px]" />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-x-0 bottom-0 hidden h-32 md:block"
      >
        <svg viewBox="0 0 1200 160" className="h-full w-full" fill="none">
          <motion.path
            d="M0 118 C170 62 260 144 420 92 C585 38 700 120 850 74 C1010 26 1096 76 1200 42"
            stroke="url(#pageRoute)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="pageRoute" x1="0" x2="1200" y1="118" y2="42">
              <stop stopColor="#1A3A8F" stopOpacity=".15" />
              <stop offset=".5" stopColor="#E06000" stopOpacity=".5" />
              <stop offset="1" stopColor="#2855C8" stopOpacity=".15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-15%", "115%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-8 hidden h-10 w-10 items-center justify-center rounded-full gradient-orange shadow-orange md:flex"
      >
        <FaBoxOpen className="text-white" size={14} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ x: ["105%", "-10%"], opacity: [0, 0.65, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1.4 }}
        className="absolute left-0 top-24 h-px w-52 bg-gradient-to-r from-transparent via-navy/50 to-transparent"
      />
      <div className="container-custom relative">
        {breadcrumb && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-sm text-graphite/60 font-body mb-5"
          >
            <Link to="/" className="hover:text-navy transition-colors">Home</Link>
            <span className="text-graphite/30">/</span>
            <span className="text-orange font-medium">{breadcrumb}</span>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/75 px-3 py-1.5 shadow-card backdrop-blur-sm"
        >
          <FaLocationArrow className="text-orange" size={11} />
          <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-navy">
            VEXARO Network
          </span>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold font-heading text-charcoal mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay:0.1 }}
            className="text-graphite font-body text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.35,duration:0.6 }}
          className="mt-6 w-16 h-1 gradient-orange rounded-full origin-left"/>
      </div>
    </section>
  );
}
