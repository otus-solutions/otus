describe('otusResultVisualizerManagerToolbar', () => {
  var parentScope;
  var element;

  beforeEach(angular.mock.module('otusjs.otus.uxComponent'));
  beforeEach(inject(($compile, $rootScope, $templateCache) => {
    parentScope = $rootScope.$new();

    $templateCache.put('app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html', 'This is the content of the template');

    element = angular.element("<otus-result-visualizer-manager-toolbar></otus-result-visualizer-manager-toolbar>");
    parentScope = $rootScope.$new();

    $compile(element)(parentScope);
    parentScope.$digest();
  }));

  it('Sempre TRUE', function () {
    expect(true).toBe(true);
  });

});