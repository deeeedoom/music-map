import Link from "next/link";

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
          ← 返回首页
        </Link>

        <h1 className="mb-4 text-4xl font-bold">输入你的听歌入口</h1>

        <p className="mb-8 text-neutral-400">
          你可以输入一首歌、一个艺人，或者一种你最近喜欢的感觉。
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-neutral-400">歌曲 / 艺人 / 风格</label>
            <input
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none"
              placeholder="比如：Ben Klock / Dub Techno / 深夜、空间感、克制"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-400">补充描述</label>
            <textarea
              className="min-h-[160px] w-full rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 outline-none"
              placeholder="比如：我喜欢重复、深度、空间感强、不太激烈、适合夜晚沉浸的 techno。"
            />
          </div>

          <Link
            href="/result"
            className="inline-block rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            生成音乐路径
          </Link>
        </div>
      </div>
    </main>
  );
}