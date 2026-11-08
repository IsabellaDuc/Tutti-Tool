# Cosa cambia · Changelog

## 0.3.0 · 30 settembre 2026

1. **Plugin per WordPress** (`wordpress/tutti-tool.zip`): si carica dalla bacheca, si attiva, si regola in Impostazioni → Tutti Tool. Il pannello è servito dal sito stesso; i colori con un contrasto troppo basso vengono rifiutati. *WordPress plugin: upload, activate, set it up in Settings → Tutti Tool.*
2. **Prompt per la chat** (`PROMPT.md`, `PROMPT.en.md`): per chi usa un'IA nel browser e non è del mestiere; guida passo passo per WordPress, Wix, Squarespace, Webflow, Shopify, o prepara l'email per chi gestisce il sito. *A chat prompt for non-technical users.*
3. **Una riga da incollare** con jsDelivr, versione fissa e hash `integrity`, per le piattaforme senza accesso ai file. *A pinned jsDelivr line with SRI for hosted platforms.*
4. **`prova-pannello.mjs`**: prova il pannello in Chrome, Edge o Chromium senza finestra e calcola i contrasti (anche `rgba()`). *Headless test script and contrast calculator.*
5. **Skill e prompt più rigorosi**, dopo un collaudo su sette siti in un container: controllo di accessibilità sempre completo, prova nel browser, contrasti calcolati, accento chiaro. La skill funziona anche in una chat senza accesso ai file. *Stricter skill and prompt; the skill also works in a chat without file access.*
6. **`esempio/index.html`**: una pagina per provare il pannello. *An example page.*
7. `tutti-tool.js`: cambia solo l'intestazione (versione ed esempio). *Header only.*

## 0.2.0 · 29 settembre 2026

Prima versione pubblica: il pannello, il README in italiano e in inglese, il prompt e la skill. *First public version.*
