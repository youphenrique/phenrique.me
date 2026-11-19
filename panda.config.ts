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
           * Neutrals, light half. Light-mode surfaces read down from
           * `paper.50`; dark-mode text reads up from `paper.500`.
           * `paper` and `graphite` are one continuous ramp split at the
           * midpoint, because each theme draws from one half only.
           *
           * Near-neutral on purpose (OKLCH chroma ≤ 0.004, a whisper of warmth).
           * The previous cream ramp (#F0EEE6, #FAF6F2) was claude.ai's own canvas;
           * warmth now comes from the accent, not from every surface.
           */
          paper: {
            0: { value: "#FFFFFF" }, // code panel (light) — top of the surface ramp
            50: { value: "#FAFAF9" }, // app canvas (light)
            100: { value: "#F7F7F5" }, // sunken (light)
            200: { value: "#F4F4F2" }, // raised surface (light)
            300: { value: "#ECECEA" }, // hover (light), primary text (dark)
            400: { value: "#E0E0DC" }, // default border (light)
            500: { value: "#C2C2BD" }, // strong border (light), secondary text (dark)
          },

          /**
           * Neutrals, dark half. Dark-mode surfaces read up from
           * `graphite.950`; light-mode text reads down from `graphite.400`.
           */
          graphite: {
            300: { value: "#A1A19C" }, // muted text (dark)
            400: { value: "#878782" }, // decorative / disabled only — 3.5:1 on paper.50
            500: { value: "#6B6B66" }, // muted text (light)
            600: { value: "#52524E" }, // secondary text (light)
            700: { value: "#3A3A37" }, // strong border (dark)
            800: { value: "#262625" }, // default border (dark), hover (dark)
            850: { value: "#1C1C1B" }, // primary text (light), raised-hover (dark)
            900: { value: "#151514" }, // raised surface (dark)
            950: { value: "#0B0B0A" }, // app canvas (dark)
          },

          /**
           * Brand accent. `vermilion.500` is the fixed brand value — a saturated
           * signal orange, deliberately far from the dusty clay it replaced. It is
           * only 3.0:1 on `paper.50`, so it never carries small text in light
           * mode: `vermilion.600` (oxide, 5.9:1) does. The jump between the two
           * is intentional — one is a fill, the other is ink.
           */
          vermilion: {
            50: { value: "#FFF1EA" },
            100: { value: "#FFDCC9" },
            200: { value: "#FFBE9C" },
            300: { value: "#FF9A66" },
            400: { value: "#FF7A33" },
            500: { value: "#FF5B04" }, // brand
            600: { value: "#A93F17" }, // accessible on light surfaces
            700: { value: "#84310F" },
            800: { value: "#5C220B" },
            900: { value: "#3A1607" },
            950: { value: "#220D04" },
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

          /**
           * Syntax hues, behind `syntax.*` only. Purpose-built like `signal`: a
           * deep step for the light theme, a bright step for the dark one. They
           * are not the editorial tints on purpose — the tints share one lightness
           * so badges read as a quiet set, which is exactly what makes code
           * illegible. `scripts/check-syntax-colors.ts` holds every pair to 5:1 on
           * `bg.raised` and a minimum distance from each other; run it after a tweak.
           */
          code: {
            plum: { value: "#9A2F6B" },
            plumBright: { value: "#E68BC0" },
            green: { value: "#2E6B3A" },
            greenBright: { value: "#A3CF8C" },
            vermilion: { value: "#A8401B" },
            vermilionBright: { value: "#F0A070" },
            blue: { value: "#2C56A8" },
            blueBright: { value: "#8DB2F2" },
            amber: { value: "#855700" },
            amberBright: { value: "#E3C173" },
            // Comment neutral for the light theme: 6.0:1 on `bg.code`, a step lighter
            // than `graphite.600` so it stays distinct from punctuation.
            stone: { value: "#63635E" },
          },

          /** Official gov.br digital brand colours (Manual da Marca v3). */
          govbr: {
            blue: { value: "#377EC1" },
            green: { value: "#52AE32" },
            yellow: { value: "#FBBA00" },
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
            canvas: { value: { base: "{colors.paper.50}", _dark: "{colors.graphite.950}" } },
            raised: { value: { base: "{colors.paper.200}", _dark: "{colors.graphite.900}" } },
            raisedHover: { value: { base: "{colors.paper.300}", _dark: "{colors.graphite.850}" } },
            // Code panel only (see `code-block.tsx`). Deliberately NOT `raised`:
            // a fenced block reads as a quoted artefact, and the references this
            // follows paint it crisp white rather than the grey surface cards,
            // sheets and the TOC rail share. Light mode inverts the usual stack
            // — the panel is *brighter* than the off-white canvas, and that is what
            // separates it. Dark mode keeps `graphite.900`: a lifted panel already
            // reads there, and going lighter would eat into the 5:1 floor the
            // syntax palette is held to.
            code: { value: { base: "{colors.paper.0}", _dark: "{colors.graphite.900}" } },
            sunken: { value: { base: "{colors.paper.100}", _dark: "{colors.graphite.900}" } },
            // Translucent wash for hover on an unknown surface. Deliberately not a
            // ramp step: it has to tint whatever it lands on.
            hover: { value: { base: "rgba(10, 10, 10, 0.05)", _dark: "rgba(255, 255, 255, 0.06)" } },
            // Track behind a progress fill.
            track: { value: { base: "{colors.paper.400}", _dark: "{colors.graphite.800}" } },
            // Blurred header pill. Alpha is required for the backdrop-filter.
            overlay: { value: { base: "rgba(250, 250, 249, 0.5)", _dark: "rgba(11, 11, 10, 0.55)" } },
            // Modal backdrop behind a sheet.
            scrim: { value: { base: "rgba(10, 10, 10, 0.32)", _dark: "rgba(0, 0, 0, 0.5)" } },
            // Radial bloom behind the home hero; invisible by design in light mode.
            bloom: { value: { base: "rgba(255, 255, 255, 0)", _dark: "rgba(255, 255, 255, 0.03)" } },
            // Solid fill for a primary control: the canvas turned inside out, so
            // the pill reads as the darkest thing on a light page and the
            // lightest on a dark one. Pairs with `text.onInverted` and nothing
            // else — 16.3:1 light, 16.6:1 dark.
            inverted: { value: { base: "{colors.graphite.850}", _dark: "{colors.paper.300}" } },
            invertedHover: { value: { base: "{colors.graphite.950}", _dark: "{colors.paper.500}" } },
          },

          /** Foreground. Every role here clears 4.5:1 on `bg.canvas`. */
          text: {
            primary: { value: { base: "{colors.graphite.850}", _dark: "{colors.paper.300}" } }, // 16.3:1 / 16.6:1
            secondary: { value: { base: "{colors.graphite.600}", _dark: "{colors.paper.500}" } }, // 7.5:1 / 11.0:1
            muted: { value: { base: "{colors.graphite.500}", _dark: "{colors.graphite.300}" } }, // 5.1:1 / 7.6:1
            faint: { value: { base: "{colors.graphite.400}", _dark: "{colors.graphite.400}" } }, // decorative only
            accent: { value: { base: "{colors.vermilion.600}", _dark: "{colors.vermilion.500}" } }, // 5.9:1 / 6.3:1
            // vermilion.500 is too bright for light text (3.0:1); dark ink sits on it at 6.3:1.
            onAccent: { value: { base: "{colors.graphite.950}", _dark: "{colors.graphite.950}" } },
            // The only foreground allowed on `bg.inverted`.
            onInverted: { value: { base: "{colors.paper.50}", _dark: "{colors.graphite.950}" } },
          },

          /** Strokes. `subtle` and `underline` are translucent so they work on
           *  any surface; `default` and `strong` are solid ramp steps. */
          border: {
            subtle: { value: { base: "rgba(10, 10, 10, 0.12)", _dark: "rgba(255, 255, 255, 0.12)" } },
            default: { value: { base: "{colors.paper.400}", _dark: "{colors.graphite.800}" } },
            strong: { value: { base: "{colors.paper.500}", _dark: "{colors.graphite.700}" } },
            accent: { value: { base: "{colors.vermilion.500}", _dark: "{colors.vermilion.500}" } },
            // Keyboard focus ring. Deliberately not `accent`: vermilion.500 is 3.0:1 on
            // the light canvas — too close to the 3:1 a focus indicator needs.
            focus: { value: { base: "{colors.vermilion.600}", _dark: "{colors.vermilion.500}" } }, // 5.9:1 / 6.3:1
            underline: { value: { base: "rgba(10, 10, 10, 0.15)", _dark: "rgba(255, 255, 255, 0.3)" } },
            underlineHover: { value: { base: "rgba(10, 10, 10, 0.3)", _dark: "rgba(255, 255, 255, 0.55)" } },
            // Hairline between rows of a grouped list.
            hairline: { value: { base: "rgba(10, 10, 10, 0.09)", _dark: "rgba(255, 255, 255, 0.11)" } },
          },

          /** Brand accent as an interactive role. `default` is for fills,
           *  indicators and rings; text must go through `text.accent`. */
          accent: {
            default: { value: { base: "{colors.vermilion.500}", _dark: "{colors.vermilion.500}" } },
            hover: { value: { base: "{colors.vermilion.600}", _dark: "{colors.vermilion.400}" } },
            subtle: { value: { base: "{colors.vermilion.50}", _dark: "{colors.vermilion.950}" } },
            emphasis: { value: { base: "{colors.vermilion.700}", _dark: "{colors.vermilion.300}" } },
          },

          /** Status. Reserved for state, never decoration. */
          status: {
            success: { value: { base: "{colors.signal.green}", _dark: "{colors.signal.greenBright}" } },
            danger: { value: { base: "{colors.signal.red}", _dark: "{colors.signal.redBright}" } },
            rating: { value: { base: "{colors.ochre.500}", _dark: "{colors.ochre.400}" } },
            /**
             * Not final yet — a draft. A badge set (`surface`/`text`/`border`,
             * used together) on the ochre steps the tints use, so it inherits
             * their verified 4.5:1. It is its own role rather than borrowing
             * `tint.ochre`: tints classify content, this reports state. Amber
             * keeps it apart from the neutral grey of controls such as the
             * writing filter, which a neutral badge was mistaken for.
             */
            pending: {
              surface: { value: { base: "{colors.ochre.100}", _dark: "{colors.ochre.900}" } },
              text: { value: { base: "{colors.ochre.600}", _dark: "{colors.ochre.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.ochre.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.ochre.400} 26%, transparent)",
                },
              },
            },
          },

          /** Code highlighting. Shiki's css-variables theme writes every token as
           *  `var(--shiki-token-*)`; global.css binds those to these roles, so code
           *  switches theme with the rest of the page. Separated by lightness as
           *  well as hue: identifiers are near-black, colour sits at ~5–6:1, and
           *  comments recede without dropping under 4.5:1. */
          syntax: {
            text: { value: { base: "{colors.graphite.850}", _dark: "{colors.paper.300}" } }, // 17.1:1 / 15.4:1 on bg.code
            punctuation: { value: { base: "{colors.graphite.700}", _dark: "{colors.paper.500}" } },
            comment: { value: { base: "{colors.code.stone}", _dark: "{colors.graphite.300}" } }, // 6.0:1 / 7.0:1 on bg.code
            keyword: { value: { base: "{colors.code.plum}", _dark: "{colors.code.plumBright}" } },
            string: { value: { base: "{colors.code.green}", _dark: "{colors.code.greenBright}" } },
            constant: { value: { base: "{colors.code.vermilion}", _dark: "{colors.code.vermilionBright}" } },
            function: { value: { base: "{colors.code.blue}", _dark: "{colors.code.blueBright}" } },
            parameter: { value: { base: "{colors.code.amber}", _dark: "{colors.code.amberBright}" } },
            // Diff lines. `signal.green`/`red` miss 4.5:1 on `bg.raised` in light mode.
            inserted: { value: { base: "{colors.moss.600}", _dark: "{colors.signal.greenBright}" } },
            deleted: { value: { base: "{colors.vermilion.700}", _dark: "{colors.signal.redBright}" } },
            changed: { value: { base: "{colors.ochre.600}", _dark: "{colors.ochre.400}" } },
          },

          /** Fixed identity colours used by the brutils wordmark. */
          brand: {
            govbr: {
              blue: { value: "{colors.govbr.blue}" },
              green: { value: "{colors.govbr.green}" },
              yellow: { value: "{colors.govbr.yellow}" },
            },
          },

          /** iOS-style bottom sheet with inset grouped lists. The card is always
           *  lighter than the backdrop it sits on, in both themes. */
          sheet: {
            bg: { value: { base: "{colors.paper.200}", _dark: "{colors.graphite.900}" } },
            group: { value: { base: "{colors.paper.50}", _dark: "{colors.graphite.850}" } },
            groupActive: { value: { base: "{colors.paper.300}", _dark: "{colors.graphite.800}" } },
            grabber: { value: { base: "rgba(10, 10, 10, 0.18)", _dark: "rgba(255, 255, 255, 0.22)" } },
          },

          /** Content classification. `surface` + `text` (+ `border`) are a
           *  matched set — always use them together, never mix hues across a set.
           *  `border` is the text hue at low strength, so the ring reads as a
           *  slightly deeper edge of the same surface rather than an outline. */
          tint: {
            sage: {
              surface: { value: { base: "{colors.sage.100}", _dark: "{colors.sage.900}" } },
              text: { value: { base: "{colors.sage.600}", _dark: "{colors.sage.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.sage.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.sage.400} 26%, transparent)",
                },
              },
            },
            moss: {
              surface: { value: { base: "{colors.moss.100}", _dark: "{colors.moss.900}" } },
              text: { value: { base: "{colors.moss.600}", _dark: "{colors.moss.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.moss.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.moss.400} 26%, transparent)",
                },
              },
            },
            sky: {
              surface: { value: { base: "{colors.sky.100}", _dark: "{colors.sky.900}" } },
              text: { value: { base: "{colors.sky.600}", _dark: "{colors.sky.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.sky.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.sky.400} 26%, transparent)",
                },
              },
            },
            periwinkle: {
              surface: { value: { base: "{colors.periwinkle.100}", _dark: "{colors.periwinkle.900}" } },
              text: { value: { base: "{colors.periwinkle.600}", _dark: "{colors.periwinkle.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.periwinkle.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.periwinkle.400} 26%, transparent)",
                },
              },
            },
            clay: {
              surface: { value: { base: "{colors.clay.100}", _dark: "{colors.clay.900}" } },
              text: { value: { base: "{colors.clay.600}", _dark: "{colors.clay.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.clay.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.clay.400} 26%, transparent)",
                },
              },
            },
            ochre: {
              surface: { value: { base: "{colors.ochre.100}", _dark: "{colors.ochre.900}" } },
              text: { value: { base: "{colors.ochre.600}", _dark: "{colors.ochre.400}" } },
              border: {
                value: {
                  base: "color-mix(in oklab, {colors.ochre.600} 22%, transparent)",
                  _dark: "color-mix(in oklab, {colors.ochre.400} 26%, transparent)",
                },
              },
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
            textSecondary: { value: "rgba(255, 252, 244, 0.69)" },
            control: { value: "#27272A" },
            controlHover: { value: "#18181B" },
            menuSurface: { value: "#262626" },
            menuBorder: { value: "#252525" },
            menuItemHover: { value: "#404040" },
            // Keyboard focus ring: the same vermilion as `border.focus` in dark mode, so
            // focus reads the same across the site. 6.8:1 on the canvas, 4.8:1 on
            // `control` and 4.9:1 on `menuSurface`, 3.3:1 on a highlighted `menuItemHover`.
            focus: { value: "{colors.vermilion.500}" },
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
                base: "rgba(255, 255, 255, 0.55) 0 10px 24px 0, rgba(156, 165, 178, 0.35) 0 2px 6px 0, rgba(255, 255, 255, 0.06) 0 0 0 1px",
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
