/* ============================================================================
   TDA PLAYBOOK: APLICACIÓN PRINCIPAL & CONTROLADOR UI
   ============================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  window.app = new PlaybookApp();
  window.app.init();
});

class PlaybookApp {
  constructor() {
    this.exercises = window.PLAYBOOK_EXERCISES || [];
    this.renderer = new window.PlaybookRenderer();
    this.currentCategory = "all";
    this.searchQuery = "";
    this.onlyPending = false;
    this.currentEx = null;

    // Cargar ejercicios dominados desde localStorage
    this.mastered = new Set();
    try {
      const saved = localStorage.getItem("tda_playbook_mastered");
      if (saved) {
        JSON.parse(saved).forEach(id => this.mastered.add(id));
      }
    } catch (e) {
      console.warn("No se pudo leer localStorage:", e);
    }
  }

  init() {
    this.bindEvents();
    this.updateStats();
    this.renderRoadmap();
    this.renderGrid();

    // Abrir por defecto el primer ejercicio o el último visto
    const lastId = localStorage.getItem("tda_playbook_last_ex") || "E01";
    this.openExercise(lastId, false);
  }

  bindEvents() {
    // Buscador
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGrid();
      });
    }

    // Filtros de categoría
    const filterBtns = document.querySelectorAll(".filter-chip");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentCategory = btn.dataset.cat || "all";
        this.renderGrid();
      });
    });

    // Filtro solo pendientes
    const pendingCheckbox = document.getElementById("filterPendingCheck");
    if (pendingCheckbox) {
      pendingCheckbox.addEventListener("change", (e) => {
        this.onlyPending = e.target.checked;
        this.renderGrid();
      });
    }

    // Controles del reproductor simulador
    const playBtn = document.getElementById("simPlayBtn");
    if (playBtn) playBtn.addEventListener("click", () => this.renderer.togglePlay());

    const prevBtn = document.getElementById("simPrevBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => this.renderer.prevStep());

    const nextBtn = document.getElementById("simNextBtn");
    if (nextBtn) nextBtn.addEventListener("click", () => this.renderer.nextStep());

    const resetBtn = document.getElementById("simResetBtn");
    if (resetBtn) resetBtn.addEventListener("click", () => this.renderer.reset());

    const speedSelect = document.getElementById("simSpeedSelect");
    if (speedSelect) {
      speedSelect.addEventListener("change", (e) => {
        this.renderer.setSpeed(Number(e.target.value));
      });
    }

    // Botón copiar código
    const copyBtn = document.getElementById("copyCodeBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        if (!this.currentEx) return;
        navigator.clipboard.writeText(this.currentEx.code).then(() => {
          this.showToast("✓ ¡Código Java copiado para Eclipse!");
        }).catch(() => {
          this.showToast("Error al copiar al portapapeles");
        });
      });
    }

    // Navegación anterior / siguiente ejercicio
    const navPrevBtn = document.getElementById("navPrevExBtn");
    if (navPrevBtn) {
      navPrevBtn.addEventListener("click", () => this.navExercise(-1));
    }
    const navNextBtn = document.getElementById("navNextExBtn");
    if (navNextBtn) {
      navNextBtn.addEventListener("click", () => this.navExercise(1));
    }

    // Toggle de tema
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }
    const mobileThemeBtn = document.getElementById("mobileThemeBtn");
    if (mobileThemeBtn) {
      mobileThemeBtn.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tda_playbook_theme", next);
    } catch (e) {}
    this.updateThemeButton(next);
  }

  updateThemeButton(theme) {
    const txt = document.getElementById("themeToggleText");
    if (txt) {
      txt.textContent = theme === "dark" ? "Modo Diurno" : "Modo Enfoque (Oscuro)";
    }
  }

  showToast(msg) {
    let toast = document.getElementById("toastPopup");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toastPopup";
      toast.className = "toast-popup";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  toggleMastered(id, e) {
    if (e) e.stopPropagation();
    if (this.mastered.has(id)) {
      this.mastered.delete(id);
      this.showToast(`Marcado como pendiente: ${id}`);
    } else {
      this.mastered.add(id);
      this.showToast(`🎉 ¡Ejercicio ${id} dominado!`);
    }

    try {
      localStorage.setItem("tda_playbook_mastered", JSON.stringify([...this.mastered]));
    } catch (err) {}

    this.updateStats();
    this.renderRoadmap();
    this.renderGrid();

    // Actualizar checkbox en detalle si coincide
    if (this.currentEx && this.currentEx.id === id) {
      const detailCheck = document.getElementById("detailMasteredCheck");
      if (detailCheck) detailCheck.checked = this.mastered.has(id);
    }
  }

  updateStats() {
    const total = this.exercises.length;
    const count = this.mastered.size;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;

    const progText = document.getElementById("statProgressText");
    const progBar = document.getElementById("statProgressBar");
    if (progText) progText.textContent = `${count} de ${total} dominados (${pct}%)`;
    if (progBar) progBar.style.width = `${pct}%`;
  }

  renderRoadmap() {
    const categories = [
      { key: "pilas", label: "Pilas (LIFO)", icon: "🥞" },
      { key: "colas", label: "Colas (FIFO)", icon: "🚶" },
      { key: "combinados", label: "Pila + Cola + Conjuntos", icon: "🔀" },
      { key: "diccionarios", label: "Diccionarios", icon: "📖" },
      { key: "nodos", label: "Nodos Dinámicos", icon: "🔗" },
      { key: "arboles", label: "Árboles (ABB)", icon: "🌲" },
      { key: "grafos", label: "Grafos Dirigidos", icon: "🕸️" }
    ];

    const container = document.getElementById("roadmapList");
    if (!container) return;

    let html = "";
    categories.forEach((cat, idx) => {
      const catExs = this.exercises.filter(x => x.cat === cat.key);
      const catMastered = catExs.filter(x => this.mastered.has(x.id)).length;
      const isComplete = catExs.length > 0 && catMastered === catExs.length;
      const isActive = this.currentCategory === cat.key;

      html += `
        <div class="roadmap-step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}"
             onclick="window.app.setCategory('${cat.key}')">
          <div class="roadmap-step-badge">${idx + 1}</div>
          <div class="roadmap-step-info">
            <div class="roadmap-step-name">${cat.icon} ${cat.label}</div>
            <div class="roadmap-step-count">${catMastered}/${catExs.length} dominados</div>
          </div>
          ${isComplete ? '<span class="step-check">✓</span>' : ''}
        </div>
      `;
    });
    container.innerHTML = html;
  }

  setCategory(catKey) {
    this.currentCategory = catKey;
    const filterBtns = document.querySelectorAll(".filter-chip");
    filterBtns.forEach(btn => {
      btn.classList.toggle("active", (btn.dataset.cat || "all") === catKey);
    });
    this.renderRoadmap();
    this.renderGrid();

    // Scroll suave hacia los ejercicios
    const grid = document.getElementById("exercisesGrid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  getFilteredExercises() {
    return this.exercises.filter(ex => {
      // Categoría
      if (this.currentCategory !== "all" && ex.cat !== this.currentCategory) {
        return false;
      }
      // Solo pendientes
      if (this.onlyPending && this.mastered.has(ex.id)) {
        return false;
      }
      // Búsqueda
      if (this.searchQuery) {
        const text = `${ex.id} ${ex.title} ${ex.summary} ${ex.tag} ${ex.catLabel}`.toLowerCase();
        if (!text.includes(this.searchQuery)) {
          return false;
        }
      }
      return true;
    });
  }

  renderGrid() {
    const grid = document.getElementById("exercisesGrid");
    const countBadge = document.getElementById("matchingCountBadge");
    if (!grid) return;

    const list = this.getFilteredExercises();
    if (countBadge) countBadge.textContent = `${list.length} ejercicios`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="grid-empty">
          <div class="empty-icon">🔍</div>
          <h3>No se encontraron ejercicios</h3>
          <p>Prueba cambiar el término de búsqueda o desactivar el filtro de pendientes.</p>
        </div>
      `;
      return;
    }

    let html = "";
    list.forEach(ex => {
      const isMastered = this.mastered.has(ex.id);
      const isSelected = this.currentEx && this.currentEx.id === ex.id;

      html += `
        <div class="exercise-card ${isMastered ? 'card-mastered' : ''} ${isSelected ? 'card-selected' : ''}"
             onclick="window.app.openExercise('${ex.id}', true)">
          <div class="card-header">
            <div class="card-id-row">
              <span class="card-id-pill">${ex.id}</span>
              <span class="card-cat-badge">${ex.catLabel}</span>
            </div>
            <label class="mastered-check-label" onclick="event.stopPropagation()">
              <input type="checkbox"
                     class="mastered-checkbox"
                     ${isMastered ? 'checked' : ''}
                     onchange="window.app.toggleMastered('${ex.id}', event)">
              <span class="custom-checkbox"></span>
              <span class="mastered-text">${isMastered ? 'Dominado' : 'Por repasar'}</span>
            </label>
          </div>

          <h3 class="card-title">${ex.title}</h3>
          <p class="card-summary">${ex.summary}</p>

          <div class="card-footer">
            <span class="card-tag"># ${ex.tag}</span>
            <span class="card-diff diff-${ex.difficulty.toLowerCase().replace(/[^a-z]/g, '')}">${ex.difficulty}</span>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  openExercise(id, scrollIntoStation = true) {
    const ex = this.exercises.find(x => x.id === id);
    if (!ex) return;

    this.currentEx = ex;
    try {
      localStorage.setItem("tda_playbook_last_ex", id);
    } catch (e) {}

    // Actualizar selección visual en grid
    const cards = document.querySelectorAll(".exercise-card");
    cards.forEach(c => c.classList.remove("card-selected"));
    const activeCards = document.querySelectorAll(`.exercise-card`);
    // Re-render ligero o resaltar
    this.renderGrid();

    // Llenar la Estación de Estudio
    const titleEl = document.getElementById("exDetailTitle");
    const idPill = document.getElementById("exDetailId");
    const catBadge = document.getElementById("exDetailCat");
    const diffBadge = document.getElementById("exDetailDiff");
    const misionBox = document.getElementById("exDetailMision");
    const clickBox = document.getElementById("exDetailMentalClick");
    const trapBox = document.getElementById("exDetailExamTrap");
    const bigOBox = document.getElementById("exDetailBigO");
    const codeBox = document.getElementById("exDetailCodeBlock");
    const checkEl = document.getElementById("detailMasteredCheck");

    if (titleEl) titleEl.textContent = ex.title;
    if (idPill) idPill.textContent = ex.id;
    if (catBadge) catBadge.textContent = ex.catLabel;
    if (diffBadge) diffBadge.textContent = ex.difficulty;
    if (misionBox) misionBox.textContent = ex.mision;

    if (clickBox) clickBox.innerHTML = this.renderMarkdown(ex.mentalClick);
    if (trapBox) trapBox.innerHTML = this.renderMarkdown(ex.examTrap);
    if (bigOBox) bigOBox.innerHTML = this.renderMarkdown(ex.bigO);

    if (checkEl) {
      checkEl.checked = this.mastered.has(ex.id);
      checkEl.onchange = (e) => this.toggleMastered(ex.id, e);
    }

    // Renderizar código con líneas
    if (codeBox) {
      const lines = ex.code.split("\n");
      codeBox.innerHTML = lines.map((line, idx) => `
        <div class="code-line" id="codeLine-${idx + 1}">
          <span class="line-number">${idx + 1}</span>
          <span class="line-text">${this.escapeHtml(line)}</span>
        </div>
      `).join("");
    }

    // Cargar en el simulador
    this.renderer.loadExercise(ex);

    // Scroll suave hacia la estación de estudio
    if (scrollIntoStation) {
      const station = document.getElementById("studyStation");
      if (station) {
        station.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  navExercise(delta) {
    if (!this.currentEx) return;
    const idx = this.exercises.findIndex(x => x.id === this.currentEx.id);
    if (idx === -1) return;

    const nextIdx = idx + delta;
    if (nextIdx >= 0 && nextIdx < this.exercises.length) {
      this.openExercise(this.exercises[nextIdx].id, true);
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  renderMarkdown(text) {
    if (!text) return "";
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
    return formatted;
  }
}
