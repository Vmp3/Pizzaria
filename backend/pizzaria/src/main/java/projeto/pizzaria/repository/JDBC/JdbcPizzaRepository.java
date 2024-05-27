package projeto.pizzaria.repository.JDBC;

import org.springframework.stereotype.Repository;
import projeto.pizzaria.model.PizzaRequestDTO;
import projeto.pizzaria.repository.PizzaRepository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcPizzaRepository implements PizzaRepository {
    private final DataSource dataSource;

    public JdbcPizzaRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(PizzaRequestDTO pizzaDTO) {
        String sql = "INSERT INTO pizzas (imagem, titulo, descricao) VALUES (?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, pizzaDTO.getImagem());
            statement.setString(2, pizzaDTO.getTitulo());
            statement.setString(3, pizzaDTO.getDescricao());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao adicionar pizza.", e);
        }
    }

    @Override
    public List<PizzaRequestDTO> findAll() {
        List<PizzaRequestDTO> pizzas = new ArrayList<>();
        String sql = "SELECT * FROM pizzas";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                PizzaRequestDTO pizza = new PizzaRequestDTO();
                pizza.setId(resultSet.getLong("id"));
                pizza.setImagem(resultSet.getString("imagem"));
                pizza.setTitulo(resultSet.getString("titulo"));
                pizza.setDescricao(resultSet.getString("descricao")); // Adicionando descrição
                pizzas.add(pizza);
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao listar pizzas.", e);
        }
        return pizzas;
    }

    @Override
    public void update(PizzaRequestDTO pizzaDTO) {
        String sql = "UPDATE pizzas SET imagem = ?, titulo = ?, descricao = ? WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, pizzaDTO.getImagem());
            statement.setString(2, pizzaDTO.getTitulo());
            statement.setString(3, pizzaDTO.getDescricao());
            statement.setLong(4, pizzaDTO.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao atualizar pizza.", e);
        }
    }

    @Override
    public PizzaRequestDTO findById(Long id) {
        String sql = "SELECT * FROM pizzas WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    PizzaRequestDTO pizza = new PizzaRequestDTO();
                    pizza.setId(resultSet.getLong("id"));
                    pizza.setImagem(resultSet.getString("imagem"));
                    pizza.setTitulo(resultSet.getString("titulo"));
                    pizza.setDescricao(resultSet.getString("descricao")); // Adicionando descrição
                    return pizza;
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao buscar pizza por ID.", e);
        }
        return null;
    }
}