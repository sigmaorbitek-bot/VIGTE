import "./index.css";

type Loja = {
  id: number;
  logo: string;
  nomeDaLoja: string;
  whatsApp: string;
  cidade: string;
};

type MinhasLojasProps = {
  lojas: Loja[];
  onCadastrarLoja: () => void;
  onEntrarLoja: (loja: Loja) => void;
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
          <article className="card-loja" key={loja.id}>
            <div className="logo-loja">
              {loja.logo ? (
                <img
                  src={loja.logo}
                  alt={`Logo da ${loja.nomeDaLoja}`}
                />
              ) : (
                <span className="logo-loja-placeholder">
                  🏪
                </span>
              )}
            </div>

            <div className="informacoes-loja">
              <h2>{loja.nomeDaLoja}</h2>

              <p>
                <span>📍</span>
                {loja.cidade}
              </p>

              <p>
                <span>📱</span>
                {loja.whatsApp}
              </p>
            </div>

            <button
              type="button"
              className="btn-entrar-loja"
              onClick={() => onEntrarLoja(loja)}
            >
              Entrar na loja
            </button>
          </article>
        ))}

        <button
          type="button"
          className="btn-nova-loja"
          onClick={onCadastrarLoja}
        >
          <span className="btn-nova-loja-icone">+</span>

          <span>
            Cadastrar nova loja
          </span>
        </button>
      </main>
    </div>
  );
}