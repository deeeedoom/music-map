export function getRecommendationModeFromEnv() {
  const value = process.env.RECOMMENDATION_MODE;

  if (value === "ai" || value === "hybrid" || value === "mock") {
    return value;
  }

  return "mock";
}

export function hasAiConfig() {
  return Boolean(process.env.OPENAI_API_KEY);
}