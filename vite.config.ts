/**
 * Vite / TanStack Start 설정.
 *
 * ── 왜 CSR(SPA 모드)인가 ──
 * `spa.enabled` 는 정적 파일만으로 배포하는 모드입니다. 이 설정이 없으면 Start 는
 * 서버 번들을 만들고, 정적 호스트에서 돌지 않습니다. 산출물 `dist/client/` 는
 * `index.html` 하나와 자산뿐입니다.
 *
 * ⚠️ 셸에는 화면이 없습니다. `<head>`·`<body>`·라우터 매니페스트만 있고 마크업은
 * JS 가 그립니다. SPA 모드는 루트 라우트만 프리렌더하고, 매칭된 라우트 자리에
 * pending fallback(기본 `null`)을 넣습니다. `ssr: false` 를 붙여도 셸에 내용이
 * 들어가지 않습니다 — **셸이 비는 것과 렌더 타이밍은 별개입니다.**
 *
 * ── 왜 `prerender.outputPath` 가 `/index.html` 인가 ──
 * SPA 모드의 기본값은 `/_shell.html` 입니다. 그 경우 정적 호스팅은
 * `/* /_shell.html 200` 리다이렉트 규칙을 요구합니다. `/index.html` 은 정적
 * 호스팅이 기본 문서로 내주는 자리라 규칙이 필요 없습니다. 배포 방식이 정해지지
 * 않은 지금에는 규칙이 없는 쪽이 싸습니다.
 *
 * ── plugin 순서 ──
 * `tanstackStart()` 가 `viteReact()` **앞**에 와야 합니다. 순서가 바뀌면 Start 가
 * React 변환을 자기 전에 처리해 라우트 코드가 손실됩니다.
 *
 * @see https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode
 */

import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    // tsconfig 의 paths(@/*) 를 Vite 가 따라야 별칭이 해석됩니다.
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: '/index.html',
        },
      },
    }),
    viteReact(),
  ],
});
