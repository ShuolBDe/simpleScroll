# simpleScroll

===============scroll===================

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
	 
	 * className : divs' className
	 
	 * direction : scroll direction(h:"horizontal"/v:"vertical")

	 * num : number of li's length the re-construct will show

	 */
	 
	$.fn.myScroll.init(id,className,direction,num);
	
Considering,

	We only bind event with no trigger , u can customize your condition to trigger them like:
	
	$(node).trigger("onScrollLeft");
	
Join us,

	We need u to improve this simple plug-in :-)

=======================================
