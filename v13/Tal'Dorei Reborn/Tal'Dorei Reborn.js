/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Tal'Dorei Campaign Setting Reborn
	Effect:		This script adds the contents of the Tal'Dorei Campaign Setting Reborn 
	Code by:	Transcription by u/Newbuu2, with contributions from Smashman and NodHero
	Date:		2022-01-24
*/

var iFileName = "Tal'Dorei Campaign Setting Reborn.js";
RequiredSheetVersion(13);

SourceList["TDCSR"] = {
  name: "Tal'Dorei Campaign Setting Reborn",
  abbreviation: "TDCSR",
  group: "Third Party",
  url: "https://shop.critrole.com/collections/new-products/products/taldorei-campaign-setting-reborn",
  date: "2022-01-18",
};

/*
 * Subclasses
 */

//Contributions from NodHero
AddSubClass("barbarian", "juggernaut", {
  regExpSearch: /path of the juggernaut/i,
  subname: "Path of the Juggernaut",
  source: ["TDCSR", 165],
  abilitySave: 1,
  features: {
    subclassfeature3: {
      name: "Thunderous Blows",
      source: ["TDCSR", 165],
      minlevel: 3,
      description: desc([
        "When I hit a creature with a melee attack while raging, I can push them in any direction",
        "Huge or larger creatures make a Str save or pushed; DC 8 + Str mod + prof bonus",
      ]),
      additional: levels.map(function (n) {
        return n < 2 ? "" : n < 10 ? "Up to 5ft push" : "Up to 10ft push";
      }),
      calcChanges: {
        atkAdd: [
          function (fields, v) {
            if (v.isMeleeWeapon) {
              fields.Description +=
                (fields.Description ? "; " : "") +
                (classes.known.barbarian.level < 2
                  ? ""
                  : classes.known.barbarian.level < 10
                  ? "push creature up to 5 ft away"
                  : "push creature up to 10 ft away");
            }
          },
          "While raging, my melee attacks push creatures up to 5ft away in any direction on a hit. At 10th level I can push a creature up to 10 ft away in any direction. A Huge or larger creature must make a Strength save in order to not be pushed.",
        ],
      },
    },
    "subclassfeature3.1": {
      name: "Spirit of the Mountain",
      source: ["TDCSR", 166],
      minlevel: 3,
      description: desc([
        "While raging I cannot be knocked prone nor moved along the ground against my will",
      ]),
      savetxt: { immune: ["prone/being moved on ground in rage"] },
    },
    subclassfeature6: {
      name: "Demolishing Might",
      source: ["TDCSR", 166],
      minlevel: 6,
      description: desc([
        "My melee attacks deal extra damage to constructs; double damage to objects/structures",
      ]),
      additional: "1d8 extra to constructs",
      calcChanges: {
        atkAdd: [
          function (fields, v) {
            if (
              classes.known.barbarian &&
              classes.known.barbarian.level > 5 &&
              v.isMeleeWeapon
            ) {
              fields.Description +=
                (fields.Description ? "; " : "") +
                "1d8 damage to constructs; double damage to objects/structures";
            }
          },
          "My melee attacks deal an additional 1d8 damage to constructs. My melee weapon attacks also deal double damage to objects and structures.",
        ],
      },
    },
    "subclassfeature6.1": {
      name: "Resolute Stance",
      source: ["TDCSR", 166],
      minlevel: 6,
      description: desc([
        "At the start of my turn I can take up a defensive stance; ends at start of my next turn",
        "If I do, I can't be grappled; attacks vs have disadv.; attacks I make have disadv.",
      ]),
      additional: "no action required",
    },
    subclassfeature10: {
      name: "Hurricane Strike",
      source: ["TDCSR", 166],
      minlevel: 10,
      description: desc([
        "As a reaction, after pushing a creature at least 5 ft, I can leap to a space next to them",
        "The space must be unoccupied; costs no movement; doesn't provoke opportunity attacks",
        "If I do, the creature makes a Str save or is knocked prone; DC 8 + Str mod + prof bonus",
        "If I push a creature within 5 ft an ally, they can make a melee attack as a reaction",
      ]),
      action: [["reaction"]],
    },
    subclassfeature14: {
      name: "Unstoppable",
      source: ["TDCSR", 166],
      minlevel: 14,
      description: desc([
        "While raging, my speed cannot be reduced and I can't be frightened/paralyzed/stunned",
        "If I am under one of the above conditions, I can still rage and such effects are suspended",
      ]),
      savetxt: { immune: ["frightened/paralyzed/stunned"] },
    },
  },
});

AddSubClass("bard", "college of tragedy", {
  regExpSearch:
    /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*tragedy).*$/i,
  subname: "College of Tragedy",
  source: ["TDCSR", 167],
  features: {
    subclassfeature3: {
      name: "Poetry in Misery",
      source: ["TDCSR", 167],
      minlevel: 3,
      description: desc([
        "As a reaction when I/ally within 30 ft roll a 1 on a save/ability/attack, gain inspiration",
      ]),
      action: ["reaction", " (1 rolled on save/ability/attack)"],
      additional: "regain 1 Bardic Inspiration",
    },
    "subclassfeature3.1": {
      name: "Sorrowful Fate",
      source: ["TDCSR", 167],
      minlevel: 3,
      recovery: "short rest",
      usages: 1,
      description: desc([
        "When I or an ally forces a creature to make a save, I can change it to a Charisma save",
        "I expend a Bardic Inspiration die; on a failure, I roll the expended die",
        "They take psychic damage equal to the roll and are plagued with regret for 1 min",
        "They are compelled to utter dark, poetic final words if reduced to 0 HP during this time",
      ]),
    },
    subclassfeature6: {
      name: "Tale of Hubris",
      source: ["TDCSR", 167],
      minlevel: 6,
      action: ["reaction", " (critical hit suffered)"],
      description: desc([
        "I can use a reaction when a creature gets a critical hit on I or an ally within 60 ft",
        "I expend a Bardic Inspiration; attacker suffers weapon critical hits more often",
        "This effect lasts for 1 min or until target suffers a critical hit",
      ]),
      additional: levels.map(function (n) {
        return (
          (n < 6 ? "" : n < 14 ? "18-20" : "17-20") + " critical hit range"
        );
      }),
    },
    "subclassfeature6.1": {
      name: "Impending Misfortune",
      source: ["TDCSR", 167],
      minlevel: 6,
      recovery: "short rest",
      usages: 1,
      description: desc([
        "When I make an attack/save, I can get a +10 bonus; next attack/save gets a -10 penalty",
        "If not used, the penalty disappears after a rest or I am reduced to 0 HP",
      ]),
    },
    subclassfeature14: {
      name: "Nimbus of Pathos",
      source: ["TDCSR", 168],
      minlevel: 14,
      recovery: "short rest",
      usages: 1,
      action: ["action", ""],
      description: desc([
        "As an action, I can touch a creature and grant it effects for 1 min:",
        " \u2022 +4 bonus to AC and advantage on attack rolls and saving throws",
        " \u2022 Weapon and spell attacks deal an extra 1d10 radiant damage",
        " \u2022 Suffers critical hits on a roll of 18-20",
        "When this effect ends, it immediately drops to 0 HP and is dying",
      ]),
    },
  },
});

AddSubClass("cleric", "blood domain", {
  regExpSearch: /^(?=.*(cleric|priest|clergy|acolyte))(?=.*blood).*$/i,
  subname: "Blood Domain",
  source: ["TDCSR", 168],
  spellcastingExtra: [
    "false life",
    "sleep",
    "hold person",
    "ray of enfeeblement",
    "haste",
    "slow",
    "blight",
    "stoneskin",
    "dominate person",
    "hold monster",
  ],
  features: {
    subclassfeature1: {
      name: "Bonus Proficiency",
      source: ["TDCSR", 169],
      minlevel: 1,
      description: desc(["I gain proficiency with martial weapons"]),
      weapons: [false, true],
    },
    "subclassfeature1.1": {
      name: "Bloodletting Focus",
      source: ["TDCSR", 169],
      minlevel: 1,
      description: desc([
        "My damaging spells deal extra necrotic damage to creatures with blood",
        "The spell must be 1st level and up and have a duration of instantaneous",
      ]),
      additional: "2 + spell level extra damage",
    },
    subclassfeature2: {
      name: "Channel Divinity: Crimson Bond",
      source: ["TDCSR", 169],
      minlevel: 2,
      action: ["action", " (during bond)"],
      description: desc([
        "I can form a bond with a creature I can see or whose blood I have a sample of",
        "This bond lasts an hour and I must concentrate on it, as I would a spell",
        "While bonded, I can use an action to learn information about it or use its senses",
      ]),
      additional: "See Notes",
      toNotesPage: [
        {
          name: "Channel Divinity: Crimson Bond",
          source: ["TDCSR", 168],
          popupName: "Blood Domain Channel Divinity: Crimson Bond",
          note: desc([
            "While bonded, I can use an action to learn the following about my target:",
            " \u2022 Approximate distance from me",
            " \u2022 Current HP",
            " \u2022 Any conditions affecting it",
            "I can do so as long as the target is within 10 miles of me",
            "Also as an action while bonded, I can attempt to connect to the target's sense",
            "I take 2d6 necrotic damage and the target makes a Constitution save",
            "On a success, the bond is broken; on a failure I can choose to see or hear",
            "This lasts for Wis mod (min 1) minutes; I am blinded or deafened, respectively",
            "The bond ends when the connection ends",
            "A wave of unease passes over the target regardless of its save",
          ]),
        },
      ],
    },
    subclassfeature6: {
      name: "Sanguine Recall",
      source: ["TDCSR", 169],
      minlevel: 6,
      usages: 1,
      recovery: "long rest",
      description: desc([
        "As an action, I can recover a number of 5th-level or lower spell slots",
        "I take 1d8 necrotic damage per spell slot level recovered; cannot be reduced in any way",
      ]),
      additional: levels.map(function (n) {
        var lvls = Math.ceil(n / 2);
        return lvls + " level" + (lvls > 1 ? "s" : "") + " of spell slots";
      }),
    },
    "subclassfeature6.1": {
      name: "Channel Divinity: Blood Puppet",
      source: ["TDCSR", 169],
      minlevel: 6,
      action: ["action", ""],
      description: desc([
        "As an action, I can control a creature/corpse of a certain size within 60 ft that has blood",
      ]),
      additional: levels.map(function (n) {
        if (n < 6) return "";
        return "Up to " + (n < 14 ? "Large" : "Huge") + "; See Notes";
      }),
      toNotesPage: [
        {
          name: "Channel Divinity: Blood Puppet",
          source: ["TDCSR", 169],
          popupName: "Blood Domain Channel Divinity: Blood Puppet",
          note: desc([
            "As an action, I can target a creature or corpse within 60, if it has blood",
            "If I am below 17th level, it can be Large or smaller; otherwise Huge or smaller",
            "A conscious creatures make a Wis save or is charmed by me",
            "An unconscious creature automatically fails and isn't can move while I control it",
            "A corpse targeted by this effect gains a semblance of life that I control",
            "On each of its turns, while in control, I can command it (no action required)",
            "It can move up to half its speed and use its action to do one of the following:",
            " \u2022 Interact with an object",
            " \u2022 Make a single attack",
            " \u2022 Do nothing",
            "A living, conscious creature retains its turn order",
            "A corpse or unconscious creature takes its turn immediately after mine",
            "The target cannot move or take actions unless I command it to do so",
            "A corpse/unconscious creature retain their stats from life/consciousness",
            "A living target repeats the save at the end of its turns to end the effect",
            "This effect lasts for 1 min or until I lose concentration, like on a spell",
          ]),
        },
      ],
    },
    subclassfeature8: {
      name: "Divine Strike",
      source: ["TDCSR", 169],
      minlevel: 8,
      description: desc([
        "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
      ]),
      additional: levels.map(function (n) {
        if (n < 8) return "";
        return "+" + (n < 14 ? 1 : 2) + "d8 necrotic damage";
      }),
      calcChanges: {
        atkAdd: [
          function (fields, v) {
            if (
              classes.known.cleric &&
              classes.known.cleric.level > 7 &&
              !v.isSpell
            ) {
              fields.Description +=
                (fields.Description ? "; " : "") +
                "Once per turn +" +
                (classes.known.cleric.level < 14 ? 1 : 2) +
                "d8 necrotic damage";
            }
          },
          "Once per turn, I can have one of my weapon attacks that hit do extra necrotic damage.",
        ],
      },
    },
    subclassfeature17: {
      name: "Vascular Corruption Aura",
      source: ["TDCSR", 169],
      minlevel: 17,
      usages: 1,
      recovery: "long rest",
      action: ["action", ""],
      description: desc([
        "As an action, I can emit a 30 ft necrotic aura that causes nearby enemies' veins to burst",
        "Enemies entering the aura for the first time on a turn, or start a turn in it are damaged",
        "They take 3d6 necrotic damage from the aura if they have blood",
        "Additionally, the aura reduces any healing enemies with blood receive by half",
      ]),
    },
  },
});

AddSubClass("cleric", "moon domain", {
  regExpSearch: /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(moon|lunar)).*$/i,
  subname: "Moon Domain",
  source: ["TDCSR", 169],
  spellcastingExtra: [
    "faerie fire",
    "silent image",
    "invisibility",
    "moonbeam",
    "hypnotic pattern",
    "major image",
    "greater invisibility",
    "hallucinatory terrain",
    "dream",
    "passwall",
  ],
  features: {
    subclassfeature1: {
      name: "Clarity of Catha",
      source: ["TDCSR", 170],
      minlevel: 1,
      usages: "Prof. Bonus per ",
      usagescalc: "event.value = What('Proficiency Bonus'));",
      recovery: "long rest",
      description: desc([
        "As a reaction when a creature within 30 ft makes a Wis save, I can grant adv. on it",
      ]),
    },
    subclassfeature2: {
      name: "Channel Divinity: Blessing of the Full Moon",
      source: ["TDCSR", 170],
      minlevel: 2,
      action: ["action", ""],
      description: desc([
        "As an action, I can grant a creature within 30 ft one of the following blessings:",
        "Blessing of the Watchful Moon (lasts 1 hour)",
        " \u2022 Movement speed increases by 10 ft",
        " \u2022 Advantage on Wisdom (Perception) checks involving smell",
        " \u2022 Advantage on Wisdom (Survival) checks made to track a creature",
        "Blessing of the Blood-Drenched Moon (lasts 10 min)",
        " \u2022 Adv. on attacks vs. a target if an ally isn't incapacitated and within 5 ft of the target",
      ]),
    },
    subclassfeature6: {
      name: "Channel Divinity: Mind of Two Moons",
      source: ["TDCSR", 170],
      minlevel: 6,
      description: desc([
        "I can expend a use of my Channel Divinity to concentrate on a second spell",
        "I can only do so if both spells are on my list of Moon Domain spells",
        "I make Constitution saves to maintain concentration on them with disadvantage",
        "On a failure, I lose concentration on both spells",
      ]),
    },
    subclassfeature8: {
      name: "Empowered Cantrips",
      source: ["TDCSR", 171],
      minlevel: 8,
      description: desc([
        "I add my Wisdom modifier (minimum of 1) to the damage I deal with my cleric cantrips",
      ]),
      calcChanges: {
        atkCalc: [
          function (fields, v, output) {
            if (
              classes.known.cleric &&
              classes.known.cleric.level > 7 &&
              v.thisWeapon[3] &&
              v.thisWeapon[4].indexOf("cleric") !== -1 &&
              SpellsList[v.thisWeapon[3]].level === 0
            ) {
              output.extraDmg += Math.max(1, What("Wis Mod"));
            }
          },
          "My cleric cantrips get my Wisdom modifier (minimum of 1) added to their damage.",
        ],
        spellAdd: [
          function (spellKey, spellObj, spName) {
            if (
              spName.indexOf("cleric") == -1 ||
              spellObj.psionic ||
              spellObj.level !== 0
            )
              return;
            if (spellKey == "shillelagh") {
              spellObj.description = spellObj.description.replace(
                "1d8",
                "1d8+" + Math.max(1, What("Wis Mod"))
              );
              return true;
            }
            return genericSpellDmgEdit(
              spellKey,
              spellObj,
              "\\w+\\.?",
              "Wis",
              true
            );
          },
          "My cleric cantrips get my Wisdom modifier (minimum of 1) added to their damage.",
        ],
      },
    },
    subclassfeature17: {
      name: "Eclipse of Ill Omen",
      source: ["TDCSR", 171],
      minlevel: 17,
      usages: 1,
      recovery: "long rest",
      action: ["bonus action", ""],
      description: desc([
        "As a bonus action, I manifest a 60 ft radius of reddish, dim light around me",
        "Creatures in this area make saving throws with disadvantage",
        "I can choose any number of creatures to be unaffected by it when I create it",
        "It lasts while I concentrate, as if concentrating on a spell, for up to 1 minute",
        "Concentrating on this feature counts as concentrating on a Moon Domain spell",
        "Once per turn, I can curse a creature after dealing radiant damage to them",
        "The creature must be in the area of dim light when damaged in order to be cursed",
        "A creature cursed in this way has its speed halved and can't regain HP",
        "The curse disappears when the dim light ends",
      ]),
    },
  },
});

AddSubClass("druid", "circle of the blighted", {
  regExpSearch: /^(?=.*(druid|shaman))(?=.*blight).*$/i,
  subname: "Circle of the Blighted",
  source: ["TDCSR", 171],
  features: {
    subclassfeature2: {
      name: "Defile Ground",
      source: ["TDCSR", 172],
      minlevel: 2,
      usages: 1,
      recovery: "short rest",
      description: desc([
        "As a bonus action, I can blight land/water centered on a point within 60 ft",
        "The area has a 10 ft radius, which increases to 20 ft at 10th level",
        "The blight lasts for 1 min and is considered difficult terrain for my enemies",
        "Creatures on it take extra damage the first time it's damaged each turn by an attack",
        "As a bonus action, I can move this area of blight up to 30 ft",
      ]),
      additional: levels.map(function (n) {
        return n < 2
          ? ""
          : n < 10
          ? "1d4 necrotic"
          : n < 14
          ? "1d6 necrotic"
          : "1d8 necrotic";
      }),
      action: [
        ["bonus action", " (create)"],
        ["bonus action", " (move up to 30 ft)"],
      ],
    },
    "subclassfeature2.1": {
      name: "Blighted Shape",
      source: ["TDCSR", 172],
      minlevel: 2,
      description: desc([
        "I gain proficiency with Intimidation and my Wild Shape forms gain a +2 bonus to AC", // Wild shape page does not support modifications
        "My Wild Shape forms also gain 60 ft darkvision or add 60 ft if it already has it", // Wild shape page does not support modifications
      ]),
      skills: ["Intimidation"],
    },
    subclassfeature6: {
      name: "Call of the Shadowseeds",
      source: ["TDCSR", 172],
      minlevel: 6,
      description: desc([
        "As a reaction when a creature is damaged on my Defiled Ground, I can summon an ally",
        "A blighted sapling is summoned if the damaged creature is not undead or a construct",
        "The sapling appears in an unoccupied space within 5 ft of the damaged creature",
        "When it appears, the sapling can attack any creature within 5 ft",
        "The sapling then acts on my initiative and obeys my verbal commands",
        "The sapling remains until its reduced to 0 HP, my next long rest, or I summon another",
      ]),
      action: ["reaction", "(creature damaged in Defiled Ground)"],
      usages: "Prof. Bonus per ",
      usagescalc: "event.value = What('Proficiency Bonus'));",
      recovery: "long rest",
      creaturesAdd: [["Blighted Sapling"]],
      creatureOptions: [
        {
          name: "Blighted Sapling",
          source: ["TDCSR", 172],
          size: [3],
          type: "Plant",
          alignment: "",
          ac: "10+Prof",
          hp: 5,
          hd: ["", ""],
          speed: "30 ft",
          scores: [8, 13, 12, 4, 8, 3],
          damage_vulnerabilities: "fire",
          damage_resistances: "necrotic, poison",
          condition_immunities: " blinded, deafened, poisoned",
          passivePerception: 9,
          languages: "understands the languages of its creator but can't speak",
          senses: "blindsight 60 ft. (blind beyond this radius)",
          challengeRating: "1",
          proficiencyBonus: 2,
          proficiencyBonusLinked: true,
          attacksAction: 1,
          attacks: [
            {
              name: "Claws",
              ability: 1,
              damage: [2, 4, "piercing"],
              range: "5 ft",
              description: "",
              modifiers: ["", "Prof"],
              abilitytodamage: false,
              useSpellMod: "druid",
            },
          ],
          features: [
            {
              name: "Creator",
              description:
                "The blighted sapling obeys the commands of its creator and has the same proficiency bonus. It takes its turn immediately after its creator, on the same initiative count. The blighted sapling has a challenge rating equal to my proficiency bonus.",
            },
          ],
          traits: [
            {
              name: "Blighted Resilience (Circle of the Blighted 10)",
              minlevel: 10,
              description:
                "The blighted sapling gains immunity to necrotic and poison damage and to the poisoned condition.",
            },
            {
              name: "Toxic Demise (Circle of the Blighted 10)",
              minlevel: 10,
              description:
                "The blighted sapling explodes when it is reduced to 0 HP. Each creature within 5 ft of the blighted sapling makes a Constitution save vs. my spell save DC or take necrotic damage based on the blighted sapling's challenge rating:" +
                "\n" +
                " \u2022 CR 1/4 or lower - 1d4 necrotic damage" +
                "\n" +
                " \u2022 CR 1/2 - 1d6 necrotic damage" +
                "\n" +
                " \u2022 CR 1 or higher - A number of d8s of necrotic damage equal to the creature's challenge rating" +
                "\n" +
                " \u2022 No CR - A number of d6s of necrotic damage equal to my proficiency bonus",
            },
            {
              name: "Multiattack (Circle of the Blighted 14)",
              minlevel: 14,
              description:
                "The blighted sapling makes two attacks with its claws.",
            },
          ],
          minlevelLinked: ["druid"],
          header: "Sapling",
          calcChanges: {
            hp: function (totalHD, HDobj, prefix) {
              if (!classes.known.druid) return;
              var drdLvl = classes.known.druid.level;
              var drdLvl2 = 2 * drdLvl;
              HDobj.alt.push(drdLvl2);
              HDobj.altStr.push(
                " = 0 as a base\n + two times its creator's druid level (" +
                  drdLvl2 +
                  ")"
              );
            },
            setAltHp: true,
          },
        },
      ],
    },
    subclassfeature10: {
      name: "Foul Conjuration",
      source: ["TDCSR", 172],
      minlevel: 10,
      description: desc([
        'Any beast, fey, or plant creatures I summon gain traits; See "Blighted Sapling"',
      ]),
      action: ["action", " (explode summoned creature)"],
    },
    subclassfeature14: {
      name: "Incarnation of Corruption",
      source: ["TDCSR", 173],
      minlevel: 14,
      description: desc([
        "I gain a +2 bonus to AC and resistance to necrotic damage",
        "As a bonus action while on Defiled Ground, I can gain proficiency bonus temp HP",
      ]),
      action: ["bonus action", " (in Defiled Ground)"],
      dmgres: ["Necrotic"],
      extraAC: {
        name: "Incarnation of Corruption",
        mod: 2,
        text: "I gain a +2 bonus to AC.",
      },
    },
  },
});

