export function getRecommendationModeFromEnv() {
  const value = process.env.RECOMMENDATION_MODE;

  if (value === "ai" || value === "hybrid" || value === "mock") {
    return value;
  }

  return "mock";
}

export function hasAiConfig() {
  return Boolean(process.env.DASHSCOPE_API_KEY);
}

export function getDashScopeApiKey() {
  return process.env.DASHSCOPE_API_KEY ?? "";
}

export function getDashScopeBaseUrl() {
  return (
    process.env.DASHSCOPE_BASE_URL ??
    "https://dashscope.aliyuncs.com/compatible-mode/v1"
  );
}

export function getQwenModel() {
  return process.env.QWEN_MODEL ?? "qwen-plus";
}