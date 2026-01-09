import "./globals.css";

export const metadata = {
  title: "Career Quest",
  description: "Career Quest — learn through mini-worlds, questions, and simulations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
