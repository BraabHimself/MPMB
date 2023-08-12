/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Artificer Specialization: Armor Scion
	Effect:     Adds the Artificer Specialization Armor Scion as a selectable subclass
	Code by:	u/Newbuu2
    Author:     Newbuu2
	Date:		2023-08-08 (sheet v13.1.17)
*/

var iFileName = "Artificer Specialization - Armor Scion by Newbuu2.js";

if (sheetVersion < 13001007) {
  throw "This script was made for a newer version of the sheet (v13.1.7). Please use the latest version and try again.\nYou can get the latest version at www.flapkan.com.";
}
var iFileName = "all_WotC_pub+UA.js";
RequiredSheetVersion("13.1.7");

SourceList["NB2:AS"] = {
  name: "Artificer Specialization: Armor Scion",
  abbreviation: "NB2:AS",
  group: "Homebrew",
  url: "https://homebrewery.naturalcrit.com/share/WKIaKiq7EcN7",
  date: "2023/08/08",
};

var armorScionSubclassObj = {
  regExpSearch: /^(?=.*armor)(?=.*scion).*$/i,
  subname: "Armor Scion",
  fullname: "Armor Scion",
  source: ["NB2:AS", 1],
  features: {
    subclassfeature3: {
      name: "Tool Proficiency",
      source: ["NB2:AS", 1],
      minlevel: 3,
      description: " [proficient with tinker's tools]",
      toolProfs: ["Tinker's tools"],
      spellcastingExtra: [
        "hunter's mark",
        "magic missile",
        "locate object",
        "scorching ray",
        "lightning bolt",
        "tongues",
        "fire shield",
        "greater invisibility",
        "cone of cold",
        "teleportation circle",
      ],
    },
    "subclassfeature3.1": {
      name: "Dynamo Suit",
      source: ["NB2:AS", 1],
      minlevel: 3,
      description: desc([
        "With this armor, my AC is 10 + Dex mod + Int mod and can use it as a spellcasting focus",
        "As an action, I can don or doff it; As a bonus action, I can deploy or retract its helmet",
        "It can't be removed against my will, covers all my limbs, and even replaces missing limbs",
        "If destroyed/lost, I can recreate it after an hour long ritual with tinker's tools in hand",
      ]),
      armorOptions: [
        {
          regExpSearch: /Dynamo Suit/,
          name: "Dynamo Suit",
          source: ["NB2:AS", 1],
          ac: "10+Int",
          affectsWildShape: false,
        },
      ],
      additional: levels.map(function (n) {
        return n < 3
          ? "0"
          : (n < 9 ? 2 : n < 15 ? 3 : 4) +
              " minor upgrades; " +
              (typePF
                ? 'use "Choose Feature" button'
                : "Choose Feature button");
      }),
      armorAdd: "Dynamo Suit",
      action: [
        ["action", " (don/doff)"],
        ["bonus action", " (retract/deploy helmet)"],
      ],
      extraname: "Minor Upgrade",
      extrachoices: [],
      extraTimes: levels.map(function (n) {
        return n < 3 ? 0 : n < 9 ? 2 : n < 15 ? 3 : 5;
      }),
    },
    "subclassfeature3.2": {
      name: "Arm Cannon",
      source: ["NB2:AS", 1],
      minlevel: 3,
      description: desc([
        "This simple ranged weapon, which covers one of my hands, has the following properties:",
        "\u2022 I can add my Int mod to the attack and damage rolls, instead of my Dex mod",
        "\u2022 While deployed, I can't wield anything that hand; disadv. on 2-handed checks",
      ]),
      additional: "retract/deploy as bonus action",
      weaponOptions: [
        {
          regExpSearch: /^(?=.*arm)(?=.*cannon).*$/i,
          name: "Arm Cannon",
          source: ["NB2:AS", 1],
          ability: 4,
          type: "Simple",
          damage: [1, 6, "force"],
          range: "60/120 ft",
          abilitytodamage: true,
        },
      ],
      calcChanges: {
        atkAdd: [
          function (fields, v) {
            if (
              What("Dex Mod") > What("Int Mod") &&
              (/^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponText) ||
                /^(?=.*charged)(?=.*cannon).*$/i.test(v.WeaponText))
            ) {
              fields.Mod = 2;
            }
          },
          "Apply Dexterity modifier to the Arm Cannon's attack and damage modifiers if it is higher than the Intelligence modifier",
        ],
      },
      weaponsAdd: ["Arm Cannon"],
      action: [["bonus action", " (retract/deploy)"]],
      "cannon mastery": {
        name: "Cannon Mastery",
        extraname: "Armor Scion 5",
        source: ["NB2:AS", 1],
        description: desc([
          "I can make two attacks with the Arm Cannon, instead of one, with the attack action",
        ]),
        action: ["action", " (2 Arm Cannon attacks per action)"],
        calcChanges: {
          atkAdd: [
            function (fields, v) {
              if (/^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName)) {
                fields.Description +=
                  (fields.Description ? "; " : "") + "Two Arm Cannon attacks per attack action";
              }
            },
            "I can make two Arm Cannon attacks when I take the attack action",
            3,
          ],
        },
      },
      autoSelectExtrachoices: [
        {
          extrachoice: "cannon mastery",
          minlevel: 5,
        },
      ],
    },
    subclassfeature9: {
      name: "Major Upgrade",
      source: ["NB2:AS", 1],
      minlevel: 9,
      description:
        " [1 major upgrade; " +
        (typePF ? 'use "Choose Feature" button' : "Choose Feature button"),
      extraname: "Major Upgrade",
      extrachoices: [],
      extraTimes: levels.map(function (n) {
        return n < 9 ? 0 : n < 15 ? 1 : 2;
      }),
    },
    subclassfeature15: {
      name: "Apex Exoskeleton",
      source: ["NB2:AS", 1],
      minlevel: 15,
      description: desc([
        "I've perfected the Dynamo Suit, it grants the following benefits:",
        "\u2022 +1 bonus to AC; +1 bonus to attack/damage rolls with my Arm Cannon",
        "\u2022 After a long rest, I can forfeit 5 known infusions",
        "   If I do, I can select 2 extra minor upgrades or 1 extra major upgrade",
      ]),
      extraAC: {
        mod: 1,
        text: "I gain a +1 bonus to AC while wearing the Dynamo Suit.",
        stopeval: function (v) {
          return !/^(?=.*dynamo)(?=.*suit).*$/i.test(v.theArmor.name);
        },
      },
      calcChanges: {
        atkCalc: [
          function (fields, v, output) {
            if (/^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName)) {
              output.extraDmg += 1;
              output.extraHit += 1;
            }
          },
          "",
        ],
      },
    },
  },
};

