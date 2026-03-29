export type SearchInput = {
  seed: string;
  context: string;
};

export function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function buildSearchInput(seed?: string, context?: string): SearchInput {
  const normalizedSeed = normalizeText(seed ?? "");
  const normalizedContext = normalizeText(context ?? "");

  return {
    seed: normalizedSeed || "Dub Techno",
    context: normalizedContext || "你喜欢空间感、重复、深度和夜晚沉浸感。",
  };
}