'use strict';

$(document).ready(function() {
    init();
});

function init() {
    $('#contactform').submit(function(event) {
        processRegistration(this);
        event.preventDefault();
    });
}

function processRegistration(form) {
    var data = getRegistrationFormData();
    var errors = validaRegistrationData(data);

    $('.error', $(form)).text('');

    if (errors) {
        highlightErrors(form, errors);
    } else {
        console.log('DATA IS VALID', data);
        alert('SUCCESS');
    }
}

function getRegistrationFormData() {
    var formData = {
        name:       $('#name').val(),
        email:      $('#email').val(),
        username:   $('#username').val(),
        password:   $('#password').val(),
        repassword: $('#repassword').val(),
        month:      $('#month').find(":selected").val(),
        day:        $('#day').val(),
        year:       $('#year').val(),
        gender:     $('#gender').find(":selected").val()
    };

    return formData;
}

function validaRegistrationData(formData) {
    var validationRules = {
        name: function(value) {
            if (!value) {
                return 'Name is required';
            }
        },
        email: function(value) {

        },
        username: function(value) {

        },
        password: function(value) {
            if (!value) {
                return 'Password is required';
            }

            if (value.length < 8) {
                return 'Password is too short'
            }

        },
        repassword: function(value) {

        },
        month: function(value) {

        },
        day: function(value) {

        },
        year: function(value) {

        },
        gender: function(value) {

        }
    };

    var errors = validateData(validationRules, formData);

    // TODO extrachecks like date existence, password === repassword.
    // Do them manually and add errors to errors object

    return errors;
}

function highlightErrors(form, errors) {
    var $form = $(form);

    for (var field in errors) {
        var fieldError = errors[field];
        $('.error[data-error-for=' + field + ']', $form).text(fieldError);
    }
}

function validateData(validationRules, data) {
    var errors = {};

    for (var field in data) {
        var value = data[field];
        var fieldError = validationRules[field](value);

        if (fieldError) {
            errors[field] = fieldError;
        }
    }

    if ( Object.keys(errors).length ) {
        return errors;
    } else {
        return;
    }
}
