(function($){
    $_setting = {
        sideBarClickables : "",
        sideCurBlink : "",
        headerCurBlink : "",
        headerClickables : "",
        containerClickables : "",
        firstClickable : "",
        currentBlink : "",
        tdRowFirst : "",
        tdRowCurrent : "",
        tdRowCurrentIndex : 0,
        isKeyDown : ""
    }
    $.fn.keyTrace = {
        /*
         * @param header : id of header
         *
         * @param sidebar : id of sidebar
         *
         * @param container : id of container
         *
         * @param bind_container : custom function for container event
         *
         */
        init : function (header,sidebar,container) {
        	//clear 
            if(header){
                $_setting.headerClickables = $("#" + header + " .clickable");
            }
            if(sidebar){
                $_setting.sideBarClickables = $("#" + sidebar + " .clickable");
            }
            if(container){
                $_setting.containerClickables = $("#" + container + " .clickable");
            }
            $_setting.sideCurBlink = $keyTrace.findSideCurBlink();
            $_setting.firstClickable = $keyTrace.first_clickable();
            if(!$_setting.currentBlink){
            	$_setting.currentBlink = $_setting.firstClickable;
            }
            $_setting.tdRowFirst = $keyTrace.tdRow_first();
            $_setting.tdRowCurrent = $keyTrace.tdRowFirst;
            $_setting.tdRowCurrentIndex = 0;
            $_setting.isKeyDown = false;
            $keyTrace.blink($_setting.currentBlink);

            //unbind events
            $keyTrace.unbind_header();
            $keyTrace.unbind_sidebar();
            //bind events
            $keyTrace.bind_header();
            $keyTrace.bind_sidebar();
            if($keyTrace.bind_container && $keyTrace.unbind_container){
            	$keyTrace.unbind_container()
            	$keyTrace.bind_container();
            }

            document.onkeydown = $keyTrace.control_dispatch;
            document.onkeyup = $keyTrace.set_key_free;
        },
        control_dispatch : function(e){
            var keynum = null;
            if (true) {
                $_setting.isKeyDown = true;
                if (window.event) // IE
                {
                    keynum = e.keyCode;
                } else if (e.which) // Netscape/Firefox/Opera
                {
                    keynum = e.which;
                }
                switch (keynum) {
                    case 32://space
                        break;
                    case 37://left
                    	$keyTrace.myTrigger("Left");
                        break;
                    case 38://up
                    	$keyTrace.myTrigger("Up");
                        break;
                    case 39://right
                    	$keyTrace.myTrigger("Right");
                        break;
                    case 40://down
                        //alert(40);
                    	$keyTrace.myTrigger("Down");
                        break;
                    case 13://enter
                    	$keyTrace.myTrigger("Enter");
                        break;
                    case 36:
                        break;
                    case 27://esc
                    	$keyTrace.myTrigger("Esc");
                        //this.tdRowEsc();
                        break;
                    case 8://back space
                        break;
                    default:
                        break;
                }

            }
        },
        myTrigger : function(e){
            $($_setting.currentBlink).trigger("on"+e);
        },
        set_key_free : function(){
            $_setting.isKeyDown = false;
        },
        first_clickable : function(){
            var firstClickable = $("#firstClickable")[0];
            if(firstClickable == null){
                alert('please define the first clickable element for this page!');
                return;
            }
            return firstClickable;
        },
        tdRow_first : function(){
            var node = $(".tdRow").first().children(".clickable").first()[0];
            return node;
        },
        findSideCurBlink : function(){
            return $(".slideCurBlink").last()[0];
        },
        /*blink the node to indicate it's selected*/
        blink : function (node) {
            $(node).addClass("currentBlink");
            $(node).trigger("onBlink");
            $(node).trigger("mouseenter");
        },
        /*disblink the node*/
        disblink : function(node){
            $(node).removeClass("currentBlink");
            $(node).trigger("mouseleave");
        },
        /*bind events to header*/
        bind_header : function(){
            //$($_setting.sideBarClickables[0]).on("onBlink", function() {
            //    $(this).trigger("click1");
            //});
            $_setting.headerClickables.on("onRight", $keyTrace.header_right);
            $_setting.headerClickables.on("onLeft", $keyTrace.header_left);
            $_setting.headerClickables.on("onUp", $keyTrace.header_up);
            $_setting.headerClickables.on("onDown", $keyTrace.header_down);
            $_setting.headerClickables.on("onEnter", function() {
                $(this).trigger("click");
            });
        },
        /*unbind events to header*/
        unbind_header : function(){
            //$($_setting.sideBarClickables[0]).on("onBlink", function() {
            //    $(this).trigger("click1");
            //});
            $_setting.headerClickables.off("onRight");
            $_setting.headerClickables.off("onLeft");
            $_setting.headerClickables.off("onUp");
            $_setting.headerClickables.off("onDown");
            $_setting.headerClickables.off("onEnter");
        },
        /*bind events to sidebar*/
        bind_sidebar : function(){
            //$($_setting.sideBarClickables[0]).on("onBlink", function() {
            //    $(this).trigger("click1");
            //});
            $_setting.sideBarClickables.on("onUp", $keyTrace.sidebar_up);
            $_setting.sideBarClickables.on("onDown", $keyTrace.sidebar_down);
            $_setting.sideBarClickables.on("onLeft", $keyTrace.sidebar_left);
            $_setting.sideBarClickables.on("onRight", $keyTrace.sidebar_right);
            $_setting.sideBarClickables.on("onEnter", function() {
                $(this).trigger("click");
            });
        },
        /*unbind events to sidebar*/
        unbind_sidebar : function(){
            //$($_setting.sideBarClickables[0]).on("onBlink", function() {
            //    $(this).trigger("click1");
            //});
            $_setting.sideBarClickables.off("onUp");
            $_setting.sideBarClickables.off("onDown");
            $_setting.sideBarClickables.off("onLeft");
            $_setting.sideBarClickables.off("onRight");
            $_setting.sideBarClickables.off("onEnter");
        },
        /*bind events to container*/
        bind_container : null,
        /*unbind events to container*/
        unbind_container : null,
        //    function(){
        //    //$($_setting.sideBarClickables[0]).on("onBlink", function() {
        //    //    $(this).trigger("click1");
        //    //});
        //    //$_setting.sideBarClickables.on("onUp", keyTrace.container_up);
        //    //$_setting.sideBarClickables.on("onDown", keyTrace.container_down);
        //    //$_setting.sideBarClickables.on("onRight", keyTrace.container_right);
        //    //$_setting.sideBarClickables.on("onEnter", function() {
        //    //    $(this).trigger("click");
        //    //});
        //},
        
        //locate currentBlink's index in obj
        locating : function(obj){
            var index = 0;
            for (var i = 0; i <= obj.size() - 1; i++,index++) {
                if (obj[i] == $_setting.currentBlink) {
                    break;
                }
            }
            return index;
        },
        sidebar_prev : function(){
            var i = $keyTrace.locating($_setting.sideBarClickables);

            if (i != 0) {
                var previousIndex = i - 1;
                return $_setting.sideBarClickables[previousIndex];
            } else {
                //if i == 0 , make curBlink into header
                return $_setting.headerClickables[0];
            }
        },
        sidebar_next :function(){
            var i = $keyTrace.locating($_setting.sideBarClickables);

            var len = $_setting.sideBarClickables.size();
            var nextIndex = i + 1;
            if(i == len - 1){
            	nextIndex = i;
            }
            return $_setting.sideBarClickables[nextIndex];
        },
        sidebar_up : function(){
            //checkUp();
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $keyTrace.sidebar_prev();
            $keyTrace.blink($_setting.currentBlink);

            //if ($_setting.tdRowCurrent == null) {
            //    keyTrace.disblink($_setting.currentBlink);
            //    $_setting.currentBlink = $(".tdRow.clickable")[0];
            //    keyTrace.blink($_setting.currentBlink);
            //    return;
            //}
            //keyTrace.disblink($_setting.currentBlink);
            //$($_setting.sideCurBlink).addClass("sideCurBlink");
            //$_setting.currentBlink = $_setting.tdRowCurrent;
            //keyTrace.blink($_setting.currentBlink);
            //checkRight();
        },
        sidebar_down : function(){
            //checkDown();
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $keyTrace.sidebar_next();
            $keyTrace.blink($_setting.currentBlink);
        },
        sidebar_left : null,
        sidebar_right : function(){
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $(".tdRow.clickable")[0];
            $keyTrace.blink($_setting.currentBlink);
            //if ($_setting.headerCurrent == null) {
            //    keyTrace.disblink($_setting.currentBlink);
            //    $_setting.currentBlink = $("#header .clickable")[0];
            //    keyTrace.blink($_setting.currentBlink);
            //    return;
            //}
            //keyTrace.disblink($_setting.currentBlink);
            //$($_setting.headerCurrent).addClass("headerCurrent");
            //$_setting.currentBlink = $_setting.headerCurrent;
            //keyTrace.blink($_setting.currentBlink);
        },
        header_prev : function(){
            var i = $keyTrace.locating($_setting.headerClickables);

            if (i != 0) {
                var previousIndex = i - 1;
                return $_setting.headerClickables[previousIndex];
            } else {
                //if i == 0 , make curBlink into header
                return $_setting.headerClickables.last()[0];
            }
        },
        header_next : function(){
            var i = $keyTrace.locating($_setting.headerClickables);

            var nextIndex = Math.floor((i + 1)) % $_setting.headerClickables.size();
            return $_setting.headerClickables[nextIndex];
        },
        header_left : function () {
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $keyTrace.header_prev();
            $keyTrace.blink($_setting.currentBlink);
        },
        header_right : function () {
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $keyTrace.header_next();
            $keyTrace.blink($_setting.currentBlink);
        },
        header_up : null,
        header_down : function () {
        	$keyTrace.disblink($_setting.currentBlink);
            $_setting.currentBlink = $_setting.sideBarClickables[0];
            $keyTrace.blink($_setting.currentBlink);
            //if ($_setting.headerCurrent == null) {
            //    keyTrace.disblink($_setting.currentBlink);
            //    $_setting.currentBlink = $("#sidebar .clickable")[0];
            //    keyTrace.blink($_setting.currentBlink);
            //    return;
            //}
            //keyTrace.disblink($_setting.currentBlink);
            //$($_setting.headerCurrent).addClass("headerCurrent");
            //$_setting.currentBlink = $_setting.headerCurrent;
            //keyTrace.blink($_setting.currentBlink);
        }

    };
    $keyTrace = $.fn.keyTrace;
})(jQuery);