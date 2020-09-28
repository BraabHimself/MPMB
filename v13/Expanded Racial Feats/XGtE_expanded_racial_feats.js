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
	source : ["XGtE:ERF", 2],
	prerequisite : "Being an Aarakocra",
	prereqeval : "CurrentRace.known.indexOf('aarakocra') !== -1",
	description : "I gain proficiency in Perception. I can double my proficiency bonus on Perception checks that rely on sight. Once per turn, if I dive 30 ft straight at a target and hit with a melee attack, the attack deals an additional 1d6 damage. [+1 Dexterity or Wisdom]",
	descriptionFull : "You are trained for both scouting the skies and aerial combat. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity or Wisdom score by 1, to a maximum of 20." + "\n " + "\u2022 You gain proficiency in the Perception skill if you don’t already have it. You add double your proficiency bonus to Perception checks that rely on sight." + "\n " + "\u2022 Once per turn, if you are flying and dive at least 30 feet straight toward a target and then hit it with a melee weapon attack, the attack deals an extra 1d6 damage to the target.",
	improvements : "Sky Warden (feat): +1 Dexterity or Wisdom;",
	skills : [["Perception"]],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon) {
					fields.Description += (fields.Description ? '; ' : '') + 'Extra 1d6 damage after straight 30 ft dive';
				}
			}, ""]
	}
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
	name : "Well-Rested",
	source : ["XGtE:ERF", 3],
	prerequisite : "Being a Bugbear",
	prereqeval : "CurrentRace.known.indexOf('bugbear') !== -1",
	description : "When I spend 1 or more hit dice during a short rest, I can regain an extra 1d6 hit points. When I finish a long rest, I gain inspiration. [+1 Strength or Dexterity]",
	descriptionFull : "Increase your Strength or Dexterity score by 1, to a maximum of 20." + "\n " + "\u2022 Whenever you spend one or more hit dice during a short rest, you can regain an extra 1d6 hit points." + "\n " + "\u2022 At the end of a long rest, you gain inspiration (described in chapter 4 of the Player’s Handbook).",
	improvements : "Well-Rested (feat): +1 Strength or Dexterity;"
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
	description : "I can cast Detect Magic at will, without expending a spell slot. Constitution is my spellcasting ability for this spell. I have resistance to lightning and thunder damage. [+1 Dexterity or Constitution]",
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
	description : "I can cast Detect Magic at will, without expending a spell slot. Constitution is my spellcasting ability for this spell. Without armor, my AC is 13 + Dexterity modifier + shield [+1 Strength or Constitution]",
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
	description : "I can cast Detect Magic at will, without expending a spell slot. Constitution is my spellcasting ability for this spell. My darkvision has a radius of 120 ft. [+1 Constitution or Intelligence]",
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
	description : "I can cast Detect Magic at will, without expending a spell slot. Constitution is my spellcasting ability for this spell. I have resistance to cold damage. [+1 Constitution or Wisdom]",
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
	description : "When I use Stone's Endurance, I can instead gain resistance to one type of damage from the triggering attack, instead of rolling. This resistance lasts until the start of my next turn. [+1 Strength or Constitution]",
	descriptionFull : "Your ability to shrug off some injuries is legendary, even for your race. You gain the following benefits:" + "\n " + "\u2022 Increase your Strength or Constitution score by 1, to a maximum of 20." + "\n " + "\u2022 When you use your Stone’s Endurance trait as a reaction to reduce damage, instead of rolling a d12 and adding your Constitution modifier, you can choose to gain resistance to the triggering attack’s damage type until the start of your next turn. If the triggering attack deals more than one type of damage, choose one. As normal, after you use this trait, you can’t use it again until you finish a short or long rest.",
	improvements : "Mountain's Endurance (feat): +1 Strength or Constitution;",
	action : ["reaction", " (with Stone's Endurance)"],
	usages : 1,
	recovery : "short rest"
};

