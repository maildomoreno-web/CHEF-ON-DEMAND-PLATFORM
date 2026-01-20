'use server';

import { neon } from '@neondatabase/serverless';

// Inicializa o cliente do Neon com tipagem segura
const sql = neon(process.env.DATABASE_URL!);

export async function getDashboardStats() {
  try {
    const data = await sql`
      SELECT 
        (SELECT COUNT(*) FROM bookings WHERE status = 'disputed')::int as active_alerts,
        (SELECT SUM(total_amount) FROM bookings WHERE created_at > NOW() - INTERVAL '24 hours')::float as daily_revenue,
        (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed')::int as active_services
      FROM bookings LIMIT 1;
    `;
    return data[0] || { active_alerts: 0, daily_revenue: 0, active_services: 0 };
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    return { active_alerts: 0, daily_revenue: 0, active_services: 0 };
  }
}

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

export async function getFinancialRecords() {
  try {
    const data = await sql`
      SELECT 
        f.id,
        f.gross_amount::float,
        f.chef_payout::float,
        f.platform_fee::float,
        f.payment_status,
        b.event_date,
        u.full_name as client_name
      FROM financial_records f
      JOIN bookings b ON f.booking_id = b.id
      JOIN users u ON b.client_id = u.id
      ORDER BY b.event_date DESC;
    `;
    return data;
  } catch (error) {
    console.error('Erro ao buscar financeiro:', error);
    return [];
  }
}

export async function getDisputedBookings() {
  try {
    const data = await sql`
      SELECT 
        b.id,
        b.total_amount::float,
        b.status,
        u.full_name as client_name,
        u.email as client_email,
        c.specialty as chef_specialty,
        b.created_at
      FROM bookings b
      JOIN users u ON b.client_id = u.id
      JOIN chefs c ON b.chef_id = c.id
      WHERE b.status = 'disputed'
      ORDER BY b.created_at DESC;
    `;
    return data;
  } catch (error) {
    console.error('Erro ao buscar disputas:', error);
    return [];
  }
}