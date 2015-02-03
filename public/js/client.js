$.showErrMsg = function(msg){
	$("#errModal").modal({}).find(".err-msg").text(msg).parents("#errModal").find(".btn-primary").click(function(){
		$("#errModal").modal('hide');
	});
}
$.fn.showFormError = function(msg){
	this.find(".form-error").text(msg);
}
$.fn.clearFormError = function(){
	this.find(".form-error").text('');
}
$.fn.checkForm = function(){
	var $userInput = this.find("[type=text]");
	var $pwdInput = this.find("[type=password]");
	var user = $userInput.val();
	var pwd = $pwdInput.val();
	this[0].valid = true;
	if(user === ''){
		this[0].valid = false;
		return this.showFormError("用户名不能为空");
	}
	if(user.length < 6){
		this[0].valid = false;
		return this.showFormError("用户名最少为6位");
	}
	if(pwd === ''){
		this[0].valid = false;
		return this.showFormError("密码不能为空");
	}
	if(pwd.length < 6){
		this[0].valid = false;
		return this.showFormError("密码最少为6位");
	}
}
$.fn.disableBtn = function(){
	this.addClass("disable").attr("disable", true);
	return this;
}
$.fn.ableBtn = function(){
	this.removeClass("disable").attr("disable", false);
	return this;
}
$.fn.isDisabled = function(){
	return this.hasClass("disable");
}
function login(redirectUrl){
	$("#loginModal").modal({});
	$(".form-signin").submit(function(){
		var subBtn = $(this).find("button[type=submit]");
		if(subBtn.isDisabled()){
			return false;
		}
		$(this).checkForm();
		if(!this.valid){
			return false;
		}
		$(this).clearFormError();
		subBtn.disableBtn().text("登录中...");
		subBtn.ableBtn().text("登录");

		return false;
	});
}
function signUp(){
	var user = new AV.User();
	user.set("username", $('[name=username]').val());
	user.set("password", $('[name=password]').val());
	user.set("email", $('[name=email]').val());

// other fields can be set just like with AV.Object
//	user.set("phone", "415-392-0202");

	user.signUp(null, {
		success: function(user) {
			// Hooray! Let them use the app now.
		},
		error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
}
$(function(){
	$('#signin').click(function(){
		login();
	});
})