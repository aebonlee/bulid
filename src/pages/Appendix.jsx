import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Icon from '../components/Icon'
import { appendix, appendixIntro } from '../data/appendix'

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

export default function Appendix() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <Link to="/" className="hover:text-brand-700">홈</Link>
          <span>/</span>
          <span className="text-slate-600">부록</span>
        </div>

        {/* Hero */}
        <div className="mb-6 rounded-2xl bg-brand-900 p-7 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-signal-300">
            <Icon name="fa-solid fa-book-bookmark" /> 부록
          </div>
          <h1 className="mt-3 text-2xl font-extrabold">{appendixIntro.title}</h1>
          <p className="mt-2 text-[14px] text-brand-100">{appendixIntro.lead}</p>
        </div>

        {/* 사용법 */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-[16px] font-extrabold text-brand-900">
            <Icon name="fa-solid fa-circle-play" className="text-brand-600" /> 처음이세요? 이렇게 쓰면 돼요
          </h2>
          <ol className="space-y-2">
            {appendixIntro.howto.map((h, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-800 text-[11px] font-bold text-white">{i + 1}</span>
                <span>{h}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 업무별 프롬프트 */}
        {appendix.map((cat) => (
          <section key={cat.id} id={cat.id} className="mb-8 scroll-mt-20">
            <h2 className="mb-3 flex items-center gap-2.5 border-l-4 border-signal-400 pl-3 text-[19px] font-extrabold text-brand-900">
              <Icon name={cat.icon} className="text-brand-600" />
              {cat.category}
            </h2>

            <div className="space-y-4">
              {cat.items.map((it, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 bg-slate-50 px-5 py-3.5">
                    <div className="text-[15px] font-extrabold text-brand-900">{it.task}</div>
                    <div className="mt-1 flex items-start gap-1.5 text-[12.5px] text-slate-500">
                      <Icon name="fa-solid fa-circle-question" className="mt-0.5 shrink-0 text-slate-400" />
                      <span>{it.when}</span>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    {/* 따라하기 */}
                    <div>
                      <div className="mb-1.5 text-[12px] font-bold text-slate-500">따라 하기</div>
                      <ol className="space-y-1">
                        {it.steps.map((s, si) => (
                          <li key={si} className="flex gap-2 text-[13.5px] leading-relaxed text-slate-700">
                            <span className="font-mono text-[11px] font-bold text-brand-500">{si + 1}.</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 복사용 프롬프트 */}
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">복사용 프롬프트</span>
                        <CopyButton text={it.prompt} />
                      </div>
                      <pre className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-slate-100">{it.prompt}</pre>
                    </div>

                    {/* 빈칸 채우는 법 */}
                    {it.fill?.length > 0 && (
                      <div className="rounded-xl bg-amber-50 p-4">
                        <div className="mb-2 text-[12px] font-bold text-amber-800">
                          <Icon name="fa-solid fa-pen" /> 대괄호 [ ] 채우는 법
                        </div>
                        <div className="space-y-1.5">
                          {it.fill.map((f, fi) => (
                            <div key={fi} className="flex flex-wrap items-baseline gap-2 text-[13px]">
                              <span className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px] font-bold text-brand-700 ring-1 ring-amber-200">{f.blank}</span>
                              <span className="text-slate-400">→ 예:</span>
                              <span className="font-medium text-slate-700">{f.example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 결과 + 팁 */}
                    <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-[13px] leading-relaxed text-slate-700">
                      <Icon name="fa-solid fa-arrow-right" className="mt-0.5 shrink-0 text-emerald-500" />
                      <span><b className="text-emerald-700">이런 결과</b> {it.result}</span>
                    </div>
                    {it.tip && (
                      <div className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
                        <Icon name="fa-solid fa-lightbulb" className="mt-0.5 shrink-0 text-signal-500" />
                        <span>{it.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-xl bg-slate-100 px-4 py-3 text-[12px] leading-relaxed text-slate-500">
          ※ 더 자세한 프롬프트 학습은 <Link to="/tools/prompt/learn" className="font-semibold text-brand-700 hover:underline">프롬프트학습</Link>에서,
          과목별 예제는 <Link to="/tools/prompt/library" className="font-semibold text-brand-700 hover:underline">과목별 프롬프트 예제</Link>에서 볼 수 있어요.
        </div>
      </div>
    </Layout>
  )
}
