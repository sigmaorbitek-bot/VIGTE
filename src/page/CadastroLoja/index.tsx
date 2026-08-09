import { useState } from "react";
import "./index.css";

type CadastroLojaProps = {
  onCriarLoja: (loja: {
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }) => void;
};

export function CadastroLoja({ onCriarLoja }: CadastroLojaProps) {
  const [nomeDaLoja, setNomeDaLoja] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [cidade, setcidade] = useState("");

  return (
    <div className="cadastro-loja-container">
      <div className="cadastro-loja-card">
        <div className="cadastro-loja-cabecalho">
          <span className="cadastro-loja-icone">🏪</span>

          <h1>Crie sua loja</h1>

          <p>Cadastre sua loja para começar a gerenciar seus carros e motos.</p>
        </div>

        <form>
          <div className="campo">
            <label htmlFor="logoLoja">
              Logo ou foto da loja <span>(opcional)</span>
            </label>

            <input id="logoLoja" type="file" accept="image/*" />
          </div>

          <div className="campo">
            <label htmlFor="nomeLoja">Nome da loja</label>

            <input
              id="nomeLoja"
              type="text"
              placeholder="Ex: Sigma Orbitek Veículos"
              value={nomeDaLoja}
              onChange={(evento) => setNomeDaLoja(evento.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="whatsapp">WhatsApp</label>

            <input
              id="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={whatsApp}
              onChange={(evento) => setWhatsApp(evento.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="cidade">Cidade</label>

            <input
              id="cidade"
              type="text"
              placeholder="Ex: Altinho - PE"
              value={cidade}
              onChange={(evento) => setcidade(evento.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-criar-loja"
            onClick={() => {
              const novaLoja = {
                nomeDaLoja: nomeDaLoja,
                whatsApp: whatsApp,
                cidade: cidade,
              };

              alert("Loja criada com sucesso!");

              onCriarLoja(novaLoja);
            }}
          >
            Criar minha loja
          </button>
        </form>
      </div>
    </div>
  );
}
