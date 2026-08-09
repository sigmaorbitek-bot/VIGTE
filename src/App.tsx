import { useState } from "react";

import logoPadrao from "./assets/Orbitek.png";

import { Usuario } from "./page/Usuário";
import { CadastroLoja } from "./page/CadastroLoja";
import { MinhasLojas } from "./page/MinhasLojas";
import { Dashboard } from "./page/Dashboard";
import { CadastrarVeiculo } from "./page/CadastroVeiculo";

import { lojas as lojasIniciais } from "./data/lojas";

type Loja = {
  id: number;
  logo: string;
  nomeDaLoja: string;
  whatsApp: string;
  cidade: string;
};

type Veiculo = {
  id: number;
  lojaId: number;
  tipo: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  placa: string;
  quilometragem: string;
  valorCompra: string;
  precoVenda: string;
  dataCompra: string;
  observacoes: string;
};

function App() {
  const [tipoUsuario, setTipoUsuario] = useState<
    "revendedor" | "cliente" | null
  >(null);

  const [tela, setTela] = useState<
    "lojas" | "cadastro" | "dashboard" | "cadastroVeiculo"
  >("lojas");

  const [listaLojas, setListaLojas] =
    useState<Loja[]>(lojasIniciais);

  const [lojaSelecionada, setLojaSelecionada] =
    useState<Loja | null>(null);

  const [listaVeiculos, setListaVeiculos] =
    useState<Veiculo[]>([]);

  function selecionarUsuario(
    tipo: "revendedor" | "cliente"
  ) {
    setTipoUsuario(tipo);
  }

  function criarLoja(loja: {
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }) {
    const novaLoja: Loja = {
      id: Date.now(),
      logo: logoPadrao,
      ...loja,
    };

    setListaLojas((listaAtual) => [
      ...listaAtual,
      novaLoja,
    ]);

    setTela("lojas");
  }

  function entrarNaLoja(loja: Loja) {
    setLojaSelecionada(loja);
    setTela("dashboard");
  }

  /*
   * Tela para escolher o tipo de usuário
   */
  if (tipoUsuario === null) {
    return (
      <Usuario
        onSelecionarUsuario={selecionarUsuario}
      />
    );
  }

  /*
   * Área do revendedor
   */
  if (tipoUsuario === "revendedor") {
    /*
     * Minhas lojas
     */
    if (tela === "lojas") {
      return (
        <MinhasLojas
          lojas={listaLojas}
          onCadastrarLoja={() => {
            setTela("cadastro");
          }}
          onEntrarLoja={entrarNaLoja}
        />
      );
    }

    /*
     * Cadastro de loja
     */
    if (tela === "cadastro") {
      return (
        <CadastroLoja
          onCriarLoja={criarLoja}
        />
      );
    }

    /*
     * Dashboard da loja
     */
    if (
      tela === "dashboard" &&
      lojaSelecionada
    ) {
      /*
       * Pega somente os veículos
       * pertencentes à loja selecionada.
       */
      const veiculosDaLoja =
        listaVeiculos.filter(
          (veiculo) =>
            veiculo.lojaId === lojaSelecionada.id
        );

      return (
        <Dashboard
          nomeDaLoja={
            lojaSelecionada.nomeDaLoja
          }
          veiculos={veiculosDaLoja}
          onCadastrarVeiculo={() => {
            setTela("cadastroVeiculo");
          }}
          onVoltar={() => {
            setTela("lojas");
          }}
        />
      );
    }

    /*
     * Cadastro de veículo
     */
    if (tela === "cadastroVeiculo") {
      if (!lojaSelecionada) {
        setTela("lojas");
        return null;
      }

      return (
        <CadastrarVeiculo
          lojaId={lojaSelecionada.id}
          onCadastrarVeiculo={(veiculo) => {
            setListaVeiculos(
              (listaAtual) => [
                ...listaAtual,
                veiculo,
              ]
            );

            setTela("dashboard");
          }}
          onVoltar={() => {
            setTela("dashboard");
          }}
        />
      );
    }
  }

  /*
   * Área provisória do cliente
   */
  return (
    <div>
      <h1>VIGTE</h1>

      <h2>Área do cliente</h2>

      <p>
        Área do {tipoUsuario}
      </p>
    </div>
  );
}

export default App;