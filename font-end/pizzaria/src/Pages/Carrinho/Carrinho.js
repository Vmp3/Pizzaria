import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListarPizza.css';

function ListarPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/carrinhos/listar');
        setPizzas(response.data);
      } catch (error) {
        setErro('Erro ao buscar pizzas: ' + error.message);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="grid-container">
      <h2>Listagem de Sabores</h2>
      {erro && <p>{erro}</p>}
      <div className="grid">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="grid-item">
            {pizza.imagem && <img src={pizza.imagem} alt={pizza.titulo} className="pizza-image" />}
            <h3>{pizza.titulo}</h3>
            <span>{pizza.descricao}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarPizzas;
