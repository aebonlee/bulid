import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Icon from '../components/Icon'
import { labsByVol } from '../data/labs'

const VOLS = [
  { id: 'vol1', short: '제1권' },
  { id: 'vol2', short: '제2권' },
]
const LEVEL_STYLE = {
  입문: 'bg-emerald-100 text-emerald-700',
  실전: 'bg-sky-100 text-sky-700',
  심화: 'bg-violet-100 text-violet-700',
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      /* ignore */
    }
  }
  return (
    <button
      onClick={copy}
      className={`shrink-0 rounded-lg px-2.5 py-1 text-[11.5px] font-bold transition ${
        done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
      }`}
    >
      <Icon name={done ? 'fa-solid fa-check' : 'fa-regular fa-copy'} /> {done ? '복사됨' : '복사'}
    </button>
  )
}

export default function Labs() {
  const { volId = 'vol1' } = useParams()
  const data = labsByVol[volId]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [volId])

  if (!data) return <Navigate to="/labs/vol1" replace />

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-5 py-8">
        <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <Link to="/" className="hover:text-brand-700">홈</Link>
          <span>/</span>
          <span className="text-slate-600">실습 · 따라하기</span>
        </div>

        {/* 권 토글 */}
        <div className="mb-6 grid max-w-xs grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
          {VOLS.map((v) => (
            <Link
              key={v.id}
              to={`/labs/${v.id}`}
              className={`rounded-lg py-2 text-center text-[12.5px] font-bold transition ${
                v.id === volId ? 'bg-brand-800 text-white shadow' : 'text-slate-500 hover:bg-white'
              }`}
            >
              {v.short}
            </Link>
          ))}
        </div>

        {/* Hero */}
        <div className="mb-7 rounded-2xl bg-brand-900 p-7 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-signal-300">
            <Icon name="fa-solid fa-flask-vial" /> 실습 · 따라하기
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-snug">{data.title}</h1>
          <p className="mt-2 text-[14px] text-brand-100">
            교재가 다루는 실습을 과목(DAY)별로, 단계(Step)에 따라 그대로 따라 해보세요. 프롬프트는 복사해 바로 사용할 수 있어요.
          </p>
        </div>

        {/* DAY별 실습 */}
        <div className="space-y-8">
          {data.days.map((d) => (
            <section key={d.day} id={`day-${d.day}`} className="scroll-mt-20">
              <div className="mb-3 flex items-center gap-2.5 border-l-4 border-signal-400 pl-3">
                <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-800 text-white">
                  <span className="text-[8px] font-semibold leading-none">DAY</span>
                  <span className="text-[15px] font-extrabold leading-none">{d.day}</span>
                </span>
                <h2 className="text-[18px] font-extrabold text-brand-900">{d.subject}</h2>
              </div>

              <div className="space-y-4">
                {d.labs.map((lab, li) => (
                  <div key={li} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3.5">
                      <span className="shrink-0 rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700">{lab.code}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-extrabold text-brand-900">{lab.title}</div>
                        <div className="mt-0.5 text-[12.5px] text-slate-500">{lab.goal}</div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {lab.level && (
                          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${LEVEL_STYLE[lab.level] || 'bg-slate-200 text-slate-600'}`}>{lab.level}</span>
                        )}
                        <span className="text-[11px] text-slate-400">{lab.tool}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <ol className="space-y-4">
                        {lab.steps.map((s, si) => (
                          <li key={si} className="relative border-l-2 border-brand-100 pl-5">
                            <span className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-[10.5px] font-bold text-white">
                              {si + 1}
                            </span>
                            <p className="text-[14px] font-semibold leading-relaxed text-slate-800">{s.instruction}</p>
                            {s.prompt && (
                              <div className="mt-2 rounded-xl border border-slate-700 bg-slate-900 p-3.5">
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">붙여넣을 프롬프트</span>
                                  <CopyButton text={s.prompt} />
                                </div>
                                <pre className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-slate-100">{s.prompt}</pre>
                              </div>
                            )}
                            {s.expected && (
                              <div className="mt-2 flex items-start gap-2 rounded-lg bg-emerald-50 p-2.5 text-[12.5px] text-slate-700">
                                <Icon name="fa-solid fa-arrow-right" className="mt-0.5 shrink-0 text-emerald-500" />
                                <span><b className="text-emerald-700">결과</b> {s.expected}</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>

                      {lab.deliverable && (
                        <div className="mt-4 flex items-start gap-2 rounded-lg bg-signal-50 p-3 text-[13px] text-slate-700">
                          <Icon name="fa-solid fa-box-archive" className="mt-0.5 shrink-0 text-signal-600" />
                          <span><b className="text-signal-700">산출물</b> {lab.deliverable}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-slate-100 px-4 py-3 text-[12.5px] leading-relaxed text-slate-500">
          ※ 더 많은 프롬프트는 <Link to="/tools/prompt/library" className="font-semibold text-brand-700 hover:underline">과목별 프롬프트 예제</Link>와
          {' '}<Link to="/appendix" className="font-semibold text-brand-700 hover:underline">부록(업무별 프롬프트)</Link>에서 볼 수 있어요.
        </div>
      </div>
    </Layout>
  )
}
