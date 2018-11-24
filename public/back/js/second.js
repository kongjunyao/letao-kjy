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

        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type : "get",
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            success : function(info){
                console.log(info);
                var htmlStr = template("secondTpl",info);
                $(".lt_content tbody").html( htmlStr );

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3 ,
                    currentpage : info.page ,
                    totalPages : Math.ceil( info.total / info.size),
                    onPageClicked : function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })


    }


    //点击添加显示模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");


       //发送ajax请求
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data : {
                page : 1,
                pageSize : 100
            },
            success : function(info){
                console.log(info);
                //模板引擎
                var htmlStr =  template("dropdownTpl",info);
                $(".dropdown-menu").html( htmlStr );
            }
        });


    });




   //给子元素添加点击事件
    $(".dropdown-menu").on("click","a",function(){
        //将该元素的文本设置给dropdownText
        $("#dropdownText").text( $(this).text());
        //利用属性选择器将该元素的id设置给name = 'categoryId'
        $("[name = 'categoryId']").val($(this).data("id"));
         //重置表单
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    ///配置文件上传
   $("#fileupload").fileupload({
       dataType:"json",
       //e：事件对象
       //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
       done:function (e, data) {
           console.log(data);
           //获取地址
           var picAddr = data.result.picAddr;
           //将地址给img
           $("#imgbox img").attr("src",picAddr);
           //将地址给name = 'brandLogo'
           $("[name = 'brandLogo']").val(picAddr);
           // 需要将校验状态置成 VALID
           // 参数1: 字段
           // 参数2: 校验状态
           // 参数3: 配置规则, 来配置我们的提示文本
           $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
       }

   });



    // 5. 配置表单校验
    $('#form').bootstrapValidator({

        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验的字段
        fields: {
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            // 一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
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
            url: "/category/addSecondCategory",
            type:"post",
            data : $("#form").serialize(),
            success : function(info){
                console.log(info);
                //模态框隐藏
                $("#addModal").modal("hide");
                //模态框重置
                $("#form").data("bootstrapValidator").resetForm(true);
                //重新渲染第一页
                currentPage =  1;
                render();
                //手动设置dropdownText  img
                $("#dropdownText").text("请选择1级分类");
                $("#imgbox img").attr("src","images/none.png")
            }
        })

    })
});

