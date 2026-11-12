/* ============================================================================
   Implementaciones oficiales de TDAs (Programación II - UADE) en JavaScript
   Soporta PascalCase y camelCase + ABBTDA (TDAABB) + GrafoTDA
   ============================================================================ */

class LoopGuard {
  static count = 0;
  static MAX_OPS = 30000;
  static reset() { LoopGuard.count = 0; }
  static tick() {
    LoopGuard.count++;
    if (LoopGuard.count > LoopGuard.MAX_OPS) {
      throw new Error("Límite de seguridad superado (25.000+ operaciones). Revisa las condiciones de parada de tus ciclos o recursión.");
    }
  }
}

class PilaTDA {
  constructor() { this.items = []; }
  InicializarPila() { this.items = []; }
  inicializarPila() { this.InicializarPila(); }

  Apilar(x) { LoopGuard.tick(); this.items.push(Number(x)); }
  apilar(x) { this.Apilar(x); }

  Desapilar() {
    LoopGuard.tick();
    if (this.PilaVacia()) throw new Error("Precondición violada: Desapilar() sobre una pila vacía.");
    this.items.pop();
  }
  desapilar() { this.Desapilar(); }

  Tope() {
    LoopGuard.tick();
    if (this.PilaVacia()) throw new Error("Precondición violada: Tope() sobre una pila vacía.");
    return this.items[this.items.length - 1];
  }
  tope() { return this.Tope(); }

  PilaVacia() { LoopGuard.tick(); return this.items.length === 0; }
  pilaVacia() { return this.PilaVacia(); }
}

class ColaTDA {
  constructor() { this.items = []; }
  InicializarCola() { this.items = []; }
  inicializarCola() { this.InicializarCola(); }

  Acolar(x) { LoopGuard.tick(); this.items.push(Number(x)); }
  acolar(x) { this.Acolar(x); }

  Desacolar() {
    LoopGuard.tick();
    if (this.ColaVacia()) throw new Error("Precondición violada: Desacolar() sobre una cola vacía.");
    this.items.shift();
  }
  desacolar() { this.Desacolar(); }

  Primero() {
    LoopGuard.tick();
    if (this.ColaVacia()) throw new Error("Precondición violada: Primero() sobre una cola vacía.");
    return this.items[0];
  }
  primero() { return this.Primero(); }

  ColaVacia() { LoopGuard.tick(); return this.items.length === 0; }
  colaVacia() { return this.ColaVacia(); }
}

class ColaPrioridadTDA {
  constructor() { this.items = []; }
  InicializarCola() { this.items = []; }
  inicializarCola() { this.InicializarCola(); }

  AcolarPrioridad(x, prioridad) {
    LoopGuard.tick();
    const val = Number(x);
    const prio = Number(prioridad);
    let j = this.items.length;
    while (j > 0 && this.items[j - 1].prioridad > prio) {
      this.items[j] = this.items[j - 1];
      j--;
    }
    this.items[j] = { valor: val, prioridad: prio };
  }
  acolarPrioridad(x, p) { this.AcolarPrioridad(x, p); }

  Desacolar() {
    LoopGuard.tick();
    if (this.ColaVacia()) throw new Error("Precondición violada: Desacolar() sobre cola con prioridad vacía.");
    this.items.pop();
  }
  desacolar() { this.Desacolar(); }

  Primero() {
    LoopGuard.tick();
    if (this.ColaVacia()) throw new Error("Precondición violada: Primero() sobre cola con prioridad vacía.");
    return this.items[this.items.length - 1].valor;
  }
  primero() { return this.Primero(); }

  Prioridad() {
    LoopGuard.tick();
    if (this.ColaVacia()) throw new Error("Precondición violada: Prioridad() sobre cola con prioridad vacía.");
    return this.items[this.items.length - 1].prioridad;
  }
  prioridad() { return this.Prioridad(); }

  ColaVacia() { LoopGuard.tick(); return this.items.length === 0; }
  colaVacia() { return this.ColaVacia(); }
}

