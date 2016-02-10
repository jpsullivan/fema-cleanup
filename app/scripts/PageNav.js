var totalPages = new Array();
var totalPagesCurrLesson = 0;
//Reset functions
        function setToLastPage() {
            BackEnabled = 0;
            NextEnabled = 0;
            var back = $("#back2");
            var next = $("#next2");
            back.attr("src", 'images/previousHover.png');
            back.attr("alt", 'Back not available');
            next.attr("src", 'images/next2Hover.png');
            next.attr("alt", 'Next not available');
        }

        function setBackDim() {
            BackEnabled = 0;
            var back = $("#back2");
            back.attr("src", 'images/previous2Hover.png');
            back.attr("alt", 'Previous not available');
        }

        function setNextDim() {
            NextEnabled = 0;
            var next = $("#next2");
            next.attr("src", 'images/next2Hover.png');
            next.attr("alt", 'Next not available');
        }
        function setBackActive() {
            BackEnabled = 1;
            var back = $("#back2");
            back.attr("src", 'images/previous2.png');
            back.attr("alt", 'Previous');

        }

        function setNextActive() {
            NextEnabled = 1;
            var next = $("#next2");
            next.attr("src", 'images/next2.png');
            next.attr("alt", 'Next');

        }
		var fullTitle;
		var totalLessons = 0;
		function getManifestInfo() {
			$.ajax({
					type: "GET",
					url: "imsmanifest.xml",
					dataType: "xml",
					success: function (xml) {
						var dict = {};
						var res = $(xml).find('resources');
						var currentLessonIteration = 0;

						var itemCount = 0;
						$(xml).find('item').each(function () {
						    itemCount++;
						    var id = $(this).attr('identifier') + '';
						    var idRef = $(this).attr('identifierref') + '';
						    var title = $(this).find('title').text();
						    if (id == "Lesson" + LessonNum)
						        LessonTitle = title;
						    if(LessonNum == itemCount)
								$('<option value="' + itemCount + '" selected="selected">' + title + '</option>').appendTo('#tls');
							else
								$('<option value="' + itemCount + '">' + title + '</option>').appendTo('#tls');
							//$('<li><a href="javascript:showUl(\'' + itemCount + '\');">' + title + '</a><ul style="display: none;" id="SCO' + itemCount + '"></ul></li>').appendTo('#lessonList');
						});

						res.find('resource').each(function () {
						    currentLessonIteration += 1;
							var currentIdentifier;
							currentIdentifier = $(this).attr('identifier') + '';
							dict[currentIdentifier] = $(this).attr('href') + '';
							var currRes = $(this);
							var tmpTotalPgs = 0;
									currRes.find('file').each(function () {
										tmpTotalPgs++;
										var tmpArr = [$(this).attr('href'), $(this).attr('title')]
                                        if (currentLessonIteration == LessonNum)
										    scoPages.push(tmpArr);
										$('<li><a href="' + currFileName + '?lesson=' + (currentLessonIteration) + '&p=' + (tmpTotalPgs) + '">(' + tmpTotalPgs + ') ' + $(this).attr('title') + '</a></li>').appendTo('#SCO' + currentLessonIteration);
										
									});
							totalPages[currentLessonIteration] = tmpTotalPgs;
							totalLessons++;
						
						
						});
						totalPagesCurrLesson = totalPages[LessonNum];
						afterSuccess();
					}
				});
				
			}
			
			function showUl(itemNum)
			{
				$('#SCO'+itemNum).toggle();
			}
			
			function afterSuccess() {
				initializeVariables();
				currentSCOPage = validPageInteger(getURLParameter("p"));
				simpleLoadPage(currentSCOPage);
				$('#headText').text(CourseTitle);
				$('#lessonHeader').text(LessonTitle);
				$('.menuButton').sidr();
			}



        
		
        

// this proloads all the rollovers and such
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

/* Initialize within-SCO navigation Tracking Variables. */
var numberOfPages = scoPages.length - 1; // number of pages in the SCO
var pageNumber = 1;      // point to current page within an SCO
//var currentSCOPage;
function initializeVariables()
{
	numberOfPages = scoPages.length - 1; // number of pages in the SCO
	pageNumber = currentSCOPage;      // point to current page within an SCO
}

function LoadFirstPage()
{
//SCOContentFrame.location = scoPages[1];  // set first page of content
}

function goToNextPage () 
{
    BackEnabled = 1;
    currentSCOPage = parseInt(currentSCOPage);
   if(currentSCOPage < numberOfPages)
   {

       currentSCOPage = currentSCOPage + 1;      
      
      simpleLoadPage(currentSCOPage);  // instead of stuff below

   	}
	else
	{
      alert("This is the last page. How much further would you like to go?  :-)");
   	}
}

