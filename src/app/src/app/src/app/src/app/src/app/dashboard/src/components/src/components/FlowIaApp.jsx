import { useState, useRef, useCallback } from "react";
import {
  Settings, Zap, Rocket, ChevronDown, Bell, Globe, ChevronRight,
  Star, Target, Sparkles, X, MapPin, DollarSign, Calendar,
  TrendingUp, Play, Pause, MoreHorizontal, Eye, Heart,
  MessageCircle, Share2, Bookmark, ChevronLeft, BarChart2,
  Users, Layers, AlertCircle, Wand2, Upload, Plus, Trash2,
  Loader2, Image as ImageIcon, Facebook, Instagram,
  Check, ArrowRight, LogOut, CreditCard, Shield,
  Palette, Brain, Link2, RefreshCw,
  Activity, Zap as ZapIcon, Lock,
  CheckCircle, XCircle, Search, Hash,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ══════════════════════════════════════════════════════════════════════════════
const C = {
  bg:"#070B14", sidebar:"#080D18", border:"rgba(0,195,255,0.12)",
  borderHover:"rgba(0,195,255,0.35)", accent:"#0066FF", accentSoft:"rgba(0,102,255,0.14)",
  accentGlow:"rgba(0,195,255,0.35)", accentBright:"#00C3FF", text:"#D8E8F8",
  textMuted:"#4F7090", textDim:"#263545", surface:"rgba(255,255,255,0.03)",
  surfaceHover:"rgba(0,195,255,0.06)", active:"rgba(0,102,255,0.18)",
  card:"#0C1220", cardDeep:"#080D18", badge:"#00C3FF",
  green:"#00D68F", amber:"#FFB800", red:"#FF4D6A", blue:"#00C3FF",
  pink:"#7B61FF", cyan:"#00FFD1",
};

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html,body{background:${C.bg};min-height:100vh;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(0,195,255,0.3);border-radius:2px;}
    input,textarea,select{font-family:'Plus Jakarta Sans',sans-serif;outline:none;}
    input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
    button{font-family:'Plus Jakarta Sans',sans-serif;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,195,255,0.25)}50%{box-shadow:0 0 50px rgba(0,195,255,0.6)}}
    @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
    @keyframes notif{from{opacity:0;transform:translateX(120%)}to{opacity:1;transform:translateX(0)}}
    @keyframes logoShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    @keyframes techPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}
    @keyframes dataFlow{0%{background-position:0 0}100%{background-position:0 -200px}}

    .fade-up{animation:fadeUp 0.3s ease both;}
    .fade-in{animation:fadeIn 0.2s ease both;}
    .scale-in{animation:scaleIn 0.22s ease both;}
    .float{animation:float 3s ease-in-out infinite;}

    .nav-item:hover{background:${C.surfaceHover}!important;}
    .btn-ghost:hover{background:${C.surfaceHover}!important;border-color:${C.borderHover}!important;}
    .card-hover:hover{border-color:${C.borderHover}!important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,0.3)!important;}
    .creative-card:hover{border-color:${C.borderHover}!important;transform:translateY(-3px);}
    .img-slot:hover .img-overlay{opacity:1!important;}
    .tag-btn:hover{background:rgba(0,102,255,0.3)!important;}
    .platform-tab:hover{background:${C.surfaceHover}!important;}
    .pricing-card:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.4)!important;}
    .notif-item:hover{background:rgba(255,255,255,0.04)!important;}
    .stat-card:hover{border-color:${C.borderHover}!important;box-shadow:0 0 24px rgba(0,195,255,0.12)!important;}
    .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,195,255,0.5),transparent);opacity:0;transition:opacity 0.2s;}
    .stat-card:hover::before{opacity:1;}
    .campaign-row:hover{background:rgba(0,195,255,0.04)!important;}
    .menu-item:hover{background:${C.surfaceHover}!important;}
  `}</style>
);

// ══════════════════════════════════════════════════════════════════════════════
// AI SERVICES — Claude API
// ══════════════════════════════════════════════════════════════════════════════
async function generateAdCopies(desc, brand = "Mi Marca", count = 5) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:1200,
      messages:[{ role:"user", content:
        `Eres un experto copywriter de performance marketing para Meta Ads.
Genera ${count} copys publicitarios únicos en español para:
Producto/Servicio: "${desc}"
Marca: "${brand}"

Responde SOLO con un array JSON sin markdown:
[{"headline":"max 8 palabras con emoji","body":"1-2 frases persuasivas max 90 chars","cta":"max 4 palabras","sub":"max 6 palabras urgencia"}]
Tonos distintos: emocional, FOMO, prueba social, lógico, aspiracional.`
      }]
    })
  });
  const data = await res.json();
  const raw = (data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
  return JSON.parse(raw);
}

async function generateBrandDNA(brandInfo) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:800,
      messages:[{ role:"user", content:
        `Eres un estratega de marca. Analiza esta marca y genera su ADN de marca en español.
Marca: "${brandInfo.name}"
Industria: "${brandInfo.industry}"
Descripción: "${brandInfo.description}"
Audiencia: "${brandInfo.audience}"

Responde SOLO con JSON sin markdown:
{"tagline":"eslogan poderoso max 8 palabras","tono":["adjetivo1","adjetivo2","adjetivo3"],"propuesta":"propuesta de valor única 1 oración","palabrasClave":["kw1","kw2","kw3","kw4","kw5"],"arquetipoMarca":"arquetipo","emocionPrincipal":"emoción que evoca"}`
      }]
    })
  });
  const data = await res.json();
  const raw = (data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
  return JSON.parse(raw);
}

function hashStr(s){ let h=0; for(let i=0;i<s.length;i++) h=(Math.imul(31,h)+s.charCodeAt(i))|0; return Math.abs(h); }
function generateAdImages(desc,count=5){ return Array.from({length:count},(_,i)=>`https://picsum.photos/seed/${hashStr(desc+i)%1000}/400/500`); }

// ══════════════════════════════════════════════════════════════════════════════
// MOCK DATA ENGINE — simulates real SaaS data
// ══════════════════════════════════════════════════════════════════════════════
const MOCK_CAMPAIGNS = [
  { id:"c1", name:"FlowIA.ads | META Conversiones Mayo 2026", platform:"META", status:"ACTIVE",   budget:4,  spent:2.8,  impressions:14320, clicks:523, ctr:3.65, conversions:12, roas:4.2, startDate:"2026-01-30" },
  { id:"c2", name:"TikTok Awareness Q1 2026",             platform:"TIKTOK",status:"ACTIVE",   budget:10, spent:7.1,  impressions:89200, clicks:1840,ctr:2.06, conversions:34, roas:3.1, startDate:"2026-02-01" },
  { id:"c3", name:"Retargeting Compradores Web",          platform:"META",  status:"PAUSED",   budget:6,  spent:0,    impressions:0,     clicks:0,   ctr:0,    conversions:0,  roas:0,   startDate:"2026-03-01" },
  { id:"c4", name:"Lanzamiento Producto Primavera",       platform:"META",  status:"DRAFT",    budget:20, spent:0,    impressions:0,     clicks:0,   ctr:0,    conversions:0,  roas:0,   startDate:"2026-05-15" },
  { id:"c5", name:"TikTok Conversión Mayo",               platform:"TIKTOK",status:"ACTIVE",   budget:8,  spent:5.4,  impressions:42100, clicks:980, ctr:2.33, conversions:21, roas:3.8, startDate:"2026-05-01" },
];

const PLANS = [
  { id:"starter", name:"Starter", price:29, color:"#4F7090", features:["3 campañas activas","500 créditos IA/mes","1 cuenta publicitaria","Reportes básicos","Soporte email"], limit:"3 campañas" },
  { id:"growth",  name:"Growth",  price:79, color:"#00C3FF", popular:true, features:["15 campañas activas","3,000 créditos IA/mes","5 cuentas publicitarias","Reportes avanzados","ADN de marca IA","Soporte prioritario","A/B Testing"], limit:"15 campañas" },
  { id:"scale",   name:"Scale",   price:199,color:"#00D68F", features:["Campañas ilimitadas","15,000 créditos IA/mes","Cuentas ilimitadas","Reportes en tiempo real","Multi-workspace","API access","Manager dedicado","White-label"], limit:"Ilimitado" },
];

// ══════════════════════════════════════════════════════════════════════════════
// NOTIFICATION SYSTEM
// ══════════════════════════════════════════════════════════════════════════════
function useNotifications() {
  const [notifs, setNotifs] = useState([]);
  const add = useCallback((msg, type="success") => {
    const id = Date.now();
    setNotifs(n => [...n, { id, msg, type }]);
    setTimeout(() => setNotifs(n => n.filter(x => x.id !== id)), 4000);
  }, []);
  return { notifs, add };
}

function NotificationStack({ notifs }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:10 }}>
      {notifs.map(n => (
        <div key={n.id} style={{ padding:"12px 18px", borderRadius:12, backdropFilter:"blur(20px)",
          background: n.type==="error" ? "rgba(248,113,113,0.15)" : n.type==="warning" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
          border:`1px solid ${n.type==="error" ? "rgba(248,113,113,0.4)" : n.type==="warning" ? "rgba(245,158,11,0.4)" : "rgba(16,185,129,0.4)"}`,
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"notif 0.3s ease",
          display:"flex", alignItems:"center", gap:10, maxWidth:320 }}>
          {n.type==="error" ? <XCircle size={15} color={C.red}/> : n.type==="warning" ? <AlertCircle size={15} color={C.amber}/> : <CheckCircle size={15} color={C.green}/>}
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600,
            color: n.type==="error" ? C.red : n.type==="warning" ? C.amber : C.green }}>{n.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED SHELL COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════
function Logo({ size="md" }) {
  const s = size==="sm" ? { wrap:28, icon:14, title:14, sub:8.5 } : { wrap:36, icon:18, title:17, sub:9.5 };
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:s.wrap, height:s.wrap, borderRadius:10, flexShrink:0,
        background:"linear-gradient(135deg,#0066FF,#00C3FF)",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 0 22px rgba(0,195,255,0.5)", animation:"glow 3s ease-in-out infinite",
        position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.15),transparent)", borderRadius:10 }}/>
        <Sparkles size={s.icon} color="#fff"/>
      </div>
      <div>
        <div style={{ position:"relative", lineHeight:1 }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:s.title,
            letterSpacing:"-0.5px", lineHeight:1,
            background:"linear-gradient(90deg,#fff 0%,#00C3FF 40%,#fff 60%,#0066FF 100%)",
            backgroundSize:"250% 100%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"logoShimmer 4s ease-in-out infinite" }}>
            FlowIA<span style={{ WebkitTextFillColor:C.accentBright }}>.ads</span>
          </div>
        </div>
        {size!=="sm" && <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:s.sub,
          color:C.textMuted, letterSpacing:"0.8px", marginTop:3, textTransform:"uppercase" }}>
          Ad Intelligence Platform
        </div>}
      </div>
    </div>
  );
}

function SLabel({ children }) {
  return <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9.5, fontWeight:700,
    color:C.textDim, letterSpacing:"1.4px", textTransform:"uppercase", padding:"14px 20px 6px", userSelect:"none" }}>{children}</div>;
}

function NavItem({ icon:Icon, label, active, badge, onClick, indent }) {
  return (
    <div className="nav-item" onClick={onClick} style={{ display:"flex", alignItems:"center", gap:10,
      padding:`8px ${indent?20:16}px`, margin:"1px 8px", borderRadius:9, cursor:"pointer",
      transition:"all 0.15s", background:active?C.active:"transparent",
      borderLeft:active?`2px solid ${C.accent}`:"2px solid transparent" }}>
      <Icon size={15} color={active?C.accentBright:C.textMuted} style={{ flexShrink:0 }}/>
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13,
        fontWeight:active?600:400, color:active?C.text:C.textMuted, flex:1 }}>{label}</span>
      {badge && <span style={{ background:C.accent, color:"#fff", fontSize:9, fontWeight:800,
        padding:"1px 7px", borderRadius:20, letterSpacing:"0.3px" }}>{badge}</span>}
      {active && <div style={{ width:5, height:5, borderRadius:"50%", background:C.accentBright,
        boxShadow:`0 0 10px ${C.accentGlow}` }}/>}
    </div>
  );
}

