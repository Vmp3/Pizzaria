import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrinho.css'

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const fetchCarrinho = () => {
      const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
      setCarrinho(carrinhoAtual);
    };

    fetchCarrinho();
  }, []);

  const handleRemoverPizza = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const finalizarPedido = async () => {
    try {
      const response = await axios.post('http://localhost:8080/carrinho/adicionar', {
        // Aqui você deve montar o objeto pedidoDTO com os dados necessários
        // Exemplo básico de como montar o pedidoDTO, ajuste conforme sua lógica de negócio
        cliente: { id: 1 }, // Supondo que você tenha o ID do cliente disponível
        dataPedido: new Date(), // Data atual
        status: 'PENDENTE', // Status inicial do pedido
        total: calcularTotal(), // Função para calcular o total do carrinho
        itensPedido: carrinho.map(item => ({
          // Mapeia os itens do carrinho para o formato esperado pelo backend
          // Ajuste conforme a estrutura de ItemPedidoRequestDTO no backend
          quantidade: 1, // Exemplo de quantidade fixa
          produto: { id: item.id }, // Supondo que cada item tenha um ID no seu sistema
          valorUnitario: item.valor // Valor unitário do item
        }))
      });

      // Aqui você pode tratar a resposta, exibir uma mensagem de sucesso, etc.
      console.log('Pedido finalizado com sucesso:', response.data);
      // Limpar o carrinho local após finalizar o pedido
      localStorage.removeItem('carrinho');
      setCarrinho([]);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    }
  };

  const calcularTotal = () => {
    // Implemente a lógica para calcular o total do carrinho
    // Exemplo básico: soma dos valores de todos os itens
    return carrinho.reduce((total, item) => total + item.valor, 0);
  };

  return (
    <div className="carrinho-container">
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="carrinho-items">
          {carrinho.map((item, index) => (
            <div key={index} className="carrinho-item">
              <h3>Pizza {item.tamanho}</h3>
              {item.sabores.map((sabor, saborIndex) => (
                <p key={saborIndex}>Sabor {saborIndex + 1}: {sabor.sabor}</p>
              ))}
              <p>Valor: {typeof item.valor === 'number' ? `R$ ${item.valor.toFixed(2)}` : 'Valor indisponível'}</p>
              <button onClick={() => handleRemoverPizza(index)}>Remover</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={finalizarPedido} disabled={carrinho.length === 0}>Finalizar Pedido</button>
    </div>
  );
};

export default Carrinho;