/* 
Function used to go to the previous page in the SCO, which could be the first page or
an attempt to backup to the previous SCO (which is not allowed)
*/
function goToPreviousPage() {
    currentSCOPage = parseInt(currentSCOPage);
   if(currentSCOPage !=1){
      currentSCOPage = currentSCOPage - 1;
      simpleLoadPage(currentSCOPage);  // instead of stuff below

      /*updateProgress(currentSCOPage);
      loadPage(currentSCOPage); //Load the previous page if still necessary.
      $("#page" + (currentSCOPage + 1)).fadeOut('slow', function () {
          $("#page" + currentSCOPage).fadeIn();
      });
      loadPage(currentSCOPage - 1);  //Preload the one before that */
   }else{
      alert("This is the 1st Page.  Cut it out already.");
   }
}

function updateProgress(pageNum) {
    var exactPercent = 0;
    currPage = pageNum;
	currentSCOPage = pageNum;
    progPercent = currPage / totalPagesCurrLesson;
    progPercent = progPercent * 100;
    progPercent = Math.round(progPercent);
    exactPercent = progPercent;
    progPercent = progPercent + "";
    progPercent = progPercent.substring(0, progPercent.length - 1) + "0";
    ProgressText = 'Screen ' + currPage + '  of ' + totalPagesCurrLesson;

    /*Update Progress Bar */
    $("#progressbar div").css("width", exactPercent + "%");
    $('#progressValues').html(ProgressText);

    showLocationInNav(pageNum);
}

function showLocationInNav(pg) {
    $('ul#SCO' + LessonNum + ' li a').each(function () {
        $(this).attr("style", "");
        $(this).attr("title", "");
    });
    //$('ul#SCO' + LessonNum + ' li:nth-child(' + pg + ') a').each(function () { $(this).html("-> " + $(this).html()) });
    $('ul#SCO' + LessonNum + ' li:nth-child(' + pg + ') a').each(function() {
        $(this).css("background-color", "#304030");
        $(this).css("font-weight", "bold");
        $(this).attr("title", "Current Slide");
    });
}


//var vFirstPage = scoPages[1]

function GetBookmark(fromself)
{
if(parent.displayMethod != 'SCORM')
	{
		
		if(ISDBSbookmark && ISDBSpagelevelBM == 1)
		{
			
		for(var ndx=0; ndx < scoPages.length; ++ndx)
			{
				if(scoPages[ndx] == strBookmark)
					{
					currentSCOPage = ndx
					}
			}			
			
		ok = confirm('Would you like to resume where you left off, or start the lesson from the beginning?\n\nSelect OK to resume where you left off.\n\nSelect Cancel to start the lesson from the beginning.')
			if(ok == true)
				{window.SCOContentFrame.document.location.href = ISDBSbookmark;}
			else
				{currentSCOPage = 1;window.SCOContentFrame.document.location.href = vFirstPage;}
		}
		else
		{
		    //window.SCOContentFrame.document.location.href = vFirstPage;
		    //document.location.href = vFirstPage;
		}
			
			
	}
else
	{		
			var strBookmark;			
			strBookmark = doLMSGetValue("cmi.core.lesson_location");
						
			if (strBookmark == "")
				{
					window.SCOContentFrame.document.location.href = vFirstPage;
				}
			else
				{
				for(var ndx=0; ndx < scoPages.length; ++ndx)
					{
						if(scoPages[ndx] == strBookmark)
							{
							currentSCOPage = ndx
							}
					}			
			
					ok = confirm('Would you like to resume where you left off, or start the lesson from the beginning?\n\nSelect OK to resume where you left off.\n\nSelect Cancel to start the lesson from the beginning.')
						if(ok == true)
							{window.SCOContentFrame.document.location.href = strBookmark;}
						else
							{currentSCOPage = 1;window.SCOContentFrame.document.location.href = vFirstPage;}
					
				}
	}	
}


function SetSCORMbookmark(strBookmark)
{
//get only the page name
	var intPos = strBookmark.lastIndexOf("/");
	
	if (intPos == -1){
		strPageName = strBookmark;
	}
	else{
		strPageName = strBookmark.substring(intPos + 1, strBookmark.length);
	}
	
	doLMSSetValue("cmi.core.lesson_location", strPageName);	
}

