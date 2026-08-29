import { describe, expect, it } from "vitest";
import { careers, questions } from "./data";
import { dominantDimensions, rankCareers, scoreAnswers } from "./scoring";

describe("career quiz scoring", () => {
  it("usa 20 preguntas en una experiencia paso a paso", () => {
    expect(questions).toHaveLength(20);
    expect(new Set(questions.map(({ id }) => id)).size).toBe(20);
  });

  it("is deterministic for the same answers", () => {
    const answers = Object.fromEntries(questions.map((question) => [question.id, question.options[0].id]));
    expect(scoreAnswers(questions, answers)).toEqual(scoreAnswers(questions, answers));
    expect(rankCareers(scoreAnswers(questions, answers), careers)).toEqual(rankCareers(scoreAnswers(questions, answers), careers));
  });

  it("returns affinity values between zero and one hundred", () => {
    const ranked = rankCareers({ R: 2, I: 8, A: 1, S: 9, E: 1, C: 2 }, careers);
    expect(ranked).toHaveLength(careers.length);
    expect(ranked.every((career) => career.affinity >= 0 && career.affinity <= 100)).toBe(true);
  });

  it("identifies the two strongest dimensions", () => {
    expect(dominantDimensions({ R: 1, I: 5, A: 2, S: 8, E: 3, C: 0 })).toEqual(["S", "I"]);
  });
});
