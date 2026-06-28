# 건설기계 산업 AI역량강화 학습사이트 (bulid)

2026년 산업전문인력 AI역량강화(건설기계) · **건설기계산업 AX 전환 실행역량 강화** 과정의 온라인 학습사이트입니다.

🔗 **배포 주소**: https://bulid.dreamitbiz.com

## 과정 구성

| 권 | 제목 | 구성 |
|----|------|------|
| **제1권 (VOL.01)** | 생성형 AI 기반 업무 자동화 전문가 과정 | 6일 (PART 01~06) + 부록 |
| **제2권 (VOL.02)** | AI 적용을 위한 현장 데이터 수집 및 디지털화 (암묵지 자산화) | 6일 (PART 01~06) + 부록 |

- PART 01~06 = DAY 1~6 본 과정, PART 07(실습 내역)·PART 08(부록)
- 4대 생성형 AI(ChatGPT·Gemini·Claude·Genspark) + 멀티모달·AI Agent
- 6직무별 프로토타입(기술문서·A/S·영업·해외영업·마케팅·DX)

## 기술 스택

- **React 18** + **Vite 5** + **Tailwind CSS 3**
- **React Router** (HashRouter — GitHub Pages SPA 호환)
- **Supabase** — 구글/카카오 OAuth 로그인 + 학습 진도 동기화 (`bulid_` 접두사)
- 진도: 비로그인 시 localStorage, 로그인 시 Supabase 동기화

## 콘텐츠 파이프라인

교재 원본 `books/제1권_2권.docx`(v1.0 통합본)를 파싱하여 `src/data/content.json`으로 구조화했습니다.

- 2권 × 8 PART, DAY 1~6 매핑
- 블록 타입: 본문/학습목표/키워드/그림(이미지 43개)/표(144개)/사례/실습/Tip/프롬프트박스/연계학습 등
- 교재 이미지 → `public/book-images/`

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

### 환경변수 (.env — 선택)

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
> `src/lib/supabase.js`에 fallback 하드코딩이 있어 환경변수 없이도 빌드/동작합니다.

## OG 이미지 재생성

```bash
npm install --no-save sharp
node scripts/gen-og.mjs   # public/og-image.png (1200x630)
```

## Supabase 설정

`supabase/schema.sql`을 Supabase SQL Editor에서 실행하세요.
- `bulid_profiles`, `bulid_progress` 테이블 + RLS
- 회원가입 트리거는 **search_path 고정·스키마 명시·예외처리**로 작성되어, 오류가 나도 공용 프로젝트 전체 회원가입을 막지 않습니다.
- 구글·카카오 Provider는 Supabase Authentication → Providers에서 활성화 필요.

## 배포

`main` 브랜치 푸시 시 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 GitHub Pages로 자동 배포합니다.
- **Settings → Pages → Source = "GitHub Actions"** 로 설정되어 있어야 합니다.
- 커스텀 도메인(`public/CNAME`)을 사용하므로 Vite `base: '/'`.
