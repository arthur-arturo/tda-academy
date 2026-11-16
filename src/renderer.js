/* ============================================================================
   TDA PLAYBOOK: MOTOR DE RENDERIZADO VISUAL & SIMULADOR PASO A PASO
   Soporta Pilas, Colas, Combinados, Nodos, Árboles Binarios (SVG) y Grafos (SVG)
   ============================================================================ */

class PlaybookRenderer {
  constructor() {
    this.currentEx = null;
    this.stepIndex = 0;
    this.isPlaying = false;
    this.playTimer = null;
    this.playSpeed = 1600; // ms por paso
  }

  // Carga un ejercicio en el simulador
  loadExercise(ex) {
    this.stopPlayback();
    this.currentEx = ex;
    this.stepIndex = 0;
    this.renderSimulator();
  }

  stopPlayback() {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    const playBtn = document.getElementById("simPlayBtn");
    if (playBtn) playBtn.innerHTML = `<span>▶</span> Reproducir`;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stopPlayback();
    } else {
      if (!this.currentEx || !this.currentEx.sim) return;
      if (this.stepIndex >= this.currentEx.sim.steps.length - 1) {
        this.stepIndex = 0;
      }
      this.isPlaying = true;
      const playBtn = document.getElementById("simPlayBtn");
      if (playBtn) playBtn.innerHTML = `<span>⏸</span> Pausar`;

      this.renderSimulator();
      this.playTimer = setInterval(() => {
        if (this.stepIndex < this.currentEx.sim.steps.length - 1) {
          this.stepIndex++;
          this.renderSimulator();
        } else {
          this.stopPlayback();
        }
      }, this.playSpeed);
    }
  }

  nextStep() {
    if (!this.currentEx || !this.currentEx.sim) return;
    this.stopPlayback();
    if (this.stepIndex < this.currentEx.sim.steps.length - 1) {
      this.stepIndex++;
      this.renderSimulator();
    }
  }

  prevStep() {
    if (!this.currentEx || !this.currentEx.sim) return;
    this.stopPlayback();
    if (this.stepIndex > 0) {
      this.stepIndex--;
      this.renderSimulator();
    }
  }

  reset() {
    this.stopPlayback();
    this.stepIndex = 0;
    this.renderSimulator();
  }

  setSpeed(speedVal) {
    this.playSpeed = speedVal;
    if (this.isPlaying) {
      this.stopPlayback();
      this.togglePlay();
    }
  }

  // Renderiza el simulador según el estado actual
  renderSimulator() {
    const simBox = document.getElementById("simVisualCanvas");
    const msgBox = document.getElementById("simStepMessage");
    const stepCount = document.getElementById("simStepCount");
    const prevBtn = document.getElementById("simPrevBtn");
    const nextBtn = document.getElementById("simNextBtn");

    if (!this.currentEx || !this.currentEx.sim) {
      if (simBox) simBox.innerHTML = `<div class="sim-empty">Este ejercicio no requiere animación interactiva.</div>`;
      return;
    }

    const sim = this.currentEx.sim;
    const steps = sim.steps || [];
    const step = steps[this.stepIndex] || { msg: "Inicio de simulación", codeLine: 1 };

    if (stepCount) stepCount.textContent = `Paso ${this.stepIndex + 1} de ${steps.length}`;
    if (msgBox) msgBox.innerHTML = `<strong>Paso ${this.stepIndex + 1}:</strong> ${step.msg}`;

    if (prevBtn) prevBtn.disabled = this.stepIndex === 0;
    if (nextBtn) nextBtn.disabled = this.stepIndex === steps.length - 1;

    // Resaltar línea de código Java
    this.highlightCodeLine(step.codeLine);

    // Dibujar la estructura visual según su tipo
    if (sim.type === "stacks") {
      this.renderStacks(simBox, sim, step);
    } else if (sim.type === "stack_queue") {
      this.renderStackAndQueue(simBox, sim, step);
    } else if (sim.type === "queue_queue") {
      this.renderQueueAndQueue(simBox, sim, step);
    } else if (sim.type === "queue_set") {
      this.renderQueueAndSet(simBox, sim, step);
    } else if (sim.type === "prio_queue") {
      this.renderPrioQueue(simBox, sim, step);
    } else if (sim.type === "sets") {
      this.renderSets(simBox, sim, step);
    } else if (sim.type === "dict" || sim.type === "dict_multi") {
      this.renderDict(simBox, sim, step);
    } else if (sim.type === "nodes") {
      this.renderNodes(simBox, sim, step);
    } else if (sim.type === "tree") {
      this.renderTree(simBox, sim, step);
    } else if (sim.type === "graph") {
      this.renderGraph(simBox, sim, step);
    } else {
      simBox.innerHTML = `<div class="sim-placeholder">${step.msg}</div>`;
    }
  }

  highlightCodeLine(lineNum) {
    const codeContainer = document.getElementById("exDetailCodeBlock");
    if (!codeContainer) return;
    const lines = codeContainer.querySelectorAll(".code-line");
    lines.forEach((l, idx) => {
      if (idx + 1 === lineNum) {
        l.classList.add("active-line");
        l.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        l.classList.remove("active-line");
      }
    });
  }

  // --- RENDERIZADORES DE ESTRUCTURAS ---

  renderStacks(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1?.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2?.items || []);
    const s3 = step.s3 !== undefined ? step.s3 : (sim.initial.s3?.items || []);

    const hasS3 = sim.initial.s3 !== undefined;

    let html = `<div class="sim-structures-row">`;
    html += this.buildStackHtml(sim.initial.s1.label, s1, "s1");
    html += this.buildStackHtml(sim.initial.s2.label, s2, "s2");
    if (hasS3) {
      html += this.buildStackHtml(sim.initial.s3.label, s3, "s3");
    }
    html += `</div>`;
    container.innerHTML = html;
  }

  buildStackHtml(label, items, id) {
    const itemsList = [...items];
    let itemsHtml = "";
    if (itemsList.length === 0) {
      itemsHtml = `<div class="empty-plate">Pila vacía</div>`;
    } else {
      for (let i = itemsList.length - 1; i >= 0; i--) {
        const isTope = (i === itemsList.length - 1);
        itemsHtml += `
          <div class="plate-item ${isTope ? 'plate-tope' : ''}">
            ${itemsList[i]}
            ${isTope ? '<span class="plate-badge">TOPE</span>' : ''}
          </div>
        `;
      }
    }
    return `
      <div class="stack-col">
        <div class="struct-header">${label} <small>(${items.length})</small></div>
        <div class="stack-tube" id="tube-${id}">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  renderStackAndQueue(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.items || []);

    const isS1Stack = sim.initial.s1.type === "stack";
    let html = `<div class="sim-structures-row">`;
    if (isS1Stack) {
      html += this.buildStackHtml(sim.initial.s1.label, s1, "s1");
      html += this.buildQueueHtml(sim.initial.s2.label, s2, "s2");
    } else {
      html += this.buildQueueHtml(sim.initial.s1.label, s1, "s1");
      html += this.buildStackHtml(sim.initial.s2.label, s2, "s2");
    }
    html += `</div>`;
    container.innerHTML = html;
  }

  buildQueueHtml(label, items, id) {
    let itemsHtml = "";
    if (items.length === 0) {
      itemsHtml = `<div class="empty-queue">Cola vacía</div>`;
    } else {
      items.forEach((val, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;
        itemsHtml += `
          <div class="queue-item ${isFirst ? 'queue-first' : ''}">
            ${val}
            ${isFirst ? '<span class="queue-badge">PRIMERO</span>' : ''}
            ${isLast && !isFirst ? '<span class="queue-badge-last">FINAL</span>' : ''}
          </div>
        `;
      });
    }
    return `
      <div class="queue-col">
        <div class="struct-header">${label} <small>(${items.length})</small></div>
        <div class="queue-track-wrap">
          <span class="queue-flow-label">◀ SALIDA</span>
          <div class="queue-track" id="track-${id}">
            ${itemsHtml}
          </div>
          <span class="queue-flow-label">ENTRADA ◀</span>
        </div>
      </div>
    `;
  }

  renderQueueAndQueue(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.items || []);
    const s3 = step.s3 !== undefined ? step.s3 : (sim.initial.s3?.items || []);

    let html = `<div class="sim-structures-vertical">`;
    html += this.buildQueueHtml(sim.initial.s1.label, s1, "s1");
    html += this.buildQueueHtml(sim.initial.s2.label, s2, "s2");
    if (sim.initial.s3) {
      html += this.buildQueueHtml(sim.initial.s3.label, s3, "s3");
    }
    html += `</div>`;
    container.innerHTML = html;
  }

  renderQueueAndSet(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.items || []);
    const s3 = step.s3 !== undefined ? step.s3 : (sim.initial.s3?.items || []);

    let html = `<div class="sim-structures-row">`;
    html += this.buildQueueHtml(sim.initial.s1.label, s1, "s1");
    html += this.buildSetHtml(sim.initial.s2.label, s2);
    if (sim.initial.s3) {
      html += this.buildQueueHtml(sim.initial.s3.label, s3, "s3");
    }
    html += `</div>`;
    container.innerHTML = html;
  }

  buildSetHtml(label, items) {
    let pills = "";
    if (items.length === 0) {
      pills = `<span class="empty-badge">∅ Conjunto Vacío</span>`;
    } else {
      items.forEach(val => {
        pills += `<span class="set-pill">${val}</span>`;
      });
    }
    return `
      <div class="set-col">
        <div class="struct-header">${label} <small>(${items.length})</small></div>
        <div class="set-bucket">
          ${pills}
        </div>
      </div>
    `;
  }

  renderPrioQueue(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.items || []);

    let prioItemsHtml = "";
    if (s1.length === 0) {
      prioItemsHtml = `<div class="empty-queue">Cola Prioridad vacía</div>`;
    } else {
      s1.forEach((item, idx) => {
        prioItemsHtml += `
          <div class="prio-card ${idx === 0 ? 'prio-highest' : ''}">
            <div class="prio-val">${item.v}</div>
            <div class="prio-tag">Prioridad: <strong>${item.p}</strong></div>
            ${idx === 0 ? '<span class="queue-badge">Mayor Prio</span>' : ''}
          </div>
        `;
      });
    }

    let html = `
      <div class="sim-structures-row">
        <div class="queue-col">
          <div class="struct-header">${sim.initial.s1.label}</div>
          <div class="prio-row">${prioItemsHtml}</div>
        </div>
        ${this.buildQueueHtml(sim.initial.s2.label, s2, "s2")}
      </div>
    `;
    container.innerHTML = html;
  }

  renderSets(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.items || []);
    const s3 = step.s3 !== undefined ? step.s3 : (sim.initial.s3?.items || []);

    let html = `<div class="sim-structures-row">`;
    html += this.buildSetHtml(sim.initial.s1.label, s1);
    html += this.buildSetHtml(sim.initial.s2.label, s2);
    if (sim.initial.s3) {
      html += this.buildSetHtml(sim.initial.s3.label, s3);
    }
    html += `</div>`;
    container.innerHTML = html;
  }

  renderDict(container, sim, step) {
    const s1 = step.s1 !== undefined ? step.s1 : (sim.initial.s1?.items || []);
    const s2 = step.s2 !== undefined ? step.s2 : (sim.initial.s2.entries || []);

    let dictRows = "";
    if (s2.length === 0) {
      dictRows = `<tr><td colspan="2" class="empty-table">Diccionario sin entradas</td></tr>`;
    } else {
      s2.forEach(e => {
        const valDisplay = Array.isArray(e.v)
          ? e.v.map(x => `<span class="tag-val">${x}</span>`).join(" ")
          : `<span class="val-pill">${e.v}</span>`;
        dictRows += `
          <tr>
            <td class="key-cell"><strong>${e.k}</strong></td>
            <td class="val-cell">${valDisplay}</td>
          </tr>
        `;
      });
    }

    let html = `<div class="sim-structures-row">`;
    if (sim.initial.s1) {
      if (sim.initial.s1.type === "queue" || Array.isArray(s1)) {
        html += this.buildQueueHtml(sim.initial.s1.label, s1, "s1");
      }
    }
    html += `
      <div class="dict-col">
        <div class="struct-header">${sim.initial.s2.label}</div>
        <table class="dict-table">
          <thead>
            <tr><th>Clave</th><th>Valor(es)</th></tr>
          </thead>
          <tbody>${dictRows}</tbody>
        </table>
      </div>
    </div>`;
    container.innerHTML = html;
  }

  renderNodes(container, sim, step) {
    const nodes = step.nodes || sim.initial.nodes || [];
    const pointers = step.pointers || sim.initial.pointers || [];

    let nodesHtml = "";
    nodes.forEach((node, idx) => {
      // Buscar qué punteros señalan a este nodo
      const nodePtrs = pointers.filter(p => p.nodeId === node.id);
      const ptrBadges = nodePtrs.map(p => `<span class="ptr-badge ptr-${p.name}">${p.name}</span>`).join(" ");

      nodesHtml += `
        <div class="node-box-wrap ${node.disconnected ? 'node-disconnected' : ''}">
          <div class="node-ptr-row">${ptrBadges}</div>
          <div class="node-box">
            <div class="node-info">${node.val}</div>
            <div class="node-sig">sig ➔</div>
          </div>
          ${node.sig !== null ? '<div class="node-arrow">⟶</div>' : '<div class="node-null">null</div>'}
        </div>
      `;
    });

    // Punteros que apuntan a null
    const nullPtrs = pointers.filter(p => p.nodeId === null);
    let nullPtrBadges = nullPtrs.map(p => `<span class="ptr-badge ptr-${p.name}">${p.name}</span>`).join(" ");

    container.innerHTML = `
      <div class="nodes-container">
        <div class="struct-header">Memoria Dinámica (Lista Enlazada)</div>
        <div class="nodes-chain">
          ${nodesHtml}
          ${nullPtrBadges ? `<div class="null-ptr-wrap">${nullPtrBadges} ➔ null</div>` : ''}
        </div>
      </div>
    `;
  }

  renderTree(container, sim, step) {
    const activeNode = step.activeNode;
    const tree = sim.initial.tree;

    // Renderizamos un SVG del árbol
    const width = 480;
    const height = 210;

    let svgElements = [];
    this.layoutTree(tree, width / 2, 35, width / 4, 50, activeNode, svgElements);

    container.innerHTML = `
      <div class="tree-canvas-wrap">
        <div class="struct-header">Árbol Binario de Búsqueda (ABB)</div>
        <svg class="tree-svg" viewBox="0 0 ${width} ${height}">
          ${svgElements.join("\n")}
        </svg>
      </div>
    `;
  }

  layoutTree(node, x, y, dx, dy, activeNode, svgElements) {
    if (!node) return;

    // Línea al hijo izquierdo
    if (node.left) {
      const lx = x - dx;
      const ly = y + dy;
      svgElements.unshift(`<line x1="${x}" y1="${y}" x2="${lx}" y2="${ly}" class="tree-branch" />`);
      this.layoutTree(node.left, lx, ly, dx / 2, dy, activeNode, svgElements);
    }

    // Línea al hijo derecho
    if (node.right) {
      const rx = x + dx;
      const ry = y + dy;
      svgElements.unshift(`<line x1="${x}" y1="${y}" x2="${rx}" y2="${ry}" class="tree-branch" />`);
      this.layoutTree(node.right, rx, ry, dx / 2, dy, activeNode, svgElements);
    }

    const isActive = (node.val === activeNode);
    svgElements.push(`
      <g class="tree-node ${isActive ? 'tree-node-active' : ''}">
        <circle cx="${x}" cy="${y}" r="18" class="tree-circle" />
        <text x="${x}" y="${y + 5}" text-anchor="middle" class="tree-text">${node.val}</text>
      </g>
    `);
  }

  renderGraph(container, sim, step) {
    const vertices = sim.initial.vertices || [];
    const edges = sim.initial.edges || [];
    const activeNode = step.activeNode;
    const visited = step.visited || [];
    const activeEdge = step.activeEdge;

    const width = 440;
    const height = 220;
    const cx = width / 2;
    const cy = height / 2;
    const r = 75;

    // Posición circular de vértices
    const pos = {};
    const n = vertices.length;
    vertices.forEach((v, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      pos[v] = {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    });

    let edgeSvg = [];
    edges.forEach(e => {
      const p1 = pos[e.from];
      const p2 = pos[e.to];
      if (!p1 || !p2) return;

      const isActEdge = activeEdge && (activeEdge.from === e.from && activeEdge.to === e.to);
      edgeSvg.push(`
        <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"
              class="graph-edge ${isActEdge ? 'graph-edge-active' : ''}"
              marker-end="url(#arrowhead${isActEdge ? '-active' : ''})" />
      `);
    });

    let vertexSvg = [];
    vertices.forEach(v => {
      const p = pos[v];
      const isActive = (v === activeNode);
      const isVisited = visited.includes(v);
      vertexSvg.push(`
        <g class="graph-vertex ${isActive ? 'vertex-active' : ''} ${isVisited ? 'vertex-visited' : ''}">
          <circle cx="${p.x}" cy="${p.y}" r="17" class="vertex-circle" />
          <text x="${p.x}" y="${p.y + 5}" text-anchor="middle" class="vertex-text">${v}</text>
        </g>
      `);
    });

    container.innerHTML = `
      <div class="graph-canvas-wrap">
        <div class="struct-header">Grafo Dirigido (Vértices & Aristas)</div>
        <svg class="graph-svg" viewBox="0 0 ${width} ${height}">
          <defs>
            <marker id="arrowhead" markerWidth="9" markerHeight="6" refX="21" refY="3" orient="auto">
              <polygon points="0 0, 9 3, 0 6" fill="var(--text-muted)" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
            </marker>
          </defs>
          ${edgeSvg.join("\n")}
          ${vertexSvg.join("\n")}
        </svg>
      </div>
    `;
  }
}

window.PlaybookRenderer = PlaybookRenderer;
