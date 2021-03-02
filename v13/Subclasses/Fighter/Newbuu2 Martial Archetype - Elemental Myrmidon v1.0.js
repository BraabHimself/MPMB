var iFileName = "Newbuu2 Martial Archetype - Elemental Myrmidon v1.0.js";

RequiredSheetVersion(13);

// Define the source
SourceList["NB2:EM"] = {
	name : "Newbuu2: Martial Archetype - Elemental Myrmidon",
	abbreviation : "NB2:EM",
	group : "Homebrew",
	url : "https://homebrewery.naturalcrit.com/share/2MUlR_py5lvv",
	date : "2021/02/16"
};

var elementPreReqFunction = function(v) {
	var elementsSelected = GetFeatureChoice("classes", "fighter", "subclassfeature3.1", true).length;
	
	return (classes.known.fighter.level >= 3 && elementsSelected == 0) || (classes.known.fighter.level >= 18 && elementsSelected < 2);
};

var elementChangeEvalFunction = function() {
	ReCalcWeapons(true, true);
};

AddSubClass("fighter", "elemental myrmidon", {
	regExpSearch : /^(?=.*(elemental|primordial))(?=.*myrmidon).*$/i,
	subname : "Elemental Myrmidon",
	fullname : "Elemental Myrmidon",
	source : ["NB2:EM", 1],
	features : {
		"subclassfeature3" : {
			name : "Primordial Eloquence",
			source : ["NB2:EM", 1],
			minlevel : 3,
			description : desc([
				"I learn Primordial; Primordial is used for attuning to the elements"
			]),
			languageProfs : ["Primordial"]
		},
		"subclassfeature3.1" : {
			name : "Myrmidon's Armament",
			source : ["NB2:EM", 1],
			minlevel : 3,
			description : desc([
				"After a long rest, I can attune to one of the following damage types:",
				" \u2022 acid, cold, fire, lightning, or thunder",
				"I can then imbue a melee weapon with damages type to which I am attuned",
				"Once per turn, it can deal extra damage of an attuned type equal to my prof. bonus",
				"I have adv. on Persuasion checks for interactions with elementals while attuned",
				"Use the \"Choose Feature\" button above to select elemental attunements"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon && !v.isNaturalWeapon && (/\b(imbued)\b/i).test(v.WeaponText)) {
							var attunements = GetFeatureChoice("classes", "fighter", "subclassfeature3.1", true);
							
							if(attunements.length)
							{
								var bonusDamage = ProficiencyBonusList[classes.totallevel - 1];
							
								if((/\b(supercharged?)\b/i).test(v.WeaponText) && classes.known.fighter.level >= 10)
								{
									bonusDamage *= 2;
								}
								
								if(attunements.length == 1)
								{
									fields.Description += (fields.Description ? '; ' : '') + "+" + bonusDamage + " " + attunements[0] + " damage";
								}
								else
								{
									var type1 = bonusDamage + " " + attunements[0] + " damage";
									var type2 = bonusDamage + " " + attunements[1] + " damage";
									
									fields.Description += (fields.Description ? '; ' : '') + "+" + type1 + " or " + type2;
								}
								
								if(classes.known.fighter.level >= 7)
								{
									fields.Description += (fields.Description ? '; ' : '') + "counts as magical";
								}
							}
						}
					},
					"If I include 'Imbued' in a melee weapon's name or description, it gets treated as a weapon that is imbued by my Myrmidon's Armament feature, adding my proficiency bonus as extra damage; at 7th level it adds counts as magical in the description. If I include 'Supercharged' and am at least level 10, the extra damage is doubled."
				]
			},
			additional : levels.map(function (n) {
				return (n < 3 ? "" : ((n < 18 ? 1 : 2) + " elemental attunement" + (n < 18 ? "" : "s")));
			}),
			extraname : "Myrmidon's Armament Attunement",
			extrachoices : ["Acid", "Cold", "Fire", "Lightning", "Thunder"],
			"acid" : {
				name : "Myrmidon's Armament: Acid",
				source : ["NB2:EM", 1],
				description : desc([
					"I am attuned to acid",
					"Once per turn my weapon can deal extra acid damage equal to my prof. bonus",
					"At 10th level I gain resistance to acid damage while wearing imbued armor"
				]),
				dmgres : ["Acid"],
				prereqeval : elementPreReqFunction,
				changeeval : elementChangeEvalFunction
			},
			"cold" : {
				name : "Myrmidon's Armament: Cold",
				source : ["NB2:EM", 1],
				description : desc([
					"I am attuned to cold",
					"Once per turn my weapon can deal extra cold damage equal to my prof. bonus",
					"At 10th level I gain resistance to cold damage while wearing imbued armor"
				]),
				dmgres : ["Cold"],
				prereqeval : elementPreReqFunction,
				changeeval : elementChangeEvalFunction
			},
			"fire" : {
				name : "Myrmidon's Armament: Fire",
				source : ["NB2:EM", 1],
				description : desc([
					"I am attuned to fire",
					"Once per turn my weapon can deal extra fire damage equal to my prof. bonus",
					"At 10th level I gain resistance to fire damage while wearing my imbued armor"
				]),
				dmgres : ["Fire"],
				prereqeval : elementPreReqFunction,
				changeeval : elementChangeEvalFunction
			},
			"lightning" : {
				name : "Myrmidon's Armament: Lightning",
				source : ["NB2:EM", 1],
				description : desc([
					"I am attuned to lightning",
					"Once per turn my weapon can deal extra lightning damage equal to my prof. bonus",
					"At 10th level I gain resistance to lightning damage while wearing my imbued armor"
				]),
				dmgres : ["Lightning"],
				prereqeval : elementPreReqFunction,
				changeeval : elementChangeEvalFunction
			},
			"thunder" : {
				name : "Myrmidon's Armament: Thunder",
				source : ["NB2:EM", 1],
				description : desc([
					"I am attuned to thunder",
					"Once per turn my weapon can deal extra thunder damage equal to my prof. bonus",
					"At 10th level I gain resistance to thunder damage while wearing my imbued armor"
				]),
				dmgres : ["Thunder"],
				prereqeval : elementPreReqFunction,
				changeeval : elementChangeEvalFunction
			}
		},
		"subclassfeature7" : {
			name : "Myrmidon's Bulwark",
			source : ["NB2:EM", 1],
			minlevel : 7,
			description : desc([
				"I can also imbue a suit of armor when I imbue a weapon after my attunement",
				"While wearing it, I have resistance to the imbued damage types",
				"Additionally, my imbued weapon counts as magical",
				"Use the \"Choose Feature\" button above to select the imbued type"
			])
		},
		"subclassfeature10" : {
			name : "Supercharge",
			source : ["NB2:EM", 1],
			minlevel : 10,
			description : desc([
				"As a bonus action, I can double the imbued extra damage dealt by my weapon",
				"When I deal this extra damage, I can add an effect based on type; See Notes page",
				"This effect lasts until the end of my turn"
			]),
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
			toNotesPage : [{
				name : "Supercharge Effects Table",
				source : ["NB2:EM", 1],
				popupName : "Supercharge Effects Table",
				note : [
					"Type\tEffect",
					"acid\tTarget's AC is reduced by 2 until the end of its next turn",
					"cold\tTarget's speed is reduced by 10 feet until the start of your next turn",
					"fire\tTarget takes 1d8 fire damage at the start of its next turn",
					"lightning\tTarget can't take reactions until the start of its next turn",
					"thunder\tTarget is pushed 10 feet away from you"
				]
			}]
		},
		"subclassfeature15" : {
			name : "Elemental Flux",
			source : ["NB2:EM", 1],
			minlevel : 15,
			usages : 1,
			recovery : "long rest",
			description : desc([
				"When I take damage, I can use a reaction to change an attuned type",
				"If I do, I choose another element I am not attuned to",
				"The imbued type of my weapon and armor also changes to the new type",
				"The new resistance gained from changing applies to the triggering damage"
			]),
			action : ["reaction", " (when damaged)"]
		},
		"subclassfeature18" : {
			name : "Myrmidon's Bastion",
			source : ["NB2:EM", 1],
			minlevel : 18,
			description : desc([
				"I can attune to two different elements instead of one"
			])
		}
	}
});