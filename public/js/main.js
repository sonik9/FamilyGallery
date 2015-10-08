/**
 * Created by Vitalii on 24.06.2015.
 */
var message;
function notify(messages,type,trans) {
    $('.top-right').notify({
        message: {text: messages},
        fadeOut: { enabled: true, delay: 150000 },
        type:type,
        transition:trans
    }).show();
}
function sizeH(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' Kb.';
}
;
(function($){
    $.signout = (function(){
        $('#signOut').on('click',function(){
            var form=$('form').prop('action','/signout').prop('method','post');
            $.ajax({
                url: "/signout",
                method: "POST",
                data: form.serialize(),
                complete: function() {
                    $(":submit", form).button("reset");
                },
                statusCode: {
                    200: function() {
                        form.html("?? ????? ? ????").addClass('alert-success');
                        window.location.href = "/";
                    },
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        $('.error', form).html(error.message);
                    }
                }
            });
            return false;
        });
    });

})(jQuery);
(function($){
    $.signin = (function(){
        $('#login-form').on('submit',function(){
            var form=$(this);
            $('.error', form).html('');
            $(":submit", form).button("loading");

            $.ajax({
                url: "/signin",
                //contentType: "application/json",
                method: "POST",
                //data: JSON.stringify(form),
                data: form.serialize(),
                complete: function() {
                    $(":submit", form).button("reset");
                },
                statusCode: {
                    200: function() {
                        form.html("?? ????? ? ????").addClass('alert-success');
                        window.location.href = "/";
                    },
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        alert(error);
                    }
                }
            });
            return false;


        });

    });
})(jQuery);

(function($){
    $.signup = (function(){
        $('#register-form').on('submit',function(){
            var form=$(this);
            //$('.error', form).html('');
            $(":submit", form).button("loading");

            $.ajax({
                url: "/signup",
                //contentType: "application/json",
                method: "POST",
                //data: JSON.stringify(form),
                data: form.serialize(),
                complete: function() {
                    $(":submit", form).button("reset");
                },
                success:function(message) {
                    var mailservice = message.split('@');
                    /*switch (mailservice[1]) {
                        case 'gmail.com':
                            mailservice=
                    }*/
                    $('#register-form').css('display','none');
                    var p = document.createElement("p");
                    $(p).append("Please confirm your registration! <p> Message has been sent to your email: <a href='http://"+mailservice[1]+"'>"+message+"</a></p>")
                        .append("<a style='font-size:25px;' href='http://"+mailservice[1]+"'>"+mailservice[1]+"</a>");
                    var div  = document.createElement("div");
                    $(div).append(p).append("<br/><a href='/' class='btn btn-primary btn-lg btn-block' type='button'>Finish</a>");
                    $('.panel-body').append(div);
                },
                error:function (xhr, status, errorThrown) {
                    alert(JSON.parse(xhr.responseText) + ' ' + status + '. ' + errorThrown);
                }
                /*statusCode: {
                    200: function(message) {
                        $('#register-form').css('display','none');
                        var p = document.createElement("p");
                            $(p).append("Please confirm your registration! Message has been sent to your email:"+message);
                        var div  = document.createElement("div");
                            $(div).append(p);
                       $('.panel-body').append(div);
                    },
                    403: function(jqXHR) {
                        var error = JSON.parse(jqXHR.responseText);
                        alert(error);
                    }
                }*/
            });
            return false;


        });

    });
})(jQuery);


(function ($) {
    $.validattion = (function (customFunction) {
        var app = {

                initialize: function () {
                    this.modules();
                    this.setUpListeners();
                },

                modules: function () {

                },

                setUpListeners: function () {
                    $('form').on('submit', app.submitForm);
                    $('form').on('focusout', 'input', app.validateInput);
                    $('form').on('keydown', 'input', app.removeTooltip);
                    //$('form').on('focusout', 'select', app.validateInput);

                },

                removeTooltip: function () {
                    $(this).tooltip('destroy').parent('.form-group').removeClass('has-error');
                },


                validateItem: function (item) {
                    var item = $(item),
                        val = item.val(),
                        attr = item.attr('data-validation'),
                        formGroup = item.parents('.form-group'),
                        label = formGroup.find('label').text().toLowerCase(),
                        textError = 'Put' + label,
                        doIf = function (text) {
                            var child = formGroup.children('.chosen-container, .mce-tinymce');
                            if (child.length > 0) {
                                item = child;
                                item.css('border-color', '#a94442').children('a, ul').css('border-color', '#a94442')
                            }
                            item.tooltip({
                                triger: 'manual',
                                placement: 'top',
                                title: text
                            }).tooltip('show'),
                                formGroup.addClass('has-error').removeClass('has-success'),

                                valid = false;
                        },
                        doElse = function () {
                            var child = formGroup.children('.chosen-container, .mce-tinymce');
                            if (child.length > 0) {
                                item = child;
                                item.css('border-color', '#a94442').children('a, ul').css('border-color', '#3c763d')
                            }
                            item.tooltip('destroy');
                            formGroup.addClass('has-success').removeClass('has-error');
                        }


                    switch (attr) {
                        case 'length':
                        {
                            var length = item.attr('data-validation-length');
                            if (val.length < length) {
                                //item.after("<p datatype='tooltip'>Length of this field can't be less then " + length + ".</p>");
                                doIf('Length of this field can\'t be less then ' + length);
                            } else {
                                doElse();
                            }
                            break;
                        }
                        case 'selection':
                        {
                            var count = item.attr('data-validation-count'),
                                sel = item.find(':selected');
                            if (sel.length < count || sel.val().length === 0) {
                                doIf('Count of this field can\'t be les then ' + count);
                            } else {
                                doElse();
                            }
                            break;
                        }

                    }
                },

                validateInput: function (e) {
                    e.preventDefault();
                    var items = $(this);
                    if (!app.validateItem(items)) {
                        return false;
                    }
                },

                submitForm: function (e) {
                    e.preventDefault();
                    var form = $(this);
                    if (app.validateForm(form)) {
                        if (typeof customFunction !== 'undefined' && $.isFunction(customFunction)) {
                            customFunction();
                            //
                        } else {
                            form[0].submit();
                        }


                    }
                },

                validateForm: function (form) {
                    var inputs = form.find('*[data-validation]');
                    valid = true;
                    inputs.tooltip("destroy");
                    $.each(inputs, function (index, val) {
                        app.validateItem(val);
                    });
                    return valid;
                }

            },
            valid;

        app.initialize();
    });
})(jQuery);
