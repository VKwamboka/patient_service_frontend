import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  fullMessage: string;
}

@Component({
  selector: 'app-notifications',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
    constructor(private elementRef: ElementRef) {}

  notifications: Notification[] = [
  {
    id: 1,
    message: 'Critical result from your recent symptoms!',
    fullMessage: 'Your symptom analysis indicates a high risk for pneumonia. Please consult a doctor immediately.',
    time: '2h ago',
    read: false,
  },
  {
    id: 2,
    message: 'Appointment confirmed with Dr. Smith',
    fullMessage: 'Your appointment with Dr. John Smith is confirmed for May 18th at 10:00 AM.',
    time: '1d ago',
    read: false,
  },
  {
    id: 3,
    message: 'Your medical report is ready to download.',
    fullMessage: 'A new report from Dr. Jane Doe has been uploaded. You can download it from your reports section.',
    time: '3d ago',
    read: true,
  }
];
  

  isPanelOpen = false;

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  // Detect clicks outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isPanelOpen = false;
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => (n.read = true));
  }

  clearAll() {
    this.notifications = [];
  }

  selectedNotification: Notification | null = null;

viewNotification(notification: Notification) {
  this.selectedNotification = notification;
  notification.read = true;
}

closeModal() {
  this.selectedNotification = null;
}

}
