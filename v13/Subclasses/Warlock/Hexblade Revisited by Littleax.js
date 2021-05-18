/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Warlock Patron: the Hexblade
	Effect:     This file adds the Hexblade as a warlock subclass
	Author:     Littleax
	Code by:	Newbuu2
	Date:		2021-05-06 (sheet v13)
*/

var iFileName = "Hexblade Revisited by Littleax.js";

RequiredSheetVersion(13);

SourceList["L:HR"] = {
	name : "Hexblade, Revisited by Littleax",
	abbreviation : "L:HR",
	group : "Homebrew",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/ldlh8q/hexblade_revisited_v02_a_reworked_hexblade_that/",
	date : "2021/02/05"
};

var isLegendaryWeapon = function(weaponName) {
	var legendaryWeapons = ClassSubList["warlock-the hexblade revisited"].features.subclassfeature1.choices.map((x) => x);
	
	//Add ones not directly in the choices
	legendaryWeapons.push("midsummer");
	legendaryWeapons.push("midwinter");
	
	for(var i = 0; i < legendaryWeapons.length; i++)
	{
		var aLegendaryWeapon  = "bound " + legendaryWeapons[i];
		
		if((new RegExp(aLegendaryWeapon.toLowerCase())).test(weaponName))
		{
			return true;
		}
	}
	
	return false;
};

