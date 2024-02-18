"use client";

import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import posthog from 'posthog-js'
import PlausibleProvider from 'next-plausible'
import { PostHogProvider } from 'posthog-js/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useState } from "react";

import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";
import { PostHogPageView } from "../postHogPageView";
import { env } from "~/env";

export const api = createTRPCReact<AppRouter>();

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
  })
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <PlausibleProvider domain="caredfor.care">
          <PostHogProvider client={posthog}>
            {props.children}
            <Suspense fallback={null} >
              <PostHogPageView />
              <ProgressBar
                height="4px"
                color="#006a4e"
                options={{ showSpinner: false }}
                shallowRouting
              />
            </Suspense>
          </PostHogProvider>  
        </PlausibleProvider>
      </api.Provider>
    </QueryClientProvider>
  );
}
