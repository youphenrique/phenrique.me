import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { css } from "@/panda/css";
import type { Languages } from "@/types/app";
import { TopMenu } from "@/app/[lang]/linkbio/_components/top-menu";
import { getLinkbioPage } from "@/app/[lang]/linkbio/_utils/content";
import { SocialLinks } from "@/app/[lang]/linkbio/_components/social-links";
import { Presentation } from "@/app/[lang]/linkbio/_components/presentation";

export async function generateMetadata(props: Pick<PageProps<"/[lang]/linkbio">, "params">): Promise<Metadata> {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const linkbioPage = getLinkbioPage(displayLanguage);
  const imageUrl = `https://assets.basehub.com/f4f66b1c/e92b9d5936efdd1b7839ce9c56af1b62/opengraph-image.png`;

  return {
    title: "Linkbio",
    description: linkbioPage?.metadata.description ?? "Check out Paulo Henrique's Linkbio",
    ...(linkbioPage !== undefined && {
      openGraph: {
        title: "Linkbio",
        images: [
          {
            width: 1200,
            height: 630,
            url: imageUrl,
          },
        ],
      },
    }),
    ...(linkbioPage !== undefined && {
      twitter: {
        title: "Linkbio",
        description: linkbioPage.metadata.description,
        images: [{ url: imageUrl }],
      },
    }),
  };
}

type LinkbioPageProps = Pick<PageProps<"/[lang]/linkbio">, "params">;

export default async function LinkbioPage(props: LinkbioPageProps) {
  const displayLanguage = ((await props.params)?.lang ?? "en") as Languages;

  const linkbioPage = getLinkbioPage(displayLanguage);

  if (linkbioPage === undefined) {
    notFound();
  }

  return (
    <>
      <div
        className={css({
          inset: 0,
          zIndex: -1,
          color: "white",
          position: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(0, 0, 0)",
          _before: {
            top: 0,
            content: "''",
            width: "100%",
            height: "100%",
            position: "fixed",
            filter: "blur(40px)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: { base: 0.15, md: 0.4 },
            backgroundPosition: "center 20%",
            backgroundImage: 'url("/images/me-bg.linkbio.png")',
          },
          _after: {
            top: 0,
            content: "''",
            width: "100%",
            height: "100%",
            opacity: 0.25,
            position: "fixed",
            mixBlendMode: "overlay",
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgNTEyIDUxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KICA8ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+CiAgICA8ZmVUdXJidWxlbmNlIAogICAgICB0eXBlPSdmcmFjdGFsTm9pc2UnIAogICAgICBiYXNlRnJlcXVlbmN5PScwLjcnCiAgICAgIG51bU9jdGF2ZXM9JzMnIAogICAgICBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+CiAgICA8ZmVDb2xvck1hdHJpeCBpbj0idHVyYnVsZW5jZSIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPgoKICAgIDxmZUNvbXBvbmVudFRyYW5zZmVyPgogICAgICA8ZmVGdW5jUiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIgLz4KICAgICAgPGZlRnVuY0cgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDEiIC8+CiAgICAgIDxmZUZ1bmNCIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAxIiAvPgogICAgPC9mZUNvbXBvbmVudFRyYW5zZmVyPgogIDwvZmlsdGVyPgogIAogIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz4KPC9zdmc+")`,
          },
        })}
      />
      <main
        className={css({
          px: 6,
          py: 8,
          zIndex: 1,
          maxWidth: "xl",
          margin: "0 auto",
          position: "relative",
        })}
      >
        <TopMenu displayLanguage={displayLanguage} />
        <Presentation linkbioPage={linkbioPage} displayLanguage={displayLanguage} />
        <SocialLinks linkbioPage={linkbioPage} />
      </main>
    </>
  );
}
