/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Critical Role: Call of the Netherdeep
	Effect:		This script adds the contents of the Critical Role: Call of the Netherdeep book
	Code by:	Transcription by u/Newbuu2
	Date:		2022-04-23
*/

var iFileName = "Critical Role: Call of the Netherdeep";
RequiredSheetVersion(13.1);

SourceList["CR:CotN"] = {
  name: "Critical Role: Call of the Netherdeep",
  abbreviation: "CR:CotN",
  group: "Third Party",
  url: "https://dnd.wizards.com/products/call-netherdeep",
  date: "2022-03-15",
};

// Creatures
CreatureList["moorbounder"] = {
  name: "Moorbounder",
  source: [["CR:CotN", 1]],
  size: 2,
  type: "Beast",
  alignment: "Unaligned",
  ac: 13,
  hp: 30,
  hd: [4, 10],
  speed: "70 ft",
  scores: [18, 14, 14, 2, 13, 5],
  senses: "Darkvision 60 ft",
  passivePerception: 11,
  challengeRating: "1",
  proficiencyBonus: 2,
  attacksAction: 1,
  attacks: [
    {
      name: "Claw",
      ability: 1,
      damage: [4, 4, "slashing"],
      range: "Melee (5 ft)",
      description: "",
    },
  ],
  traits: [
    {
      name: "Standing Leap",
      description:
        "The moorbounder's long jump is up to 40 feet and its high jump is up to 20 feet, with or without a running start.",
    },
  ],
};

// Magic Items
MagicItemsList["breathing bubble"] = {
  name: "Breathing Bubble",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "This translucent, bubble-like sphere has a slightly tacky outer surface. The bubble contains 1 hour of breathable air. The bubble regains all its expended air daily at dawn. I gain its benefits by wearing it over my head like a helmet. When it's not worn, the breathing bubble retains its bubble shape.",
  descriptionFull:
    "This translucent, bubble-like sphere has a slightly tacky outer surface. The bubble contains 1 hour of breathable air. The bubble regains all its expended air daily at dawn." +
    "\n   " +
    "You gain the item's benefits by wearing it over your head like a helmet. When it's not being worn, the breathing bubble retains its bubble shape.",
  usages: 1,
  recovery: "dawn",
  additional: "hour",
};

MagicItemsList["earring of message"] = {
  name: "Earring of Message",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "The blue crystal of this earring is wrapped with delicate copper wire. The earring has 5 charges. While wearing it, I can use an action to expend 1 charge and cast the message spell. The earring regains 1d4 + 1 expended charges daily at dawn.",
  descriptionFull:
    "The blue crystal of this earring is wrapped with delicate copper wire. The earring has 5 charges. While wearing it, you can use an action to expend 1 charge and cast the message spell. The earring regains 1d4 + 1 expended charges daily at dawn.",
  usages: 5,
  recovery: "dawn",
  additional: "regains 1d4 + 1",
  spellFirstColTitle: "Ch",
  spellcastingBonus: [
    {
      name: "Earring of Message",
      spells: ["message"],
      selection: ["message"],
      firstCol: 1,
    },
  ],
};

