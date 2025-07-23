import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ログイン - ダミーフォーワード",
  description: "ダミーフォーワード経費精算システムにログインしてください。",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}