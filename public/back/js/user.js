/**
 * Created by KJY on 2018/11/21.
 */
$(function(){
    //定义当前页
    var currentPage =  1;
    //定义pagesize
    var pageSize = 5;
    //进入页面首先要渲染一下
    render();
    //定义render函数
    function render(){
        //发送ajax请求中
        $.ajax({
            url: "/user/queryUser",
            type: "get",
            data : {
                page: currentPage,
                pageSize: pageSize
            },
            success  : function(info){
                console.log(info);
                   //利用模板引擎将内容添加到tbody
                var htmlStr =  template("tpl",info);
                $('.lt_content tbody').html( htmlStr );

                 //配置分页
                $('#paginator').bootstrapPaginator({
                    //配置版本号
                    bootstrapMajorVersion: 3,
                    //配置当前页
                    currentPage: info.page,
                    //配置总页码  向上取整
                    totalPages: Math.ceil( info.total / info.size ),
                    //点击完成时间
                    onPageClicked: function( a, b, c, page ) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 调用 render 重新渲染页面
                        render();
                    }
                })
            }
        })
    }



//为tbody的子元素注册点击事件 事件托管
$(".lt_content tbody").on("click",".btn",function(){
    //模态框显示
    $('#userModal').modal("show");
   //id=当前元素的父元素的id
    var id = $(this).parent().data("id");
    //如果该元素有btn-success 则为1  否则为0
    var isDelete = $(this).hasClass("btn-success")? 1 : 0;
   //取消点击事件
    $("#submitBtn").off("click").on("click",function(){
        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete
            },
            success : function(info){
                if ( info.success ) {
                    // 关闭模态框
                    $('#userModal').modal("hide");
                    // 重新渲染
                    render();
                }
            }
        })
    })

})
});
