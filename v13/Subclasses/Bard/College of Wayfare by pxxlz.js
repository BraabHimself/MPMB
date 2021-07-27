/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Bard College: Wayfare
	Effect:     This file adds the College of Wayfare as a bard subclass
	Author:     pxxlz
	Code by:	Newbuu2
	Date:		2021-07-27 (sheet v13)
*/

var iFileName = "College of Wayfare by pxxlz.js";

RequiredSheetVersion(13);

SourceList["P:CoW"] = {
	name : "pxxlz's College of Wayfare",
	abbreviation : "P:CoW",
	group : "Reddit Unearthed Arcana",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/os5uj2/bard_college_of_wayfare_a_bard_subclass_to_travel/",
	date : "2021/07/26"
};

AddSubClass("bard", "college of wayfare", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*wayfare).*$/i,
	subname : "College of Wayfare",
	source : ["P:CoW", 1],
	features : {
		"subclassfeature3" : {
			name : "Well Traveled",
			source : ["P:CoW", 1],
			minlevel : 3,
			description : desc([
				"I gain proficiency with navigator's tools",
				"I gain proficiency and expertise with my choice of History, Nature, or Survival",
				"Use the \"Choose Feature\" button above to select the skill"
			]),
			toolProfs : ["Navigator's tools"],
			choices : ["History", "Nature", "Survival"],
			"history" : {
				name : "Well Traveled: History",
				description : desc([
					"I gain proficiency with navigator's tools",
					"I gain proficiency and expertise with History"
				]),
				skills : ["History", "full"]
			},
			"nature" : {
				name : "Well Traveled: Nature",
				description : desc([
					"I gain proficiency with navigator's tools",
					"I gain proficiency and expertise with Nature"
				]),
				skills : ["Nature", "full"]
			},
			"survival" : {
				name : "Well Traveled: Survival",
				description : desc([
					"I gain proficiency with navigator's tools",
					"I gain proficiency and expertise with Survival"
				]),
				skills : ["Survival", "full"]
			}
		},
		"subclassfeature3.1" : {
			name : "Adventurous Inspiration",
			source : ["P:CoW", 1],
			minlevel : 3,
			description : desc([
				"When I give a creature bardic inspiration, it can use its reaction to move",
				"It moves up to half its movement speed; doesn't provoke opportunity attacks"
			])
		},
		"subclassfeature6" : {
			name : "Off the Beaten Path",
			source : ["P:CoW", 1],
			minlevel : 6,
			description : desc([
				"My walking speed increases by 10 ft",
				"My movement ignores non-magical difficult terrain",
				"Creatures that have my bardic inspiration also gain these benefits"
			]),
			speed : { walk : {spd : "+10", enc : "+10" } }
		},
		"subclassfeature6.1" : {
			name : "Rest for the Weary",
			source : ["P:CoW", 1],
			minlevel : 6,
			description : desc([
				"After a short rest, I reduce my exhaustion level by 1",
				"My Song of Rest restores additional HP equal to my Charisma modifier"
			])
		},
		"subclassfeature14" : {
			name : "Abiding Inspiration",
			source : ["P:CoW", 1],
			minlevel : 14,
			description : desc([
				"When a creature rolls one of my bardic inspiration die, it is not lost",
				"Instead, it turns into an abiding inspiration die, which is a d6",
				"It functions the same as a bardic inspiration die, but lasts until a short or long rest",
				"Once this abiding inspiration die is rolled, it is lost"
			])
		}
	}
});