AddSubClass("warlock", "the hexblade revisited", {
	regExpSearch : /^(?=.*hexblade)(?=.*warlock).*$/i,
	subname : "the Hexblade",
	source : ["L:HR", 1],
	features : {
		"subclassfeature1" : {
			name : "Weapon of Legend",
			source : ["L:HR", 1],
			minlevel : 1,
			description : desc([
				"A magical, sentient weapon binds itself to me, it has the following properties:",
				"\u2022 While held, it can communicate telepathically with me",
				"\u2022 It has hearing and darkvision out to 30 ft; knows Common and another language",
				"\u2022 I can use it with Charisma instead of Strength or Dexterity",
				"\u2022 It has Intelligence, Wisdom, and Charisma scores and one skill",
				"\u2022 It requires attunement to use any of its properties; only I can attune"
			]),
			additional : levels.map(function (n) { return ("+" + (n < 2 ? 1 : n < 4 ? 2 : n < 8 ? 3 : n < 12 ? 4 : n < 16 ? 5 : n < 20 ? 6 : 7) + " attunement bonus"); }),
			choices : ["Blackrazor", "Equinox", "Sever", "Wave"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if(isLegendaryWeapon(v.WeaponName) && What('Cha Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod'))
						{
							fields.Mod = 6;
						}
					},
					"I can use Charisma instead of Strength or Dexterity for my Weapon of Legend, if my Charisma modifier is higher than the ability it would otherwise use."
				]
			},
			"blackrazor" : {
				name : "Weapon of Legend: Blackrazor",
				source : ["L:HR", 2],
				description : desc([
					"Blackrazor binds itself to me; See 3rd page for features"
				]),
				eval : function (lvl, chc) { AddMagicItem("Bound Blackrazor"); },
				removeeval : function (lvl, chc) {
					var loc = CurrentMagicItems.known.indexOf("bound blackrazor");
					if (loc == -1) return;
					MagicItemClear(loc + 1, true);
				},
				toNotesPage : [{
					name : "Blackrazor Features",
					source : ["L:HR", 2],
					popupName : "Blackrazor Features",
					page3notes : true,
					note : desc([
						"Blackrazor, a magical longsword, binds itself to me, it has the following properties:",
						" \u2022 It can communicate telepathically with me, while I hold it",
						" \u2022 It has hearing and darkvision out to 30 ft; knows Common and Shadar-Kai",
						" \u2022 I can use it with Charisma instead of Strength or Dexterity",
						" \u2022 It has 15 Intelligence, 11 Wisdom, and 16 Charisma; skilled in Arcana",
						" \u2022 It requires attunement to use any of its properties; only I can attune",
						"If I gain the Pact of the Blade feature I can:",
						" \u2022 Summon and dismiss it without binding to it",
						" \u2022 Communicate with Blackrazor while it is dismissed"
					])
				}]
			},
			"equinox" : {
				name : "Weapon of Legend: Equinox",
				source : ["L:HR", 3],
				description : desc([
					"Equinox binds itself to me; See 3rd page for features"
				]),
				eval : function (lvl, chc) { AddMagicItem("Bound Equinox"); AddMagicItem("Bound Midsummer"); AddMagicItem("Bound Midwinter");},
				removeeval : function (lvl, chc) {
					var equinoxLoc   = CurrentMagicItems.known.indexOf("bound equinox");
					var midsummerLoc = CurrentMagicItems.known.indexOf("bound midsummer");
					var midwinterLoc = CurrentMagicItems.known.indexOf("bound midwinter");
					
					if(equinoxLoc != -1)
					{
						MagicItemClear(equinoxLoc + 1, true);
					}
					
					if(midsummerLoc != -1)
					{
						MagicItemClear(midsummerLoc + 1, true);
					}
					
					if(midwinterLoc != -1)
					{
						MagicItemClear(midwinterLoc + 1, true);
					}
				},
				action : ["bonus action", "Split Blades"],
				toNotesPage : [{
					name : "Equinox Features",
					source : ["L:HR", 3],
					popupName : "Equinox Features",
					page3notes : true,
					note : desc([
						"Equinox, a magical double-bladed scimitar, binds itself to me, it has the following properties:",
						" \u2022 It can communicate telepathically with me, while I hold it",
						" \u2022 It has hearing and darkvision out to 30 ft; knows Common and Sylvan",
						" \u2022 I can use it with Charisma instead of Strength or Dexterity",
						" \u2022 It has 13 Intelligence, 15 Wisdom, and 14 Charisma; skilled in Nature",
						" \u2022 It requires attunement to use any of its properties; only I can attune",
						"If I gain the Pact of the Blade feature I can:",
						" \u2022 Summon and dismiss it without binding to it",
						" \u2022 Communicate with Equinox while it is dismissed",
						"As a bonus action, I can split Equinox into two shortswords: Midsummer and Midwinter",
						"They grant the same features as Equinox as long as I hold both"
					])
				}]
			},
			"sever" : {
				name : "Weapon of Legend: Sever",
				source : ["L:HR", 4],
				description : desc([
					"Sever binds itself to me; See 3rd page for features"
				]),
				eval : function (lvl, chc) { AddMagicItem("Bound Sever"); },
				removeeval : function (lvl, chc) {
					var loc = CurrentMagicItems.known.indexOf("bound sever");
					if (loc == -1) return;
					MagicItemClear(loc + 1, true);
				},
				toNotesPage : [{
					name : "Sever Features",
					source : ["L:HR", 4],
					popupName : "Sever Features",
					page3notes : true,
					note : desc([
						"Sever, a magical greataxe, binds itself to me, it has the following properties:",
						" \u2022 It can communicate telepathically with me, while I hold it",
						" \u2022 It has hearing and darkvision out to 30 ft; knows Common and Infernal",
						" \u2022 I can use it with Charisma instead of Strength or Dexterity",
						" \u2022 It has 8 Intelligence, 14 Wisdom, and 16 Charisma; skilled in Religion",
						" \u2022 It requires attunement to use any of its properties; only I can attune",
						" \u2022 My hit point maximum increases by my warlock level",
						"If I gain the Pact of the Blade feature I can:",
						" \u2022 Summon and dismiss it without binding to it",
						" \u2022 Communicate with Sever while it is dismissed"
					])
				}]
			},
			"wave" : {
				name : "Weapon of Legend: Wave",
				source : ["L:HR", 5],
				description : desc([
					"Wave binds itself to me; See 3rd page for features"
				]),
				eval : function (lvl, chc) { AddMagicItem("Bound Wave"); },
				removeeval : function (lvl, chc) {
					var loc = CurrentMagicItems.known.indexOf("bound Wave");
					if (loc == -1) return;
					MagicItemClear(loc + 1, true);
				},
				toNotesPage : [{
					name : "Wave Features",
					source : ["L:HR", 5],
					popupName : "Wave Features",
					page3notes : true,
					note : desc([
						"Wave, a magical halberd, binds itself to me, it has the following properties:",
						" \u2022 It can communicate telepathically with me, while I hold it",
						" \u2022 It has hearing and darkvision out to 30 ft; knows Common and Aquan",
						" \u2022 I can use it with Charisma instead of Strength or Dexterity",
						" \u2022 It has 14 Intelligence, 10 Wisdom, and 16 Charisma; skilled in History",
						" \u2022 It requires attunement to use any of its properties; only I can attune",
						"If I gain the Pact of the Blade feature I can:",
						" \u2022 Summon and dismiss it without binding to it",
						" \u2022 Communicate with Wave while it is dismissed"
					])
				}]
			},
			choiceDependencies : [{
				feature : "subclassfeature1.2"
			}, {
				feature : "subclassfeature1.3"
			},{
				feature : "subclassfeature6.1"
			},{
				feature : "subclassfeature10"
			}, {
				feature : "subclassfeature14"
			}]
		},
		"subclassfeature1.1" : {
			name : "Hex Warrior",
			source : ["L:HR", 1],
			minlevel : 1,
			additional : "Prof. with shields/martial weapons",
			description : "",
			armorProfs : [false, false, false, true],
			weaponProfs : [false, true]
		},
		"subclassfeature1.2" : {
			name : "Bonus Spells",
			source : ["L:HR", 1],
			minlevel : 1,
			description : desc([
				"Use the \"Choose Feature\" button above to select your legendary weapon",
				"I get bonus spells known, which do not count against the number of spells I can know",
				"The legendary weapon can be used as a spellcasting focus for my warlock spells"
			]),
			choicesNotInMenu : true,
			"blackrazor" : {
				name : "Bonus Spells: Blackrazor",
				source : ["L:HR", 2],
				description : desc([
					"I get bonus spells known, which do not count against the number of spells I can know",
					"Blackrazor can be used as a spellcasting focus for my warlock spells"
				]),
				spellcastingExtra : ["compelled duel", "blindness/deafness", "blink", "staggering smite", "cone of code"],
				spellcastingExtraApplyNonconform : true
			},
			"equinox" : {
				name : "Bonus Spells: Equinox",
				source : ["L:HR", 3],
				description : desc([
					"I get bonus spells known, which do not count against the number of spells I can know",
					"Equinox can be used as a spellcasting focus for my warlock spells"
				]),
				spellcastingExtra : ["gift of alacrity", "misty step", "hypnotic pattern", "greater invisibility", "steel wind strike"],
				spellcastingExtraApplyNonconform : true,
			},
			"sever" : {
				name : "Bonus Spells: Sever",
				source : ["L:HR", 4],
				description : desc([
					"I get bonus spells known, which do not count against the number of spells I can know",
					"Sever can be used as a spellcasting focus for my warlock spells"
				]),
				spellcastingExtra : ["searing smite", "scorching ray", "fear", "fire shield", "banishing smite"],
				spellcastingExtraApplyNonconform : true
			},
			"wave" : {
				name : "Bonus Spells: Wave",
				source : ["L:HR", 5],
				description : desc([
					"I get bonus spells known, which do not count against the number of spells I can know",
					"Wave can be used as a spellcasting focus for my warlock spells"
				]),
				spellcastingExtra : ["fog cloud", "warding bond", "tidal wave", "conjure elemental", "wall of force"],
				spellcastingExtraApplyNonconform : true
			}
		},
		"subclassfeature1.3" : {
			name : "Legendary Weapon Feature",
			source : ["L:HR", 1],
			minlevel : 1,
			description : desc([
				"Use the \"Choose Feature\" button above to select your legendary weapon"
			]),
			choicesNotInMenu : true,
			"blackrazor" : {
				name : "Blackrazor's Curse",
				source : ["L:HR", 2],
				description : desc([
					"As a bonus action, I can curse a creature I can see within 30 ft of me for 1 minute",
					"\u2022 I add my attunement bonus to damage rolls against the cursed target",
					"\u2022 If the target dies while cursed, I regain HP equal to my warlock level + Cha mod",
					"The curse ends after 1 minute, when the target dies, I die, or I'm incapacitated"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if((/curse/i).test(v.WeaponText))
							{
								var lvl = classes.known.warlock.level;
								
								output.extraDmg += (lvl < 2 ? 1 : lvl < 4 ? 2 : lvl < 8 ? 3 : lvl < 12 ? 4 : lvl < 16 ? 5 : lvl < 20 ? 6 : 7);
							}
						}, "If I include the word 'Curse' in the name of a weapon, the automation will treat the attack as being against a target of the Blackrazor's Curse: adding my attunement bonus to the damage."]
				}
			},
			"equinox" : {
				name : "Equinox's Reflexes",
				source : ["L:HR", 3],
				description : desc([
					"Equinox has charges I can use during combat; one charge per round:",
					"\u2022 As a reaction, I can make a weapon attack vs. a creature that attacked within 5 ft",
					"   If it hits, it deals an additional 1d6 of my choice of cold or fire damage",
					"\u2022 During movement, to disengage and move an additional 10 ft until the end of my turn",
					"\u2022 As a reaction when damaged, to halve the damage",
				]),
				action : [["reaction", " (attack with 5 ft)"], ["reaction", " (when damaged)"]],
				usages : levels.map( function(n) {
					return (n < 2 ? 1 : n < 4 ? 2 : n < 8 ? 3 : n < 12 ? 4 : n < 16 ? 5 : n < 20 ? 6 : 7);
				}),
				recovery : "dawn"
			},
			"sever" : {
				name : "Sever's Wrath",
				source : ["L:HR", 4],
				description : desc([
					"I have a pool of wrath; I gain 1 wrath when damaged; bonus action to spend all wrath:",
					"\u2022 I gain 1d6 temporary HP per wrath or",
					"\u2022 Next attack this turn deals extra 1d4 fire/necrotic damage per wrath",
					"Wrath lost if I end turn without attacking/taking damage since last turn or unconscious"
				]),
				additional : levels.map(function (n) { return ((n < 2 ? 1 : n < 4 ? 2 : n < 8 ? 3 : n < 12 ? 4 : n < 16 ? 5 : n < 20 ? 6 : 7) + " max wrath"); }),
				calcChanges : {
					hp : function (totalHD) {
						if (classes.known.warlock) {
							return [classes.known.warlock.level, "Sever's Wrath (warlock level)"];
						}
					}
				}
			},
			"wave" : {
				name : "Wave's Protection",
				source : ["L:HR", 5],
				description : desc([
					"As a bonus action, I can create a whirlpool for 1 min; 15 ft radius, centered on me:",
					"\u2022 The radius is difficult terrain for enemies and grants fire resistance to me and allies",
					"\u2022 Damage taken by me/allies in the radius reduced by my attunement bonus"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			}
		},
		"subclassfeature6" : {
			name : "Consume Enchantment",
			source : ["L:HR", 1],
			minlevel : 6,
			description : desc([
				"Over a long rest, my weapon can consume a magic weapon with attack/damage bonuses",
				"My sentient weapon gains the highest attack and damage bonuses it has consumed"
			]),
			extraname : "Consume Enchantment",
			extrachoices : ["+1 Consumed", "+2 Consumed", "+3 Consumed"],
			extraTimes : levels.map(function (n) { return n < 6 ? 0 : 1; }),
			"+1 consumed" : {
				name : "Consume Enchantment: +1",
				source : ["L:HR", 1],
				description : desc([
					"My sentient weapon has consumed a +1 weapon, gaining +1 to attack and damage rolls"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output)
						{
							if(isLegendaryWeapon(v.WeaponName))
							{
								output.magic += 1;
							}
						},
						"My sentient weapon has consumed a +1 weapon, gaining +1 to attack and damage rolls"
					]
				},
				prereqeval : function(v) {
					var hasConsumed = GetFeatureChoice("classes", "warlock", "subclassfeature6", true).length > 0;
					
					return !hasConsumed && classes.known.warlock.level >= 6;
				}
			},
			"+2 consumed" : {
				name : "Consume Enchantment: +2",
				source : ["L:HR", 1],
				description : desc([
					"My sentient weapon has consumed a +1 weapon, gaining +1 to attack and damage rolls"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output)
						{
							if(isLegendaryWeapon(v.WeaponName))
							{
								output.magic += 2;
							}
						},
						"My sentient weapon has consumed a +2 weapon, gaining +2 to attack and damage rolls"
					]
				},
				prereqeval : function(v) {
					var hasConsumed = GetFeatureChoice("classes", "warlock", "subclassfeature6", true).length > 0;
					
					return !hasConsumed && classes.known.warlock.level >= 6;
				}
			},
			"+3 consumed" : {
				name : "Consume Enchantment: +3",
				source : ["L:HR", 1],
				description : desc([
					"My sentient weapon has consumed a +1 weapon, gaining +1 to attack and damage rolls"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output)
						{
							if(isLegendaryWeapon(v.WeaponName))
							{
								output.magic += 3;
							}
						},
						"My sentient weapon has consumed a +3 weapon, gaining +3 to attack and damage rolls"
					]
				},
				prereqeval : function(v) {
					var hasConsumed = GetFeatureChoice("classes", "warlock", "subclassfeature6", true).length > 0;
					
					return !hasConsumed && classes.known.warlock.level >= 6;
				}
			}
		},
		"subclassfeature6.1" : {
			name : "Legendary Weapon Feature",
			source : ["L:HR", 1],
			minlevel : 6,
			description : desc([
				"Use the \"Choose Feature\" button above to select your legendary weapon"
			]),
			choicesNotInMenu : true,
			"blackrazor" : {
				name : "Supplant Soul",
				source : ["L:HR", 2],
				description : desc([
					"When I slay a humanoid, I can make Blackrazor's sentience enter its corpse"
				]),
				additional : "See 3rd Page",
				usages : 1,
				recovery : "long rest",
				eval : function() {
					var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
					var prefix = false;
					if (AScompA) {
						for (var a = 1; a < AScompA.length; a++) {
							if (!What(AScompA[a] + 'Comp.Race')) {
								prefix = AScompA[a];
								break;
							}
						}
					}
					if (!prefix) prefix = DoTemplate('AScomp', 'Add');
					Value(prefix + 'Comp.Race', 'Blackrazor Ghoul');
					Value(prefix + 'Comp.Type', 'Animated');

					for (var a = 1; a <= 3; a++) {
						AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.To Hit Bonus', "max(oCha|0)", false, "Blackrazor Ghoul", "The Blackrazor ghoul adds the warlock's Charisma modifier (oCha) to the to hit bonus of its attacks (min +0).");
					}
					Value(prefix + 'Cnote.Left', "Blackrazor Ghoul (the Legendary Weapon, LA:HBR 2)" + desc([
						"When I slay a humanoid, I can make Blackrazor's sentience enter its corpse",
						"It turns into a ghoul (MM 148) with the following traits:",
						"\u2022 It gains temporary HP equal to half my warlock level",
						"\u2022 It has Blackrazor's Charisma, Intelligence, and Wisdom scores",
						"\u2022 It can speak languages Blackrazor knows",
						"\u2022 It is proficient in skills Blackrazor is proficient in",
						"\u2022 It rolls initiative and has its own turns",
						"\u2022 It gains a bonus to attack rolls equal to my Charisma modifier (min +0)",
						"\u2022 It gains the bonus damage Blackrazor's Curse",
						"It remains animated until the end of my next long rest"
					]));
					AddTooltip(prefix + 'Comp.Use.HP.Temp', "The Blackrazor ghoul gains half my warlock level as temporary HP when created.");
					var changeMsg = "The Blackrazor ghoul has been added to the companion page at page number " + (tDoc.getField(prefix + 'Comp.Race').page + 1);
					CurrentUpdates.types.push("notes");
					if (!CurrentUpdates.notesChanges) {
						CurrentUpdates.notesChanges = [changeMsg];
					} else {
						CurrentUpdates.notesChanges.push(changeMsg);
					}
				},
				removeeval : function() {
					for (var prefix in CurrentCompRace) {
						if (CurrentCompRace[prefix].known === "blackrazor ghoul") {
							DoTemplate("AScomp", "Remove", prefix, true);
						}
					}
				},
				changeeval : function (lvlA, choiceA) {
					if (!classes.known.warlock || !classes.known.warlock.level) return;
					for (var prefix in CurrentCompRace) {
						if (CurrentCompRace[prefix].known === "blackrazor ghoul") {
							Value(prefix + 'Comp.Use.HP.Temp', Math.floor(classes.known.warlock.level / 2));
						}
					}
				},
				toNotesPage : [{
					name : "Supplant Soul Features",
					additional : levels.map( function(n) { return n < 6 ? "" : Math.floor(n/2) + " temp HP"; }),
					source : ["L:HR", 2],
					popupName : "Supplant Soul Features",
					page3notes : true,
					note : desc([
						"When I slay a humanoid, I can make Blackrazor's sentience enter its corpse",
						"It turns into a ghoul (MM 148) with the following traits:",
						"\u2022 It gains temporary HP equal to half my warlock level",
						"\u2022 It has Blackrazor's Charisma, Intelligence, and Wisdom scores",
						"\u2022 It can speak languages Blackrazor knows",
						"\u2022 It is proficient in skills Blackrazor is proficient in",
						"\u2022 It rolls initiative and has its own turns",
						"\u2022 It gains a bonus to attack rolls equal to my Charisma modifier (min +0)",
						"\u2022 It gains the bonus damage Blackrazor's Curse",
						"It remains animated until the end of my next long rest"
					])
				}]
			},
			"equinox" : {
				name : "Leech Magic",
				source : ["L:HR", 3],
				description : desc([
					"When an enemy casts a spell within 60 ft, Equinox casts Counterspell at 3rd level",
					"If the Counterspell is successful, Equinox gains 1 charge"
				]),
				usages : 1,
				recovery : "long rest"
			},
			"sever" : {
				name : "Guide of the Nine Hells",
				source : ["L:HR", 4],
				description : desc([
					"Sever is adept at finding hidden traps, passageways, and secret doors",
					"Sever has a passive perception of 18 + attunement bonus for each mentioned above"
				])
			},
			"wave" : {
				name : "Melora's Gift",
				source : ["L:HR", 5],
				description : desc([
					"I can breathe water and I have a swim speed equal to my walking speed",
					"I can speak with fish and other aquatic animals and gain resistance to cold damage"
				]),
				dmgres : ["Cold"],
				speed : { swim : { spd : "walk", enc : "walk" } }
			}
		},
		"subclassfeature10" : {
			name : "Legendary Weapon Feature",
			source : ["L:HR", 1],
			minlevel : 10,
			description : desc([
				"Use the \"Choose Feature\" button above to select your legendary weapon"
			]),
			choicesNotInMenu : true,
			"blackrazor" : {
				name : "Hexbound Duelist",
				source : ["L:HR", 2],
				minlevel : 10,
				description : desc([
					"As a reaction when a Blackrazor's Curse recipient hits me with an attack, I can roll a d6",
					"On a result of 4 or higher, the attacks misses me instead, regardless of its d20 roll"
				])
			},
			"equinox" : {
				name : "Disappearing Act",
				source : ["L:HR", 3],
				minlevel : 10,
				description : desc([
					"When I spend a charge from Equinox, I turn invisible until the end of my turn"
				]),
				additional : "ends if I attack/cast spell"
			},
			"sever" : {
				name : "Undying Vengeance",
				source : ["L:HR", 4],
				minlevel : 10,
				description : desc([
					"When I drop to 0 HP, I remain consciousness with Sever in control for 1 minute",
					"I still must make death saves, and I suffer the normal effects of taking damage",
					"If I would die by failing death saves, I don't die until this effect ends",
					"I die if this effect ends and I have 0 HP"
				]),
				usages : 1,
				recovery : "long rest"
			},
			"wave" : {
				name : "Ocean's Empowerment",
				source : ["L:HR", 5],
				minlevel : 10,
				description : desc([
					"After being submerged in water, Wave deals an additional 1d6 damage for 1 minute",
					"The whirlpool from Wave's Protection does not trigger this feature",
					"As a bonus action, I can activate this benefit using a small amount of water"
				]),
				extraLimitedFeatures : [{
					name : "Ocean's Empowerment (activate with water)",
					usages : 1,
					recovery : "long rest"
				}],
				action : ["bonus action", " (activate with water)"]
			}
		},
		"subclassfeature14" : {
			name : "Legendary Weapon Feature",
			source : ["L:HR", 1],
			minlevel : 14,
			description : desc([
				"Use the \"Choose Feature\" button above to select your legendary weapon"
			]),
			choicesNotInMenu : true,
			"blackrazor" : {
				name : "Soul Plague",
				source : ["L:HR", 2],
				minlevel : 14,
				description : desc([
					"When the target of my Blackrazor's Curse dies, I can spread the curse to other enemies",
					"Each enemy creature within 10 ft of the target becomes afflicted by Blackrazor's Curse",
					"I can't do this while incapacitated and I don't regain HP from the death of the previous"
				])
			},
			"equinox" : {
				name : "Spellblade's Dance",
				source : ["L:HR", 3],
				minlevel : 14,
				description : desc([
					"When I cast a spell of at least 1st level, I can make a weapon attack as a bonus action",
					"If it hits, it deals an additional 1d6 of my choice of cold or fire damage"
				]),
				action : ["bonus action", " (after spell)"]
			},
			"sever" : {
				name : "Corrupted Transformation",
				source : ["L:HR", 4],
				minlevel : 14,
				description : desc([
					"As a bonus action, I can transform into a fiend; See 3rd page"
				]),
				toNotesPage : [{
					name : "Corrupted Transformation Features",
					source : ["L:HR", 4],
					popupName : "Corrupted Transformation Features",
					page3notes : true,
					note : desc([
							"As a bonus action, I can transform into a fiend, granting benefits:",
							"\u2022 I have a flying speed equal to my walking speed",
							"\u2022 I am a fiend (devil) in addition to my other creature types",
							"\u2022 I have resistance to cold, fire, and poison damage",
							"\u2022 I gain both benefits when spending wrath using Sever's Wrath"
					])
				}],
				action : ["bonus action", ""]
			},
			"wave" : {
				name : "Dehydrate",
				source : ["L:HR", 5],
				minlevel : 14,
				description : desc([
					"As an action, I can force a creature to make a Con save, dealing 6d10 necrotic",
					"Plants have disadv.; water elementals automatically fail; half damage on success",
					"Wave then automatically gains the benefit from Ocean's Empowerment"
				]),
				usages : 1,
				recovery : "long rest"
			}
		}
	}
});

