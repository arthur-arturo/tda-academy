/* ============================================================================
   Arena de Práctica de Código (Global + Integrada por Módulo) & Teoría UADE
   ============================================================================ */

/* Retos de programación en Java UADE integrados dentro de cada módulo (00 a 06) */
const INLINE_EXERCISES = {
  pasarPilaPreservando: {
    title: "Pasar Pila Preservando",
    tag: "Java UADE · Referencias y PilaTDA",
    fnName: "PasarPila",
    desc: "Implementa <code>PasarPila(PilaTDA origen, PilaTDA destino)</code> para copiar todos los elementos de <code>origen</code> dentro de <code>destino</code> manteniendo el mismo orden (tope con tope) y <strong>dejando <code>origen</code> intacta</strong>.",
    starter: `public static void PasarPila(PilaTDA origen, PilaTDA destino) {
    // Recuerda inicializar tu pila auxiliar y restaurar 'origen'
    
}`,
    hint: "Vuelca 'origen' en una pila 'aux'. Luego desapila 'aux' y apila cada elemento tanto en 'origen' (restaurándola) como en 'destino'.",
    solution: `public static void PasarPila(PilaTDA origen, PilaTDA destino) {
    PilaTDA aux = new PilaLD();
    aux.InicializarPila();
    while (!origen.PilaVacia()) {
        aux.Apilar(origen.Tope());
        origen.Desapilar();
    }
    while (!aux.PilaVacia()) {
        int x = aux.Tope();
        origen.Apilar(x);
        destino.Apilar(x);
        aux.Desapilar();
    }
}`,
    tests: [
      { type: "pila_pasar_preserve", origen: [1, 2, 3], expected: [1, 2, 3], desc: "Origen [1,2,3] -> destino [1,2,3] y origen preservado" },
      { type: "pila_pasar_preserve", origen: [], expected: [], desc: "Pila origen vacía" }
    ]
  },

  sumarPila: {
    title: "1. Sumar Pila",
    tag: "Java UADE · PilaTDA",
    fnName: "SumarElementos",
    desc: "Devuelve la suma de todos los enteros contenidos en la pila <code>p</code> sin modificar ni destruir <code>p</code>.",
    starter: `public static int SumarElementos(PilaTDA p) {
    
}`,
    hint: "Usa una PilaTDA auxiliar para acumular los topes mientras desapilas y luego vuelve a apilar todo en 'p'.",
    solution: `public static int SumarElementos(PilaTDA p) {
    PilaTDA aux = new PilaLD();
    aux.InicializarPila();
    int suma = 0;
    while (!p.PilaVacia()) {
        suma += p.Tope();
        aux.Apilar(p.Tope());
        p.Desapilar();
    }
    while (!aux.PilaVacia()) {
        p.Apilar(aux.Tope());
        aux.Desapilar();
    }
    return suma;
}`,
    tests: [
      { type: "pila_int_preserve", input: [10, 20, 30], expected: 60, desc: "Pila [10,20,30] -> suma 60 y queda intacta" },
      { type: "pila_int_preserve", input: [], expected: 0, desc: "Pila vacía -> 0" }
    ]
  },

  inlinePila: {
    title: "2. Contar Pares",
    tag: "Java UADE · PilaTDA",
    fnName: "ContarPares",
    desc: "Escribe <code>ContarPares(PilaTDA p)</code> para devolver cuántos números pares contiene <code>p</code> <strong>sin destruir ni alterar</strong> la pila original.",
    starter: `public static int ContarPares(PilaTDA p) {
    
}`,
    hint: "Usa una PilaTDA auxiliar para guardar los elementos mientras los cuentas (x % 2 == 0), y luego regrésalos a 'p'.",
    solution: `public static int ContarPares(PilaTDA p) {
    PilaTDA aux = new PilaLD();
    aux.InicializarPila();
    int cant = 0;
    while (!p.PilaVacia()) {
        if (p.Tope() % 2 == 0) cant++;
        aux.Apilar(p.Tope());
        p.Desapilar();
    }
    while (!aux.PilaVacia()) {
        p.Apilar(aux.Tope());
        aux.Desapilar();
    }
    return cant;
}`,
    tests: [
      { type: "pila_int_preserve", input: [1, 2, 4, 5, 8], expected: 3, desc: "Pila [1,2,4,5,8] tiene 3 pares (y queda intacta)" },
      { type: "pila_int_preserve", input: [1, 3, 5], expected: 0, desc: "Pila [1,3,5] tiene 0 pares" },
      { type: "pila_int_preserve", input: [], expected: 0, desc: "Pila vacía -> 0" }
    ]
  },

  eliminarPila: {
    title: "3. Eliminar Valor X",
    tag: "Java UADE · Parcial PilaTDA",
    fnName: "EliminarValorPila",
    desc: "Elimina todas las ocurrencias del entero <code>x</code> dentro de la pila <code>p</code>, manteniendo intacto el orden relativo de los demás elementos.",
    starter: `public static void EliminarValorPila(PilaTDA p, int x) {
    
}`,
    hint: "Pasa de 'p' hacia una pila 'aux' filtrando los elementos que sean distintos de 'x' (o pasa todo y filtra al regresar para conservar orden).",
    solution: `public static void EliminarValorPila(PilaTDA p, int x) {
    PilaTDA aux = new PilaLD();
    aux.InicializarPila();
    while (!p.PilaVacia()) {
        if (p.Tope() != x) {
            aux.Apilar(p.Tope());
        }
        p.Desapilar();
    }
    while (!aux.PilaVacia()) {
        p.Apilar(aux.Tope());
        aux.Desapilar();
    }
}`,
    tests: [
      { type: "pila_elim_x", input: [1, 5, 2, 5, 3], x: 5, expected: [1, 2, 3], desc: "Eliminar 5 de [1,5,2,5,3] -> [1,2,3]" },
      { type: "pila_elim_x", input: [4, 4, 4], x: 4, expected: [], desc: "Eliminar todos si coinciden -> []" }
    ]
  },

  inlineCola: {
    title: "1. Invertir Cola",
    tag: "Java UADE · ColaTDA + PilaTDA",
    fnName: "InvertirCola",
    desc: "Invierte en el lugar el orden de todos los elementos de la cola <code>c</code> utilizando únicamente una <code>PilaTDA</code> auxiliar.",
    starter: `public static void InvertirCola(ColaTDA c) {
    
}`,
    hint: "Desacola todos los elementos de 'c' apilándolos en una PilaTDA auxiliar, y luego desapila devolviéndolos a 'c'.",
    solution: `public static void InvertirCola(ColaTDA c) {
    PilaTDA p = new PilaLD();
    p.InicializarPila();
    while (!c.ColaVacia()) {
        p.Apilar(c.Primero());
        c.Desacolar();
    }
    while (!p.PilaVacia()) {
        c.Acolar(p.Tope());
        p.Desapilar();
    }
}`,
    tests: [
      { type: "cola_mod", input: [1, 2, 3, 4], expected: [4, 3, 2, 1], desc: "Invertir [1,2,3,4] -> [4,3,2,1]" },
      { type: "cola_mod", input: [9], expected: [9], desc: "1 solo elemento" }
    ]
  },

  filtrarPrioridad: {
    title: "2. Filtrar Prioridad >= Min",
    tag: "Java UADE · ColaPrioridadTDA",
    fnName: "FiltrarPorPrioridad",
    desc: "Devuelve una nueva <code>ColaTDA</code> con los valores de <code>cp</code> cuya prioridad sea <code>&gt;= minPrio</code> (en orden saliente) y <strong>sin destruir <code>cp</code></strong>.",
    starter: `public static ColaTDA FiltrarPorPrioridad(ColaPrioridadTDA cp, int minPrio) {
    
}`,
    hint: "Recorre 'cp' guardando (valor, prioridad) en una ColaPrioridadTDA auxiliar para restaurarla al final. Si prioridad >= minPrio, acola el valor en la cola resultado.",
    solution: `public static ColaTDA FiltrarPorPrioridad(ColaPrioridadTDA cp, int minPrio) {
    ColaTDA res = new ColaLD();
    res.InicializarCola();
    ColaPrioridadTDA aux = new ColaPrioridadLD();
    aux.InicializarCola();
    while (!cp.ColaVacia()) {
        int v = cp.Primero();
        int pr = cp.Prioridad();
        if (pr >= minPrio) {
            res.Acolar(v);
        }
        aux.AcolarPrioridad(v, pr);
        cp.Desacolar();
    }
    while (!aux.ColaVacia()) {
        cp.AcolarPrioridad(aux.Primero(), aux.Prioridad());
        aux.Desacolar();
    }
    return res;
}`,
    tests: [
      { type: "cp_filter_preserve", entries: [[10, 1], [20, 5], [30, 3], [40, 8]], minPrio: 4, expected: [40, 20], desc: "Prioridad >= 4 devuelve [40, 20] y preserva cp" },
      { type: "cp_filter_preserve", entries: [[10, 2], [20, 1]], minPrio: 5, expected: [], desc: "Ninguno cumple -> cola vacía" }
    ]
  },

  contarMayoresLista: {
    title: "1. Contar Mayores en Nodos",
    tag: "Java UADE · Punteros (Nodo)",
    fnName: "ContarMayoresLista",
    desc: "Dada la referencia al primer nodo <code>Nodo origen</code> de una lista enlazada (campos <code>info</code> y <code>sig</code>), cuenta cuántos nodos tienen <code>info &gt; x</code> sin alterar los punteros.",
    starter: `public static int ContarMayoresLista(Nodo origen, int x) {
    
}`,
    hint: "Usa un puntero viajero: Nodo aux = origen; while (aux != null) { if (aux.info > x) ...; aux = aux.sig; }",
    solution: `public static int ContarMayoresLista(Nodo origen, int x) {
    Nodo aux = origen;
    int cant = 0;
    while (aux != null) {
        if (aux.info > x) cant++;
        aux = aux.sig;
    }
    return cant;
}`,
    tests: [
      { type: "nodo_int", list: [4, 10, 2, 15, 8], x: 7, expected: 3, desc: "Lista [4,10,2,15,8] con x=7 -> 3 mayores (10, 15, 8)" },
      { type: "nodo_int", list: [], x: 5, expected: 0, desc: "Lista vacía (null) -> 0" }
    ]
  },

  eliminarLista: {
    title: "2. Eliminar Ocurrencias (Circunvalar)",
    tag: "Java UADE · Clase 05.1 Nodos",
    fnName: "EliminarValorLista",
    desc: "Elimina <strong>todas</strong> las ocurrencias de <code>x</code> en una lista enlazada (contemplando que estén al inicio o consecutivas) y devuelve el nuevo nodo cabeza <code>Nodo</code>.",
    starter: `public static Nodo EliminarValorLista(Nodo origen, int x) {
    
}`,
    hint: "1) Mientras origen != null && origen.info == x, avanza origen = origen.sig. 2) Luego con Nodo aux = origen, mientras aux != null && aux.sig != null: si aux.sig.info == x salta (aux.sig = aux.sig.sig), else avanza aux.",
    solution: `public static Nodo EliminarValorLista(Nodo origen, int x) {
    while (origen != null && origen.info == x) {
        origen = origen.sig;
    }
    if (origen != null) {
        Nodo aux = origen;
        while (aux.sig != null) {
            if (aux.sig.info == x) {
                aux.sig = aux.sig.sig;
            } else {
                aux = aux.sig;
            }
        }
    }
    return origen;
}`,
    tests: [
      { type: "nodo_list_elim", list: [5, 5, 2, 5, 8, 5], x: 5, expected: [2, 8], desc: "Eliminar 5 al inicio, medio y fin: [5,5,2,5,8,5] -> [2,8]" },
      { type: "nodo_list_elim", list: [3, 3], x: 3, expected: [], desc: "Eliminar todos -> null ([])" },
      { type: "nodo_list_elim", list: [], x: 1, expected: [], desc: "Lista vacía -> null" }
    ]
  },

  inlineConjDic: {
    title: "1. Máximo por Clave",
    tag: "Java UADE · DiccionarioMultipleTDA",
    fnName: "ValorMaximoClave",
    desc: "Implementa <code>ValorMaximoClave(DiccionarioMultipleTDA dm, int k)</code> para devolver el mayor valor asociado a la clave <code>k</code> (o <code>-1</code> si el conjunto devuelto está vacío).",
    starter: `public static int ValorMaximoClave(DiccionarioMultipleTDA dm, int k) {
    
}`,
    hint: "Recupera el conjunto con dm.Recuperar(k). Si está vacío devuelve -1; si no, toma max = vals.Elegir() y recórrelo con Sacar().",
    solution: `public static int ValorMaximoClave(DiccionarioMultipleTDA dm, int k) {
    ConjuntoTDA vals = dm.Recuperar(k);
    if (vals.ConjuntoVacio()) return -1;
    int max = vals.Elegir();
    vals.Sacar(max);
    while (!vals.ConjuntoVacio()) {
        int v = vals.Elegir();
        if (v > max) max = v;
        vals.Sacar(v);
    }
    return max;
}`,
    tests: [
      { type: "dm_max", entries: [[1, [4, 8, 2]], [3, [10, 5]]], key: 1, expected: 8, desc: "Máximo de clave 1 en {4,8,2} -> 8" },
      { type: "dm_max", entries: [[1, [4, 8, 2]], [3, [10, 5]]], key: 3, expected: 10, desc: "Máximo de clave 3 en {10,5} -> 10" }
    ]
  },

  clavesComunes: {
    title: "2. Claves Comunes (Intersección)",
    tag: "Java UADE · DiccionarioSimpleTDA",
    fnName: "ClavesComunes",
    desc: "Recibe dos <code>DiccionarioSimpleTDA</code> <code>d1</code> y <code>d2</code> y devuelve un <code>ConjuntoTDA</code> con todas las claves presentes en ambos diccionarios.",
    starter: `public static ConjuntoTDA ClavesComunes(DiccionarioSimpleTDA d1, DiccionarioSimpleTDA d2) {
    
}`,
    hint: "Extrae ConjuntoTDA c1 = d1.Claves() y ConjuntoTDA c2 = d2.Claves(). Recorre c1: si c2.Pertenece(k), agrega k al conjunto resultado.",
    solution: `public static ConjuntoTDA ClavesComunes(DiccionarioSimpleTDA d1, DiccionarioSimpleTDA d2) {
    ConjuntoTDA res = new ConjuntoA();
    res.InicializarConjunto();
    ConjuntoTDA c1 = d1.Claves();
    ConjuntoTDA c2 = d2.Claves();
    while (!c1.ConjuntoVacio()) {
        int k = c1.Elegir();
        if (c2.Pertenece(k)) {
            res.Agregar(k);
        }
        c1.Sacar(k);
    }
    return res;
}`,
    tests: [
      { type: "dic_pair_set", e1: [[1,10],[2,20],[3,30]], e2: [[2,99],[3,88],[4,77]], expected: [2, 3], desc: "Claves comunes entre {1,2,3} y {2,3,4} -> {2, 3}" },
      { type: "dic_pair_set", e1: [[1,10]], e2: [[2,20]], expected: [], desc: "Disjuntos -> {}" }
    ]
  },

  inlineABB: {
    title: "1. Sumar Hojas",
    tag: "Java UADE · ABBTDA Recursivo",
    fnName: "SumarHojas",
    desc: "Implementa recursivamente <code>SumarHojas(ABBTDA a)</code> para devolver la suma de todos los nodos hoja (nodos sin hijos izquierdo ni derecho).",
    starter: `public static int SumarHojas(ABBTDA a) {
    
}`,
    hint: "Caso base 1: Si a.ArbolVacio() devuelve 0. Caso base 2 (Hoja): si HijoIzq().ArbolVacio() && HijoDer().ArbolVacio() devuelve a.Raiz(). Caso recursivo: suma ambas ramas.",
    solution: `public static int SumarHojas(ABBTDA a) {
    if (a.ArbolVacio()) return 0;
    if (a.HijoIzq().ArbolVacio() && a.HijoDer().ArbolVacio()) {
        return a.Raiz();
    }
    return SumarHojas(a.HijoIzq()) + SumarHojas(a.HijoDer());
}`,
    tests: [
      { type: "abb_int", elems: [10, 5, 15, 3, 7, 20], expected: 30, desc: "Árbol [10,5,15,3,7,20]: hojas 3+7+20 = 30" },
      { type: "abb_int", elems: [8], expected: 8, desc: "Solo raíz [8] (es hoja) -> 8" },
      { type: "abb_int", elems: [], expected: 0, desc: "Árbol vacío -> 0" }
    ]
  },

  contarParesABB: {
    title: "2. Contar Pares ABB",
    tag: "Java UADE · ABBTDA Recursivo",
    fnName: "ContarParesABB",
    desc: "Cuenta recursivamente cuántos elementos pares contiene el <code>ABBTDA a</code>.",
    starter: `public static int ContarParesABB(ABBTDA a) {
    
}`,
    hint: "Si a.ArbolVacio() devuelve 0. Evalúa si a.Raiz() % 2 == 0 suma 1 (o 0), más ContarParesABB(a.HijoIzq()) + ContarParesABB(a.HijoDer()).",
    solution: `public static int ContarParesABB(ABBTDA a) {
    if (a.ArbolVacio()) return 0;
    int esPar = (a.Raiz() % 2 == 0) ? 1 : 0;
    return esPar + ContarParesABB(a.HijoIzq()) + ContarParesABB(a.HijoDer());
}`,
    tests: [
      { type: "abb_int", elems: [10, 5, 16, 4, 7, 20], expected: 4, desc: "[10,5,16,4,7,20] tiene 4 pares (10,16,4,20)" },
      { type: "abb_int", elems: [], expected: 0, desc: "Árbol vacío -> 0" }
    ]
  },

  existeABB: {
    title: "3. Buscar Elemento O(log n)",
    tag: "Java UADE · Invariante ABB",
    fnName: "ExisteEnABB",
    desc: "Devuelve <code>true</code> si <code>x</code> existe dentro de <code>a</code> aprovechando la propiedad ABB (bajando únicamente por la rama izquierda o derecha según corresponda).",
    starter: `public static boolean ExisteEnABB(ABBTDA a, int x) {
    
}`,
    hint: "Si a.ArbolVacio() retorna false. Si a.Raiz() == x retorna true. Si x < a.Raiz() busca en HijoIzq(); si no, en HijoDer().",
    solution: `public static boolean ExisteEnABB(ABBTDA a, int x) {
    if (a.ArbolVacio()) return false;
    if (a.Raiz() == x) return true;
    if (x < a.Raiz()) return ExisteEnABB(a.HijoIzq(), x);
    return ExisteEnABB(a.HijoDer(), x);
}`,
    tests: [
      { type: "abb_exists", elems: [40, 20, 60, 10, 30], x: 30, expected: true, desc: "Buscar 30 en [40,20,60,10,30] -> true" },
      { type: "abb_exists", elems: [40, 20, 60], x: 99, expected: false, desc: "Buscar 99 inexistente -> false" }
    ]
  },

  inlineGrafo: {
    title: "1. Grado de Salida",
    tag: "Java UADE · GrafoTDA",
    fnName: "GradoSalida",
    desc: "Implementa <code>GradoSalida(GrafoTDA g, int v)</code> usando <code>g.Vertices()</code> y <code>g.ExisteArista</code> para contar cuántas aristas salen desde <code>v</code>.",
    starter: `public static int GradoSalida(GrafoTDA g, int v) {
    
}`,
    hint: "Recorre todos los vértices 'w' usando g.Vertices() y verifica g.ExisteArista(v, w). Cuenta cuántas veces es true.",
    solution: `public static int GradoSalida(GrafoTDA g, int v) {
    ConjuntoTDA verts = g.Vertices();
    int grado = 0;
    while (!verts.ConjuntoVacio()) {
        int w = verts.Elegir();
        if (g.ExisteArista(v, w)) grado++;
        verts.Sacar(w);
    }
    return grado;
}`,
    tests: [
      { type: "grafo_grado", vertices: [1, 2, 3, 4], aristas: [[1,2,5],[1,3,2],[2,4,1]], v: 1, expected: 2, desc: "Vértice 1 tiene 2 aristas salientes (1->2, 1->3)" },
      { type: "grafo_grado", vertices: [1, 2, 3, 4], aristas: [[1,2,5],[1,3,2],[2,4,1]], v: 4, expected: 0, desc: "Vértice 4 no tiene aristas salientes -> 0" }
    ]
  },

  mayorPesoSaliente: {
    title: "2. Mayor Peso Saliente",
    tag: "Java UADE · GrafoTDA Ponderado",
    fnName: "MayorPesoSaliente",
    desc: "Devuelve el peso máximo entre todas las aristas que salen desde el vértice <code>v</code> en el grafo <code>g</code> (o <code>-1</code> si no tiene aristas salientes).",
    starter: `public static int MayorPesoSaliente(GrafoTDA g, int v) {
    
}`,
    hint: "Inicializa int max = -1. Para cada vértice w en g.Vertices(), si g.ExisteArista(v, w), compara g.PesoArista(v, w) contra max.",
    solution: `public static int MayorPesoSaliente(GrafoTDA g, int v) {
    ConjuntoTDA verts = g.Vertices();
    int max = -1;
    while (!verts.ConjuntoVacio()) {
        int w = verts.Elegir();
        if (g.ExisteArista(v, w)) {
            int p = g.PesoArista(v, w);
            if (p > max) max = p;
        }
        verts.Sacar(w);
    }
    return max;
}`,
    tests: [
      { type: "grafo_grado", vertices: [1, 2, 3, 4], aristas: [[1,2,5],[1,3,12],[1,4,3]], v: 1, expected: 12, desc: "Aristas desde 1 con pesos 5, 12, 3 -> mayor peso 12" },
      { type: "grafo_grado", vertices: [1, 2], aristas: [[1,2,5]], v: 2, expected: -1, desc: "Sin aristas salientes desde 2 -> -1" }
    ]
  },

  verticesPuente: {
    title: "3. Vértices Puente (2do Parcial)",
    tag: "Java UADE · Parcial GrafoTDA",
    fnName: "VerticesPuente",
    desc: "Clásico de examen: dados dos vértices <code>v1</code> y <code>v2</code>, devuelve un <code>ConjuntoTDA</code> con todos los vértices puente <code>p</code> tales que existen las aristas <code>v1 → p</code> y <code>p → v2</code>.",
    starter: `public static ConjuntoTDA VerticesPuente(GrafoTDA g, int v1, int v2) {
    
}`,
    hint: "Para cada vértice 'p' de g.Vertices(), pregunta si g.ExisteArista(v1, p) && g.ExisteArista(p, v2). Si cumple, agrégalo al conjunto resultado.",
    solution: `public static ConjuntoTDA VerticesPuente(GrafoTDA g, int v1, int v2) {
    ConjuntoTDA puentes = new ConjuntoA();
    puentes.InicializarConjunto();
    ConjuntoTDA verts = g.Vertices();
    while (!verts.ConjuntoVacio()) {
        int p = verts.Elegir();
        if (g.ExisteArista(v1, p) && g.ExisteArista(p, v2)) {
            puentes.Agregar(p);
        }
        verts.Sacar(p);
    }
    return puentes;
}`,
    tests: [
      { type: "grafo_puente_set", vertices: [1, 2, 3, 4, 5], aristas: [[1,2,1],[2,5,1],[1,3,1],[3,5,1],[1,4,1]], v1: 1, v2: 5, expected: [2, 3], desc: "Puentes entre 1 y 5: {2, 3}" },
      { type: "grafo_puente_set", vertices: [1, 2, 3], aristas: [[1,2,1]], v1: 1, v2: 3, expected: [], desc: "Sin puentes entre 1 y 3 -> {}" }
    ]
  }
};

