import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

const template = fs.readFileSync(path.join(srcDir, 'template.html'), 'utf8');
const css = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
const tdas = fs.readFileSync(path.join(srcDir, 'tdas.js'), 'utf8');
const sim = fs.readFileSync(path.join(srcDir, 'simulator.js'), 'utf8');
const arena = fs.readFileSync(path.join(srcDir, 'arena.js'), 'utf8');
const app = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');

const combinedJs = [tdas, sim, arena, app].join('\n\n');

const output = template
  .replace('<!-- INJECT_CSS -->', `<style>\n${css}\n</style>`)
  .replace('<!-- INJECT_JS -->', `<script>\n${combinedJs}\n</script>`);

const outPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outPath, output, 'utf8');

// Copy to Desktop\PG 2\TDA_Playground.html and TDA_Academia.html
const desktopPg2 = path.join(process.env.USERPROFILE, 'Desktop', 'PG 2');
if (fs.existsSync(desktopPg2)) {
  fs.copyFileSync(outPath, path.join(desktopPg2, 'TDA_Playground.html'));
}

console.log('Built index.html successfully! Size:', (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1), 'KB');
