interface ColorPickerProps {
  color: string; // A cor atual selecionada
  onChange: (color: string) => void; // Função para avisar que mudou
}

// Uma lista de cores pré-definidas para facilitar a vida do usuário
const PRESET_COLORS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
];

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      {/* 1. O Input Nativo (Seletor Infinito) */}
      <label
        style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}
      >
        Custom
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{ height: "30px", width: "40px" }}
        />
      </label>

      {/* 2. As Cores Prontas (Presets) */}
      <div style={{ display: "flex", gap: "5px" }}>
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            style={{
              backgroundColor: preset,
              width: "42px",
              height: "42px",
              border: color === preset ? "3px solid #333" : "1px solid #ccc", // Destaque se selecionado
              cursor: "pointer",
              borderRadius: "6px",
            }}
            aria-label={`Selecionar cor ${preset}`} // Acessibilidade
          />
        ))}
      </div>
    </div>
  );
};
