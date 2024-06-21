import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{ backgroundColor: '#E2E5F4' }}>{children}</body>
    </html>
  )
}
