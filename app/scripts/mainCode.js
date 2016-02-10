var debug = 'false';
var KCcheat = 'false';

var currFileName;
currFileName = "SMPLIndex.htm"; //window.location.href.substr(window.location.href.lastIndexOf("/")+1);

var currentSCOPage;


$(document).ready(function () {
    /*FEKC Specific */
    loadPage();
    if (displayMethod == 'SCORM')
    {
        $("a.menuButton").css("display", "none");
    }
    /*End FEKC Specific*/
    getManifestInfo();
    var checkParam = getURLParameter("p");
    if(checkParam == "null" || checkParam == "1")
    {
	    loadPage();
	    GetBookmark(LessonNum);	
    }
            
			
});
		



/*If invalid page returns 1.  If valid, returns that number */
function validPageInteger(num) {
    if (isNaN(num))
	{
        return 1;
	}
    else if (num > 0 && num <= numberOfPages)
	{
        return num;
	}
    else
	{
        return 1;
	}
}

function handlePageLoading()
{
	// this displays the debug info once the page and layer have loaded
		PageStr = window.document.location.href
		//get only the page name
		var intPos = PageStr.lastIndexOf("/");
		if (intPos == -1){
			strPageName = PageStr;
		}
		else{
			strPageName = PageStr.substring(intPos + 1, PageStr.length);
		}
	if(debug == 'true')
		{
			debugStr = '';
			debugStr = debugStr + '<h3>Debug Information:</h3>';
			debugStr = debugStr + 'Template Version: <strong>' + templateVersion + '</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />';
			debugStr = debugStr + 'Mode: <strong>' + displayMethod
			debugStr = debugStr + '</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />This is page: <strong>' + scoPages[currentSCOPage][0];
			debugStr = debugStr + '</strong><br />debug links: '; 
			debugStr = debugStr + '<a href="javascript:simpleLoadPage(1);";><img align="absmiddle" src="images/debug_01.gif" alt="Rewind to the beginning of this lesson" border="0"></a>'; 
			debugStr = debugStr + '<a accesskey="b" href="javascript:goToPreviousPage()";><img align="absmiddle" src="images/debug_02.gif" alt="Go back to the previous page" border="0"></a>'; 
			debugStr = debugStr + '<a accesskey="n" href="javascript:goToNextPage()";><img align="absmiddle" src="images/debug_03.gif" alt="Go ahead to the next page" border="0"></a>'; 
			debugStr = debugStr + '<a href="javascript:currentSCOPage = numberOfPages; simpleLoadPage(currentSCOPage);";><img align="absmiddle" src="images/debug_04.gif" alt="Fast Forward to the end of this lesson" border="0"></a>';		
			document.getElementById('debug').style.display = "block"; document.getElementById('debug').innerHTML = debugStr
		
	}
	else
		{debugStr = ''; }	
	//end of debug stuff	
		
		
	if(currPage == 1)
		{setBackDim()}
	else 
	    {setBackActive()}
	if(NextEnabled == 0)
	{ setNextDim() }
	if (currPage == totalPagesCurrLesson)
		{
			//setNextDim();
			if(ISDBSenrolled != 0)
			{
				//setToLastPage(); 
				strLessonStatus = "completed";
			}
			
			
			if(ISDBSenrolled == 1 && strLessonStatus == "completed")
			{
				top.opener.location = ISDBScompletionURL + '?lessonId=' + ISDBSlessonID + '&studentId=' + ISDBSstudentID + '&bookmark=';
			}
			
		}
		
	// the following turns on bookmarking for SCORM LMSs
	if(displayMethod == 'SCORM')
		{SetSCORMbookmark(window.document.location.href)}	
	if(displayMethod == 'ISDBS')
	{ SetISDBSbookmark(window.document.location.href) }


    

}




function ShowCourseMap()
{
			if(displayMethod == 'ISDBS' || displayMethod == 'standalone')
						{top.close();top.opener.focus()}
					if(displayMethod == 'SCORM')
						{doQuit(strLessonStatus)}				
}

