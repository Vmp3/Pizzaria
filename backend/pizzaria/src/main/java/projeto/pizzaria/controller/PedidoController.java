package projeto.pizzaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.pizzaria.model.PedidoRequestDTO;
import projeto.pizzaria.repository.PedidoRepository;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;

    public PedidoController(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarPedido(@RequestBody PedidoRequestDTO pedidoDTO) {
        try {
            pedidoRepository.save(pedidoDTO);
            return ResponseEntity.ok("Pedido adicionado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao adicionar pedido: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PedidoRequestDTO>> listarPedidos() {
        List<PedidoRequestDTO> pedidos = pedidoRepository.findAll();
        return ResponseEntity.ok(pedidos);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarPedido(@PathVariable Long id, @RequestBody PedidoRequestDTO pedidoDTO) {
        PedidoRequestDTO existingPedido = pedidoRepository.findById(id);
        if (existingPedido == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            pedidoDTO.setId(id);
            pedidoRepository.update(pedidoDTO);
            return ResponseEntity.ok("Pedido atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar pedido: " + e.getMessage());
        }
    }
}
