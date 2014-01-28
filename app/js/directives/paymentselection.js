four51.app.directive('paymentselector', function() {
   var obj = {
       restrict: 'E',
       templateUrl: 'partials/controls/paymentSelection.html',
       controller: function($scope, $rootScope) {
	       $scope.isSplitBilling = false;
           $scope.setPaymentMethod = function(type) {
               $scope.currentOrder.PaymentMethod = type;
               $rootScope.$broadcast('event:paymentMethodChange', type);
           };

	       $scope.setBudgetAccount = function(count) {
		       $scope.setPaymentMethod('BudgetAccount');
		       if ($scope.currentOrder.BudgetAccountID || count > 1) return;
		       angular.forEach($scope.SpendingAccounts, function(a) {
			       if (a.AccountType.PurchaseCredit) {
				       $scope.currentOrder.BudgetAccountID = a.ID;
				       $scope.selectedBudgetAccount = a;
			       }
		       });
	       };

	       if ($scope.currentOrder.PaymentMethod == 'BudgetAccount') {
				if ($scope.currentOrder.BudgetAccountID == null) {
					$scope.selectedBudgetAccount = $scope.SpendingAccounts[0];
					$scope.currentOrder.BudgetAccountID = $scope.SpendingAccounts[0].ID;
				}
		       angular.forEach($scope.SpendingAccounts, function(a) {
			       if (a.AccountType.PurchaseCredit && a.ID == $scope.currentOrder.BudgetAccountID) {
				       $scope.selectedBudgetAccount = a;
			       }
		       });
           }
	   }
   };

   return obj;
});