function Sidebar({ nav, setNav, user, plan, unread }) {
  const activeCampaigns = MOCK_CAMPAIGNS.filter(c=>c.status==="ACTIVE").length;
  return (
    <aside style={{ width:224, minHeight:"100vh", background:C.sidebar,
      borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column",
      flexShrink:0, position:"relative", zIndex:10 }}>
      {/* Tech animated grid */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", inset:0, opacity:0.04,
          backgroundImage:"linear-gradient(rgba(0,195,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(0,195,255,0.8) 1px,transparent 1px)",
          backgroundSize:"28px 28px" }}/>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:200,
          background:"linear-gradient(180deg,rgba(0,102,255,0.12) 0%,transparent 100%)", opacity:0.8 }}/>
      </div>
      <div style={{ padding:"22px 20px 18px" }}><Logo/></div>
      <div style={{ borderBottom:`1px solid ${C.border}`, marginBottom:4 }}/>

      <SLabel>Negocio</SLabel>
      <div style={{ padding:"4px 12px 8px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:9,
          background:C.surface, border:`1px solid ${C.border}`, cursor:"pointer" }}>
          <div style={{ width:28, height:28, borderRadius:8,
            background:`linear-gradient(135deg,${C.accent},${C.badge})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:900, color:"#fff", flexShrink:0 }}>
            {user.company.slice(0,2).toUpperCase()}
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13,
            fontWeight:600, color:C.text, flex:1, overflow:"hidden",
            textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.company}</span>
          <ChevronDown size={12} color={C.textMuted}/>
        </div>
      </div>

      <div style={{ borderBottom:`1px solid ${C.border}`, margin:"6px 0 4px" }}/>
      <SLabel>Principal</SLabel>
      <NavItem icon={BarChart2} label="Dashboard"           active={nav==="dashboard"}    onClick={()=>setNav("dashboard")}/>
      <NavItem icon={Activity}  label="Analytics"           active={nav==="analytics"}    onClick={()=>setNav("analytics")} badge="NEW"/>

      <div style={{ borderBottom:`1px solid ${C.border}`, margin:"6px 0 4px" }}/>
      <SLabel>Centro de Marca</SLabel>
      <NavItem icon={Brain}     label="ADN de Marca"        active={nav==="adn"}          onClick={()=>setNav("adn")}/>
      <NavItem icon={Palette}   label="Configuración"       active={nav==="config-brand"}  onClick={()=>setNav("config-brand")}/>
      <NavItem icon={Link2}     label="Conexiones"          active={nav==="connections"}  onClick={()=>setNav("connections")}/>

      <div style={{ borderBottom:`1px solid ${C.border}`, margin:"6px 0 4px" }}/>
      <SLabel>Campañas</SLabel>
      <NavItem icon={Target}    label="Nueva Estrategia"    active={nav==="pauta"}        onClick={()=>setNav("pauta")}/>
      <NavItem icon={Rocket}    label="Campañas Activas"    active={nav==="lanzadas"}     onClick={()=>setNav("lanzadas")} badge={String(activeCampaigns)}/>

      <div style={{ borderBottom:`1px solid ${C.border}`, margin:"6px 0 4px" }}/>
      <SLabel>Cuenta</SLabel>
      <NavItem icon={CreditCard} label="Billing & Planes"  active={nav==="billing"}      onClick={()=>setNav("billing")}/>
      <NavItem icon={Settings}  label="Configuración"      active={nav==="settings"}     onClick={()=>setNav("settings")}/>

      <div style={{ flex:1 }}/>

      {/* Plan widget */}
      <div style={{ margin:"8px 12px", padding:"14px 16px", borderRadius:14, position:"relative", overflow:"hidden",
        background:`linear-gradient(135deg,rgba(0,66,160,0.35),rgba(0,102,255,0.15))`,
        border:`1px solid rgba(0,195,255,0.25)` }}>
        <div style={{ position:"absolute", top:-24, right:-24, width:80, height:80, borderRadius:"50%",
          background:`radial-gradient(circle,rgba(0,195,255,0.3),transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <Star size={12} color={C.accentBright} fill={C.accentBright}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:800,
              color:C.accentBright, textTransform:"uppercase", letterSpacing:"0.5px" }}>{plan.name}</span>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted }}>
            {plan.creditsLeft.toLocaleString()} créditos
          </span>
        </div>
        <div style={{ height:4, borderRadius:2, background:"rgba(255,255,255,0.08)", marginBottom:10 }}>
          <div style={{ height:"100%", borderRadius:2, width:`${(plan.creditsLeft/plan.creditsTotal)*100}%`,
            background:`linear-gradient(90deg,${C.accent},${C.accentBright})` }}/>
        </div>
        <button onClick={()=>setNav("billing")} style={{ width:"100%", padding:"7px 0", borderRadius:8, border:"none",
          background:"linear-gradient(90deg,#0066FF,#00C3FF)", color:"#fff",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700, cursor:"pointer",
          boxShadow:"0 4px 18px rgba(0,195,255,0.4)" }}>Actualizar Plan</button>
      </div>

      {/* User */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px",
        margin:"4px 8px 8px", borderRadius:9, cursor:"pointer",
        border:`1px solid ${C.border}`, background:C.surface }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},#3B82F6)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, fontWeight:800, color:"#fff", flexShrink:0 }}>
          {user.name.slice(0,2).toUpperCase()}
        </div>
        <div style={{ flex:1, overflow:"hidden" }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700,
            color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user.name}</div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted }}>{user.email}</div>
        </div>
        <LogOut size={13} color={C.textDim} style={{ cursor:"pointer" }}/>
      </div>
    </aside>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// LANGUAGE SWITCHER
// ══════════════════════════════════════════════════════════════════════════════
const LANGUAGES = [
  { code:"es", label:"Español",    flag:"🇲🇽" },
  { code:"en", label:"English",    flag:"🇺🇸" },
  { code:"pt", label:"Português",  flag:"🇧🇷" },
  { code:"fr", label:"Français",   flag:"🇫🇷" },
  { code:"de", label:"Deutsch",    flag:"🇩🇪" },
  { code:"it", label:"Italiano",   flag:"🇮🇹" },
  { code:"ja", label:"日本語",      flag:"🇯🇵" },
  { code:"zh", label:"中文",        flag:"🇨🇳" },
  { code:"ko", label:"한국어",      flag:"🇰🇷" },
  { code:"ar", label:"العربية",    flag:"🇸🇦" },
];

