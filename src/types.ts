/**
 * Representa o estado da nossa arte.
 */
export interface Picture {
  /** largura em quadradinhos (pixels) */
  width: number;
  /** altura em quadradinhos */
  height: number;
  /** um array contendo as cores (strings hexadecimais ou nomes) */
  pixels: string[];
}

export interface PixelUpdate {
  x: number;
  y: number;
  color: string;
}

/**
 * Cria uma imagem inicial preenchida com uma cor sólida
 */
export const emptyPicture = (
  width: number,
  height: number,
  color: string = "#f0f0f0" // cinza claro padrão
): Picture => {
  // Cria um array com (width * height) posições, todas com a cor base
  const pixels = new Array(width * height).fill(color);

  return { width, height, pixels };
};
