import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  webpackFinal: async (config) => {
    // Ensure resolve object exists
    config.resolve = config.resolve || {};
    // Use tsconfig-paths-webpack-plugin to resolve aliases from tsconfig.json
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(process.cwd(), "./tsconfig.json"),
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
      }),
    ];

    return config;
  },
};

export default config;
