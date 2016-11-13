'use strict';

// Declare app level module which depends on views, and components
angular.module('biblioteca.concurseiro.public', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl:'templates/questoes.template.html',
        controller: 'QuestoesPublicController',
        controllerAs: 'questoesPublicController'
      })}]).
filter('trust',['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);
