# Untitled Card Game

This is a card game I am creating from scratch using boardgame.io and Next.js. The purpose of this was to challenge me into creating something I didn't really think was possible within a react based application. As of right now, this is currently holding as a Proof of Concept to see if I am able to maintain a bigger project on myself. 

The concept is similar to Hearthstone, as I feel that genre needs some more web love. So I will be attempting a decent recreation, but not nearly as polished, of course. (Who knows, maybe in the future I will get this actually completed.)

## TODO
- [x] Initial Card Setup
- [x] Basic board layout created with drag events to specific positions
- [ ] Player "Mana Pool" 
- [ ] Turn Phasing and order
- [ ] Player HP tracking
- [ ] Basic Card Attacks and defending
- [ ] "Spells" and different card types
- [ ] End Game Screen
- [ ] Database hookups

## Other Plans / Ideas

The eventual goal once this POC is completed is to have a website built within this website in order to handle all the user player base things such as creating decks, and have it all contained within this single application. Multiplayer will also be handled within boardgame.io, with the eventual goal being a fully playable card game within the web. Designs and such will come later, as I am not a designer at all, so everything will look pretty ugly for a while!

## Known Issues / Bugs
- can't separate Card and Board components because it requires a movement variable to track what card is actually being dragged into the specific zone. Possible fix: Implementing top level state to track this.

SOLUTION:  monitor.getItem() within the drop container actually holds the type value, but you must manually put this in yourself. No more random variables!

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.