MagicItemsList["jewel of three prayers"] = {
  name: "Jewel of Three Prayers",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  allowDuplicates: false,
  description: "",
  descriptionFull:
    "The Jewel of Three Prayers is a Vestige of Divergance (see the \"Vestiges of Divergence\" sidebar). In ancient times, Alyxian the Apotheon bore this amulet as a symbol of his covenant with the three Prime Deities: Sehanine the Moon Weaver, Avandra the Change Bringer, and Corellon the Arch Heart. When the jewel is found, only Sehanine's power thrums within its dormant heart. The power of the other two deities waits to be reawakened by a hero - or heroes - who can follow Alyxian's footsteps." +
    "\n" +
    toUni("Dormant State") +
    "\n" +
    "In its Dormant State, the jewel has the following properties:" +
    "\n\n" +
    "\u2022 You gain a +1 bonus to AC while wearing the jewel." +
    "\n" +
    "\u2022 While wearing or holding the jewel, you can use an action to cause it to shed bright light in a 15-foot radius and dim light for an additional 15 feet. The light lasts until you extinguish it (no action required)." +
    "\n" +
    "\u2022 The jewel has 3 charges and regains all its expended charges daily at dawn. While holding the jewel, you can expend 1 charge from it to cast the invisibility spell." +
    toUni("Awakened State") +
    "\n" +
    "In this state, the jewel has received the blessing of Avandra the Change Bringer. Three delicate spires unfurl from the jewel's center, like the buds of flowers opening in the spring. Three lapis lazuli stones rest like dewdrops on these spires." +
    "\n" +
    "The following benefits of the jewel improve:" +
    "\n" +
    "\u2022 The bonus that the jewel confers to your AC increases to +2." +
    "\n" +
    "\u2022 Its number of charges inceases to 5." +
    "\n" +
    "The jewel gains the following additional properties, which you can use while wearing or holding it:" +
    "\n" +
    "\u2022 You can expend 1 of the jewel's charges (no action required) to end of the following conditions on yourself: grappled, paralyzed, or restrained." +
    "\n" +
    "\u2022 When another creature you can see within 60 feet of you fails a saving throw, you can expend 1 of the jewel's charges as a reaction to enable that creature to reroll the saving throw, potentially turning a failure into success. The creature must use the new roll." +
    "\n" +
    toUni("Exalted State") +
    "\n" +
    "\u2022 In this state, the jewel has received the blessing of Corellon the Arch Heart. A gleaming emerald surrounded by a halo of gold appears on the jewel." +
    "\n\n" +
    "\u2022 The following benefits of the jewel improve:" +
    "\n" +
    "\u2022 The bonus that the jewel confers to your AC increases to +3." +
    "\n" +
    "\u2022 Its number of charges inceases to 7." +
    "\n" +
    "The jewel gains the following additional properties, which you can use while wearing or holding it:" +
    "\n" +
    "\u2022 You gain the ability to breathe water, and you gain a swimming speed equal to your walking speed." +
    "\n" +
    "\u2022 Each of your allies within 30 feet of you gains the ability to breathe water and gains a swimming speed equal to its walking speed." +
    "\n" +
    "\u2022 As a bonus action, you can expend 1 of the jewel's charges to target yourself or one willing creature you can see within 15 feet of yourself. The target teleports to an unoccupied space of your choice within 15 feet of yourself, along with any equipment the target is wearing or carrying. The target appears in a flash of golden radiance, and each creature of your choice within 5 feet of the target's new location must make a DC 18 Constitution saving throw. On a failed save, the creature takes 4d10 radiant damage and is blinded until the start of your next turn. On a successful save, the creature takes half as much damage and isn't blinded.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Jewel of Three Prayers",
    description:
      "While wearing this jewel, I gain a +1 bonus to AC. As an action, I can cause it to shed bright light in 15 ft, dim light in 15 ft, which I can extinguish (no action required). It has 3 charges, regaining all expended charges at dawn. I can expend a charge to cast invisbility.",
    usages: 3,
    recovery: "dawn",
    action: ["action", " (shed light)"],
    extraAC: {
      name: "Dormant Jewel of Three Prayers",
      mod: 1,
      text: "I gain a +1 bonus to AC.",
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["invisibility"],
        selection: ["invisibility"],
        firstCol: 1,
      },
    ],
  },
  awakened: {
    name: "Awakened Jewel of Three Prayers",
    description:
      "While wearing this jewel, I gain a +2 bonus to AC. As an action, I can cause it to shed bright light in 15 ft, dim light in 15 ft, which I can extinguish (no action required). It has 5 charges, regaining all expended charges at dawn. I can expend a charge to cast invisbility. See third page.",
    usages: 5,
    recovery: "dawn",
    action: [
      ["action", " (shed light)"],
      ["reaction", " (reroll save)"],
    ],
    extraAC: {
      name: "Awakened Jewel of Three Prayers",
      mod: 2,
      text: "I gain a +2 bonus to AC.",
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["invisibility"],
        selection: ["invisibility"],
        firstCol: 1,
      },
    ],
    toNotesPage: [
      {
        name: "Additional Features",
        page3notes: true,
        note: [
          "I can expend 1 charge to end a condition on myself: grappled, paralyzed, or restrained",
          "As a reaction when another creature within 60 ft fails a save, I can expend a charge",
          "If I do, the creature can reroll the failed save and they must use the new roll",
        ],
      },
    ],
  },
  exalted: {
    name: "Exalted Jewel of Three Prayers",
    description:
      "While wearing this jewel, I gain a +3 bonus to AC. As an action, I can cause it to shed bright light in 15 ft, dim light in 15 ft, which I can extinguish (no action required). It has 7 charges, regaining all expended charges at dawn. I can expend a charge to cast invisbility. See third page.",
    usages: 7,
    recovery: "dawn",
    action: [
      ["action", " (shed light)"],
      ["reaction", " (reroll save)"],
      ["bonus action", " (teleport)"],
    ],
    extraAC: {
      name: "Awakened Jewel of Three Prayers",
      mod: 3,
      text: "I gain a +3 bonus to AC.",
    },
    speed: {
      swim: { spd: "walk", enc: "walk" },
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["invisibility"],
        selection: ["invisibility"],
        firstCol: 1,
      },
    ],
    toNotesPage: [
      {
        name: "Additional Features",
        page3notes: true,
        note: [
          "I can expend 1 charge to end a condition on myself: grappled, paralyzed, or restrained",
          "As a reaction when another creature within 60 ft fails a save, I can expend a charge",
          "If I do, the creature can reroll the failed save and they must use the new roll",
          "I can breathe water and gain a swimming speed equal to my walking speed",
          "Allies within 30 ft can breathe water; gain swimming speed equal to walking speed",
          "As a bonus action, I can expend a charge to teleport a creature within 15 ft",
          "It teleports to an unoccupied space within 15 ft of me",
          "Each creature of my choice within 5 feet of the space makes a DC 18 Con save",
          "On a failure, they take 4d10 radiant damage and are blinded",
          "On a success, they take half as much damage and aren't blinded",
        ],
      },
    ],
  },
};

