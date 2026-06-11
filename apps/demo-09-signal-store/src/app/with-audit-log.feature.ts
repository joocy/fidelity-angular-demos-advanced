import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

// Reusable store feature: mix this into any signalStore that needs action history.
export function withAuditLog() {
  return signalStoreFeature(
    // Feature state is merged into the consuming store, so BlotterStore gets log().
    withState({ log: [] as string[] }),
    withMethods(store => ({
      // Keep the newest entry first and cap the list so the demo stays compact.
      logAction: (entry: string) =>
        patchState(store, { log: [entry, ...store.log()].slice(0, 6) }),
    })),
  );
}
