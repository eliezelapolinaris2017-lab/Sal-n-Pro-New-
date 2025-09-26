import { useState } from "react";
import { signInWithGoogle } from "../lib/google";

export function useAuth() {
  const [logged, setLogged] = useState(false);

  const login = async () => {
    await signInWithGoogle();
    setLogged(true);
  };

  return { logged, login };
}
