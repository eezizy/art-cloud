export default async function Page() {
	const { items } = await fetchMotifs();

	return (
		<main
			style=
				maxWidth: 860,
				margin: "40px auto",
				padding: "0 16px",
				lineHeight: 1.6
			
		>
			<h1>音乐动机平台</h1>
			<p>已发布的动机列表（可试听）。</p>
			<ul style= listStyle: "none", padding: 0 >
				{items.map((it: { id: string | number; title: string }) => (
					<li key={it.id}>{it.title}</li>
				))}
			</ul>
		</main>
	);
}
