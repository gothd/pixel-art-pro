import { useState } from "react";
import { ColorPicker } from "./components/ColorPicker";
import { PictureCanvas } from "./components/PictureCanvas";
import { emptyPicture, type Picture, type PixelUpdate } from "./types";

// Pincel e Borracha
type ToolType = "brush" | "eraser";

function App() {
  const [picture, setPicture] = useState<Picture>(
    emptyPicture(10, 10, "#f0f0f0") // Estado inicial: Imagem 10x10 cinza
  );
  // Cor selecionada (começa com preto)
  const [selectedColor, setSelectedColor] = useState("#000000");
  // NOVO ESTADO: Qual ferramenta está ativa?
  const [activeTool, setActiveTool] = useState<ToolType>("brush");

  // Função que recebe o pedido de pintura
  const handleDraw = (pixel: PixelUpdate) => {
    console.log("Pintando:", pixel); // Bom para debug no vídeo

    // IMUTABILIDADE: Não podemos mudar picture.pixels direto!
    // 1. Copiamos o array antigo
    const newPixels = [...picture.pixels];

    // 2. Calculamos o índice no array plano
    const index = pixel.y * picture.width + pixel.x;

    // 3. Atualizamos a cor
    // LÓGICA DA FERRAMENTA
    if (activeTool === "brush") {
      // Se for pincel, usa a cor que o usuário escolheu no seletor
      newPixels[index] = selectedColor;
    } else if (activeTool === "eraser") {
      // Se for borracha, reseta para a cor de fundo (nosso cinza claro)
      newPixels[index] = "#f0f0f0";
    }

    // 4. Salvamos o novo estado (isso dispara o useEffect do Canvas)
    setPicture({ ...picture, pixels: newPixels });
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Pixel Art Editor</h1>

        <ColorPicker color={selectedColor} onChange={setSelectedColor} />

        {/* Barra de Ferramentas */}
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setActiveTool("brush")}
            style={{
              padding: "8px 16px",
              background: activeTool === "brush" ? "#333" : "#eee", // Escuro se ativo
              color: activeTool === "brush" ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🖌️ Pincel
          </button>

          <button
            onClick={() => setActiveTool("eraser")}
            style={{
              padding: "8px 16px",
              background: activeTool === "eraser" ? "#333" : "#eee",
              color: activeTool === "eraser" ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🧼 Borracha
          </button>
        </div>

        <PictureCanvas
          picture={picture}
          scale={40} // Cada pixel terá 40x40px na tela
          onDraw={handleDraw} // Passamos a função
        />
      </div>
    </div>
  );
}

export default App;
