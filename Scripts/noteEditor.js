function showAddNewNoteAsync(note = null){
    return new Promise((resolve, reject) => {
        const FScontainer = createElement('div', ['fullscreen-container'])
    
        const navBar = createElement('div', ['fullscreen-navbar'])

        const closeFullscreen = createElement('div', ['fullscreen-navbar-close-button'])
        closeFullscreen.addEventListener('click', () => {
            destroyTextArea()
            FScontainer.remove()
        })

        const saveButton = createButton((note)? "Zapisz" : "Dodaj", [], ()=>saveNoteHandler(note))
        
        navBar.appendChild(saveButton)
        navBar.appendChild(closeFullscreen)

        const contentContainer = createElement('div', ['fullscreen-content-container'])

        const editorContainer = createElement('div', ['editor-container'])

        const titleContainer = initTitleContainer(note?.title)
        const tagsContainer = initTagsContainer(note?.tags)
        

        const textAreaContainer = document.createElement('div')
        textAreaContainer.classList.add('textAreaContainer')

        const textArea = document.createElement('textarea')
        textArea.setAttribute('id', 'textArea')

        textAreaContainer.appendChild(textArea)
        
        editorContainer.appendChild(titleContainer)
        editorContainer.appendChild(tagsContainer)
        editorContainer.appendChild(textAreaContainer)

        contentContainer.appendChild(editorContainer)
        
        FScontainer.appendChild(navBar)
        FScontainer.appendChild(contentContainer)

        document.body.appendChild(FScontainer)


        resolve()
    })
    
}

function initTitleContainer(title = null){
    const titleInputContainer = createElement('div', ['titleInputContainer'])
    titleInputContainer.innerHTML = `<input type='text' class='inputTitle' value='${ title || "" }'placeholder='Tytuł'/>`

    return titleInputContainer
}

function initTagsContainer(tags = null){
    const tagsInputContainer = createElement('div', ['tagsContainer'])

    const tagsContainer = createElement('div', ['tagsInputContainer'])
    tagsContainer.innerHTML = `<ul id='tags'></ul>
        <input type='text' id='tagInput' placeholder='Dodaj tag'>
    `
    const inputTag = tagsContainer.querySelector('#tagInput')
    const tagsList = tagsContainer.querySelector('ul')

    if(tags){
        tags.forEach(tag => {
            addTag(tag, tagsList)
        })
    }

    inputTag.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const tagText = inputTag.value.trim()
            if (tagText){
                inputTag.value = ""
                addTag(tagText, tagsList)
            }
        }
    })

    tagsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            event.preventDefault()
            event.target.remove()
        }
    })

    tagsInputContainer.appendChild(tagsContainer)

    return tagsInputContainer
}

function addTag(text, parent){
    const tag = createElement('li', ['tag'])
    tag.innerText = text
    parent.appendChild(tag)
}

async function getNoteObject(){
    const title = document.querySelector('.inputTitle')
    const tagsContainer = document.querySelector('.tagsContainer')
    const divs = tagsContainer.querySelectorAll('li')

    liArray = Array.from(divs)
    
    const tags = liArray.map((value, index, array) => {return value.innerText } )

    const data = await getTextAreaContent()

    return {
        title: title.value,
        tags: tags,
        text: data
    } 
}

async function saveNoteHandler(note){
    const noteData = await getNoteObject()
    

    if (noteData.title.trim() === "") {
        showError("Musisz podać unikalny tytuł.")
        return
    }

    if(note){
        if(note.title !== noteData.title.trim()){
            if(isDuplicate(noteData.title)){
                showError("Notatka z takim tytułem już istnieje.")
                return 
            }
        }
        note.title = noteData.title
        note.tags = noteData.tags
        note.text = noteData.text
        updateLocalStorage(data)
    } else {
        if(isDuplicate(noteData.title)){
            showError("Notatka z takim tytułem już istnieje.")
            return 
        }
        addToLocalStorage(noteData)
    }

    displayData(data, reversed=true)
}


function isDuplicate(noteTitle){
    return data.some(item => item.title === noteTitle)
}

function showError(errorText){
    Swal.fire({
        title: 'Błąd 😒',
        text: errorText,
        icon: 'error',
        confirmButtonColor: 'green',
        confirmButtonText: 'Ok'
    })
}