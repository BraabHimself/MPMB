/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Oath of the Unconquered Paladin subclass
	Effect:		Adds the Oath of the Unconquered to the list of available subclasses for a paladin to pick at level 3
	Sheet:		v13
	Author:     /u/SethBlackwood
	Coded by:   Newbuu2  
*/

var iFileName = "oath_of_the_unconquered.js";

RequiredSheetVersion(13);

SourceList["OotU"] = {
	name : "Oath of the Unconquered",
	abbreviation : "OotU",
	group : "Homebrew",
	url : "https://www.reddit.com/r/DnD/comments/cbwzz9/oc_oath_of_the_unconquered_a_paladin_oath/",
	date : "2019/07/11"
};

AddSubClass("paladin", "oath of the unconquered", {
	regExpSearch : /^((?=.*unconquered|unbroken)|((?=.*bulwark)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))))).*$/i,
	subname : "Oath of the Unconquered",
	source : ["OotU", 0],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Adamantine Bulwark",
			source : ["OotU", 0],
			minlevel : 3,
			description : desc([
				"When hit by an attack or spell I can use a reaction to reduce the damage"
			]),
			action : ["reaction", ""],
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return n * 3 + " damage";
			}),
			spellcastingExtra : ["compelled duel", "shield", "warding bond", "enlarge/reduce", "beacon of hope", "wind wall", "otiluke's resilient sphere", "freedom of movement", "passwall", "wall of stone"]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Unstoppable Charge",
			source : ["OotU", 0],
			minlevel : 3,
			description : desc([
				"I can use an action to move up to my speed in a straight line, moving through enemies",
				"The first enemy up to a size larger makes a Strength saving throw",
				"On a failure they take 2d8 + paladin level damage and are moved with me",
				"Other creatures must make a Dexterity save or are knocked prone"
			]),
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Aura of Iron",
			source : ["OotU", 0],
			minlevel : 7,
			description : desc([
				"Me and allies within 10ft of me reduce all damage by my Cha mod (min 1)"
			]),
			additional : levels.map(function (n) {
				if (n < 7) return "";
				return (n < 18 ? 10 : 30) + "-foot aura";
			})
		},
		"subclassfeature15" : {
			name : "Living Fortress",
			source : ["OotU", 0],
			minlevel : 15,
			description : desc([
				"I can't be moved by spells, or by abilities of creatures up to a size larger than me",
				"Allies within 5ft of me gain the benefits of half cover"
			])
		},
		"subclassfeature20" : {
			name : "Unbreakable Defender",
			source : ["OotU", 0],
			minlevel : 20,
			description : desc([
				"As an action, I can gain the following benefits for 1 minute:",
				" \u2022 " + "If an attack or spell deals 15 or less damage to me, I ignore it",
				" \u2022 " + "When an ally is the target of a ranged attack while in my Aura of Iron I can roll a d6",
				"    On a result of 4 or higher, I become the target of the attack instead",
				" \u2022 " + "Allies within 30ft gain the benefits of half cover"
			]),
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});