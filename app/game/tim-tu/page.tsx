"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, HelpCircle, CheckCircle, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

// TUANLEVANG: Row A, cols 0-9 (horizontal)
// NAMTIEN: Col 0, rows 2-8 (vertical)
// GIACDOT: Col 3, rows 2-8 (vertical): G-I-A-C-D-O-T
// HIENPHAP: Col 11, rows 0-7 (vertical)
// GIACDOI: Row 7, cols 4-10 (horizontal): G-I-A-C-D-O-I
// DOCLAP: Row 8, cols 4-9 (horizontal): D-O-C-L-A-P

const BOARD: string[][] = [
  // 0    1    2    3    4    5    6    7    8    9   10   11
  // 1    2    3    4    5    6    7    8    9   10   11   12 (display)
  ["T", "U", "A", "N", "L", "E", "V", "A", "N", "G", "X", "H"], // A (row 0)
  ["B", "C", "K", "M", "E", "O", "P", "T", "Z", "W", "A", "I"], // B (row 1)
  ["N", "D", "N", "G", "E", "N", "A", "K", "L", "M", "A", "E"], // C (row 2) - G for GIACDOT
  ["A", "E", "D", "I", "E", "N", "A", "H", "G", "H", "K", "N"], // D (row 3) - I for GIACDOT
  ["M", "T", "N", "A", "M", "N", "B", "V", "C", "C", "X", "P"], // E (row 4) - A for GIACDOT
  ["T", "S", "D", "C", "F", "T", "P", "O", "Q", "U", "D", "H"], // F (row 5) - C for GIACDOT
  ["I", "Y", "R", "D", "H", "G", "T", "H", "R", "F", "D", "A"], // G (row 6) - D for GIACDOT
  ["E", "T", "B", "O", "G", "I", "A", "C", "D", "O", "I", "P"], // H (row 7) - O for GIACDOT, GIACDOI horizontal
  ["N", "C", "D", "T", "D", "O", "C", "L", "A", "P", "V", "S"], // I (row 8) - T for GIACDOT, DOCLAP horizontal
  ["C", "X", "Z", "Y", "K", "J", "H", "G", "F", "D", "K", "U"], // J (row 9)
]

interface WordData {
  word: string
  displayWord: string
  hint: string
  locationHint: string
  positions: { row: number; col: number }[]
  direction: "horizontal" | "vertical"
}

const WORDS: WordData[] = [
  {
    word: "TUANLEVANG",
    displayWord: "TUẦN LỄ VÀNG",
    hint: "(10 chữ cái): Tên phong trào quyên góp vàng và tiền để ủng hộ ngân sách quốc gia vào tháng 9/1945?",
    locationHint: "➡️ Hàng ngang A (từ ô 1 đến ô 10)",
    positions: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 0, col: 5 },
      { row: 0, col: 6 },
      { row: 0, col: 7 },
      { row: 0, col: 8 },
      { row: 0, col: 9 },
    ],
    direction: "horizontal",
  },
  {
    word: "NAMTIEN",
    displayWord: "NAM TIẾN",
    hint: "(7 chữ cái): Tên đoàn quân từ miền Bắc hành quân vào chi viện cho miền Nam chiến đấu?",
    locationHint: "⬇️ Hàng dọc 1 (từ hàng C xuống hàng I)",
    positions: [
      { row: 2, col: 0 },
      { row: 3, col: 0 },
      { row: 4, col: 0 },
      { row: 5, col: 0 },
      { row: 6, col: 0 },
      { row: 7, col: 0 },
      { row: 8, col: 0 },
    ],
    direction: "vertical",
  },
  {
    word: "GIACDOT",
    displayWord: "GIẶC DỐT",
    hint: '(7 chữ cái): Tên loại "giặc" mà Bác Hồ gọi nạn mù chữ?',
    locationHint: "⬇️ Hàng dọc 4 (từ hàng C xuống hàng I)",
    positions: [
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 5, col: 3 },
      { row: 6, col: 3 },
      { row: 7, col: 3 },
      { row: 8, col: 3 },
    ],
    direction: "vertical",
  },
  {
    word: "HIENPHAP",
    displayWord: "HIẾN PHÁP",
    hint: "(8 chữ cái): Văn bản pháp lý cao nhất của nước ta được Quốc hội thông qua năm 1946?",
    locationHint: "⬇️ Hàng dọc 12 (từ hàng A xuống hàng H)",
    positions: [
      { row: 0, col: 11 },
      { row: 1, col: 11 },
      { row: 2, col: 11 },
      { row: 3, col: 11 },
      { row: 4, col: 11 },
      { row: 5, col: 11 },
      { row: 6, col: 11 },
      { row: 7, col: 11 },
    ],
    direction: "vertical",
  },
  {
    word: "GIACDOI",
    displayWord: "GIẶC ĐÓI",
    hint: '(7 chữ cái): Tên loại "giặc" gắn liền với nạn đói năm 1945?',
    locationHint: "➡️ Hàng ngang H (từ ô 5 đến ô 11)",
    positions: [
      { row: 7, col: 4 },
      { row: 7, col: 5 },
      { row: 7, col: 6 },
      { row: 7, col: 7 },
      { row: 7, col: 8 },
      { row: 7, col: 9 },
      { row: 7, col: 10 },
    ],
    direction: "horizontal",
  },
  {
    word: "DOCLAP",
    displayWord: "ĐỘC LẬP",
    hint: "(6 chữ cái): Mục tiêu cao nhất mà Cách mạng Tháng Tám đã giành lại được cho dân tộc?",
    locationHint: "➡️ Hàng ngang I (từ ô 5 đến ô 10)",
    positions: [
      { row: 8, col: 4 },
      { row: 8, col: 5 },
      { row: 8, col: 6 },
      { row: 8, col: 7 },
      { row: 8, col: 8 },
      { row: 8, col: 9 },
    ],
    direction: "horizontal",
  },
]

