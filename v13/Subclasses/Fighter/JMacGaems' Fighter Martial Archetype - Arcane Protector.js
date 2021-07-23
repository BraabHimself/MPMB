var iFileName = "JMacGaems' Fighter Martial Archetype - Arcane Protector.js";

RequiredSheetVersion(13);

SourceList["JM:AP"] = {
	name : "JMacGaems' Fighter Martial Archetype - Arcane Protector",
	abbreviation : "JM:AP",
	group : "Homebrew",
	url : "https://drive.google.com/file/d/1yXvt85BKYqqfNpm5PNk5t4ZD_s5PaAo1/view",
	date : "2021/02/07"
};

AddSubClass("fighter", "arcane protector", {
	regExpSearch : /arcane protector/i,
	subname : "Arcane Protector",
	fullname : "Arcane Protector",
	source : ["JM:AP", 1],
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
			source : ["JM:AP", 1],
			minlevel : 3,
			description : desc([
				"I can cast prepared wizard spells/cantrips, using Intelligence as my spellcasting ability",
				"I can use a weapon as a spellcasting focus for my wizard spells",
				"I can replace one wizard cantrip I know for another when I complete a long rest"
			]),
			additional : levels.map(function (n, idx) {
				return [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3][idx] + " cantrips known";
			})
		},
		"subclassfeature3.1" : {
			name : "Well Researched",
			source : ["JM:AP", 1],
			minlevel : 3,
			description : desc([
				"I gain proficiency in Arcana and History; or gain a skill of my choice if already proficient",
				"I can add half my prof bonus to any Intelligence checks that don't already include it",
				"I learn the explosive bulwark spell",
				"This spell is always prepared doesn't count against the number of spells I can prepare"
			]),
			skillstxt : "I gain proficiency in Arcana and History; or gain a skill of my choice if already proficient",
			spellcastingBonus : {
				name : "Well Researched",
				spells : ["explosive bulwark"],
				selection : ["explosive bulwark"],
				prepared : true
			}
		},
		"subclassfeature7" : {
			name : "Arcane Armor",
			source : ["JM:AP", 1],
			minlevel : 7,
			description : desc([
				"As a bonus action, I can surround my body with arcane armor",
				"I gain the following benefits for 1 minute:",
				" \u2022 I gain proficiency in a saving throw I am not proficient in",
				" \u2022 Enemies within 5ft have disadv. on the first save against spells I cast"
			]),
			usages : "Proficiency bonus per ",
			recovery : "long rest",
			usagescalc : "event.value = Number(What('Proficiency Bonus'));",
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Arcane Barrier",
			source : ["JM:AP", 2],
			minlevel : 10,
			description : desc([
				"As a reaction, I can aid a creature within 30 ft of me making a save vs. magic",
				"They add my Intelligence modifier to their save",
				"The creature takes no damage on a success and half damage on a failure"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["reaction", " (save vs. magic)"]
		},
		"subclassfeature15" : {
			name : "Arcane Surge",
			source : ["JM:AP", 2],
			minlevel : 15,
			description : desc([
				"When I use Action Surge, I can regain expended spell splots"
			]),
			usages : 2,
			recovery : "long rest",
			additional : levels.map(function (n, idx) {
				return (n < 15 ? "" : n < 18 ? "1 1st level" : "1 1st level; 1 2nd level");
			})
		},
		"subclassfeature18" : {
			name : "Aura of Negation",
			source : ["JM:AP", 2],
			minlevel : 18,
			description : desc([
				"When I use Arcane Armor, I can generate a 15 ft aura of negation, granting benefits:",
				" \u2022 Allies within range and I have adv. on saves vs. spells and magical effects",
				" \u2022 I can use Arcane Barrier on a creature within range without expending a use"
			]),
			action : ["bonus action", " (with Arcane Armor)"],
			usages : 1,
			recovery : "long rest",
			altResource : "SS 4+"
		}
	}
});

SpellsList["explosive bulwark"] = {
	name : "Explosive Bulwark",
	classes : [],
	source : ["JM:AP", 2],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V,M",
	compMaterial : "A melee weapon worth at least 1 sp",
	duration : "Conc, 1 min",
	description : "Next wea hit +1d8+1d8/SL (max 5d8) Force dmg; gain half force dmg + Int mod temp hp; See book",
	descriptionFull : "The next time you hit a creature with a melee weapon attack during the spell’s duration, the attack deals an extra 1d8 force damage. In addition, you gain temporary hit points equal to half the force damage dealt (rounded up) + your spell casting modifier (minimum of 1)." + "\n   " + "While you have temporary hitpoints granted by this spell, if you are hit with a melee attack, the creature takes force damage equal to amount of damage they dealt. This damage cannot exceed the amount of temporary hitpoints you have remaining." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the initial extra damage dealt by the attack increases by 1d8 for each spell level above 1st, up to a maximum of 4d8."
};

MagicItemsList["locket of research"] = {
	name : "Locket of Research",
	source : ["JM:AP", 3],
	type : "wondrous item",
	rarity : "uncommon",
	description : "When I make an Intelligence or Wisdom ability check for a skill I am proficient in, or is affected by a feature such as Well Researched or Improved Abjuration, I treat a roll of 3 or lower as a 4.",
	descriptionFull : "This silver locket has a pocket dimension inside of it where you can keep small pieces of paper. When you make a Intelligence or Wisdom ability check for a skill you are proficient in, or is affected by a feature such as Well Researched or Improved Abjuration, you treat a roll of 3 or lower as a 4."
};

