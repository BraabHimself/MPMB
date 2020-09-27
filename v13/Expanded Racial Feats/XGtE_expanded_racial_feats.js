/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    3rd-party compendium
	Effect:     This script adds player options from the D&D Beyond supplement "Expanded Racial Feats"
	Content:	19 feats
	Author:		Adam Bradford
	Code by:	Newbuu2
	Date:		2020-09-26 (sheet v13)
*/

var iFileName = "XGtE_expanded_racial_feats.js";

RequiredSheetVersion(13);

SourceList.XGtEERF={
	name : "Xanathar’s Guide to Everything: Expanded Racial Feats",
	abbreviation : "XGtE:ERF",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/226194/Expanded-Racial-Feats",
	date : "2017/11/10"
};

FeatsList["sky warden-xgteerf"] = {
	name : "Sky Warden",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["angelic protection-xgteerf"] = {
	name : "Angelic Protection",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being an Aasimar",
	prereqeval : "CurrentRace.known.indexOf('aasimar') !== -1",
	description : "I have advantage on saving throws against spells and other magical effects.",
	descriptionFull : "",
	savetxt : { text : ["Adv. on saves vs. magic"] }
};

FeatsList["well-rested-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["firbolg beast magic-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["djinn heritage-xgteerf"] = {
	name : "Djiin Heritage",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being an Air Genasi",
	prereqeval : "CurrentRace.known.indexOf('genasi') !== -1 && CurrentRace.known.indexOf('air') !== -1",
	description : "I can cast detect magic at will, without expending a spell slot. I have resistance to lightning and thunder damage. [+1 Dexterity or Constitution]",
	descriptionFull : "",
	improvements : "Djiin Heritage (feat): +1 Dexterity or Constitution;",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 3,
		spells : ["detect magic"],
		selection : ["detect magic"],
		firstCol : 'atwill'
	}]
};

FeatsList["dao heritage-xgteerf"] = {
	name : "Dao Heritage",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being an Earth Genasi",
	prereqeval : "CurrentRace.known.indexOf('genasi') !== -1 && CurrentRace.known.indexOf('earth') !== -1",
	description : "I can cast detect magic at will, without expending a spell slot. Without armor, my AC is 13 + Dexterity modifier + shield [+1 Strength or Constitution]",
	descriptionFull : "",
	improvements : "Dao Heritage (feat): +1 Strength or Constitution;",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 3,
		spells : ["detect magic"],
		selection : ["detect magic"],
		firstCol : 'atwill'
	}],
	armorOptions : {
		regExpSearch : /natural armor/i,
		name : "Natural Armor",
		source : ["XGtE:ERF", 1],
		ac : 13
	},
	armorAdd : "Natural Armor"
};

FeatsList["efreet heritage-xgteerf"] = {
	name : "Efreet Heritage",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being a Fire Genasi",
	prereqeval : "CurrentRace.known.indexOf('genasi') !== -1 && CurrentRace.known.indexOf('fire') !== -1",
	description : "I can cast detect magic at will, without expending a spell slot. My darkvision has a radius of 120 ft. [+1 Constitution or Intelligence]",
	descriptionFull : "",
	improvements : "Efreet Heritage (feat): +1 Constitution or Intelligence;",
	vision : [["Darkvision", 120]],
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 3,
		spells : ["detect magic"],
		selection : ["detect magic"],
		firstCol : 'atwill'
	}]
};

FeatsList["marid heritage-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["like a boss-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["mountains endurance-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["uphold the legion-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["master of mimicry-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["urd wings-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["touch of sess'inek-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["tanarukk blood-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["feline grace-xgteerf"] = {
	name : "Feline Grace",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being a Tabaxi",
	descriptionFull : "",
	prereqeval : "CurrentRace.known.indexOf('tabaxi') !== -1",
	description : " [+1 Dexterity]",
	scores : [0, 1, 0, 0, 0, 0],
};

FeatsList["tortle protector-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["triton deep magic-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};

FeatsList["serpent form-xgteerf"] = {
	name : "",
	source : ["XGtE:ERF", 0],
	prerequisite : "Being a ",
	prereqeval : "CurrentRace.known.indexOf('dragonborn') !== -1",
	description : " [+1 Str, Con, or Cha]",
	descriptionFull : "",
	improvements : "Dragon Hide (feat): +1 Strength, Constitution, or Charisma;",
	eval : "AddWeapon('Retractable Claws');",
	removeeval : "RemoveWeapon('Retractable Claws');",
	addarmor : "Dragon Hide"
};