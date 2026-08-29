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

questions.push(
  { id: "project", prompt: "Que proyecto elegirias primero?", options: [
    { id: "prototype", label: "Construir un prototipo", scores: { R: 3, I: 1 } },
    { id: "research", label: "Investigar una pregunta compleja", scores: { I: 3 } },
    { id: "campaign", label: "Crear una propuesta visual", scores: { A: 3 } },
    { id: "workshop", label: "Coordinar un taller", scores: { S: 2, E: 1 } }
  ]},
  { id: "tools", prompt: "Con que herramientas te sientes mas a gusto?", options: [
    { id: "manual", label: "Materiales, equipos o instrumentos", scores: { R: 3 } },
    { id: "data", label: "Datos, formulas o codigo", scores: { I: 3, C: 1 } },
    { id: "creative", label: "Imagen, texto, audio o video", scores: { A: 3 } },
    { id: "planning", label: "Agendas, presupuestos y controles", scores: { C: 3, E: 1 } }
  ]},
  { id: "team-role", prompt: "Que papel adoptas en un equipo?", options: [
    { id: "maker", label: "Hago que la solucion funcione", scores: { R: 3 } },
    { id: "analyst", label: "Investigo y cuestiono supuestos", scores: { I: 3 } },
    { id: "facilitator", label: "Escucho y facilito acuerdos", scores: { S: 3 } },
    { id: "coordinator", label: "Defino metas y coordino avances", scores: { E: 3, C: 1 } }
  ]},
  { id: "pace", prompt: "Que ritmo de trabajo prefieres?", options: [
    { id: "active", label: "Activo y con resultados visibles", scores: { R: 3 } },
    { id: "deep", label: "Concentrado para profundizar", scores: { I: 3 } },
    { id: "varied", label: "Flexible, creativo y cambiante", scores: { A: 3 } },
    { id: "structured", label: "Previsible, ordenado y medible", scores: { C: 3 } }
  ]},
  { id: "communication", prompt: "Que forma de comunicar disfrutas mas?", options: [
    { id: "demonstrate", label: "Demostrar como se hace", scores: { R: 2, S: 1 } },
    { id: "explain", label: "Explicar evidencia y conceptos", scores: { I: 2, S: 1 } },
    { id: "express", label: "Expresar ideas de manera original", scores: { A: 3 } },
    { id: "persuade", label: "Convencer y movilizar decisiones", scores: { E: 3 } }
  ]},
  { id: "problem", prompt: "Que problema te motiva mas resolver?", options: [
    { id: "practical", label: "Algo que no funciona en la practica", scores: { R: 3 } },
    { id: "unknown", label: "Una causa que aun no se comprende", scores: { I: 3 } },
    { id: "human", label: "Una necesidad de personas", scores: { S: 3 } },
    { id: "process", label: "Un proceso lento o desordenado", scores: { C: 2, E: 1 } }
  ]},
  { id: "learning", prompt: "Como aprendes mejor algo nuevo?", options: [
    { id: "practice", label: "Probando y practicando", scores: { R: 3 } },
    { id: "theory", label: "Entendiendo la teoria", scores: { I: 3 } },
    { id: "explore", label: "Explorando posibilidades", scores: { A: 3 } },
    { id: "guide", label: "Con una guia y pasos definidos", scores: { C: 3 } }
  ]},
  { id: "achievement", prompt: "Que logro te daria mas satisfaccion?", options: [
    { id: "build", label: "Ver algo concreto terminado", scores: { R: 3 } },
    { id: "discover", label: "Descubrir una explicacion", scores: { I: 3 } },
    { id: "inspire", label: "Crear algo que inspire", scores: { A: 3 } },
    { id: "support", label: "Ayudar a alguien a avanzar", scores: { S: 3 } }
  ]},
  { id: "responsibility", prompt: "Que responsabilidad aceptarias con mas gusto?", options: [
    { id: "operation", label: "Operar recursos o tecnologia", scores: { R: 3 } },
    { id: "quality", label: "Analizar calidad y evidencia", scores: { I: 2, C: 1 } },
    { id: "people", label: "Acompanar a personas", scores: { S: 3 } },
    { id: "results", label: "Responder por metas y resultados", scores: { E: 3 } }
  ]},
  { id: "rules", prompt: "Frente a reglas y procesos, que prefieres?", options: [
    { id: "apply", label: "Aplicarlos con precision", scores: { C: 3 } },
    { id: "test", label: "Comprobar sus fundamentos", scores: { I: 3 } },
    { id: "adapt", label: "Adaptarlos creativamente", scores: { A: 3 } },
    { id: "improve", label: "Liderar su mejora", scores: { E: 3 } }
  ]},
  { id: "free-time", prompt: "Que actividad elegirias en tu tiempo libre?", options: [
    { id: "repair", label: "Armar, reparar o cocinar", scores: { R: 3 } },
    { id: "learn", label: "Aprender por curiosidad", scores: { I: 3 } },
    { id: "create", label: "Dibujar, escribir o crear contenido", scores: { A: 3 } },
    { id: "community", label: "Participar en una comunidad", scores: { S: 3 } }
  ]},
  { id: "uncertainty", prompt: "Como reaccionas ante la incertidumbre?", options: [
    { id: "try", label: "Pruebo una solucion concreta", scores: { R: 2, E: 1 } },
    { id: "investigate", label: "Reuno mas informacion", scores: { I: 3 } },
    { id: "imagine", label: "Imagino escenarios distintos", scores: { A: 3 } },
    { id: "organize", label: "Creo un plan de control", scores: { C: 3 } }
  ]},
  { id: "service", prompt: "Que tipo de servicio te atrae mas?", options: [
    { id: "technical", label: "Resolver una necesidad tecnica", scores: { R: 3 } },
    { id: "advice", label: "Dar orientacion fundamentada", scores: { I: 2, S: 1 } },
    { id: "care", label: "Escuchar, ensenar o cuidar", scores: { S: 3 } },
    { id: "manage", label: "Dirigir recursos hacia una meta", scores: { E: 2, C: 1 } }
  ]},
  { id: "ideal-day", prompt: "Como seria tu dia de trabajo ideal?", options: [
    { id: "tangible", label: "Produzco un resultado tangible", scores: { R: 3 } },
    { id: "complex", label: "Resuelvo un reto intelectual", scores: { I: 3 } },
    { id: "original", label: "Desarrollo una propuesta original", scores: { A: 3 } },
    { id: "collaborative", label: "Genero acuerdos con personas", scores: { S: 2, E: 1 } }
  ]}
);

