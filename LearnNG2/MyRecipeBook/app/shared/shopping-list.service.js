System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ShoppingListService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ShoppingListService = (function () {
                function ShoppingListService() {
                }
                ShoppingListService.prototype.getItem = function (index) {
                    return this.shoppingList[index];
                };
                ShoppingListService.prototype.getAllItems = function () {
                    return this.shoppingList;
                };
                ShoppingListService.prototype.insertItem = function (item) {
                    this.shoppingList.push(item);
                };
                ShoppingListService.prototype.insertItems = function (items) {
                    Array.prototype.push.apply.(this.shoppingList, items);
                };
                ShoppingListService.prototype.getItemIndex = function (item) {
                    return this.shoppingList.indexOf(item);
                };
                ShoppingListService.prototype.removeItem = function (item) {
                    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
                };
                ShoppingListService.prototype.updateItem = function (index, item) {
                    this.shoppingList[index] = item;
                };
                ShoppingListService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ShoppingListService);
                return ShoppingListService;
            }());
            exports_1("ShoppingListService", ShoppingListService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zaG9wcGluZy1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTtnQkFBQTtnQkE4QkEsQ0FBQztnQkEzQkcscUNBQU8sR0FBUCxVQUFRLEtBQVk7b0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUVELHlDQUFXLEdBQVg7b0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsd0NBQVUsR0FBVixVQUFXLElBQWU7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELHlDQUFXLEdBQVgsVUFBWSxLQUF1QjtvQkFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFFRCwwQ0FBWSxHQUFaLFVBQWEsSUFBZTtvQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUVELHdDQUFVLEdBQVYsVUFBVyxJQUFlO29CQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFFRCx3Q0FBVSxHQUFWLFVBQVcsS0FBWSxFQUFFLElBQWU7b0JBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNwQyxDQUFDO2dCQS9CTDtvQkFBQyxpQkFBVSxFQUFFOzt1Q0FBQTtnQkFnQ2IsMEJBQUM7WUFBRCxDQTlCQSxBQThCQyxJQUFBO1lBOUJELHFEQThCQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9zaG9wcGluZy1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJbmdyZWRpYW50fSBmcm9tIFwiLi9pbmdyZWRpYW50XCI7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIFNob3BwaW5nTGlzdFNlcnZpY2Uge1xuICAgIHNob3BwaW5nTGlzdDogQXJyYXk8SW5ncmVkaWFudD47XG5cbiAgICBnZXRJdGVtKGluZGV4Om51bWJlcil7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3BwaW5nTGlzdFtpbmRleF07XG4gICAgfVxuXG4gICAgZ2V0QWxsSXRlbXMoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvcHBpbmdMaXN0O1xuICAgIH1cblxuICAgIGluc2VydEl0ZW0oaXRlbTpJbmdyZWRpYW50KXtcbiAgICAgICAgdGhpcy5zaG9wcGluZ0xpc3QucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICBpbnNlcnRJdGVtcyhpdGVtczpBcnJheTxJbmdyZWRpYW50Pil7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5Lih0aGlzLnNob3BwaW5nTGlzdCwgaXRlbXMpO1xuICAgIH1cblxuICAgIGdldEl0ZW1JbmRleChpdGVtOkluZ3JlZGlhbnQpe1xuICAgICAgICByZXR1cm4gdGhpcy5zaG9wcGluZ0xpc3QuaW5kZXhPZihpdGVtKTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGl0ZW06SW5ncmVkaWFudCl7XG4gICAgICAgIHRoaXMuc2hvcHBpbmdMaXN0LnNwbGljZSh0aGlzLnNob3BwaW5nTGlzdC5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGluZGV4Om51bWJlciwgaXRlbTpJbmdyZWRpYW50KXtcbiAgICAgICAgdGhpcy5zaG9wcGluZ0xpc3RbaW5kZXhdID0gaXRlbTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
