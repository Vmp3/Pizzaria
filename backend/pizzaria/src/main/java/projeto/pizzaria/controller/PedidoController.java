package projeto.pizzaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.pizzaria.model.PedidoRequestDTO;
import projeto.pizzaria.repository.PedidoRepository;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/carrinho")
public class PedidoController {

    private final PedidoRepository pedidoRepository;

    public PedidoController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarPedido(@RequestBody PedidoRequestDTO pedidoDTO) {
        try {
            if (pedidoDTO.getIdCliente() == null) {
                return ResponseEntity.badRequest().body("Cliente não especificado para o pedido.");
            }

            if (pedidoDTO.getDataPedido() == null) {
                pedidoDTO.setDataPedido(LocalDateTime.now());
            }

            pedidoRepository.save(pedidoDTO);
            return ResponseEntity.ok(pedidoDTO.getIdPedido());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao adicionar ao carrinho: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PedidoRequestDTO>> listarPedidos() {
        List<PedidoRequestDTO> pedidos = pedidoRepository.findAll();
        return ResponseEntity.ok(pedidos);
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> removerPedido(@PathVariable Long id) {
        try {
            pedidoRepository.deleteById(id);
            return ResponseEntity.ok("Pedido removido do carrinho com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao remover do carrinho: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarPedido(@PathVariable Long id, @RequestBody PedidoRequestDTO pedidoDTO) {
        PedidoRequestDTO existingPedido = pedidoRepository.findById(id);
        if (existingPedido == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            if (pedidoDTO.getIdCliente() == null) {
                pedidoDTO.setIdCliente(1L);
            }

            pedidoDTO.setIdPedido(id);
            pedidoRepository.update(pedidoDTO);
            return ResponseEntity.ok("Pedido atualizado no carrinho com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar no carrinho: " + e.getMessage());
        }
    }
}
