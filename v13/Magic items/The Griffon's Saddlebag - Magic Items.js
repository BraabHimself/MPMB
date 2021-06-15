/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    The Griffon's Saddlebag - Magic Items
	Effect:     The file adds some items from The Griffon's Saddlebag subreddit
	Author:     griff-mac
	Code by:	Newbuu2
	Date:		2021-06-15 (sheet v13)
*/

var iFileName = "The Griffon's Saddlebag - Magic Items.js";

RequiredSheetVersion(13);

SourceList["HB:TGS"] = {
	name : "The Griffon's Saddlebag",
	abbreviation : "HB:TGS",
	group : "Homebrew",
	url : "https://www.reddit.com/r/TheGriffonsSaddlebag/",
	date : "2020/01/01"
};

//https://www.reddit.com/r/TheGriffonsSaddlebag/comments/nzoy1j/the_griffons_saddlebag_dragon_horn_pauldron/
var dragonHornPauldronShortDescription = "This pauldron is made from the horn of a fallen DRAGON_TYPE dragon. White wearing it, I gain a +1 bonus to AC and have resistance to DAMAGE_TYPE damage. When I make a saving throw to halve DAMAGE_TYPE damage taken, I can use my reaction to take no damage if I succeed.";

var dragonHornPauldronFullDescription = [
	"This single pauldron is made from the horn of a fallen dragon. While wearing it, you gain a +1 bonus to AC and have resistance to one damage type, which is determined by the kind of dragon that provided the horn (see the table below).",
	">>Dragon\t\tResistance<<",
	"  Black\t\tAcid",
	"  Blue\t\tLightning",
	"  Brass\t\tFire",
	"  Bronze\t\tLightning",
	"  Copper\t\tAcid",
	"  Gold\t\tFire",
	"  Green\t\tPoison",
	"  Red\t\tFire",
	"  Silver\t\tCold",
	"  White\t\tCold",
	"In addition, when you are subjected to an effect that allows you to make a saving throw to take only half damage of this resisted type, you can use your reaction to take no damage if you succeed."
];

MagicItemsList["dragon horn pauldron"] = {
	name : "Dragon Horn Pauldron",
	source : ["HB:TGS", 1],
	type : "wondrous item",
	rarity : "rare",
	attunement : true,
	description : "This pauldron is made from the horn of a fallen dragon. While wearing it, I gain a +1 bonus to AC and have resistance to the damage type associated with the type of dragon that provided the horn. When I make a saving throw to take only half damage of this resisted type, I can use my reaction to take no damage if I succeed.",
	descriptionFull : dragonHornPauldronFullDescription.join("\n   ").replace("!!", "").replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
	"black" : {
		name : "Black Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "acid").replace("DRAGON_TYPE", "black"),
		dmgres : ["Acid"],
		action : ["reaction", " (acid damage save)"]
	},
	"blue" : {
		name : "Blue Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "lightning").replace("DRAGON_TYPE", "blue"),
		dmgres : ["Lightning"],
		action : ["reaction", " (lightning damage save)"]
	},
	"brass" : {
		name : "Brass Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "fire").replace("DRAGON_TYPE", "brass"),
		dmgres : ["Fire"],
		action : ["reaction", " (fire damage save)"]
	},
	"bronze" : {
		name : "Bronze Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "lightning").replace("DRAGON_TYPE", "bronze"),
		dmgres : ["Lightning"],
		action : ["reaction", " (lightning damage save)"]
	},
	"copper" : {
		name : "Copper Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "acid").replace("DRAGON_TYPE", "copper"),
		dmgres : ["Acid"],
		action : ["reaction", " (acid damage save)"]
	},
	"gold" : {
		name : "Gold Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "fire").replace("DRAGON_TYPE", "gold"),
		dmgres : ["Fire"],
		action : ["reaction", " (fire damage save)"]
	},
	"green" : {
		name : "Green Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "poison").replace("DRAGON_TYPE", "green"),
		dmgres : ["Poison"],
		action : ["reaction", " (poison damage save)"]
	},
	"red" : {
		name : "Red Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "fire").replace("DRAGON_TYPE", "red"),
		dmgres : ["Fire"],
		action : ["reaction", " (fire damage save)"]
	},
	"silver" : {
		name : "Silver Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "cold").replace("DRAGON_TYPE", "silver"),
		dmgres : ["Cold"],
		action : ["reaction", " (cold damage save)"]
	},
	"white" : {
		name : "White Dragon Horn Pauldron",
		description : dragonHornPauldronShortDescription.replace(/DAMAGE_TYPE/g, "cold").replace("DRAGON_TYPE", "white"),
		dmgres : ["Cold"],
		action : ["reaction", " (cold damage save)"]
	},
	extraAC : [{
		mod : 1,
		name : "Dragon Horn Pauldron",
		magic : true,
		text : "While wearing this pauldron, I gain a +1 bonus to AC."
	}]
}

