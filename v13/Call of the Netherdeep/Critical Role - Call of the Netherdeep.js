/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Critical Role: Call of the Netherdeep
	Effect:		This script adds the contents of the Critical Role: Call of the Netherdeep book (creatures and magic items)
	Code by:	Transcription by u/Newbuu2
	Date:		2022-04-23
*/

var iFileName = "Critical Role: Call of the Netherdeep";
RequiredSheetVersion(13.1);

SourceList["CR:CotN"] = {
  name: "Critical Role: Call of the Netherdeep",
  abbreviation: "CR:CotN",
  group: "Adventure Books",
  url: "https://dnd.wizards.com/products/call-netherdeep",
  date: "2022-03-15",
};

// Creatures
CreatureList["young horizonback tortoise"] = {
  name: "Young Horizonback Tortoise",
  source: [["CR:CotN", 26]],
  size: 1,
  type: "Beast",
  alignment: "Unaligned",
  ac: 15,
  hp: 68,
  hd: [8, 12],
  speed: "30 ft",
  scores: [19, 11, 15, 2, 12, 5],
  senses: "",
  passivePerception: 11,
  languages: "understands Goblin but can't speak",
  challengeRating: "3",
  proficiencyBonus: 2,
  attacksAction: 1,
  attacks: [
    {
      name: "Bite",
      ability: 1,
      damage: [4, 6, "piercing"],
      range: "Melee (10 ft)",
      description:
        "If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone",
    },
  ],
  traits: [
    {
      name: "Amphibious",
      description: "The young horizonback tortoise can breathe air and water.",
    },
  ],
};

CreatureList["moonshark"] = {
  name: "Moonshark",
  source: [["CR:CotN", 33]],
  size: 1,
  type: "Beast",
  alignment: "Unaligned",
  ac: 13,
  hp: 126,
  hd: [11, 12],
  speed: "0 ft, swim 50 ft",
  scores: [23, 11, 21, 1, 10, 5],
  senses: "blindsight 60 ft",
  skills: {
    perception: 3,
  },
  passivePerception: 13,
  challengeRating: "5",
  proficiencyBonus: 3,
  attacksAction: 1,
  attacks: [
    {
      name: "Bite",
      ability: 1,
      damage: [3, 10, "piercing"],
      range: "Melee (5 ft)",
      description:
        "If the shark misses, it can use a bonus action to swim up to 25 feet; this movement doesn't provoke opportunity attacks",
    },
  ],
  traits: [
    {
      name: "Blood Frenzy",
      description:
        "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points.",
    },
    {
      name: "Silver Spear",
      description:
        "A character within 5 feet of the shark can use an action to try to dislodge the spear, doing so with a successful DC 13 Strength (Athletics) check. While the spear is lodged in the shark, the shark glows with silvery illumination, shedding bright light in a 10-foot radius and dim light for an additional 10 feet.",
    },
    {
      name: "Water Breathing",
      description: "The shark can breathe only underwater.",
    },
  ],
};

