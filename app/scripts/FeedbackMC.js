if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
	{setNextDim()}

setNextActive();

function showCorrect()
{
	if(KCcheat == 'true')
		{
			vShowID = (vCorrectAnswer -1);	
			document.form1.Quiz[vShowID].style.backgroundColor = '#F8F7C7';
		}
}

var vAttempt = 1;

function Clicked()
{	
	var form = document.form1
	var vResponse = ""
	
	//returns the checked item
	for (var i=0; i < form.Quiz.length; i++) 
		{
			if(form.Quiz[i].checked) 
				{
 				vResponse = form.Quiz[i].value;
				}
		}
		
		if (vResponse=="")			
			{alert("\nYou need to answer the question to continue.")}
		else
			{
					if (vAttempt < vTriesAllowed)
						{
						 //they got it right
						 if (vResponse == vCorrectAnswer) 
							{DisplayFeedback('Correct',Feedback); vAttempt = vTriesAllowed}
							
						 //they got it wrong, and it's not the last available try
						 if (vResponse != vCorrectAnswer && vAttempt <= vTriesAllowed)
							{
									//tell them to try again
									{DisplayFeedback('Incorrect',FeedbackWrong)}
							}		
						 }
						 
						 //they still got it wrong on their last try	
					else
						{
						 if (vResponse != vCorrectAnswer)		
							{
								//tell them the correct answer
								{DisplayFeedback('Incorrect',Feedback)}
							}	
						 if (vResponse == vCorrectAnswer) 		{DisplayFeedback('Correct',Feedback)}
						}	
				
					//make the unchecked items unavailable
					for (var i=0; i < form.Quiz.length; i++) 
					{
						if(!form.Quiz[i].checked) 
							{
							   form.Quiz[i].disabled=true;
							}
					}
			}
				
			
}

function Navigate()
{
	
	if (vAttempt == vTriesAllowed)
		{
	    //parent.goToNextPage();	
	    goToNextPage();
		}		
	if (vAttempt < vTriesAllowed)
		{
			document.getElementById('feedbackDiv').style.display = 'none';
			//document.getElementById('maincontent').style.display = 'block';	
			document.getElementById('content').focus();	
			//vTriesAllowed = vTriesAllowed - 1; 
			//document.getElementById('tries').innerHTML = " (Tries remaining: " + vTriesAllowed + ")"
			
				//make the unchecked items unavailable
			vTriesAllowed = vTriesAllowed - 1; 
				
				for (var i=0; i < document.form1.Quiz.length; i++) 
				{					
					 document.form1.Quiz[i].disabled=false;
				}
		}
}



function DisplayFeedback(Response,Feedback)
{
	//document.getElementById('maincontent').style.display = 'none';
	document.getElementById('feedbackDiv').style.display = 'block';	
	document.getElementById('feedbackDiv').focus();	
		
		
	if(Response == "Correct") {Answer = '<span style="color:#6e9017; font-weight:bold;">Correct.</span> Review the feedback below.  When you are ready to proceed, select the Next button.'}; //<img src="images/NextBtn.jpg" alt="">
	if(Response == "Incorrect") {Answer = '<span style="font-weight:bold;">Incorrect.</span> Review the feedback below.  When you are ready to proceed, select the Next button.'};
		
		FeedBackText = ''

		
		//FeedBackText = FeedBackText + '<table width="635" height="43" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td><img src="images/feedbackHeader.png" width="635" height="66" alt="Feedback" /></td></tr></table>';
		FeedBackText = FeedBackText + '<div id="FBtext" style="background-color:#FFFFFF; overflow:auto; padding:0px;" >';
		
		if ((vAttempt == vTriesAllowed  && Response == "Incorrect") || Response == "Correct"){FeedBackText = FeedBackText + '<p>' + Answer + '</p>'; setNextActive()}
		
		FeedBackText = FeedBackText + '<p>';
		FeedBackText = FeedBackText + Feedback;
		FeedBackText = FeedBackText + '</p></div>';
		
		if ((vAttempt != vTriesAllowed  && Response == "Incorrect"))
			{FeedBackText = FeedBackText + '<p align=center style="margin-top:10px;"><a href="#" onclick="Navigate();" onmouseover="document.tryagain.src=\'images/tryAgainHi.gif\';" onmousedown="document.tryagain.src=\'images/tryAgainDn.gif\';" onmouseout="document.tryagain.src=\'images/tryAgain.gif\';"><img src="images/tryAgain.gif" alt="Try Again" title="Try Again" border=0 name="tryagain"></a>';}
		//FeedBackText = FeedBackText + '<table width="635" height="45" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td align=center valign=bottom><a href="#" onclick="Navigate();" onmouseover="document.closeme1.src=\'images/buttonContinueHi.png\';" onmouseout="document.closeme1.src=\'images/buttonContinue.png\';"><img src="images/buttonContinue.png" width="136" height="35" alt="Continue"  border="0" name="closeme1"/></a></td></tr></table>';
		
	
		document.getElementById('feedbackDiv').innerHTML = FeedBackText;
		appendFeedbackParts(vAttempt, vTriesAllowed, Response);
}


