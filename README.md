# Nachesopoly: Valley Ventures

**Naches Edition · Stage 2.5.1 development preview**

Nachesopoly is a browser-based, locally themed property-trading game inspired by classic board games. Players travel around a 40-space Naches Valley board, purchase fictionalized game representations of local businesses, collect rent, build improvements, trade, and respond to community events.

The game is intended for educational and recreational use, including middle-school financial literacy and decision-making discussions. It runs in the browser with no account or server required.

> **Release status:** Development preview. Automated tests have covered major features and the Stage 2.5.1 upgrades, but live school-Chromebook testing and real GitHub Pages save/reload validation are still recommended before broad student use.

## How to play

1. Choose **Quick Play** (round limit or classroom timer) or **Full Game** (last financially solvent player wins).
2. Choose **2–4 total players**. You can have human players sharing one device and up to three computer players; at least one human is required.
3. Give each player a distinct valley-themed token and color; tokens are cosmetic.
4. Choose computer difficulty, pacing, and House Rules. Start the match.
5. Roll two dice, travel around the perimeter, purchase available properties, pay rent, and respond to the event cards you draw.
6. Own every business in a color set to unlock upgrades. Manage cash carefully: taxes, rent, and unexpected events can be expensive.
7. Use **Save / Export** to back up a match if you intend to continue later.

### Board corners

| Corner | Meaning |
| --- | --- |
| **Gateway to Naches** (bottom right) | START. Typically collect $200 when passing or landing normally; optional extra $100 for landing exactly on START. |
| **Scenic Detour / Visiting** (bottom left) | Detour holding area. Landing normally is only a visit; being sent here can restrict movement until released. |
| **Naches Depot Park** (top left) | Free Parking-style resting spot. With the jackpot rule enabled, landing here collects the accumulated community pot. |
| **Road Closure: Detour** (top right) | Go directly to the Scenic Detour holding area. |

### The two event-card decks

- **Valley Opportunity** and **Community Events** each contain 24 cards.
- Event spaces trigger a shuffled card draw, flip animation, and a reading pause.
- Cards can give or take money, move players, offer choices, or create temporary effects.
- The decorative stacks in the middle of the board are there to show the decks; clicking them does **not** draw a card outside a turn.

## Buying and improving properties

Business properties belong to one of eight color sets: **Brown, Light Blue, Pink, Orange, Red, Yellow, Green, and Dark Blue**. The light version of each group's color now fills its board tile; the stronger colored stripe still identifies the group. Routes, utilities, taxes, and event spaces remain visually separate.

**To build upgrades:**

1. **Own every business in the color set.** For example, the Dark Blue set contains **Bron Yr Aur Brewing Co.** and **Allan Brothers Fruit** (the two dark-blue business spaces near Gateway to Naches).
2. Make sure **none of the businesses in the set are mortgaged**.
3. Have enough cash to pay the improvement cost. **Dark Blue costs $200 per upgrade per property**.
4. If **Even building** is on, spread improvements evenly. You cannot take one Dark Blue property to Level 2 until the other is at Level 1.
5. During your turn, **click the owned property on the board or your property card in the dashboard**. The property details now show set progress, the current and next rent, and an **Upgrade this property** button whenever building is allowed. You can also use **Property management → +**.
6. A property can have four ordinary improvements and then a final **Level 5 Landmark** improvement. The board displays development markers; your property card also shows its level.

**If the upgrade button is disabled**, the property details explain the specific reason, such as a missing group property, mortgage, insufficient cash, or the even-building restriction. Building is available during your own roll/management portion of the turn, not while resolving another game action.

### Improvement prices per business

| Color set | Cost per upgrade |
| --- | ---: |
| Brown / Light Blue | $50 |
| Pink / Orange / Red | $100 |
| Yellow | $150 |
| Green / Dark Blue | $200 |

Routes and utilities collect rent under their own rules, but **cannot be upgraded**.

## Default House Rules in this build

