/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Cleric Domain: Luck
	Effect:     This file adds the Luck Domain as a cleric subclass
	Author:     OrpheusL
	Code by:	Newbuu2
	Date:		2019-09-02 (sheet v13)
*/

var iFileName = "Luck Domain by OrpheusL.js";

RequiredSheetVersion(13);

SourceList["OL:LD"] = {
	name : "OrpheusL's Luck Domain",
	abbreviation : "OL:LD",
	group : "Homebrew",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/cypki9/luck_domain_for_clerics_believing_in_the_power_of/",
	date : "2019/09/02"
};

AddSubClass("cleric", "luck domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*luck).*$/i,
	subname : "Luck Domain",
	source : ["OL:LD", 1],
	spellcastingExtra : ["bane", "bless", "enhance ability", "locate object", "beacon of hope", "bestow curse", "freedom of movement", "locate creature", "passwall", "skill empowerment"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Cantrips",
			source : ["OL:LD", 1],
			minlevel : 1,
			description : desc([
				"I learn the Guidance and Resistance cantrips, not counting for the number I can know"
			]),
			spellcastingBonus : [{
				name : "Bonus Cantrips",
				spells : ["guidance"],
				selection : ["guidance"]
			}, {
				name : "Bonus Cantrips",
				spells : ["resistance"],
				selection : ["resistance"]
			}]
		},
		"subclassfeature1.1" : {
			name : "Auspicious Circumstances",
			source : ["OL:LD", 1],
			minlevel : 1,
			description : desc([
				"As a reaction, I can cancel the disadv. of an attack/check/save of a creature within 30 ft"
			]),
			action : ["reaction", ""],
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			usages : "Wisdom modifier per ",
			recovery : "long rest"
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Touch of Fortune",
			source : ["OL:LD", 1],
			minlevel : 2,
			description : desc([
				"As a bonus action, I can touch a creature to instill a creature with good fortune",
				"For the next 10 minutes the creature can choose to make 1 attack/check/save with adv.",
				"They can choose to do so after it rolls, but before any effects of the roll occur"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Channel Divinity: Unluck",
			source : ["OL:LD", 1],
			minlevel : 6,
			description : desc([
				"As a reaction, I can give disadv. to an attack/check/save of a creature within 30 ft"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : ["OL:LD", 1],
			minlevel : 8,
			description : "\n   I add my Wisdom modifier to the damage I deal with my cleric cantrips",
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Wis Mod');
						}
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("cleric") == -1 || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0) return;
						if (spellKey == "shillelagh") {
							spellObj.description = spellObj.description.replace("1d8", "1d8+" + What("Wis Mod"));
							return true;
						}
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis", true);
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Lucky Strike",
			source : ["OL:LD", 1],
			minlevel : 17,
			description : desc([
				"As a reaction, I can turn an attack/check/save roll of a creature within 30 ft to a 20",
				"I can choose to do so after it rolls, but before any effects of the roll occur"
			]),
			action : ["reaction", ""],
			usages : 1,
			recovery : "short rest"
		}
	}
});