//Original transcription by Smashman, updated by u/Newbuu2, updated by NodHero
AddSubClass("monk", "way of the cobalt soul", {
  regExpSearch:
    /^(?=.*\bcobalt)(?=.*\b(soul|spirit))((?=.*(warrior|monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
  subname: "Way of the Cobalt Soul",
  source: [["TDCSR", 173]],
  features: {
    subclassfeature3: {
      name: "Extract Aspects",
      source: [["TDCSR", 173]],
      minlevel: 3,
      description: "",
      toNotesPage: [
        {
          name: "Extract Aspects",
          source: ["TDCSR", 173],
          popupName: "Extract Aspects",
          page3notes: true,
          note: [
            "When I hit a creature with a Flurry of Blows attack, I can analyze it",
            "As a reaction when an analyzed target within reach misses me, I can retaliate",
            "I make an unarmed strike against it; this benefit lasts until my next rest",
            "Additionally, when I analyze a creature I learn all of its:",
            " Damage vulnerabilities, damage resistances, damage immunities, and condition immunities",
          ],
        },
      ],
      action: ["reaction", "Unarmed Strike (on analyzed creature miss)"],
      additional: "See 3rd page",
    },
    subclassfeature6: {
      name: "Extort Truth",
      source: [["TDCSR", 174]],
      minlevel: 6,
      description: typeA4
        ? ""
        : desc([
            "If I hit a creature with an unarmed strike, I can spend 1 ki to compel it to tell the truth",
          ]),
      toNotesPage: [
        {
          name: "Extort Truth",
          additional: "1 ki",
          source: ["TDCSR", 174],
          popupName: "Extort Truth",
          page3notes: true,
          note: [
            "When I hit a creature with an unarmed strike, I can spend 1 ki to make it unable to lie",
            "I can choose for the unarmed strike to deal no damage, imposing the effect without injury",
            "The creature makes a Charisma save or it can't speak a deliberate lie",
            "All Charisma checks against the creature are made with advantage",
            "These effects last for 10 min and I know whether the creature saved or not",
            "The creature is aware of this effect and can avoid answering, instead of telling a lie",
          ],
        },
      ],
      additional: "1 ki; See 3rd page",
    },
    "subclassfeature6.1": {
      name: "Mystical Erudition",
      source: [["TDCSR", 174]],
      minlevel: 6,
      description: desc([
        "At 6th, 11th, and 17th level gain a language and skill/expertise; See 3rd page",
      ]),
      toNotesPage: [
        {
          name: "Mystical Erudition",
          source: ["TDCSR", 174],
          popupName: "Mystical Erudition",
          page3notes: true,
          note: [
            "At 6th, 11th, and 17th level gain a language and skill, or expertise if already proficient",
            "I can gain proficiency/expertise in Arcana, History, Investigation, Nature, or Religion",
          ],
        },
      ],
      languageProfs: [1],
      additional: levels.map(function (n) {
        if (n < 3) return "";
        var num = n < 11 ? 1 : n < 17 ? 2 : 3;
        return (
          num +
          " language" +
          (n < 11 ? "" : "s") +
          " \u0026 " +
          num +
          " skill" +
          (n < 11 ? "" : "s")
        );
      }),
      changeeval: function (level) {
        if (level[1] >= 11 && level[0] < 11) {
          processLanguages(
            true,
            "Monk (Way of the Cobalt Soul): Mystical Erudition 11",
            [1]
          );
        } else if (level[1] < 11 && level[0] >= 11) {
          processLanguages(
            false,
            "Monk (Way of the Cobalt Soul): Mystical Erudition 11",
            [1]
          );
        }

        if (level[1] >= 17 && level[0] < 17) {
          processLanguages(
            true,
            "Monk (Way of the Cobalt Soul): Mystical Erudition 17",
            [1]
          );
        } else if (level[1] < 17 && level[0] >= 17) {
          processLanguages(
            false,
            "Monk (Way of the Cobalt Soul): Mystical Erudition 17",
            [1]
          );
        }
      },
      extraname: "Mystical Erudition",
      extrachoices: [
        "Arcana Proficiency",
        "Arcana Expertise",
        "History Proficiency",
        "History Expertise",
        "Investigation Proficiency",
        "Investigation Expertise",
        "Nature Proficiency",
        "Nature Expertise",
        "Religion Proficiency",
        "Religion Expertise",
      ],
      extraTimes: levels.map(function (n) {
        return n < 11 ? 1 : n < 17 ? 2 : 3;
      }),
      "arcana proficiency": {
        name: "Arcana Proficiency",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return v.skillProfs.indexOf("Arcana") == -1;
        },
        skills: ["Arcana"],
      },
      "arcana expertise": {
        name: "Arcana Expertise",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return (
            classes.known.monk &&
            classes.known.monk.level >= 11 &&
            v.skillProfs.indexOf("Arcana") !== -1
          );
        },
        skills: [["Arcana", "only"]],
      },
      "history proficiency": {
        name: "History Proficiency",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return v.skillProfs.indexOf("History") == -1;
        },
        skills: ["History"],
      },
      "history expertise": {
        name: "History Expertise",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return (
            classes.known.monk &&
            classes.known.monk.level >= 11 &&
            v.skillProfs.indexOf("History") !== -1
          );
        },
        skills: [["History", "only"]],
      },
      "investigation proficiency": {
        name: "Investigation Proficiency",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return v.skillProfs.indexOf("Investigation") == -1;
        },
        skills: ["Investigation"],
      },
      "investigation expertise": {
        name: "Investigation Expertise",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return (
            classes.known.monk &&
            classes.known.monk.level >= 11 &&
            v.skillProfs.indexOf("Investigation") !== -1
          );
        },
        skills: [["Investigation", "only"]],
      },
      "nature proficiency": {
        name: "Nature Proficiency",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return v.skillProfs.indexOf("Nature") == -1;
        },
        skills: ["Nature"],
      },
      "nature expertise": {
        name: "Nature Expertise",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return (
            classes.known.monk &&
            classes.known.monk.level >= 11 &&
            v.skillProfs.indexOf("Nature") !== -1
          );
        },
        skills: [["Nature", "only"]],
      },
      "religion proficiency": {
        name: "Religion Proficiency",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return v.skillProfs.indexOf("Religion") == -1;
        },
        skills: ["Religion"],
      },
      "religion expertise": {
        name: "Religion Expertise",
        description: "",
        source: [["TDCSR", 174]],
        prereqeval: function (v) {
          return (
            classes.known.monk &&
            classes.known.monk.level >= 11 &&
            v.skillProfs.indexOf("Religion") !== -1
          );
        },
        skills: [["Religion", "only"]],
      },
    },
    subclassfeature11: {
      name: "Mind of Mercury",
      source: [["TDCSR", 174]],
      minlevel: 11,
      description: desc([
        "Once per turn, if I've used my reaction this round, I can spend 1 ki to take a reaction",
      ]),
      action: ["reaction", " (1 Ki; 1/turn)"],
      additional: "1 ki; once per turn",
    },
    subclassfeature17: {
      name: "Debilitating Barrage",
      source: [["TDCSR", 174]],
      minlevel: 17,
      description: desc([
        "When I hit a creature with an unarmed strike, I can use 3 ki to make it vulnerable",
      ]),
      toNotesPage: [
        {
          name: "Debilitating Barrage",
          additional: "1 ki",
          source: ["TDCSR", 174],
          popupName: "Debilitating Barrage",
          page3notes: true,
          note: [
            "When I hit a creature with an unarmed strike, I can use 3 ki to make it vulnerable",
            "It gains vulnerability to a damage type of my choice",
            "This lasts for 1 min or until the end of a turn in which it has taken damage of that type",
            "If the creature has resistance to the type, it loses it for 1 min instead",
            "If the creature has immunity to the type it's unaffected",
            "A creature can only be affected once every 24 hours",
          ],
        },
      ],
      additional: "3 ki; See 3rd page",
    },
  },
});

