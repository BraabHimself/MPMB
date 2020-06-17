/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    3rd-party compendium
	Effect:     This script adds player options from the D&D Beyond Adventure "Legends of Runeterra: Dark Tides of Bilgewater"
	Content:	3 subclasses
				1 creature
				7 magic items
	Code by:	Newbuu2
	Date:		2020-06-16 (sheet v13)
*/

var iFileName = "LRDToB_v13.js";
RequiredSheetVersion(13);

// Define the source
SourceList.LRDToB={
	name : "Legends of Runeterra: Dark Tides of Bilgewater",
	abbreviation : "LRDToB",
	group : "Third Party Compendium",
	url : "https://www.dndbeyond.com/sources/lrdtob",
	date : "2020/06/12",
	defaultExcluded : true
};

// Add the subclasses
AddSubClass("barbarian", "depths", {
	regExpSearch : /depths?/i,
	subname : "Path of the Depths",
	fullname : "Path of the Depths",
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 1,
	source : ["LRDToB", 0],
	features : {
		"subclassfeature3" : {
			name : "Gift of the Drowned Ones",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["I have a swimming speed equal to my walking speed and can breathe underwater."]),
			eval : function () {
				SetProf("speed", true, { swim : { spd : 'walk', enc : 'walk' } }, "Gift of the Drowned Ones");
			},
			removeeval : function () {
				SetProf("speed", false, { swim : { spd : 'walk', enc : 'walk' } }, "Gift of the Drowned Ones");
			}
		},
		"subclassfeature3.1" : {
			name : "Dredge Line",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"When I rage, I manifest an extra magical appendage, such as a tentacle",
				"I can use a bonus action to strike a creature within 15 with it",
				"It makes a DC 8 + prof + Str mod save or is pulled 10 ft straight towards me"
			]),
			action : ["bonus action", " (while raging)"]
		},
		"subclassfeature6" : {
			name : "Ghostwater Dive",
			source : ["LRDToB", 0],
			minlevel : 6,
			description : desc([
				"As an action, I can magically teleport to an unoccupied space I see within 30 ft",
				"Before or after teleporting I can make an attack as part of the action",
				"Moving in this way does not provoke opportunity attacks"
			]),
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Manifestations of the Deep",
			source : ["LRDToB", 0],
			minlevel : 10,
			description : desc(["Choose a Manifestation of the Deep using the \"Choose Feature\" button above"]),
			choices : ["Eyes of the Deep", "Arms of the Deep", "Heart of the Deep", "Soul of the Deep", "Armor of the Deep"],
			"eyes of the deep" : {
				name : "Eyes of the Deep",
				description : desc([
					"As an action I can use echolocation, casting True Sight without a spell slot or materials",
				]),
				action : ["action", ""],
				usages : 1,
				recovery : "short rest",
				spellcastingBonus : [{
					name : "Eyes of the Deep",
					spells : ["true seeing"],
					selection : ["true seeing"],
					oncesr : true
				}],
				spellChanges : {
					"true seeing" : {
						compMaterial : "",
						components : "V,S",
						range : "Self",
						description : "I gain truesight 120 ft; see through illusions, hidden doors, ethereal plane",
						changes : "Using Eyes of the Deep, I can cast True Seeing on myself without expending a spell lot and without material components."
					}
				}
			},
			"arms of the deep" : {
				name : "Arms of the Deep",
				description : desc([
					"When I rage, I now manifest two magical appendages",
					"When I use Dredge Line, I can attempt a grapple with each appendage"
				])
			},
			"heart of the deep" : {
				name : "Heart of the Deep",
				description : desc([
					"I can use a bonus action to give myself temporary HP",
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""],
				additional : levels.map(function (n) { return n < 10 ? "" :  (12 + n) + " temp HP"; })
			},
			"soul of the deep" : {
				name : "Soul of the Deep",
				description : desc(["I am immune to being charmed and frightened"]),
				savetxt : { immune : ["charmed", "frightened"] }
			},
			"armor of the deep" : {
				name : "Armor of the Deep",
				description : desc(["My skin hardens granting +1 AC"]),
				eval : function () {
					AddACMisc(1, 'Armor of the Deep', 'The class feature Armor of the Deep gives a +1 bonus to AC');
				},
				removeeval : function () {
					AddACMisc(0, 'Armor of the Deep', 'The class feature Armor of the Deep gives a +1 bonus to AC');
				}
			}
		},
		"subclassfeature14" : {
			name : "Depth Charge",
			source : ["LRDToB", 0],
			minlevel : 14,
			description : desc([
				"When I use Ghostwater Dive, I can choose to appear with a wave of tidal force",
				"Creatures within 10 ft of the spot I appear in make a Strength save",
				"On a failure, they take 3d6 force damage and are knocked prone",
				"On a success, they take half damage and are not knocked prone"
			])
		}
	}
});