/* Ejercicios completos de la Arena Final (Java UADE auténtico para examen en computadora) */
const EXERCISES = {
  invertirCola: {
    title: "1. [1er Parcial] Invertir Cola con Pila Auxiliar",
    level: "1er Parcial · Inicial",
    desc: "Escribe un método <code>InvertirCola(ColaTDA c)</code> que modifique la <code>ColaTDA c</code> recibida invirtiendo el orden de sus elementos usando una <code>PilaTDA</code> auxiliar.",
    hint: "Desacola todo de 'c' apilando en 'p'. Luego desapila todo de 'p' acolando de vuelta en 'c'.",
    starter: `public static void InvertirCola(ColaTDA c) {
    
}`,
    solution: INLINE_EXERCISES.inlineCola.solution,
    tests: [
      { type: "cola_mod", input: [10, 20, 30], expected: [30, 20, 10], desc: "Invertir [10, 20, 30]" },
      { type: "cola_mod", input: [7, 4, 1, 9], expected: [9, 1, 4, 7], desc: "Invertir [7, 4, 1, 9]" },
      { type: "cola_mod", input: [], expected: [], desc: "Cola vacía" }
    ]
  },

  copiarPila: {
    title: "2. [1er Parcial] Copiar Pila preservando la original",
    level: "1er Parcial · Inicial",
    desc: "Escribe <code>CopiarPila(PilaTDA origen)</code> que devuelva una nueva <code>PilaTDA</code> idéntica. La pila <code>origen</code> debe quedar preservada exactamente igual.",
    hint: "Pasa de 'origen' a 'aux' (invierte). Luego pasa de 'aux' hacia 'origen' y 'copia' simultáneamente (vuelve a invertir, restaurando el orden).",
    starter: `public static PilaTDA CopiarPila(PilaTDA origen) {
    
}`,
    solution: `public static PilaTDA CopiarPila(PilaTDA origen) {
    PilaTDA aux = new PilaLD();
    aux.InicializarPila();
    PilaTDA copia = new PilaLD();
    copia.InicializarPila();
    while (!origen.PilaVacia()) {
        aux.Apilar(origen.Tope());
        origen.Desapilar();
    }
    while (!aux.PilaVacia()) {
        int x = aux.Tope();
        origen.Apilar(x);
        copia.Apilar(x);
        aux.Desapilar();
    }
    return copia;
}`,
    tests: [
      { type: "pila_ret_preserve", input: [5, 10, 15], expected: [5, 10, 15], desc: "Copiar [5, 10, 15] preservando origen" },
      { type: "pila_ret_preserve", input: [], expected: [], desc: "Copiar pila vacía" }
    ]
  },

  esPalindromo: {
    title: "3. [1er Parcial] Verificar si una Cola es Palíndromo",
    level: "1er Parcial · Intermedio",
    desc: "Escribe <code>EsPalindromo(ColaTDA c)</code> que devuelva <code>true</code> si la cola se lee igual al derecho y al revés. <strong>La cola original <code>c</code> debe quedar intacta.</strong>",
    hint: "En un único recorrido de 'c', reparte cada elemento a 'aux' (para restaurar), 'copia' (Cola) y 'inv' (Pila). Restaura 'c' y luego compara copia.Primero() con inv.Tope().",
    starter: `public static boolean EsPalindromo(ColaTDA c) {
    
}`,
    solution: `public static boolean EsPalindromo(ColaTDA c) {
    ColaTDA aux = new ColaLD(); aux.InicializarCola();
    ColaTDA copia = new ColaLD(); copia.InicializarCola();
    PilaTDA inv = new PilaLD(); inv.InicializarPila();
    while (!c.ColaVacia()) {
        int x = c.Primero();
        aux.Acolar(x); copia.Acolar(x); inv.Apilar(x);
        c.Desacolar();
    }
    while (!aux.ColaVacia()) { c.Acolar(aux.Primero()); aux.Desacolar(); }
    boolean ok = true;
    while (!copia.ColaVacia() && ok) {
        if (copia.Primero() != inv.Tope()) ok = false;
        copia.Desacolar(); inv.Desapilar();
    }
    return ok;
}`,
    tests: [
      { type: "cola_bool_preserve", input: [1, 2, 3, 2, 1], expected: true, desc: "[1, 2, 3, 2, 1] es palíndromo" },
      { type: "cola_bool_preserve", input: [1, 2, 3, 4], expected: false, desc: "[1, 2, 3, 4] NO es palíndromo" },
      { type: "cola_bool_preserve", input: [], expected: true, desc: "Cola vacía" }
    ]
  },

  eliminarRepetidos: {
    title: "4. [Parcial Real UADE 1/7/2026] Eliminar repetidos conservando orden",
    level: "1er Parcial Real",
    desc: "Dada una <code>PilaTDA p</code>, escribe <code>EliminarRepetidos(PilaTDA p)</code> para dejar una sola aparición de cada elemento, respetando el orden original y conservando la primera aparición ingresada (la más cercana al fondo).",
    hint: "Vuelca 'p' primero en 'aux' para tener el fondo en el tope. Luego pasa de 'aux' a 'p' filtrando con un ConjuntoTDA 'vistos'.",
    starter: `public static void EliminarRepetidos(PilaTDA p) {
    
}`,
    solution: `public static void EliminarRepetidos(PilaTDA p) {
    PilaTDA aux = new PilaLD(); aux.InicializarPila();
    ConjuntoTDA vistos = new ConjuntoA(); vistos.InicializarConjunto();
    while (!p.PilaVacia()) {
        aux.Apilar(p.Tope());
        p.Desapilar();
    }
    while (!aux.PilaVacia()) {
        int x = aux.Tope();
        if (!vistos.Pertenece(x)) {
            vistos.Agregar(x);
            p.Apilar(x);
        }
        aux.Desapilar();
    }
}`,
    tests: [
      { type: "pila_mod", input: [5, 3, 5, 8, 3, 2], expected: [5, 3, 8, 2], desc: "[5,3,5,8,3,2] -> [5,3,8,2]" },
      { type: "pila_mod", input: [1, 1, 1], expected: [1], desc: "[1,1,1] -> [1]" }
    ]
  },

  mismosElementos: {
    title: "5. [Parcial Real UADE 25/11/2025] Mismos elementos Pila vs Cola",
    level: "1er Parcial Real",
    desc: "Escribe <code>MismosElementos(PilaTDA p, ColaTDA c)</code> que determine si la pila y la cola contienen exactamente el mismo conjunto de valores (sin repetidos ni orden), restaurando ambas estructuras.",
    hint: "Extrae el conjunto de 'p' (restaurando 'p'), extrae el conjunto de 'c' (restaurando 'c'), y verifica que ambos conjuntos tengan exactamente los mismos elementos.",
    starter: `public static boolean MismosElementos(PilaTDA p, ColaTDA c) {
    
}`,
    solution: `public static boolean MismosElementos(PilaTDA p, ColaTDA c) {
    PilaTDA pAux = new PilaLD(); pAux.InicializarPila();
    ConjuntoTDA conjP = new ConjuntoA(); conjP.InicializarConjunto();
    while (!p.PilaVacia()) { conjP.Agregar(p.Tope()); pAux.Apilar(p.Tope()); p.Desapilar(); }
    while (!pAux.PilaVacia()) { p.Apilar(pAux.Tope()); pAux.Desapilar(); }

    ColaTDA cAux = new ColaLD(); cAux.InicializarCola();
    ConjuntoTDA conjC = new ConjuntoA(); conjC.InicializarConjunto();
    while (!c.ColaVacia()) { conjC.Agregar(c.Primero()); cAux.Acolar(c.Primero()); c.Desacolar(); }
    while (!cAux.ColaVacia()) { c.Acolar(cAux.Primero()); cAux.Desacolar(); }

    boolean iguales = true;
    while (!conjP.ConjuntoVacio() && iguales) {
        int x = conjP.Elegir();
        if (!conjC.Pertenece(x)) iguales = false;
        else { conjP.Sacar(x); conjC.Sacar(x); }
    }
    return iguales && conjC.ConjuntoVacio();
}`,
    tests: [
      { type: "pila_cola_bool", p: [1, 2, 2, 3], c: [3, 1, 2], expected: true, desc: "[1,2,2,3] vs [3,1,2] -> true" },
      { type: "pila_cola_bool", p: [1, 2, 3], c: [1, 2, 4], expected: false, desc: "[1,2,3] vs [1,2,4] -> false" }
    ]
  },

  alturaABB: {
    title: "6. [2do Parcial · ABB] Calcular la Altura de un Árbol Binario",
    level: "2do Parcial · Árboles",
    desc: "Escribe un método recursivo <code>AlturaABB(ABBTDA a)</code> que devuelva la profundidad/altura en niveles de un <code>ABBTDA</code> (convención: árbol vacío = <code>0</code>, solo raíz = <code>1</code>).",
    hint: "Si a.ArbolVacio() devuelve 0. Si no, calcula recursivamente hi = AlturaABB(a.HijoIzq()) y hd = AlturaABB(a.HijoDer()), devuelve 1 + el mayor entre hi y hd.",
    starter: `public static int AlturaABB(ABBTDA a) {
    
}`,
    solution: `public static int AlturaABB(ABBTDA a) {
    if (a.ArbolVacio()) return 0;
    int hi = AlturaABB(a.HijoIzq());
    int hd = AlturaABB(a.HijoDer());
    if (hi > hd) return 1 + hi;
    return 1 + hd;
}`,
    tests: [
      { type: "abb_int", elems: [10, 5, 15, 3], expected: 3, desc: "Árbol [10,5,15,3] tiene 3 niveles de profundidad" },
      { type: "abb_int", elems: [1, 2, 3, 4], expected: 4, desc: "Árbol degenerado [1,2,3,4] tiene altura 4" },
      { type: "abb_int", elems: [], expected: 0, desc: "Árbol vacío -> 0" }
    ]
  },

  mismosABB: {
    title: "7. [Desafío Real de tu Clase · ABB] Comparar dos ABB con Inorden y Pilas",
    level: "2do Parcial · Tu Clase UADE",
    desc: "El desafío del Prof. Escalante en Teams: Escribe <code>MismosElementosABB(ABBTDA a1, ABBTDA a2)</code> que determine si dos <code>ABBTDA</code> contienen exactamente los mismos valores (sin importar la forma del árbol).<br><strong>Nota:</strong> Puedes escribir métodos auxiliares arriba o abajo (por ej. <code>public static void llenarInorden(ABBTDA a, PilaTDA p)</code>).",
    hint: "Si recorres ambos árboles en Inorden (Izq -> Raíz -> Der) apilando en PilaTDA p1 y PilaTDA p2, ¡ambas pilas quedan ordenadas idénticamente de menor a mayor! Luego compara mientras no estén vacías.",
    starter: `public static void llenarInorden(ABBTDA a, PilaTDA p) {
    
}

public static boolean MismosElementosABB(ABBTDA a1, ABBTDA a2) {
    
}`,
    solution: `public static void llenarInorden(ABBTDA a, PilaTDA p) {
    if (!a.ArbolVacio()) {
        llenarInorden(a.HijoIzq(), p);
        p.Apilar(a.Raiz());
        llenarInorden(a.HijoDer(), p);
    }
}

public static boolean MismosElementosABB(ABBTDA a1, ABBTDA a2) {
    PilaTDA p1 = new PilaLD(); p1.InicializarPila();
    PilaTDA p2 = new PilaLD(); p2.InicializarPila();
    llenarInorden(a1, p1);
    llenarInorden(a2, p2);
    while (!p1.PilaVacia() && !p2.PilaVacia()) {
        if (p1.Tope() != p2.Tope()) return false;
        p1.Desapilar();
        p2.Desapilar();
    }
    return p1.PilaVacia() && p2.PilaVacia();
}`,
    tests: [
      { type: "abb_pair_bool", e1: [10, 5, 15], e2: [5, 10, 15], expected: true, desc: "Mismos valores con distinta topología -> true" },
      { type: "abb_pair_bool", e1: [10, 5, 15], e2: [10, 5, 20], expected: false, desc: "Un valor distinto -> false" },
      { type: "abb_pair_bool", e1: [10, 5], e2: [10, 5, 15], expected: false, desc: "Distinta cantidad de nodos -> false" }
    ]
  },

  verticesAislados: {
    title: "8. [2do Parcial · Grafos] Vértices Aislados en un GrafoTDA",
    level: "2do Parcial · Grafos",
    desc: "Escribe <code>VerticesAislados(GrafoTDA g)</code> que reciba un <code>GrafoTDA g</code> y devuelva un <code>ConjuntoTDA</code> con todos los vértices que están completamente aislados (no tienen ninguna arista ni saliente ni entrante).",
    hint: "Para cada vértice 'v' en g.Vertices(), verifica contra todos los demás vértices 'w': si no existe arista (v->w) ni (w->v) para ningún 'w', entonces 'v' está aislado y lo agregas al conjunto resultado.",
    starter: `public static ConjuntoTDA VerticesAislados(GrafoTDA g) {
    
}`,
    solution: `public static ConjuntoTDA VerticesAislados(GrafoTDA g) {
    ConjuntoTDA aislados = new ConjuntoA();
    aislados.InicializarConjunto();
    ConjuntoTDA v1 = g.Vertices();

    while (!v1.ConjuntoVacio()) {
        int orig = v1.Elegir();
        ConjuntoTDA v2 = g.Vertices();
        boolean tieneArista = false;
        while (!v2.ConjuntoVacio() && !tieneArista) {
            int dest = v2.Elegir();
            if (g.ExisteArista(orig, dest) || g.ExisteArista(dest, orig)) {
                tieneArista = true;
            }
            v2.Sacar(dest);
        }
        if (!tieneArista) aislados.Agregar(orig);
        v1.Sacar(orig);
    }
    return aislados;
}`,
    tests: [
      { type: "grafo_set", vertices: [1, 2, 3, 4], aristas: [[1, 2, 10]], expected: [3, 4], desc: "Solo arista 1->2: vértices aislados son {3, 4}" },
      { type: "grafo_set", vertices: [1, 2], aristas: [[1, 2, 5], [2, 1, 5]], expected: [], desc: "Todos conectados -> {}" }
    ]
  }
};

