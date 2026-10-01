import type { ReactNode } from 'react';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';

import appCss from '../styles.css?url';

/**
 * 앱의 최상위 문서 껍대기.
 *
 * ── 왜 `component`이고 `shellComponent`가 아닌가 ──
 * `shellComponent`는 클라이언트 렌더 경로에서만 적용됩니다. `Match.js`의 서버
 * 분기는 `MatchView`로 바로 빠지고 `ShellComponent`를 보지 않습니다. 프리렌더는
 * SSR 빌드로 실행되므로, 셸을 만들려면 `component`에 문서가 있어야 합니다.
 * `shellComponent`만 둔 상태로 빌드하면 `dist/client/index.html`이 부트스트랩
 * 스크립트만 남습니다 — `<html>`도 `<body>`도 없습니다. 세 명령(`dev`·`build`·
 * `preview`)이 전부 HTTP 200 이라 **계측으로는 잡히지 않습니다.** 본문을 봐야
 * 알 수 있습니다. (2026-10-01 실측: `shellComponent` 단독 → 셸 비어 있음)
 *
 * ── `HeadContent`와 `Scripts`의 자리 ──
 * `HeadContent`는 `<head>`에, `Scripts`는 `<body>` 맨 아래에 둡니다. 둘 중 하나를
 * 빼면 클라이언트 자바스크립트가 로드되지 않습니다. `body` 안이 비어 있는 것은
 * SPA 모드의 설계입니다 — 셸은 루트 라우트만 프리렌더하고, 매칭된 라우트는
 * 클라이언트가 그립니다. 셸이 비는 것과 렌더 타이밍은 별개입니다.
 */

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="ko">
    <head>
      <HeadContent />
    </head>
    <body>
      {children}
      <Scripts />
    </body>
  </html>
);

const RootComponent = () => (
  <RootDocument>
    <Outlet />
  </RootDocument>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'AIRini' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});
