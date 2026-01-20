'use server';

import { neon } from '@neondatabase/serverless';

// Inicializa o cliente do Neon
const sql = neon(process.env.DATABASE_URL!);

/**
 * Obtém as métricas principais para o Header da Torre de Controlo
 */
export async function getDashboardStats() {
  try {
    const data = await sql`
      SELECT 
        (SELECT COUNT(*) FROM bookings WHERE status = 'disputed') as active_alerts,
        (SELECT SUM(total_amount) FROM bookings WHERE created_at > NOW() - INTERVAL '24 hours') as daily_revenue,
        (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') as active_services
      FROM bookings LIMIT 1;
    `;
    return data[0];
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    return { active_alerts: 0, daily_revenue: 0, active_services: 0 };
  }
}

/**
 * Obtém o Live Feed de Governança (Últimos incidentes e check-ins)
 */
export async function getLiveFeed() {
  try {
    const data = await sql`
      SELECT 
        b.id,
        b.status,
        u.full_name as client_name,
        c.specialty as chef_specialty,
        b.created_at
      FROM bookings b
      JOIN users u ON b.client_id = u.id
      JOIN chefs c ON b.chef_id = c.id
      ORDER BY b.created_at DESC
      LIMIT 5;
    `;
    return data;
  } catch (error) {
    console.error('Erro ao buscar feed:', error);
    return [];
  }
}