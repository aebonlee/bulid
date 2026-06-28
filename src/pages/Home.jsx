import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { volumes, partStats } from '../data/courses'
import { tools } from '../data/tools'
import Icon from '../components/Icon'
import { useProgress } from '../context/ProgressContext'

// 히어로 우측에 둥둥 떠다니는 AI 툴 로고 배치
const FLOATERS = [
  { id: 'chatgpt', cls: 'right-[26%] top-[14%] h-16 w-16 text-2xl', dur: '6s', delay: '0s', accent: 'text-emerald-300' },
  { id: 'claude', cls: 'right-[8%] top-[22%] h-20 w-20 text-3xl', dur: '7s', delay: '.6s', accent: 'text-violet-300' },
  { id: 'gemini', cls: 'right-[34%] top-[44%] h-14 w-14 text-xl', dur: '5.5s', delay: '1.1s', accent: 'text-sky-300' },
  { id: 'genspark', cls: 'right-[18%] top-[60%] h-16 w-16 text-2xl', dur: '6.5s', delay: '.3s', accent: 'text-signal-300' },
  { id: 'perplexity', cls: 'right-[6%] top-[64%] h-14 w-14 text-xl', dur: '7.5s', delay: '1.4s', accent: 'text-rose-300' },
]

// 배경용 큰 SVG 글자 워터마크 ("AI" / "AX" / "Bulid" 등) — 글자 수에 맞춰 폭 자동 조정
function AiMark({ id, text = 'AI', from = '#fbbf24', to = '#7ea4d6', className = '' }) {
  const w = Math.max(360, text.length * 118)
  return (
    <svg viewBox={`0 0 ${w} 180`} className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <text
        x={w / 2}
        y="138"
        textAnchor="middle"
        fontSize="150"
        fontWeight="900"
        letterSpacing="4"
        fontFamily="Pretendard, system-ui, sans-serif"
        fill={`url(#${id})`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
      >
        {text}
      </text>
    </svg>
  )
}

export default function Home() {
  const { countDone } = useProgress()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-20" style={heroPattern} />
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-signal-400/20 blur-3xl" />

        {/* 배경 "AI" / "AX" 워터마크 (lg 이상) — 떠다니는 로고 뒤 */}
        <div className="pointer-events-none absolute inset-y-0 right-[6%] hidden w-[36%] items-center justify-center lg:flex" aria-hidden="true">
          <AiMark id="aimark-desktop" text="AI" className="floaty h-[52%] w-full opacity-[0.14]" />
        </div>
        <div
          className="floaty pointer-events-none absolute right-[30%] top-[8%] hidden w-[20%] lg:block"
          style={{ animationDuration: '8s', animationDelay: '1.2s' }}
          aria-hidden="true"
        >
          <AiMark id="axmark-desktop" text="AX" from="#fcd34d" to="#4e7fc1" className="h-auto w-full opacity-[0.12]" />
        </div>
        <div
          className="floaty pointer-events-none absolute right-[22%] top-[62%] hidden w-[30%] lg:block"
          style={{ animationDuration: '9s', animationDelay: '.8s' }}
          aria-hidden="true"
        >
          <AiMark id="bulidmark-desktop" text="Bulid" from="#aec7e7" to="#fbbf24" className="h-auto w-full opacity-[0.10]" />
        </div>

        {/* 떠다니는 AI 툴 로고 (lg 이상) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {FLOATERS.map((f) => {
            const tool = tools.find((t) => t.id === f.id)
            if (!tool) return null
            return (
              <div
                key={f.id}
                className={`floaty absolute flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm ${f.cls} ${f.accent}`}
                style={{ animationDuration: f.dur, animationDelay: f.delay }}
                title={tool.name}
              >
                <Icon name={tool.icon} />
                <span className="absolute -bottom-5 whitespace-nowrap text-[10.5px] font-semibold text-brand-100/70">
                  {tool.name}
                </span>
              </div>
            )
          })}
        </div>

        <div className="relative mx-auto max-w-screen-xl px-5 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-signal-300 ring-1 ring-white/15">
            <Icon name="fa-solid fa-helmet-safety" /> 2026년 산업전문인력 AI역량강화 (건설기계)
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[42px]">
            건설기계산업 <span className="text-signal-400">AX 전환</span> 실행역량 강화
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-brand-100">
            생성형 AI로 업무를 자동화하고, 현장의 암묵지를 데이터 자산으로 전환합니다.
            <br className="hidden sm:block" />
            제1권·제2권 각 6일, 실무 직무별 프로토타입까지 직접 완성하는 과정입니다.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/vol/vol1"
              className="rounded-xl bg-signal-400 px-5 py-3 text-[14.5px] font-bold text-brand-950 shadow-lg transition hover:bg-signal-300"
            >
              제1권 시작하기 →
            </Link>
            <Link
              to="/vol/vol2"
              className="rounded-xl bg-white/10 px-5 py-3 text-[14.5px] font-bold text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              제2권 둘러보기
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-center">
            <Stat n="2권" l="교재" />
            <Stat n="12일" l="총 과정 (6일×2)" />
            <Stat n="6직무" l="직무별 프로토타입" />
            <Stat n="4대" l="생성형 AI 도구" />
          </div>

          {/* 모바일 전용 AI 툴 로고 행 (배경 "AI" 워터마크 위) */}
          <div className="relative mt-9 lg:hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between" aria-hidden="true">
              <AiMark id="aimark-mobile" text="AI" className="h-20 w-auto opacity-[0.13]" />
              <AiMark id="bulidmark-mobile" text="Bulid" from="#aec7e7" to="#fbbf24" className="h-12 w-auto opacity-[0.10]" />
              <AiMark id="axmark-mobile" text="AX" from="#fcd34d" to="#4e7fc1" className="h-20 w-auto opacity-[0.11]" />
            </div>
            <div className="relative flex flex-wrap gap-3">
              {FLOATERS.map((f, i) => {
                const tool = tools.find((t) => t.id === f.id)
                if (!tool) return null
                return (
                  <div
                    key={f.id}
                    className={`floaty flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg ring-1 ring-white/20 ${f.accent}`}
                    style={{ animationDuration: f.dur, animationDelay: `${i * 0.25}s` }}
                    title={tool.name}
                  >
                    <Icon name={tool.icon} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 권 카드 */}
      <section className="mx-auto max-w-screen-xl px-5 py-14">
        <h2 className="mb-2 text-xl font-bold text-brand-900">과정 구성</h2>
        <p className="mb-7 text-[14px] text-slate-500">
          두 권은 독립적으로 학습할 수 있으며, 함께 들으면 ‘AI 도구 + 데이터 자산화’의 통합 역량을 얻습니다.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {volumes.map((v, idx) => {
            const days = v.parts.filter((p) => p.kind === 'day')
            const done = countDone(
              v.id,
              days.map((d) => d.num)
            )
            return (
              <div
                key={v.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className={`px-6 py-5 ${idx === 0 ? 'bg-brand-800' : 'bg-brand-700'} text-white`}>
                  <div className="text-[12px] font-bold text-signal-300">{v.label}</div>
                  <h3 className="mt-1 text-lg font-extrabold leading-snug">{v.title}</h3>
                  <div className="mt-0.5 text-[13px] text-brand-100">{v.subtitle}</div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[14px] leading-relaxed text-slate-600">{v.desc}</p>

                  <div className="mt-4 mb-5">
                    <div className="mb-1 flex justify-between text-[12px] font-medium text-slate-500">
                      <span>학습 진도</span>
                      <span>
                        {done}/{days.length} DAY
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${(done / days.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <ul className="mb-6 space-y-1.5">
                    {days.map((p) => (
                      <li key={p.num} className="flex items-center gap-2 text-[13.5px] text-slate-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-[10.5px] font-bold text-brand-700">
                          {p.day}
                        </span>
                        <span className="truncate">{p.title}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/vol/${v.id}`}
                    className="mt-auto rounded-xl bg-brand-800 py-3 text-center text-[14px] font-bold text-white transition group-hover:bg-brand-700"
                  >
                    {v.label} 학습하기
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* AI 도구 가이드 배너 */}
      <section className="mx-auto max-w-screen-xl px-5 pb-16">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <Link
              to="/tools"
              className="group flex items-center gap-4 border-b border-slate-200 p-6 transition hover:bg-slate-50 md:border-b-0 md:border-r"
            >
              <span className="text-3xl text-brand-700"><Icon name="fa-solid fa-toolbox" /></span>
              <div>
                <div className="text-[16px] font-extrabold text-brand-900">AI 도구 가이드</div>
                <div className="mt-0.5 text-[13px] text-slate-500">
                  프롬프트 · ChatGPT · Claude · Gemini · Genspark · Perplexity 정리
                </div>
                <div className="mt-1.5 text-[12.5px] font-bold text-brand-700 group-hover:underline">
                  바로가기 →
                </div>
              </div>
            </Link>
            <Link
              to="/about"
              className="group flex items-center gap-4 p-6 transition hover:bg-slate-50"
            >
              <span className="text-3xl text-brand-700"><Icon name="fa-solid fa-circle-info" /></span>
              <div>
                <div className="text-[16px] font-extrabold text-brand-900">소개 (About)</div>
                <div className="mt-0.5 text-[13px] text-slate-500">
                  제작 의도 · 강사 소개 · 회사 소개
                </div>
                <div className="mt-1.5 text-[12.5px] font-bold text-brand-700 group-hover:underline">
                  바로가기 →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-screen-xl px-5 text-center text-[12.5px] text-slate-400">
          2026년 산업전문인력 AI역량강화 (건설기계) · 건설기계산업 AX 전환 실행역량 강화
          <br />© DreamIT Biz · 본 학습사이트의 교재 콘텐츠는 교육 목적 사용에 한합니다.
        </div>
      </footer>
    </div>
  )
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-signal-400">{n}</div>
      <div className="text-[12px] text-brand-200">{l}</div>
    </div>
  )
}

const heroPattern = {
  backgroundImage:
    'linear-gradient(135deg, transparent 46%, rgba(251,191,36,.5) 46%, rgba(251,191,36,.5) 54%, transparent 54%)',
  backgroundSize: '28px 28px',
}