MagicItemsList["medal of muscle"] = {
  name: "Medal of Muscle",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can squeeze this medal to gain advantage on Strength checks and saves for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "You can squeeze this medal tightly in the palm of your hand as an action. Doing so gives you advantage of Strength checks and Strength saving throws for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};

MagicItemsList["medal of the conch"] = {
  name: "Medal of the Conch",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can rub this medal to gain a swimming speed equal to my walking speed for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "When use use an action to rub this medal, you gain a swimming speed equal to your walking speed for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};

MagicItemsList["medal of the horizonback"] = {
  name: "Medal of the Horizonback",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "When hit by an attack, I can use my reaction to increase my AC by 5 until the start of my next turn, including against the attack. I must be wearing the medal and able to see the creature that made the attack. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "When you would be hit by an attack, you can use your reaction to increase your AC by 5 until the start of your next turn, including against the triggering attack. You must be wearing the medal and able to see the creature that made the triggering attack to use this property. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["reaction", " (when attacked)"]],
};

MagicItemsList["medal of the maze"] = {
  name: "Medal of the Maze",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can trace the maze inscribed on this medal to gain advantage on Wisdom checks and know the quickest route to the end of any nonmagical path or maze for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "When you use an action to trace the maze inscribed on this medal, you gain advantage of Wisdom checks and know the quickest route to the end of any nonmagical path or maze for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};

MagicItemsList["medal of the meat pie"] = {
  name: "Medal of the Meat Pie",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can press this medal to my mouth to gain 2d4 + 2 temporary HP. Once this property has been used, it can't be used again, and the medal becomes nonmagical. While magical, it is slightly warm to the touch and smells faintly of baked pie crust.",
  descriptionFull:
    "You gain 2d4 + 2 temporary hit points when you use an action to press this medal to your mouth. Once this property has been used, it can't be used again, and the medal becomes nonmagical." +
    "\n\n" +
    "While magical, this medal is slightly warm to the touch (as if it's fresh from the oven) and smells faintly of baked pie crust.",
  action: [["action", " (2d4 + 2 temp HP)"]],
};

MagicItemsList["medal of the wetlands"] = {
  name: "Medal of the Wetlands",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can trace the edge of this medal to ignore difficult terrain for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "When you use an action to trace the edge of this medal, difficult terrain doesn't cost you extra movement for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};

MagicItemsList["medal of wit"] = {
  name: "Medal of Wit",
  source: [["CR:CotN", 1]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can press this medal to my temple to gain advantage on Intelligence checks and saves for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "You can press this medal to your temple as an action. Doing so gives you advantage on Intelligence checks and Intelligence saving throws for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};
