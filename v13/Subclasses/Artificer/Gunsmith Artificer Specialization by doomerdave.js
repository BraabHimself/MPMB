/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Artificer Specialization - Gunsmith
	Effect:     This file adds the Gunsmith as an artificer subclass
	Author:     doomerdave
	Code by:	Newbuu2
	Date:		2021-25-03 (sheet v13)
*/

var iFileName = "Gunsmith Artificer Specialization by doomerdave.js";

RequiredSheetVersion(13);

SourceList["DD:G"] = {
	name : "doomerdave's Gunsmith Artificer",
	abbreviation : "DD:G",
	group : "Homebrew",
	url : "https://www.gmbinder.com/share/-Mn8ONOqgqM4_8u00hZX",
	date : "2023/03/27"
};

AmmoList["thunder cannon rounds"] = {
    name: "Thunder Cannon Rounds",
    source : [["DD:G", 1]],
    weight: 0.015,
    icon: "Bullets",
    checks: [".Bullet"],
    display: 80,
    invName: "Bullets, Thunder Cannon",
  };

AddSubClass("artificer", "gunsmith", {
	regExpSearch : /^(?=.*gun)(?=.*smith)(?!.*wizard).*$/i,
	subname : "Gunsmith",
	fullname : "Gunsmith",
	source : [["DD:G", 1]],
	features : {
		"subclassfeature3" : {
			name : "Tools Proficiency",
			source : [["DD:G", 1]],
			minlevel : 3,
			description : " [proficient with smith's tools]",
			toolProfs : ["Smith's tools"],
			spellcastingExtra : ["guiding bolt", "hunter's mark", "branding smite", "scorching ray", "conjure barrage", "lightning arrow", "sickening radiance", "storm sphere", "conjure volley", "swift quiver"]
		},
		"subclassfeature3.1" : {
			name : "Thunder Cannon",
			source : [["DD:G", 1]],
			minlevel : 3,
			description : desc([
				"I craft a firearm known as a Thunder Cannon; I am proficient with it",
				"I can use it with Intelligence instead of Dexterity and use it as a spellcasting focus",
			]),
            weaponProfs : [false, false, ["thunder cannon"]],
            weaponsAdd : ["Thunder Cannon"],
            weaponOptions : {
                regExpSearch : /^thunder cannon$/i,
                name : "Thunder Cannon",
                source : [["DD:G", 1]],
                damage: [2, 6, "piercing"],
                range: "150/500 ft",
                list: "firearm",
                weight: 16,
                ability: 2,
				abilitytodamage : true,
                type: "Firearms",
                description : "Two-handed, loading",
                ammo: "thunder cannon rounds",
            },
            calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (What('Int Mod') > What('Dex Mod') && (/thunder/).test(v.baseWeaponName) && (/cannon/).test(v.baseWeaponName)) {
							fields.Mod = 4;
						};
					},
					"I can use my Intelligence modifier in place of my Dexterity modifier for attacks made with my Thunder Cannon."
				]
			}
		},
        "subclassfeature3.2" : {
			name : "Arcane Magazine",
			source : [["DD:G", 1]],
			minlevel : 3,
			description : desc([
				"I craft a magical container to store ammunition for my Thunder Cannon",
				"This magazine can hold up to 400 rounds, which are weightless within it",
				"I can create 80 rounds during a long rest, or 10 rounds during a short rest",
			]),
            additional : "requires smith's tools"
		},
        "subclassfeature3.3" : {
			name : "Thunder Shot",
			source : [["DD:G", 1]],
			minlevel : 3,
            description : desc([
                "Before an attack, I can expend a spell slot to empower my Thunder Cannon"
            ]),
            action : ["action", " (before attack)"],
            additional : "see 3rd page notes",
			toNotesPage : [{
				name : "Thunder Shot Features",
				page3notes : true,
				note : [
					"Before an attack, I can expend a spell slot to load my Thunder Cannon with a special round",
					"When I next deal damage this turn, it deals +2d8 thunder damage",
					"This increases by +1d8 for each spell slot level above 1st (+6d8 max)",
					"On a hit, the target makes a Con save becoming disoriented on a failure",
					"A disoriented creature has disadv. on Perception checks and Dex saves",
					"Attacks vs. a disoriented creature have advantage",
					"If I do not hit, I regain the spell slot expended to load the Thunder Cannon"
				]
			}]
		},
        "subclassfeature5" : {
			name : "Double Shot",
			source : [["DD:G", 2]],
			minlevel : 5,
            description : desc([
                "When taking the attack action, I can attack twice with my Thunder Cannon"
            ]),
            action : ['action', 'Thunder Cannon (2 attacks per action)'],
		},
		"subclassfeature9" : {
			name : "Modular Design",
			source : [["DD:G", 2]],
			minlevel : 9,
			description : desc([
                'Use the "Choose Feature" button to add a Thunder Cannon modification to the 3rd page'
            ]),
            additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 17 ? 1 : 2) + " modification" + (n < 17 ? "" : "s");
			}),
            extraname : "Modification",
            extrachoices : ["Adaptable Grip", "Bulwark Guard", "Crushing Axe", "Elemental Infuser", "Forceful Bayonet", "Precision Sight"],
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : (n < 17 ? 1 : 2);
			}),
            "adaptable grip" : {
				name : "Adaptable Grip",
				source : [["DD:G", 2]],
				description : desc([
                    "I don't suffer disadv. on ranged attacks within 5 ft of an enemy with my Thunder Cannon",
					"As a reaction when I trigger an attack of opportunity, I can retaliate",
					"I can make a ranged weapon attack vs. the attacking creature with my Thunder Cannon"
                ]),
				action : ["reaction", " (on opportunity attack)"]
			},
			"bulwark guard" : {
				name : "Bulwark Guard",
				source : [["DD:G", 2]],
				description : desc([
                    "In combat, I have half-cover from the direction I'm facing; choose direction on my turn",
					"As a reaction when targeted by a ranged attack, change the direction I'm facing"
                ]),
				action : ["reaction", " (change direction)"]
			},
			"crushing axe" : {
				name : "Crushing Axe",
				source : [["DD:G", 2]],
				description : desc([
                    "Thunder Cannon also counts as a simple melee weapon known as the Crushing Axe",
                ]),
				weaponProfs : [false, false, ["Crushing Axe"]],
				weaponsAdd : ["Crushing Axe"],
				weaponOptions : {
					regExpSearch : /^crushing axe$/i,
					name : "Crushing Axe",
					source : [["DD:G", 2]],
					damage: [1, 10, "slashing"],
					type : "Simple",
					range: "Melee",
					ability: 4,
					abilitytodamage : true,
					description : "On hit, use reaction to force target to make a Str save; target is knocked 5ft away and prone on a failure",
				},
				action : ["reaction", " (on Crushing Axe hit)"]
			},
			"elemental infuser" : {
				name : "Elemental Infuser",
				source : [["DD:G", 2]],
				description : desc([
                    "My Thunder Cannon deals extra damage equal to my proficiency bonus",
					"I chose the type acid/cold/fire/lightning/necrotic/radiant at the start of my turns",
					"On a ranged Thunder Cannon hit, I can detonate the round as a reaction",
					"Each creature within 5ft of the target makes a Dexterity save",
					"On a failure, a creature takes the damage from the originating attack"
                ]),
				action : ["reaction", " (on ranged Thunder Cannon hit)"]
			},
			"forceful bayonet" : {
				name : "Forceful Bayonet",
				source : [["DD:G", 2]],
				description : desc([
                    "Thunder Cannon also counts as a simple melee weapon known as the Forceful Bayonet",
                ]),
				weaponProfs : [false, false, ["Forceful Bayonet"]],
				weaponsAdd : ["Forceful Bayonet"],
				weaponOptions : {
					regExpSearch : /^forceful bayonet$/i,
					name : "Forceful Bayonet",
					source : [["DD:G", 2]],
					damage: [1, 10, "piercing"],
					type : "Simple",
					range: "Melee",
					ability: 4,
					abilitytodamage : true,
					description : "On hit, use reaction to force target to make a Str save; target is pushed up to 15ft away",
				},
				action : ["reaction", " (on Forceful Bayonet hit)"]
			},
			"precision sight" : {
				name : "Precision Sight",
				source : [["DD:G", 2]],
				description : desc([
                    "I score a critical hit with my ranged Thunder Cannon attacks on a roll of 19 and 20"
                ]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/thunder/).test(v.baseWeaponName) && (/cannon/).test(v.baseWeaponName)) {
								fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20';
								v.CritChance = 19;
							};
						},
						"My Thunder Cannon ranged attacks score a critical on a to hit roll of both 19 and 20.",
						19
					]
				}
			},
		},
		"subclassfeature15" : {
			name : "Thunder Blaster",
			source : [["DD:G", 2]],
			minlevel : 15,
			description : desc([
				"As a bonus action, I can apply a blast to a Thunder Cannon round; see Notes page",
			]),
            usages : "Proficiency bonus per ",
            usagescalc : "event.value = How('Proficiency Bonus');",
            recovery : "short rest",
			action : ["bonus action", " (see Notes page)"],
			toNotesPage : [{
				name : "Thunder Blaster Features",
				note : [
					"As a bonus action, I can grant a Thunder Cannon round with a blast effect",
					"When I choose a blast, I can choose to make the blast cause thunder damage, instead of the listed type",
					"During my turn, I can replace an attack with one of the following blasts:",
					"\u2022 Force Blast - When I fire this blast, rather than making an attack roll, I fire a wide blast of blunt force in a 30-ft cone in front of me. Each creature in that area makes a Dexterity save, taking 4d6 force damage on a failed save, or half as much on a success",
					"\u2022 Inferno Blast - When I fire this blast, rather than making an attack roll, I launch an explosive round from the gun at a point within the gun's normal range. The round detonates in a 20-ft radius sphere from its point of impact. Each creature in that area makes a Dexterity save, taking 4d6 fire damage on a failed save, or half as much on a success",
					"\u2022 Storm Blast - When I fire this blast, rather than making an attack roll, I cause the gun to unleash a bolt of lightning, 5-ft wide and 60-ft long. Each creature in that area makes a Dexterity save, taking 4d6 lightning damage on a failed save, or half as much on a success",
				]
			}]
		}
	}
});