function SendMeExternalURL(url)
{
vwidth = 1024;
vheight = 800;
sWidth = screen.width;
tWidth = (sWidth/2);
hWidth = (vwidth/2);
uWidth = (tWidth-hWidth);

if(url.indexOf("http") == -1)
	{url = 'http://' + url}

if(url.indexOf("fema.gov") != -1 || url.indexOf("fema.net") != -1)
	{
		newSite=window.open(url,"ExternalSite","toolbar=yes,location=yes,directories=no,status=no,scrollbars=yes,menubar=yes,resizable=yes,width=" + vwidth + ",height=" + vheight + ",left=" + uWidth + ",top=0");
	}
else
	{
		newSite=window.open("","ExternalSite","toolbar=yes,location=yes,directories=no,status=no,scrollbars=yes,menubar=yes,resizable=yes,width=" + vwidth + ",height=" + vheight + ",left=" + uWidth + ",top=0");
		if (newSite != null)
			{
				if (newSite.opener == null) {FBwin.opener = window};
				newSite.document.write('<!DOCTYPE HTML><html xmlns="http://www.w3.org/1999/xhtml" lang="en"><!-- InstanceBegin template="/Templates/FrameSet.dwt" codeOutsideHTMLIsLocked="false" --> <head><meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><link href="css/style.css" rel="stylesheet" type="text/css" media="screen" /><title>Resource</title></head>');
				newSite.document.write('<body onload="self.focus()" class="popUpPage"><a name="top"></a>');
				newSite.document.write('<div class="skip_nav"><a href="#content" class="skipnav" title="Skip to content">Skip to content</a></div>');
				newSite.document.write('<div id="maincontent"><div class="header"><div class="sealAndLogo"><img src="images/dhsSeal.png" alt="Department of Homeland Security Seal" /><img src="images/femaLogo.png" alt="FEMA Logo; Federal Emergency Management Agency" class="femaLogo" /></div><div class="innerHead"><h1 id="headText">External Resource</h1></div><div class="rightNav"><a href="javascript:window.close()"><img src="images/close.png" alt="Close" /></a></div></div><!-- end #header -->	');
				newSite.document.write('<p style="padding-left: 10px;"><strong>You are now exiting the FEMA Web Site.</strong>  <p style="padding-left: 10px;">You will now be entering the site: ' + url);  
				newSite.document.write('<p style="padding-left: 10px;">We have provided a link to this site because it has information that may be of interest to our viewers. <ul style=" margin-left:30px;">	<li>FEMA does not necessarily endorse the views expressed or the facts presented on this site.  </li>	<li>FEMA does not endorse any commercial products that may be advertised or on this site. </li>	<li>The FEMA Privacy Notice Policy does not apply on this site. Please check the site for its Privacy Notice.  </li></ul>');
				newSite.document.write('<p style="padding-left: 10px;">When you\'re done, close the window by clicking on the little X in the upper right-hand corner of the window.');
				newSite.document.write('<p style="padding-left: 10px;"><a onmouseover="document.view.src=\'images/buttonViewLinkHi.gif\';" onmouseout="document.view.src=\'images/buttonViewLink.gif\';" onmousedown="document.view.src=\'images/buttonViewLinkDn.gif\';" href="');
				newSite.document.write(url);
				newSite.document.write('"><img src="images/buttonViewLink.gif" alt="Select this button to view the requested Internet Resource" border="0" name="view"></a><br>');
				newSite.document.write('</div></div></body></html>');
				newSite.document.close();
			}	
	}
}


function SendMeSummary(file)
{
vwidth = 1024;
vheight = 800;
sWidth = screen.width;
tWidth = (sWidth/2);
hWidth = (vwidth/2);
uWidth = (tWidth-hWidth);

localSite=window.open(file,"Summary","toolbar=yes,location=no,directories=no,status=no,scrollbars=yes,menubar=yes,resizable=yes,width=" + vwidth + ",height=" + vheight + ",left=" + uWidth + ",top=0");
}



function showDefLong(vDef)
{
	
vwidth = 652;
vheight = 435; 	
sWidth = screen.width;
tWidth = (sWidth/2);
hWidth = (vwidth/2);
uWidth = (tWidth-hWidth);

	Hintwin=window.open("","detail","toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=yes,width=" + vwidth + ",height=" + vheight + ",left=" + uWidth + ",top=50");
	if (Hintwin != null)
	{
		if (Hintwin.opener == null) {Hintwin.opener = window};

		
		FeedBackText = ''

		FeedBackText = FeedBackText + '<!DOCTYPE HTML><html xmlns="http://www.w3.org/1999/xhtml" lang="en"><!-- InstanceBegin template="/Templates/FrameSet.dwt" codeOutsideHTMLIsLocked="false" --> <head><meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><link href="css/style.css" rel="stylesheet" type="text/css" media="screen" /><title>Details</title></head>';
		FeedBackText = FeedBackText + '<body onload="self.focus()" class="popUpPage"><a name="top"></a>';
		FeedBackText = FeedBackText + '<div class="skip_nav"><a href="#content" class="skipnav" title="Skip to content">Skip to content</a></div>';
		FeedBackText = FeedBackText + '<div id="maincontent"><div class="header"><div class="sealAndLogo"><img src="images/dhsSeal.png" alt="Department of Homeland Security Seal" /><img src="images/femaLogo.png" alt="FEMA Logo; Federal Emergency Management Agency" class="femaLogo" /></div><div class="innerHead"><h1 id="headText">Details</h1></div><div class="rightNav"><a href="javascript:window.close()"><img src="images/close.png" alt="Close" /></a></div></div><!-- end #header -->	</div></div><div style="padding: 10px;">';
		FeedBackText = FeedBackText + '<p>' + vDef + '</p>';
		FeedBackText = FeedBackText + '</div></body></html>';
	
	
		Hintwin.document.write(FeedBackText);
		Hintwin.document.close();
	}	
}


