import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { routing } from "@/i18n/routing";

export const alt = "John Enrique — Senior Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const copy = {
  "en": {
    availability: "OPEN TO SENIOR REMOTE ROLES · BRAZIL · UTC-3",
    role: "Senior Full-Stack Engineer",
    proof: [
      ["FinOpenPOS", "81 stars"],
      ["fiscal-rs", "1,834 tests"],
      ["NestJS", "12 merged PRs"],
      ["rust-agent-sdk", "793 tests"],
    ],
  },
  "pt-BR": {
    availability: "ABERTO A VAGAS REMOTAS SÊNIOR · BRASIL · UTC-3",
    role: "Engenheiro Full-Stack Sênior",
    proof: [
      ["FinOpenPOS", "81 estrelas"],
      ["fiscal-rs", "1.834 testes"],
      ["NestJS", "12 PRs mergeados"],
      ["rust-agent-sdk", "793 testes"],
    ],
  },
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  const fontsDir = path.join(process.cwd(), "src", "assets", "fonts");
  const [sansBold, sansMedium, mono] = await Promise.all([
    readFile(path.join(fontsDir, "SchibstedGrotesk-Bold.ttf")),
    readFile(path.join(fontsDir, "SchibstedGrotesk-Medium.ttf")),
    readFile(path.join(fontsDir, "JetBrainsMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101116",
          backgroundImage: "radial-gradient(#26272e 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
          padding: "72px 80px",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: 2,
            color: "#9adb2f",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#4ade80",
            }}
          />
          {t.availability}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ecedef",
              letterSpacing: -4,
            }}
          >
            John Enrique
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 500,
              color: "#8b8e98",
              letterSpacing: -2,
              marginTop: 4,
            }}
          >
            {t.role}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 56,
            rowGap: 18,
            borderTop: "1px solid #2a2b33",
            paddingTop: 36,
            fontFamily: "JetBrains Mono",
            fontSize: 24,
          }}
        >
          {t.proof.map(([label, value]) => (
            <div key={label} style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "#8b8e98" }}>{label}</span>
              <span style={{ color: "#ecedef" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: sansBold, weight: 700 },
        { name: "Schibsted Grotesk", data: sansMedium, weight: 500 },
        { name: "JetBrains Mono", data: mono, weight: 400 },
      ],
    }
  );
}
