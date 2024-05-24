package projeto.pizzaria.repository;

import projeto.pizzaria.model.PedidoRequestDTO;

import java.util.List;

public interface PedidoRepository {
    void save(PedidoRequestDTO pedidoDTO);
    List<PedidoRequestDTO> findAll();
    void update(PedidoRequestDTO pedidoDTO);
    PedidoRequestDTO findById(Long id);
}
