import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

// Reusable feature — mix into any store that needs an action history
export function withAuditLog() {
  return signalStoreFeature(
    withState({ log: [] as string[] }),
    withMethods(store => ({
      logAction: (entry: string) =>
        patchState(store, { log: [entry, ...store.log()].slice(0, 6) }),
    })),
  );
}
