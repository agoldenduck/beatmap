//given in class by Steve to trigger multiple functions on window load, honestly I don't completely understand how it succeeds but it allows you to start multiple functions on window load. It basically checks if the window has already played it's onload event. If it has it forces it to do it again anyway for every function entered at the bottom of this javascript page.
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

//#####//#####//#####//#####//#####//#####//#####//#####//
//##### this function disables the current menu link #####//

function notCurrent() { //function name
    var current = document.getElementById('current'); //found the span 'current'
    current.firstChild.removeAttribute('href'); //nulled that href like a boss
    //no more linkey link, I also changed a:hover to a:link:hover so the link doesn't change colour when moused over.
}

//#####//#####//#####//#####//#####//#####//#####//#####//#####//
//##### if logged in you will receive a personal experience #####//

var loggedIn = document.cookie; //created an independed variable to use throughout doc, didn't end up using often besides below function
function checkLogin() {
    if (loggedIn.length != 0) { //checking if any data in the cookie
        var startpos = loggedIn.indexOf('name') + 5; //will name my cookie name so have to chop first 5 digits out of cookie when displaying the content
        var endpos = loggedIn.indexOf(';', startpos); //gathering the end of the data
        if (endpos == -1) endpos = loggedIn.length; //backup if above method doesn't work if no other data to cookie but name content
        var name = loggedIn.substring(startpos, endpos); //gathered my content
        document.getElementById('header').innerHTML = "<h2>Welcome back, " + name + "!</h2>"; //displaying customer's name in header instead of login form
        document.getElementById('header').innerHTML += "<p id='logout'><a href='#' onclick='logoutpls()' id='reset'>Logout</a></p>"; //created logout link - didn't need to be separate command but in my problem solving ended up here and didn't get around to re-merging it with the above command so here it lies
        if (document.getElementById('project')) { //checking if on the enquiries page
            document.getElementById('txtname').value = 'Brian'; //adding brian to Your name
            document.getElementById('txtemail').value = 'brian@me.com'; //adding the email to Email
        }
    }
}

//#####//#####//#####//#####//#####//
//##### function to login #####//

function loginpls() {
    var loginForm = document.getElementById('login'); //finding the login form
    loginForm.onsubmit = function () { //creating a temp function
        if ((loginForm.txtuser.value != 'testuser') || (loginForm.txtpass.value != 'testpass')) { // checking correct username and password using hard code method (didn't learn ajax yet :-( )
            alert('Please enter your correct username and password. Hint: it\'s testuser and testpass'); //if not correct throw an error
        }
        else {
            var d = new Date(); //if correct creating a cookie starting with the expiry date
            d.setFullYear(d.getFullYear() + 1); //added a year to current date
            expires = "expires=" + d.toGMTString(); //created expires var to add to cookie
            document.cookie = "name=Brian; " + expires + ";"; //created cookie with hard coded name as no access to databases in this assignment
            document.getElementById('header').innerHTML = '<h2>Welcome back, Brian!</h2>'; //brian is now welcome (yes, I know, hard coded but I showed I can do it properly above and I'm in America)
            document.getElementById('header').innerHTML += "<p id='logout'><a href='#' onclick='logoutpls()' id='reset'>Logout</a></p>"; //logout button
            if (document.getElementById('project')) { //as per previous function
                document.getElementById('txtname').value = 'Brian';
                document.getElementById('txtemail').value = 'brian@me.com';
            }
        }
    }
}

//#####//#####//#####//#####//#####//
//##### function to logout #####//

function logoutpls() {
    var d = new Date(); //as per previous function
    d.setFullYear(d.getFullYear() - 1); //npw the expiry is in the past
    expires = "expires=" + d.toGMTString();
    document.cookie = 'name=Brian; ' + expires + ';';
    location.reload(); //reload page, pref from cache, so no more personalisation
}

//#####//#####//#####//#####//#####//#####//#####//
//##### its time for some form validation #####//

