import { Link, useParams, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getVolume, partStats } from '../data/courses'
import { useProgress } from '../context/ProgressContext'
import Icon from '../components/Icon'

export default function VolumeOverview() {
  const { volId } = useParams()
  const vol = getVolume(volId)
  const { isDone, countDone } = useProgress()

  if (!vol) return <Navigate to="/" replace />

  const days = vol.parts.filter((p) => p.kind === 'day')
  const appendix = vol.parts.filter((p) => p.kind !== 'day')
  const done = countDone(vol.id, days.map((d) => d.num))

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-8">
        {/* 헤더 */}
        <div className="rounded-2xl bg-brand-800 p-7 text-white">
          <div className="text-[12.5px] font-bold text-signal-300">{vol.label}</div>
          <h1 className="mt-1 text-2xl font-extrabold leading-snug">{vol.title}</h1>
          <div className="mt-1 text-[14px] text-brand-100">{vol.subtitle}</div>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-brand-100/90">{vol.desc}</p>

          <div className="mt-5 max-w-md">
            <div className="mb-1 flex justify-between text-[12px] text-brand-200">
              <span>학습 진도</span>
              <span>{done}/{days.length} DAY 완료</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-signal-400 transition-all"
                style={{ width: `${(done / days.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* DAY 목록 */}
        <h2 className="mb-3 mt-9 text-lg font-bold text-brand-900">본 과정 · DAY 1–6</h2>
        <div className="space-y-3">
          {days.map((p) => {
            const st = partStats(p)
            const d = isDone(vol.id, p.num)
            return (
              <Link
                key={p.num}
                to={`/vol/${vol.id}/part/${p.num}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-white ${
                    d ? 'bg-emerald-500' : 'bg-brand-800'
                  }`}
                >
                  {d ? (
                    <span className="text-lg"><Icon name="fa-solid fa-check" /></span>
                  ) : (
                    <>
                      <span className="text-[9px] font-semibold leading-none">DAY</span>
                      <span className="text-lg font-extrabold leading-none">{p.day}</span>
                    </>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-slate-400">
                    PART {String(p.num).padStart(2, '0')}
                  </div>
                  <div className="truncate text-[15px] font-bold text-brand-900">{p.title}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge>{p.sections.length}개 중단원</Badge>
                    {st.exercises > 0 && <Badge tone="signal">실습 {st.exercises}</Badge>}
                    {st.tables > 0 && <Badge tone="sky">표 {st.tables}</Badge>}
                    {st.figures > 0 && <Badge tone="violet">그림 {st.figures}</Badge>}
                  </div>
                </div>
                <span className="shrink-0 text-slate-300">›</span>
              </Link>
            )
          })}
        </div>

        {/* 부록 */}
        {appendix.length > 0 && (
          <>
            <h2 className="mb-3 mt-9 text-lg font-bold text-brand-900">부록</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {appendix.map((p) => (
                <Link
                  key={p.num}
                  to={`/vol/${vol.id}/part/${p.num}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md"
                >
                  <div className="text-[11px] font-bold text-slate-400">
                    PART {String(p.num).padStart(2, '0')}
                  </div>
                  <div className="text-[14px] font-bold text-brand-900">{p.title}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

function Badge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-500',
    signal: 'bg-signal-100 text-signal-700',
    sky: 'bg-sky-100 text-sky-700',
    violet: 'bg-violet-100 text-violet-700',
  }
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}
