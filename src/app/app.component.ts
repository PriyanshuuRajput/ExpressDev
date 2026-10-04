import { Component } from '@angular/core';
import { ContactSectionComponent } from './home-section/contact-section/contact-section.component';
import { FaqSectionComponent } from './home-section/faq-section/faq-section.component';
import { FooterSectionComponent } from './home-section/footer-section/footer-section.component';
import { HeroSectionComponent } from './home-section/hero-section/hero-section.component';
import { IndustriesSectionComponent } from './home-section/industries-section/industries-section.component';
import { PricingSectionComponent } from './home-section/pricing-section/pricing-section.component';
import { ProcessSectionComponent } from './home-section/process-section/process-section.component';
import { ServicesSectionComponent } from './home-section/services-section/services-section.component';
import { StatsSectionComponent } from './home-section/stats-section/stats-section.component';
import { TechnologySectionComponent } from './home-section/technology-section/technology-section.component';
import { TestimonialsSectionComponent } from './home-section/testimonials-section/testimonials-section.component';
import { TopBarComponent } from './home-section/top-bar/top-bar.component';
import { WorkSectionComponent } from './home-section/work-section/work-section.component';
@Component({selector:'app-root',standalone:true,
imports:[TopBarComponent,HeroSectionComponent,StatsSectionComponent,ServicesSectionComponent,IndustriesSectionComponent,WorkSectionComponent,ProcessSectionComponent,TechnologySectionComponent,PricingSectionComponent,TestimonialsSectionComponent,FaqSectionComponent,ContactSectionComponent,FooterSectionComponent],
template:`<app-top-bar/><main><app-hero-section/><app-stats-section/><app-services-section/><app-industries-section/><app-work-section/><app-process-section/><app-technology-section/><app-pricing-section/><app-testimonials-section/><app-faq-section/><app-contact-section/></main><app-footer-section/>`})
export class AppComponent{}
