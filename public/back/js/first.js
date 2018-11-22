/**
 * Created by KJY on 2018/11/22.
 */
$(function(){


    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data : {
                page: currentPage,
                pageSize: pageSize
            },
            success : function(info){
                console.log(info);
                var htmlStr = template("userTpl",info);
                $('.lt_content tbody').html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage : info.page ,
                    totalPages : Math.ceil(info.total /  info.size),
                    onPageClicked : function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }




    $("#addBtn").click(function(){
        $('#addModal').modal("show");
    });


    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields : {
            categoryName: {
                validators :{
                    notEmpty : {
                        message : "请输入一级分类名称"
                    }
                }
            }
        }
    });




    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            url: "/category/addTopCategory",
            type : "POST",
            data : $('#form').serialize(),
            success : function(info){
                console.log(info);
                if(info.success){
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    });
});





