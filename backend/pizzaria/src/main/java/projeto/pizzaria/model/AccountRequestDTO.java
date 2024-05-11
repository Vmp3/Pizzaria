package projeto.pizzaria.model;


public class AccountRequestDTO {
    private String cpf;
    private String nome;
    private String endereco;
    private String numero;
    private String email;
    private String senha;

    public AccountRequestDTO() {
    }

    public AccountRequestDTO(String cpf, String nome, String endereco, String numero, String email, String senha) {
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.email = email;
        this.senha = senha;
    }

    // getters e setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
