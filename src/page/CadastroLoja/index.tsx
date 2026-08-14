import { useState } from "react";
import "./index.css";

type CadastroLojaProps = {
  onCriarLoja: (loja: {
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }) => void;
};

export function CadastroLoja({
  onCriarLoja,
}: CadastroLojaProps) {
  const [nomeDaLoja, setNomeDaLoja] =
    useState("");

  const [whatsApp, setWhatsApp] =
    useState("");

  const [cidade, setCidade] =
    useState("");

  // ==========================================================
  // CRIAR LOJA
  // ==========================================================

  function criarLoja() {
    if (!nomeDaLoja.trim()) {
      alert("Informe o nome da loja.");
      return;
    }

    if (!whatsApp.trim()) {
      alert("Informe o WhatsApp da loja.");
      return;
    }

    if (!cidade.trim()) {
      alert("Informe a cidade da loja.");
      return;
    }

    const novaLoja = {
      nomeDaLoja: nomeDaLoja.trim(),
      whatsApp: whatsApp.trim(),
      cidade: cidade.trim(),
    };

    onCriarLoja(novaLoja);
  }

  return (
    <div className="cadastro-loja-container">
      <div className="cadastro-loja-card">

        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <div className="cadastro-loja-cabecalho">
          <span className="cadastro-loja-icone">
            🏪
          </span>

          <h1>Crie sua loja</h1>

          <p>
            Cadastre sua loja para começar a
            gerenciar seus Veiculos.
          </p>
        </div>

        {/* ==================================================
            FORMULÁRIO
        ================================================== */}

        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            criarLoja();
          }}
        >
          {/* ================================================
              LOGO
          ================================================= */}

          <div className="campo">
            <label htmlFor="logoLoja">
              Logo ou foto da loja{" "}
              <span>(opcional)</span>
            </label>

            <input
              id="logoLoja"
              type="file"
              accept="image/*"
            />
          </div>

          {/* ================================================
              NOME DA LOJA
          ================================================= */}

          <div className="campo">
            <label htmlFor="nomeLoja">
              Nome da loja
            </label>

            <input
              id="nomeLoja"
              type="text"
              placeholder="Ex: Sigma Orbitek Veículos"
              value={nomeDaLoja}
              onChange={(evento) =>
                setNomeDaLoja(
                  evento.target.value,
                )
              }
            />
          </div>

          {/* ================================================
              WHATSAPP
          ================================================= */}

          <div className="campo">
            <label htmlFor="whatsapp">
              WhatsApp
            </label>

            <input
              id="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={whatsApp}
              onChange={(evento) =>
                setWhatsApp(
                  evento.target.value,
                )
              }
            />
          </div>

          {/* ================================================
              CIDADE
          ================================================= */}

          <div className="campo">
            <label htmlFor="cidade">
              Cidade
            </label>

            <input
              id="cidade"
              type="text"
              placeholder="Ex: Altinho - PE"
              value={cidade}
              onChange={(evento) =>
                setCidade(
                  evento.target.value,
                )
              }
            />
          </div>

          {/* ================================================
              BOTÃO
          ================================================= */}

          <button
            type="submit"
            className="btn-criar-loja"
          >
            Criar minha loja
          </button>
        </form>
      </div>
    </div>
  );
}