/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Race
	Effect:     This script adds a player race, called "Ursine" and the 3 subraces "Grizzly", "Polar", and "Black"
						This is taken from /r/UnearthedArcana (https://www.reddit.com/r/UnearthedArcana/comments/35wfwj/5e_race_ursine_humanoid_bears/)
						This race is made by u/Cenycal
	Code by:	Newbuu2
	Date:		2020-04-29 (sheet v13)
*/

var iFileName = "Ursine.js";

RequiredSheetVersion(13);

SourceList["RUA:U"] = {
	name : "Reddit UnearthedArcana: Ursine",
	abbreviation : "RUA:U",
	group : "Redding UnearthedArcana",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/35wfwj/5e_race_ursine_humanoid_bears/",
	date : "2016/05/13"
};

RaceList["grizzly ursine"] = {
	regExpSearch : /^(((?=.*\b(ursine|bearfolk|bearkin)\b)(?=.*\b(grizzly)\b))).*$/i,
	name : "Grizzly Ursine",
	sortname : "Ursine, Grizzly",
	source : ["RUA:U", 0],
	plural : "Ursine",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^(?=.*(ursine|\bbear\b))(?=.*claws?).*$/i,
		name : "Bear Claws",
		source : ["RUA:U", 0],
		damage : [1, 4, "slashing"]
	},
	weaponsAdd : ["Bear Claws"],
	languageProfs : ["Common", "Ursine"],
	vision : [["Darkvision", 60], ["Keen Smell", 0]],
	age : " reach adulthood around 14 years and typically live up to 60 years",
	height : " stand between 6 and 8 feet tall",
	weight : " weigh between 300 and 500 lbs",
	heightMetric : " stand between 1,8 and 2,4 metres tall",
	weightMetric : " weigh between 136 and 226 kg",
	scores : [2, 0, 1, 0, 0, 0],
	scorestxt : "+2 Strength and +1 Constitution",
	trait : "Grizzly Ursine (+2 Strength +1 Constitution)" + desc([
	"Bear Claws: I can use my bear claws to make unarmed strikes dealing 1d4 slashing damage.",
	"Keen Smell: I have advantage on Wisdom (Perception) checks that rely on smell.",
	"Powerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.",
	"Brave: I have advantage on saving throws against being frightened.",
	]),
	carryingCapacity : 2,
	savetxt : { adv_vs : ["being frightened"] }
};

RaceList["polar ursine"] = {
	regExpSearch : /^(((?=.*\b(ursine|bearfolk|bearkin)\b)(?=.*\b(polar)\b))).*$/i,
	name : "Polar Ursine",
	sortname : "Ursine, Polar",
	source : ["RUA:U", 0],
	plural : "Ursine",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^(?=.*(ursine|\bbear\b))(?=.*claws?).*$/i,
		name : "Bear Claws",
		source : ["RUA:U", 0],
		damage : [1, 4, "slashing"]
	},
	weaponsAdd : ["Bear Claws"],
	languageProfs : ["Common", "Ursine"],
	vision : [["Darkvision", 60], ["Keen Smell", 0]],
	age : " reach adulthood around 14 years and typically live up to 60 years",
	height : " stand between 6 and 8 feet tall",
	weight : " weigh between 300 and 500 lbs",
	heightMetric : " stand between 1,8 and 2,4 metres tall",
	weightMetric : " weigh between 136 and 226 kg",
	scores : [2, 0, 0, 0, 1, 0],
	scorestxt : "+2 Strength and +1 Wisdom",
	trait : "Polar Ursine (+2 Strength +1 Wisdom)" + desc([
	"Bear Claws: I can use my bear claws to make unarmed strikes dealing 1d4 slashing damage.",
	"Keen Smell: I have advantage on Wisdom (Perception) checks that rely on smell.",
	"Powerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.",
	"Arctic Resistance: I have a resistance to cold damage.",
	]),
	carryingCapacity : 2,
	dmgres : ["Cold"]
};

RaceList["black ursine"] = {
	regExpSearch : /^(((?=.*\b(ursine|bearfolk|bearkin)\b)(?=.*\b(black)\b))).*$/i,
	name : "Black Ursine",
	sortname : "Ursine, Black",
	source : ["RUA:U", 0],
	plural : "Ursine",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^(?=.*(ursine|\bbear\b))(?=.*claws?).*$/i,
		name : "Bear Claws",
		source : ["RUA:U", 0],
		damage : [1, 4, "slashing"]
	},
	weaponsAdd : ["Bear Claws"],
	languageProfs : ["Common", "Ursine"],
	vision : [["Darkvision", 60], ["Keen Smell", 0]],
	age : " reach adulthood around 14 years and typically live up to 60 years",
	height : " stand between 6 and 8 feet tall",
	weight : " weigh between 300 and 500 lbs",
	heightMetric : " stand between 1,8 and 2,4 metres tall",
	weightMetric : " weigh between 136 and 226 kg",
	scores : [2, 0, 0, 0, 0, 1],
	scorestxt : "+2 Strength and +1 Charisma",
	trait : "Black Ursine (+2 Strength +1 Charisma)" + (typePF ? "\n" : " ") + "Bear Claws: I can use my bear claws to make unarmed strikes dealing 1d4 slashing damage.\nKeen Smell: I have advantage on Wisdom (Perception) checks that rely on smell.\nPowerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.\nMask of the Wild: I can attempt to hide when I am lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
	carryingCapacity : 2
};