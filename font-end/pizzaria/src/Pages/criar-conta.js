import React, { useState } from "react";
import axios from "axios";
import "./criar-conta.css";

function CriarConta() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");

  const formatCPF = (value) => {
    let cpfFormatted = value.replace(/\D/g, "");
    cpfFormatted = cpfFormatted.substring(0, 11);
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpfFormatted;
  };

  const formatCEP = (value) => {
    let cepFormatted = value.replace(/\D/g, "");
    cepFormatted = cepFormatted.substring(0, 8);
    cepFormatted = cepFormatted.replace(/(\d{5})(\d)/, "$1-$2");
    return cepFormatted;
  };

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleCepChange = async (event) => {
    const newCep = formatCEP(event.target.value);
    setCep(newCep);

    if (newCep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep.replace("-", "")}/json/`);
        const data = response.data;
        if (!data.erro) {
          setEndereco(data.logradouro);
        } else {
          setEndereco("");
          alert("CEP inválido");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/criar-conta", {
            cpf,
            nome,
            cep,
            endereco,
            numero,
            email,
            senha,
        });
        console.log(response.data);
        alert("Conta criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        if (error.response && error.response.data) {
            alert("Erro ao criar conta: " + error.response.data.message);
        } else {
            alert("Erro ao criar conta: " + error.message);
        }
    }
};



  return (
    <div className="criar-conta-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit} className="criar-conta-form">
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          className="criar-conta-input"
          required
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="criar-conta-input"
          required
        />
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          className="criar-conta-input"
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          readOnly
          className="criar-conta-input"
          required
        />
        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="criar-conta-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="criar-conta-input"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="criar-conta-input"
          required
        />
        <button type="submit" className="criar-conta-button">Criar Conta</button>
      </form>
    </div>
  );
}

export default CriarConta;
