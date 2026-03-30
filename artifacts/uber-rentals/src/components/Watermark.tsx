export default function Watermark() {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 opacity-15 pointer-events-none select-none">
      <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
      <span className="text-white text-xs tracking-[0.2em] font-medium uppercase">
        Uber Rentals
      </span>
    </div>
  );
}
