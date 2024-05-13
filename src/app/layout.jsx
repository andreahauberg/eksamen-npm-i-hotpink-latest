import "../styles/globals.css";
import "../styles/reset.css";
import { lato } from "./fonts";

export const metadata = {
  title: "Foofest",
  description: "Foofest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <body>
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
