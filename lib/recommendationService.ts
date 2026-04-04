import OpenAI from "openai";
import { getMockRecommendation } from "@/lib/mockRecommendation";
import {
  getDashScopeApiKey,
  getDashScopeBaseUrl,
  getQwenModel,
  hasAiConfig,
} from "@/lib/env";
import { buildRecommendationPrompt } from "@/lib/recommendationPrompt";
import type {
  RecommendationInput,
  RecommendationPayload,
} from "@/lib/recommendationResponse";
import type { Recommendation } from "@/lib/recommendationRules";

export type RecommendationMode = "mock" | "ai" | "hybrid";

async function generateMockRecommendation(
  input: RecommendationInput
): Promise<RecommendationPayload> {
  const recommendation = getMockRecommendation(input.seed, input.context);

  return {
    input,
    recommendation,
    meta: {
      source: "mock",
      version: "v1",
    },
  };
}

function safeParseRecommendation(content: string): Recommendation | null {
  try {
    const parsed = JSON.parse(content) as Recommendation;

    if (
      !parsed ||
      typeof parsed.pathTitle !== "string" ||
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.stages) ||
      !Array.isArray(parsed.tracks) ||
      !Array.isArray(parsed.artists) ||
      !Array.isArray(parsed.keywords) ||
      !Array.isArray(parsed.nextSteps)
    ) {
      return null;
    }

    if (
      !parsed.tracks.every(
        (track) =>
          track &&
          typeof track.title === "string" &&
          typeof track.artist === "string"
      )
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

async function generateAiRecommendation(
  input: RecommendationInput
): Promise<RecommendationPayload> {
  if (!hasAiConfig()) {
    return {
      ...(await generateMockRecommendation(input)),
      meta: {
        source: "mock",
        version: "v1-fallback-no-ai-config",
      },
    };
  }

  const client = new OpenAI({
    apiKey: getDashScopeApiKey(),
    baseURL: getDashScopeBaseUrl(),
  });

  const completion = await client.chat.completions.create({
    model: getQwenModel(),
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "你是一个擅长电子音乐探索与风格路径推荐的助手。必须严格输出 JSON。",
      },
      {
        role: "user",
        content: buildRecommendationPrompt(input),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content ?? "";
  const parsed = safeParseRecommendation(content);

  if (!parsed) {
    return {
      ...(await generateMockRecommendation(input)),
      meta: {
        source: "mock",
        version: "v1-fallback-invalid-ai-json",
      },
    };
  }

  return {
    input,
    recommendation: parsed,
    meta: {
      source: "ai",
      version: getQwenModel(),
    },
  };
}

async function generateHybridRecommendation(
  input: RecommendationInput
): Promise<RecommendationPayload> {
  return generateAiRecommendation(input);
}

export async function generateRecommendation(
  input: RecommendationInput,
  mode: RecommendationMode = "mock"
): Promise<RecommendationPayload> {
  if (mode === "ai") {
    return generateAiRecommendation(input);
  }

  if (mode === "hybrid") {
    return generateHybridRecommendation(input);
  }

  return generateMockRecommendation(input);
}
