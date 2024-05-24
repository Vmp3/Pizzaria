package projeto.pizzaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pizzas")
public class PizzaRequestDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagem;
    private String titulo;
    private String descricao;

    public PizzaRequestDTO() {}

    public PizzaRequestDTO(String imagem, String titulo, String descricao) {
        this.imagem = imagem;
        this.titulo = titulo;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
