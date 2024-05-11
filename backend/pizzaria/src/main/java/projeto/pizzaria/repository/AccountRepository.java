package projeto.pizzaria.Repository;

import projeto.pizzaria.model.AccountRequestDTO;

public interface AccountRepository {
    void save(AccountRequestDTO requestDTO);
}
