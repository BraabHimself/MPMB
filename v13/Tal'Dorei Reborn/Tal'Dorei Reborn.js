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
				"If I or an ally within 30 ft rolls a 1 on a save/ability/attack roll, I can use my reaction",
				"If I do, I regain one expended Bardic Inspiration die"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature3.1" : {
			name : "Sorrowful Fate",
			source : ["TDCSR", 167],
			minlevel : 3,
			recovery : "short rest",
			usages : 1,
			description : desc([
				"When I or an ally forces a creature to make a save, I can change it to a Cha save",
				"When I do so, I expend one Bardic Inspiration die",
				"If the target fails, roll the expended die; they take psychic damage equal to the roll",
				"The target is plagued with regret for 1 minute",
				"The target is compelled to utter final words if it's reduced to 0 HP during this time"
			])
		},
		"subclassfeature6" : {
			name : "Tale of Hubris",
			source : ["TDCSR", 167],
			minlevel : 6,
			action : ["reaction", ""],
			description : desc([
				"I can use my reaction when a creature lands a critical hit on I or an ally with 60 ft",
				"I expend a Bardic Inspiration die to draw out their arrogance",
				"Weapon attacks against the creature score critical hits in a larger range",
				"This effect lasts for 1 min or until target suffers a critical hit"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? "" : (n < 14 ? "18-20" : "17-20")) + " crit hit range";
			})
		},
		"subclassfeature6.1" : {
			name : "Impending Misfortune",
			source : ["TDCSR", 167],
			minlevel : 6,
			recovery : "short rest",
			usages : 1,
			description : desc([
				"When I make an attack or save, I can gain a +10 bonus to the roll",
				"When I make my next attack or save, I take a -10 penalty to the roll",
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
				" - It gains a +4 bonus to AC",
				" - It has advantage on attack rolls and saving throws",
				" - Its weapon and spell attacks deal an extra 1d10 radiant damage"
				" - It suffers a critical hit on a roll of 18-20"
				"When this effect ends, it immediately drops to 0 HP and is dying"
			])
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