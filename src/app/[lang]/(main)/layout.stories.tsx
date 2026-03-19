import type { Meta, StoryObj } from "@storybook/nextjs";

import MainLayout from "@/app/[lang]/(main)/layout";

const meta = {
  title: "layouts/MainLayout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => (
      <MainLayout params={Promise.resolve({ lang: "en" })}>
        <main />
      </MainLayout>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({
      lang: "en",
    }),
  },
};
