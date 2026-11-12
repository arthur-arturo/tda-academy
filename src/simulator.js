/* ============================================================================
   Simulador Paso a Paso de Algoritmos TDA y Nodos
   ============================================================================ */

const SIMULATIONS = {
  invertirCola: {
    title: "Invertir una Cola usando Pila Auxiliar",
    code: [
      "public static void InvertirCola(ColaTDA c) {",
      "    PilaTDA p = new PilaLD();",
      "    p.InicializarPila();",
      "    while (!c.ColaVacia()) {",
      "        p.Apilar(c.Primero());",
      "        c.Desacolar();",
      "    }",
      "    while (!p.PilaVacia()) {",
      "        c.Acolar(p.Tope());",
      "        p.Desapilar();",
      "    }",
      "}"
    ],
    buildSteps: () => [
      { line: 0, l1: "Cola C (FIFO)", t1: "queue", d1: [10, 20, 30], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [], exp: "Estado inicial: la Cola C tiene [10, 20, 30]. El frente (primero) es 10." },
      { line: 2, l1: "Cola C (FIFO)", t1: "queue", d1: [10, 20, 30], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [], exp: "Inicializamos la Pila auxiliar 'p'. ¿Por qué una Pila? Porque su naturaleza LIFO invierte automáticamente el orden de salida." },
      { line: 4, l1: "Cola C (FIFO)", t1: "queue", d1: [20, 30], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10], exp: "c.Primero() es 10. Lo apilamos en 'p' (queda en el fondo) y desacolamos de 'c'." },
      { line: 4, l1: "Cola C (FIFO)", t1: "queue", d1: [30], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10, 20], exp: "c.Primero() es 20. Lo apilamos encima del 10 y desacolamos." },
      { line: 4, l1: "Cola C (FIFO)", t1: "queue", d1: [], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10, 20, 30], exp: "c.Primero() es 30. Pasa al tope de 'p'. Ahora la Cola C quedó vacía." },
      { line: 7, l1: "Cola C (FIFO)", t1: "queue", d1: [], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10, 20, 30], exp: "Fin del primer while. Observa la magia: el último en entrar a la cola (30) ahora está arriba en la pila." },
      { line: 8, l1: "Cola C (FIFO)", t1: "queue", d1: [30], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10, 20], exp: "Segundo while: p.Tope() es 30. Lo acolamos en 'c' (entra primero) y desapilamos." },
      { line: 8, l1: "Cola C (FIFO)", t1: "queue", d1: [30, 20], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [10], exp: "p.Tope() es 20. Lo acolamos detrás del 30 y desapilamos." },
      { line: 8, l1: "Cola C (FIFO)", t1: "queue", d1: [30, 20, 10], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [], exp: "p.Tope() es 10. Entra al final de la cola y la pila queda vacía." },
      { line: 11, l1: "Cola C (FIFO)", t1: "queue", d1: [30, 20, 10], l2: "Pila P (Aux LIFO)", t2: "stack", d2: [], exp: "¡Listo! Costo Temporal: O(n) (dos ciclos secuenciales de n pasos). Costo Espacial: 1 estructura auxiliar." }
    ]
  },

  copiarPila: {
    title: "Copiar Pila preservando el original (Doble Inversión)",
    code: [
      "public static PilaTDA CopiarPila(PilaTDA origen) {",
      "    PilaTDA aux = new PilaLD(); aux.InicializarPila();",
      "    PilaTDA copia = new PilaLD(); copia.InicializarPila();",
      "    while (!origen.PilaVacia()) {",
      "        aux.Apilar(origen.Tope());",
      "        origen.Desapilar();",
      "    }",
      "    while (!aux.PilaVacia()) {",
      "        int x = aux.Tope();",
      "        origen.Apilar(x);",
      "        copia.Apilar(x);",
      "        aux.Desapilar();",
      "    }",
      "    return copia;",
      "}"
    ],
    buildSteps: () => [
      { line: 0, l1: "origen", t1: "stack", d1: [1, 2, 3], l2: "aux", t2: "stack", d2: [], l3: "copia", t3: "stack", d3: [], exp: "Inicio: origen tiene [1, 2, 3] (tope: 3). ¡Cuidado! No podemos hacer 'copia = origen' porque en Java es copia de referencia." },
      { line: 4, l1: "origen", t1: "stack", d1: [1, 2], l2: "aux", t2: "stack", d2: [3], l3: "copia", t3: "stack", d3: [], exp: "Pasamos el tope (3) de origen a aux. Nota cómo el que estaba arriba ahora queda en el fondo." },
      { line: 4, l1: "origen", t1: "stack", d1: [1], l2: "aux", t2: "stack", d2: [3, 2], l3: "copia", t3: "stack", d3: [], exp: "Pasamos 2 de origen a aux." },
      { line: 4, l1: "origen", t1: "stack", d1: [], l2: "aux", t2: "stack", d2: [3, 2, 1], l3: "copia", t3: "stack", d3: [], exp: "Pasamos 1. Ahora aux tiene [3, 2, 1] (tope: 1). La estructura quedó invertida en aux." },
      { line: 8, l1: "origen", t1: "stack", d1: [1], l2: "aux", t2: "stack", d2: [3, 2], l3: "copia", t3: "stack", d3: [1], exp: "Segundo while: sacamos 1 de aux y lo apilamos TANTO en origen como en copia. ¡Al invertir por 2da vez, recuperamos el orden original!" },
      { line: 8, l1: "origen", t1: "stack", d1: [1, 2], l2: "aux", t2: "stack", d2: [3], l3: "copia", t3: "stack", d3: [1, 2], exp: "Sacamos 2 de aux y lo apilamos en origen y copia." },
      { line: 8, l1: "origen", t1: "stack", d1: [1, 2, 3], l2: "aux", t2: "stack", d2: [], l3: "copia", t3: "stack", d3: [1, 2, 3], exp: "Sacamos 3 de aux. ¡Misión cumplida! 'origen' volvió intacta a [1, 2, 3] y 'copia' es un clon independiente." }
    ]
  },

  eliminarRepetidos: {
    title: "Parcial Real: Eliminar repetidos de Pila conservando orden",
    code: [
      "public static void EliminarRepetidos(PilaTDA p) {",
      "    PilaTDA aux = new PilaLD(); aux.InicializarPila();",
      "    ConjuntoTDA vistos = new ConjuntoLD(); vistos.InicializarConjunto();",
      "    while (!p.PilaVacia()) { aux.Apilar(p.Tope()); p.Desapilar(); }",
      "    while (!aux.PilaVacia()) {",
      "        int x = aux.Tope();",
      "        if (!vistos.Pertenece(x)) {",
      "            vistos.Agregar(x);",
      "            p.Apilar(x);",
      "        }",
      "        aux.Desapilar();",
      "    }",
      "}"
    ],
    buildSteps: () => [
      { line: 0, l1: "Pila p", t1: "stack", d1: [5, 3, 5, 8], l2: "Pila aux", t2: "stack", d2: [], l3: "Conjunto vistos", t3: "set", d3: [], exp: "Consigna del Recuperatorio (1/7/2026): Dejar una sola aparición conservando la PRIMERA que ingresó (el fondo es lo primero que entró: 5, luego 3, luego 5, luego 8)." },
      { line: 3, l1: "Pila p", t1: "stack", d1: [], l2: "Pila aux", t2: "stack", d2: [8, 5, 3, 5], l3: "Conjunto vistos", t3: "set", d3: [], exp: "Paso clave: Si leemos 'p' directo de arriba a abajo, ¡veríamos primero el 8 y el segundo 5! Por eso primero volcamos todo a 'aux'. Ahora el elemento más antiguo (5) está en el tope de 'aux'." },
      { line: 6, l1: "Pila p", t1: "stack", d1: [5], l2: "Pila aux", t2: "stack", d2: [8, 5, 3], l3: "Conjunto vistos", t3: "set", d3: [5], exp: "Tope de aux = 5. ¿Pertenece a vistos? No. Lo agregamos a vistos y lo apilamos en 'p'." },
      { line: 6, l1: "Pila p", t1: "stack", d1: [5, 3], l2: "Pila aux", t2: "stack", d2: [8, 5], l3: "Conjunto vistos", t3: "set", d3: [5, 3], exp: "Tope de aux = 3. No está en vistos. Se agrega a vistos y se apila en 'p'." },
      { line: 6, l1: "Pila p", t1: "stack", d1: [5, 3], l2: "Pila aux", t2: "stack", d2: [8], l3: "Conjunto vistos", t3: "set", d3: [5, 3], exp: "Tope de aux = 5. ¡YA Pertenece a vistos! Se ignora y solo se desapila de aux." },
      { line: 6, l1: "Pila p", t1: "stack", d1: [5, 3, 8], l2: "Pila aux", t2: "stack", d2: [], l3: "Conjunto vistos", t3: "set", d3: [5, 3, 8], exp: "Tope de aux = 8. No está en vistos. Pasa a vistos y se apila en 'p'. Resultado final en p: [5, 3, 8] en orden exacto." }
    ]
  },

  palindromo: {
    title: "Verificar si una Cola es Palíndromo (Preservando original)",
    code: [
      "public static boolean EsPalindromo(ColaTDA c) {",
      "    ColaTDA copia = new ColaLD(); copia.InicializarCola();",
      "    PilaTDA inv = new PilaLD(); inv.InicializarPila();",
      "    ColaTDA aux = new ColaLD(); aux.InicializarCola();",
      "    while (!c.ColaVacia()) {",
      "        int x = c.Primero();",
      "        copia.Acolar(x); inv.Apilar(x); aux.Acolar(x);",
      "        c.Desacolar();",
      "    }",
      "    while (!aux.ColaVacia()) { c.Acolar(aux.Primero()); aux.Desacolar(); }",
      "    boolean ok = true;",
      "    while (!copia.ColaVacia() && ok) {",
      "        if (copia.Primero() != inv.Tope()) ok = false;",
      "        copia.Desacolar(); inv.Desapilar();",
      "    }",
      "    return ok;",
      "}"
    ],
    buildSteps: () => [
      { line: 0, l1: "Cola c (Original)", t1: "queue", d1: [1, 2, 1], l2: "Pila inv", t2: "stack", d2: [], l3: "Cola copia", t3: "queue", d3: [], exp: "Queremos saber si [1, 2, 1] es capicúa sin destruir 'c'." },
      { line: 6, l1: "Cola c (Original)", t1: "queue", d1: [], l2: "Pila inv", t2: "stack", d2: [1, 2, 1], l3: "Cola copia", t3: "queue", d3: [1, 2, 1], exp: "Vaciamos 'c' repartiendo cada elemento a 'copia' (orden normal), 'inv' (se invertirá al salir) y 'aux' (para restaurar 'c')." },
      { line: 9, l1: "Cola c (Restaurada)", t1: "queue", d1: [1, 2, 1], l2: "Pila inv", t2: "stack", d2: [1, 2, 1], l3: "Cola copia", t3: "queue", d3: [1, 2, 1], exp: "Restauramos 'c' desde 'aux'. Ahora 'c' ya está segura e idéntica al inicio." },
      { line: 12, l1: "Cola c (Restaurada)", t1: "queue", d1: [1, 2, 1], l2: "Pila inv (tope=1)", t2: "stack", d2: [1, 2], l3: "Cola copia (1ro=1)", t3: "queue", d3: [2, 1], exp: "Comparamos copia.Primero() (1) == inv.Tope() (1). ¡Coinciden! Avanzamos ambos." },
      { line: 12, l1: "Cola c (Restaurada)", t1: "queue", d1: [1, 2, 1], l2: "Pila inv (tope=2)", t2: "stack", d2: [1], l3: "Cola copia (1ro=2)", t3: "queue", d3: [1], exp: "Comparamos copia.Primero() (2) == inv.Tope() (2). ¡Coinciden! Avanzamos ambos." },
      { line: 12, l1: "Cola c (Restaurada)", t1: "queue", d1: [1, 2, 1], l2: "Pila inv (vacía)", t2: "stack", d2: [], l3: "Cola copia (vacía)", t3: "queue", d3: [], exp: "Comparamos 1 == 1. Termina el bucle con ok = true. Devuelve true y 'c' sigue intacta." }
    ]
  }
};