// Sentient Items
// Each of these has the word "Bound" prepended so as to not conflict with existing items. For instance, Blackrazor is an existing item that is *vastly* different
// than the one granted by this subclass.

var blackrazorDescription = [
	"Blackrazor was the first of a series of weapons forged by the Raven Queen in the Shadowfell. While the blade itself believes its purpose is to claim souls, many believe the Raven Queen intentionally places it along with its brethren in places mortals will find to further her own unscrupulous goals.",
	"It has the following properties.",
	">>Properties<<. Blackrazor begins with the Blackrazor's Curse and Bonus Spells properties. It gains the Supplant Soul ability at 6th level, the Hexblade Duelist ability at 10th level, and the Soul Plague ability at 14th level.",
	">>Sentience<<. Blackrazor is a sentient neutral evil longsword with an Intelligence of 15, a Wisdom of 11, and a Charisma of 16. It has hearing and darkvision out to a range of 30 feet. It knows the Shadar-Kai language, and has proficiency in the Arcana skill.",
	">>Personality<<. Blackrazor is cold and nihilistic. It was created to consume souls, and is unconcerned with who's souls it eats. The sword believes that all matter and energy sprang from a void of negative energy and will one day return to it, and it is designed to quicken that process. When speaking to a wielder, Blackrazor speaks with an imperious tone, as it is accustomed to being obeyed."
];

