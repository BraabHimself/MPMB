/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Homebrew: Gladiator Class
	Effect:     This file adds the Gladiator class and 3 Martial Roles (subclasses)
	Author:     JosieWrites
	Code by:	Newbuu2
	Date:		2020-02-07 (sheet v13)
*/

var iFileName = "The Gladiator by JosieWrites.js";

RequiredSheetVersion(13);

SourceList["JW:G"] = {
	name : "JosieWrites' Gladiator Class",
	abbreviation : "JW:G",
	group : "Homebrew",
	url : "https://www.dmsguild.com/product/334007/The-Gladiator-Class",
	date : "2019/04/11"
};

if (ClassList.fighter)
{
	ClassList.fighter.regExpSearch = /^(?!.*(dark|green|fey|horned|totem|spiritual|exalted|sacred|holy|divine|nature|odin|thor|nature|natural|green|beast|animal|net))(?=.*(fighter|warrior|militant|warlord|phalanx|trooper)).*$/i;
}

var GladiatorFlourishes = {
	artful_avoidance : {
		name : "Artful Avoidance Flourish",
		source : ["JW:G", 5],
		description : desc([
			"Use when moving; I add 1 flair die to my AC until I stop moving",
		]),
		action : ["bonus action", " (while moving)"]
	},
	blinding_strike : {
		name : "Blinding Strike Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after piercing weapon hit; I can expend 3 flair die",
			"The target makes a Dexterity save, becoming blinded on a failure",
			"This effect ends if the target regains HP or uses its action to make a Con save"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 12 && (/retiarius/).test(classes.known.gladiator.subclass); }
	},
	called_shot : {
		name : "Called Shot Flourish",
		source : ["JW:G", 6],
		description : desc([
			"When I attack, I can specify a weak point on a creature as the target of my attack",
			"I then subtract a flair die from my attack roll against that creature",
			"On a hit, the attack deals extra damage equal to twice the flair die result",
			"The target then makes a Dexterity save, suffering an effect on a failure:",
			" \u2022 The target's speed is reduced by half",
			" \u2022 The target makes melee weapon attacks with disadvantage",
			" \u2022 The target suffers 1d4 necrotic damage at the start of each of its turns",
			"These effects end if the target gains HP or uses its action to make a Con save"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 6; }
	},
	constricting_tangle : {
		name : "Constricting Tangle Flourish",
		source : ["JW:G", 6],
		description : desc([
			"When a creature attempts to escape from my net, I can use my reaction to make it harder",
			"I add a flair die to the net's escape DC"
		]),
		action : [["reaction", " (net escape)"]],
		prereqeval : function(v) { return (/retiarius/).test(classes.known.gladiator.subclass); }
	},
	dance_of_blades : {
		name : "Dance of Blades Flourish",
		source : ["JW:G", 6],
		description : desc([
			"I can add a flair die to a Performance or Intimidation check"
		])
	},
	disarming_strike : {
		name : "Disarming Strike Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after weapon hit; I add the flair die to my attack's damage",
			"Target makes a Dexterity save or drops a held object of my choice to its feet"
		])
	},
	distracting_performance : {
		name : "Distracting Performance Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after weapon hit; I add the flair die to my attack's damage",
			"The next attack of an ally before my next turn has adv. against the creature"
		])
	},
	enrapturing_attack : {
		name : "Enrapturing Attack Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after weapon hit; I add the flair die to my attack's damage",
			"A creature I can within 30 ft makes a Wis save; charmed by me on a failure",
			"While the creature is charmed, its speed is 0 and is incapacitated"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 6; }
	},
	ensnaring_strike : {
		name : "Ensnaring Strike Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use during attack action; I expend a flair die",
			"I can use an attack to tear a held item from an opponent's grasp with my net",
			"On a hit, the target and I make contested Str checks; I add the flair die to mine",
			"If I win, the item becomes entangled in my net; net becomes an improvised weapon",
			"I can use my action to remove the item from the net"
		]),
		weaponsAdd : ["Ensnared Object"],
		weaponOptions : {
			baseWeapon : "improvised weapon",
			regExpSearch : /ensnared object/i,
			name : "Ensnared Object",
			source : ["JW:G", 5],
			damage : [1, 6, "bludgeoning"],
			abilitytodamage : true,
			description : "Action to remove object"
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if((/ensnared object/i).test(v.WeaponText)) {
						fields.Proficiency = true;
					}
				},
				""
			]
		},
		action : [["action", " (with Attack action)"]],
		prereqeval : function(v) { return (/retiarius/).test(classes.known.gladiator.subclass); }
	},
	flurry_of_blades : {
		name : "Flurry of Blades Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after first weapon hit; attack with off-hand weapon; add the flair die to the damage"
		]),
		prereqeval : function(v) { return (/dimachaerus/).test(classes.known.gladiator.subclass); }
	},
	goading_attack : {
		name : "Goading Attack Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after weapon hit; I add a flair die to my attack's damage",
			"Target makes a Wis save or has disadv. vs. other targets until the end of my next turn"
		])
	},
	heroic_charge : {
		name : "Heroic Charge Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after a weapon attack; Ally within 30ft I can see gets temp HP equal to flair die",
			"The ally is also cannot become frightened until I take damage"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 6; }
	},
	hobbling_blow : {
		name : "Hobbling Blow Flourish",
		source : ["JW:G", 6],
		description : desc([
			"Use after a weapon attack; I add 2 flair die to my attack's damage",
			"The target makes a Con save or falls prone and has its speed reduced to half",
			"It cannot stand from prone unless it uses an action to make another Con save",
			"This effect ends if target regains HP; legless/prone immune targets unaffected"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 12; }
	},
	masterful_physique : {
		name : "Masterful Physique Flourish",
		source : ["JW:G", 7],
		description : desc([
			"I can add a flair die to an Athletics or Acrobatics check"
		])
	},
	menacing_attack : {
		name : "Menacing Attack Flourish",
		source : ["JW:G", 7],
		description : desc([
			"Use after a weapon attack; I add the flair die to my attack's damage",
			"Target makes a Wisdom save or is frightened of me until the end of my next turn"
		])
	},
	perilous_avoidance : {
		name : "Perilous Avoidance Flourish",
		source : ["JW:G", 7],
		description : desc([
			"As a reaction, I can add a flair die to a Strength, Dexterity, or Constitution save"
		]),
		action : ["reaction", " (1 flair die)"],
		prereqeval : function(v) { return (/secutor/).test(classes.known.gladiator.subclass); }
	},
	quick_defense : {
		name : "Quick Defense Flourish",
		source : ["JW:G", 7],
		description : desc([
			"As a reaction, I can add a flair die to my AC; lasts until start of my next turn"
		]),
		action : ["reaction", " (1 flair die)"],
		prereqeval : function(v) { return (/secutor/).test(classes.known.gladiator.subclass); }
	},
	shield_bash : {
		name : "Shield Bash Flourish",
		source : ["JW:G", 7],
		description : desc([
			"When missed in melee, I can use my reaction to bash the attacker with my shield",
			"The attacker takes a flair die bludgeoning damage; makes a Strength save",
			"On a failure, the creature falls prone"
		]),
		action : ["reaction", " (1 flair die)"],
		prereqeval : function(v) { return (/secutor/).test(classes.known.gladiator.subclass); }
	},
	spinning_strike : {
		name : "Spinning Strike Flourish",
		source : ["JW:G", 7],
		description : desc([
			"Use after first weapon hit; creatures within 5ft take the 2 flair dice weapon damage"
		]),
		prereqeval : function(v) { return (/dimachaerus/).test(classes.known.gladiator.subclass); }
	},
	stunning_display : {
		name : "Stunning Display Flourish",
		source : ["JW:G", 7],
		description : desc([
			"Use after weapon hit; I expend 2 flair die",
			"Each ally of the target I can see within 15ft makes a Wisdom save",
			"On a failure, a creature becomes stunned until its next turn"
		]),
		prereqeval : function(v) { return classes.known.gladiator.level >= 12; }
	},
	stylish_blow : {
		name : "Stylish Blow Flourish",
		source : ["JW:G", 7],
		description : desc([
			"Use after weapon hit; I can expend up to half my Gladiator level flair dice rounded up",
			"The weapon deals extra damage equal to the flair dice"
		])
	},
	sweeping_blow : {
		name : "Sweeping Blow Flourish",
		source : ["JW:G", 7],
		description : desc([
			"Use after slashing/bludgeoning weapon hit; I expend a flair die",
			"Up to two creatures within 5ft of the target take flair die damage",
			"The damage they take is the same as the original attack"
		])
	},
	vicious_parry : {
		name : "Vicious Parry Flourish",
		source : ["JW:G", 7],
		description : desc([
			"When hit in melee, I can use a reaction to parry and retalitate",
			"I make a weapon attack vs. the attacker, on a hit add flair die to the damage",
			"If the attack hits, the damage I take is reduced by the result of the flair die"
		]),
		action : ["reaction", " (when damaged in melee)"],
		prereqeval : function(v) { return (/dimachaerus/).test(classes.known.gladiator.subclass); }
	}
};

