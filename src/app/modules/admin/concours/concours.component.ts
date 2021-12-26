import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FuseCardComponent } from '@fuse/components/card';
import {MatDialog} from "@angular/material/dialog";
import {AddConcoursComponent} from "./add-concours/add-concours.component";
import {ConcoursService} from "../services/concours.service";
import {Concours} from "../model/concours";
import {NavigationExtras, Router} from "@angular/router";


@Component({
  selector: 'cards',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.scss'],
    styles         : [
        `
            cards fuse-card {
                margin: 16px;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcoursComponent implements OnInit {

    concours: Concours[] = [];
    size: number = 0;
    totalElements: number = 0;

    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    constructor(public dialog: MatDialog,
                private concoursService: ConcoursService,
                private detect: ChangeDetectorRef,
                private router: Router) {

    }

    makeImageUrl(path: string) {
        return this.concoursService.makeDownloadUrl(path);
    }

    addConcours(): void {
        this.openDialog(AddConcoursComponent, null);
    }

    addResultat(concours, element): void {
        let nav: NavigationExtras = {
            queryParams: {
                concours: JSON.stringify(concours),
                element: element
            }
        };
        this.router.navigate(['concours/publish-result'], nav);
    }

    openDialog(page, data): void {
        const dialogRef = this.dialog.open(page, {
            width: '70%',
            data: {
                data: data
            }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (localStorage.getItem("paginationHistorique")) {
                let event = JSON.parse(localStorage.getItem("paginationHistorique"));
                this.getConcours(event.pageIndex, event.pageSize);
                console.log('The dialog was closed', event);
            } else {
                this.getConcours(0, 15);
            }
        });
    }

    getConcours(page: number, size: number) {
        this.concoursService.getConcoursByPage(page, size).subscribe((res) => {
            // console.log("concours", res);
            if (res.code == 100) {
                this.concours = res.response.content;
                this.totalElements = res.response.totalElements;
                this.size = res.response.size;
                console.log("connn", this.concours);
                this.detect.detectChanges();
            }
        }, (error => {
            console.log("error", error);
            if (error && ((error.status == 403) || (error.status == 401))) {
                console.log(localStorage.getItem("accessToken"));
            }
        }));
    }


    ngOnInit(): void {
        this.getConcours(0, 15);
    }


    getPage(event) {
        // console.log(event);
        localStorage.setItem("paginationHistorique", JSON.stringify(event));
        this.getConcours(event.pageIndex, event.pageSize);
    }
}
