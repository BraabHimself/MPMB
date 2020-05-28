/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    3rd-party compendium
	Effect:     
	Content:	
	Code by:	Newbuu2
	Date:		2020-04-27 (sheet v13)
*/

var iFileName = "OdysseyOfTheDragonlords_v13.js";

RequiredSheetVersion(13);

SourceList["OotD"] = {
	name : "Odyssey of the Dragonlords",
	abbreviation : "OotD",
	date : "2020/04/27",
	group : "Third Party Compendium",
	url : "https://www.kickstarter.com/projects/arcanumworlds/odyssey-of-the-dragonlords-5th-edition-adventure-b",
	defaultExcluded : true
};

//Races start
RaceList["thylean centaur"] = {
	source : ["OotD", 312],
	regExpSearch : /^((?=.*thylean?)(?=.*centaur)).*$/i,
	name : "Thylean Centaur",
	sortname : "Centaur, Thylean",
	plural : "Thylean Centaurs",
	scores : [2, 0, 0, 0, 1, 0],
	scorestxt : "+2 Strength and +1 Wisdom",
	age : " reach adulthood in their late teens and live less than 100 years",
	size : 3,
	height : " range from 6'6\" to 7 feet in height",
	weight : " weigh between 700 and 900 pounds",
	heightMetric : " range from 1,98 metres to 2,13 metres in height",
	weightMetric : " weigh between 317 and 408 kg",
	speed : {
		walk : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Sylvan"],
	features : {
		"mountable" : {
			name : "Mountable",
			minlevel : 1,
			action : ["bonus action", ""]
		}
	},
	trait : "Thylean Centaur (+2 Strength +1 Wisdom)" + (typePF ? "\n" : " ") +
		"Charge: If I move 30 ft straight toward a target and then hit it with a melee attack on the same turn, the target takes an extra 1d6 damage from the first attack." + (typePF ? "\n" : " ") +
		"Mountable: As a bonus action, I can let a Medium bipedal ally within 5ft to ride on my back until the end of my turn at which point they dismount within 5ft. The rider is not considered mounted and does not provoke opportunity attacks." + (typePF ? "\n" : " ") +
		"Quadrapedal Stride: Climbing or maneuvering in tight spaces is considered difficult terrain.",
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon) {
					fields.Description += (fields.Description ? '; ' : '') + '+1d6 damage on first attack after Charging';
				}
			},
			"I do +1d6 damage on the first attack after moving 30ft straight toward a target."
		]
	}
};

RaceList["thylean medusa"] = {
	source : ["OotD", 313],
	regExpSearch : /^((?=.*thylean?)(?=.*medusa)).*$/i,
	name : "Thylean Medusa",
	sortname : "Medusa, Thylean",
	plural : "Thylean Medusae",
	scores : [0, 2, 0, 1, 0, 0],
	scorestxt : "+2 Dexterity and +1 Intelligence",
	age : " are not born - they are made. When a humanoid is afflicted by the curse of the medusa, they gradually transform into a snake-haired monstrosity. Once transformed they may live for a 1000 years",
	size : 3,
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	features : {
		"petrifying gaze" : {
			name : "Petrifying Gaze",
			minlevel : 5,
			action : ["action", ""]
		},
		"paralyze" : {
			name : "Paralyze (after Petrifying Gaze)",
			minlevel : 5,
			action : "bonus action"
		}
	},
	weaponOptions : {
		regExpSearch : /^((?=.*snake?)(?=.*hair)).*$/i,
		name : "Snake Hair",
		source : ["OotD", 314],
		ability : 2,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		abilitytodamage : true,
		description : "DC 12 Constitution save - failure poisoned until start of my next turn"
	},
	weaponsAdd : ["Snake Hair"],
	savetxt : {
		text : ["Adv. on saving throws against spells and abilities that inflict the poisoned condition."]
	},
	trait : "Thylean Medusa (+2 Dexterity +1 Intelligence)" + desc([
		"Cursed: I was turned into a Medusa by a curse, which can only be broken by a Wish spell. When broken, I revert to my original race.",
		"Snake Hair: I can make a melee weapon attack with my snake hair dealing 1d6 piercing damage. When hit, the target must succeed on a DC 12 Con saving throw or be poisoned until the start of my next turn.",
		"Petrifying Gaze: Starting at 5th level I can force a creature within 30ft that can see my eyes to make a Con saving throw. On a failure they're paralyzed until the end of their next turn. See Notes."
	]),
	toNotesPage : [{
		name : "Thylean Medusa Features",
		source : ["OotD", 314],
		popupName : "Thylean Medua Petrifying Gaze Feature",
		page3notes : true,
		note: "\n  \u2022 Petrifying Gaze (OotD 314) " + desc(["Starting at 5th level, you can use your action to force a creature within 30 feet that can see your eyes to make a DC 8 Constitution saving throw. On a failure, the creature is paralyzed until the end of its next turn. On your turn, you can use your bonus action to force the same creature to repeat this saving throw with disadvantage. Each time it fails, it is paralyzed again until the end of its next turn. When a creature is paralyzed in this way for the third time in a span of 10 minutes, it is instantly petrified.",
			"Starting at 10th level, the DC for this saving throw increases to 10. At 15th level, the DC increases to 12. At 20th level, the DC increases to 14."])
	}]
};

RaceList["thylean minotaur"] = {
	source : ["OotD", 315],
	regExpSearch : /^(?=.*thylean?)(?=.*(minotaur|bull\s*(wo)?man)).*$/i,
	name : "Thylean Minotaur",
	sortname : "Minotaur, Thylean",
	plural : "Thylean Minotaurs",
	scores : [2, 0, 1, 0, 0, 0],
	scorestxt : "+2 Strength and +1 Constitution",
	age : " reach adulthood in their late teens and live less than 100 years",
	size : 3,
	height : " range from 6 to 8 feet in height",
	weight : " weigh between 200 and 400 pounds",
	heightMetric : " range from 1,8 metres to 2,4 metres in height",
	weightMetric : " weigh between 90 and 181 kg",
	speed : {
		walk : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Abyssal"],
	vision : [["Darkvision", 60], ["Keen Snout", 0], ["Colorblind (gray/red)", 0], ["Adv. on rolls to solve maze-like puzzles", 0]],
	savetxt : {
		text : ["Automatically succeed on saving throws against the Maze and Hypnotic Pattern spells"]
	},
	trait : "Thylean Minotaur (+2 Strength +1 Constitution)" + desc([
		"Keen Snout: I have advantage on Wisdom (Perception) checks relying on smell. I can detect strong odors up to six miles away.",
		"Labyrinthine Vision: Advantage on rolls to solve maze-like puzzles.",
		"Cursed Transformation: At 5th level I can transform into a Bull using a bonus action. At 9th level I turn into a Dire Bull. Automatically triggered by prolonged exposure to bright reds.",
	]),
	features : {
		"cursed transformation" : {
			name : "Cursed Transformation",
			minlevel : 5,
			tooltip: " Cursed Transformation",
			action : ["bonus action", ""],
			usages: 1,
			recovery : "long rest"
		}
	}
};

RaceList["thylean aurae"] = {
	source : ["OotD", 317],
	regExpSearch : /^(?=.*thylean)((?=.*(constellation|breeze).*nymph)|(?=.*aurae)).*$/i,
	name : "Thylean Aurae",
	sortname : "Aurae, Thylean",
	plural : "Thylean Aurae",
	scores : [0, 0, 0, 0, 1, 2],
	scorestxt : "+2 Charisma and +1 Wisdom",
	age : " are born in cocoons where they remain for around 100 years before emerging. They can live for as long as a 1000 years.",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	skills : ["Persuasion"],
	languageProfs : ["Common", "Sylvan"],
	vision : [["Darkvision", 60], ["Adv. on Wisdom (Survival) checks when navigating by the stars", 0]],
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	trait : "Thylean Aurae (+2 Charisma +1 Wisdom)" + desc([
		"Enthralling Beauty: I am proficient in the Persuasion skill. I can cast the Charm Person spell once per short rest as a 1st-level spell.",
		"Aurae Ancestry: I have advantage on Wisdom (Survival) checks when navigating by the stars. Starting at level 3 I can cast Faerie Fire. Starting at level 7 I can cast Levitate. Both spells can be used once per short rest. Charisma is my spellcasting ability for these."
	]),
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Enthralling Beauty",
			limfeaname : "Charm Person",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enthralling Beauty",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			}
		},
		"faerie fire" : {
			name : "Aurae Ancestry (level 3)",
			limfeaname : "Faerie Fire",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Aurae Ancestry (level 3)",
				spells : ["faerie fire"],
				selection : ["faerie fire"],
				firstCol : 'oncesr'
			}
		},
		"levitate" : {
			name : "Aurae Ancestry (level 7)",
			limfeaname : "Levitate",
			minlevel : 7,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Aurae Ancestry (level 7)",
				spells : ["levitate"],
				selection : ["levitate"],
				firstCol : 'oncesr'
			}
		}
	}
};

RaceList["thylean dryad"] = {
	regExpSearch : /^(?=.*thylean)((?=.*(forest|tree).*nymph)|(?=.*dryad)).*$/i,
	name : "Thylean Dryad",
	sortname : "Dryad, Thylean",
	source : ["OotD", 317],
	plural : "Thylean Dryads",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	skills : ["Persuasion"],
	languageProfs : ["Common", "Sylvan"],
	vision : ["Adv. on Wisdom (Survival) checks in forested areas", 0],
	age : " are born in cocoons where they remain for around 100 years before emerging. They can live for as long as 1000 years.",
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Charisma and +1 Wisdom",
	scores : [0, 0, 0, 0, 1, 2],
	trait : "Thylean Dryad (+2 Charisma +1 Wisdom)" + desc([
		"Enthralling Beauty: I am proficient in the Persuasion skill. I can cast the Charm Person spell once per short rest as a 1st-level spell.",
		"Dryad Ancestry: I can speak to beasts and plants. I have advantage on Wisdom (Survival) checks in forested areas. Starting at level 3 I can cast Goodberry. Starting at level 7 I can cast Barkskin. Both spells can be used once per short rest. Charisma is my spellcasting ability for these."
	]),
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Enthralling Beauty",
			limfeaname : "Charm Person",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enthralling Beauty",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			}
		},
		"goodberry" : {
			name : "Dryad Ancestry (level 3)",
			limfeaname : "Goodberry",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Dryad Ancestry (level 3)",
				spells : ["goodberry"],
				selection : ["goodberry"],
				firstCol : 'oncesr'
			}
		},
		"barkskin" : {
			name : "Dryad Ancestry (level 7)",
			limfeaname : "Barkskin",
			minlevel : 7,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Dryad Ancestry (level 7)",
				spells : ["barkskin"],
				selection : ["barkskin"],
				firstCol : 'oncesr'
			}
		}
	}
};

RaceList["thylean naiad"] = {
	regExpSearch : /^(?=.*thylean)((?=.*(river|lake).*nymph)|(?=.*naiad)).*$/i,
	name : "Thylean Naiad",
	sortname : "Naiad, Thylean",
	source : ["OotD", 317],
	plural : "Thylean Naiads",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		swim : { spd : 40, enc : 30 }
	},
	skills : ["Persuasion"],
	languageProfs : ["Common", "Sylvan"],
	age : " are born in cocoons where they remain for around 100 years before emerging. They can live for as long as 1000 years.",
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Charisma and +1 Wisdom",
	scores : [0, 0, 0, 0, 1, 2],
	trait : "Thylean Naiad (+2 Charisma +1 Wisdom)" + desc([
		"Enthralling Beauty: I am proficient in the Persuasion skill. I can cast the Charm Person spell once per short rest as a 1st-level spell.",
		"Naiad Ancestry: I can hold my breath for an hour. Starting at level 3 I can cast Create or Destroy Water. Starting at level 7 I can cast Control Water. Both spells can be used once per short rest. Charisma is my spellcasting ability for these."
	]),
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Enthralling Beauty",
			limfeaname : "Charm Person (1 target)",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enthralling Beauty",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			},
			spellChanges : {
				"charm person" : {
					description : "1 humanoid, save or charmed; advantage on save if I or my allies are fighting it",
					changes : "Using Enthralling Beauty, I cast Charm Person as if I'm using a 1st-level spell slot, affecting 1 humanoid."
				}
			}
		},
		"create or destroy water" : {
			name : "Naiad Ancestry (level 3)",
			limfeaname : "Create or Destroy Water",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Naiad Ancestry (level 3)",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				firstCol : 'oncesr'
			}
		},
		"control water" : {
			name : "Naiad Ancestry (level 7)",
			limfeaname : "Control Water",
			minlevel : 7,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Naiad Ancestry (level 7)",
				spells : ["control water"],
				selection : ["control water"],
				firstCol : 'oncesr'
			}
		}
	}
};

RaceList["thylean nereid"] = {
	regExpSearch : /^(?=.*thylean)((?=.*(sea|ocean).*nymph)|(?=.*nereid)).*$/i,
	name : "Thylean Nereid",
	sortname : "Nereid, Thylean",
	source : ["OotD", 317],
	plural : "Thylean Nereids",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		swim : { spd : 40, enc : 30 }
	},
	skills : ["Persuasion"],
	languageProfs : ["Common", "Sylvan"],
	age : " are born in cocoons where they remain for around 100 years before emerging. They can live for as long as 1000 years.",
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Charisma and +1 Wisdom",
	scores : [0, 0, 0, 0, 1, 2],
	trait : "Thylean Nereid (+2 Charisma +1 Wisdom)" + desc([
		"Enthralling Beauty: I am proficient in the Persuasion skill. I can cast the Charm Person spell once per short rest as a 1st-level spell.",
		"Nereid Ancestry: I can breathe underwater. Starting at level 3 I can cast Fog Cloud. Starting at level 7 I can cast Water Walk. Both spells can be used once per short rest. Charisma is my spellcasting ability for these."
	]),
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Enthralling Beauty",
			limfeaname : "Charm Person",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enthralling Beauty",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			}
		},
		"fog cloud" : {
			name : "Nereid Ancestry (level 3)",
			limfeaname : "Fog Cloud",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Nereid Ancestry (level 3)",
				spells : ["fog cloud"],
				selection : ["fog cloud"],
				firstCol : 'oncesr'
			}
		},
		"water walk" : {
			name : "Nereid Ancestry (level 7)",
			limfeaname : "Water Walk",
			minlevel : 7,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Nereid Ancestry (level 7)",
				spells : ["water walk"],
				selection : ["water walk"],
				firstCol : 'oncesr'
			}
		}
	}
};

RaceList["thylean oread"] = {
	regExpSearch : /^(?=.*thylean)((?=.*(crag|mountain).*nymph)|(?=.*oread)).*$/i,
	name : "Thylean Oread",
	sortname : "Oread, Thylean",
	source : ["OotD", 317],
	plural : "Thylean Oreads",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	skills : ["Persuasion"],
	languageProfs : ["Common", "Sylvan"],
	vision : [["Darkvision", 60], ["Adv. on Wisdom (Survival) checks in steppes, rocky islands, and mountainous regions", 0]],
	age : " are born in cocoons where they remain for around 100 years before emerging. They can live for as long as 1000 years.",
	height : " range from barely 5 to well over 6 feet tall",
	weight : " weigh around 165 lbs",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Charisma and +1 Wisdom",
	scores : [0, 0, 0, 0, 1, 2],
	trait : "Thylean Oread (+2 Charisma +1 Wisdom)" + desc([
		"Enthralling Beauty: I am proficient in the Persuasion skill. I can cast the Charm Person spell once per short rest as a 1st-level spell.",
		"Oread Ancestry: Starting at level 3 I can cast Hunter's Mark. Starting at level 7 I can cast Misty Step. Both spells can be used once per short rest. Charisma is my spellcasting ability for these."
	]),
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Enthralling Beauty",
			limfeaname : "Charm Person",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enthralling Beauty",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			}
		},
		"hunter's mark" : {
			name : "Oread Ancestry (level 3)",
			limfeaname : "Hunter's Mark",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Oread Ancestry (level 3)",
				spells : ["hunter's mark"],
				selection : ["hunter's mark"],
				firstCol : 'oncesr'
			}
		},
		"misty step" : {
			name : "Oread Ancestry (level 7)",
			limfeaname : "Misty Step",
			minlevel : 7,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Oread Ancestry (level 7)",
				spells : ["misty step"],
				selection : ["misty step"],
				firstCol : 'oncesr'
			}
		}
	}
};

RaceList["thylean satyr"] = {
	regExpSearch : /^(?=.*thylean)((?=.*satyr)|(?=.*goat\s*(wo)?man)).*$/i,
	name : "Thylean Satyr",
	sortname : "Satyr, Thylean",
	source : ["OotD", 319],
	plural : "Thylean Satyrs",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	savetxt : {
		text : ["Magic can't put me to sleep"],
		adv_vs : ["charmed", "frightened"]
	},
	languageProfs : ["Common", "Sylvan"],
	toolProfs : [["Musical instrument", 1]],
	age : " mature quickly, reaching adulthood by their early teens. They can live for several centuries.",
	height : " range from 4 to 5 feet tall",
	weight : " weigh between 100 and 150 lbs",
	heightMetric : " range from 1,2 to 1,5 metres tall",
	weightMetric : " weigh between 45 and 68 kg",
	scorestxt : "+2 Dexterity and +1 Charisma",
	scores : [0, 2, 0, 0, 0, 1],
	trait : "Thylean Satyr (+2 Dexterity +1 Charisma)" + desc([
		"Memory for Music: I am proficient with an instrument of my choice and I have adv. on Performance checks made with it. I can also memorize and perform any song after hearing it only once.",
		"Enchanting Music: Starting at level 3 I can cast Sleep. Starting at level 7 I can cast Suggestion. Both spells can be used once per long rest. I can cast Minor Illusion. Charisma is my spellcasting ability for these and require an instrument with which I am proficient."
	]),
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Enchanting Music (level 1)",
		spells : ["minor illusion"],
		selection : ["minor illusion"],
		firstCol : 'atwill'
	},
	features : {
		"sleep" : {
			name : "Enchanting Music (Level 3)",
			limfeaname : "Sleep",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Enchanting Music (Level 3)",
				spells : ["sleep"],
				selection : ["sleep"],
				firstCol : 'oncelr'
			}
		},
		"suggestion" : {
			name : "Enchanting Music (Level 5)",
			limfeaname : "Suggestion",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Enchanting Music (Level 5)",
				spells : ["suggestion"],
				selection : ["suggestion"],
				firstCol : 'oncelr'
			}
		}
	}
};

RaceList["thylean siren"] = {
	regExpSearch : /^(?=.*thylean)(?=.*siren).*$/i,
	name : "Thylean Siren",
	sortname : "Siren, Thylean",
	source : ["OotD", 320],
	plural : "Thylean Sirens",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Celestial"],
	age : " reach adulthood in their late teens and live less than 500 years",
	height : " range from barely 5 to just under 6 feet tall and have a wingspan of around 6 ft",
	weight : " weigh around 165 lb",
	heightMetric : " range from barely 1,5 to just under 1,8 metres tall and have a wingspan of around 1,8 metres",
	weightMetric : " weigh around 75 kg",
	scorestxt : "+2 Charisma and +1 Dexterity",
	scores : [0, 1, 0, 0, 0, 2],
	trait : "Thylean Siren (+2 Charisma +1 Dexterity)" + (typePF ? "\n" : " ") +
		"Enthralling Voice: I have adv. on Performance and Persuasion checks that rely on my voice. I can also hold my breath for 1 hour. " +
		"Wavering Emotion: After a short or long rest I choose joyful or sad. If sad, I can't fly but gain Songs of Sorrow. If joyful, I can fly but lose Songs of Sorrow. " +
		"Flight: I can fly when joyful and not wearing medium or heavy armor. " +
		"Songs of Sorrow: 1st level: Charm Person; 3rd level: Enthrall; 5th level: Hold Person. These can be used once per short rest. Charisma is my spellcasting ability for these and require my targets to hear me.",
	spellcastingAbility : 6,
	features : {
		"charm person" : {
			name : "Songs of Sorrow (Level 1)",
			limfeaname : "Charm Person (1 target)",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Songs of Sorrow (Level 1)",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncesr'
			},
			spellChanges : {
				"charm person" : {
					description : "1 humanoid, save or charmed; advantage on save if I or my allies are fighting it",
					changes : "Using Songs of Sorrow, I cast Charm Person as if I'm using a 1st-level spell slot, affecting 1 humanoid. The target must be able to hear me."
				}
			}
		},
		"enthrall" : {
			name : "Songs of Sorrow (Level 3)",
			limfeaname : "Enthrall",
			minlevel : 3,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Songs of Sorrow (Level 3)",
				spells : ["enthrall"],
				selection : ["enthrall"],
				firstCol : 'oncesr'
			}
		},
		"hold person" : {
			name : "Songs of Sorrow (Level 5)",
			limfeaname : "Hold Person",
			minlevel : 5,
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Enchanting Music (Level 5)",
				spells : ["hold person"],
				selection : ["hold person"],
				firstCol : 'oncesr'
			}
		}
	}
};
//Races end

