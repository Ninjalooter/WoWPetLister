// Which Spells to ignore completly?
var gBlacklist = [
	/* spellIds */
	89520, 
	50869
];

// Text to show in the popup for a Pet / Mount
var gDescriptions = {
	100684: 'Hallo <b>Welt!</b> Mehr Infos gibt\'s in diesem <a target="_new" href="http://ninjalooter.de/meine-pets">diesem Artikel</a>.'
};

var gRaceHordeIds = {
	// HORDE
	ids: [92396, 92398, 101989, 95909,
	68056, 68056, 100333, 35020, 17463, 64656, 18990, 6654, 17464, 17450, 63642, 66091, 23509, 64659, 87090, 87091, 18992, 18989, 23249, 65641, 23248, 23247,
	18991, 17465, 35018, 66846, 23246, 63635, 34795, 16080, 17462, 22722, 16084, 63643, 12141, 23250, 65646, 23252, 35025, 35028, 35027, 23242, 23243, 33660, 65644, 65639,
	23251, 68056, 35022, 22718, 22721, 22724, 64658, 64977, 8395, 92232, 6653, 10796, 93644, 10799, 580, 64657, 65645, 74918, 16081, 63640, 23241,
	32244, 61230, 32245, 32243, 32296, 32296, 32297, 32246, 32295, 60119, 61467, 61469, 60116, 63641, 59797, 59793, 59788, 55531, 61447, 66088, 61997,
	62510, 62513, 62542, 62564, 63712, 62746, 93836, 68188],
	
	decorator_text: "<span class=\"horde\">HORDE</span>"
};

var gRaceAllianceIds = {
	// ALLIANCE
	ids: [92395, 92397, 101986, 95786,
	68187, 68057, 100332, 10969, 34406, 6899, 458, 63637, 17459, 63639, 17460, 10789, 66847, 8394, 10793, 90621, 35710, 6777, 35713, 35712, 35714, 65637,
	17453, 6648, 35711, 16082, 470, 63638, 63232, 66090, 10873, 472, 16083, 23238, 23221, 23222, 23239, 23225, 65638, 23227, 23219, 23338, 65643, 23223, 23240, 23229, 65640,
	68057, 23228, 48027, 22723, 22720, 16055, 22719, 17461, 22717, 68188, 92231, 23510, 65642, 17454, 16056, 15779, 6898, 68187, 63636, 17229,
	61229, 32235, 32242, 32290, 32292, 32289, 32239, 32240, 60118, 61465, 61470, 60114, 59799, 59791, 43956, 60424, 61425, 66087, 61996, 59785,
	62491, 62562, 62674, 62508, 62609, , 13548, 62516, 93837],
	
	decorator_text: "<span class=\"allianz\">ALLIANZ</span>"
};

