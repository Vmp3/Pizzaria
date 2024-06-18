package projeto.pizzaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        try {
            // Verifica se o CPF já está cadastrado
            if (accountRepository.cpfExists(requestDTO.getCpf())) {
                return ResponseEntity.badRequest().body("CPF já está cadastrado.");
            }

            // Verifica se o email já está cadastrado
            if (accountRepository.emailExists(requestDTO.getEmail())) {
                return ResponseEntity.badRequest().body("Email já está cadastrado.");
            }

            // Se passou pelas verificações, salva a conta
            accountRepository.save(requestDTO);
            return ResponseEntity.ok("Conta criada com sucesso!");

        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Erro ao criar conta: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO requestDTO) {
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
