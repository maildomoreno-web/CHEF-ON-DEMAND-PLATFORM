import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productService = {
  async createProduct(data: {
    titulo: string;
    preco: number;
    tipo: string;
    categoria: string;
    vagasTotais?: number;
    dataEvento?: Date;
  }) {
    return await prisma.product.create({
      data: {
        ...data,
        vagasRestantes: data.vagasTotais, // Inicializa vagas
      },
    });
  },

  async listAll() {
    return await prisma.product.findMany();
  }
};