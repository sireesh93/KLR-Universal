import { type SVGProps } from "react";

export function BeeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <ellipse
        cx="24"
        cy="17"
        rx="9"
        ry="7.5"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M15 27c0-6.5 3.5-11 9-11s9 4.5 9 11-3.5 12-9 12-9-5.5-9-12Z"
        fill="currentColor"
      />
      <path
        d="M15.5 23.5h17M14.6 28.5h18.8M15.7 33.5h16.6"
        stroke="var(--background, #fff)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="24" r="1.4" fill="var(--background, #fff)" />
      <path
        d="M24 16c-3-3.5-8-4.5-10.5-2S12 20 15.5 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M24 16c3-3.5 8-4.5 10.5-2S36 20 32.5 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <circle cx="20.5" cy="15" r="1.3" fill="currentColor" />
      <circle cx="27.5" cy="15" r="1.3" fill="currentColor" />
      <path
        d="M19 12.5c-1-1.4-1-3 .2-4M29 12.5c1-1.4 1-3-.2-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function HoneycombIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2 20 6.5v9L12 20 4 15.5v-9L12 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HoneyDropIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2c3.6 4.6 6.5 8.8 6.5 12.3A6.5 6.5 0 0 1 5.5 14.3C5.5 10.8 8.4 6.6 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.5 8.5h2V5.3c-.35-.05-1.55-.15-2.96-.15-2.98 0-4.54 1.79-4.54 4.9V13H6.5v3.5h2.5V21h3.5v-4.5h2.9L15.9 13h-3.4v-2.6c0-1.03.4-1.9 2-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 4l7 8.5L4.5 20H7l5-6 5.5 6H20l-7.3-8.7L19.5 4H17l-4.6 5.4L7 4H4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HoneycombPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 174"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <defs>
        <pattern
          id="honeycomb-tile"
          width="50"
          height="86.6"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M25 0 50 14.4V43.3L25 57.7 0 43.3V14.4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M25 57.7 50 72.1v14.5L25 86.6 0 72.1V72.1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </pattern>
      </defs>
      <rect width="200" height="174" fill="url(#honeycomb-tile)" />
    </svg>
  );
}
