"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EXAMPLES = [
  {
    label: "深夜 / 空间感",
    seed: "Rodhad",
    context: "深夜、空间感、重复、克制、沉浸感强的 techno",
  },
  {
    label: "工业 / 强推进",
    seed: "Perc",
    context: "工业感、强推进、硬一点、压迫感更强",
  },
  {
    label: "温暖 / Groove",
    seed: "Deep House",
    context: "温暖、律动、轻松、适合跳舞、耐听",
  },
  {
    label: "Acid / 刺激",
    seed: "Acid Techno",
    context: "303、刺激、尖锐、直接、持续推进",
  },
];

export default function ExplorePage() {
  const router = useRouter();
  const [seed, setSeed] = useState("");
  const [context, setContext] = useState("");

  const handleSubmit = () => {
    const normalizedSeed = seed.trim();
    const normalizedContext = context.trim();

    const params = new URLSearchParams();

    if (normalizedSeed) {
      params.set("seed", normalizedSeed);
    }

    if (normalizedContext) {
      params.set("context", normalizedContext);
    }

    router.push(`/result?${params.toString()}`);
  };

  const applyExample = (example: { seed: string; context: string }) => {
    setSeed(example.seed);
    setContext(example.context);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
          ← 返回首页
        </Link>

        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-neutral-500">Explore</p>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">输入你的听歌入口</h1>

        <p className="mb-10 max-w-2xl text-neutral-400">
          你可以从艺人、风格、歌曲名，或者一段听感描述开始。先快速测试，再慢慢把输入写得更准确。
        </p>

        <div className="mb-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <p className="mb-4 text-sm text-neutral-500">快速示例</p>

          <div className="flex flex-wrap gap-3">
            {EXAMPLES.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => applyExample(example)}
                className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:bg-neutral-800"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm text-neutral-400">歌曲 / 艺人 / 风格</label>
              <input
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none"
                placeholder="比如：Rodhad / Deep House / Acid Techno"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-400">补充描述</label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[180px] w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none"
                placeholder="比如：我喜欢深夜、重复、空间感、克制、长时间沉浸的感觉。"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSubmit}
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
              >
                生成音乐路径
              </button>

              <button
                type="button"
                onClick={() => {
                  setSeed("");
                  setContext("");
                }}
                className="rounded-2xl border border-neutral-700 px-6 py-3 font-medium text-white transition hover:bg-neutral-900"
              >
                清空输入
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}