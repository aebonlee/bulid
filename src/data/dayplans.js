// 일자별 8시간 교육 운영안 (제1·2권 각 6일)
// 1교시 50분 단위(8교시) + 점심(12:00–13:00). 각 과목은 학습→실습 교시로 배치.
// content.json 커리큘럼에서 자동 생성. 운영 상황에 맞게 조정 가능.
export const dayPlans = {
 "vol1": {
  "1": {
   "day": 1,
   "title": "생성형 AI와 건설기계 산업 이해",
   "partNum": 1,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 과정 안내",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "건설기계 산업과 AI 융합 동향",
     "desc": "글로벌·국내 건설기계 산업 현황 · 산업의 구조적 도전 — 모두 AI 도입의 동인 · 글로벌 산업 AI 도입 사례",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "건설기계 산업과 AI 융합 동향",
     "desc": "글로벌·국내 건설기계 산업 현황 · 산업의 구조적 도전 — 모두 AI 도입의 동인 · 글로벌 산업 AI 도입 사례",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "생성형 AI·LLM의 이해와 안전한 활용",
     "desc": "AX 전환의 이해 · 생성형 AI와 LLM의 작동 원리 · 환각과 검수 체계",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "4대 생성형 AI 도구 개관",
     "desc": "ChatGPT (OpenAI) · Gemini (Google) · Claude (Anthropic)",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "프롬프트 엔지니어링 기초",
     "desc": "좋은 프롬프트의 5대 원칙 · 건설기계 도메인 특화 프롬프트 패턴 (6가지) · [실습 1-1] 4도구 동시 비교",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "직무별 최적 도구 선정 (실습)",
     "desc": "자기 직무 업무 흐름도와 AI 적용 후보 · 데이터 형태·민감도와 도구 적합도 매트릭스 · 직무별 추천 도구 조합 (6직무)",
     "star": false,
     "partRef": "/vol/vol1/part/1"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/1"
    }
   ]
  },
  "2": {
   "day": 2,
   "title": "ChatGPT 심화 활용",
   "partNum": 2,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "ChatGPT 시작하기",
     "desc": "가입과 인터페이스 · 모델 선택과 메모리·맞춤 설정 · 파일 업로드와 응답 다운로드·공유",
     "star": false,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "ChatGPT 시작하기",
     "desc": "가입과 인터페이스 · 모델 선택과 메모리·맞춤 설정 · 파일 업로드와 응답 다운로드·공유",
     "star": false,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "핵심 기능 활용",
     "desc": "Code Interpreter — 코딩 없이 데이터 분석 · Vision — 이미지·도면 분석 · DALL-E — 이미지 생성",
     "star": false,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "실습",
     "title": "핵심 기능 활용",
     "desc": "Code Interpreter — 코딩 없이 데이터 분석 · Vision — 이미지·도면 분석 · DALL-E — 이미지 생성",
     "star": false,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "Custom GPT 구축 ★ (그날의 BIG WIN)",
     "desc": "Custom GPT 개념과 활용 가치 · Custom GPT 5단계 빌드 가이드 · 부서별 Custom GPT 실습 (3종)",
     "star": true,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "실습",
     "title": "Custom GPT 구축 ★ (그날의 BIG WIN)",
     "desc": "Custom GPT 개념과 활용 가치 · Custom GPT 5단계 빌드 가이드 · 부서별 Custom GPT 실습 (3종)",
     "star": true,
     "partRef": "/vol/vol1/part/2"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/2"
    }
   ]
  },
  "3": {
   "day": 3,
   "title": "Gemini와 Claude 심화 활용",
   "partNum": 3,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "Gemini 활용",
     "desc": "인터페이스와 Workspace 통합 · Deep Research — 출처 인용 자동 보고서 · NotebookLM — 매뉴얼 활용 어시스턴트",
     "star": false,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "Gemini 활용",
     "desc": "인터페이스와 Workspace 통합 · Deep Research — 출처 인용 자동 보고서 · NotebookLM — 매뉴얼 활용 어시스턴트",
     "star": false,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "Claude 활용 ★ (그날의 BIG WIN)",
     "desc": "인터페이스와 200K 컨텍스트 · Projects — 장문 문서 어시스턴트 · ★ Artifacts — 인터랙티브 자료 즉석 제작",
     "star": true,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "실습",
     "title": "Claude 활용 ★ (그날의 BIG WIN)",
     "desc": "인터페이스와 200K 컨텍스트 · Projects — 장문 문서 어시스턴트 · ★ Artifacts — 인터랙티브 자료 즉석 제작",
     "star": true,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "3대 도구 종합 비교와 직무별 조합",
     "desc": "3대 도구 종합 비교 매트릭스 · 직무별 추천 도구 조합 (업데이트)",
     "star": false,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "실습",
     "title": "3대 도구 종합 비교와 직무별 조합",
     "desc": "3대 도구 종합 비교 매트릭스 · 직무별 추천 도구 조합 (업데이트)",
     "star": false,
     "partRef": "/vol/vol1/part/3"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/3"
    }
   ]
  },
  "4": {
   "day": 4,
   "title": "Genspark와 AI Agent 활용",
   "partNum": 4,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "Genspark 핵심 기능",
     "desc": "인터페이스와 Multi-LLM 백엔드 · Sparkpages — 출처 인용 보고서 · AI Slides·Sheets·Docs — 산출물 자동 생성",
     "star": false,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "Genspark 핵심 기능",
     "desc": "인터페이스와 Multi-LLM 백엔드 · Sparkpages — 출처 인용 보고서 · AI Slides·Sheets·Docs — 산출물 자동 생성",
     "star": false,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "AI Agent ★ (위임형 AI — 그날의 BIG WIN)",
     "desc": "Chat vs Agent — 5가지 결정적 차이와 작동 원리 · [실습 4-4] 다단계 위임 — 위임·모니터링·개입·검수 · 한계·주의점과 베스트 프랙티스",
     "star": true,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "실습",
     "title": "AI Agent ★ (위임형 AI — 그날의 BIG WIN)",
     "desc": "Chat vs Agent — 5가지 결정적 차이와 작동 원리 · [실습 4-4] 다단계 위임 — 위임·모니터링·개입·검수 · 한계·주의점과 베스트 프랙티스",
     "star": true,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "4대 도구 종합 비교와 통합 워크플로우",
     "desc": "4대 도구 핵심 정체성과 선택 원칙 · 통합 워크플로우 — 신규 시장 진출 분석",
     "star": false,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "실습",
     "title": "4대 도구 종합 비교와 통합 워크플로우",
     "desc": "4대 도구 핵심 정체성과 선택 원칙 · 통합 워크플로우 — 신규 시장 진출 분석",
     "star": false,
     "partRef": "/vol/vol1/part/4"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/4"
    }
   ]
  },
  "5": {
   "day": 5,
   "title": "멀티모달 활용",
   "partNum": 5,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "이미지 분석·생성",
     "desc": "멀티모달 LLM 개념과 4도구 비교 · 이미지 분석 5가지 실습 · 이미지 생성과 한계·검수",
     "star": false,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "이미지 분석·생성",
     "desc": "멀티모달 LLM 개념과 4도구 비교 · 이미지 분석 5가지 실습 · 이미지 생성과 한계·검수",
     "star": false,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "음성 활용",
     "desc": "음성 처리 3가지 기술 · 회의록·인터뷰·통역 실습 · 음성 합성(TTS)과 Voice Mode",
     "star": false,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "실습",
     "title": "음성 활용",
     "desc": "음성 처리 3가지 기술 · 회의록·인터뷰·통역 실습 · 음성 합성(TTS)과 Voice Mode",
     "star": false,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "영상 분석과 멀티모달 통합 워크플로우 ★ (그날의 BIG WIN)",
     "desc": "영상 분석과 생성 · ★ 멀티모달 통합 워크플로우",
     "star": true,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "실습",
     "title": "영상 분석과 멀티모달 통합 워크플로우 ★ (그날의 BIG WIN)",
     "desc": "영상 분석과 생성 · ★ 멀티모달 통합 워크플로우",
     "star": true,
     "partRef": "/vol/vol1/part/5"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/5"
    }
   ]
  },
  "6": {
   "day": 6,
   "title": "자사 적용 프로토타입 구축 및 시연",
   "partNum": 6,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "종합 프로토타입 설계",
     "desc": "5일간 학습 종합과 설계 4단계 · 보안·데이터 거버넌스 가이드와 평가 기준",
     "star": false,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "종합 프로토타입 설계",
     "desc": "5일간 학습 종합과 설계 4단계 · 보안·데이터 거버넌스 가이드와 평가 기준",
     "star": false,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "6개 직무별 프로토타입",
     "desc": "직무 1 — 기술문서·매뉴얼: 다국어 매뉴얼 자동화 · 직무 2 — A/S 엔지니어: 정비 어시스턴트 · 직무 3 — 영업·견적: 견적 자동 생성",
     "star": false,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "실습",
     "title": "6개 직무별 프로토타입",
     "desc": "직무 1 — 기술문서·매뉴얼: 다국어 매뉴얼 자동화 · 직무 2 — A/S 엔지니어: 정비 어시스턴트 · 직무 3 — 영업·견적: 견적 자동 생성",
     "star": false,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "시연·확산·종합 정리 ★ (그날의 BIG WIN)",
     "desc": "프로토타입 시연 발표 가이드 (5분) · 사내 확산 90일 로드맵과 KPI·ROI · 6일간의 학습 여정과 수료",
     "star": true,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "실습",
     "title": "시연·확산·종합 정리 ★ (그날의 BIG WIN)",
     "desc": "프로토타입 시연 발표 가이드 (5분) · 사내 확산 90일 로드맵과 KPI·ROI · 6일간의 학습 여정과 수료",
     "star": true,
     "partRef": "/vol/vol1/part/6"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol1/part/6"
    }
   ]
  }
 },
 "vol2": {
  "1": {
   "day": 1,
   "title": "현장 데이터와 암묵지의 이해",
   "partNum": 1,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 과정 안내",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "암묵지와 형식지 (WHY)",
     "desc": "암묵지와 형식지란 · SECI 모델 — 지식 변환의 4단계 · 건설기계 산업의 암묵지 사례",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "암묵지와 형식지 (WHY)",
     "desc": "암묵지와 형식지란 · SECI 모델 — 지식 변환의 4단계 · 건설기계 산업의 암묵지 사례",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "건설기계 산업의 데이터 자산 (WHAT)",
     "desc": "데이터 자산의 5형태와 DIKW 가치 위계 · 직무별 데이터 자산 · [실습 1-1] 자사 데이터 자산 인벤토리 작성",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "디지털 전환과 데이터 가치 (CASE)",
     "desc": "디지털 전환 3단계와 글로벌·국내 사례 · [실습 1-2] 자사 데이터 자산 진단 (4분면 매트릭스)",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "실습",
     "title": "디지털 전환과 데이터 가치 (CASE)",
     "desc": "디지털 전환 3단계와 글로벌·국내 사례 · [실습 1-2] 자사 데이터 자산 진단 (4분면 매트릭스)",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "디지털화 5단계 워크플로우 (HOW)",
     "desc": "5단계 워크플로우와 6일 학습 매핑 · [실습 1-3] Step 1 식별 — 자기 직무 워크플로우 매핑",
     "star": false,
     "partRef": "/vol/vol2/part/1"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/1"
    }
   ]
  },
  "2": {
   "day": 2,
   "title": "암묵지 캡처 — 스마트폰 기반 현장 데이터 수집",
   "partNum": 2,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "스마트폰 데이터 수집 도구",
     "desc": "카메라 활용 — 효과적 사진 촬영 · 마이크 활용 — 음성 메모와 인터뷰 녹음 · 데이터 수집 앱 — 양식화 입력",
     "star": false,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "스마트폰 데이터 수집 도구",
     "desc": "카메라 활용 — 효과적 사진 촬영 · 마이크 활용 — 음성 메모와 인터뷰 녹음 · 데이터 수집 앱 — 양식화 입력",
     "star": false,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "데이터 수집 방법론 — 효율적 수집 5원칙",
     "desc": "효율적 수집의 5원칙 · 보안 등급 4단계 분류 · 부서별 수집 시나리오",
     "star": false,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "베테랑 인터뷰 가이드",
     "desc": "인터뷰 준비 5단계 · 효과적 질문 기법 — 5W1H + Why-5 · 인터뷰 진행과 24시간 정리 룰",
     "star": false,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "실습",
     "title": "베테랑 인터뷰 가이드",
     "desc": "인터뷰 준비 5단계 · 효과적 질문 기법 — 5W1H + Why-5 · 인터뷰 진행과 24시간 정리 룰",
     "star": false,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "1주일 데이터 수집 시스템 설계 ★ (그날의 BIG WIN)",
     "desc": "7일 수집 시스템 개관 · [실습 2-4] 자기 부서 1주일 시스템 설계",
     "star": true,
     "partRef": "/vol/vol2/part/2"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/2"
    }
   ]
  },
  "3": {
   "day": 3,
   "title": "OCR·STT 디지털화 기술",
   "partNum": 3,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "디지털화 기술 개관",
     "desc": "디지털화 4가지 기술과 도구 비교 · 정확도와 한계, 검수 원칙",
     "star": false,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "디지털화 기술 개관",
     "desc": "디지털화 4가지 기술과 도구 비교 · 정확도와 한계, 검수 원칙",
     "star": false,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "OCR — 이미지를 텍스트로",
     "desc": "[실습 3-1] 도면 OCR — 부품 정보 자동 추출 · [실습 3-2] 종이 점검표 OCR + 정비 이력 DB · [실습 3-3] 베테랑 손글씨 노트 OCR과 다국어 처리",
     "star": false,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "STT — 음성을 텍스트로",
     "desc": "[실습 3-4] 회의 STT — 자동 회의록 · [실습 3-5] 베테랑 인터뷰 STT — 노하우 데이터셋 · 화자 분리·다국어 음성 처리",
     "star": false,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "실습",
     "title": "STT — 음성을 텍스트로",
     "desc": "[실습 3-4] 회의 STT — 자동 회의록 · [실습 3-5] 베테랑 인터뷰 STT — 노하우 데이터셋 · 화자 분리·다국어 음성 처리",
     "star": false,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "영상·자동 분류와 디지털화 자동 파이프라인 ★ (그날의 BIG WIN)",
     "desc": "[실습 3-6] 정비 영상 → 단계별 매뉴얼과 자동 분류 · [실습 3-7] 부서별 디지털화 자동 파이프라인 설계",
     "star": true,
     "partRef": "/vol/vol2/part/3"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/3"
    }
   ]
  },
  "4": {
   "day": 4,
   "title": "데이터 구조화·표준화",
   "partNum": 4,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "데이터 구조화 개관",
     "desc": "정형 vs 비정형과 구조화 4단계",
     "star": false,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "데이터 구조화 개관",
     "desc": "정형 vs 비정형과 구조화 4단계",
     "star": false,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "메타데이터 설계",
     "desc": "자사 메타데이터 표준 양식 (15요소) · [실습 4-1] 자기 부서 메타데이터 표준 양식과 AI 자동 부여",
     "star": false,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "분류 체계 (Taxonomy)",
     "desc": "Taxonomy 5원칙과 다중·계층 분류 · [실습 4-2] 자기 부서 분류 체계 작성",
     "star": false,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "실습",
     "title": "분류 체계 (Taxonomy)",
     "desc": "Taxonomy 5원칙과 다중·계층 분류 · [실습 4-2] 자기 부서 분류 체계 작성",
     "star": false,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "AI 학습용 라벨링과 5계층 거버넌스 ★ (그날의 BIG WIN)",
     "desc": "AI 학습용 라벨링 · [실습 4-3] 자사 데이터 거버넌스 문서 (5계층 통합)",
     "star": true,
     "partRef": "/vol/vol2/part/4"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/4"
    }
   ]
  },
  "5": {
   "day": 5,
   "title": "데이터 품질 관리·라벨링·검증",
   "partNum": 5,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "데이터 품질 개관 (GIGO)",
     "desc": "GIGO와 품질 관리 ROI",
     "star": false,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "데이터 품질 개관 (GIGO)",
     "desc": "GIGO와 품질 관리 ROI",
     "star": false,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "데이터 품질 6대 차원",
     "desc": "6대 품질 차원 · 차원별 측정과 자동화",
     "star": false,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "데이터 클린징·정제 기법",
     "desc": "클린징 5단계와 결측·중복·이상치 처리 · 검수·정기 감사 (3 Layer)",
     "star": false,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "실습",
     "title": "데이터 클린징·정제 기법",
     "desc": "클린징 5단계와 결측·중복·이상치 처리 · 검수·정기 감사 (3 Layer)",
     "star": false,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "자사 데이터 품질 관리 시스템 ★ (그날의 BIG WIN)",
     "desc": "[실습 5-1] 자사 데이터 품질 측정·관리",
     "star": true,
     "partRef": "/vol/vol2/part/5"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/5"
    }
   ]
  },
  "6": {
   "day": 6,
   "title": "자사 KPI 데이터 자산화 프로젝트",
   "partNum": 6,
   "blocks": [
    {
     "period": "1교시",
     "start": "09:00",
     "end": "09:50",
     "type": "도입",
     "title": "오리엔테이션 · 전일 회고",
     "desc": "학습 목표 안내와 실습 환경 준비",
     "partRef": null
    },
    {
     "period": "2교시",
     "start": "10:00",
     "end": "10:50",
     "type": "학습",
     "title": "5일 학습 회고",
     "desc": "핵심 개념 학습",
     "star": false,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "3교시",
     "start": "11:00",
     "end": "11:50",
     "type": "실습",
     "title": "5일 학습 회고",
     "desc": "핵심 개념 학습",
     "star": false,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "점심",
     "start": "12:00",
     "end": "13:00",
     "type": "점심",
     "title": "점심 식사",
     "desc": "",
     "partRef": null
    },
    {
     "period": "4교시",
     "start": "13:00",
     "end": "13:50",
     "type": "학습",
     "title": "KPI 자산화 (4대 영역)",
     "desc": "데이터 자산화 KPI 4대 영역",
     "star": false,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "5교시",
     "start": "14:00",
     "end": "14:50",
     "type": "학습",
     "title": "ROI와 임원 보고",
     "desc": "ROI 4배 검증과 임원 보고 5단계",
     "star": false,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "6교시",
     "start": "15:00",
     "end": "15:50",
     "type": "학습",
     "title": "자사 적용 종합 실습 (6직무별 프로토타입)",
     "desc": "[실습 6-1] 자기 직무 종합 프로토타입",
     "star": false,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "7교시",
     "start": "16:00",
     "end": "16:50",
     "type": "학습",
     "title": "자사 90일 데이터 자산화 로드맵 ★ (그날의 BIG WIN)",
     "desc": "90일 4 Phase 로드맵",
     "star": true,
     "partRef": "/vol/vol2/part/6"
    },
    {
     "period": "8교시",
     "start": "17:00",
     "end": "17:50",
     "type": "정리",
     "title": "정리 · 회고 · Q&A",
     "desc": "실습 산출물 점검과 질의응답",
     "partRef": "/vol/vol2/part/6"
    }
   ]
  }
 }
}
