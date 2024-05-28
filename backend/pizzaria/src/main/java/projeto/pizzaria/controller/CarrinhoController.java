package projeto.pizzaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.pizzaria.model.CarrinhoRequestDTO;
import projeto.pizzaria.repository.CarrinhoRepository;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    private final CarrinhoRepository carrinhoRepository;

    public CarrinhoController(CarrinhoRepository carrinhoRepository) {
        this.carrinhoRepository = carrinhoRepository;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarCarrinho(@RequestBody CarrinhoRequestDTO carrinhoDTO) {
        try {
            carrinhoRepository.save(carrinhoDTO);
            return ResponseEntity.ok("Pizza adicionada ao carrinho com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao adicionar ao carrinho: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CarrinhoRequestDTO>> listarcarrinho() {
        List<CarrinhoRequestDTO> carrinho = carrinhoRepository.findAll();
        return ResponseEntity.ok(carrinho);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarCarrinho(@PathVariable Long id, @RequestBody CarrinhoRequestDTO carrinhoDTO) {
        CarrinhoRequestDTO existingCarrinho = carrinhoRepository.findById(id);
        if (existingCarrinho == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            carrinhoDTO.setId(id);
            carrinhoRepository.update(carrinhoDTO);
            return ResponseEntity.ok("Carrinho atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar carrinho: " + e.getMessage());
        }
    }
}
