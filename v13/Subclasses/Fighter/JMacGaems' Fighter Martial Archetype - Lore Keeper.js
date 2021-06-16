var iFileName = "JMacGaems' Fighter Martial Archetype - Lore Keeper.js";

RequiredSheetVersion(13);

SourceList["JMG:LK"] = {
	name : "JMacGaems' Fighter Martial Archetype - Lore Keeper",
	abbreviation : "JMG:LK",
	group : "Homebrew",
	url : "https://drive.google.com/file/d/1ORaDoHpPuoZD2UG39nT4Z0B9RrEodng6/view",
	date : "2019/11/23"
};

AddSubClass("fighter", "lore keeper", {
	regExpSearch : /lore keeper/i,
	subname : "Lore Keeper",
	fullname : "Lore Keeper",
	source : ["JMG:LK", 1],
	abilitySave : 4,
	spellcastingFactor : 3,
	spellcastingList : {
		"class" : "wizard",
		level : [0, 4]
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : "book",
		prepared : true
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : ["JMG:LK", 1],
			minlevel : 3,
			description : desc([
				"I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability",
				"I can use a weapon as a spellcasting focus for my wizard spells"
			]),
			additional : levels.map(function (n, idx) {
				return [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3][idx] + " cantrips known";
			})
		},
		"subclassfeature3.1" : {
			name : "Well Researched",
			source : ["JMG:LK", 1],
			minlevel : 3,
			description : desc([
				"I gain proficiency in Arcana and History; or gain Expertise if already proficient",
				"I can add half my prof bonus to any Wis/Int checks that don't already include it"
			]),
			skillstxt : "Proficiency with Arcana and History; or gain Expertise if already proficient"
		},
		"subclassfeature7" : {
			name : "Arcane Wards",
			source : ["JMG:LK", 1],
			minlevel : 7,
			description : desc([
				"As a reaction, when attacked, I can gain a +2 bonus to AC and temporary HP",
				"These last until the start of my next turn",
				"If an ally within 30 ft is attacked, I can grant these benefits to them as a reaction",
				"They last until the start of their next turn"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : "" + n + " + Int mod temp HP";
			}),
			usages : "Int mod per ",
			recovery : "long rest",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			action : [["reaction", " (when attacked)"], ["reaction", " (when ally attacked)"]]
		},
		"subclassfeature10" : {
			name : "Arcane Surge",
			source : ["JMG:LK", 1],
			minlevel : 10,
			description : desc([
				"When I use Action Surge, I can regain an expended spell slot of 1st or 2nd level"
			]),
			usages : levels.map(function(n) {
				return n < 3 ? "" : n < 15 ? 2 : 3;
			}),
			recovery : "long rest"
		},
		"subclassfeature15" : {
			name : "Spell Breaker",
			source : ["JMG:LK", 1],
			minlevel : 15,
			description : desc([
				"I learn the spells Counterspell and Dispel Magic and I always have them prepared",
				"These spells do not count against the number of spells I can prepare each day",
				"Using this feature, I can cast either spell without expending a spell slot",
				"When I successfully use Counterspell, I gain temp HP equal to the spell slot used"
			]),
			usages : 2,
			recovery : "long rest",
			action : [["action", " (dispel magic)"], ["reaction", " (counterspell)"]],
			spellcastingBonus : {
				name : "Spell Breaker",
				spells : ["dispel magic", "counterspell"],
				selection : ["dispel magic", "counterspell"],
				times : 2,
				prepared : true
			}
		},
		"subclassfeature18" : {
			name : "Focused",
			source : ["JMG:LK", 1],
			minlevel : 18,
			description : desc([
				"I can maintain concentration on two spells at the same time",
				"I make a separate concentration checks for each spell"
			]),
			action : ["bonus action", ""]
		}
	}
});