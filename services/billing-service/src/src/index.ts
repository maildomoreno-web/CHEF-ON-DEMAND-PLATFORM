import express from 'express';
import { userService } from './services/userService';
import { productService } from './services/productService';

const app = express();
app.use(express.json());

// Rota para Sincronizar Utilizador (Auth -> Billing)
app.post('/users/sync', async (req, res) => {
  try {
    const user = await userService.syncUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para Criar Produto (Chef -> Billing)
app.post('/products', async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Billing Service operacional na porta ${PORT}`);
});