function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);

  return (
    <div style={{ position:"relative" }}>
      <button className="btn-ghost" onClick={()=>setOpen(!open)}
        style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
          height:34, padding:"0 10px", display:"flex", alignItems:"center", gap:6,
          cursor:"pointer", transition:"all 0.15s", minWidth:34 }}>
        <span style={{ fontSize:15 }}>{lang.flag}</span>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11,
          fontWeight:600, color:C.textMuted }}>{lang.code.toUpperCase()}</span>
        <ChevronDown size={10} color={C.textMuted}
          style={{ transition:"transform 0.2s", transform:open?"rotate(180deg)":"rotate(0deg)" }}/>
      </button>

      {open && (
        <div className="scale-in" style={{ position:"absolute", top:"calc(100% + 8px)", right:0,
          width:180, borderRadius:14, background:C.card, border:`1px solid ${C.border}`,
          boxShadow:"0 20px 60px rgba(0,0,0,0.5)", overflow:"hidden", zIndex:500 }}>
          <div style={{ padding:"8px 12px 6px", borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700,
              color:C.textDim, letterSpacing:"0.8px", textTransform:"uppercase" }}>Idioma</span>
          </div>
          <div style={{ maxHeight:260, overflowY:"auto", padding:"4px 0" }}>
            {LANGUAGES.map((l,i) => (
              <div key={l.code} onClick={()=>{ setLang(l); setOpen(false); }}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 14px",
                  cursor:"pointer", transition:"background 0.12s",
                  background:lang.code===l.code?C.active:"transparent",
                  animation:`fadeUp 0.15s ${i*0.03}s ease both` }}
                onMouseEnter={e=>e.currentTarget.style.background=C.surfaceHover}
                onMouseLeave={e=>e.currentTarget.style.background=lang.code===l.code?C.active:"transparent"}>
                <span style={{ fontSize:16 }}>{l.flag}</span>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12,
                  fontWeight:lang.code===l.code?700:400,
                  color:lang.code===l.code?C.accentBright:C.textMuted }}>{l.label}</span>
                {lang.code===l.code && <Check size={11} color={C.accentBright} style={{ marginLeft:"auto" }}/>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ crumbs, onBell, unread, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  return (
    <header style={{ height:56, borderBottom:`1px solid ${C.border}`, display:"flex",
      alignItems:"center", justifyContent:"space-between", padding:"0 28px",
      background:C.bg, flexShrink:0, position:"sticky", top:0, zIndex:8,
      backdropFilter:"blur(20px)" }}>
      <nav style={{ display:"flex", alignItems:"center", gap:6 }}>
        {crumbs.map((c,i) => (
          <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12,
              fontWeight:i===crumbs.length-1?700:400,
              color:i===crumbs.length-1?C.text:C.textMuted }}>{c}</span>
            {i<crumbs.length-1 && <ChevronRight size={11} color={C.textDim}/>}
          </span>
        ))}
      </nav>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* Search */}
        <div style={{ display:"flex", alignItems:"center", gap:0, transition:"all 0.2s" }}>
          {searchOpen && (
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar campañas..."
              autoFocus style={{ width:180, padding:"6px 12px", borderRadius:"8px 0 0 8px",
                background:C.surface, border:`1px solid ${C.border}`, borderRight:"none",
                color:C.text, fontSize:12 }}/>
          )}
          <button className="btn-ghost" onClick={()=>setSearchOpen(!searchOpen)}
            style={{ width:34, height:34, borderRadius:searchOpen?"0 8px 8px 0":8,
              background:C.surface, border:`1px solid ${C.border}`, display:"flex",
              alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.15s" }}>
            <Search size={14} color={C.textMuted}/>
          </button>
        </div>
        {/* Bell */}
        <button className="btn-ghost" onClick={onBell}
          style={{ position:"relative", background:C.surface, border:`1px solid ${C.border}`,
            borderRadius:8, width:34, height:34, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer", transition:"all 0.15s" }}>
          <Bell size={14} color={C.textMuted}/>
          {unread>0 && <span style={{ position:"absolute", top:5, right:5, width:8, height:8,
            borderRadius:"50%", background:C.badge, border:`1.5px solid ${C.bg}`,
            animation:"pulse 2s ease-in-out infinite" }}/>}
        </button>
        <LangSwitcher/>
      </div>
    </header>
  );
}

function SectionCard({ title, badge, icon:Icon, children, action, noPad }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, position:'relative',
      padding:noPad?"0":"22px 24px", marginBottom:18, overflow:"hidden" }}>
      {title && (
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16,
          padding:noPad?"18px 20px 0":undefined }}>
          <div style={{ width:30, height:30, borderRadius:8, background:C.accentSoft,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon size={14} color={C.accentBright}/>
          </div>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15,
            fontWeight:800, color:C.text, letterSpacing:"-0.2px" }}>{title}</h2>
          {badge !== undefined && <span style={{ width:22, height:22, borderRadius:6, background:C.accentSoft,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:800, color:C.accentBright }}>{badge}</span>}
          {action && <div style={{ marginLeft:"auto" }}>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE / ONBOARDING
// ══════════════════════════════════════════════════════════════════════════════
function LandingPage({ onLogin, onSignup }) {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  return (
    <div style={{ minHeight:"100vh", background:C.bg, overflow:"hidden" }}>
      {/* Navbar */}
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"20px 60px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0,
        background:"rgba(13,11,26,0.9)", backdropFilter:"blur(20px)", zIndex:100 }}>
        <Logo/>
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          {["Características","Precios","Casos de uso","Documentación"].map(t => (
            <span key={t} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13,
              color:C.textMuted, cursor:"pointer", fontWeight:500,
              transition:"color 0.15s" }}
              onMouseEnter={e=>e.target.style.color=C.text}
              onMouseLeave={e=>e.target.style.color=C.textMuted}>{t}</span>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onLogin} className="btn-ghost" style={{ padding:"8px 20px", borderRadius:9,
            background:C.surface, border:`1px solid ${C.border}`, color:C.text,
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600,
            cursor:"pointer", transition:"all 0.15s" }}>Iniciar sesión</button>
          <button onClick={onSignup} style={{ padding:"8px 22px", borderRadius:9, border:"none",
            background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
            cursor:"pointer", boxShadow:`0 4px 16px ${C.accentGlow}` }}>Comenzar gratis</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"100px 40px 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          width:600, height:600, borderRadius:"50%",
          background:`radial-gradient(circle,rgba(0,102,255,0.18) 0%,rgba(0,195,255,0.06) 50%,transparent 70%)`,
          pointerEvents:"none" }}/>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px",
          borderRadius:20, background:C.accentSoft, border:`1px solid rgba(0,102,255,0.25)`,
          marginBottom:24 }}>
          <Sparkles size={12} color={C.accentBright}/>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700,
            color:C.accentBright }}>Potenciado por Claude AI + Meta Ads API</span>
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:64, fontWeight:900,
          color:C.text, letterSpacing:"-2px", lineHeight:1.1, marginBottom:24, maxWidth:800, margin:"0 auto 24px" }}>
          Tu ecosistema inteligente de <span style={{ background:"linear-gradient(90deg,#0066FF,#00C3FF,#00FFD1,#0066FF)",
            backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"gradientShift 3s ease infinite" }}>crecimiento</span>
        </h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, color:C.textMuted,
          maxWidth:560, margin:"0 auto 40px", lineHeight:1.7, fontWeight:400 }}>
          Genera creativos publicitarios con IA, gestiona campañas en Meta y TikTok,
          y escala tu negocio desde un solo lugar.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", marginBottom:60 }}>
          <button onClick={onSignup} style={{ padding:"14px 32px", borderRadius:12, border:"none",
            background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:800,
            cursor:"pointer", display:"flex", alignItems:"center", gap:8,
            boxShadow:"0 8px 32px rgba(0,195,255,0.35)", letterSpacing:"-0.2px" }}>
            Comenzar gratis <ArrowRight size={16}/>
          </button>
          <button onClick={onLogin} className="btn-ghost" style={{ padding:"14px 28px", borderRadius:12,
            background:C.surface, border:`1px solid ${C.border}`, color:C.text,
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:600, cursor:"pointer",
            transition:"all 0.15s" }}>Ver demo</button>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap" }}>
          {[{n:"2,400+",l:"Marcas activas"},{n:"$12M+",l:"En inversión gestionada"},{n:"4.3x",l:"ROAS promedio"},{n:"98%",l:"Satisfacción"} ].map(s => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:28, fontWeight:900,
                color:C.text, letterSpacing:"-1px", background:`linear-gradient(135deg,${C.text},${C.accentBright})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted, marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:"60px 60px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:36, fontWeight:900,
            color:C.text, letterSpacing:"-1px", marginBottom:12 }}>Todo lo que necesitas para escalar</h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:C.textMuted }}>
            De la idea al anuncio en minutos, no en semanas.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {[
            { icon:Wand2,     color:C.accentBright, title:"Creativos con IA",       desc:"Genera imágenes y copys publicitarios únicos con Claude AI en segundos." },
            { icon:Target,    color:C.green,        title:"Gestión multi-plataforma",desc:"Meta Ads y TikTok Ads desde un solo panel. Sin cambiar de pestaña." },
            { icon:BarChart2, color:C.amber,        title:"Analytics en tiempo real",desc:"Métricas unificadas, ROAS por campaña y alertas automáticas de rendimiento." },
            { icon:Brain,     color:C.pink,         title:"ADN de Marca con IA",     desc:"Tu identidad de marca analizada y aplicada automáticamente a cada creativo." },
            { icon:Rocket,    color:C.cyan,         title:"Lanzamiento en 1 clic",   desc:"Configura, aprueba y lanza campañas directamente desde la plataforma." },
            { icon:Shield,    color:C.blue,         title:"Tokens encriptados",       desc:"OAuth 2.0 + AES-256-GCM. Tus credenciales de Ad siempre seguras." },
          ].map(f => (
            <div key={f.title} className="card-hover" style={{ padding:"24px", borderRadius:16,
              background:C.card, border:`1px solid ${C.border}`, transition:"all 0.2s",
              position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%",
                background:`radial-gradient(circle,${f.color}18 0%,transparent 70%)` }}/>
              <div style={{ width:42, height:42, borderRadius:12, background:`${f.color}18`,
                display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <f.icon size={20} color={f.color}/>
              </div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:800,
                color:C.text, marginBottom:8 }}>{f.title}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted, lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ padding:"60px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:36, fontWeight:900,
            color:C.text, letterSpacing:"-1px", marginBottom:12 }}>Planes para cada etapa</h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:C.textMuted }}>Sin contratos. Cancela cuando quieras.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:960, margin:"0 auto" }}>
          {PLANS.map(plan => (
            <div key={plan.id} className="pricing-card" style={{ borderRadius:20, overflow:"hidden",
              background: plan.popular ? `linear-gradient(135deg,rgba(124,58,237,0.15),rgba(168,85,247,0.08))` : C.card,
              border:`2px solid ${plan.popular ? C.accent : C.border}`,
              transition:"all 0.25s", position:"relative",
              boxShadow: plan.popular ? `0 0 40px ${C.accentGlow}` : "none",
              cursor:"pointer" }}>
              {plan.popular && (
                <div style={{ background:`linear-gradient(90deg,${C.accent},${C.accentBright})`,
                  textAlign:"center", padding:"6px", fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:11, fontWeight:800, color:"#fff", letterSpacing:"1px", textTransform:"uppercase" }}>
                  ✦ MÁS POPULAR
                </div>
              )}
              <div style={{ padding:"28px 24px" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:700,
                  color:plan.color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:6 }}>{plan.name}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:42, fontWeight:900,
                    color:C.text, letterSpacing:"-2px" }}>${plan.price}</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>/mes</span>
                </div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textDim, marginBottom:24 }}>{plan.limit}</div>
                <button onClick={onSignup} style={{ width:"100%", padding:"11px 0", borderRadius:10, border:"none",
                  background: plan.popular ? `linear-gradient(90deg,${C.accent},${C.accentBright})` : C.surface,
                  border: plan.popular ? "none" : `1px solid ${C.border}`,
                  color: plan.popular ? "#fff" : C.text,
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
                  cursor:"pointer", boxShadow: plan.popular ? `0 6px 20px ${C.accentGlow}` : "none",
                  marginBottom:22 }}>Elegir {plan.name}</button>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <CheckCircle size={13} color={plan.popular ? C.accentBright : C.green}/>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12,
                        color:C.textMuted }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding:"60px", textAlign:"center", borderTop:`1px solid ${C.border}` }}>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:36, fontWeight:900,
          color:C.text, letterSpacing:"-1px", marginBottom:16 }}>
          ¿Listo para escalar tu marca? 🚀
        </h2>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, color:C.textMuted, marginBottom:32 }}>
          Únete a 2,400+ marcas que ya crecen con Flow.ia
        </p>
        <button onClick={onSignup} style={{ padding:"16px 40px", borderRadius:14, border:"none",
          background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:16, fontWeight:800,
          cursor:"pointer", boxShadow:`0 10px 40px ${C.accentGlow}`, letterSpacing:"-0.3px" }}>
          Comenzar gratis — sin tarjeta de crédito
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// AUTH SCREENS
// ══════════════════════════════════════════════════════════════════════════════
function AuthScreen({ mode, onAuth, onSwitch }) {
  const [form, setForm] = useState({ name:"", company:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode==="login";

  async function handleSubmit() {
    if (!form.email || !form.password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    onAuth({
      name: form.name || "Juan Camilo",
      company: form.company || "Impacto K",
      email: form.email,
      plan: "growth",
    });
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center",
      justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse at 50% 0%,rgba(0,102,255,0.2) 0%,rgba(0,195,255,0.06) 40%,transparent 60%)`,
        pointerEvents:"none" }}/>
      <div className="scale-in" style={{ width:440, borderRadius:24, background:C.card,
        border:`1px solid ${C.border}`, padding:"40px",
        boxShadow:"0 40px 100px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}><Logo/></div>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900,
            color:C.text, letterSpacing:"-0.5px", marginBottom:8 }}>
            {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta gratis"}
          </h2>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>
            {isLogin ? "Ingresa tus credenciales para continuar" : "Empieza a escalar tu marca hoy"}
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {!isLogin && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <AuthInput label="Nombre" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Juan"/>
              <AuthInput label="Empresa" value={form.company} onChange={v=>setForm({...form,company:v})} placeholder="Mi Marca"/>
            </div>
          )}
          <AuthInput label="Email" value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="tu@empresa.com" type="email"/>
          <AuthInput label="Contraseña" value={form.password} onChange={v=>setForm({...form,password:v})} placeholder="••••••••" type="password"/>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", padding:"13px 0", borderRadius:12,
          border:"none", marginTop:22,
          background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800,
          cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center",
          justifyContent:"center", gap:8, boxShadow:`0 6px 24px ${C.accentGlow}`,
          opacity:loading?0.8:1, transition:"all 0.2s" }}>
          {loading ? <><Loader2 size={16} style={{ animation:"spin 0.8s linear infinite" }}/> {isLogin?"Entrando...":"Creando cuenta..."}</> :
            isLogin ? "Iniciar sesión" : "Crear cuenta gratuita"}
        </button>

        <div style={{ textAlign:"center", marginTop:20 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>
            {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <span onClick={onSwitch} style={{ color:C.accentBright, fontWeight:700, cursor:"pointer" }}>
              {isLogin ? "Regístrate gratis" : "Iniciar sesión"}
            </span>
          </span>
        </div>

        {!isLogin && (
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textDim,
            textAlign:"center", marginTop:16, lineHeight:1.5 }}>
            Al registrarte aceptas nuestros Términos de Servicio y Política de Privacidad. Sin tarjeta de crédito.
          </p>
        )}
      </div>
    </div>
  );
}

function AuthInput({ label, value, onChange, placeholder, type="text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700,
        color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>
        {label}
      </label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:"100%", padding:"10px 14px", borderRadius:10, background:C.surface,
          border:`1px solid ${focused?C.accent:C.border}`, color:C.text, fontSize:13,
          transition:"border-color 0.15s" }}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD (Main)
