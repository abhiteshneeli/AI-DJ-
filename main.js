sound="";

function preload(){
    sound=loadSound("music.mp3");
}

leftwristx="";
leftwristy="";

rightwristx="";
rightwristy="";

scroe_leftwrist="";
score_rightwrist="";

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose', gotposes)
}

function gotposes(results){

    

        console.log(results);

        scroe_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score of leftwrist"+scroe_leftwrist);

        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score of rightwrist"+score_rightwrist);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

        console.log("leftwristx = "+leftwristx+"leftwristy = "+leftwristy);
        console.log("rightwristx = "+leftwristx+"rightwristy = "+rightwristy);
        
    
}
function modelloaded(){
    console.log("poseNET is loaded");
}

function draw(){
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");

    if (scroe_leftwrist > 0.2) {
        
    
    circle(leftwristx,leftwristy,20);
    innumberleftwristy=Number(leftwristy);
    remove_decimals=floor(innumberleftwristy);
    leftwrist_div_500=remove_decimals/500;
    volume=leftwrist_div_500 *2;
    document.getElementById("volume").innerHTML="volume"+volume;
    sound.setVolume(volume);
    }

 if( score_rightwrist > 0.2){

    circle(rightwristx,rightwristy,20);

    if (rightwristy >0 && rightwristy <= 100) {
        document.getElementById("speed").innerHTML="SPEED = 0.5x";
        sound.rate(0.5);
    }
     else if(rightwristy >100 && rightwristy <= 200)
      {
        document.getElementById("speed").innerHTML="SPEED = 1x";
        sound.rate(1);
    }
    else if(rightwristy >200 && rightwristy <= 300)
      {
        document.getElementById("speed").innerHTML="SPEED = 1.5x";
        sound.rate(1.5);
    }
    else if(rightwristy >300 && rightwristy <= 400)
      {
        document.getElementById("speed").innerHTML="SPEED = 2x";
        sound.rate(2);
    }
    else if(rightwristy >400 && rightwristy <= 500)
      {
        document.getElementById("speed").innerHTML="SPEED = 2.5x";
        sound.rate(2.5);
    }
 }
}