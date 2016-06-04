System.register(['@angular/core', "./recipe-book/recipe.component", "./shopping-list/shopping-list.component", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, recipe_component_1, shopping_list_component_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (recipe_component_1_1) {
                recipe_component_1 = recipe_component_1_1;
            },
            function (shopping_list_component_1_1) {
                shopping_list_component_1 = shopping_list_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <header>\n            <nav>\n                <ul>\n                    <li><a [routerLink]='[\"/recipes\"]'>Recipes</a></li>\n                    <li><a [routerLink]='[\"/shopping-list\"]'>Shopping List</a></li>\n                </ul>\n            </nav>\n        </header>\n        <div class=\"main\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        directives: [recipe_component_1.RecipesComponent, shopping_list_component_1.ShoppingListComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.Routes([
                        { path: '/recipes', component: recipe_component_1.RecipesComponent, useAsDefault: true },
                        { path: '/shopping-list', component: shopping_list_component_1.ShoppingListComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUE2QkE7Z0JBQUE7Z0JBRUEsQ0FBQztnQkExQkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLDhYQVlUO3dCQUNELFVBQVUsRUFBRSxDQUFDLG1DQUFnQixFQUFFLCtDQUFxQixFQUFFLDBCQUFpQixDQUFDO3dCQUN4RSxTQUFTLEVBQUUsQ0FBQyx5QkFBZ0IsQ0FBQztxQkFDaEMsQ0FBQztvQkFFRCxlQUFNLENBQUM7d0JBQ0osRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxtQ0FBZ0IsRUFBRSxZQUFZLEVBQUMsSUFBSSxFQUFDO3dCQUNoRSxFQUFDLElBQUksRUFBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUMsK0NBQXFCLEVBQUM7cUJBQzNELENBQUM7O2dDQUFBO2dCQUlGLG1CQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCx1Q0FFQyxDQUFBIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlY2lwZXNDb21wb25lbnR9IGZyb20gXCIuL3JlY2lwZS1ib29rL3JlY2lwZS5jb21wb25lbnRcIjtcbmltcG9ydCB7U2hvcHBpbmdMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9zaG9wcGluZy1saXN0L3Nob3BwaW5nLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge1JvdXRlcywgUk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT0nW1wiL3JlY2lwZXNcIl0nPlJlY2lwZXM8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT0nW1wiL3Nob3BwaW5nLWxpc3RcIl0nPlNob3BwaW5nIExpc3Q8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpblwiPlxuICAgICAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtSZWNpcGVzQ29tcG9uZW50LCBTaG9wcGluZ0xpc3RDb21wb25lbnQsIFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtST1VURVJfUFJPVklERVJTXVxufSlcblxuQFJvdXRlcyhbXG4gICAge3BhdGg6Jy9yZWNpcGVzJywgY29tcG9uZW50OlJlY2lwZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDp0cnVlfSxcbiAgICB7cGF0aDonL3Nob3BwaW5nLWxpc3QnLCBjb21wb25lbnQ6U2hvcHBpbmdMaXN0Q29tcG9uZW50fVxuXSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
