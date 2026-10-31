import { useEffect, useState } from "react";
import { IconSparkles as Sparkles } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function BotonTestVocacional() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/que-carrera-estudiar"
      aria-label="Hacer el test vocacional"
      className={`career-quiz-float ${isVisible ? "career-quiz-float--visible" : ""}`}
    >
      <span className="career-quiz-float__sparkle"><Sparkles size={21} /></span>
      <span><strong>¿Qué carrera estudiar?</strong><small>Haz tu test vocacional</small></span>
    </Link>
  );
}
