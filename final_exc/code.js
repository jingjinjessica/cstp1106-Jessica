function call_ajax(){
  $.ajax(
    {
      url: 'https://imdb-api.com/en/API/Top250Movies/k_eu3xrtjw',
      type: 'GET',
      success: tableInsert
    }
  )
}


// Reference site : https://kkh0977.tistory.com/1011

/* [Table list global leniable declaration] */
const tableList = []; // Insert while turning the for statement in the table insert function
const pageList = 10; // The number of lists to be shown on a page.
const pageMax = 10; // Maximum number of pages to be created (you need to click the previous, next button to view more pages)
let idx = 0; // After checking idx value, dynamic page switching and data display
let page = 1; // Page number to start creation




/* [tbody tr Dynamic insertion event performance function] */
function tableInsert(data){
	// [ajax >> tableList, When table data is included in the list]
	// pageInsert(page);

	// [Turn the for loop to generate tr data]
	for (let i=0; i<data.items.length; i++){
		// Add it to the list in JSON format
		let jsonObject = {
      "idx": i,
      "crew": data.items[i].crew,
      "fullTitle": data.items[i].fullTitle,
      "id": data.items[i].id,
      "imDbRating": data.items[i].imDbRating,
      "imDbRatingCount": data.items[i].imDbRatingCount,
      "image": data.items[i].image,
      "rank": data.items[i].rank,
      "title": data.items[i].title,
      "year": data.items[i].year
    };
		tableList.push(jsonObject);
	}

	// [Paging is performed according to the number of table rows]
	pageInsert(page);
};




/* [Paging processing event performance function] */
function pageInsert(value){
	// [Initialize paging list]
	$("#dyn_ul").empty();

	// [Check the number of table tr generated >> Cutting the list of 10 paging items]
	let startIndex = value; // Creation start page
	//let endIndex = $("#dyn_tbody tr").length; // Check the number of trs dynamically added to tbody
	let endIndex = tableList.length; // Check the lengths in the arrangement

	// [Check the number to be paged according to the number of tr]
	let pageCount = 0;
	let pagePlus = 0;
	if(endIndex > pageList){ // If the number of tr rows is 10 or more (random setting)
		pageCount = Math.floor(endIndex / pageList); // Number of pages to be created (throw away decimal points)
		pagePlus = endIndex % pageList; // The remaining number of children
		if(pagePlus > 0){ // If there are additional children >> Add page
			pageCount = pageCount + 1;
		}
	}

	// [Check whether the page number to be created is greater than or less than the total length to be created]
	if(startIndex > pageCount){ // Save it back to the existing one when it goes over the length
		startIndex = page;
	}
	else if(startIndex < 0){ // If it's less than the length, save it back to the existing one
		startIndex = page;
	}
	else {
		page = startIndex;
	}

	// [Dynamic ul paging processing is performed]
	if(pageCount == 1){ // If the page you need to create is one page
		let insertUl = "<li class='page-item'>"; // Declaration of variable
		insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick='newPage(1);'>";
		insertUl += insertUl + i;
		insertUl += insertUl + "</a></li>";
		$("#dyn_ul").append(insertUl); // Use "jquery append" and add it dynamically
	}
	else if(pageCount >= 2){ // If there are two or more pages to be created
		// Add the previous page
		let insertSTR = "<li class='page-item'>"; // Declaration of variable
		insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick='newPage("+"-1"+");' aria-label='Previous'>";
		insertSTR = insertSTR + "<span aria-hidden='true'>&laquo;</span>";
		insertSTR = insertSTR + "</a></li>";
		$("#dyn_ul").append(insertSTR); // Use "jquery append" and add it dynamically

		// Specific. 1, 2, 3... Add a page
		let count = 1;
		for(let i=startIndex; i<=pageCount; i++){
			if(count > pageMax){ // When the maximum number of pages to be created is reached,
				page = i - pageMax; // Save the generated initial value of the page (if the initial i value is 4 escape >> Save 1 value)
				break;
			}
			let insertUl = "<li class='page-item'>"; // Declaration of variable
			insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick='newPage("+i+");'>";
			insertUl = insertUl + String(i);
			insertUl = insertUl + "</a></li>";
			$("#dyn_ul").append(insertUl); // Use "jquery append" and add it dynamically
			count ++;
		}

		// Add the next page
		let insertEND = "<li class='page-item'>"; // Declaration of variable
		insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick='newPage("+"0"+");' aria-label='Next'>";
		insertEND = insertEND + "<span aria-hidden='true'>&raquo;</span>";
		insertEND = insertEND + "</a></li>";
		$("#dyn_ul").append(insertEND); // Use "jquery append" and add it dynamically
	}

	// [After paging is completed, >> Delete all tr>> Re-display according to the number of paging]
	$("#dyn_tbody").empty(); // Tbody, tr. Delete all of them

	// [New page list processing is carried out]
	newPage(startIndex);
};




