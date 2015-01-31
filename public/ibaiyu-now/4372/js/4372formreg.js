
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split(""); // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
//判断身份证号码为18位时最后的验证位是否正确  
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和   
    }
    valCodePosition = sum % 11; // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
// 通过身份证判断是男是女  
function maleOrFemalByIdCard(idCard) {
    idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。   
    if (idCard.length == 15) {
        if (idCard.substring(14, 15) % 2 == 0) {
            return '1';
        } else {
            return '0';
        }
    } else if (idCard.length == 18) {
        if (idCard.substring(14, 17) % 2 == 0) {
            return '1';
        } else {
            return '0';
        }
    } else {
        return null;
    }
}
//验证18位数身份证号码中的生日是否是有效生日  

function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    document.getElementById("txtbirth").value = year + "/" + month + "/" + day;
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (temp_date.getFullYear() != parseFloat(year)
          || temp_date.getMonth() != parseFloat(month) - 1
          || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//验证15位数身份证号码中的生日是否是有效生日  
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    document.getElementById("txtbirth").value = year + "/" + month + "/" + day;
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (temp_date.getYear() != parseFloat(year)
              || temp_date.getMonth() != parseFloat(month) - 1
              || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格   
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//邮件格式
function isEmail(obj) {
    var reg = /^\w{3,}@\w+(\.\w+)+$/;
    if (reg.test(obj)) { return true; }
    else { return false; }
}
//验证名称
function isName(obj) {
    var reg = /^[a-zA-Z]\w{5,15}$/;
    if (reg.test(obj)) {
        return true;
    }
    else { return false; }
}
//验证名称
function ispwd1(obj) {
    var reg = /^[a-zA-Z0-9]\w{5,15}$/;
    if (reg.test(obj)) {
        return true;
    }
    else { return false; }
}
//验证密码
function ispwd(obj) {
    var reg = /^.{6,16}$/;
    if (reg.test(obj)) {
        return true;
    }
    else { return false; }
}
//验证手机号
function isphone(obj) {
    var reg = /^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (reg.test(obj)) {
        return true;
    }
    else { return false; }
}
//验证数字
function isnum(obj) {
    var reg = /^\d+$/;
    if (reg.test(obj)) {
        return true;
    }
    else {
        return false;
    }
}

function regname() {
    if (trim(document.getElementById("txtname").value) == "") {
        document.getElementById("DivNameMessges").setAttribute("style", "display:none");
        document.getElementById("txtnameimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtnamelbl").innerHTML = "请输入用户名";
        return false;
    }
    if (!isName(document.getElementById("txtname").value)) {
        document.getElementById("txtnameimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtnamelbl").innerHTML = "用户名填写错误";
        return false;
    }
    $.ajaxSetup({ cache: false });
    $.ajax({
        type: "GET",
        url: "/tools/validatename.ashx",
        dataType: "html",
        data: "action=gameuser_validate&name=" + trim(document.getElementById("txtname").value),
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (msg) {
            if (msg != "true") {
                document.getElementById("txtnameimg").src = "images/zhucedenglu1_03.png";
                document.getElementById("txtnamelbl").innerHTML = "该用户名已存在！";
                return false;
            }
        }
    });
    document.getElementById("txtnameimg").src = "images/onebit_34.png";
    document.getElementById("txtnamelbl").innerHTML = "可以注册！";
    return true;
}
function regpwd() {
    if (trim(document.getElementById("txtpwd").value) == "") {
        document.getElementById("txtpwdimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtpwdlbl").innerHTML = "请输入密码";
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_32.png";
        return false;
    }
    if (!ispwd(document.getElementById("txtpwd").value)) {
        document.getElementById("txtpwdimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtpwdlbl").innerHTML = "密码填写错误";
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_32.png";
        return false;
    }
    if (trim(document.getElementById("txtpwd").value) == trim(document.getElementById("txtname").value)) {
        document.getElementById("txtpwdimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtpwdlbl").innerHTML = "密码不能与帐号相同";
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_32.png";
        return false;
    }
    if (document.getElementById("txtpwd").value.indexOf("") > 0) {
        document.getElementById("txtpwdimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtpwdlbl").innerHTML = "密码不能包含空格";
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_32.png";
        return false;
    }
    if (isnum(document.getElementById("txtpwd").value)) {
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_34.png";
    }
    else if (ispwd1(document.getElementById("txtpwd").value)) {
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_36.png";
    }
    else {
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_38.png";
    }

    document.getElementById("txtpwdimg").src = "images/onebit_34.png";
    document.getElementById("txtpwdlbl").innerHTML = "  ";
    return true;
}
function regagainpwd() {
    if (trim(document.getElementById("txtpwd").value) == "") {
        document.getElementById("txtpwdimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtpwdlbl").innerHTML = "请输入密码";
        document.getElementById("txtpwdanquan").src = "images/zhucedenglu_32.png";
        return;
    }
    if (trim(document.getElementById("txtpwd").value) != trim(document.getElementById("txtagainpwd").value)) {
        document.getElementById("txtagainpwdimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtagainpwdlbl").innerHTML = "两次输入的密码不一致！";
        return false;
    }
    document.getElementById("txtagainpwdimg").src = "images/onebit_34.png";
    document.getElementById("txtagainpwdlbl").innerHTML = "  ";
    return true;
}
function regrealname() {
    if (trim(document.getElementById("txtrealname").value) == "") {
        document.getElementById("txtrealnameimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtrealnamelbl").innerHTML = "请输入真实姓名！";
        return false;
    }
    document.getElementById("txtrealnameimg").src = "images/onebit_34.png";
    document.getElementById("txtrealnamelbl").innerHTML = "  ";
    return true;
}
function regcard() {
    if (trim(document.getElementById("txtcard").value) == "") {
        document.getElementById("txtcardimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtcardlbl").innerHTML = "请输入身份证号码！";
        return false;
    }

    if (!IdCardValidate(document.getElementById("txtcard").value)) {
        document.getElementById("txtcardimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtcardlbl").innerHTML = "身份证号码填写错误！";
        return false;
    }
    document.getElementById("txtcardimg").src = "images/onebit_34.png";
    document.getElementById("txtcardlbl").innerHTML = "  ";
    return true;
}
function regemail() {
    if (trim(document.getElementById("txtemail").value) == "") {
        document.getElementById("txtemailimg").src = "images/zhucedenglu1_08.png";
        document.getElementById("txtemaillbl").innerHTML = "请输入邮箱！";
        return false;
    }
    if (!isEmail(document.getElementById("txtemail").value)) {
        document.getElementById("txtemailimg").src = "images/zhucedenglu1_06.png";
        document.getElementById("txtemaillbl").innerHTML = "邮箱填写错误！";
        return false;
    }
    document.getElementById("txtemailimg").src = "images/onebit_34.png";
    document.getElementById("txtemaillbl").innerHTML = "  ";
    return true;
}
function sub() {

    if (!regname()) {
        return false;
    }
    if (!regpwd()) {
        return false;
    }
    if (!regagainpwd()) {
        return false;
    }
    if (!regrealname()) {
        return false;
    }
    if (!regcard()) {
        return false;
    }
    if (!regemail()) {
        return false;
    }
    if (document.getElementById("ckxy").checked == false) {
        alert("请您先阅读并同意《爱百娱用户服务条款》！");
        return false;
    }
    document.getElementById("hidsex").value = maleOrFemalByIdCard(document.getElementById("txtcard").value);
    return true;
}
$(function () {
    document.getElementById("hidsource").value = document.referrer;
});