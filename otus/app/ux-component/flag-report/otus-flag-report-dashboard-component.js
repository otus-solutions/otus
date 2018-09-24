(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportDashboard', {
      controller: "otusFlagReportCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/otus-flag-report-dashboard-template.html'
    })
    .controller("otusFlagReportCtrl", Controller);

  Controller.$inject = [];

  function Controller() {

    var self = this;
    var data = [];
    var drag = false;
    var initialY;
    var rect = {};
    var zoomRect = {};
    var tooltip;

    var margin = { top: 30, right: 10, bottom: 10, left: 10 };
    var canvas;
    var x;
    var y;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {

      tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");

      generateRandomDataForTesting();
      sortParticipantsByCompletion();
      createOverallFlagReport();

    }

    function createOverallFlagReport() {

      var height = 900,
        width = height / 4.5;

      // cria canvas onde sera inserido a visao geral da sinaleira
      var canvas_matrix_viz = d3.select("#canvas_id")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // cria svg onde eh criado a selecao de linhas dda sinaleira
      var svg = d3.select("#svg_id")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      // cria contexto para o canvas
      var context = canvas_matrix_viz.node().getContext('2d');

      // cria escala no eixo x
      // separa a largura disponivel para o widget por cada questionario
      x = d3.scaleBand()
        .domain(data.map(function (key, index) {
          return key.questionnaire;
        }))
        .range([0, width]);

      // cria escala no eixo y
      // separa a largura disponivel para o widget por cada participante
      y = d3.scaleBand()
        .domain(data.map(function (key, index) {
          return key.participant;
        }))
        .range([0, height]);

      // cria escala de cores, correlacionando-a com os numeros que representam cada estado
      var colorMap = d3.scaleLinear()
        .domain([-1, 0, 1, 2])
        .range(["red", "white", "yellow", "green"]);

      // criando retangulos para cada questionario de cada participante
      data.forEach(function (d, i) {
        context.beginPath();
        context.rect(x(d.questionnaire), y(d.participant), x.bandwidth(), y.bandwidth());
        context.fillStyle = colorMap(d.value);
        context.fill();
        context.closePath();
      });

      canvas = canvas_matrix_viz._groups[0][0];
      var canvasWrapper = document.getElementById('overview_id');

      // inicio da selecao dos participantes por drag
      canvasWrapper.addEventListener('mousedown', function (evt) {
        drag = true;

        initialY = getParticipantFromYCoordinate(canvas, evt, y);

        // cria retangulo que indica a selecao no SVG
        svg.selectAll("*").remove();
        rect = svg
          .append("rect")
          .style("fill", "black")
          .attr("x", 0)
          .attr("y", y(initialY))
          .attr("width", width)
          .attr("height", 1)
          .attr("opacity", 0.3);

      }, false);

      // fim da selecao dos participantes por drag
      canvasWrapper.addEventListener('mouseup', function (evt) {
        drag = false;
        var finalY = getParticipantFromYCoordinate(canvas, evt, y);

        // pega posicao no vetor do primeiro e ultimo participante da selecao
        var initialYIndex, finalYIndex;
        var selectedData = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
          if (data[i].participant === finalY) {
            finalYIndex = i;
          }
          if (data[i].participant === initialY) {
            if (!initialYIndex)
              initialYIndex = i;
          }
        }
        // remove todos os participantes antes e depois da selecao
        selectedData.length = finalYIndex + 1;
        selectedData.splice(0, initialYIndex);

        // gera nova visualizacao de sinaleira apenas com os participantes selecionados
        zoomMatrix.update(selectedData);

      }, false);

      // atualizacao do tamanho do retangulo de selecao e tooltip
      canvasWrapper.addEventListener('mousemove', function (evt) {
        var participant = getParticipantFromYCoordinate(canvas, evt, y);

        if (drag) {
          tooltip.style("visibility", "hidden");

          // atualiza tamanho da selecao feita enquanto o drag acontece
          if (y(participant) - y(initialY) > 0)
            rect.attr("height", y(participant) - y(initialY));
        }
        else {
          // atualiza tooltip com as informacoes do questionario e participante
          var questionnaire = getQuestionnaireFromXCoordinate(canvas, evt, x);
          if (questionnaire && participant) {
            tooltip.style("visibility", "visible");
            tooltip.text("Participante: " + participant + "; Questionario: " + questionnaire);
            tooltip.style("top", (evt.pageY - 10) + "px").style("left", (evt.pageX + 10) + "px");
          }

        }

      }, false);

      // retira a visibilidade da tooltip quando o mouse nao esta posicionado no canvas
      canvasWrapper.addEventListener("mouseout", function (evt) {
        return tooltip.style("visibility", "hidden");
      });
    }

    function getQuestionnaireFromXCoordinate(canvas, evt, x) {
      var mousePos = getMousePos(canvas, evt);
      var inverseModeScale = d3.scaleQuantize()
        .domain(x.range())
        .range(x.domain());

      return inverseModeScale(mousePos.x);

    }

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    function getParticipantFromYCoordinate(canvas, evt, y) {
      var mousePos = getMousePos(canvas, evt);
      var inverseModeScale = d3.scaleQuantize()
        .domain(y.range())
        .range(y.domain());

      return inverseModeScale(mousePos.y);
    }

    function sortParticipantsByCompletion() {

      var currentParticipant = "";
      var currentSummedValue = null;
      var currentParticipantData = []
      var dataToBeOrganized = [];

      for (var i = 0; i < data.length; i++) {
        if (currentParticipant != data[i].participant) {
          currentParticipant = data[i].participant;

          if (currentSummedValue != null) {
            // checa soma total e decide lugar no vetor
            dataToBeOrganized.push({ data: currentParticipantData, value: currentSummedValue });
          }
          currentSummedValue = 0;
          currentParticipantData = [];
          currentParticipantData.push(data[i]);

        }
        else {
          currentSummedValue += data[i].value;
          currentParticipantData.push(data[i]);
        }
      }

      dataToBeOrganized.sort(function (a, b) {
        return b.value - a.value;
      })


      var organizedData = [];
      for (var i = 0; i < dataToBeOrganized.length; i++) {
        for (var j = 0; j < dataToBeOrganized[i].data.length; j++) {
          organizedData.push(dataToBeOrganized[i].data[j]);
        }
      }
      data = organizedData;

    }

    function generateRandomDataForTesting() {
      var nQuestionnaires = 39;
      var nParticipants = 5000;

      for (var j = 0; j < nParticipants; j++) {
        for (var i = 0; i < nQuestionnaires; i++) {
          var random = Math.random();
          var value;

          if (random < 0.25) {
            value = -1;
          } else if (random <= 0.50) {
            value = 0;
          } else if (random <= 0.75) {
            value = 1;
          }
          else {
            value = 2;
          }
          data.push({ participant: 'P' + j, questionnaire: 'Q' + i, value: value });
        }
      }

    }
  }

}());