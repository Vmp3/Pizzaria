package projeto.pizzaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import projeto.pizzaria.model.AccountRequestDTO;
import projeto.pizzaria.repository.AccountRepository;

@CrossOrigin(origins = "*")
@RestController
public class AccountController {
    private final AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @PostMapping("/criar-conta")
    public ResponseEntity<?> criarConta(@RequestBody AccountRequestDTO requestDTO) {
        if (requestDTO.getCpf() == null || requestDTO.getNome() == null || requestDTO.getCep() == null ||
                requestDTO.getEndereco() == null || requestDTO.getNumero() == null ||
                requestDTO.getEmail() == null || requestDTO.getSenha() == null) {
            return ResponseEntity.badRequest().body("Todos os campos são obrigatórios.");
        }

        try {
            accountRepository.save(requestDTO);
            return ResponseEntity.ok("Conta criada com sucesso!");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Erro ao criar conta: " + e.getMessage());
        }
    }
}