var armorScionMinorUpgrades = {
  "clinging energies": {
    name: "Clinging Energies",
    as_extrachoices: "Clinging Energies",
    description: desc(
      "Once per turn on an Arm Cannon hit, I can have the attack deal an extra 1d4 damage"
    ),
    source: ["NB2:AS", 2],
    submenu: "[improves Arm Cannon]",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (/^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName)) {
            fields.Description +=
              (fields.Description ? "; " : "") + "Once per turn, +1d4 damage";
          }
        },
        "Once per turn when I hit a creature with the Arm Cannon, I can deal an extra 1d4 damage to the target",
        3,
      ],
    },
  },
  "back boosters": {
    name: "Back Boosters",
    as_extrachoices: "Back Boosters",
    description: desc(
      "I can use my Intelligence score, instead of Strength, to determine how far I can jump"
    ),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
  },
  "spring boots": {
    name: "Spring Boots",
    as_extrachoices: "Spring Boots",
    description: desc("My walking speed increases by 5 feet"),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    speed: { walk: { spd: "+5", enc: "+5" } },
  },
  "umbral visor": {
    name: "Umbral Visor",
    as_extrachoices: "Umbral Visor",
    description: desc("I gain darkvision out to a range of 30 feet"),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    vision: [["Darkvision", "fixed 30"]],
  },
  "energy barrier": {
    name: "Energy Barrier",
    as_extrachoices: "Energy Barrier",
    description: desc(
      "After a long or short rest, I gain temporary HP equal to my artificer level"
    ),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
  },
  "x-ray visor": {
    name: "X-ray Visor",
    as_extrachoices: "X-ray Visor",
    description: desc(
      "Ranged attacks I make ignore 1/2 cover and treat 3/4 cover as 1/2 cover"
    ),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
  },
  "dynamo gauntlet": {
    name: "Dynamo Gauntlet",
    as_extrachoices: "Dynamo Gauntlet",
    description: desc([
      "As an action, I can make a melee attack with an empty fist; deals 2d4 bludgeoning damage",
      "On a hit, the target cannot take reactions until the start of its next turn",
    ]),
    additional: "counts as a simple weapon",
    weaponOptions: [
      {
        regExpSearch: /^(?=.*dynamo)(?=.*gauntlet).*$/i,
        name: "Dynamo Gauntlet",
        source: ["NB2:AS", 2],
        description:
          "Target can't take reactions until start of their next turn",
        ability: 4,
        type: "Simple",
        damage: [2, 4, "bludgeoning"],
        range: "Melee",
        abilitytodamage: true,
      },
    ],
    weaponsAdd: ["Dynamo Gauntlet"],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            What("Str Mod") > What("Int Mod") &&
            /^(?=.*dynamo)(?=.*gauntlet).*$/i.test(v.WeaponText)
          ) {
            fields.Mod = 1;
          }
        },
        "Apply Strength modifier to the Dynamo Gauntlet's attack and damage modifiers if it is higher than the Intelligence modifier",
      ],
    },
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
  },
  "adaptive boots": {
    name: "Adaptive Boots",
    as_extrachoices: "Adaptive Boots",
    description: desc("I ignore difficult terrain"),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
  },
  "elemental cannon (prereq: level 6 armor scion)": {
    name: "Elemental Cannon",
    as_extrachoices: "Elemental Cannon (prereq: level 6 Armor Scion)",
    description: desc([
      "As a bonus action, I can change the damage type of my Arm Cannon",
      "I can choose cold, fire, lightning, or force damage",
      "If I choose cold, fire, or lightning, my Arm Cannon deals 1d8 damage of that type",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Arm Cannon]",
    action: ["bonus action", " (cold/fire/lightning)"],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            classes.known.artificer &&
            classes.known.artificer.level > 2 &&
            /^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName)
          ) {
            if (/^(?=.*cold).*$/i.test(v.WeaponTextName)) {
              fields.Damage_Type = "Cold";
              fields.Damage_Die = "1d8";
            } else if (/^(?=.*fire).*$/i.test(v.WeaponTextName)) {
              fields.Damage_Type = "Fire";
              fields.Damage_Die = "1d8";
            } else if (/^(?=.*lightning).*$/i.test(v.WeaponTextName)) {
              fields.Damage_Type = "Lightning";
              fields.Damage_Die = "1d8";
            }
          }
        },
        "If I include 'Cold', 'Fire', or 'Lightning' in the name of my Arm Cannon, it will change it to that damage type and increased its damage die to 1d8",
      ],
    },
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "tenebris cannon (prereq: level 6 armor scion)": {
    name: "Tenebris Cannon",
    as_extrachoices: "Tenebris Cannon (prereq: level 6 Armor Scion)",
    description: desc([
      "As a bonus action, I can change the damage type of my Arm Cannon",
      "I can choose radiant, necrotic, or force damage",
      "If I choose radiant or necrotic, my Arm Cannon deals 1d8 damage of that type",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Arm Cannon]",
    action: ["bonus action", " (radiant/necrotic)"],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            classes.known.artificer &&
            classes.known.artificer.level > 2 &&
            /^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName)
          ) {
            if (/^(?=.*radiant).*$/i.test(v.WeaponTextName)) {
              fields.Damage_Type = "Radiant";
              fields.Damage_Die = "1d8";
            } else if (/^(?=.*necrotic).*$/i.test(v.WeaponTextName)) {
              fields.Damage_Type = "Necrotic";
              fields.Damage_Die = "1d8";
            }
          }
        },
        "If I include 'Radiant' or 'Necrotic' in the name of my Arm Cannon, it will change it to that damage type and increased its damage die to 1d8",
      ],
    },
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "arcane missile (prereq: level 6 armor scion)": {
    name: "Arcane Missile",
    as_extrachoices: "Arcane Missile (prereq: level 6 Armor Scion)",
    description: desc([
      "As an action, I can target a point within 60ft; 20ft radius sphere centered on that point",
      "Each creature the radius makes a Dex save; deals my prof. bonus d6 thunder damage",
      "On a success, they take half damage; deals double damage to objects/structures",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Arm Cannon]",
    action: ["action", ""],
    usages: 3,
    recovery: "long rest",
    weaponOptions: [
      {
        regExpSearch: /^(?=.*arcane)(?=.*missile).*$/i,
        name: "Arcane Missile",
        source: ["NB2:AS", 2],
        ability: 4,
        type: "Simple",
        damage: [3, 6, "thunder"],
        range: "60 ft",
        dc: true,
      },
    ],
    weaponsAdd: ["Arcane Missile"],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            classes.known.artificer &&
            classes.known.artificer.level >= 6 &&
            /^(?=.*arcane)(?=.*missile).*$/i.test(v.WeaponTextName)
          ) {
            fields.Damage_Die = How("Proficiency Bonus") + "d6";
          }
        },
        "My Arcane Missile deals my proficiency bonus d6 thunder damage in a 20ft radius sphere.",
        1,
      ],
    },
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "decoy projection (prereq: level 6 armor scion)": {
    name: "Decoy Projection",
    as_extrachoices: "Decoy Projection (prereq: level 6 Armor Scion)",
    description: desc([
      "As a reaction when a hostile ends its turn within 5 ft of me, I can move half my speed",
      "This movement does not provoke attacks of opportunity",
      "This does not affect creatures who are immune to illusion or do not rely on sight",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    action: ["reaction", ""],
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "scan visor (prereq: level 6 armor scion)": {
    name: "Scan Visor",
    as_extrachoices: "Scan Visor (prereq: level 6 Armor Scion)",
    description: desc([
      "Whenever I make an Investigation or Perception check, I can add 1d6 to it",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "gravity field (prereq: level 6 armor scion)": {
    name: "Gravity Field",
    as_extrachoices: "Gravity Field (prereq: level 6 Armor Scion)",
    description: desc(["I gain a swimming speed equal to my walking speed"]),
    speed: {
      swim: { spd: "walk", enc: "walk" },
    },
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "enviro barrier (prereq: level 6 armor scion)": {
    name: "Enviro Barrier",
    as_extrachoices: "Enviro Barrier (prereq: level 6 Armor Scion)",
    description: desc([
      "When I choose this upgrade and after a long rest I can choose a damage type",
      "I gain resistance to the chosen damage type",
    ]),
    additional: "cold/fire/lightning",
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "morph ball (prereq: level 6 armor scion)": {
    name: "Morph Ball",
    as_extrachoices: "Morph Ball (prereq: level 6 Armor Scion)",
    description: desc([
      "As an action, I can have my suit and myself take on a spherical shape",
      "While in this form, my size is small; I can only move or Dash",
    ]),
    action: ["action", ""],
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 6;
    },
  },
  "rebreather (prereq: level 9 armor scion)": {
    name: "Rebreather",
    as_extrachoices: "Rebreather (prereq: level 9 Armor Scion)",
    description: "[I no longer need to breathe]",
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "speed booster (prereq: level 9 armor scion)": {
    name: "Speed Booster",
    as_extrachoices: "Speed Booster (prereq: level 9 Armor Scion)",
    description: desc(["As a bonus action, I can take the Dash action"]),
    action: [["bonus action", "Speed Booster (dash)"]],
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "tenebris barrier (prereq: level 9 armor scion)": {
    name: "Tenebris Barrier",
    as_extrachoices: "Tenebris Barrier (prereq: level 9 Armor Scion)",
    description: desc([
      "When I choose this upgrade and after a long rest I can choose a damage type",
      "I gain resistance to the chosen damage type",
    ]),
    additional: "necrotic/radiant",
    source: ["NB2:AS", 2],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "barrel extension (prereq: level 9 armor scion)": {
    name: "Barrel Extension",
    as_extrachoices: "Barrel Extension (prereq: level 9 Armor Scion)",
    description: desc([
      "The long and short ranges of my Arm Cannon increase by 30 ft",
    ]),
    source: ["NB2:AS", 2],
    submenu: "[improves Arm Cannon]",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            (/^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName) ||
              /^(?=.*charged)(?=.*cannon).*$/i.test(v.WeaponTextName) ||
              /^(?=.*arcane)(?=.*missile).*$/i.test(v.WeaponTextName)) &&
            /\d+ ?(f.{0,2}t|m)/i.test(fields.Range)
          ) {
            var rangeNmbr = fields.Range.match(/\d+([.,]\d+)?/g);
            var notNmbrs = fields.Range.split(RegExp(rangeNmbr.join("|")));
            fields.Range = "";
            rangeNmbr.forEach(function (dR, idx) {
              fields.Range +=
                (notNmbrs[idx] ? notNmbrs[idx] : "") +
                (parseFloat(dR.toString().replace(",", ".")) + 30);
            });
            if (notNmbrs.length > rangeNmbr.length) {
              fields.Range += notNmbrs[notNmbrs.length - 1];
            }
          }
        },
        "My Arm Cannon's range increases by 30 ft",
      ],
    },
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
};

var armorScionMajorUpgrades = {
  "infusion modularity": {
    name: "Infusion Modularity",
    as_extrachoices: "Infusion Modularity",
    description: desc(
      "My Dynamo Suit and Arm Cannon can now each bear one infusion"
    ),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "spider ball (prereq: morph ball minor upgrade)": {
    name: "Spider Ball",
    as_extrachoices: "Spider Ball (prereq: Morph Ball minor upgrade)",
    description: desc(
      "While in Morph Ball form, I gain the movement benefits of the spider climb spell"
    ),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      var morphBallSelected =
        GetFeatureChoice(
          "classes",
          "artificer",
          "subclassfeature3.1",
          true
        ).indexOf("morph ball (prereq: level 6 armor scion)") >= 0;

      return classes.known.artificer.level >= 9 && morphBallSelected;
    },
  },
  "lore module": {
    name: "Lore Module",
    as_extrachoices: "Lore Module",
    description: desc("I have advantage on History and Nature checks"),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "super missile (prereq: arcane missile minor upgrade)": {
    name: "Super Missile",
    as_extrachoices: "Super Missile (prereq: Arcane Missile minor upgrade)",
    description: desc(
      "My Arcane Missile deals an extra 4d6 damage; its type is the same as my Arm Cannon"
    ),
    source: ["NB2:AS", 3],
    submenu: "[improves Arm Cannon]",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (/^(?=.*arcane)(?=.*missile).*$/i.test(v.WeaponTextName)) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "+4d6 damage, type matches Arm Cannon's type";
          }
        },
        "Arcane Missile deals an additional 4d6 damage, whose type matches the type of my Arm Cannon",
        3,
      ],
    },
    extraLimitedFeatures: [
      {
        name: "Arcane Missile",
        usages: 2,
        recovery: "long rest",
        addToExisting: true,
      },
    ],
    prereqeval: function (v) {
      var arcaneMissileSelected =
        GetFeatureChoice(
          "classes",
          "artificer",
          "subclassfeature3.1",
          true
        ).indexOf("arcane missile (prereq: level 6 armor scion)") >= 0;

      return classes.known.artificer.level >= 9 && arcaneMissileSelected;
    },
  },
  "focused beam": {
    name: "Focused Beam",
    as_extrachoices: "Focused Beam",
    description: desc(
      "Damage dealt by my Arm Cannon ignores damage resistances"
    ),
    source: ["NB2:AS", 3],
    submenu: "[improves Arm Cannon]",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            /^(?=.*arm)(?=.*cannon).*$/i.test(v.WeaponTextName) ||
            /^(?=.*arcane)(?=.*missile).*$/i.test(v.WeaponTextName) ||
            /^(?=.*charged)(?=.*cannon).*$/i.test(v.WeaponTextName)
          ) {
            fields.Description +=
              (fields.Description ? "; " : "") + "Ignore damage resistances";
          }
        },
        "Damage dealt by my Arm Cannon ignores damage resistance",
        3,
      ],
    },
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "chameleon cloak": {
    name: "Chameleon Cloak",
    as_extrachoices: "Chameleon Cloak",
    description: desc(
      "As a action once per short rest, I can gain the effects of pass without trace for 10 mins"
    ),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    extraLimitedFeatures: [
      {
        name: "Chameleon Cloak (pass without trace)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    spellcastingBonus: {
      name: "Chameleon Cloak",
      spells: ["pass without trace"],
      selection: ["pass without trace"],
      firstCol: "oncesr",
      allowUpCasting: false,
      magicItemComponents: false,
    },
    spellChanges: {
      "pass without trace": {
        time: "1 a",
        duration: "10 min",
        components: "",
        compMaterial: "",
        description:
          "I gain +10 Dex(Stealth) checks, leave no tracks, can't be tracked by nonmagical means",
        changes:
          "As an action, I can gain the effects of the pass without trace for 10 minutes",
      },
    },
    action: ["action", " (pass without trace)"],
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "charged cannon": {
    name: "Charged Cannon",
    as_extrachoices: "Charged Cannon",
    description: desc([
      "As an action, I can charge my Arm Cannon to unleash a powerful blast",
      "Make an attack roll using your Arm Cannon",
      "On a hit, it deals 3d10 damage of my Arm Cannon's type; crit on 19-20",
    ]),
    source: ["NB2:AS", 3],
    submenu: "[improves Arm Cannon]",
    action: ["action", ""],
    weaponOptions: [
      {
        regExpSearch: /^(?=.*charged)(?=.*cannon).*$/i,
        name: "Charged Cannon",
        source: ["NB2:AS", 3],
        ability: 4,
        type: "Simple",
        damage: [3, 10, "force"],
        range: "60/120 ft",
        abilitytodamage: true,
      },
    ],
    weaponsAdd: ["Charged Cannon"],
    prereqeval: function (v) {
      return classes.known.artificer.level >= 9;
    },
  },
  "space jump": {
    name: "Space Jump",
    as_extrachoices: "Space Jump",
    description: desc(
      "At the end of a jump, I can jump again, even in midair, as part of the same jump"
    ),
    additional: "once per jump",
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    prereqeval: function (v) {
      var backBoosterSelected =
        GetFeatureChoice(
          "classes",
          "artificer",
          "subclassfeature3.1",
          true
        ).indexOf("back boosters") >= 0;

      return classes.known.artificer.level >= 9 && backBoosterSelected;
    },
  },
  "kinetic reclamation": {
    name: "Kinetic Reclamation",
    as_extrachoices: "Kinetic Reclamation",
    description: desc(
      "After a short rest, I can recover my Int mod levels of spell slots"
    ),
    usages: 1,
    recovery: "long rest",
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
  },
  "rapid modification": {
    name: "Rapid Modification",
    as_extrachoices: "Rapid Modification",
    description: desc(
      "As a bonus action, I can exchange a minor upgrade for another",
      "The upgrade being swapped can't be a prerequisite for a Major Upgrade"
    ),
    usages: 1,
    recovery: "long rest",
    altResource: "SS 1+",
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    action: ["bonus action", ""],
  },
  "moon boots": {
    name: "Moon Boots",
    as_extrachoices: "Moon Boots",
    description: desc("My walking speed increases by 10 feet"),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    speed: { walk: { spd: "+10", enc: "+10" } },
    prereqeval: function (v) {
      var springBootsSelected =
        GetFeatureChoice(
          "classes",
          "artificer",
          "subclassfeature3.1",
          true
        ).indexOf("spring boots") >= 0;

      return classes.known.artificer.level >= 9 && springBootsSelected;
    },
  },
  "super dynamo gauntlet": {
    name: "Super Dynamo Gauntlet",
    as_extrachoices: "Super Dynamo Gauntlet",
    description: desc([
      "My Dynamo Gauntlet now deals 4d4 bludgeoning damage",
      "I can also make another Arm Cannon/Dynamo Gauntlet attack as part of the same action",
    ]),
    source: ["NB2:AS", 3],
    submenu: "[improves Dynamo Suit]",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            classes.known.artificer &&
            classes.known.artificer.level >= 9 &&
            /^(?=.*dynamo)(?=.*gauntlet).*$/i.test(v.WeaponTextName)
          ) {
            fields.Damage_Die = "4d4";
            fields.Description +=
              (fields.Description ? "; " : "") +
              "Can make another Arm Cannon/Dynamo Gauntlet attack";
          }
        },
        "My Dynamo Gauntlet now deals 4d4 bludgeoning damage and I can make an Arm Cannon or Dynamo Gauntlet attack as part of the same action",
      ],
    },
    prereqeval: function (v) {
      var dynamoGauntletSelected =
        GetFeatureChoice(
          "classes",
          "artificer",
          "subclassfeature3.1",
          true
        ).indexOf("dynamo gauntlet") >= 0;

      return classes.known.artificer.level >= 9 && dynamoGauntletSelected;
    },
  },
};

