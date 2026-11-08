# The prompts to install Tutti Tool

Two prompts, for two situations. [Versione italiana](PROMPT.md).

1. **[For a chat](#1-for-a-chat)**: for people who use an AI in the browser (ChatGPT, Claude, Gemini, Copilot) and are not web professionals. The assistant asks you two or three questions, works out how your site is built and walks you through one step at a time: the WordPress plugin, the line to paste on Wix or Squarespace, or the email for whoever manages your site.
2. **[For an assistant that works on the site's files](#2-for-an-assistant-that-works-on-the-sites-files)**: for people who have the site's files on their computer and use an assistant that can edit them (Claude Code, Cursor, Copilot in the editor). It installs the panel, tests it and checks the site's accessibility.

How to use it: click the "copy" icon at the top right of the box, open a new chat, paste and send.

## 1. For a chat

```text
Help me put Tutti Tool on my website. I am not a web professional: guide me,
one step at a time.

Tutti Tool is a free accessibility panel
(https://github.com/IsabellaDuc/Tutti-Tool): a round button appears in a
bottom corner of the site, and visitors adjust text, colours and motion. It
helps people read, but it does not make the site "compliant" with
accessibility rules: never say or write that it does.

HOW TO TALK TO ME
- In your first message tell me the plan in one sentence: we will do three
  things (add the panel, check that it works, see what to improve on the
  site), about twenty minutes in all. Then ask me the first question.
- Short messages. One step at a time: after each step stop and wait until I
  say "done" or describe what I see.
- Plain words. If you need a technical term, explain it in one sentence the
  first time. Do not assume my gender.
- Tell me where to click using the menu names as I see them. If you are not
  sure what a menu is called, say so and ask me to describe what I see. If I
  cannot find a button, first help me look for it (at the top, next to the
  title, in an "Advanced" menu); only then conclude that it is not there.
- Anything I have to copy (the line of code, an email, a sentence) give it to
  me in a separate box, as plain text: no asterisks, bold or other symbols,
  because I would paste them as they are. Keep emails short.
- Never ask me for passwords, codes or logins, and never ask me to paste them
  here.
- If something goes wrong, calmly tell me how to put things back as they were.

1. QUESTIONS FIRST, one at a time, three at most:
   a. the site's address;
   b. who manages it: me, or an outside person or agency;
   c. what it is built with. If I do not know: if you can open the address,
      find out yourself; otherwise ask me where I log in to edit it (if the
      address contains "wp-admin" it is WordPress; if I log in on wix.com,
      squarespace.com, webflow.com or shopify.com it is that platform).

2. THEN CHOOSE THE PATH and tell me in one sentence.

   A. WordPress and I can log in to the dashboard: the free plugin.
      Guide me like this: download
      https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip
      without unzipping it; in the dashboard Plugins > Add New > Upload Plugin
      > Choose File > Install Now > Activate; then Settings > Tutti Tool:
      button corner, feedback email, colours only if I want them. Save.
      "Upload Plugin" is a button at the top, next to the "Add Plugins" title:
      if it really is not there, my plan does not allow plugins (it happens on
      WordPress.com), and we take path C. If the plugin list includes a
      caching plugin (WP Super Cache, W3 Total Cache, WP Rocket, LiteSpeed…),
      Tutti Tool tries to empty the cache by itself; if the button does not
      appear, guide me to empty it by hand.

   B. Wix, Squarespace, Webflow, Shopify or another service with a field for
      custom code in the head of the pages: one line to paste, which you
      prepare with my details:
      <script src="https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@v0.3.0/tutti-tool.js" integrity="sha384-3gy4KXgul4X5dtWZvoL87DpyGwRYKhOT2CpFLBPgMSHdYi7Xj4wch2jtLgQX/gp2" crossorigin="anonymous" data-lingua="en" data-posizione="destra" data-contatto="EMAIL"></script>
      Change only data-lingua (en or it), data-posizione (destra = right,
      sinistra = left) and data-contatto, never src and integrity. Give me the
      line in a box to copy, then guide me to paste it somewhere that applies
      to every page, in the head:
      - Wix: Settings > Custom Code > Add Custom Code, "All pages", place it
        in "Head" (needs a Premium plan with a connected domain);
      - Squarespace: the Code Injection panel, Header field (Core, Plus,
        Advanced plans);
      - Webflow: Site settings > Custom code > Head code, then publish (paid
        plan);
      - Shopify: Online Store > Themes > "…" > Duplicate (backup), then "…" >
        Edit code > layout/theme.liquid, right below <head>.
      Warn me that this way the file comes from jsDelivr, an external service
      that sees visitors' IP addresses: it must be mentioned in the privacy
      notice.

   C. Someone else manages the site, or I cannot log in, or the plan does not
      allow it: write me a short, polite email for whoever manages it, to
      copy and send. In it: what I am asking and why, the link
      https://github.com/IsabellaDuc/Tutti-Tool, the plugin if it is
      WordPress or else the line from path B, the corner and email I chose,
      a request to tell me when it is done and to point out the site's
      accessibility problems too.

3. THE CHOICES, explained simply:
   - corner: right, or left if a chat, a WhatsApp button or a "back to top"
     already sits bottom right;
   - feedback email: a public email of the site (ask me for it);
   - colours: usually left as they are. If I want the site's colours:
     data-accento is a light colour of the site, data-inchiostro the text
     colour; compute the contrast with the WCAG formula: at least 4.5:1
     between the two and between the ink and white, otherwise keep the
     defaults.

4. LET'S CHECK THAT IT WORKS: tell me to open the site in a private
   (incognito) window, look for the round button in the bottom corner, open
   it, try "Larger text", close it and reload. If the button is not there,
   the usual causes are: the cache (emptied from the caching plugin or the
   hosting), the code placed in the "body" instead of the "head", a plan that
   does not publish custom code, the site not republished.

5. IS THE SITE ACCESSIBLE? Even if I tell you everything is fine, offer me
   this step (I can say no). Explain in two sentences that the panel does not
   fix the site. Then, if you can open my site, tell me the three to five
   most important problems you see, in plain words, saying who is affected.
   If you cannot, suggest WAVE (https://wave.webaim.org): I type the address,
   tell you what I see and you explain it to me: the numbers and the three to
   five most important problems are enough, no need to go item by item unless
   I ask. Prepare a short list I can pass on to whoever manages the site,
   without promising that it is enough to be "compliant".

6. AT THE END a short summary: what we did, how to check it, what is left to
   do and by whom, and whether the privacy notice needs a sentence.
```

## 2. For an assistant that works on the site's files

For an assistant that can read and edit your site's files, for example Claude Code opened in the site's folder. The assistant installs the panel, tests it in a browser, checks the site's accessibility and asks your permission before fixing anything or publishing.

```text
Install Tutti Tool on this site and check its accessibility.

Tutti Tool is a free accessibility panel, a single JavaScript file:
https://github.com/IsabellaDuc/Tutti-Tool (MIT licence). It helps visitors
adjust text, spacing, contrast, colours and motion, but it does not make the
site compliant with accessibility rules: so besides installing it, check the
site. These are two parts of the same job: do both, in full, without asking me
whether to do the check.

Rules: answer me in English, in plain words (I may not be a web professional:
explain technical terms the first time). Work on the files, but do not
publish, deploy or push without my yes. Tell me the path of every file you
create or change. If the site is in git, first suggest working on a new
branch.

1. Look at the site before touching it: how it is built (static HTML,
   generator, framework, CMS), where the <head> of all pages comes from, where
   static files live, the palette (text colour, light brand colours), the body
   font, the language, the public email, the privacy page, analytics, what sits
   in the bottom right corner. If another accessibility panel is already there
   (accessiBe, AccessiWay, UserWay…) stop and ask me. If it is WordPress, use
   the repository's plugin (wordpress/tutti-tool.zip) instead of touching the
   theme.

2. Download
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/tutti-tool.js
   into the static files folder (for example js/tutti-tool.js). Do not edit it:
   it is configured with attributes. If that address does not answer, use
   https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@main/tutti-tool.js
   If neither works, do not write it by hand: tell me, suggest the attributes
   and do the check in step 6 anyway.
   Also download the test script into a scratch folder OUTSIDE the site (it
   must not be published):
   https://raw.githubusercontent.com/IsabellaDuc/Tutti-Tool/main/skill/tutti-tool/prova-pannello.mjs
   It needs Node 22 or later; you use it in steps 3, 5 and 6. Its output is in
   Italian: "ok" passes, "NO" fails.

3. Choose the attributes (all optional, names in Italian):
   data-lingua (it | en; defaults to <html lang>),
   data-posizione (destra = right | sinistra = left; left if something already
   sits bottom right), data-contatto (the site's public email; ask me if there
   is none), data-dichiarazione (only if an accessibility statement exists),
   data-accento (a light colour from the site's palette, a pastel or a cream,
   for the button and active choices; not the strong brand colour, and if there
   is no light colour keep the default), data-inchiostro (the site's dark text
   colour, for the panel's text, borders and header), data-carattere (the
   site's body font family, only if it is loaded on every page). Ink on white
   and ink on accent need a contrast of at least 4.5:1: compute it, do not
   guess, with node prova-pannello.mjs --contrasto "#1C1D21" "#F4EEA9". If you
   cannot reach it, keep the default colours.

4. Add the line inside the <head> of every page (or the shared layout), as high
   as possible, before other scripts, without defer or async:
   <script src="/js/tutti-tool.js" data-lingua="en" data-posizione="destra" data-contatto="…"></script>
   Use the right path for each page. In frameworks put it in the main layout or
   the entry HTML file.

5. Check in a browser: node prova-pannello.mjs <site folder> (or, if the
   pages are built, start the dev server and use
   node prova-pannello.mjs http://localhost:<port>/). The script finds Chrome,
   Edge or Chromium by itself, opens the pages headless and checks loading, the
   button, click, Alt + Shift + A and Esc, that a choice applies on the other
   pages, the contrasts and console errors. If a test says "NO", fix it and run
   it again; if it warns that it blocked external files that did not answer,
   tell me. If no browser is found, try Playwright or Puppeteer if the project
   has them; otherwise tell me and check by reading the code. Do not tell me it
   works unless you have seen it work.

6. Check the site's accessibility against WCAG 2.2 level AA, in full, on every
   point and every page (not a quick scan):
   <html lang> and page titles; image alt text (empty for decorative images);
   contrast computed with prova-pannello.mjs --contrasto, text first and
   background second, semi-transparent rgba colours included (text 4.5:1, large
   text 3:1, field and button borders 3:1, also on hover, focus and dark
   theme); one h1 per page and heading levels without gaps; header, nav, main,
   footer and a "skip to content" link; links that make sense on their own;
   form fields with labels and clear errors; everything reachable with Tab,
   visible focus, no clickable divs without a role; prefers-reduced-motion
   respected and nothing flashing; zoom not blocked in the viewport and no
   horizontal scrolling at 320 px; targets of at least 24 × 24 px; captions
   and transcripts; ARIA used correctly.
   Give me a numbered list, from the most serious problem to the lightest, with
   file and line, who is affected and how to fix it; then, briefly, the points
   that pass and those you could not check, with the reason. Fix nothing
   before my yes.

7. Privacy: the panel uses no cookies and sends no data, it saves choices in
   localStorage; with Umami it records the event "accessibilita". If the site
   has a privacy page, suggest a sentence to add.

8. At the end tell me: where you put the file and the line, the attributes you
   chose and why, what you tested in the browser and the result, how to try
   it, the accessibility report and what is waiting for my yes. Never write
   anywhere that the site is "compliant" because of the panel.
```
