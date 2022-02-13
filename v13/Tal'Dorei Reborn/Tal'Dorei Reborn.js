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
	date: "2022-01-18"
};

/*
* Subclasses
*/

//Contributions from NodHero
AddSubClass("barbarian", "juggernaut", {
	regExpSearch : /path of the juggernaut/i,
	subname : "Path of the Juggernaut",
	source : ["TDCSR", 165],
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Thunderous Blows",
			source : ["TDCSR", 165],
			minlevel : 3,
			description : desc([
				"When I hit a creature with a melee attack while raging, I can push them in any direction",
				"Huge or larger creatures make a Str save or pushed; DC 8 + Str mod + prof bonus"
			]),
			additional : levels.map(function(n) {
				return (n < 2 ? "" : (n < 10 ? "Up to 5ft push" : "Up to 10ft push"));
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + (classes.known.barbarian.level < 2 ? "" : (classes.known.barbarian.level < 10 ? "push creature up to 5 ft away" : "push creature up to 10 ft away"));
						}
					},
					"While raging, my melee attacks push creatures up to 5ft away in any direction on a hit. At 10th level I can push a creature up to 10 ft away in any direction. A Huge or larger creature must make a Strength save in order to not be pushed."
				]
			}
		},
        "subclassfeature3.1" : {
            name : "Spirit of the Mountain",
            source : ["TDCSR", 166],
            minlevel : 3,
            description : desc([
                "While raging I cannot be knocked prone nor moved along the ground against my will",
            ]),
                savetxt : { immune : ["prone/being moved on ground in rage"] }
        },
		"subclassfeature6" : {
			name : "Demolishing Might",
			source : ["TDCSR", 166],
			minlevel : 6,
			description : desc([
				"My melee attacks deal extra damage to constructs; double damage to objects/structures"
			]),
			additional : "1d8 extra to constructs",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.barbarian && classes.known.barbarian.level > 5 && v.isMeleeWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + '1d8 damage to constructs; double damage to objects/structures';
						}
					},
					"My melee attacks deal an additional 1d8 damage to constructs. My melee weapon attacks also deal double damage to objects and structures."
				]
			}
		},
		"subclassfeature6.1" : {
			name : "Resolute Stance",
			source : ["TDCSR", 166],
			minlevel : 6,
			description : desc([
				"At the start of my turn I can take up a defensive stance; ends at start of my next turn",
				"If I do, I can't be grappled; attacks vs have disadv.; attacks I make have disadv."
			]),
			additional : "no action required"
		},
		"subclassfeature10" : {
			name : "Hurricane Strike",
			source : ["TDCSR", 166],
			minlevel : 10,
			description : desc([
				"As a reaction, after pushing a creature at least 5 ft, I can leap to a space next to them",
				"The space must be unoccupied; costs no movement; doesn't provoke opportunity attacks",
				"If I do, the creature makes a Str save or is knocked prone; DC 8 + Str mod + prof bonus",
				"If I push a creature within 5 ft an ally, they can make a melee attack as a reaction"
			]),
			action : [["reaction"]]
		},
        "subclassfeature14" : {
            name : "Unstoppable",
            source : ["TDCSR", 166],
            minlevel : 14,
            description : desc([
                "While raging, my speed cannot be reduced and I can't be frightened/paralyzed/stunned",
                "If I am under one of the above conditions, I can still rage and such effects are suspended"
            ]),
            savetxt : { immune : ["frightened/paralyzed/stunned"] },
        }
	}
});

AddSubClass("bard", "college of tragedy", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*tragedy).*$/i,
	subname : "College of Tragedy",
	source : ["TDCSR", 167],
	features : {
		"subclassfeature3" : {
			name : "Poetry in Misery",
			source : ["TDCSR", 167],
			minlevel : 3,
			description : desc([
				"As a reaction when I/ally within 30 ft roll a 1 on a save/ability/attack, gain inspiration"
			]),
			action : ["reaction", " (1 rolled on save/ability/attack)"],
			additional : "regain 1 Bardic Inspiration"
		},
		"subclassfeature3.1" : {
			name : "Sorrowful Fate",
			source : ["TDCSR", 167],
			minlevel : 3,
			recovery : "short rest",
			usages : 1,
			description : desc([
				"When I or an ally forces a creature to make a save, I can change it to a Charisma save",
				"I expend a Bardic Inspiration die; on a failure, I roll the expended die",
				"They take psychic damage equal to the roll and are plagued with regret for 1 min",
				"They are compelled to utter dark, poetic final words if reduced to 0 HP during this time"
			])
		},
		"subclassfeature6" : {
			name : "Tale of Hubris",
			source : ["TDCSR", 167],
			minlevel : 6,
			action : ["reaction", " (critical hit suffered)"],
			description : desc([
				"I can use a reaction when a creature gets a critical hit on I or an ally within 60 ft",
				"I expend a Bardic Inspiration; attacker suffers weapon critical hits more often",
				"This effect lasts for 1 min or until target suffers a critical hit"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? "" : (n < 14 ? "18-20" : "17-20")) + " critical hit range";
			})
		},
		"subclassfeature6.1" : {
			name : "Impending Misfortune",
			source : ["TDCSR", 167],
			minlevel : 6,
			recovery : "short rest",
			usages : 1,
			description : desc([
				"When I make an attack/save, I can get a +10 bonus; next attack/save gets a -10 penalty",
				"If not used, the penalty disappears after a rest or I am reduced to 0 HP"
			])
		},
		"subclassfeature14" : {
			name : "Nimbus of Pathos",
			source : ["TDCSR", 168],
			minlevel : 14,
			recovery : "short rest",
			usages : 1,
			action : ["action", ""],
			description : desc([
				"As an action, I can touch a creature and grant it effects for 1 min:",
				" \u2022 +4 bonus to AC and advantage on attack rolls and saving throws",
				" \u2022 Weapon and spell attacks deal an extra 1d10 radiant damage",
				" \u2022 Suffers critical hits on a roll of 18-20",
				"When this effect ends, it immediately drops to 0 HP and is dying"
			])
		}
	}
});

