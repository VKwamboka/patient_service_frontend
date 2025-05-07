import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-symptoms',
  imports: [CommonModule, FormsModule],
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

  submitSymptoms() {
    if(this.selectedSymptoms.length === 0){
      alert('Please select at least one symptom before submitting.');
      return;
    }
    this.evaluationDone = true;
    // TODO: send to API later
    console.log('Submitted symptoms:', this.selectedSymptoms);
    alert('Symptoms submitted for evaluation!');
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
