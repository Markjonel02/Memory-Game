# Memory Game

React 18 + TypeScript + SCSS Modules, built with Vite.

## Run it

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build
```

## Folder structure

```
src/
├── components/   One folder per component (tsx + module.scss together)
│   ├── Board/
│   ├── Card/
│   ├── Controls/
│   ├── DifficultySelect/
│   ├── Stats/
│   └── WinMessage/
├── hooks/        useMemoryGame (all game logic), useTimer
├── utils/        shuffle, deck creation, time formatting (pure functions)
├── constants/    difficulty levels, card symbols, mismatch delay
├── types/        shared TypeScript types
└── styles/       _variables, _mixins, global.scss
```

## Design decisions

- **Logic lives in a hook**, components are mostly presentational. `App` only wires them together.
- **Face-up state is derived**: a card is face-up if it's matched or its id is in `flippedIds`. Fewer booleans to keep in sync.
- **Input lock**: while two cards are flipped, further clicks are ignored (`isLocked`).
- **A move** = one pair of flips (counted on the second flip).
- **Timer** starts on the first flip and stops when every card is matched.
- **Accessibility**: cards are real `<button>`s with descriptive `aria-label`s, visible focus ring, win message uses `role="status"`, animation is reduced for `prefers-reduced-motion`.
- **Responsive**: CSS grid driven by a `--cols` custom property; emoji size scales with card size; works down to 320px.

## Trade-offs / what I'd do with more time

- Unit tests for `createDeck` and `useMemoryGame` (Vitest + Testing Library).
- Best score saved in `localStorage`.
- Move focus / announce results to screen readers for each match attempt.
- Replace emoji with SVG icons for consistent rendering across platforms.
