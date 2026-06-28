import { useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import BlockRenderer from '../components/BlockRenderer'
import Icon from '../components/Icon'
import { getVolume, getPart } from '../data/courses'
import { dayPlans } from '../data/dayplans'
import { useProgress } from '../context/ProgressContext'

const BLOCK_STYLE = {
  도입: { dot: 'bg-slate-400', tag: 'bg-slate-100 text-slate-600' },
  학습: { dot: 'bg-sky-500', tag: 'bg-sky-100 text-sky-700' },
  실습: { dot: 'bg-signal-500', tag: 'bg-signal-100 text-signal-700' },
  점심: { dot: 'bg-slate-300', tag: 'bg-slate-100 text-slate-400' },
  정리: { dot: 'bg-emerald-500', tag: 'bg-emerald-100 text-emerald-700' },
}

function DayPlan({ plan }) {
  if (!plan) return null
  return (
    <details open className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center gap-3 bg-brand-50 px-5 py-4 hover:bg-brand-100/60">
        <Icon name="fa-solid fa-clock" className="text-brand-700" />
        <div className="flex-1">
          <div className="text-[15px] font-extrabold text-brand-900">DAY {plan.day} · 8시간 교육 운영안</div>
          <div className="text-[12px] text-slate-500">학습과 실습을 병행하는 하루 일정 (09:00–18:00 기준, 운영에 따라 조정)</div>
        </div>
        <span className="text-slate-400 transition group-open:rotate-180">▾</span>
      </summary>

      <div className="divide-y divide-slate-100 px-2 py-2">
        {plan.blocks.map((b, i) => {
          const st = BLOCK_STYLE[b.type] || BLOCK_STYLE['학습']
          return (
            <div key={i} className="flex items-start gap-3 px-3 py-2.5">
              <div className="w-[92px] shrink-0 pt-0.5 font-mono text-[12px] font-semibold text-slate-500">
                {b.start}–{b.end}
              </div>
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${st.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[10.5px] font-bold ${st.tag}`}>{b.type}</span>
                  <span className="text-[14px] font-bold text-brand-900">{b.title}</span>
                  {b.star && <span className="text-[11px] font-bold text-signal-600">★ BIG WIN</span>}
                </div>
                {b.desc && <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">{b.desc}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </details>
  )
}

export default function PartPage() {
  const { volId, partNum } = useParams()
  const vol = getVolume(volId)
  const part = getPart(volId, partNum)
  const { isDone, setDone } = useProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [volId, partNum])

  const { prev, next } = useMemo(() => {
    if (!vol || !part) return {}
    const idx = vol.parts.findIndex((p) => String(p.num) === String(part.num))
    return { prev: vol.parts[idx - 1], next: vol.parts[idx + 1] }
  }, [vol, part])

  if (!vol || !part) return <Navigate to="/" replace />

  const done = isDone(vol.id, part.num)
  const secId = (n) => `sec-${n}`

  return (
    <Layout>
      <div className="mx-auto flex max-w-screen-xl gap-8 px-5 py-8">
        <article className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
            <Link to="/" className="hover:text-brand-700">홈</Link>
            <span>/</span>
            <Link to={`/vol/${vol.id}`} className="hover:text-brand-700">{vol.label}</Link>
            <span>/</span>
            <span className="text-slate-600">
              {part.kind === 'day' ? `DAY ${part.day}` : `PART ${String(part.num).padStart(2, '0')}`}
            </span>
          </div>

          <div className="mb-7 border-b border-slate-200 pb-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-bold text-brand-700">
              {part.kind === 'day' ? (
                <><Icon name="fa-solid fa-calendar-day" /> DAY {part.day} · PART {String(part.num).padStart(2, '0')}</>
              ) : (
                <><Icon name="fa-solid fa-paperclip" /> PART {String(part.num).padStart(2, '0')} · 부록</>
              )}
            </div>
            <h1 className="text-[26px] font-extrabold leading-tight text-brand-900">{part.title}</h1>
          </div>

          {part.kind === 'day' && <DayPlan plan={dayPlans[vol.id]?.[String(part.num)]} />}

          {part.intro?.length > 0 && (
            <div className="mb-8">
              <BlockRenderer blocks={part.intro} />
            </div>
          )}

          {part.sections.map((sec) => (
            <section key={sec.num} id={secId(sec.num)} className="mb-10 scroll-mt-20">
              <h2 className="mb-4 flex items-center gap-2.5 border-l-4 border-signal-400 pl-3 text-[20px] font-extrabold text-brand-900">
                {sec.title}
              </h2>
              <BlockRenderer blocks={sec.blocks} />
              {sec.subsections.map((ss) => (
                <div key={ss.num} className="mt-6">
                  <h3 className="mb-3 text-[16.5px] font-bold text-brand-800">{ss.title}</h3>
                  <BlockRenderer blocks={ss.blocks} />
                </div>
              ))}
            </section>
          ))}

          {part.kind === 'day' && (
            <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="mb-3 text-[14px] text-slate-500">이 DAY의 학습을 마치셨나요?</p>
              <button
                onClick={() => setDone(vol.id, part.num, !done)}
                className={`rounded-xl px-6 py-3 text-[14.5px] font-bold transition ${
                  done
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-brand-800 text-white hover:bg-brand-700'
                }`}
              >
                {done ? <><Icon name="fa-solid fa-check" /> 학습 완료됨 (취소하기)</> : `DAY ${part.day} 학습 완료 표시`}
              </button>
            </div>
          )}

          <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6">
            {prev ? (
              <Link
                to={`/vol/${vol.id}/part/${prev.num}`}
                className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-brand-300 hover:bg-slate-50"
              >
                <div className="text-[11.5px] text-slate-400">← 이전</div>
                <div className="truncate text-[13.5px] font-semibold text-brand-800">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/vol/${vol.id}/part/${next.num}`}
                className="rounded-xl border border-slate-200 p-4 text-right transition hover:border-brand-300 hover:bg-slate-50"
              >
                <div className="text-[11.5px] text-slate-400">다음 →</div>
                <div className="truncate text-[13.5px] font-semibold text-brand-800">{next.title}</div>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>

        {part.sections.length > 0 && (
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-20">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                이 페이지 목차
              </div>
              <nav className="space-y-1 border-l border-slate-200">
                {part.sections.map((sec) => (
                  <a
                    key={sec.num}
                    href={`#${secId(sec.num)}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(secId(sec.num))?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-[12.5px] leading-snug text-slate-500 transition hover:border-brand-400 hover:text-brand-800"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </Layout>
  )
}
