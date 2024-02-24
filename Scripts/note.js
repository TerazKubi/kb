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
    titleInputContainer.innerHTML = "<span>Tytuł </span><input type='text' class='inputTitle'/>"

    return titleInputContainer
}

function initTagsContainer(){
    const tagsInputContainer = createElement('div', ['tagsInputContainer'])

    const containerTitle = createElement('div', ['tagsTitleContainer'])
    containerTitle.innerText = 'Tagi'

    const tags = createElement('div', ['tagsContainer'])

    const tagsInput = createElement('input', [])
    tagsInput.setAttribute('id','tagsInput')

    const addTagButton = createButton('Dodaj', [], () => {
        const newTag = createElement('div', [])
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


async function getNewNoteObject(){
    const title = document.querySelector('.inputTitle')
    const tagsContainer = document.querySelector('.tagsContainer')
    const divs = tagsContainer.querySelectorAll('div')

    divsArray = Array.from(divs)

    tags = divsArray.map((value, index, array) => {return value.innerHTML} )

    const data = await getTextAreaContent()

    return {
        title: title.value,
        tags: tags,
        text: data
    } 
}