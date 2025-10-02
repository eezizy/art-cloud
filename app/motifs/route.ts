import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN! });
const DB = { motifs: process.env.NOTION_MOTIFS_DB! };

export async function GET() {
  const data = await notion.databases.query({
    database_id: DB.motifs,
    filter: { property: "状态", status: { equals: "已发布" } },
    sorts: [{ property: "Slug", direction: "ascending" }],
  });

  const items = data.results.map((p: any) => {
    const props = p.properties;
    return {
      id: p.id,
      title: props["Title (动机名)"]?.title?.[0]?.plain_text ?? "",
      slug: props["Slug"]?.rich_text?.[0]?.plain_text ?? "",
      audioUrl: props["音频URL"]?.url ?? "",
      bpm: props["BPM"]?.number ?? null,
      key: props["调性"]?.select?.name ?? null,
      styles: props["风格"]?.multi_select?.map((t: any) => t.name) ?? [],
      license: props["授权协议"]?.select?.name ?? "",
      dlPolicy: props["下载许可"]?.status?.name ?? "仅试听",
    };
  });

  return NextResponse.json({ items });
}
