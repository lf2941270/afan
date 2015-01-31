// JavaScript Document
$(document).ready(function(){
	set_tabs();
	set_tabs2();
});

var set_tabs = function(){
	/*$(".tabs .tab_head div[tag]").removeClass("cur");
	$(".tabs .tab_body div[tag]").hide();
	$(".tabs .tab_head div[tag]:first").addClass("cur");
	$(".tabs .tab_body div[tag]:first").show();*/
	
	var tabs = $(".tabs");
	for(var i=0;i<tabs.length;i++){
		var tab = $(tabs[i]);
		var cur = tab.find(".tab_head div[tag].cur");
		if(cur.length == 0){
			tab.find(".tab_head div[tag]").removeClass("cur");
			tab.find(".tab_body div[tag]").hide();
			tab.find(".tab_head div[tag]:first").addClass("cur");
			tab.find(".tab_body div[tag]:first").show();
		}
		else{
			tab.find(".tab_body div[tag]").hide();
			tab.find(".tab_body div[tag=" + cur.attr("tag") + "]").show();
		}
	}

	for(var i=0;i<tabs.length;i++){
		if($(tabs[i]).find(".tab_head").attr("checktype") == "click"){
			$(tabs[i]).find(".tab_head div[tag]").bind("click", function(){
				$(this).parent().find("div[tag]").removeClass("cur");
				$(this).addClass("cur");
				$(this).parent().next(".tab_body").find("div[tag]").hide();
				$(this).parent().next(".tab_body").find("div[tag=" + $(this).attr("tag") + "]").show();
			});
		}
		else{
			$(tabs[i]).find(".tab_head div[tag]").hover(
				function(){
					$(this).parent().find("div[tag]").removeClass("cur");
					$(this).addClass("cur");
					$(this).parent().next(".tab_body").find("div[tag]").hide();
					$(this).parent().next(".tab_body").find("div[tag=" + $(this).attr("tag") + "]").show();
				},
				function(){}
			);
		}
	}

	/*$(".tabs .tab_head div[tag]").hover(
		function(){
			$(this).parent().find("div[tag]").removeClass("cur");
			$(this).addClass("cur");
			$(this).parent().next(".tab_body").find("div[tag]").hide();
			$(this).parent().next(".tab_body").find("div[tag=" + $(this).attr("tag") + "]").show();
		},
		function(){}
	);*/
};

var set_tabs2 = function(){
	$(".tab_head2 div[tag]").bind("click", function(){
		$(".tab_head2 div[tag]").removeClass("cur");
		$(this).addClass("cur");

		$(".tab_body2 div[tag]").hide();
		$(".tab_body2 div[tag=" + $(this).attr("tag") + "]").show();
	});

	$(".tab_body2 div[tag]").hide();
	$(".tab_body2 div[tag].cur").show();
};
