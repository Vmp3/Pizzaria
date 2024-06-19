package projeto.pizzaria.repository.JDBC;

import org.springframework.stereotype.Repository;
import projeto.pizzaria.model.ItemPedidoRequestDTO;
import projeto.pizzaria.model.PedidoRequestDTO;
import projeto.pizzaria.repository.PedidoRepository;
import projeto.pizzaria.repository.ItemPedidoRepository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcPedidoRepository implements PedidoRepository {
    private final DataSource dataSource;
    private final ItemPedidoRepository itemPedidoRepository;

    public JdbcPedidoRepository(DataSource dataSource, ItemPedidoRepository itemPedidoRepository) {
        this.dataSource = dataSource;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    @Override
    public void save(PedidoRequestDTO pedidoDTO) {
        String sql = "INSERT INTO pedidos (id_cliente, data_pedido, status, total) VALUES (?, ?, ?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            Long idCliente = pedidoDTO.getIdCliente() != null ? pedidoDTO.getIdCliente() : 1L;
            statement.setLong(1, idCliente);
            statement.setTimestamp(2, Timestamp.valueOf(pedidoDTO.getDataPedido()));
            statement.setString(3, pedidoDTO.getStatus());
            statement.setBigDecimal(4, pedidoDTO.getTotal());

            statement.executeUpdate();

            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    pedidoDTO.setIdPedido(generatedKeys.getLong(1));
                } else {
                    throw new SQLException("Falha ao obter o ID gerado para o pedido.");
                }
            }

            for (ItemPedidoRequestDTO item : pedidoDTO.getItensPedido()) {
                item.setPedido(pedidoDTO);
                itemPedidoRepository.save(item);
            }

        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao salvar pedido.", e);
        }
    }

    @Override
    public void update(PedidoRequestDTO pedidoDTO) {
        String sql = "UPDATE pedidos SET idCliente = ?, dataPedido = ?, status = ?, total = ? WHERE idPedido = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            Long idCliente = pedidoDTO.getIdCliente() != null ? pedidoDTO.getIdCliente() : 1L;
            statement.setLong(1, idCliente);
            statement.setTimestamp(2, Timestamp.valueOf(pedidoDTO.getDataPedido()));
            statement.setString(3, pedidoDTO.getStatus());
            statement.setBigDecimal(4, pedidoDTO.getTotal()); // Utiliza setBigDecimal para BigDecimal
            statement.setLong(5, pedidoDTO.getIdPedido());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao atualizar pedido.", e);
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
                PedidoRequestDTO pedido = mapResultSetToPedido(resultSet);
                pedido.setIdCliente(resultSet.getLong("idCliente"));
                pedido.setItensPedido(itemPedidoRepository.findByPedidoId(pedido.getIdPedido()));
                pedidos.add(pedido);
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao listar pedidos.", e);
        }
        return pedidos;
    }

    @Override
    public PedidoRequestDTO findById(Long idPedido) {
        String sql = "SELECT * FROM pedidos WHERE idPedido = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setLong(1, idPedido);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    PedidoRequestDTO pedido = mapResultSetToPedido(resultSet);
                    pedido.setIdCliente(resultSet.getLong("idCliente"));
                    pedido.setItensPedido(itemPedidoRepository.findByPedidoId(pedido.getIdPedido()));
                    return pedido;
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao buscar pedido por ID.", e);
        }
        return null;
    }

    @Override
    public void deleteById(Long idPedido) {
        String sql = "DELETE FROM pedidos WHERE idPedido = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setLong(1, idPedido);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao remover pedido.", e);
        }
    }

    private PedidoRequestDTO mapResultSetToPedido(ResultSet resultSet) throws SQLException {
        PedidoRequestDTO pedido = new PedidoRequestDTO();
        pedido.setIdPedido(resultSet.getLong("idPedido"));
        pedido.setDataPedido(resultSet.getTimestamp("dataPedido").toLocalDateTime());
        pedido.setStatus(resultSet.getString("status"));
        pedido.setTotal(resultSet.getBigDecimal("total")); // Utiliza getBigDecimal para BigDecimal
        return pedido;
    }

}