var gDecoratorAndFilters = [
	gRaceHordeIds, // Only decorator, no filter
	gRaceAllianceIds, // Only decorator, no filter
	
	//Filter Kategorien
	{
		name: "Lootcard pets",
		ids: [68810, 49964, 40549, 93624, 96819, 96817, 45127, 30156, 45125, 68767,
		51412, 65917, 74918, 42777, 42776, 97581, 30174, 46197, 46199, 93623, 96503, 74856],
		
		filter_element_id: "#filter_lootcards",
		decorator_text: "Trading Card Game"
	},

	{
		name: "Blizzard Collectables (Pets)",
		ids: [62456, 66030, 87344, 24988, 17708, 17707, 17709, 78381, 53082, 24696, 32298, 94070, 52615,
		43599, 75973, 101606],
		
		filter_element_id: "#filter_blizzcoll",
		decorator_text: "Blizzard Collectable"
	},

	{
		name: "Blizzard Shop (Pets)",
		ids: [69541, 99578, 69677, 95787, 69452, 75906, 95786, 69535, 68619, 69536,
		75614, 98727, 95909],
		
		filter_element_id: "#filter_blizzshop",
		decorator_text: "Blizzard Shop"
	},

	{
		name: "Limited Edition (Pets und Mounts)",
		ids: [61855, 54187, 48408, 45174, 45175, 27241, 66520, 23531, 23530, 40405, 55068, 69002, 48406, 51851, 65682, 28505, 64351,
		68187, 68056, 68057, 68056, 43688, 24252, 24242, 26656, 49322, 43899, 37015, 44744, 49193, 58615, 64927, 65439, 67336, 71810, 60021, 59976,
		58983, 16082, 16083, 15779, 16055, 16056, 17459, 17460, 17461, 68188, 17450, 64656, 16084, 16081, 16080],
		
		filter_element_id: "#filter_limited",
		decorator_text: "Limited Edition"
	},

	{
		name: "Class Mounts/Klassenmounts",
		ids: [5784, 13819, 23161, 23214, 34767, 34769, 66906, 66907, 73629, 73630, 54729, 69820, 69826, 48778, 36702],
		
		filter_element_id: "#filter_classmounts",
		decorator_text: "Klassenmount"
	},

	//Argentumturnier, Feiertage, Events
		{
		name: "Argent Tournament/Argentumturnier",
		ids: [63844, 66087, 66906, 66088, 67466, 63635, 63637, 63639, 63643, 63638, 63636, 63640, 66090, 63642, 63232, 63641, 65641, 66091, 65637, 65646, 65640, 65638,
		65644, 65639, 65643, 65642, 65645, 62609,
		62562, 62508, 62513, 62516, 62564, 62674, 62542, 63712, 66096, 66096, 62491, 62510, 62746],
		
		decorator_text: "Argentumturnier"
	},

		{
		name: "Event/Feiertage",
		ids: [49379, 71342, 48025, 43900,
		26045, 26529, 26533, 26541, 27570, 28738, 28739, 28740, 28871, 39709, 40613, 40614, 40634, 42609, 44369, 61725, 61773, 65381, 65382, 71840, 74932, 93817,
		98079, 23811, 100330, 100684],
		
		decorator_text: "Event/Feiertage"
	},

	//Berufe
		{
		name: "Engineering/Ingenieurskunst",
		ids: [15048, 15049, 19772, 26010, 81937, 82173, 44151, 44153, 55531, 60424, 4055],
		
		decorator_text: "Ingenieurskunst"
	},

	{
		name: "Tailoring/Schneiderei",
		ids: [61309, 61451, 75596],
		
		decorator_text: "Schneiderei"
	},
	
	{
		name: "Enchanting/Verzauberkunst",
		ids: [93836, 93837],
		
		decorator_text: "Verzauberkunst"
	},
	
	{
		name: "Mining/Bergbau",
		ids: [93838],
		
		decorator_text: "Bergbau"
	},
	
	{
		name: "Alchemy/Alchemie",
		ids: [93326],
		
		decorator_text: "Alchemie"
	},
	
		{
		name: "Archeology/Archäologie",
		ids: [84263, 84752, 90523, 98571, 98587, 84751, 92155],
		
		decorator_text: "Archäologie"
	},
	
		{
		name: "Fishing/Angeln",
		ids: [46425, 46426, 62561, 43697, 43698, 64731, 33050, 59250],
		
		decorator_text: "Angeln"
	},
	
	//Dungeons, Raids, Erfolge, Ruf
		{
		name: "Dungeon/Raid",
		ids: [101542, 98204, 97493, 96499, 96491, 88746, 88744, 88742, 72286, 69395, 63796, 59996, 59650, 59571, 59567, 41252, 40192, 17481, 26054, 25953, 26055, 26056,
		59569, 43918, 46599, 15999, 16450, 61465, 61467],
		
		decorator_text: "Dungeon/Raid"
	},

		{
		name: "Achievement",
		ids: [97560, 88335, 88331, 72807, 63956, 61997, 61996, 59961, 60024, 60025, 63963, 72808, 88990, 97359,
		84492, 89039, 100576, 40990, 61472, 61991, 70613, 89670, 100970, 101424, 75613, 60118, 60119],
		
		decorator_text: "Achievement"
	},

		{
		name: "Reputation/Ruf",
		ids: [88748, 88749, 39798, 39800, 39801, 39802, 39803, 41513, 41514, 41515, 41516, 41517, 41518, 43927, 59570, 61294, 88741,
		89472, 99663, 99668, 45082, 51716, 61348, 61349, 61350, 61351, 61357, 34896, 34897, 34898, 34899, 39315, 39317, 39318, 39319, 90621, 92231, 92232, 93644],
		
		decorator_text: "Ruf"
	},

		{
		name: "PvP",
		ids: [63318, 75936, 34790, 39316, 59785, 101282, 22717, 22719, 22720, 22723, 23510, 48027, 22718, 35028, 59788, 100333, 23509, 22724, 22722, 22721, 100332],
		
		decorator_text: "PvP"
	},
	
	//Quests, Drop, Händler
	{
		name: "Quest",
		ids: [12243, 13548, 39181, 65046, 78683, 78685, 93813, 93823, 96571, 97779, 73313, 75207, 17229, 64659, 101986, 101989],
		
		decorator_text: "Quest"
	},

	{
		name: "Drop",
		ids: [10682, 10695, 10696, 10697, 10698, 15067, 25162, 36034, 67415, 67420, 90637, 91343, 93739, 10675, 54753, 59568, 60002, 88718, 88750, 98718, 67414, 46628],
		
		decorator_text: "Drop"
	},

	{
		name: "Merchant/H&auml;ndler",
		ids: [10673, 10674, 10676, 10677, 10678, 10679, 10680, 10683, 10684, 10685, 10688, 10703, 10704, 10706, 10707, 10711, 10713, 10714, 10716, 10717, 10709, 35156,
		35239, 35907, 35909, 35910, 35911, 36027, 36028, 36029, 36031, 53316, 65046, 65358, 75134, 92395, 92396, 92397, 92398, 97638, 59791, 59799, 60114, 61229, 61425, 61470, 90621,
		92231, 6777, 6898, 6899, 8394, 10789, 10793, 10873, 10969, 17453, 17454, 23219, 23222, 23223, 23225, 23238, 23239, 23240, 23338, 32235, 32239, 32240, 32242, 32290, 32292, 34406, 35710,
		35714, 35711, 35712, 35713, 458, 470, 472, 6648, 23227, 23228, 23229, 66847, 580, 6653, 6654, 8395, 10796, 10799, 17462, 17463, 17464, 17465, 18989, 18990,
		18991, 18992, 23241, 23242, 23243, 23246, 23247, 23248, 23249, 23250, 23251, 23252, 32243, 32244, 32245, 32295, 32296, 32297, 33660, 34795, 35018, 35020, 35022, 35025, 59793,
		59797, 60116, 61230, 61447, 61469, 64657, 64658, 64977, 92232, 66846, 35027, 23221, 87090, 87091],
		
		decorator_text: "H&auml;ndler"
	},
	
	//Unbekannte Herkunft
	{
		name: "Unknown",
		ids: [89931, 89929, 89930, 93815, 93818, 87863, 93461,
		32345, 97501],
		
		decorator_text: "Herkunft bisher unbekannt"
	},
	
	//Guides
		{
		name: "Graues Reitkamel",
		ids: [88750],
		
		decorator_text: "<a class=\"guide\" href=\"http://ninjalooter.de/15016/wow-dormus-und-das-graue-reitkamel/\">[Guide]</a>"
	},
	
		{
		name: "Katzenfamiliar, Unheimliche Kiste und Kopfloser Reiter",
		ids: [100330, 100684, 48025],
		
		decorator_text: "<a class=\"guide\" href=\"http://ninjalooter.de/25882/wow-schlotternachte-guide-2011-gruselstunde-in-azeroth/\">[Guide]</a>"
	},
	
		{
		name: "Klein Tarecgosa",
		ids: [100576],
		
		decorator_text: "<a class=\"guide\" href=\"http://ninjalooter.de/20564/wow-how-to-dragonwrath-die-komplette-quest-reihe-rund-um-drachenzorn/\">[Guide]</a>"
	},
	
		{
		name: "Sandsteindrache - Phiole der Sande",
		ids: [93326],
		
		decorator_text: "<a class=\"guide\" href=\"http://ninjalooter.de/15039/wow-phiole-der-sande-nun-fur-alle-helden-azeroths/\">[Guide]</a>"
	},
	
	{
		name: "Wächterjunges",
		ids: [98736],
		
		decorator_text: "<a class=\"guide\" href=\"http://ninjalooter.de/26994/wow-handelbares-wachterjunges-mischt-azeroths-auktionshauser-auf/\">[Guide]</a>"
	},
	
	//BlizzCon
	{
		name: "BlizzCon 2005",
		ids: [24696],
		
		decorator_text: "BlizzCon 2005"
	},
	
	{
		name: "BlizzCon 2008",
		ids: [58983],
		
		decorator_text: "BlizzCon 2008"
	},
	
	{
		name: "BlizzCon 2009",
		ids: [66030],
		
		decorator_text: "BlizzCon 2009"
	},
	
		{
		name: "BlizzCon 2010",
		ids: [94070],
		
		decorator_text: "BlizzCon 2010"
	},
	
		{
		name: "BlizzCon 2011",
		ids: [101606],
		
		decorator_text: "BlizzCon 2011"
	},

	// IDs von Mounts, die nicht dauerhaft erlernbar sind: 50869, 89520

	{
		name: "Last patch (4.2)",
		ids: [101986, 101989, 99663, 99668, 45890, 100970, 101424, 75613, 100576,
		100332, 100333, 101542, 97560, 97493, 101282],
		decorator_text: "<span class=\"newpatch\">Patch 4.2</span>"
	}
];