export const careers: CareerProfile[] = [
  { id: "psychology", name: "Psicología", field: "Ciencias sociales y salud", riasec: { R: 1, I: 4, A: 2, S: 5, E: 2, C: 2 }, explanation: "Combina comprensión del comportamiento, análisis y acompañamiento humano.", iuaProgramSlug: "psicologia" },
  { id: "law", name: "Derecho", field: "Ciencias sociales", riasec: { R: 1, I: 4, A: 2, S: 3, E: 5, C: 3 }, explanation: "Requiere análisis, argumentación, negociación y responsabilidad social.", iuaProgramSlug: "derecho" },
  { id: "pedagogy", name: "Pedagogía", field: "Educación", riasec: { R: 1, I: 3, A: 3, S: 5, E: 2, C: 3 }, explanation: "Se orienta a la enseñanza, el diseño educativo y el desarrollo de personas.", iuaProgramSlug: "pedagogia" },
  { id: "systems", name: "Ingeniería en Sistemas Computacionales", field: "Tecnología", riasec: { R: 4, I: 5, A: 2, S: 1, E: 2, C: 4 }, explanation: "Integra lógica, tecnología, construcción de soluciones y mejora de sistemas.", iuaProgramSlug: "ingenieria-en-sistemas-computacionales" },
  { id: "design", name: "Diseño Gráfico", field: "Diseño y comunicación", riasec: { R: 2, I: 2, A: 5, S: 2, E: 3, C: 2 }, explanation: "Prioriza creatividad, comunicación visual y solución de problemas de diseño.", iuaProgramSlug: "diseno-grafico" },
  { id: "administration", name: "Administración de Empresas", field: "Negocios", riasec: { R: 1, I: 3, A: 2, S: 2, E: 5, C: 5 }, explanation: "Combina organización, liderazgo, planeación y toma de decisiones.", iuaProgramSlug: "administracion-de-empresas" }
];
