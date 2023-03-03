$(document).ready(function () {
    $('#phone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00000-000', {reverse: true});
    MainPage()
});

//working fine - don't touch
function OpenCustomer() {
    $('.main-display').load('customers/main-page/')
}

// in progress
$(document).on('click', '.cust-find-button', function () {
    $('.cust-add-button').removeClass('cust-btn-activated')
    $('.customer-form').css('display', 'none')

    let customer = $('#find-customer').val()

    if (customer === '') {
        Swal.fire({
            title: 'Error',
            text: 'Não há identificador para o cliente',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return
    }

    $.ajax({
        contentType: 'application/json',
        url: 'customers/',
        data: {
            'identify': customer
        },
        type: 'GET',
        success: function (data) {
            if (data.status === 'success') {
                $('.show-customer').css('display', 'flex').html(`                    
                    <h3>${data.customer.name}</h3>
            
                    <p>CPF: ${data.customer.cpf}</p>
                    <p>Telefone: ${data.customer.phone}</p>
                    <p>Endereço: ${data.customer.address}</p>
                    <p>CEP: ${data.customer.postal_code}</p>
                    <p>Cidade: ${data.customer.city}</p>
                    <p>Estado: ${data.customer.state}</p>
                    
                    <div class="show-cars">
                        <div class="exp-car-head-div">Carros de ${data.name}</div>
                        <div class="expander-cars">                
                            Car 1<br>Car 2
                        </div>                 
                    </div>   
                `);
            }else if (data.status === 'error') {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            },
        error: function (data) {
            console.log(data)
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    })
});

$(document).on('click', '.exp-car-head-div', function () {
    let car_expander = $('.expander-cars')
    if (car_expander.css('height') === '5px') {
        car_expander.css('height', '30px').css('display', 'block')

    } else {
        car_expander.css('height', '5px').css('display', 'none');
    }
});

// working fine - don't touch
$(document).on('click', '.cust-add-button', function () {
    let isActive = $(this).hasClass('cust-btn-activated')
    $('.show-customer').css('display', 'none')
    if (!isActive) {
        $('.cust-add-button').addClass('cust-btn-activated')
        $('.customer-form').css('display', 'flex')
    } else {
        $('.cust-add-button').removeClass('cust-btn-activated')
        $('.customer-form').css('display', 'none')
    }
});

// working fine - don't touch
function CancelForm() {
    Swal.fire({
        title: 'Tem Certeza?',
        showDenyButton: true,
        confirmButtonText: `Sim`,
        denyButtonText: `Não`,
    }).then((result) => {
        if (result.isConfirmed) {
            $('.cust-add-button').removeClass('cust-btn-activated')
            $('.customer-form').css('display', 'none')
        }
    });
}

// working fine - don't touch
$(document).on('click', '.bt-menu', function () {
    $('.bt-menu').removeClass('btn-menu-activated')
    $(this).addClass('btn-menu-activated')
});

// working fine - don't touch
function MainPage() {
    $('.main-display').html(`Bem Vindo a Página Principal`)
}

$(document).on('input', '#cep', function () {
    if ($(this).val().length === 9) {
        ValidateZipCode($(this).val())
    }
});

$('#cep').focusout(function () {
    if ($(this).val().length === 9) {
        ValidateZipCode($(this).val())
    }
});


function ValidateZipCode(cep) {
    $.ajax({
        contentType: 'application/json',
        url: 'services/cep/',
        data: {
            'cep': cep
        },
        type: 'GET',
        success: function (data) {
            if (data.status === 'success') {
                $('#address').val(data.content.address+ ', ').focus()
                $('#city').val(data.content.city)
                $('#state').val(data.content.state)

            } else if (data.status === 'error') {
                Swal.fire({
                    title: 'Digite um CEP Válido',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }
    })
}