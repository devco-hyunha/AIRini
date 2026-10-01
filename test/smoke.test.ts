/**
 * 기준선 게이트의 첫 테스트.
 *
 * ── 왜 이 테스트가 필요한가 ──
 * 2026-10-01에 `build`가 성공하고 프리렌더가 1페이지를 만들었는데, 산출물이 HTML
 * 문서가 아닌 부트스트랩 스크립트만인 상태가 있었습니다. `dev`·`build`·`preview`가
 * 전부 HTTP 200을 내므로 **계측으로는 잡히지 않습니다.** 성공 여부만 보면 문제가
 * 없다고 오판합니다. 본문을 봐야 알 수 있습니다.
 *
 * ── 왜 CLI 빌드를 자식으로 돌리는가 ──
 * `vite`의 `build()`를 프로그램으로 호출하면 자산은 만들지만 SPA 프리렌더가
 * 실행되지 않습니다. `dist/client/index.html`이 없어 테스트가 "파일 없음"으로
 * 죽습니다. 프리렌더는 CLI 빌드의 마무리 단계에 붙어 있으므로, 테스트는 같은
 * 명령을 자식으로 실행합니다. (2026-10-01 실측)
 *
 * ── 이 테스트가 보지 않는 것 ──
 * `body`가 비어 있는 것은 SPA 모드의 설계입니다. 셸이 비는 것과 렌더 타이밍은
 * 별개이므로 빈 `body`를 실패로 잡지 않습니다. 화면이 실제로 그려지는지는
 * 브라우저에서 눈으로 확인합니다 (Phase 2).
 */

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const SHELL_PATH = 'dist/client/index.html';

const buildShell = () => {
  execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], {
    stdio: 'pipe',
  });
  return readFile(SHELL_PATH, 'utf8');
};

const html = await buildShell();

test('셸은 HTML 문서다 — 부트스트랩 스크립트만 남는 상태를 막는다', () => {
  assert.match(html, /^<!DOCTYPE html>/, 'DOCTYPE이 없습니다. 셸이 문서가 아닙니다.');
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<head>/);
  assert.match(html, /<title>AIRini<\/title>/);
  assert.match(html, /<body>/);
});

test('스타일시트와 모듈 스크립트가 셸에 연결된다', () => {
  assert.match(html, /<link rel="stylesheet" href="\/assets\/[^"]+\.css"/);
  assert.match(html, /<script[^>]*src="\/assets\/[^"]+\.js"/);
});
