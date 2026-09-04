type TimelineItem = { year: string; text: string };

export function LegacyTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mx-auto mt-10 hidden max-w-5xl overflow-x-auto rounded-2xl bg-white px-10 py-36 md:block">
      <div className="relative flex min-w-[980px] items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-klr-red/30" />
        {items.map((item, i) => {
          const above = i % 2 === 0;
          return (
            <div key={item.year} className="relative flex flex-1 flex-col items-center">
              {above && (
                <div className="absolute bottom-[calc(50%+10px)] flex w-36 flex-col items-center gap-2">
                  <p className="text-center text-xs leading-snug text-black/70">{item.text}</p>
                  <div className="h-6 w-px bg-black/20" />
                </div>
              )}
              <span className="z-10 size-3.5 rounded-full border-2 border-klr-red bg-white" />
              {above ? (
                <span className="absolute top-[calc(50%+14px)] text-lg font-semibold text-klr-red">
                  {item.year}
                </span>
              ) : (
                <div className="absolute top-[calc(50%+10px)] flex w-36 flex-col items-center gap-2">
                  <div className="h-6 w-px bg-black/20" />
                  <span className="text-lg font-semibold text-klr-red">{item.year}</span>
                  <p className="text-center text-xs leading-snug text-black/70">{item.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
