import { getMockRecommendation } from "@/lib/mockRecommendation";
import { hasAiConfig } from "@/lib/env";
import type {
  RecommendationInput,
  RecommendationPayload,
} from "@/lib/recommendationResponse";

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

  return {
    ...(await generateMockRecommendation(input)),
    meta: {
      source: "ai",
      version: "v0-placeholder",
    },
  };
}

async function generateHybridRecommendation(
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

  return {
    ...(await generateMockRecommendation(input)),
    meta: {
      source: "hybrid",
      version: "v0-placeholder",
    },
  };
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