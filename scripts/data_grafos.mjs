export const grafosExercises = [
  {
    id: "E28",
    cat: "grafos",
    catLabel: "Grafos Dirigidos",
    difficulty: "Básico Clave",
    title: "Grado de Entrada y Salida de un Vértice",
    tag: "Métricas de Grafos",
    summary: "Contar cuántas aristas apuntan hacia un vértice (in-degree) y cuántas salen de él (out-degree).",
    mision: "Dado un GrafoTDA y un vértice v, calcular su grado de entrada (aristas w ➔ v) y grado de salida (aristas v ➔ w) recorriendo el conjunto de vértices.",
    mentalClick: `💡 **El Click Mental:**
En un grafo dirigido con matriz o métodos de TDA:
* **Grado de Salida (Out-Degree):** ¿A cuántos vértices apunta $v$?
  Recorremos todos los vértices $w$: si \`g.ExisteArista(v, w)\`, sumamos 1.
* **Grado de Entrada (In-Degree):** ¿Cuántos vértices apuntan hacia $v$?
  Recorremos todos los vértices $w$: si \`g.ExisteArista(w, v)\`, sumamos 1.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Invertir los parámetros en \`ExisteArista(origen, destino)\`. En grafos dirigidos, \`ExisteArista(v, w)\` NO es lo mismo que \`ExisteArista(w, v)\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|V| \\cdot \\text{costo}(ExisteArista))$ — Recorre los $|V|$ vértices.
* **Espacio:** $O(|V|)$ para clonar el conjunto de vértices.`,
    code: `public static int gradoSalida(GrafoTDA g, int v) {
    int salida = 0;
    ConjuntoTDA vertices = copiarConjunto(g.Vertices());

    while (!vertices.ConjuntoVacio()) {
        int w = vertices.Elegir();
        if (g.ExisteArista(v, w)) {
            salida++;
        }
        vertices.Sacar(w);
    }
    return salida;
}

public static int gradoEntrada(GrafoTDA g, int v) {
    int entrada = 0;
    ConjuntoTDA vertices = copiarConjunto(g.Vertices());

    while (!vertices.ConjuntoVacio()) {
        int w = vertices.Elegir();
        if (g.ExisteArista(w, v)) { // ¡Nota el orden invertido!
            entrada++;
        }
        vertices.Sacar(w);
    }
    return entrada;
}`,
    sim: {
      type: "graph",
      initial: {
        vertices: [1, 2, 3, 4],
        edges: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 4, to: 1 }
        ],
        targetNode: 1
      },
      steps: [
        { codeLine: 5, msg: "Analizamos Vértice 1: tiene aristas dirigidas salientes hacia 2 y 3. Grado Salida = 2.", activeEdge: { from: 1, to: 2 } },
        { codeLine: 8, msg: "Arista saliente 1 ➔ 3 confirmada.", activeEdge: { from: 1, to: 3 } },
        { codeLine: 18, msg: "Analizamos aristas entrantes: Vértice 4 apunta hacia 1 (4 ➔ 1). Grado Entrada = 1.", activeEdge: { from: 4, to: 1 } },
        { codeLine: 24, msg: "Resultado Vértice 1: Entrada = 1, Salida = 2.", activeNode: 1 }
      ]
    }
  },
  {
    id: "E29",
    cat: "grafos",
    catLabel: "Grafos Dirigidos",
    difficulty: "Parcial Clave",
    title: "Detección de Sumidero Universal y Fuente",
    tag: "Vértices Especiales",
    summary: "Identificar si un vértice es un sumidero universal (todos van hacia él, pero él no va a nadie).",
    mision: "Determinar si existe un 'Sumidero Universal' en un GrafoTDA: un vértice al que todos los demás vértices apuntan directamente (grado de entrada = |V| - 1) y del cual no sale ninguna arista (grado de salida = 0).",
    mentalClick: `💡 **El Click Mental:**
Un sumidero universal es como un agujero negro:
* Todo entra hacia él: $InDegree(v) == |V| - 1$ (todos los demás nodos apuntan a $v$, sin contar auto-bucles).
* Nada sale de él: $OutDegree(v) == 0$.
Basta con iterar cada vértice, calcular sus dos grados, y verificar si cumple ambas condiciones.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Olvidar restar 1 al total de vértices al comparar el grado de entrada. Un vértice no puede tener arista hacia sí mismo en la definición estándar de sumidero, por lo que el grado de entrada debe ser $|V|-1$, no $|V|$.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|V|^2)$ al auditar los grados de cada vértice.
* **Espacio:** $O(|V|)$ para almacenar copias de conjuntos.`,
    code: `public static int buscarSumideroUniversal(GrafoTDA g) {
    ConjuntoTDA vertices = copiarConjunto(g.Vertices());
    int totalVertices = contarElementosConjunto(vertices);

    while (!vertices.ConjuntoVacio()) {
        int v = vertices.Elegir();

        int salida = gradoSalida(g, v);
        int entrada = gradoEntrada(g, v);

        // Condición matemática de Sumidero Universal:
        if (salida == 0 && entrada == (totalVertices - 1)) {
            return v; // ¡Encontrado!
        }

        vertices.Sacar(v);
    }

    return -1; // No existe sumidero en este grafo
}`,
    sim: {
      type: "graph",
      initial: {
        vertices: [1, 2, 3],
        edges: [
          { from: 1, to: 3 },
          { from: 2, to: 3 }
        ],
        targetNode: 3
      },
      steps: [
        { codeLine: 8, msg: "Total vértices = 3. Requisito para sumidero: Salida == 0 y Entrada == 2.", activeNode: null },
        { codeLine: 10, msg: "Vértice 1: Salida = 1, Entrada = 0 ➔ No es sumidero.", activeNode: 1 },
        { codeLine: 10, msg: "Vértice 2: Salida = 1, Entrada = 0 ➔ No es sumidero.", activeNode: 2 },
        { codeLine: 14, msg: "Vértice 3: Salida = 0 y Entrada = 2 (|V|-1). ¡Es el Sumidero Universal!", activeNode: 3 }
      ]
    }
  },
  {
    id: "E30",
    cat: "grafos",
    catLabel: "Grafos Dirigidos",
    difficulty: "Parcial Clave",
    title: "¿Existe Camino entre Vértice A y Vértice B? (BFS con Visitados)",
    tag: "Recorrido y Búsqueda en Grafos",
    summary: "El algoritmo rey de parciales: determinar si existe camino entre dos nodos evitando ciclos infinitos.",
    mision: "Dado un GrafoTDA, un vértice origen y un destino, retornar true si es posible alcanzar destino navegando por las aristas dirigidas.",
    mentalClick: `💡 **El Click Mental:**
¿Por qué en árboles no usamos 'visitados' pero en grafos SÍ es obligatorio?
* Los árboles no tienen ciclos (nunca puedes volver a un nodo anterior).
* ¡Los grafos SÍ tienen ciclos ($A \\to B \\to C \\to A$)! Sin un registro de **visitados**, caerías en un bucle infinito que colgaría tu computadora.
Usamos el algoritmo BFS (Búsqueda en Anchura):
1. Una \`ColaTDA pendientes\` con los vértices por explorar.
2. Un \`ConjuntoTDA visitados\` para recordar dónde ya estuvimos.
3. Desacolamos un vértice: si es el destino, ¡retornamos \`true\`! Si no, revisamos todos sus vecinos: los que no hayan sido visitados se agregan a \`visitados\` y a \`pendientes\`.`,
    examTrap: `⚠️ **Trampa de Parcial mortal:**
No marcar el vértice como visitado en el momento exacto en que se encola. Si demoras el marcado, un mismo vértice puede ser encolado múltiples veces produciendo redundancia y loops.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|V| + |E|)$ — Visita cada vértice y arista a lo sumo una vez.
* **Espacio:** $O(|V|)$ para la cola de exploración y el conjunto de visitados.`,
    code: `public static boolean existeCamino(GrafoTDA g, int origen, int destino) {
    if (origen == destino) return true;

    ColaTDA cola = new ColaPU();
    cola.InicializarCola();

    ConjuntoTDA visitados = new ConjuntoTA();
    visitados.InicializarConjunto();

    // Arrancamos desde el origen
    cola.Acolar(origen);
    visitados.Agregar(origen);

    while (!cola.ColaVacia()) {
        int actual = cola.Primero();
        cola.Desacolar();

        if (actual == destino) {
            return true; // ¡Camino encontrado con éxito!
        }

        // Explorar todos los vecinos adyacentes de 'actual'
        ConjuntoTDA vertices = copiarConjunto(g.Vertices());
        while (!vertices.ConjuntoVacio()) {
            int vecino = vertices.Elegir();
            if (g.ExisteArista(actual, vecino) && !visitados.Pertenece(vecino)) {
                visitados.Agregar(vecino);
                cola.Acolar(vecino);
            }
            vertices.Sacar(vecino);
        }
    }

    return false; // Se agotaron los caminos posibles
}`,
    sim: {
      type: "graph",
      initial: {
        vertices: [1, 2, 3, 4],
        edges: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 3, to: 1 } // Ciclo intencional 3 ➔ 1
        ],
        targetNode: 4
      },
      steps: [
        { codeLine: 12, msg: "Iniciamos BFS en Origen 1. Visitados = {1}. Cola = [1]. Destino = 4.", activeNode: 1, visited: [1] },
        { codeLine: 16, msg: "Desacolamos 1. Vecino adyacente es 2. No visitado ➔ Agregamos 2 a visitados y cola.", activeNode: 2, visited: [1, 2], activeEdge: { from: 1, to: 2 } },
        { codeLine: 16, msg: "Desacolamos 2. Vecino adyacente es 3. Agregamos 3 a visitados y cola.", activeNode: 3, visited: [1, 2, 3], activeEdge: { from: 2, to: 3 } },
        { codeLine: 26, msg: "Desacolamos 3. Tiene arista a 1 (ciclo), pero como 1 YA está en visitados, se ignora. Arista a 4 es nueva ➔ Encolamos 4.", activeNode: 4, visited: [1, 2, 3, 4], activeEdge: { from: 3, to: 4 } },
        { codeLine: 19, msg: "Desacolamos 4: ¡actual == destino! Retorna true. Camino encontrado sin quedar atrapado en ciclos.", activeNode: 4, visited: [1, 2, 3, 4] }
      ]
    }
  },
  {
    id: "E31",
    cat: "grafos",
    catLabel: "Grafos Dirigidos",
    difficulty: "Intermedio",
    title: "Detección de Vértices Aislados",
    tag: "Auditoría de Grafos",
    summary: "Identificar todos los vértices desconectados que no tienen ninguna arista entrante ni saliente.",
    mision: "Dado un GrafoTDA, devolver un ConjuntoTDA con todos los vértices aislados (grado de entrada == 0 y grado de salida == 0).",
    mentalClick: `💡 **El Click Mental:**
Un vértice está 'aislado' si vive en una isla desierta:
* Nadie puede llegar a él ($InDegree == 0$).
* Él no puede llegar a nadie ($OutDegree == 0$).
Iteramos todos los vértices del grafo: a los que cumplan ambas condiciones simultáneas, los agregamos al conjunto resultado.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Confundir 'aislado' con 'fuente' (solo salen aristas) o 'sumidero' (solo entran aristas). Para ser aislado, **ambos grados deben ser estrictamente cero**.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|V|^2)$ por verificar aristas con todos los demás vértices.
* **Espacio:** $O(|V|)$ para el conjunto resultado.`,
    code: `public static ConjuntoTDA verticesAislados(GrafoTDA g) {
    ConjuntoTDA aislados = new ConjuntoTA();
    aislados.InicializarConjunto();

    ConjuntoTDA vertices = copiarConjunto(g.Vertices());
    while (!vertices.ConjuntoVacio()) {
        int v = vertices.Elegir();

        if (gradoEntrada(g, v) == 0 && gradoSalida(g, v) == 0) {
            aislados.Agregar(v);
        }

        vertices.Sacar(v);
    }

    return aislados;
}`,
    sim: {
      type: "graph",
      initial: {
        vertices: [1, 2, 3, 5],
        edges: [
          { from: 1, to: 2 },
          { from: 2, to: 3 }
        ],
        targetNode: 5
      },
      steps: [
        { codeLine: 7, msg: "Evaluamos Vértices 1, 2, 3: tienen aristas activas ➔ No están aislados.", activeNode: null },
        { codeLine: 10, msg: "Evaluamos Vértice 5: Entrada = 0, Salida = 0. ¡Está completamente aislado!", activeNode: 5 },
        { codeLine: 17, msg: "Conjunto de aislados final: {5}.", activeNode: 5 }
      ]
    }
  }
];
