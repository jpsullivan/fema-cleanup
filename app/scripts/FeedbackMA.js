if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
	{setNextDim()}

setNextActive();


function showCorrect()
{
	if(KCcheat == 'true')
		{
			var form = document.form1
			for (i = 0; i < form.Quiz.length; i++) 
				{
					form.elements[i].value = vCorrectAnswer.charAt(i);
				}
		}
}


var vAttempt = 1;

function Clicked()
{	
		//alert('this is the attempts: ' + vAttempt + ' and here are the max allowed tries: ' +  vTriesAllowed)

	var form = document.form1
	var vAnswered = 0
	var vResponse = ""
	var vCorrectCount = 0
	
	//checks to see if the question has been attempted or not
	for (var i=0; i < form.Quiz.length; i++)  
		{
		
			
				if(form.Quiz[i].type == "checkbox")
					{if(form.Quiz[i].checked) {vAnswered = 1};vResponse = vResponse + form.Quiz[i].checked*1	}
				else	
					{if(form.Quiz[i].value != '') {vAnswered = 1};vResponse = vResponse + form.Quiz[i].value	}
			
			
			//alert(vResponse)
			
			
		}
		if (vResponse.length != vCorrectAnswer.length)			{alert("\nYou need to answer the question to continue.")}
		
	else //there is a response	
		{
			if (vAttempt < vTriesAllowed)
				{
				  //they got it right
				  if (vResponse == vCorrectAnswer) 
					{DisplayFeedback('Correct',Feedback); vAttempt = vTriesAllowed}
					
				  //they got it wrong, and it's not the last available try
				  if (vResponse != vCorrectAnswer && vAttempt <= vTriesAllowed)
			  		{
						//alert(vResponse);
							for (i = 0; i < form.Quiz.length; i++) 
							{
								if (vResponse.charAt(i) == vCorrectAnswer.charAt(i))
									{	
									//it's correct, do nothing but increment the vCorrectCount counter
									vCorrectCount = vCorrectCount + 1
									}
								 else
									{	
									//uncheck the incorrect ones
									form.Quiz[i].value = ''
									}
							
							}
							//tell them to try again and how many they got right
							if(vCorrectCount == 0)
								{DisplayFeedback('Incorrect','You did not answer any item correctly.  <p><strong>Please review the question and begin again.</strong> ')}
							else
								{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '</strong> of the items correctly.  Your wrong answers are erased to allow you to try again.</p> <p><strong>Please select Try Again and then select a new response for each "unanswered" item.  Remember, the remaining selected answers are correct! </strong>')}
							
					}		
					
				for (var i=0; i < document.form1.Quiz.length; i++) 
				{					
					 document.form1.Quiz[i].disabled=true;
				}
					
				 }
				 
				 
				  //they still got it wrong on their last try	
			else
				{
				  if (vResponse != vCorrectAnswer)		
				  	{
						//DisplayFeedback('Incorrect',Feedback)
						for (i = 0; i < form.Quiz.length; i++) 
							{
								if (vResponse.charAt(i) == vCorrectAnswer.charAt(i))
									{	
									//it's correct, do nothing but increment the vCorrectCount counter
									vCorrectCount = vCorrectCount + 1
									}
							
							}
						//tell them to try again and how many they got right
					if(vCorrectCount == 0)
						{DisplayFeedback('Incorrect','You did not answer any item correctly.   <p>' + Feedback)}
					else
						{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '  of the items correctly. </strong></p><p>' + Feedback)}
								
					
					
					}	
				  if (vResponse == vCorrectAnswer) 		{DisplayFeedback('Correct',Feedback)}
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