MagicItemsList["bound blackrazor"] = {
	name : "Bound Blackrazor",
	source : ["L:HR", 2],
	type : "weapon (longsword)",
	attunement : true,
	description : "Blackrazor is a magical, sentient longsword. While attuned to it, I can use the features it grants me and only I can attune to it. I can telepathically communicate with it while I hold it.",
	descriptionFull : blackrazorDescription.replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	weaponsAdd : ["Bound Blackrazor"],
	weaponOptions : {
		baseWeapon : "longsword",
		regExpSearch : /bound blackrazor/i,
		name : "Bound Blackrazor",
		source : ["L:HR", 2]
	},
	toNotesPage : [{
		name : "Features",
		popupName : "Blackrazor",
		note : desc(blackrazorDescription).replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); }) + "\n\n" + sentientItemConflictTxt
	}]
};

var equinoxDescription = [
	"Equinox consists of two blades, originally known as Midsummer and Midwinter, crafted to be be used by champions chosen by the summer and winter courts at the end of each season to determine if the season would be extended. When the two courts went to war and subsequently made peace, the blades were fused together as a token of their treaty. Equinox on the material plane to influence important events in unpredictable ways.",
	">>Properties<<. Equinox begins with the Split Blades, Equinox's Reflexes, and Bonus Spells properties. It gains the Leech Magic ability at 6th level, the Disappearing Act ability at 10th level, and the Spellblade's Dance ability at 14th level.",
	">>Sentience<<. Equinox is a chaotic neutral double scimitar with an Intelligence score of 13, a Wisdom score of 15, and a Charisma score of 14. It knows the Sylvan language, and has proficiency in the Nature skill.",
	">>Personality<<. Equinox is unpredictable, having drastic mood swings. It tends to be more positive during the Summer months, but quieter and more nihilistic during Winter months. Equinox regularly pretends to have goals in the material plane, but in reality, it cyclically gets bored being a symbol of peace between the fey courts, and intentionally destroys itself so it reforms somewhere in the material plane. Equinox can be split into two shortswords: Midsummer and Midwinter. Midsummer tends to be aggresive and upbeat, while Midwinter acts quiet and dejected."
];

