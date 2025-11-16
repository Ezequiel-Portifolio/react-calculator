import "./Calculator.css";
import { useState } from "react";

function Calculator() {
  // aqui é onde setamos o state
  const [valorNoDisplay, setValorNoDisplay] = useState("0");

  // função para mudar o valor ao clicar nos botões
  const mudarValorAoClicar = (buttonValue: string) => {
    if (valorNoDisplay === "0") {
      setValorNoDisplay(buttonValue);
    } else {
      setValorNoDisplay(valorNoDisplay + buttonValue);
    }
  };

  // função para limpar o display
  const limparValor = () => {
    setValorNoDisplay("0");
  };

  // função para calcular o resultado
  const calcularResultado = () => {
    try {
      const resultado = eval(valorNoDisplay);
      setValorNoDisplay(resultado.toString());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setValorNoDisplay("Erro");
    }
  };

  return (
    // estrutura do componente
    <div className="calculator">
      // display que mostra o valor atual
      <div className="display">{valorNoDisplay}</div>
      /m
      <div className="buttonsColumn">
        <button onClick={() => mudarValorAoClicar("7")}>7</button>
        <button onClick={() => mudarValorAoClicar("8")}>8</button>
        <button onClick={() => mudarValorAoClicar("9")}>9</button>
        <button onClick={() => mudarValorAoClicar("/")}>/</button>
      </div>
      <div className="buttonsColumn">
        <button onClick={() => mudarValorAoClicar("4")}>4</button>
        <button onClick={() => mudarValorAoClicar("5")}>5</button>
        <button onClick={() => mudarValorAoClicar("6")}>6</button>
        <button onClick={limparValor}>C</button>
      </div>
      <div className="buttonsColumn">
        <button onClick={() => mudarValorAoClicar("1")}>1</button>
        <button onClick={() => mudarValorAoClicar("2")}>2</button>
        <button onClick={() => mudarValorAoClicar("3")}>3</button>
        <button onClick={() => mudarValorAoClicar("-")}>-</button>
      </div>
      <div className="buttonsColumn">
        <button onClick={() => mudarValorAoClicar("0")}>0</button>
        <button onClick={() => mudarValorAoClicar(".")}>.</button>
        <button onClick={() => mudarValorAoClicar("+")}>+</button>
        <button onClick={calcularResultado}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
