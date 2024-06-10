package projeto.pizzaria.repository;

import projeto.pizzaria.model.CarrinhoRequestDTO;

import java.util.List;

public interface CarrinhoRepository {
    void save(CarrinhoRequestDTO carrinhoDTO);
    List<CarrinhoRequestDTO> findAll();
    void update(CarrinhoRequestDTO carrinhoDTO);
    CarrinhoRequestDTO findById(Long id);
}
