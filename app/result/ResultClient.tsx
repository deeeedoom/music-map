"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  RecommendationResponse,
  RecommendationSuccessResponse,
} from "@/lib/recommendationResponse";

type ResultClientProps = {
  seed?: string;
  context?: string;
};

export default function ResultClient({ seed, context }: ResultClientProps) {
  const [data, setData] = useState<RecommendationSuccessResponse["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadRecommendation() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (seed) {
          params.set("seed", seed);
        }

        if (context) {
          params.set("context", context);
        }

        const query = params.toString();
        const response = await fetch(`/api/recommend${query ? `?${query}` : ""}`, {
          cache: "no-store",
        });

        const result = (await response.json()) as RecommendationResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.success === false
              ? result.error.message
              : "Failed to fetch recommendation"
          );
        }

        if (!ignore) {
          setData(result.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRecommendation();

    return () => {
      ignore = true;
    };
  }, [seed, context]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
            ← 返回首页
          </Link>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-neutral-500">Loading</p>
            <h1 className="mb-4 text-3xl font-bold">正在生成你的音乐路径</h1>
            <p className="leading-7 text-neutral-300">正在根据你的输入整理推荐结果。</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
            ← 返回首页
          </Link>

          <div className="rounded-3xl border border-red-900/60 bg-red-950/30 p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-red-300">Error</p>
            <h1 className="mb-4 text-3xl font-bold">推荐结果暂时加载失败</h1>
            <p className="mb-8 leading-7 text-neutral-300">
              {error ?? "当前请求没有成功完成。"}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
              >
                返回输入页
              </Link>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-2xl border border-neutral-700 px-6 py-3 font-medium text-white transition hover:bg-neutral-900"
              >
                再试一次
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
          ← 返回首页
        </Link>

        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-neutral-500">
          推荐结果
        </p>

        <h1 className="mb-2 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
          {data.recommendation.pathTitle}
        </h1>

        <p className="mb-6 text-sm text-neutral-500">
          source: {data.meta.source} · version: {data.meta.version}
        </p>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">你的输入</p>
            <h2 className="text-2xl font-semibold">{data.input.seed}</h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="mb-2 text-sm text-neutral-500">你的描述</p>
            <p className="leading-7 text-neutral-300">{data.input.context}</p>
          </div>
        </div>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-neutral-300">
          {data.recommendation.summary}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {data.recommendation.stages.map((stage) => (
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
              {data.recommendation.artists.map((artist) => (
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
              {data.recommendation.keywords.map((keyword) => (
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
              {data.recommendation.nextSteps.map((step) => (
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