/**
 * Created by KJY on 2018/11/25.
 */
$(function(){


 render();
// 封装一个方法, 用于读取历史记录数组, 返回一个数组
    function getHistory(){
        var history = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    // 专门用于读取本地历史记录, 进行渲染
    function render(){
        var arr = getHistory();
        var htmlStr =  template("historyTpl",{ arr:arr });
        $(".lt_history").html(htmlStr);
    }

    // 功能2: 清空历史记录功能
    // (1) 通过事件委托给清空记录绑定点击事件
    // (2) 清空, 将本地的 search_list 移除, removeItem(key);
    // (3) 重新渲染页面
    $(".lt_history").on("click",".btn_empty",function(){
        mui.confirm("你确定要清空历史记录嘛?","温馨提示",["取消", "确认"],function(e){
            if(e.index === 1){
                localStorage.removeItem("search_list");
                render();
            }
        })
    })




    // 功能3: 删除单条历史记录
    // (1) 事件委托绑定点击事件
    // (2) 将下标存在删除按钮中, 点击后获取下标
    // (3) 读取本地存储, 拿到数组
    // (4) 根据下标, 从数组中将该下标的项移除,  splice
    // (5) 将数组转换成 jsonStr
    // (6) 存到本地存储中
    // (7) 重新渲染
    $(".lt_history").on("click",".btn_delete",function(){
        var that = this;
        mui.confirm("你确定要删除该条记录嘛","温馨提示",["取消", "确认"],function( e ){
            if( e.index === 1){

                // (2) 将下标存在删除按钮中, 点击后获取下标
                var index = $(that).data("index");
                // (3) 读取本地存储, 拿到数组
                var arr = getHistory();
                // (4) 根据下标, 从数组中将该下标的项移除,  splice
                // splice( 从哪开始, 删几个, 添加的项1, 添加的项2, ..... );
                arr.splice(index,1);
                // (5) 将数组转换成 jsonStr
                var jsonStr = JSON.stringify(arr);
                // (6) 存到本地存储中
                localStorage.setItem("search_list",jsonStr);
                // (7) 重新渲染
                render();
            }
        })
    })


    // 功能4: 点击搜索按钮, 添加搜索记录
    // (1) 给 搜索按钮 注册点击事件
    // (2) 获取搜索框的内容
    // (3) 读取本地存储, 拿到数组
    // (4) 将搜索框的内容, unshift 到数组的最前面
    // (5) 将数组转成jsonStr, 存到本地存储中
    // (6) 重新渲染
    $(".search_btn").click(function(){
        // (2) 获取搜索框的内容
        var key = $(".search_input").val();
            if(  key.trim() === ""){
                mui.toast("请输入搜索关键字", {
                    duration: 2500
                });
                return;
            }
        // (3) 读取本地存储, 拿到数组
        var arr = getHistory();
        // (4) 将搜索框的内容, unshift 到数组的最前面

        // 需求:
        // 1. 不要有重复项, 如果有, 移除之前的, 将最新的添加到数组最前面
        var index = arr.indexOf( key );
        if( index > -1){
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);

        // (5) 将数组转成jsonStr, 存到本地存储中
        localStorage.setItem("search_list",JSON.stringify(arr));
        // (6) 重新渲染
        render();
        // 清空搜索框内容
        $('.search_input').val("");

        location.href = "searchList.html?key=" + key;


    

    })


});