/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:         Mothfolk race + three subraces
	Effect:          This script adds a player race, called "Mothfolk" and the 3 subraces "Luna", "Diamondback", and "Royal"
				     This is taken from /r/UnearthedArcana (https://www.reddit.com/r/UnearthedArcana/comments/95pr2i/race_mothfolk_an_enigmatic_uncanny_mysterious/)
				     This race is made by u/aofhaocv
	Code by:	     Newbuu2
	Commissioned by: u/Lynnduck
	Date:		2020-04-29 (sheet v13)
*/

var iFileName = "Mothfolk race by aofhaocv.js";

RequiredSheetVersion(13);

SourceList["RUA:MF"] = {
	name : "Reddit UnearthedArcana: Mothfolk",
	abbreviation : "RUA:MF",
	group : "Redding UnearthedArcana",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/95pr2i/race_mothfolk_an_enigmatic_uncanny_mysterious/",
	date : "2018/10/18"
};

RaceList["luna mothfolk"] = {
	regExpSearch : /^(((?=.*\b(mothfolk|mothkin)\b)(?=.*\b(luna)\b))).*$/i,
	name : "Luna Mothfolk",
	sortname : "Mothfolk, Luna",
	source : ["RUA:MF", 2],
	plural : "Mothfolk",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Ivathi"],
	skills : ["Stealth"],
	vision : [["Darkvision", 120]],
	age : " are born as larvae, and are only considered fully grown after metamorphosis. They are considered adults once their wings are fully grown, and live into their mid-forties on average. The oldest mothfolk live until their late fifties.",
	height : " range from a bit under six feet to almost seven feet tall, not counting their lengthy antennae.",
	weight : " builds tend towards the light and lithe, and they usually weigh between 130 and 160 pounds.",
	scores : [0, 0, 0, 1, 2, 0],
	scorestxt : "+2 Wisdom and +1 Intelligence",
	trait : "Luna Mothfolk (+2 Wisdom +1 Intelligence)" + 
		" Compound Vision: I can discern colors in dim light" + (typePF ? " and " : "/") + "darkness, but only on the ultraviolet spectrum." +
		" Wings: I can't use my wings to ascend. If I end a turn flying in the air, I descend by 5 " + (typePF ? "feet" : "ft") + "." +
		" Armed and Dangerous: I have four arms" + (typePF ? ", each of which" : "; each") + " can hold an object. I don't benefit from a shield if holding a two-handed weapon or " + (typePF ? "more than one weapon" : "multiple weapons") + "." +
		" Close to Nature: I know one cantrip from the druid spell list. Int is my spellcasting ability for it." +
		" Soothing Appearance: I have adv. on Animal Handling checks to calm animals." +
		" Epitome of Grace: I am always under the effects of the feather fall spell.",
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Luna Mothfolk Cantrip",
		"class" : "druid",
		level : [0, 0],
		firstCol : 'atwill'
	}
};

RaceList["diamondback mothfolk"] = {
	regExpSearch : /^(((?=.*\b(mothfolk|mothkin)\b)(?=.*\b(diamondback)\b))).*$/i,
	name : "Diamondback Mothfolk",
	sortname : "Mothfolk, Diamondback",
	source : ["RUA:MF", 3],
	plural : "Mothfolk",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Ivathi"],
	skills : ["Stealth"],
	vision : [["Darkvision", 120]],
	age : " are born as larvae, and are only considered fully grown after metamorphosis. They are considered adults once their wings are fully grown, and live into their mid-forties on average. The oldest mothfolk live until their late fifties.",
	height : " range from a bit under six feet to almost seven feet tall, not counting their lengthy antennae.",
	weight : " builds tend towards the light and lithe, and they usually weigh between 130 and 160 pounds.",
	scores : [1, 0, 0, 0, 2, 0],
	scorestxt : "+2 Wisdom and +1 Strength",
	trait : "Diamondback Mothfolk (+2 Wisdom +1 Strength)" + 
		" Compound Vision: I can discern colors in dim light" + (typePF ? " and " : "/") + "darkness, but only on the ultraviolet spectrum." +
		" Wings: I can't use my wings to ascend. If I end a turn flying in the air, I descend by 5 " + (typePF ? "feet" : "ft") + "." +
		" Armed and Dangerous: I have four arms" + (typePF ? ", each of which" : "; each") + " can hold an object. I don't benefit from a shield if holding a two-handed weapon or " + (typePF ? "more than one weapon" : "multiple weapons") + "." +
		" Hardened Carapace: I have an AC of 14 + Dexterity modifier (max 2) + shield." +
		" A Warrior's Upbringing: I am proficient with spears, tridents, war picks, as well as one simple or martial weapon of my choice.",
	weaponProfs : [false, false, ["spear", "trident", "war pick"]],
	armorOptions : {
		regExpSearch : /^hardened carapace$/i,
		name : "Hardened Carapace",
		source : ["RUA:MF", 3],
		ac : 14,
		dex : 2
	},
	armorAdd : "Hardened Carapace"
};

RaceList["royal mothfolk"] = {
	regExpSearch : /^(((?=.*\b(mothfolk|mothkin)\b)(?=.*\b(royal)\b))).*$/i,
	name : "Royal Mothfolk",
	sortname : "Mothfolk, Royal",
	source : ["RUA:MF", 3],
	plural : "Mothfolk",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Ivathi", 2],
	skills : ["Stealth"],
	vision : [["Darkvision", 120]],
	age : " are born as larvae, and are only considered fully grown after metamorphosis. They are considered adults once their wings are fully grown, and live into their mid-forties on average. The oldest mothfolk live until their late fifties.",
	height : " range from a bit under six feet to almost seven feet tall, not counting their lengthy antennae.",
	weight : " builds tend towards the light and lithe, and they usually weigh between 130 and 160 pounds.",
	scores : [0, 0, 0, 0, 2, 1],
	scorestxt : "+2 Wisdom and +1 Charisma",
	trait : "Royal Mothfolk (+2 Wisdom +1 Charisma)" + 
		" Compound Vision: I can discern colors in dim light" + (typePF ? " and " : "/") + "darkness, but only on the ultraviolet spectrum." +
		" Wings: I can't use my wings to ascend. If I end a turn flying in the air, I descend by 5 " + (typePF ? "feet" : "ft") + "." +
		" Armed and Dangerous: I have four arms" + (typePF ? ", each of which" : "; each") + " can hold an object. I don't benefit from a shield if holding a two-handed weapon or " + (typePF ? "more than one weapon" : "multiple weapons") + "." +
		" High Class: I can double my proficiency bonus for Charisma checks when speaking with noble or high-class creatures." +
		" Well-Mannered: If I make a Charisma-based ability check where I add my proficiency bonus, rolls of 4 or lower are 5."
};