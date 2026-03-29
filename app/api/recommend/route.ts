import { NextResponse } from "next/server";
import { buildSearchInput } from "@/lib/searchInput";
import { getRecommendationModeFromEnv } from "@/lib/env";
import {
  generateRecommendation,
  type RecommendationMode,
} from "@/lib/recommendationService";
import type { RecommendationResponse } from "@/lib/recommendationResponse";

function resolveMode(value: string | null): RecommendationMode {
  if (value === "ai" || value === "hybrid" || value === "mock") {
    return value;
  }

  return getRecommendationModeFromEnv();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const input = buildSearchInput(
      searchParams.get("seed") ?? undefined,
      searchParams.get("context") ?? undefined
    );

    const mode = resolveMode(searchParams.get("mode"));
    const data = await generateRecommendation(input, mode);

    const response: RecommendationResponse = {
      success: true,
      data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("recommend api error:", error);

    const response: RecommendationResponse = {
      success: false,
      error: {
        code: "RECOMMENDATION_FAILED",
        message: "Failed to generate recommendation.",
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}