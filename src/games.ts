/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  genre: string;
  thumbnail: string;
  description: string;
  embedUrl?: string; // For iframe games
  altEmbedUrl?: string; // Backup in case primary is blocked
  isInternal?: boolean; // For games built into the app (like 2048)
}

export const GAMES_DATA: Game[] = [
  {
    id: 'granny-1',
    title: 'Granny Original',
    genre: 'Horror',
    thumbnail: 'https://picsum.photos/seed/grannyoriginal/400/250',
    description: 'The Original Granny experience. Escape the house in 5 days.',
    embedUrl: 'https://sz-games.github.io/Games8/GRANNY/',
    altEmbedUrl: 'https://grannyunblocked.online/'
  },
  {
    id: 'granny-2',
    title: 'Granny 2',
    genre: 'Horror',
    thumbnail: 'https://picsum.photos/seed/granny2/400/250',
    description: 'Granny and Grandpa are now looking for you together.',
    embedUrl: 'https://yoplay.io/granny-horror-2.embed',
    altEmbedUrl: '/granny2-custom.html'
  },
  {
    id: 'fnaf-1',
    title: 'FNAF 1',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/fnaf1/400/250',
    description: 'Welcome to Freddy Fazbear\'s Pizza. Watch the cameras.',
    embedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys'
  },
  {
    id: 'fnaf-2',
    title: 'FNAF 2',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/fnaf2/400/250',
    description: 'New friends, new problems. No doors, just a flashlight and a mask.',
    embedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-2'
  },
  {
    id: 'fnaf-3',
    title: 'FNAF 3',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/fnaf3/400/250',
    description: 'One real threat, many phantoms. Springtrap is coming.',
    embedUrl: 'https://1games.io/game/fnaf-3/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-3'
  },
  {
    id: 'fnaf-4',
    title: 'FNAF 4',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/fnaf4/400/250',
    description: 'The nightmare is now in your home. Listen for breathing.',
    embedUrl: 'https://1games.io/game/fnaf-4/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-4'
  },
  {
    id: 'fnaf-sl',
    title: 'FNAF Sister Location',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/fnafsl/400/250',
    description: 'Welcome to Circus Baby\'s Entertainment. Don\'t get caught.',
    embedUrl: 'https://1games.io/game/fnafsl/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-sister-location'
  },
  {
    id: 'fnaf-ucn',
    title: 'Ultimate Custom Night',
    genre: 'Survival Horror',
    thumbnail: 'https://picsum.photos/seed/ucn/400/250',
    description: 'The ultimate survival challenge. 50 characters at your disposal.',
    embedUrl: 'https://www.miniplay.com/embed/ultimate-custom-night'
  },
  {
    id: '2048',
    title: '2048',
    genre: 'Puzzle',
    thumbnail: 'https://picsum.photos/seed/2048/400/250',
    description: 'Join the numbers and get to the 2048 tile!',
    isInternal: true
  },
  {
    id: 'rocket-goal',
    title: 'Rocket Goal',
    genre: 'Sports',
    thumbnail: 'https://picsum.photos/seed/rocketgoal/400/250',
    description: 'High-speed vehicular soccer. Drive, boost, and score!',
    embedUrl: 'https://yoplay.io/rocket-goal.embed'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    genre: 'Platformer',
    thumbnail: 'https://picsum.photos/seed/geodash/400/250',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    embedUrl: 'https://yoplay.io/geometry-dash.embed'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    genre: 'Sports',
    thumbnail: 'https://picsum.photos/seed/retrobowl/400/250',
    description: 'The perfect game for the armchair quarterback to finally prove a point.',
    embedUrl: 'https://yoplay.io/retro-bowl.embed'
  },
  {
    id: 'space-waves',
    title: 'Space Waves',
    genre: 'Platformer',
    thumbnail: 'https://picsum.photos/seed/spacewaves/400/250',
    description: 'Ride the intergalactic waves in this fast-paced neon platformer.',
    embedUrl: 'https://yoplay.io/space-waves.embed'
  },
  {
    id: 'golf-hit',
    title: 'Golf Hit',
    genre: 'Sports',
    thumbnail: 'https://picsum.photos/seed/golfhit/400/250',
    description: 'A minimalist golfing experience where precision is everything.',
    embedUrl: 'https://yoplay.io/golf-hit.embed'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    genre: 'Action',
    thumbnail: 'https://picsum.photos/seed/subwaysurf/400/250',
    description: 'Dash as fast as you can. Dodge the oncoming trains!',
    embedUrl: 'https://yoplay.io/subway-surfers.embed'
  },
  {
    id: 'slope',
    title: 'Slope',
    genre: 'Action',
    thumbnail: 'https://picsum.photos/seed/slope/400/250',
    description: 'Drive your ball to follow the straight line in space and avoid obstacles as they crash through the race.',
    embedUrl: 'https://yoplay.io/slope.embed'
  },
  {
    id: 'eggy-car',
    title: 'Eggy Car',
    genre: 'Racing',
    thumbnail: 'https://picsum.photos/seed/eggycar/400/250',
    description: 'Drive carefully to keep the egg in the car as you climb hills and navigate bumps.',
    embedUrl: 'https://yoplay.io/eggy-car.embed'
  },
  {
    id: 'survival-race',
    title: 'Survival Race',
    genre: 'Racing',
    thumbnail: 'https://picsum.photos/seed/survivalrace/400/250',
    description: 'Race to survive against obstacles and other drivers in this high-stakes competition.',
    embedUrl: 'https://yoplay.io/survival-race.embed'
  },
  {
    id: 'monkey-mart',
    title: 'Monkey Mart',
    genre: 'Strategy',
    thumbnail: 'https://picsum.photos/seed/monkeymart/400/250',
    description: 'Manage your own supermarket as a hardworking monkey. Plant, harvest, and sell products to customers.',
    embedUrl: 'https://yoplay.io/monkey-mart.embed'
  },
  {
    id: 'rivals-fps',
    title: 'Rivals FPS',
    genre: 'Action',
    thumbnail: 'https://picsum.photos/seed/rivalsfps/400/250',
    description: 'A fast-paced first-person shooter where you compete against rivals in intense combat scenarios.',
    embedUrl: 'https://yoplay.io/veckio.embed'
  }
];
