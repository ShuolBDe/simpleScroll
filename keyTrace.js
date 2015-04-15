function control_dispatch(e) {
	var keynum = null;
	if (true) {
		isKeyDown = true;
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
			trigger("Left");
			break;
		case 38://up
			trigger("Up");
			break;
		case 39://right
			trigger("Right");
			break;
		case 40://down
			//alert(40);
			trigger("Down");
			break;
		case 13://enter
			trigger("Enter");
			break;
		case 36:
			break;
		case 27://esc
			trigger("Esc");
			rowUlEsc();
			break;
		case 8://back space
			break;
		default:
			break;
		}

	}
}
function set_key_free() {
	isKeyDown = false;
}
function trigger(e) {
	$(currentBlink).trigger("on" + e);
}
/*blink the node to indicate it's selected*/
function blink(node) {
	$(node).addClass("currentBlink");
	$(node).trigger("onBlink");
	$(node).trigger("mouseenter");
}

/*disblink the node*/
function disblink(node) {
	$(node).removeClass("currentBlink");
	$(node).trigger("mouseleave");
}

function sidebar_prev() {
	for (var i = 0; i <= sideBarClickables.size() - 1; i++) {
		if (sideBarClickables[i] == currentBlink) {
			break;
		}
	}

	if (i != 0) {
		previousIndex = i - 1;
		return sideBarClickables[previousIndex];
	} else {
		return sideBarClickables[0];
	}
}
function sidebar_next() {
	for (var i = 0; i <= sideBarClickables.size() - 1; i++) {
		if (sideBarClickables[i] == currentBlink) {
			break;
		}
	}
	nextIndex = Math.floor((i + 1)) % sideBarClickables.size();
	return sideBarClickables[nextIndex];
}
function sidebar_up() {
//	checkUp();
	disblink(currentBlink);
	currentBlink = sidebar_prev();
	blink(currentBlink);
}

function sidebar_down() {
//	checkDown();
	disblink(currentBlink);
	currentBlink = sidebar_next();
	blink(currentBlink);
}
function sidebar_right() {
	if (rowUlCurrent == null) {
		return;
	}
	disblink(currentBlink);
	$(sideCurBlink).addClass("sideCurBlink");
	currentBlink = rowUlCurrent;
	blink(currentBlink);
//	checkRight();
}
/*bind events to colUl*/
function bind_colUl() {
	sideBarClickables = $("#sidebar .clickable");
	$(sideBarClickables[0]).on("onBlink", function() {
		$(this).trigger("click1");
	});
	sideBarClickables.on("onUp", sidebar_up);
	sideBarClickables.on("onDown", sidebar_down);
	sideBarClickables.on("onRight", sidebar_right);
	sideBarClickables.on("onEnter", function() {
		$(this).trigger("click");
	});
}