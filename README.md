# simpleScroll
1111111111
===============scroll===================
111111
A simple jQuery plug-in for window scrolling.

It's a customizable templete using Css animation to scroll.

Required,

	A show area which u want to show a set of <img> (whatever,<div>/<table> also be fine),
	
	A set of <node> , even no need to set css, but need a same classname
	
Go with,

	U can set the direction(horizontal or vertical) the sets will move to.
	
	U can set the numeric to show in shown area(others will be hide).
	
	Easy like 
	
	/*
	
	 * id : which the elements will be appended to
	 
	 * className : the set of <node>'s className
	 
	 * direction : scroll direction(h:"horizontal"/v:"vertical")

	 * num : numeric of elements u want to show in shown area

	 */
	 
	$.fn.myScroll.init(id,className,direction,num);
	
Considering,

	We only bind event with no trigger , u can customize your condition to trigger them like:
	
	$(node).trigger("onScrollLeft");
	
Join us,

	We need u to improve this simple plug-in :-)

===============keyTrace===================

An example for matching scroll with keyboard input.

Agreement,

	There is a set of agreement to trace keyboard input like :

	1. We split the window into 3 parts --- header/sidebar/container,and add simple action among the 3 parts;

	2. We trace keyboard by tracing <node>s, so u need add className named "clickable" to every node u want to trace;
	
	3. We also need a id "firstclickable" to mark which <node> the tracing will go on with;
	
	Pls overwrite for the necessary logic u go with. 

==========================================
