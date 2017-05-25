/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />
/// <reference path="bootstrap.js" />
/// <reference path="bootstrap-notify.js" />

S2 = {};

//configuração
var notifySettings = function (type) {
    return {
        type: type,
        offset: {
            x: 40,
            y: 145
        },
        timer: 4000
    }
};

//Sucesso
S2.notifySuccess = function (title, Message) {
    $.notify({
        icon: 'glyphicon glyphicon-ok',
        title: "<strong id='strMsgSucesso'>  " + title + ":</strong>",
        message: Message
    }, notifySettings('success'));
};
//Erro
S2.notifyError = function (title, Message) {
    $.notify({
        icon: 'glyphicon-exclamation-sign',
        title: "<strong id='strMsgErro'>" + title + "</strong>",
        message: Message,
        offset: 150,
    }, notifySettings("danger"));
};

S2.notifyWarning = function (title, Message) {
    $.notify({
        icon: 'glyphicon glyphicon-warning-sign',
        title: "<strong id='strMsgAviso'>" + title + "</strong>",
        message: Message,
        offset: 150,
    }, notifySettings("warning"));
};

/*
# Formata um número para moeda. #
*/
S2.FormatReal = function (num) {
    x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }

    if (isNaN(num))
        num = "0";

    cents = Math.floor((num * 100 + 0.5) % 100);
    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.'
              + num.substring(num.length - (4 * i + 3));

    ret = num + ',' + cents;

    if (x == 1) ret = ' - ' + ret; return ret;
}

/*
# Exibe mensagem ao usuário e da duas opões de ação SIM ou NÃO. #
*/
S2.ShowConfirm = function (_title, message, funcYes) {
    S2.ShowConfirm.Action = funcYes;

    var _ac = (typeof (funcYes) == "function") ? "onclick='S2.ShowConfirm.Action()'" : "";

    $("<div class='modal fade'>"
          + "<div class='modal-dialog'>"
            + "<div class='modal-content'>"
              + "<div class='modal-header'>"
                + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                + "<h4 class='modal-title'>" + _title + "</h4>"
              + "</div>"
              + "<div class='modal-body'>"
                + "<p>" + message + "</p>"
              + "</div>"
              + "<div class='modal-footer'>"
                + "<button type='button' class='btn btn-default' data-dismiss='modal'>Não</button>"
                + "<button type='button' class='btn btn-primary' data-dismiss='modal' " + _ac + ">Sim</button>"
              + "</div>"
            + "</div>"
          + "</div>"
        + "</div>").modal("show");
}

S2.ShowConfirm.Action = null;

/*
# Exibe mensagem informativa ao usuário. #
*/
S2.ShowAlert = function (_title, message, funcOk) {
    S2.ShowAlert.Action = funcOk;

    var _ac = (typeof (funcOk) == "function") ? "onclick='S2.ShowAlert.Action()'" : "";

    $("<div class='modal fade'>"
          + "<div class='modal-dialog'>"
            + "<div class='modal-content'>"
              + "<div class='modal-header'>"
                + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                + "<h4 class='modal-title'>" + _title + "</h4>"
              + "</div>"
              + "<div class='modal-body'>"
                + "<p>" + message + "</p>"
              + "</div>"
              + "<div class='modal-footer'>"
                + "<button type='button' id='btnOkShowAlert' class='btn btn-default' data-dismiss='modal' " + _ac + ">Ok</button>"
              + "</div>"
            + "</div>"
          + "</div>"
        + "</div>").on("hidden.bs.modal", function (e) {
            if (typeof (funcOk) == 'function')
                funcOk(e);
        }).modal("show");
}

/*
# Exibe um popup com o conteúdo HTML informado. #
*/
S2.ShowPopup = function (_title, _body, onClose) {
    $("<div class='modal fade'>"
          + "<div class='modal-dialog-popup'>"
            + "<div class='modal-content-popup'>"
              + "<div class='modal-header-popup'>"
                + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                + "<h4 class='modal-title-popup'>" + _title + "</h4>"
              + "</div>"
              + "<div class='modal-body-popup'>"
                + _body
              + "</div>"
              + "<div class='modal-footer-popup'>"
                + "<button type='button' class='btn btn-default' data-dismiss='modal'>Fechar</button>"
              + "</div>"
            + "</div>"
          + "</div>"
        + "</div>").on("hidden.bs.modal", function (e) {
            if (typeof (onClose) === 'function')
                onClose(e);
        }).modal("show");
}


