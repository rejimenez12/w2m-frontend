import { Directive, ElementRef, forwardRef, HostListener, Renderer2, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appUppercaseText]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UppercaseTextDirective),
      multi: true,
    },
  ],
})
export class UppercaseTextDirective implements ControlValueAccessor {

   /** implements ControlValueAccessorInterface */
   public _onChange: (_: any) => void;

   /** implements ControlValueAccessorInterface */
   public _touched: () => void;
 
   constructor( @Self() private _el: ElementRef, private _renderer: Renderer2) { }
 
   /** Trata as teclas */
   @HostListener('keyup', ['$event'])
   onKeyDown(evt: KeyboardEvent) {
     const keyCode = evt.key;
     if (keyCode >= "a" && keyCode <= "z") {
       const value = this._el.nativeElement.value.toUpperCase();
       this._renderer.setProperty(this._el.nativeElement, 'value', value);
       this._onChange(value);
       evt.preventDefault();
     }
   }
 
   @HostListener('blur', ['$event'])
   onBlur() {
     this._touched();
   }
 
   /** Implementation for ControlValueAccessor interface */
   public writeValue(value: any): void {
     this._renderer.setProperty(this._el.nativeElement, 'value', value);
   }
 
   /** Implementation for ControlValueAccessor interface */
   public registerOnChange(fn: (_: any) => void): void {
     this._onChange = fn;
   }
 
   /** Implementation for ControlValueAccessor interface */
   public registerOnTouched(fn: () => void): void {
     this._touched = fn;
   }
 
   /** Implementation for ControlValueAccessor interface */
   public setDisabledState(isDisabled: boolean): void {
     this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
   }

}
