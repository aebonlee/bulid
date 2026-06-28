import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { promptGuide } from '../data/tools'
import {
  scoreCriteria,
  gradeTable,
  GRADE_COLOR,
  techniques,
  scoreSample,
  scenarios,
  evaluatePrompt,
} from '../data/promptLab'

const TABS = [
  { id: 'learn', label: '학습하기', emoji: '📘' },
  { id: 'pattern', label: '실전 패턴', emoji: '🧩' },
  { id: 'practice', label: '평가 실습', emoji: '🎯' },
]

export default function PromptLab() {
  const [tab, setTab] = useState('learn')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <Link to="/" className="hover:text-brand-700">홈</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-brand-700">AI 도구 가이드</Link>
          <span>/</span>
          <span className="text-slate-600">프롬프트</span>
        </div>

        {/* Hero */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-signal-400 to-signal-500 p-7 text-brand-950 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-5xl">✍️</span>
            <div>
              <h1 className="text-[28px] font-extrabold leading-none">프롬프트 학습 &amp; 평가</h1>
              <div className="mt-1.5 text-[13px] font-semibold opacity-80">PromptLab</div>
            </div>
          </div>
          <p className="mt-4 text-[15px] font-semibold opacity-95">
            좋은 프롬프트의 5요소를 배우고, 건설기계 직무 시나리오로 직접 써서 점수를 받아보세요.
          </p>
        </div>

        {/* 탭 */}
        <div className="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg py-2.5 text-[13.5px] font-bold transition ${
                tab === t.id ? 'bg-white text-brand-800 shadow' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {tab === 'learn' && <LearnTab />}
        {tab === 'pattern' && <PatternTab />}
        {tab === 'practice' && <PracticeTab />}
      </div>
    </Layout>
  )
}

