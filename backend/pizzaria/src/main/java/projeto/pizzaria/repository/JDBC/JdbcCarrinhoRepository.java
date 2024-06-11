package projeto.pizzaria.repository.JDBC;

import org.springframework.stereotype.Repository;
import projeto.pizzaria.model.CarrinhoRequestDTO;
import projeto.pizzaria.repository.CarrinhoRepository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcCarrinhoRepository implements CarrinhoRepository {
    private final DataSource dataSource;

    public JdbcCarrinhoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(CarrinhoRequestDTO carrinhoDTO) {
        String sql = "INSERT INTO carrinho (tamanho, sabor1, sabor2, sabor3, valor) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, carrinhoDTO.getTamanho());
            statement.setString(2, carrinhoDTO.getSabor1());
            statement.setString(3, carrinhoDTO.getSabor2());
            statement.setString(4, carrinhoDTO.getSabor3());
            statement.setDouble(5, carrinhoDTO.getValor());
            statement.executeUpdate();

            // Recuperando o ID gerado
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    carrinhoDTO.setId(generatedKeys.getLong(1));
                } else {
                    throw new SQLException("Falha ao obter o ID gerado para a pizza.");
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao adicionar carrinho.", e);
        }
    }


    @Override
    public List<CarrinhoRequestDTO> findAll() {
        List<CarrinhoRequestDTO> carrinhos = new ArrayList<>();
        String sql = "SELECT * FROM carrinho";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                CarrinhoRequestDTO carrinho = new CarrinhoRequestDTO();
                carrinho.setId(resultSet.getLong("id"));
                carrinho.setTamanho(resultSet.getString("tamanho"));
                carrinho.setSabor1(resultSet.getString("sabor1"));
                carrinho.setSabor2(resultSet.getString("sabor2"));
                carrinho.setSabor3(resultSet.getString("sabor3"));
                carrinho.setValor(resultSet.getDouble("valor"));
                carrinhos.add(carrinho);
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao listar carrinho.", e);
        }
        return carrinhos;
    }

    @Override
    public void update(CarrinhoRequestDTO carrinhoDTO) {
        String sql = "UPDATE carrinho SET tamanho = ?, sabor1 = ?, sabor2 = ?, sabor3 = ?, valor = ? WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, carrinhoDTO.getTamanho());
            statement.setString(2, carrinhoDTO.getSabor1());
            statement.setString(3, carrinhoDTO.getSabor2());
            statement.setString(4, carrinhoDTO.getSabor3());
            statement.setDouble(5, carrinhoDTO.getValor());
            statement.setLong(6, carrinhoDTO.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao atualizar carrinho.", e);
        }
    }

    @Override
    public void deleteById(Long id) {
        String sql = "DELETE FROM carrinho WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao remover carrinho.", e);
        }
    }

    @Override
    public CarrinhoRequestDTO findById(Long id) {
        String sql = "SELECT * FROM carrinho WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    CarrinhoRequestDTO carrinho = new CarrinhoRequestDTO();
                    carrinho.setId(resultSet.getLong("id"));
                    carrinho.setTamanho(resultSet.getString("tamanho"));
                    carrinho.setSabor1(resultSet.getString("sabor1"));
                    carrinho.setSabor2(resultSet.getString("sabor2"));
                    carrinho.setSabor3(resultSet.getString("sabor3"));
                    carrinho.setValor(resultSet.getDouble("valor"));
                    return carrinho;
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao buscar carrinho por ID.", e);
        }
        return null;
    }
}
