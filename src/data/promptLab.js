// =========================================================================
// 프롬프트 학습 & 평가 — 데이터 + SCORE 채점 엔진
// (contents 프로젝트 PromptLab 패턴 이식, 예시는 건설기계 6직무로 적응)
// 평가 기준 = 프롬프트 5요소(역할·맥락·과제·제약·출력형식), 각 20점, 합계 100점.
// 채점은 키워드·구조 기반 클라이언트 추정(학습용, 실제 LLM 채점 아님).
// =========================================================================

// 5대 평가 기준 (각 20점)
export const scoreCriteria = [
  { key: '역할', code: 'R', max: 20, emoji: '🎭',
    desc: '적절한 전문가 역할을 지정했는가',
    detail: '"너는 15년차 건설기계 A/S 엔지니어야"처럼 역할을 부여하면 답변의 전문성·어조가 안정된다.' },
  { key: '맥락', code: 'C', max: 20, emoji: '🧱',
    desc: '장비·대상·상황 배경을 충분히 줬는가',
    detail: '모델명·증상·독자(고객/내부/해외딜러)·수치 등 구체적 배경이 많을수록 환각이 줄고 정확해진다.' },
  { key: '과제', code: 'T', max: 20, emoji: '📐',
    desc: '무엇을 만들지 명확히 지시했는가',
    detail: '"~를 작성해줘"처럼 동작이 분명해야 한다. 작업이 여러 개면 나눠 지시한다.' },
  { key: '제약', code: 'Co', max: 20, emoji: '📏',
    desc: '길이·톤·금지·안전 등 조건을 명시했는가',
    detail: '분량·말투·금지어·안전문구 유지 등을 정하지 않으면 매번 결과가 달라진다.' },
  { key: '출력형식', code: 'F', max: 20, emoji: '📋',
    desc: '결과를 어떤 구조·형태로 받을지 지정했는가',
    detail: '표·목록·섹션 구조를 지정하면 현업에 바로 쓸 수 있는 결과가 나온다.' },
]

export const gradeTable = [
  { grade: 'S', range: '90–100', label: '탁월', desc: '5요소가 완벽하게 갖춰진 프롬프트' },
  { grade: 'A', range: '80–89', label: '우수', desc: '대부분의 요소가 잘 갖춰짐' },
  { grade: 'B', range: '65–79', label: '보통', desc: '기본 요소는 있으나 개선 여지' },
  { grade: 'C', range: '50–64', label: '미흡', desc: '핵심 요소가 부족해 결과가 불안정' },
  { grade: 'D', range: '0–49', label: '부족', desc: '프롬프트로서 기본 기능을 못 함' },
]

export const GRADE_COLOR = { S: '#1D7A4F', A: '#1D4E89', B: '#3D6FE0', C: '#D4760A', D: '#C8102E' }

// 점수를 올리는 5가지 기법
export const techniques = [
  { emoji: '🎭', title: '역할 부여(Role)', desc: '"너는 ~ 전문가야"로 시작하면 답변의 톤과 전문성이 올라간다.' },
  { emoji: '🧩', title: '예시 제공(Few-shot)', desc: '원하는 형식의 예시 1~3개를 주면 모델이 그 구조를 모방한다.' },
  { emoji: '📏', title: '제약 명시', desc: '분량·말투·금지어·안전문구 유지를 못 박아 재작업을 줄인다.' },
  { emoji: '🔢', title: '단계 분해', desc: '복잡한 작업은 1)…2)…로 쪼개 지시하면 누락이 줄어든다.' },
  { emoji: '📋', title: '출력형식 지정', desc: '표·목록·섹션 구조를 지정해 바로 쓰는 결과를 받는다.' },
]

// 채점 예시 (개선 전/후)
export const scoreSample = {
  before: { prompt: '굴삭기 설명서 정리해줘', total: 20, grade: 'D' },
  after: {
    prompt: `[역할] 너는 15년차 건설기계 기술문서 작성자야.
[맥락] 대상은 HD현대 30톤 굴삭기 유압시스템, 독자는 동남아 현지 정비기사(영어 보조).
[과제] 사용설명서의 일상점검 항목을 요약·정리해줘.
[제약] 항목당 1문장, 안전 경고문은 원문 그대로 유지, 추정 금지.
[출력형식] "점검부위 / 점검방법 / 주기 / 안전주의" 4열 표.`,
    total: 94, grade: 'S',
  },
}

