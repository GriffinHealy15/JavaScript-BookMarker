//Listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
// Get form values
var siteName=document.getElementById('siteName').value;
var siteURL=document.getElementById('siteURL').value;

if(!validateForm(siteName, siteURL)){
	return false;
}

var bookmark = {
	name: siteName,
	url: siteURL
}

//console.log(bookmark);

/*
// Local Storage
localStorage.setItem('testkey', 'Hello');
console.log(localStorage.getItem('testkey'));
localStorage.removeItem('testkey');
console.log(localStorage.getItem('testkey'));
*/

// Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null) {
	// init array
	var bookmarks = [];
	// Add to array
	bookmarks.push(bookmark);
	// Set to local storage (Stringify the JSON)
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
} else {
	// Get bookmarks from local storage (turn back into JSON)
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Add bookmark to array
	bookmarks.push(bookmark);
	// Re-set back to localstorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 

}

// Clear form
document.getElementById('myForm').reset();


// Re-fetch bookmarks
 fetchBookmarks();

// Prevent form from submitting
e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
// Get bookmarks from localstorage (turn back into JSON)
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Loop through bookmarks
for(var i = 0; i < bookmarks.length; i++){
	if(bookmarks[i].url == url){
		// Remove from array
		bookmarks.splice(i,1);
	}
   }
   // Set to local storage (Stringify the JSON)
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

 // Re-fetch bookmarks
 fetchBookmarks();
}



// Fetch bookmarks
function fetchBookmarks() {
	// Get bookmarks from local storage (turn back into JSON)
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="card card-block bg-faded">' +
									  '<h3>' + name +
		'<a class="btn btn default" target="_blank" href = "'+url+'">Visit</a> ' +
		'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-info href = "#">Delete</a> ' +
									  '</h3>' +
									  '</div>';
	}
}

// Validate Form
function validateForm(siteName, siteURL){
if(!siteName || !siteURL) {
	alert("Please fill in the bookmark form");
	return false;
}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteURL.match(regex)){
	alert('Please use a valid URL');
	return false;
}

return true;

}








