import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Icon from '../components/Icon'
import DayPlan from '../components/DayPlan'
import { getVolume, volumes } from '../data/courses'
import { dayPlans } from '../data/dayplans'

export default function Schedule() {
  const { volId } = useParams()
  const vol = getVolume(volId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [volId])

  if (!vol) return <Navigate to="/schedule/vol1" replace />

  const plans = dayPlans[vol.id] || {}
  const days = Object.values(plans).sort((a, b) => a.day - b.day)

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-4 flex items-center gap-1.5 text-[12.5px] text-slate-400">
          <Link to="/" className="hover:text-brand-700">홈</Link>
          <span>/</span>
          <span className="text-slate-600">교육 일정</span>
        </div>

        {/* 권 토글 */}
        <div className="mb-6 grid max-w-xs grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
          {volumes.map((v) => (
            <Link
              key={v.id}
              to={`/schedule/${v.id}`}
              className={`rounded-lg py-2 text-center text-[12.5px] font-bold transition ${
                v.id === vol.id ? 'bg-brand-800 text-white shadow' : 'text-slate-500 hover:bg-white'
              }`}
            >
              {v.id === 'vol1' ? '제1권' : '제2권'}
            </Link>
          ))}
        </div>

        {/* 헤더 */}
        <div className="mb-7 rounded-2xl bg-brand-900 p-7 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-signal-300">
            <Icon name="fa-solid fa-calendar-days" /> {vol.label} · 교육 일정
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-snug">{vol.title}</h1>
          <p className="mt-2 text-[14px] text-brand-100">
            6일 과정 · 1일 8시간 · 학습과 실습을 병행합니다. 각 일정 항목을 누르면 해당 교재 단원으로 이동합니다.
          </p>
        </div>

        {/* DAY별 타임테이블 */}
        <div className="space-y-4">
          {days.map((plan) => (
            <div key={plan.day} id={`day-${plan.day}`} className="scroll-mt-20">
              <DayPlan plan={plan} defaultOpen={plan.day === 1} />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-slate-100 px-4 py-3 text-[12.5px] leading-relaxed text-slate-500">
          ※ 시간 배분은 표준 운영안이며, 현장 상황·수강생 수준에 따라 조정할 수 있습니다.
          교재 전체 목차는 <Link to={`/vol/${vol.id}`} className="font-semibold text-brand-700 hover:underline">{vol.label} 교재 보기</Link>에서 확인하세요.
        </div>
      </div>
    </Layout>
  )
}
