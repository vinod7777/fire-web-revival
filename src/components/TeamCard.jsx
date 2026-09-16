import React, { useState, useRef, memo } from "react";

const TeamCard = memo(({ member }) => {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const textRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);

  const imageSrc = member.image
    ? member.image.startsWith("/")
      ? `${import.meta.env.BASE_URL}${member.image.slice(1)}`
      : member.image
    : null;

  const initials = member.name
    ? member.name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AV";

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.transition = "none";
      if (textRef.current) textRef.current.style.transition = "none";
      if (glareRef.current) {
        glareRef.current.style.opacity = "0.45"; // Softened cursor light
        glareRef.current.style.transition = "opacity 0.25s ease";
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current || !cardRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = rectRef.current;
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = (mouseX / rect.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / rect.height - 0.5) * 2; // -1 to 1

      const rotateY = xPct * 12; // deg
      const rotateX = -yPct * 12; // deg

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = "translateZ(30px) translateY(-2px)";
      }

      if (glareRef.current) {
        const glareX = ((xPct + 1) / 2) * 100;
        const glareY = ((yPct + 1) / 2) * 100;
        // Subtle, decreased cursor glow: softer alpha and tighter radius
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(34, 211, 238, 0.14) 0%, transparent 45%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rectRef.current = null;

    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }

    if (textRef.current) {
      textRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      textRef.current.style.transform = "translateZ(0px) translateY(0px)";
    }

    if (glareRef.current) {
      glareRef.current.style.transition = "opacity 0.4s ease";
      glareRef.current.style.opacity = "0";
    }
  };

  const gradientId = `beam-grad-${member.id}`;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-cyan-500/20 hover:border-cyan-400/70 bg-slate-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(34,211,238,0.15)] flex flex-col will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        contentVisibility: "auto",
        containIntrinsicSize: "280px 380px",
      }}
    >
      {/* Animated SVG Border Beam */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      >
        <rect
          width="100%"
          height="100%"
          rx="16"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeDasharray="140 1500"
          style={{
            animation: "borderBeamMove 4s linear infinite",
            animationDelay: `${((member.id * 0.25) % 4).toFixed(2)}s`,
            willChange: "stroke-dashoffset",
          }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="45%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtly decreased cursor glare effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 z-25 pointer-events-none rounded-2xl opacity-0 mix-blend-overlay transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.14) 0%, transparent 45%)",
        }}
      />

      {/* Team Member Image / Avatar Container */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#050e1d] overflow-hidden"
        style={{ transform: "translateZ(0)" }}
      >
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={member.name}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            style={{ willChange: "transform, filter" }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-cyan-950/30 to-slate-950">
            <div className="w-20 h-20 rounded-full border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:scale-110 group-hover:border-cyan-400 transition-transform duration-300">
              <span className="text-2xl font-display font-black text-cyan-300 tracking-wider">
                {initials}
              </span>
            </div>
          </div>
        )}

        {/* Bottom vignette overlay only behind text, leaving the portrait crystal clear and full color */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pointer-events-none" />
      </div>

      {/* Text Container with 3D Pop-Out */}
      <div 
        ref={textRef}
        className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end items-center text-center z-40 h-44 pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Role Label */}
        <div className="mb-2.5 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          {member.role}
        </div>

        <h3 className="text-base md:text-lg font-display font-black text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2">
          {member.name}
        </h3>
        <p className="text-cyan-400/90 font-mono text-xs md:text-sm font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {member.dept}
        </p>
      </div>
    </div>
  );
});

TeamCard.displayName = "TeamCard";

export default TeamCard;
