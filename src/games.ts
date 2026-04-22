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
  aspectRatio?: string; // e.g. '16/9' or '4/3'
}

export const GAMES_DATA: Game[] = [
  {
    id: 'granny-1',
    title: 'Granny Original',
    genre: 'Horror',
    thumbnail: 'https://images.crazygames.com/granny/20210211100511/granny-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'The Original Granny experience. Escape the house in 5 days.',
    embedUrl: 'https://sz-games.github.io/Games8/GRANNY/',
    altEmbedUrl: 'https://grannyunblocked.online/'
  },
  {
    id: 'granny-2',
    title: 'Granny 2',
    genre: 'Horror',
    thumbnail: 'https://images.crazygames.com/granny-2/20210211100511/granny-2-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Granny and Grandpa are now looking for you together.',
    embedUrl: 'https://yoplay.io/granny-horror-2.embed',
    altEmbedUrl: '/granny2-custom.html'
  },
  {
    id: 'fnaf-1',
    title: 'FNAF 1',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/319510/header.jpg',
    description: 'Welcome to Freddy Fazbear\'s Pizza. Watch the cameras.',
    embedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys'
  },
  {
    id: 'fnaf-2',
    title: 'FNAF 2',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/332800/header.jpg',
    description: 'New friends, new problems. No doors, just a flashlight and a mask.',
    embedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-2'
  },
  {
    id: 'fnaf-3',
    title: 'FNAF 3',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/354140/header.jpg',
    description: 'One real threat, many phantoms. Springtrap is coming.',
    embedUrl: 'https://1games.io/game/fnaf-3/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-3'
  },
  {
    id: 'fnaf-4',
    title: 'FNAF 4',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/388090/header.jpg',
    description: 'The nightmare is now in your home. Listen for breathing.',
    embedUrl: 'https://1games.io/game/fnaf-4/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-4'
  },
  {
    id: 'fnaf-sl',
    title: 'FNAF Sister Location',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/506610/header.jpg',
    description: 'Welcome to Circus Baby\'s Entertainment. Don\'t get caught.',
    embedUrl: 'https://1games.io/game/fnafsl/',
    altEmbedUrl: 'https://www.miniplay.com/embed/five-nights-at-freddys-sister-location'
  },
  {
    id: 'fnaf-ucn',
    title: 'Ultimate Custom Night',
    genre: 'Survival Horror',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/871720/header.jpg',
    description: 'The ultimate survival challenge. 50 characters at your disposal.',
    embedUrl: 'https://www.miniplay.com/embed/ultimate-custom-night'
  },
  {
    id: 'snake-2048',
    title: 'Snake 2048',
    genre: 'Puzzle',
    thumbnail: 'https://images.crazygames.com/snake-2048/20231121111044/snake-2048-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A frantic mix of Snake and 2048. Eat numbers to grow and merge!',
    embedUrl: 'https://playgama.com/export/game/snake-2048-64be-1'
  },
  {
    id: 'rocket-goal',
    title: 'Rocket Goal',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/rocket-goal/20210211100511/rocket-goal-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'High-speed vehicular soccer. Drive, boost, and score!',
    embedUrl: 'https://yoplay.io/rocket-goal.embed'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    genre: 'Platformer',
    thumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/222140/header.jpg',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    embedUrl: 'https://yoplay.io/geometry-dash.embed'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/retro-bowl/20220608121639/retro-bowl-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'The perfect game for the armchair quarterback to finally prove a point.',
    embedUrl: 'https://yoplay.io/retro-bowl.embed'
  },
  {
    id: 'space-waves',
    title: 'Space Waves',
    genre: 'Platformer',
    thumbnail: 'https://images.crazygames.com/space-waves/20231121111044/space-waves-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Ride the intergalactic waves in this fast-paced neon platformer.',
    embedUrl: 'https://yoplay.io/space-waves.embed'
  },
  {
    id: 'golf-hit',
    title: 'Golf Hit',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/golf-hit/20210211100511/golf-hit-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A minimalist golfing experience where precision is everything.',
    embedUrl: 'https://yoplay.io/golf-hit.embed'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/subway-surfers/20220211100511/subway-surfers-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Dash as fast as you can. Dodge the oncoming trains!',
    embedUrl: 'https://yoplay.io/subway-surfers.embed'
  },
  {
    id: 'slope',
    title: 'Slope',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/slope/20210211100511/slope-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Drive your ball to follow the straight line in space and avoid obstacles as they crash through the race.',
    embedUrl: 'https://yoplay.io/slope.embed'
  },
  {
    id: 'eggy-car',
    title: 'Eggy Car',
    genre: 'Racing',
    thumbnail: 'https://images.crazygames.com/eggy-car/20201015100511/eggy-car-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Drive carefully to keep the egg in the car as you climb hills and navigate bumps.',
    embedUrl: 'https://yoplay.io/eggy-car.embed'
  },
  {
    id: 'survival-race',
    title: 'Survival Race',
    genre: 'Racing',
    thumbnail: 'https://images.crazygames.com/survival-race/20210311100511/survival-race-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Race to survive against obstacles and other drivers in this high-stakes competition.',
    embedUrl: 'https://yoplay.io/survival-race.embed'
  },
  {
    id: 'monkey-mart',
    title: 'Monkey Mart',
    genre: 'Strategy',
    thumbnail: 'https://images.crazygames.com/monkey-mart/20221111100511/monkey-mart-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Manage your own supermarket as a hardworking monkey. Plant, harvest, and sell products to customers.',
    embedUrl: 'https://yoplay.io/monkey-mart.embed'
  },
  {
    id: 'rivals-fps',
    title: 'Rivals FPS',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/rivals-fps/20210511100511/rivals-fps-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A fast-paced first-person shooter where you compete against rivals in intense combat scenarios.',
    embedUrl: 'https://playgama.com/export/game/rivals-fps-online-shooter'
  },
  {
    id: 'stickman-hook',
    title: 'Stickman Hook',
    genre: 'Platformer',
    thumbnail: 'https://images.crazygames.com/stickman-hook/20210211100511/stickman-hook-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Swing through levels as a ninja stickman. Use your grappling hook to reach the finish line!',
    embedUrl: 'https://yoplay.io/stickman-hook.embed'
  },
  {
    id: 'fruit-ninja',
    title: 'Fruit Ninja',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/fruit-ninja/20210211100511/fruit-ninja-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'The world-famous fruit-slicing game. Chop your way to a high score while avoiding bombs!',
    embedUrl: 'https://html5.gamedistribution.com/2da1f019d9954a2c94ab30f6646e043d/?gd_sdk_referrer_url=https://gamedistribution.com/games/fruit-ninja/'
  },
  {
    id: 'basketball-legends',
    title: 'Basketball Legends',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/basketball-legends-2020/20220211100511/basketball-legends-2020-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Play as legendary basketball icons in this sports game. Dunk, shoot, and defend your way to victory!',
    embedUrl: 'https://yoplay.io/basketball-legends.embed'
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    genre: 'Racing',
    thumbnail: 'https://images.crazygames.com/moto-x3m/20210211100511/moto-x3m-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Perform extreme stunts on your bike across challenging levels. Speed is key to beating the clock!',
    embedUrl: 'https://yoplay.io/moto-x3m.embed'
  },
  {
    id: 'crazy-balls-3d',
    title: 'Crazy Balls 3D',
    genre: 'Racing',
    thumbnail: 'https://cdn2.y8.com/cloudimage/26949/file/w180h135_webp-9ae688228013a3015f639e13920014eb.webp',
    description: 'Race through challenging 3D tracks, collecting gems and avoiding obstacles in this fast-paced ball runner.',
    embedUrl: 'https://www.y8.com/embed/crazy_balls_3d_racing'
  },
  {
    id: 'soccer-heads',
    title: 'Soccer Heads',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/soccer-heads/20210211100511/soccer-heads-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Championship soccer with a big-head twist. Pick your team and dominate the pitch!',
    embedUrl: 'https://html5.gamedistribution.com/ad37a85f16e246fabdc818f375a5eb45/?gd_sdk_referrer_url=https://nexustunnel.net/games/soccer-heads'
  },
  {
    id: 'baldis-basics',
    title: 'Baldi\'s Basics',
    genre: 'Horror',
    thumbnail: 'https://img.itch.zone/aW1nLzEyMzIzNjEucG5n/315x250%23c/0wzG%2Bz.png',
    description: 'A meta horror game that\'s really weird, with no real educational value to be found. Can you find all the notebooks?',
    embedUrl: 'https://www.play-games.com/iframe/26411.html'
  },
  {
    id: 'pokemon-ruby',
    title: 'Pokemon Ruby',
    genre: 'RPG',
    thumbnail: 'https://archives.bulbagarden.net/media/upload/c/c5/Ruby_EN_boxart.png',
    description: 'Embark on an adventure in the Hoenn region. Catch \'em all in this classic GBA RPG.',
    embedUrl: 'https://www.play-games.com/iframe/26868.html'
  },
  {
    id: 'pokemon-emerald',
    title: 'Pokemon Emerald',
    genre: 'RPG',
    thumbnail: 'https://archives.bulbagarden.net/media/upload/a/a2/Emerald_EN_boxart.png',
    description: 'Experience the definitive Hoenn adventure. Battle Team Magma and Team Aqua to save the world.',
    embedUrl: 'https://www.play-games.com/iframe/26628.html'
  },
  {
    id: 'bloxd-io',
    title: 'Bloxd.io',
    genre: 'Sandbox',
    thumbnail: 'https://images.crazygames.com/bloxd-io/20210211100511/bloxd-io-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A browser-based Minecraft clone with multiple game modes including parkour, survival, and creative build.',
    embedUrl: 'https://www.play-games.com/iframe/33896.html'
  },
  {
    id: 'steal-a-brainrot',
    title: 'Steal a Brainrot',
    genre: 'Action',
    thumbnail: 'https://picsum.photos/seed/brainrot/1200/630',
    description: 'A chaotic action game where you collect brainrots and survive the madness.',
    embedUrl: 'https://yoplay.io/steal-brainrots.embed'
  },
  {
    id: 'melon-sandbox',
    title: 'Melon Sandbox',
    genre: 'Sandbox',
    thumbnail: 'https://images.crazygames.com/melon-playground/20220608121639/melon-playground-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Let your imagination run wild in this physics-based sandbox where you can experiment with various characters and tools.',
    embedUrl: 'https://playgama.com/export/game/melon-sandbox'
  },
  {
    id: 'eaglecraft',
    title: 'Eaglecraft',
    genre: 'Sandbox',
    thumbnail: 'https://images.crazygames.com/minecraft-classic/20210211100511/minecraft-classic-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A web-based Minecraft port that brings the classic building and survival experience directly to your browser.',
    embedUrl: 'https://www.play-games.com/iframe/39611.html'
  },
  {
    id: 'scary-teacher-3d',
    title: 'Scary Teacher 3D',
    genre: 'Horror',
    thumbnail: 'https://images.crazygames.com/scary-teacher-3d/20201015100511/scary-teacher-3d-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Teach the scary teacher a lesson! Prank your way through various rooms and levels in this 3D horror adventure.',
    embedUrl: 'https://www.play-games.com/iframe/30078.html'
  },
  {
    id: 'fnaf-big-e',
    title: "Five Nights at Big E's",
    genre: 'Survival Horror',
    thumbnail: 'https://images.crazygames.com/five-nights-at-freddys/20210211100511/five-nights-at-freddys-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A custom Five Nights at Freddy\'s style experience. Can you survive the night?',
    embedUrl: 'https://yoplay.io/five-nights-at-epsteins-5-nights-at-epsteins.embed'
  },
  {
    id: 'granny-triple-t',
    title: 'Granny Triple T Mod',
    genre: 'Horror',
    thumbnail: 'https://images.crazygames.com/granny/20210211100511/granny-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'A customized Granny horror experience. Can you escape the house?',
    embedUrl: 'https://game.azgame.io/tung-sahur-horror/'
  },
  {
    id: 'flippee-ball',
    title: 'Flippee Ball',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/flippee-ball/20210211100511/flippee-ball-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Flip and score in this addictive physics-based arcade challenge.',
    embedUrl: 'https://playgama.com/export/game/flippee-ball'
  },
  {
    id: 'bad-parenting',
    title: 'Bad Parenting',
    genre: 'Horror',
    thumbnail: 'https://images.crazygames.com/bad-parenting-1-mr-red-face/20240905141044/bad-parenting-1-mr-red-face-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Face your fears in this psychological horror game about childhood trauma.',
    embedUrl: 'https://yoplay.io/red-face-horror.embed'
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    genre: 'Sports',
    thumbnail: 'https://images.crazygames.com/basketball-stars-2019/20210211100511/basketball-stars-2019-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Dunk like a pro and dominate the court in Basketball Stars!',
    embedUrl: 'https://playgama.com/export/game/basketball-stars'
  },
  {
    id: 'super-hot',
    title: 'Super Hot (Time Shooter 2)',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/time-shooter-2/20211221111044/time-shooter-2-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Time moves only when you move. Step into the slow-motion action of Super Hot.',
    embedUrl: 'https://playgama.com/export/game/time-shooter-2'
  },
  {
    id: 'counterstrike-hazmob',
    title: 'Counterstrike (Hazmob FPS)',
    genre: 'Action',
    thumbnail: 'https://images.crazygames.com/hazmob-fps-online-shooter/20221013141044/hazmob-fps-online-shooter-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
    description: 'Intense online first-person shooter action inspired by classic Counter-Strike gameplay.',
    embedUrl: 'https://playgama.com/export/game/hazmob-fps-online-shooter'
  }
];
