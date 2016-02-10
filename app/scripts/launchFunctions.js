
function resizeOnLoad()
{
	if(screen.width > 1023)
		{		
			vwidth = 1024;
			vheight = 750;
			sWidth = screen.width;
			tWidth = (sWidth/2);
			hWidth = (vwidth/2);
			uWidth = (tWidth-hWidth);
			top.moveTo(uWidth, 0);
			top.resizeTo(vwidth,vheight);
		}
	else	
		{	
			vwidth = 800;
			vheight = 600;
			sWidth = screen.width;
			tWidth = (sWidth/2);
			hWidth = (vwidth/2);
			uWidth = (tWidth-hWidth);
			top.moveTo(uWidth, 0);
			top.resizeTo(vwidth,vheight);
		}
}



		var ISDBSstudentID, ISDBSlessonID, ISDBScompletionURL, ISDBSenrolled, ISDBSbookmark, ISDBSbookmarkURL, ISDBSpagelevelBM;
		
		var searchString = document.location.search;
				
		// strip off the leading '?'
		searchString = searchString.substring(1);
		
		var nvPairs = searchString.split("&");
		
		for (i = 0; i < nvPairs.length; i++)
		{
			 var nvPair = nvPairs[i].split("=");
			 var varName = nvPair[0];
			 var value = nvPair[1];
			 //alert('the student ID is: ' + varName + ' and the value is: ' + value) 
			 
			 // if the displayMethod is SCORM, it will already be set to SCORM
			 if(displayMethod == 'null')
				{
				 if(varName == 'studentID')
					{displayMethod = 'ISDBS'}
				else	
					{displayMethod = 'standalone'}
				}		
		
			 if(displayMethod == 'ISDBS')
				{
						if(varName == 'studentID')			{ISDBSstudentID = value} //numeric value
						if(varName == 'lessonID')			{ISDBSlessonID = value} //numeric value
						if(varName == 'completionURL')	{ISDBScompletionURL = value} //string value
						if(varName == 'enrolled')				{ISDBSenrolled = value} // 0=browse, 1=credit
						if(varName == 'bookmark')			{ISDBSbookmark = value} //string value
						if(varName == 'bookmarkURL')	{ISDBSbookmarkURL = value} //string value
						if(varName == 'pagelevelBM')		{ISDBSpagelevelBM = value}// 0=off, 1=on			
				}		
		}
	
//alert(completionURL)