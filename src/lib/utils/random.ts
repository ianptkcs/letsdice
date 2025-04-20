import { _ } from "$env/static/private";

const animals = [
    "lion",
    "tiger",
    "bear",
    "wolf",
    "eagle",
    "fox",
    "panda",
    "leopard",
    "koala",
    "shark",
    "whale",
    "owl",
    "snake",
    "dragon",
    "spider",
    "scorpion",
    "panther",
    "cougar",
    "lynx",
    "mongoose",
    "badger",
    "crow",
    "bat",
    "rat",
    "ferret",
    "otter",
    "beaver",
    "seal",
    "penguin",
];
const qualities = [
    "brave",
    "calm",
    "fierce",
    "noble",
    "swift",
    "mighty",
    "clever",
    "bold",
    "wise",
    "gentle",
    "graceful",
    "mysterious",
    "silent",
    "stealthy",
    "agile",
    "elegant",
    "majestic",
    "powerful",
    "quick",
    "sharp",
    "fast",
    "strong",
    "smart",
];
const phrases = [
    "Roll for initiative!",
    "May your d20 be ever in your favor!",
    "Adventure awaits!",
    "The dice have spoken.",
    "A bard never lies.",
    "Watch the trapdoors!",
    "Make a sanity check.",
    "And is here...",
    "Decay, b*",
    "Look at this sticker of Mario opening his a*",
    "Did you like my new Christmas tree?",
    "Knowing all means losing all.",
    "hAcKeD bY aNgEL Of tHE niGhT",
    "Thiago, take off your pants",
    "You asked me what it means to be a hero… Only a hero would ask that question. Fight.",
    "You know we'll always be a trio, right?",
    "Take care of my boy for me…",
    "Eyes always open.",
    "Injustice, huh?",
    "Today I'm neither Cesar nor Kaiser… today I am the Angel of the Night.",
    "It's cold, it's cold inside, too… but I know you'll warm me up.",
    "CINERARY!",
    "I'll go all the way to hell to bring you back.",
    "You said it would be the three of us forever…",
    "The irony of fate… it really is a divine comedy…",
    "Erin, you are immortal.",
    "DON'T TOUCH MY SON.",
    "Sorry, Mom, today I can't drink a bottle for every person I didn't save…",
    "Holy Mega Nun.",
];

export const randomUsername = (input: string): string => {
    const hash = new Bun.CryptoHasher("sha256").update(input).digest("hex");

    return `${qualities[parseInt(hash.slice(0, 8), 16) % qualities.length]}
            -${animals[parseInt(hash.slice(8, 16), 16) % animals.length]}
            -${hash.slice(16, 20)}`;
};

export const randomAboutMe = (input: string): string =>
    phrases[
        parseInt(
            new Bun.CryptoHasher("sha256")
                .update(input)
                .digest("hex")
                .slice(0, 8),
            16
        ) % phrases.length
    ];

export const randomProbability = (input: string): number =>
    Math.floor(
        (new Bun.CryptoHasher("sha256").update(input).digest().readUInt32BE(0) /
            0xffffffff) *
            100
    );

export const randomAvatar = (input: string): string =>
    `https://api.dicebear.com/9.x/big-smile/svg?seed=${input}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&accessoriesProbability=${randomProbability(
        input
    )}`;
