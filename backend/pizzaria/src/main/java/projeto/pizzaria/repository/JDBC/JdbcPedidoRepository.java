package projeto.pizzaria.repository.JDBC;

import org.springframework.stereotype.Repository;
import projeto.pizzaria.model.PedidoRequestDTO;
import projeto.pizzaria.repository.PedidoRepository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcPedidoRepository implements PedidoRepository {
    private final DataSource dataSource;

    public JdbcPedidoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(PedidoRequestDTO pedidoDTO) {
        String sql = "INSERT INTO pedidos (tamanho, sabor1, sabor2, sabor3, valor) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, pedidoDTO.getTamanho());
            statement.setString(2, pedidoDTO.getSabor1());
            statement.setString(3, pedidoDTO.getSabor2());
            statement.setString(4, pedidoDTO.getSabor3());
            statement.setDouble(5, pedidoDTO.getValor());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao adicionar pedido.", e);
        }
    }

    @Override
    public List<PedidoRequestDTO> findAll() {
        List<PedidoRequestDTO> pedidos = new ArrayList<>();
        String sql = "SELECT * FROM pedidos";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                PedidoRequestDTO pedido = new PedidoRequestDTO();
                pedido.setId(resultSet.getLong("id"));
                pedido.setTamanho(resultSet.getString("tamanho"));
                pedido.setSabor1(resultSet.getString("sabor1"));
                pedido.setSabor2(resultSet.getString("sabor2"));
                pedido.setSabor3(resultSet.getString("sabor3"));
                pedido.setValor(resultSet.getDouble("valor"));
                pedidos.add(pedido);
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao listar pedidos.", e);
        }
        return pedidos;
    }

    @Override
    public void update(PedidoRequestDTO pedidoDTO) {
        String sql = "UPDATE pedidos SET tamanho = ?, sabor1 = ?, sabor2 = ?, sabor3 = ?, valor = ? WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, pedidoDTO.getTamanho());
            statement.setString(2, pedidoDTO.getSabor1());
            statement.setString(3, pedidoDTO.getSabor2());
            statement.setString(4, pedidoDTO.getSabor3());
            statement.setDouble(5, pedidoDTO.getValor());
            statement.setLong(6, pedidoDTO.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao atualizar pedido.", e);
        }
    }

    @Override
    public PedidoRequestDTO findById(Long id) {
        String sql = "SELECT * FROM pedidos WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    PedidoRequestDTO pedido = new PedidoRequestDTO();
                    pedido.setId(resultSet.getLong("id"));
                    pedido.setTamanho(resultSet.getString("tamanho"));
                    pedido.setSabor1(resultSet.getString("sabor1"));
                    pedido.setSabor2(resultSet.getString("sabor2"));
                    pedido.setSabor3(resultSet.getString("sabor3"));
                    pedido.setValor(resultSet.getDouble("valor"));
                    return pedido;
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao buscar pedido por ID.", e);
        }
        return null;
    }
}