const THEORY_QUESTIONS = [
  {
    q: "¿Qué es un TDA y por qué conviene separar la especificación de la implementación? (Parcial 25/11/2025)",
    answer: `<strong>Definición:</strong> Un <strong>Tipo de Dato Abstracto (TDA)</strong> es un tipo de dato definido por el programador que agrupa lógicamente un conjunto de datos y el conjunto de operaciones permitidas sobre ellos.<br><br>
    <strong>Dos motivos para separar Especificación de Implementación:</strong>
    <ol>
      <li><strong>Intercambiabilidad:</strong> Permite cambiar la estructura interna (ej. pasar de vector estático a lista enlazada) sin modificar el código cliente.</li>
      <li><strong>Encapsulamiento:</strong> Oculta los atributos internos evitando manipulaciones directas que rompan los invariantes del TDA.</li>
    </ol>`
  },
  {
    q: "¿Es correcto afirmar que una Cola con Prioridad se comporta igual que una Cola común cuando todos tienen la misma prioridad? (Parcial 1/7/2026)",
    answer: `<strong>No necesariamente.</strong> La especificación de <code>ColaPrioridadTDA</code> no impone una regla de desempate para prioridades iguales (queda a decisión de quien implementa el TDA). Según si en el algoritmo de inserción se compara con <code>&gt;</code> o con <code>&gt;=</code>, los elementos de igual prioridad saldrán en orden FIFO o LIFO.`
  },
  {
    q: "¿Cuál es la ventaja de un árbol AVL frente a un ABB común y cómo logra su balanceo?",
    answer: `En un <strong>ABB común</strong>, si insertamos claves ordenadas (ej. 1, 2, 3, 4, 5), el árbol degenera en una lista enlazada inclinada y las búsquedas pasan de <code>O(log n)</code> a <code>O(n)</code>.<br><br>
    Un <strong>AVL</strong> es un ABB autobalanceado que garantiza que para todo nodo, la diferencia de altura entre su subárbol izquierdo y derecho (<strong>Factor de Equilibrio</strong>) esté siempre en <code>{-1, 0, +1}</code>. Si tras insertar o eliminar ese factor se rompe (±2), aplica <strong>rotaciones</strong> (Simple Derecha/LL, Simple Izquierda/RR, o Doble Izquierda-Derecha / Derecha-Izquierda) manteniendo la altura en <code>O(log n)</code>.`
  },
  {
    q: "Compara Matriz de Adyacencia vs Lista de Adyacencia en Grafos: ¿cuándo conviene cada una?",
    answer: `<ul>
      <li><strong>Matriz de Adyacencia (<code>GrafoMA</code>):</strong> Consultar <code>ExisteArista(u, v)</code> o <code>PesoArista(u, v)</code> es <strong>O(1)</strong> directo por índices. Pero consume <strong>O(V²)</strong> memoria fija aunque haya pocas aristas. Conviene para <strong>grafos densos</strong> (muchas aristas).</li>
      <li><strong>Lista de Adyacencia (<code>GrafoLA</code>):</strong> Consume solo <strong>O(V + E)</strong> memoria, recorre los vecinos de un vértice muy rápido y no tiene límite fijo de nodos. Consultar si existe una arista específica cuesta <strong>O(grado(v))</strong>. Conviene para <strong>grafos dispersos</strong> (pocas aristas respecto a V²).</li>
    </ul>`
  },
  {
    q: "¿Qué estructuras auxiliares utilizan BFS y DFS en Grafos y en qué orden exploran?",
    answer: `<ul>
      <li><strong>BFS (Breadth-First Search / En Anchura):</strong> Usa una <strong>Cola (<code>ColaTDA</code>)</strong> + un Conjunto de visitados. Explora por capas o niveles de distancia desde el vértice origen (encuentra el camino mínimo en cantidad de aristas).</li>
      <li><strong>DFS (Depth-First Search / En Profundidad):</strong> Usa una <strong>Pila (<code>PilaTDA</code>)</strong> o recursión + un Conjunto de visitados. Avanza lo más profundo posible por una rama antes de retroceder (backtracking).</li>
    </ul>`
  }
];

