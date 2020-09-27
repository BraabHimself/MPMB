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
	descriptionFull : "The innate resistance to magic that angels possess extends to you. You have advantage on saving throws against spells and other magical effects.",
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
	name : "Firbolg Beast Magic",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being a Firbolg",
	prereqeval : "CurrentRace.known.indexOf('firbolg') !== -1",
	description : "I can cast Speak with Animals at will, without expending a spell slot. I can also cast Animal Friendship and Beast Sense without expending a spell slot, but each only once per long rest. Wisdom is my spellcasting ability for these three spells.",
	descriptionFull : "Your connection to animals deepens. You learn the speak with animals spell and can cast it at will, without expending a spell slot. You also learn the animal friendship and beast sense spells, each of which you can cast once without expending a spell slot. You regain the ability to cast these two spells in this way when you finish a long rest. Wisdom is your spellcasting ability for all three spells.",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 4,
		spells : ["speak with animals"],
		selection : ["speak with animals"],
		firstCol : 'atwill'
	}, {
		name : "Once per long rest",
		spellcastingAbility : 4,
		spells : ["animal friendship"],
		selection : ["animal friendship"],
		firstCol : 'oncelr'
	}, {
		name : "Once per long rest",
		spellcastingAbility : 4,
		spells : ["beast sense"],
		selection : ["beast sense"],
		firstCol : 'oncelr'
	}]
};

FeatsList["djinn heritage-xgteerf"] = {
	name : "Djiin Heritage",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being an Air Genasi",
	prereqeval : "CurrentRace.known.indexOf('genasi') !== -1 && CurrentRace.known.indexOf('air') !== -1",
	description : "I can cast Detect Magic at will, without expending a spell slot. I have resistance to lightning and thunder damage. [+1 Dexterity or Constitution]",
	descriptionFull : "You manifest more of the magical power of your djinn heritage. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity or Constitution score by 1, to a maximum of 20." + "\n " + "\u2022 You learn the detect magic spell and can cast it at will, without expending a spell slot." + "\n " + "\u2022 You have resistance to lightning and thunder damage.",
	improvements : "Djiin Heritage (feat): +1 Dexterity or Constitution;",
	dmgres : ["Lightning", "Thunder"],
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
	description : "I can cast Detect Magic at will, without expending a spell slot. Without armor, my AC is 13 + Dexterity modifier + shield [+1 Strength or Constitution]",
	descriptionFull : "You manifest more of the magical power of your dao heritage. You gain the following benefits:" + "\n " + "\u2022 Increase your Strength or Constitution score by 1, to a maximum of 20." + "\n " + "\u2022 You learn the detect magic spell and can cast it at will, without expending a spell slot." + "\n " + "\u2022 You gain natural armor. While you aren’t wearing armor, you can calculate your AC as 13 + your Dexterity modifier. You can use a shield and still gain this benefit.",
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
	description : "I can cast Detect Magic at will, without expending a spell slot. My darkvision has a radius of 120 ft. [+1 Constitution or Intelligence]",
	descriptionFull : "You manifest more of the magical power of your efreet heritage. You gain the following benefits:" + "\n " + "\u2022 Increase your Constitution or Intelligence score by 1, to a maximum of 20." + "\n " + "\u2022 You learn the detect magic spell and can cast it at will, without expending a spell slot." + "\n " + "\u2022 Your darkvision has a radius of 120 feet.",
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
	name : "Marid Heritage",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Water Genasi",
	prereqeval : "CurrentRace.known.indexOf('genasi') !== -1 && CurrentRace.known.indexOf('water') !== -1",
	description : "I can cast Detect Magic at will, without expending a spell slot. I have resistance to lightning and thunder damage. [+1 Constitution or Wisdom]",
	descriptionFull : "You manifest more of the magical power of your marid heritage. You gain the following benefits:" + "\n " + "\u2022 Increase your Constitution or Wisdom score by 1, to a maximum of 20." + "\n " + "\u2022 You learn the detect magic spell and can cast it at will, without expending a spell slot." + "\n " + "\u2022 You have resistance to cold damage.",
	improvements : "Marid Heritage (feat): +1 Constitution or Wisdom;",
	dmgres : ["Cold"],
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 3,
		spells : ["detect magic"],
		selection : ["detect magic"],
		firstCol : 'atwill'
	}]
};

