package projeto.pizzaria.repository.JDBC;

import org.springframework.stereotype.Repository;
import projeto.pizzaria.model.ItemPedidoRequestDTO;
import projeto.pizzaria.model.PedidoRequestDTO;
import projeto.pizzaria.model.SaboresRequestDTO;
import projeto.pizzaria.repository.ItemPedidoRepository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JdbcItemPedidoRepository implements ItemPedidoRepository {

    private final DataSource dataSource;

    public JdbcItemPedidoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void save(ItemPedidoRequestDTO itemPedidoDTO) {
        String sql = "INSERT INTO itens_pedido (id_pedido, id_sabor) VALUES (?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            statement.setLong(1, itemPedidoDTO.getPedido().getIdPedido());
            statement.setLong(2, itemPedidoDTO.getSabor().getIdsabor());
            statement.executeUpdate();

            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    itemPedidoDTO.setIdItem(generatedKeys.getLong(1));
                } else {
                    throw new SQLException("Falha ao obter o ID gerado para o item de pedido.");
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao salvar item de pedido.", e);
        }
    }

    @Override
    public List<ItemPedidoRequestDTO> findByPedidoId(Long idPedido) {
        List<ItemPedidoRequestDTO> itensPedido = new ArrayList<>();
        String sql = "SELECT ip.id_item, ip.id_pedido, s.id_sabor, s.sabor, s.descricao, s.valor, s.tamanho, s.imagem " +
                "FROM itens_pedido ip " +
                "JOIN sabores s ON ip.id_sabor = s.id_sabor " +
                "WHERE ip.id_pedido = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setLong(1, idPedido);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    ItemPedidoRequestDTO itemPedido = new ItemPedidoRequestDTO();
                    itemPedido.setIdItem(resultSet.getLong("id_item"));

                    // Configurar o objeto SaboresRequestDTO
                    SaboresRequestDTO sabor = new SaboresRequestDTO();
                    sabor.setIdsabor(resultSet.getLong("id_sabor"));
                    sabor.setSabor(resultSet.getString("sabor"));
                    sabor.setDescricao(resultSet.getString("descricao"));
                    sabor.setValor(resultSet.getBigDecimal("valor"));
                    sabor.setTamanho(resultSet.getString("tamanho"));
                    sabor.setImagem(resultSet.getString("imagem"));

                    itemPedido.setSabor(sabor);

                    // Configurar o objeto PedidoRequestDTO
                    PedidoRequestDTO pedido = new PedidoRequestDTO();
                    pedido.setIdPedido(resultSet.getLong("id_pedido"));

                    itemPedido.setPedido(pedido);

                    itensPedido.add(itemPedido);
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao buscar itens de pedido por ID do pedido.", e);
        }
        return itensPedido;
    }

    @Override
    public void deleteById(Long idItemPedido) {
        String sql = "DELETE FROM itens_pedido WHERE id_item = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setLong(1, idItemPedido);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalStateException("Erro ao remover item de pedido.", e);
        }
    }
}
