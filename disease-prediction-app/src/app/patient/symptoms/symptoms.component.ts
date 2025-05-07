import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PredictionResultComponent } from '../prediction-result/prediction-result.component';

@Component({
  selector: 'app-symptoms',
  imports: [CommonModule, FormsModule, PredictionResultComponent],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent {
  symptomsList: string[] = [
    'Fever', 'Cough', 'Headache', 'Fatigue',
    'Sore Throat', 'Shortness of Breath', 'Nausea',
    'Vomiting', 'Chest Pain', 'Skin Rash'
  ];

  selectedSymptoms: string[] = [];
  evaluationDone = false;


  toggleSymptom(symptom: string) {
    if (this.selectedSymptoms.includes(symptom)) {
      this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
    } else {
      this.selectedSymptoms.push(symptom);
    }
  }

  removeSymptom(symptom: string) {
    this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
  }

  // submitting symptoms
  loading = false;
  submitted = false;
  predictionResult: string[] = [];

  submitSymptoms() {
    if (this.selectedSymptoms.length === 0) {
      alert('Please select at least one symptom before submitting.');
      return;
    }
  
    this.loading = true;
    this.submitted = false;
  
    // Simulate API delay
    setTimeout(() => {
      this.predictionResult = [
        'Flu (80%)',
        'Common Cold (65%)',
        'COVID-19 (45%)'
      ];
  
      this.loading = false;
      this.submitted = true;
      this.evaluationDone = true;
  
      // Now run alert after loading is done
      console.log('Submitted symptoms:', this.selectedSymptoms);
      alert('Symptoms submitted for evaluation!');
    }, 2000);
  }
  
  

  // searching
  searchTerm: string = '';
  get filteredSymptoms(): string[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.symptomsList.filter(symptom => 
      symptom.toLowerCase().includes(term)
    );
  }

  
  

}
