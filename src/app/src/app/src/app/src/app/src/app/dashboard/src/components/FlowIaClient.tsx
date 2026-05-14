"use client"

import dynamic from "next/dynamic"

const FlowIaApp = dynamic(() => import("./FlowIaApp"), {
  ssr: false,
  loading: () => (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      minHeight:"100vh", background:"#070B14", flexDirection:"column", gap:20,
    }}>
      <div style={{
        width:52, height:52, borderRadius:14,
        background:"linear-gradient(135deg,#0066FF,#00C3FF)",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 0 30px rgba(0,195,255,0.5)",
      }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:700,
        background:"linear-gradient(90deg,#0066FF,#00C3FF)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      }}>
        Cargando FlowIA.ads...
      </div>
    </div>
  ),
})

interface Props {
  user: { name:string; email:string; company:string; plan:string }
}

export default function FlowIaClient({ user }: Props) {
  return <FlowIaApp user={user} />
}
