/**
 * Created by Kevin on 2016/11/30.
 */

var $document = $(document);
$document.ajaxStart(function(){
    layer.closeAll('loading');
    layer.load(2,{shade:0.1, area: ['32px', '64px']});
});
$document.ajaxStop(function(){
    layer.closeAll('loading');
});
$document = null;

function ajaxCommonFun(opts) {
    var sUrl = opts.url,
        sType = opts.type,
        data = opts.data,
        successFun = opts.success || null,
        completeFun = opts.complete  || null,
        errorFun = opts.error  || null,
        sDataType = opts.dataType || 'JSON';

    var layLoad = layer.load(2, {shade: 0.1, area: ['32px', '64px']});
    $.ajax({
        type: sType,
        url: sUrl,
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: sDataType,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
        },
        success: function (res) {
            if(res.status == 'ERROR') { //un log
                if(res.code == 500800){
                    if(self != top){
                        parent.window.location.href = res.result + '&t=' + new Date().getTime();
                    }
                    else {
                        window.open(res.result,'_self');
                    }
                    return;
                }
                else {
                    $.growl.warning({ message: res.message});
                }
            }
            if(successFun) {
                successFun(res);
            }
        },
        complete: function () {
            if(layLoad){
                layer.close(layLoad);
            }
            if(completeFun) {
                completeFun();
            }
        },
        error: function () {
            $.growl.error({ message: "请求失败!" ,duration: 3200000});
            if(errorFun) {
                errorFun();
            }
        }
    })
}
function encodeParam(url) {
    if(url.indexOf('?')< 0){
        return url;
    }
    var urlArray = url.split('?'),
        resUrl = urlArray[0]+'?',
        sParam = urlArray[1],
        aParam = sParam.split('&');
    for(var i = 0; i < aParam.length; i++) {
        var p = aParam[i].split('=');
        if(i == aParam.length - 1){
            resUrl += p[0]+'='+encodeURIComponent(p[1])
        }
        else {
            resUrl += p[0]+'='+encodeURIComponent(p[1])+'&'
        }
    }
    return resUrl;
}
function getHtmlByUrl(opts) {
    var sUrl = opts.url,
        data = opts.data || {},
        sType = opts.type || 'get',
        successFun = opts.success || null,
        completeFun = opts.complete  || null,
        errorFun = opts.error  || null;
    sUrl = encodeParam(sUrl);
    var layLoad = layer.load(2, {shade: 0.1, area: ['32px', '64px']});
    $.ajax({
        url: sUrl,
        data: data,
        type: sType,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
        },
        success: function (res) {
            if(res.status == 'ERROR' && res.code == 500800) { //un log
                if(self != top){
                    parent.window.location.href = res.result + '&t=' + new Date().getTime();
                }
                else {
                    window.open(res.result,'_self');
                }
                return;
            }
            if(successFun) {
                $('body').css('opacity','1');
                successFun(res);
            }
        },
        complete: function () {
            if(layLoad){
                layer.close(layLoad);
            }
            if(completeFun) {
                completeFun();
            }
        },
        error: function () {
            layer.alert('请求失败！',{iocn:2});
            if(errorFun) {
                errorFun();
            }
        }
    })
}
