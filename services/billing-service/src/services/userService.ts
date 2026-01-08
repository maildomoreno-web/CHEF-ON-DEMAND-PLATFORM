import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
  // Criar ou atualizar utilizador vindo do Auth
  async syncUser(data: { id: string; nome: string; email: string; role: string }) {
    return await prisma.user.upsert({
      where: { email: data.email },
      update: { nome: data.nome, role: data.role },
      create: {
        id: data.id,
        nome: data.nome,
        email: data.email,
        role: data.role,
      },
    });
  },

  async getUser(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
};