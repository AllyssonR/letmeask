import { FormEvent } from "react";
import ilustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import "../styles/auth.scss";
import { useState } from "react";
//import { useAuth } from "../hooks/useAuth";

//webpack (snowpack,vite,...)
export function NewRoom() {
  // const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if(newRoom.trim() === ''){
      return;
    }
    
  }
  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração simbolizando perguntas e responstas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dividas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o cogigo da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
