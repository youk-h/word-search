import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appMyCheckNumber]"
})
export class CheckNumberDirective {
  constructor(el: ElementRef) { }

  @HostListener("input", ["$event"]) onInput(event) {
    const word = event.data;
    if (/[(０-９)+]/.test(word)) {
      window.alert("半角数字で入力してください");
    }

    if (word && /[^\d]/.test(word.toString())) {
      console.log(`${event.data} is not number`);
      event.target.value = null;
    }
  }
}
