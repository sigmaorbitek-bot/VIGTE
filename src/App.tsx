import { useEffect, useState } from "react";

// ============================================================
// IMPORTAÇÕES
// ============================================================

// Logo padrão usada quando uma nova loja é cadastrada.
import logoPadrao from "./assets/Orbitek.png";

// Cliente do Supabase.
// É através dele que o React conversa com o banco de dados.
import { supabase } from "./lib/supabase";

// Páginas do sistema.
import { Usuario } from "./page/Usuário/index";
import { CadastroLoja } from "./page/CadastroLoja";
import { MinhasLojas } from "./page/MinhasLojas";
import { Dashboard } from "./page/Dashboard";
import { CadastrarVeiculo } from "./page/CadastroVeiculo";

// Tipo do veículo.
import type { Veiculo } from "./types/Veiculo";

// ============================================================
// TIPO DA LOJA
// ============================================================
//
// Esse tipo representa a estrutura de uma loja dentro
// do nosso sistema.
//
// Ele precisa corresponder às colunas da tabela "lojas"
// que criamos no Supabase.
//
// id           → identificador da loja
// logo         → logo da loja
// nomeDaLoja   → nome da loja
// whatsApp     → WhatsApp
// cidade       → cidade da loja
// ============================================================

type Loja = {
  id: number;
  logo: string;
  nomeDaLoja: string;
  whatsApp: string;
  cidade: string;
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

function App() {
  // ==========================================================
  // TIPO DE USUÁRIO
  // ==========================================================
  //
  // null       → ainda não escolheu
  // revendedor → entrou como revendedor
  // cliente    → entrou como cliente
  //
  // A área do cliente ainda é provisória.
  // ==========================================================

  const [tipoUsuario, setTipoUsuario] = useState<
    "revendedor" | "cliente" | null
  >(null);

  // ==========================================================
  // TELA ATUAL
  // ==========================================================
  //
  // lojas           → Minhas Lojas
  // cadastro        → Cadastro de Loja
  // dashboard       → Dashboard da loja
  // cadastroVeiculo → Cadastro de Veículo
  // ==========================================================

  const [tela, setTela] = useState<
    "lojas" | "cadastro" | "dashboard" | "cadastroVeiculo"
  >("lojas");

  // ==========================================================
  // LISTA DE LOJAS
  // ==========================================================
  //
  // IMPORTANTE:
  //
  // Antes as lojas vinham de:
  //
  // ./data/lojas
  //
  // Agora elas virão do Supabase.
  //
  // Começamos com uma lista vazia porque ainda precisamos
  // buscar os dados no banco.
  // ==========================================================

  const [listaLojas, setListaLojas] = useState<Loja[]>([]);

  // ==========================================================
  // LOJA SELECIONADA
  // ==========================================================
  //
  // Guarda a loja em que o revendedor entrou.
  //
  // Exemplo:
  //
  // id = 1
  // nomeDaLoja = "Sigma Veículos"
  //
  // Depois usamos esse ID para relacionar os veículos
  // à loja correta.
  // ==========================================================

  const [lojaSelecionada, setLojaSelecionada] = useState<Loja | null>(null);

  // ==========================================================
  // LISTA DE VEÍCULOS
  // ==========================================================
  //
  // POR ENQUANTO os veículos continuam sendo armazenados
  // somente no React.
  //
  // Ainda NÃO estamos salvando veículos no Supabase.
  //
  // Essa será uma próxima etapa.
  // ==========================================================

  const [listaVeiculos, setListaVeiculos] = useState<Veiculo[]>([]);

  // ==========================================================
  // CARREGANDO LOJAS
  // ==========================================================
  //
  // Enquanto o Supabase estiver buscando os dados,
  // usamos esse estado para saber que a consulta ainda
  // está acontecendo.
  // ==========================================================

  const [carregandoLojas, setCarregandoLojas] = useState(true);

  // ==========================================================
  // BUSCAR LOJAS DO SUPABASE
  // ==========================================================
  //
  // useEffect executa esse código quando o App é iniciado.
  //
  // Fluxo:
  //
  // App inicia
  //    ↓
  // buscarLojas()
  //    ↓
  // Supabase
  //    ↓
  // tabela "lojas"
  //    ↓
  // setListaLojas()
  //    ↓
  // MinhasLojas recebe os dados
  // ==========================================================

  useEffect(() => {
    async function buscarLojas() {
      // Informa que estamos carregando os dados.
      setCarregandoLojas(true);

      // ======================================================
      // CONSULTA AO SUPABASE
      // ======================================================
      //
      // .from("lojas")
      //
      // significa:
      //
      // "quero trabalhar com a tabela lojas"
      //
      // .select("*")
      //
      // significa:
      //
      // "quero buscar todas as colunas"
      // ======================================================

      const { data, error } = await supabase.from("lojas").select("*");

      // ======================================================
      // VERIFICAR ERRO
      // ======================================================

      if (error) {
        console.error("Erro ao buscar lojas:", error);

        alert("Não foi possível carregar as lojas.");

        setCarregandoLojas(false);

        return;
      }

      // ======================================================
      // COLOCAR OS DADOS NO REACT
      // ======================================================
      //
      // data contém as lojas que vieram do Supabase.
      //
      // Como a tabela está relacionada ao nosso tipo Loja,
      // podemos colocar os dados no estado.
      // ======================================================

      const lojasConvertidas: Loja[] = (data ?? []).map((loja) => ({
        id: loja.id,
        logo: loja.logo,
        nomeDaLoja: loja.nome_da_loja,
        whatsApp: loja.whatsapp,
        cidade: loja.cidade,
      }));

      setListaLojas(lojasConvertidas);

      // Terminamos o carregamento.
      setCarregandoLojas(false);
    }

    // Executa a função.
    buscarLojas();
  }, []);

  // ==========================================================
  // SELECIONAR TIPO DE USUÁRIO
  // ==========================================================

  function selecionarUsuario(tipo: "revendedor" | "cliente") {
    setTipoUsuario(tipo);
  }

  // ==========================================================
  // CRIAR NOVA LOJA
  // ==========================================================
  //
  // Recebe os dados preenchidos no formulário CadastroLoja.
  //
  // Fluxo:
  //
  // CadastroLoja
  //      ↓
  // criarLoja()
  //      ↓
  // Supabase
  //      ↓
  // tabela "lojas"
  //      ↓
  // atualiza lista no React
  // ==========================================================

  async function criarLoja(loja: {
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }) {
    // ========================================================
    // ENVIAR A NOVA LOJA PARA O SUPABASE
    // ========================================================
    //
    // ATENÇÃO:
    //
    // O React usa:
    //
    // nomeDaLoja
    // whatsApp
    //
    // Mas o banco usa:
    //
    // nome_da_loja
    // whatsapp
    //
    // Por isso fazemos a conversão aqui.
    // ========================================================

    const { data, error } = await supabase
      .from("lojas")
      .insert([
        {
          nome_da_loja: loja.nomeDaLoja,
          whatsapp: loja.whatsApp,
          cidade: loja.cidade,
          logo: logoPadrao,
        },
      ])
      .select();

    // ========================================================
    // VERIFICAR ERRO
    // ========================================================

    if (error) {
      console.error("Erro ao cadastrar loja:", error);

      alert("Não foi possível cadastrar a loja.");

      return;
    }

    // ========================================================
    // VERIFICAR SE O SUPABASE DEVOLVEU A LOJA
    // ========================================================

    if (!data || data.length === 0) {
      console.error("A loja foi enviada, mas nenhum dado foi retornado.");

      alert("A loja foi cadastrada, mas não conseguimos atualizar a tela.");

      return;
    }

    // ========================================================
    // CONVERTER O FORMATO DO BANCO PARA O FORMATO DO REACT
    // ========================================================
    //
    // Supabase:
    //
    // nome_da_loja
    // whatsapp
    //
    // React:
    //
    // nomeDaLoja
    // whatsApp
    // ========================================================

    const lojaCriada: Loja = {
      id: data[0].id,
      logo: data[0].logo,
      nomeDaLoja: data[0].nome_da_loja,
      whatsApp: data[0].whatsapp,
      cidade: data[0].cidade,
    };

    // ========================================================
    // ATUALIZAR A LISTA DE LOJAS
    // ========================================================

    setListaLojas((listaAtual) => [...listaAtual, lojaCriada]);

    // ========================================================
    // VOLTAR PARA MINHAS LOJAS
    // ========================================================

    setTela("lojas");
  }
  // ==========================================================
  // ENTRAR EM UMA LOJA
  // ==========================================================
  //
  // Quando o usuário clicar em:
  //
  // "Entrar na loja"
  //
  // essa função será executada.
  // ==========================================================

  function entrarNaLoja(loja: Loja) {
    // Guarda a loja selecionada.
    setLojaSelecionada(loja);

    // Abre o Dashboard.
    setTela("dashboard");
  }

  // ==========================================================
  // TELA DE ESCOLHA DO USUÁRIO
  // ==========================================================
  //
  // Enquanto nenhum tipo de usuário foi escolhido,
  // mostramos a tela Usuario.
  // ==========================================================

  if (tipoUsuario === null) {
    return <Usuario onSelecionarUsuario={selecionarUsuario} />;
  }

  // ==========================================================
  // ÁREA DO REVENDEDOR
  // ==========================================================

  if (tipoUsuario === "revendedor") {
    // ========================================================
    // MINHAS LOJAS
    // ========================================================

    if (tela === "lojas") {
      // ------------------------------------------------------
      // Se ainda estamos buscando as lojas,
      // mostramos uma mensagem simples.
      // ------------------------------------------------------

      if (carregandoLojas) {
        return (
          <div>
            <h2>Carregando lojas...</h2>
          </div>
        );
      }

      // ------------------------------------------------------
      // Depois que o Supabase terminou,
      // mostramos MinhasLojas.
      // ------------------------------------------------------

      return (
        <MinhasLojas
          // Lista que veio do Supabase.
          lojas={listaLojas}
          // Botão para cadastrar nova loja.
          onCadastrarLoja={() => {
            setTela("cadastro");
          }}
          // Botão para entrar em uma loja.
          onEntrarLoja={entrarNaLoja}
        />
      );
    }

    // ========================================================
    // CADASTRO DE LOJA
    // ========================================================

    if (tela === "cadastro") {
      return (
        <CadastroLoja
          // Quando o formulário for enviado,
          // chamamos criarLoja().
          onCriarLoja={criarLoja}
        />
      );
    }

    // ========================================================
    // DASHBOARD DA LOJA
    // ========================================================

    if (tela === "dashboard" && lojaSelecionada) {
      // ------------------------------------------------------
      // FILTRAR VEÍCULOS DA LOJA
      // ------------------------------------------------------
      //
      // Ainda estamos usando os veículos no estado do React.
      //
      // Pegamos somente os veículos pertencentes à loja
      // selecionada.
      // ------------------------------------------------------

      const veiculosDaLoja = listaVeiculos.filter(
        (veiculo) => veiculo.lojaId === lojaSelecionada.id,
      );

      return (
        <Dashboard
          // Nome da loja.
          nomeDaLoja={lojaSelecionada.nomeDaLoja}
          // Veículos pertencentes à loja.
          veiculos={veiculosDaLoja}
          // Abrir cadastro de veículo.
          onCadastrarVeiculo={() => {
            setTela("cadastroVeiculo");
          }}
          // Voltar para Minhas Lojas.
          onVoltar={() => {
            setTela("lojas");
          }}
        />
      );
    }

    // ========================================================
    // CADASTRO DE VEÍCULO
    // ========================================================

    if (tela === "cadastroVeiculo") {
      // ------------------------------------------------------
      // PROTEÇÃO
      // ------------------------------------------------------
      //
      // Não podemos cadastrar um veículo sem saber
      // em qual loja ele será cadastrado.
      // ------------------------------------------------------

      if (!lojaSelecionada) {
        setTela("lojas");

        return null;
      }

      return (
        <CadastrarVeiculo
          // ID da loja selecionada.
          //
          // O veículo recebe esse ID para sabermos
          // a qual loja ele pertence.
          lojaId={lojaSelecionada.id}
          // --------------------------------------------------
          // VEÍCULO CADASTRADO
          // --------------------------------------------------

          onCadastrarVeiculo={(veiculo) => {
            // Adiciona o veículo ao estado.
            //
            // IMPORTANTE:
            //
            // Ainda não está sendo salvo no Supabase.
            // ------------------------------------------------

            setListaVeiculos((listaAtual) => [...listaAtual, veiculo]);

            // Volta para o Dashboard.
            setTela("dashboard");
          }}
          // --------------------------------------------------
          // VOLTAR
          // --------------------------------------------------

          onVoltar={() => {
            setTela("dashboard");
          }}
        />
      );
    }
  }

  // ==========================================================
  // ÁREA PROVISÓRIA DO CLIENTE
  // ==========================================================
  //
  // Essa parte ainda não foi desenvolvida.
  // ==========================================================

  return (
    <div>
      <h1>VIGTE</h1>

      <h2>Área do cliente</h2>

      <p>Área do {tipoUsuario}</p>
    </div>
  );
}

// ============================================================
// EXPORTAÇÃO
// ============================================================
//
// Permite que o index.tsx importe o App.
// ============================================================

export default App;