MagicItemsList["bound equinox"] = {
	name : "Bound Equinox",
	source : ["L:HR", 3],
	type : "weapon (double-bladed scimitar)",
	attunement : true,
	description : "Equinox is a magical, sentient double-bladed scimitar. While attuned to it, I can use the features it grants me and only I can attune to it. I can telepathically communicate with it while I hold it.",
	descriptionFull : equinoxDescription.replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	weaponsAdd : ["Bound Equinox"],
	weaponOptions : {
		baseWeapon : "double-bladed scimitar",
		regExpSearch : /bound equinox/i,
		name : "Bound Equinox",
		source : ["L:HR", 3]
	},
	toNotesPage : [{
		name : "Features",
		popupName : "Equinox",
		note : desc(equinoxDescription).replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); }) + "\n\n" + sentientItemConflictTxt
	}]
};

MagicItemsList["bound midsummer"] = {
	name : "Bound Midsummer",
	source : ["L:HR", 3],
	type : "weapon (shortsword)",
	attunement : true,
	description : "Midsummer is a magical, sentient shortsword. It grants all of the same features as Equinox does as long as I am also holding Midwinter.",
	descriptionFull : "Midsummer is a magical, sentient shortsword. It grants all of the same features as Equinox does as long as I am also holding Midwinter.",
	weaponsAdd : ["Bound Midsummer"],
	weaponOptions : {
		baseWeapon : "shortsword",
		regExpSearch : /bound midsummer/i,
		name : "Bound Midsummer",
		source : ["L:HR", 3]
	}
};