| Rule | Default |
| --- | --- |
| Extra roll for doubles | ON |
| Depot Park jackpot | ON |
| Property auctions | ON |
| Even building | ON |
| Exact-landing START bonus | ON |
| Relaxed detour | OFF |
| No buying on the first lap | ON |
| Completed-group rent bonus | ON |
| Player trading | ON |
| Fast auction mode | ON |

**Important for new players:** With **No buying on the first lap ON**, you cannot buy a property until you have completed your first circuit of the board. Quick Play therefore defaults to **12 rounds per player** to leave time for purchasing and upgrading. Turn this restriction off under House Rules for faster starts.

These are configurable **house rules**, not all official rules of any other board game. In particular, the Depot Park jackpot is optional. Eligible bank fees, assessments, and detour-release payments add to the jackpot; rent paid to other players does not.

## Computer opponents, auctions, and trades

- Computer players use separate difficulties (**Easy, Normal, Hard**) and styles (**Saver, Investor, Negotiator, Strategist**).
- You can choose a slower narration pace and read computer-turn recaps.
- Unpurchased properties may go to auction, if that House Rule is on.
- Trading supports property/cash offers and counteroffers. Computer-initiated trades are basic rather than an open-ended negotiation engine.

## Saving and privacy

- The game attempts to **autosave locally in the current browser**. A Chromebook using guest/incognito mode or clearing its browser data may lose that local save.
- **Save / Export** allows a portable backup to be exported and later imported when supported by the on-screen dialog.
- Player names and game progress are intended to remain in the local browser; **no account, online multiplayer, or external game server** is required.
- Back up before switching computers or clearing browser data. Test import/export and resume on your deployed site before relying on them in class.

## GitHub Pages setup

The repository must contain these files in the **root directory**:

```text
nachesopoly/
├── index.html
├── styles.css
├── data.js
├── game.js
└── README.md
```

1. Create or open your **nachesopoly** repository on GitHub (separate from the Learning Hub repository).
2. Choose **Add file → Upload files** and upload or replace the five files shown above, then **Commit changes**.
3. In the repository go to **Settings → Pages**.
4. Set **Build and deployment → Deploy from a branch → main → /(root)**, then save.
5. Your game will ordinarily appear at `https://YOUR-USERNAME.github.io/nachesopoly/`. Confirm the actual URL under GitHub Pages settings.
6. On an update, reload with **Ctrl + Shift + R** to bypass old cached files.
7. Start a new game for the latest default House Rules. Previously saved games are designed to retain their original settings.

**Learning Hub:** This update changes only the game repository. If your Learning Hub already links to the same Nachesopoly GitHub Pages URL, its `index.html` and `activities.json` do not need replacing. **Do not upload this game's `index.html` to the Learning Hub repository.**

## Quick verification checklist

- [ ] New 2–4-player match starts; token and player colors appear correctly.
- [ ] All 40 board spaces display with readable labels; business-group backgrounds are subtly tinted.
- [ ] The first-lap purchase restriction works when enabled.
- [ ] Owning both Dark Blue businesses shows **Set complete** and unlocks upgrades when conditions are met.
- [ ] After upgrading one Dark Blue property, you must develop the other before upgrading that first property again (Even building ON).
- [ ] Both event decks reveal readable, animated cards and resolve their effects.
- [ ] Taxes/detour fines contribute to the Depot Park jackpot; it pays out when someone lands there.
- [ ] Computer turns, auctions, and trading proceed without stalls.
- [ ] Saving, refreshing the live site, and resuming preserves money, ownership, upgrades, and whose turn it is.

## Project notes

This edition uses recognizable Naches-area business and landmark names as community references. **All prices, rent, events, and financial outcomes are fictional and do not indicate endorsement, sponsorship, or a relationship with any named business.**

This repository presently includes the **Naches Edition**. Yakima, Cowiche, Selah, deeper teacher reporting, and expanded cosmetic progression remain future work. This development build should not be described as fully classroom-certified based solely on automated tests.