//Subclasses start
AddSubClass("barbarian", "herculean", {
	regExpSearch : /herculean/i,
	subname : "Herculean Path",
	fullname : "Herculean Path",
	source : [["OotD", 322]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Precocious Wrestler",
			source : [["OotD", 322]],
			minlevel : 3,
			description : desc([
				"I gain proficiency with the Athletics skill",
				"I can grapple creatures two sizes larger than me and can grapple as a bonus action",
				"While grappling, I can attack with a two-handed weapon with a single hand"
			]),
			skills : ["Athletics"],
			action : [["bonus action", "Grapple", "Grapple"]]
		},
		"subclassfeature6" : {
			name : "Mighty Marksman",
			source : [["OotD", 322]],
			minlevel : 6,
			description : desc([
				"Heavy weapons do not incur disadvantage due to my size",
				"I can use my Strength modifier instead of Dexterity for longbows",
				"I can add my rage damage to longbow and thrown weapon attacks"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && v.WeaponName == 'longbow' && fields.Mod == 2 && Number(What("Str")) > Number(What("Dex"))) {
							fields.Mod = 1;
						}
					},
					'I can use my Strength modifier instead of Dexterity for the attack and damage rolls for longbows.'
				],
				atkCalc : [
					function (fields, v, output) {
						if ((v.WeaponName == 'longbow' || (/\bthrown\b/i).test(v.WeaponText)) && classes.known.barbarian && classes.known.barbarian.level && (/\brage\b/i).test(v.WeaponText)) {
							output.extraDmg += classes.known.barbarian.level < 9 ? 2 : classes.known.barbarian.level < 16 ? 3 : 4;
						}
					},
					"If I include the word 'Rage' in a longbow or thrown weapon's name or description, the calculation will add my Rage's bonus damage to it."
				]
			}
		},
		"thunderous shot" : {
			name : "Thunderous Shot",
			source : [["OotD", 322]],
			minlevel : 6,
			additional : "DC 8 + Str mod + Prof",
			description : desc(["I can add Thunderwave to a ranged attack, centered on the landing point"]),
			usages : 1,
			recovery : "short rest",
			action : ["action", " (with Attack action)"]
		},
		"subclassfeature10" : {
			name : "Herculean Rage",
			source : [["OotD", 322]],
			minlevel : 10,
			description : desc([
				"At the start of my turn, if raging, rage damage +1, to a max of Strength modifier",
				"While raging I am immune to poison damage and cannot be frightened"
			]),
			savetxt : { immune : ["poison damage (raging)", "frightened (raging)"] }
		},
		"subclassfeature14" : {
			name : "Earthshaker",
			source : [["OotD", 322]],
			minlevel : 14,
			description : desc([
				"As an action, I can cause an earthquake with a radius of 40ft centered on me; see Notes"
			]),
			toNotesPage : [{
				name : "Earthshaker",
				source : ["OotD", 322],
				popupName : "Herculean Earthshaker",
				note: desc(["I can use an action to cause an earthquake with a 40ft radius centered on me",
					"The affected area becomes difficult terrain.",
					"Creatures on the ground in the area make a DC 8 + prof + Str Con save or lose concentration.",
					"At the end of my turn, creatures in the area make a DC 8 + prof + Str Dex save or are knocked prone.",
					"I have advantage on this save.",
					"At the start of subsequent turns I can use a bonus action to continue the earthquake, until the start of my next turn.",
					"I can continue the earthquake for a maximum of 1 minute"])
			}],
			action : [["action", "Earthshaker (start)"], ["bonus action", "Earthshaker (repeat)"]],
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("bard", "college of epic poetry", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*epic\spoetry).*$/i,
	subname : "College of Epic Poetry",
	source : ["OotD", 323],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	features : {
		"subclassfeature3" : {
			name : "Epic Verses",
			source : ["OotD", 323],
			minlevel : 3,
			description : desc([
				"I can add verses to my epic poem as a reaction when I witness major events:",
				"\u2022 Comedy: Someone rolls a 1 on an attack or saving throw",
				"\u2022 Hubris: Someone rolls a 20 on an attack or saving throw",
				"\u2022 Irony: Someone fails a save after using a Bardic Inspiration die",
				"\u2022 Tragedy: Someone is reduced to 0hp by an enemy",
				"\u2022 Some other significant event at the discretion of the DM"
			]),
			action : [["reaction", "Compose Epic Verse"]]
		},
		"subclassfeature3.1" : {
			name : "Inspirational Verses",
			source : ["OotD", 323],
			minlevel : 3,
			description : desc([
				"By adding verses to my epic poem, my Bardic Inspiration has additional effects",
				"See the \"Notes\" page for the table"
			]),
			toNotesPage : [{
				name : "Epic Poem Table",
				source : ["OotD", 323],
				popupName : "College of Epic Poetry's Bardic Inspiration Table",
				additional : "(OotD 323)",
				note : [
					"Required verse counts are based on party size",
					"Poem Rank\tVerse Count\t" + (typePF ? "" : "\t") + "Bardic Inspiration Effect",
					"1\t\t1\u00D7Party Size\tMin. value = 2",
					"2\t\t2\u00D7Party Size\tEpic Courage",
					"3\t\t3\u00D7Party Size\tMin. value = 3",
					"4\t\t4\u00D7Party Size\tEpic Foresight",
					"5\t\t5\u00D7Party Size\tMin. value = 4",
					"6\t\t6\u00D7Party Size\tEpic Determination",
					"7\t\t7\u00D7Party Size\tMin. value = 5",
					"8\t\t8\u00D7Party Size\tEpic Reflexes",
					"9\t\t9\u00D7Party Size\tMin. value = 6",
					"10\t\t10\u00D7Party Size\tEpic Resistance",
					"Improved Rolls: My Bardic Inspiration die have a minimum value based on the above table.",
					"Whenever someone rolls one of my Bardic Inspiration dice, if they roll less than the minimum value for your poem rank, then the result is equal to the minimum value as determined by your poem rank.",
					"Additional Effects: When I give someone Bardic Inspiration, I choose one of the effects that I have unlocked. They gain the benefit of this effect as long as they have my Bardic Inspiration die. The effect is lost when they roll the die.",
					"\u2022 Epic Courage: You gain advantage on saving throws against effects that would frighten you.",
					"\u2022 Epic Determination: You gain advantage on death saving throws.",
					"\u2022 Epic Determination: You gain advantage on death saving throws.",
					"\u2022 Epic Foresight: You cannot be surprised, and your passive Perception increases by +5.",
					"\u2022 Epic Reflexes: You gain advantage on saving throws against spells that affect multiple targets.",
					"\u2022 Epic Resistance: You gain resistance to one damage type (Bard’s choice)."
				]
			}]
		},
		"subclassfeature6" : {
			name : "Armored Poet",
			source : ["OotD", 324],
			minlevel : 6,
			description : desc([
				"I am proficient with medium armor",
				"When I compose a verse about an ally within 5ft, I regain 1 Bardic Inspiration die"
			]),
			armorProfs : [false, true, false, false]
		},
		"subclassfeature14" : {
			name : "Protective Epithets",
			source : ["OotD", 324],
			minlevel : 14,
			description : desc([
				"If someone with Bardic Inspiration drops to 0hp, they can roll the Bardic Inspiration die",
				"They are reduced to the rolled number of HP instead of 0; the die is lost"
			])
		}
	}
});

AddSubClass("cleric", "prophecy domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*prophecy).*$/i,
	subname : "Prophecy Domain",
	source : ["OotD", 324],
	spellcastingExtra : ["detect magic", "identify", "augury", "locate object", "beacon of hope", "clairvoyance", "death ward", "divination", "dream", "scrying"],
	features : {
		"subclassfeature1" : {
			name : "Mindful Senses",
			source : ["OotD", 324],
			minlevel : 1,
			description : desc([
				"I learn the Message cantrip if I don't already know it",
				"I gain proficiency in the Perception skill"
			]),
			spellcastingBonus : {
				name : "Mindful Senses",
				spells : ["message"],
				selection : ["message"]
			},
			skills : ["Perception"]
		},
		"subclassfeature1.1" : {
			name : "Blessing of Foresight",
			source : ["OotD", 324],
			minlevel : 1,
			description : desc([
				"When I cast a divination spell of 1st level or higher, I choose one creature I can see",
				"That creature gains temporary hit points equal to my Wisdom mod + cleric level"
			])
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Prophetic Trance",
			source :["OotD", 324],
			minlevel : 2,
			description : desc([
				"I can use an action to enter a trance-like state, which lasts 10 minutes",
				"I roll two d20s and keep the results; each result can only be used once",
				"A result can replace an attack/save/ability check made by me or a creature I can see",
				"I choose to switch them before the dice to be replaced are rolled",
				"I lose any unused results when the trance ends."
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Visions of Danger",
			source : ["OotD", 324],
			minlevel : 6,
			description : desc([
				"I can ready a spell that restores HP without requiring or breaking concentration",
				"When an ally takes damage/fails a save, I can move my speed as a reaction",
				"With that reaction I can also cast a beneficial spell that targets only that ally",
				"That spell must have a casting time of action, bonus action, or reaction"
			]),
			action : ["reaction", " (Movement)"],
			usages : 2,
			recovery : "short rest"
		},
		"subclassfeature8" : {
			name : "Healing Vapors",
			source : [["OotD", 324], ["OotD", 326]],
			minlevel : 8,
			description : desc([
				"I heal creatures my Wisdom mod more when I heal them with a 1st level spell or higher",
				"I can add Fog Cloud at the location of one of the healed creatures"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature17" : {
			name : "Perfect Foresight",
			source : ["OotD", 326],
			minlevel : 17,
			description : desc([
				"When I enter my trance I can choose the result of one dice, between 1 and 19",
				"During my trance I gain 60ft Darkvision and can see invisible things within 10ft"
			]),
			vision : [["Darkvision (trance)", 60], ["See Invisible (trance)", 10]]
		}
	}
});

AddSubClass("druid", "circle of sacrifice", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*sacrifice).*$/i,
	subname : "Circle of Sacrifice",
	source : ["OotD", 327],
	features : {
		"subclassfeature2" : {
			name : "Ritual of Sacrifice",
			source : ["OotD", 327],
			minlevel : 2,
			description : desc([
				"I learn the Produce Flame cantrip and I add my Wisdom modifier to the damage roll",
				"When I reduce a creature to 0hp I can choose to Immolate it",
				"Myself and allies within 60ft of the creature gain Bless for 1 min, no concentration"
			]),
			spellcastingBonus : {
				name : "Ritual of Sacrifice",
				spells : ["produce flame"],
				selection : ["produce flame"]
			},
			recovery : "short rest",
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.druid && classes.known.druid.level > 5 && v.isSpell && v.WeaponName == 'produce flame') {
							output.extraDmg += What('Wis Mod');
						}
					},
					"My produce flame cantrip has my Wisdom modifier added to its damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("druid") == -1 || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0 || spellKey !== "produce flame") return;

						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis", true);
					},
					"My produce flame cantrip has my Wisdom modifier added to its damage."
				]
			}
		},
		"subclassfeature6" : {
			name : "Ritual of Mistletoe",
			source : ["OotD", 327],
			minlevel : 6,
			description : desc([
				"I have sprigs of mistletoe represented by a number of d4s equal to my druid level",
				"They turn into d6s at 10th level and d8s at 14th level",
				"I can use a bonus action to expend one sprig for one of the following effects:",
				"\u2022 Divining Ritual - I cast Detect Magic without using a spell slot",
				"\u2022 Healing Ritual - I cast Cure Wounds at 1st-level without using a spell slot",
				"\u2022 Purification Ritual - I cast Purify Food and Drink without using a spell slot",
				"\u2022 Song of the Solstice - I cast Heroism at 1st-level without using a spell slot",
			]),
			usages : levels.map(function(n) {
				return n < 6 ? "" : n + "d" + (n < 10 ? 4 : n < 14 ? 6 : 8) + " per ";
			}),
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Keeper of the Law",
			source : ["OotD", 327],
			minlevel : 10,
			description : desc([
				"I can use a bonus action to mark a creature as a Sacrificial Offering for 1hr",
				"When an ally hits a marked creature I can use a reaction to roll 1 mistletoe die",
				"The rolled number is added as fire damage",
				"I can Immolate a marked creature when it is reduced to 0hp"
			]),
			action : [["bonus action", "Sacrificial Offering"], ["reaction", "Keeper of the Law (Fire damage)"]],
		},
		"subclassfeature14" : {
			name : "Astrological Wisdom",
			source : ["OotD", 327],
			minlevel : 14,
			description : desc([
				"I know the Teleportation Circle spell and always have it prepared",
				"I can spend 8hrs and 12k gp to make a permanent anchor for Teleportation Circle"
			]),
			spellcastingBonus : [{
				name : "Astrological Wisdom (Teleportation Circle)",
				spells : ["teleportation circle"],
				selection : ["teleportation circle"],
				firstCol : 'markedbox'
			}]
		}
	}
});

AddSubClass("fighter", "hoplite", {
	regExpSearch : /hoplite/i,
	subname : "Hoplite",
	source : ["OotD", 329],
	fullname : "Hoplite",
	features : {
		"subclassfeature3" : {
			name : "Phalanx (Shield Wall)",
			source : ["OotD", 329],
			minlevel : 3,
			description : desc([
				"As a bonus action I can give myself and allies who see or hear me +2 AC",
				"We only get this bonus if standing next to an ally with a shield",
				"Myself and allies also get an additional +1 AC each, if wielding shields"
			]),
			action : ["bonus action", ""],
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature7" : {
			name : "Spear Mastery",
			source : ["OotD", 329],
			minlevel : 7,
			description : desc([
				"My melee range with spears, tridents, and javelins is 10ft",
				"Their damage changes from d6 to a d8, and from d8 to a d10 when using two hands",
				"I can use a bonus action to attack with the butt end after attacking with them",
				"This attack uses the same ability as the primary attack and deals 1d4 bludgeon. dmg"
			]),
			weaponOptions : {
				regExpSearch : /^(?=.*(spear|trident|javelin))(?=.*butt)(?=.*end).*$/i,
				name : "Spear Butt End",
				source : ["OotD", 329],
				ability : 1,
				type : "spear butt end",
				damage : [1, 4, "bludgeoning"],
				range : "Melee",
				description : "As bonus action after attacking with a spear, trident, or javelin",
				abilitytodamage : true
			},
			weaponsAdd : ["Spear Butt End"],
			action : ['bonus action', 'Butt End Attack (after attack with spear)'],
			weaponProfs : [false, false, ["spear butt end"]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName == 'spear' || v.baseWeaponName == 'javelin' || v.baseWeaponName == 'trident') {
							fields.Damage_Die = fields.Damage_Die === '1d6' ? '1d8' : fields.Damage_Die;
							fields.Description = fields.Description.replace('versatile (1d8)', 'versatile (1d10)');
							fields.Description += (fields.Description ? ', ' : '') + "reach";
						}
					},
					"With a spear/javelin/trident, I get the following benefits:\n \u2022 melee range is 10ft;\n \u2022 The damage die increases to d8 (versatile d10)."
				]
			}
		},
		"subclassfeature10" : {
			name : "Disciplined Defense",
			source : ["OotD", 329],
			minlevel : 10,
			description : desc([
				"I can use a reaction to intercede when an ally I can see within 5ft is attacked",
				"I can add my proficiency bonus to my ally's AC, until the start of my next turn",
				"To do this I must be wielding a shield"
			])
		},
		"subclassfeature15" : {
			name : "Shield Buster",
			source : ["OotD", 329],
			minlevel : 15,
			description : desc([
				"I score a critical hit with my weapon attacks on a roll of 19 and 20",
				"When I score a critcal hit, I knock the target's shield 10ft away",
				"A target not wielding a shield instead takes an additional 1d6 damage"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && !v.CritChance && classes.known.fighter && classes.known.fighter.level > 14) {
							fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20, Additional 1d6 on crit if target has no shield';
							v.CritChance = 19;
						}
					},
					"My weapon attacks score a critical on a to hit roll of both 19 and 20."
				]
			}
		},
		"subclassfeature18" : {
			name : "Phalanx Wrecker",
			source : ["OotD", 329],
			minlevel : 18,
			description : desc([
				"I can forgo one attack during the Attack action",
				"If I do, I make melee attacks against any number of creatures within 5ft"
			])
		}
	}
});

AddSubClass("monk", "way of the shield", {
	regExpSearch : /^(?=.*shield)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of the Shield",
	source : ["OotD", 329],
	features : {
		"subclassfeature3" : {
			name : "Aresian Technique",
			source : ["OotD", 329],
			minlevel : 3,
			additional : "proficiency with shields",
			description : desc([
				"Using a shield does not affect Martial Arts, Unarmored Movement, or Unarmored Defense",
				"I can use my shield to catch and hold missiles with Deflect Missiles",
				"Opportunity attacks against me have disadvantage when I'm using a shield"
			]),
			armorProfs : [false, false, false, true]
		},
		"subclassfeature6" : {
			name : "Shield Dancer",
			source : ["OotD", 330],
			minlevel : 6,
			additional : "See third page notes",
			extraname : "Way of the Shield 6",
			"vaulting strike" : {
				name : "Vaulting Strike",
				source : ["OotD", 330],
				additional : "1 ki point",
				description : desc([
					"As a bonus action I can leap up to 15ft in any direction",
					"If using a shield, this leap does not provoke opportunity attacks",
					"If I Attack immediately after, I have advantage on the first attack and it crits on a 19 or 20"
				]),
				action : [["bonus action", ""]]
			},
			"counterattack" : {
				name : "Counterattack",
				source : ["OotD", 330],
				additional : "requires a shield",
				description : desc([
					"If missed with an opportunity attack, I can make a single melee weapon attack",
					"This attack does not interrupt my movement"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : "vaulting strike"
			}, {
				extrachoice : "counterattack"
			}]
		},
		"subclassfeature11" : {
			name : "Shell of the Dragon Turtle",
			source : ["OotD", 330],
			minlevel : 11,
			additional : "1 ki point; requires a shield",
			description : desc([
				"I can use a reaction, if hit, to gain +3 AC for the hit; lasts until start of my next turn"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature17" : {
			name : "Undaunted Spirit",
			source : ["OotD", 330],
			minlevel : 17,
			description : desc([
				"I have adv. on attacks vs. Huge or larger creatures, they can't frighten/paralyze me"
			])
		}
	}
});

// Add the artificer companion functions to the main paladin class object if the artificer is not defined
if (!ClassList.artificer) {
	ClassList.paladin.artificerCompFunc = {
		add : function (compName) {
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
			Value(prefix + 'Comp.Race', compName);
			var changeMsg = "The " + compName + " has been added to the companion page at page number " + (tDoc.getField(prefix + 'Comp.Race').page + 1);
			CurrentUpdates.types.push("notes");
			if (!CurrentUpdates.notesChanges) {
				CurrentUpdates.notesChanges = [changeMsg];
			} else {
				CurrentUpdates.notesChanges.push(changeMsg);
			}
			return prefix;
		},
		remove : function (compName) {
			var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
			if (!AScompA) return;
			compName = compName.toLowerCase();
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Race').toLowerCase().indexOf(compName) !== -1) {
					DoTemplate("AScomp", "Remove", AScompA[a], true);
				}
			}
		},
		find : function (compName) {
			var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
			var prefixes = [];
			if (!AScompA) return prefixes;
			compName = compName.toLowerCase();
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Race').toLowerCase().indexOf(compName) !== -1) prefixes.push(AScompA[a]);
			}
			return prefixes;
		}
	}
};

