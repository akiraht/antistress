export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, email } = req.body || {};
  const orderCode = Number(String(Date.now()).slice(-9));
  return res.status(200).json({
    orderCode,
    amount: 7000,
    description: `DTN VIP ${orderCode}`,
    userId,
    email,
  });
}
