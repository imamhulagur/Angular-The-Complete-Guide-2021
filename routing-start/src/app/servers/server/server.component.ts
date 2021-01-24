import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    // .subscribe(
    //   (params: Params)=>{
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
    //commented since we are using resolver for this
    this.route.data
    .subscribe(
      (data: Data)=> {
        this.server = data['server'];//make sure the property name should match the one which you have provided in route resolver config
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'],{relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