ClassList.paladin.paladinCompFunc = {
	update : function(paladinLevel, dragonType) {
		if(paladinLevel >= 15) {
			var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
			
			companionFunctions.remove(dragonType + ' dragon wyrmling');
			
			var youngDragonName = 'Young ' + dragonType + ' Dragon';
			var prefix          = false;
			var crea            = companionFunctions.find('young ' + dragonType + ' dragon');
			
			if(crea.length > 0) {
				prefix = crea[0];
			}
			else {
				prefix = companionFunctions.add(youngDragonName);
			}
			
			Value(prefix + "Comp.Use.Attack.perAction", 1);
			ReplaceString(prefix + "Comp.Use.Traits", "on Long Rest", false, "5-6", false);
			
			var youngDragonNote = "Young Dragon (Oath of the Dragonlord, OotD 333)" + desc([
				"I can use the " + youngDragonName + " as a mount",
				"While mounted, I gain its damage resistances/immunities, blindsight, darkvision, and passive perception"
			]);
			
			if(paladinLevel == 20) {
				Value(prefix + "Comp.Use.Attack.perAction", 3);
				
				ReplaceString(prefix + "Comp.Use.Traits", "5-6", false, "on Long Rest", false);
				
				youngDragonNote += "\nUnbreakable Bond (Oath of the Dragonlord, OotD 333)" + desc([
					"My " + youngDragonName + " can now use its Multiattack",
					"Its breath weapon now recharges as normal",
					"When it fails a saving throw, I can choose to have it succeed instead"
				]);
			}
			
			Value(prefix + 'Cnote.Left', youngDragonNote);
		}
	},
	capitalize : function(dragonType) {
		return dragonType.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
	}
};

AddSubClass("paladin", "oath of the dragonlord", {
	regExpSearch : /^(((?=.*dragon(lord)?)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))))).*$/i,
	subname : "Oath of the Dragonlord",
	source : ["OotD", 330],
	features : {
		"subclassfeature3" : {
			name : "Pseudodragon Familiar",
			additional : "See third page notes",
			source : ["OotD", 330],
			minlevel : 3,
			spellcastingExtra : ["hunter's mark", "find familiar", "gust of wind", "levitate", "fly", "haste", "freedom of movement", "stoneskin", "hold monster", "telepathic bond"],
			spellChanges : {
				"find familiar" : {
					description : "I summon a pseudodragon that can smell dragon eggs within 1 mile. Otherwise follows normal rules.",
					changes : "I can only summon a pseudodragon with the Find Familiar spell."
				}
			},
			extraname : "Oath of the Dragonlord 3",
			"pseudodragon familiar" : {
				name : "Pseudodragon Familiar",
				source : ["OotD", 330],
				description : desc([
					"My familiar's main purpose is to locate a dragon egg",
					"It can smell dragons eggs if they are within 1 mile",
					"If it hasn't found one by 6th level it spends 3d6 looking for one",
					"After which it with returns with a brass, bronze, copper, or silver egg (my choice)",
					"It will search for another egg if mine is not lost or destroyed deliberately",
					"If deliberately lost or destroyed it will not find another egg for me"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "pseudodragon familiar" }]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Dragon's Wrath",
			additional : "DC 14",
			source : ["OotD", 330],
			minlevel : 3,
			description : desc([
				"As an action I can make each creature of my choice within 60ft make a Wisdom save",
				"On a failure they are frightened for 1min; repeat saves at end of their turn to end it"
				]),
			action : ["action", ""]
		},
		"subclassfeature3.2" : {
			name : "Channel Divinity: Scorn the Unworthy",
			source : ["OotD", 330],
			minlevel : 3,
			description : desc([
				"As an action I can make Large and smaller enemies within 30ft make a Charisma save",
				"On a failure, they are knocked prone and lose concentration"
			]),
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Dragonlord's Bond",
			source : ["OotD", 333],
			minlevel : 7,
			description : desc([
				"I can cast Bond of the Dragonlords without requiring material components",
				"I can cast Dirge of the Dragonlords without requiring material components"
			]),
			spellChanges : {
				"bond of the dragonlords" : {
					compMaterial : "",
					changes : "Using Dragonlord's Bond, I can cast Bond of the Dragonlords without requiring material components."
				},
				"dirge of the dragonlords" : {
					compMaterial : "",
					changes : "Using Dragonlord's Bond, I can cast Dirge of the Dragonlords without requiring material components."
				}
			}
		},
		"subclassfeature7.1" : {
			name : "Dragon Type",
			source : ["OotD", 333],
			minlevel : 7,
			description : desc([
				"My dragon egg hatches; See third page notes"
			]),
			choices : ["Brass", "Bronze", "Copper", "Silver"],
			"brass" : {
				name : "Brass Dragon",
				description : desc(["My dragon egg hatches into a Brass Dragon Wyrmling; See third page notes"]),
				eval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.add("Brass Dragon Wyrmling");
				},
				removeeval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.remove("Brass Dragon Wyrmling");
					companionFunctions.remove("Young Brass Dragon");
				}
			},
			"bronze" : {
				name : "Bronze Dragon",
				description : desc(["My dragon egg hatches into a Bronze Dragon Wyrmling; See third page notes"]),
				eval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.add("Bronze Dragon Wyrmling");
				},
				removeeval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.remove("Bronze Dragon Wyrmling");
					companionFunctions.remove("Young Bronze Dragon");
				}
			},
			"copper" : {
				name : "Copper Dragon",
				description : desc(["My dragon egg hatches into a Copper Dragon Wyrmling; See third page notes"]),
				eval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.add("Copper Dragon Wyrmling");
				},
				removeeval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.remove("Copper Dragon Wyrmling");
					companionFunctions.remove("Young Copper Dragon");
				}
			},
			"silver" : {
				name : "Silver Dragon",
				description : desc(["My dragon egg hatches into a Silver Dragon Wyrmling; See third page notes"]),
				eval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.add("Silver Dragon Wyrmling");
				},
				removeeval : function () {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.remove("Silver Dragon Wyrmling");
					companionFunctions.remove("Young Silver Dragon");
				}
			},
			extraname : "Oath of the Dragonlord 7",
			"dragonlord's bond" : {
				name : "Dragonlord's Bond",
				source : ["OotD", 330],
				description : desc([
					"My dragon egg hatches into a wyrmling with HP equal to 40 + twice my Paladin level",
					"It also adds my proficiency bonus to its saving throws",
					"I must cast Bond of the Dragonlords within 24h of it hatching to bond with it",
					"If it hasn't found one by 6th level it spends 3d6 looking for one",
					"After which it with returns with a brass, bronze, copper, or silver egg (my choice)",
					"It will search for another egg if mine is not lost or destroyed deliberately",
					"If deliberately lost or destroyed it will not find another egg for me"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "dragonlord's bond" }]
		},
		"subclassfeature15" : {
			name : "Young Dragon",
			source : ["OotD", 333],
			minlevel : 15,
			additional : "See third page notes",
			description : desc([
				"My wyrmling grows into a young dragon"
			]),
			extraname : "Oath of the Dragonlord 15",
			"young dragon" : {
				name : "Young Dragon",
				source : ["OotD", 333],
				description : desc([
					"My dragon egg grows into a young dragon and can be used as a mount",
					"While mounted on a dragon I gain its damage resistances and immunities",
					"I also gain its blindsight, darkvision, and passive perception if better than mine"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "young dragon" }],
			eval : function () {
				var dragonType = GetFeatureChoice("classes", "paladin", "subclassfeature7.1", false);
				
				if(dragonType) {
					ClassList.paladin.paladinCompFunc.update(15, ClassList.paladin.paladinCompFunc.capitalize(dragonType));
				}
			},
			removeeval : function () {
				var dragonType = GetFeatureChoice("classes", "paladin", "subclassfeature7.1", false);
				
				if(dragonType) {
					var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
					companionFunctions.remove('Young ' + dragonType + ' Dragon');
					companionFunctions.add(ClassList.paladin.paladinCompFunc.capitalize(dragonType) + ' Dragon Wyrmling');
				}
			}
		},
		"subclassfeature20" : {
			name : "Unbreakable Bond",
			source : ["OotD", 333],
			minlevel : 20,
			additional : "See third page notes",
			description : desc([
				"My dragon's attack and breath are no longer restricted by Bond of the Dragonlords"
			]),
			extraname : "Oath of the Dragonlord 20",
			"unbreakable bond" : {
				name : "Unbreakable Bond",
				source : ["OotD", 333],
				description : desc([
					"My dragon can now use its multiattack and its breath recharges normally",
					"If my dragon fails a save, I can choose for it to succeed; recharges after we long rest"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "unbreakable bond" }],
			eval : function () {
				var dragonType = GetFeatureChoice("classes", "paladin", "subclassfeature7.1", false);
				
				if(dragonType) {
					ClassList.paladin.paladinCompFunc.update(20, classes.paladin.paladinCompFunc.capitalize(dragonType));
				}
			},
			removeeval : function () {
				var dragonType = GetFeatureChoice("classes", "paladin", "subclassfeature7.1", false);
				
				if(dragonType) {
					ClassList.paladin.paladinCompFunc.update(classes.known.paladin.level, ClassList.paladin.paladinCompFunc.capitalize(dragonType));
				}
			}
		}
	}
});

ClassList.ranger.amazonCompFunc = {
	update : function(rangerLevel, profBonus) {
		var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
		var prefixes = companionFunctions.find('stimfay');
		
		if(prefixes.length > 0) {
			if(rangerLevel >= 11)
			{
				Value(prefixes[0] + 'Comp.Use.AC', 13 + profBonus);
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.1.Damage Die", "2d6");
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.2.Damage Die", "2d6");
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.3.Damage Die", "2d6");
			}
			else
			{
				Value(prefixes[0] + 'Comp.Use.AC', 13);
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.1.Damage Die", "1d6");
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.2.Damage Die", "1d6");
				Value(prefixes[0] + "BlueText.Comp.Use.Attack.3.Damage Die", "1d6");
			}
		}
	}
};

var chakramFeatureDesc = desc(["I can throw my chakram at targets that are not in my line of sight", "As an action I can throw my chakram at a target; on a hit it deals damage & ricochets", "My choice of others within 10 ft make a Dex" + (typePF ? "terity" : "") + " save vs spell DC or also take the damage"]);

var theAmazonianSubclass = {
	regExpSearch : /^(?=.*amazon(ian)?)(?=.*conclave).*$/i,
	subname : "Amazonian Conclave",
	source : ["OotD", 333],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Amazonian Magic",
			source : ["OotD", 333],
			minlevel : 3,
			description : desc([
				"I get bonus spells known, which do not count against the number of spells I can know"
			]),
			spellcastingExtra : ["command", "find steed", "haste", "confusion", "mislead"].concat(new Array(95)).concat("AddToKnown")
		},
		"subclassfeature3.1" : {
			name : "Stimfay Companion",
			source : ["OotD", 333],
			minlevel : 3,
			additional : "See \"Notes\" page",
			description : desc(["I construct a stimfay, a clockwork bird of prey, to aid me in battle; See \"Notes\" page"]),
			toNotesPage : [{
				name : "Stimfay Companion",
				source : ["OotD", 333],
				popupName : "Stimfay Companion",
				page3notes : false,
				note : desc(["I can order my stimfay to scout a 1 mile radius in 10 mins if there's open sky",
					"It understands any languages I speak; Only I understand its clicks and squaks",
					"It obeys my commands, acts on my initiative, and acts on its own if I am KOd",
					"It regains lost HP after a long rest; I can fully repair it in 8 hrs if destroyed"
				])
			}],
			eval : function () {
				var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
				companionFunctions.add("Stimfay");
				ClassList.ranger.amazonCompFunc.update(3, ProficiencyBonusList[classes.totallevel - 1]);
			},
			removeeval : function () {
				var companionFunctions = ClassList.artificer ? ClassList.artificer.artificerCompFunc : ClassList.paladin.artificerCompFunc;
				companionFunctions.remove("Stimfay");
			}
		},
		"subclassfeature3.2" : {
			name : "Amazonian Battlecry",
			source : ["OotD", 333],
			minlevel : 3,
			usages : "Wis" + (typePF ? "dom" : "") + " modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			description : desc(["I enter a frenzy by shouting a battlecry; See page 3"]),
			extraname : "Amazonian Conclave 3",
			"amazonian battlecry" : {
				name : "Amazonian Battlecry",
				source : ["OotD", 333],
				description : desc(["I can use a bonus action to gain the following benefits:",
					"\u2022 I have advantage on attacks against my favored enemies",
					"\u2022 I am resistant to bludgeoning, piercing, and slashing damage",
					"\u2022 I have advantage on saving throws against being frightened or paralyzed",
					"These benefits end after 1 min, I take damage, or I am knocked unconscious"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "amazonian battlecry" }],
			action : ["bonus action", ""],
			recovery : "long rest"
		},
		"subclassfeature5" : {
			name : "Bracer Reflection",
			source : ["OotD", 334],
			minlevel : 5,
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			description : desc([
				"When attacked, I can use a reaction to gain +5 AC until the start of my next turn"
			]),
			action : ["reaction", ""],
			recovery : "short rest"
		},
		"subclassfeature7" : {
			name : "Chakram Technique",
			source : ["OotD", 334],
			minlevel : 7,
			extraname : "Amazonian Conclave 7",
			description : chakramFeatureDesc,
			"chakram technique" : {
				name : "Chakram Technique",
				source : ["OotD", 334],
				description : chakramFeatureDesc
			},
			action : ["action", "Ricochet Chakram"]
		},
		"subclassfeature11" : {
			name : "Improved Falconry",
			source : ["OotD", 334],
			minlevel : 11,
			additional : "Stimfay improves; See \"Notes\"" + (typePF ? " page" : ""),
			action : ["reaction", "Stimfay Intercept"],
			toNotesPage : [{
				name : "Improved Falconry",
				source : ["OotD", 334],
				popupName : "Improved Falconry",
				page3notes : false,
				note : desc(["When damaged, I can use a reaction to have my stimfay intercept the damage",
					"It takes the damage instead; It must be functional, ready, and within 60 ft of me",
					"My stimfay gains more HP and AC and its attacks are magical",
					"The damage of Talons/Pinion Storm/Piercing Screech increases"
				]),
			}],
			eval : function () {
				ClassList.ranger.amazonCompFunc.update(11, ProficiencyBonusList[classes.totallevel - 1]);
			},
			removeeval : function (lvlA) {
				ClassList.ranger.amazonCompFunc.update(lvlA[1], ProficiencyBonusList[classes.totallevel - 1]);
			},
			changeeval : function(lvlA) {
				ClassList.ranger.amazonCompFunc.update(lvlA[1], ProficiencyBonusList[classes.totallevel - 1]);
			}
		},
		"subclassfeature15" : {
			name : "Pressure Points",
			source : ["OotD", 334],
			minlevel : 15,
			description : desc(["I can attack my opponents' pressure points, leaving them paralyzed; See page 3"]),
			extraname : "Amazonian Conclave 15",
			"pressure points" : {
				name : "Pressure Points",
				source : ["OotD", 334],
				description : desc(["I can use a bonus action to make a special melee attack against a creature",
					"On a hit, the creature makes a Constitution save vs. my spell DC",
					"On a failure, it is paralyzed for 1 min, repeating the save at the end of its turns to end",
					"I can use a bonus action and touch it to reverse the effect"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "pressure points" }],
			action : [["bonus action", ""], ["bonus action", "Reverse Pressure Point"]],
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "short rest"
		}
	}
};

AddSubClass("ranger", "amazonian conclave", theAmazonianSubclass);

if (ClassList["rangerua"]) { // add them to the Revised Ranger as well, if it is defined
	var theAmazonianConclaveSubclass = newObj(theAmazonianSubclass);
	theAmazonianConclaveSubclass.subname = "Amazonian Conclave";
	theAmazonianConclaveSubclass.regExpSearch = /^(?=.*amazon(ian)?)(?=.*conclave).*$/i;
	delete theAmazonianConclaveSubclass.fullname;

	var chakramTechExtra = {
		name : theAmazonianConclaveSubclass.features.subclassfeature7.name,
		source : theAmazonianConclaveSubclass.features.subclassfeature7.source,
		description : theAmazonianConclaveSubclass.features.subclassfeature7.description
	};
	
	theAmazonianConclaveSubclass.features.subclassfeature7.description            = "";
	theAmazonianConclaveSubclass.features.subclassfeature7.additional             = "See 3rd page";
	theAmazonianConclaveSubclass.features.subclassfeature7.autoSelectExtrachoices = [{ extrachoice : "chakram technique" }];
	
	AddSubClass("rangerua", "amazonian conclave", theAmazonianConclaveSubclass);
}

AddSubClass("rogue", "the odyssean", {
	regExpSearch : /^(?=.*the)?(?=.*odyssean).*$/i,
	subname : "The Odyssean",
	source : ["OotD", 335],
	features : {
		"subclassfeature3" : {
			name : "Vagrant Soldier",
			source : ["OotD", 335],
			minlevel : 3,
			description : desc([
				"I gain proficiency with shields",
				"Spears and tridents count as having finesse for me"
			]),
			armorProfs : [false, false, false, true],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((v.baseWeaponName == 'spear' || v.baseWeaponName == 'trident') && fields.Proficiency) {
							fields.Description = fields.Description.replace(/versatile/i, 'finesse, versatile ');
						}
					},
					"Spears and tridents count as having finesse for me."
				]
			}
		},
		"subclassfeature3.1" : {
			name : "Clever as the Gods",
			source : ["OotD", 335],
			minlevel : 3,
			description : desc([
				"As a bonus action, I choose a creature to trick",
				"The creature and I make contested Insight (Wis) and Deception checks, respectively",
				"If I win, me and my allies have adv. on attacks vs. the creature until my next turn starts",
				"I cannot use this on the same creature more than once per combat"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature9" : {
			name : "Notorious Trickster",
			source : ["OotD", 335],
			minlevel : 9,
			description : desc([
				"Creatures aware of me but can't see me can't make opportunity attacks",
				"When I Sneak Attack a creature, it has disadv. on the concentration saving throw"
			])
		},
		"subclassfeature13" : {
			name : "Tenacious Survivor",
			source : ["OotD", 335],
			minlevel : 13,
			description : desc([
				"I add my Charisma bonus to my initiative rolls",
				"At the start of my turn I can use a bonus action to regain HP equal to my rogue level"
			]),
			addMod : { type : "skill", field : "Init", mod : "max(Cha|0)", text : "I can add my Charisma modifier to initiative rolls." },
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature17" : {
			name : "Legendary Cunning",
			source : ["OotD", 335],
			minlevel : 17,
			description : desc([
				"When an ally makes an opportunity attack, I can also attack the same creature",
				"I can make a ranged attack with advantage against the creature"
			])
		}
	}
});