class ConjuntoTDA {
  constructor() { this.items = []; }
  InicializarConjunto() { this.items = []; }
  inicializarConjunto() { this.InicializarConjunto(); }

  Agregar(x) {
    LoopGuard.tick();
    const val = Number(x);
    if (!this.Pertenece(val)) {
      this.items.push(val);
    }
  }
  agregar(x) { this.Agregar(x); }

  Elegir() {
    LoopGuard.tick();
    if (this.ConjuntoVacio()) throw new Error("Precondición violada: Elegir() sobre conjunto vacío.");
    return this.items[this.items.length - 1];
  }
  elegir() { return this.Elegir(); }

  Sacar(x) {
    LoopGuard.tick();
    const val = Number(x);
    const idx = this.items.indexOf(val);
    if (idx !== -1) {
      this.items[idx] = this.items[this.items.length - 1];
      this.items.pop();
    }
  }
  sacar(x) { this.Sacar(x); }

  Pertenece(x) {
    LoopGuard.tick();
    return this.items.includes(Number(x));
  }
  pertenece(x) { return this.Pertenece(x); }

  ConjuntoVacio() { LoopGuard.tick(); return this.items.length === 0; }
  conjuntoVacio() { return this.ConjuntoVacio(); }
}

class DiccionarioSimpleTDA {
  constructor() { this.entries = []; }
  InicializarDiccionario() { this.entries = []; }
  inicializarDiccionario() { this.InicializarDiccionario(); }

  Agregar(clave, valor) {
    LoopGuard.tick();
    const k = Number(clave);
    const v = Number(valor);
    const idx = this.entries.findIndex(e => e.clave === k);
    if (idx === -1) this.entries.push({ clave: k, valor: v });
    else this.entries[idx].valor = v;
  }
  agregar(k, v) { this.Agregar(k, v); }

  Eliminar(clave) {
    LoopGuard.tick();
    const k = Number(clave);
    const idx = this.entries.findIndex(e => e.clave === k);
    if (idx !== -1) {
      this.entries[idx] = this.entries[this.entries.length - 1];
      this.entries.pop();
    }
  }
  eliminar(k) { this.Eliminar(k); }

  Recuperar(clave) {
    LoopGuard.tick();
    const k = Number(clave);
    const found = this.entries.find(e => e.clave === k);
    if (!found) throw new Error(`Precondición violada: Recuperar(${k}) - clave inexistente.`);
    return found.valor;
  }
  recuperar(k) { return this.Recuperar(k); }

  Claves() {
    LoopGuard.tick();
    const c = new ConjuntoTDA();
    c.InicializarConjunto();
    for (const e of this.entries) c.Agregar(e.clave);
    return c;
  }
  claves() { return this.Claves(); }
}

class DiccionarioMultipleTDA {
  constructor() { this.entries = []; }
  InicializarDiccionario() { this.entries = []; }
  inicializarDiccionario() { this.InicializarDiccionario(); }

  Agregar(clave, valor) {
    LoopGuard.tick();
    const k = Number(clave);
    const v = Number(valor);
    let entry = this.entries.find(e => e.clave === k);
    if (!entry) {
      entry = { clave: k, valores: [] };
      this.entries.push(entry);
    }
    if (!entry.valores.includes(v)) entry.valores.push(v);
  }
  agregar(k, v) { this.Agregar(k, v); }

  Eliminar(clave) {
    LoopGuard.tick();
    const k = Number(clave);
    const idx = this.entries.findIndex(e => e.clave === k);
    if (idx !== -1) {
      this.entries[idx] = this.entries[this.entries.length - 1];
      this.entries.pop();
    }
  }
  eliminar(k) { this.Eliminar(k); }

  EliminarValor(clave, valor) {
    LoopGuard.tick();
    const k = Number(clave);
    const v = Number(valor);
    const entry = this.entries.find(e => e.clave === k);
    if (entry) {
      const vIdx = entry.valores.indexOf(v);
      if (vIdx !== -1) {
        entry.valores[vIdx] = entry.valores[entry.valores.length - 1];
        entry.valores.pop();
      }
      if (entry.valores.length === 0) this.Eliminar(k);
    }
  }
  eliminarValor(k, v) { this.EliminarValor(k, v); }

