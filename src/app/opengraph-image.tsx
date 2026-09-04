import { ImageResponse } from "next/og";

export const alt = "KLR Universal | Drilling Rigs & Drilling Tools Manufacturer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#da2129",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
            }}
          >
            KLR
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: 4,
            }}
          >
            UNIVERSAL
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 40,
            fontWeight: 500,
            color: "#ffffff",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Drilling Rigs &amp; Drilling Tools Manufacturer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          40+ years of engineering expertise &middot; Trusted in 60+ countries
        </div>
      </div>
    ),
    { ...size }
  );
}
