/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Hedge Wizard
	Effect:     Adds the Hedge Wizard Arcane tradition to the list of available sublclasses for wizards.
	Created by: u/LaserLlama
	Code by:	Newbuu2
	Date:		2021-01-30 (sheet v13)
*/

var iFileName = "Hedge Wizard by LaserLlama.js";

RequiredSheetVersion(13);

SourceList["LL:HW"] = {
	name : "LaserLlama: Hedge Wizard",
	abbreviation : "LL:HW",
	date : "2020/10/25",
	group : "Homebrew",
	url : "https://www.gmbinder.com/share/-M0ntPkLWIcpaUrn7E9h"
};

AddSubClass("wizard", "hedge magic", {
	regExpSearch : /^(?=.*hedge)(?=.*mag(ic|e)).*$/i,
	subname : "Hedge Magic",
	fullname : "Hedge Magic",
	source : ["P", 116],
	features : {
		"subclassfeature2" : {
			name : "Cantrip Savant",
			source : ["LL:HW", 1],
			minlevel : 2,
			description : desc([
				"I learn one cantrip of my choice from any spell list",
				"I learn additional cantrips at 6th, 10th, and 14th levels in this class",
				"These count as a wizard cantrips and don't count against the number of cantrips I know",
			]),
			spellcastingBonus : {
				name : "Cantrip Savant",
				level : [0, 0],
				firstCol : 'atwill',
				times : [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4]
			},
			additional : levels.map(function (n) {
				return (n < 2 ? "" : n < 6 ? "1 bonus cantrip" : n < 10 ? "2 bonus cantrips" : n < 14 ? "3 bonus cantrips" : "4 bonus cantrips");
			}),
		},
		"subclassfeature2.1" : {
			name : "Self-Taught",
			source : ["LL:HW", 1],
			minlevel : 2,
			description : desc([
				"I halve time needed to copy spells into my spellbook and the cost is reduced by 50gp"
			])
		},
		"subclassfeature6" : {
			name : "On the Fly",
			source : ["LL:HW", 1],
			minlevel : 6,
			description : desc([
				"As an action, I can cast an unprepared spell that has a casting time of 1 action",
				"Casting a spell in this way consumes a spell slot, which can be higher than the spell's level"
			]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : n < 10 ? "2nd level spell" : n < 14 ? "3rd level spell" : n < 18 ? "4th level spell" : "5th level spell");
			}),
			usages : "Intelligence modifier per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : ["action", " (cast spell)"]
		},
		"subclassfeature10" : {
			name : "Hardy Magic",
			source : ["LL:HW", 1],
			minlevel : 10,
			description : desc([
				"I can add my Int modifier (min 1) to Con saves to maintain concentration on a spell"
			])
		},
		"subclassfeature14" : {
			name : "Arcane Conservation",
			source : ["LL:HW", 1],
			minlevel : 14,
			description : desc([
				"I can regain a spell slot when I miss or fail with a spell of 4th level or lower",
				"The spell level increases to 5th level when I reach 18th level in this class",
				"The spell slot must of a level lower than the one used to cast the spell"
			])
		}
	}
});