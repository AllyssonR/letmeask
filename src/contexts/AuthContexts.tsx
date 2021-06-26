import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";
type User = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextProps = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};
type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext({} as AuthContextProps);
export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL } = user;
        if (!displayName || !photoURL) {
          throw new Error("Missing information from google account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    return () => {
      unsubcribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information with google account.");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
