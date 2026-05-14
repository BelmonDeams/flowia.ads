import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "FlowIA.ads — Ad Intelligence Platform",
  description: "Genera creativos con IA, gestiona campañas en Meta y TikTok.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        </head>
        <body style={{ background:"#070B14", color:"#D8E8F8", margin:0, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
