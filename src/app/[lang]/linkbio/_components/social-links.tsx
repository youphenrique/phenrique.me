import Image from "next/image";
import { basehub } from "basehub";

import { css } from "@/panda/css";
import { vstack } from "@/panda/patterns";

export async function SocialLinks() {
  const data = await basehub().query({
    linkbio: {
      socialLinks: {
        items: {
          _title: true,
          mediaName: true,
          mediaSlug: true,
          mediaLink: true,
          mediaLogo: {
            on_BlockFile: {
              url: true,
            },
            on_BlockImage: {
              url: true,
              alt: true,
              width: true,
              height: true,
            },
          },
        },
      },
    },
  });

  return (
    <div
      className={vstack({
        alignItems: "stretch",
        marginTop: { base: 12, md: 16 },
      })}
    >
      {data.linkbio.socialLinks.items.map((item) => (
        <a
          key={item._title}
          target="_blank"
          href={item.mediaLink}
          className={css({
            py: 2,
            px: 4,
            display: "flex",
            borderRadius: "lg",
            border: "1px solid",
            alignItems: "center",
            borderColor: "hsla(0, 0%, 100%, .15)",
            backgroundColor: "rgba(0, 0, 0, .65)",
            transition: "transform 0.15s ease-in-out",
            _hover: {
              transform: "scale(1.02)",
            },
          })}
        >
          <span
            className={css({
              width: 8,
              display: "block",
            })}
          >
            <Image
              src={item.mediaLogo.url}
              // @ts-ignore
              width={item.mediaLogo.width ?? "32"}
              // @ts-ignore
              height={item.mediaLogo.height ?? "32"}
              // @ts-ignore
              alt={item.mediaLogo.alt ?? `${item.mediaName} logo`}
            />
          </span>
          <div
            className={css({
              ml: 4,
              display: "flex",
              flexDirection: "column",
            })}
          >
            <span
              className={css({
                color: "#EEE",
                textAlign: "left",
                fontWeight: "medium",
              })}
            >
              {item.mediaName}
            </span>
            <span
              className={css({
                fontSize: "sm",
                textAlign: "left",
                color: "#fffcf4b0",
                fontWeight: "medium",
              })}
            >
              {item.mediaSlug}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
