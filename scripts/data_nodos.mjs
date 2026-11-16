export const nodosExercises = [
  {
    id: "E18",
    cat: "nodos",
    catLabel: "Memoria Dinámica & Nodos",
    difficulty: "Básico Clave",
    title: "Recorrido Sagrado de Lista Enlazada",
    tag: "Punteros y Memoria",
    summary: "El bucle universal 'while (act != null)' para recorrer listas de nodos y calcular longitud y suma.",
    mision: "Dado el puntero inicial 'primero' de una lista simplemente enlazada de objetos Nodo (con campos 'info' y 'sig'), calcular la suma de sus elementos y el tamaño total sin perder la referencia a la cabeza.",
    mentalClick: `💡 **El Click Mental:**
Una lista enlazada es como una fila de personas donde cada una sólo conoce a la persona de atrás (su puntero \`sig\`).
Para recorrerla sin perder dónde empieza:
* Creamos un puntero viajero: \`Nodo act = primero;\`.
* Avanzamos paso a paso: \`act = act.sig;\`.
* El final de la lista siempre se reconoce porque el último apunta a \`null\`.`,
    examTrap: `⚠️ **Trampa de Parcial mortal:**
Hacer \`primero = primero.sig\` dentro del bucle. Si modificás \`primero\`, **¡destruiste la lista para siempre!** En Java el Garbage Collector borrará de la memoria todos los nodos anteriores porque perdiste la cabeza. Siempre usa una variable auxiliar \`act\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Visita exactamente una vez cada nodo.
* **Espacio:** $O(1)$ — Memoria constante, solo 1 puntero auxiliar.`,
    code: `// Clase oficial de Nodo en cátedra
class Nodo {
    int info;
    Nodo sig;
}

public static int sumaLista(Nodo primero) {
    int suma = 0;
    Nodo act = primero; // ¡Puntero viajero para no destruir primero!

    while (act != null) {
        suma += act.info;
        act = act.sig;  // Salto al siguiente nodo en la memoria RAM
    }

    return suma;
}`,
    sim: {
      type: "nodes",
      initial: {
        nodes: [
          { id: 1, val: 10, sig: 2 },
          { id: 2, val: 25, sig: 3 },
          { id: 3, val: 40, sig: null }
        ],
        pointers: [
          { name: "primero", nodeId: 1 },
          { name: "act", nodeId: 1 }
        ]
      },
      steps: [
        { codeLine: 8, msg: "Inicio: 'primero' y 'act' apuntan al nodo 10. Suma = 0.", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 25, sig: 3 }, { id: 3, val: 40, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "act", nodeId: 1 }] },
        { codeLine: 12, msg: "act.info = 10 ➔ Suma = 10. Avanzamos: act = act.sig (apunta a 25).", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 25, sig: 3 }, { id: 3, val: 40, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "act", nodeId: 2 }] },
        { codeLine: 12, msg: "act.info = 25 ➔ Suma = 35. Avanzamos: act = act.sig (apunta a 40).", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 25, sig: 3 }, { id: 3, val: 40, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "act", nodeId: 3 }] },
        { codeLine: 12, msg: "act.info = 40 ➔ Suma = 75. Avanzamos: act = act.sig ➔ act es null.", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 25, sig: 3 }, { id: 3, val: 40, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "act", nodeId: null }] },
        { codeLine: 15, msg: "Bucle termina (act == null). Retorna suma = 75. 'primero' quedó intacto.", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 25, sig: 3 }, { id: 3, val: 40, sig: null }], pointers: [{ name: "primero", nodeId: 1 }] }
      ]
    }
  },
  {
    id: "E19",
    cat: "nodos",
    catLabel: "Memoria Dinámica & Nodos",
    difficulty: "Parcial Clave",
    title: "Inserción Ordenada en Lista de Nodos",
    tag: "Reconexión de Punteros",
    summary: "Insertar un nuevo nodo en una lista enlazada preservando el orden ascendente.",
    mision: "Dado un entero 'x' y la cabeza 'primero' de una lista ordenada, insertar 'x' en la posición correspondiente reconectando los punteros 'sig'.",
    mentalClick: `💡 **El Click Mental:**
Hay solo **dos casos posibles**:
1. **El nuevo elemento va al principio:** Si la lista está vacía o el nuevo valor es menor que \`primero.info\`.
   \`nuevo.sig = primero; return nuevo;\` (nueva cabeza).
2. **El nuevo elemento va en el medio o al final:**
   Caminamos con dos punteros (\`ant\` y \`act\`) hasta encontrar el hueco donde \`act == null || act.info > x\`.
   Hacemos la costura: \`ant.sig = nuevo; nuevo.sig = act;\`.`,
    examTrap: `⚠️ **Trampa de Parcial mortal:**
Hacer la asignación al revés: \`nuevo.sig = act; ant.sig = nuevo;\`. Si hacés \`ant.sig = nuevo\` primero y perdiste la referencia a \`act\`, rompés el tren de memoria y perdiste el resto de la lista.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — En el peor caso recorremos toda la lista para insertar al final.
* **Espacio:** $O(1)$ — Solo creamos el nuevo nodo y punteros auxiliares.`,
    code: `public static Nodo insertarOrdenado(Nodo primero, int x) {
    Nodo nuevo = new Nodo();
    nuevo.info = x;

    // Caso 1: Va al inicio (o lista vacía)
    if (primero == null || x < primero.info) {
        nuevo.sig = primero;
        return nuevo; // Nueva cabeza de la lista
    }

    // Caso 2: Va en el medio o al final
    Nodo ant = primero;
    Nodo act = primero.sig;

    while (act != null && act.info < x) {
        ant = act;
        act = act.sig;
    }

    // Costura de punteros
    nuevo.sig = act;
    ant.sig = nuevo;

    return primero; // La cabeza no cambió
}`,
    sim: {
      type: "nodes",
      initial: {
        nodes: [
          { id: 1, val: 10, sig: 3 },
          { id: 3, val: 30, sig: null },
          { id: 2, val: 20, sig: null }
        ],
        pointers: [
          { name: "primero", nodeId: 1 },
          { name: "nuevo (x=20)", nodeId: 2 }
        ]
      },
      steps: [
        { codeLine: 5, msg: "Lista: [10] ➔ [30]. Queremos insertar x = 20 ordenadamente.", nodes: [{ id: 1, val: 10, sig: 3 }, { id: 3, val: 30, sig: null }, { id: 2, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "nuevo", nodeId: 2 }] },
        { codeLine: 12, msg: "ant apunta a 10, act apunta a 30. Comparamos: act.info (30) > 20 ➔ Encontramos el hueco.", nodes: [{ id: 1, val: 10, sig: 3 }, { id: 3, val: 30, sig: null }, { id: 2, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "ant", nodeId: 1 }, { name: "act", nodeId: 3 }, { name: "nuevo", nodeId: 2 }] },
        { codeLine: 20, msg: "Paso 1 de costura: nuevo.sig = act (nuevo 20 apunta a 30).", nodes: [{ id: 1, val: 10, sig: 3 }, { id: 2, val: 20, sig: 3 }, { id: 3, val: 30, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "ant", nodeId: 1 }, { name: "act", nodeId: 3 }, { name: "nuevo", nodeId: 2 }] },
        { codeLine: 21, msg: "Paso 2 de costura: ant.sig = nuevo (nodo 10 apunta a nuevo 20).", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 20, sig: 3 }, { id: 3, val: 30, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "nuevo", nodeId: 2 }] },
        { codeLine: 23, msg: "¡Listo! La lista quedó: [10] ➔ [20] ➔ [30].", nodes: [{ id: 1, val: 10, sig: 2 }, { id: 2, val: 20, sig: 3 }, { id: 3, val: 30, sig: null }], pointers: [{ name: "primero", nodeId: 1 }] }
      ]
    }
  },
  {
    id: "E20",
    cat: "nodos",
    catLabel: "Memoria Dinámica & Nodos",
    difficulty: "Parcial Clave",
    title: "Eliminar Nodo con Valor X (Cirugía de Punteros)",
    tag: "Reconexión de Punteros",
    summary: "Desconectar y eliminar la primera aparición de un valor X en una lista enlazada.",
    mision: "Dado un puntero primero y un valor x, desconectar el nodo que contiene x para que sea liberado de memoria, manejando si x está en la cabeza o en el medio.",
    mentalClick: `💡 **El Click Mental:**
* **Si el nodo a borrar es el primero (\`primero.info == x\`):**
  La cabeza de la lista se mueve un paso: \`primero = primero.sig;\`. El viejo primer nodo queda flotando y el Garbage Collector lo destruye.
* **Si está más adelante:**
  Buscamos el nodo con \`act\` recordando quién era \`ant\`. Cuando lo encontramos:
  \`ant.sig = act.sig;\`
  ¡El nodo anterior 'salta' por encima de \`act\` y se conecta directamente con el siguiente!`,
    examTrap: `⚠️ **Trampa de Parcial:**
No verificar si \`primero == null\` al principio. Si la lista está vacía y hacés \`primero.info\`, tu programa lanza un **NullPointerException** inmediato.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Búsqueda secuencial.
* **Espacio:** $O(1)$ — No se crea ningún nodo nuevo.`,
    code: `public static Nodo eliminarNodo(Nodo primero, int x) {
    if (primero == null) return null;

    // Caso 1: El elemento a eliminar está en la cabeza
    if (primero.info == x) {
        return primero.sig; // El segundo pasa a ser la nueva cabeza
    }

    // Caso 2: El elemento está en el cuerpo de la lista
    Nodo ant = primero;
    Nodo act = primero.sig;

    while (act != null && act.info != x) {
        ant = act;
        act = act.sig;
    }

    // Si lo encontramos, bypass quirúrgico
    if (act != null) {
        ant.sig = act.sig;
    }

    return primero;
}`,
    sim: {
      type: "nodes",
      initial: {
        nodes: [
          { id: 1, val: 5, sig: 2 },
          { id: 2, val: 99, sig: 3 },
          { id: 3, val: 20, sig: null }
        ],
        pointers: [
          { name: "primero", nodeId: 1 }
        ]
      },
      steps: [
        { codeLine: 5, msg: "Lista: [5] ➔ [99] ➔ [20]. Buscamos eliminar X = 99.", nodes: [{ id: 1, val: 5, sig: 2 }, { id: 2, val: 99, sig: 3 }, { id: 3, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }] },
        { codeLine: 11, msg: "ant = nodo(5), act = nodo(99). act.info == 99 ➔ ¡Encontrado!", nodes: [{ id: 1, val: 5, sig: 2 }, { id: 2, val: 99, sig: 3 }, { id: 3, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "ant", nodeId: 1 }, { name: "act", nodeId: 2 }] },
        { codeLine: 19, msg: "Bypass quirúrgico: ant.sig = act.sig (nodo 5 apunta directo a nodo 20).", nodes: [{ id: 1, val: 5, sig: 3 }, { id: 2, val: 99, sig: 3, disconnected: true }, { id: 3, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }, { name: "ant", nodeId: 1 }] },
        { codeLine: 22, msg: "Nodo 99 quedó desconectado. Lista resultante: [5] ➔ [20].", nodes: [{ id: 1, val: 5, sig: 3 }, { id: 3, val: 20, sig: null }], pointers: [{ name: "primero", nodeId: 1 }] }
      ]
    }
  },
  {
    id: "E21",
    cat: "nodos",
    catLabel: "Memoria Dinámica & Nodos",
    difficulty: "Avanzado / Parcial",
    title: "Invertir Lista Enlazada In-Situ (Patrón 3 Punteros)",
    tag: "Reconexión de Punteros",
    summary: "Dar vuelta el sentido de todas las flechas 'sig' en la memoria sin crear nodos nuevos.",
    mision: "Invertir una lista de nodos in-situ en tiempo O(n) y memoria auxiliar O(1) modificando exclusivamente las referencias 'sig'.",
    mentalClick: `💡 **El Click Mental:**
Imagina 3 punteros marchando al unísono: \`prev\`, \`act\` y \`sig\`.
En cada iteración del bucle:
1. \`sig = act.sig;\` ➔ Guardamos quién sigue para no perder el resto de la lista.
2. \`act.sig = prev;\` ➔ **¡Damos vuelta la flecha!** (ahora apunta hacia atrás).
3. \`prev = act;\` ➔ Avanzamos prev.
4. \`act = sig;\` ➔ Avanzamos act.
Al terminar, \`prev\` apunta a la nueva cabeza (el viejo último nodo).`,
    examTrap: `⚠️ **Trampa de Parcial:**
Intentar hacer \`act.sig = prev\` sin haber guardado antes \`sig = act.sig\`. Al pisar \`act.sig\` perdiste instantáneamente la pista de todos los nodos que venían después.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Recorre cada nodo una sola vez.
* **Espacio Auxiliar:** $O(1)$ — Solamente tres punteros en la pila de ejecución. ¡Óptimo absoluto!`,
    code: `public static Nodo invertirLista(Nodo primero) {
    Nodo prev = null;
    Nodo act = primero;
    Nodo sig = null;

    while (act != null) {
        sig = act.sig;   // 1. Guardar referencia al siguiente
        act.sig = prev;  // 2. Invertir la flecha hacia el anterior
        prev = act;      // 3. Mover prev un paso adelante
        act = sig;       // 4. Mover act un paso adelante
    }

    return prev; // 'prev' es la nueva cabeza de la lista invertida
}`,
    sim: {
      type: "nodes",
      initial: {
        nodes: [
          { id: 1, val: 1, sig: 2 },
          { id: 2, val: 2, sig: 3 },
          { id: 3, val: 3, sig: null }
        ],
        pointers: [
          { name: "primero", nodeId: 1 }
        ]
      },
      steps: [
        { codeLine: 3, msg: "Lista: [1] ➔ [2] ➔ [3]. prev = null, act = nodo(1).", nodes: [{ id: 1, val: 1, sig: 2 }, { id: 2, val: 2, sig: 3 }, { id: 3, val: 3, sig: null }], pointers: [{ name: "act", nodeId: 1 }] },
        { codeLine: 8, msg: "Invertimos flecha del nodo 1: ahora apunta a null. prev = 1, act = 2.", nodes: [{ id: 1, val: 1, sig: null }, { id: 2, val: 2, sig: 3 }, { id: 3, val: 3, sig: null }], pointers: [{ name: "prev", nodeId: 1 }, { name: "act", nodeId: 2 }] },
        { codeLine: 8, msg: "Invertimos flecha del nodo 2: ahora apunta a 1. prev = 2, act = 3.", nodes: [{ id: 2, val: 2, sig: 1 }, { id: 1, val: 1, sig: null }, { id: 3, val: 3, sig: null }], pointers: [{ name: "prev", nodeId: 2 }, { name: "act", nodeId: 3 }] },
        { codeLine: 8, msg: "Invertimos flecha del nodo 3: ahora apunta a 2. prev = 3, act = null.", nodes: [{ id: 3, val: 3, sig: 2 }, { id: 2, val: 2, sig: 1 }, { id: 1, val: 1, sig: null }], pointers: [{ name: "prev", nodeId: 3 }] },
        { codeLine: 13, msg: "Bucle finalizado. Retornamos 'prev' (nodo 3). Lista resultante: [3] ➔ [2] ➔ [1].", nodes: [{ id: 3, val: 3, sig: 2 }, { id: 2, val: 2, sig: 1 }, { id: 1, val: 1, sig: null }], pointers: [{ name: "nuevaCabeza", nodeId: 3 }] }
      ]
    }
  }
];
