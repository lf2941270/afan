$(function(){
	var cartoon=$(".cartoon");
	var cartoonImg=cartoon.find("img");
	/*(function(){
		var num=1;
		function pngTogif(){
			setInterval(function(){
				num++;
				cartoonImg.attr("src","4372/images/cartoon/"+num+".png");
				if(num===6){
					num=1;
				}
			},150);
		}
		pngTogif();
	})();*/

	var cusFloat=$(".cus-float");
	var content=cusFloat.find(".content");
	var w=content.width();
	var h=content.height();
	if($(window).width()>=1408){
		cusFloat.css("left",$(window).width()/2+500+15+"px");//设置离左边的距离
	}else{
		cusFloat.css("right",0+"px");
	}
	var offFlag=false;
	function panelOff(){
		offFlag=true;
		$(this).addClass("panel-off");
		$(this).find("span").text("展开");
		content.stop().animate({"height":"43px"},function(){
			content.find(".hd img").animate({"margin-left":"0px"});
			content.animate({"width":"43px"},6000);
		});
		cartoonImg.css("transform","rotateY(0deg)");
		cartoon.stop().animate({"left":"0px"},8000);
	}
	function panelOn(){
		$(this).removeClass("panel-off");
		$(this).find("span").text("收起");
		content.stop().animate({"width":w+"px","height":h+"px"},function(){
			content.find(".hd img").animate({"margin-left":"28px"});
		});
		cartoonImg.css("transform","rotateY(180deg)")
		cartoon.stop().animate({"left":"125px"},8000,function(){
			cartoonImg.css("transform","rotateY(0deg)")
		})
	}
	$(".panel").click(function(){
		if(!$(this).hasClass("panel-off")){
			panelOff.apply(this)
		}else{
			panelOn.apply(this)
		}
	});
	setTimeout(function(){
		if(!offFlag){
			panelOff.apply($(".panel"));
		}
	},6000);

	//	气泡提醒消息
	function Bubble(){
		var outerBox,bubble,msgArr,timer=[],time=5000;
		this.init=function(msg){
			outerBox=$(".cartoon");//外层容器
			msgArr=msg;//消息数组
			setup();
		}
		function setup(){

			for(var n=0;n<msgArr.length;n++){
				timer[n]=setTimeout((function(n){
					return function(){
						pop(msgArr[n]);
					}
				})(n),time*(n));
			}
		}
		function pop(msg){
			createBubble();
			bubble.find("p").text(msg);
			bubble.appendTo(outerBox).addClass("normal");
			setTimeout(function(){
				bubble.detach()
			},4600);
			$(".bubble-close").click(function(){
				bubble.detach();
				for(var n=0;n<timer.length;n++){
					clearTimeout(timer[n]);
				}
			});
		}
		function getDirection(){//获取气泡应该的朝向
			if(outerBox[0].offsetLeft>=40||$(window).width()<1408){
				return "l";
			}else{
				return "r";
			}
		}
		function createBubble(){
			bubble=$('<div class="bubble bubble-'+getDirection()+'">' +
					'<p></p>' +
					'<div class="bubble-close" title="点击关闭气泡"></div>' +
					'</div>');
		}
	}
	(new Bubble()).init(
			[
				"大家好！我是百娱客服~",
				"大家遇到问题可以问我哦~",
				"点击下方的图标就能联系我~",
				"也可以拨打我们的客服热线哦",
				"下面我给大家讲个笑话吧",
				"从前有个太监",
				"哈哈哈哈哈，很好笑吧",
				"你问下面呢？",
				"下面没了啊！"
			]);
})