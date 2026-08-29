import type { CareerProfile, QuizQuestion, RiasecKey, RiasecScores } from "./types";

const keys: RiasecKey[] = ["R", "I", "A", "S", "E", "C"];

export function scoreAnswers(questions: QuizQuestion[], answers: Record<string, string>): RiasecScores {
  const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const question of questions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) continue;
    for (const key of keys) scores[key] += option.scores[key] ?? 0;
  }
  return scores;
}

export function rankCareers(profile: RiasecScores, careers: CareerProfile[]) {
  const maxProfile = Math.max(...Object.values(profile), 1);
  return careers.map((career) => {
    const distance = keys.reduce((sum, key) => sum + Math.abs(profile[key] / maxProfile - career.riasec[key] / 5), 0);
    const affinity = Math.max(0, Math.round((1 - distance / keys.length) * 100));
    return { ...career, affinity };
  }).sort((a, b) => b.affinity - a.affinity);
}

export function dominantDimensions(scores: RiasecScores) {
  return keys.slice().sort((a, b) => scores[b] - scores[a]).slice(0, 2);
}
