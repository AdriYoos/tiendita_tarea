import { BarraLateral } from "../components";

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-gray-100">
      {/* Barra lateral fija con estilo pro */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-md z-50">

        <BarraLateral />
      </aside>

      {/* Contenido principal con margen izquierdo igual al ancho de la barra */}
      <main className="ml-64 h-screen overflow-y-auto bg-white p-6 text-gray-800">
        {/* Cabecera (opcional) */}
        

        {/* Contenido dinámico */}
        <div className="space-y-4">
          {children}
        </div>
      </main>
    </div>
  );
}
