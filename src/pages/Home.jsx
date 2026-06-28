import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { volumes, partStats } from '../data/courses'
import { useProgress } from '../context/ProgressContext'

export default function Home() {
  const { countDone } = useProgress()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-20" style={heroPattern} />
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-signal-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-screen-xl px-5 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-signal-300 ring-1 ring-white/15">
            🏗️ 2026년 산업전문인력 AI역량강화 (건설기계)
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

          <div className="mt-10 flex flex-wrap gap-6 text-center">
            <Stat n="2권" l="교재" />
            <Stat n="12일" l="총 과정 (6일×2)" />
            <Stat n="6직무" l="직무별 프로토타입" />
            <Stat n="4대" l="생성형 AI 도구" />
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
