describe('activity-status-item-factory Test', function() {
    var Mock = {};
    var factory;
    var Injections = {};
    var item;

    beforeEach(function() {
      angular.mock.module('otusjs.otus.uxComponent');

      inject(function(_$injector_) {
        mockData();
        factory = _$injector_.get('otusjs.otus.uxComponent.ActivityStatusItemFactory');
      });
      factory.create(Mock.data);
    });
    it('should create an ActivityStatusItem', function() {
      item = factory.create(Mock.data);
      expect(item.user.formattedName).toBeDefined();
      expect(item.user.formattedName).toEqual(Mock.formattedName);
      expect(item.user.name).toEqual(Mock.data.user.name);
    });


    function mockData() {
      Mock.formattedName = "Emanoel Vianna";
      Mock.data = {
        "objectType": "ActivityStatus",
        "name": "FINALIZED",
        "date": "2018-11-08T15:15:45.810Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      };
    }

});
