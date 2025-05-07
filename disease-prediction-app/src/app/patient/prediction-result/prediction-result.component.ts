import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prediction-result',
  imports: [FormsModule, CommonModule],
  templateUrl: './prediction-result.component.html',
  styleUrl: './prediction-result.component.css'
})
export class PredictionResultComponent {
  @Input() results: string[] = [];
}
