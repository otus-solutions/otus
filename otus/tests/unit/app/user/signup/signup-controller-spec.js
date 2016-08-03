describe('SignupController', function() {

    var Mock = {};
    var controller;

    beforeEach(function() {
        module('otus');

        mockUserData();

        inject(function(_$controller_, _$injector_, $rootScope) {
            controller = _$controller_('SignupController', {
                $scope: mockScope($rootScope),
                SignupService: mockDashboardStateService(_$injector_),
                SignupService: mockSignupService(_$injector_)
            });
        });
    });

    describe('signup method', function() {

        it('should set isWaiting to true', function() {
            controller.signup(Mock.user);

            expect(controller.isWaiting).toBe(true);
        });

        it('should call SignupService.executeSignup', function() {
            controller.signup(Mock.user);

            expect(Mock.SignupService.executeSignup).toHaveBeenCalled();
        });

        xit('should call DashboardStateService.goToSignupResult', function() {
            controller.signup(Mock.user);

            expect(Mock.DashboardStateService.goToSignupResult).toHaveBeenCalled();
        });

        xit('should call DashboardStateService.goToSignupResult', function() {
            controller.signup(Mock.user);

            expect(Mock.$scope.signupForm.email.$setValidity).toHaveBeenCalled();
        });

    });

    describe('back method', function() {

        it('should call DashboardStateService.goToLogin', function() {
            controller.back();

            expect(Mock.DashboardStateService.goToLogin).toHaveBeenCalled();
        });

    });

    describe('agree method', function() {

        it('should call DashboardStateService.goToLogin', function() {
            controller.agree();

            expect(Mock.DashboardStateService.goToLogin).toHaveBeenCalled();
        });

    });

    function mockSignupService($injector) {
        Mock.SignupService = $injector.get('SignupService');

        spyOn(Mock.SignupService, 'executeSignup').and.callThrough();

        return Mock.SignupService;
    }

    function mockDashboardStateService($injector) {
        Mock.DashboardStateService = $injector.get('DashboardStateService');

        spyOn(Mock.DashboardStateService, 'goToSignupResult');
        spyOn(Mock.DashboardStateService, 'goToLogin');

        return Mock.DashboardStateService;
    }

    function mockUserData() {
        Mock.user = {};
    }

    function mockScope($rootScope) {
        Mock.$scope = $rootScope.$new();
        Mock.$scope.signupForm = {};
        Mock.$scope.signupForm.email = {
            $setValidity: function(flag, value)  {

            }
        };

        spyOn(Mock.$scope.signupForm.email, '$setValidity');

        return Mock.$scope;
    }

});
