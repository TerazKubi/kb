function createNoteCard(cardObject){
    const noteCard = createElement('div', ['note-mainContainer'])

    const noteHeader = createElement('div', ['note-header-container'])

    const noteHeaderTags = createElement('div', ['note-tags'])
    cardObject.tags.forEach(tag => {
        const tagContainer = createElement('div', ['note-tag'])
        tagContainer.innerText = tag

        tagContainer.addEventListener('click', () => {
            tagEventHandler(tag)
        })

        noteHeaderTags.appendChild(tagContainer)
    })


    const noteHeaderButtons = createElement('div', ['note-buttons'])



    const deleteButton = createElement('div', ['note-btn', 'delete'])
    deleteButton.innerHTML = '<img src="../Icons/deleteB.svg" alt="delete"/>'
    deleteButton.addEventListener('click', () => {
        noteCard.remove()
        //TODO: delete from array
    })

    const editButton = createElement('div', ['note-btn', 'edit'])
    editButton.innerHTML = '<img src="../Icons/editB.svg" alt="edit"/>' 
    editButton.addEventListener('click', async () => {
        console.log('edit')
        await showAddNewNoteAsync(cardObject)
        await initTextAreaAsync(cardObject.text)
    })

    const expandButton = createElement('div', ['note-btn', 'expand'])
    expandButton.innerHTML = '<img src="../Icons/expandB.svg" alt="expand"/>'
    expandButton.addEventListener('click', () => {
        console.log('expand')
    })

    noteHeaderButtons.appendChild(deleteButton)
    noteHeaderButtons.appendChild(editButton)
    noteHeaderButtons.appendChild(expandButton)

    noteHeader.appendChild(noteHeaderTags)
    noteHeader.appendChild(noteHeaderButtons)


    const noteTitle = createElement('div', ['note-titleContainer'])
    const title = createElement('span', ['note-title'])
    title.innerText = cardObject.title || ""
    noteTitle.appendChild(title)

    const noteBody = createElement('div', ['note-bodyContainer'])
    noteBody.innerHTML = cardObject.text || ""


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