AddSubClass("cleric", "blood domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*blood).*$/i,
	subname : "Blood Domain",
	source : ["TDCSR", 168],
	spellcastingExtra : ["false life", "sleep", "hold person", "ray of enfeeblement", "haste", "slow", "blight", "stoneskin", "dominate person", "hold monster"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["TDCSR", 169],
			minlevel : 1,
			description : desc([
				"I gain proficiency with martial weapons"
			]),
			weapons : [false, true]
		},
		"subclassfeature1.1" : {
			name : "Bloodletting Focus",
			source : ["TDCSR", 169],
			minlevel : 1,
			description : desc([
				"My damaging spells deal extra necrotic damage to creatures with blood",
				"The spell must be 1st level and up and have a duration of instantaneous"
			]),
			additional : "2 + spell level extra damage"
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Crimson Bond",
			source : ["TDCSR", 169],
			minlevel : 2,
			action : ["action", " (during bond)"],
			description : desc([
				"I can form a bond with a creature I can see or whose blood I have a sample of",
				"This bond lasts an hour and I must concentrate on it, as I would a spell",
				"While bonded, I can use an action to learn information about it or use its senses"
			]),
			additional : "See Notes",
			toNotesPage : [{
				name : "Channel Divinity: Crimson Bond",
				source : ["TDCSR", 168],
				popupName : "Blood Domain Channel Divinity: Crimson Bond",
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
					"A wave of unease passes over the target regardless of its save"
				])
			}]
		},
		"subclassfeature6" : {
			name : "Sanguine Recall",
			source : ["TDCSR", 169],
			minlevel : 6,
			usages : 1,
			recovery : "long rest",
			description : desc([
				"As an action, I can recover a number of 5th-level or lower spell slots",
				"I take 1d8 necrotic damage per spell slot level recovered; cannot be reduced in any way"
			]),
			additional : levels.map(function (n) {
				var lvls = Math.ceil(n / 2);
				return lvls + " level" + (lvls > 1 ? "s" : "") + " of spell slots";
			})
		},
		"subclassfeature6.1" : {
			name : "Channel Divinity: Blood Puppet",
			source : ["TDCSR", 169],
			minlevel : 6,
			action : ["action", ""],
			description : desc([
				"As an action, I can control a creature/corpse of a certain size within 60 ft that has blood"
			]),
			additional : levels.map(function (n) {
				if (n < 6) return "";
				return "Up to " + (n < 14 ? "Large" : "Huge") + "; See Notes";
			}),
			toNotesPage : [{
				name : "Channel Divinity: Blood Puppet",
				source : ["TDCSR", 169],
				popupName : "Blood Domain Channel Divinity: Blood Puppet",
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
					"This effect lasts for 1 min or until I lose concentration, like on a spell"
				])
			}]
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["TDCSR", 169],
			minlevel : 8,
			description : desc([
				"Once per turn, when I hit a creature with a weapon attack, I can do extra damage"
			]),
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 necrotic damage";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isSpell) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 necrotic damage';
						}
					},
					"Once per turn, I can have one of my weapon attacks that hit do extra necrotic damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Vascular Corruption Aura",
			source : ["TDCSR", 169],
			minlevel : 17,
			usages : 1,
			recovery : "long rest",
			action : ["action", ""],
			description : desc([
				"As an action, I can emit a 30 ft necrotic aura that causes nearby enemies' veins to burst",
				"Enemies entering the aura for the first time on a turn, or start a turn in it are damaged",
				"They take 3d6 necrotic damage from the aura if they have blood",
				"Additionally, the aura reduces any healing enemies with blood receive by half"
			])
		}
	}
});

AddSubClass("cleric", "moon domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(moon|lunar)).*$/i,
	subname : "Moon Domain",
	source : ["TDCSR", 169],
	spellcastingExtra : ["faerie fire", "silent image", "invisibility", "moonbeam", "hypnotic pattern", "major image", "greater invisibility", "hallucinatory terrain", "dream", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Clarity of Catha",
			source : ["TDCSR", 170],
			minlevel : 1,
			usages : "Prof. Bonus per ",
			usagescalc : "event.value = What('Proficiency Bonus'));",
			recovery : "long rest",
			description : desc([
				"As a reaction when a creature within 30 ft makes a Wis save, I can grant adv. on it"
			])
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Blessing of the Full Moon",
			source : ["TDCSR", 170],
			minlevel : 2,
			action : ["action", ""],
			description : desc([
				"As an action, I can grant a creature within 30 ft one of the following blessings:",
				"Blessing of the Watchful Moon (lasts 1 hour)",
				" \u2022 Movement speed increases by 10 ft",
				" \u2022 Advantage on Wisdom (Perception) checks involving smell",
				" \u2022 Advantage on Wisdom (Survival) checks made to track a creature",
				"Blessing of the Blood-Drenched Moon (lasts 10 min)",
				" \u2022 Adv. on attacks vs. a target if an ally isn’t incapacitated and within 5 ft of the target"
			])
		},
		"subclassfeature6" : {
			name : "Channel Divinity: Mind of Two Moons",
			source : ["TDCSR", 170],
			minlevel : 6,
			description : desc([
				"I can expend a use of my Channel Divinity to concentrate on a second spell",
				"I can only do so if both spells are on my list of Moon Domain spells",
				"I make Constitution saves to maintain concentration on them with disadvantage",
				"On a failure, I lose concentration on both spells"
			])
		},
		"subclassfeature8" : {
			name : "Empowered Cantrips",
			source : ["TDCSR", 171],
			minlevel : 8,
			description : desc([
				"I add my Wisdom modifier (minimum of 1) to the damage I deal with my cleric cantrips"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += Math.max(1, What('Wis Mod'));
						}
					},
					"My cleric cantrips get my Wisdom modifier (minimum of 1) added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("cleric") == -1 || spellObj.psionic || spellObj.level !== 0) return;
						if (spellKey == "shillelagh") {
							spellObj.description = spellObj.description.replace("1d8", "1d8+" + Math.max(1, What('Wis Mod')));
							return true;
						}
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis", true);
					},
					"My cleric cantrips get my Wisdom modifier (minimum of 1) added to their damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Eclipse of Ill Omen",
			source : ["TDCSR", 171],
			minlevel : 17,
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""],
			description : desc([
				"As a bonus action, I manifest a 60 ft radius of reddish, dim light around me",
				"Creatures in this area make saving throws with disadvantage",
				"I can choose any number of creatures to be unaffected by it when I create it",
				"It lasts while I concentrate, as if concentrating on a spell, for up to 1 minute",
				"Concentrating on this feature counts as concentrating on a Moon Domain spell",
				"Once per turn, I can curse a creature after dealing radiant damage to them",
				"The creature must be in the area of dim light when damaged in order to be cursed",
				"A creature cursed in this way has its speed halved and can’t regain HP",
				"The curse disappears when the dim light ends"
			])
		}
	}
});

