/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.
*/

/*	-INFORMATION-

	Subject:	Cleric Domain: Winter Domain

	Effect:		Adds the Winter Domain subclass option to the sheet

	Author:     Baden White
	
	Coder:		u/Newbuu2
*/

var iFileName = "winter_domain.js";

RequiredSheetVersion(13);

SourceList["BW:WD"] = {
	name : "Baden White's Winter Domain",
	abbreviation : "BW:WD",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/328662/Cleric-Subclass--Winter-Domain",
	date : "2020/09/16"
};

AddSubClass("cleric", "winter domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(winter)).*$/i,
	subname : "Winter Domain",
	source: ["BW:WD", 1],
	spellcastingExtra : ["armor of agathys", "fog cloud", "hold person", "spike growth", "sleet storm", "slow", "ice storm", "stoneskin", "cone of cold", "hold monster"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source: ["BW:WD", 1],
			minlevel : 1,
			description : desc([
				"I gain proficiency with heavy armor"
			]),
			armorProfs : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Winter’s Armaments",
			source: ["BW:WD", 1],
			minlevel : 1,
			description : desc([
				"As an action, I can create icy weapons in my empty hands",
				"I can create a one-handed melee weapon and shield or 2 light melee weapons",
				"These weapons count as magical and I am proficient with them while wielding them",
				"They disappear if they are dropped, dismissed, I create more weapons, or I die"
			]),
			action : ["action", " (create weapons)"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon && (/\bwintry\b/i).test(v.WeaponText) && !(/heavy|(2|two).?hand(ed)?s?/i).test(v.theWea.description)) {
							fields.Proficiency = true;
							if (!v.thisWeapon[1] && !v.theWea.isMagicWeapon && !(/counts as( a)? magical/i).test(fields.Description)) fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
						}
					}, "If I include the word 'Wintry' in a the name of a one-handed melee weapon it will be treated a Winter's Armament weapon."]
			}
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Chilling Wrath",
			source: ["BW:WD", 1],
			minlevel : 2,
			description : desc([
				"When I roll damage for an attack or spell, I can make it deal cold damage instead",
				"A creature damaged this way has its speed reduced by 10 until the end of its next turn"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Winter's Shroud",
			source: ["BW:WD", 1],
			minlevel : 6,
			description : desc([
				"I gain resistance to cold damage",
				"I ignore difficult terrain that is ice or snow"
			]),
			dmgres : ["Cold"]
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source: ["BW:WD", 1],
			minlevel : 8,
			description : desc([
				"Once per turn, when I hit a creature with a weapon attack, I can do extra damage"
			]),
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 cold damage";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isSpell) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 cold damage';
						}
					},
					"Once per turn, I can have one of my weapon attacks that hit do extra cold damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Faith of the Frozen",
			source: ["BW:WD", 1],
			minlevel : 17,
			description : desc([
				"As an action, I can surround myself with swirling blizzard",
				"The blizzard lasts for 1 min or until I use an action to stop it"
				"While the blizzard is active I gain the following benefits:",
				" \u2022 I am immune to cold damage",
				" \u2022 Ranged weapon attacks against me have disadvantage",
				" \u2022 The ground with 30 ft is difficult terrain for others, except those I choose"
			]),
			action : ["action", "(start/stop)"]
		}
	}
});