function doesItBlend() {
    if (!document.getElementById('project')) return false; //checking on the Enquiries page before continuing script
    var theForm = document.getElementById('project'); //finding the form
    var errorZone = document.getElementById('errors'); //finding the error zone
    var theEmail = /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/; //creating a squiggly email variable, I mean a regular expression variable
    theForm.onsubmit = function  () { //doing javascript when submitting the form
        var seriously = 0; //every time we submit the form we start from scratch on the error count
        errorZone.innerHTML = ''; //clearing all previously had errors
        if (theForm.txtname.value == '') { //check if any text in txtname
            errorZone.innerHTML += '<p>Please enter your name</p>\n'; //showing error in the error zone if nothing in txtname
            seriously += 1; //adding to my count of errors
        }
        if (!theEmail.test(theForm.txtemail.value)) { //check if txtemail conforms with the regular expression
            errorZone.innerHTML += '<p>Please enter a valid email address</p>\n'; //as per above
            seriously += 1;
        }
        if (theForm.txtartist.value == '') { //check artist has a value
            errorZone.innerHTML += '<p>Please enter an artist.</p>\n'; //as per above
            seriously += 1;
        }
        if (theForm.txtalbum.value == '') { //check album has a value
            errorZone.innerHTML += '<p>Please enter a song or album.</p>\n'; //as per above
            seriously += 1;
        }
        if (theForm.txtcomments.value == '') { //check comments has a value
            errorZone.innerHTML += '<p>Please provide the reason for your enquiry.</p>\n'; //as per above
            seriously += 1;
        }
        if (seriously > 0) { //if there are errors
            errorZone.innerHTML += '<p>Please correct the ' + seriously + ' errors</p>'; //show how many errors
            return false;
        }
        var rockIt = window.confirm ('You said:\nYour name is: ' + theForm.txtname.value + '\nYour email is: ' + theForm.txtemail.value + '\nYou are interesteed in: ' + txtartist.value + '\nAnd their song/album: ' + txtalbum.value + '\nYour enquiry is: ' + txtcomments.value + '\nIs this information correct?'); //once successful check with the customer that the details submitted are correct
        if (rockIt == true) {
            return true; //move to next page if customer confirms details
        }
        else {
            return false; //otherwise don't
        }
    }
}

//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//
//##### this function changes the image when moused-over in the gallery.htm webpage #####//

function showPic(whichpic) { //function named and argument given
    if (!document.getElementById("placeholder")) return true; //if no placeholder then open image as link (onclick + onkeypress only)
    
    if (whichpic.getAttribute("title")) { //get decription for new image
        var text = whichpic.getAttribute("title");
    }
    else {
        var text = ""; //or no text if image doesn't have a description in it's title
    }
    
    var source = whichpic.getAttribute("href"); //get the new source
    var placeholder = document.getElementById("placeholder"); //find the placeholder
    if (placeholder.nodeName != "IMG") return true; //make sure placeholder is an image otherwise allow link to load image in new page
    placeholder.setAttribute("src",source); //otherwise replace placeholder with new
    
    var description = document.getElementById("description"); //find the description
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text; //now replace it so long as nodetype is a text_node
    }
    
    return false; //stop new page from loading
}

//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//
//##### this prepares the gallery so that it is ready to receive the above function #####//

function prepareGallery() {
    if (!document.getElementsByTagName) { //these ifs check all required parts of script are available on page
        return false; //and terminate script if they are not all found
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    
    var gallery = document.getElementById("imagegallery"); //find the images
    var links = gallery.getElementsByTagName("a"); //find their anchors
    for (var i=0; i < links.length; i++) { //for loop through these anchors
        links[i].onmouseover = function() {
            return showPic(this); //add mouseover command so that they change the image
        }
        links[i].onclick = links[i].onmouseover; //make onclick work as well
        links[i].onfocus = links[i].onclick; //also onfocus (tabs)
        links[i].onkeypress = links[i].onclick; //also onkeypress (any key)
    }
}

//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//#####//
//##### my beautiful sea of onloads made possible by the first lines of code in this js doc #####//

addLoadEvent(prepareGallery);
addLoadEvent(notCurrent);
addLoadEvent(doesItBlend);
addLoadEvent(checkLogin);
addLoadEvent(loginpls);