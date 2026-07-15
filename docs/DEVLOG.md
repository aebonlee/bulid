# 개발일지 — 건설기계 AI역량강화 학습사이트 (bulid)

> 2026년 산업전문인력 AI역량강화(건설기계) 과정의 온라인 학습 플랫폼
> 🔗 https://bulid.dreamitbiz.com · repo: github.com/aebonlee/bulid · 개발: 2026-06-28

---

## 1. 프로젝트 개요

교재(제1권·제2권, 각 6일 과정)를 온라인 학습사이트로 구축한 프로젝트.
교재 원본(docx)을 구조화 JSON으로 파싱해 콘텐츠로 삼고, 그 위에 **교재 열람 · 교육일정 · 실습 따라하기 · 프롬프트학습 · AI 도구 가이드 · 부록(업무별 프롬프트) · 도장깨기 대시보드**를 얹었다.

| 구분 | 내용 |
|------|------|
| 도메인 | bulid.dreamitbiz.com (커스텀 도메인, CNAME) |
| 과정 | 제1권 *생성형 AI 기반 업무 자동화 전문가 과정* / 제2권 *AI 적용을 위한 현장 데이터 수집 및 디지털화* — 각 6일(DAY 1~6) |
| 스택 | React 18 · Vite 5 · Tailwind CSS 3 · React Router(HashRouter) · Supabase |
| 인증/진도 | Google·Kakao OAuth(Supabase) + 진도(localStorage↔Supabase 동기화) |
| 배포 | GitHub Actions → GitHub Pages 자동배포(main push), base `/` |

---

## 2. 기술 스택 & 구조

```
src/
  main.jsx / App.jsx          # HashRouter + 라우팅
  index.css                   # Tailwind + 본문 타이포
  lib/supabase.js             # Supabase 클라이언트(공용 프로젝트, fallback 하드코딩)
  context/
    AuthContext.jsx           # 구글/카카오 OAuth
    ProgressContext.jsx       # DAY 학습완료(↔Supabase) + 실습완료(localStorage)
  components/
    Header.jsx Sidebar.jsx Layout.jsx
    BlockRenderer.jsx         # 교재 블록(본문·표·그림·실습·콜아웃) 렌더
    DayPlan.jsx Icon.jsx LoginModal.jsx
  data/
    content.json (590KB)      # 교재 파싱 결과(2권×8PART, 표144·그림43)
    courses.js                # content 헬퍼
    tools.js                  # 5개 AI 도구 가이드 + 프롬프트 패턴
    promptLab.js              # 프롬프트 5요소·SCORE 채점·과목별 예제·따라하기
    appendix.js               # 부록(업무별 프롬프트, 80점+)
    dayplans.js               # 일자별 8시간(50분 교시) 운영안
    labs.js                   # 실습 따라하기(DAY별 10개+)
    about.js                  # 제작의도·강사·회사
  pages/
    Home VolumeOverview PartPage Schedule Labs
    ToolsHome ToolPage PromptLab Appendix
    About InstructorIntro CompanyIntro Dashboard
public/book-images/           # 교재 이미지 43개
supabase/schema.sql           # bulid_ 접두사 테이블 + 안전 트리거
scripts/gen-og.mjs            # OG 이미지 생성(sharp)
.github/workflows/deploy.yml  # Actions 자동배포
books/                        # 교재 원본(대용량, gitignore)
```

---

## 3. 콘텐츠 파이프라인 (교재 → JSON)

- 원본 `books/제1권_2권.docx`(v1.0 통합본, 54MB)를 Python(`python-docx` XML 직접 파싱)으로 처리.
- 본문 순서대로 **단락 + 표(w:tbl) + 이미지(blip→rels→media)** 를 추출.
- 블록 타입 분류: `para·objectives·keywords·figure·table·promptbox·bullets·exercise·tip·case·link·warning·outcome·label·table-cap`.
- 구조: **권(2) → PART(01~08) → 절(1.) → 항(1)) → 블록**. PART01~06 = DAY 1~6.
- 결과 `src/data/content.json`(590KB), 표 144개·그림 53개(이미지 43개)·실습/사례/Tip 포함.

---

## 4. 주요 기능 (메뉴)

| 메뉴 | 경로 | 설명 |
|------|------|------|
| 업무자동화과정 / 현장데이터활용과정 | `/vol/:volId` | **교재 전체 목차**(PART→절→항) + 본문 페이지(`/part/:n`), 마침표 단위 줄바꿈 |
| 교육일정 | `/schedule/:volId` | **1교시 50분(8교시) + 점심** 일자별 운영안, 학습↔실습 항목→교재 링크 |
| 실습 : 따라하기 | `/labs/:volId/:day` | DAY별 개별 페이지, **실습 10개+/DAY**, 5요소·80점+ 프롬프트, 시간별 단계, 실습 완료 체크 |
| 프롬프트학습 | `/tools/prompt/:section` | 학습하기 / 실전패턴 / 과목별 예제 / 평가 실습(SCORE 자동채점) / 따라하기 |
| ChatGPT·Claude·Gemini·Genspark·Perplexity | `/tools/:id/:section` | 각 도구 멀티페이지: 개요·시작하기 / 기능 상세 / 실무·실습 / 사례집 / 프롬프트·팁 |
| 부록 | `/appendix/:catId` | 업무별 프롬프트(이메일·보고서·회의록·번역·데이터·기획·마케팅·고객응대·학습) 카테고리별 80점+ 예제 |
| 내 학습 | `/dashboard` | **도장깨기**: DAY 학습완료 도장 + 실습 진행률 + 전체 진행 링, 완주 배지 |
| About | `/about` `/about/instructor` `/about/company` | 제작의도 / 강사 소개 / 회사 소개 |

