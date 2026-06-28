import { Link, useParams } from 'react-router-dom'
import { getVolume, volumes } from '../data/courses'
import { useProgress } from '../context/ProgressContext'

export default function Sidebar({ open, onClose }) {
  const { volId, partNum } = useParams()
  const vol = getVolume(volId) || volumes[0]
  const { isDone } = useProgress()

  const days = vol.parts.filter((p) => p.kind === 'day')
  const appendix = vol.parts.filter((p) => p.kind !== 'day')

  return (
    <>
      {/* 모바일 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar-scroll fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-slate-200 bg-white transition-transform lg:sticky lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* 권 선택 토글 */}
          <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
            {volumes.map((v) => (
              <Link
                key={v.id}
                to={`/vol/${v.id}`}
                onClick={onClose}
                className={`rounded-lg py-2 text-center text-[12.5px] font-bold transition ${
                  v.id === vol.id
                    ? 'bg-brand-800 text-white shadow'
                    : 'text-slate-500 hover:bg-white'
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
              <PartLink
                key={p.num}
                vol={vol}
                part={p}
                active={String(p.num) === String(partNum)}
                done={isDone(vol.id, p.num)}
                onClose={onClose}
              />
            ))}
          </nav>

          {appendix.length > 0 && (
            <>
              <SectionLabel className="mt-5">부록</SectionLabel>
              <nav className="mt-1.5 space-y-0.5">
                {appendix.map((p) => (
                  <PartLink
                    key={p.num}
                    vol={vol}
                    part={p}
                    active={String(p.num) === String(partNum)}
                    done={isDone(vol.id, p.num)}
                    onClose={onClose}
                  />
                ))}
              </nav>
            </>
          )}
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
          done
            ? 'bg-emerald-500 text-white'
            : active
            ? 'bg-brand-800 text-white'
            : 'bg-slate-200 text-slate-500'
        }`}
      >
        {done ? '✓' : part.kind === 'day' ? part.day : part.num}
      </span>
      <span className="min-w-0">
        <span className={`block text-[10.5px] font-semibold ${active ? 'text-brand-600' : 'text-slate-400'}`}>
          {dayLabel}
        </span>
        <span
          className={`block text-[13px] leading-snug ${
            active ? 'font-semibold text-brand-900' : 'text-slate-600'
          }`}
        >
          {part.title}
        </span>
      </span>
    </Link>
  )
}
