import "./Calculator.css";
import { create, all } from "mathjs";
import { useState } from "react";

const math = create(all);

const limitedEvaluate = math.evaluate;

math.import({
  'import': () => { throw new Error('Function disabled') },
  'createUnit': () => { throw new Error('Function disabled') },
  'evaluate': () => { throw new Error('Function disabled') },
  'parse': () => { throw new Error('Function disabled') },
  'simplify': () => { throw new Error('Function disabled') },
  'derivative': () => { throw new Error('Function disabled') },
}, { override: true });

function Calculator() {
  // aqui é onde setamos o state
  const [valorNoDisplay, setValorNoDisplay] = useState("0");
  const [JaCalculou, setJaCalculou] = useState(false);
  const [historico, setHistorico] = useState<string[]>([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(true);

  // função para alternar entre modo escuro e claro
  const toggleModo = () => {
    setModoEscuro(!modoEscuro);
  };

  // função para mudar o valor ao clicar nos botões
  const mudarValorAoClicar = (buttonValue: string) => {
    if (valorNoDisplay === "0" || JaCalculou === true) {
      setValorNoDisplay(buttonValue);
      setJaCalculou(false);
    } else if (JaCalculou === false) {
      setValorNoDisplay(valorNoDisplay + buttonValue);
    }
  };

  // função para limpar o display
  const limparValor = () => {
    setValorNoDisplay("0");
    setJaCalculou(false);
  };

  // Toggle para mostrar/esconder histórico
  const toggleHistorico = () => {
    setMostrarHistorico(!mostrarHistorico);
  };

  // Limpar histórico
  const limparHistorico = () => {
    setHistorico([]);
  };

  // Usar valor do histórico no display
  const usarDoHistorico = (resultado: string) => {
    setValorNoDisplay(resultado);
    setJaCalculou(true);
  };

  // função para calcular o resultado
  const calcularResultado = () => {
    try {
      const resultado = limitedEvaluate(valorNoDisplay);

      if (!isFinite(resultado)) {
        setValorNoDisplay("Erro");
      } else {
        setHistorico((prev) => [...prev, `${valorNoDisplay} = ${resultado}`]);
        setValorNoDisplay(resultado.toString());
      }

      setJaCalculou(true);
    } catch {
      setValorNoDisplay("Erro");
      setJaCalculou(true);
    }
  };

  return (
    // estrutura do componente
    <div className={`calculator ${modoEscuro ? "modo-escuro" : "modo-claro"}`}>
      <div className="header-buttons">
        <button
          className="btn-toggle-modo"
          onClick={toggleModo}
          title={modoEscuro ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {modoEscuro ? "☀️" : "🌙"}
        </button>
        <button
          className={`btn-toggle-historico ${mostrarHistorico ? "ativo" : ""}`}
          onClick={toggleHistorico}
        >
          H
        </button>
      </div>

      {mostrarHistorico && (
        <div className="historico-container">
          <div className="historico-header">
            <span>Histórico</span>
            <button onClick={limparHistorico}>Limpar</button>
          </div>
          {historico.length === 0 ? (
            <p className="historico-vazio">Nenhum cálculo ainda</p>
          ) : (
            historico.map((item, index) => {
              const resultado = item.split(" = ")[1];
              return (
                <div
                  key={index}
                  className="historico-item"
                  onClick={() => usarDoHistorico(resultado)}
                >
                  {item}
                </div>
              );
            })
          )}
        </div>
      )}

      <div className="display">{valorNoDisplay}</div>

      <div className="buttonsRow">
        <button onClick={() => mudarValorAoClicar("(")}>(</button>
        <button onClick={() => mudarValorAoClicar(")")}>)</button>
        <button onClick={() => mudarValorAoClicar("%")}>%</button>
        <button onClick={limparValor}>C</button>
      </div>
      <div className="buttonsRow">
        <button onClick={() => mudarValorAoClicar("7")}>7</button>
        <button onClick={() => mudarValorAoClicar("8")}>8</button>
        <button onClick={() => mudarValorAoClicar("9")}>9</button>
        <button onClick={() => mudarValorAoClicar("*")}>*</button>
      </div>
      <div className="buttonsRow">
        <button onClick={() => mudarValorAoClicar("4")}>4</button>
        <button onClick={() => mudarValorAoClicar("5")}>5</button>
        <button onClick={() => mudarValorAoClicar("6")}>6</button>
        <button onClick={() => mudarValorAoClicar("/")}>/</button>
      </div>
      <div className="buttonsRow">
        <button onClick={() => mudarValorAoClicar("1")}>1</button>
        <button onClick={() => mudarValorAoClicar("2")}>2</button>
        <button onClick={() => mudarValorAoClicar("3")}>3</button>
        <button onClick={() => mudarValorAoClicar("-")}>-</button>
      </div>
      <div className="buttonsRow">
        <button onClick={() => mudarValorAoClicar("0")}>0</button>
        <button onClick={() => mudarValorAoClicar(".")}>.</button>
        <button onClick={() => mudarValorAoClicar("+")}>+</button>
        <button onClick={calcularResultado}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
