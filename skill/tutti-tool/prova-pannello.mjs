// Prova Tutti Tool in un browser senza finestra (Chrome, Edge o Chromium), senza
// librerie: basta Node 22 o più recente. Apre ogni pagina e controlla che il
// pannello si carichi una volta sola, che il bottone si veda e non sia coperto,
// che il pannello si apra e si chiuda con il clic, con Alt + Maiusc + A e con
// Esc, che una scelta fatta in una pagina valga nelle altre, i contrasti dei
// colori scelti e gli errori in console. Stampa una riga per prova, «ok» o «NO»;
// esce con 1 se una prova fallisce, con 3 se non trova un browser.
// Tests Tutti Tool in a headless Chrome, Edge or Chromium (Node 22+, no deps).
//
// Uso / usage:
//   node prova-pannello.mjs <cartella-del-sito> [pagina.html ...]
//       serve la cartella su 127.0.0.1 (i percorsi che iniziano con / partono
//       dalla cartella, poi da public/ e static/); senza pagine prova tutte le .html
//   node prova-pannello.mjs http://localhost:5173/ [percorso ...]
//       prova un server già avviato (per esempio quello di sviluppo del progetto)
//   node prova-pannello.mjs --contrasto "#1C1D21" "#F4EEA9"
//       calcola il contrasto WCAG tra due colori, prima il testo poi lo sfondo;
//       accetta anche rgb() e rgba(): un testo semitrasparente si posa sullo sfondo
// Il browser lo cerca da solo; per indicarlo: variabile d'ambiente BROWSER_PATH.
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, statSync, readFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve, extname, relative, sep, delimiter } from 'node:path';
import { tmpdir, homedir } from 'node:os';