// Magic Items
MagicItemsList["earring of message"] = {
  name: "Earring of Message",
  source: [["CR:CotN", 212]],
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
  source: [["CR:CotN", 213]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  allowDuplicates: false,
  description: "",
  descriptionFull:
    "The Jewel of Three Prayers is a Vestige of Divergance (see the \"Vestiges of Divergence\" sidebar). In ancient times, Alyxian the Apotheon bore this amulet as a symbol of his covenant with the three Prime Deities: Sehanine the Moon Weaver, Avandra the Change Bringer, and Corellon the Arch Heart. When the jewel is found, only Sehanine's power thrums within its dormant heart. The power of the other two deities waits to be reawakened by a hero - or heroes - who can follow Alyxian's footsteps." +
    "\n" +
    toUni("Dormant State") +
    "In its Dormant State, the jewel has the following properties:" +
    "\n" +
    "\u2022 You gain a +1 bonus to AC while wearing the jewel." +
    "\n" +
    "\u2022 While wearing or holding the jewel, you can use an action to cause it to shed bright light in a 15-foot radius and dim light for an additional 15 feet. The light lasts until you extinguish it (no action required)." +
    "\n" +
    "\u2022 The jewel has 3 charges and regains all its expended charges daily at dawn. While holding the jewel, you can expend 1 charge from it to cast the invisibility spell." +
    toUni("Awakened State") +
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
    "\u2022 In this state, the jewel has received the blessing of Corellon the Arch Heart. A gleaming emerald surrounded by a halo of gold appears on the jewel." +
    "\n" +
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
        page3notes: false,
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
        page3notes: false,
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
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
  source: [["CR:CotN", 214]],
  type: "wondrous item",
  rarity: "common",
  attunement: false,
  description:
    "As an action, I can press this medal to my temple to gain advantage on Intelligence checks and saves for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  descriptionFull:
    "You can press this medal to your temple as an action. Doing so gives you advantage on Intelligence checks and Intelligence saving throws for 1 hour. Once this property has been used, it can't be used again, and the medal becomes nonmagical.",
  action: [["action", ""]],
};

var ifRuidiumIsDestroyed =
  toUni("If Ruidium Is Destroyed. ") +
  "If the Apotheon is killed or redeemed, all the ruidium in Exandria is destroyed instantly, and";

MagicItemsList["ring of red rage"] = {
  name: "Ring of Red Rage",
  source: [["CR:CotN", 214]],
  type: "wondrous item",
  rarity: "very rare",
  attunement: true,
  description:
    "While wearing this ring, I can breathe water and have a swim speed equal to my walking speed. As a bonus action, I can gain benefits for 1 minute or until I'm incapacitated. See notes.",
  descriptionFull:
    "This ring has a stripe of ruidium running through it. While wearing the ring, you gain the following benefits:" +
    "\n" +
    "\u2022 You can breathe water." +
    "\u2022 You gain a swimming speed equal to your walking speed." +
    "\n" +
    toUni("Ruidium Rage. ") +
    "As a bonus action, you can use the ring to gain the following benefits, which last for 1 minute or until you are incapacitated:" +
    "\n" +
    "\u2022 You have advantage on Strength checks and Strength saving throws." +
    "\u2022 When you hit with an attack, you can add your proficiency bonus to the damage roll." +
    "\u2022 Difficult terrain doesn't cost you extra movement, and you are immune to the paralyzed and restrained conditions." +
    "\n   " +
    "You can't use this property of the ring again until you finish a long rest." +
    "\n" +
    toUni("Ruidium Corruption. ") +
    "When you use the Ruidium Rage property of the ring, you must make a DC 20 Charisma saving throw. On a failed save, you gain 1 level of exhaustion. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save." +
    "\n" +
    ifRuidiumIsDestroyed +
    " the ring of red fury becomes a ring of free action.",
  action: [["bonus action", ""]],
  usages: 1,
  recovery: "long rest",
  speed: {
    swim: { spd: "walk", enc: "walk" },
  },
  toNotesPage: [
    {
      name: "Additional Features",
      page3notes: false,
      note: [
        "Once per long rest, I can use a bonus action to gain the following benefits:",
        "\u2022 I have advantage on Strength checks and Strength saving throws",
        "\u2022 I can add my proficiency bonus to my attack damage rolls",
        "\u2022 Difficult terrain doesn't cost me extra movement",
        "\u2022 I am immune to being paralyzed and restrained",
        "These benefits last for 1 min or until I'm incapacitated",
        "When I use this property, I must make a DC 20 Charisma save",
        "On a failure, I gain 1 level of exhaustion and become corrupted by ruidium",
        "If all ruidium is destroyed, this ring becomes a ring of free action",
      ],
    },
  ],
};

MagicItemsList["ruidium armor"] = {
  name: "Ruidium Armor",
  source: [["CR:CotN", 215]],
  type: "armor (medium or heavy)",
  rarity: "very rare",
  attunement: true,
  description:
    "This armor grants me resistance to psychic damage, the ability to breathe water, and a swim speed equal to my walking speed. When I roll a 1 on a save, I make a DC 15 Charisma save. On a failure, I gain 1 level of exhaustion and become corrupted by ruidium. See notes.",
  descriptionFull:
    "This magic armor has a dull, rusty color or has veins of ruidium running through it. While you wear this armor, you gain the following benefits:" +
    "\n" +
    "\u2022 You have resistance to psychic damage." +
    "\n" +
    "\u2022 You can breathe water." +
    "\n" +
    "\u2022 You gain a swimming speed equal to your walking speed." +
    "\n" +
    toUni("Ruidium Corruption. ") +
    "When you roll a 1 on a saving throw while wearing this armor, you must make a DC 15 Charisma saving throw. On a failed save, you gain 1 level of exhaustion. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save." +
    "\n" +
    ifRuidiumIsDestroyed +
    " ruidium armor becomes +1 armor.",
  allowDuplicates: true,
  chooseGear: {
    type: "armor",
    prefixOrSuffix: "brackets",
    itemName1stPage: ["suffix", "Ruidium"],
    descriptionChange: ["prefix", "armor"],
    excludeCheck: function (inObjKey, inObj) {
      return !/medium|heavy/i.test(inObj.type) || /hide/i.test(inObj.name);
    },
  },
  speed: {
    swim: { spd: "walk", enc: "walk" },
  },
  dmgres: ["Psychic"],
  toNotesPage: [
    {
      name: "Additional Features",
      page3notes: false,
      note: ["If all ruidium is destroyed, this armor becomes +1 armor"],
    },
  ],
};

MagicItemsList["ruidium shield"] = {
  name: "Ruidium Shield",
  source: [["CR:CotN", 215]],
  type: "shield",
  rarity: "very rare",
  description:
    "This shield grants me resistance to psychic damage, the ability to breathe water, and a swim speed equal to my walking speed. As a reaction when taking psychic damage, I can have another creature I can see within 30 ft to take the damage instead. See notes.",
  descriptionFull:
    "Tendrils of ruidium extend across the metal surface of this shield. While this shield is on your person, you gain the following benefits:" +
    "\n" +
    "\u2022 You have resistance to psychic damage." +
    "\n" +
    "\u2022 You can breathe water." +
    "\n" +
    "\u2022 You gain a swimming speed equal to your walking speed." +
    "\n" +
    toUni("Psychic Reflection. ") +
    "\n" +
    "When you take psychic damage while holding the shield, you can use your reaction to choose another creature you can see within 30 feet of you. That creature takes the psychic damage you would have taken." +
    toUni("Ruidium Corruption. ") +
    "When you use the shield's Psychic Reflection property, you must make a DC 20 Charisma saving throw. On a failed save, you gain 1 level of exhaustion. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save." +
    "\n" +
    ifRuidiumIsDestroyed +
    " a ruidium shield becomes a +2 shield.",
  attunement: true,
  weight: 6,
  shieldAdd: "Ruidium Shield",
  action: [["reaction", "Psychic Reflection"]],
  speed: {
    swim: { spd: "walk", enc: "walk" },
  },
  dmgres: ["Psychic"],
  toNotesPage: [
    {
      name: "Additional Features",
      page3notes: false,
      note: [
        "When I use the Psychic Reflection property, I make a DC 20 Charisma save",
        "On a failure, I gain 1 level of exhaustion and become corrupted by ruidium",
        "If all ruidium is destroyed, this shield becomes a +2 shield",
      ],
    },
  ],
};

MagicItemsList["ruidium weapon"] = {
  name: "Ruidium Weapon",
  nameTest: "Ruidium",
  source: [["CR:CotN", 215]],
  type: "weapon (any)",
  rarity: "very rare",
  attunement: true,
  description:
    "This weapon deals an extra 2d6 psychic damage, and grants me the ability to breathe water and a swim speed equal to my walking speed. When I roll a 1 on an attack with it, I make a DC 20 Charisma save. On a failure, I gain 1 level of exhaustion and become corrupted by ruidium. See notes.",
  descriptionFull:
    "This magic weapon has a dull, rusty color or has veins of ruidium running through it. While this weapon is on your person, you gain the following benefits:" +
    "\n" +
    "\u2022 You can breathe water." +
    "\n" +
    "\u2022 You gain a swimming speed equal to your walking speed." +
    "\n" +
    toUni("Ruidium Strike. ") +
    "A creature you hit with this weapon takes an extra 2d6 psychic damage." +
    "\n" +
    toUni("Ruidium Corruption. ") +
    "When you roll a 1 on an attack roll made with this weapon, you must make a DC 20 Charisma saving throw. On a failed save, you gain 1 level of exhaustion. If you are not already suffering from ruidium corruption, you become corrupted when you fail this save." +
    "\n" +
    ifRuidiumIsDestroyed +
    " a ruidium weapon becomes a +2 weapon.",
  allowDuplicates: true,
  chooseGear: {
    type: "weapon",
    prefixOrSuffix: "suffix",
    descriptionChange: ["replace", "weapon"],
  },
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (
          !v.isSpell &&
          !v.theWea.isMagicWeapon &&
          /ruidium/i.test(v.WeaponTextName)
        ) {
          v.theWea.isMagicWeapon = true;
          fields.Description = fields.Description.replace(
            /(, |; )?Counts as magical/i,
            ""
          );
          fields.Description +=
            (fields.Description ? "; " : "") + "+2d6 psychic damage";
        }
      },
      'If I include the word "Ruidium" in a the name of a weapon, it will be treated as the magic weapon Ruidium Weapon. The weapon deals an extra 2d6 pychic damage.',
    ],
  },
  speed: {
    swim: { spd: "walk", enc: "walk" },
  },
  toNotesPage: [
    {
      name: "Additional Features",
      page3notes: false,
      note: ["If all ruidium is destroyed, this weapon becomes +2 weapon"],
    },
  ],
};

