import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { lastValueFrom } from 'rxjs';
import { CurrencyService } from './currency.service';
import { ConverterModel } from './model';

@Component({
  selector: 'app-converter',
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatProgressSpinnerModule, MatListModule
  ],
  providers: [CurrencyService],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit {

  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  selectedDate: Date | null = null;
  result: number | null = null;
  isLoading: boolean = false;
  model: ConverterModel = new ConverterModel();

  currencyList: any[] = [];
  conversionHistory: any[] = [];
  constructor(private service: CurrencyService) { }

  ngOnInit(): void {
    this.getCurrenices();
    this.conversionHistory = JSON.parse(localStorage.getItem('conversion_history') || '[]');
  }

  async getCurrenices() {
    await lastValueFrom(this.service.getCurrencies()).then((res: any) => {
      this.currencyList = res.data;
    })
  }


  async handleConvert() {
    this.isLoading = true;
    const date = new Date(this.model.date)
    this.model.date = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      : '';
    await lastValueFrom(this.service.getExchangeRate(this.model)).then((res: any) => {
      if (res.code) {
        this.saveToHistory(res)
        this.model = new ConverterModel();
      }
    });
    this.isLoading = false;
  }

  saveToHistory(res: any) {
    this.conversionHistory = JSON.parse(localStorage.getItem('conversion_history') || '[]');
    this.conversionHistory.unshift({
      from: res.data.from,
      to: res.data.to,
      amount: res.data.amount,
      rate: res.data.rate,
      convertedAmount: res.data.converted_amount,
      date: res.data.date,
      createdAt: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('conversion_history', JSON.stringify(this.conversionHistory));
  }

}
