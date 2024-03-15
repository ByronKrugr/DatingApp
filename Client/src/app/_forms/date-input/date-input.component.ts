import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss'
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label = '';
  public maxDate: Date;

  constructor(@Self() public ngContorl: NgControl){
    this.ngContorl.valueAccessor = this;
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 20, 0, 1);
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control() {
    return this.ngContorl.control as FormControl;
  }

}
