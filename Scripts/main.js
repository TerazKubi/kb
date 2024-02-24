const mainContainer = document.querySelector(".main-container")
const output = document.querySelector(".output")
const button = document.querySelector("#btn")
const textArea = document.querySelector("#default")
const addNoteButton = document.querySelector("#addButton")
const newNoteContainer = document.querySelector(".blackBg")

window.onload = async ()=>{
    
    // const data = await fetchData()
    const data = await getDataFromStorageAsync()
    displayData(data)
  
}

addNoteButton.addEventListener('click', async () => {
    await showAddNewNoteAsync()
    await initTextAreaAsync()
})

// document.getElementById('downloadButton').addEventListener('click', async function () {
//     // Create data to be written to the file
//     const fileContent = await fetchData();
//     fileContent.data.push({title: "jd2gmd"})
//     console.log(fileContent)

//     // Create a Blob from the data
//     const blob = new Blob([JSON.stringify(fileContent)], { type: 'text/plain' });

//     // Create a download link
//     const downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(blob);
//     downloadLink.download = 'datajson.json'; // Set the filename

//     // Append the link to the document and trigger the click event
//     document.body.appendChild(downloadLink);
//     downloadLink.click();

//     // Remove the link from the document
//     document.body.removeChild(downloadLink);
// });









function displayData(data){
    data.forEach(element => {
        
        const newDiv = createElement('div', ['article'])

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








