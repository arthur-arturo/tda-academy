import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pilaColaExercises } from './data_pila_cola.mjs';
import { conjDicExercises } from './data_conj_dic.mjs';
import { nodosExercises } from './data_nodos.mjs';
import { arbolesExercises } from './data_arboles.mjs';
import { grafosExercises } from './data_grafos.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const allExercises = [
  ...pilaColaExercises,
  ...conjDicExercises,
  ...nodosExercises,
  ...arbolesExercises,
  ...grafosExercises
];

const jsContent = `/* ============================================================================
   TDA PLAYBOOK: EJERCICIOS CLAVE E IMPERDIBLES (Pilas -> Colas -> Árboles -> Grafos)
   Total: ${allExercises.length} Ejercicios de Cátedra (UADE / Programación II)
   ============================================================================ */

window.PLAYBOOK_EXERCISES = ${JSON.stringify(allExercises, null, 2)};
`;

const destPath = path.join(__dirname, '..', 'src', 'exercises.js');
fs.writeFileSync(destPath, jsContent, 'utf8');
console.log(`Generated src/exercises.js with ${allExercises.length} exercises!`);
