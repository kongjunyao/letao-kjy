/**
 * Created by KJY on 2018/11/23.
 */
$(function(){



    var currentPage = 1;
    var pageSize = 2;




    render();
    function render(){

        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            success : function(info){
                console.log(info);
                var htmlStr = template("productTpl",info);
                $('.lt_content tbody').html( htmlStr );


            }
        })

    }




    $("#addBtn").click(function(){
        $("#addModal").modal("show");
    })




});