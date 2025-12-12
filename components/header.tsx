"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/boi-canh-truoc-1945", label: "Bối cảnh trước 1945" },
  { href: "/boi-canh-sau-1945", label: "Bối cảnh sau 1945" },
  { href: "/chu-truong-duong-loi", label: "Chủ trương đường lối của Đảng" },
  { href: "/video", label: "Video Sản Phẩm" },
  {
    href: "/game",
    label: "Trò chơi",
    submenu: [
      { href: "/game", label: "Vận Mệnh Dân Tộc" },
      { href: "/game/o-chu", label: "Ô Chữ Lịch Sử" },
      { href: "/game/tim-tu", label: "Truy Tìm Ký Ức" },
    ],
  },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [gameMenuOpen, setGameMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-800/40 bg-red-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-red-700 font-bold text-lg">VN</span>
            </div>
            <span className="font-serif font-semibold text-lg hidden sm:block text-white group-hover:text-yellow-400 transition-colors">
              Lịch Sử Việt Nam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.href} className="relative">
                  <button
                    onClick={() => setGameMenuOpen(!gameMenuOpen)}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
                      pathname.startsWith("/game")
                        ? "bg-yellow-400 text-red-700"
                        : "text-white hover:text-yellow-400 hover:bg-red-600/50",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", gameMenuOpen && "rotate-180")} />
                  </button>
                  {gameMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-red-200 overflow-hidden min-w-[180px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setGameMenuOpen(false)}
                          className={cn(
                            "block px-4 py-3 text-sm font-medium transition-colors",
                            pathname === subItem.href
                              ? "bg-red-100 text-red-700"
                              : "text-gray-700 hover:bg-yellow-50 hover:text-red-700",
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-yellow-400 text-red-700"
                      : "text-white hover:text-yellow-400 hover:bg-red-600/50",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-yellow-400 hover:bg-red-600/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-red-600">
            <div className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.submenu ? (
                  <div key={item.href}>
                    <button
                      onClick={() => setGameMenuOpen(!gameMenuOpen)}
                      className={cn(
                        "w-full px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between",
                        pathname.startsWith("/game")
                          ? "bg-yellow-400 text-red-700"
                          : "text-white hover:text-yellow-400 hover:bg-red-600/50",
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", gameMenuOpen && "rotate-180")} />
                    </button>
                    {gameMenuOpen && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setGameMenuOpen(false)
                            }}
                            className={cn(
                              "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                              pathname === subItem.href
                                ? "bg-yellow-400/80 text-red-700"
                                : "text-white/90 hover:text-yellow-400 hover:bg-red-600/50",
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-yellow-400 text-red-700"
                        : "text-white hover:text-yellow-400 hover:bg-red-600/50",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
