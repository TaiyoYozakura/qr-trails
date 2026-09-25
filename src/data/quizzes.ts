import type { Quiz } from "@/types";

/**
 * One short quiz per discovery. Questions test only the content
 * immediately presented on the discovery page (Content Bible Rule 9).
 */
export const quizzes: Quiz[] = [
  {
    id: "statue",
    topicId: "statue",
    questions: [
      {
        question: "Dr. Babasaheb Ambedkar is best known as…",
        options: [
          "The chief architect of the Constitution of India",
          "The first Prime Minister of India",
          "A famous cricketer",
          "A film director",
        ],
        correctIndex: 0,
        explanation:
          "Dr. Ambedkar was the chief architect of the Constitution of India.",
      },
      {
        question:
          "Which detail carved on a memorial hints at how long it has stood here?",
        options: ["The year", "The colour", "The height", "The weight"],
        correctIndex: 0,
        explanation:
          "The year on the inscription is the clue to how long the name has been here.",
      },
      {
        question: "Ambedkar Jayanti, his birthday, falls on which date?",
        options: ["14 April", "26 January", "15 August", "2 October"],
        correctIndex: 0,
        explanation:
          "14 April is Dr. Ambedkar's birthday, celebrated across India as Ambedkar Jayanti.",
      },
    ],
  },
  {
    id: "namesake",
    topicId: "namesake",
    questions: [
      {
        question: "What does 'udyan' mean?",
        options: ["Garden", "Gate", "Morning", "Tree"],
        correctIndex: 0,
        explanation:
          "'Udyan' is the Marathi and Hindi word for garden — so the name ends with where you are standing.",
      },
      {
        question: "What is the 'Bharatratna'?",
        options: [
          "India's highest civilian honour",
          "A city in Maharashtra",
          "A type of tree",
          "A festival",
        ],
        correctIndex: 0,
        explanation:
          "Bharatratna is India's highest civilian honour, awarded to Dr. Ambedkar in 1990.",
      },
      {
        question: "When was Dr. Ambedkar awarded the Bharatratna?",
        options: ["1990", "1947", "1956", "1975"],
        correctIndex: 0,
        explanation:
          "He was awarded it in 1990, more than thirty years after his death.",
      },
    ],
  },
  {
    id: "colony",
    topicId: "colony",
    questions: [
      {
        question: "Which neighbourhood is this garden in?",
        options: [
          "Government Colony, Bandra East",
          "Dadar West",
          "Colaba",
          "Malabar Hill",
        ],
        correctIndex: 0,
        explanation:
          "The garden sits in Government Colony, Bandra East.",
      },
      {
        question: "Neighbourhoods called 'Government Colony' usually grew around…",
        options: [
          "Housing built for government and civic employees",
          "A single railway station",
          "A port",
          "A market only",
        ],
        correctIndex: 0,
        explanation:
          "Names like this one come from housing built for government and civic employees.",
      },
      {
        question: "In a dense area like this, a garden does double duty as…",
        options: [
          "A patch of green and the neighbourhood's living room",
          "A car park and a market",
          "A private lawn",
          "A bus stop and a playground only",
        ],
        correctIndex: 0,
        explanation:
          "It is both a small patch of green and the neighbourhood's living room.",
      },
    ],
  },
  {
    id: "neem-tree",
    topicId: "neem-tree",
    questions: [
      {
        question: "How are neem leaflets arranged?",
        options: [
          "In pairs along a central stem, with one at the tip",
          "In a spiral around the trunk",
          "Singly, with no stem",
          "Only at the very top of the tree",
        ],
        correctIndex: 0,
        explanation:
          "Neem leaves are made of small pointed leaflets in pairs along a central stem, with a single leaflet at the tip.",
      },
      {
        question: "What do you notice when a neem leaf is crushed?",
        options: [
          "A strong, bitter, green smell",
          "It turns blue",
          "It makes a rattling sound",
          "Nothing at all",
        ],
        correctIndex: 0,
        explanation:
          "That bitter green smell is the tree's own insect repellent.",
      },
      {
        question: "Neem's compounds act on insects as…",
        options: [
          "A natural repellent",
          "A kind of fruit",
          "A source of water",
          "A flower",
        ],
        correctIndex: 0,
        explanation:
          "It produces compounds insects avoid — which is why it is planted as a living pest deterrent.",
      },
    ],
  },
  {
    id: "mango-tree",
    topicId: "mango-tree",
    questions: [
      {
        question: "What colour are a mango tree's new leaves often?",
        options: [
          "Reddish or bronze",
          "Pure white",
          "Bright blue",
          "Always dark green",
        ],
        correctIndex: 0,
        explanation:
          "New leaves often start out reddish or bronze before they harden and turn green.",
      },
      {
        question: "How long can a mango tree keep living and fruiting?",
        options: ["For decades", "One season only", "Two years at most", "A few weeks"],
        correctIndex: 0,
        explanation:
          "Mango trees live for decades and crop every year.",
      },
      {
        question: "Why does an old mango tree often become a landmark?",
        options: [
          "It gives shade and fruit for decades, so people gather around it",
          "It grows taller than every other tree",
          "It has the brightest flowers",
          "It stays small and tidy",
        ],
        correctIndex: 0,
        explanation:
          "A long-lived tree becomes a meeting point people plan their day around.",
      },
    ],
  },
  {
    id: "shade",
    topicId: "shade",
    questions: [
      {
        question: "Which two things cool the air under a tree?",
        options: [
          "Shade from the canopy and water vapour from the leaves",
          "Wind from the branches and cold soil",
          "Rain stored in the trunk and reflected light",
          "Fruit and flowers",
        ],
        correctIndex: 0,
        explanation:
          "The canopy blocks sunlight, and the leaves release water vapour as they work.",
      },
      {
        question:
          "Compared with bare paving a few steps away, the ground under a big tree is…",
        options: ["Cooler", "Warmer", "Exactly the same", "Always dry"],
        correctIndex: 0,
        explanation:
          "It can feel several degrees cooler than bare paving nearby.",
      },
      {
        question: "In a crowded neighbourhood, shade is best described as…",
        options: [
          "A public service, not just decoration",
          "A luxury for gardeners",
          "A source of fruit only",
          "A way to keep benches dry",
        ],
        correctIndex: 0,
        explanation:
          "Shade is what makes a garden usable in the middle of the day.",
      },
    ],
  },
  {
    id: "flower-beds",
    topicId: "flower-beds",
    questions: [
      {
        question: "What do flowers offer visiting insects?",
        options: [
          "Pollen and nectar",
          "Wood and bark",
          "Shade and water",
          "Sand and stones",
        ],
        correctIndex: 0,
        explanation: "Flowers offer pollen and nectar, and insects come for both.",
      },
      {
        question: "What is pollination?",
        options: [
          "Pollen carried from one flower to another as insects travel",
          "Water reaching the roots",
          "A flower closing at night",
          "A plant growing taller",
        ],
        correctIndex: 0,
        explanation:
          "Carrying pollen between flowers is how many plants set seed.",
      },
      {
        question: "Why do beds with many different flowers feed more insects?",
        options: [
          "Different insects are built for different flower shapes",
          "More flowers means more sunlight",
          "Insects only visit untidy gardens",
          "Tall flowers hide them from birds",
        ],
        correctIndex: 0,
        explanation:
          "A mix of shapes suits a mix of insects, so the bed feeds far more of them.",
      },
    ],
  },
  {
    id: "walking-track",
    topicId: "walking-track",
    questions: [
      {
        question: "When is a garden like this busiest?",
        options: [
          "Early morning and late evening",
          "Exactly at noon",
          "Just after midnight",
          "Only during the monsoon",
        ],
        correctIndex: 0,
        explanation:
          "Walkers, joggers and children on cycles share the loop early and late in the day.",
      },
      {
        question: "Why is the track laid out around the trees rather than through them?",
        options: [
          "It keeps roots and soil intact, and keeps walkers in shade",
          "It is cheaper to build",
          "Trees may not be touched in a garden",
          "Walkers prefer gravel",
        ],
        correctIndex: 0,
        explanation:
          "Going around the trees protects the roots and the soil, and keeps the loop shaded.",
      },
      {
        question: "Why do daily walkers often end up looking after the garden?",
        options: [
          "They notice what needs fixing first",
          "They are paid to look after it",
          "They are the only people allowed in",
          "The garden closes to everyone else",
        ],
        correctIndex: 0,
        explanation:
          "Regular walkers are the ones who spot a broken tap or a damaged sign first.",
      },
    ],
  },
  {
    id: "keep-it-clean",
    topicId: "keep-it-clean",
    questions: [
      {
        question: "What does litter do in a garden before the monsoon?",
        options: [
          "Blocks drains",
          "Feeds the plants",
          "Fertilises the grass",
          "Cools the soil",
        ],
        correctIndex: 0,
        explanation: "Litter blocks drains before the monsoon and smothers grass.",
      },
      {
        question: "Where does litter often end up in a garden?",
        options: [
          "Exactly where birds and small animals feed",
          "Only inside the bins",
          "Well below the soil",
          "On the flower petals",
        ],
        correctIndex: 0,
        explanation:
          "It collects where birds and small animals feed, which is where it does most harm.",
      },
      {
        question: "What is the single biggest thing a visitor can do for this garden?",
        options: [
          "Put waste in the bin, or carry it out",
          "Water the plants",
          "Sweep the track",
          "Bring more flowers",
        ],
        correctIndex: 0,
        explanation:
          "Using the bin — or carrying your waste out — matters more than anything else a visitor can do.",
      },
    ],
  },
  {
    id: "leaves",
    topicId: "leaves",
    questions: [
      {
        question: "What does a leaf use to help make food?",
        options: ["Sunlight", "Soil", "Rocks", "Wind"],
        correctIndex: 0,
        explanation:
          "Leaves capture sunlight and use it to help the plant make food.",
      },
      {
        question: "Besides sunlight, what else does a plant need to make food?",
        options: [
          "Water and carbon dioxide",
          "Rocks and sand",
          "Heat and dust",
          "Shadows and wind",
        ],
        correctIndex: 0,
        explanation: "Plants use sunlight, water and carbon dioxide to make food.",
      },
      {
        question: "What do leaves exchange with the air through tiny openings?",
        options: ["Gases", "Colors", "Sounds", "Shadows"],
        correctIndex: 0,
        explanation:
          "Leaves exchange gases with the air through tiny openings.",
      },
    ],
  },
  {
    id: "trunk",
    topicId: "trunk",
    questions: [
      {
        question: "What does the trunk help transport?",
        options: [
          "Water and nutrients",
          "Sunlight and heat",
          "Colors and shapes",
          "Seeds and fruit",
        ],
        correctIndex: 0,
        explanation:
          "The trunk moves water and nutrients between the roots and leaves.",
      },
      {
        question: "What can the rings inside a tree tell us?",
        options: [
          "What it eats",
          "Its favourite color",
          "About its growth over time",
          "Its smell",
        ],
        correctIndex: 2,
        explanation:
          "The rings inside many trees can tell us about their growth over time.",
      },
      {
        question: "What is one important job of the trunk?",
        options: [
          "Making flowers",
          "Supporting the tree",
          "Attracting birds",
          "Producing fruit",
        ],
        correctIndex: 1,
        explanation:
          "The trunk supports the tree and connects the roots to the leaves.",
      },
    ],
  },
  {
    id: "roots",
    topicId: "roots",
    questions: [
      {
        question: "What is one important job of roots?",
        options: [
          "Producing sunlight",
          "Making flowers",
          "Growing leaves",
          "Absorbing water and minerals",
        ],
        correctIndex: 3,
        explanation:
          "Underground, roots anchor the tree and absorb water and minerals from the soil.",
      },
      {
        question: "Where do roots usually grow?",
        options: ["Underground", "In the sky", "On the leaves", "Inside fruit"],
        correctIndex: 0,
        explanation:
          "Roots grow underground — you only see part of a tree!",
      },
      {
        question: "True or false: a tree's root system can spread far underground.",
        options: ["True", "False"],
        correctIndex: 0,
        explanation:
          "A tree's root system can spread surprisingly far underground.",
      },
    ],
  },
  {
    id: "water",
    topicId: "water",
    questions: [
      {
        question: "Where does a tree mainly absorb water?",
        options: [
          "From its leaves",
          "From the soil through its roots",
          "From the air through its trunk",
          "From the sun",
        ],
        correctIndex: 1,
        explanation:
          "Roots absorb water from the soil — that's where the journey starts.",
      },
      {
        question: "Which way does water travel inside a tree?",
        options: [
          "Downward into the soil",
          "Sideways into the branches only",
          "Upward toward the leaves",
          "It doesn't move",
        ],
        correctIndex: 2,
        explanation:
          "Water moves upward through the tree and eventually reaches the leaves.",
      },
      {
        question: "Can water reach leaves high above the ground?",
        options: [
          "Only when it rains",
          "No — only low leaves get water",
          "Yes — the plant moves it upward",
        ],
        correctIndex: 2,
        explanation:
          "Water movement inside plants keeps leaves supplied even high above the ground.",
      },
    ],
  },
  {
    id: "ecosystem",
    topicId: "ecosystem",
    questions: [
      {
        question: "Which of these is part of a tree's ecosystem?",
        options: ["Birds", "Insects", "Soil and water", "All of them"],
        correctIndex: 3,
        explanation:
          "Trees interact with insects, birds, animals, soil, water and the air around them.",
      },
      {
        question: "What can a single tree provide for other living things?",
        options: ["Food", "Shelter", "Nesting spaces", "All of these"],
        correctIndex: 3,
        explanation:
          "A single tree can provide food, shelter or nesting spaces for many different organisms.",
      },
      {
        question: "A tree is…",
        options: [
          "Completely alone",
          "Connected to the living and non-living things around it",
          "Just wood and leaves",
        ],
        correctIndex: 1,
        explanation:
          "A tree is part of a much bigger story — everything around it is connected.",
      },
    ],
  },
  {
    id: "slide",
    topicId: "slide",
    questions: [
      {
        question: "Once you let go at the top, what pulls you down the slide?",
        options: ["Gravity", "The wind", "A hidden motor", "Your shoes"],
        correctIndex: 0,
        explanation:
          "Gravity does all the work — nothing is pushing you once you let go.",
      },
      {
        question: "Why does a taller slide send you down faster?",
        options: [
          "You drop further, so gravity speeds you up more",
          "Taller slides are always smoother",
          "The plastic is colder",
          "There is more air at the top",
        ],
        correctIndex: 0,
        explanation:
          "A longer drop means gravity has longer to speed you up.",
      },
      {
        question: "What finally brings you to a stop at the bottom?",
        options: [
          "Friction between you and the ground",
          "The slide pulling you back",
          "Gravity switching off",
          "The sun",
        ],
        correctIndex: 0,
        explanation:
          "Friction drags on you until you stop — the ground does you a favour.",
      },
    ],
  },
  {
    id: "swing",
    topicId: "swing",
    questions: [
      {
        question: "A swing that is already moving goes back and forth…",
        options: [
          "At a steady beat",
          "Faster with every swing",
          "Slower with every swing",
          "Only when someone pushes it",
        ],
        correctIndex: 0,
        explanation:
          "Roughly the same time for each swing, whatever the size of the push.",
      },
      {
        question: "When should you push to go higher?",
        options: [
          "At the right moment in the swing's rhythm",
          "As hard as possible at any moment",
          "Only when the swing has stopped",
          "Never — pushes do nothing",
        ],
        correctIndex: 0,
        explanation:
          "A well-timed push adds energy; a badly timed one cancels it out.",
      },
      {
        question: "After one push, what carries the swing up the other side?",
        options: [
          "Momentum from the drop through the bottom",
          "The wind",
          "The chains pulling",
          "Gravity pushing sideways",
        ],
        correctIndex: 0,
        explanation:
          "Momentum carries you through the bottom of the arc and up the far side.",
      },
    ],
  },
  {
    id: "slope",
    topicId: "slope",
    questions: [
      {
        question: "Why is walking up a slope harder than walking on flat ground?",
        options: [
          "Your legs are also lifting your body as they move you forward",
          "The air is thinner on a slope",
          "Shoes always slip on slopes",
          "Slopes are always wet",
        ],
        correctIndex: 0,
        explanation:
          "On a slope your legs move you forward and lift your whole body at the same time.",
      },
      {
        question: "For the same height, which is easier?",
        options: [
          "A gentle ramp",
          "A steep slope",
          "Both are exactly the same",
          "Neither — height is what matters",
        ],
        correctIndex: 0,
        explanation:
          "A gentler ramp lifts you less with each step, so it feels easier.",
      },
      {
        question: "What does a slope trade for less effort?",
        options: [
          "A longer distance",
          "Less height",
          "More weight",
          "More strength",
        ],
        correctIndex: 0,
        explanation:
          "You walk further to push less — distance for effort.",
      },
    ],
  },
  {
    id: "seesaw",
    topicId: "seesaw",
    questions: [
      {
        question: "What does a see-saw rest on?",
        options: ["A pivot in the middle", "Two springs", "A chain", "A wheel"],
        correctIndex: 0,
        explanation: "A see-saw is a lever resting on a pivot in the middle.",
      },
      {
        question: "What decides how hard your side pushes down?",
        options: [
          "Your weight and how far you sit from the middle",
          "Only your weight",
          "Only your height",
          "How fast you sit down",
        ],
        correctIndex: 0,
        explanation:
          "It is weight multiplied by distance from the pivot — not weight alone.",
      },
      {
        question: "How can a lighter child balance a heavier friend?",
        options: [
          "By sitting further from the middle",
          "By sitting right on the middle",
          "By standing up",
          "By gripping the handles harder",
        ],
        correctIndex: 0,
        explanation:
          "Sitting further from the pivot makes your side push down harder.",
      },
    ],
  },
  {
    id: "roundabout",
    topicId: "roundabout",
    questions: [
      {
        question: "Why does a spinning merry-go-round keep turning?",
        options: [
          "Anything spinning resists changes to its spin",
          "It has a hidden motor",
          "The wind keeps it going",
          "The ground moves under it",
        ],
        correctIndex: 0,
        explanation:
          "Spinning things resist changes to their spin, so it keeps turning.",
      },
      {
        question: "Why is it harder to hold on when it spins faster?",
        options: [
          "It has to pull you towards the middle harder",
          "It becomes heavier",
          "The handles shrink",
          "Your hands get weaker",
        ],
        correctIndex: 0,
        explanation:
          "The faster it spins, the harder it has to pull you towards the centre.",
      },
      {
        question: "Why do you stagger for a moment after stepping off?",
        options: [
          "Your body carries the ride's motion with it",
          "The ground is tilted",
          "The ride pushes you away",
          "Your shoes stick to the ground",
        ],
        correctIndex: 0,
        explanation:
          "Your body keeps moving the way it was, so you stagger a few steps.",
      },
    ],
  },
];