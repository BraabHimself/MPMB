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
				"If I do, the creature makes a Strength save or is knocked prone",
				"If I push a creature within 5 ft an ally, they can make a melee attack as a reaction"
			]),
			additional : "DC 8 + Str mod + prof bonus",
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
				"As a reaction, gain inspiration when I or an ally within 30 ft roll a 1 on a save/ability/attack"
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
				"When I make an attack/save, I can gain a +10 bonus; next attack/save gains a -10 penalty",
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
	spellcastingExtra : ["false life", "sleep", "hold peson", "ray of enfeeblement", "haste", "slow", "blight", "stoneskin", "dominate person", "hold monster"],
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
				"As an action, I can trade vitality for expended spell slots",
				"The spell slots can have a combined level equal to or less than half your cleric level (rounded up), and none of the slots can be 6th level or higher",
				"While bonded, I can use an action to learn information about it or use its senses"
			])
		},
		"subclassfeature6.1" : {
			name : "Channel Divinity: Blood Puppet",
			source : ["TDCSR", 169],
			minlevel : 2,
			action : ["action", ""],
			description : desc([
				"As an action, attempt to control a creature/corpse within 60 ft that has blood",
				"I can command ",
			]),
			additional : levels.map(function (n) {
				if (n < 6) return "";
				return (n < 14 ? "Large" : "Huge") + " or smaller; See Note";
			})
			toNotesPage : [{
				name : "Channel Divinity: Blood Puppet",
				source : ["TDCSR", 168],
				popupName : "Blood Domain Channel Divinity: Blood Puppet",
				note: desc([
					""
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
				atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 radiant damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra radiant damage."]
			}
		},
		"subclassfeature17" : {
			name : "Indomitable Defense",
			source : ["UA:CDD", 3],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			action : ["action", " (transfer)"],
			description : "\n   " + "I gain resistance to two of: bludgeoning, necrotic, piercing, radiant, or slashing damage" + "\n   " + "Whenever I finish a short or long rest, I can change the damage types chosen" + "\n   " + "As an action, I can transfer both resistances to one creature I touch" + "\n   " + "As a bonus action, I can transfer the resistances back to myself" + "\n   " + "Otherwise, the creature keeps this resistance until the end of my next short or long rest",
			eval : "AddAction('bonus action', 'Indomitable Defense (return)', 'Cleric (Protection Domain)');",
			removeeval : "RemoveAction('bonus action', 'Indomitable Defense (return)');"
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
					"If I hit a creature with a Flurry of Blows attack, it is analyzed until my next rest. I learn its",
					"damage vulnerabilities/resistances/immunities and condition immunities. If an analyzed ",
					"target misses me with an attack, I can use my reaction to make an unarmed strike against it",
				]
			}],
			action : ["reaction", "Unarmed Strike (with analyzed creature miss)"],
			additional : "See 3rd page notes"
		},
		"subclassfeature6": {
			name: "Extort Truth",
			source: [["TDCSR", 174]],
			minlevel: 6,
			description: (typeA4 ? "" : desc(["If I hit a creature with an unarmed strike, I can spend 1 ki to compel it to tell the truth"])),
			toNotesPage : [{
				name : "Extort Truth",
				source : ["TDCSR", 174],
				popupName : "Extort Truth",
				page3notes : true,
				note : [
				   "If I hit a creature with an unarmed strike (can chose to deal no damage), I can spend 1 ki to",
				   "force it to make a Cha save. I know if it failed. If failed, the creature can't lie for 10 minutes",
				   "and all Charisma checks directed at target have advantage. The target is aware of the effect",
				]
			}],
			additional: "1 ki point; See 3rd page notes"
		},
		"subclassfeature6.1": {
			name: "Mystical Erudition",
			source: [["TDCSR", 174]],
			minlevel: 6,
			description: desc([
				"At 6th, 11th, and 17th level gain a language and skill/expertise; See 3rd page notes"
			]),
			toNotesPage : [{
				name : "Mystical Erudition",
				source : ["TDCSR", 174],
				popupName : "Mystical Erudition",
				page3notes : true,
				note : [
					"At lvls 6, 11, and 17, I gain a language and proficiency with one skill from Arcana, History,",
					"Investigation, Nature, or Religion or expertise if already proficient with one of those skills",
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
				"Once per turn, if I've taken my reaction this round, I can spend 1 ki point to take a reaction"
			]),
			action : ["reaction", " (1 Ki; 1/turn)"],
			additional: "1 ki point; once per turn"
		},
		"subclassfeature17": {
			name: "Debilitating Barrage",
			source: [["TDCSR", 174]],
			minlevel: 17,
			description: desc([
				"If I hit a creature with an unarmed strike, I can use 3 ki points to give it vulnerability to one",
				"damage type. Lasts for one minute or until the end of a turn in which it has taken damage",
				"of that type. If the creature has resistance to the chosen type, the resistance is suppressed",
				"instead of vulnerability. A creature cannot be affected by this feature again for 24 hours",
			]),
			additional: "3 ki points; See 3rd page notes"
		}
	}
});