import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

export default function Header({ onToggleSidebar }) {
  const { user, signOut } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
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
            aria-label="메뉴"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800 text-lg">
            🏗️
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

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <NavTab to="/vol/vol1" active={loc.pathname.includes('vol1')}>
            제1권
          </NavTab>
          <NavTab to="/vol/vol2" active={loc.pathname.includes('vol2')}>
            제2권
          </NavTab>
          <NavTab to="/tools" active={loc.pathname.startsWith('/tools')}>
            AI 도구
          </NavTab>
          <NavTab to="/about" active={loc.pathname.startsWith('/about')}>
            About
          </NavTab>
        </nav>

        <div className="ml-auto flex items-center gap-2">
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
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}

function NavTab({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`rounded-lg px-3 py-1.5 text-[13.5px] font-semibold transition ${
        active ? 'bg-brand-50 text-brand-800' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {children}
    </Link>
  )
}
