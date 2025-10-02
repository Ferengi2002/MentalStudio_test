import * as React from "react";

type Props = {
    page: number;
    perPage: number;
    total: number;
    onChange: (p: number) => void;
};

export default function Pagination({ page, perPage, total, onChange }: Props) {
    const pages = Math.max(1, Math.ceil(total / perPage));
    const canPrev = page > 1;
    const canNext = page < pages;

    const go = (p: number) => onChange(Math.min(Math.max(1, p), pages));
    const around = [page - 2, page - 1, page, page + 1, page + 2]
        .filter((p) => p >= 1 && p <= pages);

    return (
        <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-gray-400">
                Página <b>{page}</b> de <b>{pages}</b> — {total} productos
            </div>
            <div className="flex items-center gap-1">
                <button
                    className="btn-primary px-3 py-2 text-sm disabled:opacity-50"
                    onClick={() => go(page - 1)}
                    disabled={!canPrev}
                    type="button"
                >
                    ←
                </button>
                {around[0] > 1 && (
                    <>
                        <PageBtn n={1} active={page === 1} onClick={() => go(1)} />
                        <span className="px-1 text-gray-500">…</span>
                    </>
                )}
                {around.map((n) => (
                    <PageBtn key={n} n={n} active={n === page} onClick={() => go(n)} />
                ))}
                {around[around.length - 1] < pages && (
                    <>
                        <span className="px-1 text-gray-500">…</span>
                        <PageBtn n={pages} active={page === pages} onClick={() => go(pages)} />
                    </>
                )}
                <button
                    className="btn-primary px-3 py-2 text-sm disabled:opacity-50"
                    onClick={() => go(page + 1)}
                    disabled={!canNext}
                    type="button"
                >
                    →
                </button>
            </div>
        </div>
    );
}

function PageBtn({ n, active, onClick }: { n: number; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-3 py-2 rounded-xl text-sm border ${active
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-white/5 text-gray-200 border-white/10 hover:bg-white/10"
                }`}
        >
            {n}
        </button>
    );
}
