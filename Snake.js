/*
Snake.js
�汾:1.0
�ϴ��޶�����:2012/7/20
����:haozi
����:Ժ��
*/
/*
canvas:295*145
*/



if (confirm("�Ƿ������Ϸ?") == 1) {//������Ϸǰ��ʾ
    var backgroundAudioPlayer = document.getElementById("Background-AudioPlayer");//����׼��
    backgroundAudioPlayer.play();
    var snake = new creatSnake();
    var snakeCanvas = document.getElementById("Snake-Canvas");//����׼��
    var canvasContext = snakeCanvas.getContext("2d");
    snake.IniGame();//��Ϸ׼��
    snake.m_nGameStatus = 1;//��Ϸ���ڿ�ʼ��״̬
    Timer();//������Ϸѭ��
}
else {
    alert("�ټ�!");
}









function Timer() {

    //����event����������Ϣ
    var uTag = 0;//��Ϸ�Ƿ�ʧ��
    var uPoint = new createPoint(snake.m_aBody[0].x,snake.m_aBody[0].y);
    switch (snake.m_nDirect) {//left:2 right:1 up:4 down:3 �ߵķ���
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

    
    //�ж����Ƿ�����������
    if (uTag == 0) {
        var i=0;
        for (i in snake.m_aBody) {
            if ((snake.m_aBody[i].x == uPoint.x) && (snake.m_aBody[i].y == uPoint.y)) {
                uTag = 1;
                break;
            }
        }
    }
    
    //λ������ 
    if (uTag == 0) {
        if ((snake.m_aBody[0].x == snake.m_pAim.x) && (snake.m_aBody[0].y == snake.m_pAim.y)) {//����Ե�Ŀ��
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


    //��ӡ��Ϸ����
    canvasContext.beginPath();
    //Ŀ��
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(snake.m_pAim.x, snake.m_pAim.y, 5, 5);
    //��
    canvasContext.fillStyle = "red";
    var i = 0;
    for (i in snake.m_aBody) {
        canvasContext.fillRect(snake.m_aBody[i].x, snake.m_aBody[i].y, 5, 5);
    }




    if (uTag == 1) {//�����Ϸʧ�ܣ�����봦��
        snake.m_nGameStatus = 0;
        var gameoverAudioPlayer = document.getElementById("GameOver-AudioPlayer");//��Ϸ��������׼��
        backgroundAudioPlayer.pause();
        gameoverAudioPlayer.play();
        if (confirm("Game Over !Do you want to try again?")) {//ѯ���Ƿ����
            canvasContext.clearRect(0,0,300,150);
            snake.IniGame();
            snake.m_nGameStatus = 1;
            backgroundAudioPlayer.load();
            backgroundAudioPlayer.play();
        }
    }




    //��Ϸͳ��
    snake.m_nTime += 0.5;
    var snakeTime = document.getElementById("Snake-Time");
    if (snake.m_nTime % 1 == 0)
        snakeTime.innerText = snake.m_nTime;
    document.getElementById("Snake-Score").innerText = snake.m_nCount;
    var length = snake.m_nCount + 3;
    document.getElementById("Snake-Length").innerText=length;


    //���·���
    if (snake.m_nGameStatus)
        setTimeout("Timer()", 500);
}




















//Snake��
function creatSnake() {
    this.m_nsize = 20;//ÿ���С
    this.m_nCount=0;//�Ե���Ŀ����
    this.m_nTime = 0;//��ʱ
    this.m_nDirect=1;//��ǰ����  left:2 right:1 up:4 down:3
    this.m_nGameStatus = 0;//��Ϸ״̬ stop:0 start:1
    this.m_pAim = new createPoint(100,100);
    this.m_aBody = null;



    //ReDisplay����
    this.ReDisplay = function (x,y)
    {
        canvasContext.clearRect(x-1,y-1,7,7);
    }




    //IniAim���� Ŀ���ʼ��
    this.IniAim = function ()
    {
        var uX, uY;//Ŀ��λ��
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

            var uTag = 0;//0:�������غ� 1:�������غ�

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


    //IniGame���� ��Ϸ׼�� ��ʼ������
    this.IniGame = function ()
    {
		this.m_aBody=null;
        this.m_nsize = 20;//ÿ���С
        this.m_nCount = 0;//�Ե���Ŀ����
        this.m_nTime = 0;//��ʱ
        this.m_nDirect = 1;//��ǰ����  left:2 right:1 up:4 down:3
        this.m_nGameStatus = 0;//��Ϸ״̬ stop:0 start:1
        this.m_pAim = new createPoint(100, 100);
        this.m_aBody = new Array();
        this.m_aBody[0] = new createPoint(20, 10);//��ʼʱ����������
        this.m_aBody[1] = new createPoint(15, 10);
        this.m_aBody[2] = new createPoint(10, 10);
        this.IniAim();
    }
}

















//point�� 
function createPoint(x, y) {
    this.x = x;
    this.y = y;
}


function whichKeyPressed(event)//��Ӧ������Ϣ���ı��ߵķ���
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