MagicItemsList["bound midwinter"] = {
	name : "Bound Midwinter",
	source : ["L:HR", 3],
	type : "weapon (shortsword)",
	attunement : true,
	description : "Midwinter is a magical, sentient shortsword. It grants all of the same features as Equinox does as long as I am also holding Midsummer.",
	descriptionFull : "Midsummer is a magical, sentient shortsword. It grants all of the same features as Equinox does as long as I am also holding Midwinter.",
	weaponsAdd : ["Bound Midwinter"],
	weaponOptions : {
		baseWeapon : "shortsword",
		regExpSearch : /bound midwinter/i,
		name : "Bound Midwinter",
		source : ["L:HR", 3]
	}
};

var severDescription = [
	"Sever was originally forged and used by the archdevil Geryon before his deposition and replacement by Levistus. During the battle, Levistus attempted to destroy Sever, but failed, causing Sever to reform in the material plane. The weakened Sever has been wielded by many power-hungry mortals, although its true power has yet to be uncovered.",
	">>Properties<<. Sever begins with the Sever's Wrath and Bonus Spells properties. It gains the Guide of the Nine Hells ability at 6th level, the Undying Vengeance ability at 10th level, and the Corrupted Transformation ability at 14th level.",
	">>Sentience<<. Sever is a Lawful Evil greataxe with an Intelligence score of 8, a Wisdom score of 14, and a Charisma score of 16. It knows the Infernal language and has proficiency in the Religion skill.",
	">>Personality<<. Sever is arrogant and quick to anger. The axe believes that it was reformed in the material plane to find a wielder capable of dethroning Kevistus and restoring Geryon to his throne, and is willing to work with chaotic or good creatures in hopes of corrupting them to pursue its goals."
];