AddSubClass("sorcerer", "demigod", {
	regExpSearch : /demigod/i,
	subname : "Demigod",
	source : ["OotD", 335],
	fullname : "Demigod",
	features : {
		"subclassfeature1" : {
			name : "Godly Ancestor",
			source : ["OotD", 335],
			minlevel : 1,
			description : desc([
				"I can double my proficiency with Charisma checks when interacting with gods/celestials",
				"Choose a godly heritage using the \"Choose Feature\" button above",
				"I learn spells based on my godly heritage, which I can cast once per short rest"
			]),
			choices : ["Death", "Knowledge", "Life", "Nature", "Light", "Tempest", "Trickery", "War"],
			"death" : {
				name : "Godly Ancestor: Death Domain",
				description : desc([
					"I can cast Bane and Ray of Sickness once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["bane"],
					selection : ["bane"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["ray of sickness"],
					selection : ["ray of sickness"],
					firstCol : 'oncesr'
				}]
			},
			"knowledge" : {
				name : "Godly Ancestor: Knowledge Domain",
				description : desc([
					"I can cast Command and Guiding Bolt once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["command"],
					selection : ["command"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["guiding bolt"],
					selection : ["guiding bolt"],
					firstCol : 'oncesr'
				}]
			},
			"life" : {
				name : "Godly Ancestor: Life Domain",
				description : desc([
					"I can cast Cure Wounds and Bless once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["cure wounds"],
					selection : ["cure wounds"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["bless"],
					selection : ["bless"],
					firstCol : 'oncesr'
				}]
			},
			"nature" : {
				name : "Godly Ancestor: Nature Domain",
				description : desc([
					"I can cast Entangle and Healing Word once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["entangle"],
					selection : ["entangle"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["healing word"],
					selection : ["healing word"],
					firstCol : 'oncesr'
				}]
			},
			"light" : {
				name : "Godly Ancestor: Light Domain",
				description : desc([
					"I can cast Burning Hands and Faerie Fire once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["burning hands"],
					selection : ["burning hands"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["faerie fire"],
					selection : ["faerie fire"],
					firstCol : 'oncesr'
				}]
			},
			"tempest" : {
				name : "Godly Ancestor: Tempest Domain",
				description : desc([
					"I can cast Fog Cloud and Thunderwave once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["fog cloud"],
					selection : ["fog cloud"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["thunderwave"],
					selection : ["thunderwave"],
					firstCol : 'oncesr'
				}]
			},
			"trickery" : {
				name : "Godly Ancestor: Trickery Domain",
				description : desc([
					"I can cast Charm Person and Tasha's Hideous Laughter once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["charm person"],
					selection : ["charm person"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["tasha's hideous laughter"],
					selection : ["tasha's hideous laughter"],
					firstCol : 'oncesr'
				}]
			},
			"war" : {
				name : "Godly Ancestor: War Domain",
				description : desc([
					"I can cast Shield of Faith and Thunderous Smite once per short rest",
					"These do not count against the number spells I can know and require no spell slots"
				]),
				spellcastingBonus : [{
					name : "Godly Ancestor",
					spells : ["shield of faith"],
					selection : ["shield of faith"],
					firstCol : 'oncesr'
				}, {
					name : "Godly Ancestor",
					spells : ["thunderous smite"],
					selection : ["thunderous smite"],
					firstCol : 'oncesr'
				}]
			}
		},
		"subclassfeature1.1" : {
			name : "Inherited Strength",
			source : ["OotD", 336],
			minlevel : 1,
			description : desc([
				"I am proficient with Strength saving throws",
				"I can add Charisma to my melee attack and damage rolls instead of Strength"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && v.isMeleeWeapon && fields.Mod == 1 && Number(What("Cha")) > Number(What("Str"))) {
							fields.Mod = 6;
						}
					},
					'I can use my Charisma modifier instead of Strength for attack and damage rolls for melee weapons.'
				]
			},
			saves : ["Str"]
		},
		"subclassfeature6" : {
			name : "Empowered Magic",
			source : ["OotD", 336],
			minlevel : 6,
			description : desc([
				"When I cast a spell, I can spend 1 sorcery point to increase its level by 1",
				"I cannot increase a spell's level by more than 1"
			])
		},
		"subclassfeature14" : {
			name : "Divine Resistance",
			source : ["OotD", 336],
			minlevel : 14,
			description : desc([
				"When I fail a saving throw, I can choose to succeed instead"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Ascendant Sorcery",
			source : ["OotD", 336],
			minlevel : 18,
			description : desc([
				"I can increase the level of a spell by more than 1 use using Empowered Magic",
				"I must spend 1 sorcery point for each level I add to the spell"
			])
		}
	}
});

AddSubClass("warlock", "the fates", {
	regExpSearch : /^(?=.*warlock)(?=.*fates?).*$/i,
	subname : "the Fates",
	source : ["OotD", 336],
	spellcastingExtra : ["detect evil and good", "identify", "levitate", "see invisibility", "clairvoyance", "call lightning", "arcane eye", "divination", "planar binding", "geas"],
	features : {
		"subclassfeature1" : {
			name : "Fate's Bidding",
			source : ["OotD", 336],
			minlevel : 1,
			description : desc([
				"After a rest, I can cast a divination spell without expending a spell slot",
				"If I do, I gain temporary HP equal to my warlock level (min 1 HP)",
				"I must choose a spell I can normally cast and must have the necessary materials"
			])
		},
		"subclassfeature6" : {
			name : "Fate's Foretelling",
			source : ["OotD", 336],
			minlevel : 6,
			description : desc(["After a rest, I roll a d20 and keep the result to be used before my next rest",
				"A result can replace an attack/save/ability check made by me or a creature I can see",
				"I choose to switch them before the dice to be replaced are rolled"
			])
		},
		"subclassfeature10" : {
			name : "Fate's Demands",
			source : ["OotD", 336],
			minlevel : 10,
			description : desc([
				"When I reduce a creature to 0 HP, I regain one expended spell slot"
			]),
			usages : 2,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Inescapable Fate",
			source : ["OotD", 338],
			minlevel : 14,
			description : desc([
				"I can use an action to force a creature I can see to make a Wisdom save",
				"The creature has disadvantage on the save if it is unaware of me",
				"If it fails, I choose another creature I can see; the 1st moves towards the 2nd for 1 min",
				"The 1st creature must be within 5ft of the 2nd creature, at the start of its turn",
				"If it isn't, it takes 2d10 psychic damage and uses its turn to move towards the 2nd",
				"Ends if I or either creature is reduced to 0 HP or knocked unconscious"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

AddSubClass("wizard", "academy philosopher", {
	regExpSearch : /^(?=.*academy)?(?=.*philosopher).*$/i,
	subname : "Academy Philosopher",
	fullname : "Academy Philosopher",
	source : ["OotD", 338],
	features : {
		"subclassfeature2" :{
			name : "Philosophical School",
			source : ["OotD", 338],
			minlevel : 2,
			description : desc([
				"Choose a philosophical school using the \"Choose Feature\" button above",
				"I can choose another at 5th level if I first pick the Eclecticism school"
			]),
			additional : "See \"Notes\" page",
			extraname : "Philosophical School",
			extrachoices : ["Cynicism", "Eclecticism", "Empiricism", "Epicureanism", "Stoicism", "Sophism", "Hedonism", "Skepticism"],
			extraTimes : levels.map(function (n) { return n < 2 ? 0 : n < 5 ? 1 : 2; }),
			"cynicism" : {
				name : "Cynicism",
				source : ["OotD", 338],
				description : desc([
					"The gold and time required to copy spells into my spellbook is halved",
					"I can spend 10 mins to locate material spell components totalling no more than 50g"
				]),
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "cynicism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"eclecticism" : {
				name : "Eclecticism",
				source : ["OotD", 338],
				description : desc([
					"I learn a language of my choice",
					"At 5th level I can choose another philosophical school"
				]),
				languageProfs : [1],
				prereqeval : function(v) {
					var otherSchoolSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length > 0;

					return classes.known.wizard.level >= 2 && !otherSchoolSelected;
				}
			},
			"empiricism" : {
				name : "Empiricism",
				source : ["OotD", 338],
				description : desc([
					"I gain proficiency in the Perception skill",
					"I can cast Identify or Detect Magic once, without using a spell slot per rest"
				]),
				spellcastingBonus : [{
					name : "Philosophical School",
					spells : ["identify"],
					selection : ["identify"],
					firstCol : 'oncesr'
				}, {
					name : "Philosophical School",
					spells : ["detect magic"],
					selection : ["detect magic"],
					firstCol : 'oncesr'
				}],
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "empiricism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"epicureanism" : {
				name : "Epicureanism",
				source : ["OotD", 338],
				description : desc([
					"When attacked, I can use my reaction to impose disadvantage on the attack"
				]),
				action : ["reaction", ""],
				usages : "Intelligence modifier per ",
				recovery : "short rest",
				usagescalc : "event.value = Math.max(1, What('Int Mod'));",
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "epicureanism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"stoicism" : {
				name : "Stoicism",
				source : ["OotD", 338],
				description : desc([
					"When reduced to 0 HP, I can use a 1st-level spell slot or higher to be reduced to 1 HP"
				]),
				usages : 1,
				recovery : "short rest",
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "stoicism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"sophism" : {
				name : "Sophism",
				source : ["OotD", 338],
				description : desc([
					"I gain proficiency and expertise with the Persuasion skill",
					"I also gain the Friends cantrip"
				]),
				skills : [["Persuasion", "full"]],
				spellcastingBonus : {
					name : "Philosophical School",
					spells : ["friends"],
					selection : ["friends"],
					firstCol : 'atwill'
				},
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "sophism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"hedonism" : {
				name : "Hedonism",
				source : ["OotD", 338],
				description : desc([
					"When I gain HP from a spell/ability, I can add twice my wizard level to the HP restored"
				]),
				additional : levels.map(function (n) { return n * 2 + " HP"; }),
				usages : 1,
				recovery : "short rest",
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "hedonism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			},
			"skepticism" : {
				name : "Skepticism",
				source : ["OotD", 339],
				description : desc([
					"I have advantage on checks to detect visual illusions and saves imposed by them",
					"I have advantage on spells and effects that would charm me"
				]),
				vision : "Adv. to detect visual illusions",
				savetxt : {
					text : ["Adv. on saves from visual illusions"],
					adv_vs : ["charmed"]
				},
				prereqeval : function(v) {
					var eclecticismSelected = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).indexOf("eclecticism") >= 0;
					var thisSchool          = "skepticism";
					var schoolsSelected     = GetFeatureChoice("classes", "wizard", "subclassfeature2", true).length;
					
					return (classes.known.wizard.level >= 2 && schoolsSelected == 0) || (classes.known.wizard.level >= 5 && eclecticismSelected && schoolsSelected < 2);
				}
			}
		},
		"subclassfeature6" : {
			name : "Mathematical Principles",
			source : ["OotD", 339],
			minlevel : 6,
			description : desc([
				"When I cast a spell on creatures I see, I can protect Int modifier number of them",
				"The creatures automatically succeed on their saving throws vs. the spell",
				"They take no damage if they would normally take half damage on a successful save",
				"I can also increase/decrease the radius of a spell by 5 ft"
			])
		},
		"subclassfeature10" : {
			name : "Metaphysical Principles",
			source : ["OotD", 339],
			minlevel : 10,
			description : desc([
				"When a creature I see casts a spell with 1 target, I can change the target",
				"To do so I must use my reaction and pick a new legal target for the spell"
			]),
			recovery : "short rest",
			usages : 1,
			action : ["reaction", " (redirect spell)"]
		},
		"subclassfeature14" : {
			name : "Magical Paradox",
			source : ["OotD", 339],
			minlevel : 14,
			description : desc([
				"If I would lose concentration, I can choose to maintain concentration instead",
				"I can only do so if I am not incapacitated"
			]),
			usages : "Int modifier per ",
			recovery : "long rest",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));"
		}
	}
});
//Subclasses end

//Additional features / options start
AddFightingStyle(["fighter"], "Hoplite", {
	name : "Hoplite Fighting Style",
	source : ["OotD", 329],
	description : desc([
		"When an ally within 5ft of me is hit with a melee attack, I can counterattack",
		"I can use a reaction to make a melee opportunity attack against the attacker",
		"I can only do this while wielding a shield"
	]),
	action : ["reaction", "Hoplite Counterattack"]
});
//Additional features / options end

//Creatures start
CreatureList["bull"] = {
	name : "Bull",
	source : ["OotD", 316],
	size : 2,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 36,
	hd : [4, 10],
	speed : "40 ft",
	scores : [18, 10, 16, 4, 10, 9],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 4
	},
	senses : "Adv. on Wisdom (Perception) checks that rely on smell",
	passivePerception : 14,
	languages : "",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Horn",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}
	],
	traits : [{
			name : "Keen Smell",
			description : "The bull has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
		name : "Charge",
		description : "If the bull moves at least 20 ft straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 3 (1d6) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
	}]
};

CreatureList["dire bull"] = {
	name : "Dire Bull",
	source : ["OotD", 316],
	size : 2,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 12,
	hp : 46,
	hd : [5, 10],
	speed : "40 ft",
	scores : [18, 10, 16, 4, 10, 9],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 4
	},
	senses : "Adv. on Wisdom (Perception) checks that rely on smell",
	passivePerception : 14,
	languages : "",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Horn",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}
	],
	traits : [{
		name : "Keen Smell",
		description : "The dire bull has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
		name : "Charge",
		description : "If the dire bull moves at least 20 ft straight toward a target and hits it with a horn attack on the same turn, the target takes an extra 5 (1d10) piercing damage. If the target is a creature, it must succeed on a DC 14 Str saving throw or be knocked prone."
	}, {
		name : "Relentless (1/day)",
		description : "If the dire bull takes 10 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
	}],
	wildshapeString : "Keen Smell: advantage on Wis (Perception) checks that rely on smell| Relentless (1/day) If the dire bull takes 10 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead.| Charge: Horn attack deals an additional 1d10 damage after moving 20 ft straight towards a target. If it's a creature it must succeed on a DC 14 Strength saving throw or be knocked prone."
};

CreatureList["stimfay"] = {
	name : "Stimfay",
	source : ["OotD", 334],
	size : 5,
	type : "Construct",
	subtype : "",
	alignment : "Unaligned",
	ac : 13,
	hp : 21,
	hd : [6, 6],
	speed : "10 ft,\nfly 80 ft",
	scores : [10, 11, 10, 6, 8, 7],
	saves : ["", "", "", "", "", ""],
	skills : { "perception" : 3 },
	senses : "Darkvision 60 ft; Adv. on Wisdom (Perception) checks that rely on sight",
	damage_immunities : "fire, poison, psychic",
	passivePerception : 13,
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Talons",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			modifiers : [2, "", ""],
			description : "On a hit, the target cannot make opportunity attacks until start of its next turn"
		}, {
			name : "Pinion Storm",
			ability : 1,
			modifiers : [2, "", ""],
			damage : [1, 6, "piercing"],
			range : "60 ft"
		}, {
			name : "Piercing Screech",
			ability : 3,
			damage : [1, 6, "psychic"],
			range : "",
			description : "Con save; success \u2015 no dmg/effect; fail \u2015 deafened until start of stimfay's next turn",
			modifiers : [1, "", false],
			dc : true
	}],
	traits : [{
		name : "Immutable Form",
		description : "The stimfay is immune to any spell or effect that would alter its form."
	}, {
		name : "Automated Helper",
		description : "The stimfay can carry a single potion and administer it to any willing creature as an action. Additionally, the stimfay can use a bonus action to stabilize a dying creature that it can touch."
	}],
	eval : function(prefix) {
		var HPmaxFld = tDoc.getField(prefix + "Comp.Use.HP.Max");
		HPmaxFld.readonly = true;
		Hide(prefix + "Buttons.Comp.Use.HP.Max");
		
		// Set stimfay's HP and AC
		if(classes.known.ranger) {
			HPmaxFld.setAction('Calculate', 'event.value = (classes.known.ranger.level < 11 ? 15 : 30) + classes.known.ranger.level;');
		}
		else {
			HPmaxFld.setAction('Calculate', 'event.value = (classes.known.rangerua.level < 11 ? 15 : 30) + classes.known.rangerua.level;');
		}
		
		// Add ranger's proficiency to all attacks
        for (var atk = 1; atk <= 3; atk++) {
            AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + atk + '.To Hit Bonus', "oProf", false, "Stimfay Companion", "The stimfay adds the ranger's proficiency bonus (oProf) to the to hit bonus of its attacks.");
            AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + atk + '.Damage Bonus', "oProf", false, "Stimfay Companion", "The stimfay adds the ranger's proficiency bonus (oProf) to the damage of its attacks.");
        }
		
		// Add ranger's proficiency to all saves
		for (var save = 0; save < AbilityScores.abbreviations.length; save++) {
			AddToModFld(prefix + 'BlueText.Comp.Use.Ability.' + AbilityScores.abbreviations[save] + '.ST.Bonus', "oProf", false, "Stimfay Companion", "The stimfay adds the ranger's proficiency bonus (oProf) to its saving throws.");
		}
	},
	removeeval : function(prefix) {
		if (prefix) {
			var HPmaxFld = tDoc.getField(prefix + "Comp.Use.HP.Max");
			HPmaxFld.readonly = false;
			DontPrint(prefix + "Buttons.Comp.Use.HP.Max");
			
			HPmaxFld.setAction('Calculate', '1');
			
			for (var atk = 1; atk <= 3; atk++) {
				AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + atk + '.To Hit Bonus', "", false, "", "");
				AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + atk + '.Damage Bonus', "", false, "", "");
			}
			
			for (var save = 0; save < AbilityScores.abbreviations.length; save++) {
				AddToModFld(prefix + 'BlueText.Comp.Use.Ability.' + AbilityScores.abbreviations[save] + '.ST.Bonus', "", false, "", "");
			}
		}
	}
};

//Add dragons from Monster Manual for Oath of Dragonlord Paladin

var wyrmlingEval = function(prefix) {
	ReplaceString(prefix + "Comp.Use.Traits", "on Long Rest", false, "5-6", false);
	
	var HPmaxFld = tDoc.getField(prefix + "Comp.Use.HP.Max");
	HPmaxFld.readonly = true;
	Hide(prefix + "Buttons.Comp.Use.HP.Max");
	
	HPmaxFld.setAction('Calculate', 'event.value = 40 + (2 * classes.known.paladin.level);');
	
	// Add paladin's proficiency to all saves
	for (var save = 0; save < AbilityScores.abbreviations.length; save++) {
		AddToModFld(prefix + 'BlueText.Comp.Use.Ability.' + AbilityScores.abbreviations[save] + '.ST.Bonus', "oProf", false, "Dragonlord's Bond", "The dragon wyrmling adds the paladin's proficiency bonus (oProf) to its saving throws.");
	}
};

var wyrmlingRemoveEval = function(prefix) {
	Value(prefix + 'Comp.Type', "Companion");
	var HPmaxFld = tDoc.getField(prefix + "Comp.Use.HP.Max");
	HPmaxFld.readonly = false;
	DontPrint(prefix + "Buttons.Comp.Use.HP.Max");
	HPmaxFld.setAction("Calculate", "1");
	
	// Remove paladin's proficiency from all saves
	for (var save = 0; save < AbilityScores.abbreviations.length; save++) {
		AddToModFld(prefix + 'BlueText.Comp.Use.Ability.' + AbilityScores.abbreviations[save] + '.ST.Bonus', "", false, "");
	}
};

CreatureList["brass dragon wyrmling"] = {
	name : "Brass Dragon Wyrmling",
	source : ["M", 106],
	size : 3,
	type : "Dragon",
	subtype : "",
	alignment : "Chaotic Good",
	ac : 16,
	hp : 16,
	hd : [3, 6],
	speed : "30 ft,\nburrow 15 ft,\nfly 60 ft",
	scores : [15, 10, 13, 10, 11, 13],
	saves : ["", 2, 3, "", 2, 3],
	skills : {
		"perception" : 4,
		"stealth" : 2
	},
	damage_immunities : "fire",
	senses : "Blindsight 10 ft; Darkvision 60 ft",
	passivePerception : 14,
	languages : "Draconic",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Fire Breath",
		description : "The dragon exhales fire in a 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Sleep Breath",
		description : "The dragon exhales sleep gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
	}],
	eval : wyrmlingEval,
	removeeval : wyrmlingRemoveEval
};

CreatureList["bronze dragon wyrmling"] = {
	name : "Bronze Dragon Wyrmling",
	source : ["M", 109],
	size : 3,
	type : "Dragon",
	subtype : "",
	alignment : "Lawful Good",
	ac : 17,
	hp : 32,
	hd : [5, 8],
	speed : "30 ft,\nfly 60 ft,\nswim 30 ft",
	scores : [17, 10, 15, 12, 11, 15],
	saves : ["", 2, 4, "", 2, 4],
	skills : {
		"perception" : 4,
		"stealth" : 2
	},
	damage_immunities : "lightning",
	senses : "Blindsight 10 ft; Darkvision 60 ft",
	passivePerception : 14,
	languages : "Draconic",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)"
		}
	],
	traits : [{
		name : "Amphibious",
		description : "The dragon can breathe air and water."
	},{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Lightning Breath",
		description : "The dragon exhales lightning in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Repulsion Breath",
		description : "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 12 Strength saving throw. On a failed save, the creature is pushed 30 feet away from the dragon."
	}],
	eval : wyrmlingEval,
	removeeval : wyrmlingRemoveEval
};

