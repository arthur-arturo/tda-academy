export const conjDicExercises = [
  {
    id: "E10",
    cat: "combinados",
    catLabel: "Pila + Cola + Conjunto",
    difficulty: "Parcial Clave",
    title: "Eliminar Duplicados de una Cola con Conjunto",
    tag: "Filtro de Unicidad",
    summary: "Conservar sólo la primera aparición de cada número en una Cola usando un Conjunto como memoria de vistos.",
    mision: "Dada una ColaTDA con posibles elementos repetidos (ej: [4, 2, 4, 9, 2, 5]), retornar una nueva cola donde cada valor aparezca una única vez respetando el orden original de primera aparición.",
    mentalClick: `💡 **El Click Mental:**
¿Cómo recordar rápidamente si ya vimos un número antes?
¡Con un **ConjuntoTDA**!
* Los conjuntos garantizan unicidad y tienen el método \`Pertenece(x)\`.
* Recorremos la cola: si el elemento **NO pertenece** al conjunto, es la primera vez que lo vemos $\\implies$ lo agregamos al conjunto y lo acolamos a la cola final.
* Si **YA pertenece**, lo ignoramos porque es un duplicado.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Intentar vaciar el conjunto al final en la cola. Si hacés eso, **perdés el orden FIFO original**, porque el método \`Elegir()\` de Conjuntos NO garantiza ningún orden. La cola resultado debe armarse durante el filtrado.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n \\cdot \\text{costo}(Pertenece))$: en arreglos dinámicos/estáticos de cátedra es $O(n^2)$.
* **Espacio:** $O(n)$ para el conjunto de vistos y la nueva cola.`,
    code: `public static ColaTDA eliminarDuplicados(ColaTDA c) {
    ColaTDA copia = copiarCola(c); // Preservar c intacta
    ColaTDA resultado = new ColaPU();
    resultado.InicializarCola();

    ConjuntoTDA vistos = new ConjuntoTA();
    vistos.InicializarConjunto();

    while (!copia.ColaVacia()) {
        int x = copia.Primero();
        if (!vistos.Pertenece(x)) {
            vistos.Agregar(x);
            resultado.Acolar(x);
        }
        copia.Desacolar();
    }

    return resultado;
}`,
    sim: {
      type: "queue_set",
      initial: {
        s1: { label: "Cola Entrada", items: [4, 2, 4, 9, 2] },
        s2: { label: "Conjunto Vistos", items: [] },
        s3: { label: "Cola Resultado", items: [] }
      },
      steps: [
        { codeLine: 10, msg: "Primero es 4. No está en vistos. Lo agregamos a vistos y a resultado.", s1: [2, 4, 9, 2], s2: [4], s3: [4] },
        { codeLine: 10, msg: "Primero es 2. No está en vistos. Lo agregamos a vistos y a resultado.", s1: [4, 9, 2], s2: [4, 2], s3: [4, 2] },
        { codeLine: 11, msg: "Primero es 4. ¡Ya está en vistos! Es duplicado: se descarta.", s1: [9, 2], s2: [4, 2], s3: [4, 2] },
        { codeLine: 10, msg: "Primero es 9. No está en vistos. Lo agregamos.", s1: [2], s2: [4, 2, 9], s3: [4, 2, 9] },
        { codeLine: 11, msg: "Primero es 2. ¡Ya está en vistos! Se descarta.", s1: [], s2: [4, 2, 9], s3: [4, 2, 9] },
        { codeLine: 19, msg: "Resultado final: [4, 2, 9] sin duplicados y en orden.", s1: [], s2: [4, 2, 9], s3: [4, 2, 9] }
      ]
    }
  },
  {
    id: "E11",
    cat: "combinados",
    catLabel: "Conjuntos Puros",
    difficulty: "Intermedio",
    title: "Intersección de Conjuntos con Operaciones TDA",
    tag: "Álgebra de Conjuntos",
    summary: "Hallar los elementos comunes entre dos conjuntos usando exclusivamente la interfaz pública del TDA.",
    mision: "Escribir un método que reciba dos ConjuntoTDA A y B y devuelva un nuevo ConjuntoTDA con la intersección (A ∩ B) sin destruir ni A ni B.",
    mentalClick: `💡 **El Click Mental:**
En el TDA Conjunto, para iterar elementos sólo existe el método \`Elegir()\` y \`Sacar()\`.
Para no destruir el conjunto A:
1. Clonamos el conjunto A.
2. Mientras la copia no esté vacía: sacamos un elemento con \`Elegir()\` y \`Sacar()\`.
3. Verificamos si \`B.Pertenece(x)\`. Si está, \`resultado.Agregar(x)\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Llamar a \`copia.Elegir()\` en un bucle sin hacer \`copia.Sacar(x)\`. Como \`Elegir()\` no elimina el elemento, ¡caerías en un **bucle infinito**!`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|A| \\cdot \\text{costo}(Pertenece))$.
* **Espacio:** $O(|A| + |B|)$.`,
    code: `// Clona un conjunto para poder iterarlo de forma no destructiva
public static ConjuntoTDA copiarConjunto(ConjuntoTDA c) {
    ConjuntoTDA copia = new ConjuntoTA();
    copia.InicializarConjunto();
    ConjuntoTDA aux = new ConjuntoTA();
    aux.InicializarConjunto();

    while (!c.ConjuntoVacio()) {
        int x = c.Elegir();
        copia.Agregar(x);
        aux.Agregar(x);
        c.Sacar(x);
    }
    while (!aux.ConjuntoVacio()) {
        int x = aux.Elegir();
        c.Agregar(x);
        aux.Sacar(x);
    }
    return copia;
}

public static ConjuntoTDA interseccion(ConjuntoTDA a, ConjuntoTDA b) {
    ConjuntoTDA copiaA = copiarConjunto(a);
    ConjuntoTDA res = new ConjuntoTA();
    res.InicializarConjunto();

    while (!copiaA.ConjuntoVacio()) {
        int x = copiaA.Elegir();
        if (b.Pertenece(x)) {
            res.Agregar(x);
        }
        copiaA.Sacar(x); // ¡Fundamental para avanzar!
    }

    return res;
}`,
    sim: {
      type: "sets",
      initial: {
        s1: { label: "Conjunto A", items: [3, 8, 15] },
        s2: { label: "Conjunto B", items: [8, 15, 22] },
        s3: { label: "Intersección (A ∩ B)", items: [] }
      },
      steps: [
        { codeLine: 27, msg: "Elegimos 3 de A. ¿Pertenece a B [8, 15, 22]? No. Lo descartamos.", s1: [8, 15], s2: [8, 15, 22], s3: [] },
        { codeLine: 28, msg: "Elegimos 8 de A. ¿Pertenece a B? ¡Sí! Lo agregamos al resultado.", s1: [15], s2: [8, 15, 22], s3: [8] },
        { codeLine: 28, msg: "Elegimos 15 de A. ¿Pertenece a B? ¡Sí! Lo agregamos al resultado.", s1: [], s2: [8, 15, 22], s3: [8, 15] },
        { codeLine: 34, msg: "¡Finalizado! Intersección resultante: {8, 15}.", s1: [], s2: [8, 15, 22], s3: [8, 15] }
      ]
    }
  },
  {
    id: "E12",
    cat: "combinados",
    catLabel: "Conjuntos Puros",
    difficulty: "Intermedio",
    title: "Verificar Inclusión de Subconjunto (A ⊆ B)",
    tag: "Relaciones de Inclusión",
    summary: "Determinar si todos los elementos de un conjunto A están presentes en el conjunto B.",
    mision: "Retornar true si A está incluido en B (A ⊆ B). Manejar el caso de conjunto vacío (el conjunto vacío es subconjunto de cualquier conjunto).",
    mentalClick: `💡 **El Click Mental:**
Para que $A \\subseteq B$, **cada elemento** de $A$ debe estar en $B$.
* Si encontramos tan solo **un elemento** de $A$ que no pertenezca a $B$, ¡ya podemos retornar \`false\` inmediatamente (cortocircuito)!
* Si logramos revisar todos los elementos de $A$ y todos pertenecían a $B$, retornamos \`true\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Destruir $A$ en el proceso de revisión. Siempre cloná $A$ antes de desarmarlo con \`Elegir()\` y \`Sacar()\`.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(|A| \\cdot \\text{costo}(Pertenece))$ en el peor caso.
* **Espacio:** $O(|A|)$ para la copia auxiliar.`,
    code: `public static boolean esSubconjunto(ConjuntoTDA a, ConjuntoTDA b) {
    ConjuntoTDA copiaA = copiarConjunto(a);

    while (!copiaA.ConjuntoVacio()) {
        int elem = copiaA.Elegir();
        if (!b.Pertenece(elem)) {
            return false; // Encontramos un contraejemplo
        }
        copiaA.Sacar(elem);
    }

    return true; // Todos los elementos de A pertenecen a B
}`,
    sim: {
      type: "sets",
      initial: {
        s1: { label: "Subconjunto A", items: [5, 12] },
        s2: { label: "Superconjunto B", items: [5, 9, 12, 18] }
      },
      steps: [
        { codeLine: 5, msg: "Revisamos elemento 5 de A: pertenece a B? Sí.", s1: [12], s2: [5, 9, 12, 18] },
        { codeLine: 5, msg: "Revisamos elemento 12 de A: pertenece a B? Sí.", s1: [], s2: [5, 9, 12, 18] },
        { codeLine: 11, msg: "Copia de A vacía sin contraejemplos. Retorna true: A ⊆ B.", s1: [], s2: [5, 9, 12, 18] }
      ]
    }
  },
  {
    id: "E13",
    cat: "combinados",
    catLabel: "Conjuntos Puros",
    difficulty: "Combinado",
    title: "Diferencia Simétrica entre Conjuntos (A Δ B)",
    tag: "Álgebra de Conjuntos",
    summary: "Crear un nuevo conjunto con los elementos que pertenecen a A o a B, pero no a ambos a la vez.",
    mision: "Calcular la diferencia simétrica: $(A \\setminus B) \\cup (B \\setminus A)$ utilizando la combinación de métodos de TDA.",
    mentalClick: `💡 **El Click Mental:**
Piensa en el diagrama de Venn: la diferencia simétrica son las dos 'lunas' laterales, quitando la lenteja del centro (la intersección).
1. Elementos de $A$ que no están en $B$.
2. Elementos de $B$ que no están en $A$.
Unimos ambos resultados en un solo conjunto.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Olvidar que los conjuntos no admiten duplicados por definición: si un elemento ya está, \`Agregar()\` no debe fallar, pero asegurate de no agregar elementos de la intersección.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O((|A| + |B|) \\cdot \\text{costo}(Pertenece))$.
* **Espacio:** $O(|A| + |B|)$.`,
    code: `public static ConjuntoTDA diferenciaSimetrica(ConjuntoTDA a, ConjuntoTDA b) {
    ConjuntoTDA res = new ConjuntoTA();
    res.InicializarConjunto();

    ConjuntoTDA cpA = copiarConjunto(a);
    while (!cpA.ConjuntoVacio()) {
        int x = cpA.Elegir();
        if (!b.Pertenece(x)) {
            res.Agregar(x);
        }
        cpA.Sacar(x);
    }

    ConjuntoTDA cpB = copiarConjunto(b);
    while (!cpB.ConjuntoVacio()) {
        int y = cpB.Elegir();
        if (!a.Pertenece(y)) {
            res.Agregar(y);
        }
        cpB.Sacar(y);
    }

    return res;
}`,
    sim: {
      type: "sets",
      initial: {
        s1: { label: "Conjunto A", items: [1, 2, 3] },
        s2: { label: "Conjunto B", items: [2, 3, 4] },
        s3: { label: "Diferencia Simétrica (A Δ B)", items: [] }
      },
      steps: [
        { codeLine: 8, msg: "De A: 1 no está en B ➔ agregamos 1 a resultado.", s1: [2, 3], s2: [2, 3, 4], s3: [1] },
        { codeLine: 8, msg: "De A: 2 y 3 sí están en B ➔ se ignoran.", s1: [], s2: [2, 3, 4], s3: [1] },
        { codeLine: 18, msg: "De B: 4 no está en A ➔ agregamos 4 a resultado.", s1: [], s2: [], s3: [1, 4] },
        { codeLine: 23, msg: "Resultado final: {1, 4}.", s1: [], s2: [], s3: [1, 4] }
      ]
    }
  },
  {
    id: "E14",
    cat: "diccionarios",
    catLabel: "Diccionarios",
    difficulty: "Parcial Clave",
    title: "Histograma de Frecuencias (Diccionario Simple)",
    tag: "Conteo y Frecuencias",
    summary: "Contar cuántas veces se repite cada número de una secuencia usando DiccionarioSimpleTDA.",
    mision: "Dada una ColaTDA de enteros, retornar un DiccionarioSimpleTDA donde cada clave sea un número único y su valor sea la cantidad de veces que apareció en la cola.",
    mentalClick: `💡 **El Click Mental:**
Un Diccionario Simple asocia una **Clave Única** con un **Valor Único** (\`Clave ➔ Valor\`).
Para contar frecuencias:
* Por cada número $x$ que sacamos de la cola:
  * Si $x$ **no existe** como clave en el diccionario: \`dic.Agregar(x, 1)\`.
  * Si $x$ **ya existe**: leemos el valor actual con \`dic.Recuperar(x)\`, y volvemos a guardar con la cuenta incrementada: \`dic.Agregar(x, actual + 1)\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Llamar a \`dic.Recuperar(x)\` sin antes verificar que la clave exista con \`dic.Claves().Pertenece(x)\`. Si la clave no existe, \`Recuperar\` viola la precondición del TDA y lanza excepción.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n \\cdot \\text{costo}(Pertenece + Agregar))$.
* **Espacio:** $O(U)$ donde $U$ es la cantidad de elementos únicos.`,
    code: `public static DiccionarioSimpleTDA histogramaFrecuencias(ColaTDA c) {
    ColaTDA copia = copiarCola(c);
    DiccionarioSimpleTDA dic = new DicSimpleA();
    dic.InicializarDiccionario();

    while (!copia.ColaVacia()) {
        int x = copia.Primero();
        if (dic.Claves().Pertenece(x)) {
            int cuenta = dic.Recuperar(x);
            dic.Agregar(x, cuenta + 1); // Sobrescribe el valor en dic simple
        } else {
            dic.Agregar(x, 1);
        }
        copia.Desacolar();
    }

    return dic;
}`,
    sim: {
      type: "dict",
      initial: {
        s1: { label: "Cola Entrada", items: [7, 3, 7, 7, 3] },
        s2: { label: "Diccionario [Clave ➔ Frecuencia]", entries: [] }
      },
      steps: [
        { codeLine: 12, msg: "Primero: 7. Clave 7 no existe: Agregar(7, 1).", s1: [3, 7, 7, 3], s2: [{k: 7, v: 1}] },
        { codeLine: 12, msg: "Primero: 3. Clave 3 no existe: Agregar(3, 1).", s1: [7, 7, 3], s2: [{k: 7, v: 1}, {k: 3, v: 1}] },
        { codeLine: 10, msg: "Primero: 7. Ya existe con valor 1: Agregar(7, 2).", s1: [7, 3], s2: [{k: 7, v: 2}, {k: 3, v: 1}] },
        { codeLine: 10, msg: "Primero: 7. Ya existe con valor 2: Agregar(7, 3).", s1: [3], s2: [{k: 7, v: 3}, {k: 3, v: 1}] },
        { codeLine: 10, msg: "Primero: 3. Ya existe con valor 1: Agregar(3, 2).", s1: [], s2: [{k: 7, v: 3}, {k: 3, v: 2}] },
        { codeLine: 17, msg: "Resultado: {7 ➔ 3 veces, 3 ➔ 2 veces}.", s1: [], s2: [{k: 7, v: 3}, {k: 3, v: 2}] }
      ]
    }
  },
  {
    id: "E15",
    cat: "diccionarios",
    catLabel: "Diccionarios",
    difficulty: "Parcial Clave",
    title: "Agrupar por Paridad (Diccionario Múltiple)",
    tag: "Clasificación en Buckets",
    summary: "Clasificar números en dos grupos ('Pares' clave 0, 'Impares' clave 1) con DiccionarioMultipleTDA.",
    mision: "Dado un conjunto o cola de números enteros, agruparlos dentro de un DiccionarioMultipleTDA según su paridad (clave 0: pares, clave 1: impares).",
    mentalClick: `💡 **El Click Mental:**
Un Diccionario Múltiple permite asociar **múltiples valores** a una misma clave (\`Clave ➔ {val1, val2, val3}\`).
* Para cada número $x$:
* Calculamos su clave de bucket: \`int clave = Math.abs(x % 2)\`.
* Hacemos \`dic.Agregar(clave, x)\`. ¡El TDA se encarga automáticamente de ir sumando los valores al conjunto de esa clave sin duplicados!`,
    examTrap: `⚠️ **Trampa de Parcial:**
Los números negativos en Java: \`-3 % 2\` da \`-1\`. Para evitar claves negativas no deseadas, usa \`Math.abs(x % 2)\` para garantizar que la clave sea 0 o 1.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(n \\cdot \\text{costo}(Agregar))$.
* **Espacio:** $O(n)$ para almacenar los $n$ números distribuidos en las 2 claves.`,
    code: `public static DiccionarioMultipleTDA agruparPorParidad(ColaTDA c) {
    ColaTDA copia = copiarCola(c);
    DiccionarioMultipleTDA dic = new DicMultipleA();
    dic.InicializarDiccionario();

    while (!copia.ColaVacia()) {
        int x = copia.Primero();
        int clave = Math.abs(x % 2); // 0 para pares, 1 para impares
        dic.Agregar(clave, x);
        copia.Desacolar();
    }

    return dic;
}`,
    sim: {
      type: "dict_multi",
      initial: {
        s1: { label: "Cola Entrada", items: [4, 7, 12, 15, 8] },
        s2: { label: "Diccionario Múltiple", entries: [] }
      },
      steps: [
        { codeLine: 9, msg: "4 % 2 = 0 (Par) ➔ dic.Agregar(0, 4).", s1: [7, 12, 15, 8], s2: [{k: 0, v: [4]}] },
        { codeLine: 9, msg: "7 % 2 = 1 (Impar) ➔ dic.Agregar(1, 7).", s1: [12, 15, 8], s2: [{k: 0, v: [4]}, {k: 1, v: [7]}] },
        { codeLine: 9, msg: "12 % 2 = 0 (Par) ➔ dic.Agregar(0, 12).", s1: [15, 8], s2: [{k: 0, v: [4, 12]}, {k: 1, v: [7]}] },
        { codeLine: 9, msg: "15 % 2 = 1 (Impar) ➔ dic.Agregar(1, 15).", s1: [8], s2: [{k: 0, v: [4, 12]}, {k: 1, v: [7, 15]}] },
        { codeLine: 9, msg: "8 % 2 = 0 (Par) ➔ dic.Agregar(0, 8).", s1: [], s2: [{k: 0, v: [4, 12, 8]}, {k: 1, v: [7, 15]}] },
        { codeLine: 14, msg: "Listo: Clave 0 (Pares) = {4, 12, 8}, Clave 1 (Impares) = {7, 15}.", s1: [], s2: [{k: 0, v: [4, 12, 8]}, {k: 1, v: [7, 15]}] }
      ]
    }
  },
  {
    id: "E16",
    cat: "diccionarios",
    catLabel: "Diccionarios",
    difficulty: "Intermedio",
    title: "Clave con Mayor Cantidad de Valores",
    tag: "Auditoría de Mapas",
    summary: "Encontrar cuál clave de un DiccionarioMultipleTDA contiene la lista más poblada de valores.",
    mision: "Dado un DiccionarioMultipleTDA no vacío, retornar la clave que tenga asociada la mayor cantidad de valores en su conjunto.",
    mentalClick: `💡 **El Click Mental:**
1. Obtenemos el conjunto de claves con \`dic.Claves()\`.
2. Iteramos cada clave:
   * Recuperamos su conjunto de valores con \`ConjuntoTDA valores = dic.Recuperar(k)\`.
   * Contamos cuántos elementos tiene ese conjunto auxiliar.
   * Si supera el máximo registrado hasta ahora, actualizamos \`maxClave\` y \`maxCantidad\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Olvidar inicializar \`maxClave\` con la primera clave existente o asumir que el diccionario tiene claves positivas. Siempre inicializa las variables de máximo con el primer elemento real.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(K \\cdot V)$ donde $K$ es el número de claves y $V$ el promedio de valores por clave.
* **Espacio:** $O(V)$ para clonar el conjunto de valores.`,
    code: `public static int claveConMasValores(DiccionarioMultipleTDA dic) {
    ConjuntoTDA claves = dic.Claves();
    ConjuntoTDA cpClaves = copiarConjunto(claves);

    int maxClave = 0;
    int maxCantidad = -1;

    while (!cpClaves.ConjuntoVacio()) {
        int k = cpClaves.Elegir();
        ConjuntoTDA valores = dic.Recuperar(k);
        int cantValores = contarElementosConjunto(valores);

        if (cantValores > maxCantidad) {
            maxCantidad = cantValores;
            maxClave = k;
        }

        cpClaves.Sacar(k);
    }

    return maxClave;
}`,
    sim: {
      type: "dict_multi",
      initial: {
        s1: { label: "Diccionario Múltiple", entries: [{k: 10, v: [1, 2]}, {k: 20, v: [5, 6, 7, 8]}, {k: 30, v: [9]}] }
      },
      steps: [
        { codeLine: 10, msg: "Evaluamos Clave 10: tiene 2 valores. Nuevo max = 10 (cant = 2).", s1: [{k: 10, v: [1, 2]}, {k: 20, v: [5, 6, 7, 8]}, {k: 30, v: [9]}] },
        { codeLine: 14, msg: "Evaluamos Clave 20: tiene 4 valores. 4 > 2 ➔ Nuevo max = 20 (cant = 4).", s1: [{k: 10, v: [1, 2]}, {k: 20, v: [5, 6, 7, 8]}, {k: 30, v: [9]}] },
        { codeLine: 10, msg: "Evaluamos Clave 30: tiene 1 valor. 1 < 4 ➔ Max se mantiene en 20.", s1: [{k: 10, v: [1, 2]}, {k: 20, v: [5, 6, 7, 8]}, {k: 30, v: [9]}] },
        { codeLine: 21, msg: "Fin del recorrido: Retorna clave 20 con 4 valores.", s1: [{k: 10, v: [1, 2]}, {k: 20, v: [5, 6, 7, 8]}, {k: 30, v: [9]}] }
      ]
    }
  },
  {
    id: "E17",
    cat: "diccionarios",
    catLabel: "Diccionarios",
    difficulty: "Combinado",
    title: "Invertir Diccionario Simple (Biyectivo)",
    tag: "Inversión de Mapas",
    summary: "Intercambiar claves por valores en un DiccionarioSimpleTDA (asumiendo valores únicos).",
    mision: "Dado un DiccionarioSimpleTDA biyectivo (cada clave tiene un valor distinto), crear un nuevo diccionario donde los valores de origen sean las claves y las claves sean los valores.",
    mentalClick: `💡 **El Click Mental:**
Si en el diccionario original teníamos:
\`DNI ➔ Legajo (ej: 40123456 ➔ 1092)\`
El diccionario invertido tendrá:
\`Legajo ➔ DNI (ej: 1092 ➔ 40123456)\`
Recorremos todas las claves de origen, leemos su valor \`v = dic.Recuperar(k)\`, y en el nuevo hacemos \`invertido.Agregar(v, k)\`.`,
    examTrap: `⚠️ **Trampa de Parcial:**
Si el diccionario no fuera biyectivo (dos claves tuvieran el mismo valor), una sobrescribiría a la otra. Si el profesor pide soportar colisiones, debes usar un \`DiccionarioMultipleTDA\` para la versión invertida.`,
    bigO: `⏱️ **Costo:**
* **Tiempo:** $O(K \\cdot \\text{costo}(Agregar))$.
* **Espacio:** $O(K)$ para el nuevo diccionario.`,
    code: `public static DiccionarioSimpleTDA invertirDiccionario(DiccionarioSimpleTDA dic) {
    DiccionarioSimpleTDA inv = new DicSimpleA();
    inv.InicializarDiccionario();

    ConjuntoTDA claves = copiarConjunto(dic.Claves());
    while (!claves.ConjuntoVacio()) {
        int k = claves.Elegir();
        int v = dic.Recuperar(k);
        inv.Agregar(v, k); // El valor pasa a ser clave, la clave pasa a valor
        claves.Sacar(k);
    }

    return inv;
}`,
    sim: {
      type: "dict",
      initial: {
        s1: { label: "Diccionario Origen [k ➔ v]", entries: [{k: 1, v: 100}, {k: 2, v: 200}] },
        s2: { label: "Diccionario Invertido [v ➔ k]", entries: [] }
      },
      steps: [
        { codeLine: 8, msg: "Clave 1 con valor 100 ➔ inv.Agregar(100, 1).", s1: [{k: 1, v: 100}, {k: 2, v: 200}], s2: [{k: 100, v: 1}] },
        { codeLine: 8, msg: "Clave 2 con valor 200 ➔ inv.Agregar(200, 2).", s1: [{k: 1, v: 100}, {k: 2, v: 200}], s2: [{k: 100, v: 1}, {k: 200, v: 2}] },
        { codeLine: 13, msg: "Listo: Claves y valores completamente intercambiados.", s1: [{k: 1, v: 100}, {k: 2, v: 200}], s2: [{k: 100, v: 1}, {k: 200, v: 2}] }
      ]
    }
  }
];
