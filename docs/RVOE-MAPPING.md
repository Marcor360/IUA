# Mapping RVOE

La fuente central `src/data/rvoe.ts` contiene 22 registros. Un número válido tiene ocho dígitos. `resolveRvoe` exige coincidencia exacta de programa, modalidad oficial, campus e institución; con cero o varias coincidencias devuelve `undefined`.

`src/data/programOfferings.ts` proyecta las 22 asociaciones programa/RVOE confirmadas por IUA y conserva internamente modalidad oficial, campus e institución cuando existen. La interfaz de cada programa muestra únicamente el campo `RVOE: XXXXXXXX`; cuando tiene varios reconocimientos, muestra cada número confirmado.

Los 22 registros permanecen también disponibles en `/rvoe`, cuya tabla pública presenta Programa, Modalidad, RVOE y Ficha. La asociación Arquitectura del Paisaje → ficha de Arquitectura fue confirmada en la lista entregada por IUA.

Secundaria y Bachillerato no tienen registro en la fuente. No muestran placeholders.
