import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appMyCheckNumber]"
})
export class CheckNumberDirective {
  constructor(el: ElementRef) { }

  @HostListener("input", ["$event"]) onInput(event) {
    const word = event.data;
    if (/[０-９]/.test(word)) {
      return event.target.value = String.fromCharCode(word.charCodeAt(0) - 65248);
    }
    if (word && /[^\d]/.test(word.toString())) {
      console.log(`${event.data} is not number`);
      event.target.value = null;
    }
  }
}
