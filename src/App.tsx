import { useState } from "react";
import { ColorPicker } from "./components/ColorPicker";
import { PictureCanvas } from "./components/PictureCanvas";
import { emptyPicture, type Picture, type PixelUpdate } from "./types";

function App() {
  const [picture, setPicture] = useState<Picture>(
    emptyPicture(10, 10, "#f0f0f0") // Estado inicial: Imagem 10x10 cinza
  );
  // NOVO ESTADO: Cor selecionada (começa com preto)
  const [selectedColor, setSelectedColor] = useState("#000000");

  // Função que recebe o pedido de pintura
  const handleDraw = (pixel: PixelUpdate) => {
    console.log("Pintando:", pixel); // Bom para debug no vídeo

    // IMUTABILIDADE: Não podemos mudar picture.pixels direto!
    // 1. Copiamos o array antigo
    const newPixels = [...picture.pixels];

    // 2. Calculamos o índice no array plano
    const index = pixel.y * picture.width + pixel.x;

    // 3. Atualizamos a cor: Usamos a selectedColor em vez de string fixa
    // O pixel que vem do evento traz x e y, mas nós forçamos a cor atual
    newPixels[index] = selectedColor;

    // 4. Salvamos o novo estado (isso dispara o useEffect do Canvas)
    setPicture({
      ...picture,
      pixels: newPixels,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Pixel Art Editor</h1>

        <ColorPicker color={selectedColor} onChange={setSelectedColor} />

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
