import type { Meta, StoryObj } from "@storybook/nextjs";

import MainLayout from "@/app/[lang]/(main)/layout";
import ReadingPage from "@/app/[lang]/(main)/reading/page";

const meta = {
  title: "pages/ReadingPage",
  component: ReadingPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MainLayout params={Promise.resolve({ lang: "en" })}>
        <Story />
      </MainLayout>
    ),
  ],
} satisfies Meta<typeof ReadingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({
      lang: "en",
    }),
  },
};
