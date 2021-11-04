/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Death Knight's Cape
	Effect:     Adds the (currently available) versions of the Death Knight's Cape
	Author:     Negima8
	Code by:	Newbuu2
	Date:		2021-11-04 (sheet v13)
*/

var iFileName = "Death Knight's Cape.js";

RequiredSheetVersion(13);

SourceList["HB:DKC"] = {
	name : "Death Knight's Cape",
	abbreviation : "HB:DKC",
	group : "Homebrew",
	url : "https://www.reddit.com/user/Negima8/",
	date : "2021/11/03"
};

capeResistances = ["Poison", "Necrotic"]
capeImmunities  = { immune : ["frightened"] }

MagicItemsList["death knight's cape"] = {
	name : "Death Knight's Cape",
	source : ["HB:DKC", 1],
	type : "wondrous item",
	rarity : "legendary",
	attunement : true,
	cursed : true,
	description : "This cursed cloak eats powerful souls. I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 1 on a success (max 4); Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
	descriptionFull : "This cursed cloak eats powerful souls (min CR 13). I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 1 on a success (max 4); Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
	choices : ["+1 constitution", "+2 constitution", "+3 constitution", "+4 constitution"],
	"+1 constitution" : {
		name : "Death Knight's Cape (+1 Constitution)",
		description : "This cursed cloak eats powerful souls. I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 1 on a success (max 4); Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
		dmgres : capeResistances,
		savetxt : capeImmunities,
		scorestxt : "+1 Constitution"
	},
	"+2 constitution" : {
		name : "Death Knight's Cape (+2 Constitution)",
		description : "This cursed cloak eats powerful souls. I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 2 on a success (max 4); Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
		dmgres : capeResistances,
		savetxt : capeImmunities,
		scorestxt : "+2 Constitution"
	},
	"+3 constitution" : {
		name : "Death Knight's Cape (+3 Constitution)",
		description : "This cursed cloak eats powerful souls. I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 3 on a success (max 4); Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
		dmgres : capeResistances,
		savetxt : capeImmunities,
		scorestxt : "+3 Constitution"
	},
	"+4 constitution" : {
		name : "Death Knight's Cape (+4 Constitution)",
		description : "This cursed cloak eats powerful souls. I gain resistance to poison and necrotic damage; immunity to being frightened. Each day I make a DC 12 Wis save, increasing my Con score by 4 on a success; Con bonus resets to 1 and 2d8 psychic damage for each failure otherwise. The DC increases by 2 each day.",
		dmgres : capeResistances,
		savetxt : capeImmunities,
		scorestxt : "+4 Constitution"
	}
}