AddSubClass("paladin", "oath of the open seas", {
  regExpSearch:
    /^(((?=.*(sea|pirate|swashbuckler))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))|((?=.*(sea|pirate|swashbuckler))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
  subname: "Oath of the Open Seas",
  source: [["TDCSR", 174]],
  features: {
    subclassfeature3: {
      name: "Channel Divinity: Marine Layer",
      source: [["TDCSR", 175]],
      minlevel: 3,
      description: desc([
        "As an action, I can surround myself with a 20 ft radius of heavily obscuring fog",
        "It lasts for 10 minutes, spreads around corners, moves with me, and cannot be dispersed",
        "I and creatures within 5 ft of me treat it as lightly obscured; can dismiss (no action " +
          (typePF ? "required" : "") +
          ")",
      ]),
      action: ["action", ""],
      spellcastingExtra: [
        "create or destroy water",
        "expeditious retreat",
        "augury",
        "misty step",
        "call lightning",
        "freedom of the waves",
        "control water",
        "freedom of movement",
        "commune with nature",
        "freedom of the winds",
      ],
    },
    "subclassfeature3.1": {
      name: "Channel Divinity: Fury of the Tides",
      source: [["TDCSR", 175]],
      minlevel: 3,
      description: desc([
        "As a bonus action, I can empower my attacks to push creatures away from me for 1 min",
        "Once per turn, when I hit a creature with a weapon attack, I can push it 10 ft away",
        "If pushed into another creature or obstacle, they take Cha mod bludgeoning damage",
      ]),
      action: ["bonus action", ""],
    },
    subclassfeature7: {
      name: "Aura of Liberation",
      source: [["TDCSR", 176]],
      minlevel: 7,
      description: desc([
        "While not incapacitated, creatures of my choice within range and I gain benefits:",
        " \u2022 We can't be grappled/restrained; ignore movement/attack penalties while underwater",
        " \u2022 If already grappled/restrained use 5 ft of movement to escape nonmagical restraints",
      ]),
      additional: levels.map(function (n) {
        return n < 7 ? "" : n < 18 ? "10-foot aura" : "30-foot aura";
      }),
    },
    subclassfeature15: {
      name: "Stormy Waters",
      source: [["TDCSR", 176]],
      minlevel: 15,
      description: desc([
        "I can use my reaction to crash water on a creature that enters/exits my melee range",
        "It takes 1d12 bludgeoning damage and makes a Strength save or is knocked prone",
      ]),
      action: ["reaction", ""],
    },
    subclassfeature20: {
      name: "Mythic Swashbuckler",
      source: [["TDCSR", 176]],
      minlevel: 20,
      description: desc([
        "As an action, I channel the spirits of historic sea captains for 1 minute; See 3rd page",
      ]),
      toNotesPage: [
        {
          name: "Mythic Swashbuckler Benefits",
          popupName: "Oath of the Open Seas: Mythic Swashbuckler",
          page3notes: true,
          note: [
            " \u2022 Climbing costs no additional movement; I have advantage on Strength (Athletics) checks",
            " \u2022 My attacks have advantage against a creature within 5 ft if no one else within 5 ft of me",
            " \u2022 I can take the Dodge action as a bonus action",
            " \u2022 I have advantage on Dexterity checks and Dexterity saves against seen effects",
          ],
        },
      ],
      recovery: "long rest",
      usages: 1,
      action: ["action", ""],
    },
  },
});

var runechildGlyphOfAegisPreLvl6 = [
  "As a reaction when damaged, I can expend charged runes to reduce the damage I take",
  "I roll dice equal to the number of expended runes and reduce the damage by the total",
];
var runechildGlyphOfAegisPostLvl6 = [
  "As an action, I can touch a creature and expend up to 3 charged runes to protect it for 1 hr",
  "The next time it's damaged, it rolls dice equal to the number of runes expended",
  "The damage it takes is reduced by total rolled; only one instance per creature",
];

AddSubClass("sorcerer", "runechild", {
  regExpSearch: /runechild/i,
  subname: "Runechild",
  fullname: "Runechild",
  source: [["TDCSR", 176]],
  features: {
    subclassfeature1: {
      name: "Essence Runes",
      source: [["TDCSR", 177]],
      minlevel: 1,
      description: desc([
        "A number of essence runes appear on my body, which are invisible while inert",
        "If I spend sorcery points, an equal number of runes " +
          (typePF ? "become" : "are") +
          " charged at the end of my turn",
        "If I have 5 or more charged runes, I emit 5 ft of bright light and 5 ft of dim light",
        "Charged runes become inert after being spent or after a long rest",
      ]),
      additional: levels.map(function (n) {
        return n + " essence rune" + (n > 1 ? "s" : "");
      }),
      action: ["bonus action", "Charge Runes"],
    },
    "subclassfeature1.1": {
      name: "Runic Magic",
      source: [["TDCSR", 177]],
      minlevel: 1,
      description: desc([
        "I learn additional spells, which do not count towards the number of spell I can know",
        "Whenever I gain a sorcerer level, I can replace one of these with another of the same level",
        "It must be " +
          (typePF
            ? "an abjuration or transmutation"
            : "a transmutation/abjuration") +
          " spell on the sorcerer, wizard, or warlock spell list",
      ]),
      spellcastingBonus: [
        {
          name: "Runic Magic (1st-level)",
          class: ["sorcerer", "warlock", "wizard"],
          school: ["Abjur", "Trans"],
          level: [1, 1],
          firstCol: "RM",
          extraspells: ["longstrider", "protection from evil and good"],
          selection: ["longstrider", "protection from evil and good"],
          times: 2,
        },
        {
          name: "Runic Magic (2nd-level)",
          class: ["sorcerer", "warlock", "wizard"],
          school: ["Abjur", "Trans"],
          level: [2, 2],
          firstCol: "RM",
          extraspells: ["lesser restoration", "protection from poison"],
          selection: ["lesser restoration", "protection from poison"],
          times: levels.map(function (n) {
            return n < 3 ? 0 : 2;
          }),
        },
        {
          name: "Runic Magic (3rd-level)",
          class: ["sorcerer", "warlock", "wizard"],
          school: ["Abjur", "Trans"],
          level: [3, 3],
          firstCol: "RM",
          extraspells: ["glyph of warding", "magic circle"],
          selection: ["glyph of warding", "magic circle"],
          times: levels.map(function (n) {
            return n < 5 ? 0 : 2;
          }),
        },
        {
          name: "Runic Magic (4th-level)",
          class: ["sorcerer", "warlock", "wizard"],
          school: ["Abjur", "Trans"],
          level: [4, 4],
          firstCol: "RM",
          extraspells: ["death ward", "freedom of movement"],
          selection: ["death ward", "freedom of movement"],
          times: levels.map(function (n) {
            return n < 7 ? 0 : 2;
          }),
        },
        {
          name: "Runic Magic (5th-level)",
          class: ["sorcerer", "warlock", "wizard"],
          school: ["Abjur", "Trans"],
          level: [5, 5],
          firstCol: "RM",
          extraspells: ["greater restoration", "telekinesis"],
          selection: ["greater restoration", "telekinesis"],
          times: levels.map(function (n) {
            return n < 9 ? 0 : 2;
          }),
        },
      ],
    },
    "subclassfeature1.2": {
      name: "Glyph of Aegis",
      source: [["TDCSR", 177]],
      minlevel: 1,
      description: levels.map(function (n) {
        return desc(
          n < 6
            ? runechildGlyphOfAegisPreLvl6
            : runechildGlyphOfAegisPreLvl6.concat(runechildGlyphOfAegisPostLvl6)
        );
      }),
      additional: levels.map(function (n) {
        return n < 14 ? "d6" : "d8";
      }),
    },
    subclassfeature6: {
      name: "Sigilic Augmentation",
      source: [["TDCSR", 177]],
      minlevel: 6,
      description: desc([
        "As a reaction, I can spend a charged rune to gain adv. on a Str/Dex/Con check or save",
      ]),
      action: [
        ["action", "Grant Glyph of Aegis (max 3 charged runes)"],
        ["reaction", " (Str/Dex/Con check)"],
        ["reaction", " (Str/Dex/Con save)"],
      ],
      usages: 1,
      recovery: "long rest",
      additional: "Advantage on save",
    },
    "subclassfeature6.1": {
      name: "Manifest Inscriptions",
      source: [["TDCSR", 177]],
      minlevel: 6,
      description: desc([
        "As an action, I can expend one charged rune to reveal hidden/invisible arcane things",
        "Arcane traps/marks/runes/wards/sensors/glyphs within 60 ft are revealed for 1 min",
        "I have adv. on Arcana checks to discern their nature",
        "They glow dim light in 5 ft and I can read any revealed writing",
      ]),
      action: [["action", ""]],
    },
    subclassfeature14: {
      name: "Runic Torrent",
      source: [["TDCSR", 177]],
      minlevel: 14,
      description: desc([
        "When I cast a spell, I can expend 2 charged runes to make it deal force damage instead",
        "All targeted/in area of the spell make a Str save or knocked prone/pushed 15 ft away",
      ]),
      usages: 1,
      recovery: "short rest",
    },
    subclassfeature18: {
      name: "Arcane Exemplar",
      source: [["TDCSR", 177]],
      minlevel: 18,
      description: desc([
        "As a bonus action, I can expend a charged rune to assume my exemplar form:",
        " \u2022 I gain resistance to damage dealt by spells and a flying speed of 60 ft",
        " \u2022 Creatures have disadv. vs. my sorcerer spells",
        " \u2022 Whenever I cast a spell of 1st level or higher, I regain HP equal to its level",
        (typePF ? "This form" : "It") +
          " lasts until the end of my turn; I can expend another rune to extend its duration",
        "When this form ends, I am stunned until the end of my next turn",
      ]),
      action: ["bonus action", " (1 charged rune)"],
      usages: 1,
      recovery: "long rest",
    },
  },
});

AddSubClass("wizard", "blood magic", {
  regExpSearch: /^(?=.*wizard)(?=.*blood)(?=.*mag(i|ic|e)).*$|hemocraft/i,
  subname: "Blood Magic",
  source: [["TDCSR", 178]],
  features: {
    subclassfeature2: {
      name: "Blood Channeling",
      source: [["TDCSR", 178]],
      minlevel: 2,
      description: desc([
        "I can use my body as an arcane focus as long as my HP are are below my max HP",
        "When casting a wizard spell with a costly material component, I can forego it",
        "I take 1d10 necrotic damage per 50g of its cost (min 1d10), which cannot be reduced",
        "If it reduces me to 0 HP, the spell fails, but no spell slot is expended",
      ]),
    },
    "subclassfeature2.1": {
      name: "Sanguine Burst",
      source: [["TDCSR", 179]],
      minlevel: 2,
      description: desc([
        "When I cast a spell of 1st-level or higher, I can spend my vitality to empower it",
        "I take necrotic damage equal to the spell's level, which cannot be reduced",
        "I can reroll a number of damage dice up to my Intelligence mod (min 1)",
        "I must use the new rolls",
      ]),
    },
    subclassfeature6: {
      name: "Bond of Mutual Suffering",
      source: [["TDCSR", 179]],
      minlevel: 6,
      description: desc([
        "As a reaction when attacked, I can share my pain with the attacker",
        "The attacker takes damage equal to the damage I took",
        "I cannot use this against constructs or undead",
      ]),
      action: [["reaction", " (when attacked)"]],
      usages: levels.map(function (n) {
        return n < 14 ? 1 : 2;
      }),
      recovery: "short rest",
    },
    subclassfeature10: {
      name: "Glyph of Hemorrhaging",
      source: [["TDCSR", 179]],
      minlevel: 10,
      description: desc([
        "When I damage a creature with a spell, I can curse it for 1 minute",
        "While cursed, it takes an extra 1d6 necrotic damage when hit by an attack",
        "The creature makes a Con save at the end of each of its turns to end the curse",
      ]),
      usages: 1,
      recovery: "short rest",
    },
    subclassfeature14: {
      name: "Thicker than Water",
      source: [["TDCSR", 179]],
      minlevel: 14,
      description: desc([
        "Whenever I regain HP via magic, I regain extra HP equal to my proficiency bonus",
        "While concentrating on a spell, I am resistant to nonmagical " +
          (typePF ? "bludg/piercing/slashing" : "bludg/slash/pierc damage") +
          " damage",
      ]),
      additional: levels.map(function (n) {
        if (n < 14) return "";
        return (
          (n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6) +
          " extra HP regained"
        );
      }),
    },
  },
});

/*
 * Backgrounds
 */

BackgroundList["ashari"] = {
  regExpSearch: /^(?=.*pyrah)(?=.*ashari).*$/i,
  name: "Ashari, Pyrah",
  source: [["TDCSR", 180]],
  skills: ["Nature"],
  skillstxt: "Nature and choose one from Arcana or Survival",
  languageProfs: ["Ignan"],
  toolProfs: ["Herbalism Kit"],
  gold: 10,
  equipright: [
    ["Traveler's clothes", "", 4],
    ["A staff carved with symbols of my tribe", "", 4],
    ["Belt pouch (with coins)", "", 1],
    ["Herbalism Kit", "", 3],
  ],
  feature: "Elemental Harmony (Pyrah)",
  trait: [
    "I like to keep my hands busy, no matter where I am.",
    "I love to explore new places and meet new people",
    "I meditate at dawn each day—and I can't stand it when my routine is interrupted.",
    "I like noticing patterns in the world around me, whether or not they mean anything.",
    "I don't let anything—or anyone—stand in the way of my mission.",
    "I'm a plain talker, even with people who outrank me.",
    "I've always got some of my native element with me in some form. (This might be modeling clay, pure water, special burning incense, or a bottled cloud.)",
    "I talk with everyone like I've known them all my life. Because most people I know, I have known all my life!",
  ],
  ideal: [
    [
      "Destiny",
      "Destiny: I believe that everyone has a role to play. Now I just have to find mine. (Neutral)",
    ],
    [
      "Community",
      "Community: It's important to surround yourself with people you can count on, and who will support you. (Good)",
    ],
    [
      "Knowledge",
      "Knowledge: I want to learn everything I can about the Elemental Planes—and maybe even visit them myself. (Neutral)",
    ],
    [
      "Freedom",
      "Freedom: I don't care what anyone says. Even if it causes problems, the elements must be free. And so should I. (Chaotic)",
    ],
    [
      "Structure",
      "Structure: The elements are in harmony when they are free to act as they will, within the safe boundaries set by the Ashari. People are much the same. (Lawful)",
    ],
    [
      "Virtuous Cycle",
      "Virtuous Cycle: If I see someone who needs help, I feel compelled to assist them. Surely they'll return the favor someday! (Good)",
    ],
  ],
  bond: [
    "I have a cousin in another Ashari tribe whom I've never met, but someday I want to visit my extended family",
    "The leader of my tribe thinks I could be their successor, but I worry that I don't have enough experience to lead my people.",
    "A mysterious person killed a member of my family. I've left home to discover who the killer was—and to seek vengeance.",
    "My older sibling set out on their Aramante a year ago, and I haven't seen them since.",
    "When I was a baby, a giant eagle brought me to Zephrah. I love my family, but I often wonder who my birth parents are.",
    "I trust my animal friends more than any humanoid ally.",
  ],
  flaw: [
    "Big cities are overwhelming. I get nervous when surrounded by people I don't know.",
    "I know all too well that elemental power is dangerous—but I like playing around with it anyway.",
    "I get surly if I go too long without being in contact with my native element.",
    "I think the mission of my people is a fool's errand. They should abandon isolation, let the elements be, and enjoy the pleasures of the world!",
    "I can't stand it when people say one thing and mean another! Just say what you mean!",
    "Ugh, I know it's not right, but I can't help but look down on people who can't manipulate the elements. It's not like it's hard!",
  ],
};

AddBackgroundVariant("ashari", "terrah", {
  regExpSearch: /^(?=.*terrah)(?=.*ashari).*$/i,
  name: "Ashari, Terrah",
  feature: "Elemental Harmony (Terrah)",
  languageProfs: ["Terran"],
  source: [["TDCSR", 180]],
});

AddBackgroundVariant("ashari", "vesrah", {
  regExpSearch: /^(?=.*vesrah)(?=.*ashari).*$/i,
  name: "Ashari, Vesrah",
  feature: "Elemental Harmony (Vesrah)",
  languageProfs: ["Aquan"],
  source: [["TDCSR", 180]],
});

AddBackgroundVariant("ashari", "zephrah", {
  regExpSearch: /^(?=.*zephrah)(?=.*ashari).*$/i,
  name: "Ashari, Zephrah",
  feature: "Elemental Harmony (Zephrah)",
  languageProfs: ["Auran"],
  source: [["TDCSR", 180]],
});

BackgroundFeatureList["elemental harmony (pyrah)"] = {
  description:
    "As an action, I can instantaneously create and control a burst of flame small enough to light a candle, a torch, or a small campfire. Alternatively, I snuff out a flame of the same size.",
  source: [["TDCSR", 180]],
  action: ["action", ""],
};

BackgroundFeatureList["elemental harmony (terrah)"] = {
  description:
    "As an action, I can instantaneously create a small rock no larger than a gold coin. The rock appears in my hand, then turns to dust after 1 minute.",
  source: [["TDCSR", 180]],
  action: ["action", ""],
};

BackgroundFeatureList["elemental harmony (vesrah)"] = {
  description:
    "As an action, I can instantaneously create enough hot or cold water to fill a small drinking vessel.",
  source: [["TDCSR", 180]],
  action: ["action", ""],
};

BackgroundFeatureList["elemental harmony (zephrah)"] = {
  description:
    "As an action, I can create an instantaneous puff of wind strong enough to blow papers off a desk or mess up someone's hair.",
  source: [["TDCSR", 180]],
  action: ["action", ""],
};

BackgroundList["clasp member"] = {
  regExpSearch: /^(?=.*clasp)(?=.*member).*$/i,
  name: "Clasp Member",
  source: [["TDCSR", 181]],
  skills: ["Deception"],
  skillstxt: "Deception and choose one from Sleight of Hand or Stealth",
  languageProfs: ["Thieves' Cant"],
  toolProfs: [["Disguise kit, forgery kit, or thieves' tools", 1]],
  gold: 10,
  equipleft: [["Set of tools with which I'm proficient", "", ""]],
  equipright: [
    ["Inconspicuous common clothes", "", 4],
    ["Belt pouch (with coins)", "", 1],
  ],
  feature: "A Favor in Turn",
  trait: [
    "What's life without risk? I'm always willing to take a risk if the reward seems worth it.",
    "I only show my emotions around people I really trust.",
    'I don\'t need friends; I need allies. When I do make "friends," I only consider what they can do for me.',
    "I look for simple solutions. The world's full of tough problems, but a well-placed knife is a one-size-fits-all answer.",
    "Money talks. I don't. We've got an efficient relationship.",
    "I used to have one rule—don't get involved in other people's problems. Why are things so complicated now?",
    "Crime is a game, and I play to win. I have no sympathy for players who don't get that.",
    "This organization has a lot of folks who cling to ugly, brutal practices. I'm not like that. I'm a professional, and professionals have standards.",
  ],
  ideal: [
    [
      "By Any Means",
      "By Any Means: I complete jobs. Collateral damage isn't my problem. (Chaotic)",
    ],
    [
      "Ambition",
      "Ambition: I will climb to the top of the ladder. Everything I do is a stepping-stone to a Spireling's position. (Neutral)",
    ],
    [
      "Decisiveness",
      "Decisiveness: It's important to make up your mind so you can act swiftly and without delay. (Neutral)",
    ],
    [
      "Honor",
      "Honor: There's room in the Clasp for both good and evil. Every day, I awake and choose to do what's right. (Good)",
    ],
    [
      "Family",
      "Family: The Clasp is family. Anything that's good for the family is good for me. (Lawful)",
    ],
    [
      "Self-Interest",
      "Self-Interest: There are too many bleeding hearts in the Clasp these days. Doing the right thing means doing the thing that makes my life better. (Evil)",
    ],
  ],
  bond: [
    "I'd do anything—anything—to protect my comrades.",
    "I'll always be grateful to the Spireling who took me in when I was an orphaned kid.",
    "I was inspired to join the Clasp by the stories my parents told of being saved from the Chroma Conclave's attack on Emon. I can look past the organization's flaws.",
    "I was nearly killed by the Myriad. If the Clasp is the enemy of those villains, then the Clasp is my friend.",
    "I've got family back in the old town who are counting on me for money. They don't know how I get it, but they don't need to know.",
    "I joined the Clasp to become rich, powerful, and beloved. That's all there is to it.",
  ],
  flaw: [
    "I'm hopeless at organizing my belongings, and I'm always losing things.",
    "I get bored whenever a plan is going too smoothly. A win is always more fun when it's by the skin of my teeth!",
    "I've seen Spirelings walk out among cheering crowds of thousands. Gods, I wish that were me. I need that to be me.",
    "I'm rubbish with money, and never seem to leave town with a full purse. Keeps me coming back to the life, I suppose.",
    "I can't work with shoddy, makeshift thieves' tools. I need everything involving my work to be perfect.",
    "Any slight against me, no matter how small, is cause for revenge.",
  ],
};

AddBackgroundVariant("clasp member", "myriad operative", {
  regExpSearch: /^(?=.*myriad)(?=.*operative).*$/i,
  name: "Myriad Operative",
  feature: "A Favor in Turn",
  source: [["TDCSR", 182]],
});

BackgroundFeatureList["a favor in turn"] = {
  description:
    "I can call in a favor from my organization when close enough to syndicate activity. This favor can take on any form, per DM approval. Eventually, the favor will be called in for repayment. Refusing to repay will result in my death. The DM determines the form of repayment, which should be proportionate to the favor bestowed - or that I'm paid for a service that exceeds the scope of repayment.",
  source: [["TDCSR", 180]],
};

BackgroundList["lyceum scholar"] = {
  regExpSearch: /^(?=.*lyceum)(?=.*scholar).*$/i,
  name: "Lyceum Scholar",
  source: [["TDCSR", 183]],
  skills: ["Deception"],
  skillstxt: "Choose two from Arcana, History, or Persuasion",
  languageProfs: [2],
  toolProfs: [["Disguise kit, forgery kit, or thieves' tools", 1]],
  gold: 10,
  equipleft: [
    ["Small pouch, with:", "", 1],
    ["Small knife", "", 0.25],
    ["Quill", "", ""],
    ["Ink", "", ""],
    ["Folded parchment", "", ""],
    ["Penknife", "", ""],
  ],
  equipright: [
    ["Fine clothes", "", 6],
    ["Student uniform", "", 3],
    ["Belt pouch (with coins)", "", 1],
  ],
  feature: "Academic Requisition",
  trait: [
    "I can't believe I'm here! At the Alabaster Lyceum. Oh, gods, I've dreamed of this my whole life, and now I'm here!",
    "I can't believe I squandered all the opportunities I had at school. I was supposed to be learning good stuff, but I wasted it all daydreaming about fighting monsters.",
    "Every night at school, I'd knock back a couple of meads and read with my pals! Just a bunch of nerds having fun, and I loved it.",
    "Everyone at school was such a stick in the mud. Dressing the same, listening to the same bards...ugh, it's sad. Just be yourself.",
    "I'm happiest when I've got my little party with me. At school, it was like we were a squad of heroes, slaying projects like monsters.",
    "I'd really rather you didn't bother me. Can't you see I'm studying here?",
    "I don't care. I just don't care about it all. The dates I had to memorize, the formulae I learned... I just want to run away and live!",
    "I'm just... tired. All the time. Oh, adventuring, sure, that's fine, as long as I can find time to... nap... goodnight.",
  ],
  ideal: [
    [
      "Preparedness",
      "Preparedness: I can't go out into the world unless I know what I'm up against. Study first, act later. (Neutral)",
    ],
    [
      "Stardom",
      "Stardom: Having a team is good and all, but you can't win a game of ball without the star charger, and you know that's me. (Evil)",
    ],
    [
      "Individuality",
      "Individuality: The world keeps us down by trying to put us all into little boxes. I'm tired of living in my box, and I don't care what you think about it. (Chaotic)",
    ],
    [
      "Purpose",
      "Purpose: I study because there are things I need to know. I'll find my place in the world, and I'll make the world better. (Good)",
    ],
    [
      "Code of Conduct",
      "Code of Conduct: The student code is there to benefit all students, you know. It's the same for laws! (Lawful)",
    ],
    [
      "Recreation",
      "Recreation: All this studying crap wasn't worth anything if you weren't partying when you were done. Meet me down at the tavern, okay? (Chaotic)",
    ],
  ],
  bond: [
    "I came to the Lyceum with no one, but I fell in love with the city of Emon. I've finally found a place that feels like home!",
    "Most of my professors drove me to frustration, but there's one who was kind and wise. I know they'll always have my back.",
    "My family saved every copper piece to give me the opportunities I have now. I can't let them down.",
    "I came to the Lyceum with a childhood friend, but we've long been drifting apart.",
    "Discovery is the only thing that matters to me. The topic doesn't matter. Books keep me company on my loneliest days.",
    "The Lyceum is my life. I'd give up anything—everything—to protect it from harm.",
  ],
  flaw: [
    "The Lyceum taught me to never want to leave my room. The campus was so huge, and the crowds were so horrible.",
    "You think you're so great just because you've got muscles, and endurance, and...shut up! Read a book sometime!",
    "Huh? What? Sorry, I was thinking about a test I need to retake when I get back to school...",
    "I spent too much time studying. Now I don't have any friends.",
    "If you don't match my aesthetic, I'm not interested in you. We can work together, but we won't be friends. Got it?",
    "I'm always striving for perfection. I got top of my class, sure, but only with a 98 average. And that's. Not. Perfect.",
  ],
};

BackgroundFeatureList["academic requisition"] = {
  description:
    "Whenever I'm at a major academic institution, I can requisition any set of tools. These tools are magically marked and will sound an alarm if removed from the premises. I also receive a 25 percent discount for services such as spellcasting from members of the Alabaster Lyceum or related institutions.",
  source: [["TDCSR", 184]],
};

BackgroundList["reformed cultist"] = {
  regExpSearch: /^(?=.*reformed)(?=.*cultist).*$/i,
  name: "Reformed Cultist",
  source: [["TDCSR", 185]],
  skills: ["Deception", "Religion"],
  languageProfs: [1],
  gold: 15,
  equipright: [
    ["Previous cult vestaments", "", 4],
    ["Previous cult holy symbol", "", 1],
    ["Common clothes", "", 3][("Belt pouch (with coins)", "", 1)],
  ],
  feature: "Fell Teachings",
  trait: [
    "I need a dagger close at hand at all times. Just in case they find me.",
    "I can't believe I'm out here fighting monsters. After everything I've been through, why can't I find a normal life?",
    "I need a stiff drink before I do anything stressful these days. I know it's a problem. Just…let me have this.",
    "Murder is okay when it's for a good cause! I didn't tear my past out by the roots so I could let evil people cause more harm.",
    "My past is filled with stories like you wouldn't believe. Ones that'll really make your skin crawl. Do you want to hear...?",
    "Yeah, I'm crying. I do that. Get over yourself.",
    "I know you've told me your name twice already, but that's not good enough. How can I be sure you are who you say you are?",
    "My mind is always racing. I can't... I just need to... you have to give me a second—or else I can't... organize my thoughts.",
  ],
  ideal: [
    [
      "Life",
      "Life: I've spent too long shackled to an evil master. No matter what happened before, I deserve my freedom now. (Chaotic)",
    ],
    [
      "Redemption",
      "Redemption: People can change, but redemption must be something they choose for themselves. If they do, it is my duty to help them along that path. (Good)",
    ],
    [
      "Power",
      "Power: When I abandoned the cult, it wasn't out of some misguided sense of righteousness. That pathetic organization was merely a shackle on my potential. (Evil)",
    ],
    [
      "Vengeance",
      "Vengeance: The cult has poisoned my life. I will see all its followers suffer. (Any)",
    ],
    [
      "Hierarchy",
      "Hierarchy: The cult was vile, but its strength was in stability and organization. As long as good folk lack unity, evil will always triumph. (Lawful)",
    ],
    [
      "Reparations",
      "Reparations: As a cultist, I harmed people whose names I'll never know. I feel obligated to repay my debt by aiding others. (Good)",
    ],
  ],
  bond: [
    "My cousin escaped the cult with me. I lost track of them when we fled, but I know they're alive. I can feel it.",
    "I was saved from the cult by a priest of one of the Prime Deities. If not for that sign of faith, I would surely be lost.",
    "I was told by the person who saved me that a sage once said: \"Life needs things to live.\" I don't know what that means, but I've dedicated my existence to finding out.",
    "One of my cultist parents had a change of heart when I was a teenager, and we fled together in the dark of night. I didn't want to leave, but I understand now that their courage saved my life.",
    "I was bested by a warrior when I fumbled a cult-ordered assassination. I don't know why that person took pity on me, but they gave me purpose when I was lost.",
    "Now that I've saved myself, the only person important to me is my former cult leader—because I've sworn that they'll die by my hand.",
  ],
  flaw: [
    "I'm haunted by what I saw in those ritual chambers. Every time I see blood, I... oh, gods, I can't bear to even think about it.",
    "I ran from the cult long ago. But deep down, there's a part of me that still thinks they were right about certain things.",
    "I can't help but feel a rush whenever I see a life snuffed out before me. Just one more kill... just one more.",
    "Organized religion terrifies me. Betrayer Gods or Prime Deities... it doesn't matter. The sight of the faithful freezes my blood cold.",
    "Oh, I always tell the truth. Always. I've never had to keep a secret from anyone, so of course I'll be open with you.",
    "I don't trust easily. If you grew up being lied to about every little thing? The fundamental nature of the world? You wouldn't, either.",
  ],
};

BackgroundFeatureList["fell teachings"] = {
  description:
    "I have advantage on Religion checks to know information about my previous cult's faith, including obscure secrets unknown to most worshippers. Additionally, I've learned a secret about the cult; the DM determines the nature of this secret.",
  source: [["TDCSR", 186]],
};

BackgroundList["whitestone rifle corps"] = {
  regExpSearch: /^(?=.*whitestone)(?=.*rifle)(?=.*corps).*$/i,
  name: "Whitestone Rifle Corps",
  source: [["TDCSR", 187]],
  skillstxt: "Choose two from Athletics, Perception, or Survival",
  languageProfs: [1],
  weaponProfs: {
    primary: [true, false, ["Firearms"]], //Backgrounds cannot add weapon proficiencies
  },
  gold: 10,
  equipright: [
    ["Musket or pistol", "", ""],
    ["Common clothes", "", 3][("Belt pouch (with coins)", "", 1)],
  ],
  feature: "Legacy of Secrecy",
  trait: [
    "I want to make a good impression at all times. That means keeping my clothes and gear clean and in top condition.",
    "I don't like being the center of attention. I'd rather let someone else do the talking while I watch their back.",
    "I feel safe only if I'm carrying my trusty rifle. And my dagger. And my concealed pistol. Oh, and of course my...",
    "I don't trust people with my secrets easily, so it feels like a big deal when someone else shares a secret with me.",
    "I like coming up with solutions to problems using my esoteric knowledge of natural philosophy.",
    "Everyone around me takes things so seriously. Sometimes I just want to let loose and have fun!",
    "Knowing things that other people don't know makes me feel special and important.",
    "I'm most at home in woods and mountains, where everything feels at once familiar, always growing and changing.",
  ],
  ideal: [
    [
      "Responsibility",
      "Responsibility: I have a duty to protect the people of Whitestone and to uphold the trust placed in me by the de Rolos. (Lawful)",
    ],
    [
      "Militarization",
      "Militarization: Everyone should have access to the most powerful weapons available, so they can defend themselves effectively. (Evil)",
    ],
    [
      "Cooperation",
      "Cooperation: Any problem can be solved as long as people are willing to work together. (Good)",
    ],
    [
      "Camaraderie",
      "Camaraderie: It's important to have people you can trust to help out in a fight—and to uncork a bottle together afterward. (Any)",
    ],
    [
      "Context",
      "Context: There are no universal rights or wrongs. Every choice depends on the details of the situation. (Chaotic)",
    ],
    [
      "Secrecy",
      "Secrecy: Information is valuable, but it can also be dangerous. I'll keep my mouth shut and gather as much intel as I can. (Neutral)",
    ],
  ],
  bond: [
    "I never knew what to do with myself until I joined the Rifle Corps. Now I have a purpose and comrades to give me direction.",
    "One of my fellow Rifle Corps soldiers saved my life—and then I saved theirs. That kind of bond lasts forever.",
    "Whitestone is the best city in all of Tal'Dorei. Nowhere else has been blessed by the Dawnfather and has a clock that tracks the movement of the stars!",
    "My quick thinking saved a noble from assassination, and she showed me great kindness in return. I daren't say it, but I'm more loyal to her than I am to the de Rolos.",
    "My weapon is my life. I clean it, repair it, and care for it—and it serves me loyally in return.",
    "The people of Whitestone cared for my family when we had nothing. I promise to repay their compassion with my service.",
  ],
  flaw: [
    "Who cares about keeping this gun safe? \"Don't let it fall into the wrong hands!\" Ha! It's only a matter of time before someone slips up and these weapons are everywhere.",
    "I think being part of the Rifle Corps is so cool. I love telling people about my position so I can impress them.",
    "My weapon was stolen. I built a new one, but I can't return home until I've tracked down the thief and recovered the original.",
    "I'm tired of protecting spoiled people who don't know how to protect themselves.",
    "I shoot first and ask questions later.",
    "The first and only time I killed someone, it changed my life. I still dream about it, and I'll never be the carefree person I was before.",
  ],
  extra: [
    "Select a Rifle Corps Relationship",
    "Retired honorably",
    "On an important mission",
    "Sent away to seek help",
    "Escaped with my weapon",
    "Separated from my company",
  ],
};

AddBackgroundVariant("whitestone rifle corps", "whitestone hunter", {
  regExpSearch: /^(?=.*whitestone)(?=.*hunter).*$/i,
  name: "Whitestone Hunter",
  feature: "Legacy of Secrecy",
  source: [["TDCSR", 189]],
  extra: [
    "Select a Rifle Corps Relationship",
    "Retired honorably",
    "On an important mission",
    "Sent away to seek help",
    "Escaped with my weapon",
    "Separated from my company",
    "Weapon was stolen",
  ],
});

BackgroundFeatureList["legacy of secrecy"] = {
  description:
    "I've been granted a firearm by my commander. This weapon is a symbol of my status, and when I display it, other folk around me treat me differently. I might be seen as a noble defender of the people, a selfish hoarder of power, or anything in between.",
  source: [["TDCSR", 187]],
};

/*
 * Boons
 *
 * No official support for boons, however this particular one can be packaged as a feat.
 * The prereeval can never be met, so the user will always receive a warning when selecting it. This should prevent people from selecting it when they shouldn't be.
 */

FeatsList["fortune's grace (boon)"] = {
  name: "Fortune's Grace (Boon)",
  source: [["TDCSR", 190]],
  descriptionFull:
    "Your fate-touched essence can cause events to shift in your favor. When you make an attack roll, an ability check, or a saving throw, you can choose to reroll the d20. You must reroll the die before the outcome of the initial roll is determined." +
    "\n   " +
    "Alternatively, when a creature you can see makes an attack against you or makes a saving throw against one of your spells or features, you can force that creature to reroll the attack roll or saving throw." +
    "\n   " +
    "If the roll that triggers the reroll is made with advantage or disadvantage, both d20s are rerolled. Once you use this feature, you can't use it again until you finish a long rest.",
  description:
    "Reroll the d20 for attacking, being attacked, an ability check, or a saving throw before the outcome is determined. If the roll has advantage or disadvantage, both d20s are rerolled. Once I use this feature, I can't use it again until I finish a long rest.",
  usages: 1,
  recovery: "long rest",
  prerequisite: "Being Fate-Touched (DM approval)",
  prereqeval: function (v) {
    return /fate-touched/i.test(What("Alignment"));
  },
};

/*
 * Feats
 */

FeatsList["cruel"] = {
  name: "Cruel",
  source: [["TDCSR", 190]],
  descriptionFull:
    "The challenges and struggles you've faced throughout your life have led you to delight in inflicting pain and anguish upon others. You gain a number of cruelty dice equal to your proficiency bonus. Your cruelty dice are d6s. You can roll only one cruelty die per turn, and a cruelty die is spent when you roll it." +
    "\n   " +
    "You can roll a cruelty die under any of the following circumstances, with the indicated result:" +
    "\n" +
    "\u2022 When you deal damage to a creature, spend one cruelty die to deal extra damage to the creature equal to the roll." +
    "\n" +
    "\u2022 When you score a critical hit, spend one cruelty die to gain temporary hit points equal to the roll." +
    "\n" +
    "\u2022 When you make a Charisma (Intimidation) check, spend one cruelty die and add the roll to your check." +
    "\n   " +
    "You regain all spent cruelty dice when you finish a long rest.",
  description:
    "I gain a number of cruelty dice equal to my proficiency bonus, which are d6s. Oncer per turn, I can spend " +
    (typePF ? "and roll" : "") +
    " one die for an effect when I damage a creature, score a critical hit, or make an Intimidation check. I regain all expended dice after a long rest. See See 3rd page.",
  usages: "Prof Bonus per ",
  usagescalc: "event.value = How('Proficiency Bonus');",
  recovery: "long rest",
  toNotesPage: [
    {
      name: "Cruel",
      source: [["TDCSR", 190]],
      popupName: "Cruel (Feat)",
      page3notes: true,
      note: [
        "I gain a number of cruelty dice equal to my proficiency bonus, which are d6s",
        "Once per turn I can spend and roll a cruelty die when I:",
        " \u2022 Deal damage to a creature, to deal extra damage equal to the roll",
        " \u2022 Score a critical hit, to gain temporary HP equal to the roll",
        " \u2022 Make an Intimidation check, to add the roll to the check",
        "I regain all spent cruelty dice after a long rest",
      ],
    },
  ],
};

var preparedCasters = [];

for (var classKey in ClassList) {
  var spellCasting = ClassList[classKey].spellcastingKnown;

  if (spellCasting !== undefined && spellCasting.prepared) {
    preparedCasters.push(classKey);
  }
}

FeatsList["flash recall"] = {
  name: "Flash Recall",
  source: [["TDCSR", 190]],
  descriptionFull:
    "You've developed the ability to instantly recall an unprepared spell in moments of sudden necessity. As a bonus action, you prepare a spell of 1st level or higher from your spellbook (if you're a wizard) or from your class spell list (if you're not a wizard). This spell must be of a level for which you have spell slots, and it replaces another spell of an equal or higher level that you had previously prepared." +
    "\n   " +
    "Once you use this feat to recall a spell, you can't do so again until you complete a short or long rest.",
  description:
    "As a bonus action, I can prepare a spell of 1st level or higher from my spellbook (wizard)/class spell list (non-wizard), replacing an already prepared spell. To do so, it must be of a level for which I have spell slots and of the replaced spell's level or lower.",
  usages: 1,
  recovery: "short rest",
  action: ["bonus action", ""],
  prerequisite: "Spellcasting feature from a class that prepares spells",
  prereqeval: function (v) {
    var isPreparedCastingClass = false;

    if (v.isSpellcaster) {
      for (var idx = 0; idx < preparedCasters.length; idx++) {
        if (classes.known[preparedCasters[idx]]) {
          isPreparedCastingClass = true;
          break;
        }
      }
    }

    return isPreparedCastingClass;
  },
};

FeatsList["mystic conflux"] = {
  name: "Mystic Conflux",
  source: [["TDCSR", 190]],
  descriptionFull:
    "You possess an intuitive understanding of the way magic ebbs and flows within enchanted items. Such items attune easily to you, and you are able to sound out their secrets. You gain the following benefits:" +
    "\n" +
    "\u2022 You can attune to up to four magic items at once." +
    "\n" +
    "\u2022 You can cast the identify spell without expending a spell slot or material components. You must finish a long rest before you can do so again.",
  description:
    "I can attune to up to four magic items. One per short rest, I can cast Identify without material components.",
  spellcastingBonus: {
    name: "Once per dawn",
    spells: ["identify"],
    selection: ["identify"],
    firstCol: "oncelr",
  },
  spellChanges: {
    identify: {
      components: "V,S",
      compMaterial: "",
      allowUpCasting: false,
      description:
        "1 magical item or magic-imbued crea/obj; learn properties, how to use, and spells affecting it",
      changes:
        "With the Mystic Conflux feat, I can cast Identify without a material component.",
    },
  },
};

FeatsList["remarkable recovery"] = {
  name: "Remarkable Recovery",
  source: [["TDCSR", 190]],
  descriptionFull:
    "Your body has the ability to recover quickly from terrible injuries, and is unusually receptive to healing magic. You gain the following benefits:" +
    "\n" +
    "\u2022 Increase your Constitution score by 1, to a maximum of 20." +
    "\n" +
    "\u2022 When you are successfully stabilized while dying, you regain hit points equal to your Constitution modifier (minimum of 1)." +
    "\n" +
    "\u2022 Whenever you regain hit points as a result of a spell, potion, or class feature (but not this feat), you regain additional hit points equal to your Constitution modifier (minimum of 1).",
  description:
    "When I am stabilized while dying, I regain HP equal to my Constitution modifier (min 1). When I regain HP from a spell, potion, or class feature, I regain extra HP equal to my Constitution modifier (min 1). [+1 Constitution]",
  scores: [0, 0, 1, 0, 0, 0],
};

FeatsList["spelldriver"] = {
  name: "Spelldriver",
  source: [["TDCSR", 190]],
  descriptionFull:
    "Through intense focus, training, and dedication, you've harnessed the techniques of rapid spellcasting. When you use your bonus action to cast a spell of 1st level or higher, you can also use your action to cast another spell of 1st level or higher. However, if you cast two or more spells in a single turn, only one of them can be 3rd level or higher.",
  description:
    "When I use my bonus action to cast a 1st level spell or higher, I can also use my action to cast another 1st level spell or higher. If I do cast two spells during a turn, only one of them can be 3rd level or higher.",
  prerequisite: "11th level, Spellcasting or Pact Magic feature",
  prereqeval: function (v) {
    return v.characterLevel >= 11 && v.isSpellcastingClass;
  },
};

FeatsList["thrown arms master"] = {
  name: "Thrown Arms Master",
  source: [["TDCSR", 191]],
  descriptionFull:
    "You've honed your ability to lob weaponry into the fray, including weapons not meant for ranged combat. You gain the following benefits:" +
    "\n" +
    "\u2022 Increase your Strength or Dexterity score by 1, to a maximum of 20." +
    "\n" +
    "\u2022 Simple and martial melee weapons without the thrown property have the thrown property for you. One-handed weapons have a normal range of 20 feet and a long range of 60 feet, while two-handed weapons have a normal range of 15 feet and a long range of 30 feet." +
    "\n" +
    "\u2022 Weapons that already have the thrown property increase their short range by 20 feet and their long range by 40 feet for you." +
    "\n" +
    "\u2022 When you miss with a thrown weapon attack using a light weapon, the weapon returns to your grasp like a boomerang at the end of your turn, unless something prevents it from returning. You can catch and stow as many weapons as you threw in this way.",
  description:
    "Simple and martial weapons without the thrown property gain it. Weapons that already have the thrown property have their range increased. When I miss with a thrown light weapon, it returns to my hand and the end of my turn. See third page.[+1 Str or Dex]",
  scorestxt: "+1 Strength or Dexterity",
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (
          v.isMeleeWeapon &&
          /simple|martial/i.test(v.theWea.type) &&
          !v.isNaturalWeapon
        ) {
          if (/^(?=.*thrown).*$/i.test(v.WeaponText)) {
            var rangeNumbers = fields.Range.match(/\d+([.,]\d+)?/g);
            var notNumbers = fields.Range.split(RegExp(rangeNumbers.join("|")));
            fields.Range = "";
            rangeNumbers.forEach(function (dR, idx) {
              fields.Range +=
                (notNumbers[idx] ? notNumbers[idx] : "") +
                (parseFloat(dR.toString().replace(",", ".")) +
                  (idx == 0 ? 20 : 40));
            });

            if (notNumbers.length > rangeNumbers.length) {
              fields.Range += notNumbers[notNumbers.length - 1];
            }
          } else {
            fields.Description += (fields.Description ? "; " : "") + "thrown";

            if (/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i.test(v.WeaponText)) {
              fields.Range = "Melee, 15/30 ft";
            } else {
              fields.Range = "Melee, 20/60 ft";
            }
          }
        }
      },
      "Simple and martial weapons without the thrown property gain it. One-handed weapons gain a normal range of 20 ft and a long range of 60 ft. Two-handed weapons gain a normal range of 15 ft and a long range of 15 ft. Weapons that alread have the thrown property increase their normal range by 20 ft and their long range by 40 ft.",
    ],
    atkCalc: [
      function (fields, v, output) {
        if (
          v.isMeleeWeapon &&
          /^(?=.*returning)(?=.*thrown).*$/i.test(v.WeaponText)
        ) {
          output.magic = v.thisWeapon[1] + 1;
        }
      },
      "",
    ],
  },
  toNotesPage: [
    {
      name: "Thrown Arms Master",
      source: [["TDCSR", 191]],
      popupName: "Thrown Arms Master (Feat)",
      page3notes: true,
      note: [
        "I gain the following benefits:",
        "\u2022 Increase my Strength or Dexterity score by 1, to a maximum of 20",
        "\u2022 Simple and martial weapons without the thrown property gain it",
        "   One handed weapons have a normal range of 20 ft and a long range of 60 ft",
        "   Two handed weapons have a normal range of 15 ft and a long range of 30 ft",
        "\u2022 Weapons already with the thrown property have their ranged increased",
        "   Short range increased by 20 ft; Long range range increased by 40 ft",
        "\u2022 When I miss with a light, thrown weapon it returns to my grasp at the end of my turn",
        "   The weapon may not return if something blocks its path back to me",
        "   I can catch and stow as many weapons thrown in this manner",
      ],
    },
  ],
};