/* Transpilador ligero de métodos Java UADE -> JavaScript ejecutable */
function transpileExamJava(rawCode) {
  const placeholders = [];
  let code = String(rawCode).replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, m => {
    placeholders.push(m);
    return `__PH_${placeholders.length - 1}__`;
  });

  // Unwrap optional outer class declaration: public class Foo { ... }
  const classMatch = code.match(/^\s*(?:public\s+)?class\s+[A-Za-z_]\w*\s*\{([\s\S]*)\}\s*$/);
  if (classMatch) code = classMatch[1];

  const RET_TYPES = '(?:void|int|boolean|double|float|long|String|PilaTDA|ColaTDA|ColaPrioridadTDA|ConjuntoTDA|DiccionarioSimpleTDA|DiccionarioMultipleTDA|ABBTDA|TDAABB|GrafoTDA|Nodo|NodoABB)';
  const METHOD_RE = new RegExp(
    `(?:(?:public|private|protected)\\s+)?(?:static\\s+)?${RET_TYPES}(?:\\s*\\[\\])?\\s+([a-zA-Z_]\\w*)\\s*\\(([^)]*)\\)\\s*\\{`,
    'g'
  );

  code = code.replace(METHOD_RE, (_, name, params) => {
    const cleanParams = params
      .split(',')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => {
        const tokens = p.replace(/\[\]/g, '').trim().split(/\s+/);
        return tokens[tokens.length - 1];
      })
      .join(', ');
    return `function ${name}(${cleanParams}) {`;
  });

  const VAR_TYPES = 'int|boolean|double|float|long|String|PilaTDA|PilaTF|PilaTI|PilaTF2|PilaLD|ColaTDA|ColaPU|ColaPI|ColaLD|ColaPU2|ColaPrioridadTDA|ColaPrioridadDA|ColaPrioridadAO|ColaPrioridadLD|ConjuntoTDA|ConjuntoA|ConjuntoLD|DiccionarioSimpleTDA|DiccionarioSimpleA|DiccionarioSimpleL|DiccionarioMultipleTDA|DiccionarioMultipleA|DiccionarioMultipleL|ABBTDA|TDAABB|ABB|NodoABB|GrafoTDA|GrafoMA|GrafoLA|Nodo';
  code = code
    .replace(/System\.out\.println\s*\(/g, '__println(')
    .replace(/System\.out\.print\s*\(/g, '__print(')
    .replace(new RegExp(`\\b(?:${VAR_TYPES})\\s*\\[\\s*\\]\\s+([a-zA-Z_]\\w*)\\s*=\\s*\\{([^}]*)\\}`, 'g'), 'let $1 = [$2]')
    .replace(new RegExp(`\\b(?:${VAR_TYPES})\\s*(?:\\[\\s*\\])?\\s+([a-zA-Z_]\\w*)`, 'g'), 'let $1')
    .replace(/new\s+(?:int|boolean|double|float|String)\s*\[([^\]]+)\]/g, 'new Array($1).fill(0)');

  return code.replace(/__PH_(\d+)__/g, (_, i) => placeholders[Number(i)]);
}

