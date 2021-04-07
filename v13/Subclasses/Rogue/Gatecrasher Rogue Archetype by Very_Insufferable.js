var iFileName = "Gatecrasher Rogue Archetype by Very_Insufferable.js";

RequiredSheetVersion(13);

SourceList["HB:GCR"] = {
	name : "Gatecrasher Rogue Archetype by Very_Insufferable",
	abbreviation : "HB:GCR",
	group : "Homebrew",
	url : "https://www.gmbinder.com/share/-MKrGEilXWIb_tOq3k2C",
	date : "2020/10/18"
};

AddSubClass("rogue", "gatecrasher", {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*gatecrasher).*$/i,
	subname : "Gatecrasher",
	source : ["HB:GCR", 1],
	features : {
		"subclassfeature3" : {
			name : "Extraplanar Detection",
			source : ["HB:GCR", 1],
			minlevel : 3,
			description : desc([
				"I can cast the detect evil and good spell; it also detects planar portals",
			]),
			usages : 2,
			recovery : "short rest",
			spellFirstColTitle: "Us",
			spellcastingBonus : {
				name : "Extraplanar Detection",
				spells : ["detect evil and good"],
				selection : ["detect evil and good"],
				firstCol : 2
			},
			spellChanges : {
				"detect evil and good" : {
					description : "Know if abber./celest./elem./fey/fiend/undead/planar portal and des-/consecrated area within 30 ft",
					changes : "Using Extraplanar Detection I can cast detect evil and good, which can also detect extraplanar portals."
				}
			}
		},
		"subclassfeature3.1" : {
			name : "Striker's Gate",
			source : ["HB:GCR", 1],
			minlevel : 3,
			description : desc([
				"If I haven't moved, I can use a bonus action to mark a creature within 30 ft",
				"If I do, I teleport to an unoccupied space within 5 ft of the target",
				"Until the end of my turn I can sneak attack without adv. as long as I don't have disadv.",
				"After I teleport, my speed becomes 0 until the end of the turn"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature9" : {
			name : "Trickster's Gate",
			source : ["HB:GCR", 1],
			minlevel : 9,
			description : desc([
				"As an action, I can create two linked dimensional gates in unoccupied spaces I see",
				"The first appears in a space within 10ft; second appears in a space within 60 ft",
				"Each gate is 10 ft tall and 5 ft wide; gates are visible from one side of my choice",
				"The chosen sides are the sides that function as a portal; last until end of my next turn",
				"A creature/object entering a gate exits the other like the two were adjacent spaces",
				"On subsequent turns I can use my action to maintain the portals"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", " (start/maintain)"],
		},
		"subclassfeature13" : {
			name : "Escapist's Gate",
			source : ["HB:GCR", 1],
			minlevel : 13,
			description : desc([
				"I can cast the word of recall spell",
				"When I cast it to designate a sanctuary, the casting time is 1 " + (typePF ? "hour" : "hr") + "; can choose any location",
			]),
			usages : 1,
			recovery : "long rest",
			spellFirstColTitle: "Us",
			spellcastingBonus : {
				name : "Escapist's Gate",
				spells : ["word of recall"],
				selection : ["word of recall"],
				firstCol : 1
			},
			spellChanges : {
				"word of recall" : {
					description : "Me + 5 willing crea teleport to a sanctuary, designated as such by casting this spell there",
					changes : "Using Escapist's Gate I can cast word of recall, allowing me and five other willing creatures to teleport to a previously designated sanctuary."
				}
			}
		},
		"subclassfeature17" : {
			name : "Boltportal Strike",
			source : ["HB:GCR", 1],
			minlevel : 17,
			description : desc([
				"After I use Striker's Gate, I can make a weapon attack against the marked creature",
				"If the attack hits, it deals an additional 3d6 force damage"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((v.isMeleeWeapon || v.isRangedWeapon) && !v.isSpell) {
							fields.Description += (fields.Description ? '; ' : '') + '3d6 force damage';
						}
					},
					"If I include the word 'Boltportal' in the name of a weapon, the automation will treat the attack as being against a target of Striker's Gate: adding 3d6 force damage to the attack."
				]
			}
		}
	}
});