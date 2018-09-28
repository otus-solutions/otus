(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportVisualization', {
      controller: Controller,
      templateUrl: 'app/ux-component/flag-report/visualization/otus-flag-report-visualization-template.html',
      bindings: {
        activitiesData: "=",
        onUpdate: "="
      }
    });

  Controller.$inject = ["$element"];

  function Controller($element) {

    var zoomColors = ["#ef5545", "white", "#fcff82", "#91ef45"];
    var overviewColors = ["red", "white", "yellow", "green"];

    var activitiesData = [];
    var drag = false;
    var initialY;
    var rect = {};
    var zoomRect = {};

    var y;
    var x;

    var tooltip;
    var self = this;

    var selectedAcronym = null;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {

      constructor();
      self.onUpdate = constructor;
      $(window).resize(function () {
        _clearCanvasZoomed();
      })
    }

    function constructor(activities = null, acronym = null, status = null) {
      activitiesData = activities ? activities : self.activitiesData;
      tooltip = createTooltip();

      if (acronym)
        selectedAcronym = acronym;
      else
        selectedAcronym = null;

      if (status) {
        filterFlagReportByStatus(activitiesData, status);
      }
      else {
        createOverviewFlagReport(activitiesData, overviewColors, zoomColors);
      }

    }

    function createOverviewFlagReport(data, colors, zoomedColors) {

      var margin = { top: 0, right: 0, bottom: 0, left: 0 };
      var height = 700,
        width = height / 4.5;

      // cria canvas onde sera inserido a visao geral da sinaleira
      var canvas_matrix_viz = selectDiv("#canvas_id", width, height, margin);
      // cria svg onde eh criado a selecao de linhas dda sinaleira
      var svg = selectDiv("#svg_id", width, height, margin);
      svg.selectAll("*").remove();

      _clearCanvasZoomed();

      x = createQuestionnaireScale(data, width);
      y = createParticipantScale(data, height);

      // cria escala de cores, correlacionando-a com os numeros que representam cada estado
      var colorMap = createColorScale(colors);

      // criando retangulos para cada questionario de cada participante
      drawFlagReportMatrix(data, canvas_matrix_viz, x, y, colorMap);

      var canvas = canvas_matrix_viz._groups[0][0];
      var canvasWrapper = document.getElementById('overview_id');

      // inicio da selecao dos participantes por drag
      canvasWrapper.addEventListener('mousedown', function overviewOnMouseDown(evt) {
        drag = true;
        initialY = getParticipantFromYCoordinate(canvas, evt, y);

        // cria retangulo que indica a selecao no SVG
        svg.selectAll("*").remove();
        rect = createSelectionRectangle(svg, x, y, 0.3);
        rect.attr("y", y(initialY));

      }, false);


      // fim da selecao dos participantes por drag
      canvasWrapper.addEventListener('mouseup', function (evt) {
        drag = false;
        var finalY = getParticipantFromYCoordinate(canvas, evt, y);

        // pega posicao no vetor do primeiro e ultimo participante da selecao
        var initialYIndex, finalYIndex;
        var selectedData = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
          if (data[i].rn === finalY) {
            if (!finalYIndex)
              finalYIndex = i;
          }
          if (data[i].rn === initialY) {
            if (!initialYIndex)
              initialYIndex = i;
          }
        }
        if (initialYIndex > finalYIndex) {
          var dummy = initialYIndex;
          initialYIndex = finalYIndex;
          finalYIndex = dummy;
        }

        // remove todos os participantes antes e depois da selecao
        if (finalYIndex == initialYIndex) {
          selectedData = [selectedData[initialYIndex]];
        }
        else {
          selectedData.length = finalYIndex + 1;
          selectedData.splice(0, initialYIndex);
        }

        // gera nova visualizacao de sinaleira apenas com os participantes selecionados
        createZoomedFlagReport(selectedData, zoomedColors);

      }, false);



      // atualizacao do tamanho do retangulo de selecao e tooltip
      canvasWrapper.addEventListener('mousemove', function (evt) {
        var participant = getParticipantFromYCoordinate(canvas, evt, y);

        if (drag) {
          tooltip.style("visibility", "hidden");
          // atualiza tamanho da selecao feita enquanto o drag acontece
          if (initialY && participant) {

            if ((y(participant) - y(initialY)) > 0) {
              rect.attr("height", y(participant) - y(initialY) + y.bandwidth());
            }
            else {
              rect.attr("y", y(participant));
              rect.attr("height", y(initialY) - y(participant) + y.bandwidth());
            }
          }


        }
        else {
          // atualiza tooltip com as informacoes do questionario e participante
          var questionnaire = getQuestionnaireFromXCoordinate(canvas, evt, x);
          if (questionnaire && participant) {
            tooltip.style("visibility", "visible");
            tooltip.text("Participante: " + participant + "\n Questionario: " + questionnaire);
            tooltip.style("top", (evt.pageY - 10) + "px").style("left", (evt.pageX + 10) + "px");
          }

        }

      }, false);

      // retira a visibilidade da tooltip quando o mouse nao esta posicionado no canvas
      canvasWrapper.addEventListener("mouseout", function (evt) {
        return tooltip.style("visibility", "hidden");
      });
    }

    function _clearCanvasZoomed() {
      var margin = { top: 30, right: 10, bottom: 10, left: 10 };


      var height = 700,
        width = window.innerWidth - (window.innerWidth / 3);

      var canvas_matrix_viz = selectDiv("#canvas_zoom_id", width, height, margin);
      var svg = selectDiv("#svg_zoom_id", width, height, margin);

      var context = canvas_matrix_viz.node().getContext('2d');
      var canvas = canvas_matrix_viz._groups[0][0];

      svg.selectAll("*").remove();
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function createZoomedFlagReport(selectedData, colors) {

      var margin = { top: 30, right: 10, bottom: 10, left: 10 };
      var canvas;
      var zoomX;
      var zoomY;

      var height = 700,
        width = window.innerWidth - (window.innerWidth / 3);

      var canvas_matrix_viz = selectDiv("#canvas_zoom_id", width, height, margin);
      var svg = selectDiv("#svg_zoom_id", width, height, margin);
      svg.selectAll("*").remove();

      if (!selectedData || selectedData <= 0)
        return;

      zoomX = createQuestionnaireScale(selectedData, width);
      zoomY = createParticipantScale(selectedData, height);

      var colorMap = createColorScale(colors);

      zoomRect = createSelectionRectangle(svg, zoomX, zoomY, 0.2);
      drawFlagReportMatrix(selectedData, canvas_matrix_viz, zoomX, zoomY, colorMap);
      canvas = canvas_matrix_viz._groups[0][0];

      document.getElementById('zoom_id').addEventListener('mousemove', function (evt) {
        var participant = getParticipantFromYCoordinate(canvas, evt, zoomY);
        var questionnaire = getQuestionnaireFromXCoordinate(canvas, evt, zoomX);

        if (questionnaire && participant) {
          zoomRect.attr("y", zoomY(participant));

          tooltip.style("visibility", "visible");
          tooltip.text("Participante: " + participant + "\n Questionario: " + questionnaire);
          tooltip.style("top", (evt.pageY - 10) + "px").style("left", (evt.pageX + 10) + "px");
        }
      }, false);

      document.getElementById('zoom_id').addEventListener("mouseout", function (evt) {
        return tooltip.style("visibility", "hidden");
      });
    }

    function filterFlagReportByStatus(data, status) {

      var oColors = ["white", "white", "white", "white"];
      var zColors = ["white", "white", "white", "white"];

      switch (status) {
        case -1:
          oColors[0] = overviewColors[0];
          zColors[0] = zoomColors[0];
          break;

        case 0:
          oColors[1] = "grey";
          zColors[1] = "grey";
          break;

        case 1:
          oColors[2] = "#c9d147";
          zColors[2] = "#dde559";
          break;

        case 2:
          oColors[3] = overviewColors[3];
          zColors[3] = zoomColors[3];
          break;

      }

      createOverviewFlagReport(data, oColors, zColors);
    }

    function drawFlagReportMatrix(mData, canvas, xScale, yScale, colorMap) {
      var context = canvas.node().getContext('2d');

      mData.forEach(function (d, i) {
        d.activities.forEach(function (f, g) {
          context.beginPath();
          context.rect(xScale(f.acronym), yScale(d.rn), xScale.bandwidth(), yScale.bandwidth());
          if (!selectedAcronym || f.acronym == selectedAcronym)
            context.fillStyle = colorMap(f.status);
          else {
            var colorString = colorMap(f.status).split(")");
            colorString[1] = ",0.2)";
            context.fillStyle = colorString[0] + colorString[1];
          }
          context.fill();
          context.closePath();
        })

      });
    }

    function selectDiv(divName, width, height, margin) {
      return d3.select(divName)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    }

    function createParticipantScale(selData, height) {
      return d3.scaleBand()
        .domain(selData.map(function (key, index) {
          return key.rn;
        }))
        .range([0, height]);
    }

    function createQuestionnaireScale(selData, width) {
      return d3.scaleBand()
        .domain(selData[0].activities.map(function (key, index) {
          return key.acronym;
        }))
        .range([0, width]);
    }

    function createColorScale(colors) {
      return d3.scaleLinear()
        .domain([-1, 0, 1, 2])
        .range(colors);
    }

    function createSelectionRectangle(svg, xScale, yScale, opacity) {
      return svg
        .append("rect")
        .style("fill", "black")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", xScale.range()[1])
        .attr("height", yScale.bandwidth())
        .style("opacity", opacity);
    }

    function createTooltip() {
      return d3.select("body")
        .append("md-tooltip")
        .style("position", "absolute")
        .style("background", "rgba(113, 113, 113, 1)")
        .style("padding", "4px")
        .style("border-radius", "3px")
        .style("white-space", "pre-wrap")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");
    }

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    function getQuestionnaireFromXCoordinate(canvas, evt, x) {
      var mousePos = getMousePos(canvas, evt);
      var inverseModeScale = d3.scaleQuantize()
        .domain(x.range())
        .range(x.domain());

      return inverseModeScale(mousePos.x);

    }

    function getParticipantFromYCoordinate(canvas, evt, y) {
      var mousePos = getMousePos(canvas, evt);
      var inverseModeScale = d3.scaleQuantize()
        .domain(y.range())
        .range(y.domain());

      return inverseModeScale(mousePos.y);
    }

  }
})()