AddSubClass("fighter", "renegade", {
	regExpSearch : /renegade/i,
	subname : "Renegade",
	source : ["LRDToB", ],
	fullname : "Renegade",
	abilitySave : 2,
	features : {
		"subclassfeature3" : {
			name : "Scoundrel’s Wit",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["I gain proficiency with two of the following skills: Deception, Persuasion, Sleight of Hand"]),
			skillstxt : "\n\n" + toUni("Renegade") + ": Choose two from: Deception, Persuasion, or Sleight of Hand."
		},
		"subclassfeature3.1" : {
			name : "Gunfighter Form",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Choose a Gunfighter Firearm Form using the \"Choose Feature\" button above"]),
			choices : ["Pistoleer", "Sniper"],
			"pistoleer" : {
				name : "Pistoleer",
				description : desc(["My firearm is a small flintlock handgun"]),
				weaponOptions : {
					regExpSearch : /pistoleer firearm/i,
					name : "Pistoleer Firearm",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 6, "piercing"],
					range : "30 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition; 1 shot per attack"
				},
				weaponsAdd : ["Pistoleer Firearm"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell && classes.known.fighter && classes.known.fighter.level >= 3 && (/pistoleer firearm/i).test(v.WeaponName) && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'pistoleer') {
								var atksNum = (classes.known.fighter.level < 5 ? 1 : classes.known.fighter.level < 11 ? 2 : classes.known.fighter.level < 20 ? 3 : 4);
								var shotStr = (classes.known.fighter.level < 5 ? "shot" : "shots");
								
								fields.Description = fields.Description.replace(/[0-9] shots?/i, atksNum + " " + shotStr);
							}
						},""
					]
				}
			},
			"sniper" : {
				name : "Sniper",
				description : desc(["My firearm is a large two-handed firearm"]),
				weaponOptions : {
					regExpSearch : /sniper firearm/i,
					name : "Sniper Firearm",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 10, "piercing"],
					range : "120 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition, heavy, two-handed"
				},
				weaponsAdd : ["Sniper Firearm"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if ((!v.isSpell && classes.known.fighter && classes.known.fighter.level >= 3 && (/sniper firearm/i).test(v.WeaponName) && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper')) {
								output.die = output.die.replace('1d10', (classes.known.fighter.level < 5 ? 1 : classes.known.fighter.level < 11 ? 2 : classes.known.fighter.level < 20 ? 4 : 6) + 'd10');
							}
						}
					]
				}
			}
		},
		"weapon of choice minor" : {
			name : "Weapon of Choice (minor upgrades)",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Use the \"Choose Feature\" to add minor fire arm upgrades to the third page"]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : (n <  5 ? 1 : 2)) + " minor upgrades";
			}),
			extraname : "Minor Firearm Upgrades",
			extrachoices : [
				"Blade and Black powder (prereq: Pistoleer Form)", "Caliber Net (prereq: Gunfighter Form)", "Collateral Damage (prereq: Sniper Form)", 
				"Crosshairs (prereq: level 5 fighter, Gunfighter Form)", "Double-Barrel (prereq: level 5 fighter, Sniper Form)", "Smoke Screen (prereq: Gunfighter Form)"
			],
			extraTimes : levels.map(function (n) {
				return n < 2 ? 0 : n < 5 ? 1 : 2;
			}),
			"blade and black powder (prereq: pistoleer form)" : {
				name : "Blade and Black Powder",
				description : desc([
					"Being within 5 ft of an enemy doesn't impose disadvantage on my Pistoleer firearm attacks",
					"I can use a bonus action to make a melee attack after shooting my Pistoleer firearm"
				]),
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'pistoleer'; },
				weaponOptions : {
					regExpSearch : /pistoleer blade/i,
					name : "Pistoleer Blade",
					source : ["LRDToB", 0],
					ability : 2,
					list : "melee",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 6, "slashing"],
					range : "Melee",
					abilitytodamage : true
				},
				weaponsAdd : ["Pistoleer Blade"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isRangedWeapon && (/pistoleer firearm/i).test(v.WeaponName)) {
								fields.Description += (fields.Description ? '; ' : '') + "No disadv. when enemies within 5 ft";
							}
						}, ''
					]
				},
				eval : function () {
					processActions(true, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Pistoleer Blade");
					processActions(false, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Blade and Black Powder");
				},
				removeeval : function () {
					processActions(false, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Pistoleer Blade");
				}
			},
			"caliber net (prereq: gunfighter form)" : {
				name : "Caliber Net",
				description : desc([
					"I can use an action to fire an arcane net at a creature in my Gunfighter firearm's range",
					"It makes a Strength save or is restrained; repeats save at end of each of its turns"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""],
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				weaponOptions : {
					regExpSearch : /caliber net/i,
					name : "Caliber Net",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					abilitytodamage : false,
					damage : [0, 0, ""],
					range : "",
					description : "Strength save or restrained"
				},
				weaponsAdd : ["Caliber Net"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/caliber net/i).test(v.WeaponName)) {
								fields.Range = ((GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper') ? "120" : "30") + " ft";
							}
						}, ''
					],
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/caliber net/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				}
			},
			"collateral damage (prereq: sniper form)" : {
				name : "Collateral Damage",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper'; },
				description : desc(["On a Sniper firearm hit, creatures within 5 ft of the target make a Dexeterity save",
					"On a failure, they take 1d6 piercing damage"
				])
			},
			"crosshairs (prereq: level 5 fighter, gunfighter form)" : {
				name : "Crosshairs",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return classes.known.fighter.level >= 5 && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"Before moving, I can use a bonus action to aim down the sights of my Gunfighter firearm",
					"My speed becomes 0 and I gain adv. on all Gunfighter firearm attacks",
					"These effects last until the end of my turn"
				]),
				action : ["bonus action", " (before moving)"]
			},
			"double-barrel (prereq: level 5 fighter, sniper form)" : {
				name : "Double-Barrel",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return classes.known.fighter.level >= 5 && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper'; },
				description : desc(["My Sniper firearm has 2 barrels; I can make 2 attacks per attack action with it"]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/sniper firearm/i).test(v.WeaponName)) {
								fields.Description += (fields.Description ? '; ' : '') + '2 shots per attack';
							}
						},"I've added a second barrel to my Sniper firearm, allowing me to make 2 attacks with it per attack action"
					]
				}
			},
			"smoke screen (prereq: gunfighter form)" : {
				name : "Smoke Screen",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"I can use an action to create a 10 ft cube cloud within my Gunfighter's firearm range",
					"The cloud spreads around corners, lasts 10 mins, and cannot be dispersed",
					"The area covered by the cloud is heavily obscured"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			}
		},
		"weapon of choice major" : {
			name : "Weapon of Choice (major upgrades)",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Use the \"Choose Feature\" to add major fire arm upgrades to the third page"]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : (n < 10 ? 1 : 2)) + " major upgrades";
			}),
			extraname : "Major Firearm Upgrades",
			extrachoices : ["Barrage (prereq: Gunfighter Form)", "Double Up (prereq: Gunfighter Form)", "Lightning Round (prereq: Gunfighter Form)", "Trial by Fire (prereq: Gunfighter Form)"],
			extraTimes : levels.map(function (n) {
				return n < 2 ? 0 : n < 10 ? 1 : 2;
			}),
			"barrage (prereq: gunfighter form)" : {
				name : "Barrage",
				description : desc([
					"As an action, I can force each creature in a 15 ft cone to make a Dexeterity save",
					"A creature takes 3d10 piercing damage on a failure, or half as much damage on a success"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""],
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				weaponOptions : {
					regExpSearch : /barrage/i,
					name : "Barrage",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [3, 10, "piercing"],
					range : "15 ft cone",
					description : "Dex save; half damage on success"
				},
				weaponsAdd : ["Barrage"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/barrage/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				}
			},
			"double up (prereq: gunfighter form)" : {
				name : "Double Up",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"On a Gunfighter firearm hit, I can hit another creature within 15 ft of the original target",
					"The creature takes piercing damage equal to my Dexeterity modifier"
				]),
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest"
			},
			"lightning round (prereq: gunfighter form)" : {
				name : "Lightning Round",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"I can use an action to fire a bolt of electricity in a straight line",
					"The line is 1 ft wide and 30 ft long; creatures in the line make a Dex save",
					"A creature takes 3d8 lightning damage on a failure, or half as much damage on a success"
				]),
				weaponOptions : {
					regExpSearch : /lightning round/i,
					name : "Lightning Round",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [3, 8, "lightning"],
					range : "30 ft line",
					description : "Dex save; half damage on success"
				},
				weaponsAdd : ["Lightning Round"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/lightning round/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				},
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest",
				action : ["action", ""]
			},
			"trial by fire (prereq: gunfighter form)" : {
				name : "Trial by Fire",
				source : ["LRDToB", 0],
				description : desc([
					"I can use a bonus action to charge my weapons fire",
					"On a hit, I deal extra fire damage equal to half your fighter level, rounded up"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (!v.isSpell && (/\bcharged\b/i).test(v.WeaponText)) {
								output.extraDmg += Math.ceil(classes.known.fighter.level / 2);
							}
						},
						"If I include the word 'Charged' in a weapon's name or description, the calculation will add extra fire damage equal to half my fighter level, rounded up."
					]
				},
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest",
				action : ["bonus action", ""]
			}
		},
		"subclassfeature7" : {
			name : "Cunning Shot",
			source : ["LRDToB", 0],
			minlevel : 7,
			description : desc(["My Gunfighter firearm attacks ignore damage resistances and immunities"]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/sniper firearm/i).test(v.WeaponName) || (/pistoleer firearm/i).test(v.WeaponName) || (/lightning round/i).test(v.WeaponName) || (/barrage/i).test(v.WeaponName)) {
							fields.Description += (fields.Description ? '; ' : '') + 'ignores resistances/immunities';
						}
					},
					"My Gunfighter Firearm attacks ignore damage resistances and immunities."
				]
			}
		},
		"subclassfeature10" : {
			name : "Gring and Bear It",
			source : ["LRDToB", 0],
			minlevel : 10,
			description : desc(["My movement speed increases by 10 ft and I gain +1 AC when I use Second Wind"])
		},
		"subclassfeature15" : {
			name : "Right Gun for the Job",
			source : ["LRDToB", 0],
			minlevel : 15,
			description : desc(["After a long rest I can replace any Firearm Upgrade with a different one"])
		},
		"subclassfeature18" : {
			name : "Light 'Em Up",
			source : ["LRDToB", 0],
			minlevel : 18,
			description : desc([
				"As a bonus action I can throw or place an explosive",
				"When it is thrown, it explodes immediately on impact",
				"When it is placed, it can be detonated from up to 60 ft away as a bonus action",
				"When it explodes, creatures within a 15 ft radius make a Dexeterity save",
				"A creature takes 12d6 force damage on a failure, or half as much damage on a success"
			]),
			weaponOptions : {
				regExpSearch : /explosive/i,
				name : "Explosive",
				source : ["LRDToB", 0],
				ability : 2,
				dc : true,
				list : "ranged",
				type : "Martial",
				isAlwaysProf : true,
				abilitytodamage : false,
				damage : [12, 6, "force"],
				range : "30 ft",
				description : "Explodes in 15 ft radius \u2014 Dex save; half damage on success"
			},
			weaponsAdd : ["Explosive"],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isRangedWeapon && (/explosive/i).test(v.WeaponName)) {
							var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
							
							output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
						}
					},""
				]
			},
			usages : 1,
			action : [["bonus action", " (throw/place)"], ["bonus action", " (remote detonate)"]],
			recovery : "short rest"
		}
	}
});