AddSubClass("druid", "circle of the blighted", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*blight).*$/i,
	subname : "Circle of the Blighted",
	source : ["TDCSR", 171],
	features : {
		"subclassfeature2" : {
			name : "Defile Ground",
			source : ["TDCSR", 172],
			minlevel : 2,
			usages : 1,
			recovery : "short rest",
 			description : desc([
				"As a bonus action, I can blight land/water centered on a point within 60 ft",
				"The area has a 10 ft radius, which increases to 20 ft at 10th level",
				"The blight lasts for 1 min and is considered difficult terrain for my enemies",
				"Creatures on it take extra damage the first time it's damaged each turn by an attack",
				"As a bonus action, I can move this area of blight up to 30 ft"
			]),
			additional : levels.map(function(n) {
				return (n < 2 ? "" : (n < 10 ? "1d4 necrotic" : n < 14 ? "1d6 necrotic" : "1d8 necrotic"));
			}),
			action : [["bonus action", " (create)"], ["bonus action", " (move up to 30 ft)"]]
		},
		"subclassfeature2.1" : {
			name : "Blighted Shape",
			source : ["TDCSR", 172],
			minlevel : 2,
			description : desc([
				"I gain proficiency with Intimidation and my Wild Shape forms gain a +2 bonus to AC", // Wild shape page does not support modifications
				"My Wild Shape forms also gain 60 ft darkvision or add 60 ft if it already has it" // Wild shape page does not support modifications
			]),
			skills : ["Intimidation"]
		},
		"subclassfeature6" : {
			name : "Call of the Shadowseeds",
			source : ["TDCSR", 172],
			minlevel : 6,
			description : desc([
				"As a reaction when a creature is damaged on my Defiled Ground, I can summon an ally",
				"A blighted sapling is summoned if the damaged creature is not undead or a construct",
				"The sapling appears in an unoccupied space within 5 ft of the damaged creature",
				"When it appears, the sapling can attack any creature within 5 ft",
				"The sapling then acts on my initiative and obeys my verbal commands",
				"The sapling remains until its reduced to 0 HP, my next long rest, or I summon another"
			]),
			action : ["reaction", "(creature damaged in Defiled Ground)"],
			usages : "Prof. Bonus per ",
			usagescalc : "event.value = What('Proficiency Bonus'));",
			recovery : "long rest",
			creaturesAdd : [["Blighted Sapling"]],
			creatureOptions : [{
				name : "Blighted Sapling",
				source : ["TDCSR", 172],
				size : [3],
				type : "Plant",
				alignment : "",
				ac : "10+Prof",
				hp : 5,
				hd : ["", ""],
				speed : "30 ft",
				scores : [8, 13, 12, 4, 8, 3],
				damage_vulnerabilities : "fire",
				damage_resistances : "necrotic, poison",
				condition_immunities : " blinded, deafened, poisoned",
				passivePerception : 9,
				languages : "understands the languages of its creator but can't speak",
				senses : "blindsight 60 ft. (blind beyond this radius)",
				challengeRating : "1",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Claws",
					ability : 1,
					damage : [2, 4, "piercing"],
					range : "5 ft",
					description : "",
					modifiers : ["", "Prof"],
					abilitytodamage : false,
					useSpellMod : "druid"
				}],
				features : [{
					name : "Creator",
					description : "The blighted sapling obeys the commands of its creator and has the same proficiency bonus. It takes its turn immediately after its creator, on the same initiative count. The blighted sapling has a challenge rating equal to my proficiency bonus."
				}],
				traits : [{
					name: "Blighted Resilience (Circle of the Blighted 10)",
					minlevel : 10,
					description: "The blighted sapling gains immunity to necrotic and poison damage and to the poisoned condition.",
				}, {
					name: "Toxic Demise (Circle of the Blighted 10)",
					minlevel : 10,
					description:
						"The blighted sapling explodes when it is reduced to 0 HP. Each creature within 5 ft of the blighted sapling makes a Constitution save vs. my spell save DC or take necrotic damage based on the blighted sapling’s challenge rating:" + "\n" +
						" \u2022 CR 1/4 or lower - 1d4 necrotic damage" + "\n" +
						" \u2022 CR 1/2 - 1d6 necrotic damage" + "\n" +
						" \u2022 CR 1 or higher - A number of d8s of necrotic damage equal to the creature’s challenge rating" + "\n" +
						" \u2022 No CR - A number of d6s of necrotic damage equal to my proficiency bonus"
				},{
					name: "Multiattack (Circle of the Blighted 14)",
					minlevel : 14,
					description: "The blighted sapling makes two attacks with its claws.",
				}],
				minlevelLinked : ["druid"],
				header : "Sapling",
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known.druid) return;
						var drdLvl  = classes.known.druid.level;
						var drdLvl2 = 2 * drdLvl;
						HDobj.alt.push(drdLvl2);
						HDobj.altStr.push(" = 0 as a base\n + two times its creator's druid level (" + drdLvl2 + ")");
					},
					setAltHp : true
				}
			}]
		},
		"subclassfeature10" : {
			name : "Foul Conjuration",
			source : ["TDCSR", 172],
			minlevel : 10,
			description : desc([
				'Any beast, fey, or plant creatures I summon gain traits; See "Blighted Sapling"'
			]),
			action : ["action", " (explode summoned creature)"]
		},
		"subclassfeature14" : {
			name : "Incarnation of Corruption",
			source : ["TDCSR", 173],
			minlevel : 14,
			description : desc([
				"I gain a +2 bonus to AC and resistance to necrotic damage",
				"As a bonus action while on Defiled Ground, I can gain proficiency bonus temp HP"
			]),
			action : ["bonus action", " (in Defiled Ground)"],
			dmgres : ["Necrotic"],
			extraAC : {
				name : "Incarnation of Corruption",
				mod : 2,
				text : "I gain a +2 bonus to AC."
			}
		}
	}
});

