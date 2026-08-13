import "./index.css";
import { useState } from "react";
import type { Veiculo } from "../../types/Veiculo";


type CadastroVeiculoProps = {
  lojaId: number;
  onCadastrarVeiculo: (veiculo: Veiculo) => void;
  onVoltar: () => void;
};

export function CadastrarVeiculo({
  lojaId,
  onCadastrarVeiculo,
  onVoltar,
}: CadastroVeiculoProps) {
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [placa, setPlaca] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [situacao, setSituacao] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [observacoes, setObservacoes] = useState("");

function cadastrarVeiculo() {
  const novoVeiculo: Veiculo = {
    id: Date.now(),
    lojaId,
    tipo,
    marca,
    modelo,
    ano,
    cor,
    placa,
    quilometragem,
    valorCompra,
    situacao,
    dataCompra,
    observacoes,
  };

  console.log("1 - VEÍCULO CRIADO:", novoVeiculo);

  onCadastrarVeiculo(novoVeiculo);

  console.log("2 - FUNÇÃO onCadastrarVeiculo FOI CHAMADA");
}

  return (
    <div className="veiculo">
      <header className="header">
        <h1>Cadastrar veículo</h1>

        <p>Cadastre seu veículo para começar a controlar sua revenda.</p>
      </header>

      <form className="form-veiculo">
        <div className="campo">
          <label htmlFor="tipo">Tipo de veículo</label>

          <select
            id="tipo"
            value={tipo}
            onChange={(evento) => setTipo(evento.target.value)}
          >
            <option value="">Selecione</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="situacao">Situação da documentação</label>

          <select
            id="situacao"
            value={situacao}
            onChange={(evento) => setSituacao(evento.target.value)}
          >
            <option value="">Selecione</option>
            <option value="emdia">Em dia</option>
            <option value="atrasada">Atrasada</option>
            <option value="leilao">Leilão</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="marca">Marca</label>

          <input
            id="marca"
            type="text"
            placeholder="Ex: Honda"
            value={marca}
            onChange={(evento) => setMarca(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="modelo">Modelo</label>

          <input
            id="modelo"
            type="text"
            placeholder="Ex: CG 160"
            value={modelo}
            onChange={(evento) => setModelo(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="ano">Ano</label>

          <input
            id="ano"
            type="number"
            placeholder="Ex: 2024"
            value={ano}
            onChange={(evento) => setAno(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cor">Cor</label>

          <input
            id="cor"
            type="text"
            placeholder="Ex: Preto"
            value={cor}
            onChange={(evento) => setCor(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="placa">
            Placa <span>(opcional)</span>
          </label>

          <input
            id="placa"
            type="text"
            placeholder="Ex: ABC1D23"
            value={placa}
            onChange={(evento) => setPlaca(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="quilometragem">
            Quilometragem <span>(opcional)</span>
          </label>

          <input
            id="quilometragem"
            type="number"
            placeholder="Ex: 35000"
            value={quilometragem}
            onChange={(evento) => setQuilometragem(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="valorCompra">Valor de compra</label>

          <input
            id="valorCompra"
            type="number"
            placeholder="R$ 0,00"
            value={valorCompra}
            onChange={(evento) => setValorCompra(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="data">Data de compra</label>

          <input
            id="data"
            type="date"
            value={dataCompra}
            onChange={(evento) => setDataCompra(evento.target.value)}
          />
        </div>

        <div className="campo-observacoes">
          <label htmlFor="observacoes">
            Observações <span>(opcional)</span>
          </label>

          <textarea
            id="observacoes"
            placeholder="Ex: Precisa trocar pneus..."
            value={observacoes}
            onChange={(evento) => setObservacoes(evento.target.value)}
          />
        </div>

        <section className="acoes">
          <button
            type="button"
            className="btn-cadastrar"
            onClick={cadastrarVeiculo}
          >
            Cadastrar veículo
          </button>

          <button type="button" className="btn-voltar" onClick={onVoltar}>
            ← Voltar
          </button>
        </section>
      </form>
    </div>
  );
}
