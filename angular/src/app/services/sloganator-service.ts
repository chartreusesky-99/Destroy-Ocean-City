import { Injectable, signal } from '@angular/core';
import localProducts from '../data/products.json';
import slogansData from '../data/slogans.json';

@Injectable({ providedIn: 'root' })
export class SloganatorService {

  readonly displayText = signal<string>('');

  private slogans: string[] = [...localProducts.genericContent.slogans];
  private appSlogans: string[] = [...slogansData.slogans.appSloganator];
  private recentAppIndices: number[] = [];
  private currentText = '';
  private targetText = '';
  private recentIndices: number[] = [];
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private transitioning = false;
  private waiting = false;
  private pendingSlogans: string[] | null = null;

  constructor() {
    this.startTyping();
  }

  // Call immediately on navigation — erases whatever is on screen right now.
  // If slogans aren't known yet (product page), waits for transitionTo() to supply them.
  beginErase(): void {
    if (this.transitioning || this.waiting) return;
    this.clearTimer();
    this.transitioning = true;
    this.pendingSlogans = null;
    this.eraseStep();
  }

  // Supply the slogans to type next. If erasing is already in progress (from beginErase),
  // just stores them for pickup. If waiting (erase already done), starts immediately.
  transitionTo(slogans: string[]): void {
    this.pendingSlogans = [...slogans];
    if (this.waiting) {
      this.waiting = false;
      this.applyPendingAndStart();
    } else if (!this.transitioning) {
      this.clearTimer();
      this.transitioning = true;
      this.eraseStep();
    }
    // if transitioning: pendingSlogans updated, picked up when erase completes
  }

  private applyPendingAndStart(): void {
    if (this.pendingSlogans) {
      this.slogans = [...this.pendingSlogans];
      this.pendingSlogans = null;
      this.recentIndices = [];
    }
    this.transitioning = false;
    this.timeout = setTimeout(() => this.startTyping(), 500);
  }

  private startTyping(): void {
    this.targetText = this.pickNext();
    this.currentText = '';
    this.typeStep();
  }

  private typeStep(): void {
    if (this.currentText.length < this.targetText.length) {
      this.currentText = this.targetText.slice(0, this.currentText.length + 1);
      this.displayText.set(this.currentText);
      this.timeout = setTimeout(() => this.typeStep(), 50);
    } else {
      this.timeout = setTimeout(() => this.eraseStep(), 3500);
    }
  }

  private eraseStep(): void {
    if (this.currentText.length > 0) {
      this.currentText = this.currentText.slice(0, -1);
      this.displayText.set(this.currentText);
      this.timeout = setTimeout(() => this.eraseStep(), 28);
    } else if (this.transitioning) {
      if (this.pendingSlogans) {
        this.applyPendingAndStart();
      } else {
        this.waiting = true; // slogans not yet known, hold here until transitionTo() is called
      }
    } else {
      // normal cycle — keep going with current slogans
      this.timeout = setTimeout(() => this.startTyping(), 500);
    }
  }

  private clearTimer(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  pickNextAppSlogan(): string {
    if (!this.appSlogans.length) return '';
    let idx: number;
    do {
      idx = Math.floor(Math.random() * this.appSlogans.length);
    } while (this.recentAppIndices.includes(idx) && this.appSlogans.length > this.recentAppIndices.length);
    this.recentAppIndices.push(idx);
    if (this.recentAppIndices.length > 3) this.recentAppIndices.shift();
    return this.appSlogans[idx];
  }

  private pickNext(): string {
    if (!this.slogans.length) return '';
    let idx: number;
    do {
      idx = Math.floor(Math.random() * this.slogans.length);
    } while (this.recentIndices.includes(idx) && this.slogans.length > this.recentIndices.length);
    this.recentIndices.push(idx);
    if (this.recentIndices.length > 3) this.recentIndices.shift();
    return this.slogans[idx];
  }

}
