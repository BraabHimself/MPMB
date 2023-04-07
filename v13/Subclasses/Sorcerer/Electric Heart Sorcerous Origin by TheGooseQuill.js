/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Electric Heart Sorcerous Origin by TheGoodQuill
	Effect:     Adds the Electric Heart as an option for a Sorcerer subclass
	Author:     u/TheGoodQuill
	Code by:	u/Newbuu2
	Date:		2023-04-06 (sheet v13.1.3)
*/

if (sheetVersion < 13001003) { throw "This script was made for a newer version of the sheet. Please use the latest version and try again.\nYou can get the latest version on www.flapkan.com."; };

var iFileName = "Electric Heart Sorcerous Origin by TheGoodQuill.js";

RequiredSheetVersion("13.1.3");

function spellCountByLevel(spellsSelected, spellLevel) {
    for(var spellIdx = 0; spellIdx < spellsSelected.length; spellIdx++) {
        if(spellsSelected[spellIdx].search(spellLevel) > 0) {
            return 1;
        }
    }

    return 0;
};

SourceList["GQ:EH"] = {
	name : "Electric Heart Sorcerous Origin",
	abbreviation : "GQ:EH",
	group : "Homebrew",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/12cztig/electric_heart_a_sorcerous_origin_guaranteed_to/",
    altUrl: "https://drive.google.com/file/d/1bV4l9rmKdvSaNnMpBgfo5PSBDGFT3SUp/view",
	date : "2023/04/05"
};