MagicItemsList["bound sever"] = {
	name : "Bound Sever",
	source : ["L:HR", 4],
	type : "weapon (greataxe)",
	attunement : true,
	description : "Sever is a magical, sentient greataxe. While attuned to it, I can use the features it grants me and only I can attune to it. I can telepathically communicate with it while I hold it.",
	descriptionFull : severDescription.replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	weaponsAdd : ["Bound Sever"],
	weaponOptions : {
		baseWeapon : "greataxe",
		regExpSearch : /bound sever/i,
		name : "Bound Sever",
		source : ["L:HR", 4]
	},
	toNotesPage : [{
		name : "Features",
		popupName : "Sever",
		note : desc(severDescription).replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); }) + "\n\n" + sentientItemConflictTxt
	}]
};

var waveDescription = [
	"Wave was crafted long ago by a forgotten god of the sea to assist her mortal champions. It is particularly ancient, even for an artifact, and many believe it has lost much of its judgement after being locked white plume mountain for many years.",
	">>Properties<<. Wave begins with the Wave's Protection and Bonus Spells properties. It gains the Melora's Gift property at 6th level, the Ocean's Empowerment ability at 10th level, and the Dehydrate ability at 14th level.",
	">>Sentience<<. Wave is a true neutral halberd with the appearance of a massive trident. It has an Intelligence score of 14, a Wisdom score of 10, and a Charisma score of 16. It knows the Aquan language, and has proficiency in the History skill.",
	">>Personality<<. Wave is unpredictable, often acting as if it were drunk. It still feels a strong attachment to Melora, the goddess that created it, despite her falling out of worship for thousands of years, and dedicates itself to reforming her religion. It considers worshipers of all other sea gods heretics, and attempts to have them put to death if it deems them unconvertable."
];

