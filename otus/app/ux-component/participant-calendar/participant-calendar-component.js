(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantCalendar', {
            controller: Controller,
            templateUrl: 'app/ux-component/participant-calendar/participant-calendar-template.html'
        });

    Controller.$inject = [
        'otusjs.application.state.ApplicationStateService',
        'otusjs.otus.dashboard.core.EventService',
        'otusjs.otus.dashboard.service.DashboardService',
        '$scope'
    ];

    function Controller(ApplicationStateService, EventService, DashboardService, $scope) {
        var self = this;

        self.EXAM = "exam";
        self.COMPLETE = "complete";
        self.SAVED = "saved";
        self.QUESTIONNAIRE = "questionnaire"

        /* Public methods */
        self.selectParticipant = selectParticipant;
        /* Lifecycle hooks */
        self.$onInit = onInit;
        self.getCurrentState = getCurrentState;

        // svg onde o calendário é criado
        self.svg;
        // funcao que cria o calendario
        self.createCalendar = createCalendar;
        // cores (exames/azul, questionarios completos/verde, questionarios incompletos/amarelo)
        self.colors = ["#4286f4", "#1ece8b", "#f4ca41"]
        // vetor que guarda eventos do dia atualmente selecionado
        self.selectedDateEvents = [];

        self.data = [{
            "id": "SIGLA1",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "exam",
            "date": "2017-10-06"
        },
        {
            "id": "SIGLA2",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "questionnaire",
            "date": "2017-10-21"
        },
        {
            "id": "SIGLA3",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "exam",
            "date": "2018-04-01"
        },
        {
            "id": "SIGLA4",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "exam",
            "date": "2017-08-10"
        },
        {
            "id": "SIGLA5",
            "full_name": "questionnaireName",
            "status": "saved",
            "type": "questionnaire",
            "date": "2017-08-07"
        },
        {
            "id": "SIGLA6",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "questionnaire",
            "date": "2017-08-22"
        },
        {
            "id": "SIGLA7",
            "full_name": "questionnaireName",
            "status": "saved",
            "type": "exam",
            "date": "2000-08-07"
        },
        {
            "id": "SIGLA8",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "questionnaire",
            "date": "2006-08-22"
        },
        {
            "id": "SIGLA9",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "exam",
            "date": "2017-08-08"
        },
        {
            "id": "SIGLA10",
            "full_name": "questionnaireName",
            "status": "complete",
            "type": "questionnaire",
            "date": "2014-12-22"
        }];

        function createCalendar() {
            Date.prototype.toJSONLocal = function () {
                function addZ(n) {
                    return (n < 10 ? '0' : '') + n;
                }

                return this.getFullYear() + '-' +
                    addZ(this.getMonth() + 1) + '-' +
                    addZ(this.getDate());
            };

            var margin = { top: 20, right: 0, bottom: 0, left: 25 };
            var width = 850;
            var height = 400;
            var data = self.data;
            // estrutura que contem as informaçoes para cada mes visualizado
            var calendar = [];
            // numero de cada ano a ser visualizado para depois desenhar a esquerda do calendario
            var yearLabels = [];
            // dia de hoje
            var today = new Date();
            // data onde o calendario deve começar
            var firstYear = new Date(2000, 0);
            var month = firstYear.getMonth();

            // criando um item para cada mes dos anos selecionados ( a partir do mes inicial ate o mes atual)
            var i = 0;
            var col = 0;
            while (firstYear.getFullYear() != today.getFullYear() || firstYear.getMonth() != today.getMonth()) {

                var dateString = firstYear.toJSONLocal();
                var date = makeUTCDate(dateString);

                if (firstYear.getMonth() == 0) {
                    yearLabels.push({
                        col: col,
                        year: firstYear.getFullYear()
                    });
                }

                calendar.push(
                    {
                        date: date,
                        count: 0,
                        col: col,
                        events: []
                    });

                if (firstYear.getMonth() === 11) { col++; }
                firstYear = addMonths(firstYear, 1);

            }

            // iterando sobre eventos do array de entrada dos dados
            // cria um item para cada mes do ano que possui eventos
            var events = {};
            var l = data.length;
            while (l--) {
                var eventDate = new Date(data[l].date + "T00:00:00");
                eventDate = new Date(eventDate.getFullYear(), eventDate.getMonth()).toJSONLocal();

                if (!events[eventDate]) {
                    events[eventDate] = {
                        totalCount: 0,
                        eventsInfo: [],
                        numberExams: 0,
                        numberQuestionnaires: 0,
                        numberSavedQuestionnaires: 0
                    };
                }
                events[eventDate].totalCount++;
                events[eventDate].eventsInfo.push(data[l]);

                if (data[l].type == self.EXAM)
                    events[eventDate].numberExams++;
                if (data[l].type == self.QUESTIONNAIRE) {
                    if (data[l].status == self.COMPLETE)
                        events[eventDate].numberQuestionnaires++;
                    else
                        events[eventDate].numberSavedQuestionnaires++;
                }


            }
            // guardando nos itens da estrutura 'calendario' que possuem eventos as informaçoes dos mesmos
            for (var i = 0; i < calendar.length; i++) {
                if (events[calendar[i].date.toJSONLocal()]) {
                    calendar[i].count = events[calendar[i].date.toJSONLocal()].totalCount;
                    calendar[i].events = events[calendar[i].date.toJSONLocal()].eventsInfo;
                    calendar[i].numberOfEachEvent = [events[calendar[i].date.toJSONLocal()].numberExams,
                    events[calendar[i].date.toJSONLocal()].numberQuestionnaires,
                    events[calendar[i].date.toJSONLocal()].numberSavedQuestionnaires];
                }
            }

            // criando SVG dentro da DIV
            self.svg = d3.select("#calendarByYear").append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // definindo escala vertical
            var scale = d3.scaleBand().rangeRound([0, height - margin.top]).padding(0.15);
            scale.domain(calendar.map(function (d) { return d.col; }));
            // definindo escala horizontal
            var scaleMonth = d3.scaleBand().rangeRound([50, width - margin.left]).padding(0.15);
            scaleMonth.domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

            // criando retangulos em branco
            self.svg.selectAll('.cal')
                .data(calendar)
                .enter()
                .append('rect')
                .filter(function (d) { return d.count == 0; })
                .attr('class', 'cal')
                .attr('width', scaleMonth.bandwidth())
                .attr('height', scale.bandwidth())
                .attr('x', function (d, i) { return scaleMonth(d.date.getMonth()); })
                .attr('y', function (d, i) { return scale(d.col); })
                .attr('fill', '#eeeeee');


            // criando retangulos para cada tipo de evento
            // tamanho de cada retangulo eh proporcional a porcentagem de evetos daquele tipo no mes
            for (var typeIterator = 0; typeIterator < self.colors.length; typeIterator++) {

                self.svg.selectAll('.g')
                    .data(calendar)
                    .enter()
                    .filter(function (d) { return d.count != 0 && d.numberOfEachEvent[typeIterator] != 0; })
                    .append('rect')
                    .attr('class', 'cal')
                    .attr('width', function (d) {
                        return (d.numberOfEachEvent[typeIterator] / (d.numberOfEachEvent[0] + d.numberOfEachEvent[1] + d.numberOfEachEvent[2])) * scaleMonth.bandwidth();
                    })
                    .attr('height', scale.bandwidth())
                    .attr('x', function (d, i) {
                        var offset = 0;
                        for (var j = 0; j < typeIterator; j++) {
                            offset += (d.numberOfEachEvent[j] / (d.numberOfEachEvent[0] + d.numberOfEachEvent[1] + d.numberOfEachEvent[2])) * scaleMonth.bandwidth();
                        }
                        return scaleMonth(d.date.getMonth()) + offset;
                    })
                    .attr('y', function (d, i) { return scale(d.col); })
                    .attr('fill', function (d) {
                        return self.colors[typeIterator];
                    });
            }

            // evento de click para cada retangulo
            self.svg.selectAll('.cal')
                .on("click", function (d) {
                    // apaga retangulo anterior que indicava a selecao
                    self.svg.selectAll(".selection").remove();
                    // cria retangulo para indicar o mes selecionado
                    self.svg.append('rect')
                        .attr('class', 'selection')
                        .attr('width', scaleMonth.bandwidth())
                        .attr('height', scale.bandwidth())
                        .attr('x', function () { return scaleMonth(d.date.getMonth()); })
                        .attr('y', function () { return scale(d.col); })
                        .attr('fill', 'none')
                        .attr('stroke','black')
                        .attr('stroke-width',1);

                    changeEventsShowed(d);
                });

            // inserindo numero do ano a esquerda do calendario
            self.svg.selectAll('.y')
                .data(yearLabels)
                .enter()
                .append('text')
                .text(function (d) { return d.year; })
                .attr('dy', function (d) {
                    return scale(d.col) + scale.bandwidth() * 0.8;
                })
                .attr('dx', -5)
                .style("font-size", scale.bandwidth() + 'px')
                .style('text-anchor', 'start')
                .attr("transform", function (d) { "rotate(180," + (5) + "," + scale(d.col) + ")" })
                .attr('fill', '#ccc');


            // inserindo letra inicial de cada mes acima do calendario
            var monthLetters = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
            for (var i = 0; i < monthLetters.length; i++) {
                createMonthLetter(monthLetters[i], scaleMonth(i) + scaleMonth.bandwidth() * 0.4, scaleMonth.bandwidth() * 0.6)
            }

        }

        // atualiza cards abaixo do grafico quando usuario seleciona um mes para ser visualizado
        function changeEventsShowed(dateInfo) {
            self.selectedDateEvents = dateInfo.events;
            self.selectedDateEvents.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            $scope.$apply();
            console.log(self.selectedDateEvents);
        }

        // passa a data fornecida para o formado UTC
        function makeUTCDate(dateString) {
            var d = new Date(dateString);
            return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
        }

        // adiciona um numero de meses especificado a uma data
        function addMonths(date, months) {
            var result = new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
            return result;
        }

        // cria letra que representa o mes na posicao e tamanho indicados
        function createMonthLetter(letter, position, size) {
            self.svg.append('text')
                .text(letter)
                .attr('text-anchor', 'middle')
                .style("font-size", size + 'px')
                .style('fill', '#ccc')
                .attr('dx', position)
                .attr('dy', '5');
        }

        function selectParticipant(selectedParticipant) {
            self.selectedParticipant = selectedParticipant;
        }

        $scope.getStyle = function () {
            if (this.event.type == self.EXAM) {
                return self.colors[0];
            }
            else {
                if (this.event.status == self.COMPLETE) {
                    return self.colors[1];
                }
                else {

                    return self.colors[2];
                }
            }
        }

        $scope.getStatusStyle = function () {

            if (this.event.status == self.COMPLETE) {
                return self.colors[1];
            }
            else {

                return self.colors[2];
            }

        }

        /* Lifecycle methods */
        function onInit() {
            _loadSelectedParticipant();
            EventService.onParticipantSelected(_loadSelectedParticipant);
            self.selectedParticipant = null;
            self.createCalendar();
        }

        function getCurrentState() {
            return ApplicationStateService.getCurrentState();
        }

        function _loadSelectedParticipant(participantData) {
            if (participantData) {
                self.selectedParticipant = participantData;
                self.isEmpty = false;
            } else {
                DashboardService
                    .getSelectedParticipant()
                    .then(function (participantData) {
                        self.selectedParticipant = participantData;
                        self.isEmpty = false;
                    });
            }
        }
    }
}());