AddSubClass("sorcerer", "electric heart", {
	regExpSearch : /^((?=.*(sorcerer|witch))(?=.*(electric|lightning))|(?=.*electric)(?=.*heart)).*$/i,
	subname : "Electric Heart",
	fullname : "Electric Heart",
	source : [["GQ:EH", 1]],
	features : {
		"subclassfeature1" : {
			name : "Additional Spells",
			source : [["GQ:EH", 1]],
			minlevel : 1,
			description : desc([
				"At certain levels I learn new spells, they don't count against spells known",
                'Use the "Choose Feature" to select additional spells known'
			]),
            extraname : "Electric Heart Additional Spell",
            extrachoices : ["Shocking Grasp (0 level)", "Lightning Lure (0 level)", "Witch Bolt (1st level)", "Thunderwave (1st level)", "Shatter (2nd level)", "Hold Person (2nd level)", "Lightning Bolt (3rd level)", "Thunderstep (3rd level)", "Storm Sphere (4th level)", "Elemental Bane (4th level)", "Destructive Wave (5th level)", "Hold Monster (5th level)"],
            extraTimes : levels.map(function (n) {
                return (n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : 6);
            }),
            "shocking grasp (0 level)" : {
                name : "Shocking Grasp (0 level)",
                description : desc("I know the Shocking Grasp cantrip"),
                submenu : "[0 level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "0 level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Shocking Grasp (0 level)",
                    spells : ["shocking grasp"],
                    selection : ["shocking grasp"],
                    firstCol : "atwill"
                },
            },
            "lightning lure (0 level)" : {
                name : "Lightning Lure (0 level)",
                description : desc("I know the Lightning Lure cantrip"),
                submenu : "[0 level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "0 level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Lightning Lure (0 level)",
                    spells : ["lightning lure"],
                    selection : ["lightning lure"],
                    firstCol : "atwill"
                },
            },
            "witch bolt (1st level)" : {
                name : "Witch Bolt (1st level)",
                description : desc("I know the Witch Bolt spell"),
                submenu : "[1st level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "1st level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Witch Bolt (1st level)",
                    spells : ["witch bolt"],
                    selection : ["witch bolt"],
                },
            },
            "thunderwave (1st level)" : {
                name : "Thunderwave (1st level)",
                description : desc("I know the Thunderwave spell"),
                submenu : "[1st level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "1st level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Thunderwave (1st level)",
                    spells : ["thunderwave"],
                    selection : ["thunderwave"],
                },
            },
            "shatter (2nd level)" : {
                name : "Shatter (2nd level)",
                description : desc("I know the Shatter spell"),
                submenu : "[2nd level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "2nd level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Shatter (2nd level)",
                    spells : ["shatter"],
                    selection : ["shatter"],
                },
            },
            "hold person (2nd level)" : {
                name : "Hold Person (2nd level)",
                description : desc("I know the Hold Person spell"),
                submenu : "[2nd level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "2nd level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Hold Person (2nd level)",
                    spells : ["hold person"],
                    selection : ["hold person"],
                },
            },
            "lightning bolt (3rd level)" : {
                name : "Lightning Bolt (3rd level)",
                description : desc("I know the Lightning Bolt spell"),
                submenu : "[3rd level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "3rd level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Lightning Bolt (3rd level)",
                    spells : ["lightning bolt"],
                    selection : ["lightning bolt"],
                },
            },
            "thunderstep (3rd level)" : {
                name : "Thunderstep (3rd level)",
                description : desc("I know the Thunderstep spell"),
                submenu : "[3rd level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "3rd level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Thunderstep (3rd level)",
                    spells : ["thunderstep"],
                    selection : ["thunderstep"],
                },
            },
            "storm sphere (4th level)" : {
                name : "Storm Sphere (4th level)",
                description : desc("I know the Storm Sphere spell"),
                submenu : "[4th level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "4th level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Storm Sphere (4th level)",
                    spells : ["storm sphere"],
                    selection : ["storm sphere"],
                },
            },
            "elemental bane (4th level)" : {
                name : "Elemental Bane (4th level)",
                description : desc("I know the Elemental Bane spell"),
                submenu : "[4th level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "4th level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Elemental Bane (4th level)",
                    spells : ["elemental bane"],
                    selection : ["elemental bane"],
                },
            },
            "destructive wave (5th level)" : {
                name : "Destructive Wave (5th level)",
                description : desc("I know the Destructive Wave spell"),
                submenu : "[5th level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "5th level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Destructive Wave (5th level)",
                    spells : ["destructive wave"],
                    selection : ["destructive wave"],
                },
            },
            "hold monster (5th level)" : {
                name : "Hold Monster (5th level)",
                description : desc("I know the Hold Monster spell"),
                submenu : "[5th level; choose 1]",
				prereqeval : function(v) {
					return spellCountByLevel(GetFeatureChoice("classes", "sorcerer", "subclassfeature1", true), "5th level") == 0;
				},
                source : [["GQ:EH", 1]],
                spellcastingBonus : {
                    name : "Hold Monster (5th level)",
                    spells : ["hold monster"],
                    selection : ["hold monster"],
                },
            },
		},
		"subclassfeature1.1" : {
			name : "Sparkjump",
			source : [["GQ:EH", 2]],
			minlevel : 1,
			description : desc([
                "As a reaction when hit by an attack, I can teleport to a space I can see within 30 ft",
                "Enemies within 5 ft of my starting location take lightning damage equal to my level"
            ]),
			recovery : "long rest",
			usagescalc : "event.value = How('Proficiency Bonus');",
            usages : "Proficiency bonus per ",
            action : ["reaction", " (when hit)"]
		},
		"subclassfeature1.2" : {
			name : "Electromagnetism",
			source : [["GQ:EH", 2]],
			minlevel : 1,
			description : desc([
                "As an action, I can pull/push any metallic objects 20 lbs or less within a 15 ft radius",
                "Objects worn by a creature can't be manipulated in this way",
                "I gain proficiency in the Sleight of Hand skill"
            ]),
            skills : ["Sleight of Hand"],
            action: ["action", ""]
		},
		"subclassfeature6" : {
			name : "Amplifier",
			source : [["GQ:EH", 2]],
			minlevel : 6,
			description : desc([
                "Once per turn, I can target extra enemies when I deal lightning or thunder damage",
                "I can choose my prof bonus extra targets for a spell of 1st level or higher",
                "These targets must be within 5 ft of the original target; can't include original target",
                "They make a Con save or suffer half the damage dealt to the original target",
            ]),
		},
		"subclassfeature14" : {
			name : "Fusebreak",
			source : [["GQ:EH", 2]],
			minlevel : 14,
			description : desc([
                "Lightning and thunder damage I deal ignores resistances"
            ])
		},
		"subclassfeature18" : {
			name : "Electric Form",
			source : [["GQ:EH", 2]],
			minlevel : 18,
			description : desc([
                "As an action, I assume a form of pure electricity, gaining benefits 1 min:",
                "\u2022 I gain a flying speed equal to my walking speed and I can hover",
                "\u2022 I gain resistance to lightning and thunder damage",
                "\u2022 I gain resistance to nonmagical slashing/piercing/bludgeoning damage",
                "\u2022 I can cast the spare the dying cantrip",
                "I can do this once per long rest or by spending 7 sorcery points (SP)"
            ]),
            usages: 1,
            recovery: "long rest",
            altResource: "7 SP",
            action : ["action", ""]
		}
	}
});