MagicItemsList["bound wave"] = {
	name : "Bound Wave",
	source : ["L:HR", 5],
	type : "weapon (halberd)",
	attunement : true,
	description : "Wave is a magical, sentient halberd. While attuned to it, I can use the features it grants me and only I can attune to it. I can telepathically communicate with it while I hold it.",
	descriptionFull : waveDescription.replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	weaponsAdd : ["Bound Wave"],
	weaponOptions : {
		baseWeapon : "halberd",
		regExpSearch : /bound wave/i,
		name : "Bound Wave",
		source : ["L:HR", 5]
	},
	toNotesPage : [{
		name : "Features",
		popupName : "Wave",
		note : desc(waveDescription).replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); }) + "\n\n" + sentientItemConflictTxt
	}]
};

CreatureList["blackrazor ghoul"] = {
	name : "Blackrazor Ghoul",
	source : ["L:HR", 2],
	size : 3, //Medium
	type : "Undead",
	subtype : "",
	alignment : "Neutral Evil",
	ac : 12,
	hp : 22,
	hd : [5, 8],
	speed : "30 ft",
	scores : [13, 15, 10, 15, 11, 16],
	saves : ["", "", "", "", "", ""],
	damage_immunities : "poison",
	condition_immunities : "charmed, exhaustion, poisoned",
	skills : {
		"arcana" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 10,
	languages : "Common, Shadar-Kai",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 2,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-2, "", ""]
	}, {
		name : "Claws",
		ability : 1,
		damage : [2, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "DC 10 Con save or 1 min paralyzed; Save end of each turn (elf/undead immune)",
		tooltip : "If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
	}]
};