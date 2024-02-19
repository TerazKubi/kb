const mainContainer = document.querySelector(".main-container")
const output = document.querySelector(".output")
const button = document.querySelector("#btn")
const textArea = document.querySelector("#default")
const addNoteButton = document.querySelector("#addButton")
const newNoteContainer = document.querySelector(".blackBg")

window.onload = async ()=>{
    // await initTextArea()
    
    const data = await fetchData()
    displayData(data.data)
    // console.log(window.innerWidth)

    
}


function initTextArea(){
    return new Promise((res, rej) => {
        tinymce.init({
            selector: 'textarea#textArea',
            width: 'inherit',
            height: 700,
            plugins:[
                'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 
                'table', 'emoticons', 'template', 'codesample'
            ],
            toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' + 
            'bullist numlist outdent indent | link image codesample | forecolor backcolor emoticons | fullscreen |',
            menu: {
                favs: {title: 'menu', items: 'code visualaid | searchreplace | emoticons'}
            },
            menubar: 'favs file edit view insert format tools table',
            content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}',
            branding: false,
            setup: function (editor) {
                // Add init event listener
                editor.on('init', function () {
                    console.log('TinyMCE initialized. HTML is in the DOM.');
                  
                  
                    const toDelete = document.querySelector(".tox-promotion")
                    console.log(toDelete)
                    toDelete.remove()
                });
            }
        });
        res()
    })
    

    
    // toDelete.style.display = 'none'
}




document.getElementById('downloadButton').addEventListener('click', async function () {
    // Create data to be written to the file
    const fileContent = await fetchData();
    fileContent.data.push({title: "jd2gmd"})
    console.log(fileContent)

    // Create a Blob from the data
    const blob = new Blob([JSON.stringify(fileContent)], { type: 'text/plain' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'datajson.json'; // Set the filename

    // Append the link to the document and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
});

// button.addEventListener('click', () => {
    
//     // var contentFromTextarea = tinyMCE.activeEditor.getContent();
    
    
//     // // Include stylesheets in the output div
//     // var stylesheets = document.styleSheets;
//     // console.log(stylesheets)
//     // for (var i = 0; i < stylesheets.length; i++) {
//     //         var stylesheet = stylesheets[i];
//     //         var link = document.createElement('link');
//     //         link.rel = 'stylesheet';
//     //         link.href = stylesheet.href;
//     //         output.appendChild(link);
//     //     }
        
//     // output.innerHTML = contentFromTextarea;

//     const toDelete = document.querySelector(".tox-promotion")
//     console.log(toDelete)


//     copyContent()
// })

addNoteButton.addEventListener('click', async () => {
    await showAddNewNote()
    await initTextArea()
})

function copyContent() {
    const editableContent = document.getElementById('default_ifr');
    const textArea = document.createElement('textarea');
    
    console.log(editableContent)
    console.log(editableContent.outerHTML)

    const iframe = document.getElementById('default_ifr');
    if (iframe.contentDocument) {
        // Access the contentDocument and get the HTML content
        const iframeHTML = iframe.contentDocument.documentElement;
        const contentBody = iframeHTML.getElementsByTagName('body')
        console.log(contentBody[0].innerHTML)
        // Log or use the HTML content as needed
        // console.log(iframeHTML);
        output.innerHTML = contentBody[0].innerHTML
        // You can also display it in an alert or use it in your application
        // alert('Iframe HTML:\n' + iframeHTML);
      }


    // Copy HTML content to textarea
    textArea.value = editableContent.innerHTML;
    
    // Append textarea to document
    document.body.appendChild(textArea);

    // Select the content in the textarea
    textArea.select();
    
    // Execute copy command
    document.execCommand('copy');

    // Remove the textarea
    document.body.removeChild(textArea);
    
    console.log('Content copied!');
  }

async function fetchData() {
    try {
        const response = await fetch('../Data/datajson.json');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

function displayData(data){
    data.forEach(element => {
        
        const newDiv = document.createElement('div')
        newDiv.classList.add('article')

        newDiv.innerHTML = `
            <div class='article-title'><h2>${element.title}</h2></div>
            <div class='article-body'>
                ${element.text || "No content"}
            </div>
            <div class='article-tags'><p>${element.tags || "No tags"}</p></div>
        `
        
        
        

        mainContainer.appendChild(newDiv)
    });
}

function showAddNewNote(){
    return new Promise((resolve, reject) => {
        const containerBG = document.createElement('div')
        containerBG.classList.add('blackBg')

        const container = document.createElement('div')
        container.classList.add('addNewNoteContainer')
        
        const navBar = document.createElement('div')
        navBar.classList.add('addNewNote-navbar')

        const closeAddNote = document.createElement('div')
        closeAddNote.classList.add('addNewNote-close')

        closeAddNote.addEventListener('click', () => {
            containerBG.remove()
        })

        const titleInputContainer = document.createElement('div')
        titleInputContainer.classList.add('titleInputContainer')
        titleInputContainer.innerHTML = "<input type='text'/>" 

        const tagsInputContainer = document.createElement('div')
        tagsInputContainer.classList.add('tagsInputContainer')  
        tagsInputContainer.innerHTML = "<input type='text'/>"

        const textAreaContainer = document.createElement('div')
        textAreaContainer.classList.add('textAreaContainer')

        const textArea = document.createElement('textarea')
        textArea.setAttribute('id', 'textArea')

        textAreaContainer.appendChild(textArea)
        
        navBar.appendChild(closeAddNote)
        container.appendChild(titleInputContainer)
        container.appendChild(tagsInputContainer)
        container.appendChild(textAreaContainer)
        containerBG.appendChild(container)
        containerBG.appendChild(navBar)

        document.body.appendChild(containerBG)

        resolve()
    })
    
}