MagicItemsList["teleportation tablet"] = {
  name: "Teleportation Tablet",
  source: [["CR:CotN", 216]],
  type: "wondrous item",
  rarity: "rare",
  attunement: false,
  description:
    "I can use an action to break this tablet; if I'm on the same plane as the destination circle a 10 ft diameter teleportation circle appears on the ground within 30 ft of me. This circle disappears at the end of my next turn. A creature can study this tablet to learn the destination circle's location. See notes.",
  descriptionFull:
    "This clay tablet is eight inches long, four inches wide, and half an inch thick. Inscribed on it is the sigil sequence for a permanent teleportation circle. A creature that studies the sequence for 10 minutes can make a DC 21 Intelligence (Arcana) check, learning the circle's destination on a success." +
    "\n" +
    "You can use an action to break the tablet in half, turning it to dust. If the tablet is broken while it is on the same plane of existence as the teleportation circle whose sigil sequence was engraved on it, a 10-foot-diameter teleportation circle of glowing blue light appears on the ground in an unoccupied space you choose within 30 feet of you. This teleportation circle has the characteristics of one created using the teleportation circle spell, except that it connects to the teleportation circle whose sigil sequence appears on the tablet." +
    "\n" +
    "The teleportation circle created by the tablet disappears at the end of your next turn.",
  toNotesPage: [
    {
      name: "Destination Circle",
      page3notes: false,
      note: [
        "A creature that studies this tablet for 10 min can make a DC 21 Arcana check",
        "On a success, they learn the circle's destination",
      ],
    },
  ],
};
