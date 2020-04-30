/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    3rd-party compendium
	Effect:     
	Content:	
	Code by:	Newbuu2
	Date:		2020-04-27 (sheet v13)
*/

var iFileName = "OdysseyOfTheDragonlords_v13.js";

RequiredSheetVersion(13);

SourceList["OotD"] = {
	name : "Odyssey of the Dragonlords",
	abbreviation : "OotD",
	date : "2020/04/27",
	group : "Third Party Compendium",
	url : "https://www.kickstarter.com/projects/arcanumworlds/odyssey-of-the-dragonlords-5th-edition-adventure-b",
	defaultExcluded : true
}

//Races start
RaceList["thylean centaur"] = {
	regExpSearch : /^((?=.*\bthylean?\b)(?=.*centaur)).*$/i,
	name : "Thylean Centaur",
	sortname : "Centaur, Thylean",
	source : ["OotD", 312],
	plural : "Thylean Centaurs",
	size : 3,
	speed : {
		walk : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Sylvan"],
	age : " reach adulthood in their late teens and live less than 100 years",
	height : " range from 6'6\" to 7 feet in height",
	weight : " weigh between 700 and 900 pounds",
	heightMetric : " range from 1,98 metres to 2,13 metres in height",
	weightMetric : " weigh between 317 and 408 kg",
	scorestxt : "+2 Strength and +1 Wisdom",
	scores : [2, 0, 0, 0, 1, 0],
	trait : "Thylean Centaur (+2 Strength +1 Wisdom)" + desc([
		"Charge: If I move 30 ft straight toward a target and then hit it with a melee attack on the same turn, the target takes an extra 1d6 damage from the first attack.",
		//TODO add mountable to notes
		"Mountable: As a bonus action, I can allow an ally within 5ft to ride on my back until the end of my turn. See Notes.",
		"Quadrapedal Stride: Climbing or maneuvering in tight spaces is considered difficult terrain."
	]),
	additional : levels.map(function (n) { 
		return "+1d6 weapon damage";
	}),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon) {
					fields.Description += (fields.Description ? '; ' : '') + '+1d6 damage on first attack after Charging';
				};
			},
			"I do +1d6 damage on the first attack after moving 30ft straight toward a target."
		]
	}
};

RaceList["thylean medusa"] = {
	regExpSearch : /^((?=.*\bthylean?\b)(?=.*medusa)).*$/i,
	name : "Thylean Medusa",
	sortname : "Medusa, Thylean",
	source : ["OotD", 313],
	plural : "Thylean Medusae",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	weaponOptions : {
		regExpSearch : /^((?=.*\bsnake?\b)(?=.*hair)).*$/i,
		name : "Snake Hair",
		source : ["OotD", 314],
		ability : 2,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		abilitytodamage : true,
		description : "Con DC 12 save - failure paralyzed until start of my next turn"
	},
	weaponsAdd : ["Snake Hair"],
	savetxt : { adv_vs : ["poison"] },
	age : " can live around 1000 years",
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lb",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Dexterity and +1 Intelligence",
	scores : [0, 2, 0, 1, 0, 0],
	trait : "Thylean Medusa (+2 Dexterity +1 Intelligence)" + desc([
		"Cursed: Turned into a Medusa by a curse. The curse can only be broken by a Wish spell. When broken, I revert to my original race.",
		"Snake Hair: I can make a melee weapon attack with my snake hair dealing 1d6 piercing damage. When hit, the target must succeed on a DC 12 Con saving throw or be poisoned until the start of my next turn.",
		//TODO Add petrifying gaze to notes
		"Petrifying Gaze: I can force a creature within 30ft that can see my eyes to make a Con saving throw. On a failure they're paralyzed until the end of their next turn. See Notes."
	])
};

RaceList["thylean minotaur"] = {
	regExpSearch : /^((?=.*\bthylean?\b)(?=.*minotaur)).*$/i,
	name : "Thylean Minotaur",
	sortname : "Minotaur, Thylean",
	source : ["OotD", 315],
	plural : "Thylean Minotaurs",
	size : 3,
	speed : {
		walk : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Abyssal"],
	vision : [["Darkvision", 60], ["Keen Snout", 0], ["Colorblind (gray/red)", 0], ["Adv. on rolls to solve maze-like puzzles", 0]],
	savetxt : {
		text : ["Automatically succeed on saving throws against the Maze and Hypnotic Pattern spells"]
	},
	age : " reach adulthood in their late teens and live less than 100 years",
	height : " range from 6 to 8 feet in height",
	weight : " weigh between 200 and 400 pounds",
	heightMetric : " range from 1,8 metres to 2,4 metres in height",
	weightMetric : " weigh between 90 and 181 kg",
	scorestxt : "+2 Strength and +1 Constitution",
	scores : [2, 0, 1, 0, 0, 0],
	trait : "Thylean Minotaur (+2 Strength +1 Constitution)" + desc([
		"Keen Snout: I have advantage on Wisdom (Perception) checks relying on smell. I can detect strong odors up to six miles away.",
		"Labyrinthine Vision: Advantage on rolls to solve maze-like puzzles.",
		"Colorblindness: I can only see shades of gray and very bright reds.",
		"Cursed Transformation: At 5th level I can transform into a Bull using a bonus action. At 9th level I turn into a Dire Bull. Automatically triggered by bright reds.",
	]),
	features : {
		"cursed transformation" : {
			name : "Cursed Transformation",
			minlevel : 5,
			tooltip: " Cursed Transformation",
			action : ["bonus action", ""],
			usages: 1,
			recovery : "long rest"
		}
	}
};
//Races end

//Creatures start
CreatureList["bull"] = {
	name : "Bull",
	source : ["OotD", 316],
	size : 2,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 36,
	hd : [4, 10],
	speed : "40 ft",
	scores : [18, 10, 16, 4, 10, 9],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 4
	},
	senses : "Adv. on Wisdom (Perception) checks that rely on smell",
	passivePerception : 14,
	languages : "",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Horn",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}
	],
	traits : [{
			name : "Keen Smell",
			description : "The bull has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
		name : "Charge",
		description : "If the bull moves at least 20 ft straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 3 (1d6) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
	}]
};

CreatureList["dire bull"] = {
	name : "Dire Bull",
	source : ["OotD", 316],
	size : 2,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 12,
	hp : 46,
	hd : [5, 10],
	speed : "40 ft",
	scores : [18, 10, 16, 4, 10, 9],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 4
	},
	senses : "Adv. on Wisdom (Perception) checks that rely on smell",
	passivePerception : 14,
	languages : "",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Horn",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}
	],
	traits : [{
			name : "Keen Smell",
			description : "The dire bull has advantage on Wisdom (Perception) checks that rely on smell."
		},
	{
		name : "Charge",
		description : "If the dire bull moves at least 20 ft straight toward a target and hits it with a horn attack on the same turn, the target takes an extra 5 (1d10) piercing damage. If the target is a creature, it must succeed on a DC 14 Str saving throw or be knocked prone."
	}, {
		name : "Relentless (1/day)",
		description : "If the dire bull takes 10 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
	}],
	wildshapeString : "Keen Smell: advantage on Wis (Perception) checks that rely on smell| Relentless (1/day) If the dire bull takes 10 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead.| Charge: Horn attack deals an additional 1d10 damage after moving 20 ft straight towards a target. If it's a creature it must succeed on a DC 14 Strength saving throw or be knocked prone."
};
//Creatures end


