const mainContainer = document.querySelector(".main-container")
const output = document.querySelector(".output")
const button = document.querySelector("#btn")
const textArea = document.querySelector("#default")
const addNoteButton = document.querySelector("#addButton")
const newNoteContainer = document.querySelector(".blackBg")

window.onload = async ()=>{
    // await initTextArea()
    
    // const data = await fetchData()
    const data = await getDataFromStorage()
    displayData(data)
    // console.log(data)

    
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

async function copyContent() {
    // const editableContent = document.getElementById('textArea_ifr');
    // const textArea = document.createElement('textarea');
    
    // console.log(editableContent)
    // console.log(editableContent.outerHTML)

    const iframe = document.getElementById('textArea_ifr');
    if (iframe.contentDocument) {
        // Access the contentDocument and get the HTML content
        const iframeHTML = iframe.contentDocument.documentElement;
        const contentBody = iframeHTML.getElementsByTagName('body')[0]

        const images = contentBody.getElementsByTagName('img')

        // const reader = new FileReader()
        // reader.onload = (event) => {
        //     const base64string = event.target.result
        //     return base64string
        // }


        for(const image of images){
            console.log(image.src)
            const b = await imageURLtoBlob(image.src)
            console.log(b)
            const base64str = await blobToBase64(b)
            // console.log(base64str)
            image.src = base64str
        }

        return contentBody.innerHTML
        
    }


  }

async function fetchData() {
    try {
        const response = await fetch('../Data/datajson.json');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getDataFromStorage(){
    return new Promise((res, rej) => {
        const data = localStorage.getItem('data')
        res(JSON.parse(data))
    })
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
        addButton.addEventListener('click', async () => {
            const data = await getDataFromTextArea()
            console.log(data)

            const localStorageData = localStorage.getItem('data') || null

            if(!localStorageData) localStorage.setItem('data', JSON.stringify([data]))
            else {
                const tempData = localStorage.getItem('data')
                const tempDataParsed = JSON.parse(tempData) 
                tempDataParsed.push(data)
                localStorage.setItem('data', JSON.stringify(tempDataParsed))
            }
        })

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


async function getDataFromTextArea(){
    const title = document.querySelector('.inputTitle')
    const tagsContainer = document.querySelector('.tagsContainer')
    const divs = tagsContainer.querySelectorAll('div')

    


    divsArray = Array.from(divs)

    tags = divsArray.map((val, index, arr) => {return val.innerHTML} )

    console.log(title.value)
    console.log(divs)
    console.log(tags)

    

    const data = await copyContent()

    // console.log(data)

    return {
        title: title.value,
        tags: tags,
        text: data
    } 

    
}

async function imageURLtoBlob(url){
    return new Promise(async (res, rej) => {
        const response = await fetch(url)
        const blob = await response.blob()

        res(blob)
    })

    
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const base64String = event.target.result;
        resolve(base64String);
      };
  
      reader.onerror = function(error) {
        reject(error);
      };
  
      reader.readAsDataURL(blob);
    });
  }

function createElement(tagName, classNames) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    return element;
}

function createButton(text, classNames, clickHandler) {
    const button = createContainer('button', classNames);
    button.innerText = text;
    button.addEventListener('click', clickHandler);
    return button;
}