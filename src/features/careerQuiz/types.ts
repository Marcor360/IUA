export type RiasecKey = "R" | "I" | "A" | "S" | "E" | "C";
export type RiasecScores = Record<RiasecKey, number>;

export type QuizOption = { id: string; label: string; scores: Partial<RiasecScores> };
export type QuizQuestion = { id: string; prompt: string; options: QuizOption[] };
export type CareerProfile = {
  id: string;
  name: string;
  field: string;
  riasec: RiasecScores;
  explanation: string;
  iuaProgramSlug?: string;
  source?: string;
};