//Original transcription by Smashman, updated by u/Newbuu2, updated by NodHero
AddSubClass("monk", "way of the cobalt soul", {
	regExpSearch: /^(?=.*\bcobalt)(?=.*\b(soul|spirit))((?=.*(warrior|monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname: "Way of the Cobalt Soul",
	source: [["TDCSR", 173]],
	features: {
		"subclassfeature3": {
			name: "Extract Aspects",
			source: [["TDCSR", 173]],
			minlevel: 3,
			description: "",
			toNotesPage : [{
				name : "Extract Aspects",
				source : ["TDCSR", 173],
				popupName : "Extract Aspects",
				page3notes : true,
				note : [
					"When I hit a creature with a Flurry of Blows attack, I can analyze it",
					"As a reaction when an analyzed target within reach misses me, I can retaliate",
					"I make an unarmed strike against it; this benefit lasts until my next rest",
					"Additionally, when I analyze a creature I learn all of its:",
					" Damage vulnerabilities, damage resistances, damage immunities, and condition immunities"
				]
			}],
			action : ["reaction", "Unarmed Strike (on analyzed creature miss)"],
			additional : "See 3rd page"
		},
		"subclassfeature6": {
			name: "Extort Truth",
			source: [["TDCSR", 174]],
			minlevel: 6,
			description: (typeA4 ? "" : desc(["If I hit a creature with an unarmed strike, I can spend 1 ki to compel it to tell the truth"])),
			toNotesPage : [{
				name : "Extort Truth",
				additional : "1 ki",
				source : ["TDCSR", 174],
				popupName : "Extort Truth",
				page3notes : true,
				note : [
				   "When I hit a creature with an unarmed strike, I can spend 1 ki to make it unable to lie",
				   "I can choose for the unarmed strike to deal no damage, imposing the effect without injury",
				   "The creature makes a Charisma save or it can't speak a deliberate lie",
				   "All Charisma checks against the creature are made with advantage",
				   "These effects last for 10 min and I know whether the creature saved or not",
				   "The creature is aware of this effect and can avoid answering, instead of telling a lie"
				]
			}],
			additional: "1 ki; See 3rd page"
		},
		"subclassfeature6.1": {
			name: "Mystical Erudition",
			source: [["TDCSR", 174]],
			minlevel: 6,
			description: desc([
				"At 6th, 11th, and 17th level gain a language and skill/expertise; See 3rd page"
			]),
			toNotesPage : [{
				name : "Mystical Erudition",
				source : ["TDCSR", 174],
				popupName : "Mystical Erudition",
				page3notes : true,
				note : [
					"At 6th, 11th, and 17th level gain a language and skill, or expertise if already proficient",
					"I can gain proficiency/expertise in Arcana, History, Investigation, Nature, or Religion"
				]
			}],
			languageProfs: [1],
			additional: levels.map(function (n) {
				if (n < 3) return '';
				var num = n < 11 ? 1 : n < 17 ? 2 : 3;
				return num + " language" + (n < 11 ? "" : "s") + " \u0026 " + num + " skill" + (n < 11 ? "" : "s");
			}),
			changeeval: function(level) {
				if (level[1] >= 11 && level[0] < 11) {
					processLanguages(true, "Monk (Way of the Cobalt Soul): Mystical Erudition 11", [1]);
				}
				else if (level[1] < 11 && level[0] >= 11) {
					processLanguages(false, "Monk (Way of the Cobalt Soul): Mystical Erudition 11", [1]);
				}

				if (level[1] >= 17 && level[0] < 17) {
					processLanguages(true, "Monk (Way of the Cobalt Soul): Mystical Erudition 17", [1]);
				}
				else if (level[1] < 17 && level[0] >= 17) {
					processLanguages(false, "Monk (Way of the Cobalt Soul): Mystical Erudition 17", [1]);
				}
			},
			extraname: "Mystical Erudition",
			extrachoices: ["Arcana Proficiency", "Arcana Expertise", "History Proficiency", "History Expertise", "Investigation Proficiency", "Investigation Expertise", "Nature Proficiency", "Nature Expertise", "Religion Proficiency", "Religion Expertise"],
			extraTimes: levels.map(function (n) { return n < 11 ? 1 : n < 17 ? 2 : 3; }),
			"arcana proficiency" : {
				name: "Arcana Proficiency", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Arcana") == -1; },
				skills: ["Arcana"]
			},
			"arcana expertise" : {
				name : "Arcana Expertise", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Arcana") !== -1; },
				skills : [["Arcana", "only"]]
			},
			"history proficiency" : {
				name: "History Proficiency", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return v.skillProfs.indexOf("History") == -1; },
				skills: ["History"]
			},
			"history expertise" : {
				name : "History Expertise", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("History") !== -1; },
				skills : [["History", "only"]]
			},
			"investigation proficiency" : {
				name: "Investigation Proficiency", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Investigation") == -1; },
				skills: ["Investigation"]
			},
			"investigation expertise" : {
				name : "Investigation Expertise", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Investigation") !== -1; },
				skills : [["Investigation", "only"]]
			},
			"nature proficiency" : {
				name: "Nature Proficiency", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Nature") == -1; },
				skills: ["Nature"]
			},
			"nature expertise" : {
				name : "Nature Expertise", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Nature") !== -1; },
				skills : [["Nature", "only"]]
			},
			"religion proficiency" : {
				name: "Religion Proficiency", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return v.skillProfs.indexOf("Religion") == -1; },
				skills: ["Religion"]
			},
			"religion expertise" : {
				name : "Religion Expertise", description : "",
				source: [["TDCSR", 174]],
				prereqeval : function(v) { return classes.known.monk && classes.known.monk.level >= 11 && v.skillProfs.indexOf("Religion") !== -1; },
				skills : [["Religion", "only"]]
			}
		},
		"subclassfeature11": {
			name: "Mind of Mercury",
			source: [["TDCSR", 174]],
			minlevel: 11,
			description: desc([
				"Once per turn, if I've used my reaction this round, I can spend 1 ki to take a reaction"
			]),
			action : ["reaction", " (1 Ki; 1/turn)"],
			additional: "1 ki; once per turn"
		},
		"subclassfeature17": {
			name: "Debilitating Barrage",
			source: [["TDCSR", 174]],
			minlevel: 17,
			description: desc([
				"When I hit a creature with an unarmed strike, I can use 3 ki to make it vulnerable"
			]),
			toNotesPage : [{
				name : "Debilitating Barrage",
				additional : "1 ki",
				source : ["TDCSR", 174],
				popupName : "Debilitating Barrage",
				page3notes : true,
				note : [
					"When I hit a creature with an unarmed strike, I can use 3 ki to make it vulnerable",
					"It gains vulnerability to a damage type of my choice",
					"This lasts for 1 min or until the end of a turn in which it has taken damage of that type",
					"If the creature has resistance to the type, it loses it for 1 min instead",
					"If the creature has immunity to the type it's unaffected",
					"A creature can only be affected once every 24 hours"
				]
			}],
			additional: "3 ki; See 3rd page"
		}
	}
});

