const fs = require('fs');
const path = require('path');

function createWavBuffer(sampleRate, durationSec, generateSample) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const bytesPerSample = 2; // 16-bit
  const blockAlign = bytesPerSample; // 1 channel
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audioFormat 1 = PCM
  buffer.writeUInt16LE(1, 22); // numChannels 1 = Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bitsPerSample

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, generateSample(t, i, numSamples, sampleRate)));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

const sampleRate = 44100;
const soundDir = path.join(__dirname, 'public', 'sound');

// 1. Dép tổ ong: Tiếng "bẹp" (slipper)
// Lực đập cao su nén nhanh, tụt tần số từ 220Hz xuống 45Hz + squish noise
const slipperWav = createWavBuffer(sampleRate, 0.18, (t) => {
  const env = Math.exp(-t * 28); // Giảm dần nhanh
  const freq = 220 * Math.exp(-t * 35) + 45;
  const osc = Math.sin(2 * Math.PI * freq * t);
  const squish = (Math.random() * 2 - 1) * Math.exp(-t * 40) * 0.4;
  const pop = Math.sin(2 * Math.PI * 90 * t) * Math.exp(-t * 20);
  return (osc * 0.6 + squish + pop * 0.4) * env;
});

// 2. Chổi lông gà: Tiếng "vút" sột soạt lông gà (feather_duster)
const featherWav = createWavBuffer(sampleRate, 0.22, (t) => {
  const env = Math.sin(Math.min(1, t / 0.04) * Math.PI * 0.5) * Math.exp(-t * 18);
  const whooshFreq = 500 * Math.exp(-t * 12) + 200;
  const whoosh = Math.sin(2 * Math.PI * whooshFreq * t);
  const rustle = (Math.random() * 2 - 1) * Math.exp(-t * 14) * 0.6;
  return (whoosh * 0.35 + rustle * 0.65) * env;
});

// 3. Chảo: Tiếng kim loại vang "keeng" hài hước (pan)
const panWav = createWavBuffer(sampleRate, 0.45, (t) => {
  const env = Math.exp(-t * 8);
  // Đa âm kim loại chảo gang (inharmonic partials)
  const f1 = Math.sin(2 * Math.PI * 620 * t);
  const f2 = Math.sin(2 * Math.PI * 1260 * t) * 0.6;
  const f3 = Math.sin(2 * Math.PI * 1980 * t) * 0.4;
  const f4 = Math.sin(2 * Math.PI * 3100 * t) * 0.25;
  const click = (Math.random() * 2 - 1) * Math.exp(-t * 120) * 0.5;
  return (f1 + f2 + f3 + f4 + click) * env * 0.4;
});

// 4. Búa cao su: Tiếng lò xo "boing" nảy hoạt hình (hammer)
const hammerWav = createWavBuffer(sampleRate, 0.28, (t) => {
  const env = Math.exp(-t * 12);
  const f0 = 160 + 120 * Math.sin(2 * Math.PI * 22 * t);
  const osc = Math.sin(2 * Math.PI * f0 * t);
  const thud = Math.sin(2 * Math.PI * 75 * t) * Math.exp(-t * 30);
  return (osc * 0.7 + thud * 0.5) * env;
});

fs.writeFileSync(path.join(soundDir, 'slipper.wav'), slipperWav);
fs.writeFileSync(path.join(soundDir, 'slipper.mp3'), slipperWav); // Đồng thời ghi file đuôi .mp3 để người dùng dễ thay
fs.writeFileSync(path.join(soundDir, 'feather_duster.wav'), featherWav);
fs.writeFileSync(path.join(soundDir, 'feather_duster.mp3'), featherWav);
fs.writeFileSync(path.join(soundDir, 'pan.wav'), panWav);
fs.writeFileSync(path.join(soundDir, 'pan.mp3'), panWav);
fs.writeFileSync(path.join(soundDir, 'hammer.wav'), hammerWav);
fs.writeFileSync(path.join(soundDir, 'hammer.mp3'), hammerWav);

// Tạo file README hướng dẫn trong public/sound để người dùng nắm rõ
const readmeContent = `# THƯ MỤC ÂM THANH CÔNG CỤ (PUBLIC/SOUND)

Thư mục này chứa file âm thanh cho 4 công cụ đập xả stress của ứng dụng:
1. \`slipper.mp3\` hoặc \`slipper.wav\` : Dép tổ ong (tiếng "bẹp")
2. \`feather_duster.mp3\` hoặc \`feather_duster.wav\` : Chổi lông gà (tiếng vút gió)
3. \`pan.mp3\` hoặc \`pan.wav\` : Chảo (tiếng kim loại "keeng")
4. \`hammer.mp3\` hoặc \`hammer.wav\` : Búa cao su (tiếng nảy lò xo "boing")

💡 CÁCH NÂNG CẤP HOẶC THAY ĐỔI ÂM THANH:
- Bạn chỉ cần copy đè file âm thanh mới của bạn vào đây với đúng tên file tương ứng (hỗ trợ .mp3 hoặc .wav).
- Ứng dụng sẽ tự động tải và phát file âm thanh mới ngay lập tức mà KHÔNG CẦN sửa bất kỳ dòng code nào!
`;
fs.writeFileSync(path.join(soundDir, 'README.md'), readmeContent);

console.log('Successfully generated default sounds in public/sound');

