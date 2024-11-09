import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  day: number;
  month: number;
  year: number;

  errorDay: string;
  errorMonth: string;
  errorYear: string;

  ageYears: number;
  ageMonths: number;
  ageDays: number;

  ageCalculated: boolean = false;

  constructor() { }

  calculateAge() {
    // Reiniciar errores y resultado
    this.errorDay = '';
    this.errorMonth = '';
    this.errorYear = '';
    this.ageCalculated = false;

    let valid = true;
    const today = new Date();

    // Validaciones de campos vacíos
    if (!this.day) {
      this.errorDay = 'This field is required';
      valid = false;
    }

    if (!this.month) {
      this.errorMonth = 'This field is required';
      valid = false;
    }

    if (!this.year) {
      this.errorYear = 'This field is required';
      valid = false;
    }

    // Validaciones de rango
    if (this.day && (this.day < 1 || this.day > 31)) {
      this.errorDay = 'Must be a valid day';
      valid = false;
    }

    if (this.month && (this.month < 1 || this.month > 12)) {
      this.errorMonth = 'Must be a valid month';
      valid = false;
    }

    if (this.year && (this.year > today.getFullYear())) {
      this.errorYear = 'Must be in the past';
      valid = false;
    }

    // Validar fecha válida
    if (valid) {
      const inputDate = new Date(this.year, this.month - 1, this.day);

      if (
        inputDate.getFullYear() !== this.year ||
        inputDate.getMonth() !== this.month - 1 ||
        inputDate.getDate() !== this.day
      ) {
        this.errorDay = 'Must be a valid date';
        valid = false;
      }

      if (inputDate > today) {
        this.errorDay = 'Date cannot be in the future';
        valid = false;
      }

      if (valid) {
        this.calculateExactAge(inputDate, today);
        this.ageCalculated = true;
      }
    }
  }

  calculateExactAge(birthDate: Date, currentDate: Date) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    this.ageYears = years;
    this.ageMonths = months;
    this.ageDays = days;
  }
}