//this is for sound only flash files


function getFlashMovieObject(movieName)
{
  if (window.document[movieName]) 
  {
    return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1)
  {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName]; 
  }
  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
  {
    return document.getElementById(movieName);
  }
}

function StopFlashMovie(vID)
{
	var flashMovie=getFlashMovieObject(vID);
	flashMovie.StopPlay();
}

function PlayFlashMovie(vID)
{
	var flashMovie=getFlashMovieObject(vID);
	flashMovie.Play();
	//embed.nativeProperty.anotherNativeMethod();
}


function RewindFlashMovie(vID)
{
	var flashMovie=getFlashMovieObject(vID);
	flashMovie.Rewind();
}

function NextFrameFlashMovie(vID)
{
	var flashMovie=getFlashMovieObject(vID);
	// 4 is the index of the property for _currentFrame
	var currentFrame=flashMovie.TGetProperty("/", 4);
	var nextFrame=parseInt(currentFrame);
	if (nextFrame>=10)
		nextFrame=0;
	flashMovie.GotoFrame(nextFrame);		
}

function LoadSoundFile(vSound,vID) 
{
	//alert('loading');
	document.write(
	'<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" ' + '\n' +
		'codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0\" ' + '\n' +
		'width=\"1\" ' + '\n' +
		'height=\"1\"' + '\n' +
		'ID=\"' + vID + '\" ' + '\n' +
		'NAME=\"audioMovie\">' + '\n' +
		'<PARAM NAME=\"FrameNum\" VALUE=\"1\">' + '\n' +
		'<PARAM NAME=\"quality\" VALUE=\"high\">' + '\n' +
		'<PARAM NAME=\"playing\" VALUE=\"false\">' + '\n' +
		'<PARAM NAME=\"LOOP\" VALUE=\"false\">' + '\n' +
		'<PARAM NAME=\"movie\" VALUE=\"' + vSound + '\">' + '\n' +
		'<embed src=\"' + vSound + '\" ' + '\n' +
		'quality=high pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" ' + '\n' +
		'type=\"application/x-shockwave-flash\" ' + '\n' +
		'width=\"1\" ' + '\n' +
		'height=\"1\" ' + '\n' +
		'PLAY=\"false\" ' + '\n' +
		'name=\"' + vID + '\" ' + '\n' +
		'loop=\"false\" ' + '\n' +
		'swliveconnect=\"true\">' + '\n' +
		'</embed> ' + '\n' +
	  '</object>' + '\n'
			); 
}


//Listeners, etc on page load//
$(document).ready(function () {
			
	$(".rightNav a img").mouseover(function() {
		var currSrc = $(this).attr("src");
		if (currSrc.indexOf("Hover") < 0)
		{
			currSrc = currSrc.replace(".png", "Hover.png");
		}
		
		$(this).attr("src", currSrc);
	});
	$(".rightNav a img").mouseout(function() {
		var currSrc = $(this).attr("src");
		if (currSrc.indexOf("Hover") >= 0)
		{
			currSrc = currSrc.replace("Hover", "");
		}
		$(this).attr("src", currSrc);
	});
});

function appendFeedbackParts(attempt, tries, resp) {
    $('#feedbackDiv').prepend('<div id="feedbackClose"><a href="#" onclick="Navigate();"><img src="images/closesmall.png" alt="Close Feedback Dialog" /></a></div>');
    if (attempt == tries || resp == "Correct")
        $('#feedbackDiv').append('<p align=center  style="margin-top:10px;"><a href="#" onclick="Navigate();"><img src="images/continue.png" alt="Continue"border=0 name="continue"></a></p>');
}

function appendFeedbackPartsNoCheck() {
    $('#feedbackDiv').prepend('<div id="feedbackClose"><a href="#" onclick="Navigate();"><img src="images/closesmall.png" alt="Close Feedback Dialog" /></a></div>');
    $('#feedbackDiv').append('<p align=center  style="margin-top:10px;"><a href="#" onclick="Navigate();"><img src="images/continue.png" alt="Continue"border=0 name="continue"></a></p>');
}

function revealContent(textString)
	{
		$("#revealedContent").html(textString);
	}
	
function showExamPage()
{
	var myLocation = self.location + 'aa';
	if(myLocation.indexOf("kc.fema.net") > -1)
	{
		$("#internal").css("display", "block");
	}
	else
	{
		$("#examLink").attr("href", "http://training.fema.gov/IS/examnotice.aspx?eid=IS"+CourseISnumber);
		$("#external").css("display", "block");
	}
}


///////////////////////////////////////////
// VERSION CONTROL 3PnyetWwHkDL2W3kqNUe //
/////////////////////////////////////////