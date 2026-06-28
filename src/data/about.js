// About 페이지 콘텐츠 (제작의도 · 강사소개 · 회사소개)
// 강사·회사 세부 정보는 필요에 맞게 자유롭게 수정하세요.

export const purpose = {
  title: '제작 의도',
  lead: '2026 산업전문인력 AI역량강화(건설기계) 과정의 학습을, 강의실 밖에서도 이어가도록.',
  paragraphs: [
    '이 학습사이트는 「건설기계산업 AX 전환 실행역량 강화」 과정의 교재(제1권·제2권)를 온라인으로 옮겨, 수강생이 언제 어디서나 복습하고 실습할 수 있도록 제작되었습니다.',
    '생성형 AI는 “한 번 듣고 끝나는 지식”이 아니라 “매일 쓰면서 익히는 기술”입니다. 그래서 교재 전문(全文)뿐 아니라, 프롬프트 작성법과 주요 AI 도구 가이드를 함께 정리하여 현업에 바로 적용할 수 있게 구성했습니다.',
    '특히 건설기계 산업의 6대 직무(기술문서·A/S·영업·해외영업·마케팅·DX) 관점에서 “무엇을, 어떤 도구로, 어떻게” 자동화할지에 초점을 맞췄습니다.',
  ],
  points: [
    { icon: '📚', title: '교재 전문 제공', desc: '제1·2권 6일 과정을 그대로 — 표·그림·실습·사례까지.' },
    { icon: '✍️', title: '프롬프트 & 도구 가이드', desc: 'ChatGPT·Claude·Gemini·Genspark·Perplexity와 프롬프트 작성법 정리.' },
    { icon: '🏗️', title: '현장 직무 중심', desc: '건설기계 6직무 실무 자동화에 초점을 맞춘 활용 사례.' },
    { icon: '📈', title: '학습 진도 관리', desc: '로그인하면 어디서나 진도가 동기화되어 끝까지 완주.' },
  ],
}

export const instructor = {
  title: '강사 소개',
  name: 'DreamIT Biz 대표 강사',
  role: 'AI 활용·업무 자동화 교육 전문',
  photoEmoji: '👨‍🏫',
  intro:
    '생성형 AI를 실무에 접목하는 업무 자동화·데이터 활용 교육을 전문으로 합니다. 기업·공공기관·대학을 대상으로 ChatGPT·Claude·Gemini 등 주요 AI 도구의 현업 적용과 AX(AI Transformation) 전환을 강의·컨설팅해 왔습니다.',
  expertise: [
    '생성형 AI 업무 자동화 (프롬프트·Custom GPT·Agent)',
    '현장 데이터 수집·디지털화 및 데이터 자산화',
    '산업·직무별 AI 적용 전략과 프로토타입 구축',
    'AI 학습 플랫폼 기획·개발',
  ],
  note: '※ 강사 약력·연락처 등 세부 정보는 운영 정책에 맞게 수정하여 사용하세요.',
}

export const company = {
  title: '회사 소개',
  name: 'DreamIT Biz (드림아이티비즈)',
  tagline: 'AI 교육과 솔루션으로, 현장의 일하는 방식을 바꿉니다.',
  intro:
    '드림아이티비즈는 생성형 AI 교육과 맞춤형 학습 플랫폼·솔루션 개발을 전문으로 하는 기업입니다. 산업·기관별 요구에 맞춘 AI 역량강화 과정을 설계하고, 학습을 지속시키는 온라인 플랫폼까지 함께 제공합니다.',
  services: [
    { icon: '🎓', title: 'AI 역량강화 교육', desc: '기업·공공·대학 맞춤형 생성형 AI 실무 교육과정 설계·운영.' },
    { icon: '🛠️', title: '학습 플랫폼 개발', desc: '교재 기반 온라인 학습사이트·LMS 구축 (React·Supabase 등).' },
    { icon: '🤝', title: 'AI 도입 컨설팅', desc: '직무별 AI 적용 전략·프로토타입·데이터 자산화 컨설팅.' },
  ],
  links: [
    { label: '대표 도메인', value: 'dreamitbiz.com', url: 'https://dreamitbiz.com' },
    { label: '이 사이트', value: 'bulid.dreamitbiz.com', url: 'https://bulid.dreamitbiz.com' },
  ],
}
