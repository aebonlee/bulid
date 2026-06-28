// 실습 : 따라하기 — 교재가 다루는 실습을 과목(DAY)별·스텝별로 풀어 쓴 가이드
// 각 실습: 목표 → 단계(지시+붙여넣을 프롬프트+예상 결과) → 산출물. 프롬프트는 요청형(해줘).

export const labsByVol = {
  vol1: {
    label: '제1권 · VOL.01',
    title: '생성형 AI 기반 업무 자동화 전문가 과정',
    days: [
      {
        day: 1,
        subject: '생성형 AI와 건설기계 산업 이해 · 프롬프트 기초',
        labs: [
          {
            code: '실습 1-1', level: '입문', tool: 'ChatGPT·Claude·Gemini·Genspark',
            title: '같은 질문을 4대 도구에 동시에 던져 비교하기',
            goal: '같은 프롬프트를 4개 도구에 넣어 결과·강점 차이를 직접 체감한다.',
            steps: [
              { instruction: '비교할 “내 직무 질문” 하나를 정한다. (브라우저 탭 4개에 각 도구를 띄운다)', expected: '동일 조건 비교 준비 완료' },
              { instruction: '아래 프롬프트를 4개 도구에 똑같이 붙여 넣는다.',
                prompt: '너는 건설기계 업무 컨설턴트야.\n[내 직무: 예) A/S 엔지니어]의 반복 업무 3가지를 정리하고, 각 업무를 AI로 자동화하는 방법을 한 줄씩 제안해줘.\n표로: 업무 / 자동화 방법 / 기대 효과.',
                expected: '도구마다 표 형태·구체성·말투가 다른 답이 나옴' },
              { instruction: '4개 결과를 한 화면에 모아 비교한다.',
                prompt: '방금 4개 AI의 답을 비교하려고 해. “정확성 / 구체성 / 표 정리 / 속도” 기준으로 평가표를 만들어줘.',
                expected: '도구별 강점이 한눈에 정리됨' },
            ],
            deliverable: '4대 도구 비교 표 + 내 직무에 맞는 도구 1순위',
          },
        ],
      },
      {
        day: 2,
        subject: 'ChatGPT 심화 — Custom GPT · 데이터 분석',
        labs: [
          {
            code: '실습 2-1', level: '실전', tool: 'ChatGPT (Code Interpreter)',
            title: '정비 이력 데이터 코딩 없이 분석하기',
            goal: '엑셀/CSV를 올려 고장 패턴·비용을 자동 분석·시각화한다.',
            steps: [
              { instruction: '정비 이력 파일(.xlsx/.csv)을 ChatGPT 입력창에 업로드한다. (없으면 샘플 데이터로)', expected: 'AI가 표 구조를 인식' },
              { instruction: '분석을 요청한다.',
                prompt: '방금 올린 정비 이력 데이터를 분석해줘.\n① 부품별 고장 빈도 TOP10 막대그래프,\n② 월별 정비비 추세선(이상치 표시),\n③ 예방정비가 필요한 부품과 근거를 표로 만들어줘.',
                expected: '그래프 2개 + 예방정비 권고 표' },
              { instruction: '보고용으로 정리한다.',
                prompt: '위 분석을 임원 보고용 한 장 요약으로 정리해줘. 핵심 수치 3가지와 권고 1가지만.',
                expected: '한 장 요약 보고' },
            ],
            deliverable: '고장 분석 차트 + 예방정비 권고 + 한 장 요약',
          },
          {
            code: '실습 2-3', level: '실전', tool: 'ChatGPT (Custom GPT)',
            title: '부서 전용 견적 어시스턴트(Custom GPT) 만들기',
            goal: '회사 양식·규칙을 학습시킨 견적 봇을 코딩 없이 만든다.',
            steps: [
              { instruction: 'ChatGPT → GPT 만들기 → Configure로 들어간다.', expected: '제작 화면 진입' },
              { instruction: 'Instructions(지시문)에 아래를 붙여 넣는다.',
                prompt: '너는 건설기계 영업 견적 어시스턴트야.\n사용자가 [고객/장비/수량/납기]를 주면 정중한 견적 안내문을 만들어줘.\n규칙: 가격 미정 항목은 [협의]로 표시, 유효기간 명시, 표로 정리.',
                expected: '봇 역할·규칙 고정' },
              { instruction: 'Knowledge에 회사 견적 양식·단가표(있으면)를 업로드하고 미리보기로 테스트한다.',
                prompt: '고객: OO토건, 장비: 미니 굴삭기 2대, 납기: 2주, 결제: 현금. 견적 안내문 만들어줘.',
                expected: '표 포함 견적 안내문 생성' },
            ],
            deliverable: '부서가 공유해 쓰는 견적 Custom GPT',
          },
        ],
      },
      {
        day: 3,
        subject: 'Gemini · Claude 심화 — Artifacts · NotebookLM',
        labs: [
          {
            code: '실습 3-A', level: '실전', tool: 'Claude (Artifacts)',
            title: '점검 체크리스트 웹앱을 대화로 즉석 제작',
            goal: '개발 없이 인터랙티브 점검표를 만들어 현장에 배포한다.',
            steps: [
              { instruction: 'Claude에 아래를 입력한다.',
                prompt: '굴삭기 일상점검용 인터랙티브 체크리스트를 Artifact로 만들어줘.\n항목: 엔진오일·유압유·냉각수·타이어·안전벨트.\n기능: 체크박스, 점검자/날짜 입력, 완료율 표시, 인쇄 버튼.',
                expected: '오른쪽 미리보기에 동작하는 체크리스트 앱' },
              { instruction: '수정 요청으로 다듬는다.',
                prompt: '항목을 3개 더 추가하고, 미점검 항목이 있으면 경고 문구가 뜨게 해줘.',
                expected: '기능이 보강된 앱' },
              { instruction: '공유 링크를 만들어 현장에 배포한다.', expected: '누구나 쓰는 점검 도구 완성' },
            ],
            deliverable: '인쇄·완료율 기능이 있는 점검 체크리스트 앱',
          },
          {
            code: '실습 3-B', level: '실전', tool: 'Gemini (NotebookLM)',
            title: '매뉴얼 근거 Q&A 어시스턴트 만들기',
            goal: '제품 매뉴얼을 올려 “그 문서 근거로만” 답하는 도우미를 만든다.',
            steps: [
              { instruction: 'notebooklm.google.com → 새 노트북 → 매뉴얼 PDF를 소스로 업로드한다.', expected: '문서 인식 완료' },
              { instruction: '근거 기반 질문을 한다.',
                prompt: '업로드한 매뉴얼을 근거로 답해줘. 유압시스템 정기 점검 항목과 주기를 표로 정리하고, 각 항목의 근거 위치(섹션/페이지)를 표시해줘.',
                expected: '근거 위치가 표시된 점검 표' },
              { instruction: '교육용 오디오 개요를 만든다.', expected: '신입 교육용 오디오 요약 확보' },
            ],
            deliverable: '근거 인용 Q&A + 오디오 요약',
          },
        ],
      },
      {
        day: 4,
        subject: 'Genspark · AI Agent — 다단계 위임',
        labs: [
          {
            code: '실습 4-4', level: '심화', tool: 'Genspark (AI Agent)',
            title: '시장조사 → 요약 → 슬라이드까지 위임하기',
            goal: '에이전트에 다단계 작업을 위임하고 중간 점검·검수한다.',
            steps: [
              { instruction: 'Genspark AI Agent에 목표를 한 문장으로 위임한다.',
                prompt: '베트남 미니 굴삭기 시장 진출 검토 자료를 만들어줘.\n① 시장·경쟁·규제 조사 → ② 핵심 요약 → ③ 의사결정용 슬라이드 8장까지 완성해줘. 핵심 수치엔 출처를 표기해줘.',
                expected: '에이전트가 작업 계획을 제시' },
              { instruction: '작업 계획을 확인·승인하고 진행 중간 산출물을 모니터링한다.', expected: '단계별로 결과가 쌓임' },
              { instruction: '완성된 슬라이드의 핵심 수치를 출처로 검수한다.', expected: '검수 완료된 검토 자료' },
            ],
            deliverable: '출처 포함 시장 검토 슬라이드 8장',
          },
        ],
      },
      {
        day: 5,
        subject: '멀티모달 — 음성·영상 활용',
        labs: [
          {
            code: '실습 5-6', level: '실전', tool: 'ChatGPT·Gemini (음성)',
            title: '정비 회의 녹음 → 자동 회의록',
            goal: '회의 녹음을 화자 분리·안건 정리·액션아이템까지 자동 정리한다.',
            steps: [
              { instruction: '회의 녹음 파일(또는 받아쓴 텍스트)을 준비한다.', expected: '입력 자료 준비' },
              { instruction: 'STT(받아쓰기) 후 정리를 요청한다.',
                prompt: '아래 회의 내용을 회의록으로 정리해줘.\n[참석자] / [주요 논의 3~5] / [결정 사항] / [할 일(담당·기한 표)] / [다음 회의].\n사실만, 추측 금지.\n\n[여기에 회의 텍스트 붙여넣기]',
                expected: '담당·기한까지 정리된 회의록' },
              { instruction: '영문 요약도 받는다.',
                prompt: '위 회의록을 해외 본사 보고용 영문 5줄 요약으로 만들어줘.',
                expected: '영문 요약' },
            ],
            deliverable: '회의록 + 액션아이템 표 + 영문 요약',
          },
          {
            code: '실습 5-9', level: '심화', tool: 'Gemini (영상 분석)',
            title: '정비 시연 영상 → 단계별 매뉴얼',
            goal: '베테랑 시연 영상을 단계별 작업 절차서로 변환한다.',
            steps: [
              { instruction: 'Gemini에 정비 시연 영상을 올린다(또는 링크).', expected: '영상 인식' },
              { instruction: '절차서로 변환을 요청한다.',
                prompt: '이 정비 시연 영상을 단계별 작업 절차서로 만들어줘.\n각 단계에 주의·안전 사항을 함께 적고, 필요한 공구 목록을 표로 정리해줘.',
                expected: '단계별 절차서 + 공구 목록' },
              { instruction: '신입 교육용으로 다듬는다.', expected: '교육용 매뉴얼 초안' },
            ],
            deliverable: '영상 기반 단계별 정비 매뉴얼',
          },
        ],
      },
      {
        day: 6,
        subject: '자사 적용 프로토타입 구축·시연',
        labs: [
          {
            code: '실습 6-1', level: '심화', tool: '직무에 맞는 도구 자유 선택',
            title: '내 직무 업무 자동화 프로토타입 설계·시연',
            goal: '6일 학습을 종합해 내 직무 반복 업무 1개를 자동화하는 프로토타입을 만든다.',
            steps: [
              { instruction: '자동화할 반복 업무 1개와 사용할 도구를 정한다.', expected: '대상 업무·도구 확정' },
              { instruction: '프로토타입을 설계한다.',
                prompt: '너는 업무 자동화 컨설턴트야.\n내 직무는 [직무], 자동화할 업무는 [업무]야.\n① 입력 → ② AI 처리 → ③ 사람 검수 → ④ 산출물 단계로 설계하고, 각 단계의 도구·프롬프트·검수 기준을 표로 만들어줘.',
                expected: '4단계 자동화 설계 표' },
              { instruction: '시연 발표(5분)용 슬라이드 개요를 만든다.',
                prompt: '위 프로토타입을 5분 시연 발표용으로 정리해줘. 문제 → 해결 → 시연 → 효과 → 확산계획 5장 개요로.',
                expected: '발표 개요 5장' },
            ],
            deliverable: '내 직무 자동화 프로토타입 + 5분 시연 발표안',
          },
        ],
      },
    ],
  },

  vol2: {
    label: '제2권 · VOL.02',
    title: 'AI 적용을 위한 현장 데이터 수집 및 디지털화',
    days: [
      {
        day: 1,
        subject: '현장 데이터와 암묵지의 이해',
        labs: [
          {
            code: '실습 1-1', level: '입문', tool: 'ChatGPT·Claude',
            title: '자사 데이터 자산 인벤토리 만들기',
            goal: '우리 부서에 흩어진 데이터·지식을 목록으로 정리한다.',
            steps: [
              { instruction: '내 부서가 다루는 자료(사진·문서·음성·기록)를 떠오르는 대로 적는다.', expected: '대략적 목록' },
              { instruction: '인벤토리로 정리한다.',
                prompt: '너는 데이터 자산화 컨설턴트야.\n내 부서 [부서명]의 데이터 자산을 인벤토리로 정리해줘.\n표: 자료명 / 형태(사진·문서·음성·영상) / 보관 위치 / 보안등급 / AI 활용 가능성(상중하).\n아래 내 메모를 참고해줘:\n[여기에 메모 붙여넣기]',
                expected: '데이터 자산 인벤토리 표' },
              { instruction: '우선순위를 매긴다.',
                prompt: '위 인벤토리에서 “지금 디지털화하면 효과 큰” 자료 3개를 골라 이유와 함께 추천해줘.',
                expected: '우선 디지털화 대상 3선' },
            ],
            deliverable: '데이터 자산 인벤토리 + 우선순위',
          },
        ],
      },
      {
        day: 2,
        subject: '암묵지 캡처 — 스마트폰 데이터 수집',
        labs: [
          {
            code: '실습 2-1', level: '입문', tool: '스마트폰 + ChatGPT(Vision)',
            title: 'OCR용 사진 잘 찍고 품질 점검하기',
            goal: '디지털화가 잘 되는 사진 촬영법을 익히고 AI로 품질을 점검한다.',
            steps: [
              { instruction: '점검표·부품·도면 중 하나를 골라 촬영한다. (조명·각도·디테일·배경·흔들림 5가지 주의)', expected: '촬영본 확보' },
              { instruction: '사진을 올려 품질을 점검받는다.',
                prompt: '이 사진을 OCR(글자 인식)에 쓰려고 해. 조명·각도·선명도·배경·잘림 5가지 기준으로 점검하고, 다시 찍어야 할 점이 있으면 알려줘.',
                expected: '촬영 품질 피드백' },
              { instruction: '합격하면 글자 추출까지 해본다.',
                prompt: '이 사진의 글자를 표로 정리해줘. 불확실한 글자는 [?]로 표시해줘.',
                expected: '추출된 텍스트 표' },
            ],
            deliverable: 'OCR 품질 합격 사진 + 추출 텍스트',
          },
          {
            code: '실습 2-3', level: '실전', tool: 'ChatGPT·Claude',
            title: '베테랑 인터뷰 질문지 설계',
            goal: '숙련공의 암묵지를 끌어내는 인터뷰 질문을 만든다.',
            steps: [
              { instruction: '인터뷰 대상 직무를 정한다(정비/영업/해외영업/마케팅 중).', expected: '대상 확정' },
              { instruction: '질문지를 생성한다.',
                prompt: '너는 지식경영 전문가야.\n[직무] 베테랑의 노하우를 끌어내는 인터뷰 질문지를 만들어줘.\n5W1H + Why-5 기법으로 핵심 영역 5개에 영역당 2개씩 총 10문항, 각 문항의 목적을 괄호로 표기해줘.',
                expected: '목적이 표기된 10문항 질문지' },
              { instruction: '정리 규칙을 정한다.',
                prompt: '인터뷰 후 24시간 안에 정리하는 체크리스트도 만들어줘.',
                expected: '인터뷰 정리 체크리스트' },
            ],
            deliverable: '베테랑 인터뷰 질문지 + 정리 체크리스트',
          },
        ],
      },
      {
        day: 3,
        subject: 'OCR · STT 디지털화 기술',
        labs: [
          {
            code: '실습 3-1', level: '실전', tool: 'ChatGPT(Vision)·전용 OCR',
            title: '도면 OCR — 부품 정보 자동 추출',
            goal: '도면 이미지에서 부품번호·치수를 표로 추출한다.',
            steps: [
              { instruction: '부품 도면 이미지를 업로드한다.', expected: '이미지 인식' },
              { instruction: '정보 추출을 요청한다.',
                prompt: '이 굴삭기 부품 도면에서 부품번호·명칭·주요 치수를 표로 정리해줘. 판독이 불확실한 항목은 “확인 필요”로 표시해줘.',
                expected: '부품 정보 표' },
              { instruction: '검수 규칙을 적용한다.',
                prompt: '“확인 필요”로 표시된 항목만 모아서 다시 보여줘. 사람이 검수할 목록으로.',
                expected: '검수 대상 목록' },
            ],
            deliverable: '도면 부품 정보 표 + 검수 목록',
          },
          {
            code: '실습 3-4', level: '실전', tool: 'STT + ChatGPT',
            title: '회의 STT → 자동 회의록 데이터셋',
            goal: '음성을 텍스트로 바꾸고 구조화된 회의록으로 만든다.',
            steps: [
              { instruction: '회의 녹음을 STT(받아쓰기)로 텍스트화한다.', expected: '회의 텍스트 확보' },
              { instruction: '회의록으로 구조화한다.',
                prompt: '아래 STT 결과를 회의록으로 정리해줘. 3줄 요약 / 결정사항 / 할 일(담당·기한 표) / 후속 안건.\n\n[여기에 STT 텍스트 붙여넣기]',
                expected: '구조화된 회의록' },
            ],
            deliverable: '구조화 회의록 데이터',
          },
        ],
      },
      {
        day: 4,
        subject: '데이터 구조화 · 표준화',
        labs: [
          {
            code: '실습 4-1', level: '실전', tool: 'ChatGPT·Claude',
            title: '부서 메타데이터 표준 양식 만들기',
            goal: '데이터에 붙일 메타데이터(꼬리표) 표준을 설계한다.',
            steps: [
              { instruction: '내 부서가 자주 쓰는 자료 유형을 떠올린다.', expected: '대상 자료 파악' },
              { instruction: '표준 양식을 설계한다.',
                prompt: '내 부서 [부서명] 데이터에 적용할 메타데이터 표준 양식을 설계해줘.\n15개 항목(제목·작성일·작성자·분류·보안등급 등)을 표로 정의하고, 각 항목의 입력 규칙과 예시를 함께 보여줘.',
                expected: '메타데이터 표준 표' },
              { instruction: 'AI 자동 부여를 실험한다.',
                prompt: '아래 샘플 자료에 위 메타데이터를 자동으로 채워줘:\n[샘플 자료 설명 붙여넣기]',
                expected: '자동 태깅 예시' },
            ],
            deliverable: '메타데이터 표준 양식 + 자동 부여 예시',
          },
          {
            code: '실습 4-2', level: '실전', tool: 'ChatGPT·Claude',
            title: '부서 분류 체계(Taxonomy) 작성',
            goal: '자료를 일관되게 분류하는 체계를 만든다.',
            steps: [
              { instruction: '분류 대상 자료 범위를 정한다.', expected: '범위 확정' },
              { instruction: '분류 체계를 설계한다.',
                prompt: '내 부서 자료를 위한 분류 체계(Taxonomy)를 3계층으로 만들어줘.\n대분류–중분류–소분류 트리로 보여주고, 각 분류의 정의와 예시를 표로 정리해줘.',
                expected: '3계층 분류 트리 + 정의 표' },
            ],
            deliverable: '부서 분류 체계 문서',
          },
        ],
      },
      {
        day: 5,
        subject: '데이터 품질 관리 · 라벨링 · 검증',
        labs: [
          {
            code: '실습 5-1', level: '실전', tool: 'ChatGPT·Claude',
            title: '데이터 품질 점검 체크리스트 만들기',
            goal: 'GIGO를 막기 위한 품질 기준과 점검표를 만든다.',
            steps: [
              { instruction: '점검할 데이터셋을 정한다.', expected: '대상 확정' },
              { instruction: '품질 체크리스트를 만든다.',
                prompt: '데이터 품질 6대 차원(정확성·완전성·일관성·적시성·유효성·유일성)으로 내 [데이터셋명]을 점검하는 체크리스트를 표로 만들어줘.\n각 항목에 측정 방법과 합격 기준을 적어줘.',
                expected: '품질 점검 체크리스트' },
              { instruction: '개선 우선순위를 받는다.',
                prompt: '위 체크리스트에서 가장 먼저 개선해야 할 3가지를 이유와 함께 추천해줘.',
                expected: '개선 우선순위' },
            ],
            deliverable: '데이터 품질 체크리스트 + 개선 우선순위',
          },
        ],
      },
      {
        day: 6,
        subject: '자사 KPI 데이터 자산화 프로젝트',
        labs: [
          {
            code: '실습 6-1', level: '심화', tool: '직무에 맞는 도구 자유 선택',
            title: '내 직무 데이터 자산화 종합 프로토타입',
            goal: '6일 학습을 종합해 내 직무 데이터를 AI-Ready 자산으로 만드는 계획을 세운다.',
            steps: [
              { instruction: '자산화할 데이터와 목표(KPI)를 정한다.', expected: '대상·목표 확정' },
              { instruction: '종합 프로토타입을 설계한다.',
                prompt: '너는 데이터 자산화 컨설턴트야.\n내 직무는 [직무], 자산화할 데이터는 [데이터]야.\n수집 → 디지털화 → 구조화 → 품질관리 → 활용 5단계로 설계하고, 각 단계의 도구·방법·산출물을 표로 만들어줘.',
                expected: '5단계 자산화 설계 표' },
              { instruction: 'ROI·90일 로드맵을 받는다.',
                prompt: '위 계획의 ROI(투입 대비 효과)를 정량화하고, 90일 4단계 로드맵과 핵심 KPI를 표로 만들어줘.',
                expected: 'ROI + 90일 로드맵' },
            ],
            deliverable: '데이터 자산화 5단계 설계 + 90일 로드맵',
          },
        ],
      },
    ],
  },
}
