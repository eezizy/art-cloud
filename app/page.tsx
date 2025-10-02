export const runtime = "edge";

async function fetchMotifs() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/motifs`, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const { items } = await fetchMotifs();

  return (
    <main style= padding: 24, maxWidth: 860, margin: "0 auto", lineHeight: 1.6 >
      <h1>音乐动机平台</h1>
      <p>已发布的动机列表（可试听）。</p>
      <ul style= listStyle: "none", padding: 0 >
        {items.map((m: any) => (
          <li key={m.id} style= border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 16 >
            <h3 style= margin: "0 0 8px" >{m.title}</h3>
            <div style= color: "#666", fontSize: 14, marginBottom: 8 >
              <span>BPM: {m.bpm ?? "-"}</span> ｜ <span>调性: {m.key ?? "-"}</span> ｜ <span>风格: {m.styles.join(", ")}</span>
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