//https://www.reddit.com/r/TheGriffonsSaddlebag/comments/eijv39/the_griffons_saddlebag_silver_eagle_studded/
MagicItemsList["silver eagle studded cuirass"] = {
	name : "Silver Eagle Studded Cuirass",
	source : ["HB:TGS", 1],
	type : "armor (studded leather)",
	rarity : "uncommon",
	description : "While wearing this studded leather, any critical hit against me becomes a normal hit. Once per dawn, when hit by a melee attack, I can use my reaction to speak the command word. If I do, I move up to 10 ft back from the attacker, which does not provoke opportunity attacks, and reduce the damage by 2d6.",
	descriptionFull : "This studded leather armor is worn by an elite guard of a longstanding alliance between elves and humans. While you're wearing it, any critical hit against you becomes a normal hit." + "\n " + "In addition, when a creature you can see hits you with a melee attack while you're wearing this armor, you can use your reaction to speak its command word. When you do, a pair of ghostly eagle wings appear from the back of the armor. The wings beat the air around you and push you back up to 10 feet away from the attacking creature, without provoking attacks of opportunity. In addition, the sudden movement takes you out of harm's way, reducing the damage you take from the attack by 2d6. Once this property of the armor has been used, it can't be used again until the next dawn.",
	usages : 1,
	recovery : "dawn",
	action : ["reaction", " (damaged in melee)"],
	attunement : true,
	armorAdd : "Silver Eagle Studded Cuirass",
	armorOptions : {
		regExpSearch : /^(?=.*silver)(?=.*eagle)(?=.*studded)(?=.*cuirass).*$/i,
		name : "Silver Eagle Studded Cuirass",
		source : ["HB:TGS", 1],
		type : "light",
		ac : 12,
		weight : 13,
		invName : "Silver Eagle Studded Cuirass"
	}
}

//https://www.reddit.com/r/UnearthedArcana/comments/am3u3f/the_griffons_saddlebag_silver_eagle_weapons/

