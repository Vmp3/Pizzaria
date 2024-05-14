// JdbcAccountRepository.java
package projeto.pizzaria.repository.JDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;

import projeto.pizzaria.model.AccountRequestDTO;
import projeto.pizzaria.repository.AccountRepository;

@Repository
public class JdbcAccountRepository implements AccountRepository {
    private final DataSource dataSource;

    public JdbcAccountRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(AccountRequestDTO requestDTO) {
        String sql = "INSERT INTO accounts (cpf, nome, cep, endereco, numero, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            // Verificar se o email já existe
            if (emailExists(connection, requestDTO.getEmail())) {
                throw new IllegalStateException("O email já está cadastrado.");
            }

            // Verificar se o CPF já existe
            if (cpfExists(connection, requestDTO.getCpf())) {
                throw new IllegalStateException("O CPF já está cadastrado.");
            }

            // Inserir o novo registro
            statement.setString(1, requestDTO.getCpf());
            statement.setString(2, requestDTO.getNome());
            statement.setString(3, requestDTO.getCep());
            statement.setString(4, requestDTO.getEndereco());
            statement.setString(5, requestDTO.getNumero());
            statement.setString(6, requestDTO.getEmail());
            statement.setString(7, requestDTO.getSenha());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao criar conta.", e);
        }
    }

    private boolean emailExists(Connection connection, String email) throws SQLException {
        String sql = "SELECT COUNT(*) FROM accounts WHERE email = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1) > 0;
                }
            }
        }
        return false;
    }

    private boolean cpfExists(Connection connection, String cpf) throws SQLException {
        String sql = "SELECT COUNT(*) FROM accounts WHERE cpf = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, cpf);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1) > 0;
                }
            }
        }
        return false;
    }
}
