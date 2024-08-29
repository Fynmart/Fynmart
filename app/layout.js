import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import "./imdos.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppProvider } from "@/providers/AppProvider";
import { ImdosProvider } from "@/providers/ImdosProvider";

const font = Montserrat({ subsets: ["latin"], weight: ["200", "400"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ImdosProvider>
          <AppProvider>{children}</AppProvider>
        </ImdosProvider>
      </body>
    </html>
  );
}
