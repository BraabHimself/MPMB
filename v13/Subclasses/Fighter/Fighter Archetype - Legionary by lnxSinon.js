/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Fighter Martial Archetype - Legionary
	Effect:     This file adds the Legionary as a fighter subclass
	Author:     lnxSinon
	Code by:	Newbuu2
	Date:		2021-06-07 (sheet v13)
*/

var iFileName = "Fighter Archetype - Legionary by lnxSinon.js";

RequiredSheetVersion(13);

SourceList["lS:L"] = {
	name : "Legionary Martial Archetype by lnxSinon",
	abbreviation : "lS:L",
	group : "Homebrew",
	url : "https://drive.google.com/file/d/17Tk4voisOQk6cpSKMucBQkhhU27fcYVj/view",
	date : "2020/06/07"
};

AddSubClass("fighter", "legionary", {
	regExpSearch : /legionary|legionnaire/i,
	subname : "Legionary",
	source : ["lS:L", 1],
	fullname : "Legionary",
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Battle Ready",
			source : ["lS:L", 1],
			minlevel : 3,
			description : desc([
				"I gain proficiency with the Intimidation skill",
				"I cannot be disarmed of a weapon or shield by mundane means, unless I am willing"
			]),
			skills : ["Intimidation"]
		},
		"subclassfeature3.1" : {
			name : "Courageous",
			source : ["lS:L", 1],
			minlevel : 3,
			description : desc([
				"I have a legion die, which I can use to perform Bolster, Fierce Attack, and Swift Recover",
				"If I use one of these abilities within 5 ft of an ally, I can fortify the ability",
				"Fortifying an ability extends benefits to all allies within 5 ft of me"
			]),
			additional : ["", "", "d4", "d4", "d4", "d4", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10"],
			extraLimitedFeatures : [{
				name : "Fortify",
				usages : 2,
				recovery : "short rest"
			}],
		},
		"subclassfeature3.2" : {
			name : "Courageous: Bolster",
			source : ["lS:L", 1],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can enter a defensive stance; I roll the legion die",
				"I gain temporary HP equal to the result, which last until start of my next turn",
				"Fortify: allies gain same temporary HP for the duration"
			]),
			action : ["bonus action", "Bolster"]
		},
		"subclassfeature3.3" : {
			name : "Courageous: Fierce Attack",
			minlevel : 3,
			source : ["lS:L", 1],
			description : desc([
				"As a bonus action, I can empower my next attack; I roll the legion die",
				"I add the result to the next weapon attack I make this turn",
				"Fortify: each ally adds the result to their next attack until start of my next turn"
			]),
			action : ["bonus action", "Fierce Attack"]
		},
		"subclassfeature3.4" : {
			name : "Courageous: Swift Recover",
			minlevel : 3,
			source : ["lS:L", 1],
			description : desc([
				"When making Str/Dex/Con save, I can use a reaction to add my legion die to the save",
				"Fortify: each ally making the same save can add the result to their save"
			]),
			action : ["reaction", "Swift Recover (Str/Dex/Con save)"]
		},
		"subclassfeature7" : {
			name : "In Line",
			source : ["lS:L", 1],
			minlevel : 7,
			description : desc([
				"I gain 10 ft speed when I start my turn and I am not within 5 ft of an ally"
			]),
			additional : "until end of turn"
		},
		"subclassfeature7.1" : {
			name : "Courageous Improvement",
			source : ["lS:L", 1],
			minlevel : 10,
			description : desc([
				"My legion die turns into a d6 at 7th level, a d8 at 10th level, and a d10 at 18th level"
			])
		},
		"subclassfeature10" : {
			name : "Secure",
			source : ["lS:L", 1],
			minlevel : 10,
			description : desc([
				"When I roll my legion die, I can roll it an additional time and add it to the result"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature15" : {
			name : "Surging Courage",
			source : ["lS:L", 1],
			minlevel : 15,
			description : desc([
				"When I use Action Surge, I gain an additional bonus action during my turn"
			])
		},
		"subclassfeature18" : {
			name : "Unending Fortitude",
			source : ["lS:L", 1],
			minlevel : 18,
			description : desc([
				"When I roll my legion die, I can roll a d4 instead",
				"If I do, I can fortify that legion die ability without expending a use of fortify",
				"I can do so even if I have no uses of fortify left"
			])
		}
	}
});