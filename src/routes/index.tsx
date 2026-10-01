import { createFileRoute } from '@tanstack/react-router';

/**
 * 기준선 Phase 0의 자리표시자 화면.
 *
 * ── 왜 이 화면이 제품 기능이 아닌가 ──
 * 기획(`docs/00-product/`, `docs/01-requirements/`)이 정의되지 않은 상태에서
 * 파일을 만들면, 같은 개념이 여러 파일에 생겨 생성/수정/삭제가 반복됩니다.
 * 그래서 Phase 0는 설정·규칙·기획만 만들고, 화면은 기획이 끝난 뒤 만듭니다.
 *
 * 이 파일이 하는 일: 라우터가 `/`를 매칭하고 브라우저가 실제로 마크업을
 * 그리는지 확인하는 자리를 제공합니다.
 */

const Home = () => (
  <main className="mx-auto w-full max-w-2xl px-4 py-16">
    <h1 className="text-2xl font-semibold">AIRini</h1>
    <p className="mt-4 text-sm text-neutral-600">
      기준선(Phase 0)입니다. 기획이 정의되지 않아 제품 화면은 없습니다.
    </p>
  </main>
);

export const Route = createFileRoute('/')({ component: Home });
