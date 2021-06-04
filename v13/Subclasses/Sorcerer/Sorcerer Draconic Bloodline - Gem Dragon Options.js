/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Sorcerer: Draconic Bloodline - Gem Dragon Options
	Effect:     This file adds the gem dragon Amethyst, Crystal, Emerald, Sapphire, and Topaz as options for
	Author:     Newbuu2
	Code by:	Newbuu2
	Date:		2021-06-04 (sheet v13)
*/

var iFileName = "Sorcerer Draconic Bloodline - Gem Dragon Options.js";

RequiredSheetVersion(13);

SourceList["NB2:GDO"] = {
	name : "Sorcerer Draconic Bloodline - Gem Dragon Options",
	abbreviation : "NB2:GDO",
	group : "Homebrew",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/ldlh8q/hexblade_revisited_v02_a_reworked_hexblade_that/",
	date : "2021/06/04"
};

if(ClassSubList["sorcerer-draconic bloodline"])
{
	var DragonAncestorFeature    = ClassSubList["sorcerer-draconic bloodline"].features["subclassfeature1"];
	var ElementalAffinityFeature = ClassSubList["sorcerer-draconic bloodline"].features["subclassfeature6"];
	
	if(DragonAncestorFeature && ElementalAffinityFeature)
	{
		app.alert({
			cTitle : "Made it",
			nIcon : 3,
			cMsg : "Both features detected."
		});
		
		// add draconic ancestor choices
		AddFeatureChoice(DragonAncestorFeature, false, "Amethyst Dragon Ancestor", {
			name : "Amethyst Dragon Ancestor",
			source : ["NB2:GDO", 1],
			description : desc([
				"I have draconic ancestry with amethyst dragons, which are affiliated with force damage",
				"When interacting with dragons, if I can add my proficiency bonus, I can double it"
			]),
			dependentChoices : "force"
		});
		
		AddFeatureChoice(DragonAncestorFeature, false, "Crystal Dragon Ancestor", {
			name : "Crystal Dragon Ancestor",
			source : ["NB2:GDO", 1],
			description : desc([
				"I have draconic ancestry with crystal dragons, which are affiliated with radiant damage",
				"When interacting with dragons, if I can add my proficiency bonus, I can double it"
			]),
			dependentChoices : "radiant"
		});
		
		AddFeatureChoice(DragonAncestorFeature, false, "Emerald Dragon Ancestor", {
			name : "Emerald Dragon Ancestor",
			source : ["NB2:GDO", 1],
			description : desc([
				"I have draconic ancestry with emerald dragons, which are affiliated with psychic damage",
				"When interacting with dragons, if I can add my proficiency bonus, I can double it"
			]),
			dependentChoices : "psychic"
		});
		
		AddFeatureChoice(DragonAncestorFeature, false, "Sapphire Dragon Ancestor", {
			name : "Sapphire Dragon Ancestor",
			source : ["NB2:GDO", 1],
			description : desc([
				"I have draconic ancestry with sapphire dragons, which are affiliated with thunder damage",
				"When interacting with dragons, if I can add my proficiency bonus, I can double it"
			]),
			dependentChoices : "thunder"
		});
		
		AddFeatureChoice(DragonAncestorFeature, false, "Topaz Dragon Ancestor", {
			name : "Topaz Dragon Ancestor",
			source : ["NB2:GDO", 1],
			description : desc([
				"I have draconic ancestry with topaz dragons, which are affiliated with necrotic damage",
				"When interacting with dragons, if I can add my proficiency bonus, I can double it"
			]),
			dependentChoices : "necrotic"
		});
		
		// add elemental affinity choices
		AddFeatureChoice(ElementalAffinityFeature, false, "force", {
			name : "Force Elemental Affinity",
			source : ["NB2:GDO", 1],
			description : desc([
				"I add my Charisma modifier to one damage roll of a spell if it does force damage",
				"When I do this, I can spend 1 sorcery point to gain force resistance for 1 hour"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/force/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Cha Mod');
						};
					},
					"Cantrips and spells that deal force damage get my Charisma modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "force", "Cha", true);
					},
					"Cantrips and spells that deal force damage get my Charisma modifier added to their damage."
				]
			}
		});
		
		AddFeatureChoice(ElementalAffinityFeature, false, "radiant", {
			name : "Radiant Elemental Affinity",
			source : ["NB2:GDO", 1],
			description : desc([
				"I add my Charisma modifier to one damage roll of a spell if it does radiant damage",
				"When I do this, I can spend 1 sorcery point to gain radiant resistance for 1 hour"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/radiant/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Cha Mod');
						};
					},
					"Cantrips and spells that deal radiant damage get my Charisma modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "radiant", "Cha", true);
					},
					"Cantrips and spells that deal radiant damage get my Charisma modifier added to their damage."
				]
			}
		});
		
		AddFeatureChoice(ElementalAffinityFeature, false, "psychic", {
			name : "Psychic Elemental Affinity",
			source : ["NB2:GDO", 1],
			description : desc([
				"I add my Charisma modifier to one damage roll of a spell if it does psychic damage",
				"When I do this, I can spend 1 sorcery point to gain psychic resistance for 1 hour"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/psychic/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Cha Mod');
						};
					},
					"Cantrips and spells that deal psychic damage get my Charisma modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "psychic", "Cha", true);
					},
					"Cantrips and spells that deal psychic damage get my Charisma modifier added to their damage."
				]
			}
		});
		
		AddFeatureChoice(ElementalAffinityFeature, false, "thunder", {
			name : "Thunder Elemental Affinity",
			source : ["NB2:GDO", 1],
			description : desc([
				"I add my Charisma modifier to one damage roll of a spell if it does thunder damage",
				"When I do this, I can spend 1 sorcery point to gain thunder resistance for 1 hour"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/thunder/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Cha Mod');
						};
					},
					"Cantrips and spells that deal thunder damage get my Charisma modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "thunder", "Cha", true);
					},
					"Cantrips and spells that deal thunder damage get my Charisma modifier added to their damage."
				]
			}
		});
		
		AddFeatureChoice(ElementalAffinityFeature, false, "necrotic", {
			name : "Necrotic Elemental Affinity",
			source : ["NB2:GDO", 1],
			description : desc([
				"I add my Charisma modifier to one damage roll of a spell if it does necrotic damage",
				"When I do this, I can spend 1 sorcery point to gain necrotic resistance for 1 hour"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/necrotic/i).test(fields.Damage_Type)) {
							output.extraDmg += What('Cha Mod');
						};
					},
					"Cantrips and spells that deal necrotic damage get my Charisma modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "necrotic", "Cha", true);
					},
					"Cantrips and spells that deal necrotic damage get my Charisma modifier added to their damage."
				]
			}
		});
	}
};