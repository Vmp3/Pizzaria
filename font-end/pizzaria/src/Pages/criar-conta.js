import React, { useState } from 'react';
import axios from 'axios';

function CriarConta() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/criar-conta', {
        cpf,
        nome,
        endereco,
        numero,
        email,
        senha,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <div>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

export default CriarConta;
