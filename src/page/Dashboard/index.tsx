import "./index.css";

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

type DashboardProps = {
  nomeDaLoja: string;
  veiculos: Veiculo[];
  onCadastrarVeiculo: () => void;
  onVoltar: () => void;
};

export function Dashboard({
  nomeDaLoja,
  veiculos,
  onCadastrarVeiculo,
  onVoltar,
}: DashboardProps) {
  const dinheiroInvestido = veiculos.reduce(
    (total, veiculo) => total + Number(veiculo.valorCompra || 0),
    0,
  );

  const lucroEstimado = veiculos.reduce(
    (total, veiculo) =>
      total +
      (Number(veiculo.precoVenda || 0) - Number(veiculo.valorCompra || 0)),
    0,
  );

  return (
    <div className="dashboard">
      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1>{nomeDaLoja}</h1>
          <p>Painel de gestão</p>
        </header>

        <section className="resumo">
          <div className="card">
            <span className="icone">💰</span>

            <div>
              <p>Dinheiro Investido</p>

              <strong>R$ {dinheiroInvestido.toFixed(2)}</strong>
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

              <strong>R$ {lucroEstimado.toFixed(2)}</strong>
            </div>
          </div>
        </section>

        <section className="acoes">
          <button
            type="button"
            className="btn-veiculo"
            onClick={onCadastrarVeiculo}
          >
            + Cadastrar novo veículo
          </button>

          <button type="button" className="btn-voltar" onClick={onVoltar}>
            ← Voltar
          </button>
        </section>

        <section className="lista-veiculos">
          <h2>Veículos em estoque</h2>

          {veiculos.length === 0 ? (
            <p className="sem-veiculos">Nenhum veículo cadastrado ainda.</p>
          ) : (
            <div className="veiculos-grid">
              {veiculos.map((veiculo) => (
                <article className="card-veiculo" key={veiculo.id}>
                  <div className="veiculo-topo">
                    <div>
                      <span className="tipo-veiculo">
                        {veiculo.tipo === "moto" ? "🏍️ Moto" : "🚗 Carro"}
                      </span>

                      <h3>
                        {veiculo.marca} {veiculo.modelo}
                      </h3>
                    </div>

                    <span className="ano-veiculo">{veiculo.ano}</span>
                  </div>

                  <div className="dados-veiculo">
                    <p>
                      <strong>Cor:</strong> {veiculo.cor}
                    </p>

                    {veiculo.placa && (
                      <p>
                        <strong>Placa:</strong> {veiculo.placa}
                      </p>
                    )}

                    {veiculo.quilometragem && (
                      <p>
                        <strong>Quilometragem:</strong> {veiculo.quilometragem}{" "}
                        km
                      </p>
                    )}

                    <p>
                      <strong>Compra:</strong> R$ {veiculo.valorCompra}
                    </p>

                    <p>
                      <strong>Venda estimada:</strong> R$ {veiculo.precoVenda}
                    </p>

                    <p>
                      <strong>Data de compra:</strong> {veiculo.dataCompra}
                    </p>
                  </div>

                  {veiculo.observacoes && (
                    <div className="observacao-veiculo">
                      <strong>Observações:</strong>

                      <p>{veiculo.observacoes}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
