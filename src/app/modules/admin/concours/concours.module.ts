import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcoursComponent } from './concours.component';
import {Route, RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {FuseCardModule} from "../../../../@fuse/components/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import { AddConcoursComponent } from './add-concours/add-concours.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PublishResultComponent } from './publish-result/publish-result.component';
import {MatTableModule} from "@angular/material/table";
import { ValidationDossierComponent } from './publish-result/validation-dossier/validation-dossier.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Route[] = [
    {
        path     : '',
        component: ConcoursComponent
    },   {
        path     : 'publish-result',
        component: PublishResultComponent
    }, {
        path     : 'validation-dossier',
        component: ValidationDossierComponent
    },
];

@NgModule({
  declarations: [
    ConcoursComponent,
    AddConcoursComponent,
    PublishResultComponent,
    ValidationDossierComponent
  ],
    imports: [
        CommonModule,
        ImageCropperModule,
        RouterModule.forChild(routes),
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
        MatListModule,
        MatProgressSpinnerModule,
        FuseAlertModule,
        MatPaginatorModule,
        MatTableModule,
        PdfViewerModule
    ]
})
export class ConcoursModule { }
