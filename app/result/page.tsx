import Link from "next/link";
import { getMockRecommendation } from "@/lib/mockRecommendation";
import { buildSearchInput } from "@/lib/searchInput";

type ResultPageProps = {
  searchParams: Promise<{
    seed?: string;
    context?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const input = buildSearchInput(params.seed, params.context);
  const recommendation = getMockRecommendation(input.seed, input.context);

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
          {recommendation.pathTitle}
        </h1>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">你的输入</p>
            <h2 className="text-2xl font-semibold">{input.seed}</h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">你的描述</p>
            <p className="leading-7 text-neutral-300">{input.context}</p>
          </div>
        </div>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-neutral-300">
          {recommendation.summary}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {recommendation.stages.map((stage) => (
            <div
              key={stage.label}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
            >
              <p className="mb-2 text-sm text-neutral-500">{stage.label}</p>
              <h2 className="text-2xl font-semibold">{stage.name}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{stage.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-4 text-sm text-neutral-500">推荐艺人</p>
            <div className="flex flex-wrap gap-2">
              {recommendation.artists.map((artist) => (
                <span
                  key={artist}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200"
                >
                  {artist}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-4 text-sm text-neutral-500">推荐关键词</p>
            <div className="flex flex-wrap gap-2">
              {recommendation.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-4 text-sm text-neutral-500">下一步探索</p>
            <ul className="space-y-3 text-sm leading-7 text-neutral-300">
              {recommendation.nextSteps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
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