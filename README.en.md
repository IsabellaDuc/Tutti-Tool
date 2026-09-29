# Tutti Tool

A free accessibility panel for websites, made by [Tutti prompti](https://tuttiprompti.it). Visitors open a button in a corner and adapt the page to the way they read and browse: larger text, more line spacing, contrast, a readable typeface, stopped animations, a reading guide, the page read aloud.

[Leggi in italiano](README.md) · See it at work on [tuttiprompti.it](https://tuttiprompti.it), bottom left button.

## What the panel offers

1. **Six ready-made profiles**: Reduced motion, Low vision, Focus, Easy reading, Comfortable reading, Keyboard. Each one switches on a group of settings, which can then be changed one by one.
2. **Text**: size, page size, line, letter and word spacing, readable typeface, highlighted headings and links, text magnifier, alignment.
3. **Colours**: dark, light or higher contrast; brighter, softer or black-and-white colours; text, heading and background colour.
4. **Finding your way**: stop animations, mute sounds, hide images, reading guide and reading band, big cursor, read aloud with the device's own voice, reading mode, a "Go to…" menu with the page's headings and regions, quick keys.
5. **The rest**: Italian and English, light and dark, the Alt + Shift + A shortcut, "Reset all". Choices stay in the visitor's browser and apply to every page of the site.

## What it does not do

Tutti Tool helps people read, but it does not make a website compliant with accessibility rules (WCAG, European Accessibility Act) and should not be presented that way. An accessible site comes from fixing the site itself: alternative text for images, enough contrast, headings in order, labelled form fields, everything usable from the keyboard. This is why the prompt and the skill below also check the site and report what needs fixing, besides installing the panel.

There is no "screen reader profile": people who use a screen reader already have their own tool, and changing the page on their behalf can make things worse.

## Install it with an AI

Open [PROMPT.md](PROMPT.md), copy the prompt and paste it into an assistant that can read and edit your site's files (for example Claude Code, opened in the site's folder). The prompt downloads the panel, matches it to the site's colours, installs it, checks the site's accessibility and gives you a report.

If you use Claude Code often, install the skill: copy the [skill/tutti-tool](skill/tutti-tool) folder into `~/.claude/skills/` (for your computer) or `.claude/skills/` inside the project. Then just ask "install Tutti Tool on this site".

## Install it by hand

1. Download [tutti-tool.js](tutti-tool.js) and put it with the site's files, for example in `js/`.
2. In every page, inside `<head>` and before other scripts, add:

```html
<script src="js/tutti-tool.js" data-lingua="en" data-posizione="destra" data-contatto="you@example.com"></script>
```

The attribute names are in Italian, like the project. All of them are optional:

| Attribute | What it does | Default |
|---|---|---|
| `data-lingua` | `it` or `en` | follows `<html lang>` |
| `data-posizione` | `destra` (right) or `sinistra` (left), the bottom corner of the button | `destra` |
| `data-contatto` | email for feedback, at the bottom of the panel | none |
| `data-dichiarazione` | address of the accessibility statement | no button |
| `data-accento` | the light colour of the button and of active choices | `#F4EEA9` |
| `data-inchiostro` | the dark colour of the panel's text, borders and header | `#1C1D21` |
| `data-carattere` | the panel's font family | `"Source Sans 3"` and system fonts |
| `data-chiave` | the name under which choices are saved in the browser | `tutti-tool` |
| `data-movimento` | `no` to leave `matchMedia` alone (see below) | `si` |

Keep the accent light and the ink dark: the panel writes in ink on top of the accent.

## How it works

1. One JavaScript file, no libraries. The panel lives in a Shadow DOM attached to `<html>`, so the site's stylesheets do not reach it.
2. Page settings are a stylesheet that the panel rewrites at every choice. Text size is computed element by element, so it also works on sites written in pixels.
3. "Stop animations" stops CSS animations and videos, and makes scripts that ask the browser for `prefers-reduced-motion` get a "yes": JavaScript animations that respect that preference stop, completely from the next page load.
4. Reading aloud uses the browser's speech synthesis: no external services.

## Privacy

The panel sends no data anywhere and uses no cookies. Choices stay in the visitor's browser `localStorage`. If the site runs [Umami](https://umami.is), the panel records which features are used (event `accessibilita`), under Umami's rules.

## Licence

MIT: you can use, change and redistribute it, including for work, keeping the author's name. See [LICENSE](LICENSE).

Made by Isabella Ducros for [Tutti prompti](https://tuttiprompti.it), AI courses for beginners. Feedback and ideas: this repository's [issues](https://github.com/IsabellaDuc/Tutti-Tool/issues), or scrivi@tuttiprompti.it.
