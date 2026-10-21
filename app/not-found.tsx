import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-urbanist pt-32 pb-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-6">
        ✦ Error 404
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161616] mb-4">
        Page not found
      </h1>
      <p className="text-base sm:text-lg text-[#6B6F76] max-w-md mx-auto mb-8">
        The page you are looking for doesn&apos;t exist or has been moved to a new URL.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all shadow-xs active:scale-95"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
