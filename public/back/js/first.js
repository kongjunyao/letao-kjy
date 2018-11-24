/**
 * Created by KJY on 2018/11/22.
 */
$(function(){

    //定义当前页
    var currentPage = 1;
    //定义pageSize
    var pageSize = 5;
    //已进入页面首先渲染一下页面
    render();
    //定义render函数
    function render(){
        //发送ajax请求
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data : {
                page: currentPage,
                pageSize: pageSize
            },
            success : function(info){
                console.log(info);
                //利用模板引擎并将其添加到tbody
                var htmlStr = template("userTpl",info);
                $('.lt_content tbody').html(htmlStr);
                 //注册配置分页
                $('#paginator').bootstrapPaginator({
                    //配置版本还
                    bootstrapMajorVersion: 3,
                    ///当前页
                    currentPage : info.page ,
                    ///总页数
                    totalPages : Math.ceil(info.total /  info.size),
                    //点击后的事件
                    onPageClicked : function(a,b,c,page){
                        //渲染当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })
            }
        })
    }



    //点击添加按钮模态框显示
    $("#addBtn").click(function(){
        $('#addModal').modal("show");
    });

    //配置表单验证
    $("#form").bootstrapValidator({
        //表单验证小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //表单具体配置
        fields : {
            categoryName: {
                validators :{
                    //非空校验
                    notEmpty : {
                        message : "请输入一级分类名称"
                    }
                }
            }
        }
    });



//提交表单
    $("#form").on("success.form.bv",function(e){
        //阻止submit提交
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            url: "/category/addTopCategory",
            type : "POST",
            //数据为表单的所有数据
            data : $('#form').serialize(),
            success : function(info){
                console.log(info);
                //发送成功
                if(info.success){
                    //模态框隐藏
                    $("#addModal").modal("hide");
                    //渲染第一页
                    currentPage = 1;
                    render();
                    ///将表单里的状态和文本都重置
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    });
});





