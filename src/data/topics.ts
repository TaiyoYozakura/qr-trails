import type { Topic } from "@/types";

/**
 * The discoveries of every trail, in order. Content follows the QR Trails
 * Content Bible: one hook, a couple of short explanation lines, one fun fact,
 * then a 3-question quiz.
 *
 * Accuracy note: nothing here may state an unverified fact about this specific
 * garden. Where the on-site detail is still unknown (statue, tree species,
 * hours) the copy teaches what a visitor can confirm with their own eyes, and a
 * TODO marks what to swap in once it is confirmed.
 */
export const topics: Topic[] = [
  // ------------------------------------------------------------------
  // Ambedkar Heritage Trail
  // ------------------------------------------------------------------
  {
    id: "statue",
    trailId: "heritage-trail",
    number: 1,
    title: "The Memorial at the Centre",
    hook: "A garden named after a person usually keeps that person at its heart.",
    explanation: [
      "Dr. Babasaheb Ambedkar was the chief architect of the Constitution of India, and he spent his life arguing that education and dignity belong to everyone.",
      "Look for a statue, a bust or a memorial plaque in the garden — and find the inscription on it. The year carved there is the clue to how long this place has carried his name.",
      "A memorial is also a meeting point. People pause here before they walk, which is why these spots usually sit near the entrance or at the crossing of two paths.",
    ],
    funFact:
      "Memorials to Dr. Ambedkar fill with flowers every 14 April, his birthday, which is celebrated across India as Ambedkar Jayanti.",
    visual: "statue",
    // TODO: confirm on site — is there a statue, bust or plaque, and what year is on it?
    placement: "At the memorial / statue",
    quizId: "statue",
  },
  {
    id: "namesake",
    trailId: "heritage-trail",
    number: 2,
    title: "Why This Garden Bears His Name",
    hook: "The name on the gate tells you what a neighbourhood chose to remember.",
    explanation: [
      "This garden is the Bharatratna Dr. Babasaheb Ambedkar Udyan. 'Udyan' is simply the Marathi and Hindi word for garden, so the name ends where you are standing.",
      "'Bharatratna' is India's highest civilian honour. Dr. Ambedkar was awarded it in 1990, more than thirty years after his death, in recognition of his work for equality and for the Constitution.",
      "Naming a public garden is a choice: it puts a name people already know onto an everyday place, so the visit and the idea arrive together.",
    ],
    funFact:
      "Mumbai is full of these living memorials — gardens, roads, markets and stations named after people the city decided not to forget.",
    visual: "plaque",
    // TODO: photo/transcription of the actual garden name board.
    placement: "At the garden name board near the entrance",
    quizId: "namesake",
  },
  {
    id: "colony",
    trailId: "heritage-trail",
    number: 3,
    title: "A Neighbourhood Called Government Colony",
    hook: "The garden is older than the trees you can see — and so is the area around it.",
    explanation: [
      "You are in Government Colony, Bandra East. Neighbourhoods with names like this one grew up around housing built for government and civic employees, which is why they sit close together and share their open space.",
      "Bandra East is one of the densest parts of the city. In a place like this, a garden does double duty: it is both a small patch of green and the neighbourhood's living room.",
      "That is why this one has a walking track, benches and shade — the space is designed for the people who use it every single day.",
    ],
    funFact:
      "In cities that build upward, a single municipal garden can serve thousands of people who live within a five-minute walk of the gate.",
    visual: "neighborhood",
    // TODO: confirm the colony's own history locally (housing board, residents, BMC records).
    placement: "At the gate, facing Government Colony",
    quizId: "colony",
  },

  // ------------------------------------------------------------------
  // Tree & Shade Trail
  // ------------------------------------------------------------------
  {
    id: "neem-tree",
    trailId: "shade-trail",
    number: 1,
    title: "The Neem Beside You",
    hook: "One of the easiest trees in Mumbai to recognise — once you know what to look for.",
    explanation: [
      "Neem leaves are made of many small, pointed leaflets arranged in pairs along a central stem, with a single leaflet at the tip.",
      "Crush a fallen leaf between your fingers. The strong, bitter, green smell is the tree's own insect repellent — it produces compounds that insects avoid.",
    ],
    funFact:
      "Neem has been planted across India for centuries as shade, as medicine and as a living pest deterrent, which is why it turns up in almost every neighbourhood garden.",
    visual: "tree",
    accent: "#5e9e4e",
    // TODO: confirm this species actually stands in the garden before printing.
    placement: "At the neem tree",
    quizId: "neem-tree",
  },
  {
    id: "mango-tree",
    trailId: "shade-trail",
    number: 2,
    title: "The Mango's Long Story",
    hook: "A mango tree can outlive the people who planted it — and keep fruiting the whole time.",
    explanation: [
      "Mango trees stay green all year, but their new leaves often start out reddish or bronze before they harden and turn green.",
      "Because they live for decades and crop every year, an old mango tree usually becomes a landmark: a meeting point, a bench, a bit of shade people plan their day around.",
    ],
    funFact:
      "Mango has been cultivated in India for thousands of years, and travellers carried it from here to the rest of the world.",
    visual: "tree",
    accent: "#4c8a3c",
    // TODO: confirm this species actually stands in the garden before printing.
    placement: "At the mango tree",
    quizId: "mango-tree",
  },
  {
    id: "shade",
    trailId: "shade-trail",
    number: 3,
    title: "Why Shade Matters Most",
    hook: "In a dense city, shade is not decoration. It is a public service.",
    explanation: [
      "A tree cools two ways at once: its canopy blocks sunlight from reaching the ground, and its leaves release water vapour into the air as they work.",
      "That is why the ground under a big tree can feel several degrees cooler than bare paving a few steps away. The difference is small in numbers and huge in how a place feels at noon.",
      "In a neighbourhood like this one, that patch of shade is the reason the garden gets used in the middle of the day at all.",
    ],
    funFact:
      "The cooling is mostly water: a large tree can move hundreds of litres of water out through its leaves on a hot day, which is why the air underneath it feels different.",
    visual: "shade",
    related: {
      href: "/flora",
      label: "Flora",
      text: "Meet the plants doing the shading.",
    },
    placement: "At the bench in the deepest shade",
    quizId: "shade",
  },

  // ------------------------------------------------------------------
  // Garden Life Trail
  // ------------------------------------------------------------------
  {
    id: "flower-beds",
    trailId: "garden-life-trail",
    number: 1,
    title: "The Flower Beds",
    hook: "Every flower bed is a small, busy marketplace — and the customers have wings.",
    explanation: [
      "Flowers offer pollen and nectar. Insects come looking for both, and while they move from flower to flower they carry pollen with them.",
      "That accidental delivery is pollination, and it is how many plants set seed. The flower is not decoration; it is the plant's way of hiring help.",
      "Beds with many different flowers feed far more insects than a single kind planted alone, because different insects are built for different shapes.",
    ],
    funFact:
      "Bees and butterflies can see colours we cannot — some flowers carry patterns in ultraviolet that work like landing lights pointing at the nectar.",
    visual: "flowerbed",
    placement: "At the main flower bed",
    quizId: "flower-beds",
  },
  {
    id: "walking-track",
    trailId: "garden-life-trail",
    number: 2,
    title: "The Walking Track",
    hook: "The track is not just a path. It is where a garden becomes a habit.",
    explanation: [
      "Walkers, joggers and children on cycles share the same loop, which is why the busiest hours here are early morning and late evening.",
      "Notice that the track is laid out around the trees rather than through them. That keeps the roots and the soil intact, and keeps the walker in shade for most of the loop.",
      "People who walk here daily tend to be the garden's most careful guardians — they are the ones who notice a broken tap or a damaged sign first.",
    ],
    funFact:
      "A loop track is a deliberate design choice: you finish where you started, so the garden can be used in a quick twenty minutes or stretched out for an hour.",
    visual: "walkway",
    placement: "Where the walking track passes the flower beds",
    quizId: "walking-track",
  },
  {
    id: "keep-it-clean",
    trailId: "garden-life-trail",
    number: 3,
    title: "Keep It Clean",
    hook: "A garden stays green because of small decisions people make every few minutes.",
    explanation: [
      "Litter does real damage here: it blocks drains before the monsoon, smothers grass, and ends up exactly where birds and small animals feed.",
      "Putting waste in the bin — or carrying it out with you — is the single biggest thing a visitor can do for this place.",
      "The rest is just as simple: stay off the beds, leave the flowers on the plants, and let the trees keep their branches.",
    ],
    funFact:
      "Some of Mumbai's oldest public gardens are more than 150 years old. What keeps them alive is not luck — it is daily care, by staff and by visitors.",
    visual: "tidy",
    related: {
      href: "/guidelines",
      label: "Garden guidelines",
      text: "The full do's and don'ts, in one place.",
    },
    placement: "At the bin / notice board beside the track",
    quizId: "keep-it-clean",
  },

  // ------------------------------------------------------------------
  // Play Trail
  // ------------------------------------------------------------------
  {
    id: "slide",
    trailId: "play-trail",
    number: 1,
    title: "Down the Slide",
    hook: "A slide is gravity's idea of fun.",
    explanation: [
      "Once you let go at the top, nothing is pushing you. Gravity does all the work, pulling you down the slope.",
      "A taller slide gives you a longer drop, so you arrive at the bottom faster and keep sliding along the ground for longer.",
      "That last stretch is friction doing you a favour — the ground drags on you until you come to a stop.",
    ],
    funFact:
      "Playground slides are built with the same ideas engineers use for roller coasters: height for speed, curves and friction to slow things down again.",
    visual: "slide",
    // TODO: confirm the play equipment actually installed before printing codes.
    placement: "At the slide",
    quizId: "slide",
  },
  {
    id: "swing",
    trailId: "play-trail",
    number: 2,
    title: "The Swing Set",
    hook: "A swing is a pendulum — and it keeps its own rhythm.",
    explanation: [
      "Once a swing is moving, it goes back and forth at a steady beat, roughly the same time for each swing whatever the size of the push.",
      "Push at the right moment and you add energy to that beat, so you go higher. Push at the wrong moment and you cancel it out.",
      "After a single push, momentum carries you through the bottom of the arc and up the other side — nobody has to push you again to keep moving.",
    ],
    funFact:
      "That steady beat is why pendulums were the world's most accurate timekeepers for close to 300 years.",
    visual: "swing",
    // TODO: confirm the play equipment actually installed before printing codes.
    placement: "At the swings",
    quizId: "swing",
  },
  {
    id: "slope",
    trailId: "play-trail",
    number: 3,
    title: "The Slope",
    hook: "Walking up a slope is harder than walking on the flat. There is a reason.",
    explanation: [
      "On flat ground your legs mostly move you forward. On a slope they are also lifting your whole body, a little with every step.",
      "The steeper the slope, the more lifting per step — which is why a gentle ramp feels easier than reaching the same height on a steep one.",
      "Slopes are one of the oldest tools people have used, because they trade distance for effort: you walk further to push less.",
    ],
    funFact:
      "The inclined plane is one of the six classic 'simple machines' — used for thousands of years to raise loads too heavy to lift straight up.",
    visual: "slope",
    // TODO: confirm the slope / ramp in the play area before printing codes.
    placement: "At the slope in the play area",
    quizId: "slope",
  },
  {
    id: "seesaw",
    trailId: "play-trail",
    number: 4,
    title: "The See-Saw",
    hook: "Two children, two very different sizes — and somehow it still balances.",
    explanation: [
      "A see-saw is a lever resting on a pivot in the middle. What tips it is not just weight, but weight multiplied by how far you are from that middle.",
      "Sit further from the pivot and your side pushes down harder, which is how a lighter child can balance a heavier friend.",
      "Slide closer to the middle and your side loses its power. That is the whole trick of a see-saw — and of every lever ever built.",
    ],
    funFact:
      "The same lever arithmetic is why a small crowbar can lift something far heavier than the person using it.",
    visual: "seesaw",
    // TODO: confirm the play equipment actually installed before printing codes.
    placement: "At the see-saw",
    quizId: "seesaw",
  },
  {
    id: "roundabout",
    trailId: "play-trail",
    number: 5,
    title: "The Merry-Go-Round",
    hook: "Spinning feels effortless — right up until you try to move.",
    explanation: [
      "Once a merry-go-round is turning, it keeps turning, because anything spinning resists changes to its spin.",
      "Your body wants to keep travelling in a straight line, so the ride has to keep pulling you towards the middle. The faster it spins, the harder you have to hold on.",
      "Step off while it is still turning and your body carries the motion with it for a moment — which is why you stagger a few steps.",
    ],
    funFact:
      "The pull towards the centre is called centripetal force. The very same thing keeps the Moon circling the Earth instead of flying off.",
    visual: "roundabout",
    // TODO: confirm the play equipment actually installed before printing codes.
    placement: "At the merry-go-round",
    quizId: "roundabout",
  },

  // ------------------------------------------------------------------
  // Inside a Tree Trail (original Content Bible flagship)
  // ------------------------------------------------------------------
  {
    id: "leaves",
    trailId: "tree-trail",
    number: 1,
    title: "Meet the Leaf",
    hook: "Your leaf is basically a tiny solar-powered kitchen.",
    explanation: [
      "Leaves capture sunlight and use it to help the plant make food.",
      "They also exchange gases with the air through tiny openings.",
    ],
    funFact: "Some plants have leaves so large they can be bigger than a person.",
    visual: "leaf",
    placement: "At the chosen tree — start where you can see the canopy",
    quizId: "leaves",
  },
  {
    id: "trunk",
    trailId: "tree-trail",
    number: 2,
    title: "Inside the Trunk",
    hook: "A tree's trunk is more than a giant wooden pole.",
    explanation: [
      "The trunk supports the tree and helps move water and nutrients between the roots and leaves.",
    ],
    funFact: "The rings inside many trees can tell us about their growth over time.",
    visual: "trunk",
    placement: "At the chosen tree — stand at the trunk",
    quizId: "trunk",
  },
  {
    id: "roots",
    trailId: "tree-trail",
    number: 3,
    title: "The Hidden Half",
    hook: "You only see part of a tree.",
    explanation: [
      "Underground, roots anchor the tree and absorb water and minerals from the soil.",
    ],
    funFact: "A tree's root system can spread surprisingly far underground.",
    visual: "roots",
    placement: "At the chosen tree — step back to see the base and the soil",
    quizId: "roots",
  },
  {
    id: "water",
    trailId: "tree-trail",
    number: 4,
    title: "Follow the Water",
    hook: "From the soil to the leaves — water takes a journey.",
    explanation: [
      "Roots absorb water from the soil.",
      "The water moves upward through the tree and eventually reaches the leaves.",
    ],
    funFact:
      "Water movement inside plants helps keep leaves supplied even when they are high above the ground.",
    visual: "water",
    placement: "At the chosen tree — look from the ground up to the canopy",
    quizId: "water",
  },
  {
    id: "ecosystem",
    trailId: "tree-trail",
    number: 5,
    title: "It's All Connected",
    hook: "A tree isn't alone. It's part of a much bigger story.",
    explanation: [
      "Trees interact with insects, birds, animals, soil, water and the air around them.",
    ],
    funFact:
      "A single tree can provide food, shelter or nesting spaces for many different organisms.",
    visual: "ecosystem",
    placement: "At the chosen tree — look for birds, insects and leaf litter",
    quizId: "ecosystem",
  },
];
