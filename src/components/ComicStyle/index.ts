/**
 * =========================================================================
 * COMIC STYLE MODULE (STANDALONE COMPONENT)
 * Phong cách Truyện Tranh Cổ Phong Trào Phúng (Lấy cảm hứng từ tranh truyện biếm họa)
 *
 * ĐẶC TÍNH KIẾN TRÚC:
 * - Tách biệt 100% trong component này, không can thiệp sâu vào cấu trúc dự án.
 * - Muốn gọi vào hoặc gỡ ra cực kỳ đơn giản:
 *   + Bật/Tắt bằng cờ ENABLE_COMIC_STYLE bên dưới.
 *   + Khi gỡ ra: project tự động fallback mượt mà về 2 style cũ (Dark / Light).
 * =========================================================================
 */

export { COMIC_THEME } from './ComicStyle.types';
export { ComicCharacterView } from './ComicCharacterView';
export {
  ComicFolkPuppetSvg,
  ComicMandarinSvg,
  ComicScholarSvg,
  ComicLandlordSvg,
  ComicLazySvg,
  ComicDramaSvg,
  COMIC_CHARACTER_MAP,
} from './ComicCharacters';
export { ComicActionBalloon, ComicPuffCloud } from './ComicDecorations';

/**
 * Cờ kiểm soát kích hoạt module Truyện Tranh
 * Để gỡ style này ra khỏi dự án bất cứ lúc nào, chỉ cần đổi thành `false`!
 */
export const ENABLE_COMIC_STYLE = true;

/**
 * Kiểm tra xem theme hiện tại có phải là theme Truyện Tranh (comic) hay không
 */
export const isComicTheme = (themeId: string): boolean => {
  return ENABLE_COMIC_STYLE && themeId === 'comic';
};

