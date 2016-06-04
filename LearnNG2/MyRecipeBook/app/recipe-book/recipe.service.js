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
    var RecipeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RecipeService = (function () {
                function RecipeService() {
                }
                RecipeService.prototype.getItem = function (index) {
                    return this.recipes[index];
                };
                RecipeService.prototype.getAllItems = function () {
                    return this.recipes;
                };
                RecipeService.prototype.insertItem = function (item) {
                    this.recipes.push(item);
                };
                RecipeService.prototype.insertItems = function (items) {
                    Array.prototype.push.apply.(this.recipes, items);
                };
                RecipeService.prototype.getItemIndex = function (item) {
                    return this.recipes.indexOf(item);
                };
                RecipeService.prototype.removeItem = function (item) {
                    this.recipes.splice(this.recipes.indexOf(item), 1);
                };
                RecipeService.prototype.updateItem = function (index, item) {
                    this.recipes[index] = item;
                };
                RecipeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RecipeService);
                return RecipeService;
            }());
            exports_1("RecipeService", RecipeService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY2lwZS1ib29rL3JlY2lwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBU0E7Z0JBQUE7Z0JBOEJBLENBQUM7Z0JBM0JHLCtCQUFPLEdBQVAsVUFBUSxLQUFZO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFFRCxtQ0FBVyxHQUFYO29CQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELGtDQUFVLEdBQVYsVUFBVyxJQUFXO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxtQ0FBVyxHQUFYLFVBQVksS0FBbUI7b0JBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsb0NBQVksR0FBWixVQUFhLElBQVc7b0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxrQ0FBVSxHQUFWLFVBQVcsSUFBVztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsa0NBQVUsR0FBVixVQUFXLEtBQVksRUFBRSxJQUFXO29CQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDL0IsQ0FBQztnQkEvQkw7b0JBQUMsaUJBQVUsRUFBRTs7aUNBQUE7Z0JBZ0NiLG9CQUFDO1lBQUQsQ0E5QkEsQUE4QkMsSUFBQTtZQTlCRCx5Q0E4QkMsQ0FBQSIsImZpbGUiOiJyZWNpcGUtYm9vay9yZWNpcGUuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB6aGVuZ3l1YW5qaWUgb24gMjAxNi82LzMuXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0luZ3JlZGlhbnR9IGZyb20gXCIuLi9zaGFyZWQvaW5ncmVkaWFudFwiO1xuaW1wb3J0IHtSZWNpcGV9IGZyb20gXCIuLi9zaGFyZWQvcmVjaXBlXCI7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIFJlY2lwZVNlcnZpY2Uge1xuICAgIHJlY2lwZXM6IEFycmF5PFJlY2lwZT47XG5cbiAgICBnZXRJdGVtKGluZGV4Om51bWJlcil7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2lwZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIGdldEFsbEl0ZW1zKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2lwZXM7XG4gICAgfVxuXG4gICAgaW5zZXJ0SXRlbShpdGVtOlJlY2lwZSl7XG4gICAgICAgIHRoaXMucmVjaXBlcy5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIGluc2VydEl0ZW1zKGl0ZW1zOkFycmF5PFJlY2lwZT4pe1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseS4odGhpcy5yZWNpcGVzLCBpdGVtcyk7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUluZGV4KGl0ZW06UmVjaXBlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjaXBlcy5pbmRleE9mKGl0ZW0pO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oaXRlbTpSZWNpcGUpe1xuICAgICAgICB0aGlzLnJlY2lwZXMuc3BsaWNlKHRoaXMucmVjaXBlcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGluZGV4Om51bWJlciwgaXRlbTpSZWNpcGUpe1xuICAgICAgICB0aGlzLnJlY2lwZXNbaW5kZXhdID0gaXRlbTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
