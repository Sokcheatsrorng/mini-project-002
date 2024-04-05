import type { Metadata } from "next";
import { Inter, Kantumruy_Pro, Poppins } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/layouts/navbar/NavBarComponent";
import FooterComponent from "@/components/layouts/footer/FooterComponent";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - MyShop",
    default: "MyShop",
  },
  description: "This is description shop",
  keywords: ["shop", "ecommerce", "sell"],
  openGraph: {
    title: {
      template: "%s - MyShop",
      default: "MyShop",
    },
    description: "This is description shop",
    images: [
      "https://i.pinimg.com/564x/cd/6d/ec/cd6dec6d3967cb8e714aa2357b6c3b73.jpg",
    ],
  },
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--font-poppins",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavbarComponent/>
        {children}
        <FooterComponent/>
        </body>
    </html>
  );
}