AddSubClass("paladin", "oath of the open seas", {
	regExpSearch : /^(((?=.*(sea|pirate|swashbuckler))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))|((?=.*(sea|pirate|swashbuckler))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Oath of the Open Seas",
	source: [["TDCSR", 174]],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Marine Layer",
			source: [["TDCSR", 175]],
			minlevel : 3,
			description : desc([
				"As an action, I can surround myself with a 20 ft radius of heavily obscuring fog",
				"It lasts for 10 minutes, spreads around corners, moves with me, and cannot be dispersed",
				"I and creatures within 5 ft of me treat it as lightly obscured; can dismiss (no action " + (typePF ? "required" : "") + ")",
			]),
			action : ["action", ""],
			spellcastingExtra : ["create or destroy water", "expeditious retreat", "augury", "misty step", "call lightning", "freedom of the waves", "control water", "freedom of movement", "commune with nature", "freedom of the winds"]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Fury of the Tides",
			source: [["TDCSR", 175]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can empower my attacks to push creatures away from me for 1 min",
				"Once per turn, when I hit a creature with a weapon attack, I can push it 10 ft away",
				"If pushed into another creature or obstacle, they take Cha mod bludgeoning damage"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Aura of Liberation",
			source: [["TDCSR", 176]],
			minlevel : 7,
			description : desc([
				"While not incapacitated, creatures of my choice within range and I gain benefits:",
				" \u2022 We can't be grappled/restrained; ignore movement/attack penalties while underwater",
				" \u2022 If already grappled/restrained use 5 ft of movement to escape nonmagical restraints"
			]),
			additional : levels.map( function(n) {
				return (n < 7 ? "" : (n < 18 ? "10-foot aura" : "30-foot aura"));
			})
		},
		"subclassfeature15" : {
			name : "Stormy Waters",
			source: [["TDCSR", 176]],
			minlevel : 15,
			description : desc([
				"I can use my reaction to crash water on a creature that enters/exits my melee range",
				"It takes 1d12 bludgeoning damage and makes a Strength save or is knocked prone"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature20" : {
			name : "Mythic Swashbuckler",
			source: [["TDCSR", 176]],
			minlevel : 20,
			description : desc([
				"As an action, I channel the spirits of historic sea captains for 1 minute; See 3rd page"
			]),
			toNotesPage : [{
				name : "Mythic Swashbuckler Benefits",
				popupName : "Oath of the Open Seas: Mythic Swashbuckler",
				page3notes : true,
				note : [
					" \u2022 Climbing costs no additional movement; I have advantage on Strength (Athletics) checks",
					" \u2022 My attacks have advantage against a creature within 5 ft if no one else within 5 ft of me",
					" \u2022 I can take the Dodge action as a bonus action",
					" \u2022 I have advantage on Dexterity checks and Dexterity saves against seen effects"
				]
			}],
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});

var runchildGlyphOfAegisPreLvl6  = ["As a reaction when damaged, I can expend charged runes to reduce the damage I take", "I roll dice equal to the number of expended runes and reduce the damage by the total"];
var runchildGlyphOfAegisPostLvl6 = ["As an action, I can touch a creature and expend up to 3 charged runes to protect it for 1 hr", "The next time it's damaged, it rolls dice equal to the number of runes expended", "The damage it takes is reduced by total rolled", "A creature can have only one instance of the effect at a time"];

AddSubClass("sorcerer", "runechild", {
	regExpSearch : /runechild/i,
	subname : "Runechild",
	fullname : "Runechild",
	source: [["TDCSR", 176]],
	features : {
		"subclassfeature1" : {
			name : "Essence Runes",
			source: [["TDCSR", 177]],
			minlevel : 1,
			description : desc([
				"A number of essence runes appear on my body, which are invisible while inert",
				"If I spend sorcery points, an equal number of runes " + (typePF ? "become" : "are") + " charged at the end of my turn",
				"If I have 5 or more charged runes, I emit 5 ft of bright light and 5 ft of dim light",
				"Charged runes become inert after being spent or after a long rest"
			]),
			additional : levels.map(function (n) {
				return n + " essence rune" + (n > 1 ? "s" : "");
			}),
			action : ["bonus action", "Charge Runes"]
		},
		"subclassfeature1.1" : {
			name : "Runic Magic",
			source: [["TDCSR", 177]],
			minlevel : 1,
			description : desc([
				"I learn additional spells, which do not count towards the number of spell I can know",
				"Whenever I gain a sorcerer level, I can replace one of these with another of the same level",
				"It must be " + (typePF ? "an abjuration or transmutation" : "a transmutation/abjuration") + " spell on the sorcerer, wizard, or warlock spell list"
			]),
			spellcastingBonus : [{
				name : "Runic Magic (1st-level)",
				"class" : ["sorcerer", "warlock", "wizard"],
				school : ["Abjur", "Trans"],
				level : [1, 1],
				firstCol : "RM",
				extraspells : ["longstrider", "protection from evil and good"],
				selection : ["longstrider", "protection from evil and good"],
				times : 2
			}, {
				name : "Runic Magic (2nd-level)",
				"class" : ["sorcerer", "warlock", "wizard"],
				school : ["Abjur", "Trans"],
				level : [2, 2],
				firstCol : "RM",
				extraspells : ["lesser restoration", "protection from poison"],
				selection : ["lesser restoration", "protection from poison"],
				times : levels.map(function (n) { return n < 3 ? 0 : 2; })
			}, {
				name : "Runic Magic (3rd-level)",
				"class" : ["sorcerer", "warlock", "wizard"],
				school : ["Abjur", "Trans"],
				level : [3, 3],
				firstCol : "RM",
				extraspells : ["glyph of warding", "magic circle"],
				selection : ["glyph of warding", "magic circle"],
				times : levels.map(function (n) { return n < 5 ? 0 : 2; })
			}, {
				name : "Runic Magic (4th-level)",
				"class" : ["sorcerer", "warlock", "wizard"],
				school : ["Abjur", "Trans"],
				level : [4, 4],
				firstCol : "RM",
				extraspells : ["death ward", "freedom of movement"],
				selection : ["death ward", "freedom of movement"],
				times : levels.map(function (n) { return n < 7 ? 0 : 2; })
			}, {
				name : "Runic Magic (5th-level)",
				"class" : ["sorcerer", "warlock", "wizard"],
				school : ["Abjur", "Trans"],
				level : [5, 5],
				firstCol : "RM",
				extraspells : ["greater restoration", "telekinesis"],
				selection : ["greater restoration", "telekinesis"],
				times : levels.map(function (n) { return n < 9 ? 0 : 2; })
			}]
		},
		"subclassfeature1.2" : {
			name : "Glyph of Aegis",
			source: [["TDCSR", 177]],
			minlevel : 1,
			description : desc(runchildGlyphOfAegisPreLvl6),
			additional : levels.map(function (n) {
				return (n < 14 ? "d6" : "d8") + (n < 6 ? "" : "; See 3rd page");
			})
		},
		"subclassfeature6" : {
			name : "Sigilic Augmentation",
			source: [["TDCSR", 177]],
			minlevel : 6,
			description : desc([
				"As a reaction, I can spend a charged rune to gain adv. on a Str/Dex/Con check or save"
			]),
			action : [
				["action"  , "Grant Glyph of Aegis (max 3 charged runes)"],
				["reaction", " (Str/Dex/Con check)"],
				["reaction", " (Str/Dex/Con save)"]
			],
			usages : 1,
			recovery : "long rest",
			additional : "Advantage on save",
			toNotesPage : [{
				name : "Glyph of Aegis",
				source: [["TDCSR", 177]],
				popupName : "Glyph of Aegis",
				page3notes : true,
				note : runchildGlyphOfAegisPostLvl6
			}],
		},
		"subclassfeature6.1" : {
			name : "Manifest Inscriptions",
			source: [["TDCSR", 177]],
			minlevel : 6,
			description : desc([
				"As an action, I can expend one charged rune to reveal hidden/invisible arcane things",
				"Arcane traps/marks/runes/wards/sensors/glyphs within 60 ft are revealed for 1 min",
				"I have advantage on Arcana checks to discern their nature",
				"They glow dim light in 5 ft and I can read any revealed writing"
			]),
			action : [["action", ""]]
		},
		"subclassfeature14" : {
			name : "Runic Torrent",
			source: [["TDCSR", 177]],
			minlevel : 14,
			description : desc([
				"When I cast a spell, I can expend 2 charged runes to make it deal force damage instead",
				"All targeted/in area of the spell make a Str save or knocked prone/pushed 15 ft away"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature18" : {
			name : "Arcane Exemplar",
			source: [["TDCSR", 177]],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can expend a charged rune to assume my exemplar form:",
				" \u2022 I gain resistance to damage dealt by spells and a flying speed of 60 ft",
				" \u2022 Creatures have disadvantage against my sorcerer spells",
				" \u2022 Whenever I cast a spell of 1st level or higher, I regain HP equal to its level",
				(typePF ? "This form" : "It") + " lasts until the end of my turn; I can expend another rune to extend its duration",
				"When this form ends, I am stunned until the end of my next turn"
			]),
			action : ["bonus action", " (1 charged rune)"],
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("wizard","blood magic", {
	regExpSearch : /^(?=.*wizard)(?=.*blood)(?=.*mag(i|ic|e)).*$|hemocraft/i,
	subname : "Blood Magic",
	source: [["TDCSR", 178]],
	features : {
		"subclassfeature2" : {
			name : "Blood Channeling",
			source: [["TDCSR", 178]],
			minlevel : 2,
			description : desc([
				"I can use my body as an arcane focus as long as my HP are are below my max HP",
				"When casting a wizard spell with a costly material component, I can forego it",
				"I take 1d10 necrotic damage per 50g of its cost (min 1d10), which cannot be reduced",
				"If it reduces me to 0 HP, the spell fails, but no spell slot is expended"
			])
		},
		"subclassfeature2.1" : {
			name : "Sanguine Burst",
			source: [["TDCSR", 179]],
			minlevel : 2,
			description : desc([
				"When I cast a spell of 1st-level or higher, I can spend my vitality to empower it",
				"I take necrotic damage equal to the spell's level, which cannot be reduced",
				"I can reroll a number of damage dice up to my Intelligence mod (min 1)",
				"I must use the new rolls"
			])
		},
		"subclassfeature6" : {
			name : "Bond of Mutual Suffering",
			source: [["TDCSR", 179]],
			minlevel : 6,
			description : desc([
				"As a reaction when attacked, I can share my pain with the attacker",
				"The attacker takes damage equal to the damage I took",
				"I cannot use this against constructs or undead"
			]),
			action : [["reaction", " (when attacked)"]],
			usages : levels.map(function(n) {
				return n < 14 ? 1 : 2;
			}),
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Glyph of Hemorrhaging",
			source: [["TDCSR", 179]],
			minlevel : 10,
			description : desc([
				"When I damage a creature with a spell, I can curse it for 1 minute",
				"While cursed, it takes an extra 1d6 necrotic damage when hit by an attack",
				"The creature makes a Con save at the end of each of its turns to end the curse"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Thicker than Water",
			source: [["TDCSR", 179]],
			minlevel : 14,
			description : desc([
				"Whenever I regain HP via magic, I regain extra HP equal to my proficiency bonus",
				"While concentrating on a spell, I am resistant to nonmagical " + (typePF ? "bludg/piercing/slashing" : "bludg/slash/pierc damage") + " damage"
			]),
			additional : levels.map( function(n) {
				if (n < 14) return "";
				return (n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6) + " extra HP regained";
			})
		}
	}
});

/*
* Backgrounds
*/

BackgroundList["ashari"] = {
	regExpSearch : /^(?=.*pyrah)(?=.*ashari).*$/i,
	name : "Ashari, Pyrah",
	source: [["TDCSR", 180]],
	skills : ["Nature"],
	skillstxt : "Nature and choose one from Arcana or Survival",
	languageProfs : ["Ignan"],
	toolProfs : ["Herbalism Kit"],
	gold : 10,
	equipright : [
		["Traveler's clothes", "", 4],
		["A staff carved with symbols of my tribe", "", 4],
		["Belt pouch (with coins)", "", 1],
		["Herbalism Kit", "", 3],
	],
	feature : "Elemental Harmony (Pyrah)",
	trait : [
		"I like to keep my hands busy, no matter where I am.",
		"I love to explore new places and meet new people",
		"I meditate at dawn each day—and I can’t stand it when my routine is interrupted.",
		"I like noticing patterns in the world around me, whether or not they mean anything.",
		"I don’t let anything—or anyone—stand in the way of my mission.",
		"I’m a plain talker, even with people who outrank me.",
		"I’ve always got some of my native element with me in some form. (This might be modeling clay, pure water, special burning incense, or a bottled cloud.)",
		"I talk with everyone like I’ve known them all my life. Because most people I know, I have known all my life!"
	],
	ideal : [
		["Destiny", "Destiny: I believe that everyone has a role to play. Now I just have to find mine. (Neutral)"],
		["Community", "Community: It’s important to surround yourself with people you can count on, and who will support you. (Good)"],
		["Knowledge", "Knowledge: I want to learn everything I can about the Elemental Planes—and maybe even visit them myself. (Neutral)"],
		["Freedom", "Freedom: I don’t care what anyone says. Even if it causes problems, the elements must be free. And so should I. (Chaotic)"],
		["Structure", "Structure: The elements are in harmony when they are free to act as they will, within the safe boundaries set by the Ashari. People are much the same. (Lawful)"],
		["Virtuous Cycle", "Virtuous Cycle: If I see someone who needs help, I feel compelled to assist them. Surely they’ll return the favor someday! (Good)"],
	],
	bond : [
        "I have a cousin in another Ashari tribe whom I’ve never met, but someday I want to visit my extended family",
        "The leader of my tribe thinks I could be their successor, but I worry that I don’t have enough experience to lead my people.",
        "A mysterious person killed a member of my family. I’ve left home to discover who the killer was—and to seek vengeance.",
        "My older sibling set out on their Aramante a year ago, and I haven’t seen them since.",
        "When I was a baby, a giant eagle brought me to Zephrah. I love my family, but I often wonder who my birth parents are.",
        "I trust my animal friends more than any humanoid ally."
    ],
	flaw : [
        "Big cities are overwhelming. I get nervous when surrounded by people I don’t know.",
        "I know all too well that elemental power is dangerous—but I like playing around with it anyway.",
        "I get surly if I go too long without being in contact with my native element.",
        "I think the mission of my people is a fool’s errand. They should abandon isolation, let the elements be, and enjoy the pleasures of the world!",
        "I can’t stand it when people say one thing and mean another! Just say what you mean!",
        "Ugh, I know it’s not right, but I can’t help but look down on people who can’t manipulate the elements. It’s not like it’s hard!"
    ]
};

AddBackgroundVariant("ashari", "terrah", {
	regExpSearch : /^(?=.*terrah)(?=.*ashari).*$/i,
	name : "Ashari, Terrah",
	feature : "Elemental Harmony (Terrah)",
	languageProfs : ["Terran"],
	source: [["TDCSR", 180]]
});

AddBackgroundVariant("ashari", "vesrah", {
	regExpSearch : /^(?=.*vesrah)(?=.*ashari).*$/i,
	name : "Ashari, Vesrah",
	feature : "Elemental Harmony (Vesrah)",
	languageProfs : ["Aquan"],
	source: [["TDCSR", 180]]
});

AddBackgroundVariant("ashari", "zephrah", {
	regExpSearch : /^(?=.*zephrah)(?=.*ashari).*$/i,
	name : "Ashari, Zephrah",
	feature : "Elemental Harmony (Zephrah)",
	languageProfs : ["Auran"],
	source: [["TDCSR", 180]]
});

BackgroundFeatureList["elemental harmony (pyrah)"] = {
    description: "As an action, I can instantaneously create and control a burst of flame small enough to light a candle, a torch, or a small campfire. Alternatively, I snuff out a flame of the same size.",
    source: [["TDCSR", 180]],
	action : ["action", ""]
};

BackgroundFeatureList["elemental harmony (terrah)"] = {
    description: "As an action, I can instantaneously create a small rock no larger than a gold coin. The rock appears in my hand, then turns to dust after 1 minute.",
    source: [["TDCSR", 180]],
	action : ["action", ""]
};

BackgroundFeatureList["elemental harmony (vesrah)"] = {
    description: "As an action, I can instantaneously create enough hot or cold water to fill a small drinking vessel.",
    source: [["TDCSR", 180]],
	action : ["action", ""]
};

BackgroundFeatureList["elemental harmony (zephrah)"] = {
    description: "As an action, I can create an instantaneous puff of wind strong enough to blow papers off a desk or mess up someone’s hair.",
    source: [["TDCSR", 180]],
	action : ["action", ""]
};

BackgroundList["clasp member"] = {
	regExpSearch : /^(?=.*clasp)(?=.*member).*$/i,
	name : "Clasp Member",
	source: [["TDCSR", 181]],
	skills : ["Deception"],
	skillstxt : "Deception and choose one from Sleight of Hand or Stealth",
	languageProfs : ["Thieves' Cant"],
	toolProfs : [["Disguise kit, forgery kit, or thieves' tools", 1]],
	gold : 10,
	equipleft : [
		["Set of tools with which I'm proficient", "", ""]
	],
	equipright : [
		["Inconspicuous common clothes", "", 4],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "A Favor in Turn",
	trait : [
		"What’s life without risk? I’m always willing to take a risk if the reward seems worth it.",
		"I only show my emotions around people I really trust.",
		'I don’t need friends; I need allies. When I do make "friends," I only consider what they can do for me.',
		"I look for simple solutions. The world’s full of tough problems, but a well-placed knife is a one-size-fits-all answer.",
		"Money talks. I don’t. We’ve got an efficient relationship.",
		"I used to have one rule—don’t get involved in other people’s problems. Why are things so complicated now?",
		"Crime is a game, and I play to win. I have no sympathy for players who don’t get that.",
		"This organization has a lot of folks who cling to ugly, brutal practices. I’m not like that. I’m a professional, and professionals have standards."
	],
	ideal : [
		["By Any Means", "By Any Means: I complete jobs. Collateral damage isn’t my problem. (Chaotic)"],
		["Ambition", "Ambition: I will climb to the top of the ladder. Everything I do is a stepping-stone to a Spireling’s position. (Neutral)"],
		["Decisiveness", "Decisiveness: It’s important to make up your mind so you can act swiftly and without delay. (Neutral)"],
		["Honor", "Honor: There’s room in the Clasp for both good and evil. Every day, I awake and choose to do what’s right. (Good)"],
		["Family", "Family: The Clasp is family. Anything that’s good for the family is good for me. (Lawful)"],
		["Self-Interest", "Self-Interest: There are too many bleeding hearts in the Clasp these days. Doing the right thing means doing the thing that makes my life better. (Evil)"],
	],
	bond : [
        "I’d do anything—anything—to protect my comrades.",
        "I’ll always be grateful to the Spireling who took me in when I was an orphaned kid.",
        "I was inspired to join the Clasp by the stories my parents told of being saved from the Chroma Conclave’s attack on Emon. I can look past the organization’s flaws.",
		"I was nearly killed by the Myriad. If the Clasp is the enemy of those villains, then the Clasp is my friend.",
        "I’ve got family back in the old town who are counting on me for money. They don’t know how I get it, but they don’t need to know.",
        "I joined the Clasp to become rich, powerful, and beloved. That’s all there is to it."
    ],
	flaw : [
        "I’m hopeless at organizing my belongings, and I’m always losing things.",
        "I get bored whenever a plan is going too smoothly. A win is always more fun when it’s by the skin of my teeth!",
        "I’ve seen Spirelings walk out among cheering crowds of thousands. Gods, I wish that were me. I need that to be me.",
        "I’m rubbish with money, and never seem to leave town with a full purse. Keeps me coming back to the life, I suppose.",
        "I can’t work with shoddy, makeshift thieves’ tools. I need everything involving my work to be perfect.",
        "Any slight against me, no matter how small, is cause for revenge."
    ]
};

AddBackgroundVariant("clasp member", "myriad operative", {
	regExpSearch : /^(?=.*myriad)(?=.*operative).*$/i,
	name : "Myriad Operative",
	feature : "A Favor in Turn",
	source: [["TDCSR", 182]],
});

BackgroundFeatureList["a favor in turn"] = {
    description: "I can call in a favor from my organization when close enough to syndicate activity. This favor can take on any form, per DM approval. Eventually, the favor will be called in for repayment. Refusing to repay will result in my death. The DM determines the form of repayment, which should be proportionate to the favor bestowed - or that I'm paid for a service that exceeds the scope of repayment.",
    source: [["TDCSR", 180]]
};

BackgroundList["lyceum scholar"] = {
	regExpSearch : /^(?=.*lyceum)(?=.*scholar).*$/i,
	name : "Lyceum Scholar",
	source: [["TDCSR", 183]],
	skills : ["Deception"],
	skillstxt : "Choose two from Arcana, History, or Persuasion",
	languageProfs : [2],
	toolProfs : [["Disguise kit, forgery kit, or thieves' tools", 1]],
	gold : 10,
	equipleft : [
		["Small pouch, with:", "", 1],
		["Small knife", "", 0.25],
		["Quill", "", ""],
		["Ink", "", ""],
		["Folded parchment", "", ""],
		["Penknife", "", ""]
	],
	equipright : [
		["Fine clothes", "", 6],
		["Student uniform", "", 3],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Academic Requisition",
	trait : [
		"I can’t believe I’m here! At the Alabaster Lyceum. Oh, gods, I’ve dreamed of this my whole life, and now I’m here!",
		"I can’t believe I squandered all the opportunities I had at school. I was supposed to be learning good stuff, but I wasted it all daydreaming about fighting monsters.",
		"Every night at school, I’d knock back a couple of meads and read with my pals! Just a bunch of nerds having fun, and I loved it.",
		"Everyone at school was such a stick in the mud. Dressing the same, listening to the same bards…ugh, it’s sad. Just be yourself.",
		"I’m happiest when I’ve got my little party with me. At school, it was like we were a squad of heroes, slaying projects like monsters.",
		"I’d really rather you didn’t bother me. Can’t you see I’m studying here?",
		"I don’t care. I just don’t care about it all. The dates I had to memorize, the formulae I learned... I just want to run away and live!",
		"I’m just…tired. All the time. Oh, adventuring, sure, that’s fine, as long as I can find time to... nap... goodnight."
	],
	ideal : [
		["Preparedness", "Preparedness: I can’t go out into the world unless I know what I’m up against. Study first, act later. (Neutral)"],
		["Stardom", "Stardom: Having a team is good and all, but you can’t win a game of ball without the star charger, and you know that’s me. (Evil)"],
		["Individuality", "Individuality: The world keeps us down by trying to put us all into little boxes. I’m tired of living in my box, and I don’t care what you think about it. (Chaotic)"],
		["Purpose", "Purpose: I study because there are things I need to know. I’ll find my place in the world, and I’ll make the world better. (Good)"],
		["Code of Conduct", "Code of Conduct: The student code is there to benefit all students, you know. It’s the same for laws! (Lawful)"],
		["Recreation", "Recreation: All this studying crap wasn’t worth anything if you weren’t partying when you were done. Meet me down at the tavern, okay? (Chaotic)"],
	],
	bond : [
        "I came to the Lyceum with no one, but I fell in love with the city of Emon. I’ve finally found a place that feels like home!",
        "Most of my professors drove me to frustration, but there’s one who was kind and wise. I know they’ll always have my back.",
        "My family saved every copper piece to give me the opportunities I have now. I can’t let them down.",
		"I came to the Lyceum with a childhood friend, but we’ve long been drifting apart.",
        "Discovery is the only thing that matters to me. The topic doesn’t matter. Books keep me company on my loneliest days.",
        "The Lyceum is my life. I’d give up anything—everything—to protect it from harm."
    ],
	flaw : [
        "The Lyceum taught me to never want to leave my room. The campus was so huge, and the crowds were so horrible.",
        "You think you’re so great just because you’ve got muscles, and endurance, and…shut up! Read a book sometime!",
        "Huh? What? Sorry, I was thinking about a test I need to retake when I get back to school...",
        "I spent too much time studying. Now I don’t have any friends.",
        "If you don’t match my aesthetic, I’m not interested in you. We can work together, but we won’t be friends. Got it?",
        "I’m always striving for perfection. I got top of my class, sure, but only with a 98 average. And that’s. Not. Perfect."
    ]
};

BackgroundFeatureList["academic requisition"] = {
    description: "Whenever I'm at a major academic institution, I can requisition any set of tools. These tools are magically marked and will sound an alarm if removed from the premises. I also receive a 25 percent discount for services such as spellcasting from members of the Alabaster Lyceum or related institutions.",
    source: [["TDCSR", 184]]
};

/*
* Spells
*/

SpellsList["freedom of the waves"] = {
	name : "Freedom of the Waves",
	classes : ["paladin"],
	source: [["TDCSR", 176]],
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "A strand of wet hair",
	duration : "Instantaneous",
	save : "Str",
	description : "15-ft rad 10-ft high all crea 2d8 Bludg. dmg and knocked prone; save no dmg and not prone; see book",
	descriptionFull : "You conjure a deluge of seawater in a 15-foot-radius, 10-foot-tall cylinder centered on a point within range. This water takes the form of a tidal wave, a whirlpool, a waterspout, or another form of your choice. Each creature in the area must succeed on a Strength saving throw against your spell save DC or take 2d8 bludgeoning damage and fall prone. You can choose a number of creatures equal to your spellcasting modifier (minimum of 1) to automatically succeed on this saving throw." + "\n   " + "If you are within the spell’s area, as part of the action you use to cast the spell, you can vanish into the deluge and teleport to an unoccupied space that you can see within the spell’s area."
};

SpellsList["freedom of the winds"] = {
	name : "Freedom of the Winds",
	classes : ["paladin"],
	source: [["TDCSR", 176]],
	level : 5,
	school : "Abjur",
	time : "1 a",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A scrap of sailcloth",
	duration : "Conc, 10 min",
	description : "Gain 60-ft fly speed; adv. on checks vs. grappled and on saves vs. restrained/paralyzed; see book",
	descriptionFull : "Wind wraps around your body, tugging at your hair and clothing as your feet lift off the ground. You gain a flying speed of 60 feet. Additionally, you have advantage on ability checks to avoid being grappled, and on saving throws against being restrained or paralyzed. " + "\n   " + "When you are targeted by a spell or attack while this spell is in effect, you can use a reaction to teleport up to 60 feet to an unoccupied space you can see. If this movement takes you out of range of the triggering spell or attack, you are unaffected by it. This spell then ends when you reappear."
};