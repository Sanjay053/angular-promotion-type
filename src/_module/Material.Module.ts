import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    exports: [
        MatCardModule, // Material Design card component
        MatTableModule, // Material Design table component
        MatButtonModule, // Material Design button component
        MatFormFieldModule, // Material Design form field component
        MatInputModule, // Material Design input component
        MatPaginatorModule, // Material Design paginator component
        MatSelectModule, // Material Design select component
        MatIconModule, // Material Design icon component
        MatDialogModule, // Material Design dialog component
        ReactiveFormsModule, // Angular reactive forms module
        HttpClientModule, // Angular HTTP client module
    ]
})
export class MaterialModule { }
