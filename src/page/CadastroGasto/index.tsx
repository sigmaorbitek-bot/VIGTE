import "./index.css";
import { useState } from "react";
import type { Veiculo } from "../../types/Veiculo";
import { supabase } from "../../lib/supabase";

type CadastroGastoProps = {
  veiculo: Veiculo;
  onSalvarGasto: () => void;
  onVoltar: () => void;
};

export function CadastroGasto({
  veiculo,
  onSalvarGasto,
  onVoltar,
}: CadastroGastoProps) {
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataGasto, setDataGasto] = useState("");

  async function salvarGasto() {
    // ==========================================================
    // VALIDAÇÃO
    // ==========================================================

    if (!tipo) {
      alert("Selecione o tipo de gasto.");
      return;
    }

    if (!valor) {
      alert("Informe o valor do gasto.");
      return;
    }

    if (!dataGasto) {
      alert("Informe a data do gasto.");
      return;
    }

    // ==========================================================
    // CONVERTER VALOR
    // ==========================================================

    const valorNumerico = Number(valor);

    if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    // ==========================================================
    // SALVAR NO SUPABASE
    // ==========================================================

    const { data, error } = await supabase
      .from("gastos")
      .insert({
        veiculo_id: veiculo.id,
        tipo,
        descricao: descricao || null,
        valor: valorNumerico,
        data_gasto: dataGasto,
      })
      .select()
      .single();

    // ==========================================================
    // VERIFICAR ERRO
    // ==========================================================

    if (error) {
      console.error("Erro ao cadastrar gasto:", error);

      alert("Não foi possível salvar o gasto.");

      return;
    }

    // ==========================================================
    // CONFIRMAR
    // ==========================================================

    console.log("Gasto salvo com sucesso:", data);

    alert("Gasto cadastrado com sucesso!");

    // Volta para o Dashboard.
    onSalvarGasto();
  }

  return (
    <div className="cadastro-gasto">
      <header className="header">
        <h1>Adicionar gasto</h1>

        <p>
          {veiculo.marca} {veiculo.modelo} — {veiculo.ano}
        </p>
      </header>

      <form className="form-gasto">
        <div className="campo">
          <label htmlFor="tipo">Tipo de gasto</label>

          <select
            id="tipo"
            value={tipo}
            onChange={(evento) => setTipo(evento.target.value)}
          >
            <option value="">Selecione</option>

            <option value="pecas">Peças</option>
            <option value="pneus">Pneus</option>
            <option value="mecanico">Mecânico</option>
            <option value="funilaria">Funilaria</option>
            <option value="pintura">Pintura</option>
            <option value="documentacao">Documentação</option>
            <option value="transporte">Transporte</option>
            <option value="lavagem">Lavagem</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="descricao">
            Descrição <span>(opcional)</span>
          </label>

          <input
            id="descricao"
            type="text"
            placeholder="Ex: Troca do pneu traseiro"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="valor">Valor</label>

          <input
            id="valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="Ex: 350.00"
            value={valor}
            onChange={(evento) => setValor(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="dataGasto">Data do gasto</label>

          <input
            id="dataGasto"
            type="date"
            value={dataGasto}
            onChange={(evento) => setDataGasto(evento.target.value)}
          />
        </div>

        <section className="acoes">
          <button
            type="button"
            className="btn-salvar"
            onClick={salvarGasto}
          >
            Salvar gasto
          </button>

          <button
            type="button"
            className="btn-voltar"
            onClick={onVoltar}
          >
            ← Voltar
          </button>
        </section>
      </form>
    </div>
  );
}
