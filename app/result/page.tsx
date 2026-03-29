import Link from "next/link";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
          ← 返回首页
        </Link>

        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-neutral-500">
          推荐结果
        </p>

        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
          你的路径可能是：Dub Techno → Hypnotic Techno → Minimal Techno
        </h1>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-neutral-300">
          你偏好的不是强推进感，而是空间、重复、质感和长时间沉浸。这条路径适合从深度氛围型
          techno 开始，逐步进入更克制、更结构化的方向。
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">起点风格</p>
            <h2 className="text-2xl font-semibold">Dub Techno</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              更强调空间感、回响、深度和缓慢推进。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">延伸方向</p>
            <h2 className="text-2xl font-semibold">Hypnotic Techno</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              保留沉浸感，同时加入更明确的律动与循环张力。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">可能终点</p>
            <h2 className="text-2xl font-semibold">Minimal Techno</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              更克制、更结构化，关注细节变化和长期聆听体验。
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/explore"
            className="inline-block rounded-2xl border border-neutral-700 px-6 py-3 font-medium text-white transition hover:bg-neutral-900"
          >
            重新输入
          </Link>
        </div>
      </div>
    </main>
  );
}