$(document).ready(function(){
	var show_per_page = 2;
	var number_of_items = $('#paginate tr').length;
	var navigation_html = '<a class="previous_link" href="">Prev</a>';
	var current_link = 1;

	for (var i = 0; i < number_of_items; i = i + show_per_page) {
		navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (current_link) + '</a>';
		
		console.log(navigation_html);
		current_link++;
	}
	navigation_html = '<a class="next_link" href="">Next</a>';
	$('#page_navigation').html(navigation_html); //.html() change all the content of elements
	rowDisplay(0, show_per_page);

	//hide() all the element and select the element you want to show
	//slice() method selects a subset of elements based on its index	
	function rowDisplay(startIndex, endIndex) {
		$('#paginate tr').hide().slice(startIndex, endIndex).show();
	}
	
	$('.page_link').click(function(e){
		e.preventDefault();
		$('.active').removeClass('active');
		$(this).addClass('active');
		var IndexData = $(this).data();
		rowDisplay(IndexData.start, IndexData.end);
	}).first().addClass('active');  //.first() constructs a new jquery object from the first element in that set, and add the element to active class.

	$('.previous_link, .next_link').click(function (e) {
		e.preventDefault();
		var traverse = $(this).is('.previous_link') ? 'prev' : 'next';         
		$('.page_link.active')[traverse]('.page_link').click();
		});
});
