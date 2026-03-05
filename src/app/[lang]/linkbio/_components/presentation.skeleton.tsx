import { css } from "@/panda/css";

export function PresentationSkeleton() {
  return (
    <>
      <div
        className={css({
          mt: 2,
          mx: "auto",
          width: "70%",
          h: "1.125rem",
          borderRadius: "sm",
          maxWidth: { base: "sm", sm: "md" },
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          animation: "pulse-custom 1.5s ease-in-out infinite",
        })}
      />
      <div
        className={css({
          mt: 2,
          mx: "auto",
          width: "full",
          h: "1.125rem",
          borderRadius: "sm",
          maxWidth: { base: "sm", sm: "md" },
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          animation: "pulse-custom 1.5s ease-in-out infinite",
        })}
      />
    </>
  );
}
