

const fetchData = async (marker) => {
    try {
        const response = await fetch('assets/data/markers3.json');
        const json = await response.json();
        console.log(json);
        json.forEach((marker) => {
            const { id, nombre, descripcion, lat, lng, type, img } = marker

            // The marker, positioned at km cero
            const contentString = `
            <div class="contenedor">
            <div class="cont_collapsible">
            <button class="collapsible">${nombre}</button>
            <div class="content">
            <div><img src="${img}"></div>
            <h2>${nombre}</h2>
            <h3>${type}</h3>
            <p>${descripcion}</p>
            </div>
            </div>
            <div class="buttons">
            <button>Editar</button>
            <button>Eliminar</button>
            </div>
            </div>
            `
            const $contenedor = document.querySelector('#listado');
            $contenedor.innerHTML += contentString;

            var i;
            const coll = document.querySelectorAll(".collapsible");
            for (i = 0; i < coll.length; i++) {
                console.log("anda1")
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        console.log("anda2")
                    }
                });
            }
            
    const neue = document.querySelector('#nuevo')
    neue.addEventListener("click", function () {
        console.log("anda2")
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            console.log("anda2")
            content.style.display = "none"
        } else {
            content.style.display = "block"
            console.log("anda2")
        }
    });
        })
    } catch (error) {
        console.log(error)
    }
}


const initAdmin = () => {

    fetchData();

}

initAdmin();

$(document).ready(function () {
    console.log("ready!");

    $("#myform").validate({

        rules: {
            "nombre": {
                required: true
            },
            "tipo": {
                required: true
            },
            "continente": {
                required: true
            },
            "latitud": {
                required: true
            },
            "longitud": {
                required: true
            }
        },
        messages: {

            "nombre": "Enter a valid name",
            "tipo": "Enter a valid E-Mail",
            "contiente": "Select an option",
            "latitud": "Enter a valid text",
            "longitud": "longitud"

        },
            submitHandler: function (form){

                $.ajax({
                    url: form.action,
                    type:form.method,
                    data:$(form).serialize(),
                    beforeSend:function(){
                        $('.respuesta_form').html('Wait for it, dude!')
                    },
                    success :function (response){
                        console.log(response)
                        $('.respuesta_form').html('Gracias ' + response.nombre + ' por tu mensaje')
                        $('.listado').html('');
                    }
                })

            }


    })

});

