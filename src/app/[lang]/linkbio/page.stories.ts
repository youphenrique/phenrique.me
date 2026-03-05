import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs";

import LinkbioPage from "@/app/[lang]/linkbio/page";

const meta = {
  title: "pages/LinkbioPage",
  component: LinkbioPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof LinkbioPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({}),
    searchParams: Promise.resolve({ lang: "en" }),
  },
  async play(context) {
    const canvas = within(context.canvasElement);

    const avatar = canvas.getByAltText(/A black and white photo of mine/i);
    await expect(avatar).toBeInTheDocument();

    const title = canvas.getByRole("heading", { name: /paulo henrique/i });
    await expect(title).toBeInTheDocument();
  },
};
