//to fetch the string from local storage on open of the popup.html
(function () {
    console.log('fetching');
    var string = localStorage.getItem('savedContent');
    var parsedString = JSON.parse(string);
    document.querySelector('textarea').value = parsedString;
    var title = localStorage.getItem('savedTitle');
    if (title != null) {

        document.querySelector(".title").innerHTML = `<h1 contenteditable="true",class="title">${title}</h1>`;
    }
}
)();

//to save the string in local storage
document.querySelector(".save").addEventListener('click', saveContent);

//to delete the string from the local storage
document.querySelector(".delete").addEventListener('click', deleteContent);

//export to doc
document.querySelector('.export').addEventListener('click', exportContent);
function exportContent() {
    // first save then export
    saveContent();
    // export
    var string = localStorage.getItem('savedContent');
    var parsedString = JSON.parse(string);
    var title=localStorage.getItem('savedTitle');
    var parsedTitle=JSON.parse(title);
    
    //add br in place of /n in string
    var finalHtml=`
    <html>
        <body>
            <h1>${encodeURIComponent(parsedTitle.replaceAll('\n','<br>'))}</h1>
            <p>${encodeURIComponent(parsedString.replaceAll('\n','<br>'))}</p>
        </body>
    </html>`

    
    var source = 'data:application/vnd.ms-word;charset=utf-8,' +finalHtml;
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
    deleteContent();
}

//save function
function saveContent() {
    var content = document.querySelector("textarea").value;
    stringfiedContent = JSON.stringify(content);
    localStorage.setItem('savedContent', stringfiedContent);
    var title = document.querySelector(".title").textContent;
    stringfiedTitle = JSON.stringify(title);
    localStorage.setItem('savedTitle', stringfiedTitle);
}

//delete function
function deleteContent() {
    localStorage.removeItem('savedContent');
    localStorage.removeItem('savedTitle');
    document.querySelector(".title").innerHTML = `<h1 contenteditable="true",class="title">Title</h1>`;
    document.querySelector('textarea').value = '';
}
