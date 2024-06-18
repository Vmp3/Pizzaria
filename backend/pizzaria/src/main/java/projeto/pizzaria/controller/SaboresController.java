package projeto.pizzaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.pizzaria.model.SaboresRequestDTO;
import projeto.pizzaria.repository.SaboresRepository;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/sabores")
public class SaboresController {

    private final SaboresRepository saboresRepository;

    public SaboresController(SaboresRepository saboresRepository) {
        this.saboresRepository = saboresRepository;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarSabor(@RequestBody SaboresRequestDTO saborDTO) {
        if (saborDTO.getSabor() == null || saborDTO.getDescricao() == null || saborDTO.getValor() == null) {
            return ResponseEntity.badRequest().body("Sabor, descrição e valor são obrigatórios.");
        }

        try {
            saboresRepository.save(saborDTO);
            return ResponseEntity.ok("Sabor de pizza adicionado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar sabor de pizza: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<SaboresRequestDTO>> listarSabores() {
        try {
            List<SaboresRequestDTO> sabores = saboresRepository.findAll();
            return ResponseEntity.ok(sabores);
        } catch (Exception e) {
            System.err.println("Erro ao listar sabores de pizza: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarSabor(@PathVariable Long id, @RequestBody SaboresRequestDTO saborDTO) {
        if (saborDTO.getSabor() == null || saborDTO.getDescricao() == null || saborDTO.getValor() == null) {
            return ResponseEntity.badRequest().body("Sabor, descrição e valor são obrigatórios.");
        }

        SaboresRequestDTO existingSabor = saboresRepository.findById(id);
        if (existingSabor == null) {
            return ResponseEntity.notFound().build();
        }

        existingSabor.setSabor(saborDTO.getSabor());
        existingSabor.setDescricao(saborDTO.getDescricao());
        existingSabor.setValor(saborDTO.getValor());
        existingSabor.setTamanho(saborDTO.getTamanho());
        existingSabor.setImagem(saborDTO.getImagem());

        try {
            saboresRepository.update(existingSabor);
            return ResponseEntity.ok("Sabor de pizza atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar sabor de pizza: " + e.getMessage());
        }
    }
}
