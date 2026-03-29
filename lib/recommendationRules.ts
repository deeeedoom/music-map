export type RecommendationStage = {
  label: string;
  name: string;
  description: string;
};

export type Recommendation = {
  pathTitle: string;
  summary: string;
  stages: RecommendationStage[];
  artists: string[];
  keywords: string[];
  nextSteps: string[];
};

export type RecommendationRule = {
  keywords: string[];
  result: Recommendation;
};

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    keywords: ["industrial", "hard", "硬", "工业", "强推进", "peak"],
    result: {
      pathTitle: "你的路径可能是：Industrial Techno → Peak-time Techno → Hardgroove",
      summary:
        "你的偏好更接近强驱动、直接、压迫感更强的 techno 路线。适合从工业质感和高能量推进出发，再延伸到更强调律动滚动感的方向。",
      stages: [
        {
          label: "起点风格",
          name: "Industrial Techno",
          description: "强调力量感、金属感、压迫感和更粗粝的声音质地。",
        },
        {
          label: "延伸方向",
          name: "Peak-time Techno",
          description: "更直接的舞池推动力，适合高能量场景和明确推进感。",
        },
        {
          label: "可能终点",
          name: "Hardgroove",
          description: "在强劲能量之外，加入更清晰的鼓组滚动和律动身体感。",
        },
      ],
      artists: ["Perc", "Dax J", "Regal", "Cleric"],
      keywords: ["industrial", "pressure", "peak-time", "hard groove"],
      nextSteps: [
        "先连续听 4 首更硬、更直接的 techno",
        "比较工业质感和 groove 感哪个更吸引你",
        "下一轮输入里补充你是否喜欢更快的速度感",
      ],
    },
  },
  {
    keywords: ["house", "groove", "轻松", "律动", "跳舞", "温暖"],
    result: {
      pathTitle: "你的路径可能是：Deep House → Minimal House → Microhouse",
      summary:
        "你的偏好更重视律动、流动感和耐听性，而不是纯粹的强推进。适合从更温暖、可进入的 house 方向开始，再逐渐进入更细节化、更克制的分支。",
      stages: [
        {
          label: "起点风格",
          name: "Deep House",
          description: "温暖、流畅，强调舒适的律动和更容易进入的氛围。",
        },
        {
          label: "延伸方向",
          name: "Minimal House",
          description: "保留 groove，同时减少元素，突出结构和细节变化。",
        },
        {
          label: "可能终点",
          name: "Microhouse",
          description: "更细腻、更微观，重视声音纹理与长期聆听体验。",
        },
      ],
      artists: ["Ricardo Villalobos", "Zip", "Janeret", "DJ Masda"],
      keywords: ["warm", "groove", "minimal", "micro-detail"],
      nextSteps: [
        "先区分你更喜欢温暖感还是极简细节",
        "多听长混音而不是单曲",
        "下一轮输入里补充你更偏白天还是夜晚场景",
      ],
    },
  },
  {
    keywords: ["acid", "303", "raw", "driving", "尖锐", "刺激", "直接"],
    result: {
      pathTitle: "你的路径可能是：Acid Techno → Raw Techno → Driving Techno",
      summary:
        "你的偏好更接近直接、锐利、持续推进的路线。适合从 acid 的音色特征出发，进入更生猛的 raw 质感，再延伸到稳定向前的 driving techno。",
      stages: [
        {
          label: "起点风格",
          name: "Acid Techno",
          description: "突出 303 式音色、酸性线条和更明显的刺激感。",
        },
        {
          label: "延伸方向",
          name: "Raw Techno",
          description: "更粗粝、更直接，强调原始能量和声音冲击。",
        },
        {
          label: "可能终点",
          name: "Driving Techno",
          description: "保持持续向前的推进感，适合长线条、稳定前进的聆听体验。",
        },
      ],
      artists: ["Emmanuel Top", "Thomas P. Heckmann", "Hadone", "Chlär"],
      keywords: ["acid", "303", "raw", "driving"],
      nextSteps: [
        "先确认你喜欢的是 acid 音色还是整体推进感",
        "比较 raw 质感和工业路线的差别",
        "下一轮输入里补充你是否接受更强刺激感",
      ],
    },
  },
];

export const DEFAULT_RECOMMENDATION: Recommendation = {
  pathTitle: "你的路径可能是：Dub Techno → Hypnotic Techno → Minimal Techno",
  summary:
    "你的偏好不是最直接的能量释放，而是空间、重复、质感和沉浸感。这条路线适合从深度氛围型 techno 开始，逐步进入更克制、更结构化的方向。",
  stages: [
    {
      label: "起点风格",
      name: "Dub Techno",
      description: "更强调空间感、回响、深度和缓慢推进。",
    },
    {
      label: "延伸方向",
      name: "Hypnotic Techno",
      description: "保留沉浸感，同时加入更明确的律动与循环张力。",
    },
    {
      label: "可能终点",
      name: "Minimal Techno",
      description: "更克制、更结构化，关注细节变化和长期聆听体验。",
    },
  ],
  artists: ["Rodhad", "Deepchord", "Basic Channel", "Donato Dozzy"],
  keywords: ["deep", "space", "hypnotic", "minimal"],
  nextSteps: [
    "先判断你更喜欢空间感还是循环催眠感",
    "多听长线条、少人声的作品",
    "下一轮输入里补充你是否想更黑暗或更温暖一些",
  ],
};