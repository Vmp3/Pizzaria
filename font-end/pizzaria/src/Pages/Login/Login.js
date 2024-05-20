import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const formatCPF = (value) => {
    let cpfFormatted = value.replace(/\D/g, "");
    cpfFormatted = cpfFormatted.substring(0, 11);
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpfFormatted;
  };

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        cpf,
        senha,
      });
      console.log(response.data);
      setMensagem("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setMensagem("Credenciais inválidas.");
        } else {
          setMensagem("Erro ao fazer login: " + error.response.data);
        }
      } else {
        setMensagem("Erro ao fazer login: " + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default Login;
