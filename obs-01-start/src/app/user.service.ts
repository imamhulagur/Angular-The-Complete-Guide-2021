import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'//This is the new way of declaring service inside app.module.ts providedIn[]
})
export class UserService {
    activatedEmitter = new Subject<boolean>();
}