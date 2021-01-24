import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    //since interface contains only method declaration which need to taken care by child classes
    //it had only one method, canDeactivate without any parameters
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

//write our class now by implementing above interface
export class canDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    //this is method will be called by angular router once user tries to navigate to other component.
    // ?: is an optional argument
    canDeactivate(component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {
            return component.canDeactivate();
        }
}