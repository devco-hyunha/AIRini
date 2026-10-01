// Prettier 설정.
//
// ── 왜 이 모양인가 ──
// `.editorconfig` 가 같은 값을 편집기에 강요합니다. 편집기마다 결과가 다르면
// 리뷰가 불가능해집니다. 포맷은 판단하지 않습니다 — 모양을 같게 합니다.
//
// `routeTree.gen.ts` 는 생성기 산출물이라 `.prettierignore` 로 뺐습니다.
// 손으로 고치면 다음 실행에 덮어써집니다.

/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
};

export default config;
