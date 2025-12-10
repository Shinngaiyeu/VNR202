"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Clock, ArrowLeft, RefreshCw, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { database } from "@/lib/firebase"
import { ref, get, query, orderByChild, limitToLast } from "firebase/database"

interface GameResult {
  id: string
  playerName: string
  round: number
  playTime: number
  timestamp: any
  score?: number
  defense?: number
  food?: number
  morale?: number
}

export default function FirebaseResultsPage() {
  const [results, setResults] = useState<GameResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatTime = (seconds?: number) => {
    if (!seconds) return "N/A"
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    try {
      // Firebase Realtime Database serverTimestamp() trả về số milliseconds
      const date = new Date(timestamp)
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "N/A"
    }
  }

  const loadResults = async () => {
    setLoading(true)
    setError(null)
    try {
      const gameResultsRef = ref(database, "gameResults")
      const snapshot = await get(gameResultsRef)
      
      if (snapshot.exists()) {
        const data: GameResult[] = []
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key || "",
            ...childSnapshot.val(),
          } as GameResult)
        })
        // Sắp xếp theo timestamp giảm dần (mới nhất trước)
        data.sort((a, b) => {
          const timeA = a.timestamp || 0
          const timeB = b.timestamp || 0
          return timeB - timeA
        })
        // Lấy 50 kết quả đầu
        setResults(data.slice(0, 50))
      } else {
        setResults([])
      }
    } catch (err: any) {
      console.error("Error loading from Firebase:", err)
      setError(err.message || "Không thể tải dữ liệu từ Firebase")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResults()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-blue-800">Kết Quả Firebase</h1>
          </div>
          <p className="text-lg text-gray-700">Dữ liệu game được lưu trên Firebase Realtime Database</p>
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/game">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại Game
            </Button>
          </Link>
          <Button onClick={loadResults} className="flex items-center gap-2" disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Tải lại
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-16 text-center">
              <RefreshCw className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-xl text-gray-600">Đang tải dữ liệu từ Firebase...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-red-300 bg-red-50">
            <CardContent className="py-8 text-center">
              <p className="text-red-600 font-semibold mb-2">❌ Lỗi: {error}</p>
              <p className="text-sm text-gray-600 mb-4">
                Vui lòng kiểm tra cấu hình Firebase trong file .env.local
              </p>
              <Button onClick={loadResults} variant="outline">
                Thử lại
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">Chưa có dữ liệu</p>
              <p className="text-gray-500">Hãy chơi game để tạo kết quả đầu tiên!</p>
              <Link href="/game">
                <Button className="mt-4">Bắt Đầu Chơi</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Results Table */}
        {!loading && !error && results.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Danh Sách Kết Quả ({results.length})
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {results.map((result, index) => (
                <Card key={result.id} className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Index */}
                      <div className="col-span-1 text-center">
                        <span className="text-lg font-bold text-gray-700">#{index + 1}</span>
                      </div>

                      {/* Player Name */}
                      <div className="col-span-3">
                        <p className="font-bold text-lg text-gray-800">{result.playerName}</p>
                        <p className="text-xs text-gray-500">{formatDate(result.timestamp)}</p>
                      </div>

                      {/* Round */}
                      <div className="col-span-2 text-center">
                        <p className="text-sm text-gray-600">Vòng</p>
                        <p className="text-xl font-semibold text-blue-700">{result.round}/30</p>
                      </div>

                      {/* Time */}
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-3 h-3 text-gray-600 mr-1" />
                          <p className="text-sm text-gray-600">Thời gian</p>
                        </div>
                        <p className="text-lg font-semibold text-purple-700 font-mono">
                          {formatTime(result.playTime)}
                        </p>
                      </div>

                      {/* Score */}
                      {result.score !== undefined && (
                        <div className="col-span-2 text-center">
                          <p className="text-sm text-gray-600">Điểm</p>
                          <p className="text-xl font-bold text-green-700">{result.score}</p>
                        </div>
                      )}

                      {/* Stats */}
                      {(result.defense !== undefined || result.food !== undefined || result.morale !== undefined) && (
                        <div className="col-span-2">
                          <div className="flex gap-2 justify-center">
                            {result.defense !== undefined && (
                              <div className="text-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-1"></div>
                                <p className="text-xs font-semibold text-blue-700">{result.defense}</p>
                              </div>
                            )}
                            {result.food !== undefined && (
                              <div className="text-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1"></div>
                                <p className="text-xs font-semibold text-green-700">{result.food}</p>
                              </div>
                            )}
                            {result.morale !== undefined && (
                              <div className="text-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1"></div>
                                <p className="text-xs font-semibold text-red-700">{result.morale}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="py-6">
            <h3 className="font-semibold text-lg mb-3">📊 Thông tin</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Dữ liệu được lưu tự động vào Firebase Realtime Database</li>
              <li>• Path: <code className="bg-white px-2 py-1 rounded">/gameResults</code></li>
              <li>• Hiển thị 50 kết quả gần nhất</li>
              <li>• Dữ liệu bao gồm: tên người chơi, số vòng, thời gian chơi</li>
            </ul>
          </CardContent>
        </Card>

        {/* Link to Leaderboard */}
        <div className="mt-8 text-center">
          <Link href="/game/leaderboard">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Xem Bảng Xếp Hạng (LocalStorage)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