export default function WordSearchGame() {
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null)

  const getCellState = useCallback(
    (row: number, col: number) => {
      for (const word of WORDS) {
        if (foundWords.includes(word.word)) {
          if (word.positions.some((p) => p.row === row && p.col === col)) {
            return "found"
          }
        }
      }
      if (selectedCells.some((c) => c.row === row && c.col === col)) {
        return "selected"
      }
      if (highlightedWord) {
        const word = WORDS.find((w) => w.word === highlightedWord)
        if (word && word.positions.some((p) => p.row === row && p.col === col)) {
          return "hint"
        }
      }
      return "normal"
    },
    [foundWords, selectedCells, highlightedWord],
  )

  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true)
    setSelectedCells([{ row, col }])
    setHighlightedWord(null)
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return

    const startCell = selectedCells[0]
    if (!startCell) return

    const rowDiff = row - startCell.row
    const colDiff = col - startCell.col

    const newCells: { row: number; col: number }[] = []

    if (rowDiff === 0 && colDiff !== 0) {
      const step = colDiff > 0 ? 1 : -1
      for (let c = startCell.col; c !== col + step; c += step) {
        newCells.push({ row: startCell.row, col: c })
      }
    } else if (colDiff === 0 && rowDiff !== 0) {
      const step = rowDiff > 0 ? 1 : -1
      for (let r = startCell.row; r !== row + step; r += step) {
        newCells.push({ row: r, col: startCell.col })
      }
    } else {
      newCells.push(startCell)
    }

    setSelectedCells(newCells)
  }

  const handleCellMouseUp = () => {
    setIsSelecting(false)

    const selectedWord = selectedCells.map((c) => BOARD[c.row][c.col]).join("")
    const reversedWord = selectedWord.split("").reverse().join("")

    for (const word of WORDS) {
      if ((selectedWord === word.word || reversedWord === word.word) && !foundWords.includes(word.word)) {
        const newFoundWords = [...foundWords, word.word]
        setFoundWords(newFoundWords)

        if (newFoundWords.length === WORDS.length) {
          setGameWon(true)
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#dc2626", "#facc15", "#ffffff"],
          })
        }
        break
      }
    }

    setSelectedCells([])
  }

  const resetGame = () => {
    setFoundWords([])
    setSelectedCells([])
    setIsSelecting(false)
    setShowHints(false)
    setGameWon(false)
    setHighlightedWord(null)
  }

  const revealWord = (wordKey: string) => {
    if (!foundWords.includes(wordKey)) {
      setHighlightedWord(wordKey)
      setTimeout(() => setHighlightedWord(null), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50">
      <div className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Truy Tìm Ký Ức: 1945 - 1946</h1>
              <p className="text-yellow-300 text-lg">Tìm 6 từ khóa ẩn giấu trong bảng chữ cái</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6 border-2 border-yellow-400 bg-gradient-to-r from-red-600 to-red-700">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-yellow-400" />
                <span className="text-white font-medium">Tiến độ:</span>
                <span className="text-yellow-400 font-bold text-xl">
                  {foundWords.length} / {WORDS.length}
                </span>
              </div>
              <div className="flex gap-2">
                {WORDS.map((word, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      foundWords.includes(word.word) ? "bg-yellow-400 text-red-700" : "bg-white/20 text-white/50"
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <span className="bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ✎
                  </span>
                  Bảng Chữ Cái
                  <span className="text-sm font-normal text-gray-500 ml-2">(Kéo chuột để chọn từ)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 overflow-x-auto">
                <div
                  className="inline-block select-none"
                  onMouseLeave={() => {
                    if (isSelecting) {
                      handleCellMouseUp()
                    }
                  }}
                >
                  <div className="flex mb-1">
                    <div className="w-10 h-8" />
                    {Array(12)
                      .fill(null)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
                        >
                          {idx + 1}
                        </div>
                      ))}
                  </div>

                  {BOARD.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      <div className="w-10 h-10 flex items-center justify-center font-bold text-red-700 bg-red-100 rounded-l">
                        {String.fromCharCode(65 + rowIndex)}
                      </div>

                      {row.map((cell, colIndex) => {
                        const state = getCellState(rowIndex, colIndex)
                        return (
                          <div
                            key={colIndex}
                            onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                            onMouseUp={handleCellMouseUp}
                            className={`w-10 h-10 flex items-center justify-center text-lg font-bold border cursor-pointer transition-all ${
                              state === "found"
                                ? "bg-green-500 text-white border-green-600"
                                : state === "selected"
                                  ? "bg-yellow-400 text-red-700 border-yellow-500 scale-110"
                                  : state === "hint"
                                    ? "bg-red-200 text-red-700 border-red-400 animate-pulse"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-yellow-100 hover:border-yellow-400"
                            }`}
                          >
                            {cell}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Hướng dẫn:</strong> Nhấn và kéo chuột để chọn từ. Các từ nằm theo hàng ngang (→) hoặc hàng
                    dọc (↓).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-red-200 sticky top-24">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Câu Hỏi Gợi Ý
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                    className="text-xs border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    {showHints ? "Ẩn gợi ý" : "Hiện gợi ý"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-3">
                  {WORDS.map((word, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        foundWords.includes(word.word)
                          ? "bg-green-50 border-green-300"
                          : highlightedWord === word.word
                            ? "bg-red-50 border-red-400"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            foundWords.includes(word.word) ? "bg-green-500 text-white" : "bg-red-600 text-white"
                          }`}
                        >
                          {foundWords.includes(word.word) ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                        </span>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${foundWords.includes(word.word) ? "text-green-700" : "text-gray-700"}`}
                          >
                            {word.hint}
                          </p>

                          {showHints && !foundWords.includes(word.word) && (
                            <div className="mt-2">
                              <p className="text-xs text-red-600 font-medium">{word.locationHint}</p>
                              <button
                                onClick={() => revealWord(word.word)}
                                className="mt-1 text-xs text-red-600 hover:text-red-700 underline"
                              >
                                Hiện vị trí trên bảng
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={resetGame}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Chơi lại
          </Button>
          <Link href="/game">
            <Button className="bg-red-600 hover:bg-red-700 text-white">Quay về Trò chơi</Button>
          </Link>
        </div>

        {gameWon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full border-4 border-yellow-400 animate-in zoom-in-95">
              <CardContent className="p-8 text-center bg-gradient-to-b from-red-600 to-red-700">
                <div className="mb-4">
                  <Trophy className="h-16 w-16 text-yellow-400 mx-auto animate-bounce" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">XUẤT SẮC!</h2>
                <p className="text-white text-lg mb-4">Bạn đã tìm được tất cả 6 từ khóa!</p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <p className="text-white/90 text-sm">
                    Những từ khóa này đại diện cho giai đoạn lịch sử hào hùng 1945-1946 của dân tộc Việt Nam - thời kỳ
                    đất nước vừa giành độc lập và đối mặt với muôn vàn khó khăn thử thách.
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setGameWon(false)}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Đóng
                  </Button>
                  <Button onClick={resetGame} className="bg-yellow-400 text-red-700 hover:bg-yellow-300">
                    Chơi lại
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