// ══════════════════════════════════════════════════════════════════════════════
function DashboardView({ setNav, notify, user }) {
  const totalSpend  = MOCK_CAMPAIGNS.reduce((a,c)=>a+c.spent,0);
  const totalImpr   = MOCK_CAMPAIGNS.reduce((a,c)=>a+c.impressions,0);
  const totalClicks = MOCK_CAMPAIGNS.reduce((a,c)=>a+c.clicks,0);
  const avgRoas     = MOCK_CAMPAIGNS.filter(c=>c.roas>0).reduce((a,c,_,arr)=>a+(c.roas/arr.length),0);
  const active      = MOCK_CAMPAIGNS.filter(c=>c.status==="ACTIVE").length;

  const KPIs = [
    { label:"Gasto Total", value:`$${totalSpend.toFixed(2)}`, sub:"últimos 30 días", icon:DollarSign, color:C.green,    delta:"+12.4%", up:true },
    { label:"Impresiones", value:totalImpr.toLocaleString(), sub:"alcance orgánico",  icon:Eye,        color:C.blue,     delta:"+28.1%", up:true },
    { label:"Clics",       value:totalClicks.toLocaleString(),sub:"CTR promedio",     icon:MousePointerClick, color:C.accentBright, delta:"+8.7%",  up:true },
    { label:"ROAS Prom.",  value:`${avgRoas.toFixed(1)}x`,   sub:"retorno en ad spend",icon:TrendingUp, color:C.amber,    delta:"+0.4x",  up:true },
    { label:"Campañas",    value:String(active),             sub:`de ${MOCK_CAMPAIGNS.length} totales`,icon:Rocket, color:C.pink, delta:`${active} activas`, up:true },
    { label:"Créditos IA", value:"17,344",                   sub:"disponibles hoy",  icon:Sparkles,   color:C.cyan,     delta:"-2,312",  up:false },
  ];

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      {/* Greeting with tech accent */}
      <div style={{ marginBottom:28, position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <div style={{ position:"relative" }}>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:24, fontWeight:900,
              color:C.text, letterSpacing:"-0.5px", lineHeight:1 }}>
              Hola, {user.name.split(" ")[0]} 👋
            </h1>
            <div style={{ position:"absolute", bottom:-4, left:0, height:2, width:"60%",
              background:"linear-gradient(90deg,#0066FF,#00C3FF,transparent)",
              borderRadius:2 }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 10px",
            borderRadius:20, background:"rgba(0,214,143,0.1)",
            border:"1px solid rgba(0,214,143,0.25)", marginLeft:4 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:C.green,
              animation:"pulse 1.8s ease-in-out infinite" }}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10,
              fontWeight:700, color:C.green }}>Sistema operativo</span>
          </div>
        </div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted, marginTop:10 }}>
          Resumen de tu ecosistema publicitario · actualizado ahora mismo
        </p>
      </div>

      {/* KPI grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
        {KPIs.map((k,i) => (
          <div key={i} className="stat-card card-hover" style={{ padding:"18px 20px", borderRadius:14,
            background:C.card, border:`1px solid ${C.border}`, position:"relative", overflow:"hidden",
            transition:"all 0.2s", animation:`fadeUp 0.3s ${i*0.05}s ease both` }}>
            <div style={{ position:"absolute", top:-16, right:-16, width:70, height:70, borderRadius:"50%",
              background:`radial-gradient(circle,${k.color}18 0%,transparent 70%)` }}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`${k.color}18`,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <k.icon size={13} color={k.color}/>
              </div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700,
                color:k.up?C.green:C.red, background:k.up?"rgba(16,185,129,0.12)":"rgba(248,113,113,0.12)",
                padding:"2px 7px", borderRadius:5 }}>
                {k.delta}
              </span>
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900,
              color:C.text, letterSpacing:"-0.5px", lineHeight:1, marginBottom:4 }}>{k.value}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>{k.label}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textDim, marginTop:1 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Campaigns table */}
      <SectionCard title="Campañas recientes" badge={MOCK_CAMPAIGNS.length} icon={Rocket}
        action={<button onClick={()=>setNav("lanzadas")} style={{ display:"flex", alignItems:"center", gap:5,
          padding:"6px 12px", borderRadius:8, border:`1px solid ${C.border}`, background:C.surface,
          color:C.textMuted, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600,
          cursor:"pointer" }}>Ver todas <ArrowRight size={11}/></button>}
        noPad>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${C.border}` }}>
              {["Campaña","Plataforma","Estado","Presupuesto","Gasto","Impresiones","ROAS"].map(h => (
                <th key={h} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10,
                  fontWeight:700, color:C.textDim, textTransform:"uppercase", letterSpacing:"0.8px",
                  padding:"10px 16px", textAlign:"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_CAMPAIGNS.map((c,i) => (
              <tr key={c.id} className="campaign-row" onClick={()=>setNav("lanzadas")}
                style={{ borderBottom:`1px solid ${C.border}`, cursor:"pointer", transition:"background 0.12s",
                  animation:`slideIn 0.3s ${i*0.04}s ease both` }}>
                <td style={{ padding:"12px 16px" }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600,
                    color:C.text, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {c.name}
                  </div>
                </td>
                <td style={{ padding:"12px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    {c.platform==="META" ? <Facebook size={12} color={C.blue}/> : <ZapIcon size={12} color={C.pink}/>}
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>{c.platform}</span>
                  </div>
                </td>
                <td style={{ padding:"12px 16px" }}>
                  <StatusBadge status={c.status}/>
                </td>
                <td style={{ padding:"12px 16px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.text }}>${c.budget}/día</td>
                <td style={{ padding:"12px 16px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:c.spent>0?C.text:C.textDim }}>{c.spent>0?`$${c.spent}`:"—"}</td>
                <td style={{ padding:"12px 16px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:c.impressions>0?C.text:C.textDim }}>{c.impressions>0?c.impressions.toLocaleString():"—"}</td>
                <td style={{ padding:"12px 16px" }}>
                  {c.roas>0 ? <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700,
                    color:c.roas>=3?C.green:c.roas>=2?C.amber:C.red }}>{c.roas}x</span> : <span style={{ color:C.textDim, fontSize:12 }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      {/* Quick actions */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[
          { icon:Plus,    label:"Nueva Campaña",  desc:"Lanza en minutos con IA", color:C.accentBright, action:()=>setNav("pauta") },
          { icon:Brain,   label:"Actualizar ADN", desc:"Refina tu identidad de marca", color:C.pink, action:()=>setNav("adn") },
          { icon:Link2,   label:"Conectar cuenta",desc:"Meta Ads o TikTok Ads", color:C.cyan, action:()=>setNav("connections") },
        ].map(qa => (
          <div key={qa.label} className="card-hover" onClick={qa.action}
            style={{ padding:"18px 20px", borderRadius:14, background:C.card,
              border:`1px solid ${C.border}`, cursor:"pointer", transition:"all 0.2s",
              display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:`${qa.color}18`,
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <qa.icon size={17} color={qa.color}/>
            </div>
            <div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700, color:C.text }}>{qa.label}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted, marginTop:2 }}>{qa.desc}</div>
            </div>
            <ArrowRight size={14} color={C.textDim} style={{ marginLeft:"auto" }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { ACTIVE:{ c:C.green, bg:"rgba(16,185,129,0.12)", b:"rgba(16,185,129,0.3)", l:"Activa" },
    PAUSED:{ c:C.amber, bg:"rgba(245,158,11,0.12)", b:"rgba(245,158,11,0.3)", l:"Pausada" },
    DRAFT:{ c:C.textMuted, bg:"rgba(255,255,255,0.05)", b:C.border, l:"Borrador" } };
  const s = map[status]||map.DRAFT;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:6,
      background:s.bg, border:`1px solid ${s.b}` }}>
      {status==="ACTIVE" && <div style={{ width:5, height:5, borderRadius:"50%", background:s.c, animation:"pulse 1.8s infinite" }}/>}
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700, color:s.c }}>{s.l}</span>
    </span>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ADN DE MARCA
// ══════════════════════════════════════════════════════════════════════════════
function ADNView({ notify, user }) {
  const [form, setForm] = useState({ name:user.company, industry:"Moda y accesorios", description:"", audience:"" });
  const [dna, setDna]   = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!form.description || !form.audience) { notify("Completa todos los campos","warning"); return; }
    setLoading(true);
    try {
      const result = await generateBrandDNA(form);
      setDna(result);
      notify("ADN de marca generado con IA ✦");
    } catch(e) {
      notify("Error al generar. Intenta de nuevo","error");
    } finally { setLoading(false); }
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900,
          color:C.text, letterSpacing:"-0.4px", marginBottom:6 }}>ADN de Marca</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>
          Define la identidad de tu marca. La IA la aplicará a todos tus creativos automáticamente.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <SectionCard title="Información de marca" icon={Brain}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { label:"Nombre de la marca", key:"name", placeholder:"Ej: Impacto K" },
              { label:"Industria", key:"industry", placeholder:"Ej: Moda, Tecnología, Alimentos..." },
              { label:"Descripción del negocio", key:"description", placeholder:"Qué haces, qué vendes, qué te hace diferente...", multiline:true },
              { label:"Audiencia objetivo", key:"audience", placeholder:"Ej: Jóvenes 18-35 años, emprendedores, mamás..." },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700,
                  color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>{f.label}</label>
                {f.multiline
                  ? <textarea value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                      placeholder={f.placeholder} rows={3}
                      style={{ width:"100%", padding:"10px 14px", borderRadius:10, background:C.surface,
                        border:`1px solid ${C.border}`, color:C.text, fontSize:13, resize:"none",
                        lineHeight:1.5 }}/>
                  : <input value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                      placeholder={f.placeholder}
                      style={{ width:"100%", padding:"10px 14px", borderRadius:10, background:C.surface,
                        border:`1px solid ${C.border}`, color:C.text, fontSize:13 }}/>
                }
              </div>
            ))}
            <button onClick={handleGenerate} disabled={loading}
              style={{ padding:"12px 0", borderRadius:11, border:"none", marginTop:4,
                background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
                cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center",
                justifyContent:"center", gap:8, boxShadow:`0 6px 20px ${C.accentGlow}`,
                opacity:loading?0.8:1 }}>
              {loading ? <><Loader2 size={15} style={{ animation:"spin 0.8s linear infinite" }}/> Analizando con IA...</> : <><Brain size={15}/> Generar ADN con IA</>}
            </button>
          </div>
        </SectionCard>

        <div>
          {dna ? (
            <div className="scale-in" style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Tagline */}
              <div style={{ padding:"22px", borderRadius:16, background:C.accentSoft,
                border:`1px solid rgba(0,102,255,0.25)`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700,
                  color:C.textMuted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:10 }}>Tagline</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900,
                  color:C.text, letterSpacing:"-0.5px", lineHeight:1.2 }}>"{dna.tagline}"</div>
              </div>
              {/* Tono */}
              <SectionCard title="Tono de marca" icon={Palette}>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {dna.tono?.map(t => (
                    <span key={t} style={{ padding:"6px 14px", borderRadius:8, background:C.accentSoft,
                      border:`1px solid rgba(0,102,255,0.25)`,
                      fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, color:C.accentBright }}>{t}</span>
                  ))}
                </div>
              </SectionCard>
              {/* Propuesta */}
              <SectionCard title="Propuesta de valor" icon={Target}>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, color:C.text,
                  lineHeight:1.7, fontStyle:"italic" }}>"{dna.propuesta}"</p>
              </SectionCard>
              {/* Keywords */}
              <SectionCard title="Palabras clave" icon={Hash}>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {dna.palabrasClave?.map(kw => (
                    <span key={kw} style={{ padding:"4px 10px", borderRadius:6,
                      background:C.surface, border:`1px solid ${C.border}`,
                      fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600, color:C.textMuted }}>#{kw}</span>
                  ))}
                </div>
              </SectionCard>
              {/* Arquetipo */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[{ label:"Arquetipo", value:dna.arquetipoMarca, color:C.amber },
                  { label:"Emoción principal", value:dna.emocionPrincipal, color:C.pink }].map(item => (
                  <div key={item.label} style={{ padding:"16px", borderRadius:12, background:C.card,
                    border:`1px solid ${C.border}`, textAlign:"center" }}>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700,
                      color:C.textDim, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8 }}>{item.label}</div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:16, fontWeight:800,
                      color:item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height:"100%", minHeight:400, display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:16,
              background:C.card, border:`1px solid ${C.border}`, borderRadius:18 }}>
              <div className="float" style={{ width:64, height:64, borderRadius:18,
                background:C.accentSoft, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Brain size={28} color={C.accentBright}/>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:700,
                  color:C.text, marginBottom:6 }}>Tu ADN aparecerá aquí</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>
                  Completa el formulario y genera tu identidad de marca con IA
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CONNECTIONS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ConnectionsView({ notify }) {
  const [connections, setConnections] = useState([
    { id:"c1", platform:"META",   name:"Impacto K - Main",    accountId:"act_123456789", status:"connected", lastVerified:new Date() },
    { id:"c2", platform:"TIKTOK", name:"Impacto K TikTok",    accountId:"7123456789",    status:"connected", lastVerified:new Date() },
  ]);
  const [verifying, setVerifying] = useState(null);

  async function verify(id) {
    setVerifying(id);
    await new Promise(r=>setTimeout(r,1500));
    setVerifying(null);
    setConnections(cs => cs.map(c => c.id===id ? { ...c, lastVerified:new Date() } : c));
    notify("Token verificado — conexión activa ✦");
  }

  async function connect(platform) {
    notify(`Redirigiendo a ${platform} OAuth...`, "warning");
    await new Promise(r=>setTimeout(r,1000));
    notify(`Conectado a ${platform} exitosamente ✦`);
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px", marginBottom:6 }}>Conexiones Publicitarias</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>Gestiona tus cuentas de Meta Ads y TikTok Ads. Tokens encriptados con AES-256-GCM.</p>
      </div>

      <SectionCard title="Cuentas conectadas" badge={connections.length} icon={Link2}
        action={<div style={{ display:"flex", gap:8 }}>
          {["META","TIKTOK"].map(p => (
            <button key={p} onClick={()=>connect(p)} style={{ display:"flex", alignItems:"center", gap:6,
              padding:"7px 14px", borderRadius:8, border:`1px solid ${C.border}`,
              background:C.surface, color:C.textMuted, cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600 }}>
              {p==="META" ? <Facebook size={12} color={C.blue}/> : <ZapIcon size={12} color={C.pink}/>}
              + {p}
            </button>
          ))}
        </div>}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {connections.map(conn => (
            <div key={conn.id} style={{ display:"flex", alignItems:"center", padding:"14px 16px",
              borderRadius:12, background:C.cardDeep, border:`1px solid ${C.border}`, gap:14 }}>
              <div style={{ width:40, height:40, borderRadius:10, flexShrink:0,
                background: conn.platform==="META" ? "rgba(96,165,250,0.15)" : "rgba(244,114,182,0.15)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                {conn.platform==="META" ? <Facebook size={18} color={C.blue}/> : <ZapIcon size={18} color={C.pink}/>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{conn.name}</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>ID: {conn.accountId} · Verificado: {conn.lastVerified.toLocaleTimeString()}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:6,
                background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)" }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, animation:"pulse 1.8s infinite" }}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700, color:C.green }}>ACTIVO</span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>verify(conn.id)} style={{ display:"flex", alignItems:"center", gap:5,
                  padding:"7px 12px", borderRadius:8, border:`1px solid ${C.border}`,
                  background:C.surface, color:C.textMuted, cursor:"pointer",
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600 }}>
                  {verifying===conn.id ? <Loader2 size={11} style={{ animation:"spin 0.8s linear infinite" }}/> : <Shield size={11}/>}
                  Verificar token
                </button>
                <button style={{ width:30, height:30, borderRadius:7, border:`1px solid rgba(248,113,113,0.3)`,
                  background:"rgba(248,113,113,0.08)", cursor:"pointer", display:"flex",
                  alignItems:"center", justifyContent:"center" }}
                  onClick={()=>{ setConnections(cs=>cs.filter(c=>c.id!==conn.id)); notify("Conexión desactivada","warning"); }}>
                  <Trash2 size={12} color={C.red}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Security info */}
      <SectionCard title="Seguridad de tokens" icon={Shield}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {[
            { icon:Lock, color:C.green,  title:"AES-256-GCM",       desc:"Todos los tokens se encriptan antes de guardarse en base de datos." },
            { icon:RefreshCw, color:C.blue, title:"Auto-refresh",    desc:"TikTok tokens se renuevan automáticamente antes de expirar." },
            { icon:Shield, color:C.amber, title:"OAuth 2.0 CSRF",    desc:"Estado opaco de 32 bytes con TTL de 10 minutos para prevenir ataques." },
          ].map(s => (
            <div key={s.title} style={{ padding:"16px", borderRadius:12, background:C.cardDeep, border:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <s.icon size={14} color={s.color}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, color:C.text }}>{s.title}</span>
              </div>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted, lineHeight:1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN CONFIG
// ══════════════════════════════════════════════════════════════════════════════
function CampaignConfigView({ onLaunch, notify, user }) {
  const [location, setLocation] = useState("Cancún, Quintana Roo, México");
  const [locInput, setLocInput] = useState("");
  const [budget, setBudget]     = useState("4");
  const [images, setImages]     = useState(Array(5).fill(null));
  const [imgStatus, setImgStatus] = useState(Array(5).fill("empty"));
  const [copies, setCopies]     = useState([]);
  const [showModal, setShowModal] = useState(false);
  const filled = images.filter(Boolean).length;

  function handleGenerated({ imageUrls, copies:newCopies }) {
    setShowModal(false);
    const start = images.findIndex(i=>!i);
    const slots = Math.min(imageUrls.length, 5-filled);
    const newStatus = [...imgStatus];
    for(let i=0;i<slots;i++){ const idx=start+i; if(idx>=5) break; newStatus[idx]="loading"; }
    setImgStatus([...newStatus]);
    for(let i=0;i<slots;i++){
      const idx=start+i; if(idx>=5) break;
      setTimeout(()=>{
        setImgStatus(s=>{const x=[...s];x[idx]="done";return x;});
        setImages(im=>{const x=[...im];x[idx]=imageUrls[i];return x;});
      }, 800+i*700);
    }
    setCopies(newCopies);
    notify(`${newCopies.length} copys + ${slots} imágenes generadas con IA ✦`);
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <button className="btn-ghost" style={{ display:"flex", alignItems:"center", gap:6,
        background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
        padding:"6px 12px", cursor:"pointer", marginBottom:22, transition:"all 0.15s" }}>
        <ChevronLeft size={13} color={C.textMuted}/>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>Estrategias</span>
      </button>

      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <div style={{ width:5, height:24, borderRadius:3, background:`linear-gradient(180deg,${C.accent},${C.accentBright})` }}/>
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px" }}>CONFIGURA TU ESTRATEGIA</h1>
        </div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted, marginLeft:15 }}>Completa la información y genera tus creativos con IA.</p>
      </div>

      <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"10px 16px",
        borderRadius:12, background:C.accentSoft, border:"1px solid rgba(0,102,255,0.25)", marginBottom:24 }}>
        <div style={{ width:26, height:26, borderRadius:7, background:`linear-gradient(135deg,${C.accent},${C.accentBright})`,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Target size={12} color="#fff"/>
        </div>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600, color:C.accentBright }}>
          ✦ FlowIA.ads | VENTAS Instagram | +Advantage 5 | IMG
        </span>
      </div>

      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, position:'relative', padding:"24px 26px", marginBottom:22 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 200px", gap:18, marginBottom:22 }}>
          {/* Location */}
          <div>
            <FLabel icon={MapPin} label="Ubicación"/>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:6, padding:"8px 12px",
              borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, minHeight:42, marginTop:8 }}>
              {location && (
                <span style={{ display:"flex", alignItems:"center", gap:5, background:C.accentSoft,
                  border:"1px solid rgba(0,102,255,0.25)", borderRadius:6, padding:"3px 8px" }}>
                  <MapPin size={9} color={C.accentBright}/>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600, color:C.accentBright }}>{location}</span>
                  <button onClick={()=>setLocation("")} style={{ background:"none", border:"none", cursor:"pointer", lineHeight:1 }}><X size={9} color={C.textMuted}/></button>
                </span>
              )}
              <input value={locInput} onChange={e=>setLocInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter"&&locInput.trim()){setLocation(locInput.trim());setLocInput("");}}}
                placeholder={location?"":"Ciudad..."} style={{ flex:1, minWidth:80, background:"none", border:"none", color:C.text, fontSize:12 }}/>
            </div>
          </div>
          {/* Budget */}
          <div>
            <FLabel icon={DollarSign} label="Presupuesto / día"/>
            <div style={{ display:"flex", alignItems:"center", borderRadius:10, overflow:"hidden",
              border:`1px solid ${C.border}`, background:C.surface, marginTop:8 }}>
              <span style={{ padding:"0 10px", fontSize:14, fontWeight:700, color:C.textMuted,
                borderRight:`1px solid ${C.border}`, height:42, display:"flex", alignItems:"center" }}>$</span>
              <input type="number" value={budget} onChange={e=>setBudget(e.target.value)}
                style={{ flex:1, height:42, padding:"0 10px", background:"none", border:"none",
                  fontSize:18, fontWeight:800, color:C.text }}/>
              <span style={{ padding:"0 10px", fontSize:10, color:C.textDim }}>USD</span>
            </div>
            <div style={{ display:"flex", gap:5, marginTop:5 }}>
              {[4,10,20].map(v => <button key={v} onClick={()=>setBudget(String(v))}
                style={{ flex:1, padding:"4px 0", borderRadius:6, cursor:"pointer",
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:600,
                  border:`1px solid ${budget===String(v)?C.accent:C.border}`,
                  background:budget===String(v)?C.accentSoft:C.surface,
                  color:budget===String(v)?C.accentBright:C.textMuted }}>${v}</button>)}
            </div>
          </div>
        </div>

        <div style={{ borderTop:`1px solid ${C.border}`, margin:"0 0 20px" }}/>

        {/* Images */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:C.accentSoft, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <ImageIcon size={12} color={C.accentBright}/>
            </div>
            <div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700, color:C.text }}>
                Imágenes: <span style={{ color:filled===5?C.green:C.accentBright }}>{filled}/5</span>
              </span>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textDim }}>Genera o arrastra tus imágenes</div>
            </div>
          </div>
          <button onClick={()=>setShowModal(true)} style={{ display:"flex", alignItems:"center", gap:6,
            padding:"8px 16px", borderRadius:10, border:"1px solid rgba(0,195,255,0.4)",
            background:`linear-gradient(135deg,rgba(0,102,255,0.18),rgba(168,85,247,0.14))`,
            color:C.accentBright, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:12, fontWeight:700, boxShadow:"0 4px 16px rgba(0,102,255,0.18)" }}>
            <Wand2 size={13}/> + Crear con IA
          </button>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {images.map((img,i) => <ImageSlot key={i} index={i} image={img} status={imgStatus[i]}
            onRemove={idx=>{ setImages(im=>{const x=[...im];x[idx]=null;return x;});
              setImgStatus(s=>{const x=[...s];x[idx]="empty";return x;}); }}/>)}
        </div>
        {filled>0 && <div style={{ height:4, borderRadius:2, background:C.surface, marginTop:14, overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:2, width:`${filled/5*100}%`,
            background:filled===5?`linear-gradient(90deg,${C.green},#34D399)`:`linear-gradient(90deg,${C.accent},${C.accentBright})`,
            transition:"width 0.5s ease" }}/>
        </div>}

        {copies.length>0 && (
          <div style={{ marginTop:16, padding:"12px 14px", borderRadius:12,
            background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
              <Check size={13} color={C.green}/>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, color:C.green }}>
                {copies.length} copys publicitarios listos
              </span>
            </div>
            <div style={{ display:"flex", gap:8, overflowX:"auto" }}>
              {copies.map((c,i) => (
                <div key={i} style={{ minWidth:190, padding:"10px 12px", borderRadius:9,
                  background:C.card, border:`1px solid ${C.border}`, flexShrink:0 }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700, color:C.text,
                    marginBottom:3, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{c.headline}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted, lineHeight:1.4,
                    overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:10 }}>
        <button className="btn-ghost" style={{ padding:"10px 22px", borderRadius:10, background:C.surface,
          border:`1px solid ${C.border}`, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize:13, fontWeight:600, color:C.textMuted, transition:"all 0.15s" }}>Guardar borrador</button>
        <button onClick={()=>filled>0&&onLaunch({budget,location,images,copies})} style={{ padding:"10px 28px",
          borderRadius:10, border:"none",
          background:filled>0?`linear-gradient(90deg,${C.accent},${C.accentBright})`:"rgba(0,102,255,0.2)",
          color:filled>0?"#fff":C.textDim, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
          cursor:filled>0?"pointer":"not-allowed", display:"flex", alignItems:"center", gap:6,
          boxShadow:filled>0?`0 6px 20px ${C.accentGlow}`:"none", transition:"all 0.2s" }}>
          <Rocket size={14}/> Crear anuncio
        </button>
      </div>

      {showModal && <AiModal onClose={()=>setShowModal(false)} onGenerate={handleGenerated} brand={user.company}/>}
    </div>
  );
}

function FLabel({ icon:Icon, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      <Icon size={11} color={C.accentBright}/>
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700,
        color:C.textMuted, letterSpacing:"0.5px", textTransform:"uppercase" }}>{label}</span>
    </div>
  );
}

