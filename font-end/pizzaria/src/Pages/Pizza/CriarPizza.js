import React, { useState } from "react";
import axios from "axios";
import CustomInput from "../../Util/CustomInput";
import CustomButton from "../../Util/CustomButton";

function PizzaForm() {
  const [pizza, setPizza] = useState({
    imagem: "",
    titulo: "",
    descricao: "",
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
      const response = await axios.post("http://localhost:8080/pizzas/adicionar", pizza);
      console.log(response.data);
      setMensagem("Pizza adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar pizza:", error);
      if (error.response) {
        setMensagem("Erro ao adicionar pizza: " + error.response.data);
      } else {
        setMensagem("Erro ao adicionar pizza: " + error.message);
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
          placeholder="Imagem"
          value={pizza.imagem}
          onChange={handleChange}
          required
        />
        <CustomInput
          type="text"
          name="titulo"
          placeholder="Título"
          value={pizza.titulo}
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
        <CustomButton text="Adicionar Sabor" />
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default PizzaForm;
