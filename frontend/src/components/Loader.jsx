const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020815]">
      <div className="relative">
        {/* Outer Glow */}
        <div className="h-24 w-24 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin shadow-[0_0_40px_rgba(21,200,255,0.5)]" />

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan-300 font-black tracking-widest text-sm">
            ZENVORA
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;