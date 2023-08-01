/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Bowman Martial Archetype by Jeremiah Nitzschke
	Effect:     This file adds the Bowman as a selectable fighter subclass
	Author:     Jeremiah Nitzschke
	Code by:	Newbuu2
	Date:		2023/07/31 (sheet v13)
*/

var iFileName = "Bowman Martial Archetype by Jeremiah Nitzschke.js";

RequiredSheetVersion(13);

SourceList["BM:FiF"] = {
  name: "Bowman Martial Archetype by Jeremiah Nitzschke",
  abbreviation: "BM:FiF",
  group: "Homebrew",
  url: "https://vallonde-laid-bare.tumblr.com/post/188933911673/i-somehow-havent-done-a-fighter-archetype-like",
  date: "2019/11/09",
};

AddSubClass("fighter", "bowman", {
  regExpSearch: /bow(wo)?man|archer/i,
  subname: "Bowman",
  source: ["BM:FiF", 1],
  fullname: "Bowman",
  abilitySave: 1,
  features: {
    subclassfeature3: {
      name: "Combat Archery",
      source: ["BM:FiF", 1],
      minlevel: 3,
      description: desc([
        "Once during each of my turns, I can move 5 ft without provoking opportunity attacks",
        "My speed isn't reduced by wearing heavy armor",
      ]),
    },
    subclassfeature7: {
      name: "Weapon Specialization",
      source: ["BM:FiF", 1],
      minlevel: 7,
      description: desc([
        'Use the "Choose Feature" button above to specialize in either Bows or Crossbows',
      ]),
      choices: ["Bow Specialization", "Crossbow Specialization"],
      "bow specialization": {
        name: "Weapon Specialization: Bow",
        description: desc([
          "When I attack with a bow, I can use a bonus action to make an attack with it",
        ]),
        action: ["bonus action", " (after bow attack)"],
        additional: "Once per turn"
      },
      "crossbow specialization": {
        name: "Weapon Specialization: Crossbow",
        description: desc([
          "When I attack with a crossbow, I can increase its damage by 1d8 and range by 25 ft",
        ]),
        additional: "Once per turn"
      },
      choiceDependencies: [
        {
          feature: "subclassfeature10",
        },
        {
          feature: "subclassfeature18",
        },
      ],
    },
    subclassfeature10: {
      name: "Technical Bowman",
      source: ["BM:FiF", 1],
      minlevel: 10,
      description: desc([
        'Use the "Choose Feature" button above to specialize in either Bows or Crossbows',
      ]),
      choices: ["Bow Specialization", "Crossbow Specialization"],
      choicesNotInMenu : true,
      "bow specialization": {
        name: "Weapon Specialization: Bow",
        description: desc([
          "When I damage a creature within 5 ft of a solid surface with a bow, I can pin them",
          "The creature may use its reaction to remove the projectile; deals 1d4 slashing damage",
          "Otherwise the creature cannot use its movement"
        ]),
        action: ["bonus action", " (after bow attack)"],
        additional : "Once per turn",
      },
      "crossbow specialization": {
        name: "Weapon Specialization: Crossbow",
        description: desc([
          "When I attack with a crossbow, I can slip past my target's defenses",
          "I ignore the AC granted to the target by armor and shields for the attack",
        ]),
        additional: "Once per turn"
      },
    },
    subclassfeature15: {
      name: "War-Archer",
      source: ["BM:FiF", 1],
      minlevel: 15,
      description: desc([
        "I've refined my archery skills with battlefield experience, granting benefits:",
        "\u2022 As a reaction, I can make an attack of opportunity with a bow or crossbow",
        "\u2022 My AC increases by 1 if I'm near an ally that is not incapacitated",
        "\u2022 I gain a +1 bonus to bow/crossbow attack rolls made within the first range increment"
      ]),
      action: ["reaction", " (bow/crossbow opportunity attack)"],
    },
    subclassfeature18: {
      name: "Superior Weapon Specialization",
      source: ["BM:FiF", 1],
      minlevel: 18,
      description: desc([
        'Use the "Choose Feature" button above to specialize in either Bows or Crossbows',
      ]),
      choices: ["Bow Specialization", "Crossbow Specialization"],
      choicesNotInMenu : true,
      "bow specialization": {
        name: "Superior Weapon Specialization: Bow",
        description: desc([
            "When I attack with a bow, I can use a bonus action to make two attacks with it",
        ]),
        action: ["bonus action", " (after bow attack)"],
        additional: "Once per turn"
      },
      "crossbow specialization": {
        name: "Superior Weapon Specialization: Crossbow",
        description: desc([
            "When I attack with a crossbow, I can increase its damage by 2d8 and range by 50 ft",
        ]),
        additional: "Once per turn"
      },
    },
  },
});
