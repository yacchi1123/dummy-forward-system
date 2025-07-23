import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "経費一覧 - ダミーフォーワード",
  description: "登録済みの経費一覧を確認・管理できます。新規経費の登録も可能です。",
}

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}