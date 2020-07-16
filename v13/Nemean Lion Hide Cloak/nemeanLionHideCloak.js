var iFileName = "nemeanLionHideCloak.js";

SourceList["HB:NLHC"] = {
	name : "Nemean Lion Hide Cloak",
	abbreviation : "HB:NLHC",
	group : "Homebrew",
	date : "2020/07/16"
};

MagicItemsList["nemean lion hide cloak"] = {
	name : "Nemean Lion Hide Cloak",
	source : ["HB:NLHC", 0],
	type : "wondrous item",
	rarity : "rare",
	description : "This cloak grants +1 AC and resistance to slashing and piercing damage. I can use an action to raise the hood and let out a roar to make a Charisma (Intimidation) check with a +2 bonus to the roll.",
	weight : 3,
	attunement : true,
	extraAC : [{name : "Nemean Lion Hide Cloak", mod : 1, magic : false, text : "I gain a +1 bonus to AC while attuned."}],
	dmgres : ["Slashing", "Piercing"],
	eval : function() {
		AddAction("action", "Lion's Roar (during intimidation)", "Nemean Lion Hide Cloak");
	},
	removeeval : function() {
		RemoveAction("action", "Lion's Roar (during intimidation)", "Nemean Lion Hide Cloak");
	}
};
