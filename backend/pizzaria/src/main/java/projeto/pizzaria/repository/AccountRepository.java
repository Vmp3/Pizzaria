package projeto.pizzaria.repository;

import projeto.pizzaria.model.AccountRequestDTO;

public interface AccountRepository {
    void save(AccountRequestDTO requestDTO);
}