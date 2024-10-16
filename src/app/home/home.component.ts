import { Component } from '@angular/core';
import { GlassCardComponent } from '../glass-card/glass-card.component';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GlassCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    // Get all elements with the class "animate-me"
    const elements = gsap.utils.toArray<HTMLElement>('.slide-up');

    const slideLeftElements = gsap.utils.toArray<HTMLElement>('.slide-left');

    // Animate each element with a different delay
    slideLeftElements.forEach((element, index) => {
      gsap.from(element, {
        duration: 1,
        x: 50,            // Start position (50px down)
        opacity: 0,       // Start fully transparent
        ease: 'power2.out',
        delay: index * 0.3 // Increase delay based on index (0s, 0.3s, 0.6s, ...)
      });
    });

    // Animate each element with a different delay when it comes into view
    elements.forEach((element, index) => {
      gsap.from(element, {
        duration: 1,
        y: 50,            // Start position (50px down)
        opacity: 0,       // Start fully transparent
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,   // The element that triggers the animation
          start: 'top 80%',   // Start animation when the top of the element hits 80% of the viewport height
          toggleActions: 'play none none', // Play the animation on enter, reset on leave
        }
      });
    });
  }
}