(function($){
    //default settings
    _setting = {
        id : "re-construct", // which the elements will be append to
        num : 1,        //numeric of elements u want to show in shown area
        moveLen : 1     //number of the next/previous N will skip
    };
    setting = {};
    $.fn.myScroll = {
        /*
         * id : which the elements will be appended to
         *
         * className : the set of <node>'s className
         *
         * direction : scroll direction(h:"horizontal"/v:"vertical")
         *
         * num : numeric of elements u want to show in shown area
         *
         */
        init : function(id,className,direction,num){
        	//clear previous ul
        	$mS.clearPrev(id);

            setting = tools.clone(_setting);
            setting.id = id;
            var elements = $("."+className);
            //directions
            if(direction == "h"){
                tools.horizontal_init(setting.id,elements,num);
            }else if(direction == "v"){
                tools.vertical_init(setting.id,elements,num);
            }else {
                console.log("$.fn.myScroll arguments error:");
                console.log("pls type only 1 or 0(1:horizontal,0:vertical)");
            }
            
            //document.onkeydown = tools.keyTrace;
            $mS.unbind_event(id);
            $mS.bind_event(setting.id,num,direction);
            
        },
        clearPrev : function(id){
        	$("#"+id+" ul[class*='scroll_ul']").remove();
        },
        unbind_event : function(id){
        	if(id){
        		$("body").off("onScrollLeft","#" + id);
        		$("body").off("onScrollUp","#" + id);
        		$("body").off("onScrollRight","#" + id);
        		$("body").off("onScrollDown","#" + id);
        	}
        },
        bind_event : function(id,num,vh){
            $("body").on("onScrollLeft","#" + id,function(){
                //if(num == 1){
                //    var show = $(".show_h_scroll_li");
                //    var prev = $(".show_h_scroll_li").prev();
                //    if(prev == null || prev.size() == 0){
                //        return;
                //    }
                //    //0.clear show_h_scroll_li
                //    show.removeClass("show_h_scroll_li");
                //    prev.addClass("show_h_scroll_li");
                //    //1.clear the class
                //    $(".h_scroll_li").removeClass("rightScroll");
                //    $(".h_scroll_li").removeClass("leftScroll");
                //    $(".h_scroll_li").css("left","");
                //    //2.add class to move
                //    prev.css("left","-100%");
                //    show.css("left","0");
                //    setTimeout(function(){
                //        tools.myAddClass("leftScroll",[show,prev]);
                //    },50);
                //}else {

                //animation async
                $("#" + id + " ." + vh + "_scroll_ul").stop(true,true);
                //directions bind
                if(vh == "h"){
                    var maxLeft = 0;
                    var curLeft = $("#" + id + " ." + vh + "_scroll_ul").css("left");
                    if(curLeft == "auto" || curLeft == maxLeft + "px"){
                        return;
                    }
                    $("#" + id + " ." + vh + "_scroll_ul").animate({left:"+="+tools.unitWidth(id)},500);
                }else {
                    var maxTop = 0;
                    var curTop = $("#" + id + " ." + vh + "_scroll_ul").css("top");
                    if(curTop == "auto" || curTop == maxTop + "px"){
                        return;
                    }
                    $("#" + id + " ." + vh + "_scroll_ul").animate({top:"+="+tools.unitHeight(id)},500);
                }

                //}

            });
            $("body").on("onScrollUp","#" + id,function(){
                //animation async
                $("#" + id + " ." + vh + "_scroll_ul").stop(true,true);
                //directions bind
                if(vh == "h"){
                    var maxLeft = 0;
                    var curLeft = $("#" + id + " ." + vh + "_scroll_ul").css("left");
                    if(curLeft == "auto" || curLeft == maxLeft + "px"){
                        return;
                    }
                    $("#" + id + " ." + vh + "_scroll_ul").animate({left:"+="+tools.unitWidth(id)},500);
                }else {
                    var maxTop = 0;
                    var curTop = $("#" + id + " ." + vh + "_scroll_ul").css("top");
                    if(curTop == "auto" || curTop == maxTop + "px"){
                        return;
                    }
                    $("#" + id + " ." + vh + "_scroll_ul").animate({top:"+="+tools.unitHeight(id)},500);
                }
            });
            $("body").on("onScrollRight","#" + id,function(){
                //if(num == 1){
                //    //alert("right");
                //    var show = $(".show_h_scroll_li");
                //    var next = $(".show_h_scroll_li").next();
                //    if(next == null || next.size() == 0){
                //        return;
                //    }
                //    //0.clear show_h_scroll_li
                //    show.removeClass("show_h_scroll_li");
                //    next.addClass("show_h_scroll_li");
                //    //1.clear the class
                //    $(".h_scroll_li").removeClass("rightScroll");
                //    $(".h_scroll_li").removeClass("leftScroll");
                //    $(".h_scroll_li").css("left","");
                //    //2.add class to move
                //    show.css("left","0");
                //    setTimeout(function(){
                //        tools.myAddClass("rightScroll",[show,next]);
                //    },50);
                //    //setTimeout(function(){
                //    //    tools.myRemoveClass("rightScroll",[show,next]);
                //    //},500);
                //}else {
                //animation async
                $("#" + id + " ." + vh + "_scroll_ul").stop(true,true);

                //}
                //directions bind
                if(vh == "h"){
                    var maxLeft = (num - $("#" + id + " .scroll_li").length) * tools.unitWidth(id);
                    if($("#" + id + " ." + vh + "_scroll_ul").css("left") == maxLeft + "px"){
                        return;
                    }

                    $("#" + id + " ." + vh + "_scroll_ul").animate({left:"-="+tools.unitWidth(id)},500);
                }else {
                    var maxTop = (num - $("#" + id + " .scroll_li").length) * tools.unitHeight(id);
                    if($("#" + id + " ." + vh + "_scroll_ul").css("top") == maxTop + "px"){
                        return;
                    }

                    $("#" + id + " ." + vh + "_scroll_ul").animate({top:"-="+tools.unitHeight(id)},500);
                }

            });
            $("body").on("onScrollDown","#" + id,function(){
                //animation async
                $("#" + id + " ." + vh + "_scroll_ul").stop(true,true);

                //}
                //directions bind
                if(vh == "h"){
                    var maxLeft = (num - $("#" + id + " .scroll_li").length) * tools.unitWidth(id);
                    if($("#" + id + " ." + vh + "_scroll_ul").css("left") == maxLeft + "px"){
                        return;
                    }

                    $("#" + id + " ." + vh + "_scroll_ul").animate({left:"-="+tools.unitWidth(id)},500);
                }else {
                    var maxTop = (num - $("#" + id + " .scroll_li").length) * tools.unitHeight(id);
                    if($("#" + id + " ." + vh + "_scroll_ul").css("top") == maxTop + "px"){
                        return;
                    }

                    $("#" + id + " ." + vh + "_scroll_ul").animate({top:"-="+tools.unitHeight(id)},500);
                }
            });
        }
    };
    tools = {
        unitWidth : function(id){
            return $("#" + id + " .scroll_li").width();
        },
        unitHeight : function(id){
            return $("#" + id + " .scroll_li").height();
        },
        apply: function(fun, param, defaultValue) {
            if ((typeof fun) == "function") {
                return fun.apply($mS,param?param:[]);
            }
            return defaultValue;
        },
        call: function(fun, param, defaultValue) {
            if ((typeof fun) == "function") {
                return fun.call($mS,param);
            }
            return defaultValue;
        },
        isArray: function(arr) {
            return Object.prototype.toString.apply(arr) === "[object Array]";
        },
        clone: function (obj){
            if (obj === null) return null;
            var o = tools.isArray(obj) ? [] : {};
            for(var i in obj){
                o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? arguments.callee(obj[i]) : obj[i]);
            }
            return o;
        },
        //create ul
        createUl : function(elements,vh,num){
            var ul = document.createElement("ul");
            ul.className = vh + "_scroll_ul";
            for(var i = 0;i < elements.size();i ++){
                var li = document.createElement("li");
                li.id = vh + "_scroll_li" + (i + 1);
                li.className = vh + "_scroll_li";
                $(li).addClass("scroll_li");
                li.appendChild(elements[i]);
                ul.appendChild(li);
            }
            //add attribute to mark which is visible
            for(var j = 0;j < num;j++){
            	$(ul.children[j]).attr("rel","scrollShow");
            }
            return ul;
        },
        //show num
        horizontal_init : function(id,elements,num){
            var ul = tools.createUl(elements,"h",num);

            $("#" + id).append(ul);
            //if(num == 1){
            //    $($(".h_scroll_li")[0]).addClass("show_h_scroll_li");
            //    $(".show_h_scroll_li").css({"left":"0"});
            //}else {
            var liWidth = 1 / num * 100;
            var li_count = $(".h_scroll_li").length;
            $(".h_scroll_ul").css("width",li_count * liWidth + "%");
            $(".h_scroll_li").css({"position":"relative","width":1/li_count * 100 + "%","left":"0"});
                //for(var i = 0;i < num;i++){
                //    $($(".h_scroll_li")[i]).css("left","0");
                //}
            //}
//          $("#" + id).css({"width":$(".h_scroll_li").width(),"height":$(".h_scroll_li").height()});

            //dispatch keyboard
        },
        vertical_init : function(id,elements,num){

            var ul = tools.createUl(elements,"v",num);

            $("#" + id).append(ul);
            //if(num == 1){
            //    $($(".h_scroll_li")[0]).addClass("show_h_scroll_li");
            //    $(".show_h_scroll_li").css({"left":"0"});
            //}else {
            var liHeight = 1 / num * 100;
            var li_count = $("#" + id + " .v_scroll_li").length;
            $("#" + id + " .v_scroll_ul").css("height",li_count * liHeight + "%");
            $("#" + id + " .v_scroll_li").css({"position":"relative","height":1/li_count * 100 + "%","left":"0","float":"none"});

        },
        myAddClass : function(className,box) {
            for(var i = 0;i < box.length;i ++){
                $(box[i]).addClass(className);
            }
        },
        myRemoveClass : function(className,box) {
            for(var i = 0;i < box.length;i ++){
                $(box[i]).removeClass(className);
            }
        },
        myTrigger : function(e){
            $("#" + setting.id).trigger("onScroll"+e);
        },
        // keyTrace : function(e){
        //     var keynum;
        //     if(true){
        //         isKeyDown = true;
        //         if(window.event) // IE
        //         {
        //             keynum = e.keyCode;
        //         }
        //         else if(e.which) // Netscape/Firefox/Opera
        //         {
        //             keynum = e.which;
        //         }
        //         switch (keynum){
        //             case 32://space
        //                 break;
        //             case 37://left
        //                 tools.myTrigger("Left");
        //                 break;
        //             case 38://up
        //                 tools.myTrigger("Up");
        //                 break;
        //             case 39://right
        //                 tools.myTrigger("Right");
        //                 break;
        //             case 40://down
        //                 //alert(40);
        //                 tools.myTrigger("Down");
        //                 break;
        //             case 13://enter
        //                 tools.myTrigger("Enter");
        //                 break;
        //             case 36:
        //                 break;
        //             case 27://esc
        //                 tools.myTrigger("Esc");
        //                 //rowUlEsc();
        //                 break;
        //             case 8://back space
        //                 break;
        //             default:
        //                 break;
        //         }

        //     }
        // },
        //auto scroll
        infinite : function(){

        }
    };
    var $mS = $.fn.myScroll;

})(jQuery);
