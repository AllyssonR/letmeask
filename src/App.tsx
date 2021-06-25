import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { createContext, useState } from "react";
import { firebase, auth } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextProps = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};
export const AuthContext = createContext({} as AuthContextProps);

function App() {
  const [user, setUser] = useState<User>();

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
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
