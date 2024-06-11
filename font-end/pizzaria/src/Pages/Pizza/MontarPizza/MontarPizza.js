import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MontarPizza.css';

function MontarPizza() {
  const [tamanho, setTamanho] = useState('');
  const [numSabores, setNumSabores] = useState(0);
  const [sabores, setSabores] = useState(Array.from({ length: 3 }, () => ''));
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(null);
  const [saboresDisponiveis, setSaboresDisponiveis] = useState([]);

  useEffect(() => {
    const fetchSaboresDisponiveis = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pizzas/listar');
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
    setSabores(Array.from({ length: 3 }, () => ''));
  };

  const handleNumSaboresChange = (event) => {
    const selectedNumSabores = parseInt(event.target.value);
    setNumSabores(selectedNumSabores);
    setSabores(Array.from({ length: selectedNumSabores }, () => ''));
  };

  const handleSaborChange = (index, event) => {
    const newSabores = [...sabores];
    newSabores[index] = event.target.value;
    setSabores(newSabores);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valorTotal = 0;
    if (tamanho === 'Pequena') {
      valorTotal = 69;
    } else if (tamanho === 'Média') {
      valorTotal = 89;
    } else if (tamanho === 'Grande') {
      valorTotal = 99;
    }
  
    const carrinhoItem = {
      tamanho: tamanho,
      sabor1: sabores[0] || null,
      sabor2: sabores[1] || null,
      sabor3: sabores[2] || null,
      valor: valorTotal
    };
  
    try {
      // Salvar o carrinho no localStorage antes de enviar para o servidor
      const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
      const novoCarrinho = [...carrinhoAtual, carrinhoItem];
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  
      // Salvar o carrinho no servidor e receber o ID gerado
      const response = await axios.post('http://localhost:8080/carrinho/adicionar', carrinhoItem);
      const idPizzaSalva = response.data; // ID da pizza salva
  
      console.log('ID da pizza salva:', idPizzaSalva);
  
      // Adicionar o ID à pizza antes de salvar no localStorage
      const pizzaComID = { ...carrinhoItem, id: idPizzaSalva };
      const novoCarrinhoComID = [...carrinhoAtual, pizzaComID];
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinhoComID));
  
      // Limpar qualquer erro anterior e definir a mensagem de sucesso
      setErro(null);
      setMensagem('Pedido concluído e salvo com sucesso!');
    } catch (error) {
      // Em caso de erro, definir a mensagem de erro
      setErro('Erro ao concluir pedido: ' + error.message);
      setMensagem('');
    }
  };
  
  

  return (
    <div>
      <h2>Montar Pizza</h2>
      {erro && <p className="error-message">{erro}</p>}
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tamanho:</label>
          <select value={tamanho} onChange={handleTamanhoChange} required>
            <option value="">Selecione o tamanho</option>
            <option value="Pequena">Pequena</option>
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        {tamanho && (
          <div>
            <label>Número de sabores:</label>
            <select value={numSabores} onChange={handleNumSaboresChange} required>
              <option value="">Selecione a quantidade</option>
              {[...(tamanho === 'Média' ? [1, 2] : tamanho === 'Grande' ? [1, 2, 3] : [1])].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        )}
        {tamanho && numSabores > 0 && (
          <div>
            {Array.from({ length: numSabores }, (_, index) => (
              <div key={index}>
                <label>{`Sabor ${index + 1}:`}</label>
              
                <select value={sabores[index] || ''} onChange={(e) => handleSaborChange(index, e)} required>
                  <option value="">Selecione o sabor</option>
                  {saboresDisponiveis.map((pizza) => (
                    <option key={pizza.id} value={pizza.titulo}>{pizza.titulo}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Enviar Carrinho</button>
      </form>
    </div>
  );
}

export default MontarPizza;
