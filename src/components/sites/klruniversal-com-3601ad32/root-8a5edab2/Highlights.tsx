import Image from "next/image";
import { Reveal } from "../shared/Reveal";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const STATS = [
  {
    icon: "stat-icon-global-presence.svg",
    title: "Global Presence",
    text: "Active in 60+ countries",
  },
  {
    icon: "stat-icon-projects-delivered.svg",
    title: "Projects Delivered",
    text: "Over 4,500",
  },
  {
    icon: "stat-icon-recognition.svg",
    title: "Recognition",
    text: "ISO certified + industry awards",
  },
  {
    icon: "stat-icon-building-trust.svg",
    title: "Building Trust",
    text: "40+ years of strong customer relationships",
  },
  {
    icon: "stat-icon-always-on.svg",
    title: "We're Always On – 24/7",
    text: "Round-the-clock service and support",
  },
  {
    icon: "stat-icon-rnd.svg",
    title: "Focused R&D",
    text: "Constant innovation for greater efficiency",
  },
  {
    icon: "stat-icon-support.svg",
    title: "Dedicated Support",
    text: "End-to-end assistance—from first contact to after-sales care",
  },
];

export function Highlights() {
  return (
    <section className="bg-klr-red py-16 text-white">
      <div className="mx-auto max-w-[1400px] px-4 text-center md:px-8">
        <Reveal>
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            Decades of Delivery. Global in Reach. Trusted by Thousands.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            With over four decades of experience, KLR Universal has earned the
            trust of clients worldwide. Our numbers are more than
            metrics-they&rsquo;re milestones in reliability, performance, and
            commitment to the drilling industry.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.title}
              delay={i * 60}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <div className="flex h-full flex-col items-center gap-3 rounded-lg bg-klr-cream p-6 text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                <Image
                  src={`${ASSET_BASE}/${stat.icon}`}
                  alt=""
                  width={44}
                  height={44}
                />
                <p className="font-semibold text-klr-red">{stat.title}</p>
                <p className="text-sm text-black/70">{stat.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
