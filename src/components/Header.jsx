import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import Icon from './Icon'

// 전역 네비게이션 — About 최우선, 4대 AI 도구는 개별 메뉴
const NAV = [
  { to: '/about', label: 'About' },
  { to: '/vol/vol1', label: '제1권 교재' },
  { to: '/vol/vol2', label: '제2권 교재' },
  { to: '/schedule/vol1', label: '교육일정' },
  { to: '/tools/prompt/learn', label: '프롬프트' },
  { to: '/tools/chatgpt', label: 'ChatGPT' },
  { to: '/tools/claude', label: 'Claude' },
  { to: '/tools/gemini', label: 'Gemini' },
  { to: '/tools/genspark', label: 'Genspark' },
  { to: '/tools/perplexity', label: 'Perplexity' },
]

function isActive(pathname, to) {
  if (to === '/about') return pathname.startsWith('/about')
  if (to.startsWith('/schedule')) return pathname.startsWith('/schedule')
  if (to.startsWith('/tools/prompt')) return pathname.startsWith('/tools/prompt')
  if (to.startsWith('/tools/')) return pathname.startsWith(to)
  if (to === '/vol/vol1') return pathname.startsWith('/vol/vol1')
  if (to === '/vol/vol2') return pathname.startsWith('/vol/vol2')
  return pathname === to
}

export default function Header({ onToggleSidebar }) {
  const { user, signOut } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const name =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    '학습자'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="목차"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800 text-[15px] text-signal-400">
            <Icon name="fa-solid fa-helmet-safety" />
          </span>
          <div className="leading-tight">
            <div className="text-[14.5px] font-extrabold tracking-tight text-brand-900">
              건설기계 AI역량강화
            </div>
            <div className="hidden text-[10.5px] font-medium text-slate-400 sm:block">
              2026 산업전문인력 · 생성형 AI & 데이터 디지털화
            </div>
          </div>
        </Link>

        {/* 데스크톱 네비 (오른쪽 정렬) */}
        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <NavTab key={item.to} to={item.to} active={isActive(loc.pathname, item.to)}>
              {item.label}
            </NavTab>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <span className="hidden text-[13px] text-slate-600 sm:inline">
                <b className="font-semibold text-brand-800">{name}</b>님
              </span>
              <button
                onClick={signOut}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="rounded-lg bg-brand-800 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-700"
            >
              로그인
            </button>
          )}

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="메뉴"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 네비 */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition ${
                  isActive(loc.pathname, item.to)
                    ? 'bg-brand-50 text-brand-800'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}

function NavTab({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] font-semibold transition ${
        active ? 'bg-brand-50 text-brand-800' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {children}
    </Link>
  )
}