var ThraexAdditionalFlourishes = {
	artful_avoidance : GladiatorFlourishes.artful_avoidance,
	blinding_strike : {
		name : GladiatorFlourishes.blinding_strike.name,
		source : GladiatorFlourishes.blinding_strike.source,
		description : GladiatorFlourishes.blinding_strike.description,
		prereqeval : function(v) { return classes.known.gladiator.level >= 12; }
	},
	called_shot : GladiatorFlourishes.called_shot,
	constricting_tangle : {
		name : GladiatorFlourishes.constricting_tangle.name,
		source : GladiatorFlourishes.constricting_tangle.source,
		description : GladiatorFlourishes.constricting_tangle.description,
		action : GladiatorFlourishes.constricting_tangle.action
	},
	dance_of_blades : GladiatorFlourishes.dance_of_blades,
	disarming_strike : GladiatorFlourishes.disarming_strike,
	distracting_performance : GladiatorFlourishes.distracting_performance,
	enrapturing_attack : GladiatorFlourishes.enrapturing_attack,
	ensnaring_strike : {
		name : GladiatorFlourishes.ensnaring_strike.name,
		source : GladiatorFlourishes.ensnaring_strike.source,
		description : GladiatorFlourishes.ensnaring_strike.description,
		weaponsAdd : GladiatorFlourishes.ensnaring_strike.weaponsAdd,
		weaponOptions : GladiatorFlourishes.ensnaring_strike.weaponOptions,
		calcChanges : GladiatorFlourishes.ensnaring_strike.calcChanges,
		action : GladiatorFlourishes.ensnaring_strike.action
	},
	flurry_of_blades : {
		name : GladiatorFlourishes.flurry_of_blades.name,
		source : GladiatorFlourishes.flurry_of_blades.source,
		description : GladiatorFlourishes.flurry_of_blades.description
	},
	goading_attack : GladiatorFlourishes.goading_attack,
	heroic_charge : GladiatorFlourishes.heroic_charge,
	hobbling_blow : GladiatorFlourishes.hobbling_blow,
	masterful_physique : GladiatorFlourishes.masterful_physique,
	menacing_attack : GladiatorFlourishes.menacing_attack,
	perilous_avoidance : {
		name : GladiatorFlourishes.perilous_avoidance.name,
		source : GladiatorFlourishes.perilous_avoidance.source,
		description : GladiatorFlourishes.perilous_avoidance.description,
		action : GladiatorFlourishes.perilous_avoidance.action
	},
	quick_defense : {
		name : GladiatorFlourishes.quick_defense.name,
		source : GladiatorFlourishes.quick_defense.source,
		description : GladiatorFlourishes.quick_defense.description,
		action : GladiatorFlourishes.quick_defense.action
	},
	shield_bash : {
		name : GladiatorFlourishes.shield_bash.name,
		source : GladiatorFlourishes.shield_bash.source,
		description : GladiatorFlourishes.shield_bash.description,
		action : GladiatorFlourishes.shield_bash.action
	},
	spinning_strike : {
		name : GladiatorFlourishes.spinning_strike.name,
		source : GladiatorFlourishes.spinning_strike.source,
		description : GladiatorFlourishes.spinning_strike.description
	},
	stunning_display : GladiatorFlourishes.stunning_display,
	stylish_blow : GladiatorFlourishes.stylish_blow,
	sweeping_blow : GladiatorFlourishes.sweeping_blow,
	vicious_parry : {
		name : GladiatorFlourishes.vicious_parry.name,
		source : GladiatorFlourishes.vicious_parry.source,
		description : GladiatorFlourishes.vicious_parry.description,
		action : GladiatorFlourishes.vicious_parry.action
	}
};

