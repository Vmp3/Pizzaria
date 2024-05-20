package projeto.pizzaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import projeto.pizzaria.model.AccountRequestDTO;
import projeto.pizzaria.model.LoginRequestDTO;
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
<<<<<<< Updated upstream
}
=======

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO requestDTO) {
        if (requestDTO.getCpf() == null || requestDTO.getSenha() == null) {
            return ResponseEntity.badRequest().body("CPF e senha são obrigatórios.");
        }

        try {
            boolean isValid = accountRepository.verifyCredentials(requestDTO.getCpf(), requestDTO.getSenha());
            if (isValid) {
                return ResponseEntity.ok("Login realizado com sucesso!");
            } else {
                return ResponseEntity.status(401).body("Credenciais inválidas.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao realizar login: " + e.getMessage());
        }
    }
}
>>>>>>> Stashed changes
