import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { formatCPF } from "../../Util/Utils";
import CustomInput from "../../Util/CustomInput";
import CustomButton from "../../Util/CustomButton";

function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

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
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <CustomInput
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          required
        />
        <CustomInput
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <CustomButton text="Login"/>
      </form>
      <p className="mensagem">{mensagem}</p>
    </div>
  );
}

export default Login;