FeatsList["uphold the legion-xgteerf"] = {
	name : "Uphold the Legion",
	source : ["XGtE:ERF", 3],
	prerequisite : "Being a Hobgoblin",
	prereqeval : "CurrentRace.known.indexOf('hobgoblin') !== -1",
	description : "Once per combat I can deal an additional 2d6 with a weapon attack, if an ally is within 5 ft of the target and isn't incapacitated. If an ally fails an attack/ability/save, I can use my reaction to extend the benefit of my Saving Face trait to that ally. [+1 Con or Int]",
	descriptionFull : "You were born for life in the legion. You gain the following benefits:" + "\n " + "\u2022 Increase your Constitution or Intelligence score by 1, to a maximum of 20." + "\n " + "\u2022 You can deal an extra 2d6 damage to a creature you hit with a weapon attack if that creature is within 5 feet of an ally that isn’t incapacitated. You can use this trait only once per combat." + "\n " + "\u2022 You can extend the benefit of your Saving Face trait to an ally. As a reaction, if an ally misses with an attack roll or fails an ability check or a saving throw, you can grant a bonus to the roll equal to the number of allies your ally can see within 30 feet (including you, maximum bonus of +5). As normal, once you use this trait, you can’t use it again until you finish a short or long rest.",
	improvements : "Uphold the Legion (feat): +1 Constitution or Intelligence;",
	action : ["reaction", ""],
	limfeaname : "Uphold the Legion (extra 2d6 damage)",
	minlevel : 1,
	usages : 1,
	recovery : "Combat",
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
	name : "Urd Wings",
	source : ["XGtE:ERF", 3],
	prerequisite : "Being a Kobold",
	prereqeval : "CurrentRace.known.indexOf('kobold') !== -1",
	description : "I grow leathery wings, granting a flying speed of 30 ft. I can only fly with these wings while unarmored or wearing light armor. [+1 Dexterity]",
	descriptionFull : "You manifest leathery wings, transforming into an urd. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity score by 1, to a max-imum of 20." + "\n " + "\u2022 You gain a flying speed of 30 feet. To use this speed, you can't be wearing medium or heavy armor.",
	scores : [0, 1, 0, 0, 0, 0],
	speed : { fly : { spd : 30, enc : 0 } }
};

FeatsList["touch of sess'inek-xgteerf"] = {
	name : "Touch of Sess’inek",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Lizardfolk",
	prereqeval : "CurrentRace.known.indexOf('lizardfolk') !== -1",
	description : "I learn to speak, read, and write Abyssal. I am immune to being frightened. [+1 Constitution or Wisdom]",
	descriptionFull : "You embody the demonic bearing of a lizard king or queen. You gain the following benefits:" + "\n " + "\u2022 Increase your Constitution or Wisdom score by 1, to a maximum of 20." + "\n " + "\u2022 You learn to speak, read, and write Abyssal." + "\n " + "\u2022 You are immune to being frightened.",
	improvements : "Touch of Sess’inek (feat): +1 Constitution or Wisdom;",
	languageProfs : ["Abyssal"],
	savetxt : { immune : ["frightened"] }
};

FeatsList["tanarukk blood-xgteerf"] = {
	name : "Tanarukk Blood",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being an Orc",
	prereqeval : "CurrentRace.known.indexOf('half-orc') == -1 && CurrentRace.known.indexOf('orc') !== -1",
	description : "I have resistance to fire and poison damage. I gain a bite attack that uses Strength and deals 1d6 piercing damage. [+1 Strength or Constitution]",
	descriptionFull : "Through fell magic or an ancestor, you are touched by the corruptive power of Baphomet. You gain the following benefits:" + "\n " + "\u2022 Increase your Strength or Constitution score by 1, to a maximum of 20." + "\n " + "\u2022 You have resistance to fire and poison damage." + "\n " + "\u2022 You gain a bite attack as a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
	improvements : "Tanarukk Blood (feat): +1 Strength or Constitution;",
	dmgres : ["Fire", "Poison"],
	weaponsAdd : ["Bite"],
	weaponOptions : {
		regExpSearch : /bite/i,
		name : "Bite",
		source : ["XGtE:ERF", 2],
		ability : 1,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		abilitytodamage : true
	},
};

FeatsList["feline grace-xgteerf"] = {
	name : "Feline Grace",
	source : ["XGtE:ERF", 1],
	prerequisite : "Being a Tabaxi",
	description : "I can use my Feline Agility trait twice before I must move 0 feet on one of my turns to use the trait again. I can still only use this ability once per turn when I move. I take no damage from falling 20 ft or less, if I'm not incapacitated. [+1 Dexterity]",
	descriptionFull : "Your incredible reflexes and agility further improve. You gain the following benefits:" + "\n " + "\u2022 Increase your Dexterity score by 1, to a maximum of 20." + "\n " + "\u2022 You can use your Feline Agility trait twice before you must move 0 feet on one of your turns to use the trait again. You can still only use this ability once per turn when you move." + "\n " + "\u2022 You don’t take damage from falling 20 feet or less if you aren’t incapacitated.",
	prereqeval : "CurrentRace.known.indexOf('tabaxi') !== -1",
	scores : [0, 1, 0, 0, 0, 0]
};

