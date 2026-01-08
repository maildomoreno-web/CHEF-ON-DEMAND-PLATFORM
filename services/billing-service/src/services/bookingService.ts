// Lógica de cálculo inteligente baseada no tipo de produto
const isBilhetica = product.tipo === 'POPUP' || product.tipo === 'WORKSHOP';

let taxaPlataforma = 0;
let valorTotalCliente = 0;

if (isBilhetica) {
  // Regra: 8% na venda de bilhetes
  taxaPlataforma = product.preco * 0.08;
  valorTotalCliente = product.preco; // Geralmente a taxa já está incluída ou é acrescida
} else {
  // Regra: 20% no serviço de Chef em Casa
  taxaPlataforma = product.preco * 0.20;
  valorTotalCliente = product.preco;
}

const booking = await tx.booking.create({
  data: {
    userId,
    productId,
    status: "PAGO",
    valorPago: valorTotalCliente,
    taxaPlataforma: taxaPlataforma, 
  }
});