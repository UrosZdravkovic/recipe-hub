// Simple localStorage persistence helpers (no external libs)
// We only persist the minimal state needed to restore UI after refresh.

const PERSIST_KEY = 'recipeHubState_v1';

export type PersistPayload = {
  recipes?: {
    recipes: any[];
    hasSearched: boolean;
  };
  ingredients?: {
    selectedIngredients: any[];
  };
  timestamp: number;
};

export function loadPersistedState(): PersistPayload | null {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function persistState(partial: Omit<PersistPayload, 'timestamp'>) {
  try {
    const existing = loadPersistedState();
    const merged: PersistPayload = {
      ...(existing || {}),
      ...partial,
      timestamp: Date.now(),
    } as PersistPayload;
    localStorage.setItem(PERSIST_KEY, JSON.stringify(merged));
  } catch {
    // silent
  }
}

export function clearPersistedState() {
  localStorage.removeItem(PERSIST_KEY);
}
