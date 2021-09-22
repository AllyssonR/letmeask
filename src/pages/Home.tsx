export function Home() {
  return (
    <div>
      <aside>
        <img
          src="/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas "
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div>
          <img src="/images/logo.svg" alt="Letmeask" />
          <button>
            <img src="/images/google-icon.svg" alt="Icone do google" />
            Crie sua sala com o google
          </button>
          <div>Ou Crie uma sala</div>
          <form>
            <input type="text" placeholder="Digite o codigo da sala" />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  )
}
