let arr = [

]
let w;
const sortingArea = 0.2;
let i = 1;
let j = 0;
let key = 0;
let firstHit = -1;
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let x = 0; x < 10; x++) {
        arr[x] = x + 1;
    }
    shuffle(arr, true);
    w = width / arr.length;
}

function draw() {
    background(0);
    noStroke();
    let arrHeight = sortingArea * height;
    for (let x = 0; x < arr.length; x++) {
        let y = map(arr[floor(x)], 0, arr.length, 0, arrHeight);
        rectMode(CORNERS)
        rect(x * w, height - y, (x + 1) * w, height)
    }

    //for (i = 1; i < arr.length; i++) {

    textSize(32);
    textAlign(CENTER, CENTER)
    let lN = 27804780421;
    let rN = 45783024092;

    if (((arr[j+1]-arr[j])*lN)%12 < 9) {
        fill(255);
        text(str(arr[j]), width / 4, height / 2)
    } else if(((arr[j+1]-arr[j])*lN)%12 < 6){
        //text(str(arr[j]),width*0.75,height/2)
        stroke(255);
        tallyMark(arr[j], width / 4, height / 2)
    } else if(((arr[j+1]-arr[j])*lN)%12 < 3){
        text(roman(arr[j]), width * 0.25, height / 2)

    } else {
        text(bin(arr[j]), width * 0.25, height / 2)

    }
    if (((arr[j]-arr[j+1])*rN)%12 < 9) {
        fill(255);
        text(str(arr[j+1]), width * 0.75, height / 2)
    } else if(((arr[j]-arr[j+1])*rN)%12 < 6){
        //text(str(arr[j]),width*0.75,height/2)
        stroke(255);
        tallyMark(arr[j+1], width * 0.75, height / 2)
    } else if(((arr[j]-arr[j+1])*rN)%12 < 3){
        text(roman(arr[j+1]), width * 0.75, height / 2)

    } else {
        text(bin(arr[j+1]), width * 0.75, height / 2)

    }


    if (isSorted()) {
        noLoop();
        redraw();
        text("YOU WIN", width / 2, height / 2);
        text(`TIME: ${nf((millis()-firstHit)/1000,3,2)}`,width/2,height*0.6)
    }

    //}
    stroke(255);
    line(0, height - arrHeight, width, height - arrHeight);
}

function roman(n) {
    let romanization = "I II III IV V VI VII VIII IX X".split(" ");
    return romanization[n-1]
}

function bin(n) {
    return "b" + ((n >>> 0).toString(2));
}

function tallyMark(n, x, y) {
    let runningX = x;
    for (let i = 1; i <= n; i++) {
        runningX += 10;
        if (i % 5 == 0) {
            line(runningX - 60, y, runningX - 10, y + 25);
        } else {
            line(runningX - 10, y, runningX - 10, y + 25);
        }
    }

}

function isSorted() {
    let sc = sort(arr.slice());
    for (let i = 0; i < arr.length; i++) {
        if (sc[i] != arr[i]) return false;
    }
    return true;
}

function mousePressed() {
    if(isSorted()) {
        shuffle(arr,true);
        i = 1;
        j = 0;
        firstHit = millis();
        loop();
        return;
    }
    if(firstHit == -1) {
        firstHit = millis();
    }
    let n = arr.length;
    let gt = mouseX > width / 2
    if (!gt) {
        let tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
    }
    j++;
    if (j > n - 2) {
        j = 0;
        if (i >= n - 1) {
            noLoop();
        }
        i++;
    }
    if (isSorted()) {
        noLoop();
    }
}
