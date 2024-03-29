import { useContext, createContext, useState, useEffect } from 'react'
import { supabaseClient } from '../config/supabase-client';

const AuthContext = createContext({ session: null, user: null, signOut: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async() => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if(error)
        throw error;

      setSession(session)
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    }
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