function ImageSlot({ index, image, status, onRemove }) {
  const loading = status==="loading";
  return (
    <div className="img-slot" style={{ flex:1, aspectRatio:"3/4", borderRadius:12, minHeight:110,
      border:`2px solid ${image?C.accent:C.border}`, background:image?"transparent":C.surface,
      position:"relative", overflow:"hidden", cursor:"pointer", transition:"border-color 0.2s" }}>
      {loading && <div style={{ position:"absolute", inset:0,
        background:`linear-gradient(90deg,${C.surface} 25%,rgba(124,58,237,0.12) 50%,${C.surface} 75%)`,
        backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" }}/>}
      {image && <img src={image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>}
      {!image && !loading && <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:4 }}>
        <div style={{ width:28, height:28, borderRadius:7, background:C.accentSoft,
          display:"flex", alignItems:"center", justifyContent:"center" }}><Plus size={13} color={C.accentBright}/></div>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:C.textDim }}>{index+1}</span>
      </div>}
      {loading && <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:6 }}>
        <Loader2 size={16} color={C.accentBright} style={{ animation:"spin 0.8s linear infinite" }}/>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:C.textMuted }}>Creando...</span>
      </div>}
      {image && <div className="img-overlay" style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)",
        display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.15s" }}>
        <button onClick={()=>onRemove(index)} style={{ width:30, height:30, borderRadius:7, border:"none",
          background:"rgba(239,68,68,0.3)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Trash2 size={12} color={C.red}/>
        </button>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// AI MODAL
// ══════════════════════════════════════════════════════════════════════════════
function AiModal({ onClose, onGenerate, brand }) {
  const [file, setFile]   = useState(null);
  const [preview, setPrev] = useState(null);
  const [desc, setDesc]   = useState("");
  const [quality, setQ]   = useState("Pro");
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState("idle");
  const [progress, setProg] = useState(0);
  const [statusMsg, setMsg] = useState("");
  const fileRef = useRef();
  const credits = 20656;
  const cost = { Standard:2000, Pro:4000, Ultra:7000 }[quality] * count;

  async function go() {
    if (!desc.trim()||phase==="generating") return;
    setPhase("generating"); setProg(0);
    const tick = setInterval(()=>setProg(p=>Math.min(p+Math.random()*14,88)),280);
    try {
      setMsg("✦ Generando imágenes...");
      const imgs = generateAdImages(desc, count);
      setMsg("✦ Redactando copys con Claude IA...");
      const copies = await generateAdCopies(desc, brand, count);
      setProg(100); clearInterval(tick);
      setPhase("done");
      setTimeout(()=>onGenerate({ imageUrls:imgs, copies, count }),500);
    } catch(e) {
      clearInterval(tick); setPhase("error");
      setMsg("Error de conexión. Verifica tu API key.");
    }
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(8,6,18,0.88)",
      backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="scale-in" style={{ width:480, borderRadius:22, background:C.card,
        border:`1px solid ${C.border}`, overflow:"hidden",
        boxShadow:"0 40px 100px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.06)" }}>
        <div style={{ padding:"18px 22px 16px", borderBottom:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10,
            background:`linear-gradient(135deg,${C.accent},${C.accentBright})`,
            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 16px ${C.accentGlow}` }}>
            <Wand2 size={15} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800, color:C.text }}>Crear con IA</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>Imágenes + copys publicitarios en segundos</div>
          </div>
          <button onClick={onClose} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer" }}><X size={16} color={C.textMuted}/></button>
        </div>
        <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
          {/* Upload */}
          <div>
            <FLabel icon={Upload} label="Producto (opcional)"/>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:7 }}>
              <div onClick={()=>fileRef.current.click()} style={{ width:60, height:60, borderRadius:10,
                border:`2px dashed ${preview?C.accent:C.border}`, background:preview?"transparent":C.surface,
                display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", flexShrink:0 }}>
                {preview ? <img src={preview} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <Plus size={18} color={C.textDim}/>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                onChange={e=>{ const f=e.target.files[0]; if(!f) return; setFile(f);
                  const r=new FileReader(); r.onload=ev=>setPrev(ev.target.result); r.readAsDataURL(f); }}/>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>
                {file?file.name:"Sube la imagen de tu producto para mayor precisión"}
              </span>
            </div>
          </div>
          {/* Description */}
          <div>
            <FLabel icon={ImageIcon} label="Describe tu imagen"/>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3}
              placeholder="Ej: Gorra premium para hombre, estilo urbano, colores oscuros..."
              style={{ width:"100%", borderRadius:10, background:C.surface,
                border:`1px solid ${desc?C.borderHover:C.border}`, color:C.text, fontSize:13,
                padding:"10px 13px", resize:"none", lineHeight:1.5, marginTop:7 }}/>
          </div>
          {/* Quality + Count */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <FLabel icon={Sparkles} label="Calidad"/>
              <div style={{ display:"flex", gap:5, marginTop:7 }}>
                {["Standard","Pro","Ultra"].map(q => <button key={q} onClick={()=>setQ(q)}
                  style={{ flex:1, padding:"6px 0", borderRadius:7, cursor:"pointer",
                    fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:600,
                    border:`1px solid ${quality===q?C.accent:C.border}`,
                    background:quality===q?C.accentSoft:C.surface,
                    color:quality===q?C.accentBright:C.textMuted }}>{q}</button>)}
              </div>
            </div>
            <div>
              <FLabel icon={ImageIcon} label="Cantidad"/>
              <div style={{ display:"flex", gap:5, marginTop:7 }}>
                {[1,3,5].map(n => <button key={n} onClick={()=>setCount(n)}
                  style={{ flex:1, padding:"6px 0", borderRadius:7, cursor:"pointer",
                    fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700,
                    border:`1px solid ${count===n?C.accent:C.border}`,
                    background:count===n?C.accentSoft:C.surface,
                    color:count===n?C.accentBright:C.textMuted }}>{n}</button>)}
              </div>
            </div>
          </div>
          {/* Credits */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"8px 12px", borderRadius:8, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <Sparkles size={12} color={C.green}/>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>Créditos</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.green, fontWeight:700 }}>{credits.toLocaleString()}</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.red, fontWeight:600 }}>-{cost.toLocaleString()}</span>
            </div>
          </div>
          {/* Progress */}
          {phase==="generating" && (
            <div>
              <div style={{ height:4, borderRadius:2, background:C.surface, overflow:"hidden", marginBottom:6 }}>
                <div style={{ height:"100%", borderRadius:2, width:`${Math.min(progress,100)}%`,
                  background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, transition:"width 0.25s ease" }}/>
              </div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.accentBright, textAlign:"center" }}>{statusMsg}</div>
            </div>
          )}
          {phase==="error" && <div style={{ padding:"8px 12px", borderRadius:8, background:"rgba(248,113,113,0.1)",
            border:"1px solid rgba(248,113,113,0.3)", fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:11, color:C.red, display:"flex", alignItems:"center", gap:6 }}>
            <AlertCircle size={12}/>{statusMsg}
          </div>}
          <button onClick={go} disabled={!desc.trim()||phase==="generating"}
            style={{ padding:"12px 0", borderRadius:11, border:"none",
              background:desc.trim()&&phase!=="generating"?`linear-gradient(90deg,${C.accent},${C.accentBright})`:"rgba(255,255,255,0.06)",
              color:desc.trim()&&phase!=="generating"?"#fff":C.textDim,
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
              cursor:desc.trim()&&phase!=="generating"?"pointer":"not-allowed",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              boxShadow:desc.trim()&&phase!=="generating"?`0 6px 20px ${C.accentGlow}`:"none" }}>
            {phase==="generating"
              ? <><Loader2 size={14} style={{ animation:"spin 0.8s linear infinite" }}/> Generando...</>
              : phase==="done" ? <><Check size={14}/> ¡Listo!</>
              : <><Wand2 size={14}/> Generar {count} creativos</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ACTIVE CAMPAIGNS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ActiveCampaignsView({ campaignData, notify, setNav }) {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [selected, setSelected]  = useState(null);
  const [platform, setPlatform]  = useState("facebook");
  const [filter, setFilter]      = useState("ALL");

  const filtered = filter==="ALL" ? campaigns : campaigns.filter(c=>c.status===filter);

  if (selected) {
    return <CampaignDetail campaign={selected} onBack={()=>setSelected(null)}
      onToggle={(id,status)=>{ setCampaigns(cs=>cs.map(c=>c.id===id?{...c,status}:c));
        setSelected(s=>({...s,status})); notify(status==="ACTIVE"?"Campaña activada ✦":"Campaña pausada","warning"); }}
      platform={platform} setPlatform={setPlatform} campaignData={campaignData} notify={notify}/>;
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:26 }}>
        <div>
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px", marginBottom:4 }}>Campañas Lanzadas</h1>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>Monitorea y gestiona todas tus campañas en tiempo real.</p>
        </div>
        <button onClick={()=>setNav("pauta")} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 20px",
          borderRadius:11, border:"none", background:`linear-gradient(90deg,${C.accent},${C.accentBright})`,
          color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
          cursor:"pointer", boxShadow:`0 6px 20px ${C.accentGlow}` }}>
          <Plus size={14}/> Nueva campaña
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:18 }}>
        {[{k:"ALL",l:"Todas"},{k:"ACTIVE",l:"Activas"},{k:"PAUSED",l:"Pausadas"},{k:"DRAFT",l:"Borradores"}].map(f => (
          <button key={f.k} onClick={()=>setFilter(f.k)}
            style={{ padding:"6px 16px", borderRadius:8, cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600,
              border:`1px solid ${filter===f.k?C.accent:C.border}`,
              background:filter===f.k?C.accentSoft:C.surface,
              color:filter===f.k?C.accentBright:C.textMuted }}>
            {f.l}
            <span style={{ marginLeft:6, background:filter===f.k?C.accent:C.surface,
              color:filter===f.k?"#fff":C.textDim, fontSize:9, fontWeight:700,
              padding:"1px 6px", borderRadius:10 }}>
              {f.k==="ALL"?campaigns.length:campaigns.filter(c=>c.status===f.k).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.map((c,i) => (
          <div key={c.id} onClick={()=>setSelected(c)} className="card-hover"
            style={{ borderRadius:16, background:C.card, border:`1px solid ${C.border}`,
              padding:"18px 20px", cursor:"pointer", transition:"all 0.2s",
              animation:`fadeUp 0.3s ${i*0.05}s ease both` }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:40, height:40, borderRadius:11, flexShrink:0,
                background:c.platform==="META"?"rgba(96,165,250,0.15)":"rgba(244,114,182,0.15)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                {c.platform==="META" ? <Facebook size={18} color={C.blue}/> : <ZapIcon size={18} color={C.pink}/>}
              </div>
              <div style={{ flex:1, overflow:"hidden" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
                  color:C.text, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <StatusBadge status={c.status}/>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textDim }}>
                    ${c.budget}/día · Inicio: {c.startDate}
                  </span>
                </div>
              </div>
              {c.status!=="DRAFT" && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, flexShrink:0 }}>
                  {[
                    { l:"Gasto",  v:c.spent>0?`$${c.spent}`:"—", c:C.text },
                    { l:"Impr.",  v:c.impressions>0?c.impressions.toLocaleString():"—", c:C.blue },
                    { l:"CTR",    v:c.ctr>0?`${c.ctr}%`:"—", c:C.amber },
                    { l:"ROAS",   v:c.roas>0?`${c.roas}x`:"—", c:c.roas>=3?C.green:c.roas>=2?C.amber:C.red },
                  ].map(m => (
                    <div key={m.l} style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800, color:m.c, letterSpacing:"-0.3px" }}>{m.v}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:C.textDim, marginTop:2 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              )}
              <ChevronRight size={16} color={C.textDim}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignDetail({ campaign, onBack, onToggle, platform, setPlatform, campaignData, notify }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isActive = campaign.status==="ACTIVE";
  const creatives = campaignData?.creatives?.length>0 ? campaignData.creatives : [
    { id:"1",headline:"¿Tu pasión aún no brilla online?",body:"¡Impacto K te la digitaliza! ✦ Estrategia real que convierte. 🚀",cta:"¡Tu Marca Digital Hoy!",sub:"Envío gratis ¡Activa!",imageUrl:null },
    { id:"2",headline:"Tu negocio merece crecer 🌟",body:"500+ marcas ya escalan con nosotros. ¿Y tú cuándo?",cta:"Ver resultados",sub:"Sin compromiso, gratis",imageUrl:null },
    { id:"3",headline:"De invisible a irresistible ✦",body:"Publicidad que vende mientras duermes. Actívala hoy.",cta:"Quiero crecer",sub:"1er mes especial",imageUrl:null },
    { id:"4",headline:"Transforma tu marca ahora",body:"IA + estrategia real. Impacto K es tu equipo digital.",cta:"Activar campaña",sub:"Oferta limitada",imageUrl:null },
    { id:"5",headline:"Vende más, trabaja menos 💡",body:"Automatiza tu publicidad en Meta y TikTok con IA.",cta:"Empezar gratis",sub:"Resultados en 7 días",imageUrl:null },
  ];

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <button className="btn-ghost" onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6,
        background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
        padding:"6px 12px", cursor:"pointer", marginBottom:22, transition:"all 0.15s" }}>
        <ChevronLeft size={13} color={C.textMuted}/>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>Campañas</span>
      </button>

      {/* Hero */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, gap:16 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
          <div style={{ width:46, height:46, borderRadius:13, flexShrink:0,
            background:`linear-gradient(135deg,${C.accent},${C.accentBright})`,
            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 20px ${C.accentGlow}` }}>
            <Target size={20} color="#fff"/>
          </div>
          <div>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:17, fontWeight:900,
              color:C.text, letterSpacing:"-0.3px", lineHeight:1.2, marginBottom:8 }}>{campaign.name}</h1>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <StatusBadge status={campaign.status}/>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:5,
                background:C.surface, border:`1px solid ${C.border}` }}>
                <Facebook size={10} color={C.blue}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:600, color:C.textMuted }}>Meta</span>
              </div>
            </div>
          </div>
        </div>
        {/* Gradient border button */}
        <div style={{ position:"relative", flexShrink:0 }}>
          <div style={{ position:"absolute", inset:-1.5, borderRadius:12,
            background:isActive?`linear-gradient(135deg,rgba(248,113,113,0.7),rgba(239,68,68,0.4))`:`linear-gradient(135deg,${C.accent},${C.accentBright})`,
            zIndex:0 }}/>
          <button onClick={()=>isActive?onToggle(campaign.id,"PAUSED"):setShowConfirm(true)}
            style={{ position:"relative", zIndex:1, padding:"9px 20px", borderRadius:11, border:"none",
              background:C.cardDeep, color:isActive?C.red:C.accentBright,
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", gap:6 }}>
            {isActive ? <><Pause size={13}/> Pausar</> : <><Play size={13}/> ▶ Activar</>}
          </button>
        </div>
      </div>

      {/* Metrics */}
      <SectionCard title="Métricas de campaña" icon={BarChart2}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, borderRadius:10,
          border:`1px solid ${C.border}`, overflow:"hidden" }}>
          {[
            { l:"Presupuesto/día", v:`$${campaign.budget} USD`, icon:DollarSign, c:C.green },
            { l:"Objetivo", v:"Outcome Sales", icon:TrendingUp, c:C.accentBright },
            { l:"Ubicación", v:campaignData?.location||"Cancún, QR", icon:MapPin, c:C.amber },
            { l:"Inicio", v:campaign.startDate, icon:Calendar, c:C.blue },
          ].map((m,i) => (
            <div key={i} style={{ padding:"14px 16px", borderRight:i<3?`1px solid ${C.border}`:"none",
              background:C.cardDeep, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-10, right:-10, width:44, height:44,
                borderRadius:"50%", background:`radial-gradient(circle,${m.c}18 0%,transparent 70%)` }}/>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:7 }}>
                <m.icon size={10} color={m.c}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.5px" }}>{m.l}</span>
              </div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:800, color:C.text }}>{m.v}</div>
            </div>
          ))}
        </div>
        {campaign.status==="ACTIVE" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginTop:12 }}>
            {[{ l:"Gasto total",v:`$${campaign.spent}`,c:C.green },{l:"Impresiones",v:campaign.impressions.toLocaleString(),c:C.blue},{l:"CTR",v:`${campaign.ctr}%`,c:C.amber},{l:"ROAS",v:`${campaign.roas}x`,c:campaign.roas>=3?C.green:C.amber}].map(m => (
              <div key={m.l} style={{ padding:"12px", borderRadius:10, background:C.surface,
                border:`1px solid ${C.border}`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:900, color:m.c, letterSpacing:"-0.5px" }}>{m.v}</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted, marginTop:3 }}>{m.l}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Ad Sets */}
      <SectionCard title="Ad Sets" badge="1" icon={Layers}>
        <div style={{ display:"flex", alignItems:"center", padding:"14px 16px", borderRadius:10,
          background:C.cardDeep, border:`1px solid ${C.border}` }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, color:C.text, marginBottom:3 }}>
              {campaign.name} - AdSet:1
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["CONVERSATIONS","IMPRESSIONS"].map(t => (
                <span key={t} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.8px", color:C.textDim }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:6,
            background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, animation:"pulse 1.8s infinite" }}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, fontWeight:800, color:C.green, letterSpacing:"0.8px" }}>ACTIVE</span>
          </div>
        </div>
      </SectionCard>

      {/* Creativos */}
      <SectionCard title="Creativos" badge={String(creatives.length)} icon={Sparkles}
        action={<div style={{ display:"flex", gap:6 }}>
          {[{k:"facebook",l:"Facebook",I:Facebook,c:C.blue},{k:"instagram",l:"Instagram",I:Instagram,c:C.pink}].map(p => (
            <button key={p.k} className="platform-tab" onClick={()=>setPlatform(p.k)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:7,
                cursor:"pointer", transition:"all 0.15s", border:`1px solid ${platform===p.k?p.c+"55":C.border}`,
                background:platform===p.k?`${p.c}18`:C.surface,
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11,
                fontWeight:platform===p.k?700:500, color:platform===p.k?p.c:C.textMuted }}>
              <p.I size={11} color={platform===p.k?p.c:C.textMuted}/>{p.l}
            </button>
          ))}
        </div>}>
        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:8 }}>
          {creatives.map((ad,i) => <CreativeCard key={ad.id} ad={ad} index={i} platform={platform}/>)}
        </div>
      </SectionCard>

      {/* Confirm modal */}
      {showConfirm && (
        <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(8,6,18,0.85)",
          backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={e=>{if(e.target===e.currentTarget)setShowConfirm(false);}}>
          <div className="scale-in" style={{ width:380, borderRadius:18, background:C.card,
            border:`1px solid ${C.border}`, overflow:"hidden" }}>
            <div style={{ padding:"20px 22px 16px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:9,
                background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Play size={15} color={C.green}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800, color:C.text }}>Activar campaña</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>Se iniciará la publicación en Meta</div>
              </div>
              <button onClick={()=>setShowConfirm(false)} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer" }}><X size={15} color={C.textMuted}/></button>
            </div>
            <div style={{ padding:"16px 22px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:9,
                background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", marginBottom:16 }}>
                <AlertCircle size={13} color={C.amber} style={{ flexShrink:0, marginTop:1 }}/>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted, lineHeight:1.6 }}>
                  Se deducirá <strong style={{ color:C.text }}>${campaign.budget} USD/día</strong> de tu cuenta Meta.
                </p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setShowConfirm(false)} style={{ flex:1, padding:"9px 0", borderRadius:8,
                  background:C.surface, border:`1px solid ${C.border}`, color:C.textMuted,
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
                <button onClick={()=>{ onToggle(campaign.id,"ACTIVE"); setShowConfirm(false); }}
                  style={{ flex:1, padding:"9px 0", borderRadius:8, border:"none",
                    background:`linear-gradient(90deg,${C.green},#34D399)`, color:"#fff",
                    fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                  <Play size={12}/> Activar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreativeCard({ ad, index, platform }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const imgs = ["cap1","cap2","fashion3","urban4","street5"];
  return (
    <div className="creative-card" style={{ width:210, flexShrink:0, borderRadius:14,
      background:C.card, border:`1px solid ${C.border}`, overflow:"hidden",
      transition:"all 0.2s", animation:`fadeUp 0.3s ${index*0.06}s ease both` }}>
      <div style={{ padding:"9px 11px 7px", display:"flex", alignItems:"center", gap:7, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#0066FF,#EC4899)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff",
          border:"1.5px solid rgba(0,195,255,0.4)", flexShrink:0 }}>IK</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700, color:C.text }}>Impacto K</div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, color:C.textMuted }}>Publicidad · Público</div>
        </div>
        <MoreHorizontal size={12} color={C.textDim}/>
      </div>
      <div style={{ padding:"8px 11px 6px" }}>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted, lineHeight:1.5,
          display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          🚀 <strong style={{ color:C.text }}>{ad.headline}</strong> {ad.body}
        </p>
      </div>
      <div style={{ height:130, overflow:"hidden", position:"relative" }}>
        <img src={ad.imageUrl||`https://picsum.photos/seed/${imgs[index%5]}/280/200`} alt=""
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.85 }}
          onError={e=>e.target.style.display="none"}/>
        <div style={{ position:"absolute", top:6, right:6, background:"rgba(0,0,0,0.55)", borderRadius:4,
          padding:"2px 5px", display:"flex", alignItems:"center", gap:3 }}>
          {platform==="facebook" ? <Facebook size={8} color={C.blue}/> : <Instagram size={8} color={C.pink}/>}
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:7, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Sponsored</span>
        </div>
      </div>
      <div style={{ padding:"7px 11px", borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:800, color:C.text }}>{ad.cta}</div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, color:C.textMuted }}>{ad.sub}</div>
        </div>
        <button style={{ padding:"4px 8px", borderRadius:5, border:"none",
          background:`linear-gradient(90deg,${C.accent},${C.accentBright})`, color:"#fff",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, fontWeight:700, cursor:"pointer" }}>Activar</button>
      </div>
      <div style={{ padding:"5px 11px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:`1px solid ${C.border}` }}>
        {[{I:Heart,a:liked,c:C.red,fn:()=>setLiked(!liked),l:"Me gusta"},
          {I:MessageCircle,a:false,c:C.accentBright,fn:()=>{},l:"Comentar"},
          {I:Share2,a:false,c:C.green,fn:()=>{},l:"Compartir"},
          {I:Bookmark,a:saved,c:C.amber,fn:()=>setSaved(!saved),l:"Guardar"}].map(({I,a,c,fn,l}) => (
          <button key={l} onClick={fn} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:1, background:"none", border:"none", cursor:"pointer" }}>
            <I size={11} color={a?c:C.textDim} fill={a?c:"none"} style={{ transition:"all 0.15s", transform:a?"scale(1.2)":"scale(1)" }}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:7, color:a?c:C.textDim }}>{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// BILLING VIEW
// ══════════════════════════════════════════════════════════════════════════════
function BillingView({ plan, notify }) {
  const [currentPlan, setCurrentPlan] = useState("growth");
  const [billing, setBilling] = useState("monthly");

  async function upgrade(planId) {
    if (planId===currentPlan) return;
    notify(`Cambiando a plan ${planId}...`, "warning");
    await new Promise(r=>setTimeout(r,1200));
    setCurrentPlan(planId);
    notify(`Plan actualizado a ${PLANS.find(p=>p.id===planId)?.name} ✦`);
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px", marginBottom:6 }}>Billing & Planes</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>Gestiona tu suscripción y métodos de pago.</p>
      </div>

      {/* Current plan card */}
      <div style={{ padding:"22px", borderRadius:16, marginBottom:22,
        background:`linear-gradient(135deg,rgba(0,102,255,0.18),rgba(168,85,247,0.1))`,
        border:`1px solid rgba(0,195,255,0.35)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%",
          background:`radial-gradient(circle,rgba(168,85,247,0.2),transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <Star size={14} color={C.accentBright} fill={C.accentBright}/>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700,
                color:C.accentBright, textTransform:"uppercase", letterSpacing:"0.8px" }}>Plan Actual</span>
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:28, fontWeight:900,
              color:C.text, letterSpacing:"-0.8px", marginBottom:4 }}>
              {PLANS.find(p=>p.id===currentPlan)?.name}
              <span style={{ fontSize:16, color:C.textMuted, fontWeight:400, marginLeft:4 }}>
                ${PLANS.find(p=>p.id===currentPlan)?.price}/mes
              </span>
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>
              Próxima factura: 13 de junio 2026 · {plan.creditsLeft.toLocaleString()} créditos restantes
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted, marginBottom:8 }}>Uso de créditos este mes</div>
            <div style={{ width:160, height:6, borderRadius:3, background:"rgba(255,255,255,0.08)" }}>
              <div style={{ height:"100%", borderRadius:3,
                width:`${((plan.creditsTotal-plan.creditsLeft)/plan.creditsTotal)*100}%`,
                background:`linear-gradient(90deg,${C.accent},${C.accentBright})` }}/>
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted, marginTop:4 }}>
              {(plan.creditsTotal-plan.creditsLeft).toLocaleString()} / {plan.creditsTotal.toLocaleString()} usados
            </div>
          </div>
        </div>
      </div>

      {/* Toggle monthly/annual */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:22 }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:billing==="monthly"?C.text:C.textMuted, fontWeight:billing==="monthly"?600:400 }}>Mensual</span>
        <div onClick={()=>setBilling(b=>b==="monthly"?"annual":"monthly")}
          style={{ width:44, height:24, borderRadius:12, background:billing==="annual"?C.accent:C.surface,
            border:`1px solid ${C.border}`, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
          <div style={{ position:"absolute", top:3, left:billing==="annual"?20:3, width:18, height:18,
            borderRadius:"50%", background:billing==="annual"?C.accentBright:"#fff",
            transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}/>
        </div>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:billing==="annual"?C.text:C.textMuted, fontWeight:billing==="annual"?600:400 }}>
          Anual <span style={{ color:C.green, fontSize:11, fontWeight:700 }}>-20%</span>
        </span>
      </div>

      {/* Plans grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {PLANS.map(p => (
          <div key={p.id} className="pricing-card" style={{ borderRadius:18, overflow:"hidden",
            background:p.id===currentPlan?`linear-gradient(135deg,rgba(0,102,255,0.14),rgba(168,85,247,0.08))`:C.card,
            border:`2px solid ${p.id===currentPlan?C.accent:C.border}`,
            transition:"all 0.25s", position:"relative",
            boxShadow:p.id===currentPlan?`0 0 30px ${C.accentGlow}`:"none" }}>
            {p.popular && <div style={{ background:`linear-gradient(90deg,${C.accent},${C.accentBright})`,
              textAlign:"center", padding:"5px", fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontSize:9, fontWeight:800, color:"#fff", letterSpacing:"1px", textTransform:"uppercase" }}>✦ MÁS POPULAR</div>}
            <div style={{ padding:"22px 20px" }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700,
                color:p.color, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:4 }}>{p.name}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:16 }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:34, fontWeight:900,
                  color:C.text, letterSpacing:"-1.5px" }}>${billing==="annual"?Math.round(p.price*0.8):p.price}</span>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, color:C.textMuted }}>/mes</span>
              </div>
              <button onClick={()=>upgrade(p.id)} style={{ width:"100%", padding:"9px 0", borderRadius:9, border:"none", marginBottom:16,
                background: p.id===currentPlan ? "rgba(255,255,255,0.06)" : p.popular?`linear-gradient(90deg,${C.accent},${C.accentBright})`:C.surface,
                border: p.id!==currentPlan&&!p.popular?`1px solid ${C.border}`:"none",
                color: p.id===currentPlan?C.textMuted:p.popular?"#fff":C.text,
                fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, cursor:p.id===currentPlan?"default":"pointer",
                boxShadow:p.popular&&p.id!==currentPlan?`0 4px 16px ${C.accentGlow}`:"none" }}>
                {p.id===currentPlan ? "✓ Plan actual" : `Cambiar a ${p.name}`}
              </button>
              {p.features.slice(0,4).map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
                  <CheckCircle size={11} color={p.id===currentPlan?C.accentBright:C.green}/>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <SectionCard title="Método de pago" icon={CreditCard}>
        <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", borderRadius:12,
          background:C.cardDeep, border:`1px solid ${C.border}` }}>
          <div style={{ width:44, height:30, borderRadius:6, background:`linear-gradient(135deg,#1a1f71,#0066b2)`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, fontWeight:900, color:"#fff", letterSpacing:"0.5px" }}>VISA</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:600, color:C.text }}>•••• •••• •••• 4242</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>Expira 12/28</div>
          </div>
          <span style={{ padding:"3px 9px", borderRadius:5, background:"rgba(16,185,129,0.12)",
            border:"1px solid rgba(16,185,129,0.3)", fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:10, fontWeight:700, color:C.green }}>Predeterminada</span>
          <button style={{ padding:"6px 12px", borderRadius:7, border:`1px solid ${C.border}`,
            background:C.surface, color:C.textMuted, cursor:"pointer",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600 }}>Cambiar</button>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function SettingsView({ user, notify }) {
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  async function save() {
    await new Promise(r=>setTimeout(r,800));
    setSaved(true); notify("Configuración guardada ✦");
    setTimeout(()=>setSaved(false),2000);
  }

  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px", marginBottom:6 }}>Configuración</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>Administra tu cuenta y preferencias.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <SectionCard title="Perfil" icon={Users}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[{l:"Nombre completo",k:"name"},{l:"Empresa",k:"company"},{l:"Email",k:"email",type:"email"}].map(f => (
              <div key={f.k}>
                <label style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, fontWeight:700,
                  color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.5px", display:"block", marginBottom:6 }}>{f.l}</label>
                <input value={form[f.k]||""} onChange={e=>setForm({...form,[f.k]:e.target.value})} type={f.type||"text"}
                  style={{ width:"100%", padding:"9px 12px", borderRadius:9, background:C.surface,
                    border:`1px solid ${C.border}`, color:C.text, fontSize:13 }}/>
              </div>
            ))}
            <button onClick={save} style={{ padding:"10px 0", borderRadius:10, border:"none",
              background:saved?`linear-gradient(90deg,${C.green},#34D399)`:`linear-gradient(90deg,${C.accent},${C.accentBright})`,
              color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:700,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              transition:"all 0.3s" }}>
              {saved ? <><Check size={14}/> Guardado</> : "Guardar cambios"}
            </button>
          </div>
        </SectionCard>
        <SectionCard title="Notificaciones" icon={Bell}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { l:"Alertas de campaña", d:"Cuando una campaña se pausa o falla", on:true },
              { l:"Reportes semanales", d:"Resumen de métricas cada lunes", on:true },
              { l:"Créditos bajos", d:"Cuando queden menos de 1,000 créditos", on:true },
              { l:"Novedades del producto", d:"Nuevas funciones y mejoras", on:false },
            ].map(n => (
              <div key={n.l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"12px 14px", borderRadius:10, background:C.cardDeep, border:`1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600, color:C.text }}>{n.l}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted }}>{n.d}</div>
                </div>
                <div style={{ width:36, height:20, borderRadius:10, background:n.on?C.accent:C.surface,
                  border:`1px solid ${C.border}`, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                  <div style={{ position:"absolute", top:2, left:n.on?16:2, width:16, height:16, borderRadius:"50%",
                    background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }}/>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS PANEL
// ══════════════════════════════════════════════════════════════════════════════
function NotifPanel({ onClose }) {
  const items = [
    { icon:CheckCircle, color:C.green,  title:"Campaña activada",        desc:"VENTAS Instagram está publicando ahora",         time:"Hace 2 min" },
    { icon:AlertCircle, color:C.amber,  title:"Créditos bajos",           desc:"Te quedan 3,344 créditos. Considera recargar.",  time:"Hace 1 hora" },
    { icon:TrendingUp,  color:C.blue,   title:"ROAS mejorado",            desc:"Tu ROAS subió a 4.2x esta semana",               time:"Hace 3 horas" },
    { icon:Rocket,      color:C.accentBright, title:"Nueva función",      desc:"ADN de marca con IA ya disponible",              time:"Ayer" },
    { icon:XCircle,     color:C.red,    title:"Token expirado",           desc:"Reconecta tu cuenta de TikTok Ads",             time:"Hace 2 días" },
  ];
  return (
    <div className="scale-in" style={{ position:"fixed", top:60, right:20, zIndex:200, width:340,
      borderRadius:18, background:C.card, border:`1px solid ${C.border}`,
      boxShadow:"0 20px 60px rgba(0,0,0,0.5)", overflow:"hidden" }}>
      <div style={{ padding:"16px 18px 12px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800, color:C.text }}>Notificaciones</span>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={15} color={C.textMuted}/></button>
      </div>
      {items.map((n,i) => (
        <div key={i} className="notif-item" style={{ display:"flex", alignItems:"flex-start", gap:10,
          padding:"12px 18px", borderBottom:i<items.length-1?`1px solid ${C.border}`:"none",
          cursor:"pointer", transition:"background 0.12s" }}>
          <div style={{ width:30, height:30, borderRadius:8, background:`${n.color}18`,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
            <n.icon size={13} color={n.color}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:700, color:C.text, marginBottom:2 }}>{n.title}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted, lineHeight:1.4 }}>{n.desc}</div>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, color:C.textDim, flexShrink:0, marginTop:2 }}>{n.time}</span>
        </div>
      ))}
      <div style={{ padding:"10px", borderTop:`1px solid ${C.border}` }}>
        <button style={{ width:"100%", padding:"8px 0", borderRadius:9, border:`1px solid ${C.border}`,
          background:C.surface, color:C.textMuted, cursor:"pointer",
          fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600 }}>
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ANALYTICS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function AnalyticsView() {
  const bars = [42,67,38,88,55,71,90,48,63,79,44,95];
  const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return (
    <div className="fade-up" style={{ padding:"28px 32px" }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 12px",
          borderRadius:20, background:C.accentSoft, border:`1px solid rgba(0,102,255,0.25)`, marginBottom:12 }}>
          <Sparkles size={11} color={C.accentBright}/>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700, color:C.accentBright }}>NEW — Analytics Pro</span>
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:900, color:C.text, letterSpacing:"-0.4px", marginBottom:6 }}>Analytics Avanzados</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, color:C.textMuted }}>Métricas unificadas de todas tus plataformas en tiempo real.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18, marginBottom:18 }}>
        {/* Spend chart */}
        <SectionCard title="Gasto mensual (2026)" icon={BarChart2}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:140, paddingTop:10 }}>
            {bars.map((h,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", borderRadius:"4px 4px 0 0", transition:"height 0.3s ease",
                  height:`${(h/100)*120}px`,
                  background:i===4?`linear-gradient(180deg,${C.accentBright},${C.accent})`:`rgba(0,102,255,0.25)`,
                  boxShadow:i===4?`0 -4px 16px ${C.accentGlow}`:"none" }}/>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:8, color:C.textDim }}>{labels[i]}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Platform breakdown */}
        <SectionCard title="Por plataforma" icon={Activity}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { name:"Meta Ads",   pct:62, color:C.blue,  spend:"$18.4", roas:"4.2x" },
              { name:"TikTok Ads", pct:38, color:C.pink,  spend:"$11.3", roas:"3.5x" },
            ].map(p => (
              <div key={p.name}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:600, color:C.text }}>{p.name}</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.textMuted }}>{p.spend}</span>
                </div>
                <div style={{ height:6, borderRadius:3, background:C.surface, overflow:"hidden", marginBottom:4 }}>
                  <div style={{ height:"100%", borderRadius:3, width:`${p.pct}%`, background:p.color, transition:"width 0.5s ease" }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textDim }}>{p.pct}% del gasto</span>
                  <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.green, fontWeight:700 }}>ROAS {p.roas}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Top campaigns table */}
      <SectionCard title="Rendimiento por campaña" icon={Target}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                {["Campaña","Plataforma","Gasto","Impresiones","Clics","CTR","Conversiones","ROAS"].map(h => (
                  <th key={h} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:9, fontWeight:700,
                    color:C.textDim, textTransform:"uppercase", letterSpacing:"0.8px",
                    padding:"8px 14px", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CAMPAIGNS.filter(c=>c.status==="ACTIVE").map((c,i) => (
                <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}`, animation:`fadeUp 0.3s ${i*0.04}s ease both` }}>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:600, color:C.text, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</td>
                  <td style={{ padding:"10px 14px" }}><div style={{ display:"flex", alignItems:"center", gap:4 }}>
                    {c.platform==="META"?<Facebook size={11} color={C.blue}/>:<ZapIcon size={11} color={C.pink}/>}
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:10, color:C.textMuted }}>{c.platform}</span>
                  </div></td>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.text }}>${c.spent}</td>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.text }}>{c.impressions.toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.text }}>{c.clicks.toLocaleString()}</td>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.amber, fontWeight:700 }}>{c.ctr}%</td>
                  <td style={{ padding:"10px 14px", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, color:C.text }}>{c.conversions}</td>
                  <td style={{ padding:"10px 14px" }}><span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:12, fontWeight:800, color:c.roas>=3?C.green:C.amber }}>{c.roas}x</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP — State Machine
// ══════════════════════════════════════════════════════════════════════════════
export default function FlowIa() {
  const [screen, setScreen]       = useState("landing");  // landing|login|signup|app
  const [nav, setNav]             = useState("dashboard");
  const [user, setUser]           = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [campaignData, setCampaignData] = useState({});
  const { notifs, add: notify }   = useNotifications();

  const plan = {
    name:"Growth", creditsLeft:17344, creditsTotal:20000
  };

  function handleAuth(userData) {
    setUser(userData);
    setScreen("app");
    notify(`¡Bienvenido a Flow.ia, ${userData.name.split(" ")[0]}! 🚀`);
  }

  function handleLaunch(data) {
    setCampaignData({
      budget:   data.budget,
      location: data.location,
      creatives: (data.copies||[]).map((c,i)=>({ ...c, id:String(i+1), imageUrl:data.images[i]||null })),
    });
    setNav("lanzadas");
    notify("Campaña creada y lista para activar ✦");
  }

  const crumbMap = {
    dashboard:    ["Dashboard"],
    analytics:    ["Dashboard","Analytics"],
    adn:          ["Dashboard","Centro de Marca","ADN de Marca"],
    "config-brand": ["Dashboard","Centro de Marca","Configuración"],
    connections:  ["Dashboard","Centro de Marca","Conexiones"],
    pauta:        ["Dashboard","Campañas","Nueva Estrategia"],
    lanzadas:     ["Dashboard","Campañas","Activas"],
    billing:      ["Dashboard","Cuenta","Billing"],
    settings:     ["Dashboard","Cuenta","Configuración"],
  };

  if (screen==="landing") return (
    <>
      <GS/>
      <LandingPage onLogin={()=>setScreen("login")} onSignup={()=>setScreen("signup")}/>
    </>
  );

  if (screen==="login"||screen==="signup") return (
    <>
      <GS/>
      <AuthScreen mode={screen} onAuth={handleAuth} onSwitch={()=>setScreen(screen==="login"?"signup":"login")}/>
    </>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <GS/>
      <Sidebar nav={nav} setNav={setNav} user={user||{name:"Juan Camilo",company:"Impacto K",email:"jc@impactok.co"}} plan={plan} unread={2}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
        <Header crumbs={crumbMap[nav]||["Dashboard"]} onBell={()=>setShowNotifs(!showNotifs)}
          unread={2} onSearch={()=>{}}/>
        <div style={{ flex:1, overflowY:"auto" }}>
          {nav==="dashboard"    && <DashboardView setNav={setNav} notify={notify} user={user||{name:"Juan Camilo"}}/>}
          {nav==="analytics"    && <AnalyticsView/>}
          {nav==="adn"          && <ADNView notify={notify} user={user||{company:"Impacto K"}}/>}
          {nav==="connections"  && <ConnectionsView notify={notify}/>}
          {nav==="pauta"        && <CampaignConfigView onLaunch={handleLaunch} notify={notify} user={user||{company:"Impacto K"}}/>}
          {nav==="lanzadas"     && <ActiveCampaignsView campaignData={campaignData} notify={notify} setNav={setNav}/>}
          {nav==="billing"      && <BillingView plan={plan} notify={notify}/>}
          {nav==="settings"     && <SettingsView user={user||{name:"Juan Camilo",company:"Impacto K",email:"jc@impactok.co"}} notify={notify}/>}
          {nav==="config-brand" && <SettingsView user={user||{name:"Juan Camilo",company:"Impacto K",email:"jc@impactok.co"}} notify={notify}/>}
        </div>
        {showNotifs && <NotifPanel onClose={()=>setShowNotifs(false)}/>}
      </div>
      <NotificationStack notifs={notifs}/>
    </div>
  );
}

// Lucide MousePointerClick polyfill
function MousePointerClick({ size, color }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9C9 9 9 3 15 3"/><path d="M9.34 12.76L5 10l9-6 3 11-3.34-2.24Z"/><path d="m14 14 5 5"/></svg>;
}
