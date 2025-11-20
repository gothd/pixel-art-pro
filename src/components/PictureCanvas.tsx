import { useEffect, useRef } from "react";
import type { Picture, PixelUpdate } from "../types";

interface PictureCanvasProps {
  picture: Picture;
  scale: number; // Tamanho de cada quadrado (ex: 20px)
  // Vamos deixar o onDraw preparado para o futuro, mas opcional por enquanto
  onDraw?: (pixel: PixelUpdate) => void;
}

export const PictureCanvas = ({
  picture,
  scale,
  onDraw,
}: PictureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Loop por todos os pixels da nossa estrutura
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        // Descobrimos o índice no array plano
        const index = y * picture.width + x;
        const color = picture.pixels[index];

        // Configuramos a cor e desenhamos o quadrado
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }, [picture, scale]); // Array de dependências: roda se picture ou scale mudar

  return (
    <canvas
      ref={canvasRef}
      width={picture.width * scale}
      height={picture.height * scale}
      style={{ border: "1px solid #ccc" }} // Só para ver onde ele está
    />
  );
};
