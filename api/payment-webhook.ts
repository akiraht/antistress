import { createClient } from '@supabase/supabase-js';

declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );
  const payload = req.body;
  if (payload && payload.data && payload.data.amount >= 7000) {
    const orderCode = payload.data.orderCode;
    const { data: order } = await supabase
      .from('payment_orders')
      .select('user_id')
      .eq('order_code', orderCode)
      .single();

    if (order?.user_id) {
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await supabase
        .from('profiles')
        .update({ is_vip: true, vip_expires_at: expiresAt })
        .eq('id', order.user_id);

      await supabase
        .from('payment_orders')
        .update({ status: 'PAID' })
        .eq('order_code', orderCode);
    }
  }
  return res.status(200).json({ success: true });
}
