"use client"

import { ArrowLeft, Play, Film } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Sản Phẩm</h1>
              <p className="text-yellow-300 text-lg">Việt Nam 1945-1946: Lửa thử vàng</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Video Card */}
        <Card className="max-w-4xl mx-auto border-2 border-red-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Film className="h-7 w-7 text-yellow-400" />
              Việt Nam 1945-1946: Lửa thử vàng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-black">
              <video
                controls
                className="w-full h-full"
                poster="/images/hero/vietnam-flag.jpg"
              >
                <source src="/videos/Việt_Nam_1945-1946__Lửa_thử_vàng.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </div>
          </CardContent>
        </Card>

        

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg">
              Về Trang Chủ
            </button>
          </Link>
          <Link href="/game">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold rounded-xl transition-all hover:scale-105 shadow-lg">
              Chơi Trò Chơi
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
