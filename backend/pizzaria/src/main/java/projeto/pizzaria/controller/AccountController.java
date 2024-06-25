package projeto.pizzaria.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @PostMapping("/criar-conta")
    public ResponseEntity<?> criarConta(@RequestBody AccountRequestDTO requestDTO) {
        try {

            if (accountRepository.cpfExists(requestDTO.getCpf())) {
                return ResponseEntity.badRequest().body("CPF já está cadastrado.");
            }

            if (accountRepository.emailExists(requestDTO.getEmail())) {
                return ResponseEntity.badRequest().body("Email já está cadastrado.");
            }

            accountRepository.save(requestDTO);
            return ResponseEntity.ok("Conta criada com sucesso!");

        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Erro ao criar conta: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO requestDTO) {
        try {
            Long userId = accountRepository.getUserIdByCredentials(requestDTO.getCpf(), requestDTO.getSenha());
            if (userId != null) {
                return ResponseEntity.ok(userId);
            } else {
                return ResponseEntity.status(401).body("Credenciais inválidas.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao realizar login: " + e.getMessage());
        }
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable Long id) {
        try {
            AccountRequestDTO usuario = accountRepository.findById(id);
            if (usuario == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar usuário: " + e.getMessage());
        }
    }

    @PutMapping("/usuarios/{userId}/editar")
    public ResponseEntity<?> editarUsuario(@PathVariable Long userId, @RequestBody AccountRequestDTO requestDTO) {
        try {
            logger.info("Editando usuário com ID: {}", userId);

            AccountRequestDTO usuarioExistente = accountRepository.findById(userId);
            if (usuarioExistente == null) {
                logger.warn("Usuário com ID {} não encontrado.", userId);
                return ResponseEntity.notFound().build();
            }

            // Verificar se o email está sendo modificado
            if (!usuarioExistente.getEmail().equals(requestDTO.getEmail())) {
                return ResponseEntity.badRequest().body("Não é permitido alterar o email do usuário.");
            }

            // Atualiza os campos que podem ser modificados
            usuarioExistente.setCep(requestDTO.getCep());
            usuarioExistente.setEndereco(requestDTO.getEndereco());
            usuarioExistente.setNumero(requestDTO.getNumero());

            logger.info("Dados do usuário antes da atualização: {}", usuarioExistente);
            
            accountRepository.update(usuarioExistente);

            logger.info("Usuário atualizado com sucesso!");

            return ResponseEntity.ok("Usuário atualizado com sucesso!");
        } catch (Exception e) {
            logger.error("Erro ao atualizar usuário", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar usuário: " + e.getMessage());
        }
    }




}