MagicItemsList["silver eagle weapon"] = {
	name : "Silver Eagle Weapon",
	source : ["HB:TGS", 1],
	type : "weapon (greataxe, greatsword, lance, or maul)",
	description : "I have a +1 bonus to attack and damage rolls made with this silvered, magic weapon. It deals 2d6 damage and its weapon dice is not doubled on a critical. When I roll the same number on both damage dice I can add another d6; I can keep adding d6s while the numbers rolled are all the same.",
	descriptionFull : "You gain a +1 bonus to attack and damage rolls made with these silvered, magic weapons of elven make. These weapons deal 2d6 damage instead of their normal damage dice, and landing a critical hit with the weapon doesn't double the weapon's damage dice. Whenever you land an attack with the weapon and roll the same number on both of the weapon's damage dice, you can immediately roll another d6 and add it to the weapon's damage dice. You can continue rolling extra damage dice until you roll a number that does not match the previous rolls.",
	choices : ["Greataxe", "Greatsword", "Lance", "Maul"],
	"greataxe" : {
		name : "Silver Eagle Greataxe",
		rarity : "uncommon",
		description : "I have a +1 bonus to attack and damage rolls made with this silvered, magic greataxe. It deals 2d6 slashing damage and its weapon dice is not doubled on a critical. When I roll the same number on both damage dice I can add another d6; I can keep adding d6s while the numbers rolled are all the same.",
		allowDuplicates : true,
		weaponsAdd : ["Silver Eagle Greataxe"],
		weaponOptions : {
			baseWeapon : "greataxe",
			regExpSearch : /^(?=.*silver)(?=.*eagle)(?=.*greataxe).*$/i,
			name : "Silver Eagle Greataxe",
			source : ["HB:TGS", 1],
			description : "Heavy, two-handed, weapon dice not doubled on crit",
			damage : [2, 6, "slashing"],
			modifiers : [1, 1]
		}
	},
	"greatsword" : {
		name : "Silver Eagle Greatsword",
		rarity : "uncommon",
		description : "I have a +1 bonus to attack and damage rolls made with this silvered, magic greatsword. It deals 2d6 slashing damage and its weapon dice is not doubled on a critical. When I roll the same number on both damage dice I can add another d6; I can keep adding d6s while the numbers rolled are all the same.",
		allowDuplicates : true,
		weaponsAdd : ["Silver Eagle Greatsword"],
		weaponOptions : {
			baseWeapon : "greatsword",
			regExpSearch : /^(?=.*silver)(?=.*eagle)(?=.*greatsword).*$/i,
			name : "Silver Eagle Greatsword",
			source : ["HB:TGS", 1],
			description : "Heavy, two-handed, weapon dice not doubled on crit",
			damage : [2, 6, "slashing"],
			modifiers : [1, 1]
		}
	},
	"lance" : {
		name : "Silver Eagle Lance",
		rarity : "uncommon",
		description : "I have a +1 bonus to attack and damage rolls made with this silvered, magic lance. It deals 2d6 piercing damage and its weapon dice is not doubled on a critical. When I roll the same number on both damage dice I can add another d6; I can keep adding d6s while the numbers rolled are all the same.",
		allowDuplicates : true,
		weaponsAdd : ["Silver Eagle Lance"],
		weaponOptions : {
			baseWeapon : "lance",
			regExpSearch : /^(?=.*silver)(?=.*eagle)(?=.*lance).*$/i,
			name : "Silver Eagle Lance",
			source : ["HB:TGS", 1],
			description : "Reach, disadvantage to attack within 5 ft, two-handed when not mounted, weapon dice not doubled on crit",
			damage : [2, 6, "piercing"],
			modifiers : [1, 1]
		}
	},
	"maul" : {
		name : "Silver Eagle Maul",
		rarity : "uncommon",
		description : "I have a +1 bonus to attack and damage rolls made with this silvered, magic maul. It deals 2d6 bludgeoning damage and its weapon dice is not doubled on a critical. When I roll the same number on both damage dice I can add another d6; I can keep adding d6s while the numbers rolled are all the same.",
		allowDuplicates : true,
		weaponsAdd : ["Silver Eagle Maul"],
		weaponOptions : {
			baseWeapon : "maul",
			regExpSearch : /^(?=.*silver)(?=.*eagle)(?=.*maul).*$/i,
			name : "Silver Eagle Maul",
			source : ["HB:TGS", 1],
			description : "Heavy, two-handed, weapon dice not doubled on crit",
			damage : [2, 6, "bludgeoning"],
			modifiers : [1, 1]
		}
	}
}

//https://www.reddit.com/r/TheGriffonsSaddlebag/comments/cfzw1p/the_griffons_saddlebag_weapon_of_spite_weapon_any/

// See this thread for errata on the +2 bonus:
// https://www.reddit.com/r/TheGriffonsSaddlebag/comments/cfzw1p/the_griffons_saddlebag_weapon_of_spite_weapon_any/eyrhk5t?utm_source=share&utm_medium=web2x&context=3

MagicItemsList["weapon of spite"] = {
	name : "Weapon of Spite",
	nameTest : "of Spite",
	source : ["HB:TGS", 1],
	type : "weapon (any melee)",
	description : "This deep red weapon was made by a vengeful craftsman. I have a +1 bonus to attack and damage rolls made with this magic weapon. The bonus becomes +2 if the attack is made against a creature who damaged me since the start my last turn.",
	descriptionFull : "This deep red weapon was made by a vengeful craftsman. You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus becomes +2 if the attack is made against a creature who damaged you since the start of your last turn.",
	chooseGear : {
		type : "weapon",
		prefixOrSuffix : "prefix",
		descriptionChange : ["replace", "weapon"],
		excludeCheck : function (inObjKey, inObj) {
			return inObj.list != "melee";
		}
	},
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.theWea.list == "melee" && (/of spite/i).test(v.WeaponText)) {
					fields.Description += (fields.Description ? '; ' : '') + '+1 bonus to attack/damage vs. creature that previously damaged me since start of my last turn';
				}
			},
			'If I include the word "of Spite" in a the name of a melee weapon, it will be treated as the magic item Weapon of Spite. It grants a +1 bonus to attack and damage rolls. This bonus becomes a +2 if I attack a creature that damaged me since the start of my last turn.'
		],
		atkCalc : [
			function (fields, v, output) {
				if (v.theWea.list == "melee" && (/of spite/i).test(v.WeaponText)) {
					output.magic = v.thisWeapon[1] + 1;
				}
			}, ''
		]
	}
}