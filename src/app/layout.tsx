import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ backgroundColor: "#2E3B4E" }}>{children}</body>
    </html>
  );
}
