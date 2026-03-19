import { container } from "@/panda/patterns";
import { css, type Styles } from "@/panda/css";

type OuterContainerProps = React.PropsWithChildren<{
  noiseBackground?: boolean;
  styles?: {
    root: Styles;
    content: Styles;
  };
}>;

export function OuterContainer(props: OuterContainerProps) {
  const { noiseBackground = true } = props;
  const outerContainerStyles = container.raw({
    w: "full",
    maxW: { base: "full", md: "4xl", lg: "5xl", "2xl": "6xl" },
    px: { base: 0, md: 8 },
  });

  return (
    <div className={css(outerContainerStyles, props.styles?.root)} data-component="outer-container">
      <div
        className={css(
          {
            position: "relative",
            _before: {
              top: 0,
              left: 0,
              content: '""',
              opacity: 0.4,
              width: "100%",
              height: "100%",
              position: "absolute",
              background: "url('/images/noise.png')",
              display: noiseBackground ? "block" : "none",
            },
          },
          props.styles?.content,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
