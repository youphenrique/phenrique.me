import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Vollkorn } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/ui/styles/base.css";
import { css } from "@/panda/css";
import type { Languages } from "@/app/_types/app";
import { getMetadata } from "@/app/_utils/content";
import { ProviderClient } from "@/app/_components/provider.client";
import { themeEffect } from "@/app/_utils/theme-effect";

const vollkorn = Vollkorn({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export async function generateMetadata(props: Pick<PageProps<"/[lang]/linkbio">, "params">): Promise<Metadata> {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const metadata = getMetadata(displayLanguage);
  const imageUrl = `${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORAGE_URL}/opengraph-image.webp`;

  const title = metadata?.title ?? "Paulo Henrique";
  const description = metadata?.description ?? "Paulo Henrique's personal website";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Paulo Henrique",
      title: {
        template: "%s − Paulo Henrique",
        default: title,
      },
      images: [
        {
          width: 1200,
          height: 630,
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: {
        template: "%s − Paulo Henrique",
        default: title,
      },
      description,
      site: "@youphenrique",
      creator: "@youphenrique",
      images: [{ url: imageUrl }],
    },
  };
}

export default function AppLayout(props: Readonly<React.PropsWithChildren>) {
  return (
    <html
      lang="en"
      className={[GeistSans.className, GeistMono.className, vollkorn.className].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`,
          }}
        />
      </head>
      <body className={css({ fontFamily: "GeistSans" })}>
        <ProviderClient>{props.children}</ProviderClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