CreatureList["copper dragon wyrmling"] = {
	name : "Copper Dragon Wyrmling",
	source : ["M", 111],
	size : 3,
	type : "Dragon",
	subtype : "",
	alignment : "Chaotic Good",
	ac : 16,
	hp : 22,
	hd : [4, 8],
	speed : "30 ft,\nclimb 30 ft,\nfly 60 ft",
	scores : [15, 12, 13, 14, 11, 13],
	saves : ["", 3, 3, "", 2, 3],
	skills : {
		"perception" : 4,
		"stealth" : 3
	},
	damage_immunities : "acid",
	senses : "Blindsight 10 ft; Darkvision 60 ft",
	passivePerception : 14,
	languages : "Draconic",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Acid Breath",
		description : "The dragon exhales acid in a 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Slowing Breath",
		description : "The dragon exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
	}],
	eval : wyrmlingEval,
	removeeval : wyrmlingRemoveEval
};

CreatureList["silver dragon wyrmling"] = {
	name : "Silver Dragon Wyrmling",
	source : ["M", 118],
	size : 3,
	type : "Dragon",
	subtype : "",
	alignment : "Lawful Good",
	ac : 17,
	hp : 45,
	hd : [6, 8],
	speed : "30 ft,\nfly 60 ft",
	scores : [19, 10, 17, 12, 11, 15],
	saves : ["", 2, 5, "", 2, 4],
	skills : {
		"perception" : 4,
		"stealth" : 2
	},
	damage_immunities : "cold",
	senses : "Blindsight 10 ft; Darkvision 60 ft",
	passivePerception : 14,
	languages : "Draconic",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Bite",
		ability : 1,
		damage : [1, 10, "piercing"],
		range : "Melee (5 ft)"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Cold Breath",
		description : "The dragon exhales an icy blast in a 15-foot cone. Each creature in that area must make a DC 13 Constitution saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Paralyzing Breath",
		description : "The dragon exhales paralyzing gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
	}],
	eval : wyrmlingEval,
	removeeval : wyrmlingRemoveEval
};

CreatureList["young brass dragon"] = {
	name : "Young Brass Dragon",
	source : ["M", 105],
	size : 2,
	type : "Dragon",
	subtype : "",
	alignment : "Chaotic Good",
	ac : 17,
	hp : 110,
	hd : [13, 10],
	speed : "40 ft,\nburrow 20 ft,\nfly 80 ft",
	scores : [19, 10, 17, 12, 11, 15],
	saves : ["", 3, 6, "", 3, 5],
	skills : {
		"perception" : 6,
		"persuasion" : 5,
		"stealth" : 3
	},
	damage_immunities : "fire",
	senses : "Blindsight 30 ft; Darkvision 120 ft",
	passivePerception : 16,
	languages : "Common, Draconic",
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 3,
	attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 10, "piercing"],
			range : "Melee (10 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}, {
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Fire Breath",
		description : "The dragon exhales fire in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 42 (12d6) fire damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Sleep Breath",
		description : "The dragon exhales sleep gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw or fall unconscious for 5 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it."
	}]
};

CreatureList["young bronze dragon"] = {
	name : "Young Bronze Dragon",
	source : ["M", 108],
	size : 2,
	type : "Dragon",
	subtype : "",
	alignment : "Lawful Good",
	ac : 18,
	hp : 142,
	hd : [15, 10],
	speed : "40 ft,\nfly 80 ft,\nswim 40 ft",
	scores : [21, 10, 19, 14, 13, 17],
	saves : ["", 3, 7, "", 4, 6],
	skills : {
		"insight" : 4,
		"perception" : 7,
		"stealth" : 3
	},
	damage_immunities : "lightning",
	senses : "Blindsight 30 ft; Darkvision 120 ft",
	passivePerception : 17,
	languages : "Common, Draconic",
	challengeRating : "8",
	proficiencyBonus : 3,
	attacksAction : 3,
	attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 10, "piercing"],
			range : "Melee (10 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}, {
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}
	],
	traits : [{
		name : "Amphibious",
		description : "The dragon can breathe air and water."
	},{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Lightning Breath",
		description : "The dragon exhales lightning in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 15 Dexterity saving throw, taking 55 (10d10) lightning damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Repulsion Breath",
		description : "The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 15 Strength saving throw. On a failed save, the creature is pushed 40 feet away from the dragon."
	}]
};

CreatureList["young copper dragon"] = {
	name : "Young Copper Dragon",
	source : ["M", 112],
	size : 2,
	type : "Dragon",
	subtype : "",
	alignment : "Chaotic Good",
	ac : 17,
	hp : 119,
	hd : [14, 10],
	speed : "40 ft,\nclimb 40 ft,\nfly 80 ft",
	scores : [19, 12, 17, 16, 13, 15],
	saves : ["", 4, 6, "", 4, 5],
	skills : {
		"deception" : 5,
		"perception" : 7,
		"stealth" : 4
	},
	damage_immunities : "acid",
	senses : "Blindsight 30 ft; Darkvision 120 ft",
	passivePerception : 17,
	languages : "Common, Draconic",
	challengeRating : "7",
	proficiencyBonus : 3,
	attacksAction : 3,
	attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 10, "piercing"],
			range : "Melee (10 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}, {
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Acid Breath",
		description : "The dragon exhales acid in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 14 Dexterity saving throw, taking 40 (9d8) acid damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Slowing Breath",
		description : "The dragon exhales gas in a 30-foot cone. Each creature in that area must succeed on a DC 14 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
	}]
};

CreatureList["young silver dragon"] = {
	name : "Young Silver Dragon",
	source : ["M", 118],
	size : 2,
	type : "Dragon",
	subtype : "",
	alignment : "Lawful Good",
	ac : 18,
	hp : 168,
	hd : [16, 10],
	speed : "40 ft,\nfly 80 ft",
	scores : [23, 10, 21, 14, 11, 19],
	saves : ["", 4, 9, "", 4, 8],
	skills : {
		"arcana" : 6,
		"history" : 6,
		"perception" : 8,
		"stealth" : 4
	},
	damage_immunities : "cold",
	senses : "Blindsight 30 ft; Darkvision 120 ft",
	passivePerception : 18,
	languages : "Common, Draconic",
	challengeRating : "9",
	proficiencyBonus : 4,
	attacksAction : 3,
	attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 10, "piercing"],
			range : "Melee (10 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}, {
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One bite and two claw attacks as an Attack action"
		}
	],
	traits : [{
		name : "Breath Weapons (Recharge 5-6)",
		description : "The dragon uses one of the following breath weapons."
	}, {
		name : "Cold Breath",
		description : "The dragon exhales an icy blast in a 30-foot cone. Each creature in that area must make a DC 17 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one."
	}, {
		name : "Paralyzing Breath",
		description : "The dragon exhales paralyzing gas in a 30-foot cone. Each creature in that area must succeed on a DC 17 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
	}]
};
//Creatures end

// Spells start
SpellsList["animal polymorph"] = {
	name : "Animal Polymorph",
	classes : ["druid", "ranger", "sorcerer"],
	source : ["OotD", 340],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 10 min",
	description : "1 creature save or transformed into beast of my choice of CR 1 or lower without flight; charmed if not immune",
	descriptionFull : "This spell transforms a creature you can see within range into a new beast form. An unwilling creature must make a Wisdom saving throw to avoid the effect. A shapechanger automatically succeeds on this saving throw." + "\n   " + "The transformation lasts for the duration, or until the target drops to 0 hit points or dies. The new form can be any beast of CR 1 or less that does not have a fly speed. While in this new form, the target is charmed by you and views you as a trusted ally. The target can understand simple commands such as “attack” or “stay.” The charm affects creatures that are immune to charm in their normal form. The charm ends immediately when the target reverts to its normal form." + "\n   " + "The target’s game statistics, including mental ability scores, are replaced by the statistics of the chosen beast. It retains its alignment and personality. The creature is limited in the actions it can perform by the nature of its new form, and it can’t speak, cast spells, or take any other action that requires hands or speech. The creature's gear melds into its new form. The creature can’t activate, use, wield, or otherwise benefit from any of its equipment." + "\n   " + "The target assumes the hit points of its new form. When it reverts to its normal form, the creature returns to the number of hit points it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form."
};

SpellsList["bond of the dragonlords"] = {
	name : "Bond of the Dragonlords",
	classes : ["paladin"],
	source : ["OotD", 340],
	level : 2,
	school : "Ench",
	time : "10 min",
	range : "Touch",
	components : "V,M\u2020",
	compMaterial: "Magical armor, shield, weapon, ring, rod, staff, or wand worth at least 5,000 gp, which the spell consumes, and an unhatched dragon egg",
	duration : "Special",
	description : "I or a creature I touch becomes permanently bonded to a newly-hatched metallic dragon",
	descriptionFull : "You permanently bond with a newly-hatched metallic dragon. This requires you to locate an unhatched dragon egg and spend 1d4 days nurturing the egg so that it hatches. The hatchling may be any of the following types of dragon wyrmling: brass, bronze, copper, or silver." + "\n   " + "You can confer the bond to another recipient who you are touching when you cast the spell. A dragon that has been bonded can never be bonded with another target. Likewise, this spell cannot be used to bond more than one dragon to any individual." + "\n   " + "Wyrmlings cannot be used as mounts until they grow into young dragons. A dragon cannot use legendary actions while it is being used as a mount." + "\n   " + toUni("Controlling the Dragon") + " Your dragon moves and acts on your initiative. You can decide how the dragon moves and attacks. While your dragon is fighting alongside you, it loses its multiattack feature. If your dragon has a breath weapon, it can be used once, and it recharges after you and the dragon complete a long rest." + "\n   " + "If your bonded dragon dies, you will also die within 24 hours unless the dragon is returned to life. You cannot be raised from the dead unless your bonded dragon is alive. The same is true for your dragon."
};

SpellsList["dirge of the dragonlords"] = {
	name : "Dirge of the Dragonlords",
	source : ["OotD", 340],
	level : 3,
	school : "Necro",
	time : "1 h",
	range : "Touch",
	components : "V,M\u2020",
	compMaterial: "An offering of gems and coins worth at least 1,000 gp, which the spell consumes",
	duration : "Instantaneous",
	description : "Returns a dead dragon bonded with a Dragonlord back to life with 1 HP; see book (1000gp cons.)",
	descriptionFull : "You return a dead dragon that has been bonded to a Dragonlord back to life. The dragon returns to life with 1 hit point. All of the dragon's mortal wounds are closed, and any missing body parts are restored." + "\n   " + "This spell also neutralizes any poisons and cures nonmagical diseases that affected the dragon at the time it died. This spell doesn’t, however, remove magical diseases, curses, or similar effects; if these aren’t first removed prior to casting the spell, they take effect when the dragon returns to life."
};

SpellsList["fatebinding"] = {
	name : "Fatebinding",
	source : ["OotD", 340],
	classes : ["cleric", "warlock", "wizard"],
	level : 3,
	school : "Necro",
	time : "1 a",
	range : "30 ft",
	components : "V",
	duration : "1 h",
	save : "Cha",
	description : "2 crea save or bound by fate; adv. on save if hostile; dis. on save if charmed",
	descriptionFull : "Choose two creatures that you can see. Both creatures must make Charisma saving throws, and they do so with advantage if they are hostile to you. If a creature is charmed by you, it has disadvantage on this saving throw. If both creatures fail their saving throws, then their fates are now bound together." + "\n " + "\u2022 Whenever one of the creatures takes damage, the other creature takes an identical amount of damage, unless both creatures took damage from the same single source, such as a fireball spell." + "\n " + "\u2022 Whenever one of the creatures regains hit points, the other creature regains an identical number of hit points, unless both creatures regained hit points from the same single source, such as mass cure wounds." + "\n   " + "The two target creatures remain fate-bound for the duration of the spell, even if both targets are on different planes of existence."
};

SpellsList["seeds of death"] = {
	name : "Seeds of Death",
	source : ["OotD", 341],
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	level : 6,
	school : "Necro",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M\u0192",
	compMaterial : "Three or more minotaur teeth and alchemical fertilizer worth 100 gp",
	duration : "Conc, 10 min",
	description : "3+1/SL minotaur skeletons erupt from the ground; bns a to shout commands",
	descriptionFull : "You throw three minotaur teeth on to the ground in front of you. At the start of your next turn, three minotaur skeletons erupt from the ground, fully formed. You can use a bonus action to shout commands at the minotaur skeletons if they are within 100 ft. of you. Your commands must be general orders, such as \"attack that enemy\" or \"guard this room.\" Once given an order, the minotaur skeletons will continue to follow it until the task is complete or until you issue another command. If the minotaur skeletons are given no commands, they will attack the nearest creature. When the spell ends, the minotaur skeletons dissolve into bone dust." + AtHigherLevels + "When you cast this spell using a spell slot of 7th level or higher, you animate an extra minotaur skeleton for each slot level above 6th."
};

SpellsList["sleeping draught"] = {
	name : "Sleeping Draught",
	source : ["OotD", 341],
	classes : ["bard", "warlock", "wizard"],
	level : 2,
	school : "Ench",
	time : "1 a",
	range : "20 ft",
	components : "V,S,M",
	compMaterial : "A draught of liquid",
	duration : "1 min",
	save : "Int",
	description : "1 crea falls unconscious if less than 9d8+3d8/SL HP; drowsy if higher; see book",
	descriptionFull : "You open a draught and a purple mist flows from you to a target creature. Roll 9d8; if the target creature has fewer current hit points than the total, then it falls unconscious. The target remains unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. If the target creature has more hit points than the rolled total, then it becomes drowsy and its speed is halved, it can’t take reactions, and it can’t make more than one melee or ranged attack during its turn. The target remains drowsy until it takes damage or until the spell ends." + "\n   " + "Undead and creatures that are immune to being charmed aren’t affected by this spell." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, roll an additional 3d8 for each slot level above the 2nd."
};

SpellsList["sword of fate"] = {
	name : "Sword of Fate",
	source : ["OotD", 341],
	classes : ["bard", "cleric", "warlock", "wizard"],
	level : 5,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V",
	duration : "1 h",
	description : "1 creature obeys shouted condition or 10d8 slashing dmg; see book",
	descriptionFull : "Choose a creature that you can see. You create an illusionary sword that hangs above that creature's head. Everyone with line of sight can see the sword except for the affected creature. When you cast the spell you must shout out one of the following conditions:" + "\n " + "\u2022 " + toUni("You cannot harm us") + " The target creature breaks this condition if they target the spell caster or a companion with an attack or a spell that causes damage." + "\n " + "\u2022 " + toUni("You cannot use magic") + "The target creature breaks this condition if they cast a spell." + "\n " + "\u2022 " + toUni("You cannot leave this area") + "The target creature breaks this condition if it moves more than 30 feet from the spot it was standing when the spell was cast." + "\n   " + "If the target creature breaks the condition, it takes 10d8 slashing damage as the blade becomes real and slices downward. If the target is reduced to 0 hit points, then one of its heads is removed. If the creature has no remaining heads, then it is instantly killed." + "\n   " + "The sword of fate can be dispelled. In addition, remove curse will end the spell on the target."
};

SpellsList["theogenesis"] = {
	name : "Theogenesis",
	source : ["OotD", 341],
	classes : ["druid", "ranger", "sorcerer", "wizard"],
	level : 9,
	school : "Conj",
	time : "1 h",
	range : "Touch",
	components : "V,S,M\u2020",
	compMaterial : "Offerings worth at least 10,000 gp, which are consumed, and all three Divine Artifacts: the Caduceus, the Ambrosia, and the Promethean fire",
	duration : "Special",
	description : "1 non-divine crea attempts to gain a divine spark; see book",
	descriptionFull : "Theogenesis is a powerful spell that is used to place a divine spark into a mortal creature, unlocking the potential to ascend to godhood. The artifacts are not consumed when the spell is cast, but the offerings are." + "\n   " + "Choose a single target (non-divine) creature for the spell. You must remain in contact with the target for the duration of the casting. If contact is broken, both you and the target take 20d6 radiant damage, and both the spell and the offering are wasted. If the spell is successfully cast, then one of the greater gods must decide whether or not to grant the divine spark. The creature's relationship with the god determines its chance of success, and the base chance is 0%. Each of the bonuses below are cumulative:" + "\n " + "\u2022 " + "The target shares at least one alignment axis with the greater god: +20%" + "\n " + "\u2022 " + "The target has the exact same alignment as the greater god: +20%" + "\n " + "\u2022 " + "The target has faithfully worshipped a god in the same pantheon for at least a year: +20%" + "\n " + "\u2022 " + "The target has faithfully worshipped the greater god for at least a year: +30%" + "\n   " + "Failure means that the greater god decides not to grant the divine spark. That greater god can’t be chosen again if the spell is cast on the same target. Success means that the target has been permanently granted a divine spark. It can only be removed with a wish spell."
};
// Spells end

// Mundane items start
WeaponsList["kopis"] = {
	name : "Kopis",
	source : ["OotD", 306],
	regExpSearch : /kopis/i,
	baseWeapon : "shortsword"
};

WeaponsList["dorata"] = {
	name : "Dorata",
	source : ["OotD", 306],
	regExpSearch : /dorata/i,
	baseWeapon : "spear"
};

WeaponsList["makhaira"] = {
	name : "Makhaira",
	source : ["OotD", 306],
	regExpSearch : /makhaira/i,
	baseWeapon : "longsword"
};

WeaponsList["xiphos"] = {
	name : "Xiphos",
	source : ["OotD", 306],
	regExpSearch : /xiphos/i,
	baseWeapon : "shortsword"
};

WeaponsList["chakram"] = {
	name : "Chakram",
	source : ["OotD", 334],
	regExpSearch : /chakram/i,
	type : "Martial",
	ability : 1,
	abilitytodamage : true,
	damage : [1, 6, "slashing"],
	range : "Melee, 60/120 ft",
	description : "Thrown, light, finesse; Returns when thrown, except on an attack roll of 1",
	list : "melee",
	weight : 2
};
// Mundane items end

// Magic items start
MagicItemsList["ambrosia"] = {
	name : "Ambrosia",
	source : ["OotD", 445],
	type : "wondrous item",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	usages : 6,
	recovery : "dawn",
	description : "6 charges, refills at dawn. One drink stops aging and death of old age (permanent). If killed after my lifespan, I can't be resurrected. Each day I drink, my age is reduced by 1d10 years (min 13, permanent). Each day I drink, my Cha score increases by 1 (max 20), wears when I don't drink ambrosia for a day.",
	descriptionFull : "This painted amphora contains ambrosia: the nectar of the gods. It resizes itself to fit the hands of the creature that holds it, and it contains enough ambrosia for six creatures to drink from it. The amphora refills itself at dawn of each day. Drinking ambrosia has the following temporary and permanent effects." + "\n " + toUni("Immortality") + " Drinking ambrosia just once makes you effectively immortal. You no longer show the physical effects of aging, and you will never die of old age. However, if you are killed after exceeding the maximum age of your race, spells can no longer resurrect you." + "\n " + toUni("Fountain of Youth") + " Each day that you drink ambrosia, your physical age is reduced by 1d10 years, to a minimum of 13 years. This effect is permanent." + "\n " + toUni("Voice of the Gods") + " Each day that you drink ambrosia, your Charisma score increases by 1, to a maximum of 20. If even a single day passes where you don't drink ambrosia, this effect wears off."
};

MagicItemsList["bulla talisman"] = {
	name : "Bulla Talisman",
	source : ["OotD", 445],
	type : "wondrous item",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "While wearing this amulet, I have advantage on saving throws against spells and magical effect cast by fiends and fey creatures, if my alignment is good.",
	descriptionFull : "This acorn-shaped golden amulet is engraved with a winged figure wielding a harp. While wearing this amulet, if your alignment is good, you have advantage on saving throws against spells and magical effects cast by fiends and fey creatures."
};

MagicItemsList["lunula talisman"] = {
	name : "Lunula Talisman",
	source : ["OotD", 445],
	type : "wondrous item",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "While wearing this amulet, I have advantage on saving throws against spells and magical effect cast by aberrations and monstrosities, if my alignment is good.",
	descriptionFull : "This crescent moon-shaped golden amulet is engraved with beautiful filigree. While wearing this amulet, if your alignment is good, you have advantage on saving throws against spells and magical effects cast by aberrations and monstrosities."
};

