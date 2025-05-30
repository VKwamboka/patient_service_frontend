import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface MedicalReport {
  id: number;
  doctor: string;
  date: string;
  summary: string;
  fileUrl: string; // This would be a real file URL from backend in future
}

@Component({
  selector: 'app-reports',
  imports: [FormsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reports: MedicalReport[] = [
    // {
    //   id: 1,
    //   doctor: 'Dr. Jane Doe',
    //   date: 'May 12, 2025',
    //   summary: 'Blood test report indicating mild anemia.',
    //   fileUrl: '/assets/reports/report1.pdf',
    // },
    // {
    //   id: 2,
    //   doctor: 'Dr. John Smith',
    //   date: 'May 5, 2025',
    //   summary: 'Follow-up consultation notes regarding blood pressure.',
    //   fileUrl: '/assets/reports/report2.pdf',
    // }
  ];

  downloadReport(report: MedicalReport) {
    const link = document.createElement('a');
    link.href = report.fileUrl;
    link.download = `Report-${report.id}.pdf`;
    link.click();
  }
}
