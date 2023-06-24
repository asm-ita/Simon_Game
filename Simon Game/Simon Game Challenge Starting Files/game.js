var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userchosenColor=[];
var started=false;
var level=0;
$(document).keypress(function()
{
  if(!started)
  {
    $("#level-title").text("Level"+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(){
  var userColor=$(this).attr("id");
  userchosenColor.push(userColor);
  playSound(userColor); 
  animateButton(userColor);  
  checkAnswer(userchosenColor.length-1);
});
function nextSequence()
{
  userchosenColor=[];
  level++;

  $("#level-title").text("Level"+level);
    var randomnumber=Math.floor(Math.random()*4);

var randomchosenColor=buttonColors[randomnumber];
gamePattern.push(randomchosenColor);
$("#" + randomchosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomchosenColor);
}
function playSound(name)
{
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}
function animateButton(name)
{
  $("#" + name).addClass("pressed");
  setTimeout(function()
  {
    $("#"+name).removeClass("pressed");
  },100);
}
function checkAnswer(index)
{
  if(gamePattern[index]==userchosenColor[index])
  {
    if(gamePattern.length==userchosenColor.length)
    {
      setTimeout(function()
      {
        nextSequence(); 
      },1000);
    }
    
  }
  else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("game over.Press Any key to Start Again");
      setTimeout(function()
      {
        $("body").removeClass("game-over");
      },200);
      startOver();
    }
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}


