import DashboardSidebar from "@/components/dashboard/asilde/DashboardAsideComponent";
import ProductTableComponent from "@/components/table/ProductTableComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <aside className="flex">
   <DashboardSidebar/>
    {children}
   </aside>
  );
}
