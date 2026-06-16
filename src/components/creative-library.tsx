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
                    "group rounded-3xl border p-5 text-left transition",
                    "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-teal-300/50 hover:bg-white/[0.07]",
                    selectedItem?.id === item.id && "border-teal-300/60 bg-teal-300/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-200">
                          {item.category}
                        </span>
                        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-300">
                          {item.angle}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-amber-200">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                  <p className="mt-4 text-sm font-medium text-teal-200">{item.hook}</p>
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
            <div className="rounded-3xl border border-white/10 bg-slate-900/85 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
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

              <div className="mt-5 rounded-3xl border border-teal-300/20 bg-teal-300/8 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-teal-200">Headline</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {selectedItem.copy.headline}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {selectedItem.copy.primaryText}
                </p>
                <div className="mt-4 inline-flex rounded-full bg-teal-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">
                  {selectedItem.copy.cta}
                </div>
              </div>

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
                <div className="mt-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
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
