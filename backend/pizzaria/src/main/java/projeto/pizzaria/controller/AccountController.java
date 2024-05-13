package projeto.pizzaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import projeto.pizzaria.repository.AccountRepository;
import projeto.pizzaria.model.AccountRequestDTO;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")


@RestController
public class AccountController {
    private final AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @PostMapping("/criar-conta")
    public ResponseEntity<?> criarConta(@RequestBody AccountRequestDTO requestDTO) {
        if (requestDTO.getCpf() == null || requestDTO.getNome() == null ||
                requestDTO.getEndereco() == null || requestDTO.getNumero() == null ||
                requestDTO.getEmail() == null || requestDTO.getSenha() == null) {
            return ResponseEntity.badRequest().body("Todos os campos são obrigatórios.");
        }

        accountRepository.save(requestDTO);

        return ResponseEntity.ok("Conta criada com sucesso!");
    }
}