FeatsList["vital sacrifice"] = {
  name: "Vital Sacrifice",
  source: [["TDCSR", 191]],
  descriptionFull:
    "You've learned secrets of hemocraft that grant you esoteric power at the price of your own life force. As a bonus action, you can choose to take 1d6 necrotic damage to gain a blood boon. Your blood boon lasts for 1 hour or until expended." +
    "\n   " +
    "You can expend this blood boon to gain one of the following benefits:" +
    "\n" +
    "\u2022 When you make an attack roll, you roll 1d6 and add it to the total." +
    "\n" +
    "\u2022 When you hit with an attack or spell, you deal an additional 2d6 necrotic damage." +
    "\n" +
    "\u2022 When you cause a creature to make a Strength, Dexterity, or Constitution saving throw, roll a d4 and reduce their save by the amount rolled." +
    "\n   " +
    "The damage you take to gain a blood boon can't be reduced in any way.",
  description:
    "As a bonus action, I can take 1d6 necrotic damage, which cannot be reduced, to gain a blood boon. This boon lasts for 1 hour or until it is expended. I can expend this blood boon to gain benefits. See third page.",
  action: ["bonus action", " (1d6 necrotic damage)"],
  toNotesPage: [
    {
      name: "Vital Sacrifice",
      source: [["TDCSR", 191]],
      popupName: "Vital Sacrifice (Feat)",
      page3notes: true,
      note: [
        "As a bonus action, I can take 1d6 necrotic damage for a blood boon",
        "This damage cannot be reduced in any way",
        "This boon lasts for 1 hour, or until it is expended",
        "I can expend the blood boon to gain one of the following benefits:",
        " \u2022 When I make an attack roll, add 1d6 to the total",
        " \u2022 When I hit with an attack or spell, it deals an extra 2d6 necrotic damage",
        " \u2022 When I force a creature to make a Str/Dex/Con save, reduce their save by 1d4",
      ],
    },
  ],
};

/*
 * Magic Items
 */

MagicItemsList["boots of haste"] = {
  name: "Boots of Haste",
  source: [["TDCSR", 194]],
  type: "wondrous item",
  rarity: "very rare",
  attunement: true,
  description:
    "As a bonus action while wearing these boots, I can click my heels together to cast haste on myself. I don't suffer from lethargy when the spells ends when cast in this manner. Once used, the boots can't be used again until the next dawn.",
  descriptionFull:
    "While you wear these boots, you can click your heels together to cast the haste spell on yourself as a bonus action. You don't suffer from lethargy when the spell ends when cast using these boots. Once this property is used, it can't be used again until next dawn.",
  action: ["bonus action", ""],
  usages: 1,
  recovery: "dawn",
  spellFirstColTitle: "Ch",
  spellcastingBonus: [
    {
      name: "Boots of Haste",
      spells: ["haste"],
      selection: ["haste"],
      firstCol: 1,
    },
  ],
  spellChanges: {
    haste: {
      changes:
        "I don't suffer from lethargy when the spell ends when casting haste using these boots.",
    },
  },
};

MagicItemsList["boots of the vigilant"] = {
  name: "Boots of the Vigilant",
  source: [["TDCSR", 194]],
  type: "wondrous item",
  rarity: "uncommon",
  description:
    "While I wear these boots, I can sense impending danger. After I roll initiative, I can choose to roll a d8 and add it to my initiative roll. Once this property is used, it can't be used again until the next dawn.",
  descriptionFull:
    "While you wear these boots, you can sense impending danger. After you roll initiative, you can choose to roll a d8 and add it to your initiative roll. Once this property is used, it can't be used again until the next dawn.",
  usages: 1,
  recovery: "dawn",
};

var cataclysmBoltsTable = [
  ">>d6\tEffect<<",
  "1-2\tThe bolt explodes in a blast of fire, dealing 3d8 fire damage to the target and each creature within 5 feet of it.",
  "3-4\tThe bolt freezes the air around the target into jagged ice. The target and each creature within 5 feet of it must succeed on a DC 17 Dexterity saving throw or take 1d10 cold damage and be restrained until the end of your next turn.",
  "5\tThe bolt releases a pulse of necrotic energy. The target takes 2d6 necrotic damage and must succeed on a DC 16 Strength saving throw or be stunned until the end of your next turn.",
  "6\tThe bolt shatters to unleash a burst of shrapnel. Make six additional ranged attacks against the target, each of which has a +7 attack bonus and deals 1d6 piercing damage on a hit.",
];

MagicItemsList["cataclysm bolts"] = {
  name: "Cataclysm Bolts",
  source: [["TDCSR", 194]],
  type: "weapon (bolts)",
  rarity: "very rare",
  description:
    "When I hit with an attack using a cataclysm bolt, the attack deals normal damage. Then roll a d6 on the Cataclym Bolt Effects table to determine its additional effect. See Notes page.",
  descriptionFull:
    "These steel crossbow bolts were first created by the Jaggenstrike Clan during the Scattered War, and the secret to crafting them remains well guarded by the Houses of Kraghammer. Cataclysm bolts are usually kept in sets of ten, though anyone who holds even one can feel it thrumming with magical power. When you hit with an attack using a cataclysm bolt, the attack deals normal damage. Then roll a d6 on the following table to determine its additional effect." +
    "\n" +
    toUni("Cataclysm Bolt Effects") +
    desc(cataclysmBoltsTable).replace(/>>(.*?)<</g, function (a, match) {
      return toUni(match);
    }),
  allowDuplicates: true,
  toNotesPage: [
    {
      name: "Cataclysm Bolts",
      note: desc(cataclysmBoltsTable).replace(
        />>(.*?)<</g,
        function (a, match) {
          return match.toUpperCase();
        }
      ),
    },
  ],
};

MagicItemsList["coat of the crest"] = {
  name: "Coat of the Crest",
  source: [["TDCSR", 194]],
  type: "wondrous item",
  rarity: "rare",
  attunement: true,
  description:
    "While wearing this coat, I gain a +1 bonus to AC, which can be worn over light armor. It has 3 charges, regaining 1d3 at dawn. As a reaction when hit by attack, I can expend a charge to gain resistance to a type of damage dealt by the attack. This affects the triggering attack and lasts until the start of my next turn.",
  descriptionFull:
    "This exquisite brocade coat is cut in a long, highcollared style popular among nobles of the Clovis Concord—a nation on the west coast of Wildemount whose stylish fashion is often mimicked in Tal'Dorei. Its shimmering lining hints at its magical properties. You gain a +1 bonus to AC while wearing this coat, which can be worn over light armor." +
    "\n   " +
    "Additionally, the coat has 3 charges and regains 1d3 expended charges daily at dawn. When you are the target of an attack while wearing this coat, you can spend 1 charge as a reaction to gain resistance to one type of damage from the triggering attack. This resistance is effective against the triggering attack and lasts until the start of your next turn.",
  usages: 3,
  recovery: "dawn",
  additional: "regains 1d3",
  action: ["reaction", " (when hit by an attack)"],
  extraAC: [
    {
      mod: 1,
      name: "Coat of the Crest",
      magic: true,
      text: "While wearing the coat, I gain a +1 bonus to AC.",
    },
  ],
};

MagicItemsList["corecut dagger"] = {
  name: "Corecut Dagger",
  source: [["TDCSR", 195]],
  type: "weapon (dagger)",
  rarity: "very rare",
  attunement: true,
  description:
    "This dagger adds +1 to hit and damage. When I hit with it, I can spend 1 HD to deal an extra 3d6 necrotic damage. It is cursed and once attuned to it, I cannot regain HP via magic unless I spend 1 HD. If I spell all my HD, I die.",
  descriptionFull:
    "This dark metal blade bends in a wicked, hooked curve. You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit with an attack using this weapon, you can spend 1 Hit Die to deal an extra 3d6 necrotic damage." +
    "\n   " +
    toUni("Curse.") +
    "This weapon is cursed, a fact that is revealed only when an identify spell is cast on the weapon or you attune to it. Attuning to the dagger curses you until you are targeted by the remove curse spell or similar magic; disposing of the dagger fails to end the curse. While cursed, whenever you receive magical healing, you must spend 1 Hit Die to regain any hit points. If you spend all your Hit Dice at any point, you die.",
  allowDuplicates: true,
  weaponsAdd: ["Corecut Dagger"],
  weaponOptions: {
    baseWeapon: "dagger",
    regExpSearch: /corecut dagger/i,
    name: "Corecut Dagger",
    source: [["TDCSR", 195]],
    modifiers: [1, 1],
  },
};

MagicItemsList["dagger of denial"] = {
  name: "Dagger of Denial",
  source: [["TDCSR", 195]],
  type: "weapon (dagger)",
  rarity: "rare",
  attunement: true,
  description:
    "This dagger adds +2 to hit and damage. As an action, I can insert it into a keyhole to seal it shut or unseal it. A keyhole sealed in this manner cannot be unlocked unless it's been unsealed. Sealing a keyhole unseals any previously sealed keyholes.",
  descriptionFull:
    "This silver stiletto blade bears intricate grooves that spiral from its tip to its ivory hilt and handle. You gain a +2 bonus to attack and damage rolls made with this magic weapon." +
    "\n   " +
    "As an action, you can place the point of the blade into any keyhole and seal it shut. A keyhole sealed in this way can't be unlocked until this dagger is placed into that keyhole once more (though a sealed door or container can still be broken, bypassing the lock). Sealing a keyhole unseals any keyholes previously sealed with this weapon.",
  allowDuplicates: true,
  weaponsAdd: ["Dagger of Denial"],
  weaponOptions: {
    baseWeapon: "dagger",
    regExpSearch: /dagger of denial/i,
    name: "Dagger of Denial",
    source: [["TDCSR", 195]],
    modifiers: [2, 2],
  },
  action: ["action", " (seal/unseal keyhole)"],
};

MagicItemsList["doublet of dramatic demise"] = {
  name: "Doublet of Dramatic Demise",
  source: [["TDCSR", 195]],
  type: "wondrous item",
  rarity: "common",
  description:
    "While wearing this jacket, I do not fall unconscious when I drop to 0 HP. Instead, I'm incapacitated and my speed becomes 0, but I can speak and communicate. I make death saving throws as normal, but if I roll a 1 on the d20, I swoon with a loud gasp and die instantly.",
  descriptionFull:
    "This striking satin jacket allows you to make the most of your dying moments. When you drop to 0 hit points while wearing this doublet, you do not fall unconscious. Instead, you are incapacitated and your speed becomes 0, but you can speak and communicate. You make death saving throws as normal, but if you roll a 1 on the d20, you swoon with a loud gasp and die instantly.",
};

MagicItemsList["echo stone"] = {
  name: "Echo Stone",
  source: [["TDCSR", 195]],
  type: "wondrous item",
  rarity: "uncommon",
  description:
    "As an action, I can squeeze this stone causing it to glow for 1 min. For this duration, it records all sound within 15 ft, after which it starts playing what was recorded. As an action, I can squeeze it silence it. As an action, I can squeeze it to play the recorded sounds.",
  descriptionFull:
    "This dull-blue river stone is soft to the touch, and makes remarkably little sound if dropped. When an echo stone is squeezed as an action, it glows faintly for 1 minute. The stone records all sound made within 15 feet of it while glowing, then repeats that recorded sound at an equal volume once every 5 minutes. This cycle of repetition continues until the stone is squeezed again as an action, which silences it. Squeezing the stone twice in quick succession as an action causes it to play the sounds it has most recently recorded, rather than recording new sounds.",
  action: [["action", " (start/stop/play)"]],
};

var grazTcharFullDesc = [
  "This blade appears to be a beautiful cruciform sword of shining silver, inlaid with sparkling rubies. You gain a +3 bonus to attack and damage rolls made with this magic weapon, which has the following properties.",
  ">>Corrosive Submission.<< When you hit a creature that has an Intelligence score of 4 or higher with an attack using this sword, the target takes an extra 3d6 acid damage and must succeed on a DC 17 Charisma saving throw or be charmed by you for 1 hour. If you attack the creature again while it is charmed in this way, the extra acid damage increases to 10d6 and the charmed condition ends. If the target succeeds on its saving throw or the charm ends for it, it can't be charmed again in this way for 24 hours.",
  ">>Hidden Nature.<< The acid damage dealt by this greatsword appears to be radiant damage to all who perceive it. A true seeing spell or similar magic reveals that the sword is actually a rusted, pitted blade dripping with acid.",
  ">>Sentience.<< Graz'tchar is a sentient neutral evil weapon with an Intelligence of 14, a Wisdom of 12, and a Charisma of 18. It has hearing and darkvision out to a range of 120 feet.",
  "The sword can speak, read, and understand Common, and can communicate with its wielder telepathically. Anyone who holds it hears the wise voice of a sorrowful king, beckoning the user to seize their destiny. A creature that succeeds on a DC 26 Wisdom (Insight) check while listening to the blade's voice hears a sliver of malice that suggests the truth: the voice is a corrupting trick of the Demon Prince of Indulgence.",
  ">>Personality.<< Graz'tchar slowly attempts to sway its wielder to sow chaos in Exandria, telling lies and spreading malign truths about great leaders, and claiming that the members of the Ta'Dorei Council are corrupt and must be overthrown. The voice of this blade is actually the Demon Prince of Indulgence, speaking from his Abyssal prison.",
  "If the sword's attuned wielder disobeys the urges of the weapon for an extended period of time, Graz'tchar can attempt to control the wielder, who must succeed on a DC 17 Charisma saving throw or become charmed by the sword for 24 hours. While the wielder is charmed in this way, the sword can compel them to take an action of the sword's choice once per hour, though the wielder believes this action is taken of their own free will. If the chosen action leads to the harm of someone the wielder considers a trusted friend or ally, the charmed condition immediately ends. On a successful saving throw or if the charmed condition ends for the wielder, they are immune to this property of the sword for 24 hours.",
];

MagicItemsList["graz'tchar, the decadent end"] = {
  name: "Graz'tchar, the Decadent End",
  source: [["TDCSR", 195]],
  type: "weapon (greatsword)",
  rarity: "legendary",
  attunement: true,
  description:
    "This sentient greatsword adds +3 to hit and damage. On a hit, it deals an extra 3d6 acid damage, which appears as radiant damage, and I can force a creature with an Int score of 4 or higher to make a DC 17 Cha save or become charmed by me for 1 hour. See Notes page.",
  descriptionFull: grazTcharFullDesc
    .join("\n   ")
    .replace(/>>(.*?)<</g, function (a, match) {
      return toUni(match);
    }),
  allowDuplicates: true,
  weaponsAdd: ["Graz'tchar, the Decadent End"],
  weaponOptions: {
    baseWeapon: "greatsword",
    regExpSearch: /graz'tchar, the decadent end/i,
    name: "Graz'tchar, the Decadent End",
    source: [["TDCSR", 195]],
    modifiers: [3, 3],
    description:
      "Heavy, two-handed; +1d6 acid damage; DC 17 Cha save or charmed",
  },
  toNotesPage: [
    {
      name: "Features",
      note: desc(grazTcharFullDesc)
        .replace(/>>(.*?)<</g, function (a, match) {
          return match.toUpperCase();
        })
        .replace(/your/g, "my")
        .replace(/you are /gi, "I am ")
        .replace(/(of|on|reduces|grants) you/gi, "$1 me")
        .replace(/you /gi, "I "),
    },
  ],
};

MagicItemsList["inescapable lash"] = {
  name: "Inescapable Lash",
  source: [["TDCSR", 196]],
  type: "weapon (whip)",
  rarity: "rare",
  attunement: true,
  description:
    "This whip adds +1 to hit and damage. As a bonus action after a hit, I can attempt to grapple the target. As an action, I can pull a grappled creature 20 ft towards me or restrain it until I let go of the whip. A restrained creature can make an Athletics or Acrobatics check to escape; DC 8 + prof bonus + Str mod",
  descriptionFull:
    "This braided cord is dull bronze in color, ends in a splayed set of three barbs, and gleams like metal under any light. You gain a +1 bonus to attack and damage rolls made with this magic weapon, which has a reach of 20 feet. When you hit a creature or object using this whip, you can attempt to grapple the target as a bonus action." +
    "\n   " +
    "While you have a creature grappled using this whip, you can use your action to either pull the creature up to 20 feet toward you, or cause the creature to be restrained until you let go of the whip. A creature restrained in this way can escape by making a successful Strength (Athletics) or Dexterity (Acrobatics) check as an action. The DC of this check equals 8 + your proficiency bonus + your Strength modifier.",
  allowDuplicates: true,
  weaponsAdd: ["Inescapable Lash"],
  weaponOptions: {
    baseWeapon: "whip",
    regExpSearch: /inescapable lash/i,
    name: "Inescapable Lash",
    source: [["TDCSR", 196]],
    modifiers: [1, 1],
    description: "Finesse, reach (20 ft)",
  },
  action: [
    ["bonus action", " (grapple on hit)"],
    ["action", " (pull/restrain)"],
  ],
};

MagicItemsList["magician's judge"] = {
  name: "Magician's Judge",
  source: [["TDCSR", 196]],
  type: "weapon (greatsword)",
  rarity: "rare",
  attunement: true,
  description:
    "When I hit a creature, I can cast dispel magic targetting it. Alternatively, I can use an action to cast dispel magic. If I need to make a check with my spellcasting ability, I gain a +3 bonus to the check. Once I cast dispel magic, I can't do so until the next dawn.",
  descriptionFull:
    "An executioner's blade from the Age of Arcanum, this magic greatsword is one of many similar weapons once used to execute magic-wielding criminals. Though most commonly found in the lands now known as Wildemount and Issylra, a few such blades have found their way to Tal'Dorei." +
    "\n   " +
    "If you hit a creature with an attack using this weapon, you can cast the dispel magic spell from the sword against the target as part of the attack. Alternatively, you can use an action to cast dispel magic from the sword against a target of your choice. If you need to make a check with your spellcasting ability modifier as part of casting the spell, you make this check with a +3 modifier or your own spellcasting ability modifier, whichever is higher." +
    "\n   " +
    "Once you cast dispel magic using this weapon, you can't do so again until the next dawn.",
  usages: 1,
  recovery: "dawn",
  limfeaname: "Magician's Judge (dispel magic)",
  allowDuplicates: true,
  weaponsAdd: ["Magician's Judge"],
  weaponOptions: {
    baseWeapon: "greatsword",
    regExpSearch: /magician's judge/i,
    name: "Magician's Judge",
    source: [["TDCSR", 196]],
  },
  action: [["action", " (dispel magic)"]],
  spellcastingBonus: {
    name: "Magician's Judge",
    spells: ["dispel magic"],
    selection: ["dispel magic"],
    firstCol: "oncelr",
  },
};

var mirrorOfInfTranspTable = [
  ">>Mirror Locations<<",
  ">>d8\tLocation\t\t\tPosessor<<",
  "1\tEmon\t\t\tSeeker Odessa Tal'Dorei",
  "2\tWhitestone\t\t--None; the mirror is in an empty dungeon",
  '3\tKymal\t\t\tSylker "The Millionaire" Uttolot',
  "4\tWestruun\t\t\tRealmseer Eskil Ryndarien",
  "5\tSyngorn\t\t\tOuestra, the Voice of Memory",
  "6\tThe Elemental Plane of Water\tKhedive Xundi, Lord of Silver Silt",
  "7\tThe Plane of Shadow\t\tA <<Remnant chosen>> (see page 251)",
  "8\tAn untraceable location\tThe Wonderworker",
];

