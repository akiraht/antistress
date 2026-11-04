/**
 * Mã hóa danh tính tiểu nhân sử dụng Web Crypto API (SHA-256)
 * Đảm bảo tuyệt đối không lưu trữ tên thô của bất kỳ ai
 */
export async function encodeTargetName(rawInput: string): Promise<string> {
  const normalized = (rawInput || '').trim() || `ẩn-danh-${Date.now()}`;
  const salted = `DANH_TIEU_NHAN_V2::${normalized}::SALT_9981`;

  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(salted);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
      return `TN-#${hex.slice(0, 4)}•${hex.slice(4, 8)}`;
    }
  } catch {
    // Fallback deterministic non-reversible hash nếu trình duyệt cũ
  }

  let h1 = 0xdeadbeef ^ salted.length;
  let h2 = 0x41c6ce57 ^ salted.length;
  for (let i = 0; i < salted.length; i++) {
    const ch = salted.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex1 = ((h1 >>> 0) & 0xffff).toString(16).padStart(4, '0').toUpperCase();
  const hex2 = ((h2 >>> 0) & 0xffff).toString(16).padStart(4, '0').toUpperCase();
  return `TN-#${hex1}•${hex2}`;
}

