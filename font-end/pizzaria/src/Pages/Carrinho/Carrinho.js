import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrinho.css';

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [erro, setErro] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);

    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoAtual);
  }, []);

  const handleRemoverPizza = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const finalizarPedido = async () => {
    try {
      const itensPedido = [];

      carrinho.forEach(item => {
        item.sabores.forEach(sabor => {
          itensPedido.push({
            idPedido: 1,
            sabor: {
              idsabor: sabor.id
            },
            tipo: sabor.tipo
          });
        });
      });

      const pedido = {
        idCliente: userId,
        dataPedido: new Date().toISOString(),
        status: 'PENDENTE',
        total: calcularTotal(),
        itensPedido: itensPedido
      };
  
      console.log('Pedido enviado:', pedido);
  
      const response = await axios.post('http://localhost:8080/carrinho/adicionar', pedido);
  
      console.log('Pedido finalizado com sucesso:', response.data);
      localStorage.removeItem('carrinho');
      setCarrinho([]);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error.response);
      setErro('Erro ao finalizar pedido: ' + error.message);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.valor, 0);
  };

  return (
    <div className="carrinho-container">
      <h2>Carrinho de Compras</h2>
      {erro && <p className="error-message">{erro}</p>}
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="carrinho-items">
          {carrinho.map((item, index) => (
            <div key={index} className="carrinho-item">
              <h3>Pizza {item.tamanho}</h3>
              {item.sabores.map((sabor, saborIndex) => (
                <p key={saborIndex}>Sabor {saborIndex + 1}: {sabor.sabor} ({sabor.tipo})</p>
              ))}
              <p>Valor: {typeof item.valor === 'number' ? `R$ ${item.valor.toFixed(2)}` : 'Valor indisponível'}</p>
              <button onClick={() => handleRemoverPizza(index)}>Remover</button>
            </div>
          ))}
        </div>
      )}
      <p>Total: R$ {calcularTotal().toFixed(2)}</p>
      <button onClick={finalizarPedido} disabled={carrinho.length === 0}>Finalizar Pedido</button>
    </div>
  );
};

export default Carrinho;
