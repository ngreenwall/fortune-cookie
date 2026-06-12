export type FortuneDefinition = {
  id: string;
  text: string;
  isGrumFortune?: boolean;
};

export const FORTUNE_DEFINITIONS: FortuneDefinition[] = [
  {
    id: "grum",
    text: "Help, help! I'm a prisoner in a fortune cookie factory.",
    isGrumFortune: true,
  },
  {
    id: "f1",
    text: "A pleasant surprise awaits you in the near future.",
  },
  {
    id: "f2",
    text: "Your kindness will return to you tenfold.",
  },
  {
    id: "f3",
    text: "Someone close to you is thinking of you today.",
  },
  {
    id: "f4",
    text: "Patience is bitter, but its fruit is sweet.",
  },
  {
    id: "f5",
    text: "A curious mind leads to unexpected fortune.",
  },
  {
    id: "f6",
    text: "The best time to plant a tree was twenty years ago. The second best time is now.",
  },
  {
    id: "f7",
    text: "Good things come to those who share a meal together.",
  },
];