MagicItemsList["antikythera device"] = {
	name : "Antikythera Device",
	source : ["OotD", 445],
	type : "wondrous item",
	rarity : "legendary",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "I can use the device to magically repair 50 HP to the ship its on. Must be calibrated to constellations on dry land. Once calibrated, it will show a path to an island in the Cerulean Gulf or Forgotten Sea associated with a particular constellation.",
	descriptionFull : "The Antikythera is a complex construct that acts as a magical compass. It also has the power to mend damage to a ship: once per day it can magically repair 50 hit points of damage to a ship it is aboard." + "\n   " + "It uses the constellations to guide its user to islands in the Cerulean Gulf or Forgotten Sea. Every island in these seas are associated with a specific constellation. The Antikythera must be used on dry land as the constant movement of waves makes it impossible to calibrate. When it is calibrated to the proper constellations, it will show a path that can be used to reach the island associated with a particular constellation."
};

MagicItemsList["axe of xander"] = {
	name : "Axe of Xander",
	source : ["OotD", 445],
	type : "weapon (battleaxe)",
	rarity : "rare",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Axe of Xander"],
	weaponOptions : {
		baseWeapon : "battleaxe",
		regExpSearch : /axe of xander/i,
		name : "Axe of Xander",
		source : ["OotD", 445],
		range : "Melee",
		description : "Versatile (1d10); +3d6 force damage to giants/titans",
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This battleaxe is sentient, adds +1 to hit and damage, does an additional 3d6 force damage to giants and titans, and heals me 1d6 when I use it to kill a giant or titan. See Notes.",
	descriptionFull : "This is a sentient, lawful neutral +1 greataxe (Intelligence 14, Wisdom 10, Charisma 10). It has hearing and normal vision out to a range of 120 feet. It communicates empathically by transmitting emotion to the creature carrying or using it." + "\n   " + "The axe’s primary purpose is to destroy giants and titans. When you hit one of those creatures with this weapon, it deals an extra 3d6 force damage. It also transmits a tremendous sense of satisfaction and wellbeing to its user when it kills a giant or titan. You may heal 1d6 Hit Points when this happens.",
	toNotesPage : [{
		name : "Features",
		popupName : "Features of Axe of Xander",
		note : desc([
			"The Axe of Xander is a sentient lawful neutral weapon with an Intelligence of 14, a Wisdom of 10, and a Charisma of 10. It has hearing and normal vision out to a range of 120 feet. The weapon communicates by transmitting emotions to the creature carrying it or wielding it.",
			"The axe’s primary purpose is to destroy giants and titans. It also transmits a tremendous sense of satisfaction and wellbeing to its user when it kills a giant or titan."
		]) + "\n\n" + sentientItemConflictTxt
	}]
};

MagicItemsList["balm of invulnerability"] = {
	name : "Balm of Invulnerability",
	source : ["OotD", 445],
	type : "wondrous item",
	rarity : "very rare",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "I can apply this ointment to my entire body to gain resistance to non-magical damage for 1 day. Once I do so, the ointment is consumed.",
	descriptionFull : "This ointment is made from the magical herbs that only grow where titan blood has been spilled. A character may apply this balm to their entire body to gain resistance to non-magical damage for 1 day. This uses the entire jar of balm."
};

MagicItemsList["blessed olive oil"] = {
	name : "Blessed Olive Oil",
	source : ["OotD", 445],
	type : "wondrous item",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "I can bathe in this fragrant olive oil, for 1 min without armor, to receive the benefits of the Bless spell. Once I do so, the oil is consumed.",
	descriptionFull : "This amphora of fragrant olive oil has been blessed by the Mother Goddess. Characters may bathe in this olive oil to be receive the same effects as a bless spell. Anyone using the oil must remove their armor and spend one minute bathing. The oil is consumed in the process."
};

MagicItemsList["breastplate of mytros"] = {
	name : "Breastplate of Mytros",
	source : ["OotD", 445],
	type : "armor (breastplate)",
	rarity : "rare",
	description : "This breastplate gives +1 to AC and my Charisma score increases by 1. Giants and titans have disadvantage on attacks against me while wearing this breastplate.",
	descriptionFull : "A character has a +1 bonus to AC and a +1 bonus to Charisma while wearing this armor. Giants and titans have disadvantage on their attacks against an opponent wearing the Breastplate.",
	attunement : true,
	weight : 20,
	scores : [0, 0, 0, 0, 0, 1],
	armorAdd : "Breastplate of Mytros",
	armorOptions : {
		regExpSearch : /breastplate of mytros/i,
		name : "Breastplate of Mytros",
		source : ["OotD", 445],
		type : "medium",
		ac : 15,
		stealthdis : false,
		weight : 20
	}
};

MagicItemsList["burnished dragonlord coin"] = {
	name : "Burnished Dragonlord Coin",
	source : ["OotD", 446],
	type : "wondrous item",
	rarity : "very rare",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "I can understand Draconic.",
	descriptionFull : "This burnished golden coin carries the face of Xander Huorath on one side, and an engraving of the legendary ship Ultros on the reverse. The coin emits a faint golden light. Anyone who possesses a Dragonlord Coin can understand the Draconic language.",
	languageProfs : ["Draconic"]
};

MagicItemsList["caduceus"] = {
	name : "Caduceus",
	source : ["OotD", 446],
	type : "wondrous item",
	rarity : "legendary",
	description : "This staff offers abilities based on whether the user is or isn't a fiend or undead. Select the type that applies to you.",
	descriptionFull : "The Caduceus is a staff that features five dragons winding around it, with the top featuring two unfolded dragon wings. The staff was created by the wizard Damon over five centuries ago. Forged in the primordial waters of the Nether Sea, the Caduceus was a life-giving staff with the power to turn the tide against the Titans in the First War. Damon gave it to the dragonlord named Karpathos, also known as the Wolf Lord. Karpathos used the Caduceus to raise the Dragonlords from death during the First War. But he was seduced by Lutheria into believing the staff could elevate him to godhood. Karpathos betrayed his fellow dragonlords and swore an oath to Lutheria. He later broke the oath at the urging of his wife and Lutheria transformed him into Thylea’s first vampire as punishment." + "\n   " + "The Caduceus is an item of powerful life giving. In the hands of a living being it gives the power to heal and bring back those who have died. However, in the hands of the fiendish or undead, the Caduceus works in an entirely different manner." + "\n   " + "The Caduceus has 5 charges, which recharge daily at dawn. When used by a creature that is not a fiend or undead, they can be used in the following manner:" + "\n " + "\u2022 Cast the heal spell (1 charge)" + "\n " + "\u2022 Cast the greater restoration spell (1 charge)" + "\n " + "\u2022 Cast the resurrection spell (5 charges)" + "\n   " + "When used by a fiend or undead creature, the rod can be used in the following manner:" + "\n " + "\u2022 Cast the create undead spell as a 9th level spell (2 charges)" + "\n " + "\u2022 " + "Create a vampire spawn from a corpse that has been drained of blood (1 charge)" + "\u2022 Restore 100 hit points to an undead or fiend, even if they are at 0 hit points (2 charges)" + "\n   " + "The Caduceus is seemingly indestructible. However, it can be broken by an empyrean with a CR of 15 or higher. When the staff is destroyed, the life force of the titan contained within the Caduceus can be used to raise one empyrean from death, or it can be used to transform a creature with divine blood into a young empyrean.",
	attunement : true,
	allowDuplicates : true,
	usages : 5,
	recovery : "dawn",
	choices : ["Non Fiend/Undead", "Fiend/Undead"],
	"non fiend/undead" : {
		name : "Caduceus [non fiend/undead]",
		description : "This staff has 5 charges and regains them daily at dawn. I can cast the Heal spell (1 charge). I can cast the Greater Restoration spell (1 charge). I can cast the Resurrection spell (5 charges). See Notes for more properties.",
		descriptionFull : "The Caduceus is a staff that features five dragons winding around it, with the top featuring two unfolded dragon wings. The staff was created by the wizard Damon over five centuries ago. Forged in the primordial waters of the Nether Sea, the Caduceus was a life-giving staff with the power to turn the tide against the Titans in the First War. Damon gave it to the dragonlord named Karpathos, also known as the Wolf Lord. Karpathos used the Caduceus to raise the Dragonlords from death during the First War. But he was seduced by Lutheria into believing the staff could elevate him to godhood. Karpathos betrayed his fellow dragonlords and swore an oath to Lutheria. He later broke the oath at the urging of his wife and Lutheria transformed him into Thylea’s first vampire as punishment." + "\n   " + "The Caduceus is an item of powerful life giving. In the hands of a living being it gives the power to heal and bring back those who have died. However, in the hands of the fiendish or undead, the Caduceus works in an entirely different manner." + "\n   " + "The Caduceus has 5 charges, which recharge daily at dawn. When used by a creature that is not a fiend or undead, they can be used in the following manner:" + "\n " + "\u2022 Cast the heal spell (1 charge)" + "\n " + "\u2022 Cast the greater restoration spell (1 charge)" + "\n " + "\u2022 Cast the resurrection spell (5 charges)",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "1 charge",
			spells : ["heal"],
			selection : ["heal"],
			firstCol : 1
		}, {
			name : "1 charge",
			spells : ["greater restoration"],
			selection : ["greater restoration"],
			firstCol : 1
		}, {
			name : "5 charges",
			spells : ["resurrection"],
			selection : ["resurrection"],
			firstCol : 5
		}],
		toNotesPage : [{
			name : "Caduceus Properties",
			note : "The Caduceus is seemingly indestructible. However, it can be broken by an empyrean with a CR of 15 or higher. When the staff is destroyed, the life force of the titan contained within the Caduceus can be used to raise one empyrean from death, or it can be used to transform a creature with divine blood into a young empyrean."
		}],
		limfeaname : "Caduceus"
	},
	"fiend/undead" : {
		name : "Caduceus [non fiend/undead]",
		description : "This staff has 5 charges and regains them daily at dawn. I can cast the Create Undead spell at 9th level (2 charges). I can create a vampire spawn from a corpse drained of blood (1 charge). I can restore 100 HP to a fiend/undead, even if they are at 0 HP (2 charges). See Notes for more properties.",
		descriptionFull : "The Caduceus is a staff that features five dragons winding around it, with the top featuring two unfolded dragon wings. The staff was created by the wizard Damon over five centuries ago. Forged in the primordial waters of the Nether Sea, the Caduceus was a life-giving staff with the power to turn the tide against the Titans in the First War. Damon gave it to the dragonlord named Karpathos, also known as the Wolf Lord. Karpathos used the Caduceus to raise the Dragonlords from death during the First War. But he was seduced by Lutheria into believing the staff could elevate him to godhood. Karpathos betrayed his fellow dragonlords and swore an oath to Lutheria. He later broke the oath at the urging of his wife and Lutheria transformed him into Thylea’s first vampire as punishment." + "\n   " + "The Caduceus is an item of powerful life giving. When used by a fiend or undead creature, the rod can be used in the following manner:" + "\n " + "\u2022 Cast the create undead spell as a 9th level spell (2 charges)" + "\n " + "\u2022 " + "Create a vampire spawn from a corpse that has been drained of blood (1 charge)" + "\n " + "\u2022 Restore 100 hit points to an undead or fiend, even if they are at 0 hit points (2 charges)",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["create undead"],
			selection : ["create undead"],
			firstCol : 1
		},
		spellChanges : {
			"create undead" : {
				description : "Animate/reassert control over six ghouls, three ghasts or wights, or two mummies.",
				changes : "Using the Caduceus, I can cast Create Undead as if I'm using a 9th-level spell slot."
			}
		},
		toNotesPage : [{
			name : "Caduceus Properties",
			note : "The Caduceus is seemingly indestructible. However, it can be broken by an empyrean with a CR of 15 or higher. When the staff is destroyed, the life force of the titan contained within the Caduceus can be used to raise one empyrean from death, or it can be used to transform a creature with divine blood into a young empyrean."
		}],
		limfeaname : "Caduceus"
	}
};

MagicItemsList["chariot of dawn"] = {
	name : "Chariot of Dawn",
	source : ["OotD", 446],
	type : "wondrous item",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "I can speak the command word to activate the chariot, causing four golden horses to appear and begin pulling the chariot. I can only activate the chariot during the day in the open air and cannot be used underground or during night. See Notes. ",
	descriptionLong : "I can speak the command word to activate the chariot, causing four golden horses to appear and pull it. I gain a 90 ft flying speed. The chariot shines with a radiant light with a radius of 60 ft. Anyone in this radius takes 1d6 damage, except me. Every round I must use a bonus action to make a DC 15 Animal Handling (Wisdom) check to maintain control or the horses will use their full movement to fly straight up. I can only activate the chariot during the day and in the open air and cannot be used underground or during the night.",
	descriptionFull : "This chariot is a beautifully decorated artifact made from bronze. The chariot can only be activated while during the day in the open air and cannot be used underground or during night. When activated with its command word, a team of four golden horses spring into existence to pull the vehicle. The chariot shines with a painfully radiant light in a 60 ft. radius. Anyone within that radius other than the rider takes 4 (1d6) damage." + "\n   " + "The chariot has a flying speed of 90 ft. Flying is a free action, but the horses are difficult to control, and every round, the chariot rider must use a bonus action to control the horses. This requires a successful DC 15 Wisdom (Animal Handling) check. Failure means that the control is lost and the horses will move their full movement to climb straight up into the sky.",
	toNotesPage : [{
		name : "Chariot of Dawn Features",
		note : [
			"This chariot is a beautifully decorated artifact made from bronze. I can only activate it during the day in the open air and I cannot use it underground or during night. When I activate it with its command word, a team of four golden horses spring into existence to pull the vehicle. The chariot shines with a painfully radiant light in a 60 ft radius. Anyone within that radius other than the rider takes 4 (1d6) damage.",
			"The chariot has a flying speed of 90 ft. Flying is a free action, but the horses are difficult to control, and every round, I must use a bonus action to control the horses. This requires a successful DC 15 Animal Handling (Wisdom) check. Failure means that the control is lost and the horses will move their full movement to climb straight up into the sky."
		]
	}]
};

MagicItemsList["greatclub of the cyclopes"] = {
	name : "Greatclub of the Cyclopes",
	source : ["OotD", 446],
	type : "weapon (greatclub)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Greatclub of the Cyclopes"],
	weaponOptions : {
		baseWeapon : "greatclub",
		regExpSearch : /greatclub of the cyclopes/i,
		name : "Greatclub of the Cyclopes",
		source : ["OotD", 446],
		range : "Melee",
		description : "Two-handed; DC 16 Str save stunned and prone",
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This greatclub adds +1 to hit and damage. When I hit a target, it must make a DC 16 Strength save or become stunned and knocked prone until the end of its next turn.",
};

MagicItemsList["crown of laurels"] = {
	name : "Crown of Laurels",
	source : ["OotD", 447],
	type : "wondrous item",
	rarity : "very rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "While wearing the Crown of Laurels, I gain a +2 bonus to Wisdom saving throws.",
	addMod : [{ type : "save", field : "wis", mod : 2, text : "While wearing the Crown of Laurels, I gain a +2 bonus to Wisdom saving throws." }],
	descriptionFull : "This crown of enchanted laurel leaves is customarily awarded to the winner of the Great Games. It was crafted by Vallus, the Queen of Mytros and the Goddess of Wisdom. When worn, the crown provides +2 to Wisdom saving throws."
};

MagicItemsList["crown of the dragonlords"] = {
	name : "Crown of the Dragonlords",
	source : ["OotD", 447],
	type : "wondrous item",
	rarity : "rare",
	description : "This crown allows spellcasters to prepare the following spells: Bond of the Dragonlords and Dirge of the Dragonlords. Non-spellcasters can use the crown to cast Bond of the Dragonlords.",
	descriptionFull : "If you are a spellcaster (bard, cleric, druid, paladin, ranger, sorcerer, warlock or wizard), this crown grants you the ability to prepare the following spells: bond of the dragonlords and dirge of the dragonlords. If you are not a spellcaster, then as long as you wear the crown, you can cast bond of the dragonlords. Once you cast it, you must finish a long rest before you can cast it again. The material components are still required for both spells.",
	attunement : true,
	allowDuplicates : true,
	choices : ["Spellcaster", "Non-spellcaster"],
	"spellcaster" : {
		name : "Crown of the Dragonlords [spellcaster]",
		description : "I can prepare the following spells: Bond of the Dragonlords and Dirge of the Dragonlords.",
		descriptionFull : "If you are a spellcaster (bard, cleric, druid, paladin, ranger, sorcerer, warlock or wizard), this crown grants you the ability to prepare the following spells: bond of the dragonlords and dirge of the dragonlords.",
		spellcastingBonus : [{
			spells : ["bond of the dragonlords"],
			selection : ["bond of the dragonlords"],
			firstCol : "checkbox"
		}, {
			spells : ["dirge of the dragonlords"],
			selection : ["dirge of the dragonlords"],
			firstCol : "checkbox"
		}]
	},
	"non-spellcaster" : {
		name : "Crown of the Dragonlords [non-spellcaster]",
		description : "While wearing this crown I can cast the Bond of the Dragonlords spell. It still requires material components.",
		descriptionFull : "If you are not a spellcaster, then as long as you wear the crown, you can cast bond of the dragonlords. Once you cast it, you must finish a long rest before you can cast it again. The material components are still required for both spells.",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["bond of the dragonlords"],
			selection : ["bond of the dragonlords"],
			firstCol : 1
		},
		usages : 1,
		recovery : "long rest",
		limfeaname : "Crown of the Dragonlords"
	}
};

MagicItemsList["everburning torch"] = {
	name : "Everburning Torch",
	source : ["OotD", 447],
	type : "wondrous item",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "This bronze torch is enchanted with the continual flame spell. I can twist the pommel of the torch to ignite or douse the flame.",
	descriptionFull : "This bronze torch is enchanted with the continual flame spell. The pommel of the torch can be twisted to ignite or douse the flame."
};

MagicItemsList["game of twenty squares"] = {
	name : "Game of Twenty Squares",
	source : ["OotD", 447],
	type : "wondrous item",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "This game requires two players, and is played by moving seven pieces across a board comprised of twenty squares. Dice are rolled to determine how quickly pieces can move. The object of the game is to reach the end before my opponent. Protected from magical interference. See Notes.",
	descriptionFull : "The game requires two players, and it is played by moving seven pieces across a board comprising twenty squares. Dice are rolled to determine how quickly the pieces can move, and the object of the game is to reach the end of the twenty-square course before your opponent. This requires a mix of strategy and luck. The game is protected against magical interference, which prevents cheating with spells such as mage hand." + "\n " + toUni("Magical Wagers") + "Anything can be wagered on the outcome of the game—wealth, power, magic, or even the lives of the two players. Whenever gods play the game, this wager is enforced by magic woven into the fabric of the multiverse. Depending upon the nature of the wager, as many as six rematches may be allowed." + "\n " + toUni("Starting the Game") + "Two players are required to play the game. They must agree to their wager beforehand, and it is customary to cut the thumb and make a 'blood handshake' before the game begins." + "\n " + toUni("The game is resolved by making a series of seven opposed skill checks, which represent the various strategies that can be used to win the game. Each opposed skill check determines the outcome of a race between two game pieces. The winner of the game is the player who wins at least four rounds, which means that it is possible to win in just four rounds.") + "\n " + toUni("The Seven Rounds") + "The seven rounds proceed as a series of opposed skill checks. The skill checks are made in this order: Performance, Insight, History, Deception, Intimidation, Persuasion, Perception. Tied skill checks must be repeated until one player prevails.",
	toNotesPage : [{
		name : "Game of Twenty Squares Rules",
		note : [
			"\u2022 Requires two players",
			"\u2022 Players must agree on a wager prior to playing",
			"\u2022 When gods play, the wager is magically enforced",
			"\u2022 There are seven rounds, each resolved by contested skill checks, which are:",
			"\t\u2022 Performance",
			"\t\u2022 Insight",
			"\t\u2022 History",
			"\t\u2022 Deception",
			"\t\u2022 Intimidation",
			"\t\u2022 Persuasion",
			"\t\u2022 Perception",
			"\u2022 Tied skill checks are repeated until a player wins",
			"\u2022 The first person to win four rounds wins the game"
		]
	}]
};

