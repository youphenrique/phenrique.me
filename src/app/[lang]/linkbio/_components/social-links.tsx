import Image from "next/image";

import { css } from "@/panda/css";
import { vstack } from "@/panda/patterns";
import type { LinkbioPage } from "content-collections";

type SocialLinksProps = {
  linkbioPage: LinkbioPage;
};

export async function SocialLinks(props: SocialLinksProps) {
  return (
    <div
      className={vstack({
        alignItems: "stretch",
        marginTop: { base: 12, md: 16 },
      })}
    >
      {props.linkbioPage.socialLinks.map((item, idx) => (
        <a
          key={idx}
          target="_blank"
          href={item.link}
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
            <Image src={item.logoUrl} width={32} height={32} alt={`${item.name} logo`} />
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
              {item.name}
            </span>
            <span
              className={css({
                fontSize: "sm",
                textAlign: "left",
                color: "#fffcf4b0",
                fontWeight: "medium",
              })}
            >
              {item.slug}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
