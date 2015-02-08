//项目内的View基类
define(["av", "ejs"], function(AV, ejs){
	console.log(ejs)
	var View = AV.View.extend({
		template: function(attrs){
			console.log(attrs)
			return ejs.compile(this.tmpl).call(null, attrs)
		}
	});
	return View;
})