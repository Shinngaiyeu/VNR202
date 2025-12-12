"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, Star, HelpCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"
import { toast } from "sonner"

interface CrosswordRow {
  answer: string
  hint: string
  keywordPosition: number // 1-based position of the keyword letter
  keywordLetter: string
}

const crosswordData: CrosswordRow[] = [
  {
    answer: "HIENPHAP",
    hint: "Văn bản pháp lý cao nhất của nước ta được Quốc hội khóa I thông qua ngày 09/11/1946?",
    keywordPosition: 1,
    keywordLetter: "H",
  },
  {
    answer: "TONGTUYENCU",
    hint: "Cuộc bầu cử lịch sử đầu tiên ở Việt Nam diễn ra ngày 06/01/1946 để bầu Quốc hội?",
    keywordPosition: 2,
    keywordLetter: "O",
  },
  {
    answer: "GIACDOI",
    hint: "Tên loại 'giặc' khủng khiếp đã cướp đi sinh mạng của hơn 2 triệu đồng bào ta vào năm 1945, được Chủ tịch Hồ Chí Minh xếp ngang hàng với giặc dốt và giặc ngoại xâm?",
    keywordPosition: 4,
    keywordLetter: "C",
  },
  {
    answer: "HOAHOAN",
    hint: "Sách lược ngoại giao mềm dẻo của Chủ tịch Hồ Chí Minh đối với quân Tưởng và Pháp năm 1946?",
    keywordPosition: 1,
    keywordLetter: "H",
  },
  {
    answer: "CHITHI",
    hint: "Văn bản của Trung ương Đảng ra ngày 25/11/1945 có tên: '___ Kháng chiến kiến quốc'?",
    keywordPosition: 3,
    keywordLetter: "I",
  },
  {
    answer: "VIETMINH",
    hint: "Tên gọi tắt của mặt trận dân tộc thống nhất do Đảng ta lập ra năm 1941?",
    keywordPosition: 5,
    keywordLetter: "M",
  },
  {
    answer: "TAICHINH",
    hint: "'Tuần lễ Vàng' (9/1945) là biện pháp giải quyết khó khăn trong lĩnh vực nào?",
    keywordPosition: 3,
    keywordLetter: "I",
  },
  {
    answer: "NAMTIEN",
    hint: "Tên gọi các đoàn quân Bắc Bộ tiến vào Nam Bộ chi viện sau ngày 23/9/1945?",
    keywordPosition: 1,
    keywordLetter: "N",
  },
  {
    answer: "HANOI",
    hint: "Thành phố nào đã kiên cường kháng chiến 60 ngày đêm từ 19/12/1946?",
    keywordPosition: 1,
    keywordLetter: "H",
  },
]

const KEYWORD = "HOCHIMINH"

