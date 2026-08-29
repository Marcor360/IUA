import type { CareerProfile, QuizQuestion } from "./types";

export const questions: QuizQuestion[] = [
  { id: "activity", prompt: "¿Qué tipo de actividad disfrutas más?", options: [
    { id: "solve", label: "Investigar y resolver problemas", scores: { I: 3, R: 1 } },
    { id: "create", label: "Crear ideas, imágenes o experiencias", scores: { A: 3 } },
    { id: "help", label: "Escuchar, enseñar o ayudar", scores: { S: 3 } },
    { id: "lead", label: "Organizar, negociar o liderar", scores: { E: 3, C: 1 } }
  ]},
  { id: "subject", prompt: "¿Qué área académica te atrae más?", options: [
    { id: "tech", label: "Tecnología y matemáticas", scores: { I: 2, R: 2 } },
    { id: "human", label: "Ciencias sociales y humanidades", scores: { S: 2, I: 1 } },
    { id: "arts", label: "Arte, idiomas y comunicación", scores: { A: 3 } },
    { id: "business", label: "Negocios, leyes y finanzas", scores: { E: 2, C: 2 } }
  ]},
  { id: "environment", prompt: "¿En qué entorno te imaginas trabajando?", options: [
    { id: "people", label: "En contacto directo con personas", scores: { S: 3 } },
    { id: "studio", label: "En un estudio o entorno creativo", scores: { A: 3 } },
    { id: "office", label: "En una organización con procesos claros", scores: { C: 2, E: 2 } },
    { id: "lab", label: "Con sistemas, datos o herramientas técnicas", scores: { I: 2, R: 2 } }
  ]},
  { id: "strength", prompt: "¿Qué fortaleza te describe mejor?", options: [
    { id: "empathy", label: "Empatía y comunicación", scores: { S: 3 } },
    { id: "analysis", label: "Análisis y pensamiento lógico", scores: { I: 3 } },
    { id: "initiative", label: "Iniciativa y persuasión", scores: { E: 3 } },
    { id: "detail", label: "Orden y atención al detalle", scores: { C: 3 } }
  ]},
  { id: "impact", prompt: "¿Qué impacto te gustaría generar?", options: [
    { id: "wellbeing", label: "Mejorar el bienestar o aprendizaje", scores: { S: 3 } },
    { id: "innovation", label: "Crear soluciones nuevas", scores: { I: 2, A: 2 } },
    { id: "organizations", label: "Hacer crecer organizaciones", scores: { E: 3, C: 1 } },
    { id: "built", label: "Construir productos o espacios", scores: { R: 3, A: 1 } }
  ]},
  { id: "decision", prompt: "Cuando decides, ¿qué prefieres?", options: [
    { id: "evidence", label: "Analizar evidencia", scores: { I: 3 } },
    { id: "values", label: "Considerar a las personas", scores: { S: 3 } },
    { id: "possibilities", label: "Explorar posibilidades", scores: { A: 2, E: 1 } },
    { id: "plan", label: "Seguir un plan verificable", scores: { C: 3 } }
  ]}
];

export const careers: CareerProfile[] = [
  { id: "psychology", name: "Psicología", field: "Ciencias sociales y salud", riasec: { R: 1, I: 4, A: 2, S: 5, E: 2, C: 2 }, explanation: "Combina comprensión del comportamiento, análisis y acompañamiento humano.", iuaProgramSlug: "psicologia" },
  { id: "law", name: "Derecho", field: "Ciencias sociales", riasec: { R: 1, I: 4, A: 2, S: 3, E: 5, C: 3 }, explanation: "Requiere análisis, argumentación, negociación y responsabilidad social.", iuaProgramSlug: "derecho" },
  { id: "pedagogy", name: "Pedagogía", field: "Educación", riasec: { R: 1, I: 3, A: 3, S: 5, E: 2, C: 3 }, explanation: "Se orienta a la enseñanza, el diseño educativo y el desarrollo de personas.", iuaProgramSlug: "pedagogia" },
  { id: "systems", name: "Ingeniería en Sistemas Computacionales", field: "Tecnología", riasec: { R: 4, I: 5, A: 2, S: 1, E: 2, C: 4 }, explanation: "Integra lógica, tecnología, construcción de soluciones y mejora de sistemas.", iuaProgramSlug: "ingenieria-en-sistemas-computacionales" },
  { id: "design", name: "Diseño Gráfico", field: "Diseño y comunicación", riasec: { R: 2, I: 2, A: 5, S: 2, E: 3, C: 2 }, explanation: "Prioriza creatividad, comunicación visual y solución de problemas de diseño.", iuaProgramSlug: "diseno-grafico" },
  { id: "administration", name: "Administración de Empresas", field: "Negocios", riasec: { R: 1, I: 3, A: 2, S: 2, E: 5, C: 5 }, explanation: "Combina organización, liderazgo, planeación y toma de decisiones.", iuaProgramSlug: "administracion-de-empresas" }
];
