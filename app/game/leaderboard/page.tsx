"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Crown, Award, ArrowLeft, Trash2, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { database } from "@/lib/firebase"
import { ref, onValue, remove } from "firebase/database"

interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  round: number
  timestamp: number
  defense: number
  food: number
  morale: number
  playTime?: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Realtime listener cho Firebase
    const gameResultsRef = ref(database, "gameResults")
    
    const unsubscribe = onValue(gameResultsRef, (snapshot) => {
      setLoading(true)
      try {
        if (snapshot.exists()) {
          const data: LeaderboardEntry[] = []
          snapshot.forEach((childSnapshot) => {
            data.push({
              id: childSnapshot.key || "",
              ...childSnapshot.val(),
            } as LeaderboardEntry)
          })
          
          // Xếp hạng theo:
          // 1. Số vòng cao hơn = thứ hạng cao hơn
          // 2. Nếu số vòng bằng nhau, thời gian ít hơn = thứ hạng cao hơn
          const sorted = data.sort((a, b) => {
            // So sánh số vòng (vòng cao hơn xếp trước)
            if (b.round !== a.round) {
              return b.round - a.round
            }
            // Nếu vòng bằng nhau, so sánh thời gian (thời gian ít hơn xếp trước)
            const timeA = a.playTime || Infinity
            const timeB = b.playTime || Infinity
            return timeA - timeB
          })
          
          setLeaderboard(sorted.slice(0, 50)) // Top 50
        } else {
          setLeaderboard([])
        }
      } catch (error) {
        console.error("Error loading leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }, (error) => {
      console.error("Firebase listener error:", error)
      setLoading(false)
    })

    // Cleanup listener khi component unmount
    return () => unsubscribe()
  }, [])

  const clearLeaderboard = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ bảng xếp hạng trên Firebase?")) {
      try {
        const gameResultsRef = ref(database, "gameResults")
        await remove(gameResultsRef)
        console.log("✅ Đã xóa toàn bộ bảng xếp hạng")
      } catch (error) {
        console.error("❌ Lỗi khi xóa:", error)
        alert("Không thể xóa bảng xếp hạng. Vui lòng kiểm tra quyền truy cập Firebase.")
      }
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-amber-700" />
      default:
        return <Trophy className="w-5 h-5 text-gray-500" />
    }
  }

  const getRankClass = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 bg-pattern-card border-yellow-300"
      case 1:
        return "bg-gradient-to-r from-gray-50 to-slate-50 bg-pattern-card border-gray-300"
      case 2:
        return "bg-gradient-to-r from-amber-50 to-orange-50 bg-pattern-card border-amber-300"
      default:
        return "bg-white bg-pattern-card border-gray-200"
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 font-bold"
    if (score >= 60) return "text-blue-600 font-semibold"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-yellow-50 to-white bg-pattern py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-red-800">Bảng Xếp Hạng</h1>
            <Trophy className="w-12 h-12 text-yellow-600 ml-3" />
          </div>
          <p className="text-lg text-gray-700">Vận Mệnh Dân Tộc - Những Nhà Lãnh Đạo Xuất Sắc</p>
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/game">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại Game
            </Button>
          </Link>
          <div className="flex gap-2">
            {loading && (
              <div className="flex items-center gap-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Đang cập nhật...</span>
              </div>
            )}
            {leaderboard.length > 0 && (
              <Button variant="destructive" onClick={clearLeaderboard} className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Xóa Bảng Xếp Hạng
              </Button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && leaderboard.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <RefreshCw className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-xl text-gray-600">Đang tải dữ liệu</p>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard */}
        {!loading && leaderboard.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">Chưa có kỷ lục nào</p>
              <p className="text-gray-500">Hãy chơi game và tạo kỷ lục đầu tiên của bạn!</p>
              <Link href="/game">
                <Button className="mt-4">Bắt Đầu Chơi</Button>
              </Link>
            </CardContent>
          </Card>
        ) : !loading && (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <Card
                key={entry.id}
                className={`border-2 transition-all hover:shadow-lg ${getRankClass(index)}`}
              >
                <CardContent className="py-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Rank */}
                    <div className="col-span-1 flex justify-center">
                      <div className="flex flex-col items-center">
                        {getRankIcon(index)}
                        <span className="text-sm font-bold text-gray-700 mt-1">#{index + 1}</span>
                      </div>
                    </div>

                    {/* Player Name */}
                    <div className="col-span-3">
                      <p className="font-bold text-lg text-gray-800 truncate">{entry.playerName}</p>
                      <p className="text-xs text-gray-500">{formatDate(entry.timestamp)}</p>
                    </div>

                    {/* Round */}
                    <div className="col-span-2 text-center">
                      <p className="text-xs text-gray-600">Vòng</p>
                      <p className="text-xl font-semibold text-gray-800">{entry.round}/30</p>
                    </div>

                    {/* Time */}
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-3 h-3 text-gray-600 mr-1" />
                        <p className="text-xs text-gray-600">Thời gian</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 font-mono">{formatTime(entry.playTime)}</p>
                    </div>

                    {/* Stats */}
                    <div className="col-span-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                            <span className="text-xs text-gray-600">Quốc Phòng</span>
                          </div>
                          <p className="font-semibold text-blue-700">{entry.defense}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-xs text-gray-600">Lương Thực</span>
                          </div>
                          <p className="font-semibold text-green-700">{entry.food}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <span className="text-xs text-gray-600">Dân Tâm</span>
                          </div>
                          <p className="font-semibold text-red-700">{entry.morale}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics Summary */}
        {!loading && leaderboard.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                Thống Kê
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600">Tổng Lượt Chơi</p>
                  <p className="text-3xl font-bold text-purple-600">{leaderboard.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vòng Xa Nhất</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {Math.max(...leaderboard.map((e) => e.round))}/30
                  </p>
                </div>
              </div>
              
            </CardContent>
          </Card>
        )}

        {/* Back to Games */}
        <div className="mt-8 text-center">
          <Link href="/game">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              Chơi Lại Để Lập Kỷ Lục Mới
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
