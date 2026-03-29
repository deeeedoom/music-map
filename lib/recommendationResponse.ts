import type { Recommendation } from "@/lib/recommendationRules";

export type RecommendationInput = {
  seed: string;
  context: string;
};

export type RecommendationMeta = {
  source: "mock" | "ai" | "hybrid";
  version: string;
};

export type RecommendationPayload = {
  input: RecommendationInput;
  recommendation: Recommendation;
  meta: RecommendationMeta;
};

export type RecommendationSuccessResponse = {
  success: true;
  data: RecommendationPayload;
};

export type RecommendationErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type RecommendationResponse =
  | RecommendationSuccessResponse
  | RecommendationErrorResponse;