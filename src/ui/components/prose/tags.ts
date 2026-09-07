/**
 * Component tags that Markdown content may invoke with `::name`.
 *
 * Kept in its own module, free of React and of `styled-system`, so the parse
 * step can import it to validate a document without pulling the renderers into
 * the build graph. Every entry here must have a matching renderer in
 * `createProseComponents`; `assertKnownComponents` fails the build otherwise.
 */
export const PROSE_COMPONENT_TAGS = new Set(["callout", "aside", "scripture", "figure"]);
