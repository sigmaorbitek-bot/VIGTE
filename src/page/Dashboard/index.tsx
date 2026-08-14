import "./index.css";
import type { Veiculo } from "../../types/Veiculo";

// ==========================================================
// TIPO DO GASTO
// ==========================================================

type Gasto = {
  id: number;
  veiculoId: number;
  tipo: string;
  descricao: string;
  valor: number;
  dataGasto: string;
};

// ==========================================================
// PROPS DO DASHBOARD
// ==========================================================

type DashboardProps = {
  nomeDaLoja: string;
  veiculos: Veiculo[];
  gastos: Gasto[];
  onCadastrarVeiculo: () => void;
  onAdicionarGasto: (veiculo: Veiculo) => void;
  onVoltar: () => void;
};

// ==========================================================
// DASHBOARD
// ==========================================================

export function Dashboard({
  nomeDaLoja,
  veiculos,
  gastos,
  onCadastrarVeiculo,
  onAdicionarGasto,
  onVoltar,
}: DashboardProps) {
  // ========================================================
  // DINHEIRO INVESTIDO
  // ========================================================

  const dinheiroInvestido = veiculos.reduce(
    (total, veiculo) =>
      total + Number(veiculo.valorCompra || 0),
    0,
  );

  // ========================================================
  // TOTAL DE GASTOS DA LOJA
  // ========================================================

  const totalGastos = gastos.reduce(
    (total, gasto) => total + gasto.valor,
    0,
  );

  // ========================================================
  // CUSTO TOTAL DA LOJA
  // ========================================================

  const custoTotal = dinheiroInvestido + totalGastos;

  return (
    <div className="dashboard">
      <main className="dashboard-container">
        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <header className="dashboard-header">
          <h1>{nomeDaLoja}</h1>

          <p>Painel de gestão</p>
        </header>

        {/* ==================================================
            RESUMO
        ================================================== */}

        <section className="resumo">
          <div className="card">
            <span className="icone">💰</span>

            <div>
              <p>Dinheiro Investido</p>

              <strong>
                R$ {dinheiroInvestido.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="card">
            <span className="icone">🔧</span>

            <div>
              <p>Total em Gastos</p>

              <strong>
                R$ {totalGastos.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="card">
            <span className="icone">🏦</span>

            <div>
              <p>Custo Total</p>

              <strong>
                R$ {custoTotal.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="card">
            <span className="icone">🚗</span>

            <div>
              <p>Veículos em estoque</p>

              <strong>{veiculos.length}</strong>
            </div>
          </div>

          <div className="card">
            <span className="icone">📈</span>

            <div>
              <p>Lucro estimado</p>

              <strong>R$ 0,00</strong>
            </div>
          </div>
        </section>

        {/* ==================================================
            AÇÕES
        ================================================== */}

        <section className="acoes">
          <button
            type="button"
            className="btn-veiculo"
            onClick={onCadastrarVeiculo}
          >
            + Cadastrar novo veículo
          </button>

          <button
            type="button"
            className="btn-voltar"
            onClick={onVoltar}
          >
            ← Voltar
          </button>
        </section>

        {/* ==================================================
            LISTA DE VEÍCULOS
        ================================================== */}

        <section className="lista-veiculos">
          <h2>Veículos em estoque</h2>

          {veiculos.length === 0 ? (
            <p className="sem-veiculos">
              Nenhum veículo cadastrado ainda.
            </p>
          ) : (
            <div className="veiculos-grid">
              {veiculos.map((veiculo) => {
                // ==================================================
                // GASTOS DESTE VEÍCULO
                // ==================================================

                const gastosDoVeiculo = gastos.filter(
                  (gasto) =>
                    gasto.veiculoId === veiculo.id,
                );

                // ==================================================
                // TOTAL DOS GASTOS DESTE VEÍCULO
                // ==================================================

                const totalGastosVeiculo =
                  gastosDoVeiculo.reduce(
                    (total, gasto) =>
                      total + gasto.valor,
                    0,
                  );

                // ==================================================
                // VALOR DE COMPRA
                // ==================================================

                const valorCompra =
                  Number(
                    veiculo.valorCompra || 0,
                  );

                // ==================================================
                // CUSTO REAL
                // ==================================================

                const custoReal =
                  valorCompra +
                  totalGastosVeiculo;

                return (
                  <article
                    className="card-veiculo"
                    key={veiculo.id}
                  >
                    {/* ==========================================
                        TOPO
                    ========================================== */}

                    <div className="veiculo-topo">
                      <div>
                        <span className="tipo-veiculo">
                          {veiculo.tipo === "moto"
                            ? "🏍️ Moto"
                            : "🚗 Carro"}
                        </span>

                        <h3>
                          {veiculo.marca}{" "}
                          {veiculo.modelo}
                        </h3>
                      </div>

                      <span className="ano-veiculo">
                        {veiculo.ano}
                      </span>
                    </div>

                    {/* ==========================================
                        DADOS DO VEÍCULO
                    ========================================== */}

                    <div className="dados-veiculo">
                      <p>
                        <strong>Cor:</strong>{" "}
                        {veiculo.cor}
                      </p>

                      {veiculo.placa && (
                        <p>
                          <strong>Placa:</strong>{" "}
                          {veiculo.placa}
                        </p>
                      )}

                      {veiculo.quilometragem && (
                        <p>
                          <strong>
                            Quilometragem:
                          </strong>{" "}
                          {veiculo.quilometragem} km
                        </p>
                      )}

                      <p>
                        <strong>Compra:</strong> R${" "}
                        {valorCompra.toFixed(2)}
                      </p>

                      <p>
                        <strong>
                          Data de compra:
                        </strong>{" "}
                        {veiculo.dataCompra}
                      </p>

                      <p>
                        <strong>
                          Documentação:
                        </strong>{" "}
                        {veiculo.situacao}
                      </p>
                    </div>

                    {/* ==========================================
                        OBSERVAÇÕES
                    ========================================== */}

                    {veiculo.observacoes && (
                      <div className="observacao-veiculo">
                        <strong>
                          Observações:
                        </strong>

                        <p>
                          {veiculo.observacoes}
                        </p>
                      </div>
                    )}

                    {/* ==========================================
                        GASTOS
                    ========================================== */}

                    <div className="gastos-veiculo">
                      <div className="gastos-titulo">
                        <strong>
                          Gastos do veículo
                        </strong>

                        <strong>
                          R${" "}
                          {totalGastosVeiculo.toFixed(
                            2,
                          )}
                        </strong>
                      </div>

                      {gastosDoVeiculo.length ===
                      0 ? (
                        <p className="sem-gastos">
                          Nenhum gasto registrado.
                        </p>
                      ) : (
                        <div className="lista-gastos">
                          {gastosDoVeiculo.map(
                            (gasto) => (
                              <div
                                className="gasto-item"
                                key={gasto.id}
                              >
                                <div>
                                  <strong>
                                    {gasto.tipo}
                                  </strong>

                                  {gasto.descricao && (
                                    <p>
                                      {
                                        gasto.descricao
                                      }
                                    </p>
                                  )}

                                  <small>
                                    {new Date(
                                      `${gasto.dataGasto}T00:00:00`,
                                    ).toLocaleDateString(
                                      "pt-BR",
                                    )}
                                  </small>
                                </div>

                                <strong>
                                  R${" "}
                                  {gasto.valor.toFixed(
                                    2,
                                  )}
                                </strong>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>

                    {/* ==========================================
                        CUSTO REAL
                    ========================================== */}

                    <div className="custo-real">
                      <span>
                        Custo real
                      </span>

                      <strong>
                        R${" "}
                        {custoReal.toFixed(2)}
                      </strong>
                    </div>

                    {/* ==========================================
                        AÇÕES DO VEÍCULO
                    ========================================== */}

                    <div className="acoes-veiculo">
                      <button
                        type="button"
                        className="btn-gasto"
                        onClick={() =>
                          onAdicionarGasto(
                            veiculo,
                          )
                        }
                      >
                        + Adicionar gasto
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}