/* ============================================================================
   Motor Principal de TDA Academy (Tema Dual, Navegación, Visualizadores, Simulador y Arena)
   ============================================================================ */

const MODULES = [
  'mod-mindset', 'mod-pilas', 'mod-colas', 'mod-nodos',
  'mod-conj-dic', 'mod-arboles', 'mod-grafos',
  'mod-costos', 'mod-sandbox', 'mod-simulator', 'mod-arena'
];

let completedModules = new Set(JSON.parse(localStorage.getItem('tda_completed') || '[]'));

/* Theme Management (Polaridad Positiva Papel vs Modo Enfoque Oscuro) */
function initTheme() {
  const saved = localStorage.getItem('tda_theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tda_theme', theme);
  const label = document.getElementById('themeToggleText');
  const icon = document.getElementById('themeToggleIcon');
  const mobIcon = document.getElementById('mobileThemeIcon');
  const svgHtml = theme === 'dark'
    ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
    : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  if (label) label.innerText = theme === 'dark' ? 'Cambiar a Modo Lectura (Claro)' : 'Cambiar a Modo Enfoque (Oscuro)';
  if (icon) icon.innerHTML = svgHtml;
  if (mobIcon) mobIcon.innerHTML = svgHtml;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

function updateProgressUI() {
  MODULES.forEach(id => {
    const btn = document.querySelector(`.nav-item[data-mod="${id}"]`);
    if (btn) {
      if (completedModules.has(id)) btn.classList.add('completed');
      else btn.classList.remove('completed');
    }
  });
  const pct = Math.round((completedModules.size / MODULES.length) * 100);
  const bar = document.getElementById('globalProgressBar');
  const txt = document.getElementById('globalProgressText');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.innerText = `${completedModules.size} de ${MODULES.length} (${pct}%)`;
}

function goModule(modId) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.module-view').forEach(v => v.classList.remove('active'));

  const targetBtn = document.querySelector(`.nav-item[data-mod="${modId}"]`);
  const targetView = document.getElementById(modId);
  if (targetBtn) targetBtn.classList.add('active');
  if (targetView) targetView.classList.add('active');

  toggleSidebar(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (modId === 'mod-arboles') renderABBSvg();
  if (modId === 'mod-grafos') renderGrafo();
  if (modId === 'mod-simulator') initSimulator();
  if (modId === 'mod-arena') initArena();
}

function completeAndNext(currentMod, nextMod) {
  completedModules.add(currentMod);
  localStorage.setItem('tda_completed', JSON.stringify([...completedModules]));
  updateProgressUI();
  if (nextMod) goModule(nextMod);
}

function toggleSidebar(forceClose = false) {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebarBackdrop');
  if (!sb) return;
  const open = forceClose ? false : !sb.classList.contains('open');
  sb.classList.toggle('open', open);
  if (bd) bd.classList.toggle('open', open);
}

/* Code Tabs */
const CODE_TAB_EXPLANATIONS = {
  'code-pilas': [
    '<strong>PilaTDA (Interfaz):</strong> El contrato público oficial de UADE. Solo define métodos (<code>Apilar</code>, <code>Desapilar</code>, <code>Tope</code>, etc.). No contiene arreglos ni código interno.',
    '<strong>PilaTF (Tope al Final · E1):</strong> Estática con arreglo <code>int[] arr</code>. Los datos se guardan hacia adelante. La variable <code>int inx</code> guarda la cantidad de elementos y la próxima casilla libre. El tope está en <code>arr[inx-1]</code>. <strong>Apilar y Desapilar son O(1)</strong>.',
    '<strong>PilaTI (Tope al Inicio · E2):</strong> Estática con arreglo. El tope siempre está clavado en <code>arr[0]</code>. Para insertar o quitar, debe desplazar todo el arreglo a derecha o izquierda. <strong>Apilar y Desapilar son O(n)</strong> (diseño ineficiente de estudio).',
    '<strong>PilaTF2 (Contador en arr[0] · E3):</strong> Estática sin variable <code>inx</code>. Usa la celda <code>arr[0]</code> para guardar el contador de elementos. Los datos se guardan desde <code>arr[1]</code> hasta <code>arr[arr[0]]</code>. <strong>Es O(1)</strong>.',
    '<strong>PilaLD (Lista Dinámica con Nodos):</strong> No usa arreglos fijos. Cada dato está en un <code>Nodo</code> (<code>info</code>, <code>sig</code>). La variable <code>primero</code> apunta al tope. Sin límite de 100 elementos. <strong>Apilar y Desapilar son O(1)</strong>.'
  ],
  'code-colas': [
    '<strong>ColaTDA (Interfaz):</strong> Contrato público de Cola FIFO (First-In, First-Out). Define <code>Acolar</code>, <code>Desacolar</code>, <code>Primero</code>, <code>ColaVacia</code>.',
    '<strong>ColaPU (Primero al Inicio, Último al Final):</strong> <code>arr[0]</code> es el primero. Desacolar corre el arreglo a la izquierda en O(n); Acolar inserta al final en O(1).',
    '<strong>ColaPI (Primero al Final, Último al Inicio):</strong> <code>arr[inx-1]</code> es el primero. Desacolar resta <code>inx--</code> en O(1); Acolar corre a la derecha en O(n).',
    '<strong>ColaLD (Lista Dinámica con Nodos):</strong> Usa dos punteros: <code>primero</code> (para Desacolar en O(1)) y <code>ultimo</code> (para Acolar en O(1)). Ambas operaciones son O(1).'
  ],
  'code-cp': [
    '<strong>ColaPrioridadTDA (Interfaz):</strong> Contrato público de Cola con Prioridad. Quien tiene mayor valor numérico de prioridad sale primero.',
    '<strong>ColaPrioridadDA (Estática con Arreglo Ordenado):</strong> Mantiene dos arreglos sincronizados (elementos y prioridades) ordenados descendentemente. AcolarPrioridad busca la posición en O(n).',
    '<strong>ColaPrioridadLD (Lista Dinámica Ordenada):</strong> Nodos enlazados especiales (<code>info</code>, <code>prioridad</code>, <code>sig</code>) ordenados al insertar en O(n).'
  ]
};

function switchCodeTab(groupId, tabIdx) {
  const container = document.getElementById(groupId);
  if (!container) return;
  const btns = container.querySelectorAll('.code-tab-btn');
  const panels = container.querySelectorAll('.code-panel');
  btns.forEach((b, i) => b.classList.toggle('active', i === tabIdx));
  panels.forEach((p, i) => p.classList.toggle('active', i === tabIdx));

  let explainer = container.querySelector('.tab-explainer-bar');
  if (!explainer && CODE_TAB_EXPLANATIONS[groupId]) {
    explainer = document.createElement('div');
    explainer.className = 'tab-explainer-bar';
    const tabBar = container.querySelector('.code-tab-bar');
    if (tabBar && tabBar.nextSibling) {
      container.insertBefore(explainer, tabBar.nextSibling);
    } else {
      container.prepend(explainer);
    }
  }
  if (explainer && CODE_TAB_EXPLANATIONS[groupId] && CODE_TAB_EXPLANATIONS[groupId][tabIdx]) {
    explainer.innerHTML = CODE_TAB_EXPLANATIONS[groupId][tabIdx];
  }
}

/* Comprehension Quiz Checks */
function answerQuiz(btn, isCorrect, feedbackText) {
  const box = btn.closest('.quiz-box');
  box.querySelectorAll('.quiz-option').forEach(o => {
    o.classList.remove('correct', 'wrong');
  });
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  const fb = box.querySelector('.quiz-feedback');
  fb.style.display = 'block';
  fb.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
  fb.innerHTML = (isCorrect ? '<strong>Correcto.</strong> ' : '<strong>Incorrecto.</strong> ') + feedbackText;
}

/* ============================================================================
   1. DUAL VISUALIZER: PILA (Lógica + Estrategias Estáticas TF/TI/TF2 + Dinámica)
   ============================================================================ */
const dualPila = [1, 3, 5];
let dualPilaGhost = [];
let pilaStrategy = 'TF'; // 'TF' | 'TI' | 'TF2'
let pilaLastOp = null;   // 'push' | 'pop' | 'top' | null

const PILA_LIVE_SNIPPETS = {
  TF: {
    label: 'PilaTF (Tope al Final · arr[inx - 1])',
    lines: [
      { op: 'push', code: 'void Apilar(int x)    { arr[inx] = x; inx++; }   // O(1) guarda al final y sube contador' },
      { op: 'pop',  code: 'void Desapilar()      { inx--; }                   // O(1) baja contador; dato queda residual' },
      { op: 'top',  code: 'int  Tope()           { return arr[inx - 1]; }     // O(1) mira la última celda activa' }
    ]
  },
  TI: {
    label: 'PilaTI (Tope al Inicio · arr[0])',
    lines: [
      { op: 'push', code: 'void Apilar(int x)    { for(i=inx-1; i>=0; i--) arr[i+1]=arr[i]; arr[0]=x; inx++; } // O(n)' },
      { op: 'pop',  code: 'void Desapilar()      { for(i=0; i<inx-1; i++) arr[i]=arr[i+1]; inx--; }           // O(n)' },
      { op: 'top',  code: 'int  Tope()           { return arr[0]; }                                           // O(1)' }
    ]
  },
  TF2: {
    label: 'PilaTF2 (Contador guardado en arr[0])',
    lines: [
      { op: 'push', code: 'void Apilar(int x)    { arr[arr[0] + 1] = x; arr[0]++; } // arr[0] reemplaza a variable inx' },
      { op: 'pop',  code: 'void Desapilar()      { arr[0]--; }                      // decrementa contador en arr[0]' },
      { op: 'top',  code: 'int  Tope()           { return arr[arr[0]]; }            // tope en posición arr[cantidad]' }
    ]
  }
};

function setPilaStrategy(strat) {
  pilaStrategy = strat;
  pilaLastOp = null;
  dualPilaGhost = [];
  document.querySelectorAll('#pilaStratBtns .btn').forEach(b => {
    b.classList.toggle('btn-primary', b.dataset.strat === strat);
    b.classList.toggle('btn-outline', b.dataset.strat !== strat);
  });
  setLog('pilaModLog', `Estrategia cambiada a ${PILA_LIVE_SNIPPETS[strat].label}. Prueba Apilar o Desapilar.`);
  renderDualPila();
}

function renderDualPila() {
  const ids = ['pilaMod', 'sandboxPila'];
  ids.forEach(prefix => {
    const tube = document.getElementById(prefix + 'Tube');
    const arr = document.getElementById(prefix + 'Array');
    const nodes = document.getElementById(prefix + 'Nodes');
    const inxLbl = document.getElementById(prefix + 'Inx');
    const titleLbl = document.getElementById(prefix + 'StratTitle');
    if (!tube || !arr || !nodes) return;

    tube.innerHTML = dualPila.map((v, i) =>
      `<div class="stack-block ${i === dualPila.length - 1 ? 'top-highlight' : ''}">${v}</div>`
    ).join('');

    const activeStrat = prefix === 'pilaMod' ? pilaStrategy : 'TF';
    if (titleLbl) titleLbl.innerText = `Implementación Estática (${PILA_LIVE_SNIPPETS[activeStrat].label})`;

    let cellsHtml = '';
    if (activeStrat === 'TF') {
      if (inxLbl) inxLbl.innerText = `inx = ${dualPila.length}`;
      for (let i = 0; i < 8; i++) {
        if (i < dualPila.length) {
          cellsHtml += `<div class="arr-cell occupied">${dualPila[i]}<span class="arr-idx">[${i}]</span></div>`;
        } else if (dualPilaGhost[i] !== undefined) {
          cellsHtml += `<div class="arr-cell ghost" title="Dato residual fuera de límites (i >= inx)">${dualPilaGhost[i]}<span class="arr-idx">[${i}]</span></div>`;
        } else {
          cellsHtml += `<div class="arr-cell">-<span class="arr-idx">[${i}]</span></div>`;
        }
      }
    } else if (activeStrat === 'TI') {
      if (inxLbl) inxLbl.innerText = `inx = ${dualPila.length} (tope en [0])`;
      const rev = [...dualPila].reverse();
      for (let i = 0; i < 8; i++) {
        if (i < rev.length) {
          cellsHtml += `<div class="arr-cell occupied">${rev[i]}<span class="arr-idx">${i === 0 ? '[0] TOP' : `[${i}]`}</span></div>`;
        } else {
          cellsHtml += `<div class="arr-cell">-<span class="arr-idx">[${i}]</span></div>`;
        }
      }
    } else {
      if (inxLbl) inxLbl.innerText = `arr[0] = ${dualPila.length} (sin variable inx)`;
      cellsHtml += `<div class="arr-cell counter-cell" title="Celda reservada: guarda la cantidad de elementos">${dualPila.length}<span class="arr-idx">[0] cnt</span></div>`;
      for (let i = 1; i < 8; i++) {
        const dataIdx = i - 1;
        if (dataIdx < dualPila.length) {
          cellsHtml += `<div class="arr-cell occupied">${dualPila[dataIdx]}<span class="arr-idx">[${i}]</span></div>`;
        } else if (dualPilaGhost[dataIdx] !== undefined) {
          cellsHtml += `<div class="arr-cell ghost">${dualPilaGhost[dataIdx]}<span class="arr-idx">[${i}]</span></div>`;
        } else {
          cellsHtml += `<div class="arr-cell">-<span class="arr-idx">[${i}]</span></div>`;
        }
      }
    }
    arr.innerHTML = cellsHtml;

    if (dualPila.length === 0) {
      nodes.innerHTML = `<span class="node-ptr-label">primero</span> <span class="node-arrow">→</span> <span class="node-null">null</span>`;
    } else {
      let nHtml = `<span class="node-ptr-label">primero</span> <span class="node-arrow">→</span> `;
      for (let i = dualPila.length - 1; i >= 0; i--) {
        nHtml += `<div class="node-box ${i === dualPila.length - 1 ? 'active-node' : ''}"><span class="node-info">${dualPila[i]}</span><span class="node-sig">sig</span></div> <span class="node-arrow">→</span> `;
      }
      nHtml += `<span class="node-null">null</span>`;
      nodes.innerHTML = nHtml;
    }
  });

  const liveBox = document.getElementById('pilaLiveCodeBox');
  if (liveBox && typeof highlightCodeHtml === 'function') {
    const spec = PILA_LIVE_SNIPPETS[pilaStrategy];
    liveBox.innerHTML = spec.lines.map(l =>
      `<span class="mini-code-step ${pilaLastOp === l.op ? 'active' : ''}">${highlightCodeHtml(l.code)}</span>`
    ).join('');
  }
}

function dualPilaApilar(inputId, logId) {
  const inp = document.getElementById(inputId);
  const val = Number(inp ? inp.value : 7);
  if (isNaN(val)) return;
  const maxLen = pilaStrategy === 'TF2' && inputId === 'pilaModInput' ? 7 : 8;
  if (dualPila.length >= maxLen) {
    setLog(logId, `Límite visual de ${maxLen} elementos alcanzado en la demo.`);
    return;
  }
  dualPila.push(val);
  dualPilaGhost[dualPila.length - 1] = undefined;
  pilaLastOp = 'push';
  if (inputId === 'pilaModInput' && pilaStrategy === 'TI') {
    setLog(logId, `Apilar(${val}) [PilaTI]: Corrió los ${dualPila.length - 1} elementos a la derecha y colocó ${val} en arr[0]; inx=${dualPila.length}.`);
  } else if (inputId === 'pilaModInput' && pilaStrategy === 'TF2') {
    setLog(logId, `Apilar(${val}) [PilaTF2]: Guardó ${val} en arr[arr[0]+1] = arr[${dualPila.length}] e incrementó arr[0] a ${dualPila.length}.`);
  } else {
    setLog(logId, `Apilar(${val}) [PilaTF]: arr[${dualPila.length - 1}] = ${val}; inx=${dualPila.length}. Dinámica nuevo.sig = primero; primero = nuevo.`);
  }
  renderDualPila();
}

function dualPilaDesapilar(logId) {
  if (dualPila.length === 0) {
    setLog(logId, "Error: Precondición violada (Pila vacía).");
    return;
  }
  const popped = dualPila.pop();
  dualPilaGhost[dualPila.length] = popped;
  pilaLastOp = 'pop';
  if (logId === 'pilaModLog' && pilaStrategy === 'TI') {
    setLog(logId, `Desapilar() [PilaTI]: Quitó ${popped} de arr[0] y desplazó el resto a la izquierda (costo O(n)).`);
  } else if (logId === 'pilaModLog' && pilaStrategy === 'TF2') {
    setLog(logId, `Desapilar() [PilaTF2]: Decrementó arr[0] a ${dualPila.length}. El ${popped} en arr[${dualPila.length + 1}] queda ignorado como basura.`);
  } else {
    setLog(logId, `Desapilar() [PilaTF]: Quitó ${popped}. En el arreglo estático queda residual (i >= inx); solo decrementó inx--.`);
  }
  renderDualPila();
}

function dualPilaTope(logId) {
  if (dualPila.length === 0) {
    setLog(logId, "Error: Pila vacía, no existe Tope().");
    return;
  }
  pilaLastOp = 'top';
  const topVal = dualPila[dualPila.length - 1];
  if (logId === 'pilaModLog' && pilaStrategy === 'TI') {
    setLog(logId, `Tope() [PilaTI] = ${topVal} (arr[0]).`);
  } else if (logId === 'pilaModLog' && pilaStrategy === 'TF2') {
    setLog(logId, `Tope() [PilaTF2] = ${topVal} (arr[arr[0]] = arr[${dualPila.length}]).`);
  } else {
    setLog(logId, `Tope() [PilaTF] = ${topVal} (arr[inx - 1] / primero.info). Operación de solo lectura.`);
  }
  renderDualPila();
}

/* ============================================================================
   2. DUAL VISUALIZER: COLA (Lógica + Estática + Dinámica primero/ultimo)
   ============================================================================ */
const dualCola = [1, 3, 5];

function renderDualCola() {
  const ids = ['colaMod', 'sandboxCola'];
  ids.forEach(prefix => {
    const track = document.getElementById(prefix + 'Track');
    const arr = document.getElementById(prefix + 'Array');
    const nodes = document.getElementById(prefix + 'Nodes');
    const inxLbl = document.getElementById(prefix + 'Inx');
    if (!track || !arr || !nodes) return;

    track.innerHTML = dualCola.map((v, i) =>
      `<div class="queue-block ${i === 0 ? 'first-highlight' : ''}">${v}</div>`
    ).join('');

    if (inxLbl) inxLbl.innerText = `inx = ${dualCola.length} (ColaPU)`;
    let cells = '';
    const rev = [...dualCola].reverse();
    for (let i = 0; i < 8; i++) {
      if (i < rev.length) {
        cells += `<div class="arr-cell occupied">${rev[i]}<span class="arr-idx">[${i}]</span></div>`;
      } else {
        cells += `<div class="arr-cell">-<span class="arr-idx">[${i}]</span></div>`;
      }
    }
    arr.innerHTML = cells;

    if (dualCola.length === 0) {
      nodes.innerHTML = `<span class="node-ptr-label">primero</span> <span class="node-ptr-label">ultimo</span> <span class="node-arrow">→</span> <span class="node-null">null</span>`;
    } else {
      let nHtml = `<span class="node-ptr-label">primero</span> <span class="node-arrow">→</span> `;
      dualCola.forEach((v, idx) => {
        const isLast = idx === dualCola.length - 1;
        nHtml += `<div class="node-box ${idx === 0 || isLast ? 'active-node' : ''}"><span class="node-info">${v}</span><span class="node-sig">sig</span></div>`;
        if (isLast) nHtml += ` <span class="node-ptr-label" style="margin-left:2px;">← ultimo</span>`;
        nHtml += ` <span class="node-arrow">→</span> `;
      });
      nHtml += `<span class="node-null">null</span>`;
      nodes.innerHTML = nHtml;
    }
  });
}

function dualColaAcolar(inputId, logId) {
  const inp = document.getElementById(inputId);
  const val = Number(inp ? inp.value : 7);
  if (isNaN(val)) return;
  if (dualCola.length >= 8) {
    setLog(logId, "Límite visual de 8 elementos alcanzado.");
    return;
  }
  dualCola.push(val);
  setLog(logId, `Acolar(${val}): ColaPU desplaza el arreglo a la derecha y guarda ${val} en arr[0]. ColaLD enlaza ultimo.sig = nuevo en O(1).`);
  renderDualCola();
}

function dualColaDesacolar(logId) {
  if (dualCola.length === 0) {
    setLog(logId, "Error: Precondición violada (Cola vacía).");
    return;
  }
  const rem = dualCola.shift();
  setLog(logId, `Desacolar(): Quitó ${rem} del frente. ColaLD avanza primero = primero.sig (si queda null, ultimo = null).`);
  renderDualCola();
}

function dualColaPrimero(logId) {
  if (dualCola.length === 0) setLog(logId, "Error: Cola vacía, no existe Primero().");
  else setLog(logId, `Primero() = ${dualCola[0]} (arr[inx-1] en ColaPU / primero.info en ColaLD).`);
}

function transferPilaToCola(logId) {
  if (dualPila.length === 0) return setLog(logId, "Pila vacía: nada para transferir.");
  const v = dualPila.pop();
  dualPilaGhost[dualPila.length] = v;
  dualCola.push(v);
  setLog(logId, `Pasaje: c.Acolar(p.Tope()); p.Desapilar(); → Elemento ${v} transferido.`);
  renderDualPila();
  renderDualCola();
}

function transferColaToPila(logId) {
  if (dualCola.length === 0) return setLog(logId, "Cola vacía: nada para transferir.");
  if (dualPila.length >= 8) return setLog(logId, "Límite visual alcanzado en Pila.");
  const v = dualCola.shift();
  dualPila.push(v);
  dualPilaGhost[dualPila.length - 1] = undefined;
  setLog(logId, `Pasaje: p.Apilar(c.Primero()); c.Desacolar(); → Elemento ${v} transferido.`);
  renderDualPila();
  renderDualCola();
}

/* ============================================================================
   3. LINKED LIST NODE VISUALIZER (Módulo 3)
   ============================================================================ */
let linkedList = [1, 3, 5, 7];

function renderLinkedList(highlightVal = null, deletedIdx = -1) {
  const container = document.getElementById('nodoVizRow');
  if (!container) return;
  if (linkedList.length === 0) {
    container.innerHTML = `<span class="node-ptr-label">origen (u)</span> <span class="node-arrow">→</span> <span class="node-null">null</span>`;
    return;
  }
  let html = `<span class="node-ptr-label">origen (u)</span> <span class="node-arrow">→</span> `;
  linkedList.forEach((v, i) => {
    const cls = v === highlightVal ? 'active-node' : (i === deletedIdx ? 'deleted-node' : '');
    html += `<div class="node-box ${cls}"><span class="node-info">${v}</span><span class="node-sig">sig</span></div> <span class="node-arrow">→</span> `;
  });
  html += `<span class="node-null">null</span>`;
  container.innerHTML = html;
}

function nodoAgregarInicio() {
  const val = Number(document.getElementById('nodoInputVal').value);
  if (isNaN(val)) return;
  linkedList.unshift(val);
  setLog('nodoLog', `AgregarInicio(${val}): nuevo.sig = u; u = nuevo; → Costo O(1) sin recorrer la lista.`);
  renderLinkedList(val);
}

function nodoAgregarFinal() {
  const val = Number(document.getElementById('nodoInputVal').value);
  if (isNaN(val)) return;
  const steps = linkedList.length;
  linkedList.push(val);
  setLog('nodoLog', `AgregarFinal(${val}): Recorrió ${steps} nodos con while (aux.sig != null) hasta hallar el último, luego aux.sig = nuevo. Costo O(n).`);
  renderLinkedList(val);
}

function nodoAgregarOrdenado() {
  const val = Number(document.getElementById('nodoInputVal').value);
  if (isNaN(val)) return;
  let pos = 0;
  while (pos < linkedList.length && linkedList[pos] < val) pos++;
  linkedList.splice(pos, 0, val);
  setLog('nodoLog', pos === 0
    ? `AgregarOrdenado(${val}): Como es menor que u.info (o lista vacía), insertó al inicio (caso especial).`
    : `AgregarOrdenado(${val}): Avanzó con while (aux.sig != null && aux.sig.info < ${val}) hasta posarse en ${linkedList[pos - 1]}, luego nuevo.sig = aux.sig; aux.sig = nuevo.`);
  renderLinkedList(val);
}

function nodoEliminar() {
  const val = Number(document.getElementById('nodoInputVal').value);
  if (isNaN(val)) return;
  const idx = linkedList.indexOf(val);
  if (idx === -1) {
    setLog('nodoLog', `Eliminar(${val}): aux llegó a null. El nodo ${val} no existe en la lista.`);
    renderLinkedList();
    return;
  }
  if (idx === 0) {
    linkedList.shift();
    setLog('nodoLog', `Eliminar(${val}): Caso especial (origen 'u'). Se actualizó u = u.sig. El nodo ${val} queda sin referencia.`);
  } else {
    const prev = linkedList[idx - 1];
    linkedList.splice(idx, 1);
    setLog('nodoLog', `Eliminar(${val}): Se detuvo en el anterior (${prev}) evaluando aux.sig.info == ${val}, y lo circunvaló: aux.sig = aux.sig.sig.`);
  }
  renderLinkedList();
}

/* ============================================================================
   4. SANDBOX COLA PRIORIDAD & CONJUNTO
   ============================================================================ */
const sandboxCP = new ColaPrioridadTDA();
sandboxCP.InicializarCola();
sandboxCP.AcolarPrioridad(4, 7);
sandboxCP.AcolarPrioridad(7, 2);
sandboxCP.AcolarPrioridad(2, 8);

function renderSandboxCP() {
  const cont = document.getElementById('sandboxCPVisual');
  if (!cont) return;
  const desc = [...sandboxCP.items].reverse();
  cont.innerHTML = desc.map((e, i) =>
    `<div class="queue-block ${i === 0 ? 'first-highlight' : ''}" style="background:var(--prio); flex-direction:column; height:54px; padding:4px 9px;">
      <span style="font-size:0.9rem;">${e.valor}</span>
      <span style="font-size:0.62rem; opacity:0.9;">P:${e.prioridad}</span>
    </div>`
  ).join('');
}

function cpAcolar() {
  const v = Number(document.getElementById('cpValInput').value);
  const p = Number(document.getElementById('cpPrioInput').value);
  if (isNaN(v) || isNaN(p)) return;
  sandboxCP.AcolarPrioridad(v, p);
  setLog('cpLog', `AcolarPrioridad(${v}, ${p}): Ubicado según prioridad. Primero() = ${sandboxCP.Primero()} (Prioridad = ${sandboxCP.Prioridad()}).`);
  renderSandboxCP();
}

function cpDesacolar() {
  if (sandboxCP.ColaVacia()) return setLog('cpLog', "Error: Cola con prioridad vacía.");
  const val = sandboxCP.Primero();
  const pr = sandboxCP.Prioridad();
  sandboxCP.Desacolar();
  setLog('cpLog', `Desacolar(): Salió el elemento más prioritario (valor=${val}, prio=${pr}).`);
  renderSandboxCP();
}

const sandboxConj = new ConjuntoTDA();
sandboxConj.InicializarConjunto();
[7, 5, 1, 9].forEach(x => sandboxConj.Agregar(x));

function renderSandboxConj() {
  const cont = document.getElementById('sandboxConjVisual');
  if (!cont) return;
  cont.innerHTML = sandboxConj.items.map(v =>
    `<div style="width:40px;height:40px;border-radius:50%;background:var(--conj);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-family:'JetBrains Mono',monospace;font-size:0.88rem;">${v}</div>`
  ).join('');
}

function conjAgregar() {
  const v = Number(document.getElementById('conjInput').value);
  if (isNaN(v)) return;
  const existed = sandboxConj.Pertenece(v);
  sandboxConj.Agregar(v);
  setLog('conjLog', existed
    ? `Agregar(${v}): Elemento repetido detectado por Pertenece(${v}); no se duplicó.`
    : `Agregar(${v}): Agregado al conjunto.`);
  renderSandboxConj();
}

function conjSacar() {
  const v = Number(document.getElementById('conjInput').value);
  if (isNaN(v)) return;
  const existed = sandboxConj.Pertenece(v);
  sandboxConj.Sacar(v);
  setLog('conjLog', existed
    ? `Sacar(${v}): Eliminado (en ConjuntoA se sobreescribe con a[cant - 1] y cant--).`
    : `Sacar(${v}): El elemento no pertenecía al conjunto.`);
  renderSandboxConj();
}

/* ============================================================================
   5. STEP-BY-STEP SIMULATOR
   ============================================================================ */
let activeSimKey = 'invertirCola';
let activeSimSteps = [];
let activeSimIdx = 0;

function initSimulator() {
  const sel = document.getElementById('simSelect');
  if (sel) activeSimKey = sel.value;
  const sim = SIMULATIONS[activeSimKey];
  const codeBox = document.getElementById('simCodeContainer');
  codeBox.innerHTML = sim.code.map((line, i) =>
    `<span class="sim-code-line" id="sim-line-${i}">${highlightCodeHtml(line)}</span>`
  ).join('');
  activeSimSteps = sim.buildSteps();
  activeSimIdx = 0;
  renderSimStep();
}

function renderSimStep() {
  const step = activeSimSteps[activeSimIdx];
  document.querySelectorAll('.sim-code-line').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById('sim-line-' + step.line);
  if (activeEl) activeEl.classList.add('active');

  document.getElementById('simExpBox').innerHTML = `<strong>Paso ${activeSimIdx + 1} de ${activeSimSteps.length}:</strong> ${step.exp}`;

  renderSimStruct('simS1Label', 'simS1Box', step.l1, step.t1, step.d1);
  renderSimStruct('simS2Label', 'simS2Box', step.l2, step.t2, step.d2);

  const s3Wrap = document.getElementById('simS3Wrap');
  if (step.l3) {
    s3Wrap.style.display = 'block';
    renderSimStruct('simS3Label', 'simS3Box', step.l3, step.t3, step.d3);
  } else {
    s3Wrap.style.display = 'none';
  }
}

function renderSimStruct(lblId, boxId, label, type, data) {
  document.getElementById(lblId).innerText = label;
  const box = document.getElementById(boxId);
  if (type === 'stack') {
    box.className = 'stack-tube';
    box.style.margin = '0 auto';
    box.innerHTML = data.map((v, i) => `<div class="stack-block ${i === data.length - 1 ? 'top-highlight' : ''}">${v}</div>`).join('');
  } else if (type === 'queue') {
    box.className = 'queue-track';
    box.innerHTML = data.map((v, i) => `<div class="queue-block ${i === 0 ? 'first-highlight' : ''}">${v}</div>`).join('');
  } else if (type === 'set') {
    box.className = 'nodes-row';
    box.style.justifyContent = 'center';
    box.style.padding = '0.85rem';
    box.innerHTML = data.map(v => `<div style="width:36px;height:36px;border-radius:50%;background:var(--conj);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-family:'JetBrains Mono',monospace;">${v}</div>`).join('');
  }
}

function simNext() {
  if (activeSimIdx < activeSimSteps.length - 1) {
    activeSimIdx++;
    renderSimStep();
  }
}
function simPrev() {
  if (activeSimIdx > 0) {
    activeSimIdx--;
    renderSimStep();
  }
}

/* ============================================================================
   6. ARENA INITIALIZATION & RUNNER
   ============================================================================ */
let arenaInited = false;

function initArena() {
  loadArenaExercise();
  if (!arenaInited) {
    renderTheoryQuestions();
    arenaInited = true;
  }
}

function loadArenaExercise() {
  const key = document.getElementById('arenaSelect').value;
  const ex = EXERCISES[key];
  document.getElementById('arenaLevelBadge').innerText = ex.level;
  document.getElementById('arenaDesc').innerHTML = ex.desc;
  setHighlightedEditorValue('arenaEditor', ex.starter);
  document.getElementById('arenaHintBox').style.display = 'none';
  document.getElementById('arenaHintBox').innerHTML = `<strong>Pista lógica:</strong> ${ex.hint}`;
  document.getElementById('arenaSolBox').style.display = 'none';
  document.getElementById('arenaSolBox').querySelector('pre').innerHTML = highlightCodeHtml(ex.solution);
  document.getElementById('arenaResults').innerHTML = `
    <div style="color:var(--text-muted);text-align:center;padding:2rem;border:1px dashed var(--border-strong);border-radius:8px;font-size:0.86rem;">
      Escribe tu código y presiona <strong>Ejecutar Tests de Evaluación</strong> para validar lógica y preservación de parámetros.
    </div>`;
}

function toggleArenaHint() {
  const b = document.getElementById('arenaHintBox');
  b.style.display = b.style.display === 'none' ? 'block' : 'none';
}

function toggleArenaSol() {
  const b = document.getElementById('arenaSolBox');
  b.style.display = b.style.display === 'none' ? 'block' : 'none';
}

const solvedChallenges = new Set(JSON.parse(localStorage.getItem('tda_solved_challenges') || '[]'));
const challengeDrafts = {};

function toggleArenaExamMode() {
  const btn = document.getElementById('arenaExamBtn');
  const aids = document.querySelectorAll('.arena-aid-btn');
  const active = btn && btn.dataset.active === '1';
  if (btn) {
    btn.dataset.active = active ? '0' : '1';
    btn.classList.toggle('btn-primary', !active);
    btn.classList.toggle('btn-outline', active);
    btn.innerText = active ? 'Modo Examen (Ocultar Ayudas)' : 'Modo Examen Activo ✓';
  }
  aids.forEach(b => { b.style.display = active ? 'inline-flex' : 'none'; });
  if (!active) {
    document.getElementById('arenaHintBox').style.display = 'none';
    document.getElementById('arenaSolBox').style.display = 'none';
  }
}

/** Shared helper to format test execution results & optional System.out output. */
function renderTestSuiteHtml(out, passMsg, failMsg, compact = false) {
  if (out.syntaxError) {
    return `<div class="test-card fail"><strong>Error de Compilación / Sintaxis:</strong><br><code>${escapeHtml(out.syntaxError)}</code></div>`;
  }
  let html = `<div style="margin-bottom:${compact ? '0.5rem' : '0.75rem'};font-weight:700;font-size:${compact ? '0.84rem' : '0.9rem'};color:${out.allPassed ? 'var(--success)' : 'var(--danger)'};">
    ${out.allPassed ? passMsg : failMsg}
  </div>`;
  html += out.results.map(r => `
    <div class="test-card ${r.passed ? 'pass' : 'fail'}" ${compact ? 'style="padding:0.5rem 0.7rem;margin-bottom:0.4rem;"' : ''}>
      <div style="font-weight:700;font-size:${compact ? '0.8rem' : '0.86rem'};color:${r.passed ? 'var(--success)' : 'var(--danger)'};">
        ${r.passed ? '[PASS]' : '[FAIL]'} ${escapeHtml(r.desc)}
      </div>
      <div style="font-size:${compact ? '0.75rem' : '0.78rem'};color:var(--text-muted);font-family:'JetBrains Mono',monospace;margin-top:3px;">
        Esperado: <strong>${escapeHtml(r.expected)}</strong> &nbsp;|&nbsp; Obtenido: <strong>${escapeHtml(r.actual)}</strong>
      </div>
      ${r.errorMsg ? `<div style="color:var(--danger);font-size:0.78rem;margin-top:4px;">${escapeHtml(r.errorMsg)}</div>` : ''}
    </div>
  `).join('');
  if (out.stdout) {
    html += `<div class="console-output" style="margin-top:0.55rem;"><strong>Consola (System.out):</strong>\n${escapeHtml(out.stdout)}</div>`;
  }
  return html;
}

function runArena() {
  const key = document.getElementById('arenaSelect').value;
  const code = document.getElementById('arenaEditor').value;
  const out = executeUserTests(key, code);
  const cont = document.getElementById('arenaResults');
  if (out.allPassed) {
    solvedChallenges.add('arena:' + key);
    localStorage.setItem('tda_solved_challenges', JSON.stringify([...solvedChallenges]));
  }
  cont.innerHTML = renderTestSuiteHtml(
    out,
    'TODOS LOS TESTS SUPERADOS (Lógica y Preservación Verificadas)',
    'Algunos tests fallaron. Revisa el detalle:',
    false
  );
}

function renderTheoryQuestions() {
  const cont = document.getElementById('theoryQuestionsContainer');
  if (!cont) return;
  cont.innerHTML = THEORY_QUESTIONS.map((item, idx) => `
    <div class="card" style="margin-bottom:1rem;">
      <div style="font-weight:700;color:var(--text-main);margin-bottom:0.65rem;">Pregunta ${idx + 1}: ${item.q}</div>
      <button class="btn btn-outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;" onclick="toggleTheoryAnswer(${idx})">Ver Respuesta Modelo de Parcial</button>
      <div id="theory-ans-${idx}" class="callout callout-tip" style="display:none;margin-top:0.85rem;">${item.answer}</div>
    </div>
  `).join('');
}

function toggleTheoryAnswer(idx) {
  const el = document.getElementById(`theory-ans-${idx}`);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

/* Helpers */
function setLog(id, msg) {
  const el = document.getElementById(id);
  if (el) el.innerText = msg;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ============================================================================
   6. EJERCICIOS INTEGRADOS EN MÓDULOS (Traza de Código y Práctica en Vivo)
   ============================================================================ */

/** Marks a code-reading / trace exercise option inside a module and displays feedback. */
function checkTraceExercise(btn, isCorrect, feedbackText) {
  const card = btn.closest('.practice-card') || btn.closest('.quiz-box');
  if (!card) return;
  card.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('correct', 'wrong'));
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  const fb = card.querySelector('.trace-feedback') || card.querySelector('.quiz-feedback');
  if (!fb) return;
  fb.style.display = 'block';
  fb.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
  fb.innerHTML = (isCorrect ? '<strong>Traza correcta.</strong> ' : '<strong>Revisa la traza.</strong> ') + feedbackText;
}

/** Compiles and validates a live inline micro-challenge using compileAndRunSuite. */
function runInlinePractice(key, editorId, outId) {
  const ex = INLINE_EXERCISES[key];
  const editor = document.getElementById(editorId);
  const outEl = document.getElementById(outId);
  if (!ex || !editor || !outEl) return;

  const res = compileAndRunSuite(ex.fnName, ex.tests, editor.value);
  outEl.style.display = 'block';
  outEl.innerHTML = renderTestSuiteHtml(res, 'Todos los casos superados.', 'Revisa los casos fallidos:', true);
  return res;
}

/** Mounts multi-challenge interactive Java coding widgets inside lesson modules. */
function mountCodingWidgets() {
  document.querySelectorAll('.coding-widget-mount').forEach((mount, idx) => {
    const keys = (mount.dataset.challenges || '').split(',').map(s => s.trim()).filter(Boolean);
    if (keys.length === 0) return;
    if (!mount.id) mount.id = `codingMount_${idx}`;
    const firstKey = keys[0];
    mount.dataset.activeKey = firstKey;
    mount.dataset.examMode = '0';

    mount.innerHTML = `
      <div class="practice-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.55rem;">
          <span class="practice-tag" id="${mount.id}_tag" style="margin-bottom:0;">Java UADE</span>
          <button class="btn btn-outline" id="${mount.id}_examBtn" style="font-size:0.74rem;padding:0.25rem 0.6rem;" onclick="toggleWidgetExamMode('${mount.id}')">Modo Examen (Sin Pistas)</button>
        </div>
        ${keys.length > 1 ? `<div id="${mount.id}_tabs" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.65rem;"></div>` : ''}
        <p id="${mount.id}_desc" style="font-size:0.86rem;margin-bottom:0.45rem;"></p>
        <textarea id="${mount.id}_editor" class="inline-editor" spellcheck="false"></textarea>
        <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">
          <button class="btn btn-success" onclick="runWidgetChallenge('${mount.id}')">Validar Código</button>
          <button class="btn btn-outline" onclick="resetWidgetChallenge('${mount.id}')">Restablecer</button>
          <button class="btn btn-outline" id="${mount.id}_hintBtn" onclick="toggleInlineBox('${mount.id}_hint')">Pista</button>
          <button class="btn btn-outline" id="${mount.id}_solBtn" onclick="toggleInlineBox('${mount.id}_sol')">Solución Java</button>
        </div>
        <div id="${mount.id}_hint" class="callout callout-info" style="display:none;margin-top:0.65rem;"></div>
        <div id="${mount.id}_sol" class="code-panel active" style="display:none;margin-top:0.65rem;border-radius:6px;"><pre style="margin:0;"></pre></div>
        <div id="${mount.id}_out" class="inline-test-out" style="display:none;"></div>
      </div>`;

    mount._challengeKeys = keys;
    renderWidgetChallenge(mount.id, firstKey);
  });
}

function renderWidgetTabs(mount) {
  const tabsEl = document.getElementById(`${mount.id}_tabs`);
  if (!tabsEl || !mount._challengeKeys) return;
  const active = mount.dataset.activeKey;
  tabsEl.innerHTML = mount._challengeKeys.map(k => {
    const ex = INLINE_EXERCISES[k];
    const done = solvedChallenges.has(k);
    return `<button class="btn ${k === active ? 'btn-primary' : 'btn-outline'}" style="font-size:0.76rem;padding:0.3rem 0.65rem;" onclick="selectWidgetChallenge('${mount.id}','${k}')">${escapeHtml(ex.title)}${done ? ' ✓' : ''}</button>`;
  }).join('');
}

function selectWidgetChallenge(mountId, key) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const ed = document.getElementById(`${mountId}_editor`);
  if (ed && mount.dataset.activeKey) {
    challengeDrafts[mount.dataset.activeKey] = ed.value;
  }
  renderWidgetChallenge(mountId, key);
}

function renderWidgetChallenge(mountId, key) {
  const mount = document.getElementById(mountId);
  const ex = INLINE_EXERCISES[key];
  if (!mount || !ex) return;

  mount.dataset.activeKey = key;
  document.getElementById(`${mountId}_tag`).innerText = ex.tag;
  document.getElementById(`${mountId}_desc`).innerHTML = ex.desc;
  document.getElementById(`${mountId}_hint`).innerHTML = ex.hint;
  document.getElementById(`${mountId}_hint`).style.display = 'none';
  document.getElementById(`${mountId}_sol`).style.display = 'none';
  const solPre = document.getElementById(`${mountId}_sol`).querySelector('pre');
  if (solPre) solPre.innerHTML = highlightCodeHtml(ex.solution);

  const outEl = document.getElementById(`${mountId}_out`);
  outEl.style.display = 'none';
  outEl.innerHTML = '';

  const draft = challengeDrafts[key] !== undefined ? challengeDrafts[key] : ex.starter;
  const ed = document.getElementById(`${mountId}_editor`);
  if (ed) {
    if (ed._backdropEl) setHighlightedEditorValue(`${mountId}_editor`, draft);
    else ed.value = draft;
  }
  renderWidgetTabs(mount);
}

function resetWidgetChallenge(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const key = mount.dataset.activeKey;
  const ex = INLINE_EXERCISES[key];
  delete challengeDrafts[key];
  setHighlightedEditorValue(`${mountId}_editor`, ex.starter);
  const outEl = document.getElementById(`${mountId}_out`);
  outEl.style.display = 'none';
}

function toggleWidgetExamMode(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const active = mount.dataset.examMode === '1';
  mount.dataset.examMode = active ? '0' : '1';
  const btn = document.getElementById(`${mountId}_examBtn`);
  if (btn) {
    btn.classList.toggle('btn-primary', !active);
    btn.classList.toggle('btn-outline', active);
    btn.innerText = active ? 'Modo Examen (Sin Pistas)' : 'Modo Examen Activo ✓';
  }
  ['hintBtn', 'solBtn'].forEach(sfx => {
    const b = document.getElementById(`${mountId}_${sfx}`);
    if (b) b.style.display = active ? 'inline-flex' : 'none';
  });
  if (!active) {
    document.getElementById(`${mountId}_hint`).style.display = 'none';
    document.getElementById(`${mountId}_sol`).style.display = 'none';
  }
}

function runWidgetChallenge(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const key = mount.dataset.activeKey;
  const ed = document.getElementById(`${mountId}_editor`);
  challengeDrafts[key] = ed.value;
  const res = runInlinePractice(key, `${mountId}_editor`, `${mountId}_out`);
  if (res && res.allPassed) {
    solvedChallenges.add(key);
    localStorage.setItem('tda_solved_challenges', JSON.stringify([...solvedChallenges]));
    renderWidgetTabs(mount);
  }
}

function toggleInlineBox(boxId) {
  const el = document.getElementById(boxId);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

/* ============================================================================
   7. VISUALIZADOR SVG DE ÁRBOL BINARIO DE BÚSQUEDA (ABBTDA / TDAABB)
   ============================================================================ */
const abbViz = new ABBTDA();
let abbTraversalTimer = null;
let abbVisitedSet = new Set();

function abbStopAnim() {
  if (abbTraversalTimer) {
    clearInterval(abbTraversalTimer);
    abbTraversalTimer = null;
  }
  abbVisitedSet.clear();
}

function abbLoadPreset(preset) {
  abbStopAnim();
  abbViz.InicializarArbol();
  const presets = {
    balanced: [40, 20, 60, 10, 30, 50, 70],
    strict: [40, 20, 60, 10, 30],
    degenerate: [10, 20, 30, 40, 50],
    avlSample: [50, 30, 70, 20, 40, 35],
    clear: []
  };
  (presets[preset] || []).forEach(v => abbViz.AgregarElem(v));
  renderABBSvg();
  setLog('abbLog', preset === 'clear'
    ? 'InicializarArbol(): Árbol vacío.'
    : `Preset "${preset}" cargado (${presets[preset].join(', ')}).`);
}

function abbGetStats(tree) {
  if (!tree || tree.ArbolVacio()) {
    return { count: 0, levels: 0, leaves: 0, strict: true, full: true, complete: true, degenerate: false, avl: true };
  }
  let count = 0;
  let leaves = 0;
  let strict = true;
  let maxOneChild = true;
  let avl = true;

  function inspect(t) {
    if (!t || t.ArbolVacio()) return 0;
    count++;
    const izq = t.HijoIzq();
    const der = t.HijoDer();
    const hasL = !izq.ArbolVacio();
    const hasR = !der.ArbolVacio();
    if (!hasL && !hasR) leaves++;
    if (hasL !== hasR) strict = false;
    if (hasL && hasR) maxOneChild = false;
    const hL = inspect(izq);
    const hR = inspect(der);
    if (Math.abs(hL - hR) > 1) avl = false;
    return 1 + Math.max(hL, hR);
  }

  const levels = inspect(tree);
  const full = count === (Math.pow(2, levels) - 1);
  const degenerate = count > 1 && maxOneChild;

  // Complete binary tree check via BFS index gap detection
  let complete = true;
  const queue = [tree];
  let seenNull = false;
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr || curr.ArbolVacio()) {
      seenNull = true;
    } else {
      if (seenNull) { complete = false; break; }
      queue.push(curr.HijoIzq());
      queue.push(curr.HijoDer());
    }
  }

  return { count, levels, leaves, strict, full, complete, degenerate, avl };
}

function renderABBSvg() {
  const svg = document.getElementById('abbSvgCanvas');
  const statsEl = document.getElementById('abbStatsBar');
  if (!svg) return;

  const stats = abbGetStats(abbViz);
  if (statsEl) {
    const tags = [];
    if (stats.count === 0) tags.push('Vacío');
    else {
      if (stats.full) tags.push('Lleno / Perfecto');
      else if (stats.complete) tags.push('Completo');
      if (stats.strict) tags.push('Estricto / Propio');
      if (stats.degenerate) tags.push('Degenerado (O(n))');
      tags.push(stats.avl ? 'Equilibrado AVL' : 'Desbalanceado (No AVL)');
    }
    statsEl.innerHTML =
      `<span><strong>Nodos:</strong> ${stats.count}</span>` +
      `<span><strong>Niveles / Altura:</strong> ${stats.levels} / ${Math.max(0, stats.levels - 1)}</span>` +
      `<span><strong>Hojas:</strong> ${stats.leaves}</span>` +
      `<span><strong>Clasificación:</strong> ${tags.join(' | ')}</span>`;
  }

  if (abbViz.ArbolVacio()) {
    svg.setAttribute('viewBox', '0 0 640 220');
    svg.innerHTML = '<text x="320" y="115" text-anchor="middle" fill="var(--text-faint)" font-size="14" font-family="Plus Jakarta Sans, sans-serif">ArbolVacio() == true</text>';
    return;
  }

  const yStep = Math.min(54, Math.max(38, Math.floor(210 / Math.max(1, stats.levels))));
  const svgH = Math.max(240, stats.levels * yStep + 40);
  svg.setAttribute('viewBox', `0 0 640 ${svgH}`);

  let rankIdx = 0;
  const xSpan = 560;
  const nodes = [];
  const edges = [];

  function computePos(t, depth) {
    if (!t || t.ArbolVacio()) return null;
    const leftPt = computePos(t.HijoIzq(), depth + 1);
    const x = stats.count === 1 ? 320 : 40 + (rankIdx / (stats.count - 1)) * xSpan;
    rankIdx++;
    const y = 32 + depth * yStep;
    const val = t.Raiz();
    const rightPt = computePos(t.HijoDer(), depth + 1);
    if (leftPt) edges.push({ x1: x, y1: y, x2: leftPt.x, y2: leftPt.y });
    if (rightPt) edges.push({ x1: x, y1: y, x2: rightPt.x, y2: rightPt.y });
    nodes.push({ val, x, y });
    return { x, y };
  }

  computePos(abbViz, 0);

  let html = edges.map(e => `<line class="svg-edge" x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"></line>`).join('');
  html += nodes.map(n => `
    <g>
      <circle class="svg-node-circle ${abbVisitedSet.has(n.val) ? 'visited' : ''}" cx="${n.x}" cy="${n.y}" r="17"></circle>
      <text class="svg-node-text ${abbVisitedSet.has(n.val) ? 'visited' : ''}" x="${n.x}" y="${n.y}">${n.val}</text>
    </g>
  `).join('');
  svg.innerHTML = html;
}

function abbInsert() {
  const inp = document.getElementById('abbInput');
  const v = Number(inp ? inp.value : NaN);
  if (isNaN(v)) return;
  abbStopAnim();
  abbViz.AgregarElem(v);
  renderABBSvg();
  setLog('abbLog', `AgregarElem(${v}): Insertado manteniendo invariante ABB (Izq < Raíz < Der).`);
}

function abbDelete() {
  const inp = document.getElementById('abbInput');
  const v = Number(inp ? inp.value : NaN);
  if (isNaN(v)) return;
  abbStopAnim();
  abbViz.EliminarElem(v);
  renderABBSvg();
  setLog('abbLog', `EliminarElem(${v}): Si tenía 2 hijos se reemplazó por mayor(HijoIzq) o menor(HijoDer).`);
}

function abbRunTraversal(mode) {
  abbStopAnim();
  const order = [];
  function walk(t) {
    if (t.ArbolVacio()) return;
    if (mode === 'pre') order.push(t.Raiz());
    walk(t.HijoIzq());
    if (mode === 'in') order.push(t.Raiz());
    walk(t.HijoDer());
    if (mode === 'post') order.push(t.Raiz());
  }
  walk(abbViz);

  if (order.length === 0) {
    setLog('abbLog', 'Árbol vacío: recorrido [].');
    return;
  }

  const label = mode === 'pre' ? 'Preorden (R-I-D)' : mode === 'in' ? 'Inorden (I-R-D)' : 'Postorden (I-D-R)';
  let idx = 0;
  const visited = [];

  abbVisitedSet.add(order[0]);
  visited.push(order[0]);
  renderABBSvg();
  setLog('abbLog', `${label}: ${visited.join(' -> ')}`);

  abbTraversalTimer = setInterval(() => {
    idx++;
    if (idx >= order.length) {
      clearInterval(abbTraversalTimer);
      abbTraversalTimer = null;
      setLog('abbLog', `${label} completo: [ ${order.join(', ')} ]`);
      return;
    }
    abbVisitedSet.add(order[idx]);
    visited.push(order[idx]);
    renderABBSvg();
    setLog('abbLog', `${label}: ${visited.join(' -> ')}`);
  }, 520);
}

/* ============================================================================
   8. VISUALIZADOR SVG DE GRAFOS + MATRIZ DE ADYACENCIA + BFS/DFS (GrafoTDA)
   ============================================================================ */
const grafoViz = new GrafoTDA();
let grafoAnimTimer = null;
let grafoActiveVert = null;
let grafoVisitedVerts = new Set();

function grafoStopAnim() {
  if (grafoAnimTimer) {
    clearInterval(grafoAnimTimer);
    grafoAnimTimer = null;
  }
  grafoActiveVert = null;
  grafoVisitedVerts.clear();
}

function grafoLoadPreset(preset) {
  grafoStopAnim();
  grafoViz.InicializarGrafo();
  if (preset === 'cyclic') {
    [1, 2, 3, 4].forEach(v => grafoViz.AgregarVertice(v));
    grafoViz.AgregarArista(1, 2, 3);
    grafoViz.AgregarArista(2, 3, 7);
    grafoViz.AgregarArista(3, 4, 2);
    grafoViz.AgregarArista(4, 1, 5);
    grafoViz.AgregarArista(2, 1, 4);
    setLog('grafoLog', 'Grafo cíclico bidireccional (1<->2) cargado.');
  } else {
    [1, 2, 3, 4, 5].forEach(v => grafoViz.AgregarVertice(v));
    grafoViz.AgregarArista(1, 2, 4);
    grafoViz.AgregarArista(1, 3, 2);
    grafoViz.AgregarArista(2, 4, 5);
    grafoViz.AgregarArista(3, 2, 1);
    grafoViz.AgregarArista(3, 5, 3);
    grafoViz.AgregarArista(4, 5, 2);
    setLog('grafoLog', 'Grafo dirigido ponderado base cargado.');
  }
  renderGrafo();
}

function renderGrafo() {
  const svg = document.getElementById('grafoSvgCanvas');
  const matBox = document.getElementById('grafoMatrixBox');
  if (!svg) return;

  const verts = [...grafoViz.vertices].sort((a, b) => a - b);
  const n = verts.length;

  if (n === 0) {
    svg.innerHTML = '<text x="280" y="140" text-anchor="middle" fill="var(--text-faint)" font-size="14" font-family="Plus Jakarta Sans, sans-serif">Grafo sin vértices</text>';
    if (matBox) matBox.innerHTML = '<div style="font-size:0.82rem;color:var(--text-muted);">Sin vértices registrados.</div>';
    return;
  }

  const cx = 280;
  const cy = 140;
  const r = n === 1 ? 0 : 96;
  const pos = new Map();
  verts.forEach((v, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    pos.set(v, { x: Math.round(cx + r * Math.cos(angle)), y: Math.round(cy + r * Math.sin(angle)) });
  });

  let html = `
    <defs>
      <marker id="grafoArrow" viewBox="0 0 10 10" refX="26" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--border-strong)"></path>
      </marker>
    </defs>`;

  grafoViz.aristas.forEach(a => {
    const p1 = pos.get(a.origen);
    const p2 = pos.get(a.destino);
    if (!p1 || !p2) return;

    if (a.origen === a.destino) {
      html += `<path class="svg-edge" d="M ${p1.x - 10} ${p1.y - 16} C ${p1.x - 28} ${p1.y - 46}, ${p1.x + 28} ${p1.y - 46}, ${p1.x + 10} ${p1.y - 16}" marker-end="url(#grafoArrow)"></path>`;
      html += `<rect class="svg-weight-bg" x="${p1.x - 10}" y="${p1.y - 44}" width="20" height="14" rx="3"></rect>`;
      html += `<text class="svg-weight-text" x="${p1.x}" y="${p1.y - 37}">${a.peso}</text>`;
      return;
    }

    const hasReverse = grafoViz.ExisteArista(a.destino, a.origen);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const offset = hasReverse ? 10 : 0;

    const sx = p1.x + nx * offset;
    const sy = p1.y + ny * offset;
    const ex = p2.x + nx * offset;
    const ey = p2.y + ny * offset;
    const mx = (sx + ex) / 2 + nx * (hasReverse ? 6 : 0);
    const my = (sy + ey) / 2 + ny * (hasReverse ? 6 : 0);

    html += `<line class="svg-edge" x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" marker-end="url(#grafoArrow)"></line>`;
    html += `<rect class="svg-weight-bg" x="${mx - 10}" y="${my - 8}" width="20" height="16" rx="3"></rect>`;
    html += `<text class="svg-weight-text" x="${mx}" y="${my}">${a.peso}</text>`;
  });

  verts.forEach(v => {
    const p = pos.get(v);
    const isActive = grafoActiveVert === v || grafoVisitedVerts.has(v);
    html += `
      <g>
        <circle class="svg-node-circle ${isActive ? 'visited' : ''}" cx="${p.x}" cy="${p.y}" r="19"></circle>
        <text class="svg-node-text ${isActive ? 'visited' : ''}" x="${p.x}" y="${p.y}">${v}</text>
      </g>`;
  });
  svg.innerHTML = html;

  if (matBox) {
    let mHtml = '<table class="matrix-table"><thead><tr><th>O \\ D</th>' +
      verts.map(v => `<th>${v}</th>`).join('') + '</tr></thead><tbody>';
    verts.forEach(u => {
      mHtml += `<tr><th>${u}</th>`;
      verts.forEach(v => {
        const exists = grafoViz.ExisteArista(u, v);
        const w = exists ? grafoViz.PesoArista(u, v) : 0;
        mHtml += `<td class="${exists ? 'has-edge' : ''}">${w}</td>`;
      });
      mHtml += '</tr>';
    });
    mHtml += '</tbody></table>';
    matBox.innerHTML = mHtml;
  }
}

function grafoAddVert() {
  const v = Number(document.getElementById('grafoVertInput').value);
  if (isNaN(v)) return;
  grafoStopAnim();
  grafoViz.AgregarVertice(v);
  renderGrafo();
  setLog('grafoLog', `AgregarVertice(${v}): Vértice presente en el grafo.`);
}

function grafoDelVert() {
  const v = Number(document.getElementById('grafoVertInput').value);
  if (isNaN(v)) return;
  grafoStopAnim();
  grafoViz.EliminarVertice(v);
  renderGrafo();
  setLog('grafoLog', `EliminarVertice(${v}): Vértice y sus aristas incidentes eliminados.`);
}

function grafoAddEdge() {
  const o = Number(document.getElementById('grafoEdgeOrig').value);
  const d = Number(document.getElementById('grafoEdgeDest').value);
  const p = Number(document.getElementById('grafoEdgeWeight').value) || 1;
  if (isNaN(o) || isNaN(d)) return;
  grafoStopAnim();
  grafoViz.AgregarArista(o, d, p);
  renderGrafo();
  setLog('grafoLog', `AgregarArista(${o}, ${d}, peso=${p}) ejecutada.`);
}

function grafoDelEdge() {
  const o = Number(document.getElementById('grafoEdgeOrig').value);
  const d = Number(document.getElementById('grafoEdgeDest').value);
  if (isNaN(o) || isNaN(d)) return;
  grafoStopAnim();
  grafoViz.EliminarArista(o, d);
  renderGrafo();
  setLog('grafoLog', `EliminarArista(${o}, ${d}) ejecutada.`);
}

function grafoRunTraversal(mode) {
  grafoStopAnim();
  const verts = [...grafoViz.vertices].sort((a, b) => a - b);
  if (verts.length === 0) return;

  const rawStart = Number(document.getElementById('grafoStartInput').value);
  const start = verts.includes(rawStart) ? rawStart : verts[0];
  const order = [];
  const seen = new Set([start]);

  if (mode === 'bfs') {
    const cola = new ColaTDA();
    cola.InicializarCola();
    cola.Acolar(start);
    while (!cola.ColaVacia()) {
      const u = cola.Primero();
      cola.Desacolar();
      order.push(u);
      verts.forEach(w => {
        if (grafoViz.ExisteArista(u, w) && !seen.has(w)) {
          seen.add(w);
          cola.Acolar(w);
        }
      });
    }
  } else {
    const pila = new PilaTDA();
    pila.InicializarPila();
    pila.Apilar(start);
    const dfsOrder = [];
    const visited = new Set();
    while (!pila.PilaVacia()) {
      const u = pila.Tope();
      pila.Desapilar();
      if (visited.has(u)) continue;
      visited.add(u);
      dfsOrder.push(u);
      // Push descending so smaller neighbor sits on top of PilaTDA
      [...verts].reverse().forEach(w => {
        if (grafoViz.ExisteArista(u, w) && !visited.has(w)) pila.Apilar(w);
      });
    }
    order.push(...dfsOrder);
  }

  const label = mode === 'bfs' ? 'BFS (ColaTDA)' : 'DFS (PilaTDA)';
  let idx = 0;
  const trace = [order[0]];
  grafoActiveVert = order[0];
  grafoVisitedVerts.add(order[0]);
  renderGrafo();
  setLog('grafoLog', `${label} desde ${start}: ${trace.join(' -> ')}`);

  grafoAnimTimer = setInterval(() => {
    idx++;
    if (idx >= order.length) {
      grafoActiveVert = null;
      renderGrafo();
      clearInterval(grafoAnimTimer);
      grafoAnimTimer = null;
      setLog('grafoLog', `${label} desde ${start} completo: [ ${order.join(', ')} ]`);
      return;
    }
    grafoActiveVert = order[idx];
    grafoVisitedVerts.add(order[idx]);
    trace.push(order[idx]);
    renderGrafo();
    setLog('grafoLog', `${label} desde ${start}: ${trace.join(' -> ')}`);
  }, 560);
}

/* ============================================================================
   9. RESALTADOR UNIVERSAL DE SINTAXIS, INSPECTOR DE LÍNEAS Y MINI-RUNNER JAVA
   ============================================================================ */

const SYNTAX_TOKEN_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(public|private|interface|class|implements|void|return|if|else|while|for|new|let|const|var|function|true|false|null|int|boolean|break|continue|try|catch)\b|\b(PilaTDA|PilaTF|PilaTI|PilaTF2|PilaLD|ColaTDA|ColaPU|ColaPI|ColaLD|ColaPU2|ColaPrioridadTDA|ColaPrioridadDA|ColaPrioridadAO|ColaPrioridadLD|ConjuntoTDA|ConjuntoA|ConjuntoLD|DiccionarioSimpleTDA|DiccionarioSimpleA|DiccionarioSimpleL|DiccionarioMultipleTDA|DiccionarioMultipleA|DiccionarioMultipleL|ABBTDA|TDAABB|ABB|NodoABB|GrafoTDA|GrafoMA|GrafoLA|Nodo|NodoPrioridad|NodoGrafo|NodoArista|System|String)\b|\b(\d+)\b/g;

/** Highlights Java / JS course snippets consistently using theme syntax tokens. */
function highlightCodeHtml(text) {
  const src = String(text);
  SYNTAX_TOKEN_RE.lastIndex = 0;
  let out = '';
  let last = 0;
  let m;
  while ((m = SYNTAX_TOKEN_RE.exec(src)) !== null) {
    if (m.index > last) out += escapeHtml(src.slice(last, m.index));
    const tok = escapeHtml(m[0]);
    if (m[1]) out += `<span class="cm">${tok}</span>`;
    else if (m[2]) out += `<span class="str">${tok}</span>`;
    else if (m[3]) out += `<span class="kw">${tok}</span>`;
    else if (m[4]) out += `<span class="type">${tok}</span>`;
    else if (m[5]) out += `<span class="num">${tok}</span>`;
    last = SYNTAX_TOKEN_RE.lastIndex;
  }
  if (last < src.length) out += escapeHtml(src.slice(last));
  return out;
}

const LINE_EXPLAIN_RULES = [
  [/public interface\s+(\w+)/, 'Declara la interfaz pública (contrato de métodos sin código interno).'],
  [/implements\s+PilaTDA/, 'Define una estrategia concreta que implementa el contrato PilaTDA.'],
  [/implements\s+ColaTDA/, 'Define una estrategia concreta que implementa el contrato ColaTDA.'],
  [/implements\s+ColaPrioridadTDA/, 'Implementa ColaPrioridadTDA ordenando internamente según prioridad.'],
  [/implements\s+ConjuntoTDA/, 'Implementa ConjuntoTDA asegurando que nunca haya elementos repetidos.'],
  [/implements\s+ABBTDA/, 'Implementa el Árbol Binario de Búsqueda respetando Izq < Raíz < Der.'],
  [/int\[\]\s*arr\s*;\s*int\s+inx/, 'Campos internos: arr[] guarda los datos y inx (index) cuenta cuántos hay y marca la próxima posición libre.'],
  [/int\[\]\s*arr/, 'Vector estático donde se almacenarán los elementos en memoria contigua.'],
  [/int\s+inx/, 'Variable inx (índice/cantidad): indica cuántos elementos válidos existen actualmente.'],
  [/arr\s*=\s*new int/, 'Reserva memoria para el vector estático de tamaño fijo (ej. 100 posiciones).'],
  [/arr\[0\]\s*=\s*0/, 'Estrategia TF2: usa arr[0] como contador de elementos en lugar de declarar una variable inx.'],
  [/arr\[inx\]\s*=\s*x;\s*inx\+\+/, 'Guarda x en la primera casilla libre (arr[inx]) y avanza el contador inx en 1. Costo O(1).'],
  [/arr\[arr\[0\]\s*\+\s*1\]\s*=\s*x/, 'Guarda x después del último dato actual (posición arr[0] + 1) y suma 1 al contador arr[0].'],
  [/inx--/, 'Decrementa el contador inx en 1: el dato sigue en el vector, pero fuera del rango válido [0..inx-1]. Costo O(1).'],
  [/arr\[0\]--/, 'Decrementa el contador en arr[0] en 1 para desapilar en O(1) sin borrar físicamente la celda.'],
  [/return\s*\(?\s*inx\s*==\s*0/, 'Si el contador inx vale 0 no hay elementos activos, por lo tanto la estructura está vacía.'],
  [/return\s*\(?\s*arr\[0\]\s*==\s*0/, 'En TF2, si la celda contador arr[0] es 0, no quedan elementos guardados.'],
  [/return\s+arr\[inx\s*-\s*1\]/, 'Como inx apunta a la próxima libre, el último elemento válido (el tope/frente) está justo en inx - 1.'],
  [/return\s+arr\[arr\[0\]\]/, 'Como arr[0] guarda la cantidad, el tope se ubica exactamente en el índice arr[cantidad].'],
  [/for\s*\(\s*int\s+i\s*=\s*inx\s*-\s*1/, 'Bucle de desplazamiento a la derecha: abre espacio en arr[0] corriendo todo 1 lugar. Costo O(n).'],
  [/for\s*\(\s*int\s+i\s*=\s*0/, 'Bucle de desplazamiento a la izquierda: tapa el hueco dejado en arr[0]. Costo O(n).'],
  [/arr\[0\]\s*=\s*x/, 'Coloca el nuevo dato directamente en el extremo inicial arr[0].'],
  [/return\s+arr\[0\]/, 'Devuelve directamente arr[0] en O(1) porque la estrategia mantiene el extremo siempre al inicio.'],
  [/nuevo\.sig\s*=\s*primero/, 'Enlaza el nuevo nodo apuntando hacia la cabeza actual ANTES de mover primero (evita perder la lista).'],
  [/primero\s*=\s*nuevo/, 'Actualiza el puntero primero para que el nuevo nodo pase a ser el primero/tope.'],
  [/primero\s*=\s*primero\.sig/, 'Avanza primero al segundo nodo; el primer nodo anterior queda sin referencias y desaparece.'],
  [/if\s*\(\s*ultimo\s*!=\s*null\s*\)\s*ultimo\.sig\s*=\s*nuevo/, 'Si ya había elementos, el antiguo último nodo ahora apunta al nuevo nodo entrante.'],
  [/if\s*\(\s*primero\s*==\s*null\s*\)\s*primero\s*=\s*ultimo/, 'Si la cola estaba vacía al acolar, primero y ultimo coinciden en el único nodo nuevo.'],
  [/if\s*\(\s*primero\s*==\s*null\s*\)\s*ultimo\s*=\s*null/, 'Si tras desacolar primero quedó null, también limpia ultimo para que no quede apuntando a basura.'],
  [/class\s+Nodo/, 'Estructura autorreferenciada de memoria dinámica: almacena el dato (info) y la dirección del siguiente (sig).'],
  [/aux\.sig\s*=\s*aux\.sig\.sig/, 'Circunvala el nodo objetivo saltándolo directamente hacia el nodo posterior.'],
  [/aux\s*=\s*aux\.sig/, 'Avanza el puntero viajero aux un nodo hacia adelante en la lista.'],
  [/AgregarElem/, 'Inserta recursivamente comparando x contra raíz: menores a la izquierda, mayores a la derecha.'],
  [/HijoIzq\(\)/, 'Obtiene el subárbol izquierdo (en ABB contiene todos los valores menores a la raíz).'],
  [/HijoDer\(\)/, 'Obtiene el subárbol derecho (en ABB contiene todos los valores mayores a la raíz).'],
  [/Vertices\(\)/, 'Retorna un ConjuntoTDA con todas las etiquetas de vértices existentes en el grafo.'],
  [/ExisteArista/, 'Consulta si existe una arista dirigida desde el primer vértice hacia el segundo.']
];

function explainJavaLine(rawLine) {
  const trimmed = rawLine.trim();
  if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed === '};') {
    return 'Delimitador de bloque de código (apertura o cierre de clase/método/bucle).';
  }
  const commentMatch = trimmed.match(/\/\/(.*)$/);
  for (const [regex, msg] of LINE_EXPLAIN_RULES) {
    if (regex.test(trimmed)) {
      return commentMatch ? `${msg} (${commentMatch[1].trim()})` : msg;
    }
  }
  if (commentMatch) return `Anotación del código: ${commentMatch[1].trim()}.`;
  if (/^\w+\s+\w+\s*\(/.test(trimmed) || /^void\s+/.test(trimmed)) {
    return 'Declaración o firma de método: define qué parámetros recibe y si devuelve un valor.';
  }
  if (/^while\s*\(/.test(trimmed)) {
    return 'Bucle condicional: repite el bloque mientras se cumpla la condición lógica.';
  }
  if (/^if\s*\(/.test(trimmed)) {
    return 'Evaluación condicional: decide qué rama ejecutar según el estado de las variables.';
  }
  if (/return\s+/.test(trimmed)) {
    return 'Devuelve el resultado evaluado al punto donde se invocó el método.';
  }
  return `Instrucción ejecutada secuencialmente: "${trimmed}".`;
}

function inspectCodeLine(spanEl) {
  const container = spanEl.closest('.code-tabs-container');
  if (!container) return;
  container.querySelectorAll('.code-line-interactive').forEach(el => el.classList.remove('active-line'));
  spanEl.classList.add('active-line');
  const explainEl = container.querySelector('.code-line-explain');
  if (explainEl) {
    explainEl.innerHTML = `<strong>Línea seleccionada:</strong> <span>${escapeHtml(explainJavaLine(spanEl.textContent))}</span>`;
  }
}

/** Upgrades all static <pre> panels and attaches clickable line explanations inside tabs. */
function enhanceAllCodePanels() {
  document.querySelectorAll('.code-tabs-container').forEach(container => {
    container.querySelectorAll('.code-panel pre').forEach(pre => {
      if (pre.dataset.enhanced === '1') return;
      const lines = pre.textContent.replace(/\r\n/g, '\n').split('\n');
      pre.innerHTML = lines.map(line =>
        `<span class="code-line-interactive" onclick="inspectCodeLine(this)">${highlightCodeHtml(line) || ' '}</span>`
      ).join('');
      pre.dataset.enhanced = '1';
    });

    if (!container.querySelector('.code-line-explain') && !container.id.includes('Sol')) {
      const box = document.createElement('div');
      box.className = 'code-line-explain';
      box.innerHTML = '<strong>Modo interactivo:</strong> <span>Haz clic en cualquier línea del código de arriba para ver qué hace exactamente en memoria.</span>';
      container.appendChild(box);
    }
  });

  // Also color any standalone <pre> inside inline solutions, trace cards, or highlighted-code blocks
  document.querySelectorAll('.code-panel pre, .trace-code pre, pre.highlighted-code, pre.code-snippet, .dry-run-box pre').forEach(pre => {
    if (pre.dataset.enhanced === '1') return;
    pre.innerHTML = highlightCodeHtml(pre.textContent);
    pre.dataset.enhanced = '1';
  });
}

function copyIdeTemplate(elementId, btn) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = (el.innerText || el.textContent || '').trim();
  const markSuccess = () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ ¡Copiado al Portapapeles!';
    btn.classList.add('btn-success');
    btn.classList.remove('btn-primary');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('btn-success');
      btn.classList.add('btn-primary');
    }, 2800);
  };

  const fallbackCopy = (t) => {
    const ta = document.createElement('textarea');
    ta.value = t;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(markSuccess).catch(() => {
      fallbackCopy(text);
      markSuccess();
    });
  } else {
    fallbackCopy(text);
    markSuccess();
  }
}

function toggleDeepTrace(traceId) {
  const el = document.getElementById(traceId);
  if (!el) return;
  const isHidden = el.style.display === 'none' || !el.style.display;
  el.style.display = isHidden ? 'block' : 'none';
}

function syncHighlightedEditor(ta) {
  if (!ta || !ta._backdropEl) return;
  const val = ta.value;
  ta._backdropEl.innerHTML = highlightCodeHtml(val.endsWith('\n') ? val + ' ' : val);
  ta._backdropEl.scrollTop = ta.scrollTop;
  ta._backdropEl.scrollLeft = ta.scrollLeft;
}

function setHighlightedEditorValue(id, value) {
  const ta = document.getElementById(id);
  if (!ta) return;
  ta.value = value;
  syncHighlightedEditor(ta);
}

/** Wraps code editors in a transparent overlay so typing gets live syntax highlighting. */
function initHighlightedEditors() {
  document.querySelectorAll('textarea.editor-textarea, textarea.inline-editor, textarea.snippet-editor').forEach(ta => {
    if (ta.dataset.highlighted === '1') return;
    const wrap = document.createElement('div');
    wrap.className = 'code-editor-wrap' +
      (ta.classList.contains('editor-textarea') ? ' arena-size' :
       ta.classList.contains('snippet-editor') ? ' snippet-size' : '');

    const backdrop = document.createElement('pre');
    backdrop.className = 'code-editor-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    ta.parentNode.insertBefore(wrap, ta);
    wrap.appendChild(backdrop);
    wrap.appendChild(ta);

    ta.className = 'code-editor-textarea';
    ta.dataset.highlighted = '1';
    ta._backdropEl = backdrop;

    ta.addEventListener('input', () => syncHighlightedEditor(ta));
    ta.addEventListener('scroll', () => {
      backdrop.scrollTop = ta.scrollTop;
      backdrop.scrollLeft = ta.scrollLeft;
    });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.value = ta.value.slice(0, start) + '    ' + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
        syncHighlightedEditor(ta);
      }
    });

    syncHighlightedEditor(ta);
  });
}

/** Runs an interactive UADE Java console snippet reusing transpileExamJava. */
function runMiniJavaSnippet(editorId, outId) {
  const ta = document.getElementById(editorId);
  const outEl = document.getElementById(outId);
  if (!ta || !outEl) return;

  const code = transpileExamJava(ta.value);
  let buffer = '';
  const __print = (...args) => { buffer += args.join(''); };
  const __println = (...args) => { buffer += args.join('') + '\n'; };

  outEl.style.display = 'block';
  try {
    LoopGuard.reset();
    const fn = new Function('__print', '__println', code);
    fn(__print, __println);
    outEl.style.borderLeftColor = 'var(--success)';
    outEl.textContent = buffer.trim().length > 0 ? `Consola:\n${buffer}` : 'Ejecutado sin errores (sin salida impresa).';
  } catch (err) {
    outEl.style.borderLeftColor = 'var(--danger)';
    outEl.textContent = `Error al ejecutar: ${err.message}`;
  }
}

/* Boot */
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateProgressUI();
  mountCodingWidgets();
  enhanceAllCodePanels();
  initHighlightedEditors();
  renderDualPila();
  renderDualCola();
  renderLinkedList();
  renderSandboxCP();
  renderSandboxConj();
  abbLoadPreset('balanced');
  grafoLoadPreset('dag');
});
