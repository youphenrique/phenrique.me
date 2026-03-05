import { css } from "@/panda/css";

export function TopMenuSkeleton() {
  return (
    <div
      className={css({
        mb: 6,
        display: "flex",
        justifyContent: "flex-end",
      })}
    >
      <div
        className={css({
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          animation: "pulse-custom 1.5s infinite ease-in-out",
        })}
      />
    </div>
  );
}