FeatsList["tortle protector-xgteerf"] = {
	name : "Tortle Protector",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Tortle",
	prereqeval : "CurrentRace.known.indexOf('tortle') !== -1",
	description : "My natural armor grants a base AC of 18. Once per short rest, when I make a Dex save, I can use my reaction to grant creatures I choose within 5 ft the benefits of half-cover. This lasts while they stay within 5 ft of me until the start of my next turn. [+1 Str or Wis]",
	descriptionFull : "You have mastered using your shell to better protect yourself and others. You gain the following benefits:" + "\n " + "\u2022 Increase your Strength or Wisdom score by 1, to a maximum of 20." + "\n " + "\u2022 Your natural armor trait now provides a base AC of 18. As normal, your Dexterity modifier doesn’t affect this number." + "\n " + "\u2022 As a reaction when you are forced to make a Dexterity saving throw, choose any number of creatures within 5 feet of you. Each chosen creature is considered to have half-cover against any harmful attacks or effects while within 5 feet of you until the start of your next turn. Once you use this ability, you can’t do so again until you’ve finished a short or long rest.",
	improvements : "Tortle Protector (feat): +1 Strength or Wisdom;",
	extraAC : {
		name : "Tortle Protector",
		mod : 1,
		text : "My Natural Armor's base AC is 18."
	},
	usages : 1,
	recovery : "short rest",
	action : ["reaction", ""]
};

FeatsList["triton deep magic-xgteerf"] = {
	name : "Triton Deep Magic",
	source : ["XGtE:ERF", 3],
	prerequisite : "Being a Triton",
	prereqeval : "CurrentRace.known.indexOf('triton') !== -1",
	description : "I can cast Create or Destroy Water at will, without expending a spell slot. I can also cast Warding Wind and Water Breathing without expending a spell slot, but each only once per long rest. Charisma is my spellcasting ability for these three spells.",
	descriptionFull : "You master more of the magic of elemental air and water." + "\n" + "You learn the create or destroy water spell and can cast it as a 1st level spell at will, without expending a spell slot. You also learn warding wind and water breathing, each of which you can cast once without expending a spell slot. You regain the ability to cast those two spells in this way when you finish a long rest. Charisma is your spellcasting ability for all three spells.",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 6,
		spells : ["create or destroy water"],
		selection : ["create or destroy water"],
		firstCol : 'atwill'
	}, {
		name : "Once per long rest",
		spellcastingAbility : 6,
		spells : ["warding wind"],
		selection : ["warding wind"],
		firstCol : 'oncelr'
	}, {
		name : "Once per long rest",
		spellcastingAbility : 6,
		spells : ["water breathing"],
		selection : ["water breathing"],
		firstCol : 'oncelr'
	}]
};

FeatsList["serpent form-xgteerf"] = {
	name : "Serpent Form",
	source : ["XGtE:ERF", 2],
	prerequisite : "Being a Yuan-ti Pureblood",
	prereqeval : "CurrentRace.known.indexOf('yuan-ti pureblood') !== -1",
	description : "As an action, I can polymorph into a medium snake/revert; statistics are the same in both. My equipment isn't transformed. As a snake, I gain a bite attack that deals 1d4 piercing damage. Once per long rest, I can add 2d6 poison damage to a bite attack. [+1 Int or Cha]",
	descriptionFull : "You have unlocked more of your serpentfolk heritage. You gain the following benefits:" + "\n " + "\u2022 Increase your Intelligence or Charisma score by 1, to a maximum of 20." + "\n " + "\u2022 You can use an action to polymorph into a Medium snake or back into your true form. Your statistics are the same in each form. Any equipment you are wearing or carrying isn’t transformed. If you die, you stay in your current form." + "\n " + "\u2022 While in snake form, you gain a bite attack as a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike. When you hit with a bite attack, you can choose to deal 2d6 additional poison damage to the target. Once you deal this poison damage, you can’t do so again until you finish a long rest.",
	improvements : "Serpent Form (feat): +1 Intelligence or Charisma;",
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^(?=.*(serpent|snake))(?=.*bite).*$/i,
		name : "Snake Bite",
		source : ["XGtE:ERF", 2],
		damage : [1, 4, "piercing"],
		description : "Only in snake form; Once per long rest, deal an additional 2d6 poison damage"
	},
	weaponsAdd : ['Snake Bite'],
	limfeaname : "Serpent Form (2d6 Poison Damage)",
	usages : 1,
	recovery : "long rest",
	action : ["action", " (transform/revert)"]
};