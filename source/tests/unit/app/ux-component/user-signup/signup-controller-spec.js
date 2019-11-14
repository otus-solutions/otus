describe('signupController Test suite', function () {

  var Mock = {};
  var ctrl;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
  });


  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      Injections.ApplicationStateService = $injector.get("otusjs.application.state.ApplicationStateService");
      Injections.SignupService = $injector.get("otusjs.user.access.service.SignupService");
      Injections.LoadingScreenService = $injector.get("otusjs.deploy.LoadingScreenService");
    })
  });


  beforeEach(function () {
    angular.mock.inject(function ($controller) {
      ctrl = $controller('otusjs.otus.uxComponent.SignupController', Injections);
    })
  });

  // beforeEach(function () {
  //   angular.mock.inject(function ($controller) {
  //     ctrl = $controller('otusjs.otus.uxComponent.SignupController');
  //     ctrl.signupForm = {
  //       $setValidity: function (atribute, value) {
  //         this.atribute = value
  //       },
  //       email: {
  //         $setValidity: function (atribute, value) {
  //           this.atribute = value
  //         }
  //       }
  //     };
  //     spyOn(ctrl.signupForm.email, '$setValidity');
  //     spyOn(ctrl.signupForm, '$setValidity');
  //   });
  // });

  it('controllerExistence check ', function () {
    expect(ctrl).toBeDefined();
  });

  // it('controllerMethodsExistence check', function () {
  //   expect(ctrl.signup).toBeDefined();
  //   expect(ctrl.back).toBeDefined();
  //   expect(ctrl.agree).toBeDefined();
  //   expect(ctrl.resetEmailValidation).toBeDefined();
  // });
  //
  // it('resetEmailValidationMethod', function () {
  //   ctrl.resetEmailValidation();
  //   expect(ctrl.signupForm.email.$setValidity).toHaveBeenCalledWith('emailInUse', true);
  //   expect(ctrl.signupForm.$setValidity).toHaveBeenCalledWith('emailInUse', true);
  // });
});


// describe('signupController Test suite', function () {
//
//   var Mock = {};
//   var ctrl;
//
//   beforeEach(function () {
//     angular.mock.module('otusjs.otus.uxComponent');
//   });
//
//   beforeEach(function () {
//     Mock.ApplicationStateServiceProvider = {};
//     Mock.SignupService = {};
//     Mock.LoadingScreenService = {}
//
//     angular.mock.module(function ($provide) {
//       $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateServiceProvider);
//       $provide.value('otusjs.user.access.service.SignupService', Mock.SignupService);
//       $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
//     });
//   });
//
//   beforeEach(function () {
//     angular.mock.inject(function ($controller) {
//       ctrl = $controller('otusjs.otus.uxComponent.SignupController');
//       ctrl.signupForm = {
//         $setValidity: function (atribute, value) {
//           this.atribute = value
//         },
//         email: {
//           $setValidity: function (atribute, value) {
//             this.atribute = value
//           }
//         }
//       };
//       spyOn(ctrl.signupForm.email, '$setValidity');
//       spyOn(ctrl.signupForm, '$setValidity');
//     });
//   });
//
//   it('controllerExistence check ', function () {
//     expect(ctrl).toBeDefined();
//   });
//
//   it('controllerMethodsExistence check', function () {
//     expect(ctrl.signup).toBeDefined();
//     expect(ctrl.back).toBeDefined();
//     expect(ctrl.agree).toBeDefined();
//     expect(ctrl.resetEmailValidation).toBeDefined();
//   });
//
//   it('resetEmailValidationMethod', function () {
//     ctrl.resetEmailValidation();
//     expect(ctrl.signupForm.email.$setValidity).toHaveBeenCalledWith('emailInUse', true);
//     expect(ctrl.signupForm.$setValidity).toHaveBeenCalledWith('emailInUse', true);
//   });
// });