import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appFormatPhone]'
})
export class FormatPhoneDirective implements AfterViewInit {
  #el = inject(ElementRef<HTMLInputElement>);

  ngAfterViewInit(): void {
    this.formatValue();
  }

  @HostListener('input')
  onInput() {
    this.formatValue();
  }

  private formatValue() {
    const input = this.#el.nativeElement as HTMLInputElement;

    const rawValue = input.value;
    const cursorPosition = input.selectionStart || 0;

    // Extrai os dígitos e formata
    const digits = rawValue.replace(/\D/g, '').slice(0, 11);
    const formatted = this.formatPhone(digits);

    // Calcula quantos dígitos existiam antes do cursor original
    const rawDigitsBeforeCursor = rawValue.slice(0, cursorPosition).replace(/\D/g, '');
    
    input.value = formatted;

    // Reposiciona o cursor com base em onde os dígitos estavam
    const newCursor = this.getCursorPosition(formatted, rawDigitsBeforeCursor.length);

    setTimeout(() => {
      input.setSelectionRange(newCursor, newCursor);
    });
  }

  private formatPhone(digits: string): string {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  private getCursorPosition(formattedValue: string, digitIndex: number): number {
    let count = 0;
    for (let i = 0; i < formattedValue.length; i++) {
      if (/\d/.test(formattedValue[i])) count++;
      if (count === digitIndex) return i + 1;
    }
    return formattedValue.length;
  }
}
