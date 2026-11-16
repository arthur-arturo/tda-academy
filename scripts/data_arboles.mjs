export const arbolesExercises = [
  {
    id: "E22",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Básico Clave",
    title: "Contar Nodos Totales (La Plantilla Sagrada de Recursión)",
    tag: "Recursión Base",
    summary: "El arquetipo fundamental de recursión pura: Caso Base + Izquierda + Derecha.",
    mision: "Calcular la cantidad total de nodos en un ABBTDA usando recursión limpia sin variables globales ni bucles.",
    mentalClick: `💡 **El Click Mental:**
Un árbol binario se define de forma recursiva (un nodo con dos subárboles que también son árboles).
Por lo tanto, **todo algoritmo de árbol se piensa en 2 pasos**:
1. **Caso Base (¿Cuándo frenar?):** Si el árbol está vacío (\`a.ArbolVacio()\`), tiene **0** nodos.
2. **Paso Recursivo (¿Cómo combinar?):** El total de nodos es:
   \`1 (el nodo actual) + contar(HijoIzquierdo) + contar(HijoDerecho)\``,
    examTrap: `⚠️ **Trampa de Parcial habitual:**
Intentar usar variables \`static\` fuera de la función o bucles \`while\`. Los docentes de Algoritmos exigen que los métodos de árboles sean **funciones recursivas puras** que retornen el cálculo en la propia llamada.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Visita exactamente una vez cada nodo del árbol.
* **Espacio (Stack de llamada):** $O(h)$ donde $h$ es la altura del árbol ($O(\\log n)$ si está balanceado, $O(n)$ si degenera en lista).`,
    code: `public static int contarNodos(ABBTDA a) {
    // Caso Base: Árbol vacío no tiene nodos
    if (a.ArbolVacio()) {
        return 0;
    }

    // Paso Recursivo: La raíz actual (1) + hijos izquierdo y derecho
    return 1 + contarNodos(a.HijoIzq()) + contarNodos(a.HijoDer());
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 20,
          left: { val: 10, left: null, right: null },
          right: { val: 30, left: null, right: null }
        }
      },
      steps: [
        { codeLine: 3, msg: "Evaluamos Raíz (20): no está vacío. Hacemos 1 + contar(10) + contar(30).", activeNode: 20 },
        { codeLine: 3, msg: "Bajamos a Hijo Izquierdo (10): no vacío. Hijos son vacíos (0 + 0). Retorna 1.", activeNode: 10 },
        { codeLine: 3, msg: "Bajamos a Hijo Derecho (30): no vacío. Hijos son vacíos (0 + 0). Retorna 1.", activeNode: 30 },
        { codeLine: 8, msg: "Suma final en raíz 20: 1 + 1 (izq) + 1 (der) = 3 nodos en total.", activeNode: 20 }
      ]
    }
  },
  {
    id: "E23",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Intermedio Clave",
    title: "Altura / Profundidad Máxima del Árbol",
    tag: "Métricas de Árboles",
    summary: "Calcular la longitud del camino más largo desde la raíz hasta la hoja más profunda.",
    mision: "Dado un ABBTDA, calcular su altura (altura de árbol vacío = 0, árbol con solo raíz = 1).",
    mentalClick: `💡 **El Click Mental:**
La altura de un árbol depende de cuál de sus dos ramas llegó más profundo:
* Si el árbol está vacío $\\implies$ altura 0.
* Si tiene al menos la raíz, su altura será:
  \`1 + Math.max(altura(HijoIzq), altura(HijoDer))\``,
    examTrap: `⚠️ **Trampa de Parcial:**
Llamar a \`altura(a.HijoIzq())\` dos veces en vez de usar \`Math.max\` o guardar el resultado en variables. Si llamas a la recursión múltiples veces para la misma rama, conviertes un algoritmo lineal $O(n)$ en un algoritmo exponencial $O(2^n)$ inaceptable.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Recorrido completo de todos los nodos.
* **Espacio:** $O(h)$ en la pila de recursión.`,
    code: `public static int altura(ABBTDA a) {
    if (a.ArbolVacio()) {
        return 0;
    }

    int altIzq = altura(a.HijoIzq());
    int altDer = altura(a.HijoDer());

    return 1 + Math.max(altIzq, altDer);
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 50,
          left: {
            val: 25,
            left: { val: 10, left: null, right: null },
            right: null
          },
          right: { val: 75, left: null, right: null }
        }
      },
      steps: [
        { codeLine: 2, msg: "Calculamos altura desde Raíz 50.", activeNode: 50 },
        { codeLine: 6, msg: "Rama izquierda baja a 25 y luego a 10. Altura del nodo 10 = 1.", activeNode: 10 },
        { codeLine: 6, msg: "Rama izquierda en nodo 25: 1 + max(1, 0) = 2.", activeNode: 25 },
        { codeLine: 7, msg: "Rama derecha en nodo 75: hoja simple = 1.", activeNode: 75 },
        { codeLine: 9, msg: "Raíz 50: 1 + max(altIzq: 2, altDer: 1) = 3 niveles de altura.", activeNode: 50 }
      ]
    }
  },
  {
    id: "E24",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Intermedio",
    title: "Contar Hojas (Nodos sin Descendencia)",
    tag: "Nodos Especiales",
    summary: "Contar cuántos nodos terminales (hojas) tiene un árbol binario.",
    mision: "Un nodo es 'hoja' si no tiene hijos (tanto su hijo izquierdo como derecho están vacíos). Retornar la cantidad total de hojas.",
    mentalClick: `💡 **El Click Mental:**
Tenemos **tres escenarios**:
1. Árbol vacío $\\implies$ 0 hojas.
2. Nodo Hoja (\`HijoIzq.ArbolVacio() && HijoDer.ArbolVacio()\`) $\\implies$ **¡1 hoja encontrada!** (retorna 1).
3. Nodo Interno (tiene al menos un hijo) $\\implies$ él mismo no es hoja, pero sus hijos pueden tenerlas: \`contarHojas(izq) + contarHojas(der)\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Olvidar el caso de nodo interno con un solo hijo. Si no verificas explícitamente la condición de hoja y sumas 1 en la raíz, contarás nodos intermedios por error.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Visita cada nodo para clasificarlo.
* **Espacio:** $O(h)$ en memoria de stack.`,
    code: `public static int contarHojas(ABBTDA a) {
    if (a.ArbolVacio()) {
        return 0;
    }

    // Condición sagrada de Nodo Hoja:
    if (a.HijoIzq().ArbolVacio() && a.HijoDer().ArbolVacio()) {
        return 1;
    }

    // Si no es hoja, sumamos las hojas de ambos lados
    return contarHojas(a.HijoIzq()) + contarHojas(a.HijoDer());
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 40,
          left: { val: 20, left: null, right: null },
          right: {
            val: 60,
            left: { val: 50, left: null, right: null },
            right: { val: 70, left: null, right: null }
          }
        }
      },
      steps: [
        { codeLine: 2, msg: "Raíz 40 tiene hijos ➔ No es hoja. Busca en ramas.", activeNode: 40 },
        { codeLine: 7, msg: "Nodo 20 no tiene hijos ➔ ¡Es Hoja! Retorna 1.", activeNode: 20 },
        { codeLine: 2, msg: "Nodo 60 tiene hijos ➔ No es hoja. Desciende a 50 y 70.", activeNode: 60 },
        { codeLine: 7, msg: "Nodos 50 y 70 son hojas ➔ Aportan 1 + 1 = 2.", activeNode: 50 },
        { codeLine: 12, msg: "Total de hojas: 1 (de nodo 20) + 2 (de nodos 50 y 70) = 3 hojas.", activeNode: 40 }
      ]
    }
  },
  {
    id: "E25",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Básico Clave",
    title: "Búsqueda Guiada en ABB (O(log n))",
    tag: "Búsqueda Eficiente",
    summary: "Aprovechar la propiedad de orden del ABB para buscar en tiempo logarítmico descartando mitades.",
    mision: "Determinar si un elemento x pertenece al ABB sin recorrer el árbol entero.",
    mentalClick: `💡 **El Click Mental:**
La magia del **ABB (Árbol Binario de Búsqueda)** es su regla sagrada:
* Todos los menores a la raíz están a la **Izquierda**.
* Todos los mayores a la raíz están a la **Derecha**.
Por lo tanto:
* Si $x == a.Raiz()$ $\\implies$ ¡Lo encontramos! (\`true\`).
* Si $x < a.Raiz()$ $\\implies$ **Sólo puede estar en la izquierda**. ¡Descartamos la mitad derecha del árbol!
* Si $x > a.Raiz()$ $\\implies$ **Sólo puede estar en la derecha**.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Buscar en ambos hijos como si fuera un árbol binario común (\`buscar(izq) || buscar(der)\`). Si haces eso, el profesor te califica mal porque desaprovechaste la propiedad fundamental del ABB convirtiendo una búsqueda $O(\\log n)$ en $O(n)$.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(\\log n)$ en árboles balanceados (divide y vencerás), $O(n)$ en el peor caso degenerado.
* **Espacio:** $O(h)$ por las llamadas recursivas.`,
    code: `public static boolean perteneceABB(ABBTDA a, int x) {
    if (a.ArbolVacio()) {
        return false; // Llegamos a una rama vacía: no está
    }

    if (a.Raiz() == x) {
        return true;  // ¡Encontrado!
    }

    // Navegación inteligente guiada por la clave
    if (x < a.Raiz()) {
        return perteneceABB(a.HijoIzq(), x);
    } else {
        return perteneceABB(a.HijoDer(), x);
    }
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 50,
          left: { val: 30, left: { val: 20, left: null, right: null }, right: { val: 40, left: null, right: null } },
          right: { val: 70, left: null, right: { val: 80, left: null, right: null } }
        }
      },
      steps: [
        { codeLine: 6, msg: "Buscamos X = 40. Raíz actual: 50. 40 < 50 ➔ Descartamos toda la rama derecha [70, 80]. Vamos a la izquierda.", activeNode: 50 },
        { codeLine: 11, msg: "Raíz actual: 30. 40 > 30 ➔ Descartamos rama izquierda [20]. Vamos a la derecha.", activeNode: 30 },
        { codeLine: 6, msg: "Raíz actual: 40. 40 == 40 ➔ ¡Encontrado! Retornamos true.", activeNode: 40 }
      ]
    }
  },
  {
    id: "E26",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Parcial Clave",
    title: "Sumar Nodos en el Nivel K",
    tag: "Nivelación y Parámetros",
    summary: "Sumar únicamente los nodos que se encuentran exactamente a distancia K de la raíz.",
    mision: "Dado un árbol y un entero k >= 0 (donde la raíz está en k = 0), sumar todos los nodos en ese nivel decreciendo el contador k.",
    mentalClick: `💡 **El Click Mental:**
¿Cómo sabe la recursión en qué nivel estamos sin variables globales?
¡Con el truco de la **cuenta regresiva**!
* En la raíz empezamos con $k$.
* Al descender a un hijo, estamos a un paso menos del objetivo: pasamos **$k - 1$**.
* Cuando **$k == 0$**, ¡significa que llegamos exactamente al nivel deseado! Retornamos el valor de esa raíz.
* Si el árbol queda vacío antes de llegar a $k == 0$, retornamos 0.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Continuar la recursión hacia abajo cuando $k == 0$. Una vez alcanzado $k == 0$, **no debes descender a los hijos**, solo retornar \`a.Raiz()\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ en el peor caso si debe bajar por todo el árbol.
* **Espacio:** $O(k)$ memoria en el stack.`,
    code: `public static int sumarNivelK(ABBTDA a, int k) {
    if (a.ArbolVacio()) {
        return 0;
    }

    // Caso objetivo: llegamos al nivel K
    if (k == 0) {
        return a.Raiz();
    }

    // Cuenta regresiva: k - 1 en cada hijo
    return sumarNivelK(a.HijoIzq(), k - 1) + sumarNivelK(a.HijoDer(), k - 1);
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 100,
          left: { val: 50, left: { val: 20, left: null, right: null }, right: { val: 80, left: null, right: null } },
          right: { val: 150, left: null, right: { val: 200, left: null, right: null } }
        }
      },
      steps: [
        { codeLine: 2, msg: "Queremos sumar en Nivel K = 2. Raíz 100 está en k = 2.", activeNode: 100 },
        { codeLine: 12, msg: "Descendemos a nodos 50 y 150 con k = 1.", activeNode: 50 },
        { codeLine: 7, msg: "Descendemos a nodos [20, 80, 200] con k = 0 ➔ ¡Objetivo alcanzado! Aportan sus raíces.", activeNode: 20 },
        { codeLine: 12, msg: "Suma final de nivel 2: 20 + 80 + 200 = 300.", activeNode: 100 }
      ]
    }
  },
  {
    id: "E27",
    cat: "arboles",
    catLabel: "Árboles Binarios (ABB)",
    difficulty: "Básico Clave",
    title: "Los 3 Recorridos Sagrados: In-Order, Pre-Order y Post-Order",
    tag: "Recorridos Clásicos",
    summary: "Comprender la diferencia crucial entre In-Order (ordenado), Pre-Order (copia) y Post-Order (liberación).",
    mision: "Generar una ColaTDA con los elementos del árbol visitados según el recorrido In-Order (Izquierda ➔ Raíz ➔ Derecha).",
    mentalClick: `💡 **El Click Mental:**
La posición de la **Raíz** en el código le da el nombre al recorrido:
* **In-Order (En-medio):** Izquierda ➔ **Raíz** ➔ Derecha.
  * *Poder secreto:* ¡En un ABB siempre entrega los números **ordenados de menor a mayor**!
* **Pre-Order (Antes):** **Raíz** ➔ Izquierda ➔ Derecha.
  * *Poder secreto:* Ideal para clonar árboles o guardarlos en archivo respetando la jerarquía.
* **Post-Order (Después):** Izquierda ➔ Derecha ➔ **Raíz**.
  * *Poder secreto:* Ideal para eliminar árboles o calcular tamaños de abajo hacia arriba.`,
    examTrap: `⚠️ **Trampa de Parcial:**
En un ejercicio donde piden 'listar los elementos ordenados', muchos hacen un algoritmo de ordenamiento complejo (como Burbujeo o Quicksort). Si tienes un ABB, **un simple recorrido In-Order ya te da todo ordenado en tiempo $O(n)$**.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n)$ — Visita exactamente una vez cada nodo.
* **Espacio:** $O(n)$ para la cola resultante.`,
    code: `public static void inOrder(ABBTDA a, ColaTDA resultado) {
    if (a.ArbolVacio()) {
        return;
    }

    // 1. Visitar subárbol izquierdo (menores)
    inOrder(a.HijoIzq(), resultado);

    // 2. Visitar raíz (centro)
    resultado.Acolar(a.Raiz());

    // 3. Visitar subárbol derecho (mayores)
    inOrder(a.HijoDer(), resultado);
}`,
    sim: {
      type: "tree",
      initial: {
        tree: {
          val: 50,
          left: { val: 20, left: null, right: null },
          right: { val: 80, left: null, right: null }
        }
      },
      steps: [
        { codeLine: 7, msg: "In-Order: Primero visitamos izquierda profunda (nodo 20).", activeNode: 20 },
        { codeLine: 10, msg: "Acolamos 20 en la cola. Cola: [20].", activeNode: 20 },
        { codeLine: 10, msg: "Subimos a la raíz 50. Acolamos 50. Cola: [20, 50].", activeNode: 50 },
        { codeLine: 13, msg: "Visitamos derecha (nodo 80). Acolamos 80. Cola: [20, 50, 80].", activeNode: 80 },
        { codeLine: 14, msg: "¡Finalizado! Los datos quedaron perfectamente ordenados: [20, 50, 80].", activeNode: 50 }
      ]
    }
  }
];
