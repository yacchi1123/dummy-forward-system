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

export default function NewExpensePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [payee, setPayee] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const categories = [
    '旅費交通費',
    '会議費',
    '交際費',
    '消耗品費',
    '通信費',
    '水道光熱費',
    '広告宣伝費',
    '支払手数料',
    '事務用品費',
    'その他'
  ]

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
      return
    }
    setIsLoggedIn(true)
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !category || !payee || !amount || !description) {
      alert('すべての必須項目を入力してください')
      return
    }

    try {
      const newExpense: Expense = {
        id: Date.now().toString(),
        date,
        category,
        payee,
        amount: parseFloat(amount),
        description
      }

      const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
      const updatedExpenses = [...existingExpenses, newExpense]
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

      // Use confirm instead of alert for better compatibility
      if (window.confirm('経費を登録しました。一覧画面に戻りますか？')) {
        router.push('/expenses')
      } else {
        // Reset form
        setDate(new Date().toISOString().split('T')[0])
        setCategory('')
        setPayee('')
        setAmount('')
        setDescription('')
      }
    } catch (error) {
      console.error('Error saving expense:', error)
      alert('保存中にエラーが発生しました。もう一度お試しください。')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
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
                href="/expenses" 
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                一覧に戻る
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

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">経費登録</h2>
            <p className="text-indigo-100 mt-1">必要な情報を入力してください</p>
          </div>
          
          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 日付 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    📂 勘定科目 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-300 bg-white"
                  >
                    <option value="" className="text-gray-400">選択してください</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="text-gray-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payee */}
              <div>
                <label htmlFor="payee" className="block text-sm font-semibold text-gray-700 mb-2">
                  🏢 支払先 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="payee"
                  required
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-300"
                  placeholder="支払先を入力してください（例：○○株式会社、△△商店）"
                />
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 金額 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg font-medium">¥</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    required
                    min="0"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-300"
                    placeholder="金額を入力してください"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 説明 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 hover:border-gray-300 resize-none"
                  placeholder="経費の詳細を入力してください&#10;例：クライアントとの打ち合わせ、会議資料印刷、システム利用料など"
                />
              </div>

              {/* Buttons */}
              <div className="bg-gray-50 -mx-8 -mb-8 px-8 py-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Link
                    href="/expenses"
                    className="inline-flex justify-center items-center px-6 py-3 border-2 border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    キャンセル
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-8 py-3 border-2 border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    💾 保存する
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}