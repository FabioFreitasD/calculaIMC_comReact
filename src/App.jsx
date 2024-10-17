import { useState } from 'react';
import './App.css';

const App = () => {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = (evento) => {
    evento.preventDefault();
    const alturaMetros = parseFloat(altura.replace(',', '.')); // Converte a altura para metros, substituindo vírgula por ponto.
    const pesoKg = parseFloat(peso.replace(',', '.')); // Converte o peso, substituindo vírgula por ponto.
    if (!isNaN(alturaMetros) && !isNaN(pesoKg) && alturaMetros > 0 && pesoKg > 0) {
      const imcCalculado = (pesoKg / (alturaMetros * alturaMetros)).toFixed(2);
      setImc(imcCalculado);

      if (imcCalculado < 18.5) {
        setClassificacao('Abaixo do peso');
      } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
        setClassificacao('Peso normal');
      } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
        setClassificacao('Sobrepeso');
      } else {
        setClassificacao('Obesidade');
      }
    } else {
      setImc(null);
      setClassificacao('Entrada inválida');
    }
  };

  return (
    <div>
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC}>
        <div>
          <label>Altura (m): </label>
          <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} required placeholder="Ex: 1.71" />
        </div>
        <div>
          <label>Peso (Kg): </label>
          <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} required placeholder="Ex: 50.0" />
        </div>
        <button type="submit">Calcular IMC</button>
      </form>
      {imc && (
        <div>
          <h2>Seu IMC: {imc}</h2>
          <h3>Classificação: {classificacao}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
