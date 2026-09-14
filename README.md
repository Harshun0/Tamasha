# Tamasha Landing Page

TAMASHA — Landing Page Build Prompt (for Lovable)

Overview

Build a single-page, funky, colorful, nostalgic landing page for an event called "TAMASHA — A Strangers' Meetup." The visual language should feel like a vintage travel poster crossed with an indie Bollywood film aesthetic — warm, sun-washed colors, hand-drawn doodle accents, and a playful, mysterious tone throughout. Fully responsive (mobile-first).

Visual Style Guide

Color Palette:

Mustard yellow: #F4C542 (primary background / accents)

Teal/deep sea blue: #1E6E7A (headers, buttons)

Coral/terracotta: #E8734A (CTA highlights)

Cream/off-white: #FCF3DD (section backgrounds, text panels)

Charcoal navy: #1A2B3C (body text)

Typography:

Headlines: a bold, handwritten/script display font (e.g., "Caveat," "Permanent Marker," or "Kalam") — big, playful, slightly tilted

Body text: a clean, readable sans-serif (e.g., "Poppins" or "Inter") for legibility

Section labels: uppercase, letter-spaced small caps for contrast against the handwritten headlines

Illustration/Imagery:

Use stylized, illustrated artwork (flat vector or retro-poster style) — cliffs, coastline, palm trees, silhouetted figures — NOT real photographs or real people's likenesses

Hand-drawn doodle elements scattered throughout: arrows, stars, squiggly underlines, torn-paper edges, postcard-stamp motifs

Rounded cards with soft drop shadows; occasional slight rotation on images/cards for a scrapbook feel

Motion/Interaction:

Subtle fade-up animations as sections scroll into view

Buttons: gentle scale/bounce on hover, color shift from coral to teal

Sticky "Get Tickets" button in the nav bar that appears after scrolling past the hero

Page Sections & Copy

1. Hero Section

Full-width illustrated cliffside/coastline background (sunset tones)

Large handwritten title: "TAMASHA"

Tagline directly below: "Kaun ho tum? Koi nahi jaanta."

Small subtext: "A strangers' meetup where nobody knows your name."

Primary CTA button: "Get Tickets →" (links out to the District app — placeholder URL for now)

Secondary ghost-button: "How it works" (scrolls down to section 3)

2. The Inspiration Section

Heading: "Inspired by a Bollywood classic"

Narrative copy (storytelling tone, 2-3 short paragraphs): describe how the event draws from a beloved Bollywood film's iconic Corsica scene, where two strangers meet without revealing who they really are, and go by aliases instead — capturing that same spirit of anonymous, judgment-free connection.

Important: Do not name real actors or use real photographs/likenesses. Reference it only as "inspired by a beloved Bollywood classic" and illustrate with silhouetted, stylized character art instead.

Small illustrated vignette: two silhouetted figures shaking hands against a cliffside sunset (matches hero art style)

3. How It Works Section

Present as a 4–5 step visual flow (numbered cards or a vertical timeline with doodle connector lines):

Register in pairs — 1 guy + 1 girl (friends, not necessarily a couple)

Pick your alias — real name, year, and branch stay hidden all night

Get swapped — once inside, pairs are randomly mixed with other pairs' partners

Talk to strangers — speed-conversation rounds with prompt cards for real, judgment-free talks

Open mic corner — share a thought, story, or secret with zero identity attached

4. Games Section

Heading: "Games & Ice-breakers"

Grid of illustrated icon-cards, one per game: paper-toss game, tambola, "stand on the paper" game, plus a "+ more surprises" card

Small reassurance note under the grid: "Before every game, we check in with you first. Not feeling it? Totally okay to sit one out."

5. Venue & Details Section

Venue name stylized as "Corsica" (the cafe/garden space, branded to match the movie-inspired theme)

Date: "Reveal Soon" (styled as a mystery/teaser badge, e.g., a wax-seal or stamp graphic)

Contact number field (placeholder for the organizer's number)

Small map-pin doodle icon next to the venue name

6. Tickets CTA Section (footer band)

Bold closing line: "Ready to become someone else for a night?"

Large button: "Tickets on District App →" (placeholder link)

Small footer text: contact info, and a closing tagline like "No names. No labels. Just real conversations."

Technical Notes

Single page, smooth-scroll navigation between sections

Mobile-responsive: stack cards vertically, reduce hero text size proportionally

Keep total page lightweight — use SVG/vector illustrations over heavy images where possible

Placeholder links: use # or a clearly marked [DISTRICT_APP_LINK] token for the ticket button so it's easy to find-and-replace later

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/57bfce38-dc74-452e-bb6f-637fa3a18c8b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
