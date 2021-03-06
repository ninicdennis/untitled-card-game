# Untitled Card Game

This is a card game I am creating from scratch using boardgame.io and Next.js. The purpose of this was to challenge me into creating something I didn't really think was possible within a react based application. As of right now, this is currently holding as a Proof of Concept to see if I am able to maintain a bigger project on myself. 

The concept is similar to Hearthstone, as I feel that genre needs some more web love. So I will be attempting a decent recreation, but not nearly as polished, of course. (Who knows, maybe in the future I will get this actually completed.)

## Phases

The card game will be broken down into 5 phases, with hopefully more that can be added easily. They go as follows:

_Draw Step_ - Draw a card, gain a mana, move on to next phase.

_Upkeep Step_ - This is where you would make your plays, consisting of summoning, using spells, etc.

_Battle Step_ - Where you decide which one of your monsters you would like to attack, and which you want to stay.

_Offkeep Step_ - Similar to Upkeep, this is after everything has happened, when you want to use any remaining spells or abilities.

_End Step_ - This is when the turn is over and gets passed to the other player.

After each End Step, the chart begins at step 1, and repeats until a victor is decided.

## TODO
- [x] Initial Card System Setup
- [x] Card Creation
   - [x] Basic card layout with name value and id
   - [ ] More "fluff" - description, image, etc.
   - [ ] Effect: keyword effect pool.
   - [ ] Hp and Def: how much they attack and defend.
- [x] Basic board layout created with drag events to specific positions
- [x] Player "Mana Pool" 
   - [x] Mana adding function
   - [x] Mana automatically adding on turn functionality
   - [x] Mana removal on card summon (Based on card cost)
   - [x] Mana per turn + usable mana, regenerates and keeps track of how much mana you have. 
- [ ] Turn Phasing and order
   - [x] Phasing logic setup
   - [x] Draw Step - Drawing a card automatically on start of turn + 1 mana
   - [x] Upkeep Step - Card summons, drag spells, etc. 
   - [ ] Battle Step - Selected cards attack forward to adjacent cards for block, if not attack directly.
   - [ ] Offkeep Step - Card Summons, drag spells, etc. Same as upkeep but after battle.
   - [ ] Endphase Step - Finishing, pass to other player.
- [x] Player HP tracking
   - [x] Hitpoint adding and subtracting functions
   - [ ] On damage step calculations
- [ ] Card attacking
   - [ ] Picking each card on this specific stage.
   - [ ] Function to check if there is an adjacent card in front to defend.
   - [ ] Attack step per card to do damage.
   - [ ] Possible effects for damage? (Might come later during design phases)
- [ ] "Spells" and different card types
   - [ ] Spell cards: cards you do not summon, but instead trigger
- [ ] End Game Screen (You Win/Lose!)
- [ ] Database hookups, websockets for multiplayer, grabbing user data.

- [ ] Design (This ones all the way down here because I'm not the best at it!)

## Future List: Website
- [ ] Website to register / sign up
- [ ] Screen to queue for a game with another player
- [ ] Deck editor
- [ ] Card Pack system (Free of course, who charges money? )
- [ ] Points earning system for participating, in order to gain points

## Other Plans / Ideas

The eventual goal once this POC is completed is to have a website built within this website in order to handle all the user player base things such as creating decks, and have it all contained within this single application. Multiplayer will also be handled within boardgame.io, with the eventual goal being a fully playable card game within the web. Designs and such will come later, as I am not a designer at all, so everything will look pretty ugly for a while!

## Known Issues / Bugs
- can't separate Card and Board components because it requires a movement variable to track what card is actually being dragged into the specific zone. Possible fix: Implementing top level state to track this.

SOLUTION:  monitor.getItem() within the drop container actually holds the type value, but you must manually put this in yourself. No more random variables!

### Getting Started
Install the packages: 

``` npm i ```

Then, un the development server: 

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.