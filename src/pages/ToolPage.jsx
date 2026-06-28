import { Link, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { getTool, toolMenu } from '../data/tools'

const HERO = {
  signal: 'from-signal-400 to-signal-500 text-brand-950',
  emerald: 'from-emerald-500 to-emerald-600 text-white',
  violet: 'from-violet-500 to-violet-600 text-white',
  sky: 'from-sky-500 to-sky-600 text-white',
  brand: 'from-brand-700 to-brand-800 text-white',
  rose: 'from-rose-500 to-rose-600 text-white',
}

function ToolChips({ activeId }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {toolMenu.map((t) => (
        <Link
          key={t.id}
          to={`/tools/${t.id}`}
          className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
            t.id === activeId
              ? 'bg-brand-800 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.emoji} {t.name}
        </Link>
      ))}
    </div>
  )
}

function Card({ title, icon, children }) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-[17px] font-extrabold text-brand-900">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function ToolPage() {
  const { toolId } = useParams()
  const tool = getTool(toolId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [toolId])

  if (!tool) return <Navigate to="/tools" replace />

  const isPrompt = tool.id === 'prompt'

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <Link to="/" className="hover:text-brand-700">홈</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-brand-700">AI 도구 가이드</Link>
          <span>/</span>
          <span className="text-slate-600">{tool.name}</span>
        </div>

        <ToolChips activeId={tool.id} />

        {/* Hero */}
        <div className={`mb-7 rounded-2xl bg-gradient-to-br p-7 shadow-sm ${HERO[tool.color]}`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{tool.emoji}</span>
            <div>
              <h1 className="text-[28px] font-extrabold leading-none">{tool.name}</h1>
              {tool.vendor && <div className="mt-1.5 text-[13px] font-medium opacity-85">{tool.vendor}</div>}
            </div>
          </div>
          <p className="mt-4 text-[15px] font-semibold opacity-95">{tool.tagline}</p>
        </div>

        {/* 개요 */}
        <Card title="개요" icon="📖">
          <p className="text-[15px] leading-[1.8] text-slate-700">{tool.overview}</p>
        </Card>

        {isPrompt ? (
          <>
            <Card title="좋은 프롬프트의 5대 원칙" icon="🎯">
              <div className="space-y-3">
                {tool.principles.map((p, i) => (
                  <div key={i} className="rounded-xl bg-slate-50 p-4">
                    <div className="text-[14.5px] font-bold text-brand-800">{p.title}</div>
                    <div className="mt-1 text-[14px] leading-relaxed text-slate-600">{p.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="실전 프롬프트 패턴" icon="🧩">
              <div className="space-y-5">
                {tool.patterns.map((p, i) => (
                  <div key={i}>
                    <div className="mb-2 text-[14.5px] font-bold text-brand-800">{p.name}</div>
                    <div className="mb-2 rounded-xl border border-slate-700 bg-slate-900 p-4">
                      <div className="mb-1 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                        템플릿
                      </div>
                      <pre className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-slate-100">
                        {p.template}
                      </pre>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <div className="mb-1 text-[11px] font-bold text-emerald-700">건설기계 예시</div>
                      <p className="text-[13.5px] leading-relaxed text-slate-700">{p.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="건설기계 도메인 유의점" icon="⚠️">
              <p className="rounded-xl bg-rose-50 p-4 text-[14px] leading-relaxed text-slate-700">
                {tool.domainNote}
              </p>
            </Card>

            <Card title="도구별 프롬프트 팁" icon="🛠️">
              <ul className="space-y-2">
                {tool.toolTips.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] text-slate-700">
                    <span className="shrink-0 rounded-md bg-brand-100 px-2 py-0.5 text-[11.5px] font-bold text-brand-700">
                      {t.tool}
                    </span>
                    <span>{t.tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Card title="강점" icon="💪">
                <ul className="space-y-2">
                  {tool.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="요금제" icon="💳">
                <div className="space-y-2.5">
                  {tool.plans.map((p, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3">
                      <div>
                        <div className="text-[13.5px] font-bold text-brand-800">{p.name}</div>
                        <div className="text-[12.5px] text-slate-500">{p.desc}</div>
                      </div>
                      <div className="shrink-0 text-[12.5px] font-bold text-brand-700">{p.price}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card title="핵심 기능" icon="✨">
              <div className="grid gap-3 sm:grid-cols-2">
                {tool.features.map((f, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="text-[14px] font-bold text-brand-800">{f.title}</div>
                    <div className="mt-1 text-[13px] leading-relaxed text-slate-600">{f.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="건설기계 실무 활용" icon="🏗️">
              <div className="space-y-3">
                {tool.useCases.map((u, i) => (
                  <div key={i} className="flex gap-3 rounded-xl bg-brand-50/60 p-4">
                    <span className="shrink-0 text-[13px] font-extrabold text-brand-700">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="text-[14px] font-bold text-brand-900">{u.title}</div>
                      <div className="mt-0.5 text-[13.5px] leading-relaxed text-slate-600">{u.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="활용 팁" icon="💡">
              <ul className="space-y-2">
                {tool.promptTips.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </>
        )}

        {/* 링크 + 교재 연계 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="공식 링크" icon="🔗">
            <div className="flex flex-wrap gap-2">
              {tool.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-semibold text-brand-700 transition hover:bg-slate-50"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </Card>

          <Card title="교재에서 더 배우기" icon="📚">
            <div className="space-y-2">
              {tool.courseRefs.map((c, i) => (
                <Link
                  key={i}
                  to={c.to}
                  className="block rounded-lg bg-slate-50 px-3 py-2.5 text-[13.5px] font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  📖 {c.label} →
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
