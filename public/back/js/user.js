/**
 * Created by KJY on 2018/11/21.
 */
$(function(){

    var currentPage =  1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url: "/user/queryUser",
            type: "get",
            data : {
                page: currentPage,
                pageSize: pageSize
            },
            success  : function(info){
                console.log(info);

                var htmlStr =  template("tpl",info);
                $('.lt_content tbody').html( htmlStr );


                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil( info.total / info.size ),
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




$(".lt_content tbody").on("click",".btn",function(){
    $('#userModal').modal("show");

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success")? 1 : 0;

    $("#submitBtn").off("click").on("click",function(){
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