MagicItemsList["golden apple"] = {
	name : "Golden Apple",
	source : ["OotD", 448],
	type : "wondrous item",
	rarity : "very rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "I can use an action to throw the apple, causing everyone in a 30 ft radius of where it lands to make a DC 18 Wis save. On a failure, they continually move toward it in an attempt to take it and can do nothing else. The save is repeats if no one has the apple. Once a person has it, they spend the next day guarding it.",
	descriptionFull : "These apples are wrought from solid gold, and are so beautiful that they inspire immense greed in anyone who sees them." + "\n   " + "On a turn, the owner of a golden apple may use an action to throw it. Everyone within a 30-foot radius of where the apple lands must make a DC 18 Wisdom saving throw. On a failure, they must use their next turn to move toward the apple and attempt to take it for themselves. This saving throw is repeated on each turn if no one has possession of the apple. No other activities are possible while wanting the golden apple. Once a creature has taken possession of the apple, they will spend the next day jealously guarding it. Weaker creatures, such as bandits or goatlings, may attempt to run away and hide it from others."
};

MagicItemsList["glaive of sydon"] = {
	name : "Glaive of Sydon",
	source : ["OotD", 448],
	type : "weapon (glaive)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	weaponsAdd : ["Glaive of Sydon"],
	weaponOptions : {
		baseWeapon : "glaive",
		regExpSearch : /glaive of sydon/i,
		name : "Glaive of Sydon",
		source : ["OotD", 448],
		range : "Melee",
		description : "Heavy, reach, two-handed; +4d6 lightning dmg once per turn",
		modifiers : [2,2]
	},
	allowDuplicates : true,
	description : "This glaive adds +2 to hit and damage. Once per turn, when I hit a target, I can inflict an additional 4d6 lightning damage.",
	descriptionFull : "You gain a +2 bonus to attack and damage rolls with this magic weapon. Once per turn, when you hit a creature with this weapon, you may choose to inflict an additional 4d6 lightning damage."
};

MagicItemsList["golden shield of volkan"] = {
	name : "Golden Shield of Volkan",
	source : ["OotD", 448],
	type : "shield",
	rarity : "very rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "I can use a bonus action to cast Thunderwave 3 times a day with this shield. I can attach the head of a medium or smaller creature and spend an action to activate it, once per day. I gain one of the creature's traits for 5 rounds; no spellcasting. I have adv. on initiative and Perception (Wis) checks. I also know Draconic.",
	descriptionFull : "",
	languageProfs : ["Draconic"],
	spellcastingAbility : "class",
	spellFirstColTitle : "Ch",
	spellcastingBonus : {
		name : "1 charge",
		spells : ["thunderwave"],
		selection : ["thunderwave"],
		firstCol : 1
	},
	extraLimitedFeatures : [{
		name : "Golden Shield of Volkan (Thunderwave)",
		usages : 3,
		recovery : "dawn"
	}, {
		name : "Golden Shield of Volkan (Activate Head)",
		usages : 1,
		recovery : "dawn"
	}],
	vision : [["Adv. on Perception checks", 0]],
	action : [["action", " (Activate Head)"], ["bonus action", " (Thunderwave)"]]
};

var hagsLoomTable = [
	toUni("Items Craftable with Hag's Loom:"),
	toUni("Crafted Item, Days, Cost (gp), Primary Ingredient, Second Ingredient"),
	"Armor of Invulnerability, 10, 20,000, Golden Lion Hide, Gorgon blood",
	"Cloak of Invisibility, 10, 20,000, Golden Fleece, Gorgon blood",
	"Robe of the Archmagi, 10, 20,000, Golden Fleece, Gorgon Blood"
];

MagicItemsList["hag's loom"] = {
	name : "Hag's Loom",
	source : ["OotD", 448],
	type : "wondrous item",
	rarity : "very rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	weight : 1000,
	description : "I can use the loom to cast the Commune spell once per day, though it takes 1 hour because the answer is woven into cloth by the loom. I can use the loom to create magical items if I am the Doomed One, otherwise there is a 1% chance I can use the loom in this way. See Notes.",
	descriptionFull : "This magical loom weighs 1000 pounds and is used to divine the future. The loom can cast a commune spell once per day, but this takes an hour, as the answer must be woven into cloth made by the loom." + "\n   " + "In addition to its divination powers, certain individuals can also use the loom to create magic items. There is, however, only a 1% chance for any individual to have this power. The loom can only be used to weave each of the magic items on the table below. The person weaving the magic items must have all of the appropriate components. The Doomed One also has the power to use this loom." + "\n   " + "Once all three items have been woven the loom becomes non-magical." + desc(hagsLoomTable),
	usages : 1,
	recovery : "dawn",
	spellFirstColTitle : "Us",
	spellcastingBonus : {
		name : "1 use",
		spells : ["commune"],
		selection : ["commune"],
		firstCol : 1
	},
	spellChanges : {
		"commune" : {
			time : "1 h",
			changes : "Using the Hag's Loom, I can cast Commune, but it takes an hour to complete, as the answer is woven into cloth."
		}
	},
	toNotesPage : [{
		name : "Hag's Loom Crafting",
		note : [
			"Each item costs 20,000gp, takes 10 days to craft, and requires two ingredients:",
			"\u2022 Armor of Invulnerability - Golden Lion Hide, Gorgon Blood",
			"\u2022 Cloak of Invisibility - Golden Fleece, Gorgon Blood",
			"\u2022 Robe of the Archmagi - Golden Fleece, Gorgon Blood",
			"Once all three items have been woven, the loom becomes non-magical"
		]
	}]
};

MagicItemsList["helm of darkness"] = {
	name : "Helm of Darkness",
	source : ["OotD", 448],
	type : "wondrous",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	vision : ["Darkvision", 60],
	description : "While wearing this helmet, magical darkness spreads in a 15 ft radius, even going around corners. Normal light cannot pierce it nor is it dispelled by magical light. I gain Darkvision out to 60 ft, which is not affected by darkness from the helmet or another source. Covering it with something opaque blocks the darkness.",
	descriptionFull : "Magical darkness spreads from the helmet when it is worn and fills a 15-foot-radius sphere; the darkness will even spread around corners. A creature with darkvision can’t see through the Helm’s darkness, and nonmagical light will not pierce it. The magical darkness is not dispelled by light from magical effects. The Helm’s wearer, on the other hand, has darkvision to a range of 60 feet. This darkvision is not affected by darkness from the helmet or another source." + "\n   " + "Completely covering the helmet with something opaque blocks the darkness: think of the darkness as “negative light”."
};

MagicItemsList["horn of balmytria"] = {
	name : "Horn of Balmytria",
	source : ["OotD", 449],
	type : "wondrous",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	usages : 1,
	recovery : "dawn",
	action : ["action", " (Paralyzing Mist)"],
	description : "I can speak a command word to make food/water/wine for 6 Medium creatures for a day. The wine can cause prophetic dreams. A second command word makes a 5 ft radius mist within 60 ft; grows 5 ft per round (max 30). A creature starting in it makes a DC 14 Con save or paralyzed until star of its next turn.",
	descriptionLong : "The horn has two command words. When I speak the first one food, water, and wine is created to sustain six Medium creatures for a day. The wine can induce a sleep with prophetic dreams. I can use an action to speak the second command word, creating a mist with a 5 ft radius within 60ft that grows 5 ft per round. Any creature starting its turn in the mist must make a DC 14 Constitution saving throw or be paralyzed until the start of its next turn.",
	descriptionFull : "This horn was fashioned from one of the horns of Balmytria. It has two command words: one produces delicious food, along with water and wine, in a sufficient quantity to keep six Medium-sized creatures well fed for a day. If wine is drunk from the horn it can sometimes (at your discretion) induce a deep sleep with dreams that will reveal possible futures." + "\n   " + "The second command word produces a paralyzing, mercurial vapor. Once per day, you may use an action to create a cloud within 60 ft. of you. The cloud starts with a 5 ft. radius, which increases by 5 ft. each round to a maximum of 30 ft. Any creature that starts its turn in the mist must make a DC 14 Constitution saving throw or be paralyzed until the start of its next turn."
};

MagicItemsList["mithral chakram"] = {
	name : "Mithral Chakram",
	source : ["OotD", 449],
	type : "weapon (chakram)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Chakram"],
	weaponOptions : {
		baseWeapon : "chakram",
		regExpSearch : /mithral chakram/i,
		name : "Mithral Chakram",
		source : ["OotD", 449],
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This chakram adds +1 to hit and damage. When I miss an attack with this weapon, I can try the same attack roll against another creature within 10 feet of the first target.",
	descriptionFull : "This mithral-forged, bladed circular disc is an unusual thrown weapon. It glides through the air, slicing through anything in its path before returning to the thrower." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. When you miss an attack with this weapon, you may try the same attack roll against another creature within 10 feet of the first target."
};

MagicItemsList["mithral dorata"] = {
	name : "Mithral Dorata",
	source : ["OotD", 449],
	type : "weapon (spear)",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Dorata"],
	weaponOptions : {
		baseWeapon : "spear",
		regExpSearch : /mithral dorata/i,
		name : "Mithral Dorata",
		source : ["OotD", 449],
		modifiers : [1,1]
	},
	allowDuplicates : true,
	description : "This dorata adds +1 to hit and damage. I do not suffer disadvantage on ranged attacks due to enemies in close proximity when I am wielding this weapon.",
	descriptionFull : "These mithral-forged spears are designed to be carried together, with one to be used for throwing and one to be used for close-quarters combat." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. You do not suffer disadvantage on ranged attacks due to enemies in close proximity when you are wielding this weapon.",
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isRangedWeapon || (/thrown/i).test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + "No disadv. on ranged with enemies in close proximity";
				}
			}, ''
		]
	}
};

MagicItemsList["mithral honorblade"] = {
	name : "Mithral Honorblade",
	source : ["OotD", 449],
	type : "weapon (greatsword)",
	rarity : "very rare",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Honorblade"],
	weaponOptions : {
		baseWeapon : "greatsword",
		regExpSearch : /mithral honorblade/i,
		name : "Mithral Honorblade",
		source : ["OotD", 449],
		modifiers : [1,1],
		description : "Heavy, two-handed; Destroy non-magical shield on hit"
	},
	allowDuplicates : true,
	description : "This magic greatsword adds +1 to hit and damage. Whenever I hit a creature wielding a non-magical shield, that shield is instantly destroyed.",
	descriptionFull : "This oversized, mithral-forged makhaira was designed by ancient jancan smiths. Although it seems much too large for a human, the warrior monks of Aresia have been known to specialize in the use of honorblades." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. Whenever this magic weapon hits a creature wielding a non-magical shield, that shield is instantly destroyed."
};

MagicItemsList["mithral kopis"] = {
	name : "Mithral Kopis",
	source : ["OotD", 449],
	type : "weapon (shortsword)",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Kopis"],
	weaponOptions : {
		baseWeapon : "shortsword",
		regExpSearch : /mithral kopis/i,
		name : "Mithral Kopis",
		source : ["OotD", 449],
		modifiers : [1,1],
		description : "Finesse, light; Deals piercing or slashing damage"
	},
	allowDuplicates : true,
	description : "This kopis adds +1 to hit and damage. When I make an attack with this weapon, I can choose to have it inflict piercing or slashing damage.",
	descriptionFull : "This mithral-forged, forward-curving shortsword is heavier along the end of the blade. This gives it more cutting power than most shortswords." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. When you make an attack with this sword, you may choose to have it inflict piercing or slashing damage."
};

MagicItemsList["mithral makhaira"] = {
	name : "Mithral Makhaira",
	source : ["OotD", 449],
	type : "weapon (longsword)",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Makhaira"],
	weaponOptions : {
		baseWeapon : "longsword",
		regExpSearch : /mithral makhaira/i,
		name : "Mithral Makhaira",
		source : ["OotD", 449],
		modifiers : [1,1],
		description : "Versatile (1d10); +1d4 while mounted"
	},
	allowDuplicates : true,
	description : "This makhaira adds +1 to hit and damage. When I attack with this weapon while I am mounted, it does an additional 1d4 slashing damage on hit.",
	descriptionFull : "This mithral-forged longsword has a single curved blade with a flat edge along the top. It is heavier than most longswords, making it more effective while mounted." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. When you attack with this blade while you are mounted, it does an additional d4 slashing damage on hit."
};

MagicItemsList["mithral xiphos"] = {
	name : "Mithral Xiphos",
	source : ["OotD", 449],
	type : "weapon (dagger)",
	rarity : "uncommon",
	notLegalAL : true,
	attunement : false,
	weaponsAdd : ["Mithral Xiphos"],
	weaponOptions : {
		baseWeapon : "dagger",
		regExpSearch : /mithral xiphos/i,
		name : "Mithral Xiphos",
		source : ["OotD", 449],
		modifiers : [1,1],
		description : "Finesse, light, thrown; Ignore AC from shields",
	},
	allowDuplicates : true,
	description : "This xiphos adds +1 to hit and damage. When I attack with this weapon, I ignore any AC that the enemy gains from wielding a shield.",
	descriptionFull : "This mithral-forged dagger has a straight, leaf-shaped blade, which is excellent for thrusting and piercing between shields in phalanx formations." + "\n   " + "Attacks made with this weapon have a +1 bonus to attack and damage rolls. When you make an attack with this weapon, you ignore any AC that the enemy gains from wielding a shield."
};

var instrumentsOfTheMuseFullDescription = [
	"These instruments were crafted by the forge god Volkan for his daughter, Kyrah. Each instrument is simple but elegant, designed so as not to attract unwanted attention, because the goddess of music loves to travel in disguise as a common bard. However, when played, the instruments produce rapturous melodies, owing to the fact that they are crafted from the hair of nymphs.",
	"The following table lists the spells common to all the instruments, as well as the spells that are specific to each instrument. You can use an action to play the instrument and cast one of its spells. Once the instrument has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC. When you use the instrument to cast a spell as a source or as a focus, your spell save DC is increased by 2.",
	">>Instrument\tSpells<<",
	"  All         !!\tjump, invisibility, levitate",
	"  Boreal harp \tcontrol weather, conjure animals",
	"  Euros lyre  \tsleep (4th level), counterspell (3rd level)",
	"  Notos kithara\tzone of truth, magic circle",
	"  Zephyr lute \thold person, conjure elemental"
];

MagicItemsList["instruments of the muse"] = {
	name : "Instruments of the Muse",
	source : ["OotD", 449],
	type : "wondrous item",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	prerequisite : "Requires attunement by a bard",
	prereqeval : function(v) { return (classes.known.bard); },
	calcChanges : {
		spellCalc : [
			function (type, spellcasters, ability) {
				if (type == "dc" && (/bard/).test(spellcasters)) return 2;
			},
			"I gain a +2 bonus to saving throw DCs of my bard spells."
		]
	},
	extraLimitedFeatures : [{
		name : "Boreal harp",
		usages : 1,
		recovery : "dawn"
	}, {
		name : "Euros lyre",
		usages : 1,
		recovery : "dawn"
	}, {
		name : "Notos kithara",
		usages : 1,
		recovery : "dawn"
	}, {
		name : "Zephyr lute",
		usages : 1,
		recovery : "dawn"
	}],
	spellFirstColTitle : "Us",
	spellcastingBonus : [{
		name : "Instruments of the Muse",
		spells : ["jump"],
		selection : ["jump"],
		firstCol : 1
	}, {
		name : "Instruments of the Muse",
		spells : ["invisibility"],
		selection : ["invisibility"],
		firstCol : 1
	}, {
		name : "Instruments of the Muse",
		spells : ["levitate"],
		selection : ["levitate"],
		firstCol : 1
	}, {
		name : "Boreal harp",
		spells : ["control weather"],
		selection : ["control weather"],
		firstCol : 1
	}, {
		name : "Boreal harp",
		spells : ["conjure animals"],
		selection : ["conjure animals"],
		firstCol : 1
	}, {
		name : "Euros lyre",
		spells : ["sleep"],
		selection : ["sleep"],
		firstCol : 1
	}, {
		name : "Euros lyre",
		spells : ["counterspell"],
		selection : ["counterspell"],
		firstCol : 1
	}, {
		name : "Notos kithara",
		spells : ["zone of truth"],
		selection : ["zone of truth"],
		firstCol : 1
	}, {
		name : "Notos kithara",
		spells : ["magic circle"],
		selection : ["magic circle"],
		firstCol : 1
	}, {
		name : "Zephyr lute",
		spells : ["hold person"],
		selection : ["hold person"],
		firstCol : 1
	}, {
		name : "Zephyr lute",
		spells : ["conjure elemental"],
		selection : ["conjure elemental"],
		firstCol : 1
	}],
	spellChanges : {
		"sleep" : {
			description : "20-ft rad 9d8 HP of conscious creatures fall asleep, starting with the lowest current HP crea",
			changes : "Using the Euros lyre, I can cast Sleep as if I'm using a 4th-level spell slot."
		},
		"counterspell" : {
			description : "Stop a spell being cast; make DC 13 spellcasting ability check if above the spell slot lvl used",
			changes : "Using the Euros lyre, I can cast Counterspell as if I'm using a 3rd-level spell slot."
		}
	},
	allowDuplicates : true,
	description : "A set of four instruments: harp, lyre, kithara, lute. I can use each instrument once to cast a spell (see Notes), they regain the ability to do so at dawn. They use my spellcasting ability and spell DC. I can use the instruments as a spellcasting focus. When used as a focus or source for a spell, its DC is increased by 2.",
	descriptionFull : instrumentsOfTheMuseFullDescription.join("\n   ").replace("!!", "").replace(/>>(.*?)<</g, function(a, match) { return toUni(match); }),
	toNotesPage : [{
		name : "Instruments of the Muse",
		popupName : "Instruments of the Muse Spells",
		note : desc(instrumentsOfTheMuseFullDescription.slice(2)).replace("!!", "\t").replace(/>>(.*?)<</g, function(a, match) { return match.toUpperCase(); })
	}]
};

MagicItemsList["palladium"] = {
	name : "Palladium",
	source : ["OotD", 450],
	type : "wondrous item",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "The Palladium can be enshrined in a city or ship. This process takes seven days of devoted prayer from a priest, which can be expedited by sacrifices. Once enshrined, it offers benefits to the city or ship. The benefits end if it is ever moved by more than an inch. See Notes.",
	descriptionFull : "This artifact bestows magical protection upon any city or ship that enshrines it. Enshrining the Palladium within a city or ship requires seven days of devoted prayer by a priest. Sacrifices are sometimes offered to expedite this process. Once the artifact is enshrined, it bestows its full protection. However, if the artifact is ever moved by more than an inch, the protective effects end." + "\n " + toUni("Protected Cities") + "The city walls have resistance to all damage types. Siege weapons mounted on the city walls have advantage on all attacks." + "\n " + toUni("Protected Ships") + "The ship's hull has resistance to all damage types. Siege weapons mounted on the deck of the ship have advantage on all attacks." + "\n " + toUni("Forbiddance") + "The city is protected by the effects of the Forbiddance spell, preventing teleportation into or out of the city, as defined by its walls.",
	toNotesPage : [{
		name : "Palladium Enshrined Benefits",
		popupName : "Palladium Enshrined Benefits",
		note : desc ([
			"\u2022 Protected Cities",
			"   The city walls have resistance to all damage types. Siege weapons mounted on the city walls have advantage on all attacks.",
			"\u2022 Protected Ships",
			"   The ship's hull has resistance to all damage types. Siege weapons mounted on the deck of the ship have advantage on all attacks.",
			"\u2022 Forbiddance",
			"   The city is protected by the effects of the Forbiddance spell, preventing teleportation into or out of the city, as defined by its walls."
		])
	}]
};

MagicItemsList["pegasus bridle"] = {
	name : "Pegasus Bridle",
	source : ["OotD", 450],
	type : "wondrous item",
	rarity : "rare",
	notLegalAL : true,
	attunement : true,
	allowDuplicates : true,
	description : "I can use this bridle to tame a pegasus, so that I can use it as a flying mount. Once the pegasus has been bridled, I am the only on who can commaned it while I am attuned to this item.",
	descriptionFull : "This golden bridle may be used to tame a pegasus, so that the mythical creature may be used as a flying mount. Once the pegasus has been bridled, it may only be commanded by the character who is attuned to this item.",
};

