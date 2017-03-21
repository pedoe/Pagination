$(document).ready(function(){
	var show_per_page = 2;
	var number_of_items = $('#paginate tr').length; //Return the number of elements in the jQuery object.
	var navigation_html = '<a class="first_link" href=""><<</a>';
	var total_page = 1;

	navigation_html += '<a class="previous_link" href="">Prev</a>';

//Create all the element and asign href link.
	for (var i = 0; i < number_of_items; i = i + show_per_page) {
		navigation_html += '<a class="page_link" href="" data-start="' + i + '" data-end="' + (i + show_per_page) + '">' + (total_page) + '</a>';
		total_page++;
	}

// After all the navigation_html are created, add the Next link 
// and $('#page_navigation').html(navigation_html) will create the navigation bar in the html
// which is located in <div id=page_navigation></div>
	navigation_html += '<a class="next_link" href="">Next</a>';
	navigation_html += '<a class="last_link" href="">>></a>';
	$('#page_navigation').html(navigation_html); //.html() change all the content of elements
	rowDisplay(0, show_per_page);
	console.log(navigation_html);

//hide() all the element and select the element you want to show
//slice() method selects a subset of elements based on its index	
	function rowDisplay(startIndex, endIndex) {
		$('#paginate tr').hide().slice(startIndex, endIndex).show();
	}
	
	$('.page_link').click(function(e){
		e.preventDefault(); //Cancel the default action when the method is called
		$('.active').removeClass('active');
		$(this).addClass('active');
		var IndexData = $(this).data();
		console.log(IndexData);
		rowDisplay(IndexData.start, IndexData.end);
	
	}).first().addClass('active');  //.first() constructs a new jquery object from the first element in that set, and add the element to active class. This is for page show class with active at first time.

	$('.previous_link, .next_link').click(function (e) {
		e.preventDefault();
		var traverse = $(this).is('.previous_link') ? 'prev' : 'next';
		//Call the ('.page_link').click(function(e)) atfer decide the traverse value
		$('.page_link.active')[traverse]('.page_link').click(); 
	});


	$('.first_link, .last_link').click(function(e){
		e.preventDefault();
		if($(this).is('.first_link')){
			rowDisplay(0, show_per_page);
			$('.page_link').removeClass('active').first().addClass('active');
		}
		else{
			if(number_of_items % show_per_page){
				rowDisplay(number_of_items - (number_of_items % show_per_page), number_of_items);
			}
			else{
				rowDisplay(number_of_items - show_per_page, number_of_items);
			}
			$('.page_link').removeClass('active').last().addClass('active');
		}
	});

	
	$("input[type='submit']").click(function(e){
		var page = $("input[type='search']").val();
		if((page < total_page) && (page > 0)){
			rowDisplay((page * show_per_page) - show_per_page, page * show_per_page);
		}
		
		else{
			alert("Please input the correct page");
		}
		
	});
	
});


