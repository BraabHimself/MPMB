/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of the Open Seas"
				This is taken from D&D Beyond (https://www.dndbeyond.com/classes/paladin#OathoftheOpenSea)
				This subclass is made by Matthew Mercer
	Code by:	u/Newbuu2
	Date:		2020-10-17
*/

var iFileName = "Paladin - Oath of the Open Seas [by Matthew Mercer].js";
RequiredSheetVersion(13);

// Define the source
SourceList["MM:OotOS"] = {
	name : "Matthew Mercer: Oath of the Open Seas",
	abbreviation : "MM:OotOS",
	group : "D&D Beyond",
	url : "https://www.dndbeyond.com/classes/paladin#OathoftheOpenSea",
	date : "2020/10/16"
};

AddSubClass("paladin", "oath of the open seas", {
	regExpSearch : /^(((?=.*(sea|pirate|swashbuckler))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))|((?=.*(sea|pirate|swashbuckler))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Oath of the Open Seas",
	source : ["MM:OotOS", 1],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Marine Layer",
			source : ["MM:OotOS", 1],
			minlevel : 3,
			description : desc([
				"As an action, I can create a fog cloud, obscuring 20 ft around me in all directions",
				"It lasts for 10 minutes, spreads around corners, moves with me, and cannot be dispersed",
				"Myself and creatures within 5 ft of me are considered lightly obscured",
			]),
			action : ["action", ""],
			spellcastingExtra : ["create or destroy water", "expeditious retreat", "augury", "misty step", "call lightning", "tidal wave", "control water", "freedom of movement", "commune with nature", "maelstrom"]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Fury of the Tides",
			source : ["MM:OotOS", 1],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can empower my attacks to push creatures away from me for 1 min",
				"Once per turn, I can push a creature 10 ft away from me when I hit it with a weapon",
				"If pushed into another creature or obstacle, they take Cha mod bludgeoning damage"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Aura of Liberation",
			source : ["MM:OotOS", 1],
			minlevel : 7,
			description : desc([
				"While not incapacitated, creatures of my choice within range and I gain benefits:",
				" \u2022 We can't be grappled/restrained; ignore movement/attack penalties while underwater",
				" \u2022 If already grappled/restrained use 5 ft of movement to escape nonmagical restraints"
			]),
			additional : levels.map( function(n) {
				return (n < 7 ? "" : (n < 18 ? "10-foot aura" : "30-foot aura"));
			})
		},
		"subclassfeature15" : {
			name : "Stormy Waters",
			source : ["MM:OotOS", 1],
			minlevel : 15,
			description : desc([
				"I can use my reaction to crash water on a creature that enters/exits my melee range",
				"It takes 1d12 bludgeoning damage and makes a Str save; knocked prone on a failure"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature20" : {
			name : "Mythic Swashbuckler",
			source : ["MM:OotOS", 1],
			minlevel : 20,
			description : desc([
				"As an action, I channel the spirits of historic sea captains for 1 minute and gain benefits:",
				" \u2022 See third page notes section"
			]),
			toNotesPage : [{
				name : "Mythic Swashbuckler Benefits",
				popupName : "Oath of the Open Seas: Mythic Swashbuckler",
				page3notes : true,
				note : [
					" \u2022 Climbing costs no additional movement; I have adv. on Strength (Athletics) checks",
					" \u2022 My attacks have advantage against a creature within 5 ft if no one else within 5 ft of me",
					" \u2022 I can take the Dodge action as a bonus action",
					" \u2022 I have advantage on Dexterity checks and Dexterity saves against seen effects"
				]
			}],
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});
