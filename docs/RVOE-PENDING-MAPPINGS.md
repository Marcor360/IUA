# Mappings RVOE pendientes

La fuente oficial se conserva completa en `src/data/rvoe.ts`. Un RVOE solo se resuelve cuando programa, modalidad, plantel e institución (si aplica) coinciden exactamente.

## Contexto comercial no inferido

- Los registros sin plantel explícito no se atribuyen a Chalco, Reyes, Texcoco ni al plantel virtual.
- La modalidad comercial “Ejecutiva” no se equipara automáticamente con “Mixta”.
- La modalidad comercial “En línea” no se equipara automáticamente con “No Escolarizada” en un mapping público concreto.
- La lista confirmada asocia “Arquitectura del Paisaje” con la ficha pública de Arquitectura, sin cambiar el nombre oficial mostrado en `/rvoe`.
- Psicología publica su RVOE confirmado en la ficha, pero “Mixta” no se equipara internamente con Escolarizada, Ejecutiva o En línea.

## Asociaciones publicadas

Las 22 asociaciones proporcionadas por IUA se muestran en sus fichas correspondientes. El contexto de campus, institución y modalidad oficial se conserva en los datos aunque la tarjeta muestre únicamente el número.

## Acción institucional requerida

Confirmar para cada programa la relación exacta entre el catálogo comercial actual y el nombre oficial, plantel, modalidad e institución de cada acuerdo. Hasta entonces no se fuerza ninguna coincidencia.
