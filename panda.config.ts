import { defineConfig } from "@pandacss/dev";

/**
 * Two-layer colour system.
 *
 *   Layer 1 — `theme.tokens.colors`: the raw palette. Fixed hues on fixed
 *             ramps. Never referenced from a component.
 *   Layer 2 — `theme.semanticTokens.colors`: role names bound to a
 *             light/dark pair. The only thing components are allowed to use.
 *
 * Full rationale, contrast ratios and usage rules: docs/design-system.md,
 * served publicly at /design.md.
 */
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,astro}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    // Everything lives under `extend` so it MERGES with Panda's preset theme.
    // A bare `theme.tokens` would replace the preset outright and take
    // fontSizes, sizes, radii and the default shadow scale with it.
    extend: {
      // -------------------------------------------------------------------
      // Layer 1 — raw palette
      // -------------------------------------------------------------------
      tokens: {
        colors: {
          /**
           * Warm neutrals, light half. Light-mode surfaces read down from
           * `sand.50`; dark-mode text reads up from `sand.500`.
           * `sand` and `ink` are one continuous ramp split at the midpoint,
           * because each theme draws from one half only.
           */
          sand: {
            50: { value: "#FAF6F2" }, // app canvas (light)
            100: { value: "#F5F1E8" },
            200: { value: "#F0EEE6" }, // raised surface (light)
            300: { value: "#E7E3D9" }, // hover / sunken (light), primary text (dark)
            400: { value: "#D9D3C6" }, // default border (light)
            500: { value: "#C4BDAE" }, // strong border (light), secondary text (dark)
          },

          /**
           * Warm neutrals, dark half. Dark-mode surfaces read up from
           * `ink.950`; light-mode text reads down from `ink.400`.
           */
          ink: {
            300: { value: "#A8A199" }, // muted text (dark)
            400: { value: "#8A837A" }, // decorative / disabled only — 3.5:1 on sand.50
            500: { value: "#6E675E" }, // muted text (light)
            600: { value: "#55504A" }, // secondary text (light)
            700: { value: "#3D3A36" }, // strong border (dark)
            800: { value: "#2C2A28" }, // default border (dark), hover (dark)
            850: { value: "#232120" }, // primary text (light), raised-hover (dark)
            900: { value: "#1A1918" }, // raised surface (dark)
            950: { value: "#0D0B0A" }, // app canvas (dark)
          },

          /**
           * Brand accent. `coral.500` is the fixed brand value; the ramp exists
           * so interactive states and — critically — small text have somewhere
           * accessible to go. `coral.500` is only 2.9:1 on `sand.50`, so it must
           * never carry small text in light mode. Use `coral.600` (4.7:1) there.
           */
          coral: {
            50: { value: "#FCF1EC" },
            100: { value: "#F7DED2" },
            200: { value: "#EFC2AE" },
            300: { value: "#E5A184" },
            400: { value: "#DF8968" },
            500: { value: "#D97757" }, // brand
            600: { value: "#B05334" }, // accessible on light surfaces
            700: { value: "#8C4128" },
            800: { value: "#63301F" },
            900: { value: "#3A1D13" },
            950: { value: "#241210" },
          },

          /**
           * Editorial tints — for classifying *content* (book genres, writing
           * tags, work chips), never for UI chrome. Four steps each: `100`/`900`
           * are surfaces (light/dark), `600`/`400` are the text that sits on
           * them. Each pair clears 4.5:1.
           */
          sage: {
            100: { value: "#DDE7E0" },
            400: { value: "#8FB39C" },
            600: { value: "#3F6B51" },
            900: { value: "#1B2E22" },
          },
          moss: {
            100: { value: "#DCE6DA" },
            400: { value: "#8CAE8F" },
            600: { value: "#3D6140" },
            900: { value: "#1A2A1B" },
          },
          sky: {
            100: { value: "#DAE5F2" },
            400: { value: "#8FB2D9" },
            600: { value: "#2F5D8C" },
            900: { value: "#16283D" },
          },
          periwinkle: {
            100: { value: "#E2E1F4" },
            400: { value: "#A9A5DE" },
            600: { value: "#4E4899" },
            900: { value: "#221F45" },
          },
          clay: {
            100: { value: "#F4E1D6" },
            400: { value: "#D9A184" },
            600: { value: "#8A4E2F" },
            900: { value: "#3A2016" },
          },
          ochre: {
            100: { value: "#F5E7CC" },
            400: { value: "#D4B36A" },
            500: { value: "#C89B3C" }, // star rating fill
            600: { value: "#7A5A1B" },
            900: { value: "#33260C" },
          },

          /** Diff / status hues. GitHub's, kept because they are purpose-built. */
          signal: {
            green: { value: "#1A7F37" },
            greenBright: { value: "#3FB950" },
            red: { value: "#CF222E" },
            redBright: { value: "#F85149" },
          },
        },
      },

      // ---------------------------------------------------------------------
      // Layer 2 — semantic roles
      // ---------------------------------------------------------------------
      semanticTokens: {
        colors: {
          /** Surfaces. `canvas` is the page; everything else stacks on it. */
          bg: {
            canvas: { value: { base: "{colors.sand.50}", _dark: "{colors.ink.950}" } },
            raised: { value: { base: "{colors.sand.200}", _dark: "{colors.ink.900}" } },
            raisedHover: { value: { base: "{colors.sand.300}", _dark: "{colors.ink.850}" } },
            sunken: { value: { base: "{colors.sand.100}", _dark: "{colors.ink.900}" } },
            // Translucent wash for hover on an unknown surface. Deliberately not a
            // ramp step: it has to tint whatever it lands on.
            hover: { value: { base: "rgba(10, 10, 10, 0.05)", _dark: "rgba(255, 255, 255, 0.06)" } },
            // Track behind a progress fill.
            track: { value: { base: "{colors.sand.400}", _dark: "{colors.ink.800}" } },
            // Blurred header pill. Alpha is required for the backdrop-filter.
            overlay: { value: { base: "rgba(250, 246, 242, 0.5)", _dark: "rgba(13, 11, 10, 0.55)" } },
            // Modal backdrop behind a sheet.
            scrim: { value: { base: "rgba(10, 10, 10, 0.32)", _dark: "rgba(0, 0, 0, 0.5)" } },
            // Radial bloom behind the home hero; invisible by design in light mode.
            bloom: { value: { base: "rgba(255, 255, 255, 0)", _dark: "rgba(255, 255, 255, 0.03)" } },
          },

          /** Foreground. Every role here clears 4.5:1 on `bg.canvas`. */
          text: {
            primary: { value: { base: "{colors.ink.850}", _dark: "{colors.sand.300}" } }, // 15.5:1 / 15.3:1
            secondary: { value: { base: "{colors.ink.600}", _dark: "{colors.sand.500}" } }, // 7.4:1 / 10.4:1
            muted: { value: { base: "{colors.ink.500}", _dark: "{colors.ink.300}" } }, // 5.3:1 / 7.7:1
            faint: { value: { base: "{colors.ink.400}", _dark: "{colors.ink.400}" } }, // decorative only
            accent: { value: { base: "{colors.coral.600}", _dark: "{colors.coral.500}" } }, // 4.7:1 / 6.3:1
            onAccent: { value: { base: "{colors.sand.50}", _dark: "{colors.sand.50}" } },
          },

          /** Strokes. `subtle` and `underline` are translucent so they work on
           *  any surface; `default` and `strong` are solid ramp steps. */
          border: {
            subtle: { value: { base: "rgba(10, 10, 10, 0.12)", _dark: "rgba(255, 255, 255, 0.12)" } },
            default: { value: { base: "{colors.sand.400}", _dark: "{colors.ink.800}" } },
            strong: { value: { base: "{colors.sand.500}", _dark: "{colors.ink.700}" } },
            accent: { value: { base: "{colors.coral.500}", _dark: "{colors.coral.500}" } },
            underline: { value: { base: "rgba(10, 10, 10, 0.15)", _dark: "rgba(255, 255, 255, 0.3)" } },
            underlineHover: { value: { base: "rgba(10, 10, 10, 0.3)", _dark: "rgba(255, 255, 255, 0.55)" } },
            // Hairline between rows of a grouped list.
            hairline: { value: { base: "rgba(10, 10, 10, 0.09)", _dark: "rgba(255, 255, 255, 0.11)" } },
          },

          /** Brand accent as an interactive role. `default` is for fills,
           *  indicators and rings; text must go through `text.accent`. */
          accent: {
            default: { value: { base: "{colors.coral.500}", _dark: "{colors.coral.500}" } },
            hover: { value: { base: "{colors.coral.600}", _dark: "{colors.coral.400}" } },
            subtle: { value: { base: "{colors.coral.50}", _dark: "{colors.coral.950}" } },
            emphasis: { value: { base: "{colors.coral.700}", _dark: "{colors.coral.300}" } },
          },

          /** Status. Reserved for machine-reported state, never decoration. */
          status: {
            success: { value: { base: "{colors.signal.green}", _dark: "{colors.signal.greenBright}" } },
            danger: { value: { base: "{colors.signal.red}", _dark: "{colors.signal.redBright}" } },
            rating: { value: { base: "{colors.ochre.500}", _dark: "{colors.ochre.400}" } },
          },

          /** iOS-style bottom sheet with inset grouped lists. The card is always
           *  lighter than the backdrop it sits on, in both themes. */
          sheet: {
            bg: { value: { base: "{colors.sand.200}", _dark: "{colors.ink.900}" } },
            group: { value: { base: "{colors.sand.50}", _dark: "{colors.ink.850}" } },
            groupActive: { value: { base: "{colors.sand.300}", _dark: "{colors.ink.800}" } },
            grabber: { value: { base: "rgba(10, 10, 10, 0.18)", _dark: "rgba(255, 255, 255, 0.22)" } },
          },

          /** Content classification. `surface` + `text` are a matched pair —
           *  always use them together, never mix hues across a pair. */
          tint: {
            sage: {
              surface: { value: { base: "{colors.sage.100}", _dark: "{colors.sage.900}" } },
              text: { value: { base: "{colors.sage.600}", _dark: "{colors.sage.400}" } },
            },
            moss: {
              surface: { value: { base: "{colors.moss.100}", _dark: "{colors.moss.900}" } },
              text: { value: { base: "{colors.moss.600}", _dark: "{colors.moss.400}" } },
            },
            sky: {
              surface: { value: { base: "{colors.sky.100}", _dark: "{colors.sky.900}" } },
              text: { value: { base: "{colors.sky.600}", _dark: "{colors.sky.400}" } },
            },
            periwinkle: {
              surface: { value: { base: "{colors.periwinkle.100}", _dark: "{colors.periwinkle.900}" } },
              text: { value: { base: "{colors.periwinkle.600}", _dark: "{colors.periwinkle.400}" } },
            },
            clay: {
              surface: { value: { base: "{colors.clay.100}", _dark: "{colors.clay.900}" } },
              text: { value: { base: "{colors.clay.600}", _dark: "{colors.clay.400}" } },
            },
            ochre: {
              surface: { value: { base: "{colors.ochre.100}", _dark: "{colors.ochre.900}" } },
              text: { value: { base: "{colors.ochre.600}", _dark: "{colors.ochre.400}" } },
            },
          },

          /**
           * /linkbio is a standalone dark page and does not follow the site
           * theme. Its tokens are single-valued on purpose: identical in light
           * and dark. Nothing outside src/views/linkbio and
           * src/layouts/linkbio-layout.astro may use them.
           */
          linkbio: {
            canvas: { value: "#000000" },
            surface: { value: "rgba(0, 0, 0, 0.65)" },
            border: { value: "rgba(255, 255, 255, 0.15)" },
            ring: { value: "rgba(243, 245, 247, 0.15)" },
            textPrimary: { value: "#EEEEEE" },
            textStrong: { value: "rgba(255, 255, 255, 0.85)" },
            textSecondary: { value: "rgba(255, 252, 244, 0.69)" },
            control: { value: "#27272A" },
            controlHover: { value: "#18181B" },
            menuSurface: { value: "#262626" },
            menuBorder: { value: "#252525" },
            menuItemHover: { value: "#404040" },
            separator: { value: "#3F3F46" },
            headingFrom: { value: "#F5F5F5" },
            headingTo: { value: "#999999" },
          },
        },

        shadows: {
          elevation: {
            /**
             * Header pill, lifted once the page scrolls or the mobile menu
             * opens. In light mode a wide cool-tinted ambient cast; in dark mode
             * the tint vanishes against the canvas, so a deeper black cast plus
             * a hairline rim of light does the lifting instead.
             */
            pill: {
              value: {
                base: "rgba(17, 12, 46, 0.15) 0 48px 100px 0",
                _dark: "rgba(0, 0, 0, 0.55) 0 48px 100px 0, rgba(255, 255, 255, 0.06) 0 0 0 1px",
              },
            },
            /** Hairline ring around the header avatar. */
            avatar: {
              value: {
                base: "0 0 0 1px rgba(119, 119, 119, 0.08), 0 2px 2px -0.5px rgba(119, 119, 119, 0.08)",
                _dark: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 2px -0.5px rgba(0, 0, 0, 0.4)",
              },
            },
            /** Side sheet (left/right/top). */
            sheet: {
              value: {
                base: "0 -16px 48px rgba(10, 10, 10, 0.18)",
                _dark: "0 -16px 48px rgba(0, 0, 0, 0.5)",
              },
            },
            /** Bottom sheet: a hairline top edge plus an upward cast. */
            sheetBottom: {
              value: {
                base: "0 -0.5px 0 rgba(10, 10, 10, 0.08), 0 -20px 60px rgba(10, 10, 10, 0.24)",
                _dark: "0 -0.5px 0 rgba(255, 255, 255, 0.08), 0 -20px 60px rgba(0, 0, 0, 0.6)",
              },
            },
            /**
             * Circular control lifted off a sheet surface. Mirrors the header
             * pill: a cool-tinted ambient cast in light mode, and in dark mode a
             * deeper black cast plus a hairline rim of light, since the tint
             * disappears against a dark canvas.
             */
            control: {
              value: {
                base: "rgba(255, 255, 255, 0.7) 1px 1px 1px inset, rgba(156, 165, 178, 0.35) -1px -1px 1px inset, rgba(156, 165, 178, 0.58) 12px 12px 36px, rgba(251, 252, 253, 0.81) -12px -12px 36px",
                _dark:
                  "rgba(0, 0, 0, 0.55) 0 10px 24px 0, rgba(0, 0, 0, 0.35) 0 2px 6px 0, rgba(255, 255, 255, 0.06) 0 0 0 1px",
              },
            },
            /** Same control settled toward the surface while held down. */
            controlPressed: {
              value: {
                base: "rgba(17, 12, 46, 0.12) 0 2px 6px 0",
                _dark: "rgba(0, 0, 0, 0.45) 0 2px 6px 0, rgba(255, 255, 255, 0.06) 0 0 0 1px",
              },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