ClassList.gladiator = {
	regExpSearch : /^.*?(gladiator|arena combatant).*$/i,
	name : "Gladiator",
	source : ["JW:G", 1],
	abilitySave : 6,
	primaryAbility : "Strength and Charisma",
	prereqs : "Charisma 13 and Strength 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6],
	saves : ["Cha", "Con"],
	skillstxt : {
		primary : "Choose three from Acrobatics, Animal Handling, Athletics, Intimidation, Medicine, Perception, Performance, or Persuasion",
		secondary : "Choose one from Acrobatics, Animal Handling, Athletics, Intimidation, Medicine, Perception, Performance, or Persuasion"
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Gladiator starting equipment:" +
		"\n \u2022 Chain shirt -or- scale mail;" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
		"\n \u2022 Two handaxes -or- two javelins;" +
		"\n \u2022 An explorer's pack -or- an entertainer's pack." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Martial Role", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	features : {
		"flair for the dramatic" : {
			name : "Flair for the Dramatic",
			source : ["JW:G", 1],
			minlevel : 1,
			description : desc([
				"I gain Charisma mod + half my Gladiator level of flair dice that fuel special Flourishes",
				"As a bonus action, I can add a flair die to my next weapon attack or damage roll",
				"I regain all flair dice when I finish a long rest"
			]),
			additional : ["d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12", "d12", "d12"],
			usagescalc : "event.value = Math.max(1, Number(What('Cha Mod')) + Math.floor(classes.known.gladiator.level/2));",
			recovery : "long rest",
			action : ["bonus action", " (1 flair die)"]
		},
		"flourishes" : {
			name : "Flourishes",
			additional : levels.map(function (n) {
				return n < 2 ? "" : (n < 4 ? 3 : n < 6 ? 4 : n < 8 ? 5 : n < 11 ? 6 : n < 14 ? 7 : n < 17 ? 8 : n < 20 ? 9 : 10) + " known; 1 Flourish per turn";
			}),
			source : ["JW:G", 1],
			minlevel : 2,
			description : desc([
				"Use the \"Choose Feature\" button above to add a Flourish to the third page"
			]),
			extraname : "Flourish",
			extraTimes : [0, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10],
			extrachoices : ["Artful Avoidance", "Blinding Strike (prereq: Retiarius, level 12 gladiator)", "Called Shot (prereq: level 6 gladiator)", "Constricting Tangle (prereq: Retiarius)", "Dance of Blades", "Disarming Strike", "Distracting Performance", "Enrapturing Attack (prereq: level 6 gladiator)", "Ensnaring Strike (prereq: Retiarius)", "Flurry of Blades (prereq: Dimachaerus)", "Goading Attack", "Heroic Charge (prereq: level 6 gladiator)", "Hobbling Blow (prereq: level 12 gladiator)", "Masterful Physique", "Menacing Attack", "Perilous Avoidance (prereq: Secutor)", "Quick Defense (prereq: Secutor)", "Shield Bash (prereq: Secutor)", "Spinning Strike (prereq: Dimachaerus)", "Stunning Display (prereq: level 12 gladiator)", "Stylish Blow", "Sweeping Blow", "Vicious Parry (prereq: Dimachaerus)"],
			"artful avoidance" : GladiatorFlourishes.artful_avoidance,
			"blinding strike (prereq: retiarius, level 12 gladiator)" : GladiatorFlourishes.blinding_strike,
			"called shot (prereq: level 6 gladiator)" : GladiatorFlourishes.called_shot,
			"constricting tangle (prereq: retiarius)" : GladiatorFlourishes.constricting_tangle,
			"dance of blades" : GladiatorFlourishes.dance_of_blades,
			"disarming strike" : GladiatorFlourishes.disarming_strike,
			"distracting performance" : GladiatorFlourishes.distracting_performance,
			"enrapturing attack (prereq: level 6 gladiator)" : GladiatorFlourishes.enrapturing_attack,
			"ensnaring strike (prereq: retiarius)" : GladiatorFlourishes.ensnaring_strike,
			"flurry of blades (prereq: dimachaerus)" : GladiatorFlourishes.flurry_of_blades,
			"goading attack" : GladiatorFlourishes.goading_attack,
			"heroic charge (prereq: level 6 gladiator)" : GladiatorFlourishes.heroic_charge,
			"hobbling blow (prereq: level 12 gladiator)" : GladiatorFlourishes.hobbling_blow,
			"masterful physique" : GladiatorFlourishes.masterful_physique,
			"menacing attack" : GladiatorFlourishes.menacing_attack,
			"perilous avoidance (prereq: secutor)" : GladiatorFlourishes.perilous_avoidance,
			"quick defense (prereq: secutor)" : GladiatorFlourishes.quick_defense,
			"shield bash (prereq: secutor)" : GladiatorFlourishes.shield_bash,
			"stunning display (prereq: level 12 gladiator)" : GladiatorFlourishes.stunning_display,
			"spinning strike (prereq: dimachaerus)" : GladiatorFlourishes.spinning_strike,
			"stylish blow" : GladiatorFlourishes.stylish_blow,
			"sweeping blow" : GladiatorFlourishes.sweeping_blow,
			"vicious parry (prereq: dimachaerus)" : GladiatorFlourishes.vicious_parry
		},
		"subclassfeature3" : {
			name : "Martial Role",
			source : ["JW:G", 2],
			minlevel : 3,
			description : desc([
				"Choose a Martial Role that suits your role in combat and put it in the \"Class\" field",
				"Choose either the Retiarius, Secutus, Dimachaerus, or Thraex"
			])
		},
		"eye-catching prowess" : {
			name : "Eye-Catching Prowess",
			source : ["JW:G", 2],
			minlevel : 6,
			description : desc([
				"When I make a Charisma ability check, I can add my Strength modifier to it"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"tireless performer" : {
			name : "Tireless Performer",
			source : ["JW:G", 2],
			minlevel : 9,
			description : desc([
				"After a short rest I regain flair die equal to half my maximum flair die, rounded up"
			])
		},
		"boisterous disposition" : {
			name : "Boisterous Disposition",
			source : ["JW:G", 2],
			minlevel : 13,
			additional : "Adv. vs. charmed/frightened",
			description : desc([
				"As a bonus action, I can end a charmed/frightened effect on myself; 1 flair die"
			]),
			savetxt : {
				adv_vs : ["charmed", "frightened"]
			},
			action : ["bonus action", ""]
		},
		"hearty aplomb" : {
			name : "Hearty Aplomb",
			source : ["JW:G", 2],
			minlevel : 17,
			description : desc([
				"Whenever I roll any number of flair dice, I gain temporary HP equal to the total",
				"These temporary HP last for 10 minutes or until I take a short rest"
			])
		},
		"coup de grace" : {
			name : "Coup de Grace",
			source : ["JW:G", 2],
			minlevel : 18,
			description : desc([
				"When I hit a weakened creature with a weapon attack, I can make it a finishing blow",
				"The target must be at half HP or less and unconcious, paralyzed, or incapacitated",
				"It makes a Con save; reduced to 0 HP on a failure; 10d10 weapon damage on a success"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"enthralling victory" : {
			name : "Enthralling Victory",
			source : ["JW:G", 3],
			minlevel : 20,
			description : desc([
				"When I reduce a creature to 0 HP, each of its allies within 30 ft make a Wis save",
				"On a failure, they become my choice of frightened or charmed until end of my next turn"
			])
		}
	}
};

AddSubClass("gladiator", "retiarius", {
	regExpSearch : /(retiarius|net\s?caster|netter|net(-|\s)?fighter|net(-|\s)?fighter)/i,
	subname : "Retiarius",
	fullname : "Retiarius",
	source : ["JW:G", 3],
	features : {
		"subclassfeature3" : {
			name : "Netcaster",
			source : ["JW:G", 3],
			minlevel : 3,
			additional : "Net range 10/30; escape DC 12; No disadv. in melee",
			description : desc([
				"I can repair a net in 1 hour with proper materials; create one during a long rest",
				"I can add my Strength modifier to net attacks instead of Dexterity"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if(v.baseWeaponName == 'net')
						{
							fields.Description = fields.Description.replace('(PHB 148)', '');
							fields.Description += (fields.Description ? '; ' : '') + 'escape DC 12; no disadv. in melee';
							fields.Range = '10/30 ft';
							fields.Mod = v.StrDex;
						}
					},
					"I can use my Strength modifier for attacks made with nets instead of Dexterity. Attacks made with nets in melee are not made at disadvantage. The DC to escape from my nets is 12."
				]
			}
		},
		"subclassfeature7" : {
			name : "Ensnaring Fighter",
			source : ["JW:G", 3],
			minlevel : 7,
			description : desc([
				"As a bonus action, I can make a weapon attack against a restrained creature within 5 ft",
				"I must restrain it with a net on my turn or start my turn next to it"
			]),
			action : ["bonus action", " (vs. restrained creature)"]
		},
		"subclassfeature10" : {
			name : "Weighted Net",
			source : ["JW:G", 3],
			minlevel : 10,
			additional : "Net escape DC 15; restrain up to Huge",
			description : desc([
				"Given access to proper materials, I enlarge and weight my net making it more effective",
				"When I hit a creature with this net it takes 1d6 + Str modifier bludgeoning damage"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if(v.baseWeaponName == 'net')
						{
							fields.Description = fields.Description.replace('escape DC 12', 'escape DC 15');
							fields.Description = fields.Description.replace('up to large', 'up to huge');
							fields.Description += (fields.Description ? '; ' : '') + '1d6 + Str mod bludgeoning damage';
						}
					},
					"My net is larger and heavier, making it more effective. My net now has an escape DC of 15, can restrain creatures huge or smaller, and deals 1d6 + Strength modifier damage on a hit."
				]
			}
		},
		"subclassfeature15" : {
			name : "Tripping Toss",
			source : ["JW:G", 3],
			minlevel : 15,
			description : desc([
				"As a reaction, I can throw my net at a creature within 10 ft that starts to move",
				"The creature makes a Dex save; on a failure speed is 0, restrained, and falls prone",
				"On a success, the net remains in the area; 5 ft area is difficult terrain",
				"Creatures passing over the net make a Dex save; on a failure restrained and falls prone"
			]),
			action : ["reaction", ""]
		}
	}
});

AddSubClass("gladiator", "dimachaerus", {
	regExpSearch : /(dimachaerus|dual wielder)/i,
	subname : "Dimachaerus",
	fullname : "Dimachaerus",
	source : ["JW:G", 3],
	features : {
		"subclassfeature3" : {
			name : "Doubly Armed",
			source : ["JW:G", 3],
			minlevel : 3,
			description : desc([
				"I can dual wield even when the one-handed melee weapons I'm wielding aren't light",
				"I can draw/stow two one-handed weapons instead of drawing/stowing only one",
				"When dual wielding, I can add my ability modifier to the damage of off-hand attacks",
				"When I hit with an off-hand attack, I can add a flair die to the damage roll"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isOffHand) output.modToDmg = true;
					},
					"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
				]
			},
			action : ["bonus action", " (with off-hand attack)"]
		},
		"subclassfeature7" : {
			name : "Vicious Bladework",
			source : ["JW:G", 3],
			minlevel : 7,
			additional : "Cannot be flanked",
			description : desc([
				"While dual wielding, I have advantage on my off-hand attacks when:",
				" \u2022 More than one enemy is within 5 ft of me and",
				" \u2022 I have not yet damaged the target of the attack during my turn"
			])
		},
		"subclassfeature10" : {
			name : "Dextrous Parries",
			source : ["JW:G", 3],
			minlevel : 10,
			description : desc([
				"When more than one enemy is within 5ft of me, gain +1 AC for each beyond the first",
				"When more than one enemy is within 5ft of me, I can Disengage as a bonus action"
			]),
			action : ["bonus action", " (two or more melee enemies)"]
		},
		"subclassfeature15" : {
			name : "Whirling Strikes",
			source : ["JW:G", 3],
			minlevel : 15,
			description : desc([
				"When I reduce a creature to 0 HP, I can use a bonus action to continue attacking",
				"I move up to half my speed toward an enemy and make two weapon attacks against it"
			]),
			action : ["bonus action", " (after creature reduced to 0 HP)"]
		}
	}
});

AddSubClass("gladiator", "thraex", {
	regExpSearch : /thraex/i,
	subname : "Thraex",
	fullname : "Thraex",
	source : ["JW:G", 3],
	features : {
		"subclassfeature3" : {
			name : "Additional Flourish",
			additional : levels.map(function (n) {
				return n < 2 ? "" : ((n < 7 ? 1 : n < 15 ? 2 : 3) + " additional");
			}),
			source : ["JW:G", 3],
			minlevel : 3,
			description : desc([
				"Use the \"Choose Feature\" button above to add an additional Flourish to the third page"
			]),
			extraname : "Additional Flourish",
			extraTimes : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
			extrachoices : ["Artful Avoidance", "Blinding Strike (prereq: level 12 gladiator)", "Called Shot (prereq: level 6 gladiator)", "Constricting Tangle", "Dance of Blades", "Disarming Strike", "Distracting Performance", "Enrapturing Attack (prereq: level 6 gladiator)", "Ensnaring Strike", "Flurry of Blades", "Goading Attack", "Heroic Charge (prereq: level 6 gladiator)", "Hobbling Blow (prereq: level 12 gladiator)", "Masterful Physique", "Menacing Attack", "Perilous Avoidance", "Quick Defense", "Shield Bash", "Spinning Strike", "Stunning Display (prereq: level 12 gladiator)", "Stylish Blow", "Sweeping Blow", "Vicious Parry"],
			"artful avoidance" : ThraexAdditionalFlourishes.artful_avoidance,
			"blinding strike (prereq: level 12 gladiator)" : ThraexAdditionalFlourishes.blinding_strike,
			"called shot (prereq: level 6 gladiator)" : ThraexAdditionalFlourishes.called_shot,
			"constricting tangle" : ThraexAdditionalFlourishes.constricting_tangle,
			"dance of blades" : ThraexAdditionalFlourishes.dance_of_blades,
			"disarming strike" : ThraexAdditionalFlourishes.disarming_strike,
			"distracting performance" : ThraexAdditionalFlourishes.distracting_performance,
			"enrapturing attack (prereq: level 6 gladiator)" : ThraexAdditionalFlourishes.enrapturing_attack,
			"ensnaring strike" : ThraexAdditionalFlourishes.ensnaring_strike,
			"flurry of blades" : ThraexAdditionalFlourishes.flurry_of_blades,
			"goading attack" : ThraexAdditionalFlourishes.goading_attack,
			"heroic charge (prereq: level 6 gladiator)" : ThraexAdditionalFlourishes.heroic_charge,
			"hobbling blow (prereq: level 12 gladiator)" : ThraexAdditionalFlourishes.hobbling_blow,
			"masterful physique" : ThraexAdditionalFlourishes.masterful_physique,
			"menacing attack" : ThraexAdditionalFlourishes.menacing_attack,
			"perilous avoidance" : ThraexAdditionalFlourishes.perilous_avoidance,
			"quick defense" : ThraexAdditionalFlourishes.quick_defense,
			"shield bash" : ThraexAdditionalFlourishes.shield_bash,
			"stunning display (prereq: level 12 gladiator)" : ThraexAdditionalFlourishes.stunning_display,
			"spinning strike" : ThraexAdditionalFlourishes.spinning_strike,
			"stylish blow" : ThraexAdditionalFlourishes.stylish_blow,
			"sweeping blow" : ThraexAdditionalFlourishes.sweeping_blow,
			"vicious parry" : ThraexAdditionalFlourishes.vicious_parry
		},
		"subclassfeature7" : {
			name : "Cunning Instincts",
			source : ["JW:G", 4],
			minlevel : 7,
			description : desc([
				"I ignore difficult terrain for 10 minutes after rolling for iniative",
				"I cannot be surprised as long as I am not unconcious or incapacitated",
			])
		},
		"subclassfeature10" : {
			name : "Adaptive Expertise",
			source : ["JW:G", 4],
			minlevel : 10,
			description : desc([
				"After a long rest, I can choose one skill with which I am proficient",
				"Until my next long rest, the proficiency bonus for the chosen skill is doubled"
			])
		},
		"subclassfeature15" : {
			name : "Masterful Bladework",
			source : ["JW:G", 4],
			minlevel : 15,
			description : desc([
				"I can use my bonus action to apply a second Flourish to an attack",
			]),
			action : ["bonus action", ""]
		}
	}
});

AddSubClass("gladiator", "secutus", {
	regExpSearch : /secutus/i,
	subname : "Secutus",
	fullname : "Secutus",
	source : ["JW:G", 4],
	features : {
		"subclassfeature3" : {
			name : "Heavily Armored",
			source : ["JW:G", 4],
			minlevel : 3,
			description : desc([
			    "I gain proficiency with heavy armor",
				"I have adv. on Intimidation, Persuasion, and Performance checks while wearing heavy armor"
			]),
			armorProfs : [false, false, true, false]
		},
		"subclassfeature7" : {
			name : "Armored Mastery",
			source : ["JW:G", 4],
			minlevel : 7,
			description : desc([
				"When a creature I can see hits me with a piercing/slashing attack, I can soften the blow",
				"As a reaction, I gain resistance to my choice of piercing or slashing damage",
				"This lasts until the start of my next turn"
			]),
			action : ["reaction", " (hit by piercing/slashing)"]
		},
		"subclassfeature10" : {
			name : "Staunch Defense",
			source : ["JW:G", 4],
			minlevel : 10,
			description : desc([
				"I can make Strength saving throws in place of Dexterity saving throws"
			])
		},
		"subclassfeature15" : {
			name : "Impassable Defender",
			source : ["JW:G", 4],
			minlevel : 15,
			description : desc([
				"As a reaction, I can make a weapon attack vs. an enemy who moves within 5 ft of me",
				"If the attack hits, the target's speed is reduced to 0 until the start of its next turn"
			]),
			extraAC : {
				mod : 1,
				text : "I gain a +1 bonus to AC while wearing Heavy armor.",
				stopeval : function (v) { return !v.heavyArmor; }
			},
			action : ["reaction", ""]
		}
	}
});