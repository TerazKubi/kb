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
            width: '100%',
            height: '100%',
            resize: false,
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



addNoteButton.addEventListener('click', async () => {
    await showAddNewNote()
    await initTextArea()
})

function copyContent() {
    // const editableContent = document.getElementById('textArea_ifr');
    // const textArea = document.createElement('textarea');
    
    // console.log(editableContent)
    // console.log(editableContent.outerHTML)

    const iframe = document.getElementById('textArea_ifr');
    if (iframe.contentDocument) {
        // Access the contentDocument and get the HTML content
        const iframeHTML = iframe.contentDocument.documentElement;
        const contentBody = iframeHTML.getElementsByTagName('body')
        // console.log(contentBody[0].innerHTML)
        
        // output.innerHTML = contentBody[0].innerHTML
        return contentBody[0].innerHTML
        
      }


    // // Copy HTML content to textarea
    // textArea.value = editableContent.innerHTML;
    
    // // Append textarea to document
    // document.body.appendChild(textArea);

    // // Select the content in the textarea
    // textArea.select();
    
    // // Execute copy command
    // document.execCommand('copy');

    // // Remove the textarea
    // document.body.removeChild(textArea);
    
    // console.log('Content copied!');
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

        const addButton = document.createElement('button')
        addButton.innerText = 'save'
        addButton.addEventListener('click', save)

        navBar.appendChild(addButton)
        navBar.appendChild(closeAddNote)

        const titleContainer = initTitleContainer()
        const tagsContainer = initTagsContainer()
        

        const textAreaContainer = document.createElement('div')
        textAreaContainer.classList.add('textAreaContainer')

        const textArea = document.createElement('textarea')
        textArea.setAttribute('id', 'textArea')

        textAreaContainer.appendChild(textArea)
        
        container.appendChild(titleContainer)
        container.appendChild(tagsContainer)
        container.appendChild(textAreaContainer)
        
        containerBG.appendChild(navBar)
        containerBG.appendChild(container)

        document.body.appendChild(containerBG)

        resolve()
    })
    
}

function initTitleContainer(){
    const titleInputContainer = document.createElement('div')
    titleInputContainer.classList.add('titleInputContainer')
    titleInputContainer.innerHTML = "<span>Tytuł </span><input type='text' class='inputTitle'/>"

    return titleInputContainer
}

function initTagsContainer(){
    const tagsInputContainer = document.createElement('div')
    tagsInputContainer.classList.add('tagsInputContainer')  

    const containerTitle = document.createElement('div')
    containerTitle.classList.add('tagsTitleContainer')
    containerTitle.innerText = 'Tagi'

    const tags = document.createElement('div')
    tags.classList.add('tagsContainer')

    const tagsInput = document.createElement('input')
    tagsInput.setAttribute('id','tagsInput')

    const addTagButton = document.createElement('button')
    addTagButton.innerText = 'Dodaj'

    addTagButton.addEventListener('click', () => {
        const newTag = document.createElement('div')
        newTag.addEventListener('click', () => { newTag.remove() })
        newTag.innerText = tagsInput.value
        tagsInput.value = ''
        tagsInput.focus()

        tags.insertBefore(newTag, tags.firstChild)
    })

    tags.appendChild(tagsInput)
    tags.appendChild(addTagButton)

    tagsInputContainer.appendChild(containerTitle)
    tagsInputContainer.appendChild(tags)


    return tagsInputContainer
}


function save(){
    const title = document.querySelector('.inputTitle')
    const tagsContainer = document.querySelector('.tagsContainer')
    const divs = tagsContainer.querySelectorAll('div')

    


    divsArray = Array.from(divs)

    tags = divsArray.map((val, index, arr) => {return val.innerHTML} )

    console.log(title.value)
    console.log(divs)
    console.log(tags)

    

    const data = copyContent()

    console.log(data)

    const object = {
        title: title.value,
        tags: tags,
        text: data
    } 

    console.log(object)
}