AddSubClass("rogue", "wild card", {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*wild card).*$/i,
	subname : "Wild Card",
	source : ["LRDToB", 0],
	features : {
		"subclassfeature3" : {
			name : "Tricks Up the Sleeve",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"I know Guidance; at 9th level I can cast it as a bonus action with a range of 30 ft"
			]),
			spellcastingBonus : {
				name : "Tricks Up the Sleeve",
				spells : ["guidance"],
				selection : ["guidance"],
				firstCol : "atwill"
			}
		},
		"subclassfeature3.1" : {
			name : "Wild Card's Gambit",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"Choose a gaming with the \"Choose Feature\" button, which grants a Wild Card's Gambit",
				"I can change my Gambit choice whenever I gain a level in this class"
			]),
			choices : ["Dice Set (Loaded Dice Gambit)", "Dragonchess Set (Dragonchess Gambit)", "Playing Card Set (Playing Cards Gambit)"],
			"dice set (loaded dice gambit)" : {
				name : "Wild Card's Gambit: Loaded Dice",
				description : desc([
					"I am proficient with dice; See third page notes section",
					"I can change my Gambit choice whenever I gain a level in this class"
				]),
				additional : levels.map(function (n) {
					return Math.ceil(n / 2) + "d6";
				}),
				toolProfs : [["Dice set"]],
				eval : function () {
					processActions(true, "Wild Card's Gambit: Loaded Dice", [["reaction", " (when attacked)"]], "Loaded Dice");
				},
				removeeval : function () {
					processActions(false, "Wild Card's Gambit: Loaded Dice", [["reaction", " (when attacked)"]], "Loaded Dice");
				},
				toNotesPage : [{
					name : "Wild Card's Gambit: Loaded Dice",
					page3notes : true,
					popupName : "Wild Card's Gambit: Loaded Dice",
					note : desc([
						"I have a pool of d6s equal to the number of d6s for Sneak Attack",
						"When I am attacked, I can spend/roll a d6 to subtract from the attack",
						"I can choose to do this after the roll, but before the outcome is determined",
						"At 9th level I can spend up to 2 and a 17th level I can spend up to 3"
					])
				}]
			},
			"dragonchess set (dragonchess gambit)" : {
				name : "Wild Card's Gambit: Dragonchess",
				description : desc([
					"I am proficient with dragonchess; See third page notes section",
					"I can change my Gambit choice whenever I gain a level in this class"
				]),
				toolProfs : [["Dragonchess set"]],
				usages : "Cha" + (typePF ? "risma" : "") + " modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "long rest",
				eval : function () {
					processActions(true, "Wild Card's Gambit: Dragonchess", [["bonus action", ""]], "Dragon/Griffon/Sylph");
				},
				removeeval : function () {
					processActions(false, "Wild Card's Gambit: Dragonchess", [["bonus action", ""]], "Dragon/Griffon/Sylph");
				},
				toNotesPage : [{
					name : "Wild Card's Gambit: Dragonchess",
					page3notes : true,
					popupName : "Wild Card's Gambit: Dragonchess",
					note : desc([
						"As a bonus action I can employ one of the following dragonchess maneuvers:",
						"\u2022 Dragon: I choose a creature in sight/30 ft; its first hit adds my rogue level extra damage",
						"\u2022 Griffon: My movement increases by 10 ft and does not provoke opportunity attacks",
						"\u2022 Sylph: Me and my allies within 5 ft have advantage on Dexterity saving throws",
						"The effects of these maneuvers last until the start of my next turn"
					])
				}]
			},
			"playing card set (playing cards gambit)" : {
				name : "Wild Card's Gambit: Playing Cards",
				description : desc([
					"I am proficient with playing cards; I have the Playing Cards Gambit",
					"I can change my Gambit choice whenever I gain a level in this class"
				]),
				toolProfs : [["Playing card set"]],
				usages : "Cha" + (typePF ? "risma" : "") + " modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "long rest",
				weaponOptions : {
					regExpSearch : /razor card/i,
					name : "Razor Card",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Simple",
					isAlwaysProf : true,
					damage : [1, 4, "slashing"],
					range : "30 ft",
					abilitytodamage : true,
					description : "See Playing Cards Gambit"
				},
				weaponsAdd : ["Razor Card"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (classes.known.rogue && classes.known.rogue.level && (/razor card/i).test(v.WeaponName)) {
								fields.Description = fields.Description.replace(/(; )?sneak attack [0-9]*?d6/i, "");
							}
						},""
					]
				},
				eval : function () {
					processActions(true, "Wild Card's Gambit: Playing Cards", [["action", " (before Sneak Attack)"]], "Razor Card");
				},
				removeeval : function () {
					processActions(false, "Wild Card's Gambit: Playing Cards", [["action", " (before Sneak Attack)"]], "Razor Card");
				},
				toNotesPage : [{
					name : "Wild Card's Gambit: Playing Cards",
					page3notes : true,
					popupName : "Wild Card's Gambit: Playing Cards",
					note : desc([
						"If I haven't used Sneak Attack this turn, I can use an action to throw a card at a creature",
						"When I roll damage, look at number rolled and the add effect based on the table below",
						"d4  Effect",
						"1 (Blade) Roll Sneak Attack damage and add it to the Razor Card's damage; At the start of its next turn, the target takes additional damage equal to half the Sneak Attack damage rolled",
						"2 (Shackle) Until the start of my next turn, the target’s speed is halved; It can’t make more than one attack on its turn while its speed is reduced in this way",
						"3 (Heart) Roll Sneak Attack damage and add it to the Razor Card’s damage; I regain a number of HP equal to the half the damage dealt; Excess HP regained become temporary HP",
						"4 (Wild Ace) Choose Blade, Shackle, or Heart and add the effect to the Razor Card"
					])
				}]
			}
		},
		"subclassfeature9" : {
			name : "Shifting the Odds",
			source : ["LRDToB", 0],
			minlevel : 9,
			description : desc([
				"As a bonus action I can teleport to an unoccupied space with 120 ft that I can see",
				"Creatures within 10 ft of the starting space make a Dex save (DC 8 + Cha mod + Prof)",
				"A creature takes 4d10 force damage on a failure, or half as much damage on a success"
			]),
			action : ["bonus action", " (teleport)"],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature13" : {
			name : "Twist of Fate",
			source : ["LRDToB", 0],
			minlevel : 13,
			description : desc([
				"I can swap initiative order after rolling initiative, but before the first turn",
				"I can swap with one creature I see; if its an ally they must agree to swap"
			])
		},
		"subclassfeature17" : {
			name : "Joker Wild",
			source : ["LRDToB", 0],
			minlevel : 17,
			description : desc([
				"As a bonus action I can assume an incorporeal form, granting the following benefits:",
				" \u2022 I regain all spent uses/dice of my Wild Card's Gambit feature",
				" \u2022 My movement speed is doubled and I am resistant to all damage",
				" \u2022 I am immune to the grappled, paralyzed, stunned, and restrained conditions",
				" \u2022 I can move through objects as if they were difficult terrain",
				"If I end my turn in a creature, it takes 1d0 force damage and is moved 5 ft",
				"This form lasts for 1 min or until I am incapacitated"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""]
		}
	}
});

