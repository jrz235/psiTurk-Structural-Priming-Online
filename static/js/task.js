// DATIVES

/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

var worker = psiTurk.taskdata.get('workerId');

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-5.html",
	"instructions/instruct-6.html",
	"instructions/instruct-7.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-5.html",
	"instructions/instruct-6.html",
	"instructions/instruct-7.html",
	"instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* SP Production     *
********************/
var SP_Production = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for the task
	var stims1 = [
		[1,1,"images","F","woman","break","na","na","L","static/images/break.JPG","static/images/clean.JPG","static/audio/The woman broke the plate and the jar.wav"],
		[1,2,"images","F","man","bite","na","na","R","static/images/send_man.JPG","static/images/bite.JPG","static/audio/The man bit the donut.wav"],
		[1,3,"video","F","boy","swing","na","na","na","static/video/The boy swinging the hammer and bat.mp4"],
		[1,4,"images","P","girl","bring","na","na","L","static/images/bring_girl.JPG","static/images/kick.JPG","static/audio/The girl brought the fish the broom.wav"],
		[1,5,"images","P","woman","bring","na","na","L","static/images/bring_woman.JPG","static/images/cut.JPG","static/audio/The woman brought the man the ladder.wav"],
		[1,6,"video","T","boy","bring","match","DO","na","static/video/The boy bringing the camel the keys.mp4"],
		[1,7,"images","F","boy","hide","na","na","R","static/images/send_boy.JPG","static/images/hide.JPG","static/audio/The boy hid the plant and the candy.wav"],
		[1,8,"images","F","girl","drink","na","na","L","static/images/drink.JPG","static/images/show_girl.JPG","static/audio/The girl drank the milk.wav"],
		[1,9,"video","F","man","bump","na","na","na","static/video/The man bumping the chair.mp4"],
		[1,10,"images","P","woman","feed","na","na","R","static/images/throw_woman.JPG","static/images/feed_woman.JPG","static/audio/The woman fed the goose the strawberry.wav"],
		[1,11,"images","P","girl","feed","na","na","R","static/images/pull.JPG","static/images/feed_girl.JPG","static/audio/The girl fed the duck the cheese.wav"],
		[1,12,"video","T","man","feed","match","DO","na","static/video/The man feeding the bagel to the girl.mp4"],
		[1,13,"images","F","man","wash","na","na","L","static/images/wash.JPG","static/images/carry.JPG","static/audio/The man washed the boots and the glasses.wav"],
		[1,14,"images","F","boy","eat","na","na","R","static/images/hug.JPG","static/images/eat.JPG","static/audio/The boy ate the strawberry.wav"],
		[1,15,"video","F","girl","drop","na","na","na","static/video/The girl dropping the fork and crayon.mp4"],
		[1,16,"images","P","boy","give","na","na","L","static/images/give_boy.JPG","static/images/show_boy.JPG","static/audio/The boy gave the lamp to the rooster.wav"],
		[1,17,"images","P","girl","give","na","na","L","static/images/give_girl.JPG","static/images/bring_girl.JPG","static/audio/The girl gave the hammer to the cowboy.wav"],
		[1,18,"video","T","man","give","match","PO","na","static/video/The man giving the dolphin the flower.mp4"],
		[1,19,"images","F","girl","catch","na","na","R","static/images/drink.JPG","static/images/catch.JPG","static/audio/The girl caught the ball.wav"],
		[1,20,"images","F","woman","shake","na","na","L","static/images/shake.JPG","static/images/break.JPG","static/audio/The woman shook the beads and the buttons.wav"],
		[1,21,"video","F","boy","cook","na","na","na","static/video/The boy cooking the pancakes and eggs.mp4"],
		[1,22,"images","P","woman","hand","na","na","R","static/images/bring_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman handed the eggs to the elephant.wav"],
		[1,23,"images","P","man","hand","na","na","R","static/images/throw_man.JPG","static/images/hand_man.JPG","static/audio/The man handed the spoon to the mouse.wav"],
		[1,24,"video","T","boy","hand","match","PO","na","static/video/The boy handing the teapot to the fireman.mp4"],
		[1,25,"images","F","man","fix","na","na","L","static/images/fix.JPG","static/images/bite.JPG","static/audio/The man fixed the lamp.wav"],
		[1,26,"images","F","woman","clean","na","na","R","static/images/feed_woman.JPG","static/images/clean.JPG","static/audio/The woman cleaned the spoon.wav"],
		[1,27,"video","F","girl","taste","na","na","na","static/video/The girl tasting the cookie and cheese.mp4"],
		[1,28,"images","P","man","pass","na","na","L","static/images/pass_man.JPG","static/images/wash.JPG","static/audio/The man passed the lady the cup.wav"],
		[1,29,"images","P","boy","pass","na","na","L","static/images/pass_boy.JPG","static/images/hide.JPG","static/audio/The boy passed the chicken the cake.wav"],
		[1,30,"video","T","girl","pass","match","DO","na","static/video/The girl passing the money to the cat.mp4"],
		[1,31,"images","F","girl","kick","na","na","R","static/images/feed_girl.JPG","static/images/kick.JPG","static/audio/The girl kicked the broom.wav"],
		[1,32,"images","F","boy","chase","na","na","L","static/images/chase.JPG","static/images/eat.JPG","static/audio/The boy chased the bee and the butterfly.wav"],
		[1,33,"video","F","woman","climb","na","na","na","static/video/The woman climbing the ladder.mp4"],
		[1,34,"images","P","boy","send","na","na","R","static/images/give_boy.JPG","static/images/send_boy.JPG","static/audio/The boy sent the butterfly the basket.wav"],
		[1,35,"images","P","man","send","na","na","R","static/images/hand_man.JPG","static/images/send_man.JPG","static/audio/The man sent the lion the box.wav"],
		[1,36,"video","T","woman","send","match","DO","na","static/video/The woman sending the horse the clock.mp4"],
		[1,37,"images","F","boy","hug","na","na","L","static/images/hug.JPG","static/images/pass_boy.JPG","static/audio/The boy hugged the cowboy and the mailman.wav"],
		[1,38,"images","F","man","carry","na","na","R","static/images/fix.JPG","static/images/carry.JPG","static/audio/The man carried the basket and the flag.wav"],
		[1,39,"video","F","woman","lick","na","na","na","static/video/The woman licking the lollipop.mp4"],
		[1,40,"images","P","girl","show","na","na","L","static/images/show_girl.JPG","static/images/give_girl.JPG","static/audio/The girl showed the bucket to the doctor.wav"],
		[1,41,"images","P","boy","show","na","na","L","static/images/show_boy.JPG","static/images/chase.JPG","static/audio/The boy showed the bicycle to the penguin.wav"],
		[1,42,"video","T","woman","show","match","PO","na","static/video/The woman showing the picture to the owl.mp4"],
		[1,43,"images","F","woman","cut","na","na","R","static/images/shake.JPG","static/images/cut.JPG","static/audio/The woman cut the cake.wav"],
		[1,44,"images","F","girl","pull","na","na","L","static/images/pull.JPG","static/images/catch.JPG","static/audio/The girl pulled the sled and the belt.wav"],
		[1,45,"video","F","man","open","na","na","na","static/video/The man opening the box.mp4"],
		[1,46,"images","P","man","throw","na","na","R","static/images/pass_man.JPG","static/images/throw_man.JPG","static/audio/The man threw the crayon to the pony.wav"],
		[1,47,"images","P","woman","throw","na","na","R","static/images/hand_woman.JPG","static/images/throw_woman.JPG","static/audio/The woman threw the ball to the bird.wav"],
		[1,48,"video","T","girl","throw","match","PO","na","static/video/The girl throwing the puppy the muffin.mp4"],
	];

	var stims2 = [
		[2,1,"images","F","woman","break","na","na","R","static/images/clean.JPG","static/images/break.JPG","static/audio/The woman broke the plate and the jar.wav"],
		[2,2,"images","F","man","bite","na","na","L","static/images/bite.JPG","static/images/send_man.JPG","static/audio/The man bit the donut.wav"],
		[2,3,"video","F","boy","swing","na","na","na","static/video/The boy swinging the hammer and bat.mp4"],
		[2,4,"images","P","man","throw","na","na","R","static/images/pass_man.JPG","static/images/throw_man.JPG","static/audio/The man threw the crayon to the pony.wav"],
		[2,5,"images","P","woman","throw","na","na","R","static/images/hand_woman.JPG","static/images/throw_woman.JPG","static/audio/The woman threw the ball to the bird.wav"],
		[2,6,"video","T","girl","throw","match","PO","na","static/video/The girl throwing the puppy the muffin.mp4"],
		[2,7,"images","F","boy","hide","na","na","L","static/images/hide.JPG","static/images/send_boy.JPG","static/audio/The boy hid the plant and the candy.wav"],
		[2,8,"images","F","girl","drink","na","na","R","static/images/show_girl.JPG","static/images/drink.JPG","static/audio/The girl drank the milk.wav"],
		[2,9,"video","F","man","bump","na","na","na","static/video/The man bumping the chair.mp4"],
		[2,10,"images","P","girl","show","na","na","L","static/images/show_girl.JPG","static/images/give_girl.JPG","static/audio/The girl showed the bucket to the doctor.wav"],
		[2,11,"images","P","boy","show","na","na","L","static/images/show_boy.JPG","static/images/chase.JPG","static/audio/The boy showed the bicycle to the penguin.wav"],
		[2,12,"video","T","woman","show","match","PO","na","static/video/The woman showing the picture to the owl.mp4"],
		[2,13,"images","F","man","wash","na","na","R","static/images/carry.JPG","static/images/wash.JPG","static/audio/The man washed the boots and the glasses.wav"],
		[2,14,"images","F","boy","eat","na","na","L","static/images/eat.JPG","static/images/hug.JPG","static/audio/The boy ate the strawberry.wav"],
		[2,15,"video","F","girl","drop","na","na","na","static/video/The girl dropping the fork and crayon.mp4"],
		[2,16,"images","P","boy","send","na","na","R","static/images/give_boy.JPG","static/images/send_boy.JPG","static/audio/The boy sent the butterfly the basket.wav"],
		[2,17,"images","P","man","send","na","na","R","static/images/hand_man.JPG","static/images/send_man.JPG","static/audio/The man sent the lion the box.wav"],
		[2,18,"video","T","woman","send","match","DO","na","static/video/The woman sending the horse the clock.mp4"],
		[2,19,"images","F","girl","catch","na","na","L","static/images/catch.JPG","static/images/drink.JPG","static/audio/The girl caught the ball.wav"],
		[2,20,"images","F","woman","shake","na","na","R","static/images/break.JPG","static/images/shake.JPG","static/audio/The woman shook the beads and the buttons.wav"],
		[2,21,"video","F","boy","cook","na","na","na","static/video/The boy cooking the pancakes and eggs.mp4"],
		[2,22,"images","P","man","pass","na","na","L","static/images/pass_man.JPG","static/images/wash.JPG","static/audio/The man passed the lady the cup.wav"],
		[2,23,"images","P","boy","pass","na","na","L","static/images/pass_boy.JPG","static/images/hide.JPG","static/audio/The boy passed the chicken the cake.wav"],
		[2,24,"video","T","girl","pass","match","DO","na","static/video/The girl passing the money to the cat.mp4"],
		[2,25,"images","F","man","fix","na","na","R","static/images/bite.JPG","static/images/fix.JPG","static/audio/The man fixed the lamp.wav"],
		[2,26,"images","F","woman","clean","na","na","L","static/images/clean.JPG","static/images/feed_woman.JPG","static/audio/The woman cleaned the spoon.wav"],
		[2,27,"video","F","girl","taste","na","na","na","static/video/The girl tasting the cookie and cheese.mp4"],
		[2,28,"images","P","woman","hand","na","na","R","static/images/bring_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman handed the eggs to the elephant.wav"],
		[2,29,"images","P","man","hand","na","na","R","static/images/throw_man.JPG","static/images/hand_man.JPG","static/audio/The man handed the spoon to the mouse.wav"],
		[2,30,"video","T","boy","hand","match","PO","na","static/video/The boy handing the teapot to the fireman.mp4"],
		[2,31,"images","F","girl","kick","na","na","L","static/images/kick.JPG","static/images/feed_girl.JPG","static/audio/The girl kicked the broom.wav"],
		[2,32,"images","F","boy","chase","na","na","R","static/images/eat.JPG","static/images/chase.JPG","static/audio/The boy chased the bee and the butterfly.wav"],
		[2,33,"video","F","woman","climb","na","na","na","static/video/The woman climbing the ladder.mp4"],
		[2,34,"images","P","boy","give","na","na","L","static/images/give_boy.JPG","static/images/show_boy.JPG","static/audio/The boy gave the lamp to the rooster.wav"],
		[2,35,"images","P","girl","give","na","na","L","static/images/give_girl.JPG","static/images/bring_girl.JPG","static/audio/The girl gave the hammer to the cowboy.wav"],
		[2,36,"video","T","man","give","match","PO","na","static/video/The man giving the dolphin the flower.mp4"],
		[2,37,"images","F","boy","hug","na","na","R","static/images/pass_boy.JPG","static/images/hug.JPG","static/audio/The boy hugged the cowboy and the mailman.wav"],
		[2,38,"images","F","man","carry","na","na","L","static/images/carry.JPG","static/images/fix.JPG","static/audio/The man carried the basket and the flag.wav"],
		[2,39,"video","F","woman","lick","na","na","na","static/video/The woman licking the lollipop.mp4"],
		[2,40,"images","P","woman","feed","na","na","R","static/images/throw_woman.JPG","static/images/feed_woman.JPG","static/audio/The woman fed the goose the strawberry.wav"],
		[2,41,"images","P","girl","feed","na","na","R","static/images/pull.JPG","static/images/feed_girl.JPG","static/audio/The girl fed the duck the cheese.wav"],
		[2,42,"video","T","man","feed","match","DO","na","static/video/The man feeding the bagel to the girl.mp4"],
		[2,43,"images","F","woman","cut","na","na","L","static/images/cut.JPG","static/images/shake.JPG","static/audio/The woman cut the cake.wav"],
		[2,44,"images","F","girl","pull","na","na","R","static/images/catch.JPG","static/images/pull.JPG","static/audio/The girl pulled the sled and the belt.wav"],
		[2,45,"video","F","man","open","na","na","na","static/video/The man opening the box.mp4"],
		[2,46,"images","P","girl","bring","na","na","L","static/images/bring_girl.JPG","static/images/kick.JPG","static/audio/The girl brought the fish the broom.wav"],
		[2,47,"images","P","woman","bring","na","na","L","static/images/bring_woman.JPG","static/images/cut.JPG","static/audio/The woman brought the man the ladder.wav"],
		[2,48,"video","T","boy","bring","match","DO","na","static/video/The boy bringing the camel the keys.mp4"],
	];

	var stims3 = [
		[3,1,"images","F","woman","break","na","na","L","static/images/break.JPG","static/images/clean.JPG","static/audio/The woman broke the plate and the jar.wav"],
		[3,2,"images","F","man","bite","na","na","L","static/images/bite.JPG","static/images/send_man.JPG","static/audio/The man bit the donut.wav"],
		[3,3,"video","F","boy","swing","na","na","na","static/video/The boy swinging the hammer and bat.mp4"],
		[3,4,"images","P","boy","send","na","na","R","static/images/give_boy.JPG","static/images/send_boy.JPG","static/audio/The boy sent the butterfly the basket.wav"],
		[3,5,"images","P","man","pass","na","na","L","static/images/pass_man.JPG","static/images/wash.JPG","static/audio/The man passed the lady the cup.wav"],
		[3,6,"video","T","boy","bring","mismatch","DO","na","static/video/The boy bringing the camel the keys.mp4"],
		[3,7,"images","F","boy","hide","na","na","R","static/images/send_boy.JPG","static/images/hide.JPG","static/audio/The boy hid the plant and the candy.wav"],
		[3,8,"images","F","girl","drink","na","na","R","static/images/show_girl.JPG","static/images/drink.JPG","static/audio/The girl drank the milk.wav"],
		[3,9,"video","F","man","bump","na","na","na","static/video/The man bumping the chair.mp4"],
		[3,10,"images","P","girl","show","na","na","L","static/images/show_girl.JPG","static/images/give_girl.JPG","static/audio/The girl showed the bucket to the doctor.wav"],
		[3,11,"images","P","man","throw","na","na","R","static/images/pass_man.JPG","static/images/throw_man.JPG","static/audio/The man threw the crayon to the pony.wav"],
		[3,12,"video","T","man","feed","mismatch","PO","na","static/video/The man feeding the bagel to the girl.mp4"],
		[3,13,"images","F","man","wash","na","na","L","static/images/wash.JPG","static/images/carry.JPG","static/audio/The man washed the boots and the glasses.wav"],
		[3,14,"images","F","boy","eat","na","na","L","static/images/eat.JPG","static/images/hug.JPG","static/audio/The boy ate the strawberry.wav"],
		[3,15,"video","F","girl","drop","na","na","na","static/video/The girl dropping the fork and crayon.mp4"],
		[3,16,"images","P","boy","pass","na","na","R","static/images/hide.JPG","static/images/pass_boy.JPG","static/audio/The boy passed the chicken the cake.wav"],
		[3,17,"images","P","man","send","na","na","L","static/images/send_man.JPG","static/images/hand_man.JPG","static/audio/The man sent the lion the box.wav"],
		[3,18,"video","T","man","give","mismatch","DO","na","static/video/The man giving the dolphin the flower.mp4"],
		[3,19,"images","F","girl","catch","na","na","R","static/images/drink.JPG","static/images/catch.JPG","static/audio/The girl caught the ball.wav"],
		[3,20,"images","F","woman","shake","na","na","R","static/images/break.JPG","static/images/shake.JPG","static/audio/The woman shook the beads and the buttons.wav"],
		[3,21,"video","F","boy","cook","na","na","na","static/video/The boy cooking the pancakes and eggs.mp4"],
		[3,22,"images","P","woman","throw","na","na","L","static/images/throw_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman threw the ball to the bird.wav"],
		[3,23,"images","P","boy","show","na","na","R","static/images/chase.JPG","static/images/show_boy.JPG","static/audio/The boy showed the bicycle to the penguin.wav"],
		[3,24,"video","T","boy","hand","mismatch","PO","na","static/video/The boy handing the teapot to the fireman.mp4"],
		[3,25,"images","F","man","fix","na","na","L","static/images/fix.JPG","static/images/bite.JPG","static/audio/The man fixed the lamp.wav"],
		[3,26,"images","F","woman","clean","na","na","L","static/images/clean.JPG","static/images/feed_woman.JPG","static/audio/The woman cleaned the spoon.wav"],
		[3,27,"video","F","girl","taste","na","na","na","static/video/The girl tasting the cookie and cheese.mp4"],
		[3,28,"images","P","girl","give","na","na","R","static/images/bring_girl.JPG","static/images/give_girl.JPG","static/audio/The girl gave the hammer to the cowboy.wav"],
		[3,29,"images","P","man","hand","na","na","L","static/images/hand_man.JPG","static/images/throw_man.JPG","static/audio/The man handed the spoon to the mouse.wav"],
		[3,30,"video","T","girl","pass","mismatch","PO","na","static/video/The girl passing the money to the cat.mp4"],
		[3,31,"images","F","girl","kick","na","na","R","static/images/feed_girl.JPG","static/images/kick.JPG","static/audio/The girl kicked the broom.wav"],
		[3,32,"images","F","boy","chase","na","na","R","static/images/eat.JPG","static/images/chase.JPG","static/audio/The boy chased the bee and the butterfly.wav"],
		[3,33,"video","F","woman","climb","na","na","na","static/video/The woman climbing the ladder.mp4"],
		[3,34,"images","P","girl","feed","na","na","L","static/images/feed_girl.JPG","static/images/pull.JPG","static/audio/The girl fed the duck the cheese.wav"],
		[3,35,"images","P","woman","bring","na","na","R","static/images/cut.JPG","static/images/bring_woman.JPG","static/audio/The woman brought the man the ladder.wav"],
		[3,36,"video","T","woman","send","mismatch","DO","na","static/video/The woman sending the horse the clock.mp4"],
		[3,37,"images","F","boy","hug","na","na","L","static/images/hug.JPG","static/images/pass_boy.JPG","static/audio/The boy hugged the cowboy and the mailman.wav"],
		[3,38,"images","F","man","carry","na","na","L","static/images/carry.JPG","static/images/fix.JPG","static/audio/The man carried the basket and the flag.wav"],
		[3,39,"video","F","woman","lick","na","na","na","static/video/The woman licking the lollipop.mp4"],
		[3,40,"images","P","woman","hand","na","na","R","static/images/bring_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman handed the eggs to the elephant.wav"],
		[3,41,"images","P","boy","give","na","na","L","static/images/give_boy.JPG","static/images/show_boy.JPG","static/audio/The boy gave the lamp to the rooster.wav"],
		[3,42,"video","T","woman","show","mismatch","PO","na","static/video/The woman showing the picture to the owl.mp4"],
		[3,43,"images","F","woman","cut","na","na","R","static/images/shake.JPG","static/images/cut.JPG","static/audio/The woman cut the cake.wav"],
		[3,44,"images","F","girl","pull","na","na","R","static/images/catch.JPG","static/images/pull.JPG","static/audio/The girl pulled the sled and the belt.wav"],
		[3,45,"video","F","man","open","na","na","na","static/video/The man opening the box.mp4"],
		[3,46,"images","P","girl","bring","na","na","L","static/images/bring_girl.JPG","static/images/kick.JPG","static/audio/The girl brought the fish the broom.wav"],
		[3,47,"images","P","woman","feed","na","na","R","static/images/throw_woman.JPG","static/images/feed_woman.JPG","static/audio/The woman fed the goose the strawberry.wav"],
		[3,48,"video","T","girl","throw","mismatch","DO","na","static/video/The girl throwing the puppy the muffin.mp4"],
	];

	var stims4 = [
		[4,1,"images","F","woman","break","na","na","R","static/images/clean.JPG","static/images/break.JPG","static/audio/The woman broke the plate and the jar.wav"],
		[4,2,"images","F","man","bite","na","na","R","static/images/send_man.JPG","static/images/bite.JPG","static/audio/The man bit the donut.wav"],
		[4,3,"video","F","boy","swing","na","na","na","static/video/The boy swinging the hammer and bat.mp4"],
		[4,4,"images","P","girl","bring","na","na","L","static/images/bring_girl.JPG","static/images/kick.JPG","static/audio/The girl brought the fish the broom.wav"],
		[4,5,"images","P","woman","feed","na","na","R","static/images/throw_woman.JPG","static/images/feed_woman.JPG","static/audio/The woman fed the goose the strawberry.wav"],
		[4,6,"video","T","girl","throw","mismatch","DO","na","static/video/The girl throwing the puppy the muffin.mp4"],
		[4,7,"images","F","boy","hide","na","na","L","static/images/hide.JPG","static/images/send_boy.JPG","static/audio/The boy hid the plant and the candy.wav"],
		[4,8,"images","F","girl","drink","na","na","L","static/images/drink.JPG","static/images/show_girl.JPG","static/audio/The girl drank the milk.wav"],
		[4,9,"video","F","man","bump","na","na","na","static/video/The man bumping the chair.mp4"],
		[4,10,"images","P","woman","hand","na","na","R","static/images/bring_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman handed the eggs to the elephant.wav"],
		[4,11,"images","P","boy","give","na","na","L","static/images/give_boy.JPG","static/images/show_boy.JPG","static/audio/The boy gave the lamp to the rooster.wav"],
		[4,12,"video","T","woman","show","mismatch","PO","na","static/video/The woman showing the picture to the owl.mp4"],
		[4,13,"images","F","man","wash","na","na","R","static/images/carry.JPG","static/images/wash.JPG","static/audio/The man washed the boots and the glasses.wav"],
		[4,14,"images","F","boy","eat","na","na","R","static/images/hug.JPG","static/images/eat.JPG","static/audio/The boy ate the strawberry.wav"],
		[4,15,"video","F","girl","drop","na","na","na","static/video/The girl dropping the fork and crayon.mp4"],
		[4,16,"images","P","girl","feed","na","na","L","static/images/feed_girl.JPG","static/images/pull.JPG","static/audio/The girl fed the duck the cheese.wav"],
		[4,17,"images","P","woman","bring","na","na","R","static/images/cut.JPG","static/images/bring_woman.JPG","static/audio/The woman brought the man the ladder.wav"],
		[4,18,"video","T","woman","send","mismatch","DO","na","static/video/The woman sending the horse the clock.mp4"],
		[4,19,"images","F","girl","catch","na","na","L","static/images/catch.JPG","static/images/drink.JPG","static/audio/The girl caught the ball.wav"],
		[4,20,"images","F","woman","shake","na","na","L","static/images/shake.JPG","static/images/break.JPG","static/audio/The woman shook the beads and the buttons.wav"],
		[4,21,"video","F","boy","cook","na","na","na","static/video/The boy cooking the pancakes and eggs.mp4"],
		[4,22,"images","P","girl","give","na","na","R","static/images/bring_girl.JPG","static/images/give_girl.JPG","static/audio/The girl gave the hammer to the cowboy.wav"],
		[4,23,"images","P","man","hand","na","na","L","static/images/hand_man.JPG","static/images/throw_man.JPG","static/audio/The man handed the spoon to the mouse.wav"],
		[4,24,"video","T","girl","pass","mismatch","PO","na","static/video/The girl passing the money to the cat.mp4"],
		[4,25,"images","F","man","fix","na","na","R","static/images/bite.JPG","static/images/fix.JPG","static/audio/The man fixed the lamp.wav"],
		[4,26,"images","F","woman","clean","na","na","R","static/images/feed_woman.JPG","static/images/clean.JPG","static/audio/The woman cleaned the spoon.wav"],
		[4,27,"video","F","girl","taste","na","na","na","static/video/The girl tasting the cookie and cheese.mp4"],
		[4,28,"images","P","woman","throw","na","na","L","static/images/throw_woman.JPG","static/images/hand_woman.JPG","static/audio/The woman threw the ball to the bird.wav"],
		[4,29,"images","P","boy","show","na","na","R","static/images/chase.JPG","static/images/show_boy.JPG","static/audio/The boy showed the bicycle to the penguin.wav"],
		[4,30,"video","T","boy","hand","mismatch","PO","na","static/video/The boy handing the teapot to the fireman.mp4"],
		[4,31,"images","F","girl","kick","na","na","L","static/images/kick.JPG","static/images/feed_girl.JPG","static/audio/The girl kicked the broom.wav"],
		[4,32,"images","F","boy","chase","na","na","L","static/images/chase.JPG","static/images/eat.JPG","static/audio/The boy chased the bee and the butterfly.wav"],
		[4,33,"video","F","woman","climb","na","na","na","static/video/The woman climbing the ladder.mp4"],
		[4,34,"images","P","boy","pass","na","na","R","static/images/hide.JPG","static/images/pass_boy.JPG","static/audio/The boy passed the chicken the cake.wav"],
		[4,35,"images","P","man","send","na","na","L","static/images/send_man.JPG","static/images/hand_man.JPG","static/audio/The man sent the lion the box.wav"],
		[4,36,"video","T","man","give","mismatch","DO","na","static/video/The man giving the dolphin the flower.mp4"],
		[4,37,"images","F","boy","hug","na","na","R","static/images/pass_boy.JPG","static/images/hug.JPG","static/audio/The boy hugged the cowboy and the mailman.wav"],
		[4,38,"images","F","man","carry","na","na","R","static/images/fix.JPG","static/images/carry.JPG","static/audio/The man carried the basket and the flag.wav"],
		[4,39,"video","F","woman","lick","na","na","na","static/video/The woman licking the lollipop.mp4"],
		[4,40,"images","P","girl","show","na","na","L","static/images/show_girl.JPG","static/images/give_girl.JPG","static/audio/The girl showed the bucket to the doctor.wav"],
		[4,41,"images","P","man","throw","na","na","R","static/images/pass_man.JPG","static/images/throw_man.JPG","static/audio/The man threw the crayon to the pony.wav"],
		[4,42,"video","T","man","feed","mismatch","PO","na","static/video/The man feeding the bagel to the girl.mp4"],
		[4,43,"images","F","woman","cut","na","na","L","static/images/cut.JPG","static/images/shake.JPG","static/audio/The woman cut the cake.wav"],
		[4,44,"images","F","girl","pull","na","na","L","static/images/pull.JPG","static/images/catch.JPG","static/audio/The girl pulled the sled and the belt.wav"],
		[4,45,"video","F","man","open","na","na","na","static/video/The man opening the box.mp4"],
		[4,46,"images","P","boy","send","na","na","R","static/images/give_boy.JPG","static/images/send_boy.JPG","static/audio/The boy sent the butterfly the basket.wav"],
		[4,47,"images","P","man","pass","na","na","L","static/images/pass_man.JPG","static/images/wash.JPG","static/audio/The man passed the lady the cup.wav"],
		[4,48,"video","T","boy","bring","mismatch","DO","na","static/video/The boy bringing the camel the keys.mp4"],
	];

	var random = (Math.floor(Math.random() * 4) + 1).toString();

	if (random==1) {
		var stims = stims1;
	}
	else if (random==2) {
		var stims = stims2;
	}
	else if (random==3) {
		var stims = stims3;
	}
	else {
		var stims = stims4;
	}

	// console.log("list: " + random);

	// stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			finish();
		}
		else {
			stim = stims.shift();
			if (stim[2]==="images") {
				img_trial( stim[9], stim[10], stim[11], stim[0], stim[1] );
				wordon = new Date().getTime();
				listening = true;
				d3.select("#query").html('<p id="prompt">Type the left arrow key (&#8592;) for LEFT or the right arrow key (&#8594;) for RIGHT.</p>');
			}
			else {
				vid_trial( stim[5], stim[9], stim[0], stim[1] );
				wordon = new Date().getTime();
				listening = true;
				d3.select("#query").html('<p id="prompt">Type "N" to continue.</p>');
			}
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 37:
				// "L"
				response="left";
				break;
			case 39:
				// "R"
				response="right";
				break;
			case 78:
				// "N"
				response="next";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[1];
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
									 'list_#':stim[0],
                                     'item_#':stim[1],
                                     'trial_type':stim[2],
                                     'condition':stim[3],
                                     'agent':stim[4],
                                     'verb':stim[5],
                                     'verb_match':stim[6],
                                     'structure':stim[7],
                                     'location':stim[8],
                                     'image1/video':stim[9],
                                     'image2':stim[10],
                                     'audio':stim[11],
                                     'response':response,
                                     'hit':hit,
                                     'rt':rt,
                                     'age':age,
                                 	 'gender':gender}
                                   );
			next();
		}
	};

	var finish = function() {
	    $("body").unbind("keyup", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var img_trial = function(x, y, z, a, b) {
		d3.select("#word").classed("hidden",true);
		d3.select("#stim").classed("hidden",false);
		d3.select("#audio").classed("hidden",false);
		d3.select("#video").classed("hidden",true);
		d3.select("#video-button").classed("hidden",true);
		d3.select("#recording").classed("hidden",true);
		d3.select("#trial_info").remove();
		d3.select("body").append("div")
				.classed("hidden",true)
				.attr("id","trial_info")
				.text(a + "_" + b);
		d3.select("#text").remove();
		d3.select("#text").remove();
		var text = d3.select("#prompt")
					 .append("div")
					 .attr("id","text")
					 .style("text-align","center")
					 .style("font-size","30px")
					 .style("font-weight","20px")
					 .style("margin","5px")
					 .text("Listen to the audio recording and make your selection.");
		d3.select("#img1").remove();
		var stage1 = d3.select("#stim")
					   .append("img")
					   .attr("id","img1")
					   .attr("src",x)
					   .attr("width",350)
					   .attr("height",350)
					   .attr("style","border:3px solid #00BFFF; background:white")
					   .attr("hspace",10);
		d3.select("#img2").remove();
		var stage2 = d3.select("#stim")
					   .append("img")
					   .attr("id","img2")
					   .attr("src",y)
					   .attr("width",350)
					   .attr("height",350)
					   .attr("style","border:3px solid #00BFFF; background:white")
					   .attr("hspace",10);
		d3.select("#audio_control").remove();
		var aud1 = d3.select("#audio")
					.append("audio")
					.attr("id","audio_control")
		var aud2 = d3.select("#audio_control")
					.append("source")
					.attr("src",z)
					.attr("type","audio/wav");
		d3.select("#audio-play-button").remove();
		var aud3 = d3.select("#audio")
					 .append("button")
					 .attr("type","button")
					 .attr("id","audio-play-button")
					 .attr("value","play")
					 .attr("class","btn btn-info btn-lg")
					 .attr("onclick","javascript:startaudio()")
					 .text("Play Audio ");
		var aud4 = d3.select("#audio-play-button")
					 .append("span")
					 .attr("id","play-span-aud")
					 .attr("class","glyphicon glyphicon-play-circle");
	};

	var vid_trial = function(x, y, a, b) {
		d3.select("#word").classed("hidden",false);
		d3.select("#stim").classed("hidden",true);
		d3.select("#audio").classed("hidden",true);
		d3.select("#video").classed("hidden",false);
		d3.select("#video-button").classed("hidden",false);
		d3.select("#recording").classed("hidden",false);
		d3.select("#trial_info").remove();
		d3.select("body").append("div")
				.classed("hidden",true)
				.attr("id","trial_info")
				.text(a + "_" + b);
		d3.select("#text").remove();
		var text = d3.select("#prompt")
					 .append("div")
					 .attr("id","text")
					 .style("text-align","center")
					 .style("font-size","30px")
					 .style("font-weight","20px")
					 .style("margin","5px")
					 .text("Watch the video and record your description.");
		d3.select("#word-text").remove();
		var word = d3.select("#word")
					 .append("div")
					 .attr("id","word-text")
					 .style("text-align","center")
					 .style("font-size","20px")
					 .style("font-weight","10px")
					 .style("margin","5px")
					 .text(x.toUpperCase())
					 .style("font-weight","bold");
		d3.select("#video_control").remove();
		var vid1 = d3.select("#video")
					.append("video")
					.attr("id","video_control")
					//.attr("controls",true)
					.attr("width",350)
					.attr("height",350)
					.attr("style","border:3px solid #32CD32; background:white")
					.attr("hspace",10);
		var vid2 = d3.select("#video_control")
					.append("source")
					.attr("src",y)
					.attr("type","video/mp4");
		d3.select("#video-play-button").remove();
		var vid3 = d3.select("#video-button")
					 .append("button")
					 .attr("type","button")
					 .attr("id","video-play-button")
					 .attr("value","play")
					 .attr("class","btn btn-success btn-lg")
					 .attr("onclick","javascript:startvideo()")
					 .text("Play Video ");
		var vid4 = d3.select("#video-play-button")
					 .append("span")
					 .attr("id","play-span-vid")
					 .attr("class","glyphicon glyphicon-play-circle");
		d3.select("#audio-record-button").attr("disabled",null);
		d3.select("#rec-span-aud").attr("class","glyphicon glyphicon-record");
		d3.select("#output").text("Ready to record.");
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keyup(response_handler); 

	// Start the test
	next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                psiTurk.computeBonus('compute_bonus', function(){finish()}); 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, then quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new SP_Production(); } // what you want to do when you are done with instructions
    );
});
