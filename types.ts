/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const MAX_STORY_PAGES = 10;
export const BACK_COVER_PAGE = 11;
export const TOTAL_PAGES = 11;
export const INITIAL_PAGES = 2;
export const GATE_PAGE = 2;
export const BATCH_SIZE = 6;
export const DECISION_PAGES = [3];

export const GENRES = ["Classic Horror", "Superhero Action", "Dark Sci-Fi", "High Fantasy", "Neon Noir Detective", "Wasteland Apocalypse", "Lighthearted Comedy", "Teen Drama / Slice of Life", "Custom"];
export const TONES = [
    "ACTION-HEAVY (Short, punchy dialogue. Focus on kinetics.)",
    "INNER-MONOLOGUE (Heavy captions revealing thoughts.)",
    "QUIPPY (Characters use humor as a defense mechanism.)",
    "OPERATIC (Grand, dramatic declarations and high stakes.)",
    "CASUAL (Natural dialogue, focus on relationships/gossip.)",
    "WHOLESOME (Warm, gentle, optimistic.)"
];

export const SETTINGS = [
    "Modern City",
    "Fantasy Realm",
    "Space/Sci-Fi",
    "Post-Apocalyptic",
    "Medieval Kingdom",
    "Cyberpunk",
    "Small Town",
    "Underwater",
    "Desert Wasteland",
    "Haunted Mansion",
    "School/Academy",
    "Custom"
];

export const THEMES = [
    "Revenge",
    "Redemption",
    "Friendship",
    "Betrayal",
    "Love",
    "Sacrifice",
    "Coming of Age",
    "Power & Corruption",
    "Survival",
    "Justice",
    "Family",
    "Identity",
    "Freedom",
    "Hope vs Despair"
];

export const TIME_PERIODS = [
    "Present Day",
    "Near Future (2050s)",
    "Far Future (Beyond 2100)",
    "1980s-1990s",
    "1950s-1960s",
    "1920s-1930s",
    "Medieval Era",
    "Ancient Times",
    "Victorian Era",
    "Wild West",
    "Timeless/Fantasy"
];

export const ART_STYLES = [
    "Classic American Comic",
    "Manga/Anime",
    "Noir/Black & White",
    "Watercolor",
    "Cartoon/Animated",
    "Realistic",
    "Grunge/Gritty",
    "Minimalist",
    "Retro/Vintage"
];

export const LANGUAGES = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'ar', name: 'Arabic' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'es-MX', name: 'Spanish (Mexico)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'id-ID', name: 'Indonesian (Indonesia)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'ko-KR', name: 'Korean (South Korea)' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ru-RU', name: 'Russian (Russia)' },
    { code: 'ua-UA', name: 'Ukrainian (Ukraine)' },
    { code: 'vi-VN', name: 'Vietnamese (Vietnam)' },
    { code: 'zh-CN', name: 'Chinese (China)' }
];

export interface ComicFace {
  id: string;
  type: 'cover' | 'story' | 'back_cover';
  imageUrl?: string;
  narrative?: Beat;
  choices: string[];
  resolvedChoice?: string;
  isLoading: boolean;
  pageIndex?: number;
  isDecisionPage?: boolean;
}

export interface Beat {
  caption?: string;
  dialogue?: string;
  scene: string;
  choices: string[];
  focus_char: 'hero' | 'friend' | 'other';
}

export interface Persona {
  base64: string;
  desc: string;
}

export interface IssueMetadata {
  issueNumber: number;
  seriesId: string;
  createdAt: number;
  completedAt?: number;
  totalPages: number;
  keyEvents: string[]; // Major plot points from this issue
  characterStates: {
    heroState: string; // How the hero ended this issue
    friendState?: string; // How the co-star ended this issue
    relationships: string; // Relationship dynamics
  };
  unsolvedMysteries: string[]; // Cliffhangers and open questions
  lastChoice?: string; // User's final decision in this issue
}

export interface Series {
  id: string;
  name: string;
  hero: Persona;
  friend?: Persona;
  genre: string;
  setting: string;
  theme: string;
  timePeriod: string;
  artStyle: string;
  language: string;
  richMode: boolean;
  customPremise?: string;
  totalIssuesPlanned: number;
  issues: IssueMetadata[];
  currentIssueNumber: number;
  createdAt: number;
  lastModified: number;
}

export interface StoryContext {
  previousIssues: IssueMetadata[];
  currentIssueNumber: number;
  totalIssuesPlanned: number;
  seriesOverview: string; // Summary of story so far
}