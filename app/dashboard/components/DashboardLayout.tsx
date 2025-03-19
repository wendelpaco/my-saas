import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Exibe a Navbar no topo */}
      <main className="p-6">{children}</main>{" "}
      {/* Renderiza o conteúdo da página */}
    </div>
  );
}
