if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
{ setNextDim() }

setNextActive();



function showCorrect()
{
	if(KCcheat == 'true')
		{
			
			var form = document.form1
			var vAnswered = 0
			var vResponse = ""
			var vCorrectCount = 0
			var vNumOfColumns = form.Quiz1.length
			var vNumOfRows = form.length/vNumOfColumns
				
			//highlights the correct answers
			k = 0  //beginning number for loop
			m = (vNumOfColumns) //ending number for loop
			
			for (var i=0; i < vNumOfRows; i++)  //this should count from 1 to 3 for each row
				{
				vAnswer = 0
				vLoopCount = 1
				for (var j=k; j < m; j++)  
					{
						if(form.elements[j].value == vCorrectAnswer.charAt(i)) 
						{form.elements[j].style.backgroundColor = '#F8F7C7'; vAnswer = vLoopCount; vResponse = vResponse + vAnswer; vCorrectCount = vCorrectCount + 1	}
						else
						{}
						vLoopCount = vLoopCount + 1
					}
					m = (m + vNumOfColumns) //set new ending number for loop
					k = (m - vNumOfColumns)  //set new beginning number for loop
				}
		
		}
}

var vAttempt = 1;

function Clicked()
{
var vResponse = "";
var vCorrectCount = 0;
	var $questions = $(".questionSet");
	//Check to see if at least 1 radio button is checked in each set
	if($questions.find("input:radio:checked").length === $questions.length) {
		//At least 1 per question is checked, so validate the answer.
		var radioGroups = ($questions.find("input:radio"));
		$('input:radio:checked').each(function() {
			var currRadio = $(this);
			vResponse+=currRadio.val();
		});
		
		//Determine if response matches
		if (vAttempt <= vTriesAllowed)
				{
				  //they got it right
				  if (vResponse == vCorrectAnswer) 
					{DisplayFeedback('Correct',Feedback); vAttempt = vTriesAllowed}
					
				  //they got it wrong, and it's not the last available try
				  if (vResponse != vCorrectAnswer && vAttempt <= vTriesAllowed)
				  {
					//erase incorrect answers, then allow them to try again.
					//Split the correct answers into a string array
					var corrArr = vCorrectAnswer.split('');
					var currArrPos = 0;
					$('input:radio:checked').each(function() {
						var currRadio = $(this);
						if(currRadio.val()+'' != corrArr[currArrPos])
						{
							currRadio.prop('checked', false);
						}
						else 
						{
							vCorrectCount++;
						}
						currArrPos++;
					});
					//Display Feedback based on number correct
					if(vCorrectCount == 0)
								{DisplayFeedback('Incorrect','You did not answer any item correctly.  <p><strong>Please review the question and begin again.</strong> ')}
					else if (vAttempt == vTriesAllowed)
						{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '  of the items correctly. </strong></p><p>' + Feedback)}
					else
						{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '</strong> of the items correctly.  Your wrong answers are erased to allow you to try again.</p> <p><strong>Please select Try Again and then select a new response for each "unanswered" item.  Remember, the remaining selected answers are correct! </strong>')}
							
					
				  }
				}
	}
	else
	{
		alert("\nYou need to answer the question to continue.");
	}

}


/*function Clicked()
{	
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
				alert(form.elements[j].checked)
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
								{DisplayFeedback('Incorrect','You did not answer any item correctly.  <p><strong>Please review the question and begin again.</strong> ')}
							else
								{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '</strong> of the items correctly.  Your wrong answers are erased to allow you to try again.</p> <p><strong>Please select Try Again and then select a new response for each "unanswered" item.  Remember, the remaining selected answers are correct! </strong>')}
							
							
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
						{DisplayFeedback('Incorrect','You did not answer any item correctly.   <p>' + Feedback)}
					else
						{DisplayFeedback('Incorrect','You answered ' + vCorrectCount + '  of the items correctly. </strong></p><p>' + Feedback)}
								
					
					
					}	
				  if (vResponse == vCorrectAnswer) 		{DisplayFeedback('Correct',Feedback)}
				}	
					
					
		}	
}
*/

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
    //$('#feedbackDiv').dialog();
		
		
	if(Response == "Correct") {Answer = '<span style="color:#6e9017; font-weight:bold;">Correct.</span> Review the feedback below.  When you are ready to proceed, select the Next button.'}; //<img src="images/NextBtn.jpg" alt="">
	if(Response == "Incorrect") {Answer = '<span style="font-weight:bold;">Incorrect.</span> Review the feedback below.  When you are ready to proceed, select the Next button.'};
		
		FeedBackText = ''

		
		//FeedBackText = FeedBackText + '<table width="635" height="43" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td><img src="images/feedbackHeader.png" width="635" height="66" alt="Feedback" /></td></tr></table>';
		FeedBackText = FeedBackText + '<div id="FBtext" style="background-color:#FFFFFF; overflow:auto; padding:0px;" >';
		
		if ((vAttempt == vTriesAllowed && Response == "Incorrect") || Response == "Correct") { FeedBackText = FeedBackText + '<p>' + Answer + '</p>'; setNextActive() }
		
		FeedBackText = FeedBackText + '<p>';
		FeedBackText = FeedBackText + Feedback;
		FeedBackText = FeedBackText + '</p></div>';
		
		if ((vAttempt != vTriesAllowed  && Response == "Incorrect"))
			{FeedBackText = FeedBackText + '<p align=center  style="margin-top:10px;"><a href="#" onclick="Navigate();"><img src="images/tryAgain.gif" alt="Try Again" title="Try Again" border=0 name="tryagain"></a>';}
		//FeedBackText = FeedBackText + '<table width="635" height="45" border="0" cellpadding="0" cellspacing="0" style=" background-color:#FFFFFF;"><tr class="noPrint"><td align=center valign=bottom><a href="#" onclick="Navigate();" onmouseover="document.closeme1.src=\'images/buttonContinueHi.png\';" onmouseout="document.closeme1.src=\'images/buttonContinue.png\';"><img src="images/buttonContinue.png" width="136" height="35" alt="Continue"  border="0" name="closeme1"/></a></td></tr></table>';
		
	
		document.getElementById('feedbackDiv').innerHTML = FeedBackText;
		appendFeedbackParts(vAttempt, vTriesAllowed, Response);
        

}