var armorScionMinorUpgradeKeys = Object.keys(armorScionMinorUpgrades);

for (var upgIdx = 0; upgIdx < armorScionMinorUpgradeKeys.length; upgIdx++) {
  var minorUpgKey = armorScionMinorUpgradeKeys[upgIdx];
  var minorUpgObj = armorScionMinorUpgrades[minorUpgKey];

  armorScionSubclassObj.features["subclassfeature3.1"][minorUpgKey] =
    minorUpgObj;
  armorScionSubclassObj.features["subclassfeature3.1"].extrachoices.push(
    minorUpgObj.as_extrachoices
  );
}

var armorScionMajorUpgradeKeys = Object.keys(armorScionMajorUpgrades);

for (var upgIdx = 0; upgIdx < armorScionMajorUpgradeKeys.length; upgIdx++) {
  var majorUpgKey = armorScionMajorUpgradeKeys[upgIdx];
  var majorUpgObj = armorScionMajorUpgrades[majorUpgKey];

  armorScionSubclassObj.features["subclassfeature9"][majorUpgKey] = majorUpgObj;
  armorScionSubclassObj.features["subclassfeature9"].extrachoices.push(
    majorUpgObj.as_extrachoices
  );
}

AddSubClass("artificer", "armor scion", armorScionSubclassObj);
