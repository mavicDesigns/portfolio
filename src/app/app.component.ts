import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'portfolio';
  activeSection: string = 'about';


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.setActiveSection();
  }

  ngAfterViewInit() {
    this.animateGlow();
    this.animateOnLoad();
    this.setActiveSection();
  }

  animateGlow(){
    gsap.fromTo(
      '.top-glow',
      {
        scale: 1,
        blur: 20,
        opacity: 0.7,
      },
      {
        scale: 2, // Grow size
        blur: 40, // Increase blur
        duration: 3,
        repeat: -1,
        yoyo: true, // Reverse the animation
        ease: 'power1.inOut',
      }
    );
  
    // Animate the bottom glow
    gsap.fromTo(
      '.bottom-glow',
      {
        scale: 1,
        blur: 20,
        opacity: 0.7,
      },
      {
        scale: 2, // Grow size
        blur: 40, // Increase blur
        duration: 3,
        delay: 1,
        repeat: -1,
        yoyo: true, // Reverse the animation
        ease: 'power1.inOut',
      }
    );
  }
  

  setActiveSection() {
    const sections = document.querySelectorAll('#about, #experience, #project');
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

      sections.forEach((section) => {
        const sectionOffset = section.getBoundingClientRect().top + window.scrollY; // Updated to use getBoundingClientRect for accurate positioning
        const sectionHeight = section.clientHeight;
  
        if (scrollPosition >= sectionOffset - 95 && scrollPosition < sectionOffset + sectionHeight) {
          this.activeSection = section.id;
        }
      });
  }

  animateOnLoad() {
    // Get all elements with the class "animate-me"
    const elements = gsap.utils.toArray<HTMLElement>('.animate-me');

    // Animate each element with a different delay
    elements.forEach((element, index) => {
      gsap.from(element, {
        duration: 1,
        y: -50, // Start position (50px down)
        opacity: 0, // Start fully transparent
        ease: 'power2.out',
        delay: index * 0.3, // Increase delay based on index (0s, 0.3s, 0.6s, ...)
      });
    });

    const tl = gsap.timeline({
      // Repeat the animation infinitely with a 1-second delay between repeats
      repeat: 0,
      repeatDelay: 0,
      // Play the animation in reverse after reaching the end and then play forward again (yoyo effect)
      yoyo: true,
    });

    const tl2 = gsap.timeline({
      // Repeat the animation infinitely with a 1-second delay between repeats
      repeat: 0,
      repeatDelay: 0,
      // Play the animation in reverse after reaching the end and then play forward again (yoyo effect)
      yoyo: true,
    });

    // Animate the strokeDashoffset property of the element with id "theText"
    // over 3 seconds with a linear ease
    tl.to('#theText', { duration: 3, strokeDashoffset: 0, ease: 'none' });
    tl2.to('#theRect', {
      width: '60%',
      duration: 3,
      ease: 'back.out(1.7)',
    });
  }
}
