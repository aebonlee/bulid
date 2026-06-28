// AI 도구 가이드 데이터
// 교재(제1권)에 ChatGPT·Gemini·Claude·Genspark + 프롬프트가 수록되어 있어
// 해당 커리큘럼으로 딥링크하고, Perplexity는 신규 정리.
// ※ 요금제·모델명·기능은 변동될 수 있으므로 강의/실사용 전 공식 사이트에서 재확인 필요.

export const promptGuide = {
  id: 'prompt',
  name: '프롬프트 엔지니어링',
  emoji: '✍️',
  color: 'signal',
  tagline: 'AI에게 일을 정확히 시키는 법 — 5대 원칙과 도메인 패턴',
  overview:
    '프롬프트는 AI에게 주는 업무 지시서다. 같은 도구라도 프롬프트의 품질이 결과의 품질을 좌우한다. 막연한 질문 대신 역할·맥락·예시·출력형식·제약을 명확히 주면, 건설기계 실무에 바로 쓸 수 있는 결과를 얻는다.',
  principles: [
    { title: '① 역할 부여 (Role)', desc: '“너는 건설기계 기업의 기술문서 검수 담당자다”처럼 전문가 역할을 지정하면 답변의 깊이와 어조가 맞춰진다.' },
    { title: '② 맥락 제공 (Context)', desc: '대상 장비, 모델명, 독자(고객/내부/해외 딜러), 사용 목적 등 배경을 충분히 준다. 맥락이 풍부할수록 환각이 줄어든다.' },
    { title: '③ 구체적 지시 (Task)', desc: '“정리해줘”가 아니라 “핵심 5가지를 표로, 각 항목 2문장 이내로”처럼 무엇을·어떻게·얼마나를 명시한다.' },
    { title: '④ 출력 형식 지정 (Format)', desc: '표·불릿·JSON·이메일 형식 등 원하는 산출물 형태를 지정한다. 바로 붙여 쓸 수 있는 결과가 나온다.' },
    { title: '⑤ 예시 제공 (Few-shot)', desc: '원하는 결과의 예시 1~2개를 보여주면 톤·구조를 그대로 따라 한다. 사내 양식 통일에 특히 효과적이다.' },
  ],
  patterns: [
    {
      name: '역할·맥락·지시·형식 (RCTF) 기본형',
      template:
        '너는 [역할]이다.\n[배경/맥락]을 고려해서,\n[구체 작업]을 수행하라.\n결과는 [출력형식]으로 작성하라.',
      example:
        '너는 건설기계 A/S 엔지니어다. 굴삭기 유압 압력 저하 증상을 고려해서, 예상 원인과 점검 순서를 우선순위대로 작성하라. 결과는 “원인 / 점검방법 / 위험도” 3열 표로 작성하라.',
    },
    {
      name: '검수·팩트체크형',
      template:
        '아래 [문서]를 검토하라. 사실 오류·기술 오류·원문에 없는 추정을 찾아 근거와 함께 표로 정리하라. 확신이 낮으면 “확인 필요”로 표기하라.',
      example:
        '아래 AI가 생성한 굴삭기 매뉴얼 초안을 검토하라. 사양 수치 오류, 안전 경고 누락, 원문에 없는 추정을 찾아 “항목/문제/수정안/위험도” 표로 정리하라.',
    },
    {
      name: '다국어 현지화형',
      template:
        '아래 [원문]을 [대상 언어]로 번역하라. [업종] 전문용어는 업계 표준 표기를 따르고, 단위·법규 표기를 현지 기준으로 변환하라.',
      example:
        '아래 굴삭기 사용설명서를 인도네시아어로 번역하라. 건설기계 전문용어는 현지 딜러가 쓰는 표준 표기를 따르고, 단위(톤·bar)와 안전 경고문 형식을 현지 기준에 맞춰라.',
    },
    {
      name: '단계적 추론(생각 유도)형',
      template: '[문제]를 풀어라. 결론을 내기 전에 고려해야 할 변수와 단계를 먼저 정리하고, 그다음 결론과 근거를 제시하라.',
      example:
        '신규 동남아 시장에 미니 굴삭기를 출시할지 판단하라. 먼저 고려 변수(수요·경쟁·규제·물류)를 정리하고, 그다음 권고안과 근거를 제시하라.',
    },
  ],
  domainNote:
    '건설기계 도메인에서는 ① 사양·수치(환각 위험 높음 → 반드시 검수), ② 안전·법규 문구(누락 금지), ③ 다국어 표준 용어, ④ 영업기밀·개인정보 비식별화가 특히 중요하다. 민감 자료는 옵트아웃·보안 등급을 확인한 뒤 입력한다.',
  toolTips: [
    { tool: 'ChatGPT', tip: 'Custom GPT에 회사 양식·검수 기준을 미리 넣어두면 매번 프롬프트를 길게 쓰지 않아도 된다.' },
    { tool: 'Claude', tip: '장문 문서를 통째로 붙여넣고 “이 문서 기준으로만 답하라”고 제약하면 환각이 크게 준다.' },
    { tool: 'Gemini', tip: 'Workspace 문서·메일을 직접 참조시키고, Deep Research로 출처 인용 보고서를 요청한다.' },
    { tool: 'Genspark', tip: '“보고서/슬라이드까지 만들어줘”처럼 산출물 형태를 명시하면 에이전트가 끝까지 완성한다.' },
    { tool: 'Perplexity', tip: '최신·사실 확인이 필요한 질문은 Perplexity로. 답변의 각주 출처를 반드시 함께 확인한다.' },
  ],
  links: [
    { label: 'OpenAI 프롬프트 가이드', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
    { label: 'Anthropic 프롬프트 엔지니어링', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    { label: 'Google 프롬프트 가이드', url: 'https://ai.google.dev/gemini-api/docs/prompting-intro' },
  ],
  courseRefs: [
    { label: '제1권 PART01 · 4. 프롬프트 엔지니어링 기초', to: '/vol/vol1/part/1' },
    { label: '제1권 PART01 · 3. 4대 도구 개관·선택 가이드', to: '/vol/vol1/part/1' },
  ],
}

export const tools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    emoji: '🟢',
    color: 'emerald',
    tagline: '가장 범용적인 올라운더 — Custom GPT 생태계와 데이터 분석',
    overview:
      '가장 널리 쓰이는 생성형 AI로, 글쓰기·요약·번역·코딩·데이터 분석·이미지 생성까지 폭넓게 처리한다. Custom GPT로 회사 업무에 특화한 나만의 어시스턴트를 만들 수 있고, 스토어 생태계가 가장 풍부하다.',
    strengths: [
      '범용성 — 거의 모든 업무 유형을 무난히 처리',
      'Custom GPT — 코딩 없이 업무 특화 봇 제작·공유',
      'Code Interpreter — 엑셀·CSV 업로드만으로 데이터 분석·차트',
      '멀티모달 — 이미지·도면 분석(Vision), 이미지 생성',
      'Tasks — 정기 업무 예약 자동 실행',
    ],
    plans: [
      { name: 'Free', price: '무료', desc: '기본 모델, 일부 기능 제한' },
      { name: 'Plus', price: '약 $20/월', desc: '최신 모델·고급 기능·사용량 확대(개인 실무 표준)' },
      { name: 'Pro', price: '약 $200/월', desc: '최상위 추론 모델 무제한급, 고부하 작업' },
      { name: 'Team / Enterprise', price: '문의', desc: '조직 관리·보안·데이터 학습 옵트아웃' },
    ],
    features: [
      { title: 'Custom GPT', desc: '회사 양식·검수 기준·자료를 넣은 전용 어시스턴트를 만들어 부서별로 공유.' },
      { title: 'Code Interpreter', desc: '데이터 파일 업로드 → 분석·시각화·리포트. 코딩 지식 불필요.' },
      { title: 'Vision', desc: '도면·점검표·부품 사진을 분석해 정보 추출·설명.' },
      { title: '이미지 생성', desc: '마케팅 비주얼·다이어그램 초안 생성.' },
      { title: 'Web 검색 · Tasks', desc: '실시간 정보 검색 + 반복 업무 예약 실행.' },
    ],
    useCases: [
      { title: '기술문서·매뉴얼', desc: 'Custom GPT로 사내 문체·용어를 학습시켜 매뉴얼 초안·요약 자동화.' },
      { title: '영업·견적', desc: '견적서·제안서 템플릿 기반 자동 초안 생성으로 일관성 확보.' },
      { title: '데이터 분석', desc: '판매·정비 이력 데이터를 업로드해 추세·이상치 분석.' },
    ],
    promptTips: [
      '“너는 ○○ 담당자다”로 역할을 먼저 지정한다.',
      '반복 업무는 Custom GPT로 만들어 두고 재사용한다.',
      '데이터는 파일로 올리고 “표/차트로” 출력 형식을 지정한다.',
    ],
    links: [
      { label: '공식 사이트', url: 'https://chatgpt.com' },
      { label: 'OpenAI 도움말', url: 'https://help.openai.com' },
    ],
    courseRefs: [
      { label: '제1권 PART02 · ChatGPT 심화 활용(전체)', to: '/vol/vol1/part/2' },
      { label: '제1권 PART02 · Custom GPT 구축 ★', to: '/vol/vol1/part/2' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    emoji: '🟣',
    color: 'violet',
    tagline: '장문·정확성·안전성의 강자 — Artifacts로 즉석 인터랙티브 제작',
    overview:
      '대용량 문서를 통째로 읽고 정확하게 분석·요약·작성하는 데 강하다. 한 번에 수백 페이지를 다룰 수 있는 긴 컨텍스트, 신중하고 안전한 답변, 자연스러운 글쓰기가 강점이다. Artifacts로 표·문서·간단한 앱을 대화 중 즉석 제작하고, Projects로 장문 자료 기반 어시스턴트를 만든다.',
    strengths: [
      '대용량 컨텍스트 — 긴 매뉴얼·계약서를 한 번에 처리',
      '정확성·안전성 — 환각이 적고 신중한 검수형 답변',
      'Artifacts — 문서·표·인터랙티브 자료를 대화 중 즉석 생성',
      'Projects — 자료를 올려두고 그 문서 기준으로만 답변',
      '글쓰기·요약·번역 품질, 코딩(Claude Code) 강세',
    ],
    plans: [
      { name: 'Free', price: '무료', desc: '기본 사용량' },
      { name: 'Pro', price: '약 $20/월', desc: '최신 모델·Projects·사용량 확대(개인 실무 표준)' },
      { name: 'Max', price: '약 $100~200/월', desc: '고사용량·우선 처리' },
      { name: 'Team / Enterprise', price: '문의', desc: '조직 관리·보안·데이터 보호' },
    ],
    features: [
      { title: 'Artifacts', desc: '대화 중 문서·표·차트·간단한 웹앱을 즉석 생성하고 바로 수정.' },
      { title: 'Projects', desc: '매뉴얼·규정 등 자료를 업로드해 “그 문서 기준” 전용 어시스턴트로 활용.' },
      { title: '대용량 문서 분석', desc: '수백 페이지 계약서·기술문서를 한 번에 요약·비교·검수.' },
      { title: '다국어·정확성', desc: '전문 번역·검수에서 높은 정확도와 일관성.' },
    ],
    useCases: [
      { title: '기술문서·매뉴얼', desc: '400페이지 매뉴얼을 통째로 넣고 다국어 번역·핵심 요약·검수.' },
      { title: 'A/S 엔지니어', desc: '정비 이력·트러블슈팅 가이드를 Project로 만들어 진단 어시스턴트화.' },
      { title: '해외영업', desc: 'ITB·계약서 장문 검토에서 위험 조항 자동 식별.' },
    ],
    promptTips: [
      '문서를 붙여넣고 “이 문서 기준으로만 답하라”고 제약하면 환각이 준다.',
      'Artifacts에 “표/체크리스트/한 페이지 요약으로”처럼 산출물을 지정한다.',
      '검수 작업은 “근거와 함께, 확신 낮으면 확인 필요로 표기” 규칙을 준다.',
    ],
    links: [
      { label: '공식 사이트', url: 'https://claude.ai' },
      { label: 'Anthropic 문서', url: 'https://docs.anthropic.com' },
    ],
    courseRefs: [
      { label: '제1권 PART03 · 2. Claude 활용 ★', to: '/vol/vol1/part/3' },
      { label: '제1권 PART03 · Artifacts 즉석 제작', to: '/vol/vol1/part/3' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    emoji: '🔷',
    color: 'sky',
    tagline: 'Google 생태계 통합 + 초대형 컨텍스트 + Deep Research',
    overview:
      'Google Workspace(Gmail·Docs·Sheets·Drive)와 깊게 통합되어 업무 문서·메일을 직접 참조해 작업한다. 초대형 컨텍스트로 방대한 자료를 한 번에 다루고, Deep Research로 출처를 인용한 자동 보고서를, NotebookLM으로 내 자료 기반 어시스턴트를 만든다. 영상·이미지 멀티모달도 강하다.',
    strengths: [
      'Workspace 통합 — Gmail·Docs·Sheets·Drive 직접 연동',
      '초대형 컨텍스트 — 대량 자료 일괄 처리',
      'Deep Research — 출처 인용 리서치 보고서 자동 생성',
      'NotebookLM — 업로드한 매뉴얼·자료 기반 Q&A·요약',
      '멀티모달 — 이미지·영상 분석/생성',
    ],
    plans: [
      { name: 'Free', price: '무료', desc: '기본 모델' },
      { name: 'Google AI Pro', price: '약 $20/월', desc: '고급 모델·Deep Research·사용량 확대' },
      { name: 'Google AI Ultra', price: '상위 요금', desc: '최상위 모델·영상 생성 등 고급 기능' },
      { name: 'Workspace 연동', price: '문의', desc: '조직 계정에서 업무 앱 통합' },
    ],
    features: [
      { title: 'Workspace 통합', desc: '메일 초안·문서 요약·시트 분석을 앱 안에서 바로.' },
      { title: 'Deep Research', desc: '주제를 주면 다수 출처를 조사해 인용 포함 보고서 작성.' },
      { title: 'NotebookLM', desc: '내 매뉴얼·PDF를 올려 근거 기반 답변·오디오 요약.' },
      { title: 'Gems', desc: '용도별 맞춤 어시스턴트 생성.' },
    ],
    useCases: [
      { title: '마케팅·PM', desc: 'Deep Research로 시장·경쟁 조사 보고서를 빠르게 초안화.' },
      { title: '기술문서', desc: 'NotebookLM에 매뉴얼을 올려 현장 Q&A 어시스턴트로 활용.' },
      { title: 'DX·내부 협업', desc: 'Workspace 문서·메일 기반 업무 자동화.' },
    ],
    promptTips: [
      'Workspace 문서를 직접 참조시키고 “이 문서 근거로”라고 지정한다.',
      '리서치는 Deep Research, 내 자료 Q&A는 NotebookLM으로 구분해 쓴다.',
      '출처가 붙은 보고서를 요청하고 각주를 반드시 검수한다.',
    ],
    links: [
      { label: '공식 사이트', url: 'https://gemini.google.com' },
      { label: 'NotebookLM', url: 'https://notebooklm.google.com' },
    ],
    courseRefs: [
      { label: '제1권 PART03 · 1. Gemini 활용', to: '/vol/vol1/part/3' },
      { label: '제2권 PART03 · OCR·STT 디지털화', to: '/vol/vol2/part/3' },
    ],
  },
  {
    id: 'genspark',
    name: 'Genspark',
    vendor: 'Genspark AI',
    emoji: '⚡',
    color: 'brand',
    tagline: '위임형 AI Agent — 보고서·슬라이드·시트까지 끝까지 완성',
    overview:
      '여러 LLM을 백엔드로 묶은 에이전트형 도구다. 단순 대화를 넘어 작업을 “위임”하면 스스로 검색·정리·산출물 생성까지 다단계로 수행한다. Sparkpages(출처 인용 보고서), AI Slides·Sheets·Docs로 발표자료·표·문서를 자동 완성한다.',
    strengths: [
      'AI Agent — 위임하면 다단계 작업을 스스로 수행',
      'Multi-LLM 백엔드 — 작업에 맞는 모델 자동 활용',
      'Sparkpages — 출처 인용 리서치 페이지 자동 생성',
      'AI Slides/Sheets/Docs — 발표자료·표·문서 산출물 자동화',
      '결과물 중심 — “만들어줘”에 강함',
    ],
    plans: [
      { name: 'Free', price: '무료 크레딧', desc: '체험용 크레딧 제공' },
      { name: 'Plus / Pro', price: '유료 구독', desc: '크레딧 확대·고급 에이전트 기능' },
    ],
    features: [
      { title: 'AI Agent / Super Agent', desc: '목표를 주면 검색→정리→산출물 생성까지 위임 수행.' },
      { title: 'Sparkpages', desc: '주제 리서치를 출처 인용 페이지로 자동 구성.' },
      { title: 'AI Slides', desc: '내용만 주면 발표용 슬라이드 덱을 자동 생성.' },
      { title: 'AI Sheets/Docs', desc: '표·문서 산출물 자동 작성.' },
    ],
    useCases: [
      { title: '마케팅·PM', desc: '제품 소개 슬라이드·발표자료를 빠르게 자동 생성.' },
      { title: '영업·해외영업', desc: '시장 조사 Sparkpage + 제안용 자료 일괄 제작.' },
      { title: 'DX·통합 자동화', desc: '반복 리서치·산출물 작업을 에이전트에 위임.' },
    ],
    promptTips: [
      '“보고서/슬라이드/표까지 완성해줘”처럼 최종 산출물을 명시한다.',
      '에이전트 작업은 중간에 모니터링하고 핵심 수치는 검수한다.',
      '민감 자료는 넣지 말고, 공개·가공 가능한 자료로 위임한다.',
    ],
    links: [{ label: '공식 사이트', url: 'https://www.genspark.ai' }],
    courseRefs: [
      { label: '제1권 PART04 · Genspark와 AI Agent 활용', to: '/vol/vol1/part/4' },
      { label: '제1권 PART04 · 다단계 위임 실습 ★', to: '/vol/vol1/part/4' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    vendor: 'Perplexity AI',
    emoji: '🔎',
    color: 'rose',
    tagline: '출처를 인용하는 AI 검색 — 최신 정보·리서치에 최적',
    overview:
      '질문에 대해 웹을 실시간 검색하고, 답변에 각주로 출처를 달아주는 “AI 검색 엔진”이다. 최신 정보 확인과 사실 기반 리서치에 강하다. 여러 모델(ChatGPT·Claude·Gemini 계열)을 골라 쓸 수 있고, Spaces로 주제별 자료를 모아 협업하며, Deep Research로 심층 보고서를 만든다. ※ 교재 4대 도구에는 포함되지 않은 보조 리서치 도구.',
    strengths: [
      '출처 인용 — 모든 답변에 각주 링크, 사실 확인 용이',
      '최신성 — 실시간 웹 검색 기반',
      '모델 선택 — 작업에 맞춰 상위 모델 선택 사용',
      'Spaces — 주제별 자료·스레드 모음 협업',
      'Deep Research / Labs — 심층 리서치·산출물',
    ],
    plans: [
      { name: 'Free', price: '무료', desc: '기본 검색·제한된 Pro Search' },
      { name: 'Pro', price: '약 $20/월', desc: 'Pro Search 확대·모델 선택·파일 업로드·Deep Research' },
      { name: 'Enterprise', price: '문의', desc: '조직 보안·관리' },
    ],
    features: [
      { title: 'Answer + 출처', desc: '검색 결과를 종합한 답변에 각주 출처를 함께 제공.' },
      { title: 'Pro Search', desc: '여러 단계로 더 깊게 검색해 정밀한 답변 도출.' },
      { title: 'Spaces', desc: '주제별로 자료·대화를 모아 두고 팀과 공유.' },
      { title: 'Deep Research', desc: '광범위한 출처를 조사해 보고서 형태로 정리.' },
    ],
    useCases: [
      { title: '시장·경쟁 조사', desc: '최신 시장 동향·경쟁사 정보를 출처와 함께 빠르게 확인.' },
      { title: '해외영업', desc: '진출국 규제·인증·관세 등 사실 정보 1차 조사.' },
      { title: '기술 자료 확인', desc: '부품·규격·표준 등 외부 정보의 출처 기반 확인.' },
    ],
    promptTips: [
      '“출처와 함께, 최신 자료 기준으로”라고 명시하고 각주를 직접 확인한다.',
      '심층 조사는 Pro Search / Deep Research를 사용한다.',
      '검색 결과는 1차 자료일 뿐 — 중요한 수치는 원문 출처로 재확인한다.',
    ],
    links: [{ label: '공식 사이트', url: 'https://www.perplexity.ai' }],
    courseRefs: [
      { label: '제1권 PART01 · 4대 도구 개관(비교 관점)', to: '/vol/vol1/part/1' },
      { label: '제2권 PART01 · 데이터 가치·검수 관점', to: '/vol/vol2/part/1' },
    ],
  },
]

export function getTool(id) {
  if (id === 'prompt') return promptGuide
  return tools.find((t) => t.id === id) || null
}

export const toolMenu = [
  { id: 'prompt', name: '프롬프트 학습', emoji: '✍️' },
  ...tools.map((t) => ({ id: t.id, name: t.name, emoji: t.emoji })),
]
