import {Component} from '@angular/core';
import {RecipesComponent} from "./recipe-book/recipe.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";

@Component({
    selector: 'my-app',
    template: `
        <header>
            <nav>
                <ul>
                    <li><a [routerLink]='["/recipes"]'>Recipes</a></li>
                    <li><a [routerLink]='["/shopping-list"]'>Shopping List</a></li>
                </ul>
            </nav>
        </header>
        <div class="main">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [RecipesComponent, ShoppingListComponent, ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@Routes([
    {path:'/recipes', component:RecipesComponent, useAsDefault:true},
    {path:'/shopping-list', component:ShoppingListComponent}
])

export class AppComponent {

}