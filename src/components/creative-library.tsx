"use client";

import { useMemo, useState } from "react";
import {
  angles,
  brandKitDefaults,
  categories,
  compliancePrinciples,
  creativeItems,
  formats,
  libraryStats,
  workflowSteps,
} from "@/lib/library";

type BrandKit = typeof brandKitDefaults;

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function downloadPack(itemId: string, brandKit: BrandKit, note: string) {
  const item = creativeItems.find((creative) => creative.id === itemId);
  if (!item) return;

  const payload = {
    brandKit,
    note,
    creative: item,
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${item.id}-creative-pack.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function CreativeLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [angle, setAngle] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");
  const [selectedId, setSelectedId] = useState(creativeItems[0]?.id ?? "");
  const [brandKit, setBrandKit] = useState<BrandKit>(brandKitDefaults);
  const [editNote, setEditNote] = useState(
    "Swap logo, service area, and offer before sending this pack to a client."
  );

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase();

    return creativeItems.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.title,
          item.publisher,
          item.hook,
          item.summary,
          item.copy.headline,
          item.copy.primaryText,
          item.category,
          item.angle,
          item.format,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesCategory = category === "All" || item.category === category;
      const matchesAngle = angle === "All" || item.angle === angle;
      const matchesFormat = format === "All" || item.format === format;

      return matchesSearch && matchesCategory && matchesAngle && matchesFormat;
    });
  }, [query, category, angle, format]);

  const selectedItem = useMemo(() => {
    if (!filteredItems.length) {
      return undefined;
    }

    return filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0];
  }, [filteredItems, selectedId]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.22),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.2),_transparent_32%)]" />
      <div className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-4">
            {libraryStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
                  Prebuilt Creative Library
                </p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  Search proven power washing ads without starting from scratch.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Users land on a curated library of remixed Facebook creative packs,
                  already researched, already structured, and ready to brand for their own
                  company.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                Inspiration only. Rewritten, branded, and export-ready.
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Search the library
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="House wash, roof clean, social proof, before/after..."
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/20"
                />
              </label>

              <div className="grid gap-3 lg:grid-cols-3">
                <FilterGroup
                  label="Offer"
                  value={category}
                  options={["All", ...categories]}
                  onChange={setCategory}
                />
                <FilterGroup
                  label="Angle"
                  value={angle}
                  options={["All", ...angles]}
                  onChange={setAngle}
                />
                <FilterGroup
                  label="Format"
                  value={format}
                  options={["All", ...formats]}
                  onChange={setFormat}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={classNames(
                    "group rounded-[1.85rem] border p-4 text-left transition",
                    "border-white/10 bg-transparent hover:-translate-y-0.5 hover:border-teal-300/50",
                    selectedItem?.id === item.id && "border-teal-300/60 bg-teal-300/5"
                  )}
                >
                  <AdPreview item={item} brandKit={brandKit} compact />
                </button>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-6 text-slate-300">
                <div className="text-base font-semibold text-white">No packs match those filters.</div>
                <p className="mt-2 max-w-xl">
                  Clear one or more filters or search a different service and angle to bring the library back into view.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    setAngle("All");
                    setFormat("All");
                  }}
                  className="mt-4 rounded-full bg-teal-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 transition hover:bg-teal-200"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <InfoPanel title="How users move through the platform" items={workflowSteps} />
            <InfoPanel title="Built-in guardrails" items={compliancePrinciples} />
          </div>
        </div>

        <div className="space-y-6">
          {selectedItem ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/85 p-4 backdrop-blur md:p-6">
              <div className="flex items-start justify-between gap-4 px-1 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-teal-300">
                    Selected creative pack
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{selectedItem.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {selectedItem.category} · {selectedItem.format} · {selectedItem.angle}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 px-3 py-2 text-right">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Trust cue
                  </div>
                  <div className="mt-1 text-sm font-medium text-amber-200">
                    {selectedItem.badge}
                  </div>
                </div>
              </div>

              <AdPreview item={selectedItem} brandKit={brandKit} />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  title="Research notes"
                  items={selectedItem.researchNotes}
                />
                <DetailCard
                  title="Deliverables"
                  items={selectedItem.deliverables}
                />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Visual direction
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {selectedItem.visualDirection}
                </p>
              </div>

              <div className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Edit note before export
                  </span>
                  <textarea
                    value={editNote}
                    onChange={(event) => setEditNote(event.target.value)}
                    rows={4}
                    className="resize-none rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300/60 focus:ring-2 focus:ring-orange-300/20"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => downloadPack(selectedItem.id, brandKit, editNote)}
                  className="inline-flex items-center justify-center rounded-full bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  Download creative pack
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBrandKit((current) => ({
                      ...current,
                      businessName: `${current.businessName} Studio`,
                    }));
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Edit in app
                </button>
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border border-white/10 bg-slate-900/85 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-orange-300">
                  Brand kit
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  One brand kit, many creative packs
                </h3>
              </div>
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${brandKit.primaryColor}, ${brandKit.accentColor})`,
                }}
              >
                {brandKit.logoLabel}
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <BrandField
                label="Business name"
                value={brandKit.businessName}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, businessName: value }))
                }
              />
              <BrandField
                label="Logo label"
                value={brandKit.logoLabel}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, logoLabel: value }))
                }
              />
              <BrandField
                label="Primary color"
                value={brandKit.primaryColor}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, primaryColor: value }))
                }
              />
              <BrandField
                label="Accent color"
                value={brandKit.accentColor}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, accentColor: value }))
                }
              />
              <BrandField
                label="Phone number"
                value={brandKit.phoneNumber}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, phoneNumber: value }))
                }
              />
              <BrandField
                label="Service area"
                value={brandKit.serviceArea}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, serviceArea: value }))
                }
              />
              <BrandField
                label="Offer"
                value={brandKit.offer}
                onChange={(value) =>
                  setBrandKit((current) => ({ ...current, offer: value }))
                }
              />
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Export preview
              </p>
              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <div className="text-sm font-medium text-white">{brandKit.businessName}</div>
                <p className="mt-2 text-sm text-slate-300">{brandKit.serviceArea}</p>
                <p className="mt-2 text-sm text-slate-300">{brandKit.offer}</p>
                <div
                  className="mt-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
                  style={{
                    background: `linear-gradient(135deg, ${brandKit.primaryColor}, ${brandKit.accentColor})`,
                  }}
                >
                  {brandKit.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdPreview({
  item,
  brandKit,
  compact = false,
}: {
  item: (typeof creativeItems)[number];
  brandKit: BrandKit;
  compact?: boolean;
}) {
  const palette = paletteFor(item.category);
  const body = compact
    ? item.summary
    : item.copy.primaryText;

  return (
    <article className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          Sponsored
        </span>
        <span>Facebook feed ad</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${brandKit.primaryColor}, ${brandKit.accentColor})`,
          }}
        >
          {brandKit.logoLabel}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">{item.publisher}</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Verified
            </span>
          </div>
          <p className="text-[12px] text-slate-500">
            {brandKit.serviceArea} · {item.socialProof}
          </p>
        </div>
        <div className="text-lg leading-none text-slate-400">···</div>
      </div>

      <div className="px-4 pb-4">
        <div
          className={classNames(
            "relative overflow-hidden rounded-[1.5rem] border border-slate-100",
            compact ? "h-[220px]" : "h-[360px]"
          )}
          style={{
            background: `linear-gradient(135deg, ${palette.left}, ${palette.right})`,
          }}
        >
          <CreativeScene item={item} compact={compact} />
        </div>

        <div className="space-y-3 px-1 pb-1 pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              {item.category}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              {item.angle}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              {item.format}
            </span>
          </div>

          <h4 className={classNames("font-semibold text-slate-950", compact ? "text-base" : "text-xl")}>
            {item.copy.headline}
          </h4>
          <p className={classNames("leading-6 text-slate-600", compact ? "text-[13px]" : "text-[15px]")}>
            {body}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${brandKit.primaryColor}, ${brandKit.accentColor})`,
              }}
            >
              {item.copy.cta}
            </button>
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {item.mediaLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
        <span>Like · Comment · Share</span>
        <span>{item.badge}</span>
      </div>
    </article>
  );
}

function CreativeScene({
  item,
  compact,
}: {
  item: (typeof creativeItems)[number];
  compact: boolean;
}) {
  const baseText = compact ? "Quick proof" : item.hook;

  switch (item.category) {
    case "House Wash":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative bg-[linear-gradient(180deg,_#2f3a44,_#1f2933)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),transparent_45%)]" />
              <div className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Before
              </div>
              <div className="absolute bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-black/35 p-3 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">Problem</p>
                <p className="mt-1 text-sm font-semibold">Siding stains and mildew</p>
              </div>
            </div>
            <div className="relative bg-[linear-gradient(180deg,_#bde8f4,_#dff7ff)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),transparent_34%)]" />
              <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                After
              </div>
              <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/60 bg-white/75 p-3 text-slate-900 shadow-lg shadow-slate-900/10">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Result</p>
                <p className="mt-1 text-sm font-semibold">Bright curb appeal</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-[1.4rem] border border-white/30 bg-white/25 px-4 py-3 text-center backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/85">House wash</div>
            <div className="mt-1 text-xl font-semibold text-white">{baseText}</div>
          </div>
        </div>
      );
    case "Roof Clean":
      return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,_#c6d4ea,_#7d95b8)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),transparent_36%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(160deg,_#4b5563_0%,_#303744_55%,_#1f2937_100%)] [clip-path:polygon(0_40%,100%_0,100%_100%,0_100%)]" />
          <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            Safe method
          </div>
          <div className="absolute right-6 top-6 rounded-full border border-white/40 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Roof care
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/35 bg-white/80 p-4 shadow-xl shadow-slate-900/15 backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
              {item.socialProof}
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-900">Low-pressure cleaning</div>
          </div>
        </div>
      );
    case "Driveway Clean":
      return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,_#4c5964,_#8c969d)]">
          <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_8px,transparent_8px,transparent_16px)]" />
          <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,_#676f76,_#a0a7ac)] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
          <div className="absolute left-5 top-5 rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Video reveal
          </div>
          <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-[1.4rem] border border-white/25 bg-white/20 p-4 text-center text-white backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/80">Watch the change</div>
            <div className="mt-1 text-2xl font-semibold">Before / After</div>
          </div>
          <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-[1.2rem] border border-white/30 bg-black/35 px-4 py-3 text-white backdrop-blur-sm">
            <span className="text-sm font-semibold">Oil stains removed</span>
            <span className="text-[10px] uppercase tracking-[0.22em]">{item.socialProof}</span>
          </div>
        </div>
      );
    case "Gutter Clean":
      return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,_#d7ece8,_#b9d8d1)]">
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,_#f4f7f8,_transparent)]" />
          <div className="absolute left-0 top-0 h-full w-full opacity-45 [background-image:linear-gradient(135deg,rgba(255,255,255,0.8)_0,rgba(255,255,255,0.8)_10px,transparent_10px,transparent_20px)]" />
          <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            Seasonal reminder
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/40 bg-white/85 p-4 shadow-xl shadow-slate-900/10">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Rain-ready home</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">Clear gutters before storms</div>
          </div>
        </div>
      );
    case "Fence / Deck":
      return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,_#efd8bf,_#d5a86b)]">
          <div className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(90deg,rgba(124,67,25,0.25)_0,rgba(124,67,25,0.25)_12px,transparent_12px,transparent_18px)]" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(180deg,_#8b5a2b,_#6f431c)] [clip-path:polygon(0_25%,100%_0,100%_100%,0_100%)]" />
          <div className="absolute right-6 top-6 rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Backyard upgrade
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/35 bg-white/80 p-4 text-slate-900 shadow-xl shadow-slate-900/10">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Fence + deck</div>
            <div className="mt-1 text-lg font-semibold">Restore the whole outdoor space</div>
          </div>
        </div>
      );
    case "Commercial":
      return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,_#d9e0e7,_#aab7c6)]">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.7)_0,rgba(255,255,255,0.7)_20px,transparent_20px,transparent_40px)]" />
          <div className="absolute inset-x-6 top-8 rounded-[1.35rem] border border-white/40 bg-white/85 p-4 text-slate-900 shadow-xl shadow-slate-900/10">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Commercial standard</div>
            <div className="mt-1 text-xl font-semibold">Clean storefronts. Reliable scheduling.</div>
          </div>
          <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between rounded-[1.25rem] border border-white/25 bg-slate-950/55 px-4 py-3 text-white backdrop-blur-sm">
            <span className="text-sm font-semibold">Insured and on-time</span>
            <span className="text-[10px] uppercase tracking-[0.22em]">{item.socialProof}</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 p-6 text-white">
          <div className="rounded-[1.35rem] border border-white/30 bg-white/15 p-4 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.24em]">{item.mediaLabel}</div>
            <div className="mt-2 text-xl font-semibold">{baseText}</div>
          </div>
        </div>
      );
  }
}

function paletteFor(category: string) {
  switch (category) {
    case "House Wash":
      return { left: "#173447", right: "#83d9ef" };
    case "Roof Clean":
      return { left: "#7e97b5", right: "#d9e6f5" };
    case "Driveway Clean":
      return { left: "#43515c", right: "#a7b0b7" };
    case "Gutter Clean":
      return { left: "#bfe2dd", right: "#e3f0ed" };
    case "Fence / Deck":
      return { left: "#c18b4a", right: "#f0d0ad" };
    case "Commercial":
      return { left: "#7d8da0", right: "#dae1ea" };
    default:
      return { left: "#607080", right: "#d8e4f0" };
  }
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={classNames(
              "rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition",
              value === option
                ? "border-teal-300/60 bg-teal-300 text-slate-950"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BrandField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300/60 focus:ring-2 focus:ring-orange-300/20"
      />
    </label>
  );
}
