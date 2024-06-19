import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MontarPizza.css';

function MontarPizza() {
  const [tamanho, setTamanho] = useState('');
  const [numSabores, setNumSabores] = useState(0);
  const [sabores, setSabores] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(null);
  const [saboresDisponiveis, setSaboresDisponiveis] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaboresDisponiveis = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sabores/listar');
        setSaboresDisponiveis(response.data);
      } catch (error) {
        setErro('Erro ao buscar sabores de pizzas: ' + error.message);
      }
    };

    fetchSaboresDisponiveis();
  }, []);

  const handleTamanhoChange = (event) => {
    const selectedTamanho = event.target.value;
    setTamanho(selectedTamanho);
    setNumSabores(0);
    setSabores([]);
  };

  const handleNumSaboresChange = (event) => {
    const selectedNumSabores = parseInt(event.target.value);
    setNumSabores(selectedNumSabores);
    setSabores(Array.from({ length: selectedNumSabores }, () => ({ id: '', sabor: '', valor: 0 })));
  };

  const handleSaborChange = (index, event) => {
    const selectedIdSabor = event.target.value;
    console.log('ID do Sabor Selecionado:', selectedIdSabor);

    // Encontrar o sabor na lista saboresDisponiveis pelo id
    const sabor = saboresDisponiveis.find(s => s.idsabor === parseInt(selectedIdSabor, 10));

    if (sabor) {
      console.log('Sabor Encontrado:', sabor);
      const newSabores = [...sabores];
      newSabores[index] = {
        id: parseInt(selectedIdSabor, 10), // Convertendo para número inteiro
        sabor: sabor.sabor,
        valor: sabor.valor
      };
      setSabores(newSabores);
    } else {
      console.error(`Sabor com id ${selectedIdSabor} não encontrado.`);
      setErro(`Sabor com id ${selectedIdSabor} não encontrado.`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tamanho || numSabores === 0 || sabores.some(sabor => !sabor.id)) {
      setErro('Por favor, selecione tamanho e sabores corretamente.');
      return;
    }

    // Calcular o valor total da pizza
    const valorTotal = sabores.reduce((acc, cur) => acc + cur.valor, 0);

    const carrinhoItem = {
      tamanho: tamanho,
      sabores: sabores.map(sabor => ({ id: sabor.id, sabor: sabor.sabor, valor: sabor.valor })),
      valor: valorTotal,
    };

    try {
      const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
      const novoCarrinho = [...carrinhoAtual, carrinhoItem];
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

      setErro(null);
      setMensagem('Pedido concluído e salvo com sucesso!');
      setShowDialog(true);
    } catch (error) {
      setErro('Erro ao concluir pedido: ' + error.message);
      setMensagem('');
    }
  };

  const handleMontarOutraPizza = () => {
    setShowDialog(false);
    setTamanho('');
    setNumSabores(0);
    setSabores([]);
    setMensagem('');
    setErro(null);
  };

  const handleIrParaCarrinho = () => {
    navigate('/carrinho');
  };

  return (
    <div className="montar-pizza-container">
      <h2>Montar Pizza</h2>
      {erro && <p className="error-message">{erro}</p>}
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tamanho:  </label>
          <select value={tamanho} onChange={handleTamanhoChange} required>
            <option value="">Selecione o tamanho</option>
            <option value="Pequena">Pequena</option>
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        {tamanho && (
          <div>
            <label>Número de sabores (1 ou 2):  </label>
            <select value={numSabores} onChange={handleNumSaboresChange} required>
              <option value="">Selecione o número de sabores</option>
              {[1, 2].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        )}
        {tamanho && numSabores > 0 && (
          <div>
            {Array.from({ length: numSabores }, (_, index) => (
              <div key={index}>
                <label>{`Sabor ${index + 1}:  `}</label>
                <select value={sabores[index]?.id || ''} onChange={(e) => handleSaborChange(index, e)} required>
                  <option value="">Selecione o sabor  </option>
                  {saboresDisponiveis.map((sabor) => (
                    <option key={sabor.idsabor} value={sabor.idsabor}>{sabor.sabor}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Enviar Carrinho</button>
      </form>
      
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>Pizza adicionada ao carrinho!</p>
            <button onClick={handleMontarOutraPizza}>Montar outra pizza</button>
            <button onClick={handleIrParaCarrinho}>Ir para o carrinho</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MontarPizza;
