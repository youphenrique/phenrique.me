import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components";

// Define the type for your toast content. This interface defines the properties of your toast content, affecting what you
// pass to the queue calls as arguments.
export type TToastContent = {
  title: string;
  description?: string;
};

// This is a global toast queue, to be imported and called where ever you want to queue a toast via queue.add().
export const queue = new ToastQueue<TToastContent>({
  maxVisibleToasts: 1,
});
