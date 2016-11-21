/**
 * Created by paulo on 11/11/2016.
 */
(function () {
    'use strict';

    angular.module('biblioteca.concurseiro.public')
        .controller('QuestoesPublicController', QuestoesPublicController);

    QuestoesPublicController.$inject = ['$route', '$routeParams', '$q', '$filter', 'QuestoesPublicService', 'Enum'];

    function QuestoesPublicController($route, $routeParams, $q, $filter, QuestoesPublicService, Enum) {
        var vm = this;

        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.skip = 0;
        vm.questoesPorPagina = 5;

        vm.pageChanged = pageChanged;
        vm.populateFilterInstituicao = populateFilterInstituicao;
        vm.populateFilterCargo = populateFilterCargo;
        vm.populateFilterConcurso = populateFilterConcurso;
        vm.populateFilterDisciplinas = populateFilterDisciplinas;
        vm.filterQuestoes = filterQuestoes;
        vm.responderQuestao = responderQuestao;
        vm.cleanFilter = cleanFilter;
        vm.pageChanged = pageChanged;
        vm.indiceQuestao = indiceQuestao;
        vm.questaoSelected = {};
        vm.nivelQuestao = Enum.QUESTAO.TIPO_QUESTAO_LIST;
        vm.modalidadeQuestao = Enum.QUESTAO.MULTIPLA_ESCOLHA;
        vm.MENSAGENS = Enum.MENSAGENS;
        vm.indiceAtual = 0;

        vm.bancas = {};
        vm.instituicoes = [];
        vm.cargos = [];
        vm.concursos = [];
        vm.disciplinas = [];
        vm.filter = {};
        vm.showCorreta = {};
        vm.showIncorreta = {};
        function indiceQuestao(indice){
            vm.indiceAtual = 0;
            if(vm.currentPage > 1){
                vm.indiceAtual = ((vm.currentPage-1)*parseInt(vm.questoesPorPagina)) + indice+1;
            }else{
                vm.indiceAtual = indice + 1;
            }
        }

        function cleanFilter(){
            vm.filter.cargo = undefined;
            vm.filter.anoConcurso = undefined;
            vm.filter.nivelQuestao = undefined;
            vm.filter.modalidadeQuestao = undefined;
            vm.filter.disciplina = undefined;
            vm.filter.banca = undefined;
            vm.filter.instituicao = undefined;
            vm.filter.assunto = undefined;

            filterQuestoes();
        }
        function filterQuestoes(){
            var params = {
                "cargo_id" : vm.filter.cargo || null,
                "concurso_id" : vm.filter.anoConcurso || null,
                "nivel_questao" : vm.filter.nivelQuestao || null,
                "tipo_questao" : vm.filter.modalidadeQuestao || null,
                "disciplina_id" : vm.filter.disciplina || null,
                "banca_id" : vm.filter.banca || null,
                "orgao_id" : vm.filter.instituicao || null,
                "assunto_id" : vm.filter.assunto || null,
                'skip' : vm.skip,
                'top' : vm.questoesPorPagina
            };
            QuestoesPublicService.getQuestoes(params).then(function(result){
                vm.questoes = result.data.filtroQuestoes;
                vm.totalQuestoes = vm.questoes['X-Total-Questoes'];
            });
        }
        function responderQuestao(respostaSelecionada){
            if(parseInt(respostaSelecionada.correta) === 1){
                vm.showCorreta.questao_id = parseInt(respostaSelecionada.questao_id);
                vm.showIncorreta = {};
            }else{
                vm.showCorreta = {};
                vm.showIncorreta.questao_id = parseInt(respostaSelecionada.questao_id);
            }
        }
        function populateFilterInstituicao(banca) {
            var filter = vm.bancas.filter(function (data) {
                return data.banca.id === banca;
            });
            getInstituicoes(filter);
        }

        function populateFilterCargo(instituicao) {
            vm.cargos = [];
            if (instituicao) {
                var params = {
                    "orgao_id": instituicao
                };
                QuestoesPublicService.getCargos(params).then(function (result) {
                    vm.cargos = result.data.filtroCargos;
                });
            }
        }
        function populateFilterConcurso(cargo){
            vm.concursos = [];
            if (cargo) {
                var params = {
                    "cargo_id": cargo
                };
                QuestoesPublicService.getConcursos(params).then(function (result) {
                    vm.concursos = result.data.filtroConcursos;
                });
            }
        }
        function populateFilterDisciplinas(cargo, concurso, nivel){

            var params = {
                "cargo_id" : cargo || null,
                "concurso_id" : concurso || null,
                "nivel_questao" : nivel || null
            };
            QuestoesPublicService.getDisciplinas(params).then(function (result) {
                vm.disciplinas = result.data.filtroDisciplinas;
            });
        }

        function getInstituicoes(filter) {
            vm.instituicoes = [];
            angular.forEach(filter, function (value) {
                angular.forEach(value.orgao, function (v) {
                    vm.instituicoes.push(v);
                });
            });
        }

        function pageChanged() {
            vm.skip = (vm.currentPage * 10) - 10;
            filterQuestoes();
        }

        function activate() {
            $q.all([
                QuestoesPublicService.getBancas().then(function (result) {
                    return result;
                }),
                QuestoesPublicService.getDisciplinas().then(function (result) {
                    return result;
                }),
                QuestoesPublicService.getQuestoes({skip:0, top:vm.questoesPorPagina}).then(function(result){
                    return result;
                }),
                QuestoesPublicService.getCargos().then(function(result){
                    return result;
                }),
                QuestoesPublicService.getAssuntos({skip:0, top:vm.questoesPorPagina}).then(function(result){
                    return result;
                }),
                QuestoesPublicService.getProvas().then(function(result){
                    return result;
                }),
                QuestoesPublicService.getConcursos().then(function(result){
                    return result;
                }),
                QuestoesPublicService.getInstituicoes().then(function(result){
                    return result;
                })
            ]).then(function (data) {
                if (data[0] && data[1] && data[2]) {
                    vm.bancas = data[0].data;
                    vm.disciplinas = data[1].data.filtroDisciplinas;
                    vm.questoes = data[2].data.filtroQuestoes;
                    vm.cargos = data[3].data.filtroCargos;
                    vm.assuntos = data[4].data.filtroAssuntos;
                    vm.provas = data[5].data.filtroProvas;
                    vm.concursos = data[6].data.filtroConcursos;
                    vm.instituicoes = data[7].data;
                    vm.totalQuestoes = vm.questoes['X-Total-Questoes'];
                }
            });
        }
        activate();


    }
})();