MagicItemsList["potion of aging"] = {
	name : "Potion of Aging",
	source : ["OotD", 450],
	type : "wondrous item",
	rarity : "legendary",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "A creature physically ages by one year for each drop the creature drinks.",
	descriptionFull : "This cloudy blue potion was brewed from the blood of a living god. For each droplet that a creature drinks from this potion, the creature physically ages by one year. Creatures with shorter lifespans, such as humans, should be cautious when drinking this potion." + "\n   " + "Brewing the potion is a long process that requires one droplet of divine blood to be added each year for many years. Such potions are always designated with the number of years that it took to brew them. For example, a potion of aging (25 years) contains 25 droplets.",
};

var pythorsHammerTable = [
	toUni("Items Craftable with Pythor's Hammer"),
	toUni("Crafted Item, Days, Cost (gp), Primary Ingredient, Second Ingredient"),
	"Luck Blade, 10, 20,000, Any magical sword, orb of star metal",
	"Rod of Lordly Might, 10, 20,000, Any magical mace, adamantine ingot"
];

MagicItemsList["pythor's hammer"] = {
	name : "Pythor's Hammer",
	source : ["OotD", 450],
	type : "weapon (warhammer)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	weaponsAdd : ["Pythor's Hammer"],
	weight : 2,
	weaponOptions : {
		baseWeapon : "warhammer",
		regExpSearch : /pythor's warhammer/i,
		name : "Pythor's Hammer",
		source : ["OotD", 450],
		modifiers : [1,1],
		description : "Versatile (1d10)"
	},
	allowDuplicates : true,
	description : "This warhammer adds +1 to hit and damage. Once per day, I can instantly summon the hammer to my hand from any distance. The hammer can also be used to craft weapons and armor; See Notes.",
	descriptionFull : "Attacks made with this weapon have a +1 bonus to attack and damage rolls. Once per day, you may instantly summon the hammer to your hand from any distance, and it teleports directly into your grasp. The hammer’s main purpose is to forge magical weapons and armor, and if used in such a fashion, the creation time is halved. Refer to the table below for crafting recipes." + desc(pythorsHammerTable),
	toNotesPage : [{
		name : "Pythor's Hammer Crafting",
		note : [
			"Each item costs 20,000gp, takes 10 days to craft, and requires two ingredients:",
			"\u2022 Luck Blade - Any magical sword, orb of star metal",
			"\u2022 Rod of Lordly Might - Any magical mace, adamantine ingot",
			"If Phythor's Hammer is used to craft a magical weapon/armor, the time to craft is halved"
		]
	}]
};

MagicItemsList["scythe of lutheria"] = {
	name : "Scythe of Lutheria",
	source : ["OotD", 450],
	type : "weapon (scythe)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	weaponsAdd : ["Scythe of Lutheria"],
	weight : 6,
	weaponOptions : {
		baseWeapon : "glaive",
		regExpSearch : /scythe of lutheria/i,
		name : "Scythe of Lutheria",
		source : ["OotD", 450],
		modifiers : [1,1],
		description : "Heavy, reach, two-handed; On crit DC 15 Con save if under 100 HP, or killed",
	},
	allowDuplicates : true,
	description : "This scythe adds +1 to hit and damage. When I score a critical hit, the target, if under 100 HP, makes a DC 15 Constitution save or is killed, if it's not a construct or undead. On subsequent occurrences, I make a DC 15 Charisma save or turn Evil. Only a Wish spell can undo this effect.",
	descriptionFull : "Attacks made with this weapon have a +1 bonus to attack and damage rolls. If critical hit is scored against a creature that has fewer than 100 hit points, it must make a DC15 Constitution saving throw or be slain instantly; constructs and the undead are immune to this effect. When a creature is slain in this manner, the user feels a surge of dark pleasure that entices them to become evil. On the second and subsequent slaying the user must make a DC15 Charisma saving throw or their alignment changes to evil. Affiliation to Law or Chaos is unchanged. Only a wish spell can undo this alignment change."
};

MagicItemsList["shortbow of cupidity"] = {
	name : "Shortbow of Cupidity",
	source : ["OotD", 450],
	type : "weapon (shortbow)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	weaponsAdd : ["Shortbow of Cupidity"],
	weight : 2,
	weaponOptions : {
		baseWeapon : "shortbow",
		regExpSearch : /shortbow of cupidity/i,
		name : "Shortbow of Cupidity",
		source : ["OotD", 450],
		modifiers : [1,1],
		description : "Ammunition, two-handed; DC 14 Wis save or charmed for 1 h",
	},
	usages : 1,
	recovery : "dawn",
	additional : "charm",
	allowDuplicates : true,
	description : "This shortbow adds +1 to hit and damage. On a hit, I can force the target to make a DC 14 Wisdom save or be charmed by me for 1 hour. I can do this only once per day.",
	descriptionFull : "Attacks made with this weapon have a +1 bonus to attack and damage rolls. Once per day, on a successful hit, you may force the target to make a DC 14 Wisdom saving throw. On a failure, the target is charmed by you for one hour."
};

MagicItemsList["the promethean fire"] = {
	name : "The Promethean Fire",
	nameTest : "The Promethean Fire",
	source : ["OotD", 450],
	rarity : "legendary",
	type : "weapon (spear)",
	description : "While attuning, I can change this item into any simple/martial weapon; keeps all traits. This spear adds +3 to hit/damage, does fire damage, emits 60 ft sunlight. It has 5 charges, which I can use to cast Awaken (3), Fabricate (2), Plant Growth (2), Stone Shape (2); DC 17. Regains 1d4 + 1 at dawn.",
	descriptionLong : "While attuning to this spear, I can transform it into any simple or martial weapon; it retains all of its magical properties. This spear adds +3 to hit and damage, deals fire damage, radiates sunlight out to 60 ft, and has 5 charges. It regains 1d4 + 1 charges at dawn. Using charges, I can cast the following transmutation spells: Awaken (3 charges), Fabricate (2 charges), Plant Growth (2 charges), and Stone Shape (2 charges). These spells have a DC of 17.",
	descriptionFull : "This spear was crafted from the Great Tree of Thylea and set ablaze with the fires of creation. When attuning with this item, you may transform it into any martial or simple weapon of your choice. The new weapon has all the same magical properties." + "\n   " + toUni("Attack Bonus") + " Attacks made with this weapon have a +3 bonus to attack and damage rolls. Regardless of the form that this weapon takes, its damage type is fire." + "\n   " + toUni("Radiant Light") + " The weapon radiates a blazing light out to 60 feet. This light is sunlight." + "\n   " + toUni("Transmutation Spells") + " The weapon has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from this weapon have a save DC of 17. You can use this weapon to cast the following spells: awaken (3 charges), fabricate (2 charges), plant growth (2 charges), stone shape (2 charges).",
	attunement : true,
	usages : 5,
	recovery : "dawn",
	additional : "regains 1d4 + 1",
	chooseGear : {
		type : "weapon",
		descriptionChange : ["replace", "spear"],
		prefixOrSuffix : "suffix"
	},
	fixedDC : 17,
	spellFirstColTitle : "Ch",
	spellcastingBonus : [{
		name : "3 charges",
		spells : ["awaken"],
		selection : ["awaken"],
		firstCol : 3
	}, {
		name : "2 charges",
		spells : ["fabricate"],
		selection : ["fabricate"],
		firstCol : 2
	}, {
		name : "2 charges",
		spells : ["plant growth"],
		selection : ["plant growth"],
		firstCol : 2
	}, {
		name : "2 charges",
		spells : ["stone shape"],
		selection : ["stone shape"],
		firstCol : 2
	}],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (!v.theWea.isMagicWeapon && !v.isSpell && (/the promethean fire/i).test(v.WeaponText)) {
					fields.Damage_Type = 'fire';
				}
			},
			'If I include "The Promethean Fire" in the name of a weapon, it will be treated as the magic weapon The Promethean Fire. It has +3 to hit and damage and deals fire damage.'
		],
		atkCalc : [
			function (fields, v, output) {
				if (!v.isSpell && (/the promethean fire/i).test(v.WeaponTextName)) {
					output.magic = v.thisWeapon[1] + 3;
					output.extraHit += 3;
				}
			}
		]
	}
};

MagicItemsList["titansbane, blade of talieus"] = {
	name : "Titansbane, Blade of Talieus",
	source : ["OotD", 450],
	type : "weapon (longsword)",
	rarity : "legendary",
	notLegalAL : true,
	attunement : true,
	weaponsAdd : ["Titansbane, Blade of Talieus"],
	weight : 2,
	weaponOptions : {
		baseWeapon : "longsword",
		regExpSearch : /titansbane, blade of talieus/i,
		name : "Titansbane, Blade of Talieus",
		source : ["OotD", 450],
		modifiers : [2,2],
		description : "Versatile (1d10); +2d6 necrotic to giants/celestials/gygans/cyclopes"
	},
	allowDuplicates : true,
	description : "Titansbane is a sentient longsword that adds +2 to hit and damage. On a hit, it deals an extra 2d6 necrotic damage to giants, celestials, gygans, and cyclopes. It wishes to be returned to its master.",
	descriptionFull : "Attacks made with this weapon have a +2 bonus to attack and damage rolls. When a giant or celestial is hit by this weapon, the creature takes an extra 2d6 necrotic damage. Gygans and cyclopes are also affected." + "\n   " + "Titansbane is sentient and wishes to be returned to its master. It was forged by Talieus, the ancient titan who pulls Lutheria’s barge. It was wielded against Sydon by Hergeron and then lost in the War of the Titans." + "\n " + toUni("Titansbane: The Sentient Weapon") + "\n This is the only blade that can cut the bindings that Lutheria used to sew Talieus’s mouth and eyes shut. If his bindings are cut, Talieus will immediately stop pulling Lutheria’s barge, thank the one who helped him, and then disappear across the horizon of the Nether Sea. He will entrust the weapon to the one who freed him.",
	toNotesPage : [{
		name : "Features",
		popupName : "Features of Titansbane",
		note : desc(["Titansbane is a sentient longsword. It wishes to be returned to its master."]) + "\n\n" + sentientItemConflictTxt
	}]
};

MagicItemsList["toga praetexta"] = {
	name : "Toga Praetexta",
	source : ["OotD", 451],
	type : "wondrous item",
	rarity : "uncommon",
	usages : 1,
	recovery : "dawn",
	additional : "flourish",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	saves : ["Cha"],
	description : "While wearing this toga, I have proficiency in Charisma saving throws. Once per day, when I fail a Charisma check trying to influence a crowd, I can flourish the toga to re-roll the check.",
	descriptionFull : "This white, woolen cloth toga has broad purple stripes along its border, and it drapes fashionably across the body when worn. It has been purified by priests through ritual processions and sacrifices on the night of the new moon. While wearing the toga, you have proficiency in Charisma saving throws. Additionally, once per day, when you fail a Charisma check to influence a crowd of people, you may flourish your toga to impress the crowd and re-roll that check."
};

MagicItemsList["wheel of fortune"] = {
	name : "Wheel of Fortune",
	source : ["OotD", 451],
	type : "wondrous item",
	rarity : "legendary",
	notLegalAL : true,
	attunement : false,
	allowDuplicates : true,
	description : "I can spin this 6 ft tall bronze wheel to receive a magical effect depending upon which constellation it lands on. Any attempt to influence the outcome causes the the wheel to lose its magic until the dawn of the next day. A creature can only spin the wheel once every 24 hours. See Notes.",
	descriptionFull : "This is a 6-foot-tall bronze wheel that has been set on a stand so that it can easily be spun. Along the wheel are inscriptions showing each of Thylea’s major constellations. At the top of the wheel is the symbol of the mother goddess, pointing down. When the wheel is spun, a magical effect occurs depending upon which of the inscriptions the mother goddess is pointing at. Any effect, magical or otherwise, that would make the spinning of the wheel not random removes all of the wheel’s magic until the dawn of the next day. A creature may only spin the wheel of fortune once per day (24-hour period). Refer to the table on the next page for the effects of the wheel." + [
			toUni("1 / The Bear") + ". Your Constitution and Intelligence scores increase by 4 for 8 hours.",
			toUni("2 / The Gygan") + ". A gygan hero has been sent to kill you. In every battle, there is a cumulative 10% chance that the gygan hero catches up with you and attacks. He attacks in the second round of the battle and focuses all of his attacks on you. When the gygan is defeated, this effect ends.",
			toUni("3 / The Prisoner") + ". You are banished to an extradimensional maze. At the end of each day you may make an Intelligence check at DC 15 to escape. In your place, a sacred beast appears beside the wheel. This beast will, to the best of its abilities, try to accomplish any goals you were working on. You may choose any beast of a CR equal to or less than your level. The beast has the celestial type. Your gamemaster can allow you to continue play as this beast until you free yourself from your maze. When you free yourself, the beast vanishes, and you appear in its place.",
			toUni("4 / The Tree") + ". You gain the ability to cast the spell polymorph one time in the next 8 hours. The spell is different in the following ways. The duration is concentration, up to 1 minute. The new form can only be a treant.",
			toUni("5 / The Trickster") + ". You become the center of a zone of wild magic. For the next 8 hours, any spell cast within 30 feet of you has a 25% chance of being replaced by a wild magic surge. The caster rolls on the Sorcerer’s wild magic chart when this happens.",
			toUni("6 / The Bard") + ". Everything you say becomes indescribably funny for the next 8 hours. As an action, you may cast the spell hideous laughter with no somatic or material components.",
			toUni("7 / The Warrior") + ". The Fates have decided that you need to be tested. In every battle, there is a cumulative 10% chance that all of the enemies focus their attacks upon you until you are rendered unconscious. This effect ends when the enemies in the battle are defeated.",
			toUni("8 / The Centaur") + ". A centaur hero has been sent to make your life miserable. The centaur hero can cast transport via plants twice per day and it does not have disadvantage when attacking at long range. In every battle, there is a 50% chance that the centaur hero will show up on the second round at the maximum range of its longbow and fire arrows at you. It will attack you for 5 rounds and try to stay at maximum range during that time. At the end of 5 rounds, the centaur will escape by using transport via plants. This effect ends when the centaur hero is killed.",
			toUni("9 / The Queen") + ". Your Charisma and Wisdom scores increase by 4 for 8 hours.",
			toUni("10 / The Twins") + ". In every battle, there is a cumulative 10% chance that the enemy creature with the lowest CR is polymorphed into a cyclops. The polymorph effect lasts for one hour.",
			toUni("11 / The Ant") + ". Your size becomes Tiny for the next 8 hours. Everything you are wearing shrinks with you. Your Strength and Constitution scores are reduced by 6 to a minimum of 3. Your movement score is halved, rounded down. All of your weapon attacks have a base damage of 1. All of your spell ranges are halved, rounded down. Creatures have advantage to save against any abilities or spells that you use. You have advantage on Dexterity (Stealth) checks.",
			toUni("12 / The Dragon") + ". You gain a metallic dragon companion for 24 hours. Choose between brass, bronze, copper, or silver. The dragon is a wyrmling. If you already have a wyrmling (i.e. as an Oath of the Dragonlord paladin), then your wyrmling becomes a young dragon for 24 hours. If you have a young dragon, then your young dragon become an adult dragon for 24 hours.",
			toUni("13 / The Nymph") + ". Any armor, boots, cloaks, clothes, gloves, helms, or robes (magical or otherwise) that you are wearing vanish, leaving you naked. These items are returned to you by a nymph 24 hours later.",
			toUni("14 / The Spear") + ". Your Strength and Dexterity scores increase by 4 for 8 hours.",
			toUni("15 / The Chariot") + ". For 8 hours, you gain the ability to use a bonus action to take the Dash action.",
			toUni("16 / The Blacksmith") + ". You gain a +2 bonus to your Armor Class for 8 hours.",
			toUni("17 / The Titan") + ". You gain the ability to cast the spell polymorph one time in the next 8 hours. The spell is different in the following ways. The duration is concentration, up to 1 minute. The new form can only be a storm giant.",
			toUni("18 / The Dreamer") + ". Your nightmares become reality. Whenever you take a long rest, there is a 10% cumulative chance that you have a nightmare halfway through the rest. When this happens, a creature materializes before you and fights to the death. The creature is determined by your level. 1-4: harpy, 5-8: gorgon, 9-12: hydra, 13+: Cerberus. This effect ends when the nightmare creature is defeated.",
			toUni("19 / Empty") + ". The wheel vanishes, reappearing somewhere else in the world.",
			toUni("20 / The Swine") + ". Spin twice for the day."
		].join("\n \u2022 "),
	toNotesPage : [{
		name : "Constellations and Their Effects",
		note : [
			"I gain an effect based on the contellation the wheel lands on",
			"\n\n1d20\tCONSTELLATION\t1d20\tCONSTELLATION",
			"1\tThe Bear      \t11\tThe Ant",
			"2\tThe Gygan  \t12\tThe Dragon",
			"3\tThe Prisoner\t13\tThe Nymph",
			"4\tThe Tree      \t14\tThe Spear",
			"5\tThe Trickster\t15\tThe Chariot",
			"6\tThe Bard      \t16\tThe Blacksmith",
			"7\tThe Warrior\t17\tThe Titan",
			"8\tThe Centaur\t18\tThe Dreamer",
			"9\tThe Queen  \t19\tEmpty",
			"10\tThe Twins    \t20\tThe Swine",
			"\u2022 The Bear. My Constitution and Intelligence scores increase by 4 for 8 hours.",
			"\u2022 The Gygan. 10% chance for a gygan hero to appear in every battle and focus on killing me. Ends when it is defeated.",
			"\u2022 The Prisoner. I am banished to an extradimensional maze. I make a DC 15 Intelligence check to escape at the end of each day. I gain control of a celestial beast of CR equal to or less than my level until I free myself.",
			"\u2022 The Tree. I can cast polymorph once within the next 8 hours. The duration is concentration, up to 1 min. The new form can only be a treant.",
			"\u2022 The Trickster. Any spell cast within 30 ft of me has a 25% of being replaced by a wild magic surge.",
			"\u2022 The Bard. For the next 8 hours I can use an action to cast Tasha's Hideous Laughter without somatic or material components.",
			"\u2022 The Warrior. 10% chance every battle that all enemies attack me until I am unconscious. Ends when the enemies are defeated.",
			"\u2022 The Centaur. 50% chance for a centaur hero appear in every battle and attack me for 5 rounds. Ends when it is defeated.",
			"\u2022 The Queen. My Charisma and Wisdom scores increase by 4 for 8 hours.",
			"\u2022 The Twins. 10% chance every battle that the lowest CR enemy is polymorphed into a cyclops.",
			"\u2022 The Ant. My size becomes Tiny for 8 hours. Everything I am wearing shrinks with me. My Strength and Constitution scores are reduced by 6 (min 3). My movement and spell ranges are halved, rounded down. All of my weapon attacks have a base damage of 1. Creatures have advantage on saves from my spells and abilities. I have advantage on Stealth (Dexterity) checks.",
			"\u2022 The Dragon. I gain a metallic (brass, bronze, copper, silver) dragon wyrmling companion for 24 hours. If I already have one, then it becomes a young dragon for 24 hours. If I have a young dragon, then it becomes an adult dragon for 24 hours.",
			"\u2022 The Nymph. My armor, boots, cloaks, clothes, gloves, helm, and/or robes that I am wearing vanish. They are returned by a nymph 24 hours later.",
			"\u2022 The Spear. My Strength and Dexterity scores increase by 4 for 8 hours.",
			"\u2022 The Chariot. I can use a bonus action to take the Dash action for 8 hours.",
			"\u2022 The Blacksmith. I gain +2 AC for 8 hours.",
			"\u2022 The Titan. I can cast polymorph once within the next 8 hours. The duration is concentration, up to 1 min. The new form can only be a storm giant.",
			"\u2022 The Dreamer. 10% during a long rest that nightmare materializes halfway through and fights to the death. The creature that appears is based on my level. 1-4: harpy, 5-8: gorgon, 9-12: hydra, 13+: Cerberus. Ends when it is defeated.",
			"\u2022 Empty. The wheel vanishes, reappearing somewhere else in the world.",
			"\u2022 The Swine. I can spin the wheel twice for the day."
		]
	}]
};
// Magic items end

