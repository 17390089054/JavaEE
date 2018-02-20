//拿到画布
			var canvas=document.getElementById("canvas");		
			//获取画笔
			var ct=canvas.getContext("2d");
			var snake=[];//蛇身坐标
			var snakeCount=3;//蛇身长度
			//定义食物初始坐标
			var foodX=0;
			var foodY=0;
			//定义蛇移动的方向
			var dir=3;

			function drawTable(){
				var width=15;
				ct.strokeStyle="#c0c0c0";//线条颜色
				//画网格
				for(var i=0;i<30;i++){
					//竖线
					ct.moveTo(0,i*width);//起点
					ct.lineTo(450,i*width);//终点
					ct.stroke();//连线
					//横线
					ct.moveTo(i*width,0);
					ct.lineTo(i*width,450);
					ct.stroke();
				}
				drawSnake();

				ct.fillStyle="yellow";
				ct.fillRect(foodX,foodY,15,15);
				ct.fill();	
			
			}
		
		//定义蛇的坐标		
		function snakeLocation(){
			for(var i=0;i<snakeCount;i++){
				snake[i]={x:15*i,y:0}
				//console.log(snake[i]);
			}
		}

		
		//画蛇
		function drawSnake(){
			for(var i=0;i<snakeCount;i++){
				if(i==snakeCount-1){
					ct.fillStyle="red";
				}
				else
				{
					ct.fillStyle="black";
				}
				ct.fillRect(snake[i].x,snake[i].y,15,15);
			}
			ct.fill();	
		}
		
		//定义食物的位置
		function food(){
			foodX=Math.floor(Math.random()*30)*15;
			foodY=Math.floor(Math.random()*30)*15;
			//判断食物位置是否与蛇身重合
			for(var i=0;i<snakeCount;i++){
				if(snake[i].x==foodX&&snake[i].y==foodY){
					food();
				}
			}	
		}

		
		//定义键盘监听事件
		function keyDown(e){
				document.onkeydown=function(e){
				switch(e.keyCode){
					case 37:
						if(dir==3)
							break;
							 dir=1;
							 break;
					case 38:
						if(dir==4)
							break;
							dir=2;
							break;
					case 39:
						if(dir==1)
							break;
							dir=3;
							break;
					case 40:
						if(dir==2)
							break;
							dir=4;
							break;
					
				}
			}
		}
		
		function start(e){
			keyDown(e);
			setInterval(move,300);
			
		}
	
		//蛇移动
		function move(){
			if(isDead()){
				alert("很遗憾,你输了!");
				
				window.location.reload();
				return;
			}
			switch(dir){
				case 1:
					snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y});
					break;
				case 2:
					snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y-15});
					break;
				case 3:
					snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y});
					break;
				case 4:
					snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y+15});
					break;
			}
			
			//去除第一个元素
			snake.shift();
			eatFood();
			//刷新画布
			ct.clearRect(0,0,450,450);
			
			drawTable();
			
		}
		//吃食物
		function eatFood(){
			if(snake[snakeCount-1].x==foodX&&snake[snakeCount-1].y==foodY){
					food();
					snake.unshift({x:-15,y:-15});
					snakeCount++;
			}
		}
		//定义死亡规则
		function isDead(){
			//吃到自己死亡
			for(var i=0;i<snakeCount-1;i++){
				if(snake[i].x==snake[snakeCount-1].x&&snake[i].y==snake[snakeCount-1].y){
					return true;
				}		
			}
			//蛇头碰到墙壁死亡
			if(snake[snakeCount-1].x==450||snake[snakeCount-1].x==0||snake[snakeCount-1].y<		0||snake[snakeCount-1].y==450){
					return true;
			}

			return false;
		}
		window.onload=function(){		
			snakeLocation();
			food();
			drawTable();
			
			document.onkeydown=function(e){
				if(e.keyCode==13){
					begin.onclick();
				}
			
			}


		}
		var begin=document.getElementById("start");
		begin.onclick=function(){
			
			start();
			
		}