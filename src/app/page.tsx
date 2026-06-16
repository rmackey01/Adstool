import { CreativeLibrary } from "@/components/creative-library";

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),_transparent_26%),linear-gradient(180deg,_#07111d_0%,_#09131f_45%,_#050a12_100%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-200">
              Power washing creative library
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                A curated Facebook creative shelf for power washing agencies.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Arrive to a done-for-you library of research-backed ad packs, then
                download them or make light brand edits before exporting. The
                platform is built to help your agency sell and deliver faster.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:max-w-xl">
            <HeroStat value="48+" label="creative packs" />
            <HeroStat value="6" label="service niches" />
            <HeroStat value="1 click" label="download workflow" />
          </div>
        </header>

        <CreativeLibrary />
      </div>
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-center shadow-lg shadow-black/20">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">
        {label}
      </div>
    </div>
  );
}
