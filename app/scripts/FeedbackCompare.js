if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
	{setNextDim()}

setNextActive();

function ScoreMe()
{
myResponse = PreviewStringReplace(document.form1.response.value);

Clicked()
}


var Progress = "1" ;

function Clicked()
{
	if (document.form1.response.value == "" || document.form1.response.value == "Type your answer in this area.")
		{alert("\nYou need to answer the question to continue.")}
	else
		{
			if (Progress == "1")
			{DisplayFeedback(Feedback)}
			if (Progress == "2")
			{self.location = NextPage}
			if (Progress == "3")
			{parent.location = NextPage}
		}	
}

function Navigate()
{
    //parent.goToNextPage()
    goToNextPage();
}


function PreviewStringReplace(uglyString)
{
	var PrettyString = escape(uglyString)
	
	var PrettyString = PrettyString.replace(/%20/g," ","ALL");
	var PrettyString = PrettyString.replace(/%0D%0A/g,"<br>","ALL");	
	var PrettyString = PrettyString.replace(/%21/g,"!","ALL");
	var PrettyString = PrettyString.replace(/%23/g,"#","ALL");
	var PrettyString = PrettyString.replace(/%24/g,"$","ALL");
	var PrettyString = PrettyString.replace(/%25/g,"%","ALL");
	var PrettyString = PrettyString.replace(/%26/g,"&","ALL");
	var PrettyString = PrettyString.replace(/%27/g,"'","ALL");
	var PrettyString = PrettyString.replace(/%28/g,"(","ALL");
	var PrettyString = PrettyString.replace(/%29/g,")","ALL");
	var PrettyString = PrettyString.replace(/%2C/g,",","ALL");
	var PrettyString = PrettyString.replace(/%3A/g,":","ALL");
	var PrettyString = PrettyString.replace(/%3B/g,";","ALL");
	var PrettyString = PrettyString.replace(/%3C/g,"<","ALL");	
	var PrettyString = PrettyString.replace(/%3D/g,"=","ALL");
	var PrettyString = PrettyString.replace(/%3E/g,">","ALL");	
	var PrettyString = PrettyString.replace(/%3F/g,"?","ALL");
	var PrettyString = PrettyString.replace(/%5B/g,"[","ALL");
	var PrettyString = PrettyString.replace(/%5C/g,"/","ALL");
	var PrettyString = PrettyString.replace(/%5D/g,"]","ALL");
	var PrettyString = PrettyString.replace(/%22/g,"&quot;","ALL");
	var PrettyString = PrettyString.replace(/%u201C/g,"&quot;","ALL");
	var PrettyString = PrettyString.replace(/%u201D/g,"&quot;","ALL");
	var PrettyString = PrettyString.replace(/%u2014/g,"-","ALL");
	var PrettyString = PrettyString.replace(/%u2013/g,"-","ALL");
	var PrettyString = PrettyString.replace(/%u2019/g,"'","ALL");
	return PrettyString
}


function DisplayFeedback()
{
	//document.getElementById('maincontent').style.display = 'none';
	document.getElementById('feedbackDiv').style.display = 'block';	
	document.getElementById('feedbackDiv').focus();	
		
		
		setNextActive()
		FeedBackText = ''

		
		//FeedBackText = FeedBackText + '<table width="635" height="43" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td><img src="images/feedbackHeader.png" width="635" height="66" alt="Feedback" /></td></tr></table>';
		FeedBackText = FeedBackText + '<div id="FBtext" style="background-color:#FFFFFF; overflow:auto; padding:0px;" >';
		
		//if ((vAttempt == vTriesAllowed  && Response == "Incorrect") || Response == "Correct"){FeedBackText = FeedBackText + '<p>' + Answer + '</p>'; }
		
		FeedBackText = FeedBackText + '<p class=instruction>';
		FeedBackText = FeedBackText + FBheader;
		FeedBackText = FeedBackText + '</p>';
		FeedBackText = FeedBackText + Feedback;
		
		//FeedBackText = FeedBackText + '<p align=center  style="margin-top:10px;"><a href="#" onclick="Navigate();" onmouseover="document.tryagain.src=\'images/tryAgainHi.gif\';" onmousedown="document.tryagain.src=\'images/tryAgainDn.gif\';" onmouseout="document.tryagain.src=\'images/tryAgain.gif\';"><img src="images/tryAgain.gif" alt="Try Again" title="Try Again" border=0 name="tryagain"></a>';}
		//FeedBackText = FeedBackText + '<table width="635" height="45" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td align=center valign=bottom><a href="#" onclick="Navigate();" onmouseover="document.closeme1.src=\'images/buttonContinueHi.png\';" onmouseout="document.closeme1.src=\'images/buttonContinue.png\';"><img src="images/buttonContinue.png" width="136" height="35" alt="Continue"  border="0" name="closeme1"/></a></td></tr></table>';
		
	
		document.getElementById('feedbackDiv').innerHTML = FeedBackText;
		appendFeedbackPartsNoCheck();
}

