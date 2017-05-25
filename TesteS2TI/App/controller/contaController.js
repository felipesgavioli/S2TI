app.controller("ContaController", function ($scope, $http, NgTableParams) {

    //Variáveis iniciais
    $scope.Conta = [];  
    $scope.valorTotal = 0.0;
    $scope.indexExcluir = -1;

    //Carregar inicial
    $scope.Pesquisar = function () {

        $scope.CarregarNgTable($scope, NgTableParams, $scope.Conta);
        $scope.SomaTotal();
        $scope.ResetCampos();
    };

    //Adicionar item valido na lista
    $scope.AdicionarItem = function (conta) {

        $scope.ResetAlert();

        if (conta.Valor === 0) {
            $("#validacaoZero").show()
            return false;
        }

        if ($scope.VerificaSaque(conta.Valor, conta.Tipo)) {
            $scope.Conta.push({
                Tipo: conta.Tipo,
                Valor: conta.Valor
            });
            $scope.Pesquisar();
        }
        
    };

    //Verifica valores para saque, somente possível sacar saldo disponível em conta
    $scope.VerificaSaque = function (saque, tipo) {
        if (($scope.valorTotal < saque) && (tipo === "0")) {
            $("#validacaoSaldo").show()
            return false;
        }
        return true;
    }

    //Mensagem para confirmação de exclusão
    $scope.ConfirmDelete = function (id) {
        $scope.ResetAlert();
        $scope.indexExcluir = id;
        $('#confirmaExcluir').modal();
    };

    //Remover item da lista
    $scope.RemoverItem = function () {

        if ($scope.indexExcluir > -1) {
            $scope.Conta.splice($scope.indexExcluir, 1);            
        }
        $scope.Pesquisar();
    };


    //Somar o saldo total em conta
    $scope.SomaTotal = function () {
        var totalDeposito = 0.0;
        var totalSaque = 0.0;
        for (var i = 0; i < $scope.Conta.length; i++) {
            if ($scope.Conta[i].Tipo === "1") {
                totalDeposito += $scope.Conta[i].Valor;
            }
            if ($scope.Conta[i].Tipo === "0") {
                totalSaque += $scope.Conta[i].Valor;
            }
        }

        $scope.valorTotal = (totalDeposito - totalSaque);
    }

    //Descrição no Tipo para retornar dentro do Ng-Table
    $scope.retornoTipo = function (tipo) {
        return tipo == 0 ? "SAQUE" : "DEPÓSITO";
    }

    //Parametro para carregar o Ng-Table
    $scope.CarregarNgTable = function (scope, NgTableParams, data) {
        scope.tableParams = new NgTableParams({ count: 10 }, { counts: [10, 15, 25], dataset: data });
    }

    //Resetar campos e fechar modal de confirmação de exclusão
    $scope.ResetCampos = function(){
        $scope.Conta.Tipo = "0";
        $scope.Conta.Valor = 0.0;
        $('#confirmaExcluir').modal('hide');
    }

    //Limpar mensagem de alerta
    $scope.ResetAlert = function () {
        $('.alert').hide();
    }

});


