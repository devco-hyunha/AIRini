# AIRini

로컬에서 도는 TanStack Start(CSR/SPA) 앱입니다. **기준선(Phase 0)은 완료됐고, 기획이
미정의입니다.** 기획은 `docs/00-product/`가 정합니다.

## 실행

```bash
pnpm install
pnpm dev          # 포트 3000
pnpm run build    # dist/client/ — 정적 산출물
pnpm run preview
```

## 검증

```bash
pnpm run verify   # typecheck + lint + test + format:check
```

개별 실행: `pnpm run typecheck` · `pnpm run lint` · `pnpm test` · `pnpm run format:check`

| 명령                 | 지킨다             | 보는 파일           |
| -------------------- | ------------------ | ------------------- |
| `pnpm run typecheck` | `tsc --noEmit`     | `tsconfig.json`     |
| `pnpm run lint`      | 코드가 읽히는가    | `eslint.config.js`  |
| `pnpm test`          | 셸이 HTML 문서인가 | `test/**/*.test.ts` |

> ⚠️ `pnpm test`는 `test/`만 훑습니다. 화면 테스트는 Vitest로 따로 돌립니다
> (`pnpm run test:ui`) — Vitest는 화면이 생긴 뒤 추가합니다. **실행되지 않은
> 테스트는 통과한 테스트가 아닙니다.**

## 문서

| 문서                       | 답하는 질문                    |
| -------------------------- | ------------------------------ |
| `docs/00-product/`         | 왜 · 무엇을 · 무엇을 안 하는가 |
| `docs/01-requirements/`    | "~이면 통과" (AC)              |
| `docs/02-design/`          | 수식 · 타입 · 모듈 경계        |
| `docs/03-data/`            | 데이터 출처 · 신뢰도           |
| `docs/04-plan/`            | Phase 정의 · 이슈 · ADR        |
| `docs/05-conventions/`     | 코드를 어떻게 짜는가           |
| [`AGENTS.md`](./AGENTS.md) | AI 세션이 지킬 절대 규칙       |

## 커밋 메시지 규칙

```text
<type>(<scope>): <subject>

- Why: (변경 이유 — 개조식, 서술문 금지)
- Verify: (확인 방법 — 1줄)
```

- `subject`는 50자 내외, 명령형, 마침표 없음
- type: `feat` `fix` `refactor` `remove` `style` `chore` `docs` `test` `perf`
- 한 커밋에 여러 type이 섞이면 커밋을 나눕니다

| type       | 사용 시점                                        | 예                                          |
| ---------- | ------------------------------------------------ | ------------------------------------------- |
| `chore`    | 기능과 무관한 정리 — 설정, 의존성, 빌드 스크립트 | `chore: 기준선 도구 설정 추가`              |
| `feat`     | 새 기능 (기존에 없던 동작)                       | `feat(ui): 입력 폼 추가`                    |
| `fix`      | 잘못된 동작 수정                                 | `fix(build): 프리렌더 산출물 누락 수정`     |
| `refactor` | 동작 유지하며 구조 개선                          | `refactor(lib): 중복 계산을 한 함수로 통합` |
| `docs`     | 문서 · 주석                                      | `docs: Phase 정의를 PLAN에 추가`            |
