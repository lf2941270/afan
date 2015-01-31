(function($,f){
  /*****************创建一个自定义弹出窗口，带有半透明遮罩*******************/
  var Popup=function(){
    var _=this;
    this.shade=f;
    this.box=f;
    this.popbd=f;
    this.w=f;
    this.h=f;
    this.options={
      speed:400,
      hideOthers:false,//设置为true时适用于弹出框内有多页内容，需要隐藏其余的
      showIndex:0,//与上一个设置为true时配合使用，表示要显示的那一项的索引值
      ownClose:f
    }
    this.init=function(me,o){
      this.options= $.extend(this.options,o);
      this.box=me;
      this.setup();
      return this;
    }
    this.setup=function(){
      _.box.addClass("pop-con con");
      if(_.box.find(".pop-bd").length==0){
        _.popbd=_.box.children().wrapAll("<div class='pop-bd'></div>").parent();
      }else{
        _.popbd=_.box.find(".pop-bd");
      }
      if(_.options.hideOthers===true){
        _.popbd.children().eq(_.options.showIndex).show().siblings().hide();
      }
      var hd="<div class=\"pop-hd\"><h2>"+ _.options.title+"</h2></div>"
      if(_.box.find(".pop-hd").length==0){
        _.box.prepend(hd);
      }
      this.w=parseInt(this.box.outerWidth());
      this.h=parseInt(this.box.outerHeight());
      if($("#shade").length==0){
        _.shade=$(document.createElement("div")).attr("id","shade").appendTo(document.body);
      }else{
        _.shade=$("#shade");
      }
      if(_.box.find(".close").length==0){
        $("<div class=\"close\" title='关闭'></div>").appendTo(_.box);
      }
      _.pos();
      _.on();
      _.event();
    }
    this.pos=function(){
      _.box.css({
        "top":($(window).height()-_.h)/2,
        "left":($(window).width()-_.w)/2
      });
    }
    this.on=function(){
      _.shade.show();
      _.box.fadeIn(_.options.speed);
    }
    this.off=function(){
      _.shade.hide();
      _.box.fadeOut(_.options.speed);
    }
    this.event=function(){
      $(window).resize(_.pos);
      $(document).keydown(function(e){
        if(e.which==27){
          _.off();
        }
      });
      _.box.find(".close").click(_.off);
      //如果自定义的关闭按钮不为空，那么点击这个按钮时也执行关闭
      if(_.options.ownClose!==false){
        _.box.find(_.options.ownClose).click(_.off);
      }
    }
  }
  $.fn.popup=function(o){
    var me=$(this);
    (new  Popup()).init(me,o);
    return this;
  }
})(jQuery,false);

$(document).ready(function(){
  if($('#showno').length>0){
    $("#showno").popup({'title':'温馨提示：'});
  }
});