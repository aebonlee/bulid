// OG 이미지 생성 스크립트 (1200x630)
// 사용: npx sharp 없이, sharp 패키지를 임시 설치 후 `node scripts/gen-og.mjs`
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/og-image.png')

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f2238"/>
      <stop offset="1" stop-color="#16314f"/>
    </linearGradient>
    <pattern id="stripe" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="40" height="40" fill="none"/>
      <rect width="20" height="40" fill="#fbbf24" opacity="0.08"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#stripe)"/>

  <!-- 안전 띠 -->
  <rect x="0" y="0" width="1200" height="12" fill="#fbbf24"/>
  <rect x="0" y="618" width="1200" height="12" fill="#fbbf24"/>

  <!-- 배지 -->
  <rect x="80" y="92" width="560" height="46" rx="23" fill="#ffffff" opacity="0.10"/>
  <text x="104" y="123" font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="22" font-weight="700" fill="#fcd34d">🏗  2026 산업전문인력 AI역량강화 (건설기계)</text>

  <!-- 메인 타이틀 -->
  <text x="80" y="248" font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="68" font-weight="800" fill="#ffffff">건설기계산업 <tspan fill="#fbbf24">AX 전환</tspan></text>
  <text x="80" y="330" font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="68" font-weight="800" fill="#ffffff">실행역량 강화 학습사이트</text>

  <!-- 서브 -->
  <text x="80" y="404" font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="30" font-weight="500" fill="#aec7e7">생성형 AI 업무 자동화 · 현장 데이터 수집/디지털화</text>

  <!-- 칩 -->
  <g font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="24" font-weight="700">
    <rect x="80"  y="470" width="250" height="56" rx="28" fill="#fbbf24"/>
    <text x="205" y="507" text-anchor="middle" fill="#16314f">제1권 · 6일 과정</text>
    <rect x="350" y="470" width="250" height="56" rx="28" fill="#234d86"/>
    <text x="475" y="507" text-anchor="middle" fill="#ffffff">제2권 · 6일 과정</text>
    <rect x="620" y="470" width="210" height="56" rx="28" fill="none" stroke="#7ea4d6" stroke-width="2"/>
    <text x="725" y="507" text-anchor="middle" fill="#d6e3f3">6직무 프로토타입</text>
  </g>

  <!-- 우측 굴착기 아이콘 -->
  <g transform="translate(905,150)" opacity="0.95">
    <rect x="0" y="300" width="260" height="34" rx="8" fill="#fbbf24"/>
    <path d="M30 300 V190 L120 150 L210 190 V300" fill="none" stroke="#fbbf24" stroke-width="14" stroke-linejoin="round"/>
    <circle cx="120" cy="232" r="22" fill="#ffffff"/>
    <path d="M210 230 H280 L300 270 V300 H210 Z" fill="#fbbf24"/>
    <circle cx="120" cy="350" r="34" fill="#0a1726" stroke="#fbbf24" stroke-width="10"/>
    <circle cx="250" cy="350" r="26" fill="#0a1726" stroke="#fbbf24" stroke-width="9"/>
  </g>

  <!-- 도메인 -->
  <text x="80" y="582" font-family="Menlo, monospace" font-size="22" fill="#7ea4d6">bulid.dreamitbiz.com</text>
  <text x="1120" y="582" text-anchor="end" font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif" font-size="22" font-weight="700" fill="#aec7e7">DreamIT Biz</text>
</svg>
`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, png)
console.log('OG image written:', out, png.length, 'bytes')
