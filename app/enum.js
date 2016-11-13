/**
 * Created by paulo on 18/09/2016.
 */
var Enum = {
    'QUESTAO' : {
        'TIPO_QUESTAO' : {
            'MÉDIO' : 1,
            'TÉCNICO' : 2,
            'SUPERIOR' : 3
        },
        'TIPO_QUESTAO_LIST' : [
            {
                'id' : 1,
                'nome' : 'MEDIO'
            },
            {
                'id' : 2,
                'nome' : 'FUNDAMENTAL'
            },
            {
                'id' : 3,
                'nome' : 'SUPERIOR'
            }
        ],
        'MULTIPLA_ESCOLHA' : [
            {
                'id' : 1,
                'nome' : 'Múltipla Escolha'
            },
            {
                'id' : 2,
                'nome' : 'Verdadeiro ou Falso'

            }
        ]
    },
    "MENSAGENS" : {
        "MSG_QUESTAO_CORRETA" : "Parabéns! Você acertou!",
        "MSQ_QUESTAO_INCORRETA" : "Que pena! Você errou. Tente novamente!"
    }
};

angular
    .module('biblioteca.concurseiro.public')
    .constant('Enum', Enum);
