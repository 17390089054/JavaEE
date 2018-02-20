var over=false;
			
			//拿到画板
			var chess=document.getElementById("canvas");
			//获取权限
			var context=chess.getContext("2d");
			
			//绘画棋板的方法
			var drawBoard=function (){
			//设置线条衍射
			context.strokeStyle="#bbbbbb";

				//获取起点和终点
				for(var i=0;i<15;i++)
				{
				//起点
				context.moveTo(15+i*30,15);
				//终点
				context.lineTo(15+i*30,435);
				//起点
				context.moveTo(15,15+i*30);
				//终点
				context.lineTo(435,15+i*30);
				//连线
				context.stroke();
				}
			}
			drawBoard();


			//绘制棋子的方法
			var onStep=function(i,j,me){
			//绘制棋子 圆形 圆心 半径 起点 终点 
			context.beginPath();//开始路径
			context.arc(15+i*30,15+j*30,10,0,Math.PI*2)		
			context.closePath();//结束路径
			context.stroke();
			//设置渐变色 径向渐变(径:半径)
			var gredient=context.createRadialGradient(15+i*30+2,15+j*30-2,10,15+i*30+2,15+j*30-2,0);
			if(me)
			{
				gredient.addColorStop(0,"#0a0a0a");
				gredient.addColorStop(1,"#636767");
			}
			else
			{
				gredient.addColorStop(0,"#d1d1d1");
				gredient.addColorStop(1,"#f9f9f9");
			}
				context.fillStyle=gredient;//设置填充色
				context.fill();//填充色
			}
			
			

			


			//下棋
			var me=true;
			var chessBoard=[];
			//遍历棋盘上所有的点
			for(var i=0;i<15;i++){
				 chessBoard[i]=[];
				for(var j=0;j<15;j++){
					chessBoard[i][j]=0;
				}
			}
			
			//下棋的主方法
			chess.onclick=function(e){
				if(over)return;
				if(!me)return;
				//获取鼠标点击位置
				var x=e.offsetX;
				var y=e.offsetY;
				var i=Math.floor(x/30);
				var j=Math.floor(y/30);
				//未下棋的地方才能落子
				if(chessBoard[i][j]==0){
						onStep(i,j,me);
						chessBoard[i][j]=1;
						for(var k=0;k<count;k++){
							if(wins[i][j][k]){
								myWin[k]++;
								computerWin[k]=6;
								if(myWin[k]==5)
								{
									window.alert("恭喜你,你赢了");
									over=true;
								}
							}
						}
					if(!over){
						me=!me;
						computerAI();
					}
				}
			

			};






			//定义规则 赢法数组
			var wins=[];
			for(var i=0;i<15;i++){
				wins[i]=[];
				for(var j=0;j<15;j++){
					wins[i][j]=[];
				}
			}
			var count=0;//赢法的索引
			//横线
			for(var i=0;i<15;i++){
				for(var j=0;j<11;j++){
					for(var k=0;k<5;k++){
						wins[i][j+k][count]=true;//满足定义的条件为赢
					}
					count++;
				}
			}
			//竖线
			for(var i=0;i<15;i++){
				for(var j=0;j<11;j++){
					for(var k=0;k<5;k++){
						wins[j+k][i][count]=true;//满足定义的条件为赢
					}
					count++;
				}
			}
			
			//斜线
			for(var i=0;i<11;i++){
				for(var j=0;j<11;j++){
					for(var k=0;k<5;k++){
						wins[i+k][j+k][count]=true;//满足定义的条件为赢
					}
					count++;
				}
			}
			//反斜线
			for(var i=0;i<11;i++){
				for(var j=14;j>3;j--){
					for(var k=0;k<5;k++){
						wins[i+k][j-k][count]=true;//满足定义的条件为赢
					}
					count++;
				}
			}


			
			//console.log(count);//总共572种赢法
			//赢法统计数组
			var myWin=[];
			var computerWin=[];
			for(var i=0;i<count;i++){
				myWin[i]=0;
				computerWin[i]=0;
			}
			
			//计算机的AI算法
			var computerAI=function(){
				var myScore=[];//我方分数
				var computerScore=[];//计算机分数
				var max=0;//保存最高点分数
				var u=0,v=0;//保存最高点分数坐标
				//初始化分数
				for(var i=0;i<15;i++){
					myScore[i]=[];
					computerScore[i]=[];
					for(var j=0;j<15;j++){
						myScore[i][j]=0;
						computerScore[i][j]=0;
					}
				}
				//计算计算机下棋的位置
				for(var i=0;i<15;i++){
					for(var j=0;j<15;j++){
						if(chessBoard[i][j]==0){
							for(var k=0;k<count;k++){
								if(wins[i][j][k]){
									//我方积分
									if(myWin[k]==1){
										myScore[i][j]+=200;
									}
									else if(myWin[k]==2)
									{
										myScore[i][j]+=400;				
									}
									else if(myWin[k]==3)
									{
										myScore[i][j]+=2000;				
									}
									else if(myWin[k]==4)
									{
										myScore[i][j]+=10000;				
									}
									//计算机积分
									if(computerWin[k]==1){
										computerScore[i][j]+=420;
									}
									else if(computerWin[k]==2)
									{
										computerScore[i][j]+=820;				
									}
									else if(computerWin[k]==3)
									{
										computerScore[i][j]+=4100;				
									}
									else if(computerWin[k]==4)
									{
										computerScore[i][j]+=20000;				
									}
								}
							}

							if(myScore[i][j]>max){
								max=myScore[i][j];//保存最高点分数和坐标
								u=i;
								v=j;
							}else if(myScore[i][j]==max){
								if(computerScore[i][j]>computerScore[u][v]){
									u=i;
									v=j;
								}
							}

							if(computerScore[i][j]>max){
								max=computerScore[i][j];//保存最高点分数和坐标
								u=i;
								v=j;
							}else if(computerScore[i][j]==max){
								if(myScore[i][j]>myScore[u][v]){
									u=i;
									v=j;
								}
							}
						}
					}


					
				}
			
				
				onStep(u,v,false);
				chessBoard[u][v]=2;
				for(var k=0;k<count;k++){
					if(wins[u][v][k]){
						computerWin[k]++;
						myWin[k]=6;
						if(computerWin[k]==5){
							window.alert("很遗憾,计算机赢了!");
							over=true;
						}
					}
				
				}
				if(!over){
					me=!me;

				}
				

		}