  Recuperar(clave) {
    LoopGuard.tick();
    const k = Number(clave);
    const c = new ConjuntoTDA();
    c.InicializarConjunto();
    const entry = this.entries.find(e => e.clave === k);
    if (entry) for (const v of entry.valores) c.Agregar(v);
    return c;
  }
  recuperar(k) { return this.Recuperar(k); }

  Claves() {
    LoopGuard.tick();
    const c = new ConjuntoTDA();
    c.InicializarConjunto();
    for (const e of this.entries) c.Agregar(e.clave);
    return c;
  }
  claves() { return this.Claves(); }
}

/* ============================================================================
   ABBTDA (TDAABB) - Árbol Binario de Búsqueda Dinámico UADE
   ============================================================================ */
class ABBTDA {
  constructor(rootNode = null) {
    this.raiz = rootNode; // { info, hijoIzq: ABBTDA, hijoDer: ABBTDA }
  }

  InicializarArbol() { this.raiz = null; }
  inicializarArbol() { this.InicializarArbol(); }

  ArbolVacio() { LoopGuard.tick(); return this.raiz === null; }
  arbolVacio() { return this.ArbolVacio(); }

  Raiz() {
    LoopGuard.tick();
    if (this.ArbolVacio()) throw new Error("Precondición violada: Raiz() sobre árbol vacío.");
    return this.raiz.info;
  }
  raizVal() { return this.Raiz(); }

  HijoIzq() {
    LoopGuard.tick();
    if (this.ArbolVacio()) throw new Error("Precondición violada: HijoIzq() sobre árbol vacío.");
    return this.raiz.hijoIzq;
  }
  hijoIzq() { return this.HijoIzq(); }

  HijoDer() {
    LoopGuard.tick();
    if (this.ArbolVacio()) throw new Error("Precondición violada: HijoDer() sobre árbol vacío.");
    return this.raiz.hijoDer;
  }
  hijoDer() { return this.HijoDer(); }

  AgregarElem(x) {
    LoopGuard.tick();
    const val = Number(x);
    if (this.raiz === null) {
      const izq = new ABBTDA(); izq.InicializarArbol();
      const der = new ABBTDA(); der.InicializarArbol();
      this.raiz = { info: val, hijoIzq: izq, hijoDer: der };
    } else if (val < this.raiz.info) {
      this.raiz.hijoIzq.AgregarElem(val);
    } else if (val > this.raiz.info) {
      this.raiz.hijoDer.AgregarElem(val);
    }
  }
  agregarElem(x) { this.AgregarElem(x); }

  _mayor(a) {
    if (a.HijoDer().ArbolVacio()) return a.Raiz();
    return this._mayor(a.HijoDer());
  }

  _menor(a) {
    if (a.HijoIzq().ArbolVacio()) return a.Raiz();
    return this._menor(a.HijoIzq());
  }

  EliminarElem(x) {
    LoopGuard.tick();
    const val = Number(x);
    if (this.raiz === null) return;
    if (this.raiz.info === val && this.raiz.hijoIzq.ArbolVacio() && this.raiz.hijoDer.ArbolVacio()) {
      this.raiz = null;
    } else if (this.raiz.info === val && !this.raiz.hijoIzq.ArbolVacio()) {
      const reemplazo = this._mayor(this.raiz.hijoIzq);
      this.raiz.info = reemplazo;
      this.raiz.hijoIzq.EliminarElem(reemplazo);
    } else if (this.raiz.info === val && this.raiz.hijoIzq.ArbolVacio()) {
      const reemplazo = this._menor(this.raiz.hijoDer);
      this.raiz.info = reemplazo;
      this.raiz.hijoDer.EliminarElem(reemplazo);
    } else if (val > this.raiz.info) {
      this.raiz.hijoDer.EliminarElem(val);
    } else {
      this.raiz.hijoIzq.EliminarElem(val);
    }
  }
  eliminarElem(x) { this.EliminarElem(x); }
}