FeatsList["like a boss-xgteerf"] = {
	name : "Like a Boss",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being a Goblin",
	prereqeval : "CurrentRace.known.indexOf('goblin') !== -1 && CurrentRace.known.indexOf('hobgoblin') == -1",
	description : "Once per short rest, I can use my reaction to impose disadvantage on a creature's attack roll made against me. To do so, I must see the attack and another creature must be within 5 ft of me. [+1 Dexterity]",
	descriptionFull : "You are accustomed to using others to avoid being attacked. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity score by 1, to a maximum of 20." + "\n " + "\u2022 When a creature you can see targets you with an attack and another creature is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. Once you use this ability, you can’t do so again until you finish a short or long rest.",
	scores : [0, 1, 0, 0, 0, 0],
	action : ["reaction", ""],
	usages : 1,
	recovery : "short rest"
};

FeatsList["mountain's endurance-xgteerf"] = {
	name : "Mountain's Endurance",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Goliath",
	prereqeval : "CurrentRace.known.indexOf('goliath') !== -1",
	description : "When I use Stone's Endurance, I can instead gain resistance to one type of damage from the triggering attack, instead of rolling. [+1 Strength or Constitution]",
	descriptionFull : "Your ability to shrug off some injuries is legendary, even for your race. You gain the following benefits:" + "\n " + "\u2022 Increase your Strength or Constitution score by 1, to a maximum of 20." + "\n " + "\u2022 When you use your Stone’s Endurance trait as a reaction to reduce damage, instead of rolling a d12 and adding your Constitution modifier, you can choose to gain resistance to the triggering attack’s damage type until the start of your next turn. If the triggering attack deals more than one type of damage, choose one. As normal, after you use this trait, you can’t use it again until you finish a short or long rest.",
	improvements : "Mountain's Endurance (feat): +1 Strength or Constitution;",
	action : ["reaction", " (with Stone's Endurance)"],
	usages : 1,
	recovery : "short rest"
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
	name : "Master of Mimicry",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Kenku",
	prereqeval : "CurrentRace.known.indexOf('kenku') !== -1",
	description : "Once per short rest, I can use my reaction to gain proficiency in a skill/tool I see used by another creature. This proficiency lasts for 1 hr and I can only mimic one proficiency at a time. [+1 Dexterity or Wisdom]",
	descriptionFull : "You have learned to temporarily mimic even the training of others. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity or Wisdom score by 1, to a maximum of 20." + "\n " + "\u2022 Whenever another creature you can see uses a skill or tool, you can use your reaction to gain proficiency in that skill or tool. Proficiencies gained in this way last for 1 hour, and you can only mimic one proficiency at a time. Once you use this ability, you can’t do so again until you finish a short or long rest.",
	improvements : "Master of Mimicry (feat): +1 Dexterity or Wisdom;",
	action : ["reaction", ""],
	usages : 1,
	recovery : "short rest"
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
	description : "I can use Feline Agility twice before needing to stay still. I can still only use it once per turn. I take no damage from falling 20 ft or less, if I'm not incapacitated. [+1 Dexterity]",
	descriptionFull : "Your incredible reflexes and agility further improve. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity score by 1, to a maximum of 20." + "\n " + "\u2022 You can use your Feline Agility trait twice before you must move 0 feet on one of your turns to use the trait again. You can still only use this ability once per turn when you move." + "\n " + "\u2022 You don’t take damage from falling 20 feet or less if you aren’t incapacitated."
	prereqeval : "CurrentRace.known.indexOf('tabaxi') !== -1",
	scores : [0, 1, 0, 0, 0, 0]
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
	removeeval : "RemoveFeature('Acid Spit', '', '', '', '', '', 'event.value = Math.max(1, What('Con Mod'));');",
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