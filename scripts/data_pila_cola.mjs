export const pilaColaExercises = [
  {
    id: "E01",
    cat: "pilas",
    catLabel: "Pilas (LIFO)",
    difficulty: "Básico Clave",
    title: "Copiar una Pila (Patrón de Doble Pasaje)",
    tag: "Clonación y Preservación",
    summary: "Clonar una Pila manteniendo el orden original exacto sin destruir la pila de entrada.",
    mision: "¿Cómo crear una copia idéntica de una PilaTDA sin perder los datos originales ni dejarlos invertidos? En un parcial o función utilitaria, las pilas pasadas por parámetro NO deben ser destruidas.",
    mentalClick: `💡 **El Click Mental:**
Una pila funciona como una pila de platos (LIFO: Último en entrar, Primero en salir).
* Si pasás los platos de **Pila A** a **Pila Auxiliar**, ¡el orden se invierte!
* Si ahora desapilás de **Auxiliar** y metés simultáneamente en **Copia** y en **Pila A**, ¡el orden se invierte por segunda vez, volviendo a su estado original!
\`\`\`text
Pila A: [10, 20, 30] ──(Paso 1: vaciar a aux)──> Aux: [30, 20, 10]
Aux: [30, 20, 10] ──(Paso 2: recargar)──> Pila A: [10, 20, 30]  Y  Copia: [10, 20, 30]
\`\`\``,
    examTrap: `⚠️ **Trampa de Parcial habitual:**
Muchos estudiantes olvidan la línea donde restauran la pila original: \`origen.Apilar(x)\`. Si devolvés la copia pero dejás \`origen\` vacía, el profesor te descuenta el 50% o más de los puntos por **efecto de lado destructivo**.`,
    bigO: `⏱️ **Costo Temporal y Espacial:**
* **Tiempo:** $O(n)$ — Recorremos los $n$ elementos exactamente dos veces (una para vaciar y otra para recargar).
* **Espacio Auxiliar:** $O(n)$ — Usamos una pila auxiliar temporal de tamaño proporcional a la entrada.`,
    code: `// Copia una PilaTDA preservando el orden y dejando la original intacta
public static PilaTDA copiarPila(PilaTDA origen) {
    PilaTDA aux = new PilaTF();
    aux.InicializarPila();
    PilaTDA copia = new PilaTF();
    copia.InicializarPila();

    // Paso 1: Volcar origen a aux (invierte el orden)
    while (!origen.PilaVacia()) {
        aux.Apilar(origen.Tope());
        origen.Desapilar();
    }

    // Paso 2: Volcar aux simultáneamente a copia y a origen (restaura orden)
    while (!aux.PilaVacia()) {
        int x = aux.Tope();
        copia.Apilar(x);
        origen.Apilar(x); // ¡Clave para no destruir la original!
        aux.Desapilar();
    }

    return copia;
}`,
    sim: {
      type: "stacks",
      initial: {
        s1: { label: "Origen", items: [10, 25, 40] },
        s2: { label: "Auxiliar", items: [] },
        s3: { label: "Copia", items: [] }
      },
      steps: [
        { codeLine: 8, msg: "Inicio: Pila Origen contiene [10, 25, 40]. Aux y Copia están vacías.", s1: [10, 25, 40], s2: [], s3: [] },
        { codeLine: 10, msg: "Desapilamos el 40 de Origen y lo apilamos en Aux.", s1: [10, 25], s2: [40], s3: [] },
        { codeLine: 10, msg: "Desapilamos el 25 de Origen y lo apilamos en Aux.", s1: [10], s2: [40, 25], s3: [] },
        { codeLine: 10, msg: "Desapilamos el 10 de Origen y lo apilamos en Aux. Origen quedó vacía e invertida en Aux.", s1: [], s2: [40, 25, 10], s3: [] },
        { codeLine: 17, msg: "Desapilamos el 10 de Aux: lo apilamos en Copia y en Origen.", s1: [10], s2: [40, 25], s3: [10] },
        { codeLine: 17, msg: "Desapilamos el 25 de Aux: lo apilamos en Copia y en Origen.", s1: [10, 25], s2: [40], s3: [10, 25] },
        { codeLine: 17, msg: "Desapilamos el 40 de Aux: lo apilamos en Copia y en Origen.", s1: [10, 25, 40], s2: [], s3: [10, 25, 40] },
        { codeLine: 22, msg: "¡Listo! Retornamos Copia. Observa cómo Origen y Copia quedaron idénticas.", s1: [10, 25, 40], s2: [], s3: [10, 25, 40] }
      ]
    }
  },
  {
    id: "E02",
    cat: "pilas",
    catLabel: "Pilas (LIFO)",
    difficulty: "Básico Clave",
    title: "Invertir una Pila (Usando una Cola Auxiliar)",
    tag: "Combinación Pila + Cola",
    summary: "Dar vuelta el orden de una Pila in-situ aprovechando la asimetría LIFO vs FIFO.",
    mision: "Modificar una PilaTDA de manera que el elemento que estaba en el fondo pase al tope, y el del tope al fondo.",
    mentalClick: `💡 **El Click Mental:**
* La **Pila** es LIFO (sale el último que entró).
* La **Cola** es FIFO (sale el primero que entró).
Si vaciás una Pila dentro de una Cola, los elementos entran en orden inverso. Como la Cola saca en el mismo orden en que entraron, al sacarlos de la Cola y volverlos a apilar en la Pila, ¡quedan exactamente invertidos!
\`\`\`text
Pila: [1, 2, 3] (Tope: 3) ──> Cola: primero entra 3, luego 2, luego 1 (Frente: 3)
Cola: saca 3, 2, 1 ──> Pila: [3, 2, 1] (Tope: 1)  ¡Invertida!
\`\`\``,
    examTrap: `⚠️ **Trampa de Parcial:**
Intentar invertir una Pila usando OTRA Pila auxiliar. Si pasás de Pila a Pila y de nuevo a Pila, ¡se invierte dos veces y vuelve a quedar en el orden original! Para invertir una Pila usando sólo Pilas necesitás **dos pilas auxiliares**.`,
    bigO: `⏱️ **Costo Temporal y Espacial:**
* **Tiempo:** $O(n)$ — Dos bucles lineales: vaciar a la cola y vaciar a la pila.
* **Espacio Auxiliar:** $O(n)$ — Memoria para almacenar los $n$ elementos en la cola auxiliar.`,
    code: `// Invierte el contenido de una Pila dada usando una Cola auxiliar
public static void invertirPila(PilaTDA p) {
    ColaTDA aux = new ColaPU();
    aux.InicializarCola();

    // Paso 1: De Pila a Cola (la cola almacena en orden de desapilado)
    while (!p.PilaVacia()) {
        aux.Acolar(p.Tope());
        p.Desapilar();
    }

    // Paso 2: De Cola a Pila (los elementos se apilan invertidos)
    while (!aux.ColaVacia()) {
        p.Apilar(aux.Primero());
        aux.Desacolar();
    }
}`,
    sim: {
      type: "stack_queue",
      initial: {
        s1: { label: "Pila P", type: "stack", items: [5, 15, 30] },
        s2: { label: "Cola Auxiliar", type: "queue", items: [] }
      },
      steps: [
        { codeLine: 7, msg: "Pila inicial: [5, 15, 30] (Tope es 30). Cola auxiliar vacía.", s1: [5, 15, 30], s2: [] },
        { codeLine: 8, msg: "Desapilamos el 30 y lo acolamos en la Cola.", s1: [5, 15], s2: [30] },
        { codeLine: 8, msg: "Desapilamos el 15 y lo acolamos en la Cola.", s1: [5], s2: [30, 15] },
        { codeLine: 8, msg: "Desapilamos el 5 y lo acolamos en la Cola. Pila queda vacía.", s1: [], s2: [30, 15, 5] },
        { codeLine: 14, msg: "Desacolamos el 30 (primero de la cola) y lo apilamos en Pila.", s1: [30], s2: [15, 5] },
        { codeLine: 14, msg: "Desacolamos el 15 y lo apilamos en Pila.", s1: [30, 15], s2: [5] },
        { codeLine: 14, msg: "Desacolamos el 5 y lo apilamos en Pila.", s1: [30, 15, 5], s2: [] },
        { codeLine: 18, msg: "¡Finalizado! El orden original [5, 15, 30] ahora es [30, 15, 5] (Tope es 5).", s1: [30, 15, 5], s2: [] }
      ]
    }
  },
  {
    id: "E03",
    cat: "pilas",
    catLabel: "Pilas (LIFO)",
    difficulty: "Básico",
    title: "Contar Elementos y Calcular Promedio sin Destruir",
    tag: "Recorrido e Invarianza",
    summary: "Calcular el promedio numérico de los elementos de una Pila restaurándola al estado original.",
    mision: "Obtener el promedio de todos los números dentro de una PilaTDA, manejando correctamente el caso borde de pila vacía y asegurando que la pila no sufra modificaciones.",
    mentalClick: `💡 **El Click Mental:**
Una Pila sólo permite ver el elemento del Tope. Para 'ver' los elementos que están abajo, estamos obligados a desapilar.
Por lo tanto, la estrategia estándar de lectura en Pilas es:
1. Desapilar hacia una pila auxiliar sumando los valores e incrementando un contador.
2. Una vez vacía la original, volver a pasar todos los elementos de la auxiliar a la original.`,
    examTrap: `⚠️ **Trampa de Parcial:**
División por cero si la pila está vacía ('cant == 0'). Siempre valida si 'p.PilaVacia()' al inicio antes de calcular '(double) suma / cant'.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Desapilar $n$ veces y re-apilar $n$ veces.
* **Espacio:** $O(n)$ — Pila auxiliar para preservar los datos.`,
    code: `public static double calcularPromedio(PilaTDA p) {
    if (p.PilaVacia()) return 0.0;

    PilaTDA aux = new PilaTF();
    aux.InicializarPila();

    int suma = 0;
    int cantidad = 0;

    // Recorrido acumulador
    while (!p.PilaVacia()) {
        int val = p.Tope();
        suma += val;
        cantidad++;
        aux.Apilar(val);
        p.Desapilar();
    }

    // Restauración inmaculada
    while (!aux.PilaVacia()) {
        p.Apilar(aux.Tope());
        aux.Desapilar();
    }

    return (double) suma / cantidad;
}`,
    sim: {
      type: "stacks",
      initial: {
        s1: { label: "Pila P", items: [10, 20, 30] },
        s2: { label: "Auxiliar", items: [] }
      },
      steps: [
        { codeLine: 11, msg: "Pila: [10, 20, 30]. Suma = 0, Cantidad = 0.", s1: [10, 20, 30], s2: [] },
        { codeLine: 13, msg: "Leemos Tope 30. Suma = 30, Cantidad = 1. Pasamos 30 a aux.", s1: [10, 20], s2: [30] },
        { codeLine: 13, msg: "Leemos Tope 20. Suma = 50, Cantidad = 2. Pasamos 20 a aux.", s1: [10], s2: [30, 20] },
        { codeLine: 13, msg: "Leemos Tope 10. Suma = 60, Cantidad = 3. Pasamos 10 a aux.", s1: [], s2: [30, 20, 10] },
        { codeLine: 20, msg: "Restauramos: 10 vuelve a P.", s1: [10], s2: [30, 20] },
        { codeLine: 20, msg: "Restauramos: 20 vuelve a P.", s1: [10, 20], s2: [30] },
        { codeLine: 20, msg: "Restauramos: 30 vuelve a P. Pila original intacta. Promedio = 60 / 3 = 20.0.", s1: [10, 20, 30], s2: [] }
      ]
    }
  },
  {
    id: "E04",
    cat: "pilas",
    catLabel: "Pilas (LIFO)",
    difficulty: "Intermedio",
    title: "Pila Capicúa / Palíndromo",
    tag: "Comparación Simétrica",
    summary: "Determinar si una Pila se lee igual de arriba hacia abajo que de abajo hacia arriba.",
    mision: "Escribir un método que retorne true si la secuencia de elementos en la Pila es simétrica (capicúa), preservando la pila de origen.",
    mentalClick: `💡 **El Click Mental:**
Una secuencia es capicúa si al invertirla queda idéntica a la original.
1. Sacamos una copia de la Pila original (usando nuestro patrón E01).
2. Creamos una versión invertida de la copia.
3. Desapilamos ambas en paralelo comparando sus topes. Si en algún momento difieren, no es capicúa.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Modificar la pila que te pasan como parámetro directamente. Si la invertís para comparar y no la volvés a dejar como estaba, rompés el contrato del método.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Clonar, invertir y comparar toman pasajes lineales.
* **Espacio:** $O(n)$ — Estructuras auxiliares para la copia.`,
    code: `public static boolean esCapicua(PilaTDA p) {
    PilaTDA copia = copiarPila(p);     // Mantiene p intacta
    PilaTDA invertida = new PilaTF();
    invertida.InicializarPila();

    // Invertimos la copia hacia 'invertida'
    PilaTDA aux = copiarPila(copia);
    while (!aux.PilaVacia()) {
        invertida.Apilar(aux.Tope());
        aux.Desapilar();
    }

    boolean capicua = true;
    while (!copia.PilaVacia() && capicua) {
        if (copia.Tope() != invertida.Tope()) {
            capicua = false;
        }
        copia.Desapilar();
        invertida.Desapilar();
    }

    return capicua;
}`,
    sim: {
      type: "stacks",
      initial: {
        s1: { label: "Pila [1, 2, 1]", items: [1, 2, 1] },
        s2: { label: "Invertida", items: [1, 2, 1] }
      },
      steps: [
        { codeLine: 12, msg: "Comparamos Tope de Copia (1) con Tope de Invertida (1): Coinciden.", s1: [1, 2, 1], s2: [1, 2, 1] },
        { codeLine: 16, msg: "Desapilamos ambos. Comparamos Topes (2 == 2): Coinciden.", s1: [1, 2], s2: [1, 2] },
        { codeLine: 16, msg: "Desapilamos ambos. Comparamos Topes (1 == 1): Coinciden.", s1: [1], s2: [1] },
        { codeLine: 20, msg: "Pilas vaciadas sin discrepancias: ¡Es Capicúa! Retorna true.", s1: [], s2: [] }
      ]
    }
  },
  {
    id: "E05",
    cat: "pilas",
    catLabel: "Pilas (LIFO)",
    difficulty: "Intermedio",
    title: "Eliminar Elemento X de una Pila",
    tag: "Filtrado Selectivo",
    summary: "Remover todas las apariciones de un valor X dentro de una Pila manteniendo el orden del resto.",
    mision: "Dada una PilaTDA p y un entero x, eliminar todas las ocurrencias de x dentro de p preservando el orden relativo de los demás elementos.",
    mentalClick: `💡 **El Click Mental:**
1. Desapilamos todos los elementos de \`p\` hacia una pila \`aux\`, pero **filtrando**: sólo apilamos en \`aux\` aquellos números que sean distintos de \`x\`.
2. Luego desapilamos \`aux\` y devolvemos todo a \`p\`.
¡El doble pasaje garantiza que el orden relativo de los elementos sobrevivientes no se invierta!`,
    examTrap: `⚠️ **Trampa de Parcial:**
Hacer un solo pasaje a una nueva pila: si haces un solo pasaje, los elementos quedan al revés. Siempre recordá: *2 pasajes = orden original*.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Dos recorridos completos.
* **Espacio:** $O(n)$ — Pila auxiliar.`,
    code: `public static void eliminarElemento(PilaTDA p, int x) {
    PilaTDA aux = new PilaTF();
    aux.InicializarPila();

    // Paso 1: Volcar a aux descartando los iguales a x
    while (!p.PilaVacia()) {
        int elem = p.Tope();
        if (elem != x) {
            aux.Apilar(elem);
        }
        p.Desapilar();
    }

    // Paso 2: Volcar de aux a p restaurando el orden
    while (!aux.PilaVacia()) {
        p.Apilar(aux.Tope());
        aux.Desapilar();
    }
}`,
    sim: {
      type: "stacks",
      initial: {
        s1: { label: "Pila P (X = 9)", items: [4, 9, 7, 9, 2] },
        s2: { label: "Auxiliar", items: [] }
      },
      steps: [
        { codeLine: 6, msg: "Pila inicial: [4, 9, 7, 9, 2] (Tope = 2). Buscamos eliminar X = 9.", s1: [4, 9, 7, 9, 2], s2: [] },
        { codeLine: 9, msg: "Tope 2 != 9: Lo apilamos en Aux.", s1: [4, 9, 7, 9], s2: [2] },
        { codeLine: 8, msg: "Tope 9 == 9: ¡Descartado! No se apila en Aux.", s1: [4, 9, 7], s2: [2] },
        { codeLine: 9, msg: "Tope 7 != 9: Lo apilamos en Aux.", s1: [4, 9], s2: [2, 7] },
        { codeLine: 8, msg: "Tope 9 == 9: ¡Descartado! No se apila en Aux.", s1: [4], s2: [2, 7] },
        { codeLine: 9, msg: "Tope 4 != 9: Lo apilamos en Aux.", s1: [], s2: [2, 7, 4] },
        { codeLine: 16, msg: "Recargamos de Aux a P: [4, 7, 2]. ¡El orden se mantuvo sin ningún 9!", s1: [4, 7, 2], s2: [] }
      ]
    }
  },
  {
    id: "E06",
    cat: "colas",
    catLabel: "Colas (FIFO)",
    difficulty: "Básico Clave",
    title: "Copiar una Cola (Preservación Sagrada)",
    tag: "Clonación y Preservación",
    summary: "Crear una réplica idéntica de una ColaTDA dejando la original exactamente intacta.",
    mision: "Clonar una ColaTDA sin perder el orden FIFO ni dejar la cola original vacía.",
    mentalClick: `💡 **El Click Mental:**
En una Cola (FIFO: Primero en entrar, primero en salir), los elementos salen en el mismo orden en que entraron.
A diferencia de la pila, **aquí no se invierten los datos al salir**.
Basta con desacolar de \`origen\`, encolar en \`copia\` y en una \`aux\`, y al final recargar \`aux\` en \`origen\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Intentar leer una cola con un bucle \`for\` o asumiendo que es un arreglo. En el rol de usuario de TDA, **está estrictamente prohibido acceder a arreglos internos**. Solo se usan \`Acolar\`, \`Desacolar\`, \`Primero\` y \`ColaVacia\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Desacolar $n$ elementos y restaurarlos.
* **Espacio:** $O(n)$ — Cola auxiliar.`,
    code: `public static ColaTDA copiarCola(ColaTDA origen) {
    ColaTDA copia = new ColaPU();
    copia.InicializarCola();
    ColaTDA aux = new ColaPU();
    aux.InicializarCola();

    // Desacolamos de origen cargando en copia y aux
    while (!origen.ColaVacia()) {
        int x = origen.Primero();
        copia.Acolar(x);
        aux.Acolar(x);
        origen.Desacolar();
    }

    // Restauramos origen desde aux
    while (!aux.ColaVacia()) {
        origen.Acolar(aux.Primero());
        aux.Desacolar();
    }

    return copia;
}`,
    sim: {
      type: "queue_queue",
      initial: {
        s1: { label: "Cola Origen", items: [10, 20, 30] },
        s2: { label: "Auxiliar", items: [] },
        s3: { label: "Copia", items: [] }
      },
      steps: [
        { codeLine: 8, msg: "Cola Origen: [10, 20, 30] (Primero: 10).", s1: [10, 20, 30], s2: [], s3: [] },
        { codeLine: 11, msg: "Desacolamos 10 y lo acolamos a Copia y Aux.", s1: [20, 30], s2: [10], s3: [10] },
        { codeLine: 11, msg: "Desacolamos 20 y lo acolamos a Copia y Aux.", s1: [30], s2: [10, 20], s3: [10, 20] },
        { codeLine: 11, msg: "Desacolamos 30 y lo acolamos a Copia y Aux. Origen vacía.", s1: [], s2: [10, 20, 30], s3: [10, 20, 30] },
        { codeLine: 18, msg: "Restauramos Origen vaciando Aux. Origen y Copia quedan listas e idénticas.", s1: [10, 20, 30], s2: [], s3: [10, 20, 30] }
      ]
    }
  },
  {
    id: "E07",
    cat: "colas",
    catLabel: "Colas (FIFO)",
    difficulty: "Básico Clave",
    title: "Invertir una Cola usando una Pila",
    tag: "Combinación Cola + Pila",
    summary: "Invertir el orden de una Cola aprovechando la naturaleza inversa de una Pila.",
    mision: "Invertir el orden de una ColaTDA in-situ de modo que el último elemento pase a ser el primero.",
    mentalClick: `💡 **El Click Mental:**
* La Cola saca en orden FIFO: 1, 2, 3.
* Si metés 1, 2, 3 en una Pila, el 3 queda en el Tope.
* Al desapilar, sale 3, luego 2, luego 1.
* Al acolarlos de vuelta en la Cola, ¡la cola quedó mágicamente invertida: [3, 2, 1]!`,
    examTrap: `⚠️ **Trampa de Parcial:**
Intentar invertir una Cola usando OTRA Cola. Como ambas son FIFO, los datos saldrían y entrarían en el mismo orden sin invertirse nunca. La inversión natural siempre requiere una **Pila**.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Vaciar la cola a la pila ($n$) y de la pila a la cola ($n$).
* **Espacio:** $O(n)$ — Pila auxiliar de $n$ elementos.`,
    code: `public static void invertirCola(ColaTDA c) {
    PilaTDA pila = new PilaTF();
    pila.InicializarPila();

    // Paso 1: Volcar toda la cola en la pila
    while (!c.ColaVacia()) {
        pila.Apilar(c.Primero());
        c.Desacolar();
    }

    // Paso 2: Volcar toda la pila en la cola (invierte el orden)
    while (!pila.PilaVacia()) {
        c.Acolar(pila.Tope());
        pila.Desapilar();
    }
}`,
    sim: {
      type: "stack_queue",
      initial: {
        s1: { label: "Cola C", type: "queue", items: [1, 2, 3] },
        s2: { label: "Pila Auxiliar", type: "stack", items: [] }
      },
      steps: [
        { codeLine: 6, msg: "Cola C: [1, 2, 3]. Primero es 1.", s1: [1, 2, 3], s2: [] },
        { codeLine: 7, msg: "Desacolamos 1 y lo apilamos.", s1: [2, 3], s2: [1] },
        { codeLine: 7, msg: "Desacolamos 2 y lo apilamos.", s1: [3], s2: [1, 2] },
        { codeLine: 7, msg: "Desacolamos 3 y lo apilamos. Tope de la pila es 3.", s1: [], s2: [1, 2, 3] },
        { codeLine: 13, msg: "Desapilamos el 3 y lo acolamos a C.", s1: [3], s2: [1, 2] },
        { codeLine: 13, msg: "Desapilamos el 2 y lo acolamos a C.", s1: [3, 2], s2: [1] },
        { codeLine: 13, msg: "Desapilamos el 1 y lo acolamos a C.", s1: [3, 2, 1], s2: [] },
        { codeLine: 16, msg: "¡Cola invertida! Original era [1, 2, 3], ahora es [3, 2, 1].", s1: [3, 2, 1], s2: [] }
      ]
    }
  },
  {
    id: "E08",
    cat: "colas",
    catLabel: "Colas (FIFO)",
    difficulty: "Combinado",
    title: "Intercalar dos Colas (Round-Robin / Turnos)",
    tag: "Algoritmo de Fusión",
    summary: "Generar una nueva Cola alternando 1 elemento de c1 y 1 de c2 sin alterar las originales.",
    mision: "Dadas dos colas de turnos de clientes o procesos de CPU, intercalarlas equitativamente: si una cola es más larga que la otra, continuar volcando los elementos sobrantes al final.",
    mentalClick: `💡 **El Click Mental:**
1. Clonamos \`c1\` y \`c2\` usando \`copiarCola\` para trabajar de forma no destructiva.
2. Mientras al menos una de las dos colas tenga elementos (\`!c1.ColaVacia() || !c2.ColaVacia()\`), si \`c1\` tiene elementos desacolamos uno, y si \`c2\` tiene elementos desacolamos uno.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Poner un \`&&\` en el while en vez de \`||\`. Si ponés \`&&\` y una cola tiene 2 elementos y la otra 100, el bucle se detiene en el elemento 2 y perdiste 98 elementos.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n + m)$ donde $n$ y $m$ son las longitudes de cada cola.
* **Espacio:** $O(n + m)$ para la nueva cola y copias.`,
    code: `public static ColaTDA intercalarColas(ColaTDA c1, ColaTDA c2) {
    ColaTDA cp1 = copiarCola(c1);
    ColaTDA cp2 = copiarCola(c2);
    ColaTDA res = new ColaPU();
    res.InicializarCola();

    while (!cp1.ColaVacia() || !cp2.ColaVacia()) {
        if (!cp1.ColaVacia()) {
            res.Acolar(cp1.Primero());
            cp1.Desacolar();
        }
        if (!cp2.ColaVacia()) {
            res.Acolar(cp2.Primero());
            cp2.Desacolar();
        }
    }

    return res;
}`,
    sim: {
      type: "queue_queue",
      initial: {
        s1: { label: "Cola 1", items: [1, 3] },
        s2: { label: "Cola 2", items: [2, 4, 6] },
        s3: { label: "Intercalada", items: [] }
      },
      steps: [
        { codeLine: 8, msg: "C1: [1, 3], C2: [2, 4, 6]. Empezamos a alternar turnos.", s1: [1, 3], s2: [2, 4, 6], s3: [] },
        { codeLine: 10, msg: "Turno C1: Acolamos 1 en resultado.", s1: [3], s2: [2, 4, 6], s3: [1] },
        { codeLine: 14, msg: "Turno C2: Acolamos 2 en resultado.", s1: [3], s2: [4, 6], s3: [1, 2] },
        { codeLine: 10, msg: "Turno C1: Acolamos 3 en resultado (C1 quedó vacía).", s1: [], s2: [4, 6], s3: [1, 2, 3] },
        { codeLine: 14, msg: "Turno C2: Acolamos 4 en resultado.", s1: [], s2: [6], s3: [1, 2, 3, 4] },
        { codeLine: 14, msg: "Turno C2: Acolamos 6 en resultado.", s1: [], s2: [], s3: [1, 2, 3, 4, 6] },
        { codeLine: 19, msg: "¡Finalizado! Resultado contiene [1, 2, 3, 4, 6].", s1: [], s2: [], s3: [1, 2, 3, 4, 6] }
      ]
    }
  },
  {
    id: "E09",
    cat: "colas",
    catLabel: "Colas (FIFO)",
    difficulty: "Intermedio",
    title: "Desensamblar Cola con Prioridad a Cola Común",
    tag: "Colas con Prioridad",
    summary: "Vaciar una ColaPrioridadTDA en una ColaTDA común ordenada de mayor a menor prioridad.",
    mision: "Transformar una ColaPrioridadTDA en una ColaTDA estándar con los elementos ordenados según su turno de atención.",
    mentalClick: `💡 **El Click Mental:**
Una \`ColaPrioridadTDA\` ya hace el trabajo pesado por dentro: cada vez que llamás a \`Primero()\`, siempre te entrega el elemento con el valor de prioridad más alto.
Por lo tanto, simplemente desacolamos sucesivamente hasta vaciarla y vamos acolando en una \`ColaTDA\` simple.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Confundir el método \`Primero()\` (el valor del elemento) con \`Prioridad()\` (el peso de prioridad). Para la cola común sólo nos interesa acolalar el valor: \`cSimple.Acolar(cp.Primero())\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ o $O(n^2)$ dependiendo de si la implementación interna de la cola con prioridad ordena al insertar o al sacar.
* **Espacio:** $O(n)$ para la nueva cola simple.`,
    code: `public static ColaTDA prioridadAColaSimple(ColaPrioridadTDA cp) {
    ColaTDA resultado = new ColaPU();
    resultado.InicializarCola();

    while (!cp.ColaVacia()) {
        int elemento = cp.Primero();
        resultado.Acolar(elemento);
        cp.Desacolar();
    }

    return resultado;
}`,
    sim: {
      type: "prio_queue",
      initial: {
        s1: { label: "Cola Prioridad (Val, Prio)", items: [{v: 10, p: 1}, {v: 50, p: 9}, {v: 25, p: 5}] },
        s2: { label: "Cola Simple Resultante", items: [] }
      },
      steps: [
        { codeLine: 5, msg: "Elemento con mayor prioridad es 50 (Prio 9).", s1: [{v: 50, p: 9}, {v: 25, p: 5}, {v: 10, p: 1}], s2: [] },
        { codeLine: 7, msg: "Desacolamos 50 y lo acolamos en la cola común.", s1: [{v: 25, p: 5}, {v: 10, p: 1}], s2: [50] },
        { codeLine: 7, msg: "Siguiente mayor prioridad es 25 (Prio 5). Desacolamos y acolamos.", s1: [{v: 10, p: 1}], s2: [50, 25] },
        { codeLine: 7, msg: "Último elemento es 10 (Prio 1). Desacolamos y acolamos.", s1: [], s2: [50, 25, 10] },
        { codeLine: 11, msg: "Cola simple resultante: [50, 25, 10] perfectamente ordenada.", s1: [], s2: [50, 25, 10] }
      ]
    }
  }
];
