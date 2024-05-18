let currentplayer="X";
let plays =0;
let currentplay={
    X:[],
    O:[]
};
let gamefinish=false;
const win=[
    [1,2,3,0,8,0,0,12,0],
    [4,5,6,0,18,0,0,32,0],
    [7,8,9,0,28,0,0,52,0],
    [1,4,7,-10,18,90,-20,32,90],
    [2,5,8,0,18,90,0,32,90],
    [3,6,9,10,18,90,20,32,90],
    [1,5,9,0,18,45,0,32,45],
    [3,5,7,0,18,-45,0,32,-45]
];

let winarray=0;

$(".cell").one("click",gameon);
    
function gameon() {
    if(!gamefinish){
        $("h1").text("");
        $(this).text(currentplayer);
        $(this).addClass("not-allowed");
            
        currentplay[currentplayer].push(Number($(this).attr("id")));
            
        plays++;
        // color of font change according to player
        if (currentplayer==="X"){
            $(this).css("color","#b40629");
        }
        else{
            $(this).css("color","blue");

        }
        // checking winner and changing text according to it
        if (checkWin(currentplayer)){
            $("h2").text("Click on Reset to Play Again");
            if(currentplayer==="X"){
                $("h1").text("Winner is Red");
            }
            else{
                $("h1").text("Winner is Blue");                    
            }
            gamefinish=true;
            $(".cell").addClass("not-allowed");
            if (window.matchMedia('(min-width: 769px)').matches) {
                if((win[winarray][0]===1 && win[winarray][1]===5) || (win[winarray][0]===3 && win[winarray][1]===5)){

                    $(".line").css({"translate":""+win[winarray][3]+"vw "+win[winarray][4]+"vw",
                    "rotate":""+win[winarray][5]+"deg"});
                $(".line").addClass("width2");
                }
                else{
                    $(".line").css({"translate":""+win[winarray][3]+"vw "+win[winarray][4]+"vw",
                    "rotate":""+win[winarray][5]+"deg"});
                    $(".line").addClass("width1");
                }
            }
            else{
                if((win[winarray][0]===1 && win[winarray][1]===5) || (win[winarray][0]===3 && win[winarray][1]===5)){

                    $(".line").css({"translate":""+win[winarray][6]+"vw "+win[winarray][7]+"vw",
                    "rotate":""+win[winarray][8]+"deg"});
                $(".line").addClass("widthsmall2");
                }
                else{
                    $(".line").css({"translate":""+win[winarray][6]+"vw "+win[winarray][7]+"vw",
                    "rotate":""+win[winarray][8]+"deg"});
                    $(".line").addClass("widthsmall1");
                }

            }
        }

        //changing background color and player
        $("body").removeClass("red1");
        if(!gamefinish){
            if (currentplayer==="X"){
                $("h2").text("It's Blue's turn");
                $("body").removeClass("red");
                $("body").addClass("blue");
                currentplayer="O";
                
            }
            else{
                $("body").removeClass("blue");
                $("body").addClass("red");
                $("h2").text("It's Red's turn");
                currentplayer="X";
            }
            
            if (plays===9){
                draw();
            }
        }
    }
};

//function for reset button
$(".btn").on("click",function(){

    $(".cell").text("");
    $("h1").text("Click inside the square to Play");
    $("h2").text("Red's Turn First");

    currentplayer="X";

    plays=0;
    
    currentplay={
        X:[],
        O:[]
    };
    gamefinish=false; 
    
    $("body").removeClass("red");
    $("body").removeClass("blue");
    $("body").addClass("red1");

    winarray=0;

    $(".line").removeClass("width1");
    $(".line").removeClass("widthsmall1");
    $(".line").removeClass("widthsmall2");
    $(".line").removeClass("width2");
    $(".cell").removeClass("not-allowed");
    $(".cell").addClass("pointer");
    $(".cell").one("click",gameon);


})
//function to check if the game is a draw
function draw(){
    $("h1").text("It's a Draw!");
    $("h2").text("Click on Reset to Play Again");
    currentplayer="X";
    plays=0;
    currentplay={
        X:[],
        O:[]
    };
    gamefinish=true;

}
//function to check winner
function checkWin(currentplayer){
    for(let i=0;i<win.length;i++){
        let wincount=0;

        for(let j=0;j<3;j++){

            if (currentplay[currentplayer].includes(win[i][j])){
                wincount++;
            }
        }
        if(wincount===3 ){
            winarray=i;
            return true;
        }
    }
    return false;
}