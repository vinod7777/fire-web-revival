import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

// Gallery images mapping to files in /public/gallery
const galleryImages = [
  {
    id: 1,
    title: "Hackathon Kickoff",
    category: "Opening Ceremony",
    src: "/gallery/hackthon_kickoff.jpg",
    size: "large",
  },
  {
    id: 2,
    title: "Coding Session",
    category: "Sprint Hours",
    src: "/gallery/coding_session.jpg",
    size: "normal",
  },
  {
    id: 3,
    title: "Team Collaboration",
    category: "Innovation & Build",
    src: "/gallery/team_collaboration.jpg",
    size: "normal",
  },
  {
    id: 4,
    title: "Mentorship Hour",
    category: "Expert Guidance",
    src: "/gallery/mentor_hour.jpg",
    size: "tall",
  },
  {
    id: 5,
    title: "Prize Ceremony",
    category: "Celebrating Winners",
    src: "/gallery/prize_ceremony.jpg",
    size: "normal",
  },
  {
    id: 6,
    title: "Workshop Session",
    category: "Hands-on Tech",
    src: "/gallery/workshop_session.jpg",
    size: "large",
  },
  {
    id: 7,
    title: "Networking Event",
    category: "Community & Connections",
    src: "/gallery/networking_event.jpg",
    size: "normal",
  },
  {
    id: 8,
    title: "Demo Day",
    category: "Project Showcase",
    src: "/gallery/demo_day.jpg",
    size: "normal",
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length));
  }, []);

  const showPrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeImageIndex, showNext, showPrev]);

  const activeImage = activeImageIndex !== null ? galleryImages[activeImageIndex] : null;

  return (
    <section ref={ref} className="relative py-24 overflow-hidden min-h-[50vh]" id="gallery">
      <FloatingParticles count={40} />

      {/* Static Deep Ocean Ambient Light Glow — zero CPU/GPU scale calculations */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            Moments & Highlights
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            GALLERY
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Glimpses from our previous seasons — the energy, innovation, and unforgettable experiences.
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-water opacity-80" />
        </motion.div>

        {/* Bento Grid — Isolated Paint Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[190px] md:auto-rows-[230px]">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onClick={() => openLightbox(image.id - 1)}
              style={{ contain: "paint" }}
              className={`relative overflow-hidden group cursor-pointer rounded-2xl border border-cyan-500/25 bg-card/70 shadow-md hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 ${
                image.size === "large"
                  ? "col-span-2 row-span-2"
                  : image.size === "tall"
                  ? "row-span-2"
                  : ""
              }`}
            >
              {/* Actual Image */}
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (e.currentTarget.dataset.retried) return;
                  e.currentTarget.dataset.retried = "true";
                  if (e.currentTarget.src.endsWith(".jpg")) {
                    e.currentTarget.src = e.currentTarget.src.replace(/\.jpg$/, ".JPG");
                  } else if (e.currentTarget.src.endsWith(".JPG")) {
                    e.currentTarget.src = e.currentTarget.src.replace(/\.JPG$/, ".jpg");
                  }
                }}
                className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Dynamic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-75 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none" />

              {/* Subtle Holographic Hover Tint */}
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Permanent Bottom Badge & Title */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1 drop-shadow-sm">
                    {image.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground text-sm md:text-base group-hover:text-cyan-200 transition-colors drop-shadow-md">
                    {image.title}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center text-cyan-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Lightweight CSS Tech Corners — zero JS loops */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors duration-300 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => openLightbox(0)}
            className="btn-ocean neon-border font-display font-bold text-base md:text-lg px-8 py-4 inline-flex items-center gap-3"
            aria-label="View All Photos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-5 h-5 text-cyan-400" />
            <span className="relative z-10">VIEW ALL PHOTOS</span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-card/90 border border-cyan-500/40 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 bg-background/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {activeImage.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground text-base md:text-lg">
                    {activeImage.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                  <button
                    onClick={closeLightbox}
                    aria-label="Close Lightbox"
                    className="w-9 h-9 rounded-full bg-cyan-500/10 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center bg-black/50 p-2 md:p-6 min-h-[300px] max-h-[65vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage.id}
                    src={activeImage.src}
                    alt={activeImage.title}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onError={(e) => {
                      if (e.currentTarget.dataset.retried) return;
                      e.currentTarget.dataset.retried = "true";
                      if (e.currentTarget.src.endsWith(".jpg")) {
                        e.currentTarget.src = e.currentTarget.src.replace(/\.jpg$/, ".JPG");
                      } else if (e.currentTarget.src.endsWith(".JPG")) {
                        e.currentTarget.src = e.currentTarget.src.replace(/\.JPG$/, ".jpg");
                      }
                    }}
                    className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-cyan-500/20"
                  />
                </AnimatePresence>

                {/* Prev / Next Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous Image"
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 hover:bg-cyan-500/30 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next Image"
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 hover:bg-cyan-500/30 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="p-3 md:p-4 bg-background/60 backdrop-blur-md border-t border-border/60 overflow-x-auto flex gap-2.5 items-center justify-center">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Jump to ${img.title}`}
                    className={`relative w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 border ${
                      idx === activeImageIndex
                        ? "border-cyan-400 ring-2 ring-cyan-400/70 scale-105 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                        : "border-border/60 opacity-50 hover:opacity-100 hover:border-cyan-500/50"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      onError={(e) => {
                        if (e.currentTarget.dataset.retried) return;
                        e.currentTarget.dataset.retried = "true";
                        if (e.currentTarget.src.endsWith(".jpg")) {
                          e.currentTarget.src = e.currentTarget.src.replace(/\.jpg$/, ".JPG");
                        } else if (e.currentTarget.src.endsWith(".JPG")) {
                          e.currentTarget.src = e.currentTarget.src.replace(/\.JPG$/, ".jpg");
                        }
                      }}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

