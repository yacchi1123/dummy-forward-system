import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '経費一覧（テストデータ） - ダミーフォーワード',
}

export default function ExpensesTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}