var myDialog;
var strWindowFeatures = "height=768, width=1024";
//$(document).ready(function() {
function changeHrefVals() {
    $('a:not([href*="fema.gov"])[href^="http"]').each(function () {
        $(this).attr('href', 'javascript:openDialog("' + $(this).attr("href") + '")');
        myDialog = $("#dialog-confirm").dialog({
            autoOpen: false,
            resizable: true,
            height: 410,
            width: 768,
            modal: true,
            dialogClass: "outerDialog"
        });
    });
    $("a").attr("onclick", "");
    $('a[href*="fema.gov"][href^="http"]').each(function () {
        $(this).attr('href', 'javascript:window.open("' + $(this).attr("href") + '", "goodByePage",' + strWindowFeatures + '); void(0);');
    });
}
//});

function openDialog(url) {
    $("#dialog-confirm").html("");
    var dialogText = '<div id="tempDialog">'
    dialogText += '<p>You are now exiting the FEMA/Emergency Management Institute’s (EMI) web site and entering the site: '
    dialogText += url
    dialogText += '</p>'
    dialogText += '<p>We have provided a link to this site because it has information that may be of interest to our viewers.</p>'
    dialogText += '<ul>'
    dialogText += '	<li>FEMA/EMI does not necessarily endorse the views expressed or the facts presented on this site.</li>'
    dialogText += '	<li>FEMA/EMI does not endorse any commercial products that may be advertised or on this site.</li>'
    dialogText += '	<li>The FEMA/EMI Privacy Policy does not apply on this site.  Please check the site for its Privacy Notice.</li>'
    dialogText += ' <li>The FEMA/EMI Section 508 Policy does not apply on this site. Please check the site for its Section 508 Policy.</li>'
    dialogText += '</ul>'
    dialogText += '<p>When you\'re finished viewing the resource, close the window by clicking on the little X in the upper right-hand corner of the window.</p>'
    dialogText += '<p><a href="javascript:openResource(\'' + url + '\')"><img alt="Click on this button to view the requested Internet Resource" src="images/externalResource.gif"></a></p>'
    dialogText += '</div>'

    $(dialogText).appendTo("#dialog-confirm");

    myDialog.dialog("open");
}

function openResource(resURL) {
    $("#tempDialog").remove();
    $(myDialog).dialog("close");
    window.open(resURL, "goodByePage", strWindowFeatures);
}

function closeResource(resURL) {
    $("#tempDialog").remove();
    $(myDialog).dialog("close");
}

function SendMeLocalFile(file) {
    vwidth = 757;
    vheight = 560;
    sWidth = screen.width;
    tWidth = (sWidth / 2);
    hWidth = (vwidth / 2);
    uWidth = (tWidth - hWidth);

    localSite = window.open(file, "LocalPage", "toolbar=yes,location=no,directories=no,status=no,scrollbars=yes,menubar=yes,resizable=yes,width=" + vwidth + ",height=" + vheight + ",left=" + uWidth + ",top=0");
}