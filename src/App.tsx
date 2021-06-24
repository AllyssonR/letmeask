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
  user: User |undefined;
  SignInWithGoogle: () => void;
};
export const AuthContext = createContext({} as AuthContextProps);

function App() {
  const [user, setUser] = useState<User>();

  function SignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;
        if (!displayName || !photoURL) {
          throw new Error("Missin information from Google Account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  }
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ user, SignInWithGoogle }}>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
