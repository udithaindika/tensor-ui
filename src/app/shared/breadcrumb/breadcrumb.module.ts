import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

export * from './breadcrumb.component'
export * from './breadcrumb.service'

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        BreadcrumbComponent
    ],
    exports: [
        BreadcrumbComponent
    ]
})
export class BreadcrumbModule { }