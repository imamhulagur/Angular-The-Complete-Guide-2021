# Angular---The-Complete-Guide-2021-Edition-
You can find the source code of each section attached to the last lecture of that section!

Installing angular
1.install node from wwww.nodejs.com
2.node -v
3.npm -v
4.set environmental variable path
    ->To search it to go c:\users\APPData\
    ->angular/ng path ->C:\Users\Imam Hulagur\AppData\Roaming\npm\node_modules\@angular\cli\bin
    npm ->C:\Users\Imam Hulagur\AppData\Roaming\npm\
5.ng --version
6.create new project
cmd>ng new my-first-app

Installing Bootstrap Correctly
1.cmd>npm install --save bootstrap
    it will install bootstrap locally not globally
2.To make angular aware of our installed bootstrap
    ->go to angular.json
    ->paste path of bootstrap inside styles array
    ->C:\Users\Imam Hulagur\Desktop\JavascriptWorld\AngularWorld\Angular---The-Complete-Guide-2021-Edition-\my-first-app\node_modules\bootstrap\dist\css\bootstrap.min.css
    ->changes \(backward slashes) to /(forward slashes)
    ->cross verification
        run application using >ng serve
        go to inside Sources in developer tools and u ll see the installed bootstraps version insides style.css


Project Hands on
Component creation and Data binding
    -model is just a ts file, which represents blueprint of a object we create[like a bean object in java]
    -it will not contain @Model decorator

-Directives
    1.structural directives : affect whole area in DOM
        ex : *ngIF, *ngFor, *ngSwitch
    2.Attribute directives : only affect/changes the element that they are added to
        ex: [ngClass], [ngStyle], [ngSwitch] with *ngSwitchCase's and ngSwitchDefault
    * represent in directive it will compile down to
    before
    <div *ngIf="someClass">
        //some prop
    </div>
    on compilation - it will converted into property binding inside <ng-template> </ng-template> tag by angular decompiler
    <ng-template>
        <div [ngIf] = "someClass">
            //some prop
        </div>
    </ng-template> 
    -we can write our own custom directives using @Input, tRef:templateRef, and vfRef: ViewContainerRef
    -imp* we need to know the the name of our property should have same name as our selector

Services and Dependency injection
    services - To avoid complex chain of event and property binding
        - DRY{Don't Repeat Yourself}
        - angular classes/business object which used to share the data, acts as centralized data outsourcing elements
        - To avoid/reduce code redundancy/duplication
        -centralized data management ex services in RxJS, Store concept in NgRx
        -*while creating service we will not add any type of decorators
        -*We should not create instances of services manually using new keyword, instead we need to inject it{so that angular will create services instances on the fly} inside constructor.
            Thats the best practice.
        -*The services which injected in app.module.ts providers[] share the data across all the components.
        -*The highest possible level of injecting service is app.module.ts

    Steps to create inject any service automatically by angular not manually.
        -create service class
        -inject it inside required components{that tells angular where we need the service}
        -declare the service inside providers[] inside @component decorator.

    Hierarchical injection
        -The instances of services will only propagate downwards/child compo but not upwards/parent components
        -*While the services injected inside app.components.ts providers[] will only share data with app and its child components.
            we can access data using same service reference.
        -*If you want to share the data as of parents components then just remove local services declaration inside providers[]
            but not from constructor since angular need to know this present component need same data instead of
            overriding data by creating other local component ref to injected service.

    Injecting service into other service
        -for this its not possible in the component level,instead it should happen in app.module.ts i.e global level
        -using decorator @Injectable() i.e the service to which module you want to inject not for the service which you are injecting.
        -good practice always declare a service with @Injectable decorator since at least in future you may inject something to this service.

    What happens if we wont use services
        -we need to emit even and listen to that emitted events using event binding
        -we have pass the data to other components via property binding.
        -To avoid we use services using the concept "Cross component communication"

Note : In Angular 6+ injecting services in app.module.ts can be done using below
    @Injectable({
        providedIn: 'root'
    })
    
    instead of providing it in app.module.ts like older way
    @NgModule({
        declaration:[],
        import:[],
        bootstrap[AppComponent],
        providers:[
            desiredService
        ]
    })

