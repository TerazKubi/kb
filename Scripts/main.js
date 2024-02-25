const mainContainer = document.querySelector(".main-container")

const textArea = document.querySelector("#default")

const addNoteButton = document.querySelector("#navBar-addButton")
const newNoteContainer = document.querySelector(".blackBg")

const searchInput = document.querySelector('#navBar-searchInput')

let data = []

window.onload = async ()=>{
    
    // const data = await fetchData()
    data = await getDataFromStorageAsync()
    displayData(data)


    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        confirmButtonColor: 'green'
    });

    // https://sweetalert2.github.io/#configuration

}

addNoteButton.addEventListener('click', async () => {
    await showAddNewNoteAsync()
    await initTextAreaAsync()
})

searchInput.addEventListener('input', handleSearch)

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



function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter the array based on the search term
    const results = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    displayData(results);
}





function displayData(data){
    mainContainer.innerHTML = ''

    data.forEach(element => {
        
        const card = createNoteCard(element)
        
        mainContainer.appendChild(card)
    });
}








