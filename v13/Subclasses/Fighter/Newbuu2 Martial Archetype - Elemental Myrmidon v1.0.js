var iFileName = "Newbuu2 Martial Archetype - Elemental Myrmidon v1.0.js";

RequiredSheetVersion(13);

// Define the source
SourceList["NB2:EM"] = {
	name : "Newbuu2: Martial Archetype - Elemental Myrmidon",
	abbreviation : "NB2:EM",
	group : "Homebrew",
	url : "https://i.redd.it/bq70njnz5wh61.jpg",
	date : "2021/02/16"
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
				"I learn Primordial; I have adv. on Persuasion checks for interactions with elementals"
			]),
			languageProfs : ["Primordial"]
		},
		"subclassfeature3.1" : {
			name : "Myrmidon's Armament",
			source : ["NB2:EM", 1],
			minlevel : 3,
			description : desc([
				"After a long rest, I can imbue a melee weapon I touch with cold, fire, or lightning",
				"It deals extra damage of the chosen type equal to my prof. bonus and counts as magical",
				"Use the \"Choose Feature\" button above to select the imbued type"
			]),
			choices : ["Cold", "Fire", "Lightning"],
			"cold" : {
				name : "Myrmidon's Armament: Cold",
				description : desc([
					"My melee weapon is cold imbued, it deals extra cold damage; counts as magical",
					"The extra cold damage is equal to my proficiency bonus",
					"When I finish a long rest, I can imbue a melee weapon I touch with an element",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && !v.isNaturalWeapon && (/\b(cold imbued)\b/i).test(v.WeaponText)) {
								var bonusDamage = ProficiencyBonusList[classes.totallevel - 1];
								
								if((/\b(supercharged?)\b/i).test(v.WeaponText) && classes.known.fighter.level >= 10)
								{
									bonusDamage *= 2;
								}
								
								fields.Description += (fields.Description ? '; ' : '') + "+" + bonusDamage + " cold damage; counts as magical";
							}
						},
						"If I include 'Cold Imbued' in a melee weapon's name or description, it gets treated as a weapon that is imbued by my Myrmidon's Armament feature, adding my proficiency bonus as extra cold damage and counts as magical in the description. If I include 'Supercharged' and am at least level 10, the extra cold damage is doubled."
					]
				}
			},
			"fire" : {
				name : "Myrmidon's Armament: Fire",
				description : desc([
					"My melee weapon is fire imbued, it deals extra fire damage; counts as magical",
					"The extra fire damage is equal to my proficiency bonus",
					"When I finish a long rest, I can imbue a melee weapon I touch with an element",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && !v.isNaturalWeapon && (/\b(fire imbued)\b/i).test(v.WeaponText)) {
								var bonusDamage = ProficiencyBonusList[classes.totallevel - 1];
								
								if((/\b(supercharged?)\b/i).test(v.WeaponText) && classes.known.fighter.level >= 10)
								{
									bonusDamage *= 2;
								}
								
								fields.Description += (fields.Description ? '; ' : '') + "+" + bonusDamage + " fire damage; counts as magical";
							}
						},
						"If I include 'Fire Imbued' in a melee weapon's name or description, it gets treated as a weapon that is imbued by my Myrmidon's Armament feature, adding my proficiency bonus as extra fire damage and counts as magical in the description. If I include 'Supercharged' and am at least level 10, the extra fire damage is doubled."
					]
				}
			},
			"lightning" : {
				name : "Myrmidon's Armament: Lightning",
				description : desc([
					"My melee weapon is lightning imbued, it deals extra lightning damage; counts as magical",
					"The extra lightning damage is equal to my proficiency bonus",
					"When I finish a long rest, I can imbue a melee weapon I touch with an element",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && !v.isNaturalWeapon && (/\b(lightning imbued)\b/i).test(v.WeaponText)) {
								var bonusDamage = ProficiencyBonusList[classes.totallevel - 1];
								
								if((/\b(supercharged?)\b/i).test(v.WeaponText) && classes.known.fighter.level >= 10)
								{
									bonusDamage *= 2;
								}
								
								fields.Description += (fields.Description ? '; ' : '') + "+" + bonusDamage + " lightning damage; counts as magical";
							}
						},
						"If I include 'Lightning Imbued' in a melee weapon's name or description, it gets treated as a weapon that is imbued by my Myrmidon's Armament feature, adding my proficiency bonus as extra lightning damage and counts as magical in the description. If I include 'Supercharged' and am at least level 10, the extra lightning damage is doubled."
					]
				}
			},
			choiceDependencies : [{
				feature : "subclassfeature7"
			}, {
				feature : "subclassfeature10"
			}, {
				feature : "subclassfeature15"
			}, {
				feature : "subclassfeature18"
			}]
		},
		"subclassfeature7" : {
			name : "Myrmidon's Bulwark",
			source : ["NB2:EM", 1],
			minlevel : 7,
			description : desc([
				"I can also imbue a suit of armor when I imbue a weapon during my ritual",
				"While wearing it, I have resistance to the imbued damage type",
				"Use the \"Choose Feature\" button above to select the imbued type"
			]),
			choices : ["cold", "fire", "lightning"],
			choicesNotInMenu : true,
			"cold" : {
				name : "Myrmidon's Bulwark: Cold",
				description : desc([
					"I can also imbue a suit of armor when I imbue a weapon during my ritual",
					"While wearing the imbued armor, I am resistant to cold damage"
				]),
				dmgres : ["Cold"]
			},
			"fire" : {
				name : "Myrmidon's Bulwark: Fire",
				description : desc([
					"I can also imbue a suit of armor when I imbue a weapon during my ritual",
					"While wearing the imbued armor, I am resistant to fire damage"
				]),
				dmgres : ["Fire"]
			},
			"lightning" : {
				name : "Myrmidon's Bulwark: Lightning",
				description : desc([
					"I can also imbue a suit of armor when I imbue a weapon during my ritual",
					"While wearing the imbued armor, I am resistant to lightning damage"
				]),
				dmgres : ["Lightning"]
			}
		},
		"subclassfeature10" : {
			name : "Supercharge",
			source : ["NB2:EM", 1],
			minlevel : 10,
			description : desc([
				"As a bonus action, I can double the imbued extra damage dealt by my weapon",
				"This effect lasts until the end of my turn",
				"Use the \"Choose Feature\" button above to select the imbued type"
			]),
			choices : ["cold", "fire", "lightning"],
			choicesNotInMenu : true,
			"cold" : {
				name : "Supercharge: Cold",
				description : desc([
					"As a bonus action, I can double the imbued extra cold damage dealt by my weapon",
					"This effect lasts until the end of my turn"
				])
			},
			"fire" : {
				name : "Supercharge: Fire",
				description : desc([
					"As a bonus action, I can double the imbued extra fire damage dealt by my weapon",
					"This effect lasts until the end of my turn"
				])
			},
			"lightning" : {
				name : "Supercharge: Lightning",
				description : desc([
					"As a bonus action, I can double the imbued extra lightning damage dealt by my weapon",
					"This effect lasts until the end of my turn"
				])
			},
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : "Con mod per ",
			usagescalc : "event.value = Math.max(1, What('Con Mod'));",
		},
		"subclassfeature15" : {
			name : "Elemental Fluidity",
			source : ["NB2:EM", 1],
			minlevel : 15,
			usages : 1,
			recovery : "long rest",
			description : desc([
				"When I take cold/fire/lightning damage I can become immune to it as a reaction",
				"To use this reaction, the type taken must a different type than my imbued type",
				"As part of the reaction, I can change the imbued type of my weapon and armor",
				"If I do, the imbued type becomes the damage type I became immune to",
				"Use the \"Choose Feature\" button above to select the imbued type"
			]),
			choices : ["cold", "fire", "lightning"],
			choicesNotInMenu : true,
			"cold" : {
				name : "Elemental Fluidity",
				description : desc([
					"When I take fire or lightning, damage I can become immune to it as a reaction",
					"As part of the reaction, I can change the imbued type of my weapon and armor",
					"If I do, the imbued type becomes the damage type I became immune to",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				action : ["reaction", "(fire/lightning damage)"]
			},
			"fire" : {
				name : "Elemental Fluidity",
				description : desc([
					"When I take cold or lightning, damage I can become immune to it as a reaction",
					"As part of the reaction, I can change the imbued type of my weapon and armor",
					"If I do, the imbued type becomes the damage type I became immune to",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				action : ["reaction", "(cold/lightning damage)"]
			},
			"lightning" : {
				name : "Elemental Fluidity",
				description : desc([
					"When I take cold or fire damage, I can become immune to it as a reaction",
					"As part of the reaction, I can change the imbued type of my weapon and armor",
					"If I do, the imbued type becomes the damage type I became immune to",
					"Use the \"Choose Feature\" button above to change the imbued type"
				]),
				action : ["reaction", "(cold/fire damage)"]
			}
		},
		"subclassfeature18" : {
			name : "Myrmidon's Bastion",
			source : ["NB2:EM", 1],
			minlevel : 18,
			description : desc([
				"While wearing my imbued armor, I gain immunity to that damage type",
				"I also become resistant to nonmagical bludgeoning, piercing, and slashing damage",
				"Use the \"Choose Feature\" button above to select the imbued type"
			]),
			choices : ["cold", "fire", "lightning"],
			choicesNotInMenu : true,
			"cold" : {
				name : "Myrmidon's Bastion: Cold",
				description : desc([
					"While wearing my cold imbued armor, I gain the following benefits:",
					" \u2022 Immunity to cold damage",
					" \u2022 Resistance to nonmagical bludgeoning, piercing, and slashing damage"
				]),
				savetxt : { immune : ["cold"] },
				dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
			},
			"fire" : {
				name : "Myrmidon's Bastion: Fire",
				description : desc([
					"While wearing my fire imbued armor, I gain the following benefits:",
					" \u2022 Immunity to fire damage",
					" \u2022 Resistance to nonmagical bludgeoning, piercing, and slashing damage"
				]),
				savetxt : { immune : ["fire"] },
				dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
			},
			"lightning" : {
				name : "Myrmidon's Bastion: Lightning",
				description : desc([
					"While wearing my lightning imbued armor, I gain the following benefits:",
					" \u2022 Immunity to lightning damage",
					" \u2022 Resistance to nonmagical bludgeoning, piercing, and slashing damage"
				]),
				savetxt : { immune : ["lightning"] },
				dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
			}
		}
	}
});