//Add creatures
CreatureList["wharf rat"] = {
	name : "Wharf Rat",
	source : ["LRDToB", 0],
	size : 4,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 12,
	hp : 11,
	hd : [3, 6],
	speed : "30 ft,\nswim 30 ft",
	scores : [7, 15, 12, 2, 10, 4],
	saves : ["", "", "", "", "", ""],
	senses : "Adv. on Wis (Perception) checks using smell",
	passivePerception : 10,
	languages : "",
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)"
	}],
	traits : [{
		name : "Blood Frenzy",
		description : "The wharf rat has advantage on melee attack rolls against any creature that doesn't have all its HP."
	}]
};

//Add magic items
MagicItemsList["adaptive helm"] = {
	name : "Adaptive Helm",
	source : ["LRDToB", 0],
	type : "wondrous item",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "When hit with acid, cold, fire, lightning, or thunder damage, I can use my reaction to gain resistance to that damage type. This effect lasts for 10 mins.",
	descriptionFull : "This metal helmet is set with crystals that change color when exposed to elemental energy. While wearing this helm, if you are the target of an attack which would deal acid, cold, fire, lightning, or thunder damage you can use a reaction to adapt to that damage type. While adapted, you have resistance to that damage type. The helm returns to its normal state after ten minutes.",
	action : ["reaction", " (adapt)"]
};

