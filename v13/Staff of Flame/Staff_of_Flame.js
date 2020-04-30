/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Staff of Flame
	Effect:     This script adds the Staff of Flame magic item
				This is taken from D&D Wiki (https://www.dandwiki.com/wiki/Staff_of_Flame_(5e_Equipment))
	Code by:	Newbuu2
	Date:		2020-04-30 (sheet v13)
*/

// Define the source
SourceList["D&DW"] = {
	name : "Staf of Flame",
	abbreviation : "D&DW",
	group : "D&D Wiki",
	url : "https://www.dandwiki.com/wiki/Staff_of_Flame_(5e_Equipment)",
	date : "2016/10/02"
};

MagicItemsList["staff of flame"] = {
	name : "Staff of Flame",
	source : ["D&DW", 0],
	type : "quarterstaff",
	rarity : "uncommon",
	description : "This staff has 5 charges, regaining 1d4+1 charges at dawn. If I use its last charge, roll a d20. On a 1, it is destroyed. I can use charges to cast burning hands (1 charge), chromatic orb (fire only, 2 charges), or scorching ray (3 charges), using my spellcasting ability. I also gain the fire bolt cantrip.",
	descriptionFull : "The staff has 5 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: burning hands (1 charge), chromatic orb (fire version only, 2 charges), or scorching ray (3 charges).\n You can also use an action to cast the fire bolt cantrip without using any charges.",
	attunement : true,
	weight : 4,
	prerequisite : "Requires attunement by a druid, sorcerer, warlock, or wizard",
	prereqeval : function(v) { return classes.known.druid || classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
	usages : 5,
	recovery : "dawn",
	additional : "regains 1d4+1",
	weaponsAdd : ["Staff of Flame"],
	weaponOptions : {
		baseWeapon : "quarterstaff",
		regExpSearch : /staff of flame/i,
		name : "Staff Flame",
		source : ["D&DW", 0],
		range : "Melee",
		description : "Versatile (1d8)"
	},
	spellcastingAbility : "class",
	spellFirstColTitle : "Ch",
	spellcastingBonus : [{
		name : "1 charge",
		spells : ["burning hands"],
		selection : ["burning hands"],
		firstCol : 1
	}, {
		name : "2 charges",
		spells : ["chromatic orb"],
		selection : ["chromatic orb"],
		firstCol : 2
	}, {
		name : "3 charges",
		spells : ["scorching ray"],
		selection : ["scorching ray"],
		firstCol : 3
	}, {
		name : "Staff of Flame",
		spells : ["fire bolt"],
		selection : ["fire bolt"],
		firstCol : "atwill"
	}]
};
