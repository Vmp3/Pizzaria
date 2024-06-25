import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AtualizarInformacoes.css";
import CustomInput from "../../../Util/CustomInput";
import CustomButton from "../../../Util/CustomButton";
import { formatCEP } from "../../../Util/Utils";

function EditarDadosUsuario() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');

    // Obtém o id do usuário do localStorage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/usuarios/${userId}`);
                setUsuario(response.data);
                setCep(response.data.cep);
                setEndereco(response.data.endereco);
                setNumero(response.data.numero);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        if (userId) {
            fetchUsuario();
        }
    }, [userId]);

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
            const response = await axios.put(`http://localhost:8080/usuarios/${userId}/editar`, {
                ...usuario,
                cep,
                endereco,
                numero,
            });
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    };

    if (!usuario) {
        return <p>Carregando dados do usuário...</p>;
    }

    return (
        <div className="editar-dados-usuario-container">
            <h2>Editar Dados do Usuário</h2>
            <form className="editar-dados-usuario-form" onSubmit={handleSubmit}>
                <CustomInput
                    type="text"
                    placeholder="CPF"
                    value={usuario.cpf}
                    readOnly
                    disabled
                    styleType="disabled"
                    required
                />
                <CustomInput
                    type="text"
                    placeholder="Nome"
                    value={usuario.nome}
                    readOnly
                    disabled
                    styleType="disabled"
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
                    required
                    readOnly={!cep}
                />
                <CustomInput
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                />
                <CustomButton type="submit" text="Salvar Alterações" className="custom-button" />
            </form>
        </div>
    );
}

export default EditarDadosUsuario;
