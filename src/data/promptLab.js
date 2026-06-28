// =========================================================================
// 프롬프트 학습 & 평가 — 데이터 + SCORE 채점 엔진
// (contents 프로젝트 PromptLab 패턴 이식, 예시는 건설기계 6직무로 적응)
// 평가 기준 = 프롬프트 5요소(역할·맥락·과제·제약·출력형식), 각 20점, 합계 100점.
// 채점은 키워드·구조 기반 클라이언트 추정(학습용, 실제 LLM 채점 아님).
// =========================================================================

// 5대 평가 기준 (각 20점)
export const scoreCriteria = [
  { key: '역할', code: 'R', max: 20, icon: 'fa-solid fa-user-tie',
    desc: '적절한 전문가 역할을 지정했는가',
    detail: '"너는 15년차 건설기계 A/S 엔지니어야"처럼 역할을 부여하면 답변의 전문성·어조가 안정된다.' },
  { key: '맥락', code: 'C', max: 20, icon: 'fa-solid fa-layer-group',
    desc: '장비·대상·상황 배경을 충분히 줬는가',
    detail: '모델명·증상·독자(고객/내부/해외딜러)·수치 등 구체적 배경이 많을수록 환각이 줄고 정확해진다.' },
  { key: '과제', code: 'T', max: 20, icon: 'fa-solid fa-pen-ruler',
    desc: '무엇을 만들지 명확히 지시했는가',
    detail: '"~를 작성해줘"처럼 동작이 분명해야 한다. 작업이 여러 개면 나눠 지시한다.' },
  { key: '제약', code: 'Co', max: 20, icon: 'fa-solid fa-ruler-combined',
    desc: '길이·톤·금지·안전 등 조건을 명시했는가',
    detail: '분량·말투·금지어·안전문구 유지 등을 정하지 않으면 매번 결과가 달라진다.' },
  { key: '출력형식', code: 'F', max: 20, icon: 'fa-solid fa-table-list',
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
  { icon: 'fa-solid fa-user-tie', title: '역할 부여(Role)', desc: '"너는 ~ 전문가야"로 시작하면 답변의 톤과 전문성이 올라간다.' },
  { icon: 'fa-solid fa-clone', title: '예시 제공(Few-shot)', desc: '원하는 형식의 예시 1~3개를 주면 모델이 그 구조를 모방한다.' },
  { icon: 'fa-solid fa-ruler-combined', title: '제약 명시', desc: '분량·말투·금지어·안전문구 유지를 못 박아 재작업을 줄인다.' },
  { icon: 'fa-solid fa-list-ol', title: '단계 분해', desc: '복잡한 작업은 1)…2)…로 쪼개 지시하면 누락이 줄어든다.' },
  { icon: 'fa-solid fa-table-list', title: '출력형식 지정', desc: '표·목록·섹션 구조를 지정해 바로 쓰는 결과를 받는다.' },
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

// =========================================================================
// 과목별 프롬프트 라이브러리 — 강의 커리큘럼(제1·2권)에 맞춘 즉시 사용 프롬프트
// =========================================================================
export const promptLibrary = [
  {
    subject: '제1권 D1 · 산업 이해 & 도구 선택',
    icon: 'fa-solid fa-industry',
    prompts: [
      {
        title: '내 직무 AI 적용 후보 도출',
        use: '자기 직무의 업무 흐름에서 AI로 자동화할 후보를 찾는다.',
        prompt:
          '너는 건설기계 기업의 AX 전환 컨설턴트다. 내 직무는 [직무]이고 주요 업무는 [업무1, 업무2, 업무3]이다. 각 업무를 ① AI 적용 가능성(상/중/하), ② 기대 효과, ③ 추천 도구로 정리한 표를 만들고, 가장 먼저 시작할 업무 1가지를 근거와 함께 추천하라.',
      },
      {
        title: '도구 선택 매트릭스',
        use: '업무 특성에 맞는 AI 도구 조합을 고른다.',
        prompt:
          '아래 업무들을 ChatGPT·Claude·Gemini·Genspark·Perplexity 중 어떤 도구가 가장 적합한지 "업무 / 추천 도구 / 이유 / 대안" 표로 정리하라. 업무: [① 매뉴얼 번역 ② 시장 조사 ③ 발표자료 제작 ④ 장문 계약 검토 ⑤ 데이터 분석].',
      },
    ],
  },
  {
    subject: '제1권 D2 · ChatGPT & Custom GPT',
    icon: 'fa-solid fa-comment-dots',
    prompts: [
      {
        title: 'Custom GPT 지시문(Instruction) 설계',
        use: '부서 전용 GPT의 역할·규칙을 정의한다.',
        prompt:
          '너는 [부서] 업무를 돕는 어시스턴트다. 다음 규칙을 지켜라: ① 업로드된 사내 자료에 근거해 답하고 근거가 없으면 "확인 필요"로 표기, ② 답변은 표/체크리스트로 구조화, ③ 안전·법규 문구는 임의로 바꾸지 않는다. 첫 인사로 어떤 정보를 주면 되는지 안내하라.',
      },
      {
        title: '정비 이력 데이터 분석(Code Interpreter)',
        use: '엑셀/CSV를 올려 패턴을 분석한다.',
        prompt:
          '첨부한 정비 이력 데이터를 분석하라. ① 부품별 고장 빈도 TOP10 막대그래프, ② 월별 정비비 추세선(이상치 표시), ③ 예방정비가 필요한 부품과 근거를 표로 제시하라.',
      },
    ],
  },
  {
    subject: '제1권 D3 · Gemini & Claude 심화',
    icon: 'fa-solid fa-layer-group',
    prompts: [
      {
        title: '장문 계약서·ITB 위험 검토(Claude)',
        use: '수십 페이지 문서의 독소조항을 찾는다.',
        prompt:
          '아래 수출 계약서를 검토하라. 공급사(우리)에게 불리한 조항을 "조항 / 위험내용 / 위험도(상중하) / 수정 제안" 표로 정리하고, 각 항목에 원문 위치를 인용하라. 확신이 낮으면 "법무 확인 필요"로 표기하라.',
      },
      {
        title: '출처 인용 시장 보고서(Gemini Deep Research)',
        use: '근거가 붙은 조사 보고서를 만든다.',
        prompt:
          '동남아(인도네시아·베트남) 미니 굴삭기 시장을 조사하라. 시장 규모·성장률, 주요 경쟁사, 수입 규제·인증, 유통 구조를 출처와 함께 정리하고 진출 리스크를 요약하라.',
      },
    ],
  },
  {
    subject: '제1권 D4 · Genspark & AI Agent',
    icon: 'fa-solid fa-bolt',
    prompts: [
      {
        title: '다단계 위임(Agent)',
        use: '조사→요약→산출물까지 한 번에 위임한다.',
        prompt:
          '베트남 미니 굴삭기 시장 진출 검토 자료를 만들어줘. ① 시장·경쟁·규제 조사 → ② 핵심 요약 → ③ 의사결정용 슬라이드 8장까지 완성해줘. 핵심 수치에는 출처를 표기해줘.',
      },
      {
        title: '발표자료 자동 생성(AI Slides)',
        use: '내용만 주고 발표 덱을 만든다.',
        prompt:
          '신형 전동 굴삭기 소개 슬라이드 10장을 만들어줘. 청중은 도심 건설사 구매담당, 구성: 문제제기 → 강점(저소음·무배출·연료절감) → 경쟁 비교표 → 도입효과 → 문의. 비즈니스 톤.',
      },
    ],
  },
  {
    subject: '제1권 D5 · 멀티모달 활용',
    icon: 'fa-solid fa-photo-film',
    prompts: [
      {
        title: '도면·점검표 이미지 분석(Vision)',
        use: '사진/도면에서 정보를 추출한다.',
        prompt:
          '이 굴삭기 부품 도면 이미지를 분석해 부품번호·명칭·주요 치수를 표로 정리하라. 판독이 불확실한 항목은 "확인 필요"로 표기하라.',
      },
      {
        title: '정비 영상 → 단계별 매뉴얼',
        use: '영상 내용을 절차서로 변환한다.',
        prompt:
          '이 정비 작업 영상을 분석해 작업을 단계별 절차서로 변환하라. 각 단계에 주의/안전 사항을 함께 적고, 필요한 공구 목록을 표로 정리하라.',
      },
    ],
  },
  {
    subject: '제1권 D6 · 직무별 프로토타입',
    icon: 'fa-solid fa-diagram-project',
    prompts: [
      {
        title: '6직무 프로토타입 설계',
        use: '자기 직무용 AI 자동화 프로토타입을 설계한다.',
        prompt:
          '내 직무는 [기술문서/AS/영업/해외영업/마케팅/DX 중 택1]이다. 이 직무의 반복 업무 1개를 AI로 자동화하는 프로토타입을 설계하라. ① 입력 → ② AI 처리 → ③ 사람 검수 → ④ 산출물 단계로 나누고, 각 단계의 도구·프롬프트·검수 기준을 표로 제시하라.',
      },
    ],
  },
  {
    subject: '제2권 D1–2 · 암묵지 & 현장 데이터 수집',
    icon: 'fa-solid fa-microphone-lines',
    prompts: [
      {
        title: '베테랑 인터뷰 질문 설계',
        use: '숙련공 노하우를 끌어내는 질문지를 만든다.',
        prompt:
          '너는 지식경영 전문가다. [정비/운전/품질 중 택1] 베테랑의 암묵지를 끌어내는 인터뷰 질문지를 만들어라. 5W1H + Why-5 기법으로 15문항을 작성하고, 각 문항의 목적을 괄호로 표기하라.',
      },
      {
        title: '1주일 데이터 수집 시스템 설계',
        use: '부서의 현장 데이터 수집 체계를 잡는다.',
        prompt:
          '내 부서 [부서명]의 1주일 현장 데이터 수집 시스템을 설계하라. 요일별 수집 대상(사진·음성·문서)·도구·담당·보안등급을 표로 정리하고, 24시간 정리 룰을 반영하라.',
      },
    ],
  },
  {
    subject: '제2권 D3 · OCR·STT 디지털화',
    icon: 'fa-solid fa-file-lines',
    prompts: [
      {
        title: '손글씨 점검표 OCR → DB화',
        use: '종이 점검표를 디지털 표로 변환한다.',
        prompt:
          '이 손글씨 점검표 이미지를 디지털 표로 변환하라. 컬럼은 [점검일/점검자/항목/결과/특이사항]으로 하고, 판독이 불확실한 칸은 "[?]"로 표기하라.',
      },
      {
        title: '회의·인터뷰 STT → 회의록',
        use: '녹취를 구조화된 회의록으로 만든다.',
        prompt:
          '아래 회의 녹취록(STT 결과)을 정리하라. ① 3줄 요약, ② 핵심 결정사항, ③ 할 일(담당·기한 표), ④ 후속 논의 안건으로 구조화하라.',
      },
    ],
  },
  {
    subject: '제2권 D4–6 · 구조화·품질·자산화',
    icon: 'fa-solid fa-database',
    prompts: [
      {
        title: '메타데이터 표준 양식 설계',
        use: '데이터 자산화를 위한 메타데이터 체계를 만든다.',
        prompt:
          '내 부서 데이터에 적용할 메타데이터 표준 양식을 설계하라. 15개 항목(제목·작성일·작성자·분류·보안등급 등)을 표로 정의하고, 각 항목의 입력 규칙과 예시를 함께 제시하라.',
      },
      {
        title: '데이터 품질 점검 체크리스트',
        use: 'GIGO 방지를 위한 품질 기준을 만든다.',
        prompt:
          '데이터 품질 6대 차원(정확성·완전성·일관성·적시성·유효성·유일성) 기준으로 우리 [데이터셋명]을 점검하는 체크리스트를 표로 만들어라. 각 항목에 측정 방법과 합격 기준을 적어라.',
      },
      {
        title: 'KPI 데이터 자산화 ROI 보고',
        use: '경영진 보고용 ROI 논리를 만든다.',
        prompt:
          '데이터 자산화 프로젝트의 ROI를 임원 보고용으로 정리하라. 투입(시간·비용) 대비 효과(시간 절감·품질·재사용)를 정량화하고, 90일 로드맵(4단계)과 핵심 KPI를 표로 제시하라.',
      },
    ],
  },
]

// =========================================================================
// 프롬프트 하위 메뉴 정의
// =========================================================================
export const PROMPT_SECTIONS = [
  { id: 'learn', label: '프롬프트 학습하기', short: '학습하기', icon: 'fa-solid fa-book', desc: '5요소·등급·기법 기초' },
  { id: 'pattern', label: '프롬프트 실전패턴', short: '실전패턴', icon: 'fa-solid fa-puzzle-piece', desc: '바로 쓰는 7가지 패턴' },
  { id: 'library', label: '과목별 프롬프트 예제', short: '과목별 예제', icon: 'fa-solid fa-folder-tree', desc: '커리큘럼별 예제 모음' },
  { id: 'practice', label: '프롬프트 평가 실습', short: '평가 실습', icon: 'fa-solid fa-bullseye', desc: '직접 쓰고 SCORE 채점' },
  { id: 'follow', label: '프롬프트 따라하기', short: '따라하기', icon: 'fa-solid fa-shoe-prints', desc: '단계별 가이드 실습' },
]

// 흔한 실수 (학습하기 보강)
export const commonMistakes = [
  {
    bad: '굴삭기 설명서 정리해줘',
    why: '역할·맥락·형식이 모두 빠져 매번 다른 결과가 나온다.',
    fix: '너는 기술문서 작성자다. 30톤 굴삭기 일상점검 항목을 "점검부위/방법/주기" 표로 정리하라.',
  },
  {
    bad: '좋은 마케팅 문구 써줘',
    why: '"좋은"은 기준이 없어 평가가 불가능하다. 타깃·톤·길이를 줘야 한다.',
    fix: '30대 건설사 구매담당 대상, 280자 이내, 신뢰감 있는 톤으로 전동 굴삭기 소개문을 써라.',
  },
  {
    bad: '이 데이터 분석해줘 (파일만 첨부)',
    why: '무엇을 보고 싶은지 없으면 일반적인 요약만 나온다.',
    fix: '이 정비 이력에서 부품별 고장 빈도 TOP10과 월별 비용 추세를 차트로 보여줘.',
  },
  {
    bad: '계약서 검토해줘 (수십 장 붙여넣기)',
    why: '판단 기준이 없으면 단순 요약에 그친다. 관점을 줘야 한다.',
    fix: '공급사(우리)에게 불리한 조항만 찾아 "조항/위험/위험도/대안" 표로, 원문 위치를 인용해 정리하라.',
  },
  {
    bad: '번역해줘',
    why: '용어·단위·안전문구 처리 기준이 없으면 현지에서 못 쓴다.',
    fix: '인도네시아어로 번역하되 용어집을 우선 적용하고 안전 경고문은 원형을 유지하라.',
  },
]

// =========================================================================
// 프롬프트 따라하기 — 단계별 가이드 실습
// =========================================================================
export const followTutorials = [
  {
    id: 'manual-bot',
    title: '굴삭기 매뉴얼 요약 봇 만들기',
    tool: 'ChatGPT (Custom GPT)',
    level: '입문',
    goal: '매뉴얼을 근거로만 답하는 전용 어시스턴트를 5단계로 완성한다.',
    steps: [
      { instruction: 'ChatGPT에서 [GPT 만들기 → Configure]로 들어가, 아래 지시문을 Instructions에 붙여 넣으세요.',
        prompt: '너는 굴삭기 기술문서 어시스턴트다. 업로드된 매뉴얼에 근거해서만 답하고, 근거가 없으면 "매뉴얼 확인 필요"라고 답하라. 모든 답변 끝에 근거 위치(섹션/페이지)를 표기하라.',
        expected: '봇의 역할과 답변 규칙이 고정됩니다.' },
      { instruction: 'Knowledge 영역에 굴삭기 매뉴얼 PDF를 업로드하세요. (없으면 샘플 PDF로 연습)',
        prompt: null,
        expected: '봇이 그 문서 내용을 근거로 사용할 수 있게 됩니다.' },
      { instruction: '미리보기 대화창에 아래 질문을 입력해 동작을 확인하세요.',
        prompt: '30톤 굴삭기 유압유 교체 주기는? 근거 위치도 알려줘.',
        expected: '매뉴얼 근거와 함께 답이 나오고, 없으면 "확인 필요"로 답합니다.' },
      { instruction: '답이 너무 길면 형식을 고정하도록 지시를 보강하세요.',
        prompt: '앞으로 모든 답은 3줄 이내 요약 + 근거 표 형식으로 답하라.',
        expected: '일관된 형식의 답변이 나옵니다.' },
      { instruction: '완성되면 [공유]로 링크를 만들어 부서원과 공유하세요.',
        prompt: null,
        expected: '누구나 같은 규칙의 매뉴얼 봇을 사용할 수 있습니다.' },
    ],
  },
  {
    id: 'spec-review',
    title: '계약서 위험 조항 검토 따라하기',
    tool: 'Claude',
    level: '실전',
    goal: '장문 계약서에서 불리한 조항을 찾아 표로 받는 과정을 익힌다.',
    steps: [
      { instruction: 'Claude 새 대화에 계약서/ITB 전문을 붙여 넣거나 파일로 업로드하세요.',
        prompt: null,
        expected: '긴 문서를 한 번에 인식합니다.' },
      { instruction: '검토 관점을 명확히 준 아래 프롬프트를 입력하세요.',
        prompt: '아래 수출 계약서를 검토하라. 공급사(우리)에게 불리한 조항을 "조항/위험내용/위험도(상중하)/수정 제안" 표로 정리하고, 각 항목에 원문 위치를 인용하라. 확신이 낮으면 "법무 확인 필요"로 표기하라.',
        expected: '위험 조항이 표로 정리되고 근거가 인용됩니다.' },
      { instruction: '우선순위가 필요하면 후속 질문으로 좁히세요.',
        prompt: '위 표에서 위험도 "상"인 조항만 추려, 협상 시 우선 제기할 순서로 다시 정리해줘.',
        expected: '핵심 독소조항만 우선순위로 정렬됩니다.' },
      { instruction: '결과는 사람이 최종 검수합니다. 확신 낮음 항목은 법무에 확인하세요.',
        prompt: null,
        expected: 'AI는 1차 검토, 최종 판단은 사람이 — 책임 있는 활용.' },
    ],
  },
  {
    id: 'market-research',
    title: '진출 시장 조사 보고서 따라하기',
    tool: 'Gemini Deep Research / Perplexity',
    level: '실전',
    goal: '출처가 붙은 시장 조사 보고서를 만들고 검수하는 흐름을 익힌다.',
    steps: [
      { instruction: 'Gemini에서 Deep Research(또는 Perplexity Pro Search)를 선택하세요.',
        prompt: null,
        expected: '다단계로 깊게 조사하는 모드가 켜집니다.' },
      { instruction: '조사 범위를 구체적으로 지정한 프롬프트를 입력하세요.',
        prompt: '동남아(인도네시아·베트남) 미니 굴삭기 시장을 조사하라. 시장 규모·성장률, 주요 경쟁사, 수입 규제·인증, 유통 구조를 출처와 함께 정리하고 진출 리스크를 요약하라.',
        expected: '출처 각주가 달린 보고서 초안이 생성됩니다.' },
      { instruction: '핵심 수치의 각주를 클릭해 원문으로 사실을 확인하세요.',
        prompt: null,
        expected: '환각·오래된 수치를 걸러냅니다.' },
      { instruction: '보고서를 발표용으로 다듬도록 요청하세요.',
        prompt: '위 내용을 의사결정용 1페이지 요약(핵심 3가지 + 리스크 + 권고)으로 다시 정리해줘.',
        expected: '경영 보고용 요약본을 얻습니다.' },
    ],
  },
]
