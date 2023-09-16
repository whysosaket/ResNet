import { Drawer } from "vaul";
import EmergencyForm from "./emergency-form";

export function Emergency() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-red-700 p-12 text-center text-sm font-medium text-white shadow-lg shadow-red-500/50 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <svg
            className="w-h-16 h-16"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2.466 12.25a5.158 5.158 0 0 1 9.424-4.197l1.224 2.749l1.664 1.619a.75.75 0 0 1-.218 1.222l-9.727 4.331a.75.75 0 0 1-1.054-.656l-.09-2.32l-1.223-2.749Zm6.364 5.087a1.49 1.49 0 0 0 2.685-1.195L8.83 17.337Zm3.256-12.609a.5.5 0 0 1 .694-.134c1.607 1.085 2.715 2.638 2.888 4.424c.016.16.024.323.024.487a.5.5 0 1 1-1 0a4.04 4.04 0 0 0-.02-.39c-.136-1.418-1.024-2.728-2.452-3.693a.5.5 0 0 1-.134-.694Zm.49-2.485a.5.5 0 0 1 .688-.165c2.458 1.506 4.58 3.805 4.736 7.904a.5.5 0 0 1-1 .038c-.14-3.676-2-5.706-4.259-7.09a.5.5 0 0 1-.165-.687Z"
            />
          </svg>
          <span className="sr-only">Press me in emergency</span>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[96%] flex-col rounded-t-[10px] bg-gray-100">
          <div className="flex-1 rounded-t-[10px] bg-white p-4 overflow-auto">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Fill the form to get assistance.
              </Drawer.Title>
              {/* <p className="mb-2 text-gray-600">
                This component can be used as a Dialog replacement on mobile and
                tablet devices.
              </p>
              <p className="mb-2 text-gray-600">
                It comes unstyled and has gesture-driven animations.
              </p> */}
              <EmergencyForm />
              {/* <p className="mb-6 text-gray-600">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&rsquo;s Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p> */}
              {/* <Drawer.NestedRoot>
                <Drawer.Trigger className="mb-6 w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                  Open Second Drawer
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[94%] flex-col rounded-t-[10px] bg-gray-100">
                    <div className="flex-1 rounded-t-[10px] bg-white p-4">
                      <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                      <div className="mx-auto max-w-md">
                        <Drawer.Title className="mb-4 font-medium">
                          This drawer is nested.
                        </Drawer.Title>
                        <p className="mb-2 text-gray-600">
                          Place a{" "}
                          <span className="font-mono text-[15px] font-semibold">
                            `Drawer.NestedRoot`
                          </span>{" "}
                          inside another drawer and it will be nested
                          automatically for you.
                        </p>
                        <p className="mb-2 text-gray-600">
                          You can view more examples{" "}
                          <a
                            href="https://github.com/emilkowalski/vaul#examples"
                            className="underline"
                            target="_blank"
                          >
                            here
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto border-t border-gray-200 bg-gray-100 p-4">
                      <div className="mx-auto flex max-w-md justify-end gap-6">
                        <a
                          className="gap-0.25 flex items-center text-xs text-gray-600"
                          href="https://github.com/emilkowalski/vaul"
                          target="_blank"
                        >
                          GitHub
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            aria-hidden="true"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                          </svg>
                        </a>
                        <a
                          className="gap-0.25 flex items-center text-xs text-gray-600"
                          href="https://twitter.com/emilkowalski_"
                          target="_blank"
                        >
                          Twitter
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            aria-hidden="true"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.NestedRoot> */}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
