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
import { CadastroGasto } from "./page/CadastroGasto";

// Tipos.
import type { Veiculo } from "./types/Veiculo";

// ============================================================
// TIPO DA LOJA
// ============================================================

type Loja = {
  id: number;
  logo: string;
  nomeDaLoja: string;
  whatsApp: string;
  cidade: string;
};

// ============================================================
// TIPO DO GASTO
// ============================================================

type Gasto = {
  id: number;
  veiculoId: number;
  tipo: string;
  descricao: string;
  valor: number;
  dataGasto: string;
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

function App() {
  // ==========================================================
  // TIPO DE USUÁRIO
  // ==========================================================

  const [tipoUsuario, setTipoUsuario] = useState<
    "revendedor" | "cliente" | null
  >(null);

  // ==========================================================
  // TELA ATUAL
  // ==========================================================

  const [tela, setTela] = useState<
    | "lojas"
    | "cadastro"
    | "dashboard"
    | "cadastroVeiculo"
    | "cadastroGasto"
  >("lojas");

  // ==========================================================
  // LISTA DE LOJAS
  // ==========================================================

  const [listaLojas, setListaLojas] = useState<Loja[]>([]);

  // ==========================================================
  // LOJA SELECIONADA
  // ==========================================================

  const [lojaSelecionada, setLojaSelecionada] =
    useState<Loja | null>(null);

  // ==========================================================
  // VEÍCULO SELECIONADO
  // ==========================================================

  const [veiculoSelecionado, setVeiculoSelecionado] =
    useState<Veiculo | null>(null);

  // ==========================================================
  // LISTA DE VEÍCULOS
  // ==========================================================

  const [listaVeiculos, setListaVeiculos] =
    useState<Veiculo[]>([]);

  // ==========================================================
  // LISTA DE GASTOS
  // ==========================================================

  const [listaGastos, setListaGastos] =
    useState<Gasto[]>([]);

  // ==========================================================
  // CARREGANDO LOJAS
  // ==========================================================

  const [carregandoLojas, setCarregandoLojas] =
    useState(true);

  // ==========================================================
  // BUSCAR LOJAS DO SUPABASE
  // ==========================================================

  useEffect(() => {
    async function buscarLojas() {
      setCarregandoLojas(true);

      const { data, error } = await supabase
        .from("lojas")
        .select("*");

      if (error) {
        console.error("Erro ao buscar lojas:", error);

        alert("Não foi possível carregar as lojas.");

        setCarregandoLojas(false);

        return;
      }

      const lojasConvertidas: Loja[] = (data ?? []).map(
        (loja) => ({
          id: loja.id,
          logo: loja.logo,
          nomeDaLoja: loja.nome_da_loja,
          whatsApp: loja.whatsapp,
          cidade: loja.cidade,
        }),
      );

      setListaLojas(lojasConvertidas);

      setCarregandoLojas(false);
    }

    buscarLojas();
  }, []);

  // ==========================================================
  // BUSCAR VEÍCULOS DO SUPABASE
  // ==========================================================

  async function buscarVeiculos(
    lojaId: number,
  ): Promise<Veiculo[]> {
    const { data, error } = await supabase
      .from("veiculos")
      .select("*")
      .eq("loja_id", lojaId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Erro ao buscar veículos:",
        error,
      );

      alert(
        "Não foi possível carregar os veículos.",
      );

      return [];
    }

    const veiculosConvertidos: Veiculo[] = (
      data ?? []
    ).map((veiculo) => ({
      id: veiculo.id,
      lojaId: veiculo.loja_id,
      tipo: veiculo.tipo,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      placa: veiculo.placa ?? "",
      quilometragem:
        veiculo.quilometragem ?? "",
      valorCompra: String(
        veiculo.valor_compra ?? "",
      ),
      situacao: veiculo.situacao,
      dataCompra: veiculo.data_compra,
      observacoes:
        veiculo.observacoes ?? "",

      // IMPORTANTE:
      // agora a foto também vem do banco.
      foto: veiculo.foto ?? "",
    }));

    setListaVeiculos(
      veiculosConvertidos,
    );

    return veiculosConvertidos;
  }

  // ==========================================================
  // BUSCAR GASTOS DO SUPABASE
  // ==========================================================

  async function buscarGastos(
    veiculoIds: number[],
  ): Promise<Gasto[]> {
    if (veiculoIds.length === 0) {
      setListaGastos([]);

      return [];
    }

    const { data, error } = await supabase
      .from("gastos")
      .select("*")
      .in("veiculo_id", veiculoIds)
      .order("data_gasto", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Erro ao buscar gastos:",
        error,
      );

      alert(
        "Não foi possível carregar os gastos.",
      );

      return [];
    }

    const gastosConvertidos: Gasto[] = (
      data ?? []
    ).map((gasto) => ({
      id: gasto.id,
      veiculoId: gasto.veiculo_id,
      tipo: gasto.tipo,
      descricao: gasto.descricao ?? "",
      valor: Number(gasto.valor ?? 0),
      dataGasto: gasto.data_gasto,
    }));

    setListaGastos(
      gastosConvertidos,
    );

    return gastosConvertidos;
  }

  // ==========================================================
  // CARREGAR DADOS DA LOJA
  // ==========================================================

  async function carregarDadosDaLoja(
    lojaId: number,
  ) {
    const veiculos =
      await buscarVeiculos(lojaId);

    await buscarGastos(
      veiculos.map(
        (veiculo) => veiculo.id,
      ),
    );
  }

  // ==========================================================
  // SELECIONAR TIPO DE USUÁRIO
  // ==========================================================

  function selecionarUsuario(
    tipo: "revendedor" | "cliente",
  ) {
    setTipoUsuario(tipo);
  }

  // ==========================================================
  // CRIAR NOVA LOJA
  // ==========================================================

  async function criarLoja(loja: {
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
    logo: File | null;
  }) {
    // ========================================================
    // LOGO PADRÃO
    // ========================================================

    let logoUrl = logoPadrao;

    // ========================================================
    // ENVIO DA LOGO PARA O STORAGE
    // ========================================================

    if (loja.logo) {
      const extensao =
        loja.logo.name.split(".").pop() || "png";

      const nomeArquivo =
        `${crypto.randomUUID()}.${extensao}`;

      const { error: uploadError } =
        await supabase.storage
          .from("logos-lojas")
          .upload(
            nomeArquivo,
            loja.logo,
            {
              cacheControl: "3600",
              upsert: false,
            },
          );

      if (uploadError) {
        console.error(
          "Erro ao enviar logo:",
          uploadError,
        );

        alert(
          "Não foi possível enviar a logo da loja.",
        );

        return;
      }

      // ======================================================
      // GERAR URL PÚBLICA
      // ======================================================

      const { data: urlData } =
        supabase.storage
          .from("logos-lojas")
          .getPublicUrl(
            nomeArquivo,
          );

      logoUrl = urlData.publicUrl;
    }

    // ========================================================
    // INSERIR LOJA NO BANCO
    // ========================================================

    const { data, error } =
      await supabase
        .from("lojas")
        .insert([
          {
            nome_da_loja:
              loja.nomeDaLoja,

            whatsapp:
              loja.whatsApp,

            cidade:
              loja.cidade,

            logo: logoUrl,
          },
        ])
        .select();

    if (error) {
      console.error(
        "Erro ao cadastrar loja:",
        error,
      );

      alert(
        "Não foi possível cadastrar a loja.",
      );

      return;
    }

    if (
      !data ||
      data.length === 0
    ) {
      console.error(
        "A loja foi enviada, mas nenhum dado foi retornado.",
      );

      alert(
        "A loja foi cadastrada, mas não conseguimos atualizar a tela.",
      );

      return;
    }

    // ========================================================
    // CONVERTER LOJA PARA O FORMATO DO REACT
    // ========================================================

    const lojaCriada: Loja = {
      id: data[0].id,

      logo: data[0].logo,

      nomeDaLoja:
        data[0].nome_da_loja,

      whatsApp:
        data[0].whatsapp,

      cidade:
        data[0].cidade,
    };

    // ========================================================
    // ATUALIZAR LISTA DE LOJAS
    // ========================================================

    setListaLojas(
      (listaAtual) => [
        ...listaAtual,
        lojaCriada,
      ],
    );

    setTela("lojas");
  }

  // ==========================================================
  // ENTRAR EM UMA LOJA
  // ==========================================================

  async function entrarNaLoja(
    loja: Loja,
  ) {
    setLojaSelecionada(loja);

    await carregarDadosDaLoja(
      loja.id,
    );

    setTela("dashboard");
  }

  // ==========================================================
  // TELA DE ESCOLHA DO USUÁRIO
  // ==========================================================

  if (tipoUsuario === null) {
    return (
      <Usuario
        onSelecionarUsuario={
          selecionarUsuario
        }
      />
    );
  }

  // ==========================================================
  // ÁREA DO REVENDEDOR
  // ==========================================================

  if (tipoUsuario === "revendedor") {
    // ========================================================
    // MINHAS LOJAS
    // ========================================================

    if (tela === "lojas") {
      if (carregandoLojas) {
        return (
          <div>
            <h2>
              Carregando lojas...
            </h2>
          </div>
        );
      }

      return (
        <MinhasLojas
          lojas={listaLojas}
          onCadastrarLoja={() => {
            setTela("cadastro");
          }}
          onEntrarLoja={
            entrarNaLoja
          }
        />
      );
    }

    // ========================================================
    // CADASTRO DE LOJA
    // ========================================================

    if (tela === "cadastro") {
      return (
        <CadastroLoja
          onCriarLoja={
            criarLoja
          }
        />
      );
    }

    // ========================================================
    // DASHBOARD DA LOJA
    // ========================================================

    if (
      tela === "dashboard" &&
      lojaSelecionada
    ) {
      const veiculosDaLoja =
        listaVeiculos.filter(
          (veiculo) =>
            veiculo.lojaId ===
            lojaSelecionada.id,
        );

      return (
        <Dashboard
          nomeDaLoja={
            lojaSelecionada.nomeDaLoja
          }
          veiculos={
            veiculosDaLoja
          }
          gastos={listaGastos}
          onCadastrarVeiculo={() => {
            setTela(
              "cadastroVeiculo",
            );
          }}
          onAdicionarGasto={(
            veiculo,
          ) => {
            setVeiculoSelecionado(
              veiculo,
            );

            setTela(
              "cadastroGasto",
            );
          }}
          onVoltar={() => {
            setTela("lojas");
          }}
        />
      );
    }

    // ========================================================
    // CADASTRO DE VEÍCULO
    // ========================================================

    if (
      tela ===
      "cadastroVeiculo"
    ) {
      if (!lojaSelecionada) {
        setTela("lojas");

        return null;
      }

      return (
        <CadastrarVeiculo
          lojaId={
            lojaSelecionada.id
          }
          onCadastrarVeiculo={async (
            veiculo,
          ) => {
            await carregarDadosDaLoja(
              veiculo.lojaId,
            );

            setTela("dashboard");
          }}
          onVoltar={() => {
            setTela("dashboard");
          }}
        />
      );
    }

    // ========================================================
    // CADASTRO DE GASTO
    // ========================================================

    if (
      tela ===
      "cadastroGasto"
    ) {
      if (
        !veiculoSelecionado
      ) {
        setTela("dashboard");

        return null;
      }

      return (
        <CadastroGasto
          veiculo={
            veiculoSelecionado
          }
          onSalvarGasto={async () => {
            if (
              !lojaSelecionada
            ) {
              setTela(
                "dashboard",
              );

              return;
            }

            await carregarDadosDaLoja(
              lojaSelecionada.id,
            );

            setVeiculoSelecionado(
              null,
            );

            setTela("dashboard");
          }}
          onVoltar={() => {
            setVeiculoSelecionado(
              null,
            );

            setTela(
              "dashboard",
            );
          }}
        />
      );
    }
  }

  // ==========================================================
  // ÁREA PROVISÓRIA DO CLIENTE
  // ==========================================================

  return (
    <div>
      <h1>VIGTE</h1>

      <h2>
        Área do cliente
      </h2>

      <p>
        Área do {tipoUsuario}
      </p>
    </div>
  );
}

// ============================================================
// EXPORTAÇÃO
// ============================================================

export default App;