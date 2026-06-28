// AI 도구 가이드 데이터
// 교재(제1권)에 ChatGPT·Gemini·Claude·Genspark + 프롬프트가 수록되어 있어
// 해당 커리큘럼으로 딥링크하고, Perplexity는 신규 정리.
// ※ 요금제·모델명·기능은 변동될 수 있으므로 강의/실사용 전 공식 사이트에서 재확인 필요.

// 도구 상세 페이지의 표준 섹션(좌측 메뉴 앵커와 공유)
export const TOOL_SECTIONS = [
  { id: 'overview', label: '개요', emoji: '📖' },
  { id: 'strengths', label: '강점·요금제', emoji: '💪' },
  { id: 'features', label: '핵심 기능', emoji: '✨' },
  { id: 'usecases', label: '실무 활용', emoji: '🏗️' },
  { id: 'practices', label: '실습 사례', emoji: '🧪' },
  { id: 'tips', label: '활용 팁', emoji: '💡' },
  { id: 'links', label: '링크·교재', emoji: '🔗' },
]

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
      template: '너는 [역할]이다.\n[배경/맥락]을 고려해서,\n[구체 작업]을 수행하라.\n결과는 [출력형식]으로 작성하라.',
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
    practices: [
      {
        level: '실전',
        title: '실습 ① 부서 전용 Custom GPT 만들기',
        goal: 'A/S 부서의 정비 트러블슈팅을 돕는 전용 GPT를 코딩 없이 구축한다.',
        steps: [
          'ChatGPT → ‘GPT 만들기(Explore GPTs > Create)’ 진입',
          '이름·설명 설정: “굴삭기 정비 어시스턴트”',
          'Instructions에 역할·답변 규칙 입력(아래 프롬프트 참고)',
          'Knowledge에 정비 매뉴얼·트러블슈팅 PDF 업로드',
          '대화로 테스트 후 ‘부서 공유’ 링크 발급',
        ],
        prompt:
          '너는 굴삭기 정비 A/S 어시스턴트다. 사용자가 증상을 말하면 (1) 예상 원인을 우선순위로, (2) 점검 순서를, (3) 안전 주의사항을 표로 제시하라. 업로드된 매뉴얼에 근거하고, 근거가 없으면 “매뉴얼 확인 필요”라고 답하라.',
        result: '증상 입력만으로 매뉴얼 근거의 진단 표가 나오는 전용 봇 완성. 신입 기사 교육·현장 1차 대응에 활용.',
      },
      {
        level: '실전',
        title: '실습 ② Code Interpreter로 정비 이력 분석',
        goal: '정비 이력 엑셀을 업로드해 고장 패턴과 비용을 자동 분석·시각화한다.',
        steps: [
          '정비 이력 파일(.xlsx/.csv) 업로드',
          '“부품별 고장 빈도 상위 10개를 막대그래프로” 요청',
          '“월별 정비 비용 추세선과 이상치 표시” 요청',
          '“예방정비가 필요한 부품 추천과 근거” 요청',
        ],
        prompt:
          '업로드한 정비 이력 데이터를 분석하라. ① 부품별 고장 빈도 TOP10 막대그래프, ② 월별 정비비 추세선(이상치 표시), ③ 고장 빈발 부품의 예방정비 권고를 표로 제시하라.',
        result: '코딩 없이 그래프·인사이트 도출. 예방정비 계획·임원 보고 자료로 바로 활용.',
      },
      {
        level: '입문',
        title: '실습 ③ Vision으로 도면·점검표 읽기',
        goal: '부품 도면·손글씨 점검표 사진에서 정보를 자동 추출한다.',
        steps: [
          '도면 또는 점검표 사진 업로드',
          '“이 도면의 주요 치수·부품번호를 표로 정리” 요청',
          '“손글씨 점검표를 디지털 표로 변환(불명확한 글자는 [?] 표기)” 요청',
        ],
        prompt:
          '이 굴삭기 부품 도면 이미지를 분석해 부품번호·명칭·주요 치수를 표로 정리하라. 판독이 불확실한 항목은 “확인 필요”로 표기하라.',
        result: '종이 자료의 빠른 디지털화. 제2권의 OCR 디지털화와 연계해 데이터 자산화로 확장.',
      },
      {
        level: '심화',
        title: '실습 ④ Tasks로 주간 보고 자동화',
        goal: '매주 정해진 시각에 반복 업무를 자동 실행시킨다.',
        steps: [
          '“매주 금요일 오후 4시에 이번 주 정비 요약 템플릿을 생성” 형태로 Task 등록',
          '생성 결과를 검수하는 체크 항목 지정',
          '필요 시 Custom GPT와 결합해 사내 양식으로 출력',
        ],
        prompt:
          '매주 금요일 16:00에 “이번 주 정비 실적 보고” 초안을 생성하라. 항목: 총 정비 건수, 주요 고장 유형 3가지, 다음 주 예방정비 권고. 표 형식으로.',
        result: '반복 보고 업무를 예약 자동화. 사람은 검수만 — BIG WIN 사례.',
      },
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
    practices: [
      {
        level: '실전',
        title: '실습 ① Project로 매뉴얼 Q&A 어시스턴트',
        goal: '제품 매뉴얼·규정을 올려 “그 문서 기준”으로만 답하는 어시스턴트를 만든다.',
        steps: [
          'Claude → Projects → 새 프로젝트 생성',
          'Project Knowledge에 매뉴얼·규정 PDF 업로드',
          'Custom instructions에 “업로드 문서에 근거해서만 답하라” 규칙 추가',
          '현장 질문으로 테스트(근거 페이지 인용 요청)',
        ],
        prompt:
          '업로드한 매뉴얼에 근거해서만 답하라. 각 답변 끝에 근거 위치(섹션/페이지)를 표기하고, 문서에 없으면 “문서에 없음”이라고 답하라. 질문: 30톤 굴삭기 유압유 교체 주기는?',
        result: '환각 없는 사내 지식 어시스턴트. 근거 인용으로 신뢰도 확보.',
      },
      {
        level: '실전',
        title: '실습 ② Artifacts로 점검 체크리스트 앱 즉석 제작',
        goal: '대화만으로 인터랙티브 점검 체크리스트를 생성해 바로 사용·배포한다.',
        steps: [
          '“일상점검 항목으로 체크박스 웹앱을 만들어줘” 요청',
          'Artifact 미리보기에서 동작 확인',
          '“항목 추가/PDF 출력 버튼 넣어줘”로 수정',
          '공유 링크로 현장 배포',
        ],
        prompt:
          '굴삭기 일상점검용 인터랙티브 체크리스트를 Artifact로 만들어줘. 항목(엔진오일·유압유·냉각수·타이어·안전벨트 등) 체크박스, 점검자/날짜 입력, 완료율 표시, 인쇄 버튼 포함.',
        result: '개발 없이 즉석 도구 제작. 현장 점검 디지털화의 빠른 프로토타입.',
      },
      {
        level: '심화',
        title: '실습 ③ 장문 계약서·ITB 위험 검토',
        goal: '수십 페이지 해외 계약서에서 불리한 조항을 한 번에 식별한다.',
        steps: [
          '계약서/ITB 전문을 붙여넣거나 업로드',
          '위험 조항 식별 + 근거 인용 요청',
          '“독소조항 우선순위와 대안 문구” 요청',
        ],
        prompt:
          '아래 수출 계약서를 검토하라. 공급사(우리)에게 불리한 조항을 찾아 “조항/위험내용/위험도/수정 제안” 표로 정리하고, 각 항목에 원문 위치를 인용하라. 확신이 낮으면 “법무 확인 필요”로 표기하라.',
        result: '장문 검토 시간 대폭 단축. 위험 조항 누락 방지(최종 판단은 법무).',
      },
      {
        level: '실전',
        title: '실습 ④ 다국어 매뉴얼 번역·용어 통일',
        goal: '매뉴얼을 현지어로 번역하면서 전문용어·안전문구를 일관되게 유지한다.',
        steps: [
          '원문 + 사내 용어집을 함께 제공',
          '대상 언어·독자 수준 지정',
          '“용어집 우선 적용, 안전문구 원형 유지” 제약 부여',
        ],
        prompt:
          '아래 매뉴얼을 인도네시아어로 번역하라. 첨부 용어집 표기를 우선 적용하고, 안전 경고문은 의미 손실 없이 현지 표준 형식으로, 단위는 현지 기준으로 변환하라. 원문/번역 2열 표로.',
        result: '번역 초안 시간 약 70% 절감, 용어 일관성 확보.',
      },
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
    practices: [
      {
        level: '실전',
        title: '실습 ① Deep Research로 시장·경쟁 보고서',
        goal: '진출 후보 시장을 출처 인용 보고서로 자동 조사한다.',
        steps: [
          'Gemini → Deep Research 선택',
          '조사 주제·범위·기간 지정',
          '생성된 리서치 계획 검토·수정',
          '보고서 생성 후 각주 출처 검수 → Docs로 내보내기',
        ],
        prompt:
          '동남아(인도네시아·베트남) 미니 굴삭기 시장을 조사하라. 시장 규모·성장률, 주요 경쟁사, 수입 규제·인증, 현지 유통 구조를 출처와 함께 정리하고 진출 시 리스크를 요약하라.',
        result: '수일 걸리던 1차 시장조사를 보고서 초안으로 단축(수치는 출처 검수 필수).',
      },
      {
        level: '실전',
        title: '실습 ② NotebookLM 매뉴얼 어시스턴트',
        goal: '제품 매뉴얼·기술자료를 올려 근거 기반 Q&A·오디오 요약을 만든다.',
        steps: [
          'notebooklm.google.com 접속 → 새 노트북',
          '매뉴얼·기술문서 PDF 여러 개 업로드(소스)',
          '질문하면 근거 인용과 함께 답변',
          '“오디오 개요(팟캐스트)” 생성으로 교육자료화',
        ],
        prompt:
          '업로드한 매뉴얼을 근거로 답하라: 유압시스템 정기 점검 항목과 주기를 표로 정리하고 각 항목의 근거 위치를 표시하라.',
        result: '현장용 근거 기반 Q&A + 신입 교육용 오디오 요약 확보.',
      },
      {
        level: '입문',
        title: '실습 ③ Workspace 업무 자동화',
        goal: 'Gmail·Docs·Sheets에서 바로 초안·요약·분석을 수행한다.',
        steps: [
          'Gmail에서 긴 고객 문의 스레드 “요약 + 답장 초안” 요청',
          'Docs에서 회의록 “핵심 결정·할 일 추출”',
          'Sheets에서 판매 데이터 “요약·차트” 요청',
        ],
        prompt:
          '이 고객 문의 메일 스레드를 3줄로 요약하고, 정중한 답장 초안을 작성해줘. 납기 관련 미확정 내용은 [확인]으로 표기.',
        result: '업무 앱 안에서 즉시 처리 — 맥락 전환 없이 생산성 향상.',
      },
      {
        level: '심화',
        title: '실습 ④ Gems로 반복 업무 어시스턴트',
        goal: '자주 쓰는 작업을 Gem(맞춤 어시스턴트)으로 고정한다.',
        steps: [
          'Gemini → Gems → 새 Gem 만들기',
          '역할·말투·출력형식을 지시문으로 고정',
          '예: “견적 메일 작성 Gem”, “기술용어 번역 Gem”',
        ],
        prompt:
          '너는 건설기계 견적 메일 작성기다. 고객명·장비·수량·납기를 주면 정중한 견적 안내 메일을 작성하라. 가격 미정 항목은 [확인]으로 표기.',
        result: '반복 작업을 버튼 하나로 — 부서 표준 어시스턴트 확보.',
      },
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
    practices: [
      {
        level: '실전',
        title: '실습 ① AI Slides로 제품 발표자료 자동 생성',
        goal: '내용만 주고 발표용 슬라이드 덱을 한 번에 완성한다.',
        steps: [
          'Genspark → AI Slides 선택',
          '제품·청중·분량·톤 입력',
          '생성된 덱의 구성·디자인 수정',
          'PPT/PDF로 내보내기',
        ],
        prompt:
          '신형 전동 굴삭기 소개 슬라이드 10장을 만들어줘. 청중은 도심 건설사 구매담당, 구성: 문제제기→제품강점(저소음·무배출·연료절감)→비교표→도입효과→문의. 비즈니스 톤.',
        result: '발표자료 초안 시간 대폭 단축. 디자인·구성까지 자동.',
      },
      {
        level: '실전',
        title: '실습 ② Sparkpages 시장 리서치',
        goal: '주제를 주면 출처가 달린 리서치 페이지를 자동 생성한다.',
        steps: [
          'Sparkpages에 조사 주제 입력',
          '생성 결과의 출처·수치 검수',
          '필요 섹션 추가 질문으로 보강',
          '제안서·보고서에 인용',
        ],
        prompt:
          '“2026 글로벌 건설기계 AI 도입 동향”을 출처와 함께 정리한 리서치 페이지를 만들어줘. 주요 기업 사례, 투자 동향, 직무별 적용 영역 포함.',
        result: '출처 포함 리서치 페이지 확보(중요 수치는 원문 재확인).',
      },
      {
        level: '심화',
        title: '실습 ③ AI Agent 다단계 위임',
        goal: '검색→정리→산출물까지 다단계 작업을 위임하고 검수한다.',
        steps: [
          '목표를 한 문장으로 위임(아래 프롬프트)',
          '에이전트의 작업 계획 확인·승인',
          '진행 중간 산출물 모니터링·개입',
          '최종 결과 검수 후 활용',
        ],
        prompt:
          '베트남 미니 굴삭기 시장 진출 검토 자료를 만들어줘. ① 시장·경쟁·규제 조사 → ② 핵심 요약 → ③ 의사결정용 슬라이드 8장까지 완성해줘.',
        result: '리서치+요약+산출물을 한 번의 위임으로 — PART04 BIG WIN 사례.',
      },
      {
        level: '입문',
        title: '실습 ④ AI Sheets로 비교표 자동 작성',
        goal: '비교·정리형 표 산출물을 자동으로 만든다.',
        steps: [
          'AI Sheets에 비교 대상·항목 입력',
          '“가중치 점수·합계 열 추가” 요청',
          '시트로 내보내 가공',
        ],
        prompt:
          '경쟁 미니 굴삭기 5개 모델을 가격·중량·버킷용량·연비·보증으로 비교하는 표를 만들고, 구매담당 관점 가중치 점수와 추천 순위를 추가해줘.',
        result: '의사결정용 비교표를 즉시 확보.',
      },
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
    practices: [
      {
        level: '입문',
        title: '실습 ① 출처 기반 사실 확인',
        goal: '최신 수치·사실을 각주 출처와 함께 빠르게 확인한다.',
        steps: [
          '질문 입력 + “출처와 함께, 최신 기준” 명시',
          '답변 하단 각주 링크 클릭해 원문 확인',
          '필요 시 “더 최신 자료로” 후속 질문',
        ],
        prompt:
          '글로벌 건설기계 시장 규모와 성장률(CAGR)을 최신 자료 기준으로 알려줘. 각 수치의 출처와 기준 연도를 함께 표기해줘.',
        result: '근거 있는 수치 확보. 보고서·제안서의 1차 팩트체크에 활용.',
      },
      {
        level: '실전',
        title: '실습 ② 진출국 규제·인증 1차 조사',
        goal: '해외영업에 필요한 규제·인증·관세를 출처 기반으로 정리한다.',
        steps: [
          'Pro Search 사용',
          '국가·품목·항목(인증/관세/수입요건) 지정',
          '출처별 상이한 내용은 비교 정리 요청',
        ],
        prompt:
          '인도네시아에 건설기계(굴삭기) 수출 시 필요한 인증·수입 규제·관세를 정리해줘. 항목별 근거 출처를 표로 제시하고, 불확실한 부분은 표시해줘.',
        result: '진출 검토용 규제 체크리스트 초안(법무·관세사 확인 전제).',
      },
      {
        level: '심화',
        title: '실습 ③ Deep Research 심층 보고서',
        goal: '광범위한 출처를 조사해 보고서 형태로 받는다.',
        steps: [
          'Deep Research 선택',
          '조사 주제·관점 구체화',
          '생성 보고서의 출처·논리 검수 후 재구성',
        ],
        prompt:
          '“건설기계 산업의 예측정비(Predictive Maintenance) 도입 동향과 ROI”를 심층 조사해줘. 글로벌 사례, 도입 효과 수치, 한계와 도입 단계를 출처와 함께 정리.',
        result: '주제 심층 보고서 초안. 기획·전략 자료의 출발점.',
      },
      {
        level: '실전',
        title: '실습 ④ Spaces로 팀 리서치 아카이브',
        goal: '주제별로 검색·자료를 모아 팀과 공유하는 리서치 공간을 만든다.',
        steps: [
          'Spaces → 새 Space(예: “동남아 시장 조사”)',
          '관련 질문·파일·링크 축적',
          '맞춤 지시문으로 답변 톤·형식 고정',
          '팀 초대·공유',
        ],
        prompt:
          '이 Space는 동남아 건설기계 시장 조사용이다. 답변은 항상 출처를 표기하고, 수치는 기준 연도를 함께 적어줘.',
        result: '흩어진 리서치를 한곳에 — 팀 지식 아카이브화.',
      },
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
