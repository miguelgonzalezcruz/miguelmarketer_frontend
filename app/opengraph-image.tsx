import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Miguel González, Marketing Director & Growth Leader";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#101010",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 70px",
          borderTop: "14px solid #101010",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Miguel González
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 0.92, letterSpacing: "-0.02em", maxWidth: 910 }}>
            Marketing Director & Growth Leader
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Arial, sans-serif",
              fontSize: 30,
              color: "#242424",
              letterSpacing: "0.02em",
            }}
          >
            Posicionamiento · Demanda · Crecimiento
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid #101010",
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
            color: "#565656",
          }}
        >
          <span>miguelmarketer.com</span>
          <span>Marketing leadership conectado a resultados de negocio</span>
        </div>
      </div>
    ),
    size,
  );
}