MagicItemsList["mirror of infinite transpondence"] = {
  name: "Mirror of Infinite Transpondence",
  source: [["TDCSR", 196]],
  type: "wondrous item",
  rarity: "very rare",
  description:
    "As an action, I can activate the mirror to establish a visual link with its paired mirror for 10 min. The DM determines where the paired mirror is and who possesses it. Once the mirror has been activated three times from either end, it can't be activated again until the next dawn.",
  descriptionFull:
    "These silver hand mirrors always come in pairs. When activated as an action, a mirror establishes a visual link with its paired mirror for 10 minutes, with the two mirrors acting as opposite sides of the same open window. The mirrors create this connection even if both are on different planes." +
    "\n   " +
    "When a single mirror of infinite transpondence is found, the GM decides where its paired mirror is and who possesses it. A random possessor and location can be determined by rolling on the table below. Named bearers are described in chapter 2." +
    "\n   " +
    mirrorOfInfTranspTable
      .join("\n   ")
      .replace(/>>(.*?)<</g, function (a, match) {
        return toUni(match);
      })
      .replace(/<<(.*?)>>/g, function (a, match) {
        return toUni(match);
      })
      .replace(/--/g, function (a, match) {
        return "";
      }),
  action: [["action", " (activate)"]],
  usages: 3,
  recovery: "dawn",
  toNotesPage: [
    {
      name: "Mirror Locations",
      note: desc(mirrorOfInfTranspTable)
        .replace(/>>(.*?)<</g, function (a, match) {
          return match.toUpperCase();
        })
        .replace(/<<(.*?)>>/g, function (a, match) {
          return match;
        })
        .replace(/--/g, function (a, match) {
          return "\t";
        }),
    },
  ],
};

MagicItemsList["raven's slumber"] = {
  name: "Raven's Slumber",
  source: [["TDCSR", 197]],
  type: "wondrous item",
  rarity: "very rare",
  description:
    "I can use this pendant as an improvised melee or ranged weapon. On a hit, a large or smaller creature succeeds on a DC 10 Wis save or is trapped inside. A creature can willingly fail, if it so chooses. As a bonus action, I can release a held creature. Only one creature can be held at a time. See Notes.",
  descriptionFull:
    "This black crystal pendant is a magical gateway to a small pocket dimension. You can use the pendant as an improvised weapon to make a melee or ranged weapon attack against a Large or smaller creature. On a hit, the target must succeed on a DC 10 Wisdom saving throw or be trapped within the crystal. A creature that wants to be trapped can intentionally fail this saving throw." +
    "\n   " +
    "Only one creature at a time can be held in a raven's slumber. That creature is aware of the passage of time and can see the world outside of this talisman as if through a window. You can release a held creature to an unoccupied space within 5 feet of you as a bonus action." +
    "\n   " +
    "If a companion creature granted to you by a class feature, or a beast that you've tamed as a companion, is reduced to 0 hit points while within 100 feet of you, it is immediately drawn into the pendant and stabilized. If the pendant already holds a creature, this effect fails.",
  weaponsAdd: ["Raven's Slumber"],
  weaponOptions: {
    baseWeapon: "improvised weapon",
    regExpSearch: /raven's slumber/i,
    name: "Raven's Slumber",
    source: [["TDCSR", 197]],
    description:
      "Large or smaller target succeeds on a DC 10 Wis save or is trapped in the crystal",
  },
  action: ["bonus action", " (release)"],
  toNotesPage: [
    {
      name: "Features",
      note: desc([
        "I can use this pendant as a melee/ranged improvised weapon",
        "On a hit, a large or smaller create makes a DC 10 Wisdom save",
        "On a failure, it becomes trapped inside the pendant",
        "A creature can willingly choose to enter the pendant",
        "Only one creature can be held inside at a time",
        "While held, a creature is aware of the passage of time and can see outside",
        "As a bonus action, I can empty it into unoccupied space within 5 ft",
        "If a creature I've tamed is reduced to 0 HP within 100 ft, it is:",
        " \u2022 Immediately drawn into the pendant and stabilized",
        "If the pendant already holds a creature, this effect fails",
      ]),
    },
  ],
};

MagicItemsList["rod of mercurial form"] = {
  name: "Rod of Mercurial Form",
  source: [["TDCSR", 197]],
  type: "wondrous item",
  rarity: "uncommon",
  description:
    "As a bonus action, I can speak the name of any simple or martial weapon to transform it into an ordinary weapon of that type. If a ranged weapon is chosen, it creates its own ammunition, which disappears on a hit or miss.",
  descriptionFull:
    'This humble steel rod is engraved with tiny symbols representing different weapons, as well as the monogram "T.D." A creature holding this rod can speak the name of any simple or martial weapon aloud as a bonus action, causing the rod to transform into an ordinary weapon of that type. When in the form of a ranged weapon, this rod magically creates its own ammunition, which disappears after a ranged attack hits or misses.',
  action: ["bonus action", " (transform into weapon)"],
};

MagicItemsList["stormrider boots"] = {
  name: "Stormrider Boots",
  source: [["TDCSR", 197]],
  type: "wondrous item",
  rarity: "rare",
  description:
    "Once per dawn, as a part of moving, I can activate these boots to gain benefits: I gain a flying speed of 90 ft. Opportunity attacks vs. me are made with disadv. Once per turn per enemy, whenever I move within 5 ft of an enemy, it succeeds on a DC 15 Dex save or it takes 3d8 lightning damage.",
  descriptionFull:
    "These dark leather boots look to be of common make, but a subtle pattern of swirling storm clouds upon their soles suggests the potency of their enchantment. You can activate these boots as part of your movement, gaining the following benefits until the end of your turn:" +
    "\n" +
    "\u2022 You have a flying speed of 90 feet." +
    "\n" +
    "\u2022 Opportunity attacks against you are made with disadvantage." +
    "\n" +
    "\u2022 Whenever you move within 5 feet of a hostile creature, it must succeed on a DC 15 Dexterity saving throw or take 3d8 lightning damage. A creature can't be damaged in this way more than once per turn." +
    "\n   " +
    "Once this property is used, it can't be used again until the next dawn.",
  usages: 1,
  recovery: "dawn",
};

MagicItemsList["summer's dance"] = {
  name: "Summer's Dance",
  source: [["TDCSR", 197]],
  type: "weapon (scimitar)",
  rarity: "rare",
  attunement: true,
  allowDuplicates: true,
  description:
    "This scimitar adds +1 to hit and damage. Summer's Dance has 3 charges. I can expend 1 charge as a bonus action to cast misty step. Summer's Dance regains 1 charge at dawn. Summer's Dance regains 1 expended charge daily at dawn.",
  descriptionFull:
    "This beautiful golden blade appears to bend and flex like a reed with your movements. You gain a +1 bonus to attack and damage rolls made with this magic weapon." +
    "\n   " +
    "Additionally, the scimitar has 3 charges and regains 1 expended charge daily at dawn. While wielding this scimitar, you can expend 1 charge as a bonus action to cast the misty step spell.",
  weaponsAdd: ["Summer's Dance"],
  weaponOptions: {
    baseWeapon: "scimitar",
    regExpSearch: /summer's dance/i,
    name: "Summer's Dance",
    source: [["TDCSR", 197]],
    modifiers: [1, 1],
  },
  action: [["bouns action", " (misty step)"]],
  usages: 3,
  limfeaname: "Summer's Dance (misty step)",
  spellFirstColTitle: "Ch",
  spellcastingBonus: [
    {
      name: "3 charges",
      spells: ["misty step"],
      selection: ["misty step"],
      firstCol: 3,
    },
  ],
};

MagicItemsList["tinkertop boltblaster 1000"] = {
  name: "Tinkertop Boltblaster 1000",
  source: [["TDCSR", 197]],
  type: "weapon (hand crossbow)",
  rarity: "very rare",
  attunement: true,
  allowDuplicates: true,
  description:
    "This hand crossbow adds +1 to hit and damage. When I roll a 20 on an attack with this weapon, I can make another attack with it. When I roll a 1 on an attack with this weapon, I must succeed on a DC 14 Dexterity save or take 1d6 piercing damage.",
  descriptionFull:
    'This strange contraption of gears, wires, and lacquered wood has a handle with a metal grip and crank. Its stock bears a flamboyant maker\'s mark that reads: "Made in Hupperdook", a city in Wildemount. You gain a +1 bonus to attack and damage rolls made with this magic weapon.' +
    "\n   " +
    "When you roll a 20 on an attack roll made with this weapon, you can immediately make another attack with this weapon after resolving the critical hit. When you roll a 1 on an attack roll made with this weapon, you must succeed on a DC 14 Dexterity saving throw or take 1d6 piercing damage as some of its gears and wires spring loose.",
  weaponsAdd: ["Tinkertop Boltblaster 1000"],
  weaponOptions: {
    baseWeapon: "hand crossbow",
    regExpSearch: /tinkertop boltblaster 1000/i,
    name: "Tinkertop Boltblaster 1000",
    source: [["TDCSR", 197]],
    modifiers: [1, 1],
  },
};

var earthboardFullDesc =
  "An earthboard is a slab of granite about three inches thick, nine feet long, and two feet wide, with smooth, tapered ends. However, its mundane appearance belies its unique elemental power, which reduces its weight to 40 pounds while a creature is attuned to it. The Earth Ashari of Terrah can often be seen with these stone boards upon their backs as they trek into the crags of the Cliffkeep Mountains." +
  "\n   " +
  "While standing on an earthboard, you gain the following benefits:" +
  "\n" +
  "\u2022 Your speed increases to 60 feet as the board skims across solid ground (but not liquid surfaces)." +
  "\n" +
  "\u2022 If you ramp off a surface of solid earth, you can long jump up to 60 feet. When you end this jump, you can choose to slam into the ground, creating a shockwave. Each creature standing on the ground within 20 feet of you must succeed on a DC 14 Strength saving throw or fall prone." +
  "\n" +
  "\u2022 You have a burrowing speed of 20 feet that allows you to tunnel through earth or solid rock, leaving a 5-foot-diameter tunnel in your wake. As an action, you can increase this burrowing speed to 60 feet until the start of your next turn." +
  "\n" +
  "\u2022 The earthboard always moves with you until you decide to dismount it (no action required)." +
  "\n   " +
  "These benefits last until you end your turn not standing on the earthboard.";

MagicItemsList["earthboard"] = {
  name: "Earthboard",
  source: [["TDCSR", 198]],
  type: "wondrous item",
  rarity: "rare",
  attunement: true,
  weight: 40,
  description:
    "While standing on an earthboard, I gain various movement based benefits. These benefits last until I end my turn not standing on the earthboard. See Notes.",
  descriptionFull: earthboardFullDesc,
  toNotesPage: [
    {
      name: "Features",
      note:
        "\n   " +
        earthboardFullDesc
          .replace(/>>(.*?)<</g, function (a, match) {
            return match.toUpperCase();
          })
          .replace(/your/g, "my")
          .replace(/you /gi, "I "),
    },
  ],
};

var flameFriendFullDesc =
  "This wrought-iron lantern holds a small fire elemental spirit. To attune to this item, you must also succeed on a DC 10 Charisma check to bond with the spirit inside the lantern." +
  "\n   " +
  ">>Light and Flame.<< While attuned to the lantern, you can verbally ask the elemental to glow (no action required), causing the lantern to cast bright light in a radius of your choice up to 60 feet and dim light for the same distance beyond that. You can also cast the produce flame cantrip from the lantern at will. Wisdom is your spellcasting ability for this spell." +
  "\n   " +
  ">>Elemental Essence.<< The fire elemental spirit in the lantern can grant you a small fragment of its power. As an action, you gain one of the following benefits of your choice for 1 hour:" +
  "\n" +
  "\u2022 You have resistance to fire damage." +
  "\n" +
  "\u2022 Whenever a creature hits you with a melee attack, that creature takes fire damage equal to your proficiency bonus." +
  "\n" +
  "\u2022 You can cast the burning hands spell (spell save DC 15) from the lantern at 3rd level. Once you cast the spell, you can't do so again until the next time you use this property of the lantern." +
  "\n   " +
  "Once the elemental has shared its power with you in this way, it can't do so again until the next dawn." +
  "\n   " +
  ">>Willful Attunement.<< Your attunement to the lantern lasts until you choose to end it, or until you anger the elemental (by dousing the lantern in water, attacking another nonhostile elemental being, and so forth). You can attempt to attune to the lantern again and repeat the check to bond with the elemental during a short or long rest, but you make this check with disadvantage until you have made amends to the spirit, as the GM determines.";

MagicItemsList["flamefriend lantern"] = {
  name: "Flamefriend Lantern",
  source: [["TDCSR", 198]],
  type: "wondrous item",
  rarity: "rare",
  attunement: true,
  description:
    "In order to attune to the lantern, I must succeed on a DC 10 Cha check. I can verbally ask the lantern to cast bright light up to 60 ft in radius and an equal amount if dim light beyond that. I can cast produce flame from the lantern. As an action, I can borrow power from the lantern, gaining benefits for 1 hr. See Notes.",
  descriptionFull: flameFriendFullDesc.replace(
    />>(.*?)<</g,
    function (a, match) {
      return toUni(match);
    }
  ),
  usages: 1,
  action: ["action", " (borrow power)"],
  recovery: "dawn",
  toNotesPage: [
    {
      name: "Features",
      note:
        "\n   " +
        flameFriendFullDesc
          .replace(/>>(.*?)<</g, function (a, match) {
            return match.toUpperCase();
          })
          .replace(/your/g, "my")
          .replace(/you /gi, "I "),
    },
  ],
  spellFirstColTitle: "Us",
  spellcastingAbility: 5,
  spellcastingBonus: [
    {
      name: "At will",
      spells: ["produce flame"],
      selection: ["produce flame"],
      firstCol: "atwill",
    },
    {
      name: "1 use",
      spells: ["burning hands"],
      selection: ["burning hands"],
      firstCol: "checkbox",
    },
  ],
  spellChanges: {
    "burning hands": {
      changes: "I cast this spell at 3rd level with a DC of 15.",
      description:
        "All in area 5d6 Fire dmg; save halves; unattended flammable objects ignite; DC 15",
    },
  },
};

MagicItemsList["oceanic weapon"] = {
  name: "Oceanic Weapon",
  source: [["TDCSR", 199]],
  type: "weapon (any range or thrown)",
  rarity: "rare",
  attunement: true,
  allowDuplicates: true,
  usages: 1,
  action: ["action", " (water breathing)"],
  recovery: "dawn",
  description:
    "This weapon adds +1 to hit and damage. I ignore normal penalties on ranged weapon attacks while using it underwater. While holding it, I gain a swimming speed of 30 ft. Once per dawn, I can cast water breathing.",
  descriptionFull:
    "This elegant weapon is adorned with engravings depicting leaping dolphins and drifting jellyfish. You gain a +1 bonus to attack and damage rolls made with this magic weapon, and you ignore the normal penalties on ranged weapon attacks while using this weapon underwater. While holding the weapon in front of you with both hands, you have a swimming speed of 30 feet." +
    "\n   " +
    "Additionally, while you hold the weapon, you can use an action to cast the water breathing spell. Once this property is used, it can't be used again until the next dawn.",
  chooseGear: {
    type: "weapon",
    prefixOrSuffix: "brackets",
    itemName1stPage: ["suffix", "Oceanic"],
    descriptionChange: ["replace", "weapon"],
    excludeCheck: function (inObjKey, inObj) {
      return (
        !inObj.description || !/thrown/i.test(inObj.description) || !inObj.range
      );
    },
  },
  calcChanges: {
    atkAdd: [
      function (fields, v) {
        if (
          !v.theWea.isMagicWeapon &&
          /oceanic/i.test(v.WeaponTextName) &&
          (v.isRangedWeapon || /thrown/i.test(fields.Description))
        ) {
          v.theWea.isMagicWeapon = true;
          fields.Description = fields.Description.replace(
            /(, |; )?Counts as magical/i,
            ""
          );
        }
      },
      'If I include the word "Oceanic" in the name of a ranged or thrown weapon, it will be treated as a magical Oceanic weapon. It has +1 to hit and damage.',
    ],
    atkCalc: [
      function (fields, v, output) {
        if (
          /oceanic/i.test(v.WeaponTextName) &&
          (v.isRangedWeapon || /thrown/i.test(fields.Description))
        ) {
          output.magic = v.thisWeapon[1] + 1;
        }
      },
      "",
    ],
  },
  spellcastingBonus: {
    name: "Oceanic Weapon",
    spells: ["water breathing"],
    selection: ["water breathing"],
    firstCol: "oncelr",
  },
  speed: { swim: { spd: 30, enc: 20 } },
};

MagicItemsList["skysail"] = {
  name: "Skysail",
  source: [["TDCSR", 199]],
  type: "wondrous item",
  rarity: "rare",
  attunement: true,
  description:
    "While riding the skysail, I have a flying speed of 60 ft, but I must descend at least 10 ft per turn and can't gain altitude. Once per dawn, I can cast fly requiring no concentration and with a duration of 1 min. It can also be recharged with powerful elemental air magic.",
  descriptionFull:
    "These bat-like wings were first used by the Air Ashari to soar through the sky. They are constructed of either leather and bone, or cloth and wood, and are set onto a sturdy wooden pole that helps their user remain stable during flight." +
    "\n   " +
    "While these wings are open and you are riding the skysail, you can glide through the air. You have a flying speed of 60 feet, but you must descend at least 10 feet by the end of each of your turns and you can't gain altitude." +
    "\n   " +
    "Additionally, while in contact with the skysail, you can use an action to cast the fly spell on yourself, with a duration of 1 minute and requiring no concentration. The spell ends if you lose physical contact with the skysail. Once this property is used, it can't be used again until the next dawn, or unless the skysail is immersed in powerful magic of elemental air. (This includes magic such as that found at the top of the Summit Peaks near the rift of air in Zephrah, or on the Elemental Plane of Air)." +
    "\n   " +
    "When the skysail is not in use, its wings can be retracted, and its pole can be used as a quarterstaff.",
  usages: 1,
  recovery: "dawn",
  spellcastingBonus: {
    name: "1 charge",
    spells: ["fly"],
    selection: ["fly"],
    firstCol: 1,
  },
  spellChanges: {
    fly: {
      changes:
        "I can cast fly on myself, requiring no concentration and with a duration of 1 minute.",
      duration: "1 min",
      range: "Self",
      description: "I gain fly 60 ft speed",
    },
  },
};

MagicItemsList["agony"] = {
  name: "Agony",
  source: [["TDCSR", 202]],
  type: "weapon (flail)",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a creature of non-good alignment",
  prereqeval: function (v) {
    return !/good/i.test(What("Alignment"));
  },
  description: "",
  descriptionFull:
    "Utilized in countless tortures and slow executions, the hooked chains of this brutal weapon constantly show dried blood and rot. Legend says that Agony was wielded in the Calamity by the gnoll scion of a flesh-eating Demon Lord." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Agony is in a dormant state, you gain a +2 bonus to attack and damage rolls made with this magic weapon. Whenever you damage a creature with Agony, that creature is marked for 10 minutes or until you damage a different creature. When you hit a creature marked in this way with this weapon, the target takes an extra 1d6 piercing damage." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Agony reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The extra damage when you hit a marked creature increases to 1d8." +
    "\n" +
    "\u2022 A marked creature has disadvantage on Constitution checks and Constitution saving throws." +
    "\n" +
    "\u2022 When you reduce a creature to 0 hit points with an attack using Agony, you can immediately make an additional melee attack with this weapon as a bonus action." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Agony reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3." +
    "\n" +
    "\u2022 The extra damage when you hit a marked creature increases to 2d8." +
    "\n" +
    "\u2022 When you score a critical hit with this weapon, the target must succeed on a DC 17 Wisdom saving throw or become frightened of you for 1 minute. On a success, the target is immune to this effect for 24 hours.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Agony",
    description:
      "This flail adds +2 to hit and damage. When I damage a creature with Agony, it is marked for 10 min. A marked creature takes an extra 1d6 piercing damage when hit with Agony.",
    weaponsAdd: ["Dormant Agony"],
    weaponOptions: {
      baseWeapon: "flail",
      regExpSearch: /^(?=.*dormant)(?=.*agony).*$/i,
      name: "Dormant Agony",
      source: [["TDCSR", 202]],
      description: "+1d6 piercing damage on a marked creature",
      modifiers: [2, 2],
    },
  },
  awakened: {
    name: "Awakened Agony",
    description:
      "This flail adds +2 to hit and damage. When I damage a creature with Agony, it is marked for 10 min; it has disadv. on Con saves/throws and takes an extra 1d8 piercing damage when hit by Agony. If I reduce a creature to 0 HP with Agony, I can make a melee attack with it as a bonus action.",
    weaponsAdd: ["Awakened Agony"],
    weaponOptions: {
      baseWeapon: "flail",
      regExpSearch: /^(?=.*awakened)(?=.*agony).*$/i,
      name: "Awakened Agony",
      source: [["TDCSR", 202]],
      description: "+1d8 piercing damage on a marked creature",
      modifiers: [2, 2],
    },
    action: ["bonus action", " (melee attack)"],
  },
  exalted: {
    name: "Exalted Agony",
    description:
      "This flail adds +3 to hit/damage. When I damage a creature with Agony, it is marked for 10 min; it has disadv. on Con saves/throws and takes an extra 2d8 piercing damage when hit by Agony. If I reduce a creature to 0 HP with Agony, I can make a melee attack with it as a bonus action. See 3rd page notes.",
    weaponsAdd: ["Exalted Agony"],
    weaponOptions: {
      baseWeapon: "flail",
      regExpSearch: /^(?=.*exalted)(?=.*agony).*$/i,
      name: "Exalted Agony",
      source: [["TDCSR", 202]],
      description:
        "+2d8 piercing damage on a marked creature; DC 17 Wis save on critical hit, or frightened for 1 min",
      modifiers: [3, 3],
    },
    action: ["bonus action", " (melee attack)"],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When I score a critical hit with Agony, the target makes a DC 17 Wis save",
          "On a failure, the target becomes frightened of me for 1 min",
          "On a success, the target is immune to this effect for 24 hours",
        ],
      },
    ],
  },
};

