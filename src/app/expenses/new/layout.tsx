import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "経費登録 - ダミーフォーワード",
  description: "新しい経費を登録します。日付、勘定科目、支払先、金額、説明を入力してください。",
}

export default function NewExpenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}