package projeto.pizzaria.Repository.JDBC;

import projeto.pizzaria.Repository.AccountRepository;
import projeto.pizzaria.model.AccountRequestDTO;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class JdbcAccountRepository implements AccountRepository {
    private final DataSource dataSource;

    public JdbcAccountRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(AccountRequestDTO requestDTO) {
        String sql = "INSERT INTO accounts (cpf, nome, endereco, numero, email, senha) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, requestDTO.getCpf());
            statement.setString(2, requestDTO.getNome());
            statement.setString(3, requestDTO.getEndereco());
            statement.setString(4, requestDTO.getNumero());
            statement.setString(5, requestDTO.getEmail());
            statement.setString(6, requestDTO.getSenha());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