MagicItemsList["armor of the valiant soul"] = {
  name: "Armor of the Valiant Soul",
  source: [["TDCSR", 202]],
  type: "armor (scale mail)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "This antique armor forged from jade and blackdragon scales was once worn by J'mon Sa Ord of Ank'Harel." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Armor of the Valiant Soul is in a dormant state, you gain a +1 bonus to AC while wearing it." +
    "\n   " +
    "You can also cast the command spell (save DC 14) while attuned to this armor. Once this property is used, it can't be used again until you finish a long rest." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Armor of the Valiant Soul reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The AC bonus of the armor increases to +2." +
    "\n" +
    "\u2022 You have resistance to acid damage while wearing this armor." +
    "\n" +
    "\u2022 You are immune to the frightened condition while wearing this armor." +
    "\n" +
    "\u2022 The spell save DC for the armor's command spell increases to 16, and the spell can target up to three creatures." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Armor of the Valiant Soul reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The AC bonus of the armor increases to +3." +
    "\n" +
    "\u2022 You are immune to acid damage while wearing this armor." +
    "\n" +
    "\u2022  All friendly creatures within 15 feet of you are immune to the frightened condition as long as you are conscious." +
    "\n" +
    "\u2022 The spell save DC of the armor's command spell increases to 18, and the spell can target up to five creatures.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Armor of the Valiant Soul",
    description:
      "While wearing this armor, I gain a +1 bonus to AC. Once per long rest, I can cast command (DC 14).",
    armorAdd: "Dormant Armor of the Valiant Soul",
    action: [["action", "Command (Armor of the Valiant Soul)"]],
    extraLimitedFeatures: [
      {
        name: "Command (Armor of the Valiant Soul)",
        usages: 1,
        recovery: "long rest",
      },
    ],
    fixedDC: 14,
    spellcastingBonus: {
      name: "Once per long rest",
      spells: ["command"],
      selection: ["command"],
      firstCol: "oncelr",
    },
    armorOptions: {
      regExpSearch: /dormant armor of the valiant soul/i,
      name: "Dormant Armor of the Valiant Soul",
      source: [["TDCSR", 202]],
      type: "medium",
      ac: 15,
      stealthdis: true,
      weight: 45,
    },
  },
  awakened: {
    name: "Awakened Armor of the Valiant Soul",
    description:
      "While wearing this armor, I gain a +2 bonus to AC. Once per long rest, I can cast command (DC 16), which can target up to 3 creatures. I cannot be frightened and have resistance to acid damage.",
    savetxt: { immune: ["frightened"] },
    dmgres: ["Acid"],
    action: [["action", "Command (Armor of the Valiant Soul)"]],
    extraLimitedFeatures: [
      {
        name: "Command (Armor of the Valiant Soul)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 16,
    spellcastingBonus: {
      name: "Once per long rest",
      spells: ["command"],
      selection: ["command"],
      firstCol: "oncelr",
    },
    spellChanges: {
      command: {
        description:
          "Up to 3 crea save or follow one word command, e.g. approach, drop, flee, halt",
        changes:
          "I can cast command by using Awakened Armor of the Valiant Soul with a DC of 16 and it can target up to 3 creatures.",
      },
    },
    armorAdd: "Awakened Armor of the Valiant Soul",
    armorOptions: {
      regExpSearch: /awakened armor of the valiant soul/i,
      name: "Awakened Armor of the Valiant Soul",
      source: [["TDCSR", 202]],
      type: "medium",
      ac: 16,
      stealthdis: true,
      weight: 45,
    },
  },
  exalted: {
    name: "Exalted Armor of the Valiant Soul",
    description:
      "While wearing this armor, I gain a +3 bonus to AC. Once per long rest, I can cast command (DC 18), which can target up to 5 creatures. I cannot be frightened and have immunity to acid damage. All friendly creatures within 15 ft of me cannot be frightened while I'm conscious.",
    savetxt: { immune: ["frightened", "acid"] },
    action: [["action", "Command (Armor of the Valiant Soul)"]],
    extraLimitedFeatures: [
      {
        name: "Command (Armor of the Valiant Soul)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 18,
    spellcastingBonus: {
      name: "Once per long rest",
      spells: ["command"],
      selection: ["command"],
      firstCol: "oncelr",
    },
    spellChanges: {
      command: {
        description:
          "Up to 5 crea save or follow one word command, e.g. approach, drop, flee, halt",
        changes:
          "I can cast command by using Exalted Armor of the Valiant Soul with a DC of 18 and it can target up to 5 creatures.",
      },
    },
    armorAdd: "Exalted Armor of the Valiant Soul",
    armorOptions: {
      regExpSearch: /exalted armor of the valiant soul/i,
      name: "Exalted Armor of the Valiant Soul",
      source: [["TDCSR", 202]],
      type: "medium",
      ac: 17,
      stealthdis: true,
      weight: 45,
    },
  },
};

MagicItemsList["cabal's ruin"] = {
  name: "Cabal's Ruin",
  source: [["TDCSR", 203]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "This cloak is made of heavy dark cloth trimmed with golden patterns, and occasionally shimmers with sparks of arcane energy. It was once worn by the famed gunslinger Percival Fredrickstein von Musel Klossowski de Rolo III of Whitestone." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Cabal's Ruin is in a dormant state, the cloak has 4 charges and it regains 1d4 expended charges daily at dawn. When you hit with an attack, you can expend any number of charges from the cloak, with the attack dealing an extra 1d6 lightning damage per charge expended. If your attack strikes multiple targets, you choose one target that takes this extra damage." +
    "\n   " +
    "When you are targeted by an enemy's spell, you can use your reaction to absorb a portion of the spell's energy into the cloak. The spell affects you normally, but the cloak regains a number of charges equal to the level of the spell. This property can't be used again until you finish a short or long rest." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Caba's Ruin reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 You have advantage on saving throws against spells and other magical effects while wearing this cloak." +
    "\n" +
    "\u2022 The cloak has 6 charges and it regains 1d4 + 2 expended charges daily at dawn." +
    "\n" +
    "\u2022 When you use the cloak to absorb a spell, you gain resistance to one type of damage dealt by the spell (your choice). This resistance then lasts until the end of your next turn." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Cabal's Ruin reaches an exalted state, you gain the following benefit:" +
    "\n" +
    "\u2022 The cloak has 10 charges and it regains 1d6 + 4 expended charges daily at dawn.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Cabal's Ruin",
    description:
      "This cloak has 4 charges, regaining 1d4 charges at dawn. When I hit with an attack, I can expend charges to deal an extra 1d6 lightning damage per charge to one target. Once per rest, I can use my reaction when targeted by a spell to have the cloak regain charges equal to the spell's level.",
    extraLimitedFeatures: [
      {
        name: "Absorb Spell Energy (Cabal's Ruin)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    usages: 4,
    recovery: "dawn",
    additional: "regains 1d4",
    action: ["reaction", " (absorb energy)"],
  },
  awakened: {
    name: "Awakened Cabal's Ruin",
    description:
      "This cloak has 6 charges, regaining 1d4+2 charges at dawn. When I hit with an attack, I can expend charges to deal an extra 1d6 lightning damage per charge to one target. Once per rest, I can use my reaction when targeted by a spell to have the cloak regain charges equal to the spell's level. See 3rd page notes.",
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "I have advantage on saves against spells and other magical effects",
          "When I absorb a spell, I can gain resistance to a damage type dealt by the spell",
          "This resistance lasts until the end of my next turn",
        ],
      },
    ],
    savetxt: { adv_vs: ["magic"] },
    extraLimitedFeatures: [
      {
        name: "Absorb Spell Energy (Cabal's Ruin)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    usages: 6,
    recovery: "dawn",
    additional: "regains 1d4+2",
  },
  exalted: {
    name: "Awakened Cabal's Ruin",
    description:
      "This cloak has 10 charges, regaining 1d6+4 charges at dawn. When I hit with an attack, I can expend charges to deal an extra 1d6 lightning damage per charge to one target. Once per rest, I can use my reaction when targeted by a spell to have the cloak regain charges equal to the spell's level. See 3rd page notes.",
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "I have advantage on saves against spells and other magical effects",
          "When I absorb a spell with Cabal's Ruin, I can gain resistance to a damage type dealt by the spell",
          "This resistance lasts until the end of my next turn",
        ],
      },
    ],
    savetxt: { adv_vs: ["magic"] },
    extraLimitedFeatures: [
      {
        name: "Absorb Spell Energy (Cabal's Ruin)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    usages: 10,
    recovery: "dawn",
    additional: "regains 1d6+4",
  },
};

MagicItemsList["circlet of barbed vision"] = {
  name: "Circlet of Barbed Vision",
  source: [["TDCSR", 203]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a creature of non-good alignment",
  prereqeval: function (v) {
    return !/good/i.test(What("Alignment"));
  },
  description: "",
  descriptionFull:
    "When you don this circlet of gnarled onyx, black barbs dig into your head, imparting power to you as the circlet twists your appearance to amuse the Spider Queen. The current resting place of the Circlet of Barbed Vision is unknown, but rumor has it that a spectral assassin known as the Inevitable End seeks this relic." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Circlet of Barbed Vision is in a dormant state, you have advantage on initiative rolls while you wear it, but your Charisma score decreases by 2. Your Charisma score returns to normal if you remove the circlet, but you take 4d6 psychic damage when you do so." +
    "\n   " +
    "Additionally, when you make an attack roll, you can use your reaction to gain a +5 bonus to the roll. You make this choice after you see the roll, but before the GM says whether the attack hits or misses. You can't use this property again until you finish a short or long rest." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Circlet of Barbed Vision reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 You have resistance to poison damage, and you are immune to the poisoned condition." +
    "\n" +
    "\u2022 Your ability to gain a bonus to an attack roll can be used twice between rests." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Circlet of Barbed Vision reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 You are immune to poison damage." +
    "\n" +
    "\u2022 You have truesight out to a range of 60 feet." +
    "\n" +
    "\u2022 Your ability to gain a bonus to an attack roll can be used three times between rests.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Circlet of Barbed Vision",
    description:
      "This circlet grants me advantage on initiative rolls, but my Charisma score decreases by 2. Once per rest, when I attack, I can use my reaction to gain a +5 bonus to the roll. If removed I take 4d6 psychic damage.",
    usages: 1,
    recovery: "short rest",
    action: ["reaction", " (attack bonus)"],
    scores: [0, 0, 0, 0, 0, -2],
  },
  awakened: {
    name: "Awakened Circlet of Barbed Vision",
    description:
      "This circlet grants me advantage on initiative rolls, but my Charisma score decreases by 2. Twice per rest, when I attack, I can use my reaction to gain a +5 bonus to the roll. I have resistance to poison damage and immunity to being poisoned. If removed I take 4d6 psychic damage.",
    usages: 2,
    recovery: "short rest",
    action: ["reaction", " (attack bonus)"],
    dmgres: ["Poison"],
    savetxt: { immune: ["poisoned"] },
    scores: [0, 0, 0, 0, 0, -2],
  },
  exalted: {
    name: "Exalted Circlet of Barbed Vision",
    description:
      "This circlet grants me advantage on initiative rolls, but my Charisma score decreases by 2. Thrice per rest, when I attack, I can use my reaction to gain a +5 bonus to the roll. I am immune to poison and have 60 ft truesight. If removed I take 4d6 psychic damage.",
    usages: 3,
    recovery: "short rest",
    action: ["reaction", " (attack bonus)"],
    savetxt: { immune: ["poison"] },
    scores: [0, 0, 0, 0, 0, -2],
    vision: [["Truesight", 60]],
  },
};

MagicItemsList["condemner"] = {
  name: "Condemner",
  source: [["TDCSR", 204]],
  type: "weapon (heavy crossbow)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "This shadow-touched hand crossbow once served as the weapon of choice for the legendary assassin Todora. Though few know this, Condemner is now in the possession of an equally infamous assassin named Ixrattu Khar (see her statistics in chapter 6)." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "When Condemner is in a dormant state, you gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit with an attack using this weapon, the target takes an extra 1d4 poison damage." +
    "\n   " +
    "Additionally, if you hit with an attack using this weapon, you can activate one of the following effects instead of dealing damage:" +
    "\n" +
    "\u2022 You cast fog cloud centered on the target's space." +
    "\n" +
    "\u2022 You cast silence centered on the target's space." +
    "\n   " +
    "When an effect is used, it can't be used again until you finish a short or long rest." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Condemner reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +2." +
    "\n" +
    "\u2022 The extra poison damage dealt by the weapon increases to 1d6." +
    "\n" +
    "\u2022 You gain an additional effect that can be triggered in place of dealing damage when you hit with an attack: You cast hold person on the target (save DC 15). This effect can't be used again until you finish a short or long rest." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Condemner reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3." +
    "\n" +
    "\u2022 The extra poison damage dealt by the weapon increases to 1d8." +
    "\n" +
    "\u2022 The save DC for the weapon's hold person spell increases to 17." +
    "\n" +
    "\u2022 You gain an additional effect that can be triggered in place of damage when you hit with an attack: You cast the blight spell on the target (save DC 17). This effect can't be used again until you finish a short or long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Condemner",
    description:
      "This crossbow adds +1 to hit and damage and deals an extra 1d4 poison damage on a hit. On a hit with it, I can cast one of the following instead of dealing damage: fog cloud centered on the target or silence centered on the target.",
    weaponsAdd: ["Dormant Condemner"],
    weaponOptions: {
      baseWeapon: "heavy crossbow",
      regExpSearch: /^(?=.*dormant)(?=.*condemner).*$/i,
      name: "Dormant Condemner",
      source: [["TDCSR", 204]],
      description: "Ammunition, heavy, loading, two-handed; +1d4 poison damage",
      modifiers: [1, 1],
    },
    extraLimitedFeatures: [
      {
        name: "Fog Cloud (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Silence (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per short rest",
        spells: ["fog cloud"],
        selection: ["fog cloud"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["silence"],
        selection: ["silence"],
        firstCol: "oncesr",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "On a hit, I can activate one of the following effects, instead of dealing damge:",
          "\u2022 I cast fog cloud centered on the target's space",
          "\u2022 I cast silence centered on the target's space",
          "I can use each effect once per rest",
        ],
      },
    ],
  },
  awakened: {
    name: "Awakened Condemner",
    description:
      "This crossbow adds +2 to hit and damage and deals an extra 1d6 poison damage on a hit. On a hit with it, I can cast one of the following instead of dealing damage: fog cloud centered on the target, silence centered on the target, or hold person (DC 15) on the target.",
    weaponsAdd: ["Awakened Condemner"],
    weaponOptions: {
      baseWeapon: "heavy crossbow",
      regExpSearch: /^(?=.*awakened)(?=.*condemner).*$/i,
      name: "Awakened Condemner",
      source: [["TDCSR", 204]],
      description: "Ammunition, heavy, loading, two-handed; +1d6 poison damage",
      modifiers: [2, 2],
    },
    extraLimitedFeatures: [
      {
        name: "Fog Cloud (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Silence (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Hold Person (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 15,
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per short rest",
        spells: ["fog cloud"],
        selection: ["fog cloud"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["silence"],
        selection: ["silence"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["hold person"],
        selection: ["hold person"],
        firstCol: "oncesr",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "On a hit, I can activate one of the following effects, instead of dealing damge:",
          "\u2022 I cast fog cloud centered on the target's space",
          "\u2022 I cast silence centered on the target's space",
          "\u2022 I cast hold person (DC 15) on the target",
          "I can use each effect once per rest",
        ],
      },
    ],
  },
  exalted: {
    name: "Exalted Condemner",
    description:
      "This crossbow adds +3 to hit and damage and deals an extra 1d8 poison damage on a hit. On a hit with it, I can cast one of the following instead of dealing damage: fog cloud centered on the target, silence centered on the target, hold person (DC 17) on the target, or blight (DC 17) on the target.",
    weaponsAdd: ["Exalted Condemner"],
    weaponOptions: {
      baseWeapon: "heavy crossbow",
      regExpSearch: /^(?=.*exalted)(?=.*condemner).*$/i,
      name: "Exalted Condemner",
      source: [["TDCSR", 204]],
      description: "Ammunition, heavy, loading, two-handed; +1d8 poison damage",
      modifiers: [2, 2],
    },
    extraLimitedFeatures: [
      {
        name: "Fog Cloud (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Silence (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Hold Person (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Blight (Condemner, on hit)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 17,
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per short rest",
        spells: ["fog cloud"],
        selection: ["fog cloud"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["silence"],
        selection: ["silence"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["hold person"],
        selection: ["hold person"],
        firstCol: "oncesr",
      },
      {
        name: "Once per short rest",
        spells: ["blight"],
        selection: ["blight"],
        firstCol: "oncesr",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "On a hit, I can activate one of the following effects, instead of dealing damge:",
          "\u2022 I cast fog cloud centered on the target's space",
          "\u2022 I cast silence centered on the target's space",
          "\u2022 I cast hold person (DC 17) on the target",
          "\u2022 I cast blight (DC 17) on the target",
          "I can use each effect once per rest",
        ],
      },
    ],
  },
};

MagicItemsList["deathwalker's ward"] = {
  name: "Deathwalker's Ward",
  source: [["TDCSR", 204]],
  type: "armor (studded leather)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "This beautiful black leather armor is covered in intricate scrollwork, and has a mantle bearing the black feathers of the Matron of Ravens. Legends say that it has been worn by a number of that deity's champions over the centuries—most recently, Vax'ildan of Vox Machina." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "When the Deathwalker's Ward is in a dormant state, you gain a +1 bonus to AC and you have advantage on death saving throws while wearing the armor." +
    toUni("Awakened") +
    "\n" +
    "When the Deathwalker's Ward reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The AC bonus of the armor increases to +2." +
    "\n" +
    "\u2022 While wearing the armor, you have resistance to one of the following damage types of your choice: acid, cold, fire, lightning, necrotic, or poison. You can change the damage type when you finish a short rest." +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Deathwalker's Ward reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The AC bonus of the armor increases to +3." +
    "\n" +
    "\u2022 As a bonus action, you grow large black raven wings that grant you a flying speed of 60 feet and last for 1 hour. Once this property is used, it can't be used again until you finish a long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Deathwalker's Ward",
    description:
      "While wearing this armor, I gain a +1 bonus to AC and have advantage on death saves.",
    savetxt: { text: ["Adv. on death saves"] },
    armorAdd: "Dormant Deathwalker's Ward",
    armorOptions: {
      regExpSearch: /dormant Deathwalker's Ward/i,
      name: "Dormant Deathwalker's Ward",
      source: [["TDCSR", 204]],
      type: "light",
      ac: 13,
      weight: 13,
    },
  },
  awakened: {
    name: "Awakened Deathwalker's Ward",
    description:
      "While wearing this armor, I gain a +2 bonus to AC and have advantage on death saves. After a short rest, I gain resistance to one of the following damage types: acid, cold, fire, lightning, necrotic, or poison.",
    savetxt: { text: ["Adv. on death saves"] },
    armorAdd: "Awakened Deathwalker's Ward",
    armorOptions: {
      regExpSearch: /awakened Deathwalker's Ward/i,
      name: "Awakened Deathwalker's Ward",
      source: [["TDCSR", 205]],
      type: "light",
      ac: 14,
      weight: 13,
    },
  },
  exalted: {
    name: "Exalted Deathwalker's Ward",
    description:
      "While wearing this armor, I gain a +3 bonus to AC and have advantage on death saves. After a short rest, I gain resistance to one of the following damage types: acid, cold, fire, lightning, necrotic, or poison. Once per long rest, as a bonus action, I can grow wings which grant me a 60 ft flying speed for 1 hour.",
    savetxt: { text: ["Adv. on death saves"] },
    armorAdd: "Exalted Deathwalker's Ward",
    armorOptions: {
      regExpSearch: /exalted Deathwalker's Ward/i,
      name: "Exalted Deathwalker's Ward",
      source: [["TDCSR", 205]],
      type: "light",
      ac: 15,
      weight: 13,
    },
    usages: 1,
    recovery: "long rest",
    action: ["bonus action", " (grow wings)"],
  },
};

MagicItemsList["fenthras"] = {
  name: "Fenthras",
  source: [["TDCSR", 205]],
  type: "weapon (longbow)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "This gorgeous longbow made of everbark from the Fey Realm flexes and shifts like a living entity. It is said to have been wielded by the legendary ranger Vex'ahlia against great evils." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Fenthras is in a dormant state, you gain a +1 bonus to attack and damage rolls made with this magic weapon." +
    "\n   " +
    "When you make an attack with Fenthras, you can declare it an oracle shot, allowing you to experience the area around the arrow using your normal senses for 10 minutes. Once this property is used, it can't be used again until you finish a short or long rest." +
    "\n   " +
    "Additionally, when a creature is killed by an attack using this weapon, a six-foot-tall tree rapidly grows out of the corpse over the next minute. The tree is rooted in the ground to make the body difficult to move, but does not permanently damage the corpse or its organs." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Fenthras reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +2. Additionally, when you hit with an attack using this weapon, the target takes an extra 1d4 lightning damage." +
    "\n" +
    "\u2022 When you hit with an attack using this weapon, you can declare it a bramble shot. The attack deals an extra 3d8 piercing damage, and the target must succeed on a DC 15 Strength saving throw or become restrained by steely brambles that burst from the arrow. A restrained target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once this property is used, it can't be used again until you finish a short or long rest." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Fenthras reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3." +
    "\n" +
    "\u2022 The extra lightning damage dealt by attacks using the bow increases to 1d6." +
    "\n" +
    "\u2022 You can declare a bramble shot twice between rests, and the saving throw DC increases to 17." +
    "\n" +
    "\u2022 You gain an additional effect that can be triggered in place of damage when you hit with an attack: You cast the blight spell on the target (save DC 17). This effect can't be used again until you finish a short or long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Fenthras",
    description:
      "This longbow adds +1 to hit and damage. When I kill a creature with Fenthras, a 6 ft tall tree rapidly grows out of it's corpse; the body is hard to move, but isn't damaged. When I attack with Fenthras, I can declare it an oracle shot; see third page.",
    weaponsAdd: ["Dormant Fenthras"],
    weaponOptions: {
      baseWeapon: "longbow",
      regExpSearch: /^(?=.*dormant)(?=.*fenthras).*$/i,
      name: "Dormant Fenthras",
      source: [["TDCSR", 205]],
      modifiers: [1, 1],
    },
    extraLimitedFeatures: [
      {
        name: "Oracle Shot (Fenthras)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When I attack with Fenthras, I can declare a shot type:",
          "\u2022 Oracle Shot (once per short rest)",
          "   I perceive the area around the arrow using my normal senses for 10 min",
        ],
      },
    ],
  },
  awakened: {
    name: "Awakened Fenthras",
    description:
      "This longbow adds +2 to hit and damage and deals an extra 1d4 lightning damage on a hit. When I kill a creature with Fenthras, a 6 ft tall tree rapidly grows out of it's corpse; the body is hard to move, but isn't damaged. When I attack with Fenthras, I can declare it an oracle or bramble shot; see third page.",
    weaponsAdd: ["Awakened Fenthras"],
    weaponOptions: {
      baseWeapon: "longbow",
      regExpSearch: /^(?=.*awakened)(?=.*fenthras).*$/i,
      name: "Awakened Fenthras",
      source: [["TDCSR", 205]],
      modifiers: [2, 2],
      description: "Ammunition, heavy, two-handed; +1d4 lightning damage",
    },
    extraLimitedFeatures: [
      {
        name: "Oracle Shot (Fenthras)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Bramble Shot (Fenthras)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When I attack with Fenthras, I can declare a shot type:",
          "\u2022 Oracle Shot (once per short rest)",
          "   I perceive the area around the arrow using my normal senses for 10 min",
          "\u2022 Bramble Shot (once per short rest)",
          "   The attack deals an extra 3d8 piercing damage; target makes a DC Str save",
          "   On a failure, it is restrained by steely brambles",
          "   It can repeat the save at the end of its turns to end the effect",
        ],
      },
    ],
  },
  exalted: {
    name: "Exalted Fenthras",
    description:
      "This longbow adds +3 to hit and damage and deals an extra 1d6 lightning damage on a hit. When I kill a creature with Fenthras, a 6 ft tall tree rapidly grows out of it's corpse; the body is hard to move, but isn't damaged. When I attack with Fenthras, I can declare it an oracle or bramble shot; see third page.",
    weaponsAdd: ["Exalted Fenthras"],
    weaponOptions: {
      baseWeapon: "longbow",
      regExpSearch: /^(?=.*exalted)(?=.*fenthras).*$/i,
      name: "Exalted Fenthras",
      source: [["TDCSR", 205]],
      modifiers: [3, 3],
      description: "Ammunition, heavy, two-handed; +1d6 lightning damage",
    },
    extraLimitedFeatures: [
      {
        name: "Oracle Shot (Fenthras)",
        usages: 1,
        recovery: "short rest",
      },
      {
        name: "Bramble Shot (Fenthras)",
        usages: 2,
        recovery: "short rest",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When I attack with Fenthras, I can declare a shot type:",
          "\u2022 Oracle Shot (once per short rest)",
          "   I perceive the area around the arrow using my normal senses for 10 min",
          "\u2022 Bramble Shot (twice per short rest)",
          "   The attack deals an extra 3d8 piercing damage; target makes a DC Str save",
          "   On a failure, it is restrained by steely brambles",
          "   It can repeat the save at the end of its turns to end the effect",
        ],
      },
    ],
  },
};

