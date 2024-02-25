function showAddNewNoteAsync(){
    return new Promise((resolve, reject) => {
        const containerBG = createElement('div', ['blackBg'])

        const container = createElement('div', ['addNewNoteContainer'])
        
        const navBar = createElement('div', ['addNewNote-navbar'])

        const closeAddNote = createElement('div', ['addNewNote-close'])
        closeAddNote.addEventListener('click', () => {
            containerBG.remove()
        })

        const addButton = createButton('save', [], async () => {
            const data = await getNewNoteObject()
            console.log(data)

            updateLocalStorage(data)
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
    const titleInputContainer = createElement('div', ['titleInputContainer'])
    titleInputContainer.innerHTML = "<input type='text' class='inputTitle' placeholder='Tytuł'/>"

    return titleInputContainer
}

function initTagsContainer(){
    const tagsInputContainer = createElement('div', ['tagsContainer'])

    const tags = createElement('div', ['tagsInputContainer'])
    tags.innerHTML = `<ul id='tags'></ul>
        <input type='text' id='tagInput' placeholder='Dodaj tag'>
    `
    const inputTag = tags.querySelector('#tagInput')
    const tagsList = tags.querySelector('ul')

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

    tagsInputContainer.appendChild(tags)

    return tagsInputContainer
}

function addTag(text, parent){
    const tag = createElement('li', ['tag'])
    tag.innerText = text
    parent.appendChild(tag)
}

async function getNewNoteObject(){
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