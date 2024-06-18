import React, { useState } from "react";
import axios from "axios";
import CustomInput from "../../../Util/CustomInput";
import CustomButton from "../../../Util/CustomButton";
import "./CriarPizza.css";

function PizzaForm() {
  const [pizza, setPizza] = useState({
    imagem: "",
    sabor: "",
    descricao: "",
    valor: "",
    tamanho: ""  // Adicione os campos necessários conforme seu modelo no backend
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPizza((prevPizza) => ({
      ...prevPizza,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/sabores/adicionar", pizza);
      console.log(response.data);
      setMensagem("Sabor de pizza adicionado com sucesso!");
      // Limpar o formulário após adicionar com sucesso, se necessário
      setPizza({
        imagem: "",
        sabor: "",
        descricao: "",
        valor: "",
        tamanho: ""
      });
    } catch (error) {
      console.error("Erro ao adicionar sabor de pizza:", error);
      if (error.response) {
        setMensagem("Erro ao adicionar sabor de pizza: " + error.response.data);
      } else {
        setMensagem("Erro ao adicionar sabor de pizza: " + error.message);
      }
    }
  };

  return (
    <div className="pizza-form-container">
      <h2>Adicionar Sabores</h2>
      <form onSubmit={handleSubmit} className="pizza-form">
        <CustomInput
          type="text"
          name="imagem"
          placeholder="Imagem URL"
          value={pizza.imagem}
          onChange={handleChange}
          required
        />
        <CustomInput
          type="text"
          name="sabor"
          placeholder="Sabor"
          value={pizza.sabor}
          onChange={handleChange}
          required
        />
        <CustomInput
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={pizza.descricao}
          onChange={handleChange}
          required
        />
        <CustomInput
          type="text"
          name="valor"
          placeholder="Valor"
          value={pizza.valor}
          onChange={handleChange}
          required
        />
        <div>
          <label>Tamanho:</label>
          <select
            name="tamanho"
            value={pizza.tamanho}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tamanho</option>
            <option value="Pequena">Pequena</option>
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <CustomButton text="Adicionar Sabor" />
      </form>
      <p className="mensagem">{mensagem}</p>
    </div>
  );
}

export default PizzaForm;