/* ============================================================================
   GrafoTDA - Grafo Dirigido Ponderado UADE
   ============================================================================ */
class GrafoTDA {
  constructor() {
    this.vertices = []; // lista de vértices (números)
    this.aristas = [];  // { origen, destino, peso }
  }

  InicializarGrafo() { this.vertices = []; this.aristas = []; }
  inicializarGrafo() { this.InicializarGrafo(); }

  AgregarVertice(v) {
    LoopGuard.tick();
    const vert = Number(v);
    if (!this.vertices.includes(vert)) this.vertices.push(vert);
  }
  agregarVertice(v) { this.AgregarVertice(v); }

  EliminarVertice(v) {
    LoopGuard.tick();
    const vert = Number(v);
    this.vertices = this.vertices.filter(x => x !== vert);
    this.aristas = this.aristas.filter(a => a.origen !== vert && a.destino !== vert);
  }
  eliminarVertice(v) { this.EliminarVertice(v); }

  Vertices() {
    LoopGuard.tick();
    const c = new ConjuntoTDA();
    c.InicializarConjunto();
    for (const v of this.vertices) c.Agregar(v);
    return c;
  }
  verticesConj() { return this.Vertices(); }

  AgregarArista(v1, v2, peso) {
    LoopGuard.tick();
    const o = Number(v1), d = Number(v2), p = Number(peso);
    if (!this.vertices.includes(o) || !this.vertices.includes(d)) {
      throw new Error(`Precondición violada: Ambos vértices (${o}, ${d}) deben existir en el grafo.`);
    }
    const existente = this.aristas.find(a => a.origen === o && a.destino === d);
    if (existente) existente.peso = p;
    else this.aristas.push({ origen: o, destino: d, peso: p });
  }
  agregarArista(v1, v2, p) { this.AgregarArista(v1, v2, p); }

  EliminarArista(v1, v2) {
    LoopGuard.tick();
    const o = Number(v1), d = Number(v2);
    this.aristas = this.aristas.filter(a => !(a.origen === o && a.destino === d));
  }
  eliminarArista(v1, v2) { this.EliminarArista(v1, v2); }

  ExisteArista(v1, v2) {
    LoopGuard.tick();
    const o = Number(v1), d = Number(v2);
    return this.aristas.some(a => a.origen === o && a.destino === d);
  }
  existeArista(v1, v2) { return this.ExisteArista(v1, v2); }

  PesoArista(v1, v2) {
    LoopGuard.tick();
    const o = Number(v1), d = Number(v2);
    const a = this.aristas.find(e => e.origen === o && e.destino === d);
    if (!a) throw new Error(`Precondición violada: No existe arista de ${o} hacia ${d}.`);
    return a.peso;
  }
  pesoArista(v1, v2) { return this.PesoArista(v1, v2); }
}

class Nodo {
  constructor(info = 0, sig = null) {
    this.info = info;
    this.sig = sig;
  }
}

// Aliases de implementaciones UADE
const PilaTF = PilaTDA, PilaTI = PilaTDA, PilaTF2 = PilaTDA, PilaLD = PilaTDA;
const ColaPU = ColaTDA, ColaPI = ColaTDA, ColaPU2 = ColaTDA, ColaLD = ColaTDA;
const ColaPrioridadDA = ColaPrioridadTDA, ColaPrioridadAO = ColaPrioridadTDA, ColaPrioridadLD = ColaPrioridadTDA;
const ConjuntoA = ConjuntoTDA, ConjuntoLD = ConjuntoTDA;
const DiccionarioSimpleA = DiccionarioSimpleTDA, DiccionarioSimpleL = DiccionarioSimpleTDA;
const DiccionarioMultipleA = DiccionarioMultipleTDA, DiccionarioMultipleL = DiccionarioMultipleTDA;
const TDAABB = ABBTDA, ABB = ABBTDA;
const GrafoMA = GrafoTDA, GrafoLA = GrafoTDA;
