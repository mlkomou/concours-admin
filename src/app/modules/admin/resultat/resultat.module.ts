import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultatComponent } from './resultat.component';
import {Route, RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

const routes: Route[] = [
    {
        path     : '',
        component: ResultatComponent
    }
];

@NgModule({
  declarations: [
    ResultatComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class ResultatModule { }
