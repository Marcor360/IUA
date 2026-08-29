# Mapping RVOE

La fuente central `src/data/rvoe.ts` contiene 22 registros. Un número válido tiene ocho dígitos. `resolveRvoe` exige coincidencia exacta de programa, modalidad, campus e institución; con cero o varias coincidencias devuelve `undefined`.

Una ficha genérica no tiene campus/modalidad seleccionados. `resolveProgramPageRvoe` sólo publica el campo cuando el programa tiene un único registro válido. La interfaz muestra exclusivamente `RVOE: XXXXXXXX`. Sin registro o con ambigüedad, el campo desaparece.

Mappings múltiples no elegidos automáticamente: Derecho, Maestría en Derecho Penal, Lenguas Extranjeras, Administración de Empresas, Contaduría Pública y Pedagogía. Arquitectura comercial no se equipara con Arquitectura del Paisaje. Consulta `RVOE-PENDING-MAPPINGS.md`.

Secundaria y Bachillerato no tienen registro en la fuente. No muestran placeholders.
