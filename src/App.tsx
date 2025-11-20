import { PictureCanvas } from "./components/PictureCanvas";
import { emptyPicture } from "./types";

function App() {
  // Cria uma imagem 10x10, cinza, no início
  const startState = emptyPicture(10, 10, "#f0f0f0");

  // Vamos pintar um pixel manualmente só pra provar que funciona
  // (Hack temporário para teste)
  startState.pixels[0] = "#ff0000"; // Primeiro pixel vermelho
  startState.pixels[51] = "#0000ff"; // Algum pixel aleatório azul

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Pixel Art Editor</h1>
        <PictureCanvas
          picture={startState}
          scale={40} // Cada pixel terá 40x40px na tela
        />
      </div>
    </div>
  );
}

export default App;
