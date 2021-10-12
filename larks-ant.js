// Nicholas Ayson, Shiv Bhagat
// Lark's ant 

var g_canvas = {cell_size: 10, wid: 60, hgt: 40}; // JS Global var, w canvas size info.

var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 10; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.
var currentColor = "black";
var direction = 0;
var countdown = 0;

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid; // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas(width, height); // Make a P5 canvas.
    draw_grid(10, 50, 'white', 'white');
}

var g_bot = {dir: 3, x: 30, y: 20, color: 100}; // Dir is 0..7 clock, w 0 up.

var g_box = {t: 1, hgt: 40, l: 1, wid: 60}; // Box in which bot can move.



function move_bot() {
    // Change direction at random; brownian motion.
    let dx = 0;
    let dy = 0;
    switch (direction) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
        case 0 : {         dy = -1; break; }    //UP
        case 1 : { dx = 1; break; }             //RIGHT
        case 2 : {         dy = 1; break; }     //DOWN
        case 3 : { dx = -1; break; }        // LEFT
    }
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    let color = 100 + (1 + g_bot.color) % 156; // Incr color in nice range.
    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = direction;
    g_bot.color = color;
    //console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}


function draw_bot() // Convert bot pox to grid pos & draw bot.
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1 + g_bot.x * sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1 + g_bot.y * sz;
    let big = sz - 2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    fill(g_bot.color = currentColor); // Concat string, auto-convert the number to string. ADJUSTED
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get(x + sz2, y + sz2); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[0] + acolors[1] + acolors[2];
    //console.log( "acolors,pix = " + acolors + ", " + pix );
    function straight() {
    direction = g_bot.dir;
    }

    function Countdown() {
        countdown = 4;
    }

    function right()  {
        if (direction < 3) {
            direction++;
        } 
        else direction = 0;
    }

    function left() {
        if (direction > 0){
            direction--;
        }
        else{
        direction = 3;
        }
    }

    if (countdown > 0) {
        currentColor = "yellow";
        straight();
        countdown--;
    }
    else if (pix === 0) {   // if current = black, turn blue and left
        currentColor = "blue";
        left();
    } 
    else if (acolors[0] === 255 && acolors[1] === 0) {   // if current = red , turn yellow + right;
        currentColor = "yellow";
        right();
    } 
    else if( (acolors[2] === 255)){ // if current =  blue, turn yellow + right;
        currentColor = "yellow";
        right();
    }
    else if (acolors[0] === 255 && acolors[1] === 255) 
    {   // if current = yellow, turn red + go straight
        currentColor = "red";
        fill(g_bot.color = currentColor); // Paint the cell.
        Countdown();
        straight();
    }
    rect(x, y, big, big); // Paint the cell.
}

function draw_update() // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot();
    draw_bot();
}

function draw() // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod) {
        if (!g_stop) draw_update();
    }
}