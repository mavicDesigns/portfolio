import { Component } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [],
  templateUrl: './glass-card.component.html',
  styleUrl: './glass-card.component.css',
})
export class GlassCardComponent {
  get hasTitle() {
    return !!this.title;
  }

  get hasDescription() {
    return !!this.description;
  }

  title: string | null = null;
  description: string | null = null;
}
