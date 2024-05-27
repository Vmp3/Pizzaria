package projeto.pizzaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carrinho")
public class CarrinhoRequestDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tamanho;
    private String sabor1;
    private String sabor2;
    private String sabor3;
    private double valor;

    public CarrinhoRequestDTO() {}

    public CarrinhoRequestDTO(String tamanho, String sabor1, String sabor2, String sabor3, double valor) {
        this.tamanho = tamanho;
        this.sabor1 = sabor1;
        this.sabor2 = sabor2;
        this.sabor3 = sabor3;
        this.valor = valor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public String getSabor1() {
        return sabor1;
    }

    public void setSabor1(String sabor1) {
        this.sabor1 = sabor1;
    }

    public String getSabor2() {
        return sabor2;
    }

    public void setSabor2(String sabor2) {
        this.sabor2 = sabor2;
    }

    public String getSabor3() {
        return sabor3;
    }

    public void setSabor3(String sabor3) {
        this.sabor3 = sabor3;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
