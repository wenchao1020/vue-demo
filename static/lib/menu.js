 //var menuHostUrl = 'http://183.3.205.120:88/oss-upms/',
var menuHostUrl = '@replace.upms-url@',
  homeUrl = '@replace.home-url@';

var account = '',sname = '';

var renderMenu = function (opts) {
    var firstCategory = [],
        oSecondCategory = {};
    var sNowPath = opts.selectKey;
    function buildMenuRes(resArray) {
        for(var i = 0 , len = resArray.length; i < len; i++){
            var oMenu = resArray[i],
                sParent = oMenu.parent;
            if(sParent) {  //二级菜单
                if(oSecondCategory[sParent]) {
                    oSecondCategory[sParent].push(oMenu);
                }
                else {
                    oSecondCategory[sParent] = [oMenu]
                }
            }
            else {   //一级菜单
                firstCategory.push(oMenu);
            }
        }
    }
    function ajaxGetMenu() {
        //debugger;
        var params = {
            pCode: opts.code,
            account: account
        };
        $.ajax({
            url: menuHostUrl+'common/menus/list.do',
            dataType: 'JSONP',
            data: params,
            success: function(res){
                var menu = res.menus || [];
                var modules = res.moduleGroups || [];
                var projects = res.modules || [];
                buildMenuRes(menu);
                renderModule(modules);
                renderProjects(projects);
                if (opts.code !== 'oss-home') {
                  renderLeftMenu();
                }
                bindEvents();
            },
            error: function (res) {
                if(layer){
                    layer.alert(res.responseText);
                }
            },
            complete: function() {
                $('.wrapper').css({
                    'opacity': 1,
                    'position': 'static'
                });
            }
        });
    }
    function renderProjects(projectArray) {
        var projectHtml = [];
        for (var i = 0, len = projectArray.length; i < len; i++){
            var oProject = projectArray[i],
                homeUrl = oProject.url,
                isCurrent = oProject.current,
                id = oProject.id,
                pCode = oProject.pCode,
                projectName = oProject.name,
                picStyle = '',
                sClass = '';
            if (oProject.pic) {
                picStyle = 'style="background: url(' + menuHostUrl + 'pic/get.do?pic='+ oProject.pic +') center center no-repeat"'
            }
            if(isCurrent){
                sClass = 'class="selected"';
                $('.header-title').text(projectName);
            }
            if(projectName != '首页'){
                projectHtml.push('<li '+sClass+'><a href="'+homeUrl+'" title="'+projectName+'" class="project-list ">' +
                  '<i '+ picStyle +'></i><span class="project-title">' + projectName + '</span></a></li>');
            }

        }
        $(opts.projectEl).append(projectHtml.join(''));
    }
    function renderModule(moduleArray) {
        var projectName = '',
            projectList = [],
            userLeft = opts.userleft || 20,
            sMainModeule = '';

        for (var i = 0, len = moduleArray.length; i < len; i++){
            var oModule = moduleArray[i],
                sid = oModule.id,
                isCurrent = oModule.current,
                smoduleName = oModule.name,
                surl = oModule.url;
            if(isCurrent ){
                projectName = '<a class="logo" href="' + homeUrl +'">运维管理系统</a>';
                if(opts.code === 'oss-home'){
                    smoduleName = '首页';
                    projectList.push('<li><a href="'+ surl +'" class="module-list" >'+ oModule.name +'</a></li>');
                }
                else {
                    projectList.unshift('<li><a href="'+ homeUrl +'" class="module-list" >首页</a></li>');
                }

				sMainModeule = '<a class="module-drop-down"><span class="module-title">' + smoduleName + '</span><i class="drop-down-p"></i></a>';
			}else {
				projectList.push('<li><a href="'+surl+'" class="module-list" >'+smoduleName+'</a></li>');
			}
		}
		var userTemplate = '<div class="user-info" style="right: '+userLeft+'px;"> <i class="user-logo"></i>' +
			'<div class="fl message" style="display: none;"><a href="'+ homeUrl +'"></a><span class="msg-count">1</span></div><b class="line" style="display: none;"></b><div class="user-message"><span title="'+sname+'">'+sname+'</span><i class="drop-down-p"></i></div></div>';
		var moduleDropTmpl = '<ul class="module-more-list" style="display: none;">'+projectList.join('')+'</ul>';
		$(moduleDropTmpl).appendTo('body');
		$(opts.moduleEl).html(projectName+'<div class="header-menu">' + sMainModeule + '</div>'+userTemplate);
		menuEvents();
	}
	function menuEvents() {
		var temps = '<ul class="user-info-down"><li><a href="javascript:;" class="update-password-menu">修改密码</a></li>' +
			'<li><a href="javascript:;" id="logoOut">注销</a></li>' +
			'<li><a href="javascript:;" id="about">关于</a></li></ul>';
		$('.user-info').bind('click',function () {
			var y = $(this).offset().top+60,
				x = $(this).offset().left;
			$(this).toggleClass('expand');
			if($('.user-info-down').length == 0){
				$(temps).appendTo('body');
				$('.user-info-down').css({
					'top': y,
					'right': '25px'
				})
			}
			else {
				$('.user-info-down').slideToggle(100);
			}
			$('.select-menu-area').hide();
			$(window).unbind('click',closeMenu).bind('click',closeMenu);
			return false;
		});
		$('.module-drop-down').bind('click', function() {
			var y = $(this).offset().top+60,
				x = $(this).offset().left;
			$(this).toggleClass('expand');
			$('.module-more-list').css({
				'top': y,
				'left': x
			});
			$('.module-more-list').slideToggle(100);

            // $('.select-menu-area').hide();
            $(window).unbind('click',closeMenu).bind('click',closeMenu);
            return false;
        });
        function checkpasswordInput(key,callback,sVal) {
            var plength = sVal ? sVal.length : 0;
            if(sVal &&  plength >= 6 && plength <= 32) {
                if(callback && $.isFunction(callback)){
                    callback();
                }
            }
            else {
                switch (key){
                    case 'oldPassword':
                        var $elem = $('#ord-password');
                        $elem.focus;
                        layer.tips('请输入合理的旧密码，6-32位！', $elem, {tips: 3});
                        $elem = null;
                        break;
                    case 'newPassword':
                        var $elem = $('#new-password');
                        $elem.focus;
                        layer.tips('请输入合理的新密码！6-32位', $elem, {tips: 3});
                        $elem = null;
                        break;
                    case 'againPassword':
                        var $elem = $('#again-password');
                        $elem.focus;
                        layer.tips('请输入合理的确认密码！6-32位', $elem, {tips: 3});
                        $elem = null;
                        break;
                }
            }
        }
        $('body').undelegate().delegate('.update-password-menu','click',function () {
                var temps = '<div class="update-password-dialog">' +
                    '<div class="row-p"><label for="ord-password"><span style="color: red">*</span>旧密码:</label><input type="password" id="ord-password" placeholder="请填写旧密码"></div>' +
                    '<div class="row-p"><label for="new-password"><span style="color: red">*</span>新密码:</label><input type="password" id="new-password" placeholder="请填写新密码"></div>' +
                    '<div class="row-p"><label for="again-password"><span style="color: red">*</span>确认密码:</label><input type="password" id="again-password" placeholder="请填写确认密码"></div>' +
                    '</div>';
                var dialog = layer.open({
                    type: 1,
                    btn: ['修改','取消'],
                    title: '修改密码',
                    shade: false,
                    shadeClose: true,
                    area: ['400px', 'auto'],
                    content: temps, //捕获的元素
                    success: function (layero, index) {
                    },
                    btn1: function () {         // 取消
                        var count = 0;
                        var againPassword = $.trim($('#again-password').val()),
                            newPassword = $.trim($('#new-password').val()),
                            oldPassword = $.trim($('#ord-password').val());
                        checkpasswordInput('oldPassword',successFul,oldPassword);
                        checkpasswordInput('againPassword',function(){
                            if(againPassword !== newPassword){
                                layer.tips('请确保确认密码与新密码一样', $('#again-password'), {tips: 3});
                            }
                            else {
                                successFul();
                            }
                        },againPassword);
                        checkpasswordInput('newPassword',successFul,newPassword);

                        function successFul (){
                            if(count === 2) {
                                var params = {
                                    account: account,
                                    oldPassword: oldPassword,
                                    newPassword: newPassword,
                                    repeatPassword: againPassword
                                };
                                $.ajax({
                                    url: '/oss-upms/common/user/changePassword.json',
                                    dataType: 'JSONP',
                                    data: params,
                                    success: function(res){
                                        if(res.indexOf('成功') >= 0){
                                            layer.closeAll();
                                            layer.msg(res,{icon: 1});
                                        }
                                        else {
                                            layer.alert(res, {
                                                title: false,
                                                icon: 7,
                                                btn: false,
                                                skin: 'layer-ext-moon'
                                            })

                                        }

                                    },
                                    error: function (res) {
                                        if(layer){
                                            layer.msg('网络出错', {icon: 2});
                                        }
                                    }
                                });
                            }
                            count ++;
                        }
                    },
                    btn2: function () {         // 取消
                        layer.close(dialog);
                    }
                });
            })
            .delegate('#logoOut', 'click', function() {
                var outLay = layer.confirm('确认注销吗？', {
                    btn: ['确认','取消'] //按钮
                }, function(){
                    layer.close(outLay);
                    window.location.href = 'logout';
                }, function() {
                    layer.close(outLay);
                });
            })
            .delegate('.aside-toggle', 'click', function() {
                var $this = $(this),
                    $content = $('#content').length > 0 ? $('#content') : $('#body-container'),
                    $headerProject = $('.header-project'),
                    $showMore = $('.show-more');

                $this.toggleClass('aside-toggle-more');
                $headerProject.toggleClass('transform-expand');

                var leftValue = ($this.hasClass('aside-toggle-more') ? 160 : 50) + ($showMore.hasClass('show-close') ? 20 : 160);

                $content.css({
                    'marginLeft': leftValue + 'px'
                });

                $headerProject.clearQueue();
                $content.clearQueue();

            })
            .delegate('.show-more', 'click', function() {
                var $this = $(this),
                    $content = $('#content').length > 0 ? $('#content') : $('#body-container'),
                    $headerMenuList = $('.header-menu-list').closest('.fl'),
                    $showMore = $('.show-more'),
                    $asideToggle = $('.aside-toggle');

                $this.toggleClass('show-close');
                $headerMenuList.toggleClass('transform-dismiss');

                var leftValue = ($asideToggle.hasClass('aside-toggle-more') ? 160 : 50) + ($this.hasClass('show-close') ? 20 : 160);

                $content.css({
                    'marginLeft': leftValue + 'px'
                });

                $headerMenuList.clearQueue();
                $content.clearQueue();
            })
            .on('click', '#about', function() {
                var temps = '<div class="about-dialog">' +
                    '<p class="row-p">龙云私有容器云专家</p>' +
                    '<p class="row-p">版本号：v3.0.0<br/>Build: 2018/01/15</p>' +
                    '<p class="row-p">基于 Docker 的PaaS私有云，将应用、依赖关系、配置信息和数据库等中间件打包，增强系统可移植性、稳定性和性能，大幅度降低硬件投入（5~10倍）、运维成本（80%）和软件系统的建设成本。并对操作系统、 Web 服务、数据库、服务接口、业务指标等进行7*24小时持续监控，采集系统运行数据，准确地定位问题，并及时对问题告警。</p>' +
                    '<p class="row-p">邮箱：service@long-cloud.com<br/>' +
                    '网站：<a href="http://www.long-cloud.com" target="_blank">http://www.long-cloud.com</a></p>' +
                    '<p class="row-p"></p>' +
                    '</div>';
                layer.open({
                    type: 1,
                    btn: ['关闭'],
                    title: '关于',
                    shade: false,
                    shadeClose: true,
                    area: ['400px', 'auto'],
                    content: temps, //捕获的元素
                    success: function (layero, index) {
                    },
                    btn1: function(layero){
                        layer.close(layero)
                    }
                });
            });
        function closeMenu() {
            $('.user-info-down, .module-more-list').slideUp(100);
            $('.module-drop-down, .user-info').removeClass('expand');
            $(window).unbind('click',closeMenu);
        }
    }
    function renderLeftMenu() {
        var aFirstMenuHtml = [];
        for (var i = 0, len = firstCategory.length; i < len; i++){
            var firstObj = firstCategory[i],
                menuName = firstObj.name,
                firstId = firstObj.id,
                secondArray = oSecondCategory[firstId],
                disStyle = 'style="display:none;"',
                firstSelectClass = '',
                sSecondHtml = '',
                aSecondMenuHtml = [];
            if(secondArray && secondArray.constructor == Array && secondArray.length > 0){
                for(var k = 0, kLen = secondArray.length; k < kLen; k++){
                    var secondObj = secondArray[k],
                        secondMenuName = secondObj.name,
                        secondId = secondObj.id,
                        sSelecdClass = '',
                        secondPath = secondObj.path;
                    var menuLink = '';
                    if(sNowPath != '/building'){
                        if(location.hash.indexOf(secondPath) > 0 || (sNowPath && secondPath == sNowPath)
                            || (location.hash.indexOf('apps/paas/detail') > 0 && secondPath === '/apps/paas/list')){
                            sSelecdClass = 'selected';
                            disStyle = 'style="display:block;"';
                            firstSelectClass = 'class="open"';
                        }
                    }
                    var sTitle = '';
                    if(secondMenuName.length > 6) {
                        sTitle = 'title="'+secondMenuName+'"';
                    }
                    menuLink = '<a href="#'+secondPath+'" '+sTitle+' class="menu-list-second '+sSelecdClass+'" >'+secondMenuName+'</a>';

                    aSecondMenuHtml.push(menuLink);
                }
            }
            sSecondHtml = '<ol '+disStyle+'>'+aSecondMenuHtml.join('')+'</ol>';
            var sFirstTitle = '';
            if(menuName.length > 6) {
                sFirstTitle = 'title="'+menuName+'"';
            }
            aFirstMenuHtml.push('<li '+firstSelectClass+'><a '+sFirstTitle+' href="javascript:;" class="menu-list"><i></i>'+menuName+'</a>'+sSecondHtml+'</li>');
        }
        aFirstMenuHtml.push('</<ul>');
        $(opts.menuEl).html(aFirstMenuHtml.join(''));

        if($(opts.menuEl).find('.selected').length < 1) {
            $(opts.menuEl).find('li').eq(0).addClass('open').find('ol').show().find('a').eq(0).addClass('selected').trigger('click');
            var newHref =  $(opts.menuEl).find('li').eq(0).addClass('open').find('ol').show().find('a').eq(0).attr('href');

            if(newHref && opts.code !== 'oss-home'){
                window.location.hash = newHref;
            }
        }

        $('body').css('opacity','1');
        $('.menu-list-second').on('click',function(){
            sessionStorage.clear();
        });
    }
    function getUserInfo() {
        var layers = layer.load(2, {shade: 0, area: ['32px', '64px']});
        $.ajax({
            url: 'user/currentUserInfo.json',
            dataType:'JSON',
            cache: false,
            async: false,
            type: 'get',
            success: function(res){
                if(res.code == '500800'){
                    window.location.href = res.result +'&t='+ new Date().getTime();
                    return;
                } else if (res.status == 'OK') {
                    sname = res.result.name;
                    window.userInfo = res.result;
                    account = res.result.account;
                    ajaxGetMenu();
                } else {
                    layer.alert(res.message)
                }
            },
            complete: function () {
                layer.close(layers);
            },
            error: function () {
                if(layer){
                    layer.msg('登录中...');
                }
            }
        });
    }
    function bindEvents() {
        $('.main-left').undelegate()
            .delegate('.menu-list','click',function (e) {
                var $this = $(this),
                    $parent = $this.is('li') ? $this : $this.closest('li');
                if($parent.hasClass('open')){
                    $parent.find('ol').hide();
                    $parent.removeClass('open');
                }
                else {
                    $parent.find('ol').show();
                    $parent.addClass('open');
                }
            })
            .delegate('.menu-list-second ','click',function () {
                var $this = $(this);
                $this.closest('.header-menu-list').find('.menu-list-second.selected').removeClass('selected');
                $this.addClass('selected');
                $this = null;
            });
    }
    var init = function () {
      getUserInfo();

    };
    init();
};

export {
  renderMenu
}