function Card({ title, icon, children, className = '' }) {
  return (
    <section className={`mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      {title && (
        <h2 className="mb-4 flex items-center gap-2 text-[17px] font-extrabold text-brand-900">
          <span>{icon}</span>
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

/* ---------------- 학습하기 ---------------- */
function LearnTab() {
  return (
    <>
      <Card title="좋은 프롬프트의 5요소" icon="🎯">
        <p className="mb-4 text-[14px] text-slate-600">
          프롬프트 품질을 객관적으로 보는 5대 기준입니다. 각 20점, 합계 100점 — 아래 ‘평가 실습’에서 이 기준으로 채점됩니다.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {scoreCriteria.map((c) => (
            <div key={c.key} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[15px] font-bold text-brand-800">
                  <span className="text-lg">{c.emoji}</span>
                  {c.key}
                  <span className="rounded bg-brand-100 px-1.5 text-[11px] font-mono font-bold text-brand-700">
                    {c.code}
                  </span>
                </span>
                <span className="text-[12px] font-bold text-signal-600">{c.max}점</span>
              </div>
              <p className="text-[13px] font-semibold text-slate-700">{c.desc}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{c.detail}</p>
            </div>
          ))}
        </div>

        {/* 등급표 */}
        <div className="mt-5 space-y-2">
          {gradeTable.map((g) => (
            <div key={g.grade} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[14px] font-extrabold text-white"
                style={{ background: GRADE_COLOR[g.grade] }}
              >
                {g.grade}
              </span>
              <div className="flex flex-1 items-baseline gap-2">
                <strong className="text-[13.5px] text-brand-900">{g.label}</strong>
                <span className="font-mono text-[12px] text-slate-400">{g.range}</span>
              </div>
              <span className="text-[12.5px] text-slate-500">{g.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="점수를 올리는 5가지 기법" icon="🛠️">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((t) => (
            <div key={t.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-2xl">{t.emoji}</div>
              <div className="mt-1.5 text-[14px] font-bold text-brand-800">{t.title}</div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="개선 전 → 후 (채점 예시)" icon="📈">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge grade={scoreSample.before.grade} />
              <span className="text-[13px] text-slate-500">
                개선 전 · <b className="font-mono text-rose-600">{scoreSample.before.total}/100</b>
              </span>
            </div>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-rose-200 bg-rose-50 p-4 font-mono text-[12.5px] leading-relaxed text-slate-700">
              {scoreSample.before.prompt}
            </pre>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge grade={scoreSample.after.grade} />
              <span className="text-[13px] text-slate-500">
                개선 후 · <b className="font-mono text-emerald-600">{scoreSample.after.total}/100</b>
              </span>
            </div>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-mono text-[12.5px] leading-relaxed text-slate-700">
              {scoreSample.after.prompt}
            </pre>
          </div>
        </div>
      </Card>
    </>
  )
}

/* ---------------- 실전 패턴 ---------------- */
function PatternTab() {
  return (
    <>
      <Card title="실전 프롬프트 패턴" icon="🧩">
        <div className="space-y-5">
          {promptGuide.patterns.map((p, i) => (
            <div key={i}>
              <div className="mb-2 text-[14.5px] font-bold text-brand-800">{p.name}</div>
              <div className="mb-2 rounded-xl border border-slate-700 bg-slate-900 p-4">
                <div className="mb-1 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">템플릿</div>
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
        <p className="rounded-xl bg-rose-50 p-4 text-[14px] leading-relaxed text-slate-700">{promptGuide.domainNote}</p>
      </Card>

      <Card title="도구별 프롬프트 팁" icon="🧰">
        <ul className="space-y-2">
          {promptGuide.toolTips.map((t, i) => (
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
  )
}

/* ---------------- 평가 실습 ---------------- */
function PracticeTab() {
  const [scenario, setScenario] = useState(scenarios[0])
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const pick = (s) => {
    setScenario(s)
    setInput('')
    setResult(null)
    setShowAnswer(false)
  }
  const evaluate = () => {
    if (input.trim()) setResult(evaluatePrompt(input, scenario))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
      {/* 시나리오 목록 */}
      <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">시나리오</p>
        <div className="space-y-1">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => pick(s)}
              className={`block w-full rounded-lg px-3 py-2 text-left transition ${
                scenario.id === s.id ? 'bg-brand-50 ring-1 ring-brand-200' : 'hover:bg-slate-50'
              }`}
            >
              <span className="block text-[10.5px] font-semibold text-slate-400">{s.category}</span>
              <span
                className={`block text-[13px] font-semibold ${
                  scenario.id === s.id ? 'text-brand-900' : 'text-slate-600'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* 작성 + 평가 */}
      <div>
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-[16px] font-extrabold text-brand-900">{scenario.title}</h3>
          <p className="mt-2 text-[13.5px] text-slate-600">
            <b className="text-brand-700">상황</b> {scenario.situation}
          </p>
          <p className="mt-1 text-[13.5px] text-slate-600">
            <b className="text-brand-700">목표</b> {scenario.goal}
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResult(null)
          }}
          rows={10}
          placeholder="여기에 프롬프트를 작성하세요. (역할·맥락·과제·제약·출력형식을 모두 담아보세요)"
          className="w-full resize-y rounded-xl border border-slate-300 p-4 font-mono text-[13px] leading-relaxed text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[12.5px] text-slate-400">{input.trim().length}자</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnswer((v) => !v)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {showAnswer ? '모범답안 숨기기' : '모범답안 보기'}
            </button>
            <button
              onClick={evaluate}
              disabled={!input.trim()}
              className="rounded-lg bg-brand-800 px-4 py-2 text-[13px] font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⚡ 평가받기
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-extrabold text-white"
                style={{ background: GRADE_COLOR[result.grade] }}
              >
                {result.grade}
              </span>
              <div>
                <div className="font-mono text-[26px] font-extrabold leading-none text-brand-900">
                  {result.total}
                  <span className="text-[15px] text-slate-400"> / 100</span>
                </div>
                <div className="mt-1 text-[12.5px] text-slate-500">5요소 종합 점수</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {scoreCriteria.map((c) => {
                const v = result.scores[c.key]
                return (
                  <div key={c.key} className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-[12.5px] font-semibold text-slate-600">{c.key}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${(v / 20) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right font-mono text-[12px] text-slate-500">{v}/20</span>
                  </div>
                )
              })}
            </div>

            {result.feedback.length > 0 && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4">
                <strong className="text-[13px] text-amber-800">💬 개선 피드백</strong>
                <ul className="mt-1.5 space-y-1">
                  {result.feedback.map((f, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-slate-700">
                      <span className="text-amber-500">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {showAnswer && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="mb-2 text-[13px] font-bold text-emerald-700">✅ 모범 프롬프트 예시</p>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-emerald-200 bg-white p-4 font-mono text-[12.5px] leading-relaxed text-slate-700">
              {scenario.exampleAnswer}
            </pre>
          </div>
        )}

        <p className="mt-4 font-mono text-[11.5px] text-slate-400">
          ⓘ 점수는 키워드·구조 기반 자동 추정입니다. 실제 결과는 ChatGPT·Claude 등에서 직접 받아보세요.
        </p>
      </div>
    </div>
  )
}

function Badge({ grade }) {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-extrabold text-white"
      style={{ background: GRADE_COLOR[grade] }}
    >
      {grade}
    </span>
  )
}
