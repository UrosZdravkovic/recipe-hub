import { supabase } from '@/services/supabaseClient';
import { store } from '@/app/store';
import { loginUserThunk, fetchProfileThunk, logoutUserThunk } from './authThunks';

// Initialize auth session (restores user & profile on refresh without flicker in UI)
export async function initializeAuthPersistence() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    store.dispatch({ type: loginUserThunk.fulfilled.type, payload: session.user });
    store.dispatch(fetchProfileThunk(session.user.id));
  }

  supabase.auth.onAuthStateChange((event, sessionData) => {
    if (sessionData?.user) {
      store.dispatch({ type: loginUserThunk.fulfilled.type, payload: sessionData.user });
      store.dispatch(fetchProfileThunk(sessionData.user.id));
    } else if (event === 'SIGNED_OUT') {
      store.dispatch({ type: logoutUserThunk.fulfilled.type, payload: true });
    }
  });
}
