if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
	{setNextDim()}

setNextActive();

function showCorrect()
{
	
}

var vAttempt = 1;

function Clicked()
{	
		//alert('this is the attempts: ' + vAttempt + ' and here are the max allowed tries: ' +  vTriesAllowed)

	var form = document.form1
	var vAnswered = 0
	var vResponse = ""
	var vCorrectCount = 0
	var vNumOfColumns = form.Quiz1.length
	var vNumOfRows = form.length/vNumOfColumns
		
	//checks to see if the question has been attempted or not
	k = 0  //beginning number for loop
	m = (vNumOfColumns) //ending number for loop
	
	for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
		{
		//alert('here is row ' + i)
		vAnswer = 0
		vLoopCount = 1
		for (var j=k; j < m; j++)  
			{
				//alert(form.elements[j].checked)
				if(form.elements[j].checked) 
				{vAnswer = vLoopCount; vResponse = vResponse + vAnswer	}
				//vResponse = vResponse + form.elements[j].checked*1	
				vLoopCount = vLoopCount + 1
			}
			m = (m + vNumOfColumns) //set new ending number for loop
			k = (m - vNumOfColumns)  //set new beginning number for loop
		}
		
		//alert(vResponse)
		
	if (vResponse.length != vCorrectAnswer.length)		{alert("\nYou need to answer the question to continue.")}
		
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
							k = 0  //beginning number for loop
							m = (vNumOfColumns) //ending number for loop
							
							for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
								{
								//alert('here is row ' + i)
								vAnswer = 0
								vLoopCount = 1
								for (var j=k; j < m; j++)  
									{
										//alert(form.elements[j].checked)
										if(form.elements[j].checked && vResponse.charAt(i) == vCorrectAnswer.charAt(i)) 
										{vAnswer = vLoopCount; vResponse = vResponse + vAnswer; vCorrectCount = vCorrectCount + 1	}
										else
										{form.elements[j].checked=0}
										//vResponse = vResponse + form.elements[j].checked*1	
										vLoopCount = vLoopCount + 1
									}
									m = (m + vNumOfColumns) //set new ending number for loop
									k = (m - vNumOfColumns)  //set new beginning number for loop
								}
								
							//tell them to try again and how many they got right
							if(vCorrectCount == 0)
								{DisplayFeedback('Incorrect','There are no right or wrong answers. Compare your responses to the suggestions listed below. ')}
							else
								{DisplayFeedback('Incorrect','There are no right or wrong answers. Compare your responses to the suggestions listed below.')}
							
							
					}		
					
					//disable the radio buttons
					var form = document.form1
					var vAnswered = 0
					var vResponse = ""
					var vCorrectCount = 0
					var vNumOfColumns = form.Quiz1.length
					var vNumOfRows = form.length/vNumOfColumns						
					k = 0
					m = (vNumOfColumns)					
					for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
						{
						vAnswer = 0
						//vLoopCount = 1
						for (var j=k; j < m; j++)  
							{
								form.elements[j].disabled=true;						
								//vLoopCount = vLoopCount + 1
							}
							m = (m + vNumOfColumns) //set new ending number for loop
							k = (m - vNumOfColumns)  //set new beginning number for loop
						}
					
				 }
				 
				 
				  //they still got it wrong on their last try	
			else
				{
				  if (vResponse != vCorrectAnswer)		
				  	{
							k = 0  //beginning number for loop
							m = (vNumOfColumns) //ending number for loop
							
							for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
								{
								//alert('here is row ' + i)
								vAnswer = 0
								vLoopCount = 1
								for (var j=k; j < m; j++)  
									{
										//alert(form.elements[j].checked)
										if(form.elements[j].checked && vResponse.charAt(i) == vCorrectAnswer.charAt(i)) 
										{vAnswer = vLoopCount; vResponse = vResponse + vAnswer; vCorrectCount = vCorrectCount + 1	}
										else
										//{form.elements[j].checked=0}
										//vResponse = vResponse + form.elements[j].checked*1	
										vLoopCount = vLoopCount + 1
									}
									m = (m + vNumOfColumns) //set new ending number for loop
									k = (m - vNumOfColumns)  //set new beginning number for loop
								}
								
						//tell them to try again and how many they got right
					if(vCorrectCount == 0)
						{DisplayFeedback('Incorrect','<p>' + Feedback)}
					else
						{DisplayFeedback('Incorrect','<p>' + Feedback)}
								
					
					
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
				
					//enable the radio buttons
					var form = document.form1
					var vAnswered = 0
					var vResponse = ""
					var vCorrectCount = 0
					var vNumOfColumns = form.Quiz1.length
					var vNumOfRows = form.length/vNumOfColumns						
					k = 0
					m = (vNumOfColumns)					
					for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
						{
						vAnswer = 0
						vLoopCount = 1
						for (var j=k; j < m; j++)  
							{
								 form.elements[j].disabled=false;								
								vLoopCount = vLoopCount + 1
							}
							m = (m + vNumOfColumns) //set new ending number for loop
							k = (m - vNumOfColumns)  //set new beginning number for loop
						}
		}
}


function DisplayFeedback(Response,Feedback)
{
	//document.getElementById('maincontent').style.display = 'none';
	document.getElementById('feedbackDiv').style.display = 'block';	
	document.getElementById('feedbackDiv').focus();	
		
		
	if(Response == "Correct") {Answer = 'There are no right or wrong answers. Compare your responses to the suggestions listed below.  When you are ready to proceed, select the Next button.'}; //<img src="images/NextBtn.jpg" alt="">
	if(Response == "Incorrect") {Answer = 'There are no right or wrong answers. Compare your responses to the suggestions listed below. When you are ready to proceed, select the Next button.'};
		
		FeedBackText = ''

		
		//FeedBackText = FeedBackText + '<table width="635" height="43" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td><img src="images/feedbackHeader.png" width="635" height="66" alt="Feedback" /></td></tr></table>';
		FeedBackText = FeedBackText + '<div id="FBtext" style="background-color:#FFFFFF; overflow:auto; padding:0px;" >';
		
		if ((vAttempt == vTriesAllowed  && Response == "Incorrect") || Response == "Correct"){FeedBackText = FeedBackText + '<p>' + Answer + '</p>'; setNextActive()}
		
		FeedBackText = FeedBackText + '<p>';
		FeedBackText = FeedBackText + Feedback;
		FeedBackText = FeedBackText + '</p></div>';
		
		if ((vAttempt != vTriesAllowed  && Response == "Incorrect"))
			{FeedBackText = FeedBackText + '<p align=center  style="margin-top:10px;"><a href="#" onclick="Navigate();" onmouseover="document.tryagain.src=\'images/tryAgainHi.gif\';" onmousedown="document.tryagain.src=\'images/tryAgainDn.gif\';" onmouseout="document.tryagain.src=\'images/tryAgain.gif\';"><img src="images/tryAgain.gif" alt="Try Again" title="Try Again" border=0 name="tryagain"></a>';}
		//FeedBackText = FeedBackText + '<table width="635" height="45" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td align=center valign=bottom><a href="#" onclick="Navigate();" onmouseover="document.closeme1.src=\'images/buttonContinueHi.png\';" onmouseout="document.closeme1.src=\'images/buttonContinue.png\';"><img src="images/buttonContinue.png" width="136" height="35" alt="Continue"  border="0" name="closeme1"/></a></td></tr></table>';
		
	
		document.getElementById('feedbackDiv').innerHTML=FeedBackText;
		appendFeedbackParts(vAttempt, vTriesAllowed, Response);
		Feedback = "";
}

