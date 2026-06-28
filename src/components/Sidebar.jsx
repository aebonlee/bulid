import { Link, useParams, useLocation } from 'react-router-dom'
import { getVolume, volumes } from '../data/courses'
import { toolMenu, getTool, TOOL_SECTIONS } from '../data/tools'
import { ABOUT_PAGES } from '../data/about'
import { useProgress } from '../context/ProgressContext'

export default function Sidebar({ open, onClose }) {
  const loc = useLocation()
  const mode = loc.pathname.startsWith('/tools')
    ? 'tools'
    : loc.pathname.startsWith('/about')
    ? 'about'
    : 'vol'

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />}

      <aside
        className={`sidebar-scroll fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-slate-200 bg-white transition-transform lg:sticky lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {mode === 'vol' && <VolumeNav onClose={onClose} />}
          {mode === 'tools' && <ToolsNav onClose={onClose} />}
          {mode === 'about' && <AboutNav onClose={onClose} />}
        </div>
      </aside>
    </>
  )
}

function SectionLabel({ children, className = '' }) {
  return (
    <div className={`px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 ${className}`}>
      {children}
    </div>
  )
}

/* ---------------- 제1·2권 차례 ---------------- */
function VolumeNav({ onClose }) {
  const { volId, partNum } = useParams()
  const vol = getVolume(volId) || volumes[0]
  const { isDone } = useProgress()
  const days = vol.parts.filter((p) => p.kind === 'day')
  const appendix = vol.parts.filter((p) => p.kind !== 'day')

  return (
    <>
      <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
        {volumes.map((v) => (
          <Link
            key={v.id}
            to={`/vol/${v.id}`}
            onClick={onClose}
            className={`rounded-lg py-2 text-center text-[12.5px] font-bold transition ${
              v.id === vol.id ? 'bg-brand-800 text-white shadow' : 'text-slate-500 hover:bg-white'
            }`}
          >
            {v.id === 'vol1' ? '제1권' : '제2권'}
          </Link>
        ))}
      </div>

      <Link
        to={`/vol/${vol.id}`}
        onClick={onClose}
        className="mb-3 block rounded-lg px-2 py-1.5 text-[12px] font-semibold text-brand-700 hover:bg-brand-50"
      >
        📋 과정 개요 보기
      </Link>

      <SectionLabel>DAY 1–6 · 본 과정</SectionLabel>
      <nav className="mt-1.5 space-y-0.5">
        {days.map((p) => (
          <PartLink key={p.num} vol={vol} part={p} active={String(p.num) === String(partNum)} done={isDone(vol.id, p.num)} onClose={onClose} />
        ))}
      </nav>

      {appendix.length > 0 && (
        <>
          <SectionLabel className="mt-5">부록</SectionLabel>
          <nav className="mt-1.5 space-y-0.5">
            {appendix.map((p) => (
              <PartLink key={p.num} vol={vol} part={p} active={String(p.num) === String(partNum)} done={isDone(vol.id, p.num)} onClose={onClose} />
            ))}
          </nav>
        </>
      )}
    </>
  )
}

function PartLink({ vol, part, active, done, onClose }) {
  const dayLabel = part.kind === 'day' ? `DAY ${part.day}` : `PART ${String(part.num).padStart(2, '0')}`
  return (
    <Link
      to={`/vol/${vol.id}/part/${part.num}`}
      onClick={onClose}
      className={`flex items-start gap-2 rounded-lg px-2.5 py-2 transition ${
        active ? 'bg-brand-50 ring-1 ring-brand-200' : 'hover:bg-slate-50'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
          done ? 'bg-emerald-500 text-white' : active ? 'bg-brand-800 text-white' : 'bg-slate-200 text-slate-500'
        }`}
      >
        {done ? '✓' : part.kind === 'day' ? part.day : part.num}
      </span>
      <span className="min-w-0">
        <span className={`block text-[10.5px] font-semibold ${active ? 'text-brand-600' : 'text-slate-400'}`}>{dayLabel}</span>
        <span className={`block text-[13px] leading-snug ${active ? 'font-semibold text-brand-900' : 'text-slate-600'}`}>{part.title}</span>
      </span>
    </Link>
  )
}

/* ---------------- AI 도구 가이드 ---------------- */
function ToolsNav({ onClose }) {
  const loc = useLocation()
  const { toolId } = useParams()
  // 개별 도구 상세 페이지(프롬프트 제외)면 그 도구의 섹션 메뉴를 보여준다
  const tool = toolId && toolId !== 'prompt' ? getTool(toolId) : null

  const goSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onClose?.()
  }

  if (tool) {
    return (
      <>
        {/* 현재 도구 헤더 */}
        <div className="mb-3 flex items-center gap-2.5 rounded-xl bg-brand-50 px-3 py-2.5">
          <span className="text-xl">{tool.emoji}</span>
          <div className="leading-tight">
            <div className="text-[14px] font-extrabold text-brand-900">{tool.name}</div>
            <div className="text-[10.5px] text-slate-400">{tool.vendor}</div>
          </div>
        </div>

        <SectionLabel>이 도구 메뉴</SectionLabel>
        <nav className="mt-1.5 space-y-0.5">
          {TOOL_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goSection(s.id)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition hover:bg-slate-50"
            >
              <span className="text-[15px]">{s.emoji}</span>
              <span className="text-[13px] font-medium text-slate-600">{s.label}</span>
            </button>
          ))}
        </nav>

        <SectionLabel className="mt-5">다른 도구</SectionLabel>
        <nav className="mt-1.5 space-y-0.5">
          {toolMenu.map((t) => {
            const to = t.id === 'prompt' ? '/tools/prompt' : `/tools/${t.id}`
            const active = t.id === tool.id
            return (
              <Link
                key={t.id}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition ${
                  active ? 'bg-brand-50 ring-1 ring-brand-200' : 'hover:bg-slate-50'
                }`}
              >
                <span>{t.emoji}</span>
                <span className={`text-[12.5px] ${active ? 'font-bold text-brand-900' : 'text-slate-500'}`}>
                  {t.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </>
    )
  }

  // /tools 또는 /tools/prompt → 전체 도구 목록
  return (
    <>
      <SectionLabel>AI 도구 가이드</SectionLabel>
      <Link
        to="/tools"
        onClick={onClose}
        className={`mt-1.5 mb-2 block rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
          loc.pathname === '/tools' ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-200' : 'text-brand-700 hover:bg-brand-50'
        }`}
      >
        🧰 전체 보기
      </Link>

      <nav className="space-y-0.5">
        {toolMenu.map((t) => {
          const to = t.id === 'prompt' ? '/tools/prompt' : `/tools/${t.id}`
          const active = loc.pathname === to
          return (
            <Link
              key={t.id}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition ${
                active ? 'bg-brand-50 ring-1 ring-brand-200' : 'hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              <span className={`text-[13.5px] ${active ? 'font-bold text-brand-900' : 'font-medium text-slate-600'}`}>
                {t.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-5 rounded-xl bg-slate-50 p-3 text-[11.5px] leading-relaxed text-slate-400">
        프롬프트 작성법과 5대 AI 도구의 강점·요금제·실무 활용·실습 사례를 정리했습니다.
      </div>
    </>
  )
}

/* ---------------- About ---------------- */
function AboutNav({ onClose }) {
  const loc = useLocation()
  return (
    <>
      <SectionLabel>About</SectionLabel>
      <nav className="mt-1.5 space-y-0.5">
        {ABOUT_PAGES.map((s) => {
          const active = loc.pathname === s.to
          return (
            <Link
              key={s.id}
              to={s.to}
              onClick={onClose}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 transition ${
                active ? 'bg-brand-50 ring-1 ring-brand-200' : 'hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{s.emoji}</span>
              <span className={`text-[13.5px] ${active ? 'font-bold text-brand-900' : 'font-medium text-slate-600'}`}>
                {s.label}
              </span>
            </Link>
          )
        })}
      </nav>
      <Link
        to="/"
        onClick={onClose}
        className="mt-4 block rounded-lg px-3 py-2 text-[12.5px] font-semibold text-brand-700 hover:bg-brand-50"
      >
        ← 홈으로
      </Link>
    </>
  )
}
