import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrinho.css';

function Carrinho() {
  const [pizzas, setPizzas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchPizzas = () => {
      try {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setPizzas(carrinho);
      } catch (error) {
        setErro('Erro ao buscar pizzas: ' + error.message);
      }
    };

    fetchPizzas();

    const handleStorageChange = (event) => {
      if (event.key === 'carrinho') {
        fetchPizzas();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemovePizza = async (id) => {
    try {
      console.log('ID do item sendo removido:', id); // Adiciona o console.log para exibir o ID
      // Remover do banco de dados
      await axios.delete(`http://localhost:8080/carrinho/remover/${id}`);
      
      // Filtra as pizzas removendo apenas a que possui o ID correspondente
      const updatedPizzas = pizzas.filter((pizza) => pizza.id !== id);
      
      // Atualiza o estado e o localStorage com as pizzas filtradas
      setPizzas(updatedPizzas);
      localStorage.setItem('carrinho', JSON.stringify(updatedPizzas));
    } catch (error) {
      setErro('Erro ao remover pizza: ' + error.message);
    }
  };

  return (
    <div className="grid-container">
      <h2>Listagem de Sabores no Carrinho</h2>
      {erro && <p>{erro}</p>}
      <div className="grid">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="grid-item">
            <h3>{pizza.tamanho}</h3>
            {pizza.sabor1 && <p>Sabor 1: {pizza.sabor1}</p>}
            {pizza.sabor2 && <p>Sabor 2: {pizza.sabor2}</p>}
            {pizza.sabor3 && <p>Sabor 3: {pizza.sabor3}</p>}
            <p>Valor: R$ {pizza.valor.toFixed(2)}</p>
            <button onClick={() => handleRemovePizza(pizza.id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carrinho;
