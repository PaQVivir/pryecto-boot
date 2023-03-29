const usuarios = [{
    nombre: 'Leo',
    mail: 'leosolo@gmail.com',
    pass: 'felipe'
}]



const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    btnLogout = document.getElementById('btnLogout'),
    modalEl = document.getElementById('modalLogin'),
    nombreUsuario = document.getElementById('nombreUsuario'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');


function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}


function mostrarMasRacks(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card p-3 cols-4" id="tarjeta${element.nombre}">
                <h3 class="card-title titulos" id="nombreMesa">Nombre: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-top" id="">
                
            </div>`;
        contTarjetas.innerHTML += html;
    });
}


function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();


    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {

        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {


            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }

            modal.hide();

            mostrarInfoMascota(mascotas);
            presentarInfo(toggles, 'd-none');
        }
    }
});



function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}


btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});



function estaLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        mostrarInfoMascota(mascotas);
        presentarInfo(toggles, 'd-none');
    }
}

estaLogueado(recuperarUsuario(localStorage));