MagicItemsList["honor's last stand"] = {
  name: "Honor's Last Stand",
  source: [["TDCSR", 206]],
  type: "shield",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a creature of non-evil alignment",
  prereqeval: function (v) {
    return !/evil/i.test(What("Alignment"));
  },
  description: "",
  descriptionFull:
    "This massive silvered shield bears the crest of the Platinum Dragon and never tarnishes. Its metal is always warm to the touch." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Honor's Last Stand is in a dormant state, you gain a +1 bonus to AC while holding the shield. This bonus is in addition to the shield's normal bonus to AC. You also can't be knocked prone while bearing this shield." +
    toUni("Awakened") +
    "\n" +
    "When Honor's Last Stand reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The shield's bonus to AC increases to +2." +
    "\n" +
    "\u2022 If you successfully shove a creature while holding this shield, that creature takes 2d6 force damage." +
    "\n" +
    "\u2022 When a creature within 5 feet of you misses you with an attack, you can attempt to shove that creature as a reaction." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Honor's Last Stand reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The shield's bonus to AC increases to +3." +
    "\n" +
    "\u2022 When you successfully shove a creature while holding this shield, you can move it up to 15 feet away from you." +
    "\n" +
    "\u2022 As a bonus action, you can protect an ally within 5 feet of you, granting that ally a +3 bonus to AC until the start of your next turn or until they are no longer within 5 feet of you.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Honor's Last Stand",
    description:
      "While wearing this shield, I gain a +1 bonus to AC and cannot be knocked prone.",
    savetxt: { immune: ["prone"] },
    shieldAdd: ["Dormant Honor's Last Stand", 3, 6],
  },
  awakened: {
    name: "Awakened Honor's Last Stand",
    description:
      "While wearing this shield, I gain a +2 bonus to AC and cannot be knocked prone. When I shove a creature, it takes 2d6 force damage. As a reaction when a creature within 5 ft misses me with an attack, I can shove the attacker.",
    savetxt: { immune: ["prone"] },
    shieldAdd: ["Awakened Honor's Last Stand", 4, 6],
    action: ["reaction", " (shove)"],
  },
  exalted: {
    name: "Exalted Honor's Last Stand",
    description:
      "While wearing this shield, I gain a +3 bonus to AC and cannot be knocked prone. When I shove a creature, it takes 2d6 force damage and is pushed up to 15 ft away. As a reaction when a creature within 5 ft misses me with an attack, I can shove the attacker. As a bonus action, I can protect an ally; see third page.",
    savetxt: { immune: ["prone"] },
    shieldAdd: ["Exalted Honor's Last Stand", 5, 6],
    action: [
      ["reaction", " (shove)"],
      ["bonus action", " (protect ally)"],
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "As a bonus action, I can grant an ally within 5 ft of me +3 AC",
          "This lasts until the start of my next turn, or they move more than 5 ft away",
        ],
      },
    ],
  },
};

MagicItemsList["kiss of the changebringer"] = {
  name: "Kiss of the Changebringer",
  source: [["TDCSR", 206]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "A beautiful, glittering emerald is set within this silver chain, humming with power and possibility. It is said that this amulet was stolen from the neck of the Changebringer herself by the Lord of the Hells, and locked within the vaults of Bazzoxan in Wildemount. It was later claimed there by a group of Aurora Watch soldiers during an expedition into that grim fortress' abandoned temples." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Kiss of the Changebringer is in a dormant state, you have a +1 bonus to saving throws and are immune to the grappled condition while wearing it." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Kiss of the Changebringer reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The bonus to saving throws increases to +2." +
    "\n" +
    "\u2022 You are immune to the restrained condition." +
    "\n" +
    "\u2022 You can use an action to cast the blink spell on yourself. This property of the amulet can't be used again until you finish a long rest." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Kiss of the Changebringer reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The bonus to saving throws increases to +3." +
    "\n" +
    "\u2022 You are immune to the paralyzed and petrified conditions." +
    "\n" +
    "\u2022 When you make an attack roll, ability check, or saving throw, you can roll an additional d20. You can choose to do so after you make the attack roll, ability check, or saving throw, but before the outcome is determined. You choose which of the d20s to use for your roll. This property of the amulet can't be used again until you finish a short or long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Kiss of the Changebringer",
    description:
      "While wearing this amulet, I gain +1 to all saves and am immune to being grappled.",
    savetxt: { immune: ["grappled"] },
    addMod: [
      {
        type: "save",
        field: "all",
        mod: 1,
        text: "While I wear the Dormant Kiss of the Changebringer, I gain a +1 bonus to all my saving throws.",
      },
    ],
  },
  awakened: {
    name: "Awakened Kiss of the Changebringer",
    description:
      "While wearing this amulet, I gain +2 to all saves and am immune to being grappled and restrained. Once per long rest, I can cast blink.",
    savetxt: { immune: ["grappled", "restrained"] },
    addMod: [
      {
        type: "save",
        field: "all",
        mod: 2,
        text: "While I wear the Dormant Kiss of the Changebringer, I gain a +2 bonus to all my saving throws.",
      },
    ],
    action: ["action", " (cast blink)"],
    extraLimitedFeatures: [
      {
        name: "Blink (Kiss of the Changebringer)",
        usages: 1,
        recovery: "long rest",
      },
    ],
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per long rest",
        spells: ["blink"],
        selection: ["blink"],
        firstCol: "oncelr",
      },
    ],
  },
  exalted: {
    name: "Exalted Kiss of the Changebringer",
    description:
      "While wearing this amulet, I gain +3 to all saves and am immune to being grappled/restrained/paralyzed/petrified. Once per long rest, I can cast blink. Once per rest, when I make a check, attack, or save I can roll an extra d20; I do so after the roll, but before the outcome is determined. I then choose which result to use.",
    savetxt: { immune: ["grappled", "restrained", "paralyzed", "petrified"] },
    usages: 1,
    recovery: "short rest",
    addMod: [
      {
        type: "save",
        field: "all",
        mod: 3,
        text: "While I wear the Dormant Kiss of the Changebringer, I gain a +3 bonus to all my saving throws.",
      },
    ],
    action: ["action", " (cast blink)"],
    extraLimitedFeatures: [
      {
        name: "Blink (Kiss of the Changebringer)",
        usages: 1,
        recovery: "long rest",
      },
    ],
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per long rest",
        spells: ["blink"],
        selection: ["blink"],
        firstCol: "oncelr",
      },
    ],
  },
};

MagicItemsList["mythcarver"] = {
  name: "Mythcarver",
  source: [["TDCSR", 207]],
  type: "weapon (longsword)",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a bard",
  prereqeval: function (v) {
    return classes.known.bard ? true : false;
  },
  description: "",
  descriptionFull:
    "This incredible silvered blade once belonged to the legendary White Duke, a founding member of the Golden Grin, and many other master bards before him. It resonates with nearby musical tones. In the modern era, it is best known as the personal weapon of famed bard Scanlan Shorthalt." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Mythcarver is in a dormant state, you gain a +1 bonus to attack and damage rolls made with this magic weapon. This longsword's enchantments and light construction also grant it the Finesse property, which allows you to use either your Strength or Dexterity modifier for the attack and damage rolls when making an attack with this weapon." +
    "\n   " +
    "Additionally, when you target an ally with your Bardic Inspiration feature, you gain advantage on attacks with this weapon until the end of your turn." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Mythcarver reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +2. Additionally, when you hit with an attack using this weapon, the target takes an extra 1d6 force damage." +
    "\n" +
    "\u2022 When you use your Bardic Inspiration to affect an enemy while wielding this sword, that enemy has disadvantage on their next saving throw." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Mythcarver reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3." +
    "\n" +
    "\u2022 As an action, you let the spirit of the sword overtake your body and guide your strikes. You make 4 melee attacks with the sword, then gain 1 level of exhaustion. Once this property is used, it can't be used again until you finish a long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Mythcarver",
    description:
      "This longsword adds +1 to hit and damage and has finesse. When I use Bardic Inspiration on an ally, I gain adv. on attacks with it until the end of my turn.",
    weaponsAdd: ["Dormant Mythcarver"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*dormant)(?=.*mythcarver).*$/i,
      name: "Dormant Mythcarver",
      source: [["TDCSR", 207]],
      modifiers: [1, 1],
      description: "Versatile (1d10), finesse",
    },
  },
  awakened: {
    name: "Awakened Mythcarver",
    description:
      "This longsword adds +2 to hit and damage, deals an extra 1d6 force damage, and has finesse. When I use Bardic Inspiration on an ally, I gain adv. on attacks with it until the end of my turn. When I use Bardic Inspiration on a foe, they gain disadv. on their next save.",
    weaponsAdd: ["Awakened Mythcarver"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*awakened)(?=.*mythcarver).*$/i,
      name: "Awakened Mythcarver",
      source: [["TDCSR", 207]],
      modifiers: [2, 2],
      description: "Versatile (1d10), finesse",
    },
  },
  exalted: {
    name: "Exalted Mythcarver",
    description:
      "This longsword adds +3 to hit and damage, deals an extra 1d6 force damage, and has finesse. When I use Bardic Inspiration on an ally, I gain adv. on attacks with it until the end of my turn. When I use Bardic Inspiration on a foe, they gain disadv. on their next save. See third page.",
    weaponsAdd: ["Exalted Mythcarver"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*exalted)(?=.*mythcarver).*$/i,
      name: "Exalted Mythcarver",
      source: [["TDCSR", 207]],
      modifiers: [3, 3],
      description: "Versatile (1d10), finesse",
    },
    action: ["action", " (4 melee atacks)"],
    usages: 1,
    recovery: "long rest",
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "Once per long rest, I can use an action to make 4 melee attacks with Mythcarver",
          "I gain 1 level of exhaustion afterwards",
        ],
      },
    ],
  },
};

MagicItemsList["plate of the dawnmartyr"] = {
  name: "Plate of the Dawnmartyr",
  source: [["TDCSR", 208]],
  type: "armor (plate)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "Beautiful silver scrollwork and priceless cut rubies adorn this set of brass-and-gold armor. Legend holds that it was worn by Duana, High Priest of the Dawnfather, when she was martyred in the Battle of Ghor Dranas in the final days of the Calamity. In more recent times, it was worn by Pike Trickfoot, a legendary cleric of the Everlight, while fighting against the Chroma Conclave and the Whispered One." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Plate of the Dawnmartyr is in a dormant state, you gain a +1 bonus to AC while wearing it. When a creature within 5 feet of you hits you with a melee attack, you can use your reaction to rebuke that creature, dealing it 1d6 fire damage." +
    toUni("Awakened") +
    "\n" +
    "When the Plate of the Dawnmartyr reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The armor's bonus to AC increases to +2." +
    "\n" +
    "\u2022 You are immune to the frightened condition." +
    "\n" +
    "\u2022 You have resistance to fire damage." +
    "\n" +
    "\u2022 The fire damage you deal when you rebuke an attacker increases to 2d6." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Plate of the Dawnmartyr reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The armor's bonus to AC increases to +3." +
    "\n" +
    "\u2022 When you rebuke an attacker, you can choose to deal either fire damage or radiant damage." +
    "\n" +
    "\u2022 When you are reduced to 0 hit points, you can choose to have a blast of healing flame surround you. You regain 1 hit point and are lifted to your feet. Each enemy within 10 feet of you takes 2d6 fire damage or radiant damage (your choice). This property of the armor can't be used again until you finish a long rest.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Plate of the Dawnmartyr",
    description:
      "While wearing this armor, I gain a +1 bonus to AC. As a reaction when damaged by a creature within 5 ft with a melee attack, I can deal 1d6 fire damage to the attacker.",
    armorAdd: "Dormant Plate of the Dawnmartyr",
    armorOptions: {
      regExpSearch: /dormant plate of the dawnmartyr/i,
      name: "Dormant Plate of the Dawnmartyr",
      source: [["TDCSR", 208]],
      type: "heavy",
      ac: 19,
      weight: 65,
    },
  },
  awakened: {
    name: "Awakened Plate of the Dawnmartyr",
    description:
      "While wearing this armor, I gain a +2 bonus to AC, resistance to fire damage, and immunity to being frightened. As a reaction when damaged by a creature within 5 ft with a melee attack, I can deal 2d6 fire damage to the attacker.",
    armorAdd: "Awakened Plate of the Dawnmartyr",
    dmgres: ["Fire"],
    savetxt: { immune: ["frightened"] },
    armorOptions: {
      regExpSearch: /awakened plate of the dawnmartyr/i,
      name: "Awakened Plate of the Dawnmartyr",
      source: [["TDCSR", 208]],
      type: "heavy",
      ac: 20,
      weight: 65,
    },
  },
  exalted: {
    name: "Exalted Plate of the Dawnmartyr",
    description:
      "While wearing this armor, I gain a +3 bonus to AC, resistance to fire damage, and immunity to being frightened. As a reaction when damaged by a creature within 5 ft with a melee attack, I can deal 2d6 fire or radiant damage to the attacker. See third page.",
    armorAdd: "Exalted Plate of the Dawnmartyr",
    dmgres: ["Fire"],
    savetxt: { immune: ["frightened"] },
    armorOptions: {
      regExpSearch: /exalted plate of the dawnmartyr/i,
      name: "Exalted Plate of the Dawnmartyr",
      source: [["TDCSR", 208]],
      type: "heavy",
      ac: 21,
      weight: 65,
    },
    usages: 1,
    recovery: "long rest",
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        additional: "1 \u00D7 per long rest",
        note: [
          "When reduced to 0 HP, I can have a blast of healing flame surround me",
          "I regain 1 HP and am lifted to my feet",
          "Each enemy within 10 ft takes 2d6 fire or radiant damage",
        ],
      },
    ],
  },
};

MagicItemsList["pyremaul"] = {
  name: "Pyremaul",
  source: [["TDCSR", 208]],
  type: "weapon (maul)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "Forged from deep red iron, this massive hammer is set with a brilliant fire opal that shimmers with eternal flame. It is rumored to be currently wielded by Grand Legate Phaestor, the fire giant ruler of Vulkanon, somewhere beneath the Cliffkeep Mountains." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Pyremaul is in a dormant state, you gain a +1 bonus to attack rolls made with this magic weapon. When you hit with an attack using this weapon, the target takes an extra 1d6 fire damage." +
    "\n   " +
    "Additionally, you can choose to have this weapon shed bright light in a 30-foot radius and dim light for an additional 30 feet (no action required)." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Pyremaul reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack rolls increases to +2." +
    "\n" +
    "\u2022 The extra fire damage dealt by the weapon increases to 2d6." +
    "\n" +
    "\u2022 As an action, you can slam Pyremaul into the ground to cast the burning hands spell at 2nd level (save DC 15). You can't use this property again until you finish a short or long rest." +
    "\n" +
    "\u2022 Whenever you score a critical hit with this weapon, the target must succeed on a DC 15 Strength saving throw or be knocked prone." +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Pyremaul reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack rolls increases to +3." +
    "\n" +
    "\u2022 The extra fire damage dealt by the weapon increases to 3d6." +
    "\n" +
    "\u2022 When you cast burning hands with the weapon, you do so at 3rd level and the save DC increases to 17." +
    "\n" +
    "\u2022 When you score a critical hit with this weapon, the saving throw to avoid being knocked prone increases to 17. You also roll an extra 3d6 fire damage when determining the extra damage for the critical hit." +
    "\n" +
    "\u2022 When you kill a creature with an attack using this weapon, you can take 10d10 fire damage and immolate the creature's corpse. This damage can't be reduced in any way, and you die if this damage reduces you to 0 hit points. The immolated creature and everything it is wearing and carrying, except magic items, are reduced to a pile of ash. The creature can be restored to life only by means of a true resurrection or a wish spell. You can't use this property of the maul again until 7 days have passed.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Pyremaul",
    description:
      "This maul adds +1 to hit and damage and deals an extra 1d6 fire damage. I can have it shed bright light in 30 ft, dim light in 30 ft.",
    weaponsAdd: ["Dormant Pyremaul"],
    weaponOptions: {
      baseWeapon: "maul",
      regExpSearch: /^(?=.*dormant)(?=.*pyremaul).*$/i,
      name: "Dormant Pyremaul",
      source: [["TDCSR", 208]],
      modifiers: [1, 1],
      description: "Heavy, two-handed; +1d6 fire damage",
    },
  },
  awakened: {
    name: "Awakened Pyremaul",
    description:
      "This maul adds +2 to hit and damage and deals an extra 2d6 fire damage. I can have it shed bright light in 30 ft, dim light in 30 ft. As an action, I can cast burning hands (DC 15) at 2nd level. Whenever I score a critical hit with it, the target makes a DC 15 Str save or knocked prone.",
    weaponsAdd: ["Awakened Pyremaul"],
    weaponOptions: {
      baseWeapon: "maul",
      regExpSearch: /^(?=.*awakened)(?=.*pyremaul).*$/i,
      name: "Awakened Pyremaul",
      source: [["TDCSR", 208]],
      modifiers: [2, 2],
      description:
        "Heavy, two-handed; +2d6 fire damage; DC 15 Str save or knocked prone on critical hit",
    },
    action: ["action", " (burning hands)"],
    extraLimitedFeatures: [
      {
        name: "Burning Hands (Pyremaul)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 15,
    spellcastingBonus: {
      name: "Once per short rest",
      spells: ["burning hands"],
      selection: ["burning hands"],
      firstCol: "oncesr",
    },
    spellChanges: {
      "burning hands": {
        allowUpCasting: false,
        description:
          "All in area 4d6 Fire dmg; save halves; unattended flammable objects ignite",
        changes:
          "As an action, I can slam Pyremaul into the ground to cast the burning hands spell at 2nd level (save DC 15).",
      },
    },
  },
  exalted: {
    name: "Exalted Pyremaul",
    description:
      "This maul adds +3 to hit and damage and deals an extra 3d6 fire damage. I can have it shed bright light in 30 ft, dim light in 30 ft. As an action, I can cast burning hands (DC 17) at 2nd level. Whenever I score a critical hit with it, the target makes a DC 17 Str save or knocked prone. See third page.",
    weaponsAdd: ["Exalted Pyremaul"],
    weaponOptions: {
      baseWeapon: "maul",
      regExpSearch: /^(?=.*exalted)(?=.*pyremaul).*$/i,
      name: "Exalted Pyremaul",
      source: [["TDCSR", 209]],
      modifiers: [3, 3],
      description:
        "Heavy, two-handed; +3d6 fire damage; DC 17 Str save or knocked prone and +3d6 fire damage on critical hit",
    },
    action: ["action", " (burning hands)"],
    extraLimitedFeatures: [
      {
        name: "Burning Hands (Pyremaul)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    fixedDC: 17,
    spellcastingBonus: {
      name: "Once per short rest",
      spells: ["burning hands"],
      selection: ["burning hands"],
      firstCol: "oncesr",
    },
    spellChanges: {
      "burning hands": {
        allowUpCasting: false,
        description:
          "All in area 4d6 Fire dmg; save halves; unattended flammable objects ignite",
        changes:
          "As an action, I can slam Pyremaul into the ground to cast the burning hands spell at 2nd level (save DC 17).",
      },
    },
    usages: 1,
    recovery: "Week",
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        additional: "1 \u00D7 per week",
        note: [
          "When I kill a creature, I can take 10d10 fire damage to immolate the corpse",
          "The damage can't be reduced in any way and I die if reduced to 0 HP by it",
          "The corpse and everything worn/carried by it, except magic items, are turned to ash",
          "The creature can only be brought back to life by the true resurrection or wish spells",
        ],
      },
    ],
  },
};

MagicItemsList["spire of conflux"] = {
  name: "Spire of Conflux",
  source: [["TDCSR", 209]],
  type: "weapon (quarterstaff)",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a spellcaster",
  prereqeval: function (v) {
    return v.isSpellcaster;
  },
  description: "",
  descriptionFull:
    "A powerful relic passed down from generation to generation of Ashari leaders, the Spire of Conflux was lost over three centuries ago when Joran the Sea-Speaker, a respected leader of the Water Ashari, was devoured by a demon of the Abyss. It was rediscovered by the legendary druid Keyleth of Zephrah, Voice of the Tempest. However, rumors swirl that she is seeking another hero to wield it—one who can travel the land and do good in small ways as she once did" +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Spire of Conflux is in a dormant state, the staff has 8 charges and regains 1d4 + 2 expended charges daily at dawn. While holding the staff, you can expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: burning hands (1 charge) or fireball (3 charges)." +
    "\n   " +
    "Additionally, while holding this staff, you have a +1 bonus to spell attack rolls and your spell save DC increases by 1." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Spire of Conflux reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The staff has 12 charges, and it regains 1d6 + 2 expended charges daily at dawn." +
    "\n" +
    "\u2022 You can also spend charges to cast the following spells from the staff: conjure elemental (5 charges) or ice storm (4 charges)." +
    "\n" +
    "\u2022 When you cast a spell that deals bludgeoning, cold, fire, lightning, or thunder damage and you roll a 1 on a damage die, you can reroll the die and must use the new roll." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Spire of Conflux reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The staff has 20 charges, and it regains 1d6 + 4 expended charges daily at dawn." +
    "\n" +
    "\u2022 You can also spend charges to cast the following spells from the staff: chain lightning (6 charges) or fire storm (7 charges)" +
    "\n" +
    "\u2022 The bonus to spell attack rolls and your spell save DC increases to +2",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Spire of Conflux",
    description:
      "This staff adds a +1 bonus to my spell attacks and save DCs of my spells. It has 8 charges, regaining 1d4+2 charges at dawn. I can expend charges to cast spells; see third page.",
    calcChanges: {
      spellCalc: [
        function (type, spellcasters, ability) {
          if (type == "dc" || type == "attack") return 1;
        },
        "I gain a +1 bonus to spell attack rolls and saving throw DCs of my spells.",
      ],
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["burning hands"],
        selection: ["burning hands"],
        firstCol: 1,
      },
      {
        name: "3 charges",
        spells: ["fireball"],
        selection: ["fireball"],
        firstCol: 3,
      },
    ],
    usages: 8,
    recovery: "dawn",
    additional: "regains 1d4+2",
    weaponsAdd: ["Dormant Spire of Conflux"],
    weaponOptions: {
      baseWeapon: "quarterstaff",
      regExpSearch: /^(?=.*dormant)(?=.*spire of conflux).*$/i,
      name: "Dormant Spire of Conflux",
      description: "Versatile (1d8); counts as magical",
      source: [["TDCSR", 209]],
    },
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "I can spend charges from the Spire of Conflux to cast the following spells:",
          "\u2022 1 charge: burning hands",
          "\u2022 3 charges: fireball",
        ],
      },
    ],
  },
  awakened: {
    name: "Awakened Spire of Conflux",
    description:
      "This staff adds a +1 bonus to my spell attacks and save DCs of my spells. It has 12 charges, regaining 1d6+2 charges at dawn. I can expend charges to cast spells; see third page. When I cast a spell that deals bludgeoning, cold, fire, lightning, or thunder damage and roll a 1 on a damage die, I can reroll the die and must use the new result.",
    calcChanges: {
      spellCalc: [
        function (type, spellcasters, ability) {
          if (type == "dc" || type == "attack") return 1;
        },
        "I gain a +1 bonus to spell attack rolls and saving throw DCs of my spells.",
      ],
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["burning hands"],
        selection: ["burning hands"],
        firstCol: 1,
      },
      {
        name: "3 charges",
        spells: ["fireball"],
        selection: ["fireball"],
        firstCol: 3,
      },
      {
        name: "4 charges",
        spells: ["ice storm"],
        selection: ["ice storm"],
        firstCol: 4,
      },
      {
        name: "5 charges",
        spells: ["conjure elemental"],
        selection: ["conjure elemental"],
        firstCol: 5,
      },
    ],
    usages: 12,
    recovery: "dawn",
    additional: "regains 1d6+2",
    weaponsAdd: ["Awakened Spire of Conflux"],
    weaponOptions: {
      baseWeapon: "quarterstaff",
      regExpSearch: /^(?=.*awakened)(?=.*spire of conflux).*$/i,
      name: "Awakened Spire of Conflux",
      description: "Versatile (1d8); counts as magical",
      source: [["TDCSR", 209]],
    },
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "I can spend charges from the Spire of Conflux to cast the following spells:",
          "\u2022 1 charge: burning hands",
          "\u2022 3 charges: fireball",
          "\u2022 4 charges: ice storm",
          "\u2022 5 charges: conjure elemental",
        ],
      },
    ],
  },
  exalted: {
    name: "Exalted Spire of Conflux",
    description:
      "This staff adds a +2 bonus to my spell attacks and save DCs of my spells. It has 20 charges, regaining 1d6+4 charges at dawn. I can expend charges to cast spells; see third page. When I cast a spell that deals bludg./cold/fire/lightning/thunder damage and roll a 1 on a damage die, I can reroll the die using the new result.",
    calcChanges: {
      spellCalc: [
        function (type, spellcasters, ability) {
          if (type == "dc" || type == "attack") return 2;
        },
        "I gain a +2 bonus to spell attack rolls and saving throw DCs of my spells.",
      ],
    },
    spellFirstColTitle: "Ch",
    spellcastingAbility: "class",
    spellcastingBonus: [
      {
        name: "1 charge",
        spells: ["burning hands"],
        selection: ["burning hands"],
        firstCol: 1,
      },
      {
        name: "3 charges",
        spells: ["fireball"],
        selection: ["fireball"],
        firstCol: 3,
      },
      {
        name: "4 charges",
        spells: ["ice storm"],
        selection: ["ice storm"],
        firstCol: 4,
      },
      {
        name: "5 charges",
        spells: ["conjure elemental"],
        selection: ["conjure elemental"],
        firstCol: 5,
      },
      {
        name: "6 charges",
        spells: ["chain lightning"],
        selection: ["chain lightning"],
        firstCol: 6,
      },
      {
        name: "7 charges",
        spells: ["fire storm"],
        selection: ["fire storm"],
        firstCol: 7,
      },
    ],
    usages: 20,
    recovery: "dawn",
    additional: "regains 1d6+4",
    weaponsAdd: ["Exalted Spire of Conflux"],
    weaponOptions: {
      baseWeapon: "quarterstaff",
      regExpSearch: /^(?=.*exalted)(?=.*spire of conflux).*$/i,
      name: "Exalted Spire of Conflux",
      description: "Versatile (1d8); counts as magical",
      source: [["TDCSR", 209]],
    },
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "I can spend charges from the Spire of Conflux to cast the following spells:",
          "\u2022 1 charge: burning hands",
          "\u2022 3 charges: fireball",
          "\u2022 4 charges: ice storm",
          "\u2022 5 charges: conjure elemental",
          "\u2022 6 charges: chain lightning",
          "\u2022 7 charges: fire storm",
        ],
      },
    ],
  },
};

