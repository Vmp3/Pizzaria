import React, { useState } from "react";
import axios from "axios";
import "./criar-conta.css";
import { formatCPF, formatCEP } from "../../Util/Utils";
import CustomInput from "../../Util/CustomInput";
import CustomButton from "../../Util/CustomButton";

function CriarConta() {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cep, setCep] = useState("");

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
                alert("Erro ao criar conta: " + error.response.data);
            } else {
                alert("Erro ao criar conta: " + error.message);
            }
        }
    };

    return (
        <div className="criar-conta-container">
            <h2>Criar Conta</h2>
            <form onSubmit={handleSubmit} className="criar-conta-form">
                <CustomInput
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleCpfChange}
                    required
                />
                <CustomInput
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <CustomInput
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={handleCepChange}
                    maxLength={9}
                    required
                />
                <CustomInput
                    type="text"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    readOnly
                    required
                />
                <CustomInput
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                />
                <CustomInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <CustomInput
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <CustomButton type="submit" text="Criar Conta" />
            </form>
        </div>
    );
}

export default CriarConta;
