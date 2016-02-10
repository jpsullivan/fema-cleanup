if(debug == 'true' || parent.ISDBSenrolled == 1)
	{setNextActive()}
else
    { setNextDim() }

setNextActive();

if(typeof vWindowSize == "undefined")//does this variable exist?
	{vWindowSize = 1;}


function ScoreMe()
{
//myResponse = PreviewStringReplace(document.form1.response.value);

Clicked()
}


var Progress = "1" ;

function Clicked()
{

			if (Progress == "1")
			{WindowSize=vWindowSize; DisplayFeedback(Feedback)}
			if (Progress == "2")
			{self.location = NextPage}
			if (Progress == "3")
			{parent.location = NextPage}

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


function DisplayFeedback(Feedback)
{
		
		vheight = 465;
		vwidth = 757;
		swidth = screen.width;
		twidth = (swidth/2);
		hwidth = (vwidth/2);
		uwidth = (twidth-hwidth);
		
			
	FBwin=window.open("","Feedback2","toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=no,width=" + vwidth + ",height=" + vheight + ",left=" + uwidth + ",top=25");
	if (FBwin != null)
	{
	if (FBwin.opener == null) {FBwin.opener = window};
		FeedBackText = ''


		
		FeedBackText = FeedBackText + '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en">';
		FeedBackText = FeedBackText + '<head><title>FEMA Emergency Management Institute</title><meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />';
		FeedBackText = FeedBackText + '<link href="styles/extra.css" rel="stylesheet" type="text/css" media="screen" /><link href="styles/extraPrint.css" rel="stylesheet" type="text/css" media="print" /></head>';
		FeedBackText = FeedBackText + '<body onload="self.focus()" ><div id="maincontent" ><div id="header">';
		FeedBackText = FeedBackText + '<img src="images/extra_01.jpg" width="642" height="45" alt="Department of Homeland Security seal" class="noPrint" />';
		FeedBackText = FeedBackText + '<a href="javascript:self.print()" onmouseover="document.img2.src=\'images/extraHi_02.jpg\';" onmouseout="document.img2.src=\'images/extra_02.jpg\';"><img src="images/extra_02.jpg" width="40" height="45" alt="Print" title="Print" border="0" name="img2" class="noPrint" /></a>';
		FeedBackText = FeedBackText + '<a href="javascript:opener.Navigate();self.close()" onmouseover="document.img3.src=\'images/extraHi_03.jpg\';" onmouseout="document.img3.src=\'images/extra_03.jpg\';"><img src="images/extra_03.jpg" width="58" height="45" alt="Close" title="Close" border="0" name="img3" class="noPrint" /></a>';
		FeedBackText = FeedBackText + '<img src="images/extra_04.jpg" width="740" height="52" alt="collage of emergency responders" class="noPrint" />';
		FeedBackText = FeedBackText + '<div id="PageTitle"><span class="heading1">';
		FeedBackText = FeedBackText + FBheader;
		FeedBackText = FeedBackText + '</span></div></div>	<div id="box1"><div id="wrapper"><div id="content" align="left">';
		FeedBackText = FeedBackText + Feedback;
		FeedBackText = FeedBackText + '<br><a href="javascript:opener.Navigate();self.close()" onmouseover="document.closewindow.src=\'images/CloseWindowHi.gif\';" onmouseout="document.closewindow.src=\'images/CloseWindow.gif\';"><img src="images/CloseWindow.gif" alt="Close Window" width="137" height="32" border="0" name="closewindow" style="float:right" /></a></div></div></div></div>';
		FeedBackText = FeedBackText + '</body></html>';
		
		
		
		
		FBwin.document.write(FeedBackText);
		FBwin.document.close();
	}	
}