/* [tbody, tr Dynamic Insertion Event Performance Function] */
function newPage(pageCurrent){
	// [pageCurrent [-1] >> Previous / pageCurrent [1 or more] >> General / pageCurrent [0] >> Next]
	// [A new table. tbody tr, Generation data]
	if(pageCurrent == -1){ // Previous page
		$("#dyn_tbody").empty(); // tbody, tr. Delete all of them

		// [New paging process]
		let newIdx = page - pageMax;

		// [Paging processing in accordance with data table]
		pageInsert(newIdx); // Send the page number to be displayed
	}
	else if(pageCurrent == 0){ // Next page
		$("#dyn_tbody").empty(); // tbody, tr. Delete all of them

		// [New paging process]
		let newIdx = page + pageMax;

		// [Paging processing is performed according to table data]
		pageInsert(newIdx); // Send the page number to be displayed
	}
	else { // Renewal of general table list list update
		$("#dyn_tbody").empty(); // tbody, tr. Delete all of them
		// Multiply the saved idx by the number of pages and specify a new idx.
		// [Click on page 1 >> (1*10) -10 = 0 beginning]
		// [Click on page 2 >> (2*10) -10 = 10 beginning]
		idx = (pageCurrent * pageList) - pageList;

		let checkCount = 1;
		for(let i=idx; i<tableList.length; i++){ // Inserting tr data into tbody while performing repetitive statements
			if(checkCount > pageList){ // If the list to be displayed on one page is exceeded
				return;
			}

			// json data parsing
			let jsonObject = JSON.parse(JSON.stringify(tableList[i])); // Refer to jsonObject in each arrangement
			idx = jsonObject.idx;
			let crew = jsonObject.crew;
			let fullTitle = jsonObject.fullTitle;
      let id = jsonObject.id;
      let imDbRating = jsonObject.imDbRating;
      let imDbRatingCount = jsonObject.imDbRatingCount;
      let image = jsonObject.image;
      let rank = jsonObject.rank;
      let title = jsonObject.title;
      let year = jsonObject.year;

			// Dynamically adding a list
			let insertTr = "";
			insertTr += "<tr>"; // Like the example left in the body, insert data
      insertTr += "<td>" + rank + "</td>";
			insertTr += "<td><a href='https://www.imdb.com/title/" + id + "' target='_blank' title='" + crew + "'>" + title +
                  "</a> (" + year + ")</td>";
			insertTr += "<td><strong title='" + imDbRating + " based on " + parseInt(imDbRatingCount).toLocaleString("en-CA") +
                  " user ratings'>" + imDbRating + "</strong></td>";
      insertTr += "<td><a href='https://www.imdb.com/title/" + id + "' target='_blank'>" +
                  "<img src='" + image + "' width='45' height='67' alt='" + title + "'>" + "</a></td>";
			insertTr += "</tr>";

			// Use "jquery append" and add it dynamically
			$("#dyn_tbody").append(insertTr);

			// Counts increased
			checkCount ++;
		}
	}
}



function setup() {
  // jQuery('#get_temperature_button').click(call_ajax)
  call_ajax();
}

jQuery(document).ready(setup)
