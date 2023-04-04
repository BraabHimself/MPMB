/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Paladin Oath - Red Knight
	Effect:     This file adds the Red Knight as a paladin subclass
	Author:     u/Xenoezen
	Code by:	u/Newbuu2
	Date:		2023-04-03 (sheet v13)
*/

var iFileName = "Oath of the Red Knight by Xenoezen.js";

RequiredSheetVersion(13);

SourceList["X:RK"] = {
  name: "Xenoezen's Oath of the Red Knight",
  abbreviation: "X:RK",
  group: "Homebrew",
  url: "https://homebrewery.naturalcrit.com/share/Vcgpqn8snIoW",
  date: "2022/07/28",
};

AddSubClass("paladin", "oath of the red knight", {
  regExpSearch:
    /^((?=.*(red knight))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))).*$/i,
  subname: "Oath of the Red Knight",
  source: ["X:RK", 1],
  features: {
    subclassfeature3: {
      name: "Channel Divinity: Berserker's Sorrow",
      source: ["X:RK", 1],
      minlevel: 3,
      description: desc([
        "As a bonus action now and on subsequent turns for 1 min, I can make a weapon attack",
        // This is not in the linked materials, however, the change from 1d6 slashing damage to proficiency is discussed here:
        // https://www.reddit.com/r/UnearthedArcana/comments/wa87eo/comment/ihzw6b1/?utm_source=share&utm_medium=web2x&context=3
        "Each time I make this attack, I take damage equal to my prof bonus",
      ]),
      action: ["bonus action", " (Prof bonus self damage)"],
      spellcastingExtra: [
        "hunter's mark",
        "zephyr strike",
        "crown of madness",
        "misty step",
        "Ashardalon's stride",
        "spirit shroud",
        "dimension door",
        "fire shield",
        "destructive wave",
        "immolation",
      ],
    },
    "subclassfeature3.1": {
      name: "Channel Divinity: Butcher",
      source: ["X:RK", 1],
      minlevel: 3,
      description: desc([
        "As a reaction when I reduce an enemy to 0 HP, I can instantly kill it to regain HP",
        "I can also regain HP from Lay on Hands as part of the reaction",
      ]),
      additional: "4 times target's CR",
      action: ["reaction", ""],
    },
    subclassfeature7: {
      name: "Aura of Fury",
      source: ["X:RK", 2],
      minlevel: 7,
      description: desc([
        "Allies " + (typePF ? "with" : "") + "in range and I gain adv. until end of our next turn vs. creatures that damage us",
      ]),
      additional: levels.map(function (n) {
        if (n < 7) return "";
        return (n < 18 ? 10 : 30) + "-foot aura";
      }),
    },
    subclassfeature15: {
      name: "Boiling Blood",
      source: ["X:RK", 2],
      minlevel: 15,
      description: desc([
        "Creatures that damage me are marked until the end of my next turn",
        "My Improved Divine Smite die increases to 1d12 against marked creatures",
      ]),
    },
    subclassfeature20: {
      name: "The Ripper",
      source: ["X:RK", 2],
      minlevel: 20,
      description: desc([
        "As a bonus action, I can gain the following benefits for 1 minute:",
        " \u2022 My movement speed increases by 30ft",
        " \u2022 My weapon attacks deal an additional 1d8 damage",
        " \u2022 When damaged by a creature, I can use a reaction to:",
        "   Move up to twice my speed towards it and make up to two weapon attacks against it",
      ]),
      recovery: "long rest",
      usages: 1,
      altResource: "SS 5",
      action: ["bonus action", ""],
    },
  },
});
