$(document).ready(function () {
    $('#phone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00000-000', {reverse: true});
    MainPage()
});
let customers = {}

//working fine - don't touch
function OpenCustomer() {
    $('.main-display').load('core/customers-page/')
}

// in progress
$(document).on('click', '.cust-find-button', function () {
    $('.cust-add-button').removeClass('cust-btn-activated');
    $('.customer-form').css('display', 'none');
    $('.show-customer').css('display', 'none');

    let customer = $('#find-customer').val()

    // if (customer === '') {
    //     Swal.fire({
    //         title: 'Error',
    //         text: 'Não há identificador para o cliente',
    //         icon: 'error',
    //         confirmButtonText: 'Ok'
    //     })
    //     return
    // }

    $.ajax({
        contentType: 'application/json',
        url: 'core/customers/',
        data: {
            'identify': customer
        },
        type: 'GET',
        success: function (data) {
            if (data.status === 'success') {
                customers = data["customers"]
                $('.customers-list-div').css('display', 'flex').html('');
                $.each(data["customers"], function (id, customer) {
                    $('.customers-list-div').append(`
                        <div class="expander-customer" data-cust-id="${id}">
                            <h3>${customer.name}</h3>
                            <p>CPF: ${customer.cpf}</p>                                                    
                        </div>
                    `)
                })

            } else if (data.status === 'error') {
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

$(document).on('click', '.expander-customer', function () {
    let id_cust = $(this).attr('data-cust-id')
    $('.customers-list-div').css('display', 'none');
    $('.show-customer').css('display', 'flex').html(`
        <div class="back-to-list"><i class="fas fa-chevron-left"></i></div>
        <div class="edit-customer"><i class="fas fa-edit"></i></div>
        <div class="delete-customer"><i class="fas fa-trash-alt"></i></div>
        <h3>${customers[id_cust].name}</h3>

        <p>CPF: ${customers[id_cust].cpf}</p>
        <p>Telefone: ${customers[id_cust].phone}</p>
        <p>Endereço: ${customers[id_cust].address}</p>
        <p>CEP: ${customers[id_cust].postal_code}</p>
        <p>Cidade: ${customers[id_cust].city}</p>
        <p>Estado: ${customers[id_cust].state}</p>

        <div class="show-cars">
            <div class="exp-car-head-div">Carros de ${customers[id_cust].name}</div>
            <div class="expander-cars">
                Car 1<br>Car 2
            </div>
        </div>
    `);
});

$(document).on('click', '.back-to-list', function () {
    $('.customers-list-div').css('display', 'flex');
    $('.show-customer').css('display', 'none');
});

$(document).on('click', '.delete-customer', function () {
    Swal.fire({
        title: 'Deseja deletar?',
        text: "Essa ação não poderá ser desfeita!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: `Sim`,
        denyButtonText: `Não`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Deletado!', '', 'success')
        }
    });
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
    $('.customers-list-div').css('display', 'none')
    $('.show-customer').css('display', 'none')
    if (!isActive) {
        $('.cust-add-button').addClass('cust-btn-activated')
        $('.customer-form').css('display', 'flex')
    } else {
        CancelForm()
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
    $('.main-display').load('core/main-page/')
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
                $('#street').val(data.content.address + ', ').focus()
                $('#city').val(data.content.city)
                $('#state').val(data.content.state)
                $('#number').focus()

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

// began to work - finally
$(document).on('click', '.cust-form-submit', function (event) {
    event.preventDefault()
    $.ajax({
        contentType: 'application/json',
        url: 'core/customers/',
        data: $(this).serialize(),
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if (data.status === 'success') {
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Cliente castrado com sucesso.',
                    confirmButtonText: `Sim`,
                    icon: 'success',

                }).then((result) => {
                    if (result.isConfirmed) {
                        OpenCustomer()
                    }
                });
            } else if (data.status === 'error') {
                Swal.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error',
                text: 'Erro ao cadastrar cliente',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    })
});