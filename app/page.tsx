import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
        <p className="mb-4 text-sm uppercase tracking-[0.24em] text-neutral-500">
          Music Map MVP
        </p>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
          Tech music map with AI, gogogo
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-8 text-neutral-300">
          从一首歌、一个艺人，或者一种你喜欢的氛围出发，生成一条可继续探索的音乐路线。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/explore"
            className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            开始探索
          </Link>

          <Link
            href="/result"
            className="rounded-2xl border border-neutral-700 px-6 py-3 font-medium text-white transition hover:bg-neutral-900"
          >
            查看示例结果
          </Link>
        </div>
      </div>
    </main>
  );
}