/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.
*/

/*	-INFORMATION-

	Subject:	Druid Circle: Circle of Storms

	Effect:		Adds the Circle of Storms subclass option to the sheet

	Author:     u/Newbuu2

	Remarks:	Requires the source Xanathar's Guide to Everything
*/

var iFileName = "circleOfStorms.js";

RequiredSheetVersion(13);

SourceList["NB2:Storms"] = {
	name : "Newbuu2: Circle of Storms",
	abbreviation : "NB2:Storms",
	group : "Homebrew",
	url : "https://homebrewery.naturalcrit.com/share/F4vF_Gm3b",
	date : "2020/09/08"
};

AddSubClass("druid", "circle of storms", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*storms).*$/i,
	subname : "Circle of Storms",
	source : ["NB2:Storms", 1],
	features : {
		"subclassfeature2" : {
			name : "Storm Initiate",
			source : ["NB2:Storms", 1],
			minlevel : 2,
			description : desc([
				"I learn the Gust, Shocking Grasp, or Thunderclap cantrip",
			]),
			choices : ["Gust", "Shocking Grasp", "Thunderclap"],
			"gust" : {
				name : "Storm Initiate",
				description : desc([
					"I learn the Gust cantrip",
				]),
				spellcastingBonus : {
					name : "Storm Initiate: Gust",
					spells : ["gust"],
					selection : ["gust"],
					firstCol : 'atwill'
				}
			},
			"shocking grasp" : {
				name : "Storm Initiate",
				description : desc([
					"I learn the Shocking Grasp cantrip",
				]),
				spellcastingBonus : {
					name : "Storm Initiate: Shocking Grap",
					spells : ["shocking grasp"],
					selection : ["shocking grasp"],
					firstCol : 'atwill'
				}
			},
			"thunderclap" : {
				name : "Storm Initiate",
				description : desc([
					"I learn the Thunderclap cantrip",
				]),
				spellcastingBonus : {
					name : "Storm Initiate: Thunderclap",
					spells : ["thunderclap"],
					selection : ["thunderclap"],
					firstCol : 'atwill'
				}
			}
		},
		"subclassfeature2.1" : {
			name : "Storm Surge",
			source : ["NB2:Storms", 1],
			minlevel : 2,
			description : desc([
				"I have a pool of energy represented by a number of d8s equal to my druid level",
				"When I deal lightning or thunder damage with a spell, I can add damage with these dice",
				"I roll the expended dice and add the number as extra lightning or thunder damage",
				"I can spend up to half my druid level worth of dice from the pool at once"
			]),
			usages : ["", "2d10 per ", "3d10 per ", "4d10 per ", "5d10 per ", "6d10 per ", "7d10 per ", "8d10 per ", "9d10 per ", "10d10 per ", "11d10 per ", "12d10 per ", "13d10 per ", "14d10 per ", "15d10 per ", "16d10 per ", "17d10 per ", "18d10 per ", "19d10 per ", "20d10 per "],
			recovery : "long rest"
		},
		"subclassfeature3" : {
			name : "Circle Spells",
			source : ["NB2:Storms", 1],
			minlevel : 3,
			description : desc([
				"My affinity for storms gives me with the ability to cast certain spells",
				"These are always prepared, but don't count against the number of spells I can prepare"
			]),
			spellcastingExtra : ["misty step", "shatter", "fly", "lightning bolt", "otiluke's resilient sphere", "storm sphere", "control winds", "destructive wave", "chain lightning"]
		},
		"subclassfeature6" : {
			name : "Tempest's Fury",
			source : ["NB2:Storms", 1],
			minlevel : 6,
			description : desc([
				"I can expend a use of Wild Shape to do maximum damage for a lightning/thunder spell"
			])
		},
		"subclassfeature6.1" : {
			name : "Stunning Burst",
			source : ["NB2:Storms", 1],
			minlevel : 6,
			description : desc([
				"When I deal lightning or thunder damage with a spell, I can expend a storm surge die",
				"If I do, I can force a damaged creature to make a Constitution saving throw",
				"On a failure, the creature is stunned until the start of its next turn"
			]),
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Stormblood",
			source : ["NB2:Storms", 1],
			minlevel : 10,
			description : desc([
				"I gain resistance to lightning and thunder damage"
			]),
			dmgres : ["Lightning", "Thunder"]
		},
		"subclassfeature14" : {
			name : "Storm Emissary",
			source : ["NB2:Storms", 1],
			minlevel : 14,
			description : desc([
				"Once per long rest, I can cast Control Weather without expending a spell slot",
				"The first changes to weather conditions take effect immediately"
			]),
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Storm Emissary",
				spells : ["control weather"],
				selection : ["control weather"],
				firstCol : 'oncelr'
			},
			spellChanges : {
				"control weather" : {
					changes : "Using my Storm Emissary class feature I can cast Control Weather once per long rest without needing a spell slot. The first changes to weather conditions take effect immediately."
				}
			}
		}
	}
});