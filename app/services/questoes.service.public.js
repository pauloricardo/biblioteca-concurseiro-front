/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca.concurseiro.public')
    .service('QuestoesPublicService', QuestoesPublicService);

QuestoesPublicService.$inject = ['$http', '$q', 'CommonConfig'];
function QuestoesPublicService($http, $q, CommonConfig) {
    var vm = this;

    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };
    var exports = {
        'getQuestoes': getQuestoes,
        'getDisciplinas': getDisciplinas,
        'getBancas': getBancas,
        'getCargos': getCargos,
        'getNivelQuestao': getNivelQuestao,
        'getAssuntos': getAssuntos,
        'getModalidades': getModalidades,
        'getConcursos' : getConcursos
    };
    return exports;

    function getQuestoes(_params) {
            return $http({
                method: 'GET',
                url: CommonConfig.getBaseUrl() + '/public/questoes',
                headers: _headers,
                params : _params
            });
    }

    function getDisciplinas(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/disciplinas',
            headers: _headers,
            params : _params
        });
    }

    function getBancas(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/bancas',
            headers: _headers,
            params : _params
        });
    }
    function getNivelQuestao(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/nivelquestao',
            headers: _headers,
            params : _params
        });
    }

    function getAssuntos(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/assuntos',
            headers: _headers,
            params : _params
        });
    }
    function getModalidades(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/modalidades',
            headers: _headers,
            params : _params
        });
    }
    function getCargos(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/cargos',
            headers: _headers,
            params : _params
        });
    }
    function getConcursos(_params) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/public/concursos',
            headers: _headers,
            params : _params
        });
    }






}


