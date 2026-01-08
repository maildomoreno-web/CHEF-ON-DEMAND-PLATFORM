const { PrismaClient } = require('@prisma/client')

// Tentando conexão SEM o pooler para ver se o firewall aceita a porta padrão
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://admin_billing:ChefSenha123!@ep-cold-breeze-agdxq1q4.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    },
  },
})

async function runTest() {
  console.log('--- TESTE DE EMERGÊNCIA ---')
  try {
    // Apenas uma consulta simples de versão para testar o aperto de mão (handshake)
    const result = await prisma.$queryRaw`SELECT 1 as connection_test`
    console.log('✅ LIGAÇÃO ESTABELECIDA COM SUCESSO!')
    console.log('Resposta do Servidor:', result)
  } catch (err) {
    console.error('❌ ERRO DE REDE DETETADO:')
    console.error('Código do Erro:', err.code)
    console.error('Mensagem:', err.message)
  } finally {
    await prisma.$disconnect()
    console.log('--- FIM DO TESTE ---')
  }
}

runTest()