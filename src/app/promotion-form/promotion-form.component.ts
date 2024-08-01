import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../_service/master.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../_module/Material.Module';
import { forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadPromotionTypes } from '../States/State/promo.action';

// Component for handling promotion form operations
@Component({
  selector: 'app-promotion-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css']
})
export class PromotionFormComponent implements OnInit {
  promotionForm!: FormGroup;

  // Predefined options for promotion types and UOM
  promoTypes: { name: string }[] = [
    { name: 'Buy One Get One Free' },
    { name: 'Buy X Get One Free' },
    { name: 'Cents Off' },
    { name: 'Net Price' },
    { name: 'Percent Off' }
  ];
  uomOptions: { name: string }[] = [
    { name: 'EA' },
    { name: 'LA' }
  ];

  // States to control visibility and behavior of form fields
  fieldStates = {
    factor: { hidden: false },
    amount: { hidden: false },
    uom: { hidden: false },
    itemLimit: { hidden: false },
    minQuantity: { hidden: false }
  };

  // Inject necessary services and initialize component
  constructor(
    private fb: FormBuilder,
    private promotionService: MasterService,
    private store: Store
  ) { }

  // Initialize the form with default values and validators
  ngOnInit(): void {
    this.promotionForm = this.fb.group({
      name: ['', Validators.required],
      factor: [{ value: '', disabled: false }, [Validators.min(1), Validators.max(10),Validators.required]],
      amount: [{ value: '', disabled: false }, [Validators.min(0), Validators.max(100), Validators.required]],
      uom: [{ value: '', disabled: false }, Validators.required],
      itemLimit: ['', [Validators.min(1), Validators.max(49), Validators.required]],
      minQuantity: ['', [Validators.min(1), Validators.max(50), Validators.required]]
    });
  }

  // Handle changes in the promotion type dropdown
  onPromotionTypeChange(event: any): void {
    const selectedType = event.value;

    // Update form fields and their states based on the selected promotion type
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
          amount: { hidden: false, min:1, max: 99.99, warningMessage: 'Amount limit greater than 1 and less than 99.99%' },
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
  }

  // Update the state of form fields based on provided settings
  setFieldStates(states: any): void {
    this.fieldStates = states;

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

  // Enable or disable the submit button based on form validity
  updateButtonState(): void {
    const isFormValid = this.promotionForm.valid;
    const button = document.querySelector('button[type="submit"]');
    if (button) {
      (button as HTMLButtonElement).disabled = !isFormValid;
    }
  }

  // Save changes to all promotion types
  saveToAll(): void {
    if (this.promotionForm.valid) {
      const commonData = this.promotionForm.value;

      this.promotionService.getAll().subscribe(promotionTypes => {
        const updateObservables = promotionTypes.map(promotionType => {
          const updatedPromotionType = {
            ...promotionType,
            name: commonData.name,
            factor: commonData.factor,
            amount: commonData.amount,
            uom: commonData.uom,
            itemLimit: commonData.itemLimit,
            minQuantity: commonData.minQuantity
          };

          return this.promotionService.updateById(promotionType.id, updatedPromotionType);
        });

        forkJoin(updateObservables).subscribe(
          responses => {
            this.store.dispatch(loadPromotionTypes());
            console.log('All promotion types updated successfully:', responses);
          },
          error => {
            console.error('Error updating promotion types:', error);
          }
        );
      });
    }
  }
}