MagicItemsList["rule breaker +2"] = {
	name : "Rule Breaker +2",
	source : ["JM:AP", 3],
	type : "armor (medium, or heavy)",
	rarity : "legendary",
	description : "This armor grants a +2 bonus to AC and is not affected by a zone of antimagic. It has 5 charges, regaining 1d4-1 (min 1) charges at dawn. See Notes page.",
	descriptionFull : "This suit of armor is scratched, bent, and slightly discolored but shows signs of once being a suit of armor even the gods would have been amazed by. While wearing this armor, you gain a +2 bonus to AC." + "\n   " + "Rule Breaker has the following properties: " + "\n" + "\u2022 The enchantments on this armor are not affected by a zone of antimagic." + "\n" + "\u2022 The armor has 5 charges. You can use the charges to do the following:" + "\n      " + "\u2022 If you attempt to cast a spell while in a zone of antimagic, you can expend 1 charge to allow the spell to succeed." + "\n      " + "\u2022 You can expend 1 charge (no action required) to become an unstoppable force. Until the start of your next turn nothing can stop your movement. You gain the effects of the Freedom of Movement spell and can not be stunned or held by magical restraints. You can move through effects such as Wall of Force as if it were difficult terrain." + "\n      " + "\u2022 As a reaction to missing an attack, you can expend 1 charge to turn it into a hit." + "\n      " + "\u2022 As a reaction when you fail a saving throw you can expend 2 charges to succeed instead." + "\n   " + "The armor regains 1d4 - 1 (minimum of 1) charges daily at dawn.",
	usages : 5,
	recovery : "dawn",
	additional : "regains 1d4-1 (min 1)",
	allowDuplicates : true,
	attunement : true,
	chooseGear : {
		type : "armor",
		prefixOrSuffix : "brackets",
		descriptionChange : ["replace", "armor"],
		excludeCheck : function (inObjKey, inObj) {
			return !(/medium|heavy/i).test(inObj.type);
		}
	},
	actions : [["reaction", " (missed attack / 1 charge)"], ["reaction", " (failed save / 2 charges"]],
	toNotesPage : [{
		name : "Rule Breaker Features",
		source : ["JM:AP", 3],
		popupName : "Rule Breaker Features",
		note : "\n  Rule Breaker has 5 charges, regaining 1d4-1 (min 1) charges at dawn" + "\n  You can spend charges in the following ways:" + "\n   \u2022 I can spend 1 charge to ignore an antimagic zone when casting a spell" + "\n   \u2022 I can spend 1 charge to gain effects until the start of my next turn:" + "\n      \u2022 I gain the effects of the freedom of movement spell" + "\n      \u2022 I cannot be stunned or be held by magical restraints" + "\n      \u2022 I can move through effects like wall of force as if it were difficult terrain" + "\n   \u2022 As a reaction, I can spend 1 charge to turn a missed attack into a hit" + "\n   \u2022 As a reaction, I can spend 2 charges to turn a failed saved into a success"
	}]
};

MagicItemsList["walking fortress +1"] = {
	name : "Walking Fortress +1",
	source : ["JM:AP", 3],
	type : "armor (shield)",
	rarity : "rare",
	attunement : true,
	prerequisite : "Requires attunement by a fighter",
	prereqeval : function(v) { return classes.known.fighter ? true : false; },
	description : "While holding this shield, I have a +1 bonus to AC. This bonus is in addition to the shield's normal bonus to AC. When I use my Second Wind feature, I gain temporary hit points equal to my fighter level + Constitution modifier.",
	descriptionFull : "This shield is made of a nearly indestructible blue glass that is surrounded by polished steel. While holding this shield, you have a +1 bonus to AC, in addition to the AC bonus normally provided by the shield.",
	shieldAdd : "Walking Fortress +1",
};

MagicItemsList["weave rider +2"] = {
	name : "Weave Rider +2",
	source : ["JM:AP", 3],
	type : "weapon (any sword)",
	rarity : "very rare",
	description : "This sword grants +2 to attack and damage rolls and can be used as a spellcasting focus. When I cast a spell of at least 1st level that expends a spell slot, it gains charges equal to the spell's level: 1st (5), 2nd (7), 3rd (9). I can use charges in place of spell slots. These charges disappear at dawn.",
	descriptionFull : "This blue crystal blade softly glows with magical energy. If you place your ear to it you can hear a slight hum. You gain a +2 bonus to attack and damage rolls made with this weapon. When you are attuned to this sword, it acts as a spellcasting focus for you. Additionally, when you cast a spell of 1st level of higher that expends a spell slot you gain a number of charges equal to the spells level. You can use these charges to cast spells instead of using spell slots. These charges disappear daily at dawn.",
	attunement : true,
	chooseGear : {
		type : "weapon",
		prefixOrSuffix : "suffix",
		descriptionChange : ["replace", "sword"],
		excludeCheck : function (inObjKey, inObj) {
			var testRegex = /sword|scimitar|rapier/i;
			return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
		}
	}
};