// Contrasto WCAG tra due colori: #rgb, #rrggbb, rgb() o rgba(). Un primo colore
// semitrasparente si posa sul secondo, come succede sulla pagina.
function rgba(colore) {
  const s = String(colore).trim();
  let m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
  if (m) { const h = m[1].length === 3 ? m[1].split('').map(c => c + c).join('') : m[1]; return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)).concat(1); }
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i.exec(s);
  if (!m) return null;
  const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return [+m[1], +m[2], +m[3], a];
}
function luminanza([r, g, b]) {
  return [r, g, b].map(c => c / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrasto(a, b) {
  const sopra = rgba(a), sotto = rgba(b);
  if (!sopra || !sotto) return null;
  const posato = sopra.slice(0, 3).map((c, i) => c * sopra[3] + sotto[i] * (1 - sopra[3]));
  const x = luminanza(posato), y = luminanza(sotto);
  return Math.round((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) * 100) / 100;
}

const arg = process.argv.slice(2);
if (arg[0] === '--contrasto') {
  const c = contrasto(arg[1], arg[2]);
  if (c == null) { console.error('Colori non validi: usa #rrggbb, rgb() o rgba() (il testo per primo, lo sfondo per secondo)'); process.exit(2); }
  console.log(`${arg[1]} su ${arg[2]}: ${c}:1 (testo normale ${c >= 4.5 ? 'ok' : 'NO'}, testo grande e contorni ${c >= 3 ? 'ok' : 'NO'})`);
  process.exit(0);
}
if (!arg.length) { console.error('Uso: node prova-pannello.mjs <cartella-del-sito | http://indirizzo/> [pagine...]'); process.exit(2); }

// 1. Il browser.
function trovaBrowser() {
  const candidati = [process.env.BROWSER_PATH, process.env.CHROME_PATH];
  const pf = [process.env['ProgramFiles(x86)'], process.env.ProgramFiles, process.env.LOCALAPPDATA].filter(Boolean);
  for (const p of pf) candidati.push(join(p, 'Microsoft/Edge/Application/msedge.exe'), join(p, 'Google/Chrome/Application/chrome.exe'), join(p, 'Chromium/Application/chrome.exe'));
  candidati.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium');
  const nomi = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable', 'microsoft-edge', 'microsoft-edge-stable', 'brave-browser'];
  for (const d of (process.env.PATH || '').split(delimiter)) for (const n of nomi) candidati.push(join(d, n));
  for (const base of [join(homedir(), '.cache', 'ms-playwright'), join(process.env.LOCALAPPDATA || '', 'ms-playwright')]) {
    try { for (const d of readdirSync(base).filter(d => d.startsWith('chromium'))) candidati.push(join(base, d, 'chrome-linux', 'chrome'), join(base, d, 'chrome-win', 'chrome.exe')); } catch (e) { /* niente Playwright */ }
  }
  return candidati.find(c => c && existsSync(c) && statSync(c).isFile());
}
const browser = trovaBrowser();
if (!browser) {
  console.error('Nessun browser trovato (Chrome, Edge o Chromium). Installane uno o indica il percorso con BROWSER_PATH; altrimenti verifica leggendo il codice e dillo nel resoconto.');
  process.exit(3);
}

// 2. Le pagine: da una cartella (con un piccolo server) o da un indirizzo.
const TIPI = { '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
let base, server = null, pagine = arg.slice(1);
if (/^https?:\/\//.test(arg[0])) {
  base = arg[0].endsWith('/') ? arg[0] : arg[0] + '/';
  if (!pagine.length) pagine = [''];
} else {
  const radice = resolve(arg[0]);
  if (!existsSync(radice) || !statSync(radice).isDirectory()) { console.error('Cartella non trovata: ' + radice); process.exit(2); }
  const salta = new Set(['node_modules', '.git', '.svn', 'vendor']);
  const cerca = (d, out = []) => { for (const n of readdirSync(d)) { if (salta.has(n) || n.startsWith('.')) continue; const p = join(d, n); if (statSync(p).isDirectory()) cerca(p, out); else if (/\.html?$/i.test(n)) out.push(relative(radice, p).split(sep).join('/')); } return out; };
  if (!pagine.length) pagine = cerca(radice).slice(0, 30);
  server = await new Promise(ok => {
    const s = createServer((q, r) => {
      let p = decodeURIComponent(q.url.split(/[?#]/)[0]);
      if (p.endsWith('/')) p += 'index.html';
      const file = ['', 'public', 'static'].map(d => resolve(radice, d, '.' + p))
        .find(f => f.startsWith(radice) && existsSync(f) && statSync(f).isFile());
      if (!file) { r.writeHead(404); return r.end(); }
      r.writeHead(200, { 'content-type': TIPI[extname(file).toLowerCase()] || 'application/octet-stream' });
      r.end(readFileSync(file));
    }).listen(0, '127.0.0.1', () => ok(s));
  });
  base = `http://127.0.0.1:${server.address().port}/`;
}

// 3. Il browser senza finestra, pilotato con il protocollo DevTools.
const pausa = ms => new Promise(r => setTimeout(r, ms));
async function avvia(senzaSandbox) {
  const profilo = mkdtempSync(join(tmpdir(), 'prova-tutti-tool-'));
  const opzioni = ['--headless=new', '--remote-debugging-port=0', '--user-data-dir=' + profilo, '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-gpu', '--window-size=1280,800', ...(senzaSandbox ? ['--no-sandbox'] : []), 'about:blank'];
  const proc = spawn(browser, opzioni, { stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    await pausa(250);
    try { const [porta, percorso] = readFileSync(join(profilo, 'DevToolsActivePort'), 'utf8').trim().split(/\s+/); if (porta && percorso) return { proc, profilo, ws: `ws://127.0.0.1:${porta}${percorso}` }; } catch (e) { /* non ancora */ }
  }
  proc.kill();
  return null;
}
let b = await avvia(false);
if (!b && process.platform === 'linux') b = await avvia(true); // in un container o da root Chromium chiede --no-sandbox
if (!b) { console.error('Il browser non parte: ' + browser); server?.close(); process.exit(3); }

const ws = new WebSocket(b.ws);
await new Promise((ok, ko) => { ws.addEventListener('open', ok, { once: true }); ws.addEventListener('error', ko, { once: true }); });
let id = 0; const attese = new Map(); const ascolta = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && attese.has(m.id)) { const { ok, ko } = attese.get(m.id); attese.delete(m.id); m.error ? ko(new Error(m.error.message)) : ok(m.result); }
  else ascolta.forEach(f => f(m));
});
const invia = (method, params = {}, sessionId) => new Promise((ok, ko) => { const n = ++id; attese.set(n, { ok, ko }); ws.send(JSON.stringify({ id: n, method, params, sessionId })); });
const { targetId } = await invia('Target.createTarget', { url: 'about:blank' });
const { sessionId: S } = await invia('Target.attachToTarget', { targetId, flatten: true });
let errori = [];
ascolta.push(m => {
  if (m.sessionId !== S) return;
  if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails; errori.push(((d.exception?.description || d.text) + ' ' + (d.url || '')).slice(0, 300)); }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errori.push(m.params.args.map(a => a.value ?? a.description ?? '').join(' ').slice(0, 300));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errori.push((m.params.entry.text + ' ' + (m.params.entry.url || '')).slice(0, 300));
});
// Le richieste ancora in corso: se la pagina resta appesa a un file esterno che
// non risponde, lo si blocca e si riprova (lo dice un avviso).
const inCorso = new Map(); const bloccati = new Set();
ascolta.push(m => {
  if (m.sessionId !== S) return;
  if (m.method === 'Network.requestWillBeSent') inCorso.set(m.params.requestId, m.params.request.url);
  if (m.method === 'Network.loadingFinished' || m.method === 'Network.loadingFailed') inCorso.delete(m.params.requestId);
});
await invia('Runtime.enable', {}, S); await invia('Page.enable', {}, S); await invia('Log.enable', {}, S); await invia('Network.enable', {}, S);
await invia('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false }, S);
async function valuta(espressione) {
  const r = await invia('Runtime.evaluate', { expression: espressione, returnByValue: true, awaitPromise: true }, S);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
}
async function tasto(key, code, vk, modificatori) {
  for (const type of ['keyDown', 'keyUp']) await invia('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode: vk, modifiers: modificatori }, S);
  await pausa(200);
}
async function apri(pagina, secondoTentativo = false) {
  errori = []; inCorso.clear();
  await invia('Page.navigate', { url: new URL(pagina, base).href }, S);
  // Il pannello parte con la pagina (DOMContentLoaded): lo si aspetta fino a 20
  // secondi, anche se un file esterno (caratteri, statistiche) non finisce mai.
  let stato = '';
  for (let i = 0; i < 100; i++) {
    await pausa(200);
    stato = await valuta('document.readyState + (document.getElementById("tp-accessibilita") ? "+" : "")').catch(() => '');
    if (stato === 'complete+' || (stato.endsWith('+') && i >= 15)) break;
  }
  const esterni = [...new Set([...inCorso.values()].filter(u => /^https?:/.test(u) && !u.startsWith(new URL(base).origin)).map(u => new URL(u).host))];
  if (!stato.endsWith('+') && esterni.length && !secondoTentativo) {
    esterni.forEach(h => bloccati.add(h));
    await invia('Network.setBlockedURLs', { urls: [...bloccati].map(h => `*://${h}/*`) }, S);
    console.log(`    avviso: ${pagina || '/'} restava appesa a file esterni che non rispondono (${esterni.join(', ')}): li blocco e riprovo`);
    return apri(pagina, true);
  }
  await pausa(300);
  return stato.replace('+', '');
}
const Q = `const r = document.getElementById('tp-accessibilita')?.shadowRoot, q = s => r && r.querySelector(s), aperto = () => getComputedStyle(q('.pannello')).display !== 'none';`;

let falliti = 0;
function prova(nome, esito, dettagli = '') { if (!esito) falliti++; console.log((esito ? 'ok  ' : 'NO  ') + nome + (dettagli ? '  (' + dettagli + ')' : '')); }

// 4. Le prove, pagina per pagina.
console.log(`Browser: ${browser}\nPagine: ${base}\n`);
const buone = [];
let chiave = 'tutti-tool', colori = null;
for (const pagina of pagine) {
  const caricamento = await apri(pagina);
  const nome = pagina || '/';
  const s = await valuta(`(() => { const t = [...document.querySelectorAll('script[src*="tutti-tool"]')];
    return { righe: t.length, pannelli: document.querySelectorAll('#tp-accessibilita').length,
      chiave: t[0]?.dataset.chiave || 'tutti-tool', inchiostro: t[0]?.dataset.inchiostro || '#1C1D21', accento: t[0]?.dataset.accento || '#F4EEA9',
      primoScript: [...document.querySelectorAll('head script')].find(x => !x.type || /javascript|module/i.test(x.type)) === t[0], nellaTesta: !!t[0] && document.head.contains(t[0]), defer: !!t[0] && (t[0].defer || t[0].async) }; })()`);
  if (!s.righe) { prova(`${nome}: la pagina carica tutti-tool.js`, false, 'nessuna riga'); continue; }
  chiave = s.chiave; colori = colori || s;
  prova(`${nome}: il pannello si carica una volta sola`, s.righe === 1 && s.pannelli === 1, `${s.righe} righe, ${s.pannelli} pannelli` +
    (!s.pannelli && caricamento === 'loading' ? '; la pagina non ha finito di caricarsi in 20 secondi: un file esterno (caratteri, script) non risponde? Riprova con la rete o su una copia senza quel file' : ''));
  prova(`${nome}: la riga è nella <head>, prima degli altri script, senza defer né async`, s.nellaTesta && s.primoScript && !s.defer);
  if (!s.pannelli) continue;
  const v = await valuta(`(() => { ${Q} const b = q('.apri'); if (!b) return { bottone: false };
    const x = b.getBoundingClientRect(); const sopra = document.elementFromPoint(x.left + x.width / 2, x.top + x.height / 2);
    return { bottone: x.width > 0 && x.height > 0, lato: x.left < innerWidth / 2 ? 'sinistra' : 'destra', dimensione: Math.round(x.width) + ' × ' + Math.round(x.height),
      coperto: sopra && sopra.id !== 'tp-accessibilita' ? (sopra.tagName.toLowerCase() + (sopra.id ? '#' + sopra.id : '') + (typeof sopra.className === 'string' && sopra.className ? '.' + sopra.className.trim().split(/\\s+/).join('.') : '')) : null }; })()`);
  prova(`${nome}: il bottone si vede`, v.bottone, v.bottone ? `${v.lato}, ${v.dimensione} px` : '');
  if (!v.bottone) continue;
  prova(`${nome}: il bottone non è coperto da altro`, !v.coperto, v.coperto ? 'sopra c\'è ' + v.coperto.slice(0, 80) : '');
  const clic = await valuta(`(() => { ${Q} q('.apri').click(); const a = aperto(); q('.apri').click(); return { a, c: !aperto() }; })()`);
  prova(`${nome}: il clic apre e chiude il pannello`, clic.a && clic.c);
  await tasto('A', 'KeyA', 65, 1 | 8);
  const conTasti = await valuta(`(() => { ${Q} return aperto(); })()`);
  await tasto('Escape', 'Escape', 27, 0);
  const esc = await valuta(`(() => { ${Q} return { chiuso: !aperto(), fuoco: r.activeElement?.classList.contains('apri') }; })()`);
  prova(`${nome}: Alt + Maiusc + A apre, Esc chiude e torna al bottone`, conTasti && esc.chiuso && esc.fuoco);
  const delPannello = errori.filter(e => /tutti-tool/i.test(e));
  const altri = [...new Set(errori.filter(e => !/tutti-tool/i.test(e)))];
  prova(`${nome}: nessun errore del pannello in console`, !delPannello.length, delPannello.join(' | '));
  if (altri.length) console.log(`    avviso, errori del sito (non del pannello): ${altri.slice(0, 5).join(' | ')}`);
  buone.push(pagina);
}

// 5. Una scelta fatta in una pagina vale nelle altre.
if (buone.length > 1) {
  await apri(buone[0]);
  await valuta(`(() => { ${Q} q('.apri').click(); q('[data-k="carattere"]').click(); return true; })()`);
  await apri(buone[1]);
  const vale = await valuta(`(() => { ${Q} return q('[data-k="carattere"]')?.getAttribute('aria-pressed') === 'true'; })()`);
  prova(`una scelta fatta in ${buone[0] || '/'} vale anche in ${buone[1] || '/'}`, vale);
}
if (buone.length) { await apri(buone[0]); await valuta(`localStorage.removeItem(${JSON.stringify(chiave)}); true`).catch(() => {}); }

// 6. I contrasti dei colori scelti per il pannello.
if (colori) {
  const bianco = contrasto(colori.inchiostro, '#FFFFFF'), accento = contrasto(colori.inchiostro, colori.accento);
  prova(`contrasto inchiostro ${colori.inchiostro} su bianco almeno 4,5:1`, bianco >= 4.5, bianco + ':1');
  prova(`contrasto inchiostro ${colori.inchiostro} su accento ${colori.accento} almeno 4,5:1`, accento >= 4.5, accento + ':1');
}

ws.close(); b.proc.kill(); server?.close();
await pausa(300);
try { rmSync(b.profilo, { recursive: true, force: true }); } catch (e) { /* il browser lo tiene ancora */ }
console.log(falliti ? `\n${falliti} prove non passate.` : '\nTutte le prove passate.');
process.exit(falliti ? 1 : 0);
