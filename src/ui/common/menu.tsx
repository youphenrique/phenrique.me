import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";

interface AsChildProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

function getRenderProps({ asChild, children }: AsChildProps) {
  if (!asChild) {
    return { children, render: undefined };
  }

  if (!React.isValidElement(children)) {
    throw new Error("Menu components with `asChild` require a single valid React element child.");
  }

  return { children: undefined, render: children };
}

export const MenuRoot = BaseMenu.Root;
export const MenuGroup = BaseMenu.Group;

export interface MenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>, "children" | "render">, AsChildProps {}

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  { asChild = false, children, ...props },
  ref,
) {
  const renderProps = getRenderProps({ asChild, children });

  return (
    <BaseMenu.Trigger ref={ref} {...props} {...renderProps}>
      {renderProps.children}
    </BaseMenu.Trigger>
  );
});

export interface MenuContentProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, "children"> {
  children?: React.ReactNode;
  portal?: boolean;
  portalProps?: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Portal>, "children">;
  positionerProps?: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>, "children" | "className">;
  positionerClassName?: React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>["className"];
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { children, portal = true, portalProps, positionerProps, positionerClassName, ...popupProps },
  ref,
) {
  const content = (
    <BaseMenu.Positioner className={positionerClassName} {...positionerProps}>
      <BaseMenu.Popup ref={ref} {...popupProps}>
        {children}
      </BaseMenu.Popup>
    </BaseMenu.Positioner>
  );

  if (!portal) {
    return content;
  }

  return <BaseMenu.Portal {...portalProps}>{content}</BaseMenu.Portal>;
});

export interface MenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Item>, "children" | "render">, AsChildProps {}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  { asChild = false, children, ...props },
  ref,
) {
  const renderProps = getRenderProps({ asChild, children });

  return (
    <BaseMenu.Item ref={ref} {...props} {...renderProps}>
      {renderProps.children}
    </BaseMenu.Item>
  );
});

export interface MenuLinkItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.LinkItem>, "children" | "render">, AsChildProps {}

export const MenuLinkItem = React.forwardRef<Element, MenuLinkItemProps>(function MenuLinkItem(
  { asChild = false, children, ...props },
  ref,
) {
  const renderProps = getRenderProps({ asChild, children });

  return (
    <BaseMenu.LinkItem ref={ref} {...props} {...renderProps}>
      {renderProps.children}
    </BaseMenu.LinkItem>
  );
});

export interface MenuLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>, "children" | "render">, AsChildProps {}

export const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(function MenuLabel(
  { asChild = false, children, ...props },
  ref,
) {
  const renderProps = getRenderProps({ asChild, children });

  return (
    <BaseMenu.GroupLabel ref={ref} {...props} {...renderProps}>
      {renderProps.children}
    </BaseMenu.GroupLabel>
  );
});

export type MenuSeparatorProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>;

export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(function MenuSeparator(props, ref) {
  return <BaseMenu.Separator ref={ref} {...props} />;
});
