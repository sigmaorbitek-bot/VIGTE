import "./index.css";

type MinhasLojasProps = {
  lojas: {
    id: number;
    logo: string;
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }[];

  onCadastrarLoja: () => void;

  onEntrarLoja: (loja: {
    id: number;
    logo: string;
    nomeDaLoja: string;
    whatsApp: string;
    cidade: string;
  }) => void;
};

export function MinhasLojas({
  lojas,
  onCadastrarLoja,
  onEntrarLoja,
}: MinhasLojasProps) {
  return (
    <div className="minhas-lojas">
      <header className="minhas-lojas-header">
        <h1>Minhas lojas</h1>

        <p>Selecione uma loja para continuar.</p>
      </header>

      <main className="lista-lojas">
        {lojas.map((loja) => (
          <div className="card-loja" key={loja.id}>
            <img src={loja.logo} alt={`Logo da ${loja.nomeDaLoja}`} />

            <div className="informacoes-loja">
              <h2>{loja.nomeDaLoja}</h2>

              <p>📍 {loja.cidade}</p>

              <p>📱 {loja.whatsApp}</p>
            </div>

            <button onClick={() => onEntrarLoja(loja)}>Entrar na loja</button>
          </div>
        ))}

        <button className="btn-nova-loja" onClick={onCadastrarLoja}>
          + Cadastrar nova loja
        </button>
      </main>
    </div>
  );
}
