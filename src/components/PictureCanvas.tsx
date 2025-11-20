import { useEffect, useRef } from "react";
import type { Picture, PixelUpdate } from "../types";

interface PictureCanvasProps {
  picture: Picture;
  scale: number; // Tamanho de cada quadrado (ex: 20px)
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

  // NOVA FUNÇÃO: Captura o clique
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // 1. Se não tiver função de desenhar passada pelo pai, não faz nada
    if (!onDraw) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 2. Pega a posição do retângulo do canvas na tela
    const rect = canvas.getBoundingClientRect();

    // 3. Matemática para achar o X e Y relativos ao canvas
    // e.clientX é onde o mouse está na tela inteira
    // rect.left é onde o canvas começa
    const x = Math.floor((e.clientX - rect.left) / scale);
    const y = Math.floor((e.clientY - rect.top) / scale);

    // 4. Chama a função do pai mandando pintar esse pixel
    // Por enquanto vamos fixar a cor PRETA (#000000) para testar
    onDraw({ x, y, color: "#000000" });
  };

  // NOVA FUNÇÃO: O Hack do Link Fantasma
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Converte o canvas para uma URL de imagem (Base64)
    const imageURL = canvas.toDataURL("image/png");

    // 2. Cria um link <a> temporário na memória
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "minha-pixel-art.png"; // Nome do arquivo

    // 3. "Clica" no link programaticamente
    link.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown} // <--- Ligando o evento aqui
        width={picture.width * scale}
        height={picture.height * scale}
        style={{ border: "1px solid #ccc", touchAction: "none" }} // touchAction evita scroll no celular ao desenhar
      />

      {/* Botão de Salvar */}
      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          background: "#4CAF50", // Verde bonito
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        💾 Salvar Arte
      </button>
    </div>
  );
};
