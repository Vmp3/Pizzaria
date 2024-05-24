package projeto.pizzaria.repository;

import projeto.pizzaria.model.PizzaRequestDTO;

import java.util.List;

public interface PizzaRepository {
    void save(PizzaRequestDTO pizzaDTO);
    List<PizzaRequestDTO> findAll();
    void update(PizzaRequestDTO pizzaDTO);
    PizzaRequestDTO findById(Long id);
}
