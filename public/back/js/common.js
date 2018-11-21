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

if(location.href.indexOf("login.html") === -1){
    $.ajax({
        url:"/employee/checkRootLogin",
        type:"get",
        success : function( info ){
            console.log( info );
            if ( info.success ) {
                console.log( "登陆了" );
                // 啥也不用干
            }

            if ( info.error === 400 ) {
                // 进行拦截, 拦截到登录页
                location.href = "login.html";
            }
        }
    })
}


$(function(){
    $('.category').click(function(){
        $(this).next().stop().slideToggle();
    });


$(".icon_menu").click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
})

$('.icon_logout').click(function(){
    $('#logoutModal').modal("show");
});

    $('#logoutBtn').click(function(){
       $.ajax({
           url: "/employee/employeeLogout",
           type: "GET",
           dataType: "json",
           success: function(info){
               if(info.success){
                   location.href = "login.html"
               }
           }
       })
    })

});