function SetISDBSbookmark(strBookmark)
{
//get only the page name
	var intPos = strBookmark.lastIndexOf("/");
	
	if (intPos == -1){
		strPageName = strBookmark;
	}
	else{
		strPageName = strBookmark.substring(intPos + 1, strBookmark.length);
	}
	
	//alert('The page bookmark is: ' + strPageName);	
	if(displayMethod == 'ISDBS' && ISDBSpagelevelBM == 1)
	{window.blank.location = ISDBSbookmarkURL + '?BMtext=' + strPageName + '&lessonID=' + ISDBSlessonID + '&studentID=' + ISDBSstudentID}
}


var blnIsFinished = false;
var strLessonStatus = "incomplete";

var allLoaded = false;			// set when all


//the following is for the progress bar
var ProgressTxt;
var ProgressImg;
var progPercent;
var progImage;
var currPage = currentSCOPage;

//BEGIN//
//THIS SECTION OF THE TEMPLATE IS NOT TO BE ALTERED WITHOUT PERMISSION FROM EMI DL//
var templateVersion = '3.0';
//THIS SECTION OF THE TEMPLATE IS NOT TO BE ALTERED WITHOUT PERMISSION FROM EMI DL//
//END//


// the following code is for handling the display and functionality of the Back and Next buttons
// 	DO NOT MODIFY
var BackEnabled = 1;
var NextEnabled = 1;

function setToLastPage() {
    BackEnabled = 0;
    NextEnabled = 0;
    var back = $("#back2");
    var next = $("#next2");
    back.attr("src", 'images/previousHover.png');
    back.attr("alt", 'Back not available');
    next.attr("src", 'images/nextHover.png');
    next.attr("alt", 'Next not available');
}

function setBackDim() {
    BackEnabled = 0;
    var back = $("#back2");
    back.attr("src", 'images/previousHover.png');
    back.attr("alt", 'Previous not available');
}

function setNextDim() {
    NextEnabled = 0;
    var next = $("#next2");
    next.attr("src", 'images/nextHover.png');
    next.attr("alt", 'Next not available');
}
function setBackActive() {
    BackEnabled = 1;
    var back = $("#back2");
	back.attr("src", 'images/previous.png');
    back.attr("alt", 'Previous');

}

function setNextActive() {
    NextEnabled = 1;
    var next = $("#next2");
    next.attr("src", 'images/next.png');
    next.attr("alt", 'Next');

}

function HandleBackClicked()
{
    if (BackEnabled == 1) { goToPreviousPage() }
}

function HandleNextClicked() {

    if (NextEnabled == 1) {
        if (currPage == totalPagesCurrLesson) {
            if (displayMethod == 'ISDBS' || displayMethod == 'standalone') {
				if (LessonNum == totalLessons)
				{
					HandleClose();
				}
				else
				{
					window.location.href = currFileName + '?lesson='+(parseInt(LessonNum)+1);
				}
            }
            /*FEKC Only*/
            if (displayMethod == 'SCORM')
            {
				//unloadPage(strLessonStatus);
				doQuit(strLessonStatus);
			}
        }
        else {
            goToNextPage()
        }
    }

}

function ShowGlossary() {
    newWindow = window.open("glossary.htm", "Glossary", "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=yes");
    if (newWindow.opener == null) { newWindow.opener = window };
}

function ShowHelp() {
    newWindow = window.open("help.htm", "Help", "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=yes");
    if (newWindow.opener == null) { newWindow.opener = window };
}

function ShowResources() {
    newWindow = window.open("resources.htm", "Resources", "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=yes");
    if (newWindow.opener == null) { newWindow.opener = window };
}

function ShowPlugIns() {
    newWindow = window.open("http://training.fema.gov/plugins.aspx", "Resources", "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=yes");
    if (newWindow.opener == null) { newWindow.opener = window };
}

function HandleClose()
{
	var conf = confirm("Are you sure you want to exit this course?");
	if (conf)
	{
		top.close(); top.opener.focus();
	}
}


function simpleLoadPage(num) {
	if (num <= numberOfPages)
	{
		$("#ajaxLoadBox").load(scoPages[num][0]+"?d="+($.now()), function () {
		changeHrefVals();
		});
		//Set Next to active because we will deactivate it later if necessary.
		setNextActive()
		updateProgress(parseInt(num));
		handlePageLoading();
		//updateCookie(num);
		//Modify the page URL
		//window.history.replaceState(null, "New Page", getCurentFileName() + "?p=" + num)
	}
	else
	{
		setBackDim();
		setNextDim();
	}
}




function getCurentFileName(){
			var pagePathName= window.location.pathname;
			return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}


