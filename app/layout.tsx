export const metadata = {
  title: "音乐动机平台",
  description: "用 Notion + R2 构建的动机分享与二创平台",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style= margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial' >
        {children}
      </body>
    </html>
  );
}
