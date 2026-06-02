import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaCheckCircle, FaMapMarkerAlt, FaClock, FaBoxOpen } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import PageHero from "../components/PageHero";
import { trackingData } from "../data/index";
import { fadeUp } from "../animations/variants";
import { useSEO } from "../hooks/useSEO";

const SAMPLE_AWBS = ["VX2024001", "VX2024002", "VX2024003"];

const statusConfig = {
  delivered:  { label:"Delivered",  color:"text-green-700", bg:"bg-green-50 border-green-200" },
  in_transit: { label:"In Transit", color:"text-navy",      bg:"bg-navy-50 border-navy/30" },
  picked_up:  { label:"Picked Up",  color:"text-orange",    bg:"bg-orange-50 border-orange/30" },
};

export default function Track() {
  useSEO({ title:"Track Shipment", description:"Track your VEXARO shipment live. Enter your AWB number for real-time status." });
  const [awb, setAwb] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    const val = awb.trim().toUpperCase();
    if (!val) { setError("Please enter a tracking number."); return; }
    setLoading(true); setError(""); setResult(null);
    setTimeout(() => {
      const data = trackingData[val];
      if (data) setResult(data);
      else setError("Tracking number not found. Try: VX2024001, VX2024002, or VX2024003");
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <PageHero title="Track Your Shipment" subtitle="Enter your AWB number to get real-time status on your delivery." breadcrumb="Track Shipment"/>

      <section className="section-padding bg-white flex-1" style={{ minHeight:"60vh" }}>
        <div className="container-custom max-w-2xl">
          {/* Search box */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="bg-light-blue border border-soft-border rounded-card p-6 mb-7">
            <label className="block text-sm font-semibold font-heading text-charcoal mb-2">AWB / Tracking Number</label>
            <div className="flex gap-3">
              <input type="text" value={awb}
                onChange={(e) => { setAwb(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="e.g. VX2024001"
                className="flex-1 px-4 py-3 border border-soft-border rounded-btn font-body text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition-all bg-white"/>
              <button onClick={handleTrack} disabled={loading}
                className="px-6 py-3 gradient-navy text-white font-semibold font-heading rounded-btn shadow-navy-sm hover:shadow-navy hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-70">
                {loading ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/> : <FaSearch size={13}/>}
                Track
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <span className="text-xs text-graphite/60 font-body">Try demo:</span>
              {SAMPLE_AWBS.map((s) => (
                <button key={s} onClick={() => { setAwb(s); setError(""); setResult(null); }}
                  className="text-xs text-navy font-semibold font-heading hover:text-orange transition-colors px-2 py-0.5 rounded bg-white border border-soft-border">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                className="bg-red-50 border border-red-200 text-red-700 rounded-card px-5 py-4 text-sm font-body mb-6">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.45}} className="space-y-5">
                {/* Header card */}
                <div className="bg-light-blue border border-soft-border rounded-card p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-graphite/60 text-xs font-body mb-1">Tracking Number</div>
                      <div className="text-charcoal font-bold font-heading text-xl">{result.awb}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-sm font-semibold font-heading ${statusConfig[result.status]?.bg} ${statusConfig[result.status]?.color}`}>
                      {statusConfig[result.status]?.label}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-soft-border">
                    {[
                      {label:"Origin",      val:result.origin,      icon:<FaMapMarkerAlt className="text-navy"   size={11}/>},
                      {label:"Destination", val:result.destination, icon:<FaMapMarkerAlt className="text-orange" size={11}/>},
                      {label:"Service",     val:result.service,     icon:<MdLocalShipping className="text-navy"  size={11}/>},
                      {label:"Weight",      val:result.weight,      icon:<FaBoxOpen className="text-orange"      size={11}/>},
                    ].map((info,i)=>(
                      <div key={i}>
                        <div className="flex items-center gap-1 text-graphite/60 text-xs font-body mb-1">{info.icon} {info.label}</div>
                        <div className="text-charcoal text-sm font-medium font-body">{info.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-navy text-sm font-body">
                    <FaClock size={12}/> {result.estimatedDelivery}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-soft-border rounded-card p-6">
                  <h3 className="font-bold font-heading text-charcoal mb-6">Shipment Timeline</h3>
                  {result.timeline.map((step, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i < result.timeline.length - 1 && (
                        <div className={`absolute left-4 top-8 w-0.5 h-7 ${step.done ? "bg-navy/30" : "bg-soft-border"}`}/>
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 mt-0.5 ${step.done ? "gradient-orange shadow-orange-sm" : "bg-cream border-2 border-soft-border"}`}>
                        {step.done ? <FaCheckCircle size={12} className="text-white"/> : <div className="w-2 h-2 rounded-full bg-graphite/20"/>}
                      </div>
                      <div className="pb-6 flex-1">
                        <div className={`font-semibold font-heading text-sm ${step.done ? "text-charcoal" : "text-graphite/40"}`}>{step.step}</div>
                        {step.done ? (
                          <>
                            <div className="text-graphite text-xs font-body">{step.date}</div>
                            {step.location && <div className="text-graphite/60 text-xs font-body flex items-center gap-1 mt-0.5"><FaMapMarkerAlt size={9} className="text-orange"/>{step.location}</div>}
                          </>
                        ) : <div className="text-graphite/35 text-xs font-body">Pending</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
