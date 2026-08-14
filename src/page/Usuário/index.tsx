import "./index.css";
import logoVigte from "../../assets/Vigte.png";

type UsuarioProps = {
  onSelecionarUsuario: (tipo: "revendedor" | "cliente") => void;
};

export function Usuario({ onSelecionarUsuario }: UsuarioProps) {
  return (
    <div className="usuario-container">
      <img src={logoVigte} alt="Logo VIGTE" className="logo-vigte" />
      <h1>Seja bem-vindo!</h1>

      <p>Gestão inteligente para revendedores de veículos</p>

      <div className="selecao-grid">
        {/* Opção revendedor de carro / moto */}
        <div
          className="card-opcao revendedor"
          onClick={() => onSelecionarUsuario("revendedor")}
        >
          <div className="icone-opcao">🏪</div>

          <h2>Sou revendedor</h2>

          <p>Quero gerenciar meus veículos e minha revenda.</p>

          <button className="btn-opcao">Acessar como Revendedor</button>
        </div>

        {/* Opção cliente */}
        <div
          className="card-opcao cliente"
          onClick={() => onSelecionarUsuario("cliente")}
        >
          <div className="icone-opcao">👤</div>

          <h2>Sou cliente</h2>
          <p>Quero consultar/comprar veículos.</p>

          <button className="btn-opcao">Acessar como Cliente</button>
        </div>
      </div>
    </div>
  );
}
