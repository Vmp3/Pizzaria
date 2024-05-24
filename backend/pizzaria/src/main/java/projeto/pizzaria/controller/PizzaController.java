package projeto.pizzaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.pizzaria.model.PizzaRequestDTO;
import projeto.pizzaria.repository.PizzaRepository;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pizzas")
public class PizzaController {

    private final PizzaRepository pizzaRepository;

    public PizzaController(PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarPizza(@RequestBody PizzaRequestDTO pizzaDTO) {
        if (pizzaDTO.getTitulo() == null || pizzaDTO.getImagem() == null || pizzaDTO.getDescricao() == null) {
            return ResponseEntity.badRequest().body("Título, imagem e descrição são obrigatórios.");
        }

        try {
            pizzaRepository.save(pizzaDTO);
            return ResponseEntity.ok("Pizza adicionada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar pizza: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PizzaRequestDTO>> listarPizzas() {
        List<PizzaRequestDTO> pizzas = pizzaRepository.findAll();
        return ResponseEntity.ok(pizzas);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarPizza(@PathVariable Long id, @RequestBody PizzaRequestDTO pizzaDTO) {
        if (pizzaDTO.getTitulo() == null || pizzaDTO.getImagem() == null || pizzaDTO.getDescricao() == null) {
            return ResponseEntity.badRequest().body("Título, imagem e descrição são obrigatórios.");
        }

        PizzaRequestDTO existingPizza = pizzaRepository.findById(id);
        if (existingPizza == null) {
            return ResponseEntity.notFound().build();
        }

        existingPizza.setImagem(pizzaDTO.getImagem());
        existingPizza.setTitulo(pizzaDTO.getTitulo());
        existingPizza.setDescricao(pizzaDTO.getDescricao());

        try {
            pizzaRepository.update(existingPizza);
            return ResponseEntity.ok("Pizza atualizada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar pizza: " + e.getMessage());
        }
    }
}
