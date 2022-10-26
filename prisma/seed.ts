import { PrismaClient, Prisma, Brand, Category, Product } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

//TODO: make buying stuff decrease stock
//TODO: prevent adding more than in stock by clicking add to cart from product page when already at max in cart
const createHandle = (str: string): string =>
	str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9 \s]/gi, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

async function createBrand(name: string): Promise<Brand> {
	return await prisma.brand.create({
		data: {
			name,
			nameLower: name.toLowerCase(),
		},
	});
}

async function createCategory(name: string): Promise<Category> {
	return await prisma.category.create({
		data: {
			name,
			nameLower: name.toLowerCase(),
		},
	});
}

async function createProduct(
	name: string,
	images: string[],
	price: number,
	size: string,
	color: string,
	description: string,
	details: string[],
	brand: Brand,
	category: Category
): Promise<Product> {
	return await prisma.product.create({
		data: {
			name,
			nameLower: name.toLowerCase(),
			handle: createHandle(name),
			price,
			images,
			size,
			color,
			description,
			details,
			quantity: Math.floor(Math.random() * 21),
			brand: { connect: { id: brand.id } },
			category: { connect: { id: category.id } },
		},
	});
}

async function main() {
	const almostBrand: Brand = await createBrand('Almost');
	const andaleBrand: Brand = await createBrand('Andale');
	const antiHeroBrand: Brand = await createBrand('Anti Hero');
	const bakerBrand: Brand = await createBrand('Baker');
	const blindBrand: Brand = await createBrand('Blind');
	const bonesBrand: Brand = await createBrand('Bones');
	const bronsonBrand: Brand = await createBrand('Bronson');
	const chocolateBrand: Brand = await createBrand('Chocolate');
	const cortinaBrand: Brand = await createBrand('Cortina');
	const darkroomBrand: Brand = await createBrand('Darkroom');
	const deathwishBrand: Brand = await createBrand('Deathwish');
	const dgkBrand: Brand = await createBrand('DGK');
	const diamondBrand: Brand = await createBrand('Diamond Supply Co.');
	const elementBrand: Brand = await createBrand('Element');
	const girlBrand: Brand = await createBrand('Girl');
	const grizzlyBrand: Brand = await createBrand('Grizzly');
	const enjoiBrand: Brand = await createBrand('Enjoi');
	const flipBrand: Brand = await createBrand('Flip');
	const fiveBoroBrand: Brand = await createBrand('5Boro');
	const foundationBrand: Brand = await createBrand('Foundation');
	const herschelBrand: Brand = await createBrand('Herschel');
	const hufBrand: Brand = await createBrand('Huf');
	const independentBrand: Brand = await createBrand('Independent');
	const jessupBrand: Brand = await createBrand('Jessup');
	const krookedBrand: Brand = await createBrand('Krooked');
	const kruxBrand: Brand = await createBrand('Krux');
	const mercerBrand: Brand = await createBrand('Mercer');
	const mobBrand: Brand = await createBrand('Mob');
	const nikeSbBrand: Brand = await createBrand('Nike SB');
	const nixonBrand: Brand = await createBrand('Nixon');
	const oathBrand: Brand = await createBrand('Oath');
	const obeyBrand: Brand = await createBrand('Obey');
	const ojBrand: Brand = await createBrand('OJ');
	const orbsBrand: Brand = await createBrand('Orbs');
	const polerBrand: Brand = await createBrand('Poler');
	const primitiveBrand: Brand = await createBrand('Primitive');
	const realBrand: Brand = await createBrand('Real');
	const rictaBrand: Brand = await createBrand('Ricta');
	const rushBrand: Brand = await createBrand('Rush');
	const rvcaBrand: Brand = await createBrand('RVCA');
	const santaCruzBrand: Brand = await createBrand('Santa Cruz');
	const shakeJuntBrand: Brand = await createBrand('Shake Junt');
	const silverBrand: Brand = await createBrand('Silver');
	const sk8mafiaBrand: Brand = await createBrand('Sk8mafia');
	const spitfireBrand: Brand = await createBrand('Spitfire');
	const tensorBrand: Brand = await createBrand('Tensor');
	const thunderBrand: Brand = await createBrand('Thunder');
	const torroBrand: Brand = await createBrand('Torro');
	const toyMachineBrand: Brand = await createBrand('Toy Machine');
	const ventureBrand: Brand = await createBrand('Venture');
	const zeroBrand: Brand = await createBrand('Zero');

	const decksCategory: Category = await createCategory('Decks');
	const wheelsCategory: Category = await createCategory('Wheels');
	const trucksCategory: Category = await createCategory('Trucks');
	const bearingsCategory: Category = await createCategory('Bearings');
	const hardwareCategory: Category = await createCategory('Hardware');
	const griptapeCategory: Category = await createCategory('Griptape');
	const waxCategory: Category = await createCategory('Wax');
	const toolsCategory: Category = await createCategory('Tools');
	const backpacksCategory: Category = await createCategory('Backpacks');

	// Decks
	await createProduct(
		'DGK Tuner Lenticular 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Tuner-Lenticular-8.0%22-Skateboard-Deck-_361844-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Tuner-Lenticular-8.0%22-Skateboard-Deck-_361844-back-US.jpg',
		],
		8495,
		'8.0',
		'MULTI',
		'From DGK comes the Tuner Lenticular skateboard deck measuring 8.0" wide by 31.75" long. Graphics of classic JDM cars can be seen on the bottom ply, which move closer when viewed at different angles. With a 7-ply maple construction and a medium concave, the Lenticular DGK deck is finished with additional branding on the top ply.',
		[
			'Tuner Lenticular 8.25" Skateboard Deck from DGK.',
			'Lenticular graphic on bottom ply.',
			'7-ply maple construction.',
			'Medium concave.',
			'Pitched nose and kicktails.',
			'Width: 8.0".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Baker Reynolds Sketch Brand Logo 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Reynolds-Sketch-Brand-Logo-8.25%22-Skateboard-Deck-_357387-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Reynolds-Sketch-Brand-Logo-8.25%22-Skateboard-Deck-_357387-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		'Baker presents the Reynolds Sketch Brand Logo 8.25" skateboard deck, Andrew Reynolds\' official pro model. This deck has an 8.25" width by 31.875" length and a graphic of the classic Baker box lettering logo along with a variety of sketches of people and animals.',
		[
			'Reynolds Sketch Brand Logo 8.25" Skateboard Deck from Baker.',
			'Official Andrew Reynolds pro model.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Mild pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.875".',
			'Wheelbase: 14.25".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Baker Sylla Sketch Brand name 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Sylla-Sketch-Brand-name-8.38%22-Skateboard-Deck-_357388-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Sylla-Sketch-Brand-name-8.38%22-Skateboard-Deck-_357388-back-US.jpg',
		],
		7195,
		'8.38',
		'MULTI',
		'Skate with one of the skateboarding\'s best and brightest with the pro model from Kader Sylla. This Baker Sketch Brand Logo skateboard deck has an 8.38" width by 32" length and features the classic Baker box lettering logo and a series of sketches of people.',
		[
			'Sylla Sketch Brand Logo 8.38" Skateboard Deck from Baker.',
			'Official Kader Sylla pro model.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Mild pitched kick tails.',
			'Width: 8.38".',
			'Length: 32".',
			'Wheelbase: 14.5".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Baker Brand Logo Black & White 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-Black-%26-White-8.25%22-Skateboard-Deck-_334230-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-Black-%26-White-8.25%22-Skateboard-Deck-_334230-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		'Watch eyes widen and jaws start to drop as you full send some crazy flip tricks on the Brand Logo black and white 8.25" skateboard deck from Baker. This 7-ply maple deck comes with a mellow concave for a stable landing zone and has some nice moderately pitched kick tails for some serious pop and lift off on those ollies. Featuring the classic Baker logo in black and white, this deck provides a splash of authentic branding that\'ll bring your current skate setup to life.',
		[
			'Brand Logo Black & White 8.25" Skateboard Deck from Baker.',
			'Black and white brand logo on bottom.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Moderate pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.875".',
			'Wheelbase: 14.25".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Baker White Brand Logo 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-White-Brand-Logo-8.25%22-Skateboard-Deck-_356011-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-White-Brand-Logo-8.25%22-Skateboard-Deck-_356011-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		"Blend some statement-making branding into your next build with Baker's White Logo 8.25\" skateboard deck! Wide enough for larger-footed, wider-stanced riders to stand comfortably, the board's 8.25\" width and mellow concave keep it stable and cruise-friendly, while the wide, pitched ends provide plenty of pop. Baker's logo sits at the board's bottom ply, spelled out in blocky white lettering, lending the board a splash of not-so-subtle skate-infused style.",
		[
			'White Brand Logo 8.25" Skateboard Deck from Baker.',
			'Signature Bryan Herman pro model.',
			'Baker logo graphics on bottom ply.',
			'7-ply maple construction.',
			'Mild concave profile.',
			'Mild pitched kick tails.',
			'Width: 8.2".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Baker Brand Logo White & Red 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-White-%26-Red-8.0%22-Skateboard-Deck-_320197-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-White-%26-Red-8.0%22-Skateboard-Deck-_320197-back-US.jpg',
		],
		6995,
		'8.0',
		'MULTI',
		'Beef up your flip trick repertoire with a Baker Brand Logo White & Red 8.0" Skateboard Deck. Lightweight and lively, this deck comes with a short and wide tail for quick pop and an elongated and steeper nose for premium catches and improved nollies. Finished off with moderate concave throughout for additional flick strength on flip tricks, this deck is ready to add rotations to all your favorite tricks.',
		[
			'Brand Logo White & Red 8.0" Skateboard Deck from Baker Skateboards.',
			'7-ply maple construction.',
			'Mellow concave and wheel well depth.',
			'Mellow, short and heavily tapered tail with an elongated and wider nose.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'DGK Vaughn Tuner 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Vaughn-Tuner-8.0%22-Skateboard-Deck-_340480-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Vaughn-Tuner-8.0%22-Skateboard-Deck-_340480-back-US.jpg',
		],
		6495,
		'8.0',
		'MULTI',
		'Satisfy your need for speed with the Vaughn Tuner 8.0" skateboard deck! This deck from DGK combines elements of street racing with traditional skateboard steez, with a graphic of a stock car gracing the bottom of the deck accompanied by Dane Vaughn\'s name for some pro-inspired cred. With an 8.0" width keeping things optimal for all kinds of skating and a 7-ply construction with pitched ends lending the board lots of pop, this deck is sure to kick ass and take names in any build.',
		[
			'Vaughn Tuner 8.0" Skateboard Deck from DGK.',
			'Signature Dane Vaughn pro model.',
			'7-ply maple construction.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Real Classic Oval 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Classic-Oval-8.5%22-Skateboard-Deck-_342287-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Classic-Oval-8.5%22-Skateboard-Deck-_342287-back-US.jpg',
		],
		6495,
		'8.5',
		'MULTI',
		'Shred with the best of \'em on the Classic Oval 8.5" skateboard deck from Real! The thick 8.5" width lends you ample landing space for your tricks and prime positioning for your feet, while the deck\'s moderate concave provides prime flick for your flip tricks. The stubby, pitched nose and tail keep things primed for popping ollies, while the Real Skateboards logo on the bottom ply lends a splash of branded steez to any setup.',
		[
			'Classic Oval 8.5" Skateboard Deck from Real Skateboards.',
			"Real's Full Construction: Plus sized shape for more board feel, control and stability.",
			'7-ply maple construction.',
			'Width: 8.5".',
			'Length: 32.5".',
			'Wheelbase: 14.5".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'DGK Kalis Tuner 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Kalis-Tuner-8.25%22-Skateboard-Deck-_340022-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Kalis-Tuner-8.25%22-Skateboard-Deck-_340022-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Kalis-Tuner-8.25%22-Skateboard-Deck-_340022-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Kalis-Tuner-8.25%22-Skateboard-Deck-_340022-alt5-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'Turn your setup into a hot rod with the Kalis Tuner 8.25" skateboard deck from DGK!The 8.25" width and medium concave keep this deck versatile, and perfect for all types of skating, while the graphic of a sleek-looking race car, with stylized script surrounding it (as well as pro skateboarder Josh Kalis\'s name at the nose for a splash of professional cred) will let you give your current setup the tune-up it needs.',
		[
			'Kalis Tuner 8.25" Skateboard Deck from DGK.',
			'Signature Josh Kalis pro model.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.25".',
			'Length: 32.25".',
			'Wheelbase: 14.5".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Blind Mix Master Reaper 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Blind-Mix-Master-Reaper-8.5%22-Skateboard-Deck-_331509-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Blind-Mix-Master-Reaper-8.5%22-Skateboard-Deck-_331509-back-US.jpg',
		],
		4995,
		'8.5',
		'MULTI',
		'Throw some dope style into your skate collection with Blind\'s Mix Master Reaper 8.5" skateboard deck! A Grim Reaper DJ appears across the bottom graphic, manning a ton of turntables, giving this deck some seriously loud style.',
		[
			'Mix Master Reaper 8.5" Skateboard Deck from Blind.',
			'Medium concave, medium wheel wells.',
			'7-ply maple construction with single deck press and epoxy glue resin.',
			'Width: 8.5".',
			'Length: 32.3".',
			'Wheelbase: 14.5".',
		],
		blindBrand,
		decksCategory
	);
	await createProduct(
		'Real Classic Oval 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Classic-Oval-8.25%22-Skateboard-Deck-_342286-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Classic-Oval-8.25%22-Skateboard-Deck-_342286-back-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'Get buck or go broke with Real\'s Classic Oval 8.25" skateboard deck! With a width that both flips like a dream and cruises effortlessly and a moderate concave for added agility, this deck can conquer parks and streets with equal ease, while the Real oval logo at the bottom ply ensures your setup stays plenty steezy.',
		[
			'Classic Oval 8.25" Skateboard Deck from Real.',
			"Graphic of Real's classic oval logo on bottom ply.",
			'Full shape, with even width throughout with tapered nose and tail.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.25".',
			'Length: 32.5".',
			'Wheelbase: 14.5".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'DGK Shanahan Tuner 8.06" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Shanahan-Tuner-8.06%22-Skateboard-Deck-_354868-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Shanahan-Tuner-8.06%22-Skateboard-Deck-_354868-back-US.jpg',
		],
		6495,
		'8.06',
		'MULTI',
		"Satiate your need for speed on DGK's Shanahan Tuner 8.06\" skateboard deck! With a middle-of-the road width and a graphic of a silver stock car on the bottom ply, set against stylized racing-inspired graphics and accompanied by John Shanahan's name, this deck will blend a slick, swift element into any board you build.",
		[
			'Shanahan Tuner 8.06" Skateboard Deck from DGK.',
			'Signature John Shanahan pro model.',
			'Racing car graphics on bottom ply.',
			'7-ply construction.',
			'Steep concave.',
			'Pitched ends.',
			'Width: 8.06".',
			'Length: 31.5".',
			'Wheelbase: 14.5".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Baker White Brand Logo 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-White-Brand-Logo-8.5%22-Skateboard-Deck-_357385-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-White-Brand-Logo-8.5%22-Skateboard-Deck-_357385-back-US.jpg',
		],
		7195,
		'8.5',
		'MULTI',
		'This Baker White Brand Logo 8.5" skateboard deck has an 8.5" width by a 32" length and has a bottom ply of their wholly recognizable block lettering Baker logo.',
		[
			'White Brand Logo 8.5" Skateboard Deck from Baker.',
			'Baker logo graphics on bottom ply.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Mild pitched kick tails.',
			'Width: 8.5".',
			'Length: 32".',
			'Wheelbase: 14.5".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Krooked Cromer Happy 8.12" Skateboard Deck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Cromer-Happy-8.12%22-Skateboard-Deck-_364577-front-US.jpg'],
		6595,
		'8.125',
		'MULTI',
		'The Krooked Cromer Happy skateboard deck measures 8.12" wide by 32" long, featuring a green bottom ply decorated with a graphic designed by Mark Gonzales; with two friendly figures saying "I\'m happy." The Brad Cromer pro model deck is made from durable 7-ply maple and is finished with a medium concave.',
		[
			'Cromer Statue 8.12" Skateboard Deck from Krooked.',
			'Signature Brad Cromer pro model.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.12".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		krookedBrand,
		decksCategory
	);
	await createProduct(
		'Real Mason Cathedral II 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Mason-Cathedral-II-8.5%22-Skateboard-Deck-_358455-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Mason-Cathedral-II-8.5%22-Skateboard-Deck-_358455-back-US.jpg',
		],
		6795,
		'8.5',
		'MULTI',
		'Mason Silva\'s pro model Real skateboard deck, the Cathedral II, has an 8.5" width by 31.8" length and a full white dip. This Mason Silva skateboard has a stained glass graphic of birds, complete with a shimmering effect.',
		[
			'Mason Cathedral II 8.5" Skateboard Deck from Real.',
			'Signature Mason Silva pro model.',
			'Full shape, with even width throughout with tapered nose and tail.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.5".',
			'Length: 31.8".',
			'Wheelbase: 14.25".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Zero Blood Skull 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Blood-Skull-8.25%22-Skateboard-Deck-_353508-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Blood-Skull-8.25%22-Skateboard-Deck-_353508-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'Go rip with Zero\'s Blood Skull 8.25" skateboard deck! This deck is 8.25" wide by 31.5" long, and has a graphic of a bloody skull and Zero script against a black background.',
		[
			'Blood Skull 8.25" Skateboard Deck from Zero.',
			'Moderate concave depth.',
			'7-ply maple construction.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		zeroBrand,
		decksCategory
	);
	await createProduct(
		'Real Linthell Cathedral 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Linthell-Cathedral-8.25%22-Skateboard-Deck-_363700-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Linthell-Cathedral-8.25%22-Skateboard-Deck-_363700-back-US.jpg',
		],
		6795,
		'8.25',
		'MULTI',
		'The Cathedral Real skateboard deck is a Harry Linthell pro model that comes in an 8.25" by 31.75" construction with a bottom ply graphic of butterflies flying in a faux stained glass design.',
		[
			'Linthell Cathedral 8.25" Skateboard Deck from Real.',
			'Signature Harry Linthell pro model.',
			"Graphic of stained glass on board's bottom ply.",
			'Medium-deep concave.',
			'7-ply maple construction.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.12".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Primitive Nuevo Script Teal 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Nuevo-Script-Teal-8.25%22-Skateboard-Deck-_356050-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Nuevo-Script-Teal-8.25%22-Skateboard-Deck-_356050-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'Skate like the most elite team in skateboarding with Primitive\'s Nuevo Script Teal 8.25" skateboard deck! This deck is 8.25" wide by 31.915" long. The bottom ply is teal with white Primitive script.',
		[
			'Nuevo Script Teal 8.25" Skateboard Deck from Primitive.',
			'Teal colorway with Primitive script on bottom ply.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Medium and wide kicktails with a slightly elongated and steeper nose.',
			'Width: 8.25".',
			'Length: 31.915".',
			'Wheelbase: 14.0".',
		],
		primitiveBrand,
		decksCategory
	);
	await createProduct(
		'Blind Miss Munchies 8.25" Skateboard Deck ',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Blind-Miss-Munchies-8.25%22-Skateboard-Deck--_296663-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Blind-Miss-Munchies-8.25%22-Skateboard-Deck--_296663-back-US.jpg',
		],
		4995,
		'8.25',
		'MULTI',
		'Bring pop back to your flip tricks with Blind Skateboard\'s Miss Munchies 8.25" Skateboard Deck. Draped with a sultry graphic depicting a blonde woman sitting upon a pile of marijuana leaves with a pile of junk food in the background.',
		[
			'Miss Munchies 8.25" Skateboard Deck from Blind.',
			'Medium concave.',
			'Epoxy resin single deck press mold.',
			'7-ply hybrid maple construction.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.25".',
		],
		blindBrand,
		decksCategory
	);
	await createProduct(
		'DGK Sunshine 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Sunshine-8.25%22-Skateboard-Deck-_347265-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Sunshine-8.25%22-Skateboard-Deck-_347265-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		"Get wild in psychedelic style with DGK's Sunshine 8.25\" skateboard deck! The mild, pitched ends and mellow concave ensure the deck can keep up with intense trick lines and easy cruising alike, while the 7-ply construction bolsters the board, helping it withstand heavy hits and hard landings. Imagery of a smiling sun with dollar signs for eyes sits at the board's bottom ply, grinning down at a dripping purple mushroom and a pair of nude, green-skinned girls below, lending the board some striking au-naturel detailing.",
		[
			'Sunshine 8.25" Skateboard Deck from DGK.',
			'Graphic of a smiling sun, dripping mushroom, and two nude people on bottom ply.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.25".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Krooked Cromer Pantone 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Cromer-Pantone-8.25%22-Skateboard-Deck-_350957-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Cromer-Pantone-8.25%22-Skateboard-Deck-_350957-back-US.jpg',
		],
		6595,
		'8.25',
		'MULTI',
		'Add some playfulness to the bottom of your feet with Krooked\'s Cromer Pantone 8.25" skateboard deck. The painting-style graphic for smooth operator Brad Cromer\'s pro model deck features a pantone color wheel surrounded by Mark Gonzalez\'s signature characters and blurbs. With an 8.25" width and 14.38" wheelbase, you can be assured that this board will operate accordingly so you can hit the streets and hone your skills.',
		[
			'Cromer Pantone 8.25" Skateboard Deck from Krooked.',
			'Brad Cromer signature pro model graphic.',
			'Width: 8.25".',
			'Length: 32".',
			'Wheelbase: 14.38".',
		],
		krookedBrand,
		decksCategory
	);
	await createProduct(
		'Zero 3 Skull Blood Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-3-Skull-Blood-Skateboard-Deck-_343524-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-3-Skull-Blood-Skateboard-Deck-_343524-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'Pick up some macabre style for your skate collection with the 3 Skull Blood skateboard deck from Zero! Three of the classic Skull logos appear at the bottom graphic, with blood dripping throughout for some added spookiness. With a ton of awesome skate-inspired style, this deck will look great at the park or your living room wall.',
		[
			'3 Skull Blood Skateboard Deck from Zero Skateboards.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.25".',
			'Length: 32.0".',
			'Wheelbase: 14.25".',
		],
		zeroBrand,
		decksCategory
	);
	await createProduct(
		'Girl x Sanrio Bannerot Tokyo Speed 8.25" Skateboard deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Bannerot-Tokyo-Speed-8.25%22-Skateboard-deck-_352344-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Bannerot-Tokyo-Speed-8.25%22-Skateboard-deck-_352344-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'Skate like one of Seattle\'s finest with the Bannerot Tokyo Speed 8.25" skateboard deck from Girl x Sanrio! With an 8.25" width and 31.75" length, this board is truly faultless. The bottom ply has a yellow background with kawaii-inspired graphics throughout, and has, in replacement of the classic Girl logo, Tuxedo Sam in the center.',
		[
			'Bannerot Tokyo Speed 8.25" Skateboard Deck from Girl x Sanrio.',
			'Official Girl and Sanrio collaboration.',
			'Signature Simon Bannerot pro model.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched and wide kick tails with a steeper nose than tail.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.0".',
		],
		girlBrand,
		decksCategory
	);
	await createProduct(
		'Krooked Gonz 1986 8.5" Skateboard Deck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Gonz-1986-8.5%22-Skateboard-Deck-_364578-front-US.jpg'],
		6795,
		'8.5',
		'MULTI',
		'The Gonz 1986 skateboard deck from Krooked measures 8.5" wide by 31.8" long, with a 14.25" wheelbase. Artwork by Mark Gonzales is featured on the red bottom ply, depicting yellow and blue "angel" charactersand text reading "Live 1986 all over again." Made from 7-ply maple, the Krooked skateboard deck is complete with a medium concave.',
		['Gonz 1986 8.5" Skateboard Deck from Krooked.', 'Graphic on bottom ply.', 'Width: 8.5".', 'Length: 31.8".', 'Wheelbase: 14.25".'],
		krookedBrand,
		decksCategory
	);
	await createProduct(
		'Real Zion Cathedral 8.25" Skateboard Deck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Zion-Cathedral-8.25%22-Skateboard-Deck-_364568-front-US.jpg'],
		6795,
		'8.25',
		'MULTI',
		'The Cathedral skateboard deck from Real is a Zion Wright that comes in an 8.28" by 31.7" construction with a bottom ply graphic boasting stained glass flamingos wading in the water.',
		[
			'Zion Cathedral 8.25" Skateboard Deck from Real.',
			'Signature Zion Wright pro model.',
			'Full shape, with even width throughout with tapered nose and tail.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.25".',
			'Length: 31.7".',
			'Wheelbase: 14.12".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Real Ishod Cathedral 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Ishod-Cathedral-8.38%22-Skateboard-Deck-_356908-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Ishod-Cathedral-8.38%22-Skateboard-Deck-_356908-back-US.jpg',
		],
		6795,
		'8.38',
		'MULTI',
		"Ishod Wair's signature skateboard deck, Cathedral, from Real, has an 8.38\" width by 32\" length. It's made with Real's R1 construction, which means it's not too steep, not too mellow, and guaranteed to last. The bottom ply has a metallic stained glass motif of flowers and doves.",
		[
			'Ishod Cathedral 8.38" Skateboard Deck from Real.',
			'Signature Ishod Wair pro model.',
			'Full shape, with even width throughout with tapered nose and tail.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.38".',
			'Length: 32.0".',
			'Wheelbase: 14.5".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz x Killer Acid Killer Hand 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Killer-Hand-8.5%22-Skateboard-Deck-_362551-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Killer-Hand-8.5%22-Skateboard-Deck-_362551-back-US.jpg',
		],
		6995,
		'8 1/2',
		'MULTI',
		'The Killer Hand skateboard deck from Santa Cruz x Killer Acid comes in an 8.5" by 32.2" construction with a bottom ply graphic of the Screaming Hand logo adorned with small, whimsical Killer Acid characters.',
		[
			'Killer Hand 8.5" Skateboard Deck from Santa Cruz x Killer Acid.',
			'Official Santa Cruz and Killer Acid collaboration.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Width: 8.5".',
			'Length: 32.2".',
			'Wheelbase: 14.375".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz Gravette Hippie Skull 8.3" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Gravette-Hippie-Skull-8.3%22-Skateboard-Deck-_356978-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Gravette-Hippie-Skull-8.3%22-Skateboard-Deck-_356978-back-US.jpg',
		],
		6495,
		'8.3',
		'MULTI',
		'The Hippie Skull Santa Cruz skateboard deck is a David Gravette pro model that comes in an 8.3" by 32.2" construction with a bottom ply graphic of a skeleton smoking a joint in a pop art cartoon style.',
		[
			'Gravette Hippie Skull 8.3" Skateboard Deck from Santa Cruz.',
			'Signature David Gravette pro model.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderate pitched kick tails.',
			'Width: 8.3".',
			'Length: 32.2".',
			'Wheelbase: 14.5".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Chocolate Tershy Vanner 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Chocolate-Tershy-Vanner-8.25%22-Skateboard-Deck-_343926-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Chocolate-Tershy-Vanner-8.25%22-Skateboard-Deck-_343926-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'The Vanner Chocolate skateboard deck comes in an 8.25" by 31.75" construction with a bottom ply graphic of a grim reaper figure holding a magic 8 ball painted along the side of a red van.',
		[
			'Tershy Vanner 8.25" Skateboard Deck from Chocolate.',
			'Official Raven Tershy pro model.',
			'Graphic on bottom ply.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched and wide kick tails.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14".',
		],
		chocolateBrand,
		decksCategory
	);

	await createProduct(
		'Santa Cruz x Killer Acid Way Out West 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Way-Out-West-8.25%22-Skateboard-Deck-_362555-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Way-Out-West-8.25%22-Skateboard-Deck-_362555-back-US.jpg',
		],
		6795,
		'8.25',
		'MULTI',
		'The Way Out West skateboard deck from the Santa Cruz x Killer Acid collaboration comes in an 8.25" by 31.8" construction with a bottom ply graphic of multiple personified animals lounging on a giant personified dog.',
		[
			'Way Out West 8.25" Skateboard Deck from Santa Cruz x Killer Acid.',
			'Official Santa Cruz and Killer Acid collaboration.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Enjoi Bird Watcher 8.0" Skateboard Deck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Bird-Watcher-8.0%22-Skateboard-Deck-_343652-front-US.jpg'],
		4595,
		'8.0',
		'MULTI',
		'Quit chirping on about your old, busted deck and set up a fresh board with the Bird Watcher 8.0" skateboard deck from Enjoi! This deck, which is 31.5" long and 8.0" wide, features a blue colorway at the bottom ply with a yellow Enjoi logo from nose to tail, and two little birds, lending your new ride bold branding and adorable detail.',
		[
			'Bird Watcher 8.0" Skateboard Deck from Enjoi.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Moderate pitched nose and kicktails.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.0".',
		],
		enjoiBrand,
		decksCategory
	);
	await createProduct(
		'DGK Rainbow Drip 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Rainbow-Drip-8.0%22-Skateboard-Deck-_338104-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Rainbow-Drip-8.0%22-Skateboard-Deck-_338104-back-US.jpg',
		],
		6495,
		'8.0',
		'MULTI',
		'Shred in psychedelic style with DGK\'s Rainbow " skateboard deck! With an 8.0" width, moderate concave, and pitched ends, this deck keeps things agile and flip-friendly, while the 7-ply construction lends the deck ample durability. Graphics of several dripping, grinning faces decorate the board\'s bottom ply, with a DGK logo in equally bubbly script at the center, perfect for adding some trippy aesthetics to all your technical trickery.',
		[
			'Rainbow Drip 8.0" Skateboard Deck from DGK.',
			'Dripping smiling faces throughout bottom ply, with DGK logo at center.',
			'7-ply maple construction.',
			'Medium concave.',
			'Pitched nose and kicktails.',
			'Width: 8.0".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Girl Geering Red 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Geering-Red-8.0%22-Skateboard-Deck-_357973-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Geering-Red-8.0%22-Skateboard-Deck-_357973-back-US.jpg',
		],
		5995,
		'8.0',
		'MULTI',
		'The Red Girl skateboard deck is a Breana Geering pro model that comes in an 8.0" by 31.5" construction, boasting a bottom ply graphic of the Girl logo over a multicolored faux yarn background.',
		[
			'Geering Red 8.0" Skateboard Deck from Girl.',
			'Signature Breana Geering pro model.',
			'Art by Tuesday Lewman.',
			'Popsicle shape.',
			'7-ply North American maple construction.',
			'Mellow concave.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14". ',
		],
		girlBrand,
		decksCategory
	);
	await createProduct(
		'Primitive Hamilton Dreamers 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Hamilton-Dreamers-8.25%22-Skateboard-Deck-_361015-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Hamilton-Dreamers-8.25%22-Skateboard-Deck-_361015-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		'The Spencer Hamilton pro model skateboard deck, Dreamers, from Primitive is 8.25" wide by 31.85" long. This Primitive skateboard has a collaged space and mushroom inspired graphic on the bottom ply.',
		[
			'Hamilton Dreamers 8.25" Skateboard Deck from Primitive.',
			'Signature Spencer Hamilton pro model.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Width: 8.25".',
			'Length: 31.85".',
			'Wheelbase: 14.0".',
		],
		primitiveBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz x Killer Acid Dot 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Dot-8.0%22-Skateboard-Deck-_362557-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-x-Killer-Acid-Dot-8.0%22-Skateboard-Deck-_362557-back-US.jpg',
		],
		6795,
		'8.0',
		'MULTI',
		'The Dot skateboard deck from Santa Cruz x Killer Acid comes in an 8.0" by 31.8" construction with a bottom ply graphic of a personified creature ocean scene for a whimsical ride.',
		[
			'Dot 8.0" Skateboard Deck from Santa Cruz x Killer Acid.',
			'Official Santa Cruz and Killer Acid collaboration.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Width: 8.0".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'DGK Good Luck Santo 8.1" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Good-Luck-Santo-8.1%22-Skateboard-Deck-_360878-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Good-Luck-Santo-8.1%22-Skateboard-Deck-_360878-back-US.jpg',
		],
		5995,
		'8.1',
		'MULTI',
		'The DGK Good Luck Santo skateboard deck measures 8.1" wide by 32.25" long, and features a multi-cultural graphic of a Japanese lucky cat with Latin-American skull face painting on the bottom ply. The deck comes in a 7 layer maple construction with a medium concave, and is finished with a black stenciled DGK logo on the top ply.',
		[
			'Good Luck Santo 8.1" Skateboard Deck from DGK.',
			'Graphics on bottom ply.',
			'7-ply maple construction.',
			'Medium concave.',
			'Pitched nose and kicktails.',
			'Width: 8.1".',
			'Length: 32.25".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Primitive x Sailor Moon Rodriguez Super 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-x-Sailor-Moon-Rodriguez-Super-8.25%22-Skateboard-Deck-_349297-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-x-Sailor-Moon-Rodriguez-Super-8.25%22-Skateboard-Deck-_349297-back-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'The Primitive x Sailor Moon Rodriguez Super 8.25" skateboard deck has a large Sailor Moon graphic and white italicized script reading"Rodriguez." This anime themed board measures 8.25" wide and 31.85" long.',
		[
			'Super 8.25" Skateboard Deck from Primitive x Sailor Moon.',
			"Part of Primitive's Sailor Moon collection.",
			'Official Paul Rodriquez pro model.',
			'7-ply maple construction.',
			'Moderate pitched kick tails.',
			'Medium concave profile.',
			'Width: 8.25".',
			'Length: 32.0".',
			'Wheelbase: 14.25".',
		],
		primitiveBrand,
		decksCategory
	);
	await createProduct(
		'Primitive x Sailor Moon Team Sailor Moon 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-x-Sailor-Moon-Team-Sailor-Moon-8.38%22-Skateboard-Deck-_333543-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-x-Sailor-Moon-Team-Sailor-Moon-8.38%22-Skateboard-Deck-_333543-back-US.jpg',
		],
		7495,
		'8.38',
		'MULTI',
		'Keep your set up lively and oozing anime flair with the Primitive x Sailor Moon Team Sailor Moon 8.38" skateboard deck. Mellow pitched kick tails ensure excellent responsiveness on ollies and flip tricks, while the sparking silver graphic complete with all your favorite Sailor Moon characters adds a look worthy of wall display.',
		[
			'Team Sailor Moon 8.38" Skateboard Deck from Primitive x Sailor Moon.',
			'Signature Primitive and Sailor Moon collection.',
			'Mellow kick tails.',
			'Mellow concave.',
			'Seven-ply maple construction.',
			'Width: 8.38".',
			'Length: 32.0".',
			'Wheelbase: 14.25".',
		],
		primitiveBrand,
		decksCategory
	);
	await createProduct(
		'Almost x Ren & Stimpy Youness Roommate 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Almost-x-Ren-%26-Stimpy-Youness-Roommate-8.25%22-Skateboard-Deck-_356332-front-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'From the Almost x Ren& Stimpy collaboration comes the Youness Roommate 8.25" skateboard deck, featuring a graphic on the bottom ply of both Ren and Stimpy being strangled, a photo of a bedroom, and Stimpy serving a suggestive pose. The Youness Amrani pro model measures 8.25" in width, 32" in length, with a 14.25" wheelbase.',
		[
			'Youness Roommate 8.25" Skateboard Deck from Almost x Ren & Stimpy.',
			'Official Almost x Ren & Stimpy collaboration.',
			'Signature Youness Amrani pro model.',
			'Mellow concave.',
			'7-ply maple construction.',
			'Width: 8.25".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		almostBrand,
		decksCategory
	);
	await createProduct(
		'Enjoi Whitey Panda 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Whitey-Panda-8.0%22-Skateboard-Deck-_356350-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Whitey-Panda-8.0%22-Skateboard-Deck-_356350-back-US.jpg',
		],
		5995,
		'8.0',
		'MULTI',
		'The Whitey Panda Enjoi skateboard deck is 8.0" wide, 31.6" long, and medium concave with a steep kicktail. The board is dipped white, and the bottom ply has a graphic of the iconic Enjoi Panda.',
		[
			'Whitey Panda 8.0" Skateboard Deck from Enjoi.',
			'Medium concave.',
			'7-ply resin epoxy glue and single press deck press construction for lightweight durability.',
			'Width: 8.0".',
			'Length: 31.6".',
			'Wheelbase: 14.0".',
		],
		enjoiBrand,
		decksCategory
	);
	await createProduct(
		'Sk8mafia Surrey Hiya 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Surrey-Hiya-8.25%22-Skateboard-Deck-_365470-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Surrey-Hiya-8.25%22-Skateboard-Deck-_365470-back-US.jpg',
		],
		6295,
		'8.25',
		'MULTI',
		'The Surrey Hiya skateboard deck from Sk8mafia comes in a length of 32" and a width of 8.25". On the bottom ply of the board is a colorful image of a lucky cat holding a golden coin, surrouned by vibrant lotus flowers.',
		[
			'Surrey Hiya 8.25" Skateboard Deck from Sk8mafia.',
			'Graphic on bottom ply.',
			'Tyler Surrey signature pro model.',
			'Width: 8.25".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		sk8mafiaBrand,
		decksCategory
	);
	await createProduct(
		'Krooked Gottwig Life 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Gottwig-Life-8.38%22-Skateboard-Deck-_356900-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Gottwig-Life-8.38%22-Skateboard-Deck-_356900-back-US.jpg',
		],
		6595,
		'8.38',
		'MULTI',
		'The all new Matt Gottwig signature Life skateboard deck from Krooked features a graphic of multiple doodle characters holding up multicolored shapes and measures at 8.38" wide.',
		[
			'Gottwig Life 8.38" Skateboard Deck from Krooked.',
			'Signature Matt Gottwig pro model.',
			'Mellow convcave.',
			'Width: 8.38".',
			'Length: 31.75".',
			'Wheelbase: 14".',
		],
		krookedBrand,
		decksCategory
	);
	await createProduct(
		'Krooked Team Wild Style 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Team-Wild-Style-8.25%22-Skateboard-Deck-_342342-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krooked-Team-Wild-Style-8.25%22-Skateboard-Deck-_342342-back-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'Take your skate style from the vert to the streets in fun, floral style with the Krooked Team Wild Style 8.25" skateboard deck. A graphic filled with red flowers provides a vibrant look, while the moderate concave depth flips tricks like a dream.',
		[
			'Team Wild Style 8.25" Skateboard Deck from Krooked Skateboards.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		krookedBrand,
		decksCategory
	);
	await createProduct(
		'Deathwish Deathspray Bricks 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Deathspray-Bricks-8.25%22-Skateboard-Deck-_362422-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Deathspray-Bricks-8.25%22-Skateboard-Deck-_362422-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		'The Deathspray Bricks Deathwish skateboard deck is 8.25" wide by 31.5" long. This Deathwish board has the classic spraypaint logo against a subtle debossed brick design.',
		[
			'Deathspray Bricks 8.25" Skateboard Deck from Deathwish.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderately pitched and wide kick tails.',
			'Width: 8.25".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		deathwishBrand,
		decksCategory
	);
	await createProduct(
		'Enjoi Samarria High Waters 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Samarria-High-Waters-8.25%22-Skateboard-Deck-_356348-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Samarria-High-Waters-8.25%22-Skateboard-Deck-_356348-back-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'Samarria Brevard\'s High Waters pro model Enjoi skateboard deck has an 8.25" width by 31.75" length and a graphic of a person wearing a unicorn mask.',
		[
			'Samarria High Waters 8.25" Skateboard Deck from Enjoi.',
			'Signature Samarria Brevard pro model.',
			'Medium concave.',
			'7-ply resin epoxy glue and single press deck press construction for lightweight durability.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		enjoiBrand,
		decksCategory
	);
	await createProduct(
		'DGK Williams Ghetto Psych 8.06" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Williams-Ghetto-Psych-8.06%22-Skateboard-Deck-_360883-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Williams-Ghetto-Psych-8.06%22-Skateboard-Deck-_360883-back-US.jpg',
		],
		6495,
		'8.06',
		'MULTI',
		'The Ghetto Psych DGK skateboard deck is 8.06" wide by 31.625" long. This Stevie Williams pro model DGK board has a rainbow inspired Love Park graphic on the bottom ply.',
		[
			'Williams Ghetto Psych 8.06" Skateboard Deck from DGK.',
			'Signature Stevie Williams pro model.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Width: 8.06".',
			'Length: 31.625"',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Deathwish Hidden Inside 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Hidden-Inside-8.25%22-Skateboard-Deck-_357421-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Hidden-Inside-8.25%22-Skateboard-Deck-_357421-back-US.jpg',
		],
		6995,
		'8.25',
		'MULTI',
		'The Hidden Inside Deathwish Skateboard Deck comes in a classic popsicle construction with an 8.25" width and 31.75" length, and features a mellow concave and twin tails. On the bottom ply is a graphic of a woman with snakes for hair adorned with golden jewelry and pearls over a blue colorway.',
		[
			'Hidden Inside 8.25" Skateboard Deck from Deathwish.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched and tapered kick tails.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		deathwishBrand,
		decksCategory
	);
	await createProduct(
		'Girl x Sanrio Gass Tokyo Speed 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Gass-Tokyo-Speed-8.5%22-Skateboard-Deck-_352347-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Gass-Tokyo-Speed-8.5%22-Skateboard-Deck-_352347-back-US.jpg',
		],
		5995,
		'8.5',
		'MULTI',
		'Give your skateboard a dash of kawaii detail with the Gass Tokyo Speed 8.5" skateboard deck from Girl and Sanrio! This signature Griffin Gass pro model deck features a blue, yellow, and red colorway with a graphic of the Sanrio character Pompompurin, lending your setup some Japanese cartoon style.',
		[
			'Gass Tokyo Speed 8.5" Skateboard Deck from Girl x Sanrio.',
			'Official Girl and Sanrio collaboration.',
			'Signature Griffin Gass pro model.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.5".',
			'Length: 32".',
			'Wheelbase: 14.43".',
		],
		girlBrand,
		decksCategory
	);

	await createProduct(
		'Enjoi Snail trail 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Snail-trail-8.0%22-Skateboard-Deck-_358950-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Snail-trail-8.0%22-Skateboard-Deck-_358950-back-US.jpg',
		],
		5495,
		'8.0',
		'MULTI',
		'From Enjoi comes the Snail Trail Skateboard Deck in an8.0" single deck press with epoxy glue resin, featuring a full concave and steep kick. On the bottom ply a graphic depicts a snail leaving a trail of neon slime, spelling out the brand name along the length of the board. A lime green colorway contrasts well with a sharp blue colorway on the snail\'s shell.',
		[
			'Snail Trail 8.0" Skateboard Deck from Enjoi.',
			'National Forest Foundation Partner.',
			'Full concave, steep kick.',
			'Single deck press with epoxy resin glue.',
			'Width: 8.0".',
			'Length: 31.6".',
			'Wheelbase: 14".',
		],
		enjoiBrand,
		decksCategory
	);
	await createProduct(
		'Almost x Ren & Stimpy Max Road Rage 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Almost-x-Ren-%26-Stimpy-Max-Road-Rage-8.5%22-Skateboard-Deck-_356333-front-US.jpg',
		],
		6495,
		'8.5',
		'MULTI',
		'Almost links up with Ren & Stimpy for the collaboration Max Road Rage 8.5" skateboard deck. With a 7-ply Canadian hard rock maple construction, the deck\'s bottom-ply features a graphic of Ren jumping on a car, accented by yellow lightning bolts, and "Max" in cartoon lettering. The Max Geronzi pro model is 8.5" in width, 32" in length, and has a 14.25" wheelbase.',
		[
			'Ax Road Rage 8.5" Skateboard Deck from Almost x Ren& Stimpy.',
			'Official Almost x Ren& Stimpy collaboration.',
			'Signature Max Geronzi pro model.',
			'Mellow concave.',
			'7-ply maple construction.',
			'Width: 8.5".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		almostBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz Contra Allover 8.25" Skateboard Deck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Contra-Allover-8.25%22-Skateboard-Deck-_340410-front-US.jpg'],
		5695,
		'8.25',
		'MULTI',
		'Go send a stair set or just nail that first pesky kick flip on the Santa Cruz Contra Allover 8.25" skateboard deck. This colorful deck features a mix of Santa Cruz Dot logos throughout for iconic style points, and the Hard Rock maple press means it can take even your heaviest sessions with ease.',
		[
			'Contra Allover 8.25" Skateboard Deck from Santa Cruz.',
			'7-ply Hard Rock maple construction.',
			'Medium concave.',
			'Wide and moderate pitched kick tails.',
			'Width: 8.25".',
			'Length: 32.0".',
			'Wheelbase: 14.4".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Girl Bennet 93 Til 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Bennet-93-Til-8.25%22-Skateboard-Deck-_366968-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Bennet-93-Til-8.25%22-Skateboard-Deck-_366968-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'From Girl Skateboarding Co. comes the Bennet 93 Til 8.25" skateboard deck. Constructed of a 7-ply maple, this deck comes featured with The Girl Skateboarding Co. logo on the bottom ply; set against a deep red colorway, as well as Niels Bennett\'s name appearing just above the logo while "Madchen" sits just below.',
		[
			'Bennet 93 TIL 8.25" Skateboard Deck from The Girl Skateboarding Co.',
			'The Girl Skateboarding Co. logo graphic on bottom ply.',
			'7-ply maple construction.',
			'Medium concave.',
			'Pitched nose and kicktails.',
			'Width: 8.25".',
			'Length: 31.85".',
			'Wheelbase: 14.25".',
		],
		girlBrand,
		decksCategory
	);
	await createProduct(
		'DGK Koi 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Koi-8.25%22-Skateboard-Deck-_360877-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Koi-8.25%22-Skateboard-Deck-_360877-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'The Koi skateboard deck from DGK is 8.25" wide by 31.85" long, with a seductive bottom ply graphic of a naked tattooed woman with a flower in her hair. With a 7 ply maple construction, the DGK deck is finished with moderately picked kicktails and a mellow concave.',
		[
			'Koi 8.25" Skateboard Deck from DGK.',
			'Graphics on bottom ply.',
			'7-ply maple construction.',
			'Medium concave.',
			'Pitched nose and kicktails.',
			'Width: 8.25".',
			'Length: 31.85".',
			'Wheelbase: 14.31".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'Anti-Hero Taylor Space Junk 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Anti-Hero-Taylor-Space-Junk-8.38%22-Skateboard-Deck-_356898-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Anti-Hero-Taylor-Space-Junk-8.38%22-Skateboard-Deck-_356898-back-US.jpg',
		],
		6595,
		'8.5',
		'MULTI',
		'The Grant Taylor Space Junk skateboard deck from Anti-Hero has an 8.5" width by 31.8\' length and features a graphic of a trio of astronauts picnicking on the moon as they watch the earth burn.',
		[
			'Taylor Space Junk 8.5" Skateboard Deck from Anti-Hero.',
			'Signature Grant Taylor pro model.',
			'7-ply maple construction.',
			'Moderate concave with rounded nose and kick tail.',
			'Width: 8.5".',
			'Length: 31.8".',
			'Wheelbase: 14.25".',
		],
		antiHeroBrand,
		decksCategory
	);
	await createProduct(
		'Diamond Supply Co. x Ape Mutant Diamond Ape 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Mutant-Diamond-Ape-8.25%22-Skateboard-Deck-_361274-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Mutant-Diamond-Ape-8.25%22-Skateboard-Deck-_361274-back-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'From the Diamond Supply Co. x Ape capsule collection comes the Mutant Diamond 8.25" skateboard deck. The collaboration with deck boldly features the colorful bored ape NFT with distinctive rainbow teeth and an exposed brain across the bottom ply. The Diamond Supply Co. skateboard deck comes in a 7-ply maple construction, and measures 8.25" wide by 31.8" long.',
		[
			' Mutant Diamond Ape 8.25" Skateboard Deck from Diamond Supply Co. x Ape.',
			'Official Diamond Supply Co. and Ape collaboration.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderate pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		diamondBrand,
		decksCategory
	);
	await createProduct(
		'Sk8mafia Ramirez Hiya 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Ramirez-Hiya-8.5%22-Skateboard-Deck-_365472-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Ramirez-Hiya-8.5%22-Skateboard-Deck-_365472-back-US.jpg',
		],
		6295,
		'8.5',
		'MULTI',
		'Sk8mafia brings the Ramirez Hiya skateboard deck with a width of 8.5" and a length of 31.8". Artwork on the bottom ply, done by Alexis Ramirez, displays a mutated racoon eating pizza the wrong way.',
		[
			'Ramirez Hiya 8.5" Skateboard Deck from Sk8mafia.',
			'Graphic on bottom ply.',
			'Alexis Ramirez signature pro model.',
			'Width: 8.5".',
			'Length: 31.8".',
			'Wheelbase: 14.25".',
		],
		sk8mafiaBrand,
		decksCategory
	);
	await createProduct(
		'Primitive Dirty P Paisley 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Dirty-P-Paisley-8.5%22-Skateboard-Deck-_356696-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Primitive-Dirty-P-Paisley-8.5%22-Skateboard-Deck-_356696-back-US.jpg',
		],
		6495,
		'8.5',
		'MULTI',
		'With an 8.5" wide, medium concave construction, the Dirty P Paisley skateboard deck from Primitive offers ample room for foot placement and trick control. Decorating the color dyed bottom ply of this deck is white paisley pattern throughout, and the classic Primitive P logo at the center.',
		[
			'Dirty P Paisley 8.5" Skateboard Deck from Primitive.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.5".',
			'Length: 32".',
			'Wheelbase: 14.5".',
		],
		primitiveBrand,
		decksCategory
	);
	await createProduct(
		'Sk8mafia Kremer Hiya 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Kremer-Hiya-8.0%22-Skateboard-Deck-_365471-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sk8mafia-Kremer-Hiya-8.0%22-Skateboard-Deck-_365471-back-US.jpg',
		],
		6295,
		'8.0',
		'MULTI',
		'Sk8mafia brings the Kremer Hiya skateboard deck with a width 0f 8.0" and a length of 31.5". On the bottom ply of the board, with artwork by Wes Kremer, displays a colorful scene of a demon eating the body of a snake.',
		[
			'Kremer Hiya 8.0" Skateboard Deck from Sk8mafia.',
			'Graphic on bottom ply.',
			'Wes Kremer signature pro model.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		sk8mafiaBrand,
		decksCategory
	);
	await createProduct(
		'Real Psychoactive Oval 8.06" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Psychoactive-Oval-8.06%22-Skateboard-Deck-_361011-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Psychoactive-Oval-8.06%22-Skateboard-Deck-_361011-back-US.jpg',
		],
		6195,
		'8.06',
		'MULTI',
		'The Psychoactive Oval Real skateboard deck comes in an 8.06" by 31.8" construction boasting a bottom ply graphic of the brand\'s Oval logo with a glitching effect and color bursts throughout. This versatile deck has a mellow concave and medium kick for an accessible, everyday ride.',
		[
			'Psychoactive Oval 8.06" Skateboard Deck from Real.',
			"Real Skateboards' R1 maple construction for even-centered concave and long lasting stiffness/strength.",
			'Mellow concave.',
			"Real Skateboard's Full Shape for more board feel, control, and stability.",
			'Width: 8.06".',
			'Length: 31.8".',
			'Wheelbase: 14.38".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Deathwish Gang Logo 8.5" Navy & Red Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Gang-Logo-8.5%22-Navy-%26-Red-Skateboard-Deck-_342050-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Gang-Logo-8.5%22-Navy-%26-Red-Skateboard-Deck-_342050-back-US.jpg',
		],
		7195,
		'8.5',
		'MULTI',
		'Become part of the Deathwish squad in style with the Gang Logo 8.5" navy & red skateboard deck. A navy colorway is contrasted by a classic Deathwish Gang logo in red for iconic style, while the mellow concave profile ensures a stable, predictable feel underfoot as well.',
		[
			'Gang Logo 8.5" Navy & Red Skateboard Deck from Deathwish.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Moderate pitched and tapered kick tails.',
			'Width: 8.5".',
			'Length: 32.0".',
			'Wheelbase: 14.5".',
		],
		deathwishBrand,
		decksCategory
	);
	await createProduct(
		'Girl x Sanrio Malto Tokyo Speed 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Malto-Tokyo-Speed-8.25%22-Skateboard-Deck-_352345-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-x-Sanrio-Malto-Tokyo-Speed-8.25%22-Skateboard-Deck-_352345-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'The Girl x Sanrio Malto Tokyo Speed 8.25" skateboard deck is a collaboration for the history books! Sean Malto\'s pro model has an 8.25" width and 31.875" length, and the bottom ply has a collaborative red and green graphic in the same iconic Girl layout, but instead it\'s all kawaiied out Keroppi™ as the stand-in for the Girl logo.',
		[
			'Malto Tokyo Speed 8.25" Skateboard Deck from Girl x Sanrio.',
			'Official Girl and Sanrio collaboration.',
			'Signature Sean Malto pro model.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched and wide kick tails with a steeper nose than tail.',
			'Width: 8.25".',
			'Length: 31.875".',
			'Wheelbase: 14.0".',
		],
		girlBrand,
		decksCategory
	);
	await createProduct(
		'Deathwish Deathspray Glow 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Deathspray-Glow-8.0%22-Skateboard-Deck-_357420-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Deathwish-Deathspray-Glow-8.0%22-Skateboard-Deck-_357420-back-US.jpg',
		],
		6995,
		'8.0',
		'MULTI',
		"The Deathspray Glow Deathwish skateboard deck is made from sturdy 7-ply maple, and has an 8.0\" width by 31.5' length. The bottom ply is outfitted with Deathwish's classic script in a white spray paint font.",
		[
			'Deathspray Glow 8.0" Skateboard Deck from Deathwish.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderately pitched and wide kick tails.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		deathwishBrand,
		decksCategory
	);
	await createProduct(
		'Diamond Supply Co. x Ape Beanie Mutant 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Beanie-Mutant-8.25%22-Skateboard-Deck-_361276-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Beanie-Mutant-8.25%22-Skateboard-Deck-_361276-back-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'The Beanie Mutant skateboard deck from the Diamond Supply Co. x Ape collection has a width of 8.25" and features a bottom ply graphic of a mutant ape wearing a beanie with spiders crawling up its chest.',
		[
			'Beanie Mutant 8.25" Skateboard Deck from Diamond Supply Co. x Ape.',
			'Official Diamond Supply Co. and Ape collaboration.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched and wide kick tails.',
			'Width: 8.25".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		diamondBrand,
		decksCategory
	);
	await createProduct(
		'Real Chima Cross Stitch 8.06" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Chima-Cross-Stitch-8.06%22-Skateboard-Deck-_356893-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Chima-Cross-Stitch-8.06%22-Skateboard-Deck-_356893-back-US.jpg',
		],
		6595,
		'8.06',
		'MULTI',
		'Chima Ferguson\'s signature pro model skateboard deck from Real has an 8.06" width by 31.75" length, and is made from Real\'s R1 construction, making it not too step, not too mellow, and sure to last. It also has a highly-unique cross stitch-textured bottom ply of a sloth sleeping on a branch and text reading, "Life | Leisure."',
		[
			'Chima Cross Stitch 8.06" Skateboard Deck from Real.',
			'Signature Chima Ferguson pro model.',
			'Full shape, with even width throughout with tapered nose and tail.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.06".',
			'Length: 31.75".',
			'Wheelbase: 14.0".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz Crane Dot 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Crane-Dot-8.0%22-Skateboard-Deck-_354620-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Crane-Dot-8.0%22-Skateboard-Deck-_354620-back-US.jpg',
		],
		5495,
		'8.0',
		'MULTI',
		'The Crane Dot Santa Cruz skateboard deck has an 8.0" width by 31.6" length, and features a matte finished graphic of the iconic Santa Cruz Dot logo and a swooping crane above it.',
		['Crane Dot 8.0" Skateboard Deck from Santa Cruz.', '7-ply maple construction.', 'Width: 8.0""', 'Length: 31.6"', 'Wheelbase: 14.22"'],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Girl Pacheco Introvert 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Pacheco-Introvert-8.5%22-Skateboard-Deck-_357972-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Girl-Pacheco-Introvert-8.5%22-Skateboard-Deck-_357972-back-US.jpg',
		],
		5995,
		'8.5',
		'MULTI',
		'The Introvert Girl skateboard deck is a Tyler "Manchild" Pacheco pro model with an 8.5" by 32" construction, boasting a bottom ply graphic of the Girl logo in orange with geometric, red lines throughout. This 7-ply North American maple deck comes in a classic popsicle shape with a mellow concave.',
		[
			'Pacheco Introvert 8.5" Skateboard Deck from Girl.',
			'Signature Tyler "Manchild" Pacheco pro model.',
			'Popsicle shape.',
			'7-ply North American maple construction.',
			'Mellow concave.',
			'Width: 8.5".',
			'Length: 32".',
			'Wheelbase: 14.4375". ',
		],
		girlBrand,
		decksCategory
	);
	await createProduct(
		'Diamond Supply Co. x Ape Diamond Ape 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Diamond-Ape-8.25%22-Skateboard-Deck-_361280-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Diamond-Ape-8.25%22-Skateboard-Deck-_361280-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Diamond-Ape-8.25%22-Skateboard-Deck-_361280-alt4-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'The Diamond Ape skateboard deck from the Diamond Supply Co. x Ape collaboration comes in an 8.25" by 31.8" construction with a bottom ply graphic of a bored ape in a hat and button up shirt with bandages wrapped around its eyes.',
		[
			'Diamond Ape 8.25" Skateboard Deck from Diamond Supply Co. x Ape.',
			'Official Diamond Supply Co. and Ape collaboration.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderate pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		diamondBrand,
		decksCategory
	);
	await createProduct(
		'Diamond Supply Co. x Ape Biker Mutant Ape 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Biker-Mutant-Ape-8.25%22-Skateboard-Deck-_361282-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-x-Ape-Biker-Mutant-Ape-8.25%22-Skateboard-Deck-_361282-back-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'This Biker Mutant Ape NFT skateboard deck from Diamond Supply Co. x Ape has an 8.25" width and a bottom ply graphic of a mutant ape with a jeweled jaw and a leather jacket.',
		[
			'Biker Mutant Ape 8.25" Skateboard Deck from Diamond Supply Co. x Ape.',
			'Official Diamond Supply Co. and Ape collaboration.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderately pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		diamondBrand,
		decksCategory
	);
	await createProduct(
		'Zero Vines 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Vines-8.5%22-Skateboard-Deck-_360433-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Vines-8.5%22-Skateboard-Deck-_360433-back-US.jpg',
		],
		5995,
		'8.5',
		'MULTI',
		'From Jamie Thomas\' brand Zero comes the Vines skateboard deck. This Zero skateboard has an 8.0" width and a graphic of the brand logo and a bundle of vines.',
		['Vines 8.5" Skateboard Deck from Zero.', '7-ply construction.', 'Mild concave.', 'Width: 8.5".', 'Length: 31.75".', 'Wheelbase: 14.25".'],
		zeroBrand,
		decksCategory
	);
	await createProduct(
		'Real Wilkins One Off 8.86" Skateboard Deck 8.86',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Wilkins-One-Off-8.86%22-Skateboard-Deck-8.86-_361013-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Real-Wilkins-One-Off-8.86%22-Skateboard-Deck-8.86-_361013-back-US.jpg',
		],
		6795,
		'8.8',
		'MULTI',
		'The Wilkins One Off skateboard deck from Real Skateboards measures 8.86" wide by 32.61" long, with a 15" wheelbase. Shaped and designed by pro skateboarder Jimmy Wilkins, the R1 molded deck features a red lizard graphic against a green background, while a white rose overlay can be seen on the nose and on the top ply.',
		[
			'Wilkins One Off 8.86" Skateboard Deck from Real.',
			'Signature Jimmy Wilkins Pro Model',
			' ',
			'7-ply maple construction.',
			'Moderate concave.',
			'Graphics on bottom ply.',
			'Moderately pitched nose and tail.',
			'Width: 8.86".',
			'Length: 32.61".',
			'Wheelbase: 15".',
		],
		realBrand,
		decksCategory
	);
	await createProduct(
		'Flip Poppies 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Flip-Poppies-8.25%22-Skateboard-Deck-_363439-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Flip-Poppies-8.25%22-Skateboard-Deck-_363439-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'The 7-ply maple Poppies Flip skateboard deck comes in an 8.25" by 32" construction with a bottom ply graphic of Flip script with blue poppies within the text, all over a white background.',
		[
			'Poppies 8.25" Skateboard Deck from Flip.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderately pitched and wide kick tails.',
			'Width: 8.25".',
			'Length: 32".',
			'Wheelbase: 14.25".',
		],
		flipBrand,
		decksCategory
	);
	await createProduct(
		'Torro Globe 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Torro-Globe-8.0%22-Skateboard-Deck-_365634-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Torro-Globe-8.0%22-Skateboard-Deck-_365634-back-US.jpg',
		],
		5995,
		'8.0',
		'MULTI',
		'From Torro Skateboards comes the Globe skateboard deck measuring at 8.0" wide by 31.5" long. The deck features a graphic on the bottom ply of a skateboarder holding up a massive metal globe with Torro logo script on it.',
		[
			'Globe 8.0" Skateboard Deck from Torro.',
			'7-ply maple construction.',
			'Medium concave.',
			'Moderately pitched and wide kick tails.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
		],
		torroBrand,
		decksCategory
	);
	await createProduct(
		'5Boro x TR Nohara 8.125" Skateboard Deck ',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/5Boro-x-TR-Nohara-8.125%22-Skateboard-Deck--_365835-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/5Boro-x-TR-Nohara-8.125%22-Skateboard-Deck--_365835-back-US.jpg',
		],
		5995,
		'8.1',
		'MULTI',
		'5Boro collaborates with Antwerp based artist Tomas Redray for the 5Boro x TR Nohara 8.125" skateboard deck. The Shinya Nohara pro model deck measures 8.125" wide by 31.75" long, with a 14" wheelbase. The bottom ply features a graphic of a skull, an orange triangular face and birds against a red background.',
		[
			'Nohara 8.125" Skateboard Deck from 5Boro.',
			'Official 5Boro and Tomas Redray artist series.',
			'Official Shinya Nohara pro model.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.5".',
			'Length: 31.75"',
			'Wheelbase: 14"',
			'Made in USA.',
		],
		fiveBoroBrand,
		decksCategory
	);
	await createProduct(
		'Toy Machine Hoban Shadow 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Hoban-Shadow-8.0%22-Skateboard-Deck-_367423-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Hoban-Shadow-8.0%22-Skateboard-Deck-_367423-back-US.jpg',
		],
		6995,
		'8.0',
		'MULTI',
		'The Toy Machine Shadow 8.0" signature Braden Hoban skateboard deck features a graphic of a green figure hiding from their shadow. With additional yellow and grey text on the bottom ply, the 7-ply maple deck is finished a mellow concave, and Toy Machine branding on the top ply.',
		[
			'Hoban Shadow 8.0" Skateboard Deck from Toy Machine.',
			'Signature Braden Hoban pro model.',
			'Graphic on the bottom ply.',
			'7-ply maple construction.',
			'Mellow concave profile.',
			'Mild pitched kick tails.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14".',
		],
		toyMachineBrand,
		decksCategory
	);
	await createProduct(
		'Element Escape From The Mind 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-Escape-From-The-Mind-8.38%22-Skateboard-Deck-_349619-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-Escape-From-The-Mind-8.38%22-Skateboard-Deck-_349619-back-US.jpg',
		],
		5995,
		'8.38',
		'MULTI',
		'Mesh some fresh, hesh style into your setup with Element\'s Escape From The Mind 8.38" skateboard deck! The deck\'s 8.38" width provides plenty of standing room for larger-footed and wider-stanced skaters, while the mellow concave and mildly pitched ends keep it cruise-friendly. Comic-style graphics at the bottom ply depict a powerful-looking woman in a crown, standing in front of a large statue, with script below her reading "Escape From The Mind", ready to infuse your shred sessions with a dash of dynamic steez.',
		[
			'Escape From The Mind 8.38" Skateboard Deck from Element.',
			'Comic-style graphics on bottom ply.',
			'7-ply maple construction.',
			'Mellow concave.',
			'Mellow and wide kick tails.',
			'Width: 8.38".',
			'Length: 32.25".',
			'Wheelbase: 14.25".',
		],
		elementBrand,
		decksCategory
	);
	await createProduct(
		'Element x Star Wars Vader 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-x-Star-Wars-Vader-8.25%22-Skateboard-Deck-_349773-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-x-Star-Wars-Vader-8.25%22-Skateboard-Deck-_349773-back-US.jpg',
		],
		5995,
		'8.25',
		'MULTI',
		'Put two industry giants beneath your feet with the Vader 8.25" skateboard deck from the official Element x Star Wars collaboration! This deck has an 8.25" width, lending plenty of landing area without sacrificing control and flip, while the moderate concave keeps you swerving smoothly. The bottom ply graphic is outfitted in a black, grey, and red colorway, with Darth Vader ominously in the center and the Star Wars and Element logos on the bottom left, that way, this legendary collab can be forever cemented into history.',
		[
			'Vader  8.25" Skateboard Deck from Element x Star Wars.',
			'Official Element x Star Wars collaboration.',
			'7-ply maple construction.',
			'Mild concave profile.',
			'Moderate pitched kick tails.',
			'Width: 8.25".',
			'Length: 31.9".',
			'Wheelbase: 14.25".',
		],
		elementBrand,
		decksCategory
	);
	await createProduct(
		'Foundation Campbell Owl 8.38" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Foundation-Campbell-Owl-8.38%22-Skateboard-Deck-_351050-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Foundation-Campbell-Owl-8.38%22-Skateboard-Deck-_351050-back-US.jpg',
		],
		5995,
		'8.3',
		'MULTI',
		'Conquer any obstacle, street or transition, like one of Foundation\'s best, Aidan Campbell, with his pro model Owl 8.38" skateboard deck! This killer deck has moderate concave so you can steer your board with ease, while the medium-pitched nose and tail provide you with plenty of pop and flick. The graphic features the side profile of a lachrymose cartoon owl against a grey and brown background, with "Campbell" on the tail to remind you what pro you\'re reppin\'.',
		[
			'Campbell Owl 8.38" Skateboard Deck from Foundation.',
			'Aidan Campbell pro model.',
			'Graphic of the side profile of a cartoon owl against a brown and grey background.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.38".',
			'Length: 31.88".',
			'Wheelbase: 14.25".',
		],
		foundationBrand,
		decksCategory
	);
	await createProduct(
		'Baker Brand Logo 8.475" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-8.475%22-Skateboard-Deck-_356002-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Baker-Brand-Logo-8.475%22-Skateboard-Deck-_356002-back-US.jpg',
		],
		6795,
		'8.4',
		'MULTI',
		'Pick up a classic for your new skate setup with the Brand Logo 8.475" skateboard deck from Baker! This deck features the iconic Baker logo script against a deep red background, lending your new setup with noteworthy and recognizable style, while the moderate concave, wheel wells, and wide kicktails offer an exceptionally versatile board shape, perfect for all skate styles and experience levels.',
		[
			'Brand Logo 8.475" Skateboard Deck from Baker.',
			'7-ply maple construction.',
			'Moderate concave and wheel wells.',
			'Moderate and wide kick tails with a slightly elongated and steeper nose.',
			'Width: 8.475".',
			'Length: 31.875".',
			'Wheelbase: 14.25".',
		],
		bakerBrand,
		decksCategory
	);
	await createProduct(
		'Darkroom Visuals 9.125" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Darkroom-Visuals-9.125%22-Skateboard-Deck-_356277-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Darkroom-Visuals-9.125%22-Skateboard-Deck-_356277-back-US.jpg',
		],
		5995,
		'9.1',
		'MULTI',
		"Taking cues from the heydays of the 80's, this Darkroom Visuals 9.125\" skateboard deck is ready for some shredding! Firstly, and most notably, this deck has an old school silhouette, with a pointed nose and squared nose, while the deeper concave allows for plenty of control. If this board doesn't turn some heads, it'd be a surprise. The bottom ply has a kaleidoscopic design with a geometric owl in the center, lending it quite the intricate design.",
		[
			'Visuals 9.125" Skateboard Deck from Darkroom.',
			'Graphic of a geometric owl and kaleidoscopic background.',
			'7-ply maple construction.',
			'Deep concave.',
			'Darkroom graphic on top.',
			'Pointed nose and squared tail.',
			'Width: 9.125".',
			'Length: 31.5".',
			'Wheelbase: 14.37".',
		],
		darkroomBrand,
		decksCategory
	);
	await createProduct(
		'Zero Cole Stardust 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Cole-Stardust-8.0%22-Skateboard-Deck-_353510-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Zero-Cole-Stardust-8.0%22-Skateboard-Deck-_353510-back-US.jpg',
		],
		5995,
		'8.0',
		'MULTI',
		'Shred with some galactic style under your feet with the Cole Stardust 8.0" skateboard deck from Zero! This deck features a black background with stars throughout, and a graphic of a flying V guitar with a cobra snake wrapped around it.',
		[
			'Cole Stardust 8.0" Skateboard Deck from Zero.',
			'Signature Chris Cole pro model.',
			'Steep concave.',
			'7-ply maple construction.',
			'Width: 8.0".',
			'Length: 31.5".',
			'Wheelbase: 14".',
		],
		zeroBrand,
		decksCategory
	);
	await createProduct(
		'Enjoi Deedz Plaid Panda 8.5" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Deedz-Plaid-Panda-8.5%22-Skateboard-Deck-_350278-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Enjoi-Deedz-Plaid-Panda-8.5%22-Skateboard-Deck-_350278-back-US.jpg',
		],
		7295,
		'8.5',
		'MULTI',
		'Hit the streets in style on Enjoi\'s Deedz Plaid Panda 8.5" skateboard deck! Wide enough for larger-footed, wider-stanced riders to stand comfortable, this board featured bright yellow-and-orange plaid patterns across its bottom ply, accompanied by Didrick "Deedz" Galasso\'s name and Enjoi\'s iconic Panda emblem, ready to lend some bold branded style to any board you build.',
		[
			'Deedz Plaid Panda 8.5" Skateboard Deck from Enjoi.',
			'Signature Didrick Galasso pro model deck.',
			"Plaid pattern, panda graphic, and Didrick Galasso's name on bottom ply.",
			'7-ply maple construction.',
			'Width: 8.5".',
			'Length: 31.75".',
			'Wheelbase: 14".',
		],
		enjoiBrand,
		decksCategory
	);
	await createProduct(
		'Toy Machine Lutheran Doll 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Lutheran-Doll-8.0%22-Skateboard-Deck-_360249-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Lutheran-Doll-8.0%22-Skateboard-Deck-_360249-back-US.jpg',
		],
		6595,
		'8.0',
		'MULTI',
		'The Toy Machine Lutheran Doll skateboard deck has an 8.0" length by 31.63" length and features a green painted graphic of the Toy Machine turtle boy on the bottom ply, while its backside is shown on the top ply.',
		[
			'Lutheran Doll 8.0" Skateboard Deck from Toy Machine.',
			'Official Daniel Lutheran pro model.',
			'Graphic of a horned cat on bottom ply.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.0".',
			'Length: 31.63".',
			'Wheelbase: 14".',
		],
		toyMachineBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz Gartland Sweet Dreams VX 8.0" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Gartland-Sweet-Dreams-VX-8.0%22-Skateboard-Deck-_350600-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Gartland-Sweet-Dreams-VX-8.0%22-Skateboard-Deck-_350600-back-US.jpg',
		],
		8995,
		'8.0',
		'MULTI',
		'The Sweet Dreams pro model for Henry Gartland from Santa Cruz has an 8.0" width by 31.6" length and is made using VX technology that makes the board thinner, stronger, and more responsive. The bottom ply features a holographic scene with everything from upside pyramids to devilish women.',
		[
			'Gartland Sweet Dreams VX 8.0" Skateboard Deck from Santa Cruz.',
			'Signature Henry Gartland pro model.',
			'5-ply maple construction with two reinforced layers of Santa Cruz Quad X Technology material.',
			'Medium concave profile.',
			'Moderately pitched kick tails.',
			'Width: 8.0".',
			'Length: 31.6".',
			'Wheelbase: 14.22".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'Flip Rabelo Posterized 8.13" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Flip-Rabelo-Posterized-8.13%22-Skateboard-Deck-_356290-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Flip-Rabelo-Posterized-8.13%22-Skateboard-Deck-_356290-back-US.jpg',
		],
		5995,
		'8.1',
		'MULTI',
		'This Flip skateboard deck is the signature model of up and coming pro, Lucas Rabelo. The Posterized deck has an 8.13" width by 31.5" length and a graphic of a furry creature in the center.',
		[
			'Rabelo Posterized 8.13" Skateboard Deck from Flip.',
			'Signature Lucas Rabelo pro model.',
			'Moderate concave.',
			'7-ply maple construction.',
			'Width: 8.13".',
			'Length: 31.5".',
			'Wheelbase: 14.25".',
			'Components such as trucks, wheels, and bearings sold separately.',
		],
		flipBrand,
		decksCategory
	);
	await createProduct(
		'Element Appleyard Moondust 8.38',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-Appleyard-Moondust-8.38-_353474-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Element-Appleyard-Moondust-8.38-_353474-back-US.jpg',
		],
		5995,
		'8.38',
		'MULTI',
		'From the Elememt Moondust collection comes the Mark Appleyard pro model measuring in at 8.38\' wide and 31.93\' long, with a iridescent bottom ply graphic of an eye with script above and below reading "Element| Mark Appleyard".',
		[
			'Loy Shadow Lurker 8.5" Skateboard Deck from Element.',
			'Signature Mark Appleyard pro model.',
			'7-ply maple construction.',
			'Mild concave profile.',
			'Moderate pitched kick tails.',
			'Width: 8.38".',
			'Length: 31.93".',
			'Wheelbase: 14.25".',
		],
		elementBrand,
		decksCategory
	);
	await createProduct(
		'Santa Cruz Braun Munchies Everslick 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Braun-Munchies-Everslick-8.25%22-Skateboard-Deck-_354634-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Braun-Munchies-Everslick-8.25%22-Skateboard-Deck-_354634-back-US.jpg',
		],
		7495,
		'8.25',
		'MULTI',
		'The Kevin Braun Munchies Santa Cruz skateboard deck has an 8.25" width by 31.8" length, and has an Everslick graphic, making it slide faster and five times stronger. The bottom ply features a graphic of a dog eating in front of a fridge.',
		[
			'Braun Munchies Everslick 8.25" Skateboard Deck from Santa Cruz.',
			'Signature Kevin Braun pro model.',
			'Everslick graphic construction for durability and improved board slides.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.25".',
			'Length: 31.8".',
			'Wheelbase: 14.1875".',
		],
		santaCruzBrand,
		decksCategory
	);
	await createProduct(
		'DGK Boo Dripped 8.1" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Boo-Dripped-8.1%22-Skateboard-Deck-_331674-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Boo-Dripped-8.1%22-Skateboard-Deck-_331674-back-US.jpg',
		],
		5995,
		'8.1',
		'MULTI',
		'Take your flip tricks to a whole new level with the DGK Boo Dripped 8.1" skateboard deck. A hockey mask graphic with dripping eyes offers some horror-inspired style, while the moderate concave depth is ready to add a few new tricks to your repertoire with ease.',
		[
			'Boo Dripped 8.1" Skateboard Deck from DGK.',
			'Signature Boo Johnson pro model deck.',
			'Moderate concave profile.',
			'Moderately pitched kick tails.',
			'7-ply maple construction.',
			'Width: 8.1".',
			'Length: 31.875".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'DGK x White Castle Pass The Crave 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-x-White-Castle-Pass-The-Crave-8.25%22-Skateboard-Deck-_338565-front-US.jpg',
		],
		6495,
		'8.25',
		'MULTI',
		'Slide across ledges and rails in tasty and greasy style with the DGK x White Castle Pass The Crave 8.25" skateboard deck. A graphic of two hands passing along a cheeseburger provide some seriously tasty style, while the moderate concave depth is perfect for flipping tricks like a pro with ease.',
		[
			'Pass The Crave 8.25" Skateboard Deck from DGK x White Castle.',
			'Signature DGK and White Castle collaboration.',
			'Graphic of two hands passing a slider.',
			'7-ply maple construction.',
			'Medium concave.',
			'Width: 8.25".',
			'Length: 31.75".',
			'Wheelbase: 14.25".',
		],
		dgkBrand,
		decksCategory
	);
	await createProduct(
		'HUF x Street Fighter Bonus Stage 8.25" Skateboard Deck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-x-Street-Fighter-Bonus-Stage-8.25%22-Skateboard-Deck-_341720-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-x-Street-Fighter-Bonus-Stage-8.25%22-Skateboard-Deck-_341720-back-US.jpg',
		],
		7995,
		'8.25',
		'MULTI',
		'Keep your skate style fighting fit with the HUF x Street Fighter Bonus Stage 8.25" skateboard deck. A graphic of the signature bonus stage within the classic Street Fighter game adds some fun, retro car vibes, while the moderate concave depth can kick your flip trick game up a notch with ease.',
		[
			'We reserve the right to limit order quantities on this item.',
			'',
			'',
			'Bonus Stage 8.25" Skateboard Deck from HUF x Street Fighter.',
			'Signature HUF and Street Fighter collaboration.',
			'7-ply maple construction.',
			'Moderate concave.',
			'Moderate pitched, wide kick tails.',
			'Width: 8.25".',
			'Length: 31.875".',
			'Wheelbase: 14.25".',
		],
		hufBrand,
		decksCategory
	);
	// Wheels
	await createProduct(
		'Spitfire Formula Four Classic Black & White 54mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-Black-%26-White-54mm-99a-Skateboard-Wheels-_310345-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-Black-%26-White-54mm-99a-Skateboard-Wheels-_310345-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-Black-%26-White-54mm-99a-Skateboard-Wheels-_310345-alt1-US.jpg',
		],
		4295,
		'54mm',
		'WHITE',
		"Get a fresh spin on Spitfire's classic look and feel with the Spitfire Formula Four Classic Black & White 54mm 99a Skateboard Wheels. These wheels come with Spitfire's flat spot resistant urethane formula to ensure an optimal ride from start to finish, a 99a urethane hardness rating provides a predictable feel from gripping vert to ripping powerslides.",
		[
			'Formula Four Classic Black & White 54mm 99a Skateboard Wheels by Spitfire.',
			"Spitfire's Formula Four urethane design.",
			"Spitfire's Classic wheel shape for light weight proven speed and control.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'54mm sizing, 99a durometer hardness rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Fireball Conical OG F4 54MM 99D Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Fireball-Conical-OG-F4-54MM-99D-Skateboard-Wheels-_353612-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Fireball-Conical-OG-F4-54MM-99D-Skateboard-Wheels-_353612-back-US.jpg',
		],
		4295,
		'54mm',
		'WHITE',
		"Blaze your trail at the park or in the streets with the Fireball Conical OG F4 54MM 99D skateboard wheels from Spitfire! These 54MM wheels feature Spitfire's latest Formula Four urethane design, offering extremely buttery slides without a reduction in grip, and an exceptional flat spot resistance, allowing you to rip, slide, and carve without losing that smooth ride. The Conical cut design offers a superior lightweight set of wheels and quick response time so you can pop higher tricks and land them with perfection.",
		[
			' Fireball Conical OG F4 54MM 99D Skateboard Wheels by Spitfire.',
			'Natural colorway with graphic of flames.',
			"Spitfire's latest Formula Four urethane design.",
			"Spitfire's Conical wheel shape: side cut profile, quick response and lightweight performance.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'54mm sizing, 99D rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Formula Four Full Conical 53mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Full-Conical-53mm-99a-Skateboard-Wheels-_338537-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Full-Conical-53mm-99a-Skateboard-Wheels-_338537-back-US.jpg',
		],
		4295,
		'53mm',
		'WHITE',
		'Get the perfect set of wheels for any occasion with the Spitfire Formula Four Full Conical 53mm 99a skateboard wheels. These wheels come in the brands signature Conical shape for improved grip and a wider contact patch, while the 99a durometer rating adds excellent power slide capability and additional durability too.',
		[
			'Formula Four Full Conical 53mm 99a Skateboard Wheels by Spitfire.',
			"Spitfire's Formula Four urethane design.",
			"Spitfire's Conical wheel shape and hard polyurethane core for a true bearing seating and speed.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'53mm sizing.',
			'99a durometer rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Formula Four Classics 52mm 99a Green & Natural Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-52mm-99a-Green-%26-Natural-Skateboard-Wheels-_335920-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-52mm-99a-Green-%26-Natural-Skateboard-Wheels-_335920-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-52mm-99a-Green-%26-Natural-Skateboard-Wheels-_335920-alt1-US.jpg',
		],
		4295,
		'52mm',
		'WHITE',
		'If you wanna shred all night and ollie every day, add the Spitfire Formula Four Classics 52mm 99a green and natural skateboard wheels to your setup and get going!The smaller size on these wheels helps you execute flip tricks with ease, while the 99a durometer offers both grip and speed so you can hit the parks and the streets and just go wild.',
		[
			'Formula Four Classics 52mm 99a Green & Natural Skateboard Wheels by Spitfire.',
			"Spitfire's latest Formula Four urethane design.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'52mm sizing, 99a durometer rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Formula Four Classics Swirl 56mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-Swirl-56mm-99a-Skateboard-Wheels-_324164-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-Swirl-56mm-99a-Skateboard-Wheels-_324164-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classics-Swirl-56mm-99a-Skateboard-Wheels-_324164-alt1-US.jpg',
		],
		4295,
		'56mm',
		'WHITE',
		"Constructed for speed demons and sliding fiends, Spitfire presents their signature Formula Four Classics Swirl 56mm 99a skateboard wheels. Given the brand's iconic Classic wheel shape, these wheels have been crafted for proven speed and control with an overall unmatched flat spot resistant construction.",
		[
			'Formula Four Classics Swirl 56mm 99a Skateboard Wheels by Spitfire.',
			'Blue and black swirl graphics on each wheel.',
			"Spitfire's latest Formula Four urethane design.",
			"Spitfire's Classic wheel shape for proven speed and control.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'56mm sizing, 99a durometer rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Repeater Formula Four 53mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Repeater-Formula-Four-53mm-99a-Skateboard-Wheels-_359338-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Repeater-Formula-Four-53mm-99a-Skateboard-Wheels-_359338-back-US.jpg',
		],
		4295,
		'53mm',
		'BLACK',
		"Finish off your setup with Spitfire's Repeater Formula Four 53mm 99a skateboard wheels! These high performance skate wheels come in a sleek black colorway replete with repeated Bighead graphics throughout. They offer chief control on all surfaces, unmatched flatspot resistance, and a wider version of the classic shape that's designed for longer lasting speed and controllable slide.",
		[
			'Repeater Formula Four 53mm 99a Skateboard Wheels by Spitfire.',
			'black colorway with repeated Bighead graphics throughout.',
			"Spitfire's Formula Four urethane design.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'53mm sizing, 99a durometer hardness rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones Roughriders ATF 59mm 80a White Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-White-Cruiser-Wheels-_347432-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-White-Cruiser-Wheels-_347432-back-US.jpg',
		],
		4495,
		'59mm',
		'MULTI',
		'Shred over any surface with the Rough Riders ATF 59mm 80a white cruiser wheels from Bones! Thicker than your average skateboard wheel, these roughriders come with a 59mm diameter, perfect for speedy shralping and bombing hills, while the soft 80a durometer grips asphalt and glosses over bumps in the road with ease. Geometric black graphics decorate the sides of the wheels, with the Bones logo displayed prominently across the top for a splash of branded steez.',
		[
			'Roughriders ATF 59mm 80a White Cruiser Wheels by Bones.',
			'White colorway with black graphic and logo script throughout.',
			'59mm sizing and 80a durometer.',
			'Smooth wheel surface.',
			'All Terrain Formula.',
			'Flat-spot resistance.',
			'Set of four wheels.',
			'Premium soft urethane construction.',
			'Made in USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Formula Four Classic 53mm 99a Orange Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-53mm-99a-Orange-Skateboard-Wheels-_338542-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-53mm-99a-Orange-Skateboard-Wheels-_338542-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Formula-Four-Classic-53mm-99a-Orange-Skateboard-Wheels-_338542-alt1-US.jpg',
		],
		4295,
		'53mm',
		'WHITE',
		'Get the perfect set of wheels for all occasions with the Spitfire Formula Four Classic 53mm 99a orange skateboard wheels. These bright orange wheels come in a 53mm sizing for an ideal middle ground of roll speed and accelleration, while the 99a durometer offers controllable grip too.',
		[
			'Formula Four Classic 53mm 99a Orange Skateboard Wheels by Spitfire.',
			"Spitfire's Formula Four urethane design.",
			"Spitfire's classic wheel shape for an ideal mix of speed and control.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'53mm sizing.',
			'99a durometer rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones Reyes Crimson V6 STF 54mm 99a White Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reyes-Crimson-V6-STF-54mm-99a-White-Skateboard-Wheels-_358555-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reyes-Crimson-V6-STF-54mm-99a-White-Skateboard-Wheels-_358555-back-US.jpg',
		],
		4295,
		'54mm',
		'WHITE',
		"The Reyes Crimson Bones 54mm 99a skateboard wheels come in a white colorway with watermelon-inspired graphics. They've been designed with STF (Street Tech Formula) for more stability and less flat spots, and V6, which is a wider cut shape, giving you ultimate performance.",
		[
			'Reyes Crimson V6 STF 54mm 99a White Skateboard Wheels from Bones.',
			'Signature Ryan Reyes pro model.',
			'Watermelon-inspired graphics.',
			'V6 wide-cut shape.',
			'Street Tech Formula for reduced flat spots.',
			'Designed for longer grinds and better stability.',
			'54mm size.',
			'99a durometer hardness rating.',
			'Bones Original Formula for reduced flat spots.',
			'High rebound for speed.',
			'UV protected.',
			'Set of four Bones wheels.',
			'100% urethane.',
			'Made in the USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Mercer 53mm 99a Black & White Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-53mm-99a-Black-%26-White-Skateboard-Wheels-_338628-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-53mm-99a-Black-%26-White-Skateboard-Wheels-_338628-back-US.jpg',
		],
		2495,
		'53mm',
		'WHITE',
		"Mix a little greyscale style into your setup with Mercer's 53mm 99a black and white skateboard wheels! The sturdy 99a durometer gives these wheels the stiffness they need to slide while still providing enough grip to rip it on rougher asphalt, while the 53mm sizing lends a blend of pop and speed control, so you can shred on in monochromatic style.",
		[
			'53mm 99a Black & White Skateboard Wheels from Mercer.',
			'Includes 4 urethane wheels.',
			'53mm sizing.',
			'99a durometer rating.',
			'100% urethane.',
		],
		mercerBrand,
		wheelsCategory
	);
	await createProduct(
		'Orbs Apparitions Split 54mm 99a Black & White Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Apparitions-Split-54mm-99a-Black-%26-White-Skateboard-Wheels-_327251-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Apparitions-Split-54mm-99a-Black-%26-White-Skateboard-Wheels-_327251-back-US.jpg',
		],
		2695,
		'54mm',
		'BLACK',
		'Give your setup some much needed love with the Apparitions Split 54mm 99a black and white skateboard wheels from Orbs by Welcome Skateboards! Half black and half white, these wheels are guaranteed to not give you any flat spots, so you can upgrade your board and its style all at once.',
		[
			'Apparitions Split 54mm 99a Black & White Skateboard Wheels from Orbs Wheels.',
			'54mm sizing and 99a durometer hardness.',
			'No flatspots guaranteed.',
			'Black and white split colorway.',
			'Set of 4 wheels included.',
			'Premium urethane construction.',
		],
		orbsBrand,
		wheelsCategory
	);
	await createProduct(
		'Ricta Clouds White 56mm 78a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-White-56mm-78a-Skateboard-Wheels-_340383-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-White-56mm-78a-Skateboard-Wheels-_340383-back-US.jpg',
		],
		3995,
		'56mm',
		'WHITE',
		"Get flyin' in easy style with the Clouds white 56mm 78a skateboard wheels from Ricta! These wheels feature a striking, white color with crisp, blue highlights to add plenty of contrast to any skate setup. With a soft 78a durometer and a medium 56mm size, these wheels are going to make any skateboard super comfortable.",
		[
			'Clouds White 56mm 78a Skateboard Wheels from Ricta.',
			'Includes 4 white urethane wheels with blue, embossed script.',
			'56mm sizing, 78a durometer rating.',
			'100% urethane.',
		],
		rictaBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones Roughriders ATF 59mm 80a Black Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-Black-Cruiser-Wheels-_347433-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-Black-Cruiser-Wheels-_347433-back-US.jpg',
		],
		4495,
		'59mm',
		'BLACK',
		"Haul ass down hills and blast over bumps with Bones' Roughrider ATF 59mm 80a black cruiser wheels! Large and in charge, these wheels come in a sizeable 59mm diameter, with an 80a durometer soft enough to sail over small obstacles and just hard enough to powerslide. The all-black colorway keeps things steezy and subtle, while triangular patterns and logo graphics on the sidewalls lend the looks a splash of eye-catching steez.",
		[
			'Roughriders ATF 59mm 80a Black Cruiser Wheels by Bones.',
			'Black colorway with white graphics and logo script throughout.',
			'59mm sizing and 80a durometer.',
			'Smooth wheel surface.',
			'All Terrain Formula.',
			'Flat-spot resistance.',
			'Set of four wheels.',
			'Premium soft urethane construction.',
			'Made in USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Ricta Clouds 55mm 86a White & Red Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-55mm-86a-White-%26-Red-Skateboard-Wheels-_340381-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-55mm-86a-White-%26-Red-Skateboard-Wheels-_340381-back-US.jpg',
		],
		3995,
		'55mm',
		'WHITE',
		'Add some contrast into your skate collection with the Clouds 55mm 86a white and red skateboard wheels from Ricta! These wheels feature striking red-on-white text around the outer sidewalls for some nice pop, while the soft, 86a durometer gives any setup a comfortable, plush ride on any street.',
		[
			'Clouds 55mm 86a White & Red Skateboard Wheels from Ricta.',
			'Includes 4 urethane wheels with white and red colorway.',
			'Embossed logo script on each wheel.',
			'55mm sizing, 86a durometer rating.',
			'100% urethane.',
		],
		rictaBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones Armanto Spritz 58mm 84b Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Armanto-Spritz-58mm-84b-Skateboard-Wheels-_358559-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Armanto-Spritz-58mm-84b-Skateboard-Wheels-_358559-back-US.jpg',
		],
		4295,
		'58mm',
		'MULTI',
		'The Armanto Spritz Bones skateboard wheels come in an off-white colorway with sidewall graphics of fruit, as well as have a 58mm diameter and a 84b durometer reading for the perfect skate park companion.',
		[
			'Armanto Spritz 58mm 84b Skateboard Wheels from Bones.',
			'Signature Lizzie Armanto pro models.',
			'58mm size 84b durometer hardness rating.',
			'Bones Original Formula for reduced flat spots.',
			'High rebound for speed.',
			'UV protected.',
			'Custom fruit graphics on the sidewalls.',
			'Set of four Bones wheels.',
			'100% urethane.',
			'Made in the USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Ricta Clouds 54mm 92a White and Black Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-54mm-92a-White-and-Black-Skateboard-Wheels-_340382-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Ricta-Clouds-54mm-92a-White-and-Black-Skateboard-Wheels-_340382-back-US.jpg',
		],
		3995,
		'54mm',
		'WHITE',
		'Upgrade your setup with the Ricta Clouds 54mm 92a white and black skateboard wheels! These wheels feature a medium-soft 92a durometer, while the 54mm sizing ensures your setup will be as comfortable as possible.',
		[
			'Clouds 54mm 92a White and Black Skateboard Wheels from Ricta.',
			'Embossed logo script.',
			'Includes 4 urethane wheels.',
			'54mm sizing, 92a durometer rating.',
			'100% urethane.',
		],
		rictaBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones Roughriders ATF 59mm 80a Red Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-Red-Cruiser-Wheels-_347434-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Roughriders-ATF-59mm-80a-Red-Cruiser-Wheels-_347434-back-US.jpg',
		],
		4495,
		'59mm',
		'Red',
		"Fly down byways and speed down streets on the Roughrider ATF 59mm 80a red cruiser wheels from Bones! Soft and sturdy, these wheels come in an 80a durometer, which lends them ample grip and will help you glide over rugged terrain, while the 59mm sizing lets you get up to speed in a flash. The bright red colorway lends some can't-miss vibrancy to the wheels, and triangular patterning and Bones logos on the sidewalls lend the wheels a splash of tessellated steez.",
		[
			'Roughriders ATF 59mm 80a Red Cruiser Wheels by Bones.',
			'Red colorway with black graphics and logo script throughout.',
			'59mm sizing and 80a durometer.',
			'Smooth wheel surface.',
			'All Terrain Formula.',
			'Flat-spot resistance.',
			'Set of four wheels.',
			'Premium soft urethane construction.',
			'Made in USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Mercer 56mm 80a Opaque Blue Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-56mm-80a-Opaque-Blue-Skateboard-Wheels-_362929-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-56mm-80a-Opaque-Blue-Skateboard-Wheels-_362929-back-US.jpg',
		],
		3795,
		'56mm',
		'MULTI',
		"These 56mm 80a skateboard wheels from Mercer come in opaque blue colorway that's sure to stand out on any skateboard complete. Whether you use them for cruising or street skating, these skate wheels provide a durable grip and a smooth ride over most pebbles and cracks.",
		[
			'56mm 80a Opaque Blue Skateboard Wheels from Mercer Wheels.',
			'Opaque light blue colorway.',
			'>Reinforced plastic core with flat spot-resistant construction.',
			'56mm sizing and 80a durometer.',
			'Set of 4 wheels.',
			'100% urethane.',
		],
		mercerBrand,
		wheelsCategory
	);
	await createProduct(
		'Mercer 65mm 80a Red Longboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-65mm-80a-Red-Longboard-Wheels-_362931-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-65mm-80a-Red-Longboard-Wheels-_362931-back-US.jpg',
		],
		4295,
		'65mm',
		'Red',
		'These longboard wheels from Mercer come in an opaque red colorway, perfect for adding a touch of color to any setup. The 65mm sizing is great for building and maintaining speed,while the 80a durometerand urethane formula provides plenty of grip for any style of longboarding.',
		[
			'65mm 80a Red Longboard Wheels from Mercer Wheels.',
			'Opaque red colorway.',
			'Set of 4 wheels.',
			'65mm sizing.',
			'80a hardness rating.',
			'Good for cruising and carving.',
			'Fast, soft, superior grip.',
		],
		mercerBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones 100 Ringers 51mm Blue & Black Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-51mm-Blue-%26-Black-Skateboard-Wheels-_171863-front-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-51mm-Blue-%26-Black-Skateboard-Wheels-_289553-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-51mm-Blue-%26-Black-Skateboard-Wheels-_171863-back-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-51mm-Blue-%26-Black-Skateboard-Wheels-_289553-back-US.jpg',
		],
		2995,
		'51mm',
		'BLACK',
		"Feel the difference in performance when you swap out your dusted wheels with Bone's 100 Ringers 51mm Blue and Black Skateboard Wheels. Designed with the brand's original high performance formula offering flat spot resistance and speed, perfect for both in the park and out in the streets!",
		[
			'100 Ringers 51mm Blue and Black Skateboard Wheels from Bones.',
			'51mm size 100a durometer hardness rating.',
			'Bones Original Formula for reduced flat spots.',
			'High rebound for speed.',
			'UV protected.',
			'Custom Bones logo graphics on wheel walls.',
			'Set of four Bones wheels.',
			'100% urethane.',
			'Made in the USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'Orbs Wheels Specters Swirls 56mm 99a Blue & White Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_166834-front-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_334957-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_166834-back-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_334957-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_166834-alt1-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Specters-Swirls-56mm-99a-Blue-%26-White-Skateboard-Wheels-_334957-alt1-US.jpg',
		],
		2995,
		'56mm',
		'BLUE',
		'Upgrade your daily rider with the Specters Swirl blue and white skateboard wheels from Orbs Wheels by Welcome Skateboards.Designed with a blue and white swirled colorway and black branding on the front, these 56mm wheels also offer a full conical shape as well as a non-cored',
		[
			'Specters Swirl 56mm 99a Blue & White Skateboard Wheels from Orbs Wheels.',
			'56mm sizing and 99a durometer hardness.',
			'No flatspots guaranteed.',
			'Full conical shape.',
			'Non-cored.',
			'Set of 4 wheels included.',
			'Plasmathane construction.',
		],
		orbsBrand,
		wheelsCategory
	);
	await createProduct(
		'Mercer 70mm 80a Black Longboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-70mm-80a-Black-Longboard-Wheels-_362932-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-70mm-80a-Black-Longboard-Wheels-_362932-back-US.jpg',
		],
		4495,
		'70mm',
		'MULTI',
		'These longboard wheels from Mercer are featured in a solid black colorway, perfect for keeping your set up sleek. The larger 70mm sizing is great for building speed, while the 80a durometer and urethane construction is sure to provide grip and a smooth ride throughout your longboarding sessions.',
		[
			'70mm 80a Black Longboard Wheels from Mercer Wheels.',
			'Black colorway.',
			'Set of 4 wheels.',
			'70mm sizing.',
			'80a hardness rating.',
			'Good for cruising and carving.',
			'Fast, soft, superior grip.',
		],
		mercerBrand,
		wheelsCategory
	);
	await createProduct(
		'OJ Super Juice 55mm 78a White Mini Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-55mm-78a-White-Mini-Cruiser-Wheels-_340368-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-55mm-78a-White-Mini-Cruiser-Wheels-_340368-back-US.jpg',
		],
		4195,
		'55mm',
		'WHITE',
		"Speed away into the sunset on OJ's Super Juice 55mm 78a mini cruiser wheels! With a gummy 78a durometer and a smaller-than-average 55mm sizing, these cruiser wheels will fit solidly on any compact off-roading setup you craft, while the all-white colorway keeps things looking clean.",
		[
			'Super Juice 55mm 78a White Mini Cruiser Wheels from OJ.',
			'White colorway, with logo script on sides.',
			'Set of 4 wheels.',
			'55mm sizing.',
			'78a hardness rating.',
			'100% urethane.',
		],
		ojBrand,
		wheelsCategory
	);
	await createProduct(
		'Mercer 60mm 80a Avocado Green Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-60mm-80a-Avocado-Green-Cruiser-Wheels-_362930-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mercer-60mm-80a-Avocado-Green-Cruiser-Wheels-_362930-back-US.jpg',
		],
		3995,
		'60mm',
		'MULTI',
		'Featured in an avocado green colorway, these 60mm 80a cruiser skateboard wheels from Mercer are a great way to add some color to your skateboard set up. The 80a durometer provides a some absorption of bumps, while the urethane construction offers a smooth ride over uneven surfaces.',
		[
			'60mm 80a Avocado Green Cruiser Wheels from Mercer Wheels.',
			'Opaque lime green colorway.',
			'Reinforced plastic core with flat spot-resistant construction.',
			'60mm sizing and 80a durometer.',
			'Set of 4 wheels.',
			'100% urethane.',
		],
		mercerBrand,
		wheelsCategory
	);
	await createProduct(
		'OJ Super Juice 60mm 87a Orange Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-60mm-87a-Orange-Cruiser-Wheels-_357126-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-60mm-87a-Orange-Cruiser-Wheels-_357126-back-US.jpg',
		],
		4495,
		'60mm',
		'ORANGE',
		'The 60mm Super Juice OJ cruiser wheels come in orange with printed branding on the side. These soft skate wheels have a reinforced plastic core and a chip-resistant shape for long-term durability. These super smooth OJ wheels are wider and softer than your average skateboard wheels, making them ideal for cruising.',
		[
			'Super Juice 60mm 87a Orange Cruiser Wheels from OJ.',
			'Printed text on side.60mm sizing.',
			'78a hardness rating.',
			'Set of 4 wheels.',
			'100% urethane.',
		],
		ojBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Oski Scorched Radials Formula Four 55mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Oski-Scorched-Radials-Formula-Four-55mm-99a-Skateboard-Wheels-_355875-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Oski-Scorched-Radials-Formula-Four-55mm-99a-Skateboard-Wheels-_355875-back-US.jpg',
		],
		4295,
		'55mm',
		'WHITE',
		"Take your heat to the streets with Spitfire's Oski Scorched Radials Formula Four 55mm 99a skateboard wheels! Spitfire's Radial wheel shape offers excellent control, with a 99a durometer keeping the wheels slide-friendly, while their 55mm sizing will still slot right into most standard setups. Graphics of a fire-breathing dragon adorn the wheels' sides, offering up a dash of spicy style.",
		[
			'Oski Scorched Radials Formula Four 55mm 99a Skateboard Wheels by Spitfire.',
			'Signature Oskar Rozenberg  pro model.',
			'Fire-breathing dragon graphics on side.',
			"Spitfire's Formula Four urethane design.",
			"Spitfire's Radial wheel shape for amplified control and powerful slides.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'55mm sizing, 99a durometer hardness rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		'Orbs Wheels Apparitions Splits 53mm 99a Neon Coral & Black Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Apparitions-Splits-53mm-99a-Neon-Coral-%26-Black-Skateboard-Wheels-_166601-front-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Apparitions-Splits-53mm-99a-Neon-Coral-%26-Black-Skateboard-Wheels-_166601-back-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Orbs-Wheels-Apparitions-Splits-53mm-99a-Neon-Coral-%26-Black-Skateboard-Wheels-_166601-alt1-CA.jpg',
		],
		2695,
		'53mm',
		'BLACK',
		"Master your power slides with the neon coral and black Apparitions Splits 53mm skateboard wheels from Orbs Wheels by Welcome Skateboards.Designed with a two-toned split colorway, these pink and black wheels are sure to turn some heads and help you ride smoother and longer.Constructed with Orbs' new Plasmathane formula, these wheels are guaranteed to stay flatspot free.",
		[
			'Apparitions Split 53mm 99a Neon Coral & Black Skateboard Wheels from Orbs Wheels.',
			'53mm sizing and 99a durometer hardness.',
			'Full round shape.',
			'Non-cored.',
			'No flatspots guaranteed.',
			'Pink and black split colorway.',
			'Set of 4 wheels included.',
			'Premium urethane construction.',
		],
		orbsBrand,
		wheelsCategory
	);
	await createProduct(
		'Bones 100 Ringers 52mm Green & Black Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-52mm-Green-%26-Black-Skateboard-Wheels-_289554-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-100-Ringers-52mm-Green-%26-Black-Skateboard-Wheels-_289554-back-US.jpg',
		],
		2995,
		'52mm',
		'BLACK',
		"Customize your board to include Bones' 100 Ringers 52mm Green and Black Skateboard Wheels as part of your go-to setup. Made from the brand's classic original formula, this set of wheels boast amazing speed and impeccable flat spot resistance.",
		[
			'100 Ringers 52mm Green and Black Skateboard Wheels from Bones.',
			'52mm size 100a durometer hardness rating.',
			'Bones Original Formula for reduced flat spots.',
			'High rebound for speed.',
			'UV protected.',
			'Custom Bones logo graphics on wheel walls.',
			'Set of four Bones wheels.',
			'100% urethane.',
			'Made in the USA.',
		],
		bonesBrand,
		wheelsCategory
	);
	await createProduct(
		'OJ Super Juice 55mm 78a Black Mini Cruiser Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-55mm-78a-Black-Mini-Cruiser-Wheels-_340367-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OJ-Super-Juice-55mm-78a-Black-Mini-Cruiser-Wheels-_340367-back-US.jpg',
		],
		4195,
		'55mm',
		'BLACK',
		"Whether you're moseying down the road or hurtling down the highway, keep your setup rough-road ready with OJ's Super Juice 55mm 78a black mini cruiser wheels! These sweet little shralpers come in a middle-of-the-road 55mm sizing, perfect for popping onto your skateboards and cruiser setups alike, while the grippy 78a durometer will let you haul ass over any obstacles in your path. With a sleek, all-black colorway keeping things low-key, and crimson-colored Super Juice graphics on the sidewalls, these wheels are sure to add a little steez to any setup you assemble.",
		[
			'Super Juice 55mm 78a Black Mini Cruiser Wheels from OJ.',
			'Black colorway, with logo script on sides.',
			'Set of 4 wheels.',
			'55mm sizing.',
			'78a hardness rating.',
			'100% urethane.',
		],
		ojBrand,
		wheelsCategory
	);
	await createProduct(
		'Spitfire Conical OG Fireball Formula Four 52mm 99a Skateboard Wheels',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Conical-OG-Fireball-Formula-Four-52mm-99a-Skateboard-Wheels-_355874-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Conical-OG-Fireball-Formula-Four-52mm-99a-Skateboard-Wheels-_355874-back-US.jpg',
		],
		4295,
		'52mm',
		'BLACK/BLACK',
		"A rad, responsive addition to any ride, Spitfire's Conical OG Fireball Formula Four 52mm 99a skateboard wheels will take your setup to the next level. Constructed from sturdy urethane, these wheels come in Spitfire's signature conical shape, keeping them lightweight and maneuverable, while their 52mm diameter keeps them trick-friendly and functional. Blue flame graphics adorn the wheels' sides, adding in a touch of fiery flair.",
		[
			'Conical OG Fireball Formula Four 52mm 99a Skateboard Wheels by Spitfire.',
			'Blue flame graphics on sides.',
			"Spitfire's Formula Four urethane design.",
			"Spitfire's Conical wheel shape: side cut profile, quick response and lightweight performance.",
			'Unmatched flat spot resistance.',
			'Includes 4 urethane wheels.',
			'52mm sizing, 99a durometer hardness rating.',
			'100% urethane.',
			'Made in the USA.',
		],
		spitfireBrand,
		wheelsCategory
	);
	await createProduct(
		' Independent Reynolds 144 Mid Silver Hollow Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/-Independent-Reynolds-144-Mid-Silver-Hollow-Skateboard-Truck-_343111-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/-Independent-Reynolds-144-Mid-Silver-Hollow-Skateboard-Truck-_343111-back-US.jpg',
		],
		3495,
		'144',
		'SILVER',
		"Make your deck as light as air with Independent's Reynolds 144 Mid silver hollow skateboard truck! These trucks come in silver with Reynolds' last name brandished on the front in iconic Baker Skateboards font. The steel axle is hollow, making them lighter than ever without sacrificing durability.",
		[
			'Reynolds 144 Mid Silver Hollow Skateboard Truck from Independent.',
			'Signature Andrew Reynolds pro model truck.',
			'Reinforced forged baseplate.',
			'Silver hanger with silver logo script and a silver baseplate.',
			'144mm hanger width.',
			'Axle is 8.25" wide.',
			'Best when used on skate decks that are 8.0"- 8.37" wide.',
		],
		independentBrand,
		trucksCategory
	);
	await createProduct(
		'Independent Raw 139 Stage 11 Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-0007-alt1.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-0007-back.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Raw-139-Stage-11-Skateboard-Truck-_209556-0007-front.jpg',
		],
		2595,
		'139',
		'SILVER',
		'Get the same high quality feel and responsiveness you have come to expect from Independent Trucks with the Independent Raw 139 Stage 11 skateboard trucks. These trucks have a 139mm width, making them perfect for skateboards between 7.75-8.25" wide. A steel axle holds up to your heaviest lines and the hollow hanger body lightens the load for a lively and lightweight feel.Trucks sold individually, add QTY 2 for full set.',
		[
			'Independent Raw 139 Stage 11 skateboard truck.',
			'Raw silver colorway.',
			'Independent truck sizing is 139.',
			'Hanger is 139mm wide for boards 7.75" to 8.25" wide.',
			'Axle is 8".',
			'4140 Chromoly steel axles.',
			'Upgraded version of Stage 10 trucks.',
			'Lightweight hollow-body hanger.',
			'Grade 8 kingpins.',
			'New precision hole drilled baseplate for improved balance and durability.',
			'High center of gravity.',
			'Imported..',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		independentBrand,
		trucksCategory
	);
	await createProduct(
		'Independent 144 Stage 11 Silver Standard Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-144-Stage-11-Silver-Standard-Skateboard-Truck-_292396-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-144-Stage-11-Silver-Standard-Skateboard-Truck-_292396-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-144-Stage-11-Silver-Standard-Skateboard-Truck-_292396-alt1-US.jpg',
		],
		2595,
		'144',
		'SILVER',
		'The 144 Stage 11 Silver Standard skateboard truck from Independent is a high performance truck that will work for all types of skateboarding. The Stage 11 skateboard truck is an upgraded version from the Stage 10, featuring a 144mm wide hanger that is ideal for decks that are 8.25" wide. Trucks sold individually, order a quantity of 2 for full set.',
		[
			'Independent 144 Stage 11 Silver Standard Skateboard Truck.',
			'Independent truck sizing is 144.',
			'Hanger is 144mm wide for decks that are 8.25" wide.',
			'Axle is 8.25".',
			'55mm height.',
			'Upgraded version of Stage 10 trucks.',
			'High center of gravity.',
			'Silver colorway.',
			'Independent logo on baseplate.',
			'Trucks sold individual, order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		independentBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder Hi 147 Sonora Black Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Hi-147-Sonora-Black-Skateboard-Truck-_149405-front-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Hi-147-Sonora-Black-Skateboard-Truck-_149405-alt1-CA.jpg',
		],
		2795,
		'147',
		'BLACK',
		'The Thunder Hi 147 sonora black skateboard trucks offer the great turning response that Thunder trucks are known for. Get back to the skate parks with confidence thanks to unbeatable trucks that are designed to stand the test of time.',
		[
			'Thunder Hi 147 Sonora Black Skateboard Truck.',
			'8.0" axle.',
			'Best when used on skate decks that are 7.9" to 8.2" wide.',
			'Axle nuts and washers included.',
			'Made in USA.',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder Sonora 147 High Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Sonora-147-High-Skateboard-Truck-_231828-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Sonora-147-High-Skateboard-Truck-_231828-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Sonora-147-High-Skateboard-Truck-_231828-alt2-US.jpg',
		],
		2795,
		'147',
		'WHITE',
		'Get your grind game on point with a strong 8.0" wide axle and all white hanger and the Thunder Sonora 147 High skateboard truck. With a Thunder engraved and durable baseplate to keep you riding longer this is certain to be your new favorite truck.Trucks sold individually, add QTY 2 for full set.',
		[
			'White Thunder logo graphic on all white colorway.',
			'Thunder engraving on baseplate.',
			'Hanger is 137mm or 5.3" wide.',
			'Axle is 8.0" or 203mm wide.',
			'Best when used on skate decks that are 7.75" to 8.25" wide.',
			'Axle nuts and washers included.',
			'Made in the USA.',
			'Trucks sold individually.',
			'Order quantity of 2 for a set.',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder 149ER Sonora High Black Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-149ER-Sonora-High-Black-Skateboard-Truck-_187621-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-149ER-Sonora-High-Black-Skateboard-Truck-_187621-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-149ER-Sonora-High-Black-Skateboard-Truck-_187621-alt1-US.jpg',
		],
		2795,
		'149',
		'BLACK',
		'Thunder trucks are superior when it comes to a buttery smooth grind, quick response turns and extra lightweight construction, which is exactly what you can expect from the Thunder 149ER Sonora High truck in black.Trucks sold individually, add QTY 2 for full set.',
		[
			'Thunder 149ER High skate truck.',
			'Custom Thunder detailing.',
			'149mm hanger.',
			'Best when used on skate decks that are 8.25" or larger.',
			'Black axle nuts and washers included.',
			'Made in USA',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder Select Purple 147 Skateboard Trucks',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Select-Purple-147-Skateboard-Trucks-_364566-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Select-Purple-147-Skateboard-Trucks-_364566-back-US.jpg',
		],
		2495,
		'147',
		'MULTI',
		'The Select 148 skateboard trucks from Thunder come in a purple colorway, with translucent purple bushings. The Thunder skateboard truck measures 8.0" wide and is suited best for skateboard setups ranging from 7.75" to 8.25". With a solid polished steel baseplate, the truck is finished with stamped Thunder branding.',
		[
			'147 Select Purple Skateboard Truck from Thunder.',
			'147mm sizing and 8" axle.',
			'Specifically designed for decks measuring 7.75"-8.25".',
			'Trucks sold individually.',
			'Order two for a full set.',
			'Trucks do not include mounting hardware.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder Select Blue 148 Skateboard Trucks',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Select-Blue-148-Skateboard-Trucks-_364567-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Select-Blue-148-Skateboard-Trucks-_364567-back-US.jpg',
		],
		2495,
		'148',
		'MULTI',
		'From Thunder comes the Select 148 skateboard truck, with a glossy metallic blue finish on the hanger. With a 8.25" axle width perfect for 8.12" to 8.38" decks , the blue truck has a solid polished baseplate with Thunder branding, and is complete with a translucent blue bushing.',
		[
			'148 Select Blue Skateboard Truck from Thunder.',
			'148mm sizing and 8.25" axle.',
			'Specifically designed for decks measuring 8.12"-8.38".',
			'Trucks sold individually.',
			'Order two for a full set.',
			'Trucks do not include mounting hardware.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Tensor Mag Light 5.5 Reflective Black & Silver Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-Mag-Light-5.5-Reflective-Black-%26-Silver-Skateboard-Truck-_335620-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-Mag-Light-5.5-Reflective-Black-%26-Silver-Skateboard-Truck-_335620-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-Mag-Light-5.5-Reflective-Black-%26-Silver-Skateboard-Truck-_335620-alt4-US.jpg',
		],
		2795,
		'5.5',
		'BLACK',
		'Introduce a brilliant new detail to your skate setup with the 5.5 Mag Light reflective black and silver skateboard truck from Tensor! This truck comes with a silver baseplate and reflective black hanger and axle for some sick and shiny vibes. The 5.5" width makes this truck an excellent size for boards between 8.125-8.375", while the lightweight construction and hollow axle and kingpin ensure that you\'ll be able to pop those ollies higher than ever before.',
		[
			'Mag Light 5.5 Reflective Black & Silver Skateboard Truck from Tensor.',
			"Tensor's latest All Terrain Geometry construction for enhanced skate performance.",
			'Responsive turning with new adjustable refined geometry.',
			'Hollow axle & kingpin.',
			'Interlocking bushings for better control.',
			'Reinforced hanger for durability.',
			'Reduced weight: 30% lighter than standard industry truck.',
			'5.5" sizing for 8.125" - 8.375" wide decks.',
		],
		tensorBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 DLK Polished 8.0" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-DLK-Polished-8.0%22-Skateboard-Truck-_335988-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-DLK-Polished-8.0%22-Skateboard-Truck-_335988-back-US.jpg',
		],
		2495,
		'8.0',
		'SILVER',
		'Grind every curb in sight with the Krux K5 DLK Polished 8.0" skateboard truck. This truck comes in a classic silver colorway for a timeless look, while the down low kingpin helps avoid hang ups on grinds, too.',
		[
			'K5 DLK Polished 8.0" Skateboard Truck by Krux Trucks.',
			'Signature Down Low Kingpin reduces hang ups for better grinds.',
			'Tested and approved by the Krux pro team.',
			'Silver colorway.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.0" wide.',
			'This truck works best on decks 7.75" - 8.25" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Independent Polished 139 Mid Skateboard Trucks',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Polished-139-Mid-Skateboard-Trucks-_335107-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Polished-139-Mid-Skateboard-Trucks-_335107-back-US.jpg',
		],
		2695,
		'139',
		'SILVER',
		'Gear up with the polished 139 mid skateboard trucks from Independent! They have a lower profile hanger that gives them an ideal angle on your tail and nose for all-around treat skating. This sleek silver truck provides sturdy structure with a polished look to compliment the graphics on your deck, while the 8.0" width is a solid choice for any deck between 7.75-8.2" wide.',
		[
			'Polished Mid 139 Skateboard Truck from Independent.',
			'Polished, all-silver hanger.',
			'139mm hanger width.',
			'Axle is 8.0" wide.',
			'Best when used on skate decks that are 7.75"- 8.2" wide.',
			'Trucks do not include mounting hardware.',
		],
		independentBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder 147 Psonoradelic Black Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-147-Psonoradelic-Black-Skateboard-Truck-_360946-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-147-Psonoradelic-Black-Skateboard-Truck-_360946-back-US.jpg',
		],
		2895,
		'147',
		'MULTI',
		'For quick response, durability, and light weight, the Thunder 147 Psonoradelic skateboard truck is ideal. This Thunder truck has a black axle with a tie-dyed logo print, and a black baseplate with engraved logo detailing. This skate truck is best suited for boards that are 8.0" wide or below.',
		[
			'147 Psonoradelic Black Skateboard Truck from Thunder.',
			'Logo graphic printed on the axle.',
			'Logo engraved forged baseplate.',
			'147mm sizing and 8.0" axle.',
			'Specifically designed for decks measuring 8.0" and below.',
			'Trucks sold individually.',
			'Order two for a full set.',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Tensor 5.0" Geo Mag Pink & Blue Fade Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-5.0%22-Geo-Mag-Pink-%26-Blue-Fade-Skateboard-Truck-_299535-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-5.0%22-Geo-Mag-Pink-%26-Blue-Fade-Skateboard-Truck-_299535-back-US.jpg',
		],
		2595,
		'5.0',
		'WHITE',
		'Completely redesigned for enhanced skateboarding execution, Tensor re-introduces their 5.0" truck in a new Geo Mag construction. Dressed up with a simple matte white colorway, these trucks remain clean cut and boast wonderful responsive turning, control, durability and lightweight performance.',
		[
			'5.0" Geo Mag Pink & Blue Faded Skateboard Truck from Tensor.',
			"Tensor's latest All Terrain Geometry construction for enhanced skate performance.",
			'Responsive turning with new adjustable refined geometry.',
			'Hollow axle & kingpin.',
			'Interlocking bushings for better control.',
			'Reinforced hanger for durability.',
			'Reduced weight: 30% lighter than standard industry truck.',
			'5.0" sizing for 7.4" - 7.75" wide decks.',
			'Order quantity of two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		tensorBrand,
		trucksCategory
	);
	await createProduct(
		'Krux x Broken Promises K5 Flutter 8.25" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-x-Broken-Promises-K5-Flutter-8.25%22-Skateboard-Truck-_341991-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-x-Broken-Promises-K5-Flutter-8.25%22-Skateboard-Truck-_341991-back-US.jpg',
		],
		3495,
		'8.25',
		'MULTI',
		'Upgrade your go to shred stick with the Krux x Broken Promises K5 Flutter 8.25" skateboard truck. This fly truck comes with images of butterflies throughout to inspire you to really fly, while the 8.25" wide hanger makes sure this truck fits perfectly flush, so you can primo stall like a pro.',
		[
			'K5 Flutter 8.25" Skateboard Truck by Krux Trucks x Broken Promises x Santa Cruz.',
			'Official Krux and Broken Promises collaboration.',
			'Tested and approved by the Krux pro team.',
			'Purple with butterfly graphics throughout.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.25" wide.',
			'Hanger is 5.25" wide.',
			'These trucks work best on decks 8.0" - 8.5" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	createProduct(
		'Venture Black Shadow 5.25" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Black-Shadow-5.25%22-Skateboard-Truck-_296779-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Black-Shadow-5.25%22-Skateboard-Truck-_296779-back-US.jpg',
		],
		2795,
		'5.25',
		'BLACK',
		'Confidently get your grind on with the responsive Black Shadow 5.25" Skateboard Truck from Venture. Designed with Venture logo details on the hanger and on the baseplate, both of which are completely blacked out giving this truck a menacing sleek look.',
		[
			'Black Shadow 5.25" Skateboard Truck from Venture Trucks.',
			'Venture engraving on baseplate.',
			'5.25" wide hanger and 8" wide axle.',
			'Mid truck height: 2.5".',
			'Best when used on skate decks that are 7.8" to 8.0" wide.',
			'Axle nuts and washers included.',
			'Made in USA.',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Venture Worrest Custom V-Lights 5.6 " Skateboard Trucks',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Worrest-Custom-V-Lights-5.6-%22-Skateboard-Trucks-_365094-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Worrest-Custom-V-Lights-5.6-%22-Skateboard-Trucks-_365094-US-1.jpg',
		],
		3195,
		'5.6',
		'MULTI',
		'From Venture comes the Worrest Custom V-Lights 5.6" skateboard trucks in a black colorway. These signature Bobby Worrest pro skateboard trucks have an Axel size of 8.25", being suitable for most decks 8.1" to 8.4" in width, and feature lightweight kingpins with a forged baseplate for strength and medium hardness rubbers for true turn; coming complete with standard anti-slip axles and hollow kingpins for a lightweight construction .',
		[
			'Worrest Custom V-Lights 5.6" Skateboard Truck from Venture.',
			'Bobby Worrest signature pro model.',
			'Reinforced forged baseplate.',
			'5.6" hanger width.',
			'Hollow Kingpins for lighter truck weight over all.',
			'Axle is 8.25" wide.',
			'Mid truck height: 2.5".',
			'Best when used on skate decks that are 8.25" inches wide.',
			'Made in USA.',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder 148 Sonora Red & Black Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-148-Sonora-Red-%26-Black-Skateboard-Truck-_360947-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-148-Sonora-Red-%26-Black-Skateboard-Truck-_360947-back-US.jpg',
		],
		2795,
		'148',
		'MULTI',
		'The 148 Thunder skateboard truck has a Sonora red axle with a printed logo, and a black forged baseplate with engraved logo detailing. These Thunders are designed for quick response and longevity, and have a 148mm sizing with an 8.25" axle. These are best utilized for skateboards measuring between 8.25" and 8.75".',
		[
			'148 Sonora Red & Black Skateboard Truck from Thunder.',
			'Logo graphic printed on the axle.',
			'Logo engraved forged baseplate.',
			'148mm sizing and 8.25" axle.',
			'Specifically designed for decks measuring 8.25"-8.75".',
			'Trucks sold individually.',
			'Order two for a full set.',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 Galaxy 8.0" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Galaxy-8.0%22-Skateboard-Truck-_340335-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Galaxy-8.0%22-Skateboard-Truck-_340335-back-US.jpg',
		],
		2695,
		'8.0',
		'MULTI',
		'Slide some starry style into your setup with the K5 Galaxy 8.0" skateboard truck from Krux! Designed for boards from 7.75-8.25" wide, this truck comes with Krux\'s signature Down Low kingpin, so you can get your grind on without worrying about hang-ups, while the purple-tinted galaxy print adorning the exterior lends it a dash of celestial detailing.',
		[
			'K5 Galaxy 8.0" Skateboard Truck by Krux Trucks.',
			'Signature Down Low Kingpin reduces hang ups for better grinds.',
			'Tested and approved by the Krux pro team.',
			'Purple galaxy print through exterior.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.0" wide.',
			'This truck works best on decks 7.75" - 8.25" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 Black Widow 8.25" Skateboard Truck',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Black-Widow-8.25%22-Skateboard-Truck-_335986-front-US.jpg'],
		2495,
		'8.25',
		'BLACK',
		'Keep your set up sleek and durable with the Krux K5 black Widow 8.25" skateboard truck. This truck comes with a forged baseplate to withstand all-manner of impacts, and the black colorway is crisp looking too.',
		[
			'K5 Black Widow 8.25" Skateboard Truck by Krux Trucks.',
			'Tested and approved by the Krux pro team.',
			'Black colorway.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.25" wide.',
			'This truck works best on decks 8.0" - 8.5" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Tensor Geo Mag 5.25" Black Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-Geo-Mag-5.25%22-Black-Skateboard-Truck-_299453-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Tensor-Geo-Mag-5.25%22-Black-Skateboard-Truck-_299453-back-US.jpg',
		],
		2595,
		'5.25',
		'BLACK',
		'Completely redesigned for enhanced skateboarding execution, Tensor re-introduces their 5.25" truck in a fresh all-black colorway with all terrain geometry. Dressed up with a sinister black and white colorway, these trucks remain sleek and boast wonderful responsive turning, control and durability while the magnesium construction provides lightweight performance.',
		[
			'5.25" Black Skateboard Truck from Tensor.',
			"Tensor's latest All Terrain Geometry construction for enhanced skate performance.",
			'Responsive turning with new adjustable refined geometry.',
			'Lower kingpin for no grind hang-ups.',
			'Interlocking bushings for better control.',
			'Reinforced hanger for durability.',
			'Magnesium construction means reduced weight: 30% lighter than standard industry truck.',
			'5.25" sizing for 7.75" - 8.0" wide decks.',
			'Order quantity of two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		tensorBrand,
		trucksCategory
	);
	await createProduct(
		'Venture Throw 5.6" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Throw-5.6%22-Skateboard-Truck-_360978-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Throw-5.6%22-Skateboard-Truck-_360978-back-US.jpg',
		],
		2795,
		'5.6',
		'MULTI',
		'From Venture comes the Throw 5.6" skateboard truck, featuring a polished silver 5.6" hanger and flat black reinforced baseplate. Clear yellow 90DU bushings add a pop of color, along with the yellow graffiti-inspired Venture graphic on the front.',
		[
			'Polished 5.6" Skateboard Truck from Venture.',
			'Reinforced forged baseplate.',
			'5.6" hanger width.',
			'Axle is 8.25" wide.',
			'Mid truck height: 2.5".',
			'Best when used on skate decks that are 8.25" inches wide.',
			'Made in USA.',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Thunder Polished 147 Skateboard Trucks',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Polished-147-Skateboard-Trucks-_279685-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Polished-147-Skateboard-Trucks-_279685-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Thunder-Polished-147-Skateboard-Trucks-_279685-alt2-US.jpg',
		],
		2495,
		'147',
		'SILVER',
		'Get extra smooth grinds and turns with the quickness of the Thunder Polished trucks in a silver colorway.',
		[
			'Thunder polished 147 skateboard trucks.',
			'Polished silver colorway.',
			'Hanger is 147mm or 5.3" wide.',
			'Axle is 8.0" or 203mm wide.',
			'Best when used on skate decks that are 7.75" to 8.25" wide.',
			'Made in USA.',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
			'',
			'Warranty:',
			'Lifetime limited warranty through manufacturer.',
		],
		thunderBrand,
		trucksCategory
	);
	await createProduct(
		'Independent Winkowski Hollow Baller 144 Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Winkowski-Hollow-Baller-144-Skateboard-Truck-_340349-front-US.jpg',
		],
		3695,
		'144',
		'SILVER',
		"Slay your favorite skatepark in lightweight and lively fashion with the Independent Winkowski Hollow Baller 144 skateboard truck. This truck comes with a hollow axle and king pin construction to lighten the load, while the 8 ball graphic next to Winkowski's name script makes the look really pop.",
		[
			'Winkowski Hollow Baller 144 Skateboard Truck from Independent.',
			'Signature Erick Winkowski pro model truck.',
			'Hollow king pin and axle construction.',
			'Reinforced forged baseplate.',
			'Black 8 ball graphics.',
			'144mm hanger width.',
			'Axle is 8.25" wide.',
			'Best when used on skate decks that are 8.0"- 8.37" wide.',
		],
		independentBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 Hollow Green Krome 8.0" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Hollow-Green-Krome-8.0%22-Skateboard-Truck-_335987-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Hollow-Green-Krome-8.0%22-Skateboard-Truck-_335987-back-US.jpg',
		],
		2995,
		'8.0',
		'GREEN',
		'Lighten your load while grinding it out on the Krux K5 Hollow green Krome 8.0" skateboard truck. A shiny green colorway makes this truck really pop, while the hollow construction ensures your ollies will hit new heights.',
		[
			'K5 Hollow Green Krome 8.0" Skateboard Truck by Krux Trucks.',
			'Hollow axle and kingpin reduce weight.',
			'Signature Down Low Kingpin reduces hang ups for better grinds.',
			'Tested and approved by the Krux pro team.',
			'Shiny green colorway.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.0" wide.',
			'This truck works best on decks 7.75" - 8.25" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Venture Vue 5.2" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Vue-5.2%22-Skateboard-Truck-_366915-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Vue-5.2%22-Skateboard-Truck-_366915-back-US.jpg',
		],
		2495,
		'5.2',
		'MULTI',
		'The Vue skateboard truck from Venture features a 5.2" hanger width, best used on an 8.25" deck. This truck comes in a solid red colorway with a silver, reinforced baseplate boasting the brand name for easy recognition.',
		[
			'Vue 5.2" Skateboard Truck from Venture.',
			'Reinforced forged baseplate.',
			'5.2" hanger width.',
			'Axle is 8.25" wide.',
			'Mid truck height: 2.5".',
			'Best when used on skate decks that are 8.25" inches wide.',
			'Made in USA.',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 Pale Blue & Pink 8.25" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Pale-Blue-%26-Pink-8.25%22-Skateboard-Truck-_342896-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-Pale-Blue-%26-Pink-8.25%22-Skateboard-Truck-_342896-back-US.jpg',
		],
		2795,
		'8.25',
		'MULTI',
		'The K5 skateboard truck from Krux has an 8.25" width, making them ideal for skateboards that are 8.0 - 8.5" wide, and they come in a dual colorway: a pale blue hanger and pink baseplate.',
		[
			'K5 Pale Blue & Pink 8.25" Skateboard Truck by Krux Trucks.',
			'Pale blue hanger and pink baseplate.',
			'Tested and approved by the Krux pro team.',
			'Custom Krux engraved baseplate.',
			'Axle is 8.25" wide.',
			'This truck works best on decks 8.0" - 8.5" wide.',
			'Trucks sold individually.',
			'Order two for a complete set.',
			'Trucks do not include mounting hardware.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Venture Full Bleed Silver & Green 5.6" Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Full-Bleed-Silver-%26-Green-5.6%22-Skateboard-Truck-_357267-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-Full-Bleed-Silver-%26-Green-5.6%22-Skateboard-Truck-_357267-back-US.jpg',
		],
		2795,
		'5.6',
		'MULTI',
		'The Full Bleed skateboard truck from Venture has a silver hanger with a sublimated Venture logo and a green baseplate. The hanger is 5.6" wide, making these ideal for boards that are 8.25" wide.',
		[
			'Full Bleed Silver & Green 5.6" Skateboard Truck from Venture.',
			'Silver hanger and green baseplate.',
			'Custom Venture logo on hanger.',
			'Hanger is 5.6" wide.',
			'Axle is 8.25" wide.',
			'Best when used on skate decks that are 8.25" wide.',
			'Axle nuts and washers included.',
			'Made in USA.',
			'Trucks sold individually!',
			'Order quantity of 2 for a set!',
			'Trucks do not include mounting hardware.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Krux K5 DLK 8.0" Rainbow Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-DLK-8.0%22-Rainbow-Skateboard-Truck-_342895-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-K5-DLK-8.0%22-Rainbow-Skateboard-Truck-_342895-back-US.jpg',
		],
		2795,
		'8.0',
		'MULTI',
		'Send it in colorful style with the K5 DLK 8.0" rainbow skateboard truck from Krux Trucks. This skateboard truck has an 8 inch wide axle, which works best with decks that are from 7.75" - 8.25" in width. A rainbow hanger is complemented by a silver baseplate, and the custom Krux engraving on the baseplate completes the look.',
		[
			'K5 DLK 8.0" Rainbow Skateboard Truck from Krux Trucks.',
			'Tested and approved by the Krux pro team.',
			'Rainbow hanger and silver baseplate colorway.',
			'Custom Krux engraving on baseplate.',
			'Axle is 8.0" wide.',
			'Hanger is 5.35" wide.',
			'These trucks work best on decks 7.75" - 8.25" wide.',
		],
		kruxBrand,
		trucksCategory
	);
	await createProduct(
		'Venture White Lightning 5.2 Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-White-Lightning-5.2-Skateboard-Truck-_335070-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Venture-White-Lightning-5.2-Skateboard-Truck-_335070-back-US.jpg',
		],
		2795,
		'5.2',
		'WHITE',
		'For a durable ride with excellent response grab the Venture White Lightning 5.2 skateboard truck. This truck features a forged baseplate for enhanced durability points and the white colorway with silver logo detailing is certain to add some icy flair to any complete.',
		[
			'White Lightning 5.2 Skateboard Truck from Venture.',
			'Reinforced forged baseplate.',
			'White colorway with grey logo detailing on the hanger.',
			'5.2" hanger width.',
			'Axle is 8.0" wide.',
			'Mid truck height: 2.5".',
			'Best when used on skate decks that are 8.0" to 8.5" wide.',
			'Made in USA.',
		],
		ventureBrand,
		trucksCategory
	);
	await createProduct(
		'Independent Lemos Mid 149 Skateboard Truck',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Lemos-Mid-149-Skateboard-Truck-_340356-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Lemos-Mid-149-Skateboard-Truck-_340356-back-US.jpg',
		],
		3695,
		'149',
		'SILVER',
		'Shred like a legend in lightweight fashion with a little help from the Independent Lemos Mid 149 skateboard truck. Perfect for pairing with an 8.5" deck, this truck features a hollow axle and king pin to lighten the load, and the Tiago Lemos name script on the hanger pays a worthy homage to the epic pro.',
		[
			'Lemos Mid 149 Skateboard Truck from Independent.',
			'Signature Tiago Lemos pro model truck.',
			'Hollow king pin and axle construction.',
			'Reinforced forged baseplate.',
			'Black script on the hanger.',
			'149mm hanger width.',
			'Axle is 8.5" wide.',
			'Best when used on skate decks that are 8.37"- 8.75" wide.',
		],
		independentBrand,
		trucksCategory
	);

	// Bearings
	await createProduct(
		'Bones Reds Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reds-Skateboard-Bearings-_072579-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reds-Skateboard-Bearings-_072579-alt1-US.jpg',
		],
		1895,
		'ONE SIZE',
		'SILVER/RED',
		"The Bones Reds are essential when you're looking for quality bearings that offer maximum speed and durability. These reliable bearings have a pre-lubricated design using Bones Speed Cream and a removable high speed nylon ball cage for easy cleaning when they get gnarly.",
		[
			'Bones Reds skate bearings.',
			'Pre-Lubricated with Bones Speed Cream.',
			'Removable high speed nylon ball cage.',
			'Non-contact, removable rubber shield.',
			'Bones skate rated design and quality.',
			'Quantity of 8 bearings.',
		],
		bonesBrand,
		bearingsCategory
	);
	await createProduct(
		'Bones Super Reds Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Super-Reds-Skateboard-Bearings-_156448-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Super-Reds-Skateboard-Bearings-_156448-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Super-Reds-Skateboard-Bearings-_156448-0007-front.jpg',
		],
		3195,
		'ONE SIZE',
		'BLACK',
		'The Bones Super Reds skateboard bearings are a beefed up version of the classic Bones Reds bearings. These bad boys carry speed with the best of them and are built to last through endless skate sessions to come.',
		[
			'Bones Super Reds skateboard bearings.',
			'High grade steel precision skate bearings.',
			'Superior surface finish.',
			'More durable, quiet and longer lasting than original Reds.',
			'Set of 8 Bones bearings.',
		],
		bonesBrand,
		bearingsCategory
	);
	await createProduct(
		'Bones Big Balls Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Big-Balls-Skateboard-Bearings-_322221-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Big-Balls-Skateboard-Bearings-_322221-back-US.jpg',
		],
		2495,
		'ONE SIZE',
		'MULTI',
		"Fast, long lasting and easy to clean, Bones presents their latest design, the Big Balls Skateboard Bearings. Each of the eight bearings feature six larger bearing balls that have been engineered for faster performance and an overall stronger construction. Pre-lubricated withthe brand's signature Speed Cream, these bearings are built for speed demons in the park or out in the streets.",
		[
			'Big Balls Skateboard Bearings from Bones.',
			'6 bigger bearing balls for a stronger construction and faster performance.',
			'Engineered for skating, Skate Rated not Abec rated.',
			'Removable high speed nylon ball cage.',
			'Removable non-contact, frictionless rubber shields.',
			'Lubricated with low viscosity Bones Speed Cream.',
			'Set of 8 Bones bearings.',
		],
		bonesBrand,
		bearingsCategory
	);
	await createProduct(
		'Spitfire Cheapshot Skateboard Bearings',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Cheapshot-Skateboard-Bearings-_174294-0001-front.jpg'],
		1195,
		'ONE SIZE',
		'BLACK',
		'Keep the underground lit with tons of speed on the Spitfire Cheapshot skateboard bearings. These bad boys come with removal side walls for easy maintenance and the abec 3 rating is fast enough to get it done in speedy style.',
		[
			'Spitfire Cheapshot skateboard bearings.',
			'Abec 3 skate bearings.',
			'Includes set of 8 bearings.',
			'Designed for all types of skating.',
			'Black removable shields.',
			'Tested by the Spitfire pro team.',
			'Keep the Underground Lit!',
		],
		spitfireBrand,
		bearingsCategory
	);
	await createProduct(
		'Bones Black Swiss Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Black-Swiss-Skateboard-Bearings-_088486-front.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Black-Swiss-Skateboard-Bearings-_088486-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Black-Swiss-Skateboard-Bearings-_088486-alt1-US.jpg',
		],
		8995,
		'ONE SIZE',
		'MULTI',
		'Legendary Bones Swiss bearings have been the industry standard ever since they were introduced in 1983, and are still a favorite with professional skaters. Fast, smooth, and very long lasting, they remain unequaled in their class. Set of eight.',
		[
			'Bones Swiss bearings.',
			'Swiss precision bearings.',
			'Set of 8 bearings for a smooth rool.',
			'Choice of many top skate pros.',
			'Pre-lubricated.',
			'Made in Switzerland.',
		],
		bonesBrand,
		bearingsCategory
	);
	await createProduct(
		'Bones Reds Ceramics Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reds-Ceramics-Skateboard-Bearings-_156653-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reds-Ceramics-Skateboard-Bearings-_156653-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bones-Reds-Ceramics-Skateboard-Bearings-_156653-0007-front.jpg',
		],
		9995,
		'ONE SIZE',
		'MULTI',
		'The Bones Reds Ceramics skateboard bearings are just about as high quality as skate bearings come.',
		[
			'Bones Reds Ceramics skateboard bearings.',
			'100% high quality purity silicon nitride ceramic balls.',
			'Removable high speed nylon ball cages.',
			'Removable frictionless rubber shield.',
			'Lubricated with Speed Cream racing lubricant.',
			'Set of 8 Bones bearings.',
		],
		bonesBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson Raw Skateboard Bearings ',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Raw-Skateboard-Bearings--_278475-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Raw-Skateboard-Bearings--_278475-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Raw-Skateboard-Bearings--_278475-alt4-US.jpg',
		],
		4495,
		'ONE SIZE',
		'MULTI',
		'Bronson introduces their new Raw bearings, the next generation of shieldless bearings. This new design offers the same premium quality Bronson has always provided now with a shield free design for audible speed technology, smooth speed you can hear.',
		[
			'Raw Bearings from Bronson.',
			'Shield Free design.',
			'Tungsten coated races.',
			'Audible speed technology.',
			'Max impact cage.',
			'Deep groove raceways.',
			'Factory fresh quality.',
			'Includes 8 bearings.',
		],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson G2 Skateboard Bearings',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-G2-Skateboard-Bearings-_259632-front.jpg'],
		1995,
		'ONE SIZE',
		'MULTI',
		'Get some next generation performance with AeroShell 2 Aircraft grade high speed ceramic oil and straight edge frictionless shields for a smooth roll.',
		['Pop off resistant straight edge frictionless shields.', 'Deep groove raceway surfaces.', 'Set of 8 bearings and 4 spacers.'],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson G3 Skateboard Bearings',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-G3-Skateboard-Bearings-_254308-front.jpg'],
		2995,
		'ONE SIZE',
		'MULTI',
		'Improve your ride with deep groove raceways that reduce side impact damage with high speed ceramic oil compounds for rust, moisture, and corrosion resistance.',
		[
			'Pop off resistant straight edge frictionless shields.',
			'Micro groove raceway surfaces.',
			'Max impact cage design.',
			'Balls out technology eliminates shield and cage contact.',
			'Includes 8 bearings, 8 washers, and 4 spacers.',
		],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Shake Junt Triple OGs Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Triple-OGs-Skateboard-Bearings-_364893-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Triple-OGs-Skateboard-Bearings-_364893-back-US.jpg',
		],
		2495,
		'ONE SIZE',
		'MULTI',
		'The Triple OGs skateboard bearings from Shake Junt come packaged with 8 bearings, in a green and yellow colorway, and 4 spacers, as well as removable rubber shields.',
		['Triple OGs Skateboard Bearings from Shake Junt.', 'Removable rubber shields.', 'Includes 8 bearings and 4 spacers.'],
		shakeJuntBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson Ceramic Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Ceramic-Bearings-_335889-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Ceramic-Bearings-_335889-back-US.jpg',
		],
		7995,
		'ONE SIZE',
		'MULTI',
		'Keep your skating blistering fast with a set of Bronson Ceramic bearings. These bearings feature ceramic balls for increased roll speed and corrosion resistance for longevity, while the removable shields make maintenance seamless too.',
		[
			'Ceramic Bearings from Bronson.',
			'Ceramic construction for increased speed and reduced friction and corrosion.',
			'Pop off resistant straight edge frictionless shields.',
			'Deep groove raceway surfaces.',
			'Max impact cage design.',
			'Balls out technology eliminates shield and cage contact.',
			'Includes 8 bearings, 8 washers, and 4 spacers.',
		],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Andale Lucas Puig Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Lucas-Puig-Skateboard-Bearings-_342992-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Lucas-Puig-Skateboard-Bearings-_342992-back-US.jpg',
		],
		2995,
		'ONE SIZE',
		'MULTI',
		"Make sure your setup is ready to roll with Andale's Lucas Puig skateboard bearings! This set comes equipped with G5 ball bearings, perfect for keeping your shralping speedy and smooth, while the chromium alloy construction keeps the bearings sturdy. With a set of spacers ensuring that your skateboard rides smoothly, these bearings will add some shred-ready power to any board you build.",
		[
			'Lucas Puig Skateboard Bearings from Andale.',
			'Signature Lucas Puig pro model bearings.',
			'Package includes 8 bearings, 4 spacers.',
			'G5 precision ball bearings for speed.',
			'Precision machined raceways for maximum wear resistance.',
			'Removable frictionless rubber shields for easy cleaning.',
		],
		andaleBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson Mason G3 Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Mason-G3-Skateboard-Bearings-_342900-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Mason-G3-Skateboard-Bearings-_342900-back-US.jpg',
		],
		2995,
		'ONE SIZE',
		'MULTI',
		'Speed down the streets with Bronson\'s Mason G3 skateboard bearings! Produced in collaboration with Mason Silva, these pre-lubricated bearings feature frictionless shields for amplified performance, while the sturdy cages ensure that the bearings can take a punch. Black-and-white stripes decorate the shields, and laser-etched text reading "Mason" sits on the bearings\' outer rings, lending them a dash of eye-catching professional cred.',
		[
			'Mason G3 Skateboard Bearings from Bronson.',
			'Signature Mason Silva pro model.',
			'Pop off resistant straight edge frictionless shields.',
			'Deep groove raceway surfaces.',
			'Max impact cage design.',
			'Balls out technology eliminates shield and cage contact.',
			'Includes 8 bearings.',
		],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Shake Junt Night Train Bearings ',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Night-Train-Bearings--_364895-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Night-Train-Bearings--_364895-back-US.jpg',
		],
		1895,
		'ONE SIZE',
		'MULTI',
		'From Shake Junt come the Night Train skateboard bearings, featuring a sleek black colorway. With 8 high-speed ball bearings included in the box, these bearings offer premium performance at a fraction of the price. Trusted by pro skaters, the highly durable Night Train bearings come with removable rubber shields for easy cleaning.',
		[
			'Night Train skateboard bearings From Shake Junt.',
			'Gold colored casings.',
			'Green colored sides.',
			'Bearing spacers included.',
			'Set of 8 Shake Junt bearings.',
		],
		shakeJuntBrand,
		bearingsCategory
	);
	await createProduct(
		'Rush 6 Ball Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Rush-6-Ball-Skateboard-Bearings-_332616-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Rush-6-Ball-Skateboard-Bearings-_332616-back-US.jpg',
		],
		1895,
		'ONE SIZE',
		'MULTI',
		'7-balls are so last year. The Rush 6 Ball skateboard bearings feature 6 larger bearing balls, allowing for more speed and less friction than a standard bearing, making them perfect for those looking for some more oomph in their setups.',
		[
			'6 Ball Skateboard Bearings from Rush.',
			'6 bigger bearing balls for a stronger construction and faster performance.',
			'Removable high speed nylon ball cage.',
			'Removable non-contact, frictionless rubber shields.',
			'Set of 8 bearings.',
		],
		rushBrand,
		bearingsCategory
	);
	await createProduct(
		'Independent GP-B Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-GP-B-Skateboard-Bearings-_334735-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-GP-B-Skateboard-Bearings-_334735-back-US.jpg',
		],
		1795,
		'ONE SIZE',
		'MULTI',
		'Stay rolling at the park, on the street, in the bowl, or fly over a trash can with the GP-B skateboard bearings from Independent. This comes with 8 bearings, 8 speed rings, and 4 spacers to keep your shredding setup fine-tuned and functional.',
		[
			'Genuine Parts GP-B Skateboard Bearings by Independent.',
			'Dust proof metal outer shield.',
			'Serviceable shield less back.',
			'All new faster and more durable Super Cage design.',
			'Micro polished steel races.',
			'Featured with Shell light oil lubricant.',
			'Excellent oxidation resistance and corrosion protection.',
			'Water-resistant.',
			'Set of 8 bearings.',
			'Additional 8 speed rings and 4 spacers included.',
		],
		independentBrand,
		bearingsCategory
	);
	await createProduct(
		'Bronson Bearing Cleaning Unit',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Bearing-Cleaning-Unit-_340640-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Bronson-Bearing-Cleaning-Unit-_340640-back-US.jpg',
		],
		995,
		'ONE SIZE',
		'MULTI',
		'Stretch out the life of your bearings with the Bronson Bearing Cleaning Unit! This bad boy allows you easily apply bearing grease to easily clean and lubricate your setup, making it an essential pickup for any serious skater.',
		[
			'Bearing Cleaning Unit from Bronson.',
			'Hard plastic case.',
			'Allows for cleaning of 4 bearings at once.',
			'8 washers and 4 spacers included.',
		],
		bronsonBrand,
		bearingsCategory
	);
	await createProduct(
		'Cortina Presto Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Cortina-Presto-Skateboard-Bearings-_340247-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Cortina-Presto-Skateboard-Bearings-_340247-back-US.jpg',
		],
		1795,
		'ONE SIZE',
		'MULTI',
		'Add some striking style to your skate setup with the Presto skateboard bearings from Cortina! These premium bearings offer best-in-class strength and speed, making them an excellent buy, while the white sidewall gives your setup a splash of unexpected style.',
		[
			'Presto Skateboard Bearings from Cortina Bearing Co.',
			'Set of 8 bearings.',
			'Durable chromium steel construction.',
			'Premium polished precision raceway and balls.',
			'Removable frictionless rubber shields.',
			'Lightweight durable custom cage.',
		],
		cortinaBrand,
		bearingsCategory
	);
	await createProduct(
		'Toy Machine Bloodshot Sect Abec 7 Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Bloodshot-Sect-Abec-7-Skateboard-Bearings-_368324-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Bloodshot-Sect-Abec-7-Skateboard-Bearings-_368324-alt1-US.jpg',
		],
		2795,
		'ONE SIZE',
		'MULTI',
		'From Toy Machine comes the Bloodshot Sect Abec 7 skateboard bearings, with black and red tones throughout. Easily cleaned thanks to its removable shields, the set of 8 bearings are housed in a unique black plastic dispenser.',
		['Bloodshot Sect Abec 7 Skateboard Bearings from Toy Machine.', 'Removable rubber shields.', 'Includes 8 bearings.'],
		toyMachineBrand,
		bearingsCategory
	);
	await createProduct(
		'Toy Machine Transistor Sect Abec 5 Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Transistor-Sect-Abec-5-Skateboard-Bearings-_368325-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Toy-Machine-Transistor-Sect-Abec-5-Skateboard-Bearings-_368325-alt1-US.jpg',
		],
		2495,
		'ONE SIZE',
		'MULTI',
		'The Transistor Sect Abec 5 skateboard bearings come in an orange and black colorway, and an easily cleaned design. The set includes 8 bearings packaged neatly inside an orange one-eyed plastic dispenser.',
		['Transistor Sect Abec 5 Skateboard Bearings from Toy Machine.', 'Removable rubber shields.', 'Includes 8 bearings.'],
		toyMachineBrand,
		bearingsCategory
	);
	await createProduct(
		'Cortina C Class Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Cortina-C-Class-Skateboard-Bearings-_340249-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Cortina-C-Class-Skateboard-Bearings-_340249-back-US.jpg',
		],
		1195,
		'ONE SIZE',
		'MULTI',
		'Get ready to roll with the C Class skateboard bearings from Cortina! These striking bearings come in a tube for easy, convenient carry, while the removable shields make for easy lubrication when the time comes.',
		[
			'C Class Skateboard Bearings from Cortina Bearing Co.',
			'Set of 8 bearings.',
			'Durable chromium steel construction.',
			'Premium polished precision raceway and balls.',
			'Removable frictionless rubber shields.',
			'Lightweight durable custom cage.',
		],
		cortinaBrand,
		bearingsCategory
	);
	await createProduct(
		'Andale Carlos Ribeiro Skateboard Bearings',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Carlos-Ribeiro-Skateboard-Bearings-_339465-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Carlos-Ribeiro-Skateboard-Bearings-_339465-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Carlos-Ribeiro-Skateboard-Bearings-_339465-alt1-US.jpg',
		],
		3495,
		'ONE SIZE',
		'MULTI',
		"Grab a serious upgrade for your skate setup with the Andale Carlos Ribeiro skateboard bearings! These things come in a handsome cylindrical carrying case, which also includes matching spacers, truck nuts and washers, ensuring an allover stylistic upgrade to whichever setup it's added to.",
		[
			'Carlos Ribeiro Skateboard Bearings from Andale.',
			'Signature Carlos Ribeiro pro model bearings.',
			'Package includes 8 bearings, 4 spacers & washers.',
			'Precision ball bearings for speed.',
			'Precision machined raceways for maximum wear resistance.',
			'Removable frictionless rubber shields for easy cleaning.',
		],
		andaleBrand,
		bearingsCategory
	);

	// Hardware
	await createProduct(
		'Independent Black Crossbolts 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Black-Crossbolts-1%22-Skateboard-Hardware-_288594-front-US.jpg',
		],
		295,
		'1',
		'MULTI',
		'Accept no substitutes and keep your skateboard in check with the Independent black Crossbolts 1" skateboard hardware. These nylon nuts offer high strength and wear-resistance, and are custom made with Independent\'s logo on the top of each bolt.',
		[
			'Black Crossbolts 1" Skateboard Hardware from Independent.',
			'Each bolt is 1" long.',
			'Set of 8 nuts and bolts.',
			'Custom Independent logo on top of each bolt.',
			'Lifetime warranty against breakage.',
		],
		independentBrand,
		hardwareCategory
	);
	await createProduct(
		'Independent Cross Bolts Blue 1" Hardware',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Cross-Bolts-Blue-1%22-Hardware-_323422-front-US.jpg'],
		595,
		'1',
		'MULTI',
		'If you\'re building a new setup, replacing some busted bolts or simply want to add some color to your skateboard, the Cross Bolts blue 1" hardware from Independent are a striking choice. Coming with 8 blue nuts and bolts, as well as two black ones, allowing for a bit of mixing and matching. Pick up this set of hardware to splash a bit of vibrancy into your skate setup!',
		[
			'Blue Cross Bolts 1" Skateboard Hardware from Independent.',
			'Set of 8 nuts and bolts, 8 red and 2 black bolts.',
			'Each bolt is 1" long.',
			'Custom Independent cross emblem upon top of each bolt.',
			'Adjustment wrench included.',
		],
		independentBrand,
		hardwareCategory
	);
	await createProduct(
		'Independent Gold Crossbolts 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Gold-Crossbolts-1%22-Skateboard-Hardware-_288591-front-US.jpg',
		],
		295,
		'1',
		'MULTI',
		'Accept no substitutes and keep your skateboard in check with the Independent gold Crossbolts 1" skateboard hardware. These nylon nuts offer high strength and wear-resistance, and are custom made with Independent\'s logo on the top of each bolt.',
		[
			'Set of 8 nuts and bolts, 6 black and 2 gold bolts.',
			'Gold Crossbolts 1" Skateboard Hardware from Independent.',
			'Each bolt is 1" long.',
			'Custom Independent logo on the top of each bolt.',
			'Lifetime warranty against breakage.',
		],
		independentBrand,
		hardwareCategory
	);
	await createProduct(
		'Independent Crossbolts Red & Black 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Crossbolts-Red-%26-Black-1%22-Skateboard-Hardware-_323423-front-US.jpg',
		],
		595,
		'1',
		'MULTI',
		'Hold together your favorite skate set up in boldly colorful style with the Independent Crossbolts red & black 1" skateboard hardware. With ten total bolts and nuts included you have extras for when you inevitably lose a few, and the bright red, shiny construction of 8 of them is destined to accent your set up in style. It also comes with a slim, portable skate tool for tightening the bolts.',
		[
			'Crossbolts Red & Black 1" Skateboard Hardware from Independent.',
			'10 nuts, 10 bolts and one skate tool included.',
			'8 red and 2 black nut and bolt combinations included.',
			'Each bolt is 1" long.',
			'Custom Independent cross emblem upon top of each bolt.',
		],
		independentBrand,
		hardwareCategory
	);
	await createProduct(
		'Diamond Supply Co. Carroll .875" Allen Hardware ',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Carroll-.875%22-Allen-Hardware--_295589-front-US.jpg'],
		595,
		'.875',
		'MULTI',
		'Add some stylish flair to your skate complete with Mike Carroll\'s signature pro model .875" Allen Hardware from Diamond Supply. This bundle of hardware comes with eight black screws, one mint blue screw, nine mint blue nuts and an Allen key/wrench set.',
		[
			'Carroll .875" Allen Hardware from Diamond Supply Co.',
			'Signature Mike Carroll pro model.',
			'7/8" (.875") sizing.',
			'8 black screws and 1 mint blue.',
			'9 mint blue nuts.',
			'1 Allen key and wrench.',
		],
		diamondBrand,
		hardwareCategory
	);
	await createProduct(
		'Diamond Supply Co. Mariano .875" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Mariano-.875%22-Skateboard-Hardware-_341640-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Mariano-.875%22-Skateboard-Hardware-_341640-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Mariano-.875%22-Skateboard-Hardware-_341640-alt1-US.jpg',
		],
		595,
		'.875',
		'MULTI',
		'Set up your new deck with the Mariano .875" skateboard hardware from Diamond Supply Co. This Guy Mariano pro-model hardware features 8 black screws, 1 silver screw, 8 blue nuts, and 1 silver nut plus an Allen key to get you rolling.',
		[
			'Mariano .875" Skateboard Hardware from Diamond Supply Co.',
			'Guy Mariano pro-model hardware.',
			'7/8" sizing.',
			'8 black screws, 1 silver screw.',
			'8 blue nuts, 1 silver nut.',
			'1 Allen key.',
		],
		diamondBrand,
		hardwareCategory
	);
	await createProduct(
		'Diamond Supply Co. Yuto .875"" Allen Bolt Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Yuto-.875%22%22-Allen-Bolt-Skateboard-Hardware-_341641-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-Yuto-.875%22%22-Allen-Bolt-Skateboard-Hardware-_341641-back-US.jpg',
		],
		595,
		'.875',
		'MULTI',
		'Don\'t let your skateboard hardware strip with the Yuto .875"" hardware from Diamond Supply Co., which features an allen bolt design that is less likely to strip compared to philips bolts. The hardware comes with 7 black bolts and one green bolt, allowing you to quickly identify the front or back of your board.',
		[
			'Yuto .875"" Allen Bolt Skateboard Hardware from Diamond Supply Co.',
			'Signature Yuto Horigome pro hardware.',
			'.875"" sizing.',
			'7 black screws, 1 green screw.',
			'Allen hardware.',
		],
		diamondBrand,
		hardwareCategory
	);
	await createProduct(
		'Almost Gold Fronts 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Almost-Gold-Fronts-1%22-Skateboard-Hardware-_331779-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Almost-Gold-Fronts-1%22-Skateboard-Hardware-_331779-back-US.jpg',
		],
		595,
		'1',
		'MULTI',
		'Add some flair to your skate setup with the Gold Fronts 1" skateboard hardware from Almost! Gold-colored hardware comes in a convenient coin purse-style carrying case, which itself features a mouth, complete with gold teeth. Whether setting up your first deck or giving your current loadout some much-needed luxurious flair, the Gold Fronts are hard to beat.',
		[
			'Gold Fronts 1" Skateboard Hardware from Almost Skateboards.',
			'Each bolt is 1" long.',
			'Set of 8 gold anodized nuts and bolts.',
			'Comes with coin purse-style carrying case.',
		],
		almostBrand,
		hardwareCategory
	);
	await createProduct(
		'Diamond Supply Co. O\'Neill .875" Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-O-Neill-.875%22-Hardware-_336010-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Diamond-Supply-Co.-O-Neill-.875%22-Hardware-_336010-back-US.jpg',
		],
		595,
		'.875',
		'MULTI',
		"Fasten your board, your seat belts and send it with the Diamond Supply Co. O'Neill .875\" hardware. With 8 screws included, one in bright yellow along with an Allen wrench and standard wrench, you'll have everything you need to safely fasten your complete with ease.",
		[
			'O\'Neill .875" Hardware from Diamond Supply Co.',
			"Signature Shane O'Neill pro hardware.",
			'7/8" sizing.',
			'8 black screws, 1 yellow screw.',
			'9 yellow nuts.',
			'1 Allen key and one wrench included.',
		],
		diamondBrand,
		hardwareCategory
	);
	await createProduct(
		'Shake Junt Jamie Foy 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Jamie-Foy-1%22-Skateboard-Hardware-_297848-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Jamie-Foy-1%22-Skateboard-Hardware-_297848-back-US.jpg',
		],
		695,
		'1',
		'MULTI',
		"With his recent acclaim for winning 2017's Thrasher Skater of the Year, Jamie Foy has been absolutely killing it and been on the rise within the skate world. Stoked on his accomplishments, Shake Junt presents Jamie's new 1\" pro hardware. Featured with black screws and black nuts with the exception of two pink screws and two metallic teal nuts for added flair.",
		[
			'Jamie Foy 1" Skateboard Hardware from Shake Junt.',
			'Signature Jamie Foy pro hardware.',
			'1" sizing.',
			'6 black screws and 2 pink.',
			'6 black nuts and 2 metallic teal buts.',
		],
		shakeJuntBrand,
		hardwareCategory
	);
	await createProduct(
		'Shake Junt Tyson Peterson 1" Skateboard Hardware',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Tyson-Peterson-1%22-Skateboard-Hardware-_364809-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Tyson-Peterson-1%22-Skateboard-Hardware-_364809-alt1-US.jpg',
		],
		695,
		'None',
		'MULTI',
		'Tyson Peterson\'s signature hardware from Shake Junt includes eight 1" bolts and nuts, and an additional green set to differentiate the nose and tail.',
		[
			'Tyson Peterson 1" Skateboard Hardware from Shake Junt.',
			'Signature Tyson Peterson pro hardware.',
			'1" sizing.',
			'7 black bolts, 1 green bolt.',
			'Philips hardware.',
		],
		shakeJuntBrand,
		hardwareCategory
	);
	await createProduct(
		'Krux DLK K5 Kingpin Set',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-DLK-K5-Kingpin-Set-_322703-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-DLK-K5-Kingpin-Set-_322703-alt1-US.jpg',
		],
		795,
		'ONE SIZE',
		'MULTI',
		'Pop ollies higher than ever before with the DLK K5 Kingpin Set! This kingpin set comes with two washers, two nuts, an allen key tool, and two hollow kingpins that will drastically reduce the weight of your setup. The kingpins also have an allen key socket rather than philips head, which is far more likely to strip when tightening your trucks.',
		['DLK K5 Kingpin Set from Krux.', 'Allen key hollow king pins.', 'Includes washers, nuts and allen tool.', 'All-silver colorway.'],
		kruxBrand,
		hardwareCategory
	);

	// Griptape
	await createProduct(
		'Mob Clear 10" Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-Clear-10%22-Grip-Tape-_261572-front.jpg'],
		995,
		'None',
		'CLEAR',
		'Make sure your decks are gripped in style with the slightly larger Mob Clear 10" grip tape. Grip your wider boards with the easy to apply peel and stick adhesive backing that has a perforated bubble-proof and water-resistant design for durability and a clear lucid design to show off your top graphics.',
		[
			'Mob grip tape.',
			'Clear lucid design.',
			'Peel and stick adhesive backing.',
			'Perforated bubble-proof and water-resistant design.',
			'10" x 33" sheet for one deck.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Jessup Grip Tape',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Jessup-Grip-Tape-_114148-front.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Jessup-Grip-Tape-_114148-back.jpg',
		],
		595,
		'None',
		'BLACK',
		"If you ain't got Jessup you ain't got stick.",
		['1 sheet of grip, 9" wide by 33" long.'],
		jessupBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob M-80 Grip Tape',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-M-80-Grip-Tape-_148266-front-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-M-80-Grip-Tape-_268213-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-M-80-Grip-Tape-_148266-back-CA.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-M-80-Grip-Tape-_268213-back-US.jpg',
		],
		695,
		'None',
		'BLACK',
		'Revive your old board or get your new deck ready to ride with the new Mob M-80 Grip Tape. A new M-80 advanced grit design provides excellent grip with solid release plus a perforated peel and stick adhesive backing for an easy bubble-free application.',
		[
			'Mob skateboard grip tape.',
			'M-80 Formula.',
			'Die-cut MOB logo.',
			'Perforated for bubble-free application.',
			'Waterproof and tear-proof backing.',
			'Peel and stick adhesive backing.',
			'9" x 33" for one deck.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob x Thrasher Gonz Black Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-x-Thrasher-Gonz-Black-Grip-Tape-_335892-front-US.jpg'],
		1495,
		'None',
		'BLACK',
		"Add some fun doodle style to your favorite deck with the Mob x Thrasher Gonz black grip tape. This mostly black grip features Thrasher logo script in yellow accompanied by a doodle-style skateboarder in the Gonz's signature style for a must-have look.",
		[
			'Gonz Black Grip Tape from Mob Grip x Thrasher',
			'.Signature Mob and Thrasher collaboration.',
			'Signature art by Mark Gonzales.',
			'Sold in single sheets.',
			'Black with doodle-style skater at the center.',
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob x Thrasher Japan Flame Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-x-Thrasher-Japan-Flame-Grip-Tape-_335891-front-US.jpg'],
		1495,
		'None',
		'BLACK',
		'Add some flaming hot style to your favorite deck with the Mob x Thrasher Japan Flame grip tape. This mostly black grip comes with classic flaming Thrasher script through the center for a truly epic look.',
		[
			'Japan Flame Grip Tape from Mob Grip x Thrasher.',
			'Official Mob and Thrasher collaboration.',
			'Sold in single sheets.',
			'Black with flaming Thrasher script through the center.',
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Jessup Ultra Grip Skateboard Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Jessup-Ultra-Grip-Skateboard-Grip-Tape-_323544-front-US.jpg'],
		595,
		'None',
		'BLACK',
		'Get unmatched durability and grip thanks to the Jessup Ultra Grip skateboard grip tape. With a more granular construction than traditional Jessup, this grip will hold your set up to your shoes like glue.',
		[
			'Ultra Grip Skateboard Grip Tape from Jessup.',
			'All-black construction with an aggressive granular construction.',
			'One sheet included.',
			'9" x 33" sheet.',
		],
		jessupBrand,
		griptapeCategory
	);
	await createProduct(
		'Grizzly OG Bear Cut Out Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-OG-Bear-Cut-Out-Grip-Tape-_210092-0001-front.jpg'],
		795,
		'None',
		'BLACK',
		'The Grizzly Team is here to stay with some of your favorite super pros skating their stuff like Sheckler, Malto, Stevie Williams, P-Rod, Dyrdek, PLG, and of course Grizzly Grip founder and pro skater Torey Pudwill.',
		['Grizzly Grip die cut grip tape.', 'Grizzly logo cut out.', 'Diamond Supply Co.', 'Bubble proof application.', 'Sticky adhesive.'],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'Grizzly Blank Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-Blank-Grip-Tape-_295466-front-US.jpg'],
		595,
		'None',
		'BLACK',
		"Get a grip with the simple look of Grizzly's Blank Grip Tape.",
		[
			'Blank Grip Tape from Grizzly Griptape.',
			'Black skateboard grip tape.',
			'Sold in single sheets.',
			'9" x 33" sheet.',
			'Peel & stick adhesive backing.',
		],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'DGK Gooms Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Gooms-Grip-Tape-_332287-front-US.jpg'],
		1295,
		'None',
		'MULTI',
		'Add some style to the topside of your favorite deck with the DGK Gooms grip tape. This mostly black grip features bright blue mushroom graphics throughout to add some trippy style to any deck.',
		['Gooms Grip Tape from DGK.', 'Sold in single sheets.', 'Large blue mushroom print pattern throughout.', '9" x 33" sheet.'],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'Spitfire Swirl Lava Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Swirl-Lava-Grip-Tape-_364597-front-US.jpg'],
		1395,
		'ONE SIZE',
		'MULTI',
		'Add some color to your kit with the Spitfire Swirl Lava grip tape, displaying the Spitfire logo in the center with swirl patterning in red and orange accents throughout.',
		[
			'Swirl Lava Grip Tape from Spitfire.',
			'Spitfire logo with swirl pattern throughout.',
			'One sheet included.',
			'9" x 33" (22.8cm x 83.8cm) sheet.',
		],
		spitfireBrand,
		griptapeCategory
	);
	await createProduct(
		'DGK Nightmare Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Nightmare-Grip-Tape-_345858-front-US.jpg'],
		1395,
		'ONE SIZE',
		'MULTI',
		'Setup your fresh deck with the eerie, slasher-themed Nightmare grip tape from DGK! This DGK grip features sublimated graphics of spooky hockey masks with blue flames throughout the sheet, and the perforated tape makes applying the grip easier and air-bubble free.',
		[
			'Nightmare Grip Tape from DGK.',
			'Black grip tape with graphics of hockey masks with blue flames throughout.',
			'One sheet included.',
			'9" x 33" sheet.',
		],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob Grip x Thrasher Roses Grip Tape ',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-Grip-x-Thrasher-Roses-Grip-Tape--_302542-front-US.jpg'],
		1495,
		'None',
		'BLACK',
		"Provide your skateboard iconic styling with the Mob Grip x Thrasher Roses Grip Tape. Designed with Thrasher Magazines signature logo script in a bold white colorway that's covered with an entanglement of red roses.",
		[
			'Roses Grip Tape by Mob Grip x Thrasher.',
			'Signature collaboration between Thrasher and Mob Grip.',
			'Sold in single sheets.',
			"Thrasher Magazine's logo script graphic.",
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'DGK Glow Up Grip Glow In The Dark Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Glow-Up-Grip-Glow-In-The-Dark-Grip-Tape-_356910-front-US.jpg'],
		1795,
		'ONE SIZE',
		'MULTI',
		'DGK brings the Glow Up Grip glow in the dark grip tape, allowing for skating during the day or night. Sublimated images of smiling faces mixed with mushrooms can be seen on the top, while DGK branding is mixed throughout.',
		[
			'Glow Up glowu in the dark Grip Tape from DGK.',
			'Mushroom and smiling faces graphic.',
			'One sheet included.',
			'9" x 33" (22.8cm x 83.8cm) sheet.',
		],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'Spitfire Big Head Galaxy Grip Tape ',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Big-Head-Galaxy-Grip-Tape--_364598-front-US.jpg'],
		1395,
		'ONE SIZE',
		'MULTI',
		'From Spitfire comes the Big Head Galaxy grip tape, featuring an oversized brand logo with a galaxy print motif. The perforated design allows for easy application with minimal air bubbles, so you can personalize your skateboard.',
		['Big Head Galaxy Grip Tape from Spitfire.', 'Galaxy print design.', 'One sheet included.', '9" x 33" (22.8cm x 83.8cm) sheet.'],
		spitfireBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob Colors Tears Clear Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-Colors-Tears-Clear-Grip-Tape-_357102-front-US.jpg'],
		1495,
		'None',
		'MULTI',
		'This sheet of Colors Tears Mob grip tape is clear with a colorful pattern throughout. Mob grip is made with hundreds of undetectable perforations to prevent air bubbles. It has a special silicon-carbide grit binding method that ensures long-term durability, and has a sticky adhesive that is able to withstand the coldest to the hottest temperatures without peeling.',
		[
			'Colors Tears Clear Grip Tape from Mob.',
			'Clear grip tape with colorful pattern.',
			'Air bubble-free application.',
			'Silicon-carbide binding process for long-term durability.',
			'Strong and water-resistant backing that cuts neatly.',
			'Sticky, temperature-resistant adhesive.',
			'Sold in single sheets.',
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Shake Junt Stencil Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Stencil-Grip-Tape-_200379-0007-front.jpg'],
		1195,
		'None',
		'MULTI',
		'Grab the Shake Junt Stencil Grip Tape for some super responsive grip tape with loads of grip.',
		[
			'Shake Junt Stencil skateboard Grip Tape.',
			'One sheet.',
			'Shake Junt stencil logo.',
			'9" x 33" sheet.',
			'Tested and approved by Lizard King!',
		],
		shakeJuntBrand,
		griptapeCategory
	);
	await createProduct(
		'Shake Junt Tyson Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Tyson-Grip-Tape-_362610-front-US.jpg'],
		1495,
		'None',
		'MULTI',
		'The Tyson grip tape from Shake Junt features red, yellow and green Shake Junt lettering. The Tyson Peterson signature grip tape has a perforated design, for easily application and minimal air bubbles.',
		['Beagle Grip Tape from Shake Junt.', 'Signature Tyson Peterson pro model.', 'One sheet.', 'Shake Junt logo script.', '9" x 33" sheet.'],
		shakeJuntBrand,
		griptapeCategory
	);
	await createProduct(
		'DGK Red, Green, and Yellow Camo Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Red%2C-Green%2C-and-Yellow-Camo-Grip-Tape-_316565-front-US.jpg'],
		1295,
		'None',
		'MULTI',
		'Accent your skate deck in colorful style with the DGK Red, Green, and Yellow Camo Grip Tape. This grip features a vibrant camo print colorway throughout with subtle logo script for a vibrant look that is sure to be the talk of the skatepark.',
		['Red, Green, and Yellow Camo Grip Tape from DGK.', 'Sold in single sheets.', 'Multicolor camo pattern throughout.', '9" x 33" sheet.'],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'DGK Blossom Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Blossom-Grip-Tape-_316566-front-US.jpg'],
		1295,
		'None',
		'MULTI',
		"Take your skate deck's look to the next level with the DGK Blossom Grip Tape. This mostly black grip features roses and gold chain print throughout for a look that is sure to garner some attention.",
		['Blossom Grip Tape from DGK.', 'Sold in single sheets.', 'Large rose and gold chain print pattern throughout.', '9" x 33" sheet.'],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'Grizzly Pride Stamp Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-Pride-Stamp-Grip-Tape-_341173-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		'Show your support for the LGBTQIA+ community with the Pride Stamp grip tape from Grizzly! A rainbow-hued Grizzly logo sits at the exact center of this sheet of grip, letting you affix a pride-friendly detail to any setup, while the gritty surface keeps your feet from slipping as you shralp.',
		['Pride Stamp Grip Tape from Grizzly.', 'Rainbow Grizzly logo in the center of the sheet.', 'One sheet included.', '9" x 33" sheet.'],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'Sittin On Chrome Black Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Sittin-On-Chrome-Black-Grip-Tape-_344316-front-US.jpg'],
		1395,
		'None',
		'MULTI',
		'Stay glued to your board with the Sittin On Chrome black grip tape from Grizzly. This black grip tape features the iconic Grizzly script logo in the center in a colorful, chrome-style font, adding subtle, yet steezy detailing to your skate setup.',
		['Sittin On Chrome Grip Tape from Grizzly.', 'Chrome Grizzly logo in the center of the sheet.', 'One sheet included.', '9" x 33" sheet.'],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'Shake Junt Jamie Foy Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Jamie-Foy-Grip-Tape-_297846-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		"With his recent acclaim for winning 2017's Thrasher Skater of the Year, Jamie Foy has been absolutely killing it and been on the rise within the skate world. Stoked on his accomplishments, Shake Junt presents Jamie's new pro grip tape. This sheet of grip features the classic \"Shake Junt\" stencil in a two-toned colorway with Jamie's signature located below the logo script.",
		['Jamie Foy Grip Tape from Shake Junt.', 'One sheet.', "Shake Junt stencil logo with Jamie Foy's signature.", '9" x 33" sheet.'],
		dgkBrand,
		griptapeCategory
	);
	await createProduct(
		'Grizzly Fahrenheit Red Flame Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-Fahrenheit-Red-Flame-Grip-Tape-_341176-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		'Spice up your setup with the Fahrenheit red flame grip tape from Grizzly! The gritty surface provides your feet with ample grip while you shred, while the scarlet flame graphics shooting up from the base of the sheet will lend any setup a flash of flaming hot steez.',
		[
			'Fahrenheit Red Flame Grip Tape from Grizzly.',
			'Black grip tape with red flame graphics at the base.',
			'One sheet included.',
			'9" x 33" sheet.',
		],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'Grizzly Vitamin C Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-Vitamin-C-Grip-Tape-_341172-front-US.jpg'],
		1295,
		'None',
		'MULTI',
		'Add a splash of citrusy style to any setup with the Vitamin C grip tape from Grizzly! Large, circular slices throughout the grip lend it a ton of juicy steez, while the gritty surface will keep your setup shred-ready.',
		['Vitamin C Grip Tape from Grizzly.', 'Orange slice graphics throughout.', 'One sheet included.', '9" x 33" sheet.'],
		grizzlyBrand,
		griptapeCategory
	);
	await createProduct(
		'Shake Junt Zion Wright Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Zion-Wright-Grip-Tape-_316317-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		"Provide your board with unmatched grip and style with the Shake Junt Zion Wright Grip Tape. This signature pro model grip features Shake Junt script logo print diagonally through the center with Zion's signature below for a clean and striking look.",
		[
			'Zion Wright Grip Tape from Shake Junt.',
			'Signature Zion Wright pro model.',
			'One sheet.',
			'Shake Junt stencil logo script with Zion Wright signature below.',
			'9" x 33" sheet.',
		],
		shakeJuntBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob Grip Santa Cruz x Killer Acid No Bad Trips Black Grip Tape',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-Grip-Santa-Cruz-x-Killer-Acid-No-Bad-Trips-Black-Grip-Tape-_362540-front-US.jpg',
		],
		1595,
		'None',
		'MULTI',
		'The Santa Cruz x Killer Acid No Bad Trips grip tape from Mob Grip comes in a black colorway with a sublimated graphic of a ufo abducting script that reads, "No bad trips."',
		[
			'Santa Cruz x Killer Acid No Bad Trips Black Grip Tape from Mob Grip.',
			'Official Mob Grip, Santa Cruz, and Killer Acid collaboration.',
			'Sold in single sheets.',
			'Black colorway with sublimated graphic.',
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Almost Marble Black Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Almost-Marble-Black-Grip-Tape-_339471-front-US.jpg'],
		1295,
		'None',
		'MULTI',
		'The marble black grip tape by Almost is the perfect choice for any skater looking to add visual texture to the top of their board.',
		['Marble Black Grip Tape from Almost.', 'One sheet.', 'Almost logo at bottom.', '9" x 33" sheet.'],
		almostBrand,
		griptapeCategory
	);
	await createProduct(
		'Mob x Thrasher Rainbow Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Mob-x-Thrasher-Rainbow-Grip-Tape-_354638-front-US.jpg'],
		1395,
		'None',
		'MULTI',
		'From the official Mob x Thrasher collab comes the Rainbow grip tape. Mob grip is super grippy and super durable, and this sheet is uniquely stylized with a large, rainbow-colored Thrasher Magazine script.',
		[
			'Rainbow Grip Tape from Mob Grip x Thrasher.',
			'Official Mob Grip and Thrasher collaboration.',
			'Sold in single sheets.',
			'Black colorway with large, rainbow-colored Thrasher script.',
			'9" x 33" sheet.',
		],
		mobBrand,
		griptapeCategory
	);
	await createProduct(
		'Shake Junt Kader Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Shake-Junt-Kader-Grip-Tape-_323605-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		"Line your new deck with premium Shake Junt with the all-new Kader Sylla grip tape. This pro model sheet of grip features stenciled brand logo script accompanied with Kader's signature in the corner, a simple composition that let's everyone know you ride like the pros.",
		[
			'Kader Grip Tape from Shake Junt.',
			'Signature Kader Sylla pro model.',
			'One sheet.',
			"Shake Junt stencil logo script with Kader Sylla's signature below.",
			'9" x 33" sheet.',
		],
		shakeJuntBrand,
		griptapeCategory
	);
	await createProduct(
		'Darkroom Invader Die Cut Grip Tape',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Darkroom-Invader-Die-Cut-Grip-Tape-_338365-front-US.jpg'],
		1295,
		'None',
		'BLACK',
		"Grip your next deck with the Invader die-cut grip tape from Darkroom. This black grip tape features Darkroom's Invader icon cut-out for some extra swag.",
		['Invader Die Cut Grip Tape from Darkroom.', 'Black grip with Invader logo die cut.', 'Sold in single sheets.', '9" x 33" sheet.'],
		darkroomBrand,
		griptapeCategory
	);

	// Wax
	await createProduct(
		'Andale Skull Skateboard Wax',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Andale-Skull-Skateboard-Wax-_325850-front-US.jpg'],
		495,
		'ONE SIZE',
		'MULTI',
		'Never get "hung up" on a feature again thanks to the Andale Skull skateboard wax. This wax comes in the shape of a skull for spooky style points and the convenient carrying tube is ideal for when the conditions get warmer so your wax remains contained.',
		[
			'Skull Skateboard Wax by Andale.',
			'Skull shaped skateboard wax.',
			'All-white colorway.',
			'Dimensions: 3" L x 2" W x 1.5" H | 7.5cm x 5cm x 3.5cm.',
		],
		andaleBrand,
		waxCategory
	);
	await createProduct(
		'Darkroom Invader Curb Wax',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Darkroom-Invader-Curb-Wax-_345189-front-US.jpg'],
		595,
		'ONE SIZE',
		'MULTI',
		"Slide over curbs as effortlessly as I slid into your mom's DMs with the Invader curb wax from Darkroom! This wax comes in the shape of an 8-bit-style alien, with an easy-to-apply surface-slickening formula that'll let you go full-send for any tricks involving rails and curbs.",
		['Invader Curb Wax from Darkroom.', '8-but alien-shaped skateboard wax.'],
		darkroomBrand,
		waxCategory
	);
	await createProduct(
		'Grizzly Bear Skateboard Wax',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Grizzly-Bear-Skateboard-Wax-_336500-front-US.jpg'],
		595,
		'ONE SIZE',
		'MULTI',
		'Slide with ease after applying some of the Bear skateboard wax from Grizzly. This adorable little wax bear will give your curbs and rails the extra slick you need to hit them with ease.',
		['Bear Skateboard Wax from Grizzly.', 'Bear-shaped brick of curb wax.'],
		grizzlyBrand,
		waxCategory
	);
	await createProduct(
		'DGK Circular Skateboard Wax',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Circular-Skateboard-Wax-_329042-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/DGK-Circular-Skateboard-Wax-_329042-back-US.jpg',
		],
		495,
		'None',
		'MULTI',
		'Render any sticky ledge or curb into a buttery masterpiece with the DGK circular skateboard wax. This circular shaped bar of wax comes in a bright colorway, perfect for ledges, slappies or whatever else you are willing to try.',
		['Circular Skateboard Wax by DGK.'],
		dgkBrand,
		waxCategory
	);
	await createProduct(
		'Spitfire Head Skateboard Wax',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Spitfire-Head-Skateboard-Wax-_360412-front-US.jpg'],
		695,
		'ONE SIZE',
		'MULTI',
		"From Spitfire comes the Head skateboard wax. This wax is shaped like their iconic Bighead logo and comes in a red and orange colorway. Whether you're waxing a curb or the coping, this premium Spitfire wax will do the trick.",
		['Head Skateboard Wax from Spitfire.', 'Bighead-shaped skateboard wax.', 'Orange and red colorway.', '2.5" x 3.5".'],
		spitfireBrand,
		waxCategory
	);
	await createProduct(
		'Independent Kurb Killer Skateboard Wax',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Kurb-Killer-Skateboard-Wax-_339822-front-US.jpg'],
		495,
		'ONE SIZE',
		'MULTI',
		'The high-quality Kurb Killer skateboard wax from Independent and comes in a red colorway, and is shaped as the skateboarding staple: the parking block.',
		['Kurb Killer Skateboard Wax from Independent.', 'Heart-shaped skateboard wax.', 'Red colorway.'],
		independentBrand,
		waxCategory
	);
	await createProduct(
		'Krux Ledge Love Skateboard Wax',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-Ledge-Love-Skateboard-Wax-_339823-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Krux-Ledge-Love-Skateboard-Wax-_339823-back-US.jpg',
		],
		995,
		'ONE SIZE',
		'MULTI',
		"Find a new love for that skateboarding hobby with the Ledge Love skateboard wax from Krux! This heart-shaped block of wax is going to slick up any curb, rail or rock (If it's smooth enough,) so you can comfortably hit any spot in town!",
		['Circular Skateboard Wax by DGK.', 'Heart-shaped skateboard wax.', 'All-pink colorway.'],
		kruxBrand,
		waxCategory
	);
	await createProduct(
		'Santa Cruz Screaming Hand Curb Wax',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Screaming-Hand-Curb-Wax-_339821-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Santa-Cruz-Screaming-Hand-Curb-Wax-_339821-back-US.jpg',
		],
		995,
		'ONE SIZE',
		'MULTI',
		'When the going gets tough, the tough bust out the Screaming Hand Curb Wax from Santa Cruz and get going. This blue Screaming Hand-shaped wax block will make any surface you want to skate more slippery, so you can rail slide with ease.',
		['Screaming Hand Curb Wax from Santa Cruz.', 'Screaming Hand-shaped skateboard wax.', 'Blue colorway.'],
		santaCruzBrand,
		waxCategory
	);

	// Tools
	await createProduct(
		'Independent Red Skate Tool',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Red-Skate-Tool-_264889-front.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Red-Skate-Tool-_264889-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Red-Skate-Tool-_264889-back.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Red-Skate-Tool-_264889-alt1.jpg',
		],
		2895,
		'ONE SIZE',
		'MULTI',
		'The new Independent Red skate tool has all the tools your need to keep your board riding smoothly in a convenient compact design. This small tool features all the necessary socket sizes to fine tune your trucks and wheels plus a bearing press and remover and a 5/16" axle re-threader in case your truck axles get stripped.',
		[
			'Independent all-in-one skate tool.',
			'9/16", 1/2", and 3/8" sockets.',
			'7/32" and 1/8" Allen wrench.',
			'Phillips head screwdriver.',
			'Bearing press and remover.',
			'5/16" axle re-threader.',
			'Independent logo detailing.',
		],
		independentBrand,
		toolsCategory
	);
	await createProduct(
		'Silver Gold Skate Tool',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Silver-Gold-Skate-Tool-_226507-front.jpg'],
		1995,
		'ONE SIZE',
		'MULTI',
		'The Silver Gold Skateboard Tool in gold has all your skate needs for keeping your ride right. Sockets for both bushing cup and truck-nut are included, along with an allen wrench and screwdriver attachment for all your adjustment needs. Finished wit',
		[
			'Gold Skateboard Tool from Silver.',
			'Two way ratchet system.',
			'Built in grip tape file.',
			'Kingpin and axle sockets.',
			'Kingpin allen attachment.',
			'Slide out screwdriver attachment.',
			'Gold and sliver colorway.',
		],
		silverBrand,
		toolsCategory
	);
	await createProduct(
		'Silver Black Skate Tool',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Silver-Black-Skate-Tool-_238540-front.jpg'],
		1995,
		'ONE SIZE',
		'BLACK',
		'A two-way ratchet system lets you easily change directions with a slide out screwdriver attachment for sleek all-in-one functionality.',
		[
			'9/16, 3/8, and 1/2" sockets.',
			'Top grip tape file.',
			'Kingpin and axle tool.',
			'Kingpin allen attachment.',
			'Silver logo detailing.',
			"Item comes in assorted colors, we will ship what's available.",
		],
		silverBrand,
		toolsCategory
	);
	await createProduct(
		'Independent Black Skate Tool',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Black-Skate-Tool-_264846-front.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Black-Skate-Tool-_264846-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Black-Skate-Tool-_264846-back.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Independent-Black-Skate-Tool-_264846-alt1.jpg',
		],
		2895,
		'ONE SIZE',
		'MULTI',
		'The convenient all-in-one compact design of the new Independent Black skate tool is perfect for tossing in your bag so you\'re always prepared. Keep your board fine tune thanks to all the necessary socket sizes to adjust and fine tune your trucks and wheels plus a handy bearing press and remover and a 5/16" axle re-threader in case your truck axles get stripped.',
		[
			'Independent all-in-one skate tool.',
			'9/16", 1/2", and 3/8" sockets.',
			'7/32" and 1/8" Allen wrench.',
			'Phillips head screwdriver.',
			'Bearing press and remover.',
			'5/16" axle re-threader.',
			'Independent logo detailing.',
		],
		independentBrand,
		toolsCategory
	);
	await createProduct(
		'Silver Metallic Silver Skate Tool ',
		['https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Silver-Metallic-Silver-Skate-Tool--_311359-front-US.jpg'],
		1995,
		'ONE SIZE',
		'MULTI',
		'Keep your nuts and bolts tight with Silver Metallic Silver Skate Tool. Made for durability, daily use, and easy storing, Silver Trucks has designed this premium skateboard tool with everything you need including a removable screwdriver as well as',
		[
			'Metallic Silver Skateboard Tool Skate Tool from Silver.',
			'Two way ratchet system.',
			'9/16, 3/8, and 1/2" sockets.',
			'Top grip tape file.',
			'Removable screwdriver attachment.',
			'Kingpin and axle tool.',
			'Kingpin Allen attachment.',
			'Silver logo detailing.',
		],
		silverBrand,
		toolsCategory
	);

	/*
a
a
a
a
a
a
a
a
a
a
a
a
a
a
a
a
*/
	// Backpacks
	await createProduct(
		'Nike SB RPM Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Black-Backpack-_289213-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Black-Backpack-_289213-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Black-Backpack-_289213-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Black-Backpack-_289213-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Black-Backpack-_289213-alt4-US.jpg',
		],
		8995,
		'ONE SIZE',
		'BLACK',
		'Optimize your skate or travel style in the RPM backpack from Nike SB. Featured in a stealthy black, water-resistant material, this backpack is equipped with a large main storage compartment offering two additional internal pockets, a padded laptop sleeve big enough for a 15" laptop, two side water bottle sleeves, removable skateboard straps and dual straps at the bottom so you can carry anything from a blanket to a sleeping bag. The RPM backpack is finished with padded shoulder straps and sternum strap for ultimate comfort while carrying your life around.',
		[
			'Features:',
			'RPM Black Backpack from Nike SB.',
			'Large main compartment.',
			'Internal sleeve with hook and loop closure.',
			'Internal mesh pocket with zipper closure.',
			'Separate padded laptop compartment stores up to a 15-inch laptop with top zipper access.',
			'Two side water bottle sleeves with zippered pockets.',
			'Top zippered tricot lined pocket.',
			'Padded mesh lined shoulder straps with sternum strap.',
			'Quilt padded mesh back panel.',
			'Top hand grab strap.',
			'Adjustable dual straps at bottom.',
			'Removable skateboard straps w/ hook and loop closures.',
			'Stitched straps throughout for storage or style.',
			'Water-resistant.',
			'',
			'Specifications:',
			'Dimensions: 21" H x 13" W x 7" D | 53.25 x 33 x 16.5cm (approx.).',
			'Capacity: 29 liters (approx.).',
			'100% polyester.',
		],
		nikeSbBrand,
		backpacksCategory
	);
	await createProduct(
		'Nike SB RPM Navy Camo Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt6-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-SB-RPM-Navy-Camo-Backpack-_359256-alt7-US.jpg',
		],
		8995,
		'ONE SIZE',
		'NAVY',
		'The RPM Nike SB backpack features navy camo patterning throughout with a brand tag woven onto the front. This backpack comes with a large laptop compartment, another compartment with an internal mesh pocket and hook-and-loop pouch, and dual bottle sleeves with small zip pockets; all adding up to a 29-liter carrying capacity. Additional attributes that provide easy transportation include a padded back panel, adjustable shoulder straps, a top haul handle, and skateboard straps on the front.',
		[
			'RPM Navy Camo Backpack from Nike SB.',
			'Large main compartment.',
			'Internal sleeve with hook and loop closure.',
			'Internal mesh pocket with zipper closure.',
			'Separate padded laptop compartment stores up to a 15-inch laptop with top zipper access.',
			'Two side water bottle sleeves with zippered pockets.',
			'Top zippered pocket.',
			'Padded mesh lined shoulder straps with sternum strap.',
			'Quilt padded mesh back panel.',
			'Top haul handle.',
			'Adjustable dual straps at bottom.',
			'Removable skateboard straps w/ hook and loop closures.',
			'Stitched straps throughout for storage or style.',
			'Water-resistant.',
		],
		nikeSbBrand,
		backpacksCategory
	);
	await createProduct(
		'RVCA Curb Skate Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Skate-Black-Backpack-_359753-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Skate-Black-Backpack-_359753-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Skate-Black-Backpack-_359753-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Skate-Black-Backpack-_359753-alt3-US.jpg',
		],
		5995,
		'ONE SIZE',
		'BLACK',
		'From RVCA comes the Curb skate backpack in a black colorway. This backpack features two hook-and-loop straps at the front provides storage for your board or cruiser. The bag also features a 29-liter zippered main compartment with an internal laptop sleeve, a smaller zippered front compartment, a slash zippered pouch in front of that, and two mesh water bottle sleeves at each side, providing ample room for your daily necessities.',
		[
			'Curb Black Skate Backpack from RVCA.',
			'Large main compartment.',
			'Internal laptop sleeve.',
			'Internal mesh pocket with zipper closure.',
			'Two side water bottle sleeves with zippered pockets.',
			'Top zippered pocket.',
			'Padded mesh lined shoulder straps with sternum strap.',
			'Quilt padded mesh back panel.',
			'Top haul handle.',
			'Adjustable dual straps at bottom.',
			'Removable skateboard straps w/ hook and loop closures.',
		],
		rvcaBrand,
		backpacksCategory
	);
	await createProduct(
		'RVCA Curb Grey Skate Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Grey-Skate-Backpack-_359754-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Grey-Skate-Backpack-_359754-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Grey-Skate-Backpack-_359754-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/RVCA-Curb-Grey-Skate-Backpack-_359754-alt3-US.jpg',
		],
		5995,
		'ONE SIZE',
		'GREY',
		'The Curb grey skate backpack from RVCA has just the right amount of space for your necessities and more with a 29-liter zippered main compartment with an internal laptop sleeve, a smaller zippered front compartment, a slash zippered pouch in front of that, and two mesh water bottle sleeves at each side. The bag also features two hook-and-loop straps at the front for boards, so whether you are traveling or taking your daily commute, this bag will keep you covered.',
		[
			'Curb Grey Skate Backpack from RVCA.',
			'Large main compartment.',
			'Internal laptop sleeve.',
			'Internal mesh pocket with zipper closure.',
			'Two side water bottle sleeves with zippered pockets.',
			'Top zippered pocket.',
			'Padded mesh lined shoulder straps with sternum strap.',
			'Quilt padded mesh back panel.',
			'Top haul handle.',
			'Adjustable dual straps at bottom.',
			'Removable skateboard straps w/ hook and loop closures.',
		],
		rvcaBrand,
		backpacksCategory
	);
	await createProduct(
		'OATH Evermore Flat Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OATH-Evermore-Flat-Backpack-_344354-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OATH-Evermore-Flat-Backpack-_344354-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OATH-Evermore-Flat-Backpack-_344354-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OATH-Evermore-Flat-Backpack-_344354-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/OATH-Evermore-Flat-Backpack-_344354-alt4-US.jpg',
		],
		5995,
		'ONE SIZE',
		'BLACK',
		'Holster all your goodies in fashionable style with the OATH Evermore Flat backpack. This convenient pack comes with a whopping 20 liters of storage space within two main pockets, and is complete with zip-closures to securely house all your items. 4 total storage straps throughout the front offer additional space for skateboards and etc., while the blue and black colorway keeps the look crisp throughout.',
		[
			'Evermore Flat Backpack from Oath.',
			'Front storage pocket.',
			'Large main compartment.',
			'Adjustable padded shoulder straps.',
			'Lightly padded back panel.',
			'Black woven zipper pulls.',
			'Top handle for easy carry.',
			'Hook and loop storage straps on the front.',
		],
		oathBrand,
		backpacksCategory
	);
	await createProduct(
		'Nixon Ransack Olive Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Olive-Backpack-_357734-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Olive-Backpack-_357734-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Olive-Backpack-_357734-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Olive-Backpack-_357734-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Olive-Backpack-_357734-alt4-US.jpg',
		],
		6495,
		'ONE SIZE',
		'MULTI',
		'The Rucksack backpack from Nixon comes in an olive colorway with tan detailing throughout. With skateboard straps located on the front panel, and a zipped 15" laptop compartment beside its spacious 23.5 liter main compartment, the Nixon bag is capable of hauling all of your essentials. Constructed using recycled ocean plastic, the durable bag has a plush lined zipper compartment for eyewear and delicate items, while the bag is complete with a reinforced bottom panel, a water bottle holder on the side, adjustable padded shoulder straps, and a mesh back panel for comfort.',
		[
			'Features:',
			'Ransack Olive Backpack from Nixon.',
			'Large main compartment with organizers.',
			'External skateboard straps across back.',
			'15" laptop storage with external zipper access.',
			'Padded back panel & shoulder straps.',
			'Haul handle for easy grab-and-go.',
			'Plush-lined watch pocket',
			'Front accessory compartment.',
			'',
			'Specifications:',
			'Capacity: 23.5 liters (approx.)',
			'12" x 6" x 19.5" | 30.5cm x 15.5cm x 50cm.',
			'210D ballistic nylon construction.',
			'100% nylon.',
			'Spot clean only with damp cloth when needed.',
			'',
			'Warranty:',
			"Limited lifetime manufacturer's limited warranty of defects in materials and workmanship.",
			'Learn more about the Nixon Warranty',
		],
		nixonBrand,
		backpacksCategory
	);
	await createProduct(
		'Poler Journey Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Black-Backpack-_359737-alt6-US.jpg',
		],
		7995,
		'ONE SIZE',
		'BLACK',
		'The Journey backpack from Poler comes in a black colorway, and features thoughtful trail-inspired accents throughout. Made to tackle urban environments as well as rugged terrain, the backpack is made from a durable 600D Polyester plain weave with a water-repellant finish, while comfortable adjustable straps achieve a custom fit. The Poler bag has a large main zipper compartment boasting a padded 15" laptop sleeve, while the look is finished with additional storage located on the front, dual water bottle pockets at the sides, a reinforced bottom panel, and straps for your skateboard located on the front.',
		[
			'Journey Black Backpack from Poler.',
			'Durable black polyester exterior.',
			'Roomy main compartment with additional zippered pouches and pockets.',
			'15" laptop sleeve.',
			'Adjustable padded shoulder straps with sternum strap.',
			'Top haul handle for easy carrying.',
			'Skateboard straps on front.',
			'Poler branded details throughout.',
			'100% polyester.',
		],
		polerBrand,
		backpacksCategory
	);
	await createProduct(
		'Herschel Supply Co. x Independent Fleet Brown Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-back-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-Supply-Co.-x-Independent-Fleet-Brown-Backpack-_353604-alt5-US.jpg',
		],
		9995,
		'ONE SIZE',
		'BROWN',
		"Herschel Supply Co. and Independent have come together to bring you this skate-centric Fleet backpack. This Herschel backpack has a durable polyester exterior in brown that's equipped with adjustable skateboard straps and rubber non-slip guards to keep your board in place, as well as additional padding to ensure your belongings are protected. It also has a main zip-closure compartment that is lined with Independent script, capable of holding approximately 25-liters.",
		[
			'Fleet Brown Backpack from Herschel Supply Co. x Independent.',
			'Official Herschel Supply Co. and Independent collaboration.',
			'Brown colorway.',
			'Main zip-closure compartment with internal laptop sleeve and Independent print.',
			'Rubber non-slip skate guards to keep skateboard in place.',
			'Adjustable skateboard straps on front.',
			'Air mesh shoulder straps.',
			'Two elastic drink pockets on the sides.',
			'Adjustable padded mesh-lined shoulder straps.',
			'Jacquard webbing details.',
			'Custom hardware.',
			'Top haul handle strap.',
		],
		herschelBrand,
		backpacksCategory
	);
	await createProduct(
		'Herschel x Independent Fleet Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Black-Backpack-_353602-alt5-US.jpg',
		],
		9995,
		'ONE SIZE',
		'BLACK',
		'The Fleet Herschel Supply Co x Independent backpack comes in a black colorway with many loved Herschel aspects such as the red and white inner pattern, the brand\'s patch embroidered onto the front, and well-padded, adjustable straps. This bag features a large central compartment with a 15" laptop sleeve inside and two mesh pockets on the side so you can have enough room for all of your goodies.',
		[
			'Fleet Black Backpack from Herschel Supply Co x Independent.',
			'Black colorway.',
			'Full-zip pocket with organizer pocket inside and key clip.',
			"Hook-and-loop straps on backpack's front.",
			'Adjustable padded shoulder straps with mesh underside.',
			'Lightly padded back panel.',
			'Signature Herschel red and white striped fabric liner.',
			'Top handle for easy carry.',
			'Brand patch label on front.',
		],
		herschelBrand,
		backpacksCategory
	);
	await createProduct(
		'Nike Sportswear RPM Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-alt6-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nike-Sportswear-RPM-Black-Backpack-_362727-al3-US.jpg',
		],
		8995,
		'ONE SIZE',
		'BLACK',
		'The RPM Nike Sportswear backpack, with its two main compartments, handful of pockets, and versatile straps on the front, is made to carry just about anything. This Nike backpack has a black polyester construction, giving it a sleek look and durability, and the padded back panel and shoulder straps provide comfortability.',
		[
			'RPM Black Backpack from Nike Sportswear.',
			'Polyester construction.',
			'Main zippered compartment.',
			'Front zippered pocket with internal zippered mesh pocket and hook-and-loop pocket.',
			'Small zippered pocket on the back.',
			'Hook-and-loop straps on front.',
			'Padded back panel and adjustable shoulder straps.',
			'Adjustable sternum strap.',
			'Web haul handle for easy handling.',
		],
		nikeSbBrand,
		backpacksCategory
	);
	await createProduct(
		'HUF Mission Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-Mission-Black-Backpack-_356518-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-Mission-Black-Backpack-_356518-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-Mission-Black-Backpack-_356518-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/HUF-Mission-Black-Backpack-_356518-alt3-US.jpg',
		],
		10995,
		'ONE SIZE',
		'BLACK',
		'The Mission HUF backpack is constructed from durable, black polyester, and is minimally adorned with a vibrant green, rubber brand patch on the front. This HUF bag has a main zippered compartment with an internal laptop sleeve, giving it an approximate 11.5-liter carrying capacity. It also comes equipped with an additional zippered compartment on the front, dual drink sleeves, and adjustable skateboard straps on the front so you can travel with ease.',
		[
			'Mission Black Backpack from HUF.',
			'Rubber brand patch on front.',
			'Main double-zippered compartment with internal laptop sleeve.',
			'Front zippered compartment with internal key clasp.',
			'Adjustable skateboard straps.',
			'Dual drink sleeves.',
			'Adjustable shoulder straps.',
			'Adjustable sternum strap.',
			'Padded, mesh back panel.',
			'Web haul handle for easy handling.',
		],
		hufBrand,
		backpacksCategory
	);
	await createProduct(
		'Herschel x Independent Fleet Orange Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Herschel-x-Independent-Fleet-Orange-Backpack-_353603-alt5-US.jpg',
		],
		9995,
		'ONE SIZE',
		'BRIGHT ORANGE',
		'The Fleet backpack from Herschel Supply Co x Independent comes in a bright orange color with contrasting black accents for an accessory that is both stylish and functional. This bag features a large compartment accessible from the top with a 15" laptop sleeve inside, and comes with Herschel\'s signature red and white inner-lining and brand patch on the front.',
		[
			'Fleet Orange Backpack from Herschel Supply Co x Independent.',
			'Orange colorway with black accents.',
			'Full-zip pocket with organizer pocket inside and key clip.',
			"Hook-and-loop straps on backpack's front.",
			'Adjustable padded shoulder straps with mesh underside.',
			'Lightly padded back panel.',
			'Signature Herschel red and white striped fabric liner.',
			'Top handle for easy carry.',
			'Brand patch label on front.',
		],
		herschelBrand,
		backpacksCategory
	);
	await createProduct(
		'Obey Conditions Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Obey-Conditions-Black-Backpack-_356843-alt5-US.jpg',
		],
		6795,
		'ONE SIZE',
		'BLACK',
		'The Conditions Obey backpack comes in a black colorway with a rubber brand patch at the front. This Obey bag is made from durable, abrasive-resistant polyester, and comes equipped with a main double-zipper compartment with an internal laptop sleeve, as well as a smaller zippered pocket on the front and top. The shoulder straps are padded for comfortable wear, and the front is equipped with elastic webbing and skateboard straps so you can travel with ease.',
		[
			'Conditions Black Backpack from Obey.',
			'Polyester construction.',
			'Main zippered compartment with laptop sleeve.',
			'Front zippered pocket.',
			'Small zippered pocket at the top.',
			'Elastic webbing at front.',
			'Skateboard straps.',
			'Padded back panel and adjustable shoulder straps.',
			'Web haul handle for easy handling.',
		],
		obeyBrand,
		backpacksCategory
	);
	await createProduct(
		'Nixon Ransack Black Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Ransack-Black-Backpack-_328601-alt6-US.jpg',
		],
		6495,
		'ONE SIZE',
		'BLACK',
		"With a ton of style and space, Nixon's Ransack black backpack is going to kick your daily routine up a notch. Skateboard straps across the back give you a sick place to stow your deck, while the external laptop sleeve allows you to be productive throughout the day. A water bottle holder at the right sleeve gives you access to the hydration you need, making this slick backpack a perfect addition to any accessory collection.",
		[
			'Features:',
			'Ransack Black Backpack from Nixon.',
			'Large main compartment with organizers.',
			'External skateboard straps across back.',
			'15" laptop storage with external zipper access.',
			'Padded back panel & shoulder straps.',
			'Haul handle for easy grab-and-go.',
			'Plush-lined watch pocket',
			'Front accessory compartment.',
			'',
			'Specifications:',
			'Capacity: 23.5 liters (approx.)',
			'12" x 6" x 19.5" | 30.5cm x 15.5cm x 50cm.',
			'210D ballistic nylon construction.',
			'100% nylon.',
			'Spot clean only with damp cloth when needed.',
			'',
			'Warranty:',
			"Limited lifetime manufacturer's limited warranty of defects in materials and workmanship.",
			'Learn more about the Nixon Warranty',
		],
		nixonBrand,
		backpacksCategory
	);
	await createProduct(
		'Poler Journey Floral Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Poler-Journey-Floral-Backpack-_354757-alt6-US.jpg',
		],
		7995,
		'ONE SIZE',
		'MULTI',
		'The Journey Poler backpack comes in a black colorway with sublimated graphics of orange and green flowers throughout and a white brand patch on the lower front pocket. This bag features multiple large pockets as well as adjustable straps on the front and back for the perfect fit no matter the excursion.',
		[
			'Journey Floral Backpack from Poler.',
			'Durable black polyester exterior.',
			'Roomy main compartment with additional zippered pouches and pockets.',
			'Adjustable padded shoulder straps with sternum strap.',
			'Top haul handle for easy carrying.',
			'Poler branded details throughout.',
			'100% polyester.',
		],
		polerBrand,
		backpacksCategory
	);
	await createProduct(
		'Nixon Gamma Navy & Orange Backpack',
		[
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-front-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt1-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt2-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt3-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt4-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt5-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt6-US.jpg',
			'https://scene7.zumiez.com/is/image/zumiez/product_main_medium_2x/Nixon-Gamma-Navy-%26-Orange-Backpack-_345182-alt7-US.jpg',
		],
		12495,
		'ONE SIZE',
		'NAVY',
		'Get the perfect holster for all your needed daily items with the Nixon Gamma navy & orange backpack. This pack features a navy and orange colorway for some fresh style, while the logo patch sewn to the front panel offers some crisp branding. This pack comes with a whopping 22 liters of storage space for all your stuff, while the front straps are ready to house your skateboard perfectly.',
		[
			'Gamma Navy & Orange Backpack from Nixon.',
			'Large main zippered compartment with organizer pockets.',
			'Zipper front stash pocket.',
			'External skate straps.',
			'Water bottle pocket on right side.',
			'Woven haul handle on top.',
			'Nixon logo patch on the lower front right.',
			'Nixon logo detailing throughout.',
		],
		nixonBrand,
		backpacksCategory
	);
}
main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect;
	});
