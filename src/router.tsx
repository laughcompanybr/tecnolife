import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { installSSRDebugger } from "./debug/ssr-debug"
import { installUndefinedKeyTrap } from "./debug/undefined-key-trap"

installSSRDebugger()
installUndefinedKeyTrap()

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
