import { createContext, PropsWithChildren, useContext } from "react";
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

type AuthContext = {
    session: Session | null;
    User: User | null;
}

const AuthContext = createContext({
    session: null,
    user: null,
});


export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);