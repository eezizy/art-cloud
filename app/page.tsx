export const runtime = "edge";

async function fetchMotifs() {
  const res = await fetch("/api/motifs", { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const { items } = await fetchMotifs();

  return (
    <main style= maxWidth: 860, margin: "40px auto", padding: "0 16px", lineHeight: 1.6 >
      <h1>音乐动机平台</h1>
      <p>已发布的动机列表（可试听）。</p>
      <ul style= listStyle: "none", padding: 0 >
        {items.map((m: any) => (
          <li key={m.id} style= padding: "16px 0", borderBottom: "1px solid #eee" >
            <h3 style= margin: "0 0 8px" >{m.title}</h3>
            <div style= color: "#555", marginBottom: 8 >
              <span>BPM: {m.bpm ?? "-"}</span> ｜ <span>调性: {m.key ?? "-"}</span> ｜ <span>风格: {m.styles?.join(", ")}</span>
            </div>
            {m.audioUrl ? (
              <audio controls src={m.audioUrl} style= width: "100%"  />
            ) : (
              <div style= color: "#999" >暂无音频链接</div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