MagicItemsList["banshee's veil"] = {
	name : "Banshee's Veil",
	source : ["LRDToB", 0],
	type : "wondrous item",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : true,
	prerequisite : "Requires attunement by a spellcaster",
	prereqeval : function(v) { return v.isSpellcaster; },
	allowDuplicates : true,
	description : "Once per day, when I am targeted with a spell, I can use my reaction to cast Counterspell, using my spellcasting ability and without expending a spell slot.",
	descriptionFull : "This amulet is shaped like a sword with a small ruby set in the crossguard. Once per day when you are the target of a spell you can use a reaction to cast counterspell (using your spellcasting ability). Casting counterspell in this way does not expend a spell slot.",
	action : ["reaction", " (Counterspell)"],
	spellcastingAbility : "class",
	spellFirstColTitle : "Us",
	recovery : "dawn",
	usages : 1,
	spellcastingBonus : {
		name : "Banshee's Veil",
		spells : ["counterspell"],
		selection : ["counterspell"],
		firstCol : "checkbox"
	}
};

MagicItemsList["bilgewater cutlass"] = {
	name : "Bilgewater Cutlass",
	source : ["LRDToB", 0],
	type : "weapon (scimitar)",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Bilgewater Cutlass"],
	weaponOptions : {
		baseWeapon : "scimitar",
		regExpSearch : /bilgewater cutlass/i,
		name : "Bilgewater Cutlass",
		source : ["LRDToB", 0],
		range : "Melee",
		description : "Finesse, light; Target's speed reduced by 10 ft",
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This magical scimitar adds +1 to hit and damage. On a hit, the target's speed is reduced by 10 ft until the start of my next turn.",
	descriptionFull : "These curved blades trail golden light when swung through the air. You have a +1 bonus to attack and damage rolls made with this magic weapon. On a successful hit with the cutlass the target’s speed is reduced by 10 feet until the start of your next turn."
};

var bladeOfLedrosFullDescription = [
	"The jagged shards of this blade are bound together by sickly green energy. . While wielding this longsword, you gain the following benefits:",
	"\u2022 You gain a +1 bonus to attack and damage rolls made with this magic weapon.",
	"\u2022 When you hit a humanoid with this weapon, the humanoid takes an extra 3d6 damage.",
	">>Curse<<. This weapon is cursed, and becoming attuned to it extends the curse to you. Until the curse is broken with remove curse or similar magic, you are unwilling to part with the weapon, keeping it within reach at all times. In addition, you have disadvantage on attack rolls made with weapons other than this one.",
	"While you are attuned to the sword, once a day at midnight, you must succeed on a DC 17 Constitution saving throw unless you are undead. On a failed save, your maximum hit points are reduced by 10. Hit points lost in this way can only be restored by a wish spell. If your maximum hit points are reduced to 0 in this way, you die and immediately rise as a wraith."
];

MagicItemsList["blade of ledros"] = {
	name : "Blade of Ledros",
	source : ["LRDToB", 0],
	type : "weapon (longsword)",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	cursed : true,
	weaponsAdd : ["Blade of Ledros"],
	weaponOptions : {
		baseWeapon : "longsword",
		regExpSearch : /blade of ledros/i,
		name : "Blade of Ledros",
		source : ["LRDToB", 0],
		range : "Melee",
		description : "Versatile (1d10)",
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This magical longsword adds +1 to hit and damage. When I hit a humanoid, it takes an extra 3d6 damage. I am unwilling to part with this longsword until its curse is lifted from me, see Notes page. The curse causes me to have disadvantage on attack rolls with weapons other than this one.",
	descriptionFull : bladeOfLedrosFullDescription.join("\n   ").replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	toNotesPage : [{
		name : "Blade of Ledros Features",
		popupName : "Features of Blade of Ledros",
		note : desc(bladeOfLedrosFullDescription).replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); }).replace(/your/g, "my").replace(/you are /ig, "I am ").replace(/you /ig, "I ")
	}]
};

