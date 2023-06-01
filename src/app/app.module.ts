import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  DxDataGridModule,
  DxButtonModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxDateBoxModule,
  DxGalleryModule,
  DxButtonGroupModule,
  DxValidatorModule,
  DxTextBoxModule,
  DxTagBoxModule,
  DxTreeViewModule,
  DxScrollViewModule,
  DxFileUploaderModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxSwitchModule,
  DxTabPanelModule,
  DxCheckBoxModule,
  DxNumberBoxModule,
  DxTooltipModule,
} from "devextreme-angular";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    DxPopupModule,
    DxButtonModule,
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxRadioGroupModule,
    DxDateBoxModule,
    DxGalleryModule,
    DxButtonGroupModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxTagBoxModule,
    DxTreeViewModule,
    DxScrollViewModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxCheckBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxTooltipModule,
    DxSwitchModule,
    DxTabPanelModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  faCoffee = faCoffee;
 }
