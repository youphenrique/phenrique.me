"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

type ProviderClientProps = PropsWithChildren;

export function ProviderClient(props: ProviderClientProps) {
  const router = useRouter();

  return <RouterProvider navigate={router.push}>{props.children}</RouterProvider>;
}
