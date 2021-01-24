import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface Server {
    id: number,
    name: string,
    status: string
}
//here we want to inject ServersService into ServerResolver service so @Injectable()
@Injectable()
export class ServerResolver implements Resolve<{id: number, name: string, status: string}> {
    constructor(private serversService: ServersService) {}
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Server> |Promise<Server> | Server {
            //inject ServersService, reach out to getServer
            return this.serversService.getServer(+route.params['id']);
        }
}