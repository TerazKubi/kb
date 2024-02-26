function createNoteCard(cardObject){
    const noteCard = createElement('div', ['note-mainContainer'])

    const noteHeader = createElement('div', ['note-header-container'])

    const noteHeaderTags = createElement('div', ['note-tags'])
    cardObject?.tags.forEach(tag => {
        const tagContainer = createElement('div', ['note-tag'])
        tagContainer.innerText = tag

        tagContainer.addEventListener('click', () => {
            tagEventHandler(tag)
        })

        noteHeaderTags.appendChild(tagContainer)
    })


    const noteHeaderButtons = createElement('div', ['note-buttons'])



    // const deleteButton = createElement('div', ['note-btn', 'delete'])
    // deleteButton.innerHTML = '<img src="../Icons/deleteB.svg" alt="delete"/>'
    // deleteButton.addEventListener('click', () => {
    //     data = data.filter(item => item.title !== cardObject.title)
    //     updateLocalStorage(data)
    //     noteCard.remove()
    // })

    // const editButton = createElement('div', ['note-btn', 'edit'])
    // editButton.innerHTML = '<img src="../Icons/editB.svg" alt="edit"/>' 
    // editButton.addEventListener('click', async () => {
    //     console.log('edit')
    //     await showAddNewNoteAsync(cardObject)
    //     await initTextAreaAsync(cardObject.text)
    // })

    const expandButton = createElement('div', ['note-btn', 'expand'])
    expandButton.innerHTML = '<img src="../Icons/expandB.svg" alt="expand"/>'
    expandButton.addEventListener('click', () => {
        console.log('expand')
        showNoteCardFS(cardObject)
    })

    // noteHeaderButtons.appendChild(deleteButton)
    // noteHeaderButtons.appendChild(editButton)
    noteHeaderButtons.appendChild(expandButton)

    noteHeader.appendChild(noteHeaderTags)
    noteHeader.appendChild(noteHeaderButtons)


    const noteTitle = createElement('div', ['note-titleContainer'])
    const title = createElement('span', ['note-title'])
    title.innerText = cardObject?.title || ""
    noteTitle.appendChild(title)

    const noteBody = createElement('div', ['note-bodyContainer'])
    noteBody.innerHTML = cardObject?.text || ""


    noteCard.appendChild(noteHeader)
    noteCard.appendChild(noteTitle)
    noteCard.appendChild(noteBody)

    return noteCard
}

function tagEventHandler(tag){
    searchInput.focus()
    searchInput.value = tag
    const inputEvent = new Event('input');
    searchInput.dispatchEvent(inputEvent);
}




function showNoteCardFS(noteData){
    const FScontainer = createElement('div', ['fullscreen-container'])
    
    const navBar = createElement('div', ['fullscreen-navbar'])

    const closeFullscreen = createElement('div', ['fullscreen-navbar-close-button'])
    closeFullscreen.addEventListener('click', () => {
        // destroyTextArea()
        FScontainer.remove()
    })
    const editButton = createElement('div', ['fullscreen-navbar-close-button'])
    editButton.innerHTML = "<span style='color: white;'>EDIT</span>"
    editButton.addEventListener('click', async () => {
        FScontainer.remove()
        await showAddNewNoteAsync(noteData)
        await initTextAreaAsync(noteData.text)
        
    })
    const removeButton = createElement('div', ['fullscreen-navbar-delete-button'])
    removeButton.innerHTML = "<span style='color: white;'>del</span>"
    removeButton.addEventListener('click', async ()=> {
        data = data.filter(item => item.title !== noteData.title)
        updateLocalStorage(data)
        displayData(data, reversed=true)
        FScontainer.remove()
    })

    navBar.appendChild(closeFullscreen)
    navBar.appendChild(editButton)
    navBar.appendChild(removeButton)

    const contentContainer = createElement('div', ['fullscreen-content-container'])


    const noteContainer = createElement('div', ['note-Container-FS'])


    const noteHeader = createElement('div', ['note-header-container'])

    const noteHeaderTags = createElement('div', ['note-tags'])
    noteData?.tags.forEach(tag => {
        const tagContainer = createElement('div', ['note-tag'])
        tagContainer.innerText = tag

        tagContainer.addEventListener('click', () => {
            tagEventHandler(tag)
            FScontainer.remove()
        })

        noteHeaderTags.appendChild(tagContainer)
    })

    noteHeader.appendChild(noteHeaderTags)
    
    const noteTitle = createElement('div', ['note-titleContainer'])
    const title = createElement('span', ['note-title'])
    title.innerText = noteData?.title || ""
    noteTitle.appendChild(title)

    const noteBody = createElement('div', ['note-bodyContainer-FS'])
    noteBody.innerHTML = noteData?.text || ""


    noteContainer.appendChild(noteHeader)
    noteContainer.appendChild(noteTitle)
    noteContainer.appendChild(noteBody)

    contentContainer.appendChild(noteContainer)

    FScontainer.appendChild(navBar)
    FScontainer.appendChild(contentContainer)

    document.body.appendChild(FScontainer)
}