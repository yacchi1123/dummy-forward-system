'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Expense {
  id: string
  date: string
  category: string
  payee: string
  amount: number
  description: string
}

export default function ExpensesTestPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const dummyExpenses: Expense[] = [
    {
      id: '1721750400000',
      date: '2025-07-13',
      category: '会議費',
      payee: 'スターバックスコーヒー ゆめタウン博多店',
      amount: 628,
      description: 'ダークモカチップフラペチーノ（テイクアウト）'
    },
    {
      id: '1721836800000',
      date: '2025-07-14',
      category: '消耗品費',
      payee: 'セブン‐イレブン 博多駅前通り店',
      amount: 1280,
      description: 'コピー用紙・文房具'
    },
    {
      id: '1721836800001',
      date: '2025-07-14',
      category: '旅費交通費',
      payee: 'JR九州 博多駅',
      amount: 420,
      description: '博多→吉塚 片道乗車券'
    },
    {
      id: '1721923200000',
      date: '2025-07-15',
      category: '会議費',
      payee: '吉野家 博多駅東店',
      amount: 680,
      description: '朝食ミーティング 牛丼並'
    },
    {
      id: '1721923200001',
      date: '2025-07-15',
      category: '消耗品費',
      payee: 'ヤマダデンキ LABI福岡',
      amount: 3980,
      description: 'PC用USBハブ'
    },
    {
      id: '1722009600000',
      date: '2025-07-16',
      category: '交際費',
      payee: 'Uber Eats',
      amount: 2450,
      description: 'クライアントランチ（寿司）'
    },
    {
      id: '1722009600001',
      date: '2025-07-16',
      category: 'その他',
      payee: 'コクミンドラッグ 博多阪急店',
      amount: 950,
      description: '乾電池・ウェットティッシュ'
    },
    {
      id: '1722096000000',
      date: '2025-07-17',
      category: '事務用品費',
      payee: 'Amazon.co.jp',
      amount: 5280,
      description: 'プリンタインクカートリッジ'
    },
    {
      id: '1722096000001',
      date: '2025-07-17',
      category: 'その他',
      payee: '佐川急便',
      amount: 870,
      description: '書類発送'
    },
    {
      id: '1722182400000',
      date: '2025-07-18',
      category: '会議費',
      payee: 'コメダ珈琲店 福岡天神店',
      amount: 1100,
      description: '取引先との打合せ コーヒー'
    },
    {
      id: '1722182400001',
      date: '2025-07-18',
      category: '旅費交通費',
      payee: '福岡市地下鉄',
      amount: 260,
      description: '天神→赤坂'
    },
    {
      id: '1722268800000',
      date: '2025-07-19',
      category: 'その他',
      payee: 'Adobe Systems',
      amount: 8778,
      description: 'Creative Cloud 1か月'
    },
    {
      id: '1722268800001',
      date: '2025-07-19',
      category: 'その他',
      payee: 'ファミリーマート 福岡赤坂店',
      amount: 540,
      description: '飲料・お菓子'
    },
    {
      id: '1722355200000',
      date: '2025-07-20',
      category: 'その他',
      payee: '日本郵便 博多郵便局',
      amount: 210,
      description: '切手購入'
    },
    {
      id: '1722355200001',
      date: '2025-07-20',
      category: '会議費',
      payee: 'ルノアール 福岡博多店',
      amount: 980,
      description: 'クライアント商談'
    },
    {
      id: '1722441600000',
      date: '2025-07-21',
      category: 'その他',
      payee: 'Kinko\'s 福岡店',
      amount: 1650,
      description: '資料印刷'
    },
    {
      id: '1722441600001',
      date: '2025-07-21',
      category: '通信費',
      payee: 'Dropbox',
      amount: 1650,
      description: 'サブスクリプション月額'
    },
    {
      id: '1722528000000',
      date: '2025-07-22',
      category: '会議費',
      payee: 'タリーズコーヒー 福岡天神ビジネスセンター店',
      amount: 820,
      description: 'カフェラテ＆マフィン'
    },
    {
      id: '1722528000001',
      date: '2025-07-22',
      category: '広告宣伝費',
      payee: 'HootSuite Inc.',
      amount: 6600,
      description: 'SNS運用ツール月額'
    },
    {
      id: '1722614400000',
      date: '2025-07-23',
      category: '消耗品費',
      payee: 'LAWSON 福岡舞鶴一丁目店',
      amount: 1120,
      description: 'クリアファイル・ペン'
    },
    {
      id: '1722614400001',
      date: '2025-07-23',
      category: '会議費',
      payee: 'リンガーハット 博多駅前店',
      amount: 760,
      description: '昼食打合せ ちゃんぽん'
    },
    {
      id: '1722700800000',
      date: '2025-07-24',
      category: '通信費',
      payee: 'Google Workspace',
      amount: 1360,
      description: 'Google Workspace Business Starter'
    },
    {
      id: '1722700800001',
      date: '2025-07-24',
      category: '旅費交通費',
      payee: 'ANA',
      amount: 34580,
      description: '福岡→東京 出張航空券'
    },
    {
      id: '1722787200000',
      date: '2025-07-25',
      category: '旅費交通費',
      payee: 'ホテルメトロポリタン丸の内',
      amount: 12800,
      description: '出張宿泊費'
    },
    {
      id: '1722787200001',
      date: '2025-07-25',
      category: '支払手数料',
      payee: 'みずほ銀行 ATM手数料',
      amount: 110,
      description: 'ATM利用料'
    },
    {
      id: '1722873600000',
      date: '2025-07-26',
      category: 'その他',
      payee: '日経BP',
      amount: 1980,
      description: '業界誌定期購読'
    },
    {
      id: '1722873600001',
      date: '2025-07-26',
      category: '会議費',
      payee: 'すき家 福岡天神南店',
      amount: 1200,
      description: 'ミーティング 時短ランチ'
    },
    {
      id: '1722960000000',
      date: '2025-07-27',
      category: 'その他',
      payee: 'Plug and Play Shibuya',
      amount: 3300,
      description: 'コワーキングスペース利用'
    },
    {
      id: '1722960000001',
      date: '2025-07-27',
      category: 'その他',
      payee: 'Apple App Store',
      amount: 1200,
      description: 'Procreate 追加ブラシ'
    },
    {
      id: '1723046400000',
      date: '2025-07-28',
      category: '消耗品費',
      payee: 'ヨドバシカメラ 博多店',
      amount: 9980,
      description: '外付けSSD 1TB'
    }
  ]

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
      return
    }
    setIsLoggedIn(true)
    
    // Set dummy data
    setExpenses(dummyExpenses)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">ダミーフォーワード</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/expenses/new" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                新規登録
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">経費一覧（テストデータ）</h2>
            
            {expenses.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>経費データがありません</p>
                <Link 
                  href="/expenses/new"
                  className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  最初の経費を登録する
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        日付
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        勘定科目
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        支払先
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        金額
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        説明
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.payee}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ¥{expense.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            削除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}