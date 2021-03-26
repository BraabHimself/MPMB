/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Primal Path - Path of Inner Strength
	Effect:     This file adds the Path of Inner Strength as a barbarian subclass
	Author:     Newbuu2
	Code by:	Newbuu2
	Date:		2021-25-03 (sheet v13)
*/

var iFileName = "Primal Path - Path of Inner Strength by Newbuu2.js";

RequiredSheetVersion(13);

SourceList["NB2:IS"] = {
	name : "Newbuu2's Path of Inner Strength",
	abbreviation : "NB2:IS",
	group : "Homebrew",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/mcdfp2/primal_path_path_of_inner_strength_v10/",
	date : "2021/26/03"
};

AddSubClass("barbarian", "inner strength", {
	regExpSearch : /path of inner strength/i,
	subname : "Path of Inner Strength",
	source : ["S", 121],
	abilitySave : 6,
	features : {
		"subclassfeature3" : {
			name : "Mind Over Matter",
			source : ["NB2:IS", 1],
			minlevel : 3,
			description : desc([
				"When I rage, I can instead go into a focused state; no longer deal rage damage",
				"All damage I take is reduced by number equal to twice my rage damage"
			])
		},
		"subclassfeature3.1" : {
			name : "Stone-faced",
			source : ["NB2:IS", 1],
			minlevel : 3,
			description : desc([
				"Creatures have disadvantage on Wisdom (Insight) checks against me",
				"I also gain proficiency with Insight, or expertise if already proficient"
			]),
			skillstxt : "Proficiency with Insight; or gain Expertise if already proficient",
		},
		"subclassfeature6" : {
			name : "Bolstering Presence",
			source : ["NB2:IS", 1],
			minlevel : 6,
			description : desc([
				"When I go into a focused state, I can grant benefits to seen allies within 30 ft",
				"If I do, each ally chooses one of the following benefits:",
				" \u2022 Gain temporary HP equal to my barbarian level",
				" \u2022 Add my rage damage to Cha, Int, and Wis saving throws",
				"These benefits last for the duration of my focused state"
			]),
			usages : 3,
			recovery : "long rest",
			dmgres : ["Psychic"]
		},
		"subclassfeature10" : {
			name : "Poise",
			source : ["NB2:IS", 1],
			minlevel : 10,
			description : desc([
				"I can't be charmed or frightened",
				"I gain proficiency with Wis saves, or if I'm already proficient, either Int or Cha saves"
			]),
			savetxt : { immune : ["charmed", "frightened"] },
			saves : ["Wis"]
		},
		"subclassfeature14" : {
			name : "Palpable Resolve",
			source : ["NB2:IS", 1],
			minlevel : 14,
			description : desc([
				"While not wearing armor, I gain a +1 AC bonus",
				"I can reroll a failed saving throw, but must keep the new result"
			]),
			usages : 3,
			recovery : "long rest",
			extraAC : {
				mod : 1,
				text : "I gain a +1 bonus to AC while wearing no armor.",
				stopeval : function (v) { return v.wearingArmor; }
			}
		}
	}
});