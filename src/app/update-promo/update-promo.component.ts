import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../_module/Material.Module';
import { MasterService } from '../_service/master.service';
import { Store } from '@ngrx/store';
import { loadPromotionTypes } from '../States/State/promo.action';

@Component({
  selector: 'app-update-promo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './update-promo.component.html',
  styleUrls: ['./update-promo.component.css']
})
export class UpdatePromoComponent implements OnInit {
  // Form group for the promotion form
  promotionForm!: FormGroup;
  // ID of the promotion to be updated
  promotionId!: string;
  isDropdownOpen = false;
  isDropdownUomOpen = false;

  // List of promotion types for the dropdown
  promoTypes: { name: string }[] = [
    { name: 'Buy One Get One Free' },
    { name: 'Buy X Get One Free' },
    { name: 'Cents Off' },
    { name: 'Net Price' },
    { name: 'Percent Off' }
  ];

  // List of unit of measure options for the dropdown
  uomOptions: { name: string }[] = [
    { name: 'EA' },
    { name: 'LA' }
  ];

  // States for the fields, indicating whether they are hidden or visible
  fieldStates = {
    factor: { hidden: false },
    amount: { hidden: false },
    uom: { hidden: false },
    itemLimit: { hidden: false },
    minQuantity: { hidden: false }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdatePromoComponent>,
    private fb: FormBuilder,
    private store: Store,
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    // Initialize the promotion ID from the injected data
    this.promotionId = this.data.id;

    // Initialize the promotion form with default values and validators
    this.promotionForm = this.fb.group({
      name: ['', Validators.required],
      factor: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(100), Validators.required]],
      amount: [{ value: '', disabled: true }, [Validators.min(0), Validators.max(100), Validators.required]],
      uom: [{ value: '', disabled: true }, Validators.required],
      itemLimit: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(49), Validators.required]],
      minQuantity: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(50), Validators.required]]
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropDownUom(): void {
    this.isDropdownUomOpen = !this.isDropdownUomOpen;
  }

  selectUom(uom: string): void {
    this.promotionForm.get('uom')!.setValue(uom);
  }


  selectPromotionType(type: string): void {
    this.promotionForm.get('name')!.setValue(type);
    this.onPromotionTypeChange({ option: { value: type } });
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
      this.isDropdownUomOpen = false;

    }
  }

  onPromotionTypeChange(event: any): void {
    const selectedType = event.option.value;

    // Update form fields based on the selected promotion type
    switch (selectedType) {
      case 'Buy One Get One Free':
        this.promotionForm.patchValue({
          name: 'Buy One Get One Free',
          factor: { value: 1, disabled: true },
          amount: { value: 44, disabled: true },
          uom: { value: 'EA', disabled: false },
          itemLimit: { value: 0, disable: false },
          minQuantity: { value: 2 }
        });
        this.setFieldStates({
          factor: { hidden: true },
          amount: { hidden: true },
          uom: { hidden: true },
          itemLimit: { hidden: false },
          minQuantity: { hidden: true }
        });
        break;

      case 'Buy X Get One Free':
        this.promotionForm.patchValue({
          name: 'Buy X Get One Free',
          factor: { value: 1, disabled: true },
          amount: { value: 0, disabled: true },
          uom: { value: 'EA', disabled: true },
          itemLimit: 5,
          minQuantity: 2
        });
        this.setFieldStates({
          factor: { hidden: true },
          amount: { hidden: true },
          uom: { hidden: true },
          itemLimit: { hidden: false, max: 49, min: 1, errorMessage: 'Max value for limit is 49' },
          minQuantity: { hidden: true, min: 2, max: 50, errorMessage: 'Min quantity should be between 2 and 50' }
        });
        break;

      case 'Cents Off':
        this.promotionForm.patchValue({
          name: 'Cents Off',
          factor: { value: 1, disabled: true },
          amount: { value: 4, disabled: false },
          uom: { value: 'EA', disabled: false },
          itemLimit: 1,
          minQuantity: ''
        });
        this.setFieldStates({
          factor: { hidden: true },
          amount: { hidden: false },
          uom: { hidden: false },
          itemLimit: { hidden: false, max: 49, min: 1, errorMessage: 'Max value for limit is 49' },
          minQuantity: { hidden: true, min: 2, max: 50, errorMessage: 'Min quantity should be between 2 and 50' }
        });
        break;

      case 'Net Price':
        this.promotionForm.patchValue({
          name: 'Net Price',
          factor: { value: 5, disabled: false },
          amount: { value: 0, disabled: false },
          uom: { value: 'EA', disabled: false },
          itemLimit: 0,
          minQuantity: 10
        });
        this.setFieldStates({
          factor: { hidden: false, min: 1, max: 99, errorMessage: 'Please enter a value greater than 0 and less than 100' },
          amount: { hidden: false, warningMessage: 'Promo amount cannot be greater than Regular Price', errorMessage: 'Please enter a non zero amount' },
          uom: { hidden: false },
          itemLimit: { hidden: false, max: 49, errorMessage: 'Max value for item limit is 49' },
          minQuantity: { hidden: false, min: 2, max: 50, errorMessage: 'Min quantity should be between 1 and 50' }
        });
        break;

      case 'Percent Off':
        this.promotionForm.patchValue({
          name: 'Percent Off',
          factor: { value: 1, disabled: true },
          amount: { value: 96, disabled: false },
          uom: { value: '', disabled: false },
          itemLimit: 7,
          minQuantity: ''
        });
        this.setFieldStates({
          factor: { hidden: true },
          amount: { hidden: false, min: 1, max: 99.99, warningMessage: 'Amount limit greater than 1 and less than 99.99%' },
          uom: { hidden: false },
          itemLimit: { hidden: false, max: 49, min: 1, errorMessage: 'Max value for limit is 49' },
          minQuantity: { hidden: true }
        });
        break;

      default:
        this.promotionForm.reset();
        this.setFieldStates({
          factor: { hidden: false },
          amount: { hidden: false },
          uom: { hidden: false },
          itemLimit: { hidden: false },
          minQuantity: { hidden: false }
        });
    }
    this.isDropdownOpen = false;

  }

  // Method to update the states of form fields based on the selected promotion type
  setFieldStates(states: any): void {
    this.fieldStates = { ...states }; // Ensure fieldStates is a new object

    Object.keys(states).forEach(field => {
      const state = states[field];
      const control = this.promotionForm.get(field);
      if (control) {
        if (state.hidden) {
          control.setValue('');
          control.disable();
        } else {
          control.enable();
          control.setValue(state.value || '');
          if (state.disabled) {
            control.disable();
          } else {
            control.enable();
          }
        }
      }
    });
    this.updateButtonState();
  }

  // Method to enable or disable the submit button based on the form's validity
  updateButtonState(): void {
    const isFormValid = this.promotionForm.valid;
    const button = document.querySelector('button[type="submit"]');
    if (button) {
      (button as HTMLButtonElement).disabled = !isFormValid;
    }
  }

  // Method to handle the form submission
  updataPromo(): void {
    if (!this.promotionForm.valid) {
      console.error('Form is not valid');
      return;
    }

    const formData = this.promotionForm.value;
    this.masterService.updatePromotion(this.promotionId, formData).subscribe(
      response => {
        this.store.dispatch(loadPromotionTypes());
        console.log('Update successful:', response);
        this.ref.close(response);
      },
      error => console.error('Update failed:', error)
    );
  }

  // Method to close the dialog
  closepopup(): void {
    this.ref.close();
  }
}
