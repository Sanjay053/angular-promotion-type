import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PromoStateM } from '../States/Model/promo.model';
import { getpromotionlist } from '../States/State/promo.selector';
import { loadPromotionTypes } from '../States/State/promo.action';
import { UpdatePromoComponent } from '../update-promo/update-promo.component';
import { MaterialModule } from '../../_module/Material.Module';
import { PromotionFormComponent } from '../promotion-form/promotion-form.component';

@Component({
  selector: 'app-promo-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, PromotionFormComponent],
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css'],
})
export class PromoListComponent implements OnInit {
  // Array to hold the list of promotion types
  promotionTypes!: PromoStateM[];
  // Title for the component
  title: string = 'Promotion List';
  // Data source for the Material table
  dataSource: any;
  // Columns to be displayed in the table
  displayColumns: string[] = ['name', 'factor', 'amount', 'uom', 'itemLimit', 'minQuantity', 'edit'];
  // Array to store promotion types for additional use (currently not used)
  PromotionList!: PromoStateM[];
  // Array to store promotion names extracted from promotion types
  promotionNames: string[] = [];
  

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.LoadInitialData(); // Load the initial data when the component is initialized
  }

  // Method to load the promotion types from the store
  LoadInitialData() {
    this.store.dispatch(loadPromotionTypes()); // Dispatch action to load promotion types
    this.store.select(getpromotionlist).subscribe(item => {
      this.promotionTypes = item; // Update the promotionTypes with data from the store
      this.dataSource = new MatTableDataSource(this.promotionTypes); // Initialize data source for the table
      this.extractPromotionNames(item); // Extract names of promotion types
    });
  }

  // Method to extract promotion names from the list of promotion types
  extractPromotionNames(promotionTypes: PromoStateM[]) {
    this.promotionNames = promotionTypes.map(promo => promo.name); // Map promotion types to their names
  }

  // Type guard function to check if a key exists in PromoStateM
  isPromoStateMKey(key: string): key is keyof PromoStateM {
    return ['id', 'name', 'factor', 'amount', 'uom', 'itemLimit', 'minQuantity'].includes(key);
  }

  // Method to get the value of a field from a promotion type
  getFieldValue(element: PromoStateM, field: string): any {
    if (this.isPromoStateMKey(field)) {
      return element[field] !== undefined ? element[field] : '-'; // Return the field value or '-' if undefined
    }
    return '-'; // Return '-' if the field key is not valid
  }

  // Method to open the dialog for editing a promotion type
  editPromotion(promotionId: string) {
    this.dialog.open(UpdatePromoComponent, {
      width: '50%',
      data: { id: promotionId } // Pass the promotion ID to the dialog component
    }).afterClosed().subscribe(result => {
      if (result) {
        const index = this.promotionTypes.findIndex(p => p.id === result.id); // Find the index of the edited promotion type
        if (index !== -1) {
          this.promotionTypes[index] = result; // Update the promotion type in the array
          this.dataSource.data = [...this.promotionTypes]; // Refresh the data source with updated promotion types
        }
      }
    });
  }
}
