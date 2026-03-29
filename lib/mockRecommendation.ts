import {
  DEFAULT_RECOMMENDATION,
  RECOMMENDATION_RULES,
  type Recommendation,
} from "@/lib/recommendationRules";

function matchesRule(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function getMockRecommendation(seed: string, context: string): Recommendation {
  const text = `${seed} ${context}`.toLowerCase();

  const matchedRule = RECOMMENDATION_RULES.find((rule) => matchesRule(text, rule.keywords));

  return matchedRule?.result ?? DEFAULT_RECOMMENDATION;
}