export default function CrosswordGame() {
  const [answers, setAnswers] = useState<string[]>(crosswordData.map(() => ""))
  const [revealed, setRevealed] = useState<boolean[]>(crosswordData.map(() => false))
  const [showKeyword, setShowKeyword] = useState(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [gameWon, setGameWon] = useState(false)
  const [keywordInput, setKeywordInput] = useState<string[]>(Array(KEYWORD.length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([])
  const keywordInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = crosswordData.map((row) => Array(row.answer.length).fill(null))
  }, [])

  const showTemporaryMessage = (msg: string) => {
    toast.info(msg, {
      duration: 3000,
    })
  }

  const normalizeChar = (char: string): string => {
    const map: Record<string, string> = {
      à: "a",
      á: "a",
      ả: "a",
      ã: "a",
      ạ: "a",
      ă: "a",
      ằ: "a",
      ắ: "a",
      ẳ: "a",
      ẵ: "a",
      ặ: "a",
      â: "a",
      ầ: "a",
      ấ: "a",
      ẩ: "a",
      ẫ: "a",
      ậ: "a",
      è: "e",
      é: "e",
      ẻ: "e",
      ẽ: "e",
      ẹ: "e",
      ê: "e",
      ề: "e",
      ế: "e",
      ể: "e",
      ễ: "e",
      ệ: "e",
      ì: "i",
      í: "i",
      ỉ: "i",
      ĩ: "i",
      ị: "i",
      ò: "o",
      ó: "o",
      ỏ: "o",
      õ: "o",
      ọ: "o",
      ô: "o",
      ồ: "o",
      ố: "o",
      ổ: "o",
      ỗ: "o",
      ộ: "o",
      ơ: "o",
      ờ: "o",
      ớ: "o",
      ở: "o",
      ỡ: "o",
      ợ: "o",
      ù: "u",
      ú: "u",
      ủ: "u",
      ũ: "u",
      ụ: "u",
      ư: "u",
      ừ: "u",
      ứ: "u",
      ử: "u",
      ữ: "u",
      ự: "u",
      ỳ: "y",
      ý: "y",
      ỷ: "y",
      ỹ: "y",
      ỵ: "y",
      đ: "d",
    }
    const lower = char.toLowerCase()
    return map[lower] || lower
  }

  const checkAnswer = (rowIndex: number, userAnswer: string): boolean => {
    const correctAnswer = crosswordData[rowIndex].answer
    if (userAnswer.length !== correctAnswer.length) return false

    for (let i = 0; i < userAnswer.length; i++) {
      if (normalizeChar(userAnswer[i]) !== normalizeChar(correctAnswer[i])) {
        return false
      }
    }
    return true
  }

  const handleKeyDown = (rowIndex: number, charIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (revealed[rowIndex]) return

    // Handle character input
    if (e.key.length === 1 && /[a-zA-ZÀ-ỹ]/i.test(e.key)) {
      e.preventDefault()

      const newAnswers = [...answers]
      const currentAnswer = newAnswers[rowIndex].split("")

      // Ensure array has correct length
      while (currentAnswer.length < crosswordData[rowIndex].answer.length) {
        currentAnswer.push("")
      }

      const char = e.key.toUpperCase()
      currentAnswer[charIndex] = char
      newAnswers[rowIndex] = currentAnswer.join("")
      setAnswers(newAnswers)

      // Auto-move to next input
      if (charIndex < crosswordData[rowIndex].answer.length - 1) {
        inputRefs.current[rowIndex]?.[charIndex + 1]?.focus()
      }

      // Check if answer is complete and correct
      if (currentAnswer.filter((c) => c).length === crosswordData[rowIndex].answer.length) {
        if (checkAnswer(rowIndex, currentAnswer.join(""))) {
          const newRevealed = [...revealed]
          newRevealed[rowIndex] = true
          setRevealed(newRevealed)

          // Check if all rows are complete
          if (newRevealed.every((r) => r)) {
            setShowKeyword(true)
            setGameWon(true)
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#dc2626", "#facc15", "#ffffff"],
            })
          }
        }
      }
      return
    }

    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault()
      const newAnswers = [...answers]
      const currentAnswer = newAnswers[rowIndex].split("")

      while (currentAnswer.length < crosswordData[rowIndex].answer.length) {
        currentAnswer.push("")
      }

      if (currentAnswer[charIndex]) {
        currentAnswer[charIndex] = ""
        newAnswers[rowIndex] = currentAnswer.join("")
        setAnswers(newAnswers)
      } else if (charIndex > 0) {
        inputRefs.current[rowIndex]?.[charIndex - 1]?.focus()
      }
      return
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && charIndex > 0) {
      e.preventDefault()
      inputRefs.current[rowIndex]?.[charIndex - 1]?.focus()
    }
    if (e.key === "ArrowRight" && charIndex < crosswordData[rowIndex].answer.length - 1) {
      e.preventDefault()
      inputRefs.current[rowIndex]?.[charIndex + 1]?.focus()
    }
  }

  const normalizeString = (str: string): string => {
    return str.split("").map(c => normalizeChar(c)).join("").toUpperCase()
  }

  const checkKeywordAndRevealAll = (currentKeywordInput: string[]) => {
    const inputKeyword = currentKeywordInput.join("").toUpperCase()
    const normalizedInput = normalizeString(inputKeyword)
    const normalizedKeyword = normalizeString(KEYWORD)
    
    if (normalizedInput === normalizedKeyword && inputKeyword.length === KEYWORD.length) {
      // Reveal all answers
      const newAnswers = crosswordData.map(row => row.answer)
      setAnswers(newAnswers)
      setRevealed(crosswordData.map(() => true))
      setShowKeyword(true)
      setGameWon(true)
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#dc2626", "#facc15", "#ffffff"],
      })
    }
  }

  const handleKeywordKeyDown = (charIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameWon) return

    // Handle character input
    if (e.key.length === 1 && /[a-zA-ZÀ-ỹ]/i.test(e.key)) {
      e.preventDefault()
      const newKeywordInput = [...keywordInput]
      newKeywordInput[charIndex] = e.key.toUpperCase()
      setKeywordInput(newKeywordInput)

      // Auto-move to next input
      if (charIndex < KEYWORD.length - 1) {
        keywordInputRefs.current[charIndex + 1]?.focus()
      }

      // Check if keyword is complete
      checkKeywordAndRevealAll(newKeywordInput)
      return
    }

    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault()
      const newKeywordInput = [...keywordInput]
      if (newKeywordInput[charIndex]) {
        newKeywordInput[charIndex] = ""
        setKeywordInput(newKeywordInput)
      } else if (charIndex > 0) {
        keywordInputRefs.current[charIndex - 1]?.focus()
      }
      return
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && charIndex > 0) {
      e.preventDefault()
      keywordInputRefs.current[charIndex - 1]?.focus()
    }
    if (e.key === "ArrowRight" && charIndex < KEYWORD.length - 1) {
      e.preventDefault()
      keywordInputRefs.current[charIndex + 1]?.focus()
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
    }
  }

  // Gợi ý: hiện 1 chữ tiếp theo (theo thứ tự từ trái qua phải)
  // Nếu ký tự hiện tại sai -> sửa ký tự đó (ví dụ N -> T)
  // Nếu ký tự rỗng -> điền ký tự đúng
  // Sau mỗi sửa hiển thị thông báo vị trí và ký tự đã sửa
  const revealHint = (rowIndex: number) => {
    if (revealed[rowIndex] || gameWon) return

    const correctAnswer = crosswordData[rowIndex].answer.toUpperCase()
    const len = correctAnswer.length

    // Build currentAnswer array of correct length using existing stored string (may be shorter)
    const currentAnswer: string[] = []
    const stored = (answers[rowIndex] || "").toUpperCase()
    for (let i = 0; i < len; i++) {
      currentAnswer[i] = stored[i] || ""
    }

    // Find first index where char does NOT match (including empty)
    let targetIndex = -1
    for (let i = 0; i < len; i++) {
      const curr = currentAnswer[i] || ""
      const corr = correctAnswer[i]
      if (normalizeChar(curr) !== normalizeChar(corr)) {
        targetIndex = i
        break
      }
    }

    // If nothing to fix (all match)
    if (targetIndex === -1) {
      // If all match and length correct -> reveal
      if (checkAnswer(rowIndex, currentAnswer.join(""))) {
        const newRevealed = [...revealed]
        newRevealed[rowIndex] = true
        setRevealed(newRevealed)

        // update keyword letter if applicable
        if (rowIndex >= 0 && rowIndex < KEYWORD.length) {
          const newKeywordInput = [...keywordInput]
          newKeywordInput[rowIndex] = crosswordData[rowIndex].keywordLetter
          setKeywordInput(newKeywordInput)
        }

        if (newRevealed.every((r) => r)) {
          setShowKeyword(true)
          setGameWon(true)
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#dc2626", "#facc15", "#ffffff"],
          })
        }
      }
      return
    }

    const oldChar = currentAnswer[targetIndex] || ""
    const newChar = correctAnswer[targetIndex]

    // Replace that position with the correct char
    currentAnswer[targetIndex] = newChar
    const newAnswers = [...answers]
    newAnswers[rowIndex] = currentAnswer.join("")
    setAnswers(newAnswers)

    // If replaced position is keyword cell, update keyword input
    if (targetIndex === crosswordData[rowIndex].keywordPosition - 1) {
      const newKeywordInput = [...keywordInput]
      if (rowIndex >= 0 && rowIndex < KEYWORD.length) {
        newKeywordInput[rowIndex] = crosswordData[rowIndex].keywordLetter
        setKeywordInput(newKeywordInput)
      }
    }

    // Message for user (Vietnamese)
    if (oldChar === "" || oldChar.trim() === "") {
      showTemporaryMessage(`Hàng ${rowIndex + 1}: đã điền '${newChar}' vào ô ${targetIndex + 1}.`)
    } else {
      showTemporaryMessage(`Hàng ${rowIndex + 1}: ô ${targetIndex + 1} sai ('${oldChar}') → đã sửa thành '${newChar}'.`)
    }

    // If after filling there is no empty/incorrect -> mark revealed
    const stillEmptyOrWrong = currentAnswer.some((ch, i) => normalizeChar(ch || "") !== normalizeChar(correctAnswer[i]))
    if (!stillEmptyOrWrong) {
      const newRevealed = [...revealed]
      newRevealed[rowIndex] = true
      setRevealed(newRevealed)

      if (newRevealed.every((r) => r)) {
        setShowKeyword(true)
        setGameWon(true)
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#dc2626", "#facc15", "#ffffff"],
        })
      }
    }
  }

  const resetGame = () => {
    setAnswers(crosswordData.map(() => ""))
    setRevealed(crosswordData.map(() => false))
    setShowKeyword(false)
    setGameWon(false)
    setSelectedRow(null)
    setKeywordInput(Array(KEYWORD.length).fill(""))
  }

  // Calculate max length for alignment
  const maxLength = Math.max(...crosswordData.map((row) => row.answer.length))

  // Get revealed keyword letters
  const getKeywordLetters = () => {
    return crosswordData.map((row, idx) => {
      if (revealed[idx]) {
        return row.keywordLetter
      }
      return "?"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ô Chữ Lịch Sử</h1>
          <p className="text-yellow-300 text-lg">Giải mã từ khóa về vị lãnh tụ vĩ đại của dân tộc</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Keyword Display */}
        <Card className="mb-8 border-2 border-yellow-400 bg-gradient-to-r from-red-600 to-red-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-white flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Từ Khóa Dọc
              <Star className="h-5 w-5 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/80 text-sm mb-3">Nhập từ khóa hoặc giải các ô chữ hàng ngang</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {KEYWORD.split("").map((letter, idx) => {
                const isRevealed = revealed[idx]
                const displayLetter = isRevealed ? crosswordData[idx].keywordLetter : keywordInput[idx]
                
                return (
                  <div key={idx} className="relative">
                    <input
                      ref={(el) => {
                        keywordInputRefs.current[idx] = el
                      }}
                      type="text"
                      maxLength={1}
                      value={displayLetter}
                      onKeyDown={(e) => handleKeywordKeyDown(idx, e)}
                      disabled={gameWon}
                      readOnly
                      className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl md:text-3xl font-bold rounded-lg border-2 transition-all duration-500 outline-none cursor-text ${
                        isRevealed || gameWon
                          ? "bg-yellow-400 text-red-700 border-yellow-500 scale-110"
                          : displayLetter
                            ? "bg-yellow-200 text-red-700 border-yellow-400"
                            : "bg-white/20 text-white border-white/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                      }`}
                    />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/60">
                      {idx + 1}
                    </span>
                  </div>
                )
              })}
            </div>
            {gameWon && (
              <div className="text-center mt-4 animate-pulse">
                <p className="text-yellow-400 text-xl font-bold">HO CHI MINH</p>
                <p className="text-white/80 text-sm mt-1">Vị lãnh tụ vĩ đại của dân tộc Việt Nam!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crossword Grid */}
          <div className="lg:col-span-2">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <span className="bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    ✎
                  </span>
                  Bảng Ô Chữ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 overflow-x-auto">
                <div className="space-y-3 min-w-fit">
                  {crosswordData.map((row, rowIndex) => {
                    const keywordColumnIndex = 5
                    const paddingBefore = keywordColumnIndex - (row.keywordPosition - 1)

                    return (
                      <div
                        key={rowIndex}
                        className={`flex items-center gap-1 transition-all ${
                          selectedRow === rowIndex ? "scale-[1.02]" : ""
                        }`}
                      >
                        {/* Row number */}
                        <div className="w-10 h-12 flex items-center justify-center font-bold text-red-700 bg-red-100 rounded">
                          {rowIndex + 1}
                        </div>

                        {/* Padding cells before */}
                        {Array(Math.max(0, paddingBefore))
                          .fill(null)
                          .map((_, i) => (
                            <div key={`pad-${i}`} className="w-12 h-12" />
                          ))}

                        {/* Answer cells */}
                        {Array(row.answer.length)
                          .fill(null)
                          .map((_, charIndex) => {
                            const isKeywordCell = charIndex === row.keywordPosition - 1
                            const isRevealed = revealed[rowIndex]
                            const currentChar = answers[rowIndex]?.[charIndex] || ""

                            return (
                              <div key={charIndex} className="relative">
                                <input
                                  ref={(el) => {
                                    if (!inputRefs.current[rowIndex]) {
                                      inputRefs.current[rowIndex] = []
                                    }
                                    inputRefs.current[rowIndex][charIndex] = el
                                  }}
                                  type="text"
                                  maxLength={1}
                                  value={isRevealed ? row.answer[charIndex] : currentChar}
                                  onKeyDown={(e) => handleKeyDown(rowIndex, charIndex, e)}
                                  onFocus={() => setSelectedRow(rowIndex)}
                                  disabled={isRevealed}
                                  readOnly
                                  className={`w-12 h-12 text-center text-xl font-bold uppercase border-2 rounded transition-all outline-none cursor-text ${
                                    isKeywordCell
                                      ? isRevealed
                                        ? "bg-yellow-400 border-yellow-500 text-red-700"
                                        : "bg-yellow-100 border-yellow-400 text-red-700 focus:ring-2 focus:ring-yellow-400"
                                      : isRevealed
                                        ? "bg-green-100 border-green-400 text-green-700"
                                        : "bg-white border-gray-300 text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                  }`}
                                />
                                {isKeywordCell && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                                    <span className="text-[10px] text-white font-bold">★</span>
                                  </div>
                                )}
                              </div>
                            )
                          })}

                        {/* Nút gợi ý - hiện 1 chữ tiếp theo / sửa chữ sai */}
                        {!revealed[rowIndex] && (
                          <button
                            onClick={() => revealHint(rowIndex)}
                            className="ml-2 p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-full transition-colors"
                            title="Gợi ý: sửa/chèn chữ tiếp theo của hàng này"
                          >
                            <Lightbulb className="h-5 w-5" />
                          </button>
                        )}

                        {/* Correct indicator */}
                        {revealed[rowIndex] && (
                          <div className="ml-2 text-green-600">
                            <Trophy className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hints Panel */}
          <div className="lg:col-span-1">
            <Card className="border-red-200 sticky top-24">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Câu Hỏi Gợi Ý
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {crosswordData.map((row, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        revealed[idx]
                          ? "bg-green-50 border-green-300"
                          : selectedRow === idx
                            ? "bg-yellow-50 border-yellow-400"
                            : "bg-gray-50 border-gray-200 hover:border-red-300"
                      }`}
                      onClick={() => {
                        setSelectedRow(idx)
                        // Khi click vào card gợi ý: sửa/hiện chữ tiếp theo của hàng này
                        revealHint(idx)
                        // cố gắng focus ô đầu (nếu vẫn muốn), nhưng nếu đã reveal thì không cần
                        inputRefs.current[idx]?.[0]?.focus()
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            revealed[idx] ? "bg-green-500 text-white" : "bg-red-600 text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm ${revealed[idx] ? "text-green-700" : "text-gray-700"}`}>{row.hint}</p>
                          <p className="text-xs text-gray-500 mt-1">({row.answer.length} chữ cái)</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex justify-center gap-4">
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
          <p className="text-xs text-gray-500 mt-1">Nhấn vào bóng đèn gợi ý để sửa từng chữ (sửa từ trái → phải)</p>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full border-4 border-yellow-400 animate-in zoom-in-95">
              <CardContent className="p-8 text-center bg-gradient-to-b from-red-600 to-red-700">
                <div className="mb-4">
                  <Trophy className="h-16 w-16 text-yellow-400 mx-auto animate-bounce" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">XUẤT SẮC!</h2>
                <p className="text-white text-lg mb-4">Bạn đã giải mã thành công từ khóa:</p>
                <div className="bg-yellow-400 text-red-700 text-3xl font-bold py-3 px-6 rounded-lg inline-block mb-4">
                  HO CHI MINH
                </div>
                <p className="text-white/80 text-sm mb-6">
                  Chủ tịch Hồ Chí Minh - Vị lãnh tụ vĩ đại, người cha già kính yêu của dân tộc Việt Nam, Anh hùng giải
                  phóng dân tộc, Danh nhân văn hóa thế giới.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setGameWon(false)}
                    className="bg-white text-red-700 hover:bg-gray-100 font-bold px-6 py-2"
                  >
                    Đóng
                  </Button>
                  <Button onClick={resetGame} className="bg-yellow-400 text-red-700 hover:bg-yellow-300 font-bold px-6 py-2">
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
