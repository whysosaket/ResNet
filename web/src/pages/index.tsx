import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "@/utils/api";
import { Emergency } from "@/components/emergency";

export default function Home() {
  return (
    <>
      <Head>
        <title>RescueNet</title>
        <meta name="description" content="RescueNet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-3xl">
        {/* <AuthShowcase /> */}
        <div className="space-y-6 bg-teal-300 px-3 pb-12 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-950">Location</p>
              <p className="text-sm text-gray-700">Bhubaneswar</p>
            </div>
            <div className="">
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M9.998 2c3.149 0 5.744 2.335 5.984 5.355l.014.223l.004.224l-.001 3.596l.925 2.222c.023.054.04.11.053.167l.016.086l.008.132a1 1 0 0 1-.749.963l-.116.027l-.135.01l-3.501-.001l-.005.161a2.5 2.5 0 0 1-4.99 0l-.005-.161H3.999a.998.998 0 0 1-.26-.034l-.124-.042a1 1 0 0 1-.603-1.052l.021-.128l.043-.128l.923-2.219L4 7.793l.004-.225C4.127 4.451 6.771 2 9.998 2ZM11.5 15.004h-3l.007.141a1.5 1.5 0 0 0 1.349 1.348L10 16.5a1.5 1.5 0 0 0 1.493-1.355l.007-.141ZM9.998 3c-2.623 0-4.77 1.924-4.98 4.385l-.014.212L5 7.802V11.5l-.038.192l-.963 2.313l11.958.002l.045-.002l-.964-2.313L15 11.5V7.812l-.004-.204C14.891 5.035 12.695 3 9.998 3Z"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </div>
          <div className="mx-auto rounded-lg bg-white p-5 shadow-md ring-1 ring-gray-900/5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="font-semibold leading-6 text-gray-900">
                  Leslie Alexander
                </p>
                <p className="truncate text-sm leading-5 text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-5 flex flex-col items-center justify-center gap-6 rounded-t-xl bg-white p-5">
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Need urgent assistance?
            </h1>
          </div>
          <Emergency />

          <p className="text-lg text-gray-500">Just press the button</p>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