MagicItemsList["boots of swiftness"] = {
	name : "Boots of Swiftness",
	source : ["LRDToB", 0],
	type : "wondrous item",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "While I wear these boots my movement speed is increased by 10 ft. My movement is unaffected by difficult terrain and spells and other magical effects cannot reduce my speed nor cause me to become restrained.",
	descriptionFull : "These fashionable boots are adorned with small white wings. While you wear these boots your base walking speed increases by 10 feet. In addition, your movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce your speed nor cause you to be restrained.",
	speed : { walk : {spd : "+10", enc : "+10" } }
};

MagicItemsList["dead man's plate"] = {
	name : "Dead Man's Armor",
	nameTest : "Dead Man's",
	source : ["LRDToB", 0],
	type : "armor (medium or heavy)",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "While wearing this armor, I can use a bonus action to shove a creature within 5 ft of me, after taking the Attack action. The shoved creature takes 1d8 piercing damage.",
	descriptionFull : "This jagged armor is made of castaway hooks and barbs. While wearing this armor, if you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you (see \"Shoving a Creature\" in chapter 9 of the D&D Basic Rules). The shoved creature takes 1d8 piercing damage, in addition to either being knocked prone or pushed.",
	chooseGear : {
		type : "armor",
		prefixOrSuffix : "suffix",
		excludeCheck : function (inObjKey, inObj) {
			return !(/medium|heavy/i).test(inObj.type) || (/hide/i).test(inObj.name);
		},
		descriptionChange : ["prefix", "armor"]
	},
	action : ["bonus action", " (shove, after Attack)"]
};

MagicItemsList["powder keg"] = {
	name : "Powder Keg",
	source : ["LRDToB", 0],
	type : "wondrous item",
	rarity : "common",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "I can use an action and a lit torch, match, or similar magical effect to light the keg. Once lit, it explodes at the end of the round it is lit, causing creatures to make a DC 12 Dexeterity save. It deals 1d10 fire damage to creatures and objects within 10 ft of it that fail, or half as much on a success.",
	descriptionFull : "These small wooden barrels are filled with highly volatile gun powder, then magically sealed for easy transport. Setting fire to a keg requires one action and a lit torch, match, or similar magical effect. Once set on fire, a powder keg explodes at the end of the round it is lit, dealing 1d10 fire damage to creatures and objects within 10 feet of it. A successful DC 12 Dexterity saving throw halves the damage."
};