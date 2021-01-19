import { Directive, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
})
// @HostListener and @HostBinding directives helps us to add CSS classes based on some events
export class DropdownDirective {
    @HostBinding('class.open') isOpen =  false;
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}