MagicItemsList["star razor"] = {
  name: "Star Razor",
  source: [["TDCSR", 210]],
  type: "weapon (longsword)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "The thick, grooved blade of this shining silver longsword is lined with etched runes that sparkle blue in the light. Star Razor—known also as Dwueth'var— was thought to have been destroyed or lost after the Calamity, but new rumors suggest that it might be wielded by a half-orc somewhere in Wildemount." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Star Razor is in a dormant state, you can hold this magic longsword and use a bonus action to speak the command word Galas-var, causing the sword to emit a pale blue glow that sheds bright light in a 20-foot radius and dim light for an additional 20 feet. This glow lasts until you use a bonus action to speak the command word again, or until you drop or sheathe the sword." +
    "\n" +
    "\u2022 While this longsword is glowing, you gain a +1 bonus to attack and damage rolls made with the weapon, and you have resistance to radiant damage." +
    "\n" +
    "\u2022 You can cast the faerie fire spell from the weapon as an action, requiring no components (save DC 13). Once a spell has been cast using Star Razor, that spell can't be cast from the sword until the next dawn." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Star Razor reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +2." +
    "\n" +
    "\u2022 When a creature within 5 feet of you hits you with a melee attack, you can use your reaction to create a burst of radiance from the sword, dealing 1d8 radiant damage to the attacker." +
    "\n" +
    "\u2022 You can cast the see invisibility spell from the sword as an action, and the save DC for spells cast using the sword increases to 15." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Star Razor reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3." +
    "\n" +
    "\u2022 The burst of radiance you can create as a reaction when hit with a melee attack deals 1d12 radiant damage, and you can immediately teleport to an unoccupied space you can see within 15 feet of you as part of the same reaction." +
    "\n" +
    "\u2022 You can cast the fly spell from the sword as an action, and the save DC for spells cast using the sword increases to 17.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Star Razor",
    description:
      "While holding this sword, I can speak its command word to cause it to glow bright light in 20 ft, dim light in 20 ft. While glowing, it adds +1 to hit and damage and grants resistance to radiant damage. Once per dawn, I can cast faerie fire (DC 13).",
    weaponsAdd: ["Dormant Star Razor"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*dormant)(?=.*star razor).*$/i,
      name: "Dormant Star Razor",
      source: [["TDCSR", 210]],
    },
    action: [
      ["bonus action", " (start/stop glow)"],
      ["action", " (faerie fire)"],
    ],
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            /\bstar razor\b/i.test(v.WeaponTextName) &&
            /\bglowing\b/i.test(v.WeaponTextName)
          ) {
            output.magic += 1;
          }
        },
        "If I include the word 'Glowing' in Star Razor's name, the calculation will add +1 to hit and damage.",
      ],
    },
    spellFirstColTitle: "Us",
    fixedDC: 13,
    spellcastingBonus: [
      {
        name: "Once per dawn",
        spells: ["faerie fire"],
        selection: ["faerie fire"],
        firstCol: "checkbox",
      },
    ],
    extraLimitedFeatures: [
      {
        name: "Faerie Fire (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
    ],
  },
  awakened: {
    name: "Awakened Star Razor",
    description:
      "While holding this sword, I can speak its command word to cause it to glow bright light in 20 ft, dim light in 20 ft. While glowing, it adds +2 to hit and damage and grants resistance to radiant damage. Once per dawn per spell, I can cast (DC 15) faerie fire and see invisibility. See third page.",
    weaponsAdd: ["Awakened Star Razor"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*awakened)(?=.*star razor).*$/i,
      name: "Awakened Star Razor",
      source: [["TDCSR", 210]],
    },
    action: [
      ["bonus action", " (start/stop glow)"],
      ["reaction", " (when hit in melee)"],
    ],
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            /\bstar razor\b/i.test(v.WeaponTextName) &&
            /\bglowing\b/i.test(v.WeaponTextName)
          ) {
            output.magic += 2;
          }
        },
        "If I include the word 'Glowing' in Star Razor's name, the calculation will add +2 to hit and damage.",
      ],
    },
    spellFirstColTitle: "Us",
    fixedDC: 15,
    spellcastingBonus: [
      {
        name: "Once per dawn",
        spells: ["faerie fire"],
        selection: ["faerie fire"],
        firstCol: "checkbox",
      },
      {
        name: "Once per dawn",
        spells: ["see invisibility"],
        selection: ["see invisibility"],
        firstCol: "checkbox",
      },
    ],
    extraLimitedFeatures: [
      {
        name: "Faerie Fire (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
      {
        name: "See Invisibility (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When hit in melee, I can use my reaction to deal 1d8 damage to the attacker",
        ],
      },
    ],
  },
  exalted: {
    name: "Exalted Star Razor",
    description:
      "While holding this sword, I can speak its command word to cause it to glow bright light in 20 ft, dim light in 20 ft. While glowing, it adds +3 to hit and damage and grants resistance to radiant damage. Once per dawn per spell, I can cast (DC 15) faerie fire, see invisibility, and fly. See third page.",
    weaponsAdd: ["Exalted Star Razor"],
    weaponOptions: {
      baseWeapon: "longsword",
      regExpSearch: /^(?=.*exalted)(?=.*star razor).*$/i,
      name: "Exalted Star Razor",
      source: [["TDCSR", 210]],
    },
    action: [
      ["bonus action", " (start/stop glow)"],
      ["reaction", " (when hit in melee)"],
    ],
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (
            /\bstar razor\b/i.test(v.WeaponTextName) &&
            /\bglowing\b/i.test(v.WeaponTextName)
          ) {
            output.magic += 3;
          }
        },
        "If I include the word 'Glowing' in Star Razor's name, the calculation will add +3 to hit and damage.",
      ],
    },
    spellFirstColTitle: "Us",
    fixedDC: 17,
    spellcastingBonus: [
      {
        name: "Once per dawn",
        spells: ["faerie fire"],
        selection: ["faerie fire"],
        firstCol: "checkbox",
      },
      {
        name: "Once per dawn",
        spells: ["see invisibility"],
        selection: ["see invisibility"],
        firstCol: "checkbox",
      },
      {
        name: "Once per dawn",
        spells: ["fly"],
        selection: ["fly"],
        firstCol: "checkbox",
      },
    ],
    extraLimitedFeatures: [
      {
        name: "Faerie Fire (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
      {
        name: "See Invisibility (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
      {
        name: "Fly (Star Razor)",
        usages: 1,
        recovery: "dawn",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When hit in melee, I can use my reaction to deal 1d12 damage to the attacker",
          "I can then teleport to a seen, unoccupied space within 15 ft",
        ],
      },
    ],
  },
};

MagicItemsList["titanstone knuckles"] = {
  name: "Titanstone Knuckles",
  source: [["TDCSR", 211]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "Carved from the heartstone of a slain earth primordial, these gauntlets bestow immeasurable might to their wearer. In recent times, they were wielded by the legendary barbarian Grog Strongjaw, who continues to use them as he seeks worthy challengers across Tal'Dorei and Exandria." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While the Titanstone Knuckles are in a dormant state, your Strength score becomes 22 while you wear these gauntlets. Additionally, your weapon attacks deal double damage to objects and structures." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Titanstone Knuckles reach an awakened state, they gain the following properties:" +
    "\n" +
    "\u2022 Your Strength score becomes 24." +
    "\n" +
    "\u2022 You can use an action to cast the enlarge/reduce spell from the gauntlets on yourself (enlarge only), with a duration of 10 minutes. This property of the gauntlets can't be used again until you finish a long rest." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Titanstone Knuckles reach an exalted state, they gain the following properties:" +
    "\n" +
    "\u2022 Your Strength score becomes 26." +
    "\n" +
    "\u2022 You are immune to the paralyzed and petrified conditions." +
    "\n" +
    "\u2022 While you are under the effect of the enlarge/reduce spell cast by the gauntlets, you have resistance to cold, fire, lightning, and thunder damage.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Titanstone Knuckles",
    description:
      "While wearing these gauntlets my Strength score is 22 and my weapon attacks deal double damage to objects and structures.",
    scoresOverride: [22, 0, 0, 0, 0, 0],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isWeapon) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "double damage to structures and objects";
          }
        },
        "While wearing the Titanstone Knuckles, my weapon attacks deal double damage to objects and structures.",
      ],
    },
  },
  awakened: {
    name: "Awakened Titanstone Knuckles",
    description:
      "While wearing these gauntlets my Strength score is 24 and my weapon attacks deal double damage to objects and structures. Once per long rest, I can cast enlarge/reduce on myself (enlarge only) with a duration of 10 min.",
    scoresOverride: [24, 0, 0, 0, 0, 0],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isWeapon) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "double damage to structures and objects";
          }
        },
        "While wearing the Titanstone Knuckles, my weapon attacks deal double damage to objects and structures.",
      ],
    },
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per long rest",
        spells: ["enlarge/reduce"],
        selection: ["enlarge/reduce"],
        firstCol: "oncelr",
      },
    ],
    spellChanges: {
      "enlarge/reduce": {
        allowUpCasting: false,
        range: "Self",
        duration: "10 min",
        description: "I become enlarged (Str adv. +1d4 weapon dmg)",
        changes:
          "With the Titanstone Knuckles, I can cast Enlarge/Reduce on myself (enlarge only) with a duration of 10 min.",
      },
    },
    extraLimitedFeatures: [
      {
        name: "Enlarge/Reduce (Titanstone Knuckles)",
        usages: 1,
        recovery: "long rest",
      },
    ],
  },
  exalted: {
    name: "Exalted Titanstone Knuckles",
    description:
      "While wearing these gauntlets my Strength score is 26 and my weapon attacks deal double damage to objects and structures. Once per long rest, I can cast enlarge/reduce on myself (enlarge only) with a duration of 10 min and I have resistance to cold, fire, lightning, and thunder damage for the duration of the spell.",
    scoresOverride: [26, 0, 0, 0, 0, 0],
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (v.isWeapon) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "double damage to structures and objects";
          }
        },
        "While wearing the Titanstone Knuckles, my weapon attacks deal double damage to objects and structures.",
      ],
    },
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per long rest",
        spells: ["enlarge/reduce"],
        selection: ["enlarge/reduce"],
        firstCol: "oncelr",
      },
    ],
    spellChanges: {
      "enlarge/reduce": {
        allowUpCasting: false,
        range: "Self",
        duration: "10 min",
        description: "I become enlarged (Str adv. +1d4 weapon dmg)",
        changes:
          "With the Titanstone Knuckles, I can cast Enlarge/Reduce on myself (enlarge only) with a duration of 10 min.",
      },
    },
    extraLimitedFeatures: [
      {
        name: "Enlarge/Reduce (Titanstone Knuckles)",
        usages: 1,
        recovery: "long rest",
      },
    ],
  },
};

MagicItemsList["whisper"] = {
  name: "Whisper",
  source: [["TDCSR", 211]],
  type: "weapon (dagger)",
  rarity: "legendary",
  attunement: true,
  description: "",
  descriptionFull:
    "Forged with a mercurial metal accidentally drawn from the Realms Beyond, this dagger shimmers with an unsettling sourceless light. It was once wielded by Vax'ildan, a legendary champion of the Matron of Ravens. Two raven feathers are linked to its pommel as a memento of its former bearer." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "While Whisper is in a dormant state, you gain a +1 bonus to attack and damage rolls made with this magic weapon." +
    "\n   " +
    "Additionally, when you score a critical hit with this dagger, the target must succeed on a DC 13 Wisdom saving throw or become frightened of you for 1 minute. On a success, the target is immune to this effect for 24 hours." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When Whisper reaches an awakened state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +2. Additionally, when you hit with an attack using this dagger, the target takes an extra 1d6 psychic damage." +
    "\n" +
    "\u2022 The DC to resist being frightened from a critical hit increases to 15." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When Whisper reaches an exalted state, you gain the following benefits:" +
    "\n" +
    "\u2022 The weapon's bonus to attack and damage rolls increases to +3, and the extra psychic damage it deals increases to 1d8." +
    "\n" +
    "\u2022 The DC to resist being frightened from a critical hit increases to 17." +
    "\n" +
    "\u2022 When this dagger is used to make a ranged attack, you can choose to transform into shadow and merge with the blade as part of the action used to attack, teleporting to another location. If the attack hits, you appear in an unoccupied space of your choice within 5 feet of the target. If the attack misses, you appear where the GM determines the dagger lands (typically within 1d6 \u00D7 5 feet of the target). In either case, you appear with the dagger in your hand.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Whisper",
    description:
      "This dagger adds +1 to hit and damage. When I score a critical hit with it, the target makes a DC 13 Wis save or is frightened of me for 1 min; on a success, target is immune for 24 hr.",
    weaponsAdd: ["Dormant Whisper"],
    weaponOptions: {
      baseWeapon: "dagger",
      regExpSearch: /^(?=.*dormant)(?=.*whisper).*$/i,
      name: "Dormant Whisper",
      source: [["TDCSR", 211]],
      description:
        "Finesse, light, thrown; DC 13 Wis save on critical hit or frightened for 1 min",
      modifiers: [1, 1],
    },
  },
  awakened: {
    name: "Awakened Whisper",
    description:
      "This dagger adds +2 to hit and damage and deals an extra 1d6 psychic damage. When I score a critical hit with it, the target makes a DC 15 Wis save or is frightened of me for 1 min; on a success, target is immune for 24 hr.",
    weaponsAdd: ["Awakened Whisper"],
    weaponOptions: {
      baseWeapon: "dagger",
      regExpSearch: /^(?=.*awakened)(?=.*whisper).*$/i,
      name: "Awakened Whisper",
      source: [["TDCSR", 211]],
      description:
        "Finesse, light, thrown; +1d6 psychic damage; DC 15 Wis save on critical hit or frightened for 1 min",
      modifiers: [2, 2],
    },
  },
  exalted: {
    name: "Exalted Whisper",
    description:
      "This dagger adds +3 to hit and damage and deals an extra 1d8 psychic damage. When I score a critical hit with it, the target makes a DC 17 Wis save or is frightened of me for 1 min; on a success, target is immune for 24 hr. When thrown, I can teleport to the dagger's location; see third page.",
    weaponsAdd: ["Exalted Whisper"],
    weaponOptions: {
      baseWeapon: "dagger",
      regExpSearch: /^(?=.*exalted)(?=.*whisper).*$/i,
      name: "Exalted Whisper",
      source: [["TDCSR", 212]],
      description:
        "Finesse, light, thrown; +1d8 psychic damage; DC 17 Wis save on critical hit or frightened for 1 min",
      modifiers: [3, 3],
    },
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        note: [
          "When I throw Whisper, I can teleport, appearing near where it lands",
          "On a hit, I appear in an unoccupied space within 5 ft of the target",
          "On a miss, I appear within 1d6 \u00D7 5 ft of the target (at DM's discretion)",
          "In either case, I appear with the dagger in my hand",
        ],
      },
    ],
  },
};

MagicItemsList["wraps of dyamak"] = {
  name: "Wraps of Dyamak",
  source: [["TDCSR", 212]],
  type: "wondrous item",
  rarity: "legendary",
  attunement: true,
  prerequisite: "Requires attunement by a monk",
  prereqeval: function (v) {
    return classes.known.monk ? true : false;
  },
  description: "",
  descriptionFull:
    "Created and wielded by the ancient warrior-monk Dyamak, these thick strips of enchanted cloth are stained to appear dark crimson with blood of unknown origin. The current resting place of the wraps is unknown." +
    "\n" +
    toUni("Dormant") +
    "\n" +
    "When the Wraps of Dyamak are in a dormant state, you gain a +1 bonus to attack and damage rolls made with your unarmed strike while wearing them." +
    "\n   " +
    "In addition, when you finish a short or long rest, you gain a number of temporary hit points equal to your total number of ki points." +
    "\n" +
    toUni("Awakened") +
    "\n" +
    "When the Wraps of Dyamak reach an awakened state, they gain the following properties:" +
    "\n" +
    "\u2022 The bonus to attack and damage rolls with your unarmed strike increases to +2." +
    "\n" +
    "\u2022 You can cast the misty step spell from the wraps as a bonus action, vanishing in a cloud of crimson mist. This property of the wraps can't be used again until you finish a short or long rest, or until you score a critical hit with an unarmed strike against a hostile creature." +
    "\n" +
    toUni("Exalted") +
    "\n" +
    "\u2022 When the Wraps of Dyamak reach an exalted state, they gain the following properties:" +
    "\n" +
    "\u2022 The bonus to attack and damage rolls with your unarmed strike increases to +3." +
    "\n" +
    "\u2022 When you hit with an unarmed strike, you can choose to make the attack a ravenous strike. The target takes an extra 6d6 necrotic damage, and you regain hit points equal to the amount of necrotic damage dealt. This property of the wraps can't be used again until you finish a long rest, or until you score a critical hit with an unarmed strike against a hostile creature.",
  allowDuplicates: false,
  choices: ["Dormant", "Awakened", "Exalted"],
  dormant: {
    name: "Dormant Wraps of Dyamak",
    description:
      "These wraps add +1 to hit and damage to my unarmed strikes. When I finish a rest, I gain temp HP equal to my total Ki.",
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.baseWeaponName === "unarmed strike") {
            output.magic += 1;
          }
        },
        "The Wraps of Dyamak add +1 to hit and damage to my unarmed strikes.",
      ],
    },
  },
  awakened: {
    name: "Awakened Wraps of Dyamak",
    description:
      "These wraps add +2 to hit and damage to my unarmed strikes. When I finish a rest, I gain temp HP equal to my total Ki. I can cast misty step once, regaining the ability to do so after a rest or an unarmed strike critical hit.",
    calcChanges: {
      atkCalc: [
        function (fields, v, output) {
          if (v.baseWeaponName === "unarmed strike") {
            output.magic += 2;
          }
        },
        "The Wraps of Dyamak add +2 to hit and damage to my unarmed strikes.",
      ],
    },
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per short rest",
        spells: ["misty step"],
        selection: ["misty step"],
        firstCol: "oncesr",
      },
    ],
    extraLimitedFeatures: [
      {
        name: "Misty Step (Wraps of Dyamak)",
        usages: 1,
        recovery: "short rest",
      },
    ],
  },
  exalted: {
    name: "Exalted Wraps of Dyamak",
    description:
      "These wraps add +3 to hit and damage to my unarmed strikes. When I finish a rest, I gain temp HP equal to my total Ki. I can cast misty step once; I regain the ability to do so after a rest or an unarmed strike critical hit. When I hit with an unarmed strike, I can make it a ravenous strike; see third page.",
    calcChanges: {
      atkAdd: [
        function (fields, v) {
          if (
            v.baseWeaponName === "unarmed strike" &&
            /\brevenous\b/i.test(v.WeaponTextName)
          ) {
            fields.Description +=
              (fields.Description ? "; " : "") +
              "+6d6 necrotic damage, I regain HP equal to amount of necrotic damage";
          }
        },
        'If I include the word "Ravenous" in the name of an unarmed strike, it will be treated as a ravenous strike granted by the Wraps of Dyamak.',
      ],
      atkCalc: [
        function (fields, v, output) {
          if (v.baseWeaponName === "unarmed strike") {
            output.magic += 3;
          }
        },
        "The Wraps of Dyamak add +3 to hit and damage to my unarmed strikes.",
      ],
    },
    spellFirstColTitle: "Us",
    spellcastingBonus: [
      {
        name: "Once per short rest",
        spells: ["misty step"],
        selection: ["misty step"],
        firstCol: "oncesr",
      },
    ],
    extraLimitedFeatures: [
      {
        name: "Misty Step (Wraps of Dyamak)",
        usages: 1,
        recovery: "short rest",
      },
    ],
    toNotesPage: [
      {
        name: "Features",
        page3notes: true,
        additional: "1 \u00D7 per short rest",
        note: [
          "When I hit with an unarmed strike, I can make it a ravenous strike",
          "The target takes an extra 6d6 necrotic damage",
          "I regain HP equal to the amount of necrotic damage dealt this way",
          "I regain the ability to do so after a rest or an unarmed strike critical hit",
        ],
      },
    ],
  },
};

// Creatures
CreatureList["plainscow"] = {
  name: "Plainscow",
  source: [["TDCSR", 248]],
  size: 2,
  type: "Beast",
  alignment: "Unaligned",
  ac: 13,
  hp: 42,
  hd: [5, 10],
  speed: "40 ft",
  scores: [18, 8, 16, 2, 10, 6],
  damage_resistances:
    "bludgeoning, piercing, and slashing from nonmagical attacks",
  skills: {
    insight: 2,
  },
  senses: "",
  passivePerception: 10,
  challengeRating: "2",
  proficiencyBonus: 2,
  attacksAction: 1,
  attacks: [
    {
      name: "Hooves",
      ability: 1,
      damage: [2, 6, "bludgeoning"],
      range: "Melee (5 ft)",
      description:
        "Can be also used as a bonus action (see Trampling Charge trait)",
    },
  ],
  traits: [
    {
      name: "Trampling Charge",
      description:
        ". If the plainscow moves at least 20 feet straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the plainscow can make another attack with its hooves as a bonus action.",
    },
  ],
};

/*
 * Spells
 */

SpellsList["freedom of the waves"] = {
  name: "Freedom of the Waves",
  classes: ["paladin"],
  source: [["TDCSR", 176]],
  level: 3,
  school: "Conj",
  time: "1 a",
  range: "120 ft",
  components: "V,S,M",
  compMaterial: "A strand of wet hair",
  duration: "Instantaneous",
  save: "Str",
  description:
    "15-ft rad 10-ft high all crea 2d8 Bludg. dmg and knocked prone; save no dmg and not prone; see book",
  descriptionFull:
    "You conjure a deluge of seawater in a 15-foot-radius, 10-foot-tall cylinder centered on a point within range. This water takes the form of a tidal wave, a whirlpool, a waterspout, or another form of your choice. Each creature in the area must succeed on a Strength saving throw against your spell save DC or take 2d8 bludgeoning damage and fall prone. You can choose a number of creatures equal to your spellcasting modifier (minimum of 1) to automatically succeed on this saving throw." +
    "\n   " +
    "If you are within the spell's area, as part of the action you use to cast the spell, you can vanish into the deluge and teleport to an unoccupied space that you can see within the spell's area.",
};

SpellsList["freedom of the winds"] = {
  name: "Freedom of the Winds",
  classes: ["paladin"],
  source: [["TDCSR", 176]],
  level: 5,
  school: "Abjur",
  time: "1 a",
  range: "Self",
  components: "V,S,M",
  compMaterial: "A scrap of sailcloth",
  duration: "Conc, 10 min",
  description:
    "Gain 60-ft fly speed; adv. on checks vs. grappled and on saves vs. restrained/paralyzed; see book",
  descriptionFull:
    "Wind wraps around your body, tugging at your hair and clothing as your feet lift off the ground. You gain a flying speed of 60 feet. Additionally, you have advantage on ability checks to avoid being grappled, and on saving throws against being restrained or paralyzed. " +
    "\n   " +
    "When you are targeted by a spell or attack while this spell is in effect, you can use a reaction to teleport up to 60 feet to an unoccupied space you can see. If this movement takes you out of range of the triggering spell or attack, you are unaffected by it. This spell then ends when you reappear.",
};