- 좌측 사이드바는 컨텍스트별 분기(교재 목차 / 일정 / 실습 / 도구 / 프롬프트 / 부록 / About).
- 아이콘은 Font Awesome 6(이모지 전면 제거).
- 프롬프트 문안은 요청형(“~해줘”) 톤 통일.

---

## 5. 인증 · 진도 · Supabase

- **로그인**: 구글 이메일 + 카카오(Supabase OAuth). `수강신청` 없이 **학습완료 기반 도장깨기**.
- **진도**: DAY 학습완료는 localStorage↔`bulid_progress`(로그인 시) 동기화. 실습 완료는 localStorage.
- **스키마**(`supabase/schema.sql`): `bulid_profiles`·`bulid_progress` + RLS + 회원가입 트리거(SECURITY DEFINER · `search_path=public` 고정 · 예외처리 → 공용 프로젝트 전체 가입 마비 방지).
- 공용 Supabase 프로젝트 사용, 클린 빌드 대비 URL/anon key fallback 하드코딩.

> 운영 시 필요: Supabase SQL Editor에서 `schema.sql` 실행 + Auth Providers에서 Google·Kakao 활성화.

---

## 6. 개발 진행 이력 (요약)

1. **사이트 구축** — 교재 docx→content.json 파싱, React/Vite/Tailwind/Supabase 스캐폴딩, OG 이미지, Actions 배포.
2. **AI 도구 가이드 + About** 추가 → About 최우선·4대 도구 개별 메뉴.
3. **프롬프트 PromptLab**(5요소·SCORE 채점) → contents 사이트 패턴 이식.
4. **컨텍스트별 좌측 메뉴** 분기, 도구 실습 사례 확충.
5. **이모지 → Font Awesome** 전면 교체, 강사/회사 별도 페이지.
6. **교재(목차) ↔ 교육일정 분리**, 일정 50분 교시화, 교재 좌측 메뉴=전체 목차.
7. **프롬프트 5개 하위메뉴** 분리(+따라하기), 도구 멀티페이지화(+사례집).
8. **부록(업무별 프롬프트)** 개별 페이지·80점+ 예제, **도장깨기 대시보드**.
9. 톤 요청형 통일, 마침표 줄바꿈, 메뉴명/가로폭/폰트 정리.
10. **실습 : 따라하기** 신설 → 5요소·시간별·DAY별 개별 페이지, **DAY당 실습 10개+**, 실습 완료 검증을 대시보드에 통합.
11. **제1권 전면 최적화(2026-07-15)** — 6일 전문가 과정·인쇄 교재 기준으로 PART 01~06 전량 재편집.
    - **구조 교정**: 블록 타입 오용(사례가 keywords/promptbox에 뭉친 것 등) 30여 건 분리, 소견출 para→label, 뭉친 실습 문단→exercise(목표→입력→절차→산출물→검수 구조), 그림·표·코드 번호 PART별 일련화, 이모지 제거·교재체 통일.
    - **버전 갱신(2026-07 웹 검증 팩트시트 기준)**: GPT-5.6(Sol/Terra/Luna)·GPT Image 2(DALL-E 2026-05 종료)·GPT-Live-1 음성·Sora 종료 반영 / Gemini 3.5 Flash·3.1 Pro·Veo 3.1·Nano Banana 2·NotebookLM(Gemini 3.5 기반) / Claude 5 패밀리(Fable 5·Sonnet 5) / Genspark Super Agent+Claw+Office 플러그인·MS 파트너십. PART 07~08(실습종합·부록 용어집)과 dayplans.js의 구표기도 동기화.
    - **강화**: promptbox 32→82개(전 실습에 복붙 가능한 표준 골격 프롬프트, `[코드 P-N]` 캡션 통일), tip 0→40개(강사 운영·현장 팁), link 연계 학습 30여 개, PART 마무리 표준 5종(핵심 요약·베스트 프랙티스·자가진단·정리/토의 질문·다음 예고). 분량 102k→176k자(1.7배), 저자 수치·사례·그림·실습 번호 전량 보존(스키마 검증 스크립트 통과).

상세 커밋 이력은 `git log` 참조.

---

## 7. 빌드 · 배포

```bash
npm install
npm run dev       # 로컬 개발
npm run build     # dist/ 생성
node scripts/gen-og.mjs   # OG 이미지 재생성(sharp 임시설치)
```
`main` 푸시 시 GitHub Actions가 빌드 후 Pages로 배포. **Settings → Pages → Source = GitHub Actions** 필요.
