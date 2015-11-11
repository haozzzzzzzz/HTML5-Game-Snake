/*
Snake.js
版本:1.0
上次修订日期:2012/7/20
作者:haozi
团体:院报
*/
/*
canvas:295*145
*/



if (confirm("是否进入游戏?") == 1) {//进入游戏前提示
    var backgroundAudioPlayer = document.getElementById("Background-AudioPlayer");//音乐准备
    backgroundAudioPlayer.play();
    var snake = new creatSnake();
    var snakeCanvas = document.getElementById("Snake-Canvas");//画布准备
    var canvasContext = snakeCanvas.getContext("2d");
    snake.IniGame();//游戏准备
    snake.m_nGameStatus = 1;//游戏处于开始的状态
    Timer();//进入游戏循环
}
else {
    alert("再见!");
}









function Timer() {

    //利用event对象处理按键消息
    var uTag = 0;//游戏是否失败
    var uPoint = new createPoint(snake.m_aBody[0].x,snake.m_aBody[0].y);
    switch (snake.m_nDirect) {//left:2 right:1 up:4 down:3 蛇的方向
        case 1:
            uPoint.x+=5;
            if (uPoint.x > 295) {
                uTag = 1;
            }
            break;
        case 2:
            uPoint.x-=5;
            if (uPoint.x < 0) {
                uTag = 1;
            }
            break;
        case 3:
            uPoint.y+=5;
            if (uPoint.y >145)
            {
                uTag = 1;
            }
            break;
        case 4:
            uPoint.y-=5;
            if (uPoint.y < 0) {
                uTag = 1;
            }
            break;
    }

    
    //判断蛇是否碰到了自身
    if (uTag == 0) {
        var i=0;
        for (i in snake.m_aBody) {
            if ((snake.m_aBody[i].x == uPoint.x) && (snake.m_aBody[i].y == uPoint.y)) {
                uTag = 1;
                break;
            }
        }
    }
    
    //位置重排 
    if (uTag == 0) {
        if ((snake.m_aBody[0].x == snake.m_pAim.x) && (snake.m_aBody[0].y == snake.m_pAim.y)) {//如果吃掉目标
            snake.m_nCount++;
            snake.m_aBody[snake.m_nCount + 2] = new createPoint();
            snake.ReDisplay(snake.m_pAim.x, snake.m_pAim.y);
            var scoreAudioPlayer = document.getElementById("Score-AudioPlayer");
            scoreAudioPlayer.play();
            snake.IniAim();
        }

        var tempPoint = new createPoint(snake.m_aBody[snake.m_nCount + 2].x, snake.m_aBody[snake.m_nCount + 2].y);
        for (var i = snake.m_nCount+2; i >0 ; i--) {
            snake.m_aBody[i].x = snake.m_aBody[i - 1].x;
            snake.m_aBody[i].y = snake.m_aBody[i - 1].y;
        }
        snake.m_aBody[0].x = uPoint.x;
        snake.m_aBody[0].y = uPoint.y;
        snake.ReDisplay(tempPoint.x,tempPoint.y);
    }


    //打印游戏界面
    canvasContext.beginPath();
    //目标
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(snake.m_pAim.x, snake.m_pAim.y, 5, 5);
    //蛇
    canvasContext.fillStyle = "red";
    var i = 0;
    for (i in snake.m_aBody) {
        canvasContext.fillRect(snake.m_aBody[i].x, snake.m_aBody[i].y, 5, 5);
    }




    if (uTag == 1) {//如果游戏失败，则进入处理
        snake.m_nGameStatus = 0;
        var gameoverAudioPlayer = document.getElementById("GameOver-AudioPlayer");//游戏结束音乐准备
        backgroundAudioPlayer.pause();
        gameoverAudioPlayer.play();
        if (confirm("Game Over !Do you want to try again?")) {//询问是否从来
            canvasContext.clearRect(0,0,300,150);
            snake.IniGame();
            snake.m_nGameStatus = 1;
            backgroundAudioPlayer.load();
            backgroundAudioPlayer.play();
        }
    }




    //游戏统计
    snake.m_nTime += 0.5;
    var snakeTime = document.getElementById("Snake-Time");
    if (snake.m_nTime % 1 == 0)
        snakeTime.innerText = snake.m_nTime;
    document.getElementById("Snake-Score").innerText = snake.m_nCount;
    var length = snake.m_nCount + 3;
    document.getElementById("Snake-Length").innerText=length;


    //重新发送
    if (snake.m_nGameStatus)
        setTimeout("Timer()", 500);
}




















//Snake类
function creatSnake() {
    this.m_nsize = 20;//每格大小
    this.m_nCount=0;//吃掉的目标数
    this.m_nTime = 0;//用时
    this.m_nDirect=1;//当前方向  left:2 right:1 up:4 down:3
    this.m_nGameStatus = 0;//游戏状态 stop:0 start:1
    this.m_pAim = new createPoint(100,100);
    this.m_aBody = null;



    //ReDisplay函数
    this.ReDisplay = function (x,y)
    {
        canvasContext.clearRect(x-1,y-1,7,7);
    }




    //IniAim函数 目标初始化
    this.IniAim = function ()
    {
        var uX, uY;//目标位置
        while (1) {
            uX = Math.round(Math.random() * 295);
            if (uX % 10 > 5) {
                uX = uX - uX % 10 + 5;
            }
            else if (uX % 10 < 5)
                uX -= uX % 10;
            uY = Math.round(Math.random() * 145);
            if (uY % 10 > 5) {
                uY = uY- uY % 10 + 5;
            }
            else if (uY % 10 < 5)
                uY -= uY % 10;

            var uTag = 0;//0:与蛇身不重合 1:与蛇身重合

            for (var i = 0; i < this.m_nCount + 2; i++) {
                if (this.m_aBody[i].x == uX || this.m_aBody[i].y == uY) {
                    uTag = 1;
                    break;
                }
            }
            if (uTag == 0) {
                break;
            }
        }
        this.m_pAim.x = uX;
        this.m_pAim.y = uY;
    }


    //IniGame函数 游戏准备 初始化数据
    this.IniGame = function ()
    {
		this.m_aBody=null;
        this.m_nsize = 20;//每格大小
        this.m_nCount = 0;//吃掉的目标数
        this.m_nTime = 0;//用时
        this.m_nDirect = 1;//当前方向  left:2 right:1 up:4 down:3
        this.m_nGameStatus = 0;//游戏状态 stop:0 start:1
        this.m_pAim = new createPoint(100, 100);
        this.m_aBody = new Array();
        this.m_aBody[0] = new createPoint(20, 10);//初始时，蛇有三节
        this.m_aBody[1] = new createPoint(15, 10);
        this.m_aBody[2] = new createPoint(10, 10);
        this.IniAim();
    }
}

















//point类 
function createPoint(x, y) {
    this.x = x;
    this.y = y;
}


function whichKeyPressed(event)//响应按键消息，改变蛇的方向
{
    switch (event.keyCode) {
        case 38://up
            snake.m_nDirect = 4;
            break;
        case 40://down
            snake.m_nDirect = 3;
            break;
        case 37://left
            snake.m_nDirect = 2;
            break;
        case 39://right
            snake.m_nDirect = 1;
            break;
    }
}