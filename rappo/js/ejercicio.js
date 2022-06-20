
window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});

let cargarDatos = () => {
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml').then(
    response => response.text())
    .then(data =>{
        const parser = new DOMParser()
        const xml = parser.parseFromString(data, 'application/xml')
        let escritores = xml.getElementsByTagName('escritor')
        for (let escritor of escritores){
            let id = escritor.querySelector('id').textContent
            let nombre = escritor.querySelector('nombre').textContent
            let plantilla = `<option value = "${id}">${nombre}</option>`
            document.querySelector('select').innerHTML += plantilla
        }
    })
    .catch(console.error)
}

const selectElement = document.querySelector('select')
selectElement.addEventListener('change', (event) => {
    let selection = document.querySelector('div.input-group > select')
    let indexOption = selection.options[selection.selectedIndex].value
    let textOption = selection.options[selection.selectedIndex].text
    mostrarDatos(indexOption, textOption)
    document.getElementById('frases').innerHTML = ""
});

let mostrarDatos = (index, text) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases").then(response => response.json())
    .then(data => {
        for (let datos of data['frases']) {
            if(datos['id_autor']==Number(index)){
                let plantilla = 
                `<div class="col-lg-3">
                <div class="test-inner ">
                    <div class="test-author-thumb d-flex">
                        <div class="test-author-info">
                            <h4>${text}</h4>                                            
                        </div>
                    </div>
                    <span>${datos['texto']}</span>
                    <i class="fa fa-quote-right"></i>
                </div>
            </div>`
            document.getElementById('frases').innerHTML += plantilla
            }
        }
    })
    .catch(console.error);
}