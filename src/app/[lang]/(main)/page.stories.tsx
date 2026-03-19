import type { Meta, StoryObj } from "@storybook/nextjs";

import HomePage from "@/app/[lang]/(main)/page";
import MainLayout from "@/app/[lang]/(main)/layout";

const meta = {
  title: "pages/HomePage",
  component: HomePage,
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
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: Promise.resolve({
      lang: "en",
    }),
  },
};
