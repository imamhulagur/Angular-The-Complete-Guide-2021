import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UserService {
    activeUsers = ['imam1','imam2'];
    inactiveUsers = ['imam3','imam4'];

    constructor(private counterService: CounterService){}

    setToActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id,1);
        this.counterService.incrementInactiveToActive();
    }

    setToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id,1);
        this.counterService.incrementActiveToInactive();
    }
}