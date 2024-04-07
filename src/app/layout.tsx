import type { Metadata } from "next";
import { Inter, Kantumruy_Pro, Poppins } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/layouts/navbar/NavBarComponent";
import FooterComponent from "@/components/layouts/footer/FooterComponent";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - BLOCKCHAIN",
    default: "BLOCKCHAIN",
  },
  description: "This website provides details about cars.",
  keywords: ["cars", "vehicles", "automobiles"],
  openGraph: {
    title: {
      template: "%s - BLOCKCHAIN",
      default: "BLOCKCHAIN",
    },
    description: "This website provides details about cars.",
    images: [
      "https://store.istad.co/media/brand_images/blockchain_logo_20zXVzP.png",
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
