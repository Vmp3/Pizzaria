package projeto.pizzaria.repository;

import projeto.pizzaria.model.AccountRequestDTO;

public interface AccountRepository {
    void save(AccountRequestDTO requestDTO);
<<<<<<< Updated upstream
}
=======
    boolean verifyCredentials(String cpf, String senha);
}
>>>>>>> Stashed changes