// 실습 시나리오 — 건설기계 6직무
export const scenarios = [
  {
    id: 1, category: '직무1 · 기술문서', title: '매뉴얼 요약·번역 프롬프트',
    situation: '굴삭기 사용설명서(400p)의 일상점검 부분을 동남아 현지 정비기사용으로 요약·번역하려 합니다.',
    goal: '정확하고 안전문구를 보존하는 매뉴얼 요약 프롬프트를 작성하세요.',
    keywords: ['매뉴얼', '설명서', '점검', '굴삭기', '번역', '현지', '안전'],
    roleKeywords: ['기술문서', '엔지니어', '작성자', '전문가', '번역가'],
    constraintKeywords: ['안전', '문장', '이내', '금지', '유지', '톤'],
    formatKeywords: ['표', '열', '목록', '항목', '형식', '구조'],
    exampleAnswer: `[역할] 너는 15년차 건설기계 기술문서 작성자야.
[맥락] 대상은 30톤 굴삭기 유압시스템, 독자는 동남아 현지 정비기사(영어 보조).
[과제] 사용설명서의 일상점검 항목을 요약하고 인도네시아어로 번역해줘.
[제약] 항목당 1문장, 안전 경고문은 원문 그대로 유지, 원문에 없는 추정 금지.
[출력형식] "점검부위 / 점검방법 / 주기 / 안전주의" 4열 표(한국어·인니어 병기).`,
  },
  {
    id: 2, category: '직무2 · A/S', title: '정비 트러블슈팅 프롬프트',
    situation: '굴삭기 유압 압력 저하 증상에 대해 A/S 엔지니어가 진단 가이드를 만들려 합니다.',
    goal: '원인·점검순서·위험도를 정리하는 진단 프롬프트를 작성하세요.',
    keywords: ['정비', '진단', '증상', '유압', '원인', '점검', '트러블'],
    roleKeywords: ['엔지니어', '정비', '전문가', '기사', '담당자'],
    constraintKeywords: ['우선순위', '안전', '단계', '금지', '근거'],
    formatKeywords: ['표', '순서', '목록', '단계', '열', '형식'],
    exampleAnswer: `[역할] 너는 굴삭기 정비 15년차 A/S 엔지니어야.
[맥락] 증상은 "유압 압력 저하 + 붐 동작 느림", 장비는 30톤 굴삭기.
[과제] 예상 원인과 점검 순서를 우선순위대로 정리해줘.
[제약] 근거를 함께 적고, 확신이 낮으면 "확인 필요"로 표기, 안전수칙 포함.
[출력형식] "원인 / 점검방법 / 위험도(상중하)" 3열 표 + 권장 조치 요약.`,
  },
  {
    id: 3, category: '직무3 · 영업·견적', title: '견적·제안서 프롬프트',
    situation: '미니 굴삭기 10대 납품 건의 제안서 초안을 일관된 양식으로 만들려 합니다.',
    goal: '설득력 있는 제안서 초안을 요청하는 프롬프트를 작성하세요.',
    keywords: ['제안서', '견적', '납품', '고객', '장비', '가격', '제품'],
    roleKeywords: ['영업', '견적', '담당자', '전문가', '매니저'],
    constraintKeywords: ['분량', '톤', '정중', '금지', '사실'],
    formatKeywords: ['항목', '섹션', '표', '구조', '목록', '형식'],
    exampleAnswer: `[역할] 너는 건설기계 B2B 영업 제안 전문가야.
[맥락] 고객은 지방 건설사, 미니 굴삭기 10대 납품(사양·가격은 아래).
[과제] 제안서 초안을 작성해줘.
[제약] A4 1~2장 분량, 정중한 비즈니스 톤, 미확정 수치는 [확인]으로 표기.
[출력형식] 표지문구 / 고객니즈 / 제품제안 / 가격·납기 표 / 사후지원 섹션.`,
  },
  {
    id: 4, category: '직무4 · 해외영업', title: 'ITB·계약서 검토 프롬프트',
    situation: '해외 입찰 ITB(입찰안내서) 문서에서 우리에게 불리한 조항을 빠르게 찾으려 합니다.',
    goal: '계약 위험 조항을 식별하는 검토 프롬프트를 작성하세요.',
    keywords: ['itb', '계약', '입찰', '조항', '위험', '검토', '해외'],
    roleKeywords: ['해외영업', '법무', '검토자', '전문가', '담당자'],
    constraintKeywords: ['근거', '위험도', '금지', '확인', '조항'],
    formatKeywords: ['표', '목록', '조항', '열', '형식', '구조'],
    exampleAnswer: `[역할] 너는 건설기계 수출 계약 검토 전문가야.
[맥락] 아래는 중동 발주처의 ITB 일부다. 우리는 굴삭기 공급사다.
[과제] 우리에게 불리하거나 위험한 조항을 찾아 정리해줘.
[제약] 각 항목에 근거 조항을 인용하고, 확신 낮으면 "법무 확인 필요"로 표기.
[출력형식] "조항 / 위험내용 / 위험도 / 대응제안" 4열 표.`,
  },
  {
    id: 5, category: '직무5 · 마케팅', title: '제품 홍보 카드뉴스 프롬프트',
    situation: '신형 전동 굴삭기의 강점을 5장짜리 카드뉴스 문구로 만들어야 합니다.',
    goal: '흐름이 있는 카드뉴스 문구를 요청하는 프롬프트를 작성하세요.',
    keywords: ['카드뉴스', '홍보', '제품', '강점', '전동', '메시지', '타깃'],
    roleKeywords: ['마케터', '카피라이터', '에디터', '기획', '전문가'],
    constraintKeywords: ['자 이내', '문장', '톤', '이내', '금지'],
    formatKeywords: ['장', '목록', '번호', '형식', '구조'],
    exampleAnswer: `[역할] 너는 건설기계 마케팅 카드뉴스 에디터야.
[맥락] 신형 전동 굴삭기의 강점(저소음·무배출·연료비 절감)을 홍보, 타깃은 도심 건설사.
[과제] 카드뉴스 5장 문구를 만들어줘.
[제약] 장당 한 문장·20자 이내, 1장 후킹 → 5장 CTA, 과장·허위 금지.
[출력형식] "1장~5장" 라벨 + 각 장 문구 + 괄호로 역할 표기.`,
  },
  {
    id: 6, category: '직무6 · DX·자동화', title: '업무 자동화 워크플로 프롬프트',
    situation: '매주 반복되는 정비 이력 정리+보고 업무를 자동화 워크플로로 설계하려 합니다.',
    goal: '검수 단계를 포함한 자동화 워크플로 설계를 요청하는 프롬프트를 작성하세요.',
    keywords: ['워크플로', '자동화', '반복', '정비', '이력', '보고', '검수'],
    roleKeywords: ['설계자', '전문가', '컨설턴트', '담당자', 'dx'],
    constraintKeywords: ['검수', '조건', '단계', '시간', '보안'],
    formatKeywords: ['표', '단계', '칼럼', '열', '형식', '구조'],
    exampleAnswer: `[역할] 너는 제조 현장 업무 자동화 워크플로 설계자야.
[맥락] 반복업무는 "매주 정비 이력 수집 → 정리 → 주간 보고서 발행"이다.
[과제] 트리거 → AI 생성 → 사람 검수 → 발행 단계로 설계해줘.
[제약] 각 단계에 도구·소요시간·검수 기준을 적고, 사람 검수 게이트를 반드시 포함, 개인정보 비식별화 단계 포함.
[출력형식] "트리거 / AI단계 / 사람검수 / 발행" 칼럼의 표 + 총 소요시간.`,
  },
]

