# Tutti Tool

A free accessibility panel for websites, made by [Tutti prompti](https://tuttiprompti.it). A round button appears in a bottom corner of the site: visitors open it and adapt the page to how they read and browse, with larger text, more line spacing, more contrast, a readable font, animations stopped, the page read aloud.

[Leggi in italiano](README.md) · See it at work on [tuttiprompti.it](https://tuttiprompti.it), the button at the bottom left.

> Tutti Tool helps people read, but it **does not make a website compliant** with accessibility rules (WCAG, European Accessibility Act) and must not be presented that way. An accessible site comes from fixing the site; this is why the prompts below, besides installing the panel, help you see what needs fixing.

## Choose your path

You do not need to be a web professional. Find your case:

1. **I have a WordPress site and can log in to the dashboard** → [the plugin](#1-wordpress-the-plugin), five clicks.
2. **My site is on Wix, Squarespace, Webflow or Shopify** → [one line to paste](#2-wix-squarespace-webflow-shopify-one-line-to-paste).
3. **Someone else manages the site** (an agency, a freelancer) → [a ready-made email](#3-someone-else-manages-the-site-a-ready-made-email).
4. **I would rather be guided by an AI** (ChatGPT, Claude, Gemini, Copilot, in the browser) → copy the [chat prompt](PROMPT.en.md#1-for-a-chat): it asks you two or three questions and walks you through, step by step.
5. **I work on the site's files** (developers, or an assistant such as Claude Code or Cursor) → [for developers](#for-developers).

### 1. WordPress: the plugin

1. Download [tutti-tool.zip](https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip). Do not unzip it: WordPress wants it as it is.
2. In the WordPress dashboard: **Plugins → Add New → Upload Plugin**.
3. **Choose File**, select `tutti-tool.zip`, then **Install Now** and **Activate**.
4. Go to **Settings → Tutti Tool**: choose the button's corner and the email for feedback. You can leave the colours as they are. Save.
5. Open the site: the button is in the bottom corner. If you do not see it, empty the cache (the plugin already tries with the most common caching plugins) and reload the page.

The panel is served by your own site: no external service. If you do not see "Upload Plugin", your plan does not allow plugins (it happens on WordPress.com's cheaper plans): take path 3, or ask whoever built your site.

### 2. Wix, Squarespace, Webflow, Shopify: one line to paste

These platforms have a "custom code" field that goes into the head of every page. It usually needs a paid plan. Here is the line; change only the email:

```html
<script src="https://cdn.jsdelivr.net/gh/IsabellaDuc/Tutti-Tool@v0.3.0/tutti-tool.js" integrity="sha384-3gy4KXgul4X5dtWZvoL87DpyGwRYKhOT2CpFLBPgMSHdYi7Xj4wch2jtLgQX/gp2" crossorigin="anonymous" data-lingua="en" data-posizione="destra" data-contatto="hello@yoursite.com"></script>
```

`data-posizione` is `destra` (right) or `sinistra` (left); `data-lingua="en"` shows the panel in English. Where to paste it (menu names change a little over time: if you cannot find them, search "custom code" in the platform's help):

1. **Wix**: Settings → Custom Code → Add Custom Code. Choose "All pages" and place it in "Head". Needs a Premium plan with a connected domain.
2. **Squarespace**: the Code Injection panel, **Header** field. Core, Plus or Advanced plans.
3. **Webflow**: Site settings → Custom code → **Head code**, then publish the site. Needs a paid plan.
4. **Shopify**: Online Store → Themes → "…" on the live theme → **Duplicate** (your backup) → "…" again → Edit code → `layout/theme.liquid`: paste the line right below `<head>` and save.

Two things to know:

1. Do not change `src` and `integrity`: `integrity` guarantees the file is exactly this one and no other.
2. On this path the file comes from jsDelivr, an external service that sees visitors' IP addresses (as happens with Google Fonts or embedded videos). Mention it in your privacy notice; a ready sentence is in [Privacy](#privacy).

### 3. Someone else manages the site: a ready-made email

Copy, fill in the parts in square brackets and send:

> Subject: An accessibility panel for the website
>
> Hi [name],
> I would like to add Tutti Tool to [site address]: a free, open source accessibility panel. https://github.com/IsabellaDuc/Tutti-Tool
>
> - If the site runs on WordPress, the plugin is enough: https://github.com/IsabellaDuc/Tutti-Tool/raw/main/wordpress/tutti-tool.zip (Settings → Tutti Tool: corner [right/left], email [our public email]).
> - Otherwise it is one line in the head of every page; the instructions are in the repository's README.
>
> While you are at it, could you also tell me which accessibility problems the site has (contrast, image alt text, keyboard use)? The repository has a prompt that helps with this check.
> Thanks, let me know when it is done so I can try it.
>
> [signature]

For an email written for your case, use the [chat prompt](PROMPT.en.md#1-for-a-chat): it drafts it for you.

## What the panel offers

1. **Six ready-made profiles**: Reduced motion, Low vision, Focus, Easy reading, Comfortable reading, Keyboard. Each switches on a group of settings, which can then be changed one by one.
2. **Text**: size, page zoom, line, letter and word spacing, readable font, highlighted headings and links, text magnifier, alignment.
3. **Colours**: dark, light or higher contrast; more vivid, softer or black and white; text, heading and background colour.
4. **Finding your way**: stop animations, mute sounds, hide images, reading guide and reading mask, big cursor, read aloud with the device's voice, reading mode, a "Go to…" menu with the page's headings and regions.
5. **The rest**: Italian and English, light and dark, the Alt + Shift + A shortcut, "Reset everything". Choices stay in the visitor's browser and apply to every page of the site.

It has no "screen reader profile": screen reader users already have their own tool, and changing the page on their behalf risks making things worse.

## Privacy

The panel uses no cookies and sends no data: visitors' choices stay in their own browser (`localStorage`). If the site uses [Umami](https://umami.is), it records which features are used (event `accessibilita`), under Umami's rules.

A sentence for your privacy notice, if you use the line to paste (path 2):

> The Tutti Tool accessibility panel is loaded from jsDelivr (cdn.jsdelivr.net), which receives visitors' IP address in order to deliver the file. The panel uses no cookies: display choices stay in the visitor's browser.

With the WordPress plugin, or with the file hosted on your own site, there is no external service; the plugin adds its own sentence to WordPress's privacy policy guide (Settings → Privacy).

## For developers

### Install it by hand

1. Copy [tutti-tool.js](tutti-tool.js) into your site's files, for example into `js/`. It is a single file, no libraries.
2. On every page (or in the shared layout), inside `<head>` and **before other scripts**, without `defer` or `async`:

```html
<script src="/js/tutti-tool.js" data-lingua="en" data-posizione="destra" data-contatto="hello@example.com"></script>
```

It must run before other scripts so that "Stop animations" also applies to JavaScript animations. You can try it right away by opening [esempio/index.html](esempio/index.html) in your browser.

| Attribute | What it does | Default |
|---|---|---|
| `data-lingua` | `it` or `en` | follows `<html lang>` |
| `data-posizione` | `destra` (right) or `sinistra` (left), the button's bottom corner | `destra` |
| `data-contatto` | email for feedback, at the bottom of the panel | no email |
| `data-dichiarazione` | address of the accessibility statement | no button |
| `data-accento` | the light colour of the button and active choices | `#F4EEA9` |
| `data-inchiostro` | the dark colour of the panel's text, borders and header | `#1C1D21` |
| `data-carattere` | the panel's font family | `"Source Sans 3"` and system fonts |
| `data-chiave` | the name under which choices are saved in the browser | `tutti-tool` |
| `data-movimento` | `no` to leave `matchMedia` alone (see below) | `si` |

The accent must stay light and the ink dark, with a contrast of at least 4.5:1 between them and between the ink and white.

### With an assistant that works on the files

1. **Prompt**: [PROMPT.en.md](PROMPT.en.md#2-for-an-assistant-that-works-on-the-sites-files), the second one. It installs the panel, tests it in a browser, checks the site's accessibility (WCAG 2.2 AA) and reports back, fixing nothing before your yes.
2. **Skill for Claude**: copy the [skill/tutti-tool](skill/tutti-tool) folder into `~/.claude/skills/` (or `.claude/skills/` in the project), then ask "install Tutti Tool on this site". The skill also works in a chat without file access: there it acts as a guide, like the chat prompt.
3. **Automatic test**: [skill/tutti-tool/prova-pannello.mjs](skill/tutti-tool/prova-pannello.mjs) (Node 22 or later, no libraries) opens the pages in a headless Chrome, Edge or Chromium and checks loading, the button, click, keyboard, choices carried across pages, contrast and console errors: `node prova-pannello.mjs <site folder>` or `node prova-pannello.mjs http://localhost:5173/`. With `--contrasto "#1C1D21" "#F4EEA9"` it computes the contrast between two colours (`rgba()` too). Its output is in Italian: "ok" passes, "NO" fails.

### How it works

1. The panel lives in a Shadow DOM attached to `<html>`: the site's stylesheets do not touch it and the page adjustments do not touch the panel.
2. Page adjustments are a stylesheet that the panel rewrites at every choice. Text size is computed element by element, so it also works on sites written in pixels.
3. "Stop animations" stops CSS animations and videos, and makes scripts that ask the browser for `prefers-reduced-motion` get a "yes": JavaScript animations that respect that preference stop, fully from the next page load.
4. Read aloud uses the browser's speech synthesis: no external services.

### What is in the repository

| Path | What |
|---|---|
| `tutti-tool.js` | the panel: the only file your site needs |
| `wordpress/tutti-tool.zip` | the WordPress plugin, ready to upload |
| `wordpress/tutti-tool/` | the plugin's source (with a copy of `tutti-tool.js`) |
| `PROMPT.md`, `PROMPT.en.md` | the prompts: for a chat and for an assistant that works on the files |
| `skill/tutti-tool/` | the Claude skill, its chat guide and the test script |
| `esempio/index.html` | a page to try the panel |
| `CHANGELOG.md` | what changes from one version to the next |

Versions are pinned with tags (`v0.3.0`): the jsDelivr line and its `integrity` hash always point to a precise version, never to `main`.

## Licence and contacts

MIT: you may use, modify and redistribute it, including for work, keeping the author's name. See [LICENSE](LICENSE).

Made by Isabella Ducros for [Tutti prompti](https://tuttiprompti.it), AI courses for beginners. Feedback and ideas: this repository's [issues](https://github.com/IsabellaDuc/Tutti-Tool/issues), or scrivi@tuttiprompti.it.
