/**
 * Created by KJY on 2018/11/21.
 */
// 配置禁用小圆环
NProgress.configure({ showSpinner: false });

//// 开启进度条
//NProgress.start();
//
//setTimeout(function() {
//  // 关闭进度条
//  NProgress.done();
//}, 500)


// ajaxStart 所有的 ajax 开始调用
$(document).ajaxStart(function(){
    NProgress.start();
});


// ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
        NProgress.done();
    }, 500)
});
//判断是否已经登录
//判断地址中是否有login.html
if(location.href.indexOf("login.html") === -1){
    //发送ajax 请求
    $.ajax({
        //发送地址
        url:"/employee/checkRootLogin",
        //发送方式
        type:"get",
        //发送成功的函数
        success : function( info ){
            console.log( info );
            //如果发送成功
            if ( info.success ) {
                console.log( "登陆了" );
                // 啥也不用干
            }
            //如果发送失败
            if ( info.error === 400 ) {
                // 进行拦截, 拦截到登录页
                location.href = "login.html";
            }
        }
    })
}

//给分类也注册点击事件点击显示子页面
$(function(){
    $('.category').click(function(){
        //.next  找到下一个元素  .stop 防止一直触发点击事件
        $(this).next().stop().slideToggle();
    });

//给图标菜单注册点击事件
$(".icon_menu").click(function(){
    //侧边栏的缓慢左移
    $('.lt_aside').toggleClass("hidemenu");
    //主题部分缓慢左移
    $('.lt_main').toggleClass("hidemenu");
    //图标菜单和退出菜单左移
    $('.lt_topbar').toggleClass("hidemenu");
});



//点击退出图标显示模态框
$('.icon_logout').click(function(){
    $('#logoutModal').modal("show");
});

    //给退出按钮注册点击事件
    $('#logoutBtn').click(function(){
        //发送ajax请求
       $.ajax({
           url: "/employee/employeeLogout",
           type: "GET",
           dataType: "json",
           success: function(info){
               //如果成功跳转到登录页面
               if(info.success){
                   location.href = "login.html"
               }
           }
       })
    })

});