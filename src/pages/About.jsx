import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { purpose, instructor, company } from '../data/about'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-signal-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-signal-300 ring-1 ring-white/15">
            ℹ️ About
          </div>
          <h1 className="mt-4 text-3xl font-extrabold">소개</h1>
          <p className="mt-2 text-[15px] text-brand-100">제작 의도 · 강사 소개 · 회사 소개</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-12">
        {/* 제작 의도 */}
        <section id="purpose" className="scroll-mt-20">
          <SectionTitle badge="01">{purpose.title}</SectionTitle>
          <p className="mb-5 text-[17px] font-bold leading-snug text-brand-800">{purpose.lead}</p>
          <div className="space-y-3.5">
            {purpose.paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.85] text-slate-700">{p}</p>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {purpose.points.map((pt, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-2xl">{pt.icon}</span>
                <div>
                  <div className="text-[14px] font-bold text-brand-900">{pt.title}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-slate-600">{pt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 강사 소개 */}
        <section id="instructor" className="mt-14 scroll-mt-20">
          <SectionTitle badge="02">{instructor.title}</SectionTitle>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-5 bg-brand-50 p-6">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-800 text-4xl">
                {instructor.photoEmoji}
              </span>
              <div>
                <div className="text-[22px] font-extrabold text-brand-900">{instructor.name}</div>
                <div className="mt-1 text-[14px] font-semibold text-brand-600">{instructor.role}</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-[1.85] text-slate-700">{instructor.intro}</p>
              <div className="mt-5">
                <div className="mb-2 text-[13px] font-bold text-brand-800">전문 분야</div>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((e, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-medium text-slate-700"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-[12px] text-slate-400">{instructor.note}</p>
            </div>
          </div>
        </section>

        {/* 회사 소개 */}
        <section id="company" className="mt-14 scroll-mt-20">
          <SectionTitle badge="03">{company.title}</SectionTitle>
          <div className="rounded-2xl bg-brand-900 p-7 text-white shadow-sm">
            <div className="text-[22px] font-extrabold">{company.name}</div>
            <div className="mt-1.5 text-[14.5px] font-semibold text-signal-300">{company.tagline}</div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-brand-100">{company.intro}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {company.services.map((s, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-2xl">{s.icon}</div>
                <div className="mt-2 text-[14.5px] font-bold text-brand-900">{s.title}</div>
                <div className="mt-1 text-[13px] leading-relaxed text-slate-600">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {company.links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-[13.5px] transition hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-500">{l.label}</span>
                <span className="font-bold text-brand-700">{l.value} ↗</span>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block rounded-xl bg-brand-800 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-brand-700"
          >
            학습 시작하기 →
          </Link>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-4xl px-5 text-center text-[12.5px] text-slate-400">
          2026년 산업전문인력 AI역량강화 (건설기계) · © DreamIT Biz
        </div>
      </footer>
    </Layout>
  )
}

function SectionTitle({ badge, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-400 text-[13px] font-extrabold text-brand-950">
        {badge}
      </span>
      <h2 className="text-[22px] font-extrabold text-brand-900">{children}</h2>
    </div>
  )
}