function buildLinkedList(arr) {
  let head = null, tail = null;
  for (const v of arr) {
    const n = new Nodo(v, null);
    if (!head) { head = n; tail = n; }
    else { tail.sig = n; tail = n; }
  }
  return head;
}

function linkedListToArray(head) {
  const out = [];
  let cur = head;
  while (cur !== null && cur !== undefined) {
    out.push(cur.info);
    cur = cur.sig;
    if (out.length > 500) throw new Error("Ciclo infinito detectado en punteros 'sig'.");
  }
  return out;
}

/* Ejecutor unificado de tests para Arena Global e Inline (soporta Java UADE y JS) */
function compileAndRunSuite(fnName, tests, userCode) {
  const jsCode = transpileExamJava(userCode);
  let stdoutBuf = '';
  const __print = (...args) => { stdoutBuf += args.join(''); };
  const __println = (...args) => { stdoutBuf += args.join('') + '\n'; };

  let userFn;
  try {
    userFn = new Function(
      'PilaTDA', 'ColaTDA', 'ColaPrioridadTDA', 'ConjuntoTDA', 'DiccionarioSimpleTDA', 'DiccionarioMultipleTDA',
      'ABBTDA', 'TDAABB', 'ABB', 'GrafoTDA', 'Nodo',
      'PilaTF', 'PilaTI', 'PilaTF2', 'PilaLD', 'ColaPU', 'ColaPI', 'ColaPU2', 'ColaLD',
      'ColaPrioridadDA', 'ColaPrioridadAO', 'ColaPrioridadLD', 'ConjuntoA', 'ConjuntoLD',
      'DiccionarioSimpleA', 'DiccionarioSimpleL', 'DiccionarioMultipleA', 'DiccionarioMultipleL',
      'GrafoMA', 'GrafoLA', '__print', '__println',
      `${jsCode}\nreturn typeof ${fnName} !== 'undefined' ? ${fnName} : null;`
    )(
      PilaTDA, ColaTDA, ColaPrioridadTDA, ConjuntoTDA, DiccionarioSimpleTDA, DiccionarioMultipleTDA,
      ABBTDA, ABBTDA, ABBTDA, GrafoTDA, Nodo,
      PilaTDA, PilaTDA, PilaTDA, PilaTDA, ColaTDA, ColaTDA, ColaTDA, ColaTDA,
      ColaPrioridadTDA, ColaPrioridadTDA, ColaPrioridadTDA, ConjuntoTDA, ConjuntoTDA,
      DiccionarioSimpleTDA, DiccionarioSimpleTDA, DiccionarioMultipleTDA, DiccionarioMultipleTDA,
      GrafoTDA, GrafoTDA, __print, __println
    );
    if (!userFn) return { syntaxError: `No se encontró el método '${fnName}'. Mantén el nombre exacto del método.` };
  } catch (err) {
    return { syntaxError: err.message };
  }

  const results = [];
  let allPassed = true;

  for (const t of tests) {
    LoopGuard.reset();
    let passed = false;
    let errorMsg = "";
    let actualStr = "";
    let expectedStr = JSON.stringify(t.expected);

    try {
      if (t.type === "cola_mod") {
        const c = new ColaTDA(); c.InicializarCola();
        t.input.forEach(v => c.Acolar(v));
        userFn(c);
        actualStr = JSON.stringify(c.items);
        passed = actualStr === expectedStr;
      } else if (t.type === "pila_int_preserve") {
        const p = new PilaTDA(); p.InicializarPila();
        t.input.forEach(v => p.Apilar(v));
        const res = userFn(p);
        const preserved = JSON.stringify(p.items) === JSON.stringify(t.input);
        actualStr = String(res);
        if (!preserved) errorMsg = `FALLO DE PRESERVACIÓN: Modificaste la pila original (quedó ${JSON.stringify(p.items)}).`;
        passed = (res === t.expected) && preserved;
      } else if (t.type === "pila_ret_preserve") {
        const orig = new PilaTDA(); orig.InicializarPila();
        t.input.forEach(v => orig.Apilar(v));
        const res = userFn(orig);
        const preserved = JSON.stringify(orig.items) === JSON.stringify(t.input);
        actualStr = res ? JSON.stringify(res.items) : "null";
        if (!preserved) errorMsg = `FALLO DE PRESERVACIÓN: Modificaste la pila original.`;
        passed = preserved && res && JSON.stringify(res.items) === expectedStr;
      } else if (t.type === "pila_pasar_preserve") {
        const orig = new PilaTDA(); orig.InicializarPila();
        const dest = new PilaTDA(); dest.InicializarPila();
        t.origen.forEach(v => orig.Apilar(v));
        userFn(orig, dest);
        const preserved = JSON.stringify(orig.items) === JSON.stringify(t.origen);
        actualStr = JSON.stringify(dest.items);
        if (!preserved) errorMsg = `FALLO DE PRESERVACIÓN: Destruiste 'origen' (quedó ${JSON.stringify(orig.items)}).`;
        passed = preserved && actualStr === expectedStr;
      } else if (t.type === "pila_mod") {
        const p = new PilaTDA(); p.InicializarPila();
        t.input.forEach(v => p.Apilar(v));
        userFn(p);
        actualStr = JSON.stringify(p.items);
        passed = actualStr === expectedStr;
      } else if (t.type === "pila_elim_x") {
        const p = new PilaTDA(); p.InicializarPila();
        t.input.forEach(v => p.Apilar(v));
        userFn(p, t.x);
        actualStr = JSON.stringify(p.items);
        passed = actualStr === expectedStr;
      } else if (t.type === "cola_bool_preserve") {
        const c = new ColaTDA(); c.InicializarCola();
        t.input.forEach(v => c.Acolar(v));
        const res = userFn(c);
        const preserved = JSON.stringify(c.items) === JSON.stringify(t.input);
        actualStr = String(res);
        if (!preserved) errorMsg = `FALLO DE PRESERVACIÓN: La cola no fue restaurada.`;
        passed = (res === t.expected) && preserved;
      } else if (t.type === "cp_filter_preserve") {
        const cp = new ColaPrioridadTDA(); cp.InicializarCola();
        t.entries.forEach(([v, pr]) => cp.AcolarPrioridad(v, pr));
        const snapshot = JSON.stringify(cp.items);
        const res = userFn(cp, t.minPrio);
        const preserved = JSON.stringify(cp.items) === snapshot;
        actualStr = res && res.items ? JSON.stringify(res.items) : "null";
        if (!preserved) errorMsg = `FALLO DE PRESERVACIÓN: Destruiste 'cp' sin restaurarla.`;
        passed = preserved && actualStr === expectedStr;
      } else if (t.type === "pila_cola_bool") {
        const p = new PilaTDA(); p.InicializarPila(); t.p.forEach(v => p.Apilar(v));
        const c = new ColaTDA(); c.InicializarCola(); t.c.forEach(v => c.Acolar(v));
        const res = userFn(p, c);
        const pOk = JSON.stringify(p.items) === JSON.stringify(t.p);
        const cOk = JSON.stringify(c.items) === JSON.stringify(t.c);
        actualStr = String(res);
        if (!pOk || !cOk) errorMsg = `FALLO DE PRESERVACIÓN: No restauraste p y/o c.`;
        passed = (res === t.expected) && pOk && cOk;
      } else if (t.type === "nodo_int") {
        const head = buildLinkedList(t.list);
        const res = userFn(head, t.x);
        const intact = JSON.stringify(linkedListToArray(head)) === JSON.stringify(t.list);
        actualStr = String(res);
        if (!intact) errorMsg = "FALLO: Se alteraron los enlaces o valores de la lista.";
        passed = intact && res === t.expected;
      } else if (t.type === "nodo_list_elim") {
        const head = buildLinkedList(t.list);
        const newHead = userFn(head, t.x);
        const outArr = linkedListToArray(newHead);
        actualStr = JSON.stringify(outArr);
        passed = actualStr === expectedStr;
      } else if (t.type === "dm_max") {
        const dm = new DiccionarioMultipleTDA(); dm.InicializarDiccionario();
        t.entries.forEach(([k, vs]) => vs.forEach(v => dm.Agregar(k, v)));
        const res = userFn(dm, t.key);
        actualStr = String(res);
        passed = res === t.expected;
      } else if (t.type === "dic_pair_set") {
        const d1 = new DiccionarioSimpleTDA(); d1.InicializarDiccionario();
        const d2 = new DiccionarioSimpleTDA(); d2.InicializarDiccionario();
        t.e1.forEach(([k, v]) => d1.Agregar(k, v));
        t.e2.forEach(([k, v]) => d2.Agregar(k, v));
        const res = userFn(d1, d2);
        const actualArr = res && res.items ? [...res.items].sort((a,b)=>a-b) : [];
        actualStr = JSON.stringify(actualArr);
        expectedStr = JSON.stringify([...t.expected].sort((a,b)=>a-b));
        passed = actualStr === expectedStr;
      } else if (t.type === "abb_int") {
        const a = new ABBTDA(); a.InicializarArbol();
        t.elems.forEach(x => a.AgregarElem(x));
        const res = userFn(a);
        actualStr = String(res);
        passed = res === t.expected;
      } else if (t.type === "abb_exists") {
        const a = new ABBTDA(); a.InicializarArbol();
        t.elems.forEach(x => a.AgregarElem(x));
        const res = userFn(a, t.x);
        actualStr = String(res);
        passed = res === t.expected;
      } else if (t.type === "abb_pair_bool") {
        const a1 = new ABBTDA(); a1.InicializarArbol(); t.e1.forEach(x => a1.AgregarElem(x));
        const a2 = new ABBTDA(); a2.InicializarArbol(); t.e2.forEach(x => a2.AgregarElem(x));
        const res = userFn(a1, a2);
        actualStr = String(res);
        passed = res === t.expected;
      } else if (t.type === "grafo_grado") {
        const g = new GrafoTDA(); g.InicializarGrafo();
        t.vertices.forEach(v => g.AgregarVertice(v));
        t.aristas.forEach(([o, d, p]) => g.AgregarArista(o, d, p));
        const res = userFn(g, t.v);
        actualStr = String(res);
        passed = res === t.expected;
      } else if (t.type === "grafo_puente_set") {
        const g = new GrafoTDA(); g.InicializarGrafo();
        t.vertices.forEach(v => g.AgregarVertice(v));
        t.aristas.forEach(([o, d, p]) => g.AgregarArista(o, d, p));
        const resConj = userFn(g, t.v1, t.v2);
        const actualArr = resConj && resConj.items ? [...resConj.items].sort((a,b)=>a-b) : [];
        actualStr = JSON.stringify(actualArr);
        expectedStr = JSON.stringify([...t.expected].sort((a,b)=>a-b));
        passed = actualStr === expectedStr;
      } else if (t.type === "grafo_set") {
        const g = new GrafoTDA(); g.InicializarGrafo();
        t.vertices.forEach(v => g.AgregarVertice(v));
        t.aristas.forEach(([o, d, p]) => g.AgregarArista(o, d, p));
        const resConj = userFn(g);
        const actualArr = resConj && resConj.items ? [...resConj.items].sort((a,b)=>a-b) : [];
        actualStr = JSON.stringify(actualArr);
        expectedStr = JSON.stringify([...t.expected].sort((a,b)=>a-b));
        passed = actualStr === expectedStr;
      }
    } catch (e) {
      passed = false;
      errorMsg = e.message;
    }

    if (!passed) allPassed = false;
    results.push({ desc: t.desc, passed, expected: expectedStr, actual: actualStr, errorMsg });
  }

  return { allPassed, results, stdout: stdoutBuf.trim() };
}

function executeUserTests(exerciseKey, userCode) {
  const ex = EXERCISES[exerciseKey];
  const fnMap = {
    invertirCola: 'InvertirCola',
    copiarPila: 'CopiarPila',
    esPalindromo: 'EsPalindromo',
    eliminarRepetidos: 'EliminarRepetidos',
    mismosElementos: 'MismosElementos',
    alturaABB: 'AlturaABB',
    mismosABB: 'MismosElementosABB',
    verticesAislados: 'VerticesAislados'
  };
  return compileAndRunSuite(fnMap[exerciseKey], ex.tests, userCode);
}
