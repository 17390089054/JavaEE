//���ɳ��еķ���
	function City(base)
	{
		this.base=base;//�����������
		this.max=50;

	}
	//���ɻ���
	City.prototype.Area=function(parent)
	{
			this.city=document.createElement("div");
			this.city.id="City";
			this.city.style.height=this.city.style.width=this.base*this.max+"px";
			parent.appendChild(this.city);
	}
	//����¥�㲢��ӵ���������
	City.prototype.Estate=function(top,left)
	{
		var estate=document.createElement("div");
		estate.className=this.GetStyle();
		estate.style.height=this.GetHeight()+"px";
		estate.style.top=top+"px";
		estate.style.left=left+"px";
		this.city.appendChild(estate);
		var l=this.GetWidth();
		var w=this.GetWidth();
		var b1=document.createElement("b");
		b1.style.width=l+"px";
		estate.appendChild(b1);

		var b2=document.createElement("b");
		b2.style.width=w+"px";
		b1.appendChild(b2);

		var b3=document.createElement("b");
		b3.style.width=l+"px";
		b2.appendChild(b3);

		var b4=document.createElement("b");
		b4.style.width=w+"px";
		b3.appendChild(b4);
		
		var i=document.createElement("i");
		i.style.width=w+"px";
		i.style.height=l+"px";
		b4.appendChild(i);



	}
	//���������ʽ
	City.prototype.STYLE=["a","b","c","d","e","f"];
	City.prototype.GetStyle=function()
	{
		return this.STYLE[(Math.random()*100<<2)%5];
	}



	//���¥�ĸ߶� 20-150
	City.prototype.GetHeight=function()
	{
		return (Math.random()*1000<<2)%130+20;

	}
	//���¥�Ŀ�� 20-40
	City.prototype.GetWidth=function()
	{
		return (Math.random()*1000<<2)%20+20;

	}



	City.prototype.build=function(parent)
	{
		//���ɻ���
		this.Area(parent);
		
		//����¥
		for(var i=0;i<this.base;i++)
		{
			for(var j=0;j<this.base;j++)
			{
				this.Estate(i*this.max+10,j*this.max+10);
			}
		}
		
	}
	

	
	new City(8).build(document.body);
	