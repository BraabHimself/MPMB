/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Oath of the Crystalline Guardian
	Effect:		This script adds the Paladin subclass Oath of the Crystalline Guardian
	Code by:	Transcription by u/Newbuu2
    Author:     u/Monkey_DM
	Date:		2021-04-14
*/

var iFileName = "Oath of the Crystalline Guardian.js";

RequiredSheetVersion(13);

SourceList["MDM:OCG"] = {
  name: "Oath of the Crystalline Guardian",
  abbreviation: "OCG",
  date: "2021/04/14",
  group: "Homebrew",
  url: "https://www.reddit.com/r/MonkeyDM/comments/mqupw8/paladin_oath_of_the_crystalline_guardian_protect/",
};

AddSubClass("paladin", "oath of the crystalline guardian", {
  regExpSearch:
    /^((?=.*(crystalline guardian|unbroken))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))).*$/i,
  subname: "Oath of the Crystalline Guardian",
  source: ["OCG", 1],
  features: {
    subclassfeature3: {
      name: "Channel Divinity: Protective Barrier",
      source: ["OCG", 1],
      minlevel: 3,
      description: desc([
        "When an ally takes damage, I can use my reaction to halve the damage they take",
      ]),
      action: ["reaction", ""],
      spellcastingExtra: [
        "sanctuary",
        "shield of faith",
        "sacrificial shield",
        "warding bond",
        "magic circle",
        "spirit guardians",
        "death ward",
        "resilient sphere",
        "hallow",
        "wall of force",
      ],
    },
    "subclassfeature3.1": {
      name: "Channel Divinity: Shunt Magic",
      source: ["OCG", 1],
      minlevel: 3,
      description: desc([
        "As an action, I can quarantine magical effects on a creature within 30 ft for 1 min",
        "I must concentrate on this effect as I would a spell",
      ]),
      additional: "See 3rd page",
      action: ["action", ""],
      toNotesPage: [
        {
          name: "Channel Divinity: Shunt Magic",
          page3notes : true,
          note: desc([
            "As an action, I can quarantine magical effects on a creature within 30 ft",
            "An unwilling target makes a Wisdom save to prevent the quarantine",
            "On a failure, or it is willing, magical effects are quarantined for 1 minute",
            "For the duration, time is not counted against quarantined magical effects",
            "The effects resume, including concentration, when this effect ends",
            "The target may make a Wisdom save at the end of their turns to end this effect",
            "I must concentrate on this effect as I would a spell",
          ]),
        },
      ],
    },
    subclassfeature7: {
      name: "Aura of Preservation",
      source: ["OCG", 1],
      minlevel: 7,
      description: desc([
        "Allies and I gain" + (typePF ? "" : " my Cha mod") + " tempory HP when starting turns within range",
        "An ally can also gain this effect the first time they enter this range on their turn",
      ]),
      additional: levels.map(function (n) {
        if (n < 7) return "";
        return (n < 18 ? 10 : 30) + "-foot aura" + (typePF ? "; Cha mod temp HP" : "");
      }),
    },
    subclassfeature15: {
      name: "Sturdy Body",
      source: ["OCG", 2],
      minlevel: 15,
      description: desc([
        "I gain a +1 bonus to AC and resistance to nonmagical bludg./piercing/slashing damage",
        "As an action, I can touch a creature to transfer these benefits to them",
        "They last for 8 hours or until I recover them, using an action to touch them",
      ]),
      action: ["reaction", " (transfer)"],
      dmgres: [
        ["Bludgeoning", "Bludg. (nonmagical)"],
        ["Piercing", "Pierc. (nonmagical)"],
        ["Slashing", "Slash. (nonmagical)"],
      ],
      extraAC: {
        mod: 1,
        text: "I gain a +1 bonus to AC.",
      },
    },
    subclassfeature20: {
      name: "Unbreakable Guardian",
      source: ["OCG", 2],
      minlevel: 20,
      description: desc([
        "As an action, I can gain the following benefits for 1 minute:",
        " \u2022 I have resistance to all damage",
        " \u2022 As a reaction when an ally takes damage, I can swap places with them",
        "   I take the damage instead of them and they appear where I was",
        " \u2022 At the start of my turn, I regain my paladin level + Cha mod HP",
      ]),
      recovery: "long rest",
      usages: 1,
      action: ["action", ""],
    },
  },
});