// =========================================================================
// SCORE 채점 엔진 — 입력 프롬프트를 5요소 기준으로 0~20점씩 추정(휴리스틱).
// =========================================================================
export function evaluatePrompt(input, scenario) {
  const text = input.toLowerCase().replace(/\s+/g, ' ')
  const len = input.trim().length
  const feedback = []

  // 역할 (Role)
  let role = 0
  const roleHit = scenario.roleKeywords.filter((k) => text.includes(k.toLowerCase())).length
  const hasRole = /(너는|당신은|역할|전문가|담당자|으로서|act as|you are)/.test(input)
  if (hasRole) role += 12
  if (roleHit > 0) role += 8
  role = Math.min(role, 20)
  if (role < 12) feedback.push('역할을 지정하세요 — 예: "너는 15년차 건설기계 A/S 엔지니어야"')

  // 맥락 (Context)
  let context = 0
  const ctxHit = scenario.keywords.filter((k) => text.includes(k.toLowerCase())).length
  if (ctxHit >= 5) context += 12
  else if (ctxHit >= 3) context += 9
  else if (ctxHit >= 2) context += 6
  else if (ctxHit >= 1) context += 3
  if (/\d/.test(input)) context += 3
  if (/\[.+\]|"""|타깃|대상|장비|모델|고객|증상/.test(input)) context += 5
  context = Math.min(context, 20)
  if (context < 12) feedback.push(`맥락(장비·대상·상황)을 더 담으세요 — 예: ${scenario.keywords.slice(0, 3).join(', ')}`)

  // 과제 (Task)
  let task = 0
  const actionRe = /(작성|만들|써|분석|정리|요약|생성|제안|기획|설계|평가|비교|추천|도출|변주|번역|진단|검토)/
  const actionCount = (input.match(new RegExp(actionRe, 'g')) || []).length
  if (actionRe.test(input)) task += 10
  if (actionCount >= 2) task += 5
  if (len >= 120) task += 5
  task = Math.min(task, 20)
  if (task < 12) feedback.push('무엇을 만들지 명확한 지시문을 넣으세요 — 예: "~를 작성해줘"')

  // 제약 (Constraints)
  let constraint = 0
  const conHit = (scenario.constraintKeywords || []).filter((k) => text.includes(k.toLowerCase())).length
  if (/(자 이내|이내|글자|단어|분량|줄|문단|페이지|a4)/i.test(input)) constraint += 7
  if (/(톤|말투|어투|존댓말|반말|친근|정중|위트)/.test(input)) constraint += 6
  if (/(금지|하지 ?마|제외|제한|단,|주의|없이|유지|안전)/.test(input)) constraint += 4
  if (conHit > 0) constraint += 3
  constraint = Math.min(constraint, 20)
  if (constraint < 10) feedback.push('제약(길이·톤·금지어·안전문구 유지)을 명시하면 결과가 안정됩니다')

  // 출력형식 (Format)
  let format = 0
  const fmtHit = scenario.formatKeywords.filter((k) => text.includes(k.toLowerCase())).length
  if (fmtHit >= 2) format += 8
  else if (fmtHit >= 1) format += 4
  if (/[1-9][.)]\s|[-·•]\s|#{1,3}\s|\[출력|\[형식|①②③/.test(input)) format += 7
  if (/(표|목록|불릿|json|마크다운|구조|칼럼|열)/i.test(input)) format += 5
  format = Math.min(format, 20)
  if (format < 10) feedback.push('출력형식(표·목록·섹션 구조)을 지정하세요')

  const total = role + context + task + constraint + format
  if (len < 50) feedback.unshift('프롬프트가 너무 짧습니다. 100자 이상으로 5요소를 모두 담아보세요.')
  if (total >= 85) feedback.push('5요소가 균형 있게 잘 갖춰졌습니다! 👍')

  let grade = 'D'
  if (total >= 90) grade = 'S'
  else if (total >= 80) grade = 'A'
  else if (total >= 65) grade = 'B'
  else if (total >= 50) grade = 'C'

  return {
    total, grade, feedback,
    scores: { 역할: role, 맥락: context, 과제: task, 제약: constraint, 출력형식: format },
  }
}
