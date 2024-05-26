import "../styles/globals.css";
import "../styles/reset.css";
import { lato } from "./fonts";
import Header from "../components/globals/Header";
import Footer from "../components/globals/Footer";

export const metadata = {
  title: "Foofest",
  description: "Foofest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <body>
        <Header />
        <main className="pb-10">
          <div>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
