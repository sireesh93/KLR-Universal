import Image from "next/image";

export function VideoSection() {
  return (
    <section className="relative h-[420px] overflow-hidden bg-klr-dark md:h-[560px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/sites/klruniversal-com-3601ad32/root-8a5edab2/videos/earth-bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute right-6 top-6">
        <Image
          src="/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-klr.svg"
          alt="KLR Universal"
          width={40}
          height={38}
          className="opacity-90 brightness-0 invert"
        />
      </div>
    </section>
  );
}
