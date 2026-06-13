import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
// import { HeroSection } from '../../components/hero-section/hero-section';
import { StorySection } from '../../components/story-section/story-section';
import { ExperiencesSection } from '../../components/experiences-section/experiences-section';
import { MomentsSection } from '../../components/moments-section/moments-section';
import { FaqSection } from '../../components/faq-section/faq-section';
import { ContactsSection } from '../../components/contacts-section/contacts-section';
import { Footer } from '../../components/footer/footer';
import { BackToTop } from '../../components/back-to-top/back-to-top';
import { CookieConsent } from '../../components/cookie-consent/cookie-consent';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { HeroFullscreen } from '../../components/hero-fullscreen/hero-fullscreen';

@Component({
  selector: 'app-homepage',
  imports: [
    Navbar,
    // HeroSection,
    StorySection,
    ExperiencesSection,
    MomentsSection,
    FaqSection,
    ContactsSection,
    Footer,
    BackToTop,
    CookieConsent,
    HeroFullscreen,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  constructor(private metaPixel: MetaPixelService) {}

  ngOnInit(): void {}
}
