b# Angular---The-Complete-Guide-2021-Edition-
You can find the source code of each section attached to the last lecture of that section!

Getting Started
***************
    Updating npm:

    Run [sudo] npm install -g npm  (sudo  is only required on Mac/ Linux)

    Updating the CLI

    [sudo] npm uninstall -g angular-cli @angular/cli 

    npm cache verify 

    [sudo] npm install -g @angular/cli


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

    Project Hands on
    Component creation and Data binding
        -model is just a ts file, which represents blueprint of a object we create[like a bean object in java]
        -it will not contain @Model decorator


The Basics
**********
    App startup
    -----------
        <app-root>Loading...</app-root>
            here on compilation we wont be able to see Loading instead because Angular overrides this tah with app component at run time.
        The first which gets executed is main.ts ->which inturn import AppModule.
        platformBrowserDynamics.bootstrapModule(AppModule)
        The it will go to app.module.ts -> here the bootstrap: [AppComponent] inside @NgModule({}) will load the app component using selector tag <app-rot></app-rot> inside index.html.
        The index.html - contains the executed code(which also included out own component typescript code) compiled to javascript and imported with script tag.

    selector
    --------
    preferred selector is select by element.
        Element selector -> selector: 'app-servers'
            in html <app-servers></app-servers>
        Attribute selector-> selector: '[app-servers]'
            in html <div app-servers></div>
        Class selector -> selector: '.app-servers;
            in html <div class="app-servers"></div>
        note: selecting by id wont work in angular and all those hover and so on psuedo selectors wont work here.

    Data binding
    -----------
        sharing data between behavior ts code(business login) and template(html)
        One way data binding
        -------------------
        output data -> from .ts to .html
            1.string interpolation
                {{data}}
            2.property  binding
                [property]='data'

        input data->from .html to .ts
            React to user events - when user click a button we need to change some behavior of login.
            Event binding
                (event)='customFunction()'

        Two way data binding
        --------------------
        Instead of listening to (input)="someMethod()" changing value by listening to $event and rewriting the value to DOM using string interpolation we can achieve it by using ngModel directive provided in FormModule.
            Important: For Two-Way-Binding to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.

            You then also need to add the import from @angular/forms  in the app.module.ts file:

            import { FormsModule } from '@angular/forms'; 

            [(ngModel)]="data"

    Directives
    -----------
    Directives are instructions in the DOM!
        Builtin directive
        -----------------
        The directives with templates.
        1.structural directives : affect whole area in DOM
            ex : *ngIF, *ngFor, *ngSwitch
        2.Attribute directives : only affect/changes the element that they are added to
            ex: [ngClass], [ngStyle], [ngSwitch] with *ngSwitchCase's and ngSwitchDefault
        * represent in directive it will compile down to
        before
        <div *ngIf="someClass">
            //some prop
        </div>
        on compilation - it will converted into property binding inside <ng-template> </ng-template> tag by angular de compiler
        <ng-template>
            <div [ngIf] = "someClass">
                //some prop
            </div>
        </ng-template> 
        -we can write our own custom directives using @Input, tRef:templateRef, and vfRef: ViewContainerRef
        -imp* we need to know the the name of our property should have same name as our selector

        custom directives/Attribute directive
        -------------------------------------
        Directives without templates
            ex: <p appSomeDirective>testing</p>

            @Directive({
                selector: '[appSomeDirective]'
            })
            export class AppSomeDirective {
                //logic
            }

COURSE PROJECTS
***************
    Make sure, you do create that app by also adding the --no-strict flag to the ng new command - otherwise you will run into issues later on (we'll still dive into that "Strict Mode" later in the course of course, no worries)!

    We'll also install the Bootstrap CSS Framework and in this course, we use version 3 of the framework. Install it via npm install --save bootstrap@3  => The @3  is important!

    Additionally, when using a project created with Angular CLI 6+ (check via ng v ), you'll have an angular.json  file instead of an .angular-cli.json  file. In that file, you still need to add Bootstrap to the styles[]  array as shown in the next video, but the path should be node_modules/bootstrap/dist/css/bootstrap.min.css , NOT ../node_modules/bootstrap/dist/css/bootstrap.min.css . The leading ../  must not be included.

    Installing Bootstrap Correctly
    ------------------------------

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

    Model
    -----
        just a typescript class, its a blueprint for objects that we create.
        we wont provide any decorator for model class.
        we will instantiate objects calling constructor using new.(use typescript shortcut for instantiation)


    Debugging
    ---------
        js supports source
        source maps->which allows browser to translate js code-> typescript code or simply map the js code to ts code only development.
        we can directly access our ts files(instead of searching in main.bundles.js sourcemap) under webpack:// > dot(.) > src as same structure as in out project.
        In Production these source maps wont be available hence we cant be able to debug production code in browser i.e source code wont be available.

Section 5: Components & Databinding Deep Dive
***************************
    components communication
    ------------------------
    parent components
    ------------------
    By Default all the properties of a component are only accessible inside that component from other components.

    PC->CC - property binding - make it bindable from outside.
    Then we can expose the properties using decorator @Input('aliasName')
    aliasName ->if you want to output alias name prop outside of comp.

    CC-> PC - event emit - make it listenable from outside
    @Output() eventName = new EventEmitter();
    this.eventName.emit(data);
    (eventName)="methodName(@event)

    two diff comp
    ------------
    issue - chain of events
                 <->        app       <->
                |                      |
        one comp events         other components
 

    View Encapsulation
    ------------------
    shadow dom ->where each element had its own property/dom since this technique is not supported by all the browsers angular encapsulate such styles by giving strange attributes p[_ngContent-ejo-n] {color: blue}
    we can override these encapsulation(remove these strange attributes getting added by angular to each elements)
    @Component({
        ...
        encapsulation: ViewEncapsulation.None(or Native or Emulated)
    })
    Native again uses Shadow DOM technique


    Using local reference in template - without 2 way binding
    ---------------------------------
    way of accessing html element in template and pass the element value by calling method to ts code.
        Reference can be used only in template!, we cant in ts file. But we can pass it to ts.
        can be placed on any HTML element, prefix with hash(#temp)
        test: HTMLInputElement
        temp will hold reference to whole HTML element not just the value.

    @ViewChild()
    -----------
    Another way of getting access to element directly from within our ts code. since sometimes we actually want to access element before we call the method.
        <p #serverContentInput></p>
    Angular 8+
        @ViewChild('nameOfLocalReference', {static: true}) nameOfLocalReference:elementRef
        @ViewChild('ServerComponentInput', {static: true}) serverComponent

        instead of Angular 6+
        @ViewChild('ServerComponentInput') serverComponent

        access->this.nameOfLocalReference.nativeElement.value
        

    ng-content
    ----------
        when i want to render complex html content of other template.
        app.custom-comp.html
        <ng-content></ng-content> -> it directive which serves as a hook in our template

        app.component.html
        <app-custom-comp>
            //here you can insert that completed template instead of app.custom-comp.html
        </app-custom-comp>


    Angular life cycle hooks
    ------------------------
    first constructor(){} gets called!
        1.ngOnChanges(changes: SimpleChanges) -> called after input property changes
        2.ngOnInit() -> called once the component is initialized (our properties has been initialized, object has been created)
            it wil run after the constructor.
        3.ngDoCheck() -> called during every change detection run.
        4.ngAfterContentInit() -> called after content(ng-content) has been projected into view i.e some part of parent component template gets added to our component.
        5.ngAfterContentChecked() -> called every time the projected content has been checked. runs when change detection detect the content changed.
        6.ngAfterViewInit() ->called after components view(and child views) hab been initialized. after view get rendered.
        7.ngAfterViewChecked() -> called every time the view(and child views) has been checked by change detection.
        8. ngDestroy() -> called once the component about to destroyed. Best place for cleanup activity.


    @ContentChild()
    ---------------
        In Angular 8+, the @ContentChild() 
        Instead of:

        @ContentChild('serverContentInput') serverContentInput: ElementRef;
        use

        In Angular 6
        @ContentChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
        The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() (and also @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().

        If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!

        If you're using Angular 9+, you only need to add { static: true } (if needed) but not { static: false }.


Section 6: Course Project - Components & Databinding
****************************************************

Section 7: Directives Deep Dive
*******************************   
    we cant have more than one structural directives on same element.

    creating our own attribute directive
    >ng generate directive directiveName or >ng g d directiveName
        @Directive({
            selector: '[appBasicHighlight]'
        })
        export class BasicHighlightDirective {}

    add BasicHighlightDirective to declaration: [] in app.module.ts

    <p appBasicHighlight>Style me with basic highlight directive</p>
        note: here we dont use [] to while calling directive, since we selecting as a attribute.

    renderer
    --------
    we should not directly manipulate the DOM
        this.elementRef.nativeElement.backgroundColor = 'green'
    instead we need to make use of renderer
        constructor(renderer: Renderer2, private elementRef: ElementRef){}
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'green')
    
    In the last lecture, we used the Angular Renderer class to change the style of a HTML element. As explained in that lecture, you should use the Renderer for any DOM manipulations.

    Of course, you can do more than simply change the styling of an element via setStyle()
    https://angular.io/api/core/Renderer2


    @HostListener() - reactive directive
    --------------
        since renderer style are static and are not interactive. To make renderer more interactive we use @HostListener()

        @HostLister('mouseenter') mouseEnter(eventData: Event) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'green')
        }

    @HostBinding() - dont use render
    -------------
        easy way to manipulate DOM without using renderer
        @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'

        @HostListener('mouseenter') mouseEnter(eventData: Event) {
            this.backgroundColor = 'green'
        }

    custom property binding
    -----------------------
        binding properties of a directive to make changes from outside.
        @Input('alias') highlightColor: string = 'green';
        @Input('alias') defaultColor: string = 'transparent';

    structural directives behind the scenes(*)
    -----------------------------------------
        there is no * syntax in angular, behind the scenes angular needs to transform this * into something which is aware of.
        before
            <div *ngIf='testCondition'>
                <p>testing...</p>>
            </div>
        after ->converts structural directive into property binding
            <ng-content [ngIf]='testCondition'>
                <p>testing...</p>
            </ng-content>

    custom structural directive implementation
    ------------------------------------------
        make sure our property name and name of the directive must be similar

        @Directive({
            selector: 'ngIfCustom'
        })

        export NgIfCustom {
            constructor(private templateRef: TemplateRef<any>,
                        private viewContainerRef: ViewContainerRef)
            @Input() set ngIfCustom(condition: boolean) {
                if(!condition) {
                    this.viewContainerRef.createEmbeddedView(templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            }
        }

        make use of it in other component template like
        <div *ngIfCustom='condition'>
        </div>

    ngSwitch
    --------
    instead of creating lot of ngIf conditions use ng switch.
        if we want to show multiple templates based on certain conditional value.

8: Course Project - Directives
******************************


Section 9: Using Services & Dependency Injection
*************************************************
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
        -we can also declare from service class itself
            @Injectable({
                providedIn: 'root'
            })

    Hierarchical injection
    ----------------------
        -The instances of services will only propagate downwards/child compo but not upwards/parent components
        -*While the services injected inside app.components.ts providers[] will only share data with app and its child components.
            we can access data using same service reference.
        -*If you want to share the data as of parents components then just remove local services declaration inside providers[]
            but not from constructor since angular need to know this present component need same data instead of
            overriding data by creating other local component ref to injected service.

    Injecting service into other service
    ------------------------------------
        -for this its not possible in the component level,instead it should happen in app.module.ts i.e global level
        -using decorator @Injectable() i.e the service to which module you want to inject not for the service which you are injecting.
        -good practice always declare a service with @Injectable decorator since at least in future you may inject something to this service.

    What happens if we wont use services
    ------------------------------------
        -we need to emit even and listen to that emitted events using event binding
        -we have pass the data to other components via property binding.
        -To avoid we use services using the concept "Cross component communication" with event emitter.

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

    Services in Angular 6+
    ----------------------
        If you're using Angular 6+ (check your package.json  to find out), you can provide application-wide services in a different way.

        Instead of adding a service class to the providers[]  array in AppModule , you can set the following config in @Injectable() :

        @Injectable({providedIn: 'root'})
        export class MyService { ... }
        This is exactly the same as:

        export class MyService { ... }
        and

        import { MyService } from './path/to/my.service';
        
        @NgModule({
            ...
            providers: [MyService]
        })
        export class AppModule { ... }
        Using this new syntax is completely optional, the traditional syntax (using providers[] ) will still work. The "new syntax" does offer one advantage though: Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically. This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.

    @Inject()
    OtherServiceName
    To inject other service into this service

Section 10: Course Project - Services & Dependency Injection
************************************************************

Section 11: Changing Pages with Routing
***************************************
    To make user look like they are shifting from one page to another, but in reality
        we are loading single page with different component template based dynamic routing.
        instead of calling statically from HTML templates of other components.
    app.model.ts is a good place to inform angular about the routes of our application.
    each route is just a javascript object inside appRoutes: Routes[]
        which will accept path and components as a keys
    add 'RouterModule' inside @NgModule and the register appRoutes to RouterModule inside imports.
    To inform angular where to put our routes, use <router-outlet/>(this will mark the place in our document where we want angular to load currently loaded compo)
    put your routes values into special type of directive called routeLink = ['routeName']
    Absolute path - with '/' in the beginning, which will always gets appended to root domain.
        with './ or ../' will go back one path, or got back another path.
    Active route style - dynamically
    --------------------------------
    if we provide routes inside href='' it will restart our app.
    The angular provided an directive, routerLinkActive=""
        for empty path i.e /nothing, is always present in all the path so to avoid this
            we need to use directive - routerLinkActiveOptions
            this need [] because just can not pass JS object directly to directive, so we need to wrap it property binding using[];
                ex: [routerLinkActiveOptions] = "{exact : true}"
    Navigate Programmatically
    --------------------------
    If you want to redirect to any other page in other components
        1.first inject the Router 
        2.use this.Router.navigate(['pathName'], {relativeTo: this.route}) method

    Relative path -> starts without '/' ->it will append the path to current path.
    Absolute path -> start with '/absolutePath' will come back to base directory and then add absolutePath.
      
    passing parameters to route
    ---------------------------
    /: will tell router that 'this is our dynamic part of the route'

    Fetching route parameters
    ------------------------
    inject Activated router
    Since it had lot of meta data related to route, it will give access to id passed in the URL of selected user using
        snapshot property i.e this.router.snapshot.params['id'];

    Fetching route parameters reactively.
    -----------------------------------
    Angular would not create/render new component and destroy the old if you are already on same component(because of performance issue)
    Still if you need to update the current component with update values you can do it by following
        we need a different approach instead of snapshot(which is for initial routing purpose)
        need to use 'param' observable, since you dont know when, if or how long it will take to change url change.
            we cant block our routing. So need to subscribe to observable.
        observable is 3rd party packages(rxjs) which are used to perform asynchronous task, without having to wait for the task which might happen in future.
        ex : this.router.params
            .subscribe(
                (params: Params)=> {
                    this.user.id = params['id'];
                    this.user.name = params['name'];
                }
            )
            Now this trigger only when there is changes in url/params

    Important note about observables
    ---------------------------------
    Observable will not be destroyed even if your component get destroyed from the memory if you moved to other component.
        So we need to unsubscribe observable in onDestroy() of angular.
        create subscription object
            paramSubscription: Subscription;
        unsubscribe inside ngDestroy()
            this.paramSubscription.unsubscribe();
    
    passing query parameter and fragments
    -------------------------------------
        { path: "servers/:id/edit", component: EditServerComponent}
        [routerLink] = "['/servers', 5, 'edit']" //http://localhost:4200/servers/5/edit
    ?key=value&key2=value2
        [queryParams] = "{allowEdit : '1'}" //http://localhost:4200/servers/5/edit?allowEdit=1
    #loading - route with extra information
        [fragment] = "'loading'" //http://localhost:4200/servers/5/edit?allowEdit=1#loading
        since fragment directive string as argument not JS, we can also write as
        fragment = "loading"
    Programmatically
        this.router.navigate(['./servers', id, 'edit'], {queryParams: { allowEdit: '1'}, fragment: 'loading'});
        (click) = "onLoadServer(1)"

    Retrieving queryParams and fragments
    ------------------------------------
    inject route: ActivatedRouter
        console.log(this.route.snapshot.queryParams);
        console.log(this.route.snapshot.fragment);
        this.route.queryParams.subscribe();
        this.route.fragment.subscribe();

    Practicing some common gotchas
    ------------------------------
    this.route.snapshot.queryParams(['id']) -> will return string, convert it to number by adding + in front of it.

    nested/child routing
    --------------------
    const appRoutes:Routes = [
        {
            path: 'parent', component: 'ParentsComponent', children: [
                { path: ':id', component: 'ParentComponent'},
                {path: ':id/edit', component: 'ParentEditComponent'}
            ]
        }
    ]
    if only nest we get error
        the <router-outlet></router-outlet> is only available to top level routes
        child routes also needs a separate outlet, because they simply cant override, instead they should be loaded nested.
    <router-outlet></router-outlet>//this will be new route, which will use on all child routes.

    configuring handling of queryParams
    -----------------------------------
        <a [queryParams] = '{allowEdit: server.id === 3 ? '1' : '0'}>{{server.name}}</a>

        onEdit() {
            this.router.navigate(['edit'], {relativeTo: this.route})
        }

        how to preserve the queryParams when we visit other component, by making sure old ones are kept.
        queryParamsHandling: 'merge'/'preserve - to make sure, we dont loose param info we have before.
            onEdit() {
            this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
        }

    redirecting and wildcard routing and redirectTo
    -----------------------------------------------
    what if user enters un handled url/routes
    create separate component to handle such kind of scenarios
        { path: 'not-found', component: PageNotFoundComponent  },
        { path: 'something', redirectTo: '/not-found'}
    wildcard route(**)
        That mean catch all possible routes which are unknown to Angular and redirect to mentioned component.
        The order is super important here - 
            If it was in the beginning, you will always redirect to '/not-found'
            make sure it should be last, because our array gets parsed from top to bottom.

    'pathMatch' ing while redirecting
    --------------------------------
        By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just / 

        { path: '', redirectTo: '/somewhere-else' } 

        Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

        Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

        To fix this behavior, you need to change the matching strategy to "full" :

        { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 

        Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

    Creating separate routing Module -> outsourcing the route configuration
    -----------------------------------------------------------------------
    Typically if you have more than 2 or 3 route configuration i.e if route configuration taking much space in app.module.ts
        we need to add them in new file for whole application i.e app-routing.module.ts
    No need to add Declaration[], since they all declared inside app.module.ts otherwise we ll get error.
    *we need to export/outsource these routes from app.routing.module.ts 
        exports: [
            RouterModule
        ]
    to add in imports[AppRoutingModule] of app.module.ts
        imports:[AppRoutingModule]

    Route Guards
    ************
    Functionality, logic or code executed before loading of route.
    Manually checking this in NgOnInit(){} of a particular component will be very cumbersome.
    so need to use angular feature called angular router.

    protecting routes with canActivate
    ----------------------------------
    ->create service, which implements CanActivate interface
        (it will forces us to implements and override canActivate() compulsory)
        it wil take two input ActivatedRouteSnapshot, RouterStateSnapshot
        it return observable<boolean> alternatively it can return promise<boolean> or boolean
        it can run synchronously and also asynchronous.
        create fake auth service since we have not implemented login functionality
        inject auth service into auth guard, to do we need to make auth guard as injectable
        if user is authenticated then return true, or else we should not allow user to access that page 
            redirect him to other page by injecting router and navigate.
    ->To use created guard
        We need to found out which route should be protected by this guard(ex: here servers compo)
        add canActivate[] property, it will take all the guard to which it should apply to all teh child compo.
        and add both services namely authService, AuthGuard to providers[] of app.module.ts
        
        protecting only child/nested routes with canActivateChild
        ----------------------------------------------------------
        implement new interface canActivateChild in AuthGuard
        just declare method call back canActivate method, now we can write different hook in our routes i.e canActivateChild
        Now we can protect single route(using canActivate) and child routes(using canActivateChild) inside app.module
    
    Controlling navigation with canDeactivate
    -----------------------------------------
    when user accidentally navigating on other tabs need ask do need to save current changes.
    create one flag to keep track of changes
        changesSaved = false;
    As soon as update one level up and ask.
        this.changesSaved = true;
        this.router.navigate(['../'], {relativeTo: this.route})
    create a can-deactivate-guard.service.ts since a guard should always be service.
        import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
        import { Observable } from "rxjs";

        export interface CanComponentDeactivate {
            //since interface contains only method declaration which need to taken care by child classes
            //it had only one method, canDeactivate without any parameters
            canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
        }

        //write our class now by implementing above interface
        export class canDeactivateGuard implements canDeactivate<CanComponentDeactivate> {
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
    define it inside providers[] in app.module
         providers: [ServersService, AuthService, AuthGuard,canDeactivateGuard],
    implement it in our own compo
        canDeactivate():Observable<boolean> | Promise<boolean> | boolean {
            if(!this.allowEdit) {
            return true;
            }
            if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
            } else {
            return true;
            }
        }  

    passing a static data to Route
    ------------------------------
    even though we are receiving data or how to get param out of route URL, 
        still some of our routes depend on your data they received statically(each time they have loaded) or dynamically
    for example to display particular error message
    crete error page
        ng g c error-page
    go to that route, define your own data object
        { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    subscribe assign and make use it of it in html.
        ngOnInit(): void {
            //this.errorMessage = this.route.snapshot.data['message'];
            this.route.data.subscribe(
                (data: Data)=> {
                    this.errorMessage = data['message'];
                }
            )
        }
    
    passing a dynamic data to Route/ Resolving Dynamic data with resolve Guard.
    ---------------------------------------------------------------------------
    if i want to load from backend, so we need a resolver.
    resolver
        its an service similar to canActivate and canDeactivate will help us run some code before a route is rendered.
    create resolver server 
        ex server-resolver.service.ts
    it should need to implement Resolve interface.
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
    config the route with resolver
         { 
                path: ":id", 
                component: ServerComponent,
                resolve: {server: ServerResolver}
            },
    import resolver server in app module
        providers: [ServersService, AuthService, AuthGuard,canDeactivateGuard, ServerResolver],
    subscribe to resolver and access asynchronous data from server
        this.route.data
        .subscribe(
        (data: Data)=> {
            this.server = data['server'];//make sure the property name should match the one which you have provided in route resolver config
        }
        );
    
    Understanding the location strategies(when you are hosting on real server)
    --------------------------------------------------------------------------
    it works fine here in our local setup, this is not something we should taken for granted.
    if we have route like ourDomain/
        if we are hosting it in real server in web this might not work out of the box.
        because there the route are always parsed/handled by the server which host our application.
        but here in our local environment i.e in our development environment we are using development sever which has one special configuration than real life server also has to have.
    The server hosting our SPA/single page application has to be configured such that in case of 404 error it return index.html file starting an containing our angular app. why..?
        because all our URLs are parsed by the server first(not by the a angular)
        Now if we have /servers here, it will look for /servers on real server on web.
        now chances are we dont really have /servers route here, we only have only one file index.html containing our angular app.
        and we want our angular to take over and parse these routes, but it will never get a chance if our real server decide no i dont know this route, here is your 404 error page. 
    So in such cases we need to make sure your real web server need to return index.html file.
        If for some reason we can get to work or we need to support very old browsers which are not able to parse like this in the client in which angular does than.
        we have an alternate approach using these nice url in web, we need to use older technique which was used in couple of year ago.
    using # signs in our routes i.e hash mode routing
        we can enable it in app-routing.module
            RouterModule.forRoot(appRoutes, {useHash: true})
        it will inform our real web server that, hey only care about the part before this # key.
        all the part after # can be ignored by our web server. 
        therefore it can run on web server even if its not returning index.html file.
    After # tag can be parsed by our client i,e by Angular.

Routing - Course project
************************
    @NgModule({}) -  will added to convert normal typescript class into angular module, which take JS object.
    The order of the route place should following
        first static routes
        The routes with dynamic params
        ex
            {
                path: 'new', component: RecipeEditComponent // /recipe/new
            },
            {
                path: ':id', component: RecipeDetailsComponent
            },
    *The Observable which we have created should need to unsubscribe manually inside onDestroy()
        The Observable which angular created will be gets unsubscribed automatically

Section 13: Understanding Observables
*************************************
    Understanding Observable
    ------------------------
        Its a data source(Events, Http Requests, Triggers) in a code.
        its from 3rd party package rxjs, need to import it from rxjs.
        It work as following
                                OBSERVABLE 
        
        --------------------------------------------------------->  in between we have stream/timeline, we will get data packets/triggers

                                
        Handle data        Handle error        Handle completion       We have 3 ways to handle data         
        --------------------------------------------------------->  in between we have stream/timeline, we will get data packets/triggers
                    
                                OBSERVER(our code)/subscriber

    An observable does not have to complete like observable for button click.
    But some of the observable will complete like Observable for Http Requests.
    We will use these observables to handle asynchronous tasks.
        since we dont know when they will happen.
        we dont know how long will it take.
    So if we are executing normal code, we should not to wait for these event response/completion. bcz that will block our program.
    we can use call back or Promises, but Observable the just diff approach to handling async's. also angular embraces to use lot.
    Observable have one major advantage i.e Operators.

    creating our own observable
    ----------------------------
    import interval(utility function) method from rxjs
    subscribe to it ngOnInit method, print into console.
    to prevent memory leak, we need to stop it by unsubscribing. 
        to do this, first we need to store that subscription of type Subscription variable.
        inside onDestroy method just unsubscribe it.
    For the observable provided by angular for us like params will be taken care by angular.

    building custom observable
    -------------------------
        ngOnInit() {
            this.firstObsSubscription = interval(1000)
            .subscribe(count => {
                console.log(count);
            })
        }
        angular wont unsubscribe custom observables unlike its builtin, we need to do inside onDestroy() to avoid memory leaks.
        onDestroy() {
            this.firstObsSubscription.unsubscribe();
        }
    create observable using crate() 
    -----------------------------
    Here observer is an listen we need to inform observe about the subscription.
        ngOnInit() {
            const customObservable = Observable.create(observer => {6
            let count = 0;
            setInterval(() => {
                observer.next(count);//observer.error(), observer.complete()
                count++;
            }, 1000)
            });

            //subscribe that custom created observable
            this.firstObsSubscription = customObservable.subscribe( data => {
            console.log(data);
            });
        }

    error and completion
    --------------------
    error
    fake an error as of now, but in real time we will get from api call error.
        observer.error(new Error('Counter greater than 3!')); 
    Handle it 2nd arg fun with error message as an arg
        this.firstObsSubscription = customObservable.subscribe( data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    complete -> after this observable halts there are no other values gets emitted. even though there is error condition after it.
    check the condition
        if(count === 2) {
            observer.complete();
        }
    write 3rd arg clear fun without any arg
        ()=> {
            console.log('Counter completed!');
        }

    Operators(https://www.learnrxjs.io/learn-rxjs/operators)
    ---------------------------------------------------------
    To change the format of data.
    we can call them using a pipe() method. every observable has this method.
    now we will import Operators from rxjs/Operators lib not from observable, thousands of Operators are there.
    ex pipe(), map()
        note: import { map } from 'rxjs/operators'
    first customize
        customObservable.pipe(map(
        (data: number) => {
            //customize the data format which you needed.
            return 'Round ' + (data + 1);
        }));

        //subscribe that custom created observable
        this.firstObsSubscription = customObservable.subscribe( data => {
            console.log(data);
        }, error => {
            console.log(error);
        }, ()=> {
            console.log('Counter completed!');
        });

    replace it.
        //subscribe that custom created observable
        this.firstObsSubscription = customObservable.pipe(map(
        (data: number) => {
            //customize the data format which you needed.
            return 'Round ' + (data + 1);
        }));.subscribe( data => {
            console.log(data);
        }, error => {
            console.log(error);
        }, ()=> {
            console.log('Counter completed!');
        });
    using filter
        since pipe() will take long list of operator, we can send filter a 1nd argument and map() 2nd.
        filter( data => {
            return data > 0;// it will return boolean based on condition, based on this next method execution takes place.
        })

    Subject(Dont use EventEmitter use Subject)
    *****************************************
    we can create/show something in other component when we click button.
        This is used achieve by using EventEmitter.
        inside EventEmitter we used to emit using function emit()
        ex : inside app component
                <p *ngIf="userActivated"> Activate</p>
                ngOnInit() {
                    this.userService.activatedEmitter.subscribe(didActivated => {
                    this.userActivated = didActivated;
                    })
                }
            inside user compo
                <button class="btn btn-primary" (click)="onActivate()">Active</button>
                onActivate() {
                    this.userService.activatedEmitter.emit(true);
                }
            create one service to emit event
                import { EventEmitter, Injectable } from "@angular/core";

                @Injectable({
                    providedIn: 'root' //This is the new way of declaring service inside app.module.ts providedIn[]
                })
                export class UserService {
                    activatedEmitter = new EventEmitter<boolean>();
                }

    But now we achieve that by using Subject.
        create Subject inside user service
             activatedEmitter = new Subject<boolean>();
        call that Subject from user compo ts using 'next()'
            onActivate() {
                this.userService.activatedEmitter.next(true);
            }

        but in Subject we make use of function next()
        In observables we used to call next() inside subscription function only.
        but next() of Subject we can call even from outside function.
    just like our own observables we need to unsubscribe Subject also.
    Subject is only recommended while you are listening to 'cross component' events
        *To listen to event in same component i.e using @Output() we again need to use EventEmitter instead of Subject.

    https://rxjs.dev/guide/overview

Section 14: Course Project - Observables
****************************************
    
Section 15: Handling Forms in Angular App 
*****************************************
    form is something which we used to submit to server with action or method, but here since Angular is SPA there
        no submitting to server instead we will need to handle the form through Angular.
        and the if you want to submit to server, we need to reach out via Angular Https service.

    Why do we need Angular in Forms
    -------------------------------
    normal HTML form  -> Angular givers us JS object representation of form making it simple for us to retrieve user values.
                        to see the state of form and to work with it.
                        Also it will store some meta data of form.

    JS Object representation of a FORM
    Normal HTML form
    <form>
        <label>Name</label>
        <input type="text" name="name"> 
        <label>mail</label>
        <input type="mail" name="mail">
    </form>

    Angular provide create JS object for us including some meta data
    {
        value: {
            name: 'imam',
            mail: 'test@gmail.com'
        }
        //other meta data
        valid: true,
        controls: {}
    }

    2 ways handling HTML form

    Template Driven(TD) Forms and Reactive Forms
    ********************************************
    Template Driven(TD)
    -------------------
        Here we simply setup the form in template, Angular will automatically infer the Form Object from the DOM.

    Reactive/Complex approach
    -------------------------
        Here we actually define the structure of our form i.e form is created Programmatically manually connect with HTML
            and the it will synchronized with DOM.
        Here we can fine tune each and every little piece of our form.

    TD: creating forms and registering controls
    ---------------------------------------
        no action='' and method attributes on form since we dont want to submit form as soon as user clicks on submit instead angular should handle this form.
        here <form> element is serving as a selector for some Angular directive. The create such a JS representation Object for us.
        Right now its empty, still we need to register our control manually since we really dont want to some of unwanted controls to be registered automatically. 3rd party input fields and all.
        se we need to register controls manually and tell the angular.

        
            1.add 'ngModel' to required controls - it will tell angular hey this is my form control filed.
            2.import FormsModule inside imports:[] - to make angular recognize ngModel.
            3.need to provide controls name using name Attribute.
            ex
            <input
                type="text"
                id="username"
                class="form-control"
                ngModel
                name="username"//not an angular specific, but this control will be registered under 'username' variable js object.
            >

    TD: submitting and using Form
    -----------------------------
        place event listener (ngSubmit)  = "onSubmit()"
            to get access to submitted form, we need to access passing local reference to onSubmit(f) method.
            the local reference name should be start with '#' i.e #f
        To retrieve
            accept form: HTMLFormElement in onSubmit() method and log it.
            here we will not JS object instead the forms HTML DOM will logged into console.
        But to retrieve form data in JS object form, we need to inform Angular hey please convert this form HTML DOM object to JS and provide the object inside this ref.
        set local ref equal to ngFrom which will inform angular treat the form an template driven and me access to that form object created by you(angular) automatically.
            #f="ngForm" -> ngForm take care of above task.
            now the from is of type 'ngForm' i.e onSubmit(form: NgForm){}

    Refering form using @ViewChild()
    ------------------------------
    instead fo refering form local ref in template, we can do it from ts also by storing that local ref in other variable.
    @ViewChild() helps to create a local reference for from in ts.
        @ViewChild('f') signupForm: NgForm;// i want to get access to the element which has a local reference 'f' on it in my local variable signupForm..
        onSubmit() {
            console.log(this.signupForm);
        }
    *This will be best way?
        bcz we can access the form data not just when you submit it, but also earlier.

    Validations/state management
    ----------------------------
        we need to validate user input before sending garbage values to server.
        required - is default HTML validator for element.
        email - Angular directive made available for validate email.
    The local ref for individual control can be created using #ngModel like the one for form as ngForm
    ex: #email = #ngModel

        Built-in Validators & Using HTML5 Validation
        --------------------------------------------
            Which Validators do ship with Angular? 

            Check out the Validators class: https://angular.io/api/forms/Validators - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).

            For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: https://angular.io/api?type=directive - everything marked with "D" is a directive and can be added to your template.

            Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the ngNativeValidate  to a control in your template.

    TD: Using the Form State
    -----------------------
    taking advantage of form state
    1.<button [disable]="!f.valid'></button>
    2.making use of dynamic css classes added by angular such ng-value, ng-touched for validation purpose
        input.ng-valid.ng-touched {
            border: solid red 1px;
        }

    TD: Outputting Validation Error Messages
    ----------------------------------------
        <input 
            id="email"
            class="form-control"
            ngModel
            name="email"
            #email="ngModel"//just like we #f="ngForm" did for whole form to get access to control we need to give "ngModel"
            >
        Form directive gets added when it detect angular element ngForm. lly form control will gets added when it detect ngModel directive. ngModel will expose some of the additional information about control it created for us.
        <span
            class="help-block"
            //make use of local ngModel ref to get access to form control meta data
            *ngIf="!email.valid $$ email.touched"
            > Please enter valid email
        </span>

    TD: Setting Default value using ngModel property
    -------------------------------------------------
    ngModel with one way binding
        make ngModel to [ngModel]="variable which had default value'
        we make use of 'property binding' to do this.
        ex  defaultValue = 'pet';
            [ngModel]= 'defaultValue'
    ngModel with two way data binding
        sometimes we should not want to only pre populate default value and also want to react to any changes.
        <div class="form-group">
          <textarea class="form-control" name="questionAnswer"
            rows="3"
            [(ngModel)] = 'answer'>
          </textarea>

          <p>Your reply {{answer}}</p>
        </div>

        answer = '';

    conclusions
        no binding - ngModel- to tell angular that input is a a control
        one way binding - [ngModel] - to give that control a default value
        two way binding - [(ngnModel)] - to instantly output it or do whatever you want to do with that value.

    TD - Grouping Form controls
    ---------------------------
        creating object by grouping related control fields.
        We can fine tune our validation only on those fields, since that object also had own validations.
    create grouping
        ngModelGroup = "variable name"
    creating local reference so that we can local we can get access to that JS object.
        #userData = "ngModelGroup"
    ex
        <form ngSubmit="onSubmit()" #f="ngForm>
            <div 
                ngModelGroup="userData"
                #userData = "ngModelGroup"
                >
                //controls
            </div>
        </form>

        <p *ngIf="!userData.valid && userData.touched>User Data group is not valid</p>

    TD - Handling Radio buttons
    ---------------------------
    <div class="radio" *ngFor="let gender of genders">
          <label>
            <input 
              type="radio"
              name="gender"
              ngModel
              [value]="gender"
              >
              {{gender}}
          </label>
        </div>
    gender = ['male','female']

    setting and patching form value
    -------------------------------
    setValue() - to set/override whole frm
        this.signupForm.setValue({
            userData: {
                username : suggestedName,
                email: ''
            },
            secrete : 'pet',
            questionAnswer: '',
            gender: 'male'
        })
    It has one disadvantage - i.e while updating in middle if click on that suggest button it will override all the values.
    Not necessary good approach

    patchValue() - To override part/patch of the form.
        here we can override certain necessary data.
        this.signupForm.form.patchValue({
            userData: {
                username : suggestedName
            }
        })


    reset form
    -----------
    call reset() on form
        it not only reset form control data
        it also reset the state of form i.e touched, valid.
        this.signupForm.reset();//its really like page was loaded again without refreshing, nice!

    Reactive form 
    -------------
    Reactive: Setup
    ---------------
    In this approach the form is created 'programmatically' and synchronized with DOM.
    ->create form of type FormGroup ex: signupForm: FormGroup;
    ->to connect our reactive form to HTML we need to import ReactiveFormModule in app.module.ts manually from "@angular/forms
    ->import ReactiveFormsModule in imports[] of app.component

    Reactive: Creating a Form in Code
    ---------------------------------
    ->initialize form before rendering inside ngOnInit()
        ngOnInit() {
            this.signupFrom = new FormGroup({
            'username': new FormControl(null),
            'email': new FormControl(null),
            'gender': new FormControl("male"),
            });
        }
        FormControl(init state, [validators], [async validators])
   *The brackets, [], cause Angular to evaluate the right-hand side of the assignment as a dynamic expression. Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.

   Reactive: Syncing HTML and Form
   -------------------------------
    Now we some how need to synchronize this form with HTML form, since right now angular doesn't know which of out TS control are related to which input codein our template code.
    ->[FormGroup] - hey angular please take my own created form, dont create one, dont take other.
        we need to bind our TS from to HTML template using property binding.
        <form [formGroup]="signupFrom">
            now the form in synchronized with TS from, but still we need to tell angular which ts 'control' should be connect to which 'input' in template code.
        To do this we get another directive i.e 'FormControlName'{it ll tell hey this is name of control in my TS code}

    Submitting reactive form
    ------------------------
        <form 
            [formGroup]="signupForm"
            (ngSubmit)="onSubmit()"
        >
        The diff with TD is that we dont need to get the form via that local reference
    

    Reactive: Adding Validation
    ---------------------------
    we are not creating form in template driven, so 'required' wont work in template.
        userData: new FormGroup(//angular will automatically detect when input changes and call Validator function.
            'username': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
        }),

    Reactive: Getting Access to Controls
    ------------------------------------
        <span *ngIf="signupFor.get('username').valid && signupForm.get('username').touched">Enter valid user name</span>

    Reactive: Grouping Controls
    ---------------------------
        formGroupName - directive to tell angular this is FormGroup inside FromGroup.
        wrap control input div inside new form control div and provide the name.
            <div formGroupName='userData'>
            </div>
        provide the relative path  
            *ngIf="!signupForm.get('userData.username').valid

    Reactive: Arrays of Form Controls (FormArray)
    ---------------------------------------------
    Fixing a Bug
        In the next lecture, we'll add some code to access the controls of our form array:

        *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"

        This code will fail as of the latest Angular version.

        You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):

        getControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
        }
        In the template, you can then use:

        *ngFor="let hobbyControl of getControls(); let i = index"

        Alternatively, you can set up a getter and use an alternative type casting syntax:

        get controls() {
        return (this.signupForm.get('hobbies') as FormArray).controls;
        }
        and then in the template:

        *ngFor="let hobbyControl of controls; let i = index"

        This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).


    When the control are gets added dynamically
        1.declare FormArray with empty data inside signupForm
            'hobbies': new FormArray([])
        2.inform angular about created FormArray control in template
            <div
                formArrayName='hobbies'  
                >
        3.call addHobby method and iterate over hobbies and display FormControlName using index
            <div
                formArrayName='hobbies'  
                >
                <h4>Your Hobbies</h4>
                <button 
                    class="btn btn-default"
                    type="button"
                    (click)="onAddHobby()"
                    >
                    Add Hobby
                </button>
                <div 
                    class="form-group"
                    *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"
                    >
                    <input 
                        type="text"
                        class="form-control"
                        [formControlName]='i'
                    >
                </div>
            </div>
        4.access the FormArray control object and push the user entered hobbies into it.
            onAddHobby() {
                const control = new FormControl(null, Validators.required);
                (<FormArray>this.signupForm.get('hobbies')).push(control);
            }

    Reactive: Creating Custom Validators
    -------------------------------------
        validator is just function, in the angular ll call that function automatically to test vulnerability of input.
        syntax
            validatorFun(control:FormControl)
            validator should return javascript object, it should have any 'key' represented as a string, 'value' of type boolean ex {forbName: true}
            {[s: string]: boolean}
        validatorFun(control:FormControl):{[s: string]: boolean} {
            ...
        }

        ex:
        1.define function
        forbiddenNames(control: FormControl): {[s: string]: boolean} {
            if(this.forbiddenUserNames.indexOf(control.value)) {
                    return {'error code : name can be used': true};
                    }
                    else return null;//you need to return 'null' or nothing, never return 'false' thats how it wil work.
                }
        2.call function from validator array
            dont execute it, just put reference i..e this.forbiddenNames
        3.need to bind, since javascript 'this' is undefined outside of class so, angular is calling this function so it will give error.
            solution
            this.forbiddenNames.bind(this)
        4. -1 ll be considered as true
            need to check not equal condition
            if(this.forbiddenUserNames.indexOf(control.value) !== -1)
    
    Reactive: Using Error Codes
    ---------------------------
        angular will add error codes->on the individual controls->on the errors object

        so we can take advantage of this by making use of it inside 'html' more relevant errors messages
            <span 
                *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">
                This name is invalid!
            </span>
            <span 
                *ngIf="signupForm.get('userData.username').errors['required']">
                This name is required!
            </span>
    
    Reactive: Creating a Custom Async Validator
    --------------------------------------------
    typically if we want check the username is invalid, we need to reach out to server i.e using async validators since it ll take couple of sec.
    1.listen to promise/ here create a promise
        forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
            const promise = new Promise<any>((resolve, reject) =>{
            setTimeout(()=> {
                if(control.value === 'test@test.com') {
                resolve({'emailIsForbidden':true});
                } else{
                resolve(null);
                }
            },1500);
            });
            return promise;
        }
    2.Dont execute it simply pass the reference inside async validator(3rd argument) array
        this.forbiddenEmails

    now closely watch the input field, it will change ng-invalid -> ng-pending -> ng-valid/invalid depending the promise value.

    Reactive: Reacting to Status or Value Changes
    ---------------------------------------------
        The form state actually we can track using status and value changes subscribers, we need to listen to them.
        For every key stroke it will send an updated object with changed value.
            this.signupForm.valueChanges.subscribe((value)=> {
                console.log(value);
            })
        statusChanges will give you, status of over all form, so that we analyze and react to it
            this.signupForm.statusChanges.subscribe((status)=> {
                console.log(status);
            })

    Reactive: Setting and Patching Values
    -------------------------------------
        setValue({}) will set the pre populated values
            this.signupForm.setValue({
                'userData': {
                    'username':'imam',
                    'email':'imamhulagur@gmail.com'
                },
                'gender':'male',
                'hobbies':[]
            })

        patchValue - updates part of form
            this.signupForm.patchValue({
                'userData': {
                    'username':'patchedImam'
                }
            })

    Reactive: reset
    ---------------
        this.signupForm.reset()

    creating your own validator class in diff fields
    ------------------------------------------------
    look at assignment solution video

Section 16: Course Project - Forms
**********************************
    TD - shopping list form - implemented

    Reactive - recipe edit form - struck

Section 17: Using Pipes to Transform Output
******************************************
    Using Pipes
    -----------
    Pipes used for transforming output data in template
        ex  | uppercase, | date

    Parameterized Pipes
    -------------------
        By adding : in front of pipe with 'string' parameter, if there are multiple then separate each by :
        ex  date: 'fullDate' -> is should be on camelCase
    apply multiple pipes on same content
        order of execution is L->R

    Creating Custom pipe
    ---------------------
    Dont use methods or functions in template bcz they were called for every change detection, instead use pipes they only called when only when input value changes
        1.create ts file with appropriate pipe name ex  shorten.pipe.ts
            > ng g pipe /location/pipeName
        2.we need to implements interface PipeTransform
            export class ShortenPipe implements PipeTransform {
            }
        3.need to also implement transform(){} method.
            @Pipe({
                name: 'shorten'
            })
            transform(value: any) {
                return value.substr(0, 10)+'...';//build in JS method which return sub string with first 10 character.
            }
        4.just like we did for other components/directives, here also we need to inform angular about our newly created custom pipe by declaring it inside declaration: []
        5.make use of it in template 
           something | shorten

    parameterized custom pipe
    --------------------------
    something | shorten: 5
        transform(value: any, limit: number) {
            if(something.length > limit) {
                    return something.substr(0, 10)+'...';//build in JS method which return sub string with first 10 character.
            }
            else {
                return something;//return unchanged value
            }
        }

    creating filter pipe
    --------------------
    generate pipe using cli
    >ng generate pipe pipeName or ng g p pipeName
    filter pipe demo
            transform(value: any, filterString: string, propName: string): any {
            if(value.length === 0) {
                return value;
            } 
            const resultArray=[];
            for(const item of value) {
                if(item[propName] === filterString || filterString === '') {
                    resultArray.push(item);
                }
            }
            return resultArray;
        }
    <input type="text" [(ngModel)]="filteredStatus">

    *ngFor="let server of servers | filter:filteredStatus:'status'"

    pure and impure pipe
    --------------------
        Thankfully Angular will not rerun our pipe, whenever this data changes.To be precise Updating arrays or objects does not trigger it.
            So adding the input or changing the input of pipe will trigger a recalculation,really will trigger the pipe being applied to the data again but 'changing data wont trigger this'
        Thats good otherwise angular wold have to run this pipe or rerun pipe whenever any data on the page changes. This would be really bad  and it will cause lot of performance issue.
    But angular also provide the option to force pipe to run or rerun or recalculated whenever data changes on page.
    this would be achieved by pure : false by default it is set to true.
    ex:
        @Pipe({
            name: 'filter',
            pure: false
        })
    Note:  This recalculated not only when pipe value changes, anything changes also.

    Understanding the "async" Pipe
    ------------------------------
    if we have a server status coming from server
        appStatus = new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve('stable');
            }, 2000)
        });
    <h2>App Status: {{appStatus}}</h2>

    This will give [object promise] - yes it is, because it will get converts into string after 2 sec, but dont know that so it will return promise object itself.

    To over come this, angular provides an pipe 'async' to to tell that we are waiting for the status which is asynchronous.
    <h2>App Status: {{appStatus | async}}</h2>

Making http Requests
********************
    Till now whatever data we worked with is not persisted the browser only data(we store the data somewhere in the browser memory), once we refresh or restart the data is gone.

    Can we hide JS? No...! but we so have mechanism to hide/restrict api keys.
        https://academind.com/tutorials/hide-javascript-code/

    How Does Angular Interact With Backend?
    ---------------------------------------

    Angular(data access/file upload/ analytics)
        |
        |send/receive HTTP request
        |
    API(REST, GraphQL)<----------------------->DB(SQL/Mongo DB)

    Anatomy of Http Request
    -----------------------
        Http Verb => POST, GET,PUT,..
        URL(API end point) => /post/1
        Headers(Meta data) => {"Content-Type":"application/json"}
        Body(POST, PUT, PATCH) => { title: "New Post" }

    Backend Firebase setup(Complete backend solution - more than MongoDB)
    ---------------------------------------------------------------------
        it provide free backend REST apis
        also act like DB
        steps
        1.create new project
        2.here we will use 'real time database'
            build->create database->start in test mode->enable
            https://ng-complete-guide-imam-default-rtdb.firebaseio.com/

    sending POST request
    --------------------
        1.add new 'HttpClientModule' inside app,module.ts imports[]
        2.inject module service in constructor ->private http: HttpClient
        3. this.https.post('url', body)
            since even in firebase we are not directly talking DB, we are talking to Rest api exposed by firebase
                for this anything after main end point, the fire make it folder structure, also we need to put '.json. at the end of url. This is firebase requirement.
            Usually we need to convert out JS data into JSon data and the expose, but The angular HttpClient will automatically convert our JS data into JSON. So no need of using JSon.parse(postData)
            Note : Angular heavily used 'observables' as we know, similarly the http request also managed by observables because they are perfect useCase for observables. We can wrap them and subscribe to them to get know the response also we can handle errors.

            Here in our case Angular is smart if we are not subscribing to that prepared http request to the observable that wraps out http request, then Angular and RxJS know that 'no one is interested in the response' Therefore the request does not even get sent.

            post indeed will return an observable, it does not give data as a value instead it will return an observable that wraps our request.

            To get access to that response we need to call .subscribe()

            this.https.post('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json', postData)
                .subscribe(responseData => {
                console.log(responseData);
            });
            the unsubscription will be handled by angular automatically.

            The browser will send 2 request to the end point
            one  - OPTIONS 
                To check whether the post https request is allowed to send or not.If it got success(200) response.
            second - POST
                data gets sent sent with automated headers meta data.
                name: "-MTP2HJ16EtzwC4oRROi"
                go to network tab to observe request

        1.OPTIONS request
        ----------------
        Request Headers
            OPTIONS /post.json HTTP/1.1
            Host: ng-complete-guide-imam-default-rtdb.firebaseio.com
            Connection: keep-alive
            Accept: */*
            Access-Control-Request-Method: POST
            Access-Control-Request-Headers: content-type
            Origin: http://localhost:4200
            User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36
            Sec-Fetch-Mode: cors
            Sec-Fetch-Site: cross-site
            Sec-Fetch-Dest: empty
            Referer: http://localhost:4200/
            Accept-Encoding: gzip, deflate, br
            Accept-Language: en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7,kn;q=0.6

        Response Headers(view source)
            OPTIONS /post.json HTTP/1.1
            Host: ng-complete-guide-imam-default-rtdb.firebaseio.com
            Connection: keep-alive
            Accept: */*
            Access-Control-Request-Method: POST
            Access-Control-Request-Headers: content-type
            Origin: http://localhost:4200
            User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36
            Sec-Fetch-Mode: cors
            Sec-Fetch-Site: cross-site
            Sec-Fetch-Dest: empty
            Referer: http://localhost:4200/
            Accept-Encoding: gzip, deflate, br
            Accept-Language: en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7,kn;q=0.6

        2.POST request
        --------------
        Headers
            Response Headers
                Access-Control-Allow-Origin: http://localhost:4200
                Cache-Control: no-cache
                Connection: keep-alive
                Content-Length: 31
                Content-Type: application/json; charset=utf-8
                Date: Sat, 13 Feb 2021 06:21:28 GMT
                Server: nginx
                Strict-Transport-Security: max-age=31556926; includeSubDomains; preload

            Request Headers
                POST /post.json HTTP/1.1
                Host: ng-complete-guide-imam-default-rtdb.firebaseio.com
                Connection: keep-alive
                Content-Length: 47
                sec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"
                Accept: application/json, text/plain, */*
                sec-ch-ua-mobile: ?0
                User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36
                Content-Type: application/json
                Origin: http://localhost:4200
                Sec-Fetch-Site: cross-site
                Sec-Fetch-Mode: cors
                Sec-Fetch-Dest: empty
                Referer: http://localhost:4200/
                Accept-Encoding: gzip, deflate, br
                Accept-Language: en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7,kn;q=0.6

                Request Payload
                {"title":"test title","content":"test content"}

        Response
            {"name":"-MTP2HJ16EtzwC4oRROi"}

    In conclusion - >The request are sent only when you subscribe to them!!!

    Your data will be available in firebase 
    project name->end point folder->encrypted key folder->key:value

    Sending get request
    -------------------
        this.https.get('url')
        here also you need to subscribe i.e no subscription no request!!
        create private method to get
        call is from required function
        also from init() because it should send request asap then page load.

        The data which are got back as json object as follows
        -MTP2HJ16EtzwC4oRROi: {
            content: "posted content"
            title: "posted title"
        }   
        we can store data and loop though it. To do that we need to transform the JS Object to array using 'Observable operators'

    Using RxJS operators to transform Response Data
    -----------------------------------------------
        we will transform data before .subscribe()
        we user pipe() RxJS operator-> this allow us to transform our observable data through multiple operator before they reach to .subscribe() method.
        map()->it allows us to get some data and re-return new data which is then automatically rewrapped into an observable so that we can subscribe to it.
        import it manually
        import { map } from 'rxjs/operators';
    converge JS Object into array
        .pipe(
            map(responseData => {
                const postsArray = [];
                //to cover JS object to new Array we need to loop through array
                for(const key in responseData) {
                    if(responseData.hasOwnProperty(key)) {
                        postsArray.push({...responseData[key], id: key});
                    }
                }
                return postsArray;
            })
        )
        before transformation
        {
            -MTP2HJ16EtzwC4oRROi:{
                content: "posted content"
                title: "posted title"
            }                
        }
        After transformation
        [
            {
                content: "posted content"
                id: "-MTP2HJ16EtzwC4oRROi"
                title: "posted title"
            }
        ]
        
    Using Types with https client
    -----------------------------
    currently our angular is not detecting the type of data, u can just hover over 'posts' it it will give you type <any>. Thats should not be case. To over some this..

    create Post model
    post.model.ts
        export interface Post { 
            title: string; 
            content: string;
            id?: string;//?:-> this is optional, we will get dynamically at run time.
        }  
        //replace object with of type Post
        onCreatePost(postData: Post)

        map( responseData: {[key: string]: Post}) => {}
        here key will hold the data of type Post

        set out postsArray type Post
         const postsArray: Post[] = [];

         Now it is well formatted code, we can get suggestion of prop when we try to access them.

         However angular Http Client will give us good way to assigning type. we dont need to do this on map or somewhere, instead .get() so called generic method<> i.e inside that we can store the type which this response will actually return as a body.
            .get<{[key: string]: Post}>
            this.https.post<{name: string}>
        To avoid unwanted Typescript errors!

    outputting posts
    ----------------
        assign posts to loadedPosts[]
            .subscribe(posts=> {
                //console.log(posts);
                this.loadedPosts = posts;
            });

        loop through based o condition and display
        <div class="row">
            <div class="col-xs-12 col-md-6 col-md-offset-3">
                <p *ngIf="loadedPosts.length < 1">No posts available!</p>
                <ul class="list-group" *ngIf="loadedPosts.length >= 1">
                    <li class="list-group-item" *ngFor="let post of loadedPosts">
                        <h3>{{post.title}}</h3>
                        <p>{{post.content}}</p>
                    </li>
                </ul>
            </div>
        </div>

    showing loading indicator
    -------------------------
    1.declare flag
         isFetching = false;
    2.before sending fetch request, make it true.
        private fetchPosts() {
            this.isFetching = true;
            ...
        }
    3.once fetching done, again make it false
        .subscribe(posts=> {
            this.isFetching = false;
        }

    1.check for isFetching flag and show appropriate message.
        <div class="row">
            <div class="col-xs-12 col-md-6 col-md-offset-3">
                <p 
                    *ngIf="loadedPosts.length < 1
                    && !isFetching"
                    >No posts available!</p>
                <ul 
                    class="list-group" 
                    *ngIf="loadedPosts.length >= 1
                    && !isFetching"
                    >
                    <li class="list-group-item" *ngFor="let post of loadedPosts">
                    <h3>{{post.title}}</h3>
                    <p>{{post.content}}</p>
                    </li>
                </ul>
                <p *ngIf="isFetching">Loading...</p>
            </div>
        </div>

    Using a service for http request - data transformation job
    -----------------------------------------------------------
        If our application grows bigger and bigger, its good practice to outsource that into services instead of complicating template by creating isFetching!
        
        Services are the parts of angular application that do the heavy uplifting and dirty work and our template component are relatively lean.

        1.we wil create service for posts now
        posts.service.ts - we have moved heavy uplifting code inside this.
            import { HttpClient } from "@angular/common/http";
            import { Injectable } from "@angular/core";
            import { Post } from "./post.model";
            import { map } from 'rxjs/operators'


            @Injectable({
                providedIn: 'root'//modern approach, instead of declaring inside provider[] in app.module.ts 
            })
            export class PostsServices {
                //in this service i will have my HTTP request methods and i only want get the responses/messages whether we are done with request or not in front end.
                constructor(private http: HttpClient) {}
                createAndStorePost(title: string, content: string) {
                    const postData: Post = {title: title, content: content};
                    this.http.post<{name: string}>('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json', postData)
                    .subscribe(responseData => {
                    console.log(responseData);
                    });
                }

                fetchPosts() {
                    return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json')
                    .pipe(
                        map((responseData) => {
                            const postsArray: Post[] = [];
                            //to cover JS object to new Array we need to loop through array
                            for(const key in responseData) {
                                if(responseData.hasOwnProperty(key)) {
                                    postsArray.push({...responseData[key], id: key});
                                }
                            }
                            return postsArray;
                        })
                    )
                    // .subscribe(posts=> {
                    // });
                }
            }
        2.implement same functionality inside service, call these methods by injecting service.
    
    services and components working together
    ----------------------------------------
    because we lost the connection here, hence did not get any data.
    2 possible way are there to fix this
        1.using Subject, next() - good for complex scenarios.
        2.since here we have simple
            we will not subscribe the observable inside service instead i will return this prepared observable in service and we will subscribe it inside component(only subscription).
        In component we only subscribe to that returned observable from posts.service.ts
            onFetchPosts() {
                // Send Http request
                //this.fetchPosts();
                this.isFetching = true;//before sending request
                this.postsService.fetchPosts().subscribe(posts=> {
                    this.isFetching = false;//after done with request
                    this.loadedPosts=posts;//store the posts into loadedPosts
                });
            }
    
    sending delete request
    ----------------------
    1.create functionality delete inside postsService and return the observable
         deletePosts() {
            return this.http.delete('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json');
        }
    2.subscribe to observable in app component and make loadedPost [] empty
        onClearPosts() {
            // Send Http request
            this.postsService.deletePosts().subscribe(()=>{
            //i dont really care about the response/fag here
            this.loadedPosts = [];//make all the loaded posts array empty
            })
        }

    Handling errors
    --------------
    If we go and and change the rules in firebase, if we make 'read' access 'false'
        {
            "rules": {
                ".read": "false",  // 2021-3-15
                ".write": "now < 1615746600000",  // 2021-3-15
            }
        }
    first way
    ----------
        we will get unauthorized(401) error - loading..
        thats not good user experience, so we need to handle it and gave proper error message to user.

        here Observable, 2nd argument is for error handling.
        1.create flag error
            error = null;
        2.listen to error function inside observable
            error => {
                this.error = error.message;
                console.log(error);
            });
        3.check flag and display error in template
            <p *ngIf="isFetching && !error">Loading...</p>
            <div class="alert alert-danger" *ngIf="error">
                <h3>
                    An Error occurred
                    <p>{{ error }}</p>
                </h3>
            </div>

    second way - handing errors using Subjects/Subject based forwarding of errors
    -----------------------------------------------------------------------------
        This is helpful when your error message should useful in multiple components

        Here in our care we have subscribed and handles error inside postsService but we wanted display error message in app.component.ts, so in this scenario we need to return our error message using Subject and subscribe it in app.component

        1.create Subject of type string
            errorMessage = new Subject<string>();
        2.get the error message and expose error message who all listening using next function in 2nd argument of Observable.
            ..., error=> {
                this.errorMessage.next(error.error);
                console.log(error);
            }
        3.now listen inside app.component.ts and display it. mean that we can subscribe to that Subject in whichever component we are interested to show that particular error message.
            this.postsService.errorMessage.subscribe(errorMessage=> {
                this.error = errorMessage;
            })

        4.unsubscribe errorSubscription
            declare subscription variable
                private errorSubs: Subscription;
            save subscription in that variable inside onInIt()
                this.errorSubs = this.postsService.errorMessage.subscribe(errorMessage=> {
                    this.error = errorMessage;
                })
            unsubscribe inside ngOnDestroy()
                ngOnDestroy() {
                    this.errorSubs.unsubscribe();
                }

    using catchError and throwError operator from rxjs
    --------------------------------------------------
    send to analytics service to keep track of  front end logs, to do behind the scenes when a error occurred
        import catchError operator -> rxjs/Operators
                throwError observable -> rxjs

        catchError(errorRes => {
                //send to analytics service to keep track of  front end logs, to do behind the scenes when a error occurred
                return throwError(errorRes);
            })

    Error Handling and UX
    --------------------
    user to get rid of that error message
        once we get an error make isFetching = false;
        in handler fun
            error=null;
    ex  <button 
            class="btn btn-danger" 
            (click)="onHandleError()"
            >Ok</button>

        onHandleError() {
            this.error = null;
        }

        error => {
        this.isFetching = false;//added
        this.error = error.message;
      }

    setting Headers
    ---------------
    In case of any http request, last argument where we can configure the required headers object with key:value pairs.

    import HttpHeaders and create headers object
        this.http.get<{[key: string]: Post}>('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json', {
            headers:new HttpHeaders({
                'Custom-Header': 'Hello'
            })
        })
    
    Adding queryParams
    ------------------
    import HttpParams, provide value to 'params'
        {
            headers:new HttpHeaders({
                'Custom-Header': 'Hello'
            }),
            params:new HttpParams().set('print', 'pretty')
        }
    o/p -> https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json?print=pretty

    alternatively if there are multiple queryParams we can append them into single variable and pass assign it to params

    let searchParams = new HttpParams();
    searchParams = searchParams.append('pretty', 'print');
    searchParams = searchParams.append('test', 'temp');
    
    {
        headers:new HttpHeaders({
            'Custom-Header': 'Hello'
        }),
        params: searchParams
    }
    
    
    o/p->https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json?pretty=print&test=temp

    note-> we can also do it directly in url concatenation


    Observing diff types of responses
    ---------------------------------
    When we not only interested in response data, also we need full response object to check status etc
    this can be done 2 ways by observing

    first way to observe response
    ----------------------------
        by adding extra argument object inside post request, and set various value like 'body', 'response', 'events' to observe property.
        this.http.post({...},
            {
                observe: 'response'
            }
        )
        
    Now we will have access to full(both headers, body etc) response object.
        body: {name: "-MTQnAlj4GPurXpizF1X"}
        headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
        ok: true
        status: 200
        statusText: "OK"
        type: 4
        url: "https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json"
    
    now we wil listen to events
    this.http.delete({

        }, {
            observe: 'events'
        }
    )
    
    //here to console our data inside delete function we wil make use of tap operator

    .pipe(tap()) -> tap operator from rxjs operators will just allow us to execute some code without altering the response, so that we can do something with the response but not disturb/interrupt our subscribe function and the function we passed.

    post(..)
    .pipe(tap(event=> {
            console.log(event);
        }));

    If we listen to 'events' using 'observe' we will see two o/p now.

    1.type object
    2.full response object

    *use -> we can inform user in UI like the request was sent, waiting for response...by comparing event type with HttpEventType enum need to import it from http.

    this.http.delete(...)
    .pipe(tap(event=> {
            console.log(event);
            if(event.type === HttpEventType.Response) {
                console.log('request sent, waiting for response...')
            }
            if(event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));

    Note: just for the shake of fine gain control!!!


    Changing the response Body type
    -------------------------------
    It will be helpful in the scenario where you we actually want text response but you are getting json.
    we can also change response body type to 'json', 'text', 'blob' etc.
    before-> {
                observe: 'events',
                responseType: 'json'
            }
        Body : something <-in json
    now->{
                observe: 'events',
                responseType: 'text'
            }
        Body: "something" <-in text i.e its wrap it as string


    Interceptors
    ------------
    When we dont wanna manually configure headers for every req/response tedious, for that we need interceptor.
    Interceptors can perform a variety of implicit tasks from authentication to logging, in a routine, standard way for every HTTP request/response,
    without Interceptors developer would have to implement these tasks explicitly for 'each HttpClient method calls'

    create interceptor
        >auth-interceptor.service.ts

    declare class, and implement 'HttpInterceptor' from http module.
        export class AuthInterceptorService implements HttpInterceptor
    this will forces us to implement one method 'intercept()' which accept two arguments namely HttpRequest and HttpHandler.
        intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');//right before request sent/leaves
        return next.handle(req);//this will let request to continue its journey.
    }

    Provide this interceptor service 'JS object' in providers[] of app.module.ts
        1.it will take 3 keys
            provider: HTTP_INTERCEPTOR->with this angular will get know whatever module we are providing they are the type of interceptor
            useClass->the service class which you want to add as an interceptor
            multi:true->inform angular we have multiple interceptor so dont replace the existing interceptors.
                {
                    provide: HTTP_INTERCEPTORS, 
                    useClass: AuthInterceptorService, 
                    multi: true
                }
    inConclusion:- interceptor will help with code which runs for every http method(we can also control to which url the request need to be sent, we can restrict unwanted url here)

    manipulating request object
    ---------------------------
    inside an interceptor we can not only log data, we can also modify request object.
    However the request object itself a immutable(cant be changed) i.e we cant override and send a request to new url. newReq = req.ulr('newUrl')
    instead we can modify the whole request itself and send it to other url. using req.clone()
        const modifiedRequest = req.clone(
               {
                    'url', 'newUrl',
                    'headers', req.headers.append(k:'v'),
                    'params', 'custom-params'
               }
        )

    now forward the new request inside handle() instead of old one.
         const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })
        return next.handle(modifiedRequest);

    for every http method it will add header 'Auth':'xyz'

    Response interceptors
    ---------------------
    we can even manipulate(we dont do it usually)/display(do it regularly) response by using operators on handle()
        return next.handle(modifiedRequest).pipe(tap(
            event=>{
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log('response arrived, body data: ', event.body);
                }
            }
        ));

    multiple interceptor
    --------------------
    simple repeat the same object, but order does matter here. the order of execution will be first to last.
    create one more interceptor for logging as logging-interceptor.service.ts

    providers: [
        {
            provide: HTTPS_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: HTTPS_INTERCEPTORS,
            useClass: LoggingInterceptorService,
            multi: true
        }
    ]

    first auth-interceptor will run and add the headers
        import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType} from '@angular/common/http';

        export class AuthInterceptorService implements HttpInterceptor {
            intercept(req: HttpRequest<any>, next: HttpHandler) {
                console.log('first this interceptor will run');
                const modifiedRequest = req.clone({
                    headers: req.headers.append('Auth', 'xyz')
                })
                return next.handle(modifiedRequest);
                
            }
        }

    second logging-interceptor will run and print response body
        export class LoggingInterceptorService implements HttpInterceptor {
            intercept(req: HttpRequest<any>, next: HttpHandler) {
                console.log('second this interceptor will run');
                console.log('out going request to url: ');
                console.log(req.url);
                console.log(req.headers);
                return next.handle(req).pipe(tap(
                    event=>{
                        if(event.type === HttpEventType.Response){
                            console.log('incoming response: {event.body}');
                        }
                    }
                ));
            }
        }
    Official Docs: https://angular.io/guide/http


Section 19: Course Project - Http
*********************************


Authentication & Route Protection in Angular
*********************************************
    How Authentication Works in Angular
    ----------------------------------
    since js is exposed in browser we cant store auth data and send back server. 
                                stores web tokens
                            CLIENT----------------->LOCAL STORAGE
                            | |                      |
        send auth data      | |                      |
                            | |                      |
REST API is stateless    SERVER <--------------------stored token is sent to authorize subsequent request
    

    since angular is SPA(single page application), that means most of the scenario we decouple the frontend from the backend. So no session based.
    We still need to reach out to the service but this time using REST API which is stateless.

    The communication with service only happens through HtpClient not using session since session will be stored on the service but in our angular case server does not care about the client, so session will not be solution. They only communicate using http client besides that there is not other connection.

    Instead as soon as client sent an user credentials to server using https api call, the in return will get JSON web token from server i.e an encoded string which consists of lot of meta data suing certain algorithm which server only knows and only server can validate incoming tokes for their vulnerability. which encoded not encrypted which mean this string token can be unpacked and read by client.
    Thats why it is more secure bcz server know more than the client!

    Adding the Auth Page
    --------------------
    1.create auth component and setup>g c auth-component

    Switching Between Auth Modes
    ----------------------------
    2.switching between Auth modes
        isLoginMode = true;

        onSwitchMode() {
            this.isLoginMode = !this.isLoginMode;
        }

        <button 
          class="btn btn-primary"
          type="submit"
          >{{ isLoginMode? 'Login' : 'Sign Up'}}</button> |
        <button 
          class="btn btn-primary"
          type="button"
          (click)="onSwitchMode()"
          >Switch to {{isLoginMode ? 'Sign Up' : 'Login'}}</button>

    
    3.TD: Handling Form Input
    -------------------------
        form setup

    4.preparing Fire base backend
    -----------------------------
        real time DB->rule->modify and restrict->publish
        {
            "rules": {
            ".read":"auth != null",
                ".write":"auth != null"
            }
        }
        authentication section->users->setup sign in method->choose fields email and password ->edit->enable->save

    5.Preparing the Signup Request
    -------------------------------
    >ng g s auth-service
    implement signup(){} send request to below signup url.
        Since authentication is diff api,
        docs - https://firebase.google.com/docs/reference/rest/auth ->go to signup with email and password

    Make sure you got Recipes in your backend!
        In order to continue with this module and send successful authenticated requests, you need to ensure that you got recipes stored in your backend database.

        So in case you deleted those (or never added any), make sure you do add some recipes before you turn on protection as shown in the last lecture!

    create auth.service.ts to implement the functionalities to consume rest api exposed by fire base.
        import { HttpClient } from "@angular/common/http";
        import { Injectable } from "@angular/core";

        //define an interface to make angular aware about want kind of response we are expecting, no need of exporting since we using in this file only
        interface AuthResponseData {
            kind: string,
            idToken: string,
            email: string,
            refreshToken: string,
            expiresIn: string,
            localId: string

        }

        @Injectable({
            providedIn: 'root'
        })
        export class AuthService {
            constructor(private http: HttpClient) {}
            signUp(email: string, password: string) {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXKlr_QVtkLtia502UNV3UjXYVPeeQtho',
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                )
            }
        }

    Sending the Signup Request
    --------------------------
    6.sending signup request from component by call service signup()
        implement signup() in auth service
            signUp(email: string, password: string) {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXKlr_QVtkLtia502UNV3UjXYVPeeQtho',
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                )
            }
        create interface in auth service
            interface AuthResponseData {
                kind: string,
                idToken: string,
                email: string,
                refreshToken: string,
                expiresIn: string,
                localId: string

            }
        subscribe to that observable in auth component inside onSubmit()
            first make auth service as injectable
                @Injectable({
                    providedIn: 'root'
                })
            second inject auth service inside auth compo
                constructor(private authService: AuthService){}
            subscribe to that observable inside onSubmit()
                onSubmit(form: NgForm) {
                    //console.log(form);
                    //extra check for manipulation of from in DOM
                    if(!form.valid) {
                        return
                    }
                    const email = form.value.email;
                    const password = form.value.password;

                    if(this.isLoginMode) {
                    //...
                    } else{
                        this.authService.signUp(email, password)
                        .subscribe(resData =>{
                            console.log(resData);
                        }, error=>{
                            console.log(error);
                        });
                    }
                    form.reset();
                }

    *since the below code repetitive, i ll only note down steps, no code paste, for code please visit github.

    adding loading spinner and error handling logic
    -----------------------------------------------
        ->search for 'css loading spinner' grab and copy paste CSS.
        ->create new folder for loading-spinner/loading-spinner.component.css and resp .html
        ->create isLoading flag initialize it to false
        ->make it true before sending request
        ->make false again when you get response back whether success or error both cases.
        ->in template check for condition flag isLoading if its true then load loading-spinner component , also put one extra condition for form submission !isLoading.
        ->always handle error in service, make component much leaner.

    Improving Error Handling
    ------------------------
        move error handling login into the service from component.

    sending login requests
    ---------------------
        see video for organized code writing for login, signup and error handling in a private method calling it from public method...!
        reason behind making the interface AuthResponseData interface...

    creating and storing user data
    ------------------------------
    ->create user.model.ts inside auth folder - it will help up in validating user using that token, since token will expire after one hour.
        export class User {
        //here we are using type scripts shortcut of automatically storing arguments of the constructor in properties fo the class by adding accessor in front of the property name
        constructor(
            public email: string,
            public id: string,
            private _token: string,
            private _tokenExpirationDate: Date
        ){}

        private - we should not give permission to user to access token without checking vulnerability of the user.

    ->checks
        get token() {
            //before returning token check the user
            //does not exist and token created in the past
            if(!this._tokenExpirationDate && new Date() > this._tokenExpirationDate) {
                return null;
            }
            return this._token;
        }
    
    ->create create Subject<User> inside auth service - The idea here is that we will emit new User,  whenever a user login or logout or token expired.


    Reflecting Auth state on UI
    ---------------------------
    >whenever new user logged in or logout, we will emit Subject(which is our source of truth), we will import it in Home compo and listen to it.
    >based on whether we got user or not we will create flag isAuthenticated.
        inject ->private authService: AuthService
        subscribe-> ngOnInit() {
                        this.userSub = this.authService.user.subscribe(
                        user=> {
                            this.isAuthenticated = !user ? false: true;//!!user
                        }
                        );
                    }
        unsubscribe->ngOnDestroy(){
                        this.userSub.unsubscribe();
        }
    >check in isAuthenticated flag in template and decide whether that compo should be shown or not.
        isAuthenticated->hide authentication compo, display all the compo
    
    Adding the Token to Outgoing Requests
    -------------------------------------
        BehaviorSubject->acts like a normal Subject, the diff is that behavior subject also gives subscribers immediate access to the previously emitted value even if they haven't subscribed at the point of time that the value was emitted.
        That mean you can get access to the currently active user even if we only subscribed after that user has been emitted.
        So this means when we fetch data and we need that token at this point of time, even if the user logged in before.
            user = new BehaviorSubject<User>(null);

        'take'
        ----- 
            is an another rxjs operator just like tap which we pass inside pipe() observable it will give just give you how many value you needed. That is here we just needed the user value only once in the middle for something.
            this.authService.user.pipe(take(1)).subscribe();
        
        note:-we can return 2 observable with two different return o we need to pipe observable and return it as one.

        exhaustMap / we can return 2 observable as one
        ---------------------------------------------
            ->it is also imported from rxjs/operator->it will wait for the first observable to complete. Then it will taken data from previous observable and return new observable.
            fetchRecipes() {
                return this.authService.user.pipe(take(1), exhaustMap(user=>{
                    return this.http
                    .get<Recipe[]>(
                        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    );
                }), map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
            }

    Attaching the Token with an Interceptor
    ---------------------------------------

    Adding Logout
    -------------

    working with persistent data.

    Adding Auto-Login
    -----------------
        use of local storage to store token.
            localStorage.setItem('key', value);
            localStorage.getItem('key');


    Adding Auto-Logout
    ------------------
    localStorage.removeItem('key');
        manage timer and auto logout.
            private tokenExpirationTimer: any;//when use clicked on logout before time expiration, we need to clear expirationDuration token.
            autoLogout(expirationDuration: number) {
                setTimeout(()=> {
                    this.logout();
                }, expirationDuration)
            }

            logout() {
                this.user.next(null);
                this.router.navigate(['/auth']);
                localStorage.removeItem('userData');
                if(this.tokenExpirationTimer) {
                    this.clearTimeout(this.tokenExpirationTimer);
                }
                this.tokenExpirationTimer = null;
            }
    
    Adding an Auth Guard
    --------------------
        @Injectable({providedIn: 'root'})
        export class AuthGuard implements CanActivate {
            constructor(private authService: AuthService){}

            canActivate(route: ActivatedRouteSnapshot, router:RouterStateSnapshot): boolean | promise<boolean> | Observable<boolean> {
                return this.authService.user.pipe(map(user => {
                    return !!user//returning boolean value
                }))
            }
        }

        app-routing.module.ts
        {
            path: 'recipes', component: RecipeStartComponent, canActivate: [AuthGuard]
        }

        url tree 
        --------
            when user visits url/routes which dont have access, we need to route him to auth page

            1.before this used to do using manually by using map operator redirecting

            @Injectable({providedIn: 'root'})
            export class AuthGuard implements CanActivate {
                constructor(private authService: AuthService){}

                canActivate(route: ActivatedRouteSnapshot, router:RouterStateSnapshot): boolean | promise<boolean> | Observable<boolean> {
                    return this.authService.user.pipe(map(user => {
                        return !!user//returning boolean value
                    })),
                    tap(isAuth => {
                        if(isAuth) {
                            this.router.navigate(['/auth']);
                        }
                    })
                }
            }
            2.instead of using this approach angular provided another approach call 'url tree' by simple passing segments of array you wanna navigate to.

            @Injectable({providedIn: 'root'})
            export class AuthGuard implements CanActivate {
                constructor(private authService: AuthService){}

                canActivate(route: ActivatedRouteSnapshot, router:RouterStateSnapshot): boolean | UrlTree| promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
                    return this.authService.user.pipe(
                        take(1),//user subscription can emit more than once, this can lead to string side effects if our guard go on listening to than subject. Instead we want look at user value only one time and then we dont care about it unless we run the guard again.
                        map(user => {
                        const isAuth = !!user;
                        if(isAuth) {
                            return true;
                        }
                        return this.route.createUrlTree(['/auth'])
                    })),
                   
                }
            }

    Useful Docs:

        Firebase Auth REST API Docs: https://firebase.google.com/docs/reference/rest/auth

        More on JWT: https://jwt.io



Section 21: Dynamic Components
******************************
    essential components which we create dynamically lets say we wanna show an alert or modal on some overlay which should only be loaded upon certain action.

    Adding an Alert Modal Component
    -------------------------------
        html
            <div class="backdrop" (click)="onClose()"></div>
            <div class="alert-box'>
                <p>{{message}}</p>
                <div class="alert-box-actions">
                    <button class="btn btn-primary" (click)="onClose()">Close</button>
                </div>
            </div>

        ts
            @Component({
                selector: 'app-alert',
                templateUrl: './alert.component.html',
                styleUrls: ['./alert.component.css']
            })
            class export AlertComponent {
                @Input() message : string;
                @Output() close = new EventEmitter<void>();

                onClose() {
                    this.close.emit();//we are not sending any data
                }
            }
            //add AlertComponent in app.module.ts declarations.
        css
            .backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 10vw// need to v(view port) not %(of container)
                height: 100vh;
                background: rgba(0,0,0,0.75);transparent black
                z-index: 50;//to be above elements should be shown
            }
            .alert-box {
                position: fixed;
                top: 30vh;//30% inside of viewport
                left: 20vw;
                width: 60vw// to align in the middle
                padding: 16px;
                background:white;
                box-shadow:0 2px 8px rgba(0,0,0,0.25); 
            }

            alert-box-actions {
                text-align: right;
            }

        app.component.html
            <app-alert 
                message="error" *ngIf="error"
                (close)="onHandleError()" //from here we are listening to that event
                ></app-alert>

        app.component.ts

            onHandleError() {
                this.error = null;
            }


    Understanding the Different Approaches
    --------------------------------------
        loading programmatically

        *ngIf
        ----- 
            component embedded via selector(declaratively)
            *ngIf controls wether component is added to DOM.
        ex: see above close event example

        Preparing Programmatic Creation
        -------------------------------
            component created and added to DOM vid code(imperatively)
            component is managed and added by developer.

        For this we need to instantiate component using ComponentFactoryResolver
            auth.component.ts
                this.showAlert(errorMessage);

            private showAlert(message: String) {
                //since AlertComponent we can just create its instance manually.
                //const alertCompo = new AlertComponent(); it wont work since angular cant keep track of change detection and all
                //we need to let angular create this component, for this angular gives us a tool called 'ComponentFactoryResolver'
                const alertComponentFactory = this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent)

            }

            //inject ComponentFactoryResolver
            constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

            //this.ComponentFactoryResolver.resolveComponentFactory('type of the component')

            //to register place(view container ref) where this alert model should appear their is trick heck in angular using 'helper directive'

            helper directive
            ----------------
                It need to inject viewContainerRef
            
            create ->placeholder.directive.ts add it to app.module.ts declarations[]

                @Directive({
                    //the selector should to an attribute, so that we can add as an attribute directive in other place where it needed.
                    selector: '[appPlaceHolder]'
                })
                export class PlaceHolderDirective {
                    //It need to inject viewContainerRef, we need to turn that as a public property, so that we can access the viewContainerRef from outside of this component
                    constructor(public viewContainerRef: ViewContainerRef) {}
                    //This automatically gives you access to the pointer at the place where this directive is used.

                }

        auth.component.html
            //<div></div> we could have added div, but there is a better element <ng-directive></ng-directive>, this is a directive angular shift with which wil not anything to DOM but still it is accessible in angular templating language.

            <ng-template appPlaceHolder></ng-template>//which is considered by Angular when it parses template but which does not render the real element into real DOM which is great. But we will be able to get this element in the DOM after it simply remember internally by angular.

            
            auth.component.ts
            //we get access to the template using directive
            @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

            //from error function
            this.showAlert(errorMessage);

            private showAlert(message: String) {
                const alertComponentFactory = this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent);
                const hostViewContainerRef = this.alertHost.viewContainerRef;
                hostViewContainerRef.clear();//wil clear, since contains anything before.

                //this will create new component in that place.
                hostViewContainerRef.createComponent(alertComponentFactory)
            }

            //inject ComponentFactoryResolver
            constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    Understanding entryComponents
    -----------------------------
        in above scenario we wil get error saying -> "No component factory found for AlertComponent. Did you added to @NgModel.entryComponents?"
    Why?
        when angular created components for us it will look at app.module.ts declarations[] or app-routing.module.ts.
        But when we create components manually it wont look into these so.
    solution - we deliberately inform angular to prepare for creation of that component we need to add a special property inside app.module.ts
        entryComponents: [
            AlertComponent
        ]
        entryComponents - all those components which will eventually gets created without selector or route config

    Note - If you are working in a project >v9 no need of specifying entryComponents even if you specify thats not a problem.
        because here angular uses different rendering engine called 'ivy engine(not view engine <div v9)

    Data Binding & Event Binding
    ----------------------------
        How can we pass the data into the components which created programmatically.

        we need to store then componentRef which we give us access to instance property.

        //store subscription
            private closeSub : Subscription;
        private showAlert(message: String) {
            const alertComponentFactory = this.ComponentFactoryResolver.resolveComponentFactory(AlertComponent);
            const hostViewContainerRef = this.alertHost.viewContainerRef;
            hostViewContainerRef.clear();//wil clear, since contains anything before.

            //this will create new component in that place.
            const componentRef  = hostViewContainerRef.createComponent(alertComponentFactory);
            //now componentRef will have all the properties present in AlertComponent
            componentRef.instance.message = message;

            //for events, we manually need to subscribe
            this.closeSub = componentRef.instance.close.subscribe(() =>  {
                //clear component ref
                this.closeSub.unsubscribe();

                //to remove the component
                hostViewContainerRef.clear():
            });

            //we need to remove when AuthComponent destroyed
            onDestroy() {
                if(this.closeSub) {
                    this.closeSub.unsubscribe();
                }
            }
        }
    Recommended approach is creating components by *ngIf, unless you have a strong reason like its a 3rd party lib you want to give users of your library an in-code was of showing alert.

    Useful Resources:

        Official Docs: https://angular.io/guide/dynamic-component-loader


Angular Modules & Optimizing Angular Apps
*****************************************

    What are Modules?
    ----------------
        The imports you have in your files when you import something from another file into another - sometimes referred as module but these are 'Javascript module' not related to angular.

        angular modules means - 'NgModule' which used in our app.
            bundling/grouping same featured components(directives, services, pipes) into one module, export it and make use of it another modules.
        NgModule - informs angular  which are components/directives/pipes we have and bundle them together into module.
        An angular app requires at least one modules by default called - 'app module'
        Core angular features are included in Angular app module(ex FormsModule) to load them only when needed.

    Analyzing the AppModule
    -----------------------  
    NgModule({
        declarations: [
            Components,
            customDirectives,
            customPipes
        ],
        imports: [
            imports other modules into this module
            AppRoutingModule -> simply hold the route configuration info.
        ],
        provides:[
            here we will define all the service we will
            alternatively we can it like this from any service class-> @Injectable({providedIn: 'root'}) hence it will be available application wide.
        ],
        bootstrap: [
            AppComponent -> it defines which component is available right in that index file (like in index.html <app-root></app-root>)
            we can have multiple components thats why bootstrap: [] is array.
        ]
        entryComponents: [
            components which are loaded dynamically
            But angular 9 > onwards no need of mentioning entry components
        ]
    })
    
    app-routing.module.ts
    @NgModule({
        imports: [
            RouterModule.forRoot(appRoutes)
        ]
        //we can even write there appRoutes but to keep app.module.ts file bit leaner we will write here export it
        exports: [
            RouterModule // which will end up as AppRoutingModule
        ]
    })

    why to export?
    Because every module in Angular works on its own, they dont communicated each other that mean of we declare anyCompo we can only use it inside that particular module. If we export it, it is not only available in this module but also the module which imports this components module.

    Getting Started with Feature Modules
    ------------------------------------
    create feature module
        1.move all the components from app.module to FeatureModule declaration[] remove unused imports

        *ngIf and *ngFor are provided by BrowserModule - BrowserModule only needs once that will in app module. so need of importing it into feature modules. Because it not only provide *ngIf and *ngFor also does some startup things thats should run only once. So Instead od BrowserModule-> use CommonModule in all other successive FeatureModules.

        Forms are provided by FormsModule(TD), ReactiveFormsModule
        http related stuff HttpClientModule - This is only provide only service, not components, directives.

        whatever components you will have declarations should be exported to make use of them in other module, but its not applicable for Services.

        Services only need to be setup up once in an app module and you can access them in your whole application. Even in components of feature modules.

        Components, directives, pipes - these needs to be declared or imported into the module where you plan/using.

    Adding Routes to Feature Modules
    --------------------------------
        RouterModule.forRoot(appRoutes) - this will be added only once in AppRoutingModule.

        But for feature module router you need to use forChild(childRoutes)
        FeatureModule.forChild(childRoutes)
            This will automatically merged by Angular to AppRoutes

        feature-routing-module
        
        const featureModuleRoutes: Routes = [
            //
        ]

        @NgModule({
            imports: [
                RouterModule//angular module
            ],
            exports [
                RouterModule.forChild(featureModuleRoutes);
            ]
        })
        export class FeatureRoutingMode {

        }

        inside feature-module.ts
        @NgModule({
            imports: [
                FeatureRoutingModule
            ],
            exports: [

            ]
        })

    Component Declarations
    ----------------------
        Just mentioning route config is not enough, we even need to add into declarations the only components will load correctly. 
        No reason to export routes if we are using feature specific routing.

    Understanding Shared Modules
    ---------------------------
        we can only declare component, directives and pipes once, but we can import a module multiple import in different modules.

    Understanding the Core Module
    ----------------------------
    This is optional, recommended is to provide using providedIn: 'root'
    
        providing application wide service in a single module called core module to make app module leaner.

        INTERCEPTOR_SERVICE - no alternative we have to provide it inside  providers: []

    ex:
        import { NgModule } from '@angular/core'

        @NgModule({
            //put all the import from providers:[] of app components
        })
        export class CoreModule {
            
        }

        we dont need to export our services, because services work bit different from components
        services are automatically injected into root level.

        Now import Core module into App Modules imports: []

OPTIMIZATION CONCEPTS
*********************
    Understanding Lazy Loading
    --------------------------
        Initially we only load root route content, so app module code and code of all other components registered there. We dont load other modules.
        when we visit otherModule then only we will load otherModule and related components used in it.

        Adv: initially we download small code bundle to local our application faster.

    Implementing Lazy Loading
    ------------------------
        `visit Auth page->go to network tab(reload app) ->we see bunch of JS files such as polyfills.js, styles.js, vendor.js(angular), main.js
        These are bigger since we are in Development mode and the size becomes smaller once we build it for Production.
    
    app-routing.module.ts
    const appRoutes: Routes =[
        {
            path: '', redirectTo: '/auth', pathMatch: 'full'
        }
        //lazy loading of recipe module
        {
            path: '/modulepath', loadChildren:'path to the module#ClassName'
            path: '/recipe', loadChildren:'./recipes/recipes.module#RecipeModule'
        }
    ]

    loadChildren - special property in a config which angular understands as please only load a module/related components code when i visit /recipe

    we need to specify class name also along with relative path to the module to dynamically import compo related to that module - since there is not standard for class naming pattern so angular dont know explicitly we have to tell the name of the class.

    after this everything related to this module we downloaded and parsed in to separate code bundle which is detached from main bundle.

    In recipe-routing.module.ts we compulsorily need to have an empty path: '' -> we have removed path: '/recipe' and put it into app-routing.module.ts

    new modern syntax
    -----------------
    instead of that relative path string we can have an anonymous function
    In that we need to call import('relative path to that module') as function
    Now we dont need to add class name using # instead we listen to promise which will return objects(m) with modules in that exctra your module.
    app-routing.module.ts
    const appRoutes: Routes =[
        {
            path: '', redirectTo: '/auth', pathMatch: 'full'
        }
        //lazy loading of recipe module
        {
            
            path: '/recipe', loadChildren: () => {import(./recipes/recipes.module).then(m => {
                m.RecipeModule
            })}
        }
    ]

    When you are using lazy loading, remove RecipeModule inside imports: [] of app.module.ts since we are loading 'eagerly(by static import) and lazily(by dynamic imports) at the same time, which is not will results in function undefined error.

    Now recompile-> go to network tab-> observe main.js shrank from 117KBs to 70KBs
    that other 57KB will be get added whn=en you visit /recipe in new bundles file - recipe-recipe.module.ts

    conclusion - lazy load those module which are rarely visited like auth etc
        never lazy load module in user visits frequently its cause delay since code gets download and parsed when you visit that page.

    Preloading Lazy-Loaded Code
    ---------------------------
        To avoid delay when user has slow internet connection.

        In app-routing.module.ts add 2nd argument object - set preloadingStrategy: PreloadAllModules
            @NgModule({
                imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )]
            })
        This will preloaded lazy loaded modules as soon a possible.
    Avd: Initially download bundle still kept small, then use is browsing application and have some idle time the other modules code bundles gets downloaded into respective modules bundles detached from main bundles results in fast 'sub sequent loads'.

    Modules & Services
    ------------------
    possible way of declaring services

    1.AppModule - service available app - wide
        providers: [
            provide: 'ServiceName'
        ]
        here the service is available application wide, means same single instance of service of that service is available

    2.Components - recommended approach. - service available in component tree.
        @Injectable({
            providedIn: 'root'
        })
        Here the service is only available to DI(Dependency Injection) inside of that components tree only and then all these components share the same instance.
        so adding service to provides of eagerly loaded module module has exact same effect as adding service to providers of app module or as adding providedIn root in @Injectable.

    3.Eager-loaded module - service available app - wide
        since the everything bundle in a main bundle.
        service added will be available application wise with one and same instance.

    4.lazy-loaded-module - service available in loaded module
        huge difference - services added to providers of an lazily loaded module - here the service is only available in that lazily loaded module and it gets its own instance.

        If you though provide in app module and lazy loaded module, then the service is of course available in app-wide. but the lazy loaded module will get a separate instance, not the same instance.

    conclusion - as a rule of thumb mae sure the services are available APPLICATION WIDE using @Injectable({providedIn: 'root'}) or providing them to app modules provides.(dont provide eagerly loaded module i will confuse the newbies)

    *Loading Services Differently -  in practice
    -------------------------------------------
        The service which are provided in Shared module are recreated and use diff instance when you provided in lazy loaded module, since its a case of eager loaded(Shared Module) and lazy loaded(Shopping-list module)
        Never ever provide services inside shared folder.

    Ahead-of-Time(AOT) Compilation vs Just-In-Time(JIT) Compilations
    ----------------------------------------------------------------
                    your ts code and templates
                                    |
                    Typescript compiler(ts code -> js code)
                                    |
                    Angular compiler(template syntax -> JS DOM instructions it will happen in browser) - included in build in code.
        |                                                       |
       JIT                                                     AOT
        Angular compiler(JIT/AOT)
            itself written in Javascript.
            its large code base, its nothing to do with business login - its annoying!

        JIT
            Angular template compiler runs in browser(at run time)
            dis adv - it takes time,fast but still small performance hit.
        AOT
            Angular template compiler runs during build process(before app is deployed) not in the browser
        >ng serve -> by default uses JIT

        >ng build --prod
            it will code optimization.

        Useful Resources:

        Official Docs: https://angular.io/guide/ngmodules

        NgModules FAQ: https://angular.io/guide/ngmodule-faq

Deploying an Angular App
************************
    Deployment Preparation & Steps
    ------------------------------
        1.use and check the environmental variables.
        2.polish and test code(lazy loading)
        3.>ng build --prod - uses the ahead-of-time compilation
        4.deploy build artifacts to static host
            static host - because its only understand CSS, HTML, JS.

    Using Environment Variables
    ---------------------------
        if you are using API key for development across application, better is to declare it inside 
        environment.ts
        export const environment = {
            prod : false;
            firebaseAPIKey: 'adsasfsadfsafsfgsdfgsdfgdfg_DfgdfG'
        }        
        environment.prod.ts
        export const environment = {
            prod : true;
            firebaseAPIKey: 'adsasfsadfsafsfgsdfgsdfgdfg_DfgdfG'
        }      
    adv - we can swap the value during development to production.

    Deployment Example: Firebase Hosting
    ------------------------------------
    >ng build --prod
    >npm i -g firebase-tools =>it wil install firebase cli
    create firebase account and login from cli.

    >firebase init ->hosting
        initialize firebase
    >firebase projects:list
    >aps:create test
        create/select firebase project
    provide public folder path
    >dist/test
    >single page, index.html->Y
    >firebase deploy
    grab that url and test it in browser.
        When deploying your Angular app, it's really important to make sure that your server (like S3) is configured to always serve the index.html file.

        Here's why: https://academind.com/learn/angular/angular-q-a/#how-to-fix-broken-routes-after-deployment

NgRx - State management in bigger angular application
*****************************************************

Angular Universal
*****************
    When you are working on some browser only API.
    This allows us to pre render Angular app on server on the fly when user visits.
    initial rendering does not happened to in the browser, only subsequent rendering can be handled in browser only.

    Adding Angular Universal
    ------------------------
        A quick note: In the next lecture, I mention that it's important to add ModuleMapLoader to your app.server.ts file - if you're using Angular 9, this is NOT required anymore!

        >ng add @nguniversal/express-engine --clientProject projectName

            projectName - you wil get this in 
            angular.json
            projects{ 
                projectName: {
                    /.../
                }
            }
        The first page index.html will always be rendered on a server.
        ex: localStorage is will fail because it is browser only api, its not available in server.

        solution
            we need to tell server, the platform on which we are running by using static value injector decorator called @inject()
            here we dont type here to inject hardcoded object value, this value has an identifier 'PLATFORM_ID'

            import {PLATFORM_ID} from './@angular/core'
            import { isPlatformBrowser } './@angular/common'
            //to check whether the code is running on platform browser

            constructor(@Inject(PLATFORM_ID) private platformId)

            this tell angular that please look at globally provided value with this identifier and inject the value provided by angular and store it in platformId using class PLATFORM_ID
            Therefor no need to assign type here

            ngOnInIt() {
                //check whether the code is running on platform browser
                if(isPlatformBrowser(this.platformId)) {
                    use localStorage method related dispatch
                }
            }

            By using above implementation now we can even run our application not only browser also in server.

        run application using angular Universal
        >ng build:ssr (which is inside package.json)

        now run entire app on Node server to get its up and running.
        >npm run serve:ssr

        here if you inspect index.html ->it already load all other template scripts i.e pre rendering on server.

    Adding Angular Universal with NestJS
    ------------------------------------
        NestJS - server side framework for Node JS.
        It also called 'Angular for Server side', since it uses typescript and borrows some ideas from Angular.

        >ng add @nestjs/ng-universal  --projectName
            which will generate server folder - to simply pre render out app.
        >npm run build:ssr
        >npm run serve:ssr

    Deploying Universal Apps
    ------------------------
        As mentioned in the previous lectures, you can't deploy an Angular Universal app to a static host (i.e. Firebase Hosting, AWS S3 etc will NOT work).

        The reason for this is, that you're using Node.js to pre-render pages on the server and those Hosts don't support Node.js.

        Hence you need a host that does - for example AWS ElasticBeanstalk or Heroku.

        To these hosts, you need to upload your dist/ folder along with the package.json file. On the web server, you then have to ensure that npm install is executed, followed by npm serve:ssr.

        That's it - your app is now up and running on a web server!

        Here's an example how you could host Universal apps via Firebase Cloud Functions (NOT Firebase Hosting): https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/15267340#questions/7482486


Angular Animations
******************
    attaching and detaching some of the style is little bit harder using CSS.
    Animations Triggers and State
    ------------------------------
        import { state, style } '@angular/core'
        @Component( {
            animations: [
                trigger('divState', [
                    state('normal', style({
                        "background-colo": 'red',
                        transform: 'translateX(0)
                    })),
                    state('highlighted', style({
                        "background-color": "blue",
                        transform: "translateX(100px)"
                    }))
                ])
            ]
        })
        export class AppComponent {
            state = 'normal';
            
        }

        <div
            style="width: 100px; height:100px;"
            [@divState]="state>
        </div>

    Switching between States
    ------------------------
        onAnimate() {
            this.state === "normal" ? this.state = "highlighted" : this.state = "normal";
        }

    Transitions
    -----------
        @Component( {
            animations: [
                trigger('divState', [
                    state('normal', style({
                        "background-colo": 'red',
                        transform: 'translateX(0)
                    })),
                    state('highlighted', style({
                        "background-color": "blue",
                        transform: "translateX(100px)"
                    })),
                    transition("normal" => "highlighted", animate(300)),
                    transition("highlighted" => "normal", animate(800))
                    or
                    transition("normal" <=> "highlighted", animate(300))
                ])
            ]
        })

    Advanced Transitions
    --------------------
    @Component( {
            animations: [
                trigger('divState', [
                    state('normal', style({
                        "background-colo": 'red',
                        transform: 'translateX(0)
                    })),
                    state('highlighted', style({
                        "background-color": "blue",
                        transform: "translateX(100px)"
                    })),
                    transition("normal" => "highlighted", animate(300)),
                    transition("highlighted" => "normal", animate(800))
                    or
                    transition("normal" <=> "highlighted", animate(300))
                ]),
                trigger('wildState', [
                    state('normal', style({
                        "background-colo": 'red',
                        transform: "translateX(0) scale(0)"
                    })),
                    state('highlighted', style({
                        "background-color": "blue",
                        transform: "translateX(100px) scale(1)"
                    })),
                    state('shrunken', style({
                        "background-color": "blue",
                        transform: "translateX(100px) scale(0.5)"
                    })),
                    transition("normal" => "highlighted", animate(300))
                    transition("highlighted" => "normal", animate(800))
                    transition("shrunken" <=> *, animate(500))
                ]),

            ]
        })

        export class AppComponent {
            state = 'normal';
            wildState = 'normal';

            onAnimate() {
                this.state === "normal" ? this.state = "highlighted" : this.state = "normal";
                this.wildState === "normal" ? this.state = "highlighted" : this.state = "normal";
            }
            onShrunk() {
                this.wildState = "shrunken";
            }

            
        }

        <div
            style="width: 100px; height:100px;"
            [@divState]="state>
        </div><br>
        <div
            style="width: 100px; height:100px;"
            [@wildState]="state>
        </div>

    Transition Phases - for smooth transition
    -----------------------------------------
         transition("shrunken" <=> *, [
             //starting phase - no animate()
             style({
                 "background-color": "orange"
             }),
             //middle phase
             animate(1000, style(1000, style({
                 "borderRadius": "50px"
             }))),
             //end phase
             animate(500)
         ])

    The "void" State
    ----------------
    The void state represents -> the element is not yet added to the DOM.
    we can wildcard(*) i.e transition from any state, but its recommended to add void state
    when you want to add animations to list item gets added.
        animations: [
            trigger('list1', [
                state('in', style({
                    opacity: 1, //fully visible
                    transform: 'translateX(0)
                })),
                //for adding item, from non existing to any state
                transition('void => *', [
                    style({
                        opacity: 0, //invisible
                        transform: 'translateX(-100px)
                    })
                    animate(300)
                ])
                //for deleting item
                transition('* => void', [
                    //already we have state, so no need to ass any styles before animate
                    animate(300, style({
                        transformX(100px),
                        opacity: 0
                    }))
                ])
            ])
        ]

        <ul class="list-group">
            <li
                class="list-group-item"
                (click)="onDelete(item)"
                [@list1]
                *ngFor = "let item of list"
        </ul>

    Using Key frames for Animations
    -------------------------------
        more detailed control over the individual animation steps.
        keyframes is an array with individual phases.

        animations: [
            trigger('list2', [
                state('in', style({
                    opacity: 1, //fully visible
                    transform: 'translateX(0)
                })),
                //for adding item, from non existing to any state
                transition('void => *', [
                    animate(1000, keyframes([
                        styles({
                            transform: "translateX(-100px)",
                            opacity: 0
                            offset: 0
                        })
                        styles({
                            transform: "translateX(-50px)",
                            opacity: 0.5
                            offset: 0.3
                        })
                        styles({
                            transform: "translateX(-20px)",
                            opacity: 1
                            offset: 0.8
                        })
                        styles({
                            transform: "translateX(0)",
                            opacity: 1
                            offset: 1s
                        })
                    ]))
                ])
                //for deleting item
                transition('* => void', [
                    //already we have state, so no need to ass any styles before animate
                    animate(300, style({
                        transformX(100px),
                        opacity: 0
                    }))
                ])
            ])
        ]

        <ul class="list-group">
            <li
                class="list-group-item"
                (click)="onDelete(item)"
                [@list1]
                [@list2]
                *ngFor = "let item of list"
        </ul>

    Grouping Transitions
    --------------------
         transition('* => void', [
            group([
                animate(300, style({
                    color: 'red'
                }),
                animate(800, style({
                    transform: "transformX(100px)",
                    opacity: 0
                }))
            ])
        ])

    Using Animation Callbacks
    -------------------------
        <div 
            style="width:100px;height:100px"
            [@divState]="state"
            (@divState.start) = "animationStarted($event)"
            (@divState.done) = "animationEnded($event)"
            >
        </div>

        animationStarted(event) {
            //we can listen to some other code
        }
        animationEnded(event) {
            //we can listen to some other code
        }
Adding Offline Capabilities with Service Workers
************************************************
    how to turn on offline mode
    inspect mode-> application ->service workers -> check offline mode

    Adding Service Workers
    ----------------------
        JS
    loaded JS files
------------------>-------single thread------------------------------------
                        |
        |           |             |
        HTML        HTML            HTML

    Now JS in browser also offers us to run an additional thread
    We can run a so-called 'Web Worker', special form of service worker.
    
    --------------------->---single JS Thread-------

    service worker----------------->---------------

        1.This thread is kind of decoupled from HTML pages, so this mean that   this can also continue running in the background.
            ex: mobile push, which will provide push notifications.
        2.Manages ALL pages of given scope
            it will work with API, also REST end point. helps in cache the responses in caches storage and also return these caches if internet is not available, if and only if there a cached version available.

        3rd party package 
        >ng add @angular/pwa - progressive web application
        change log
            1.index.html - adds <noscript>Please enable javascript to continue using this application</noscript>
            2.creates and load manifest.json file in index.html -  in mobile phone if we need we can create an short cut at home screen.
            3.imported ServiceWorkerModule
                import { ServiceWorkerModule } from '@angular/service-worker'
                @NgModule({
                    imports: [
                        ServiceModule.register('/ngsw-worker.js', { enabled: environment.production})
                    ]
                })
            /ngsw-worker.js - this file we wont find it, because it auto generated during the build process, it will be in './dist' which holds service workers.
        4.added dependency in package.json
        5.angular.json ->"serviceworker": true for production: {} build
        5.created ngsw-config.json
            this is where we need to configure our service worker.

        >ng build --prod
            dist/angular-pwa

        //which will host the content of the folder you ran cmd
        >npm i -g http-server
            http-server -> simple node based server.

        //the cd which we need to run
        >cd dist/angular-pwa http-server
            now visit -> http://127.0.0.1 home your app is running now
        observe 'hard coded content' gets cached.

    Caching Assets for Offline Use
    ------------------------------
        "index" ->what is the root page of our app that we wanna cache.
            "index" : "/index.html"
        "assetGroups" -> configurations that defined which static assets needs to ached and how they should be cached.
        "instalMode"
            "prefetch ->prefetch all the assets which are specified in this group i.e put them into cache even if we have not needed them yet.
            "lazy" -> only loaded when you needed them at least once.
                Ad- > full available bandwidth wont be used 
                Dis adv -> if need it for the first time it wont be there, if user loosed the internet connection before assets.
        "updateMode"
        "resources" {
            "files": [
                //files you want cace, path-> relative from dist folder.
            ]
        }
    
        here if font wont loaded, then place the inside "urls"
        "resources" : {
            "urls": [ "font lib URLs" ]
        }

    Caching Dynamic Assets & URLs
    -----------------------------
        "dataGroups" : [
            "name": "api/name",
            "urls" : [xyz],
            "cacheConfig": {
                "maxSize": 5 //cache 5 responses
                "maxAge" : "6h" //6 hours
                "timeout": "10s" //10 seconds
                "strategy" "freshness
            }
        ]

        maxSize -> defines how many entries, not how many request/posts.
        maxAge -> defines how old should the data in the cache can be retained.
        timeout -> time in which i want wait before fetching cache.
        strategy
            freshness -> always try to reachout to the backend first and only use cache if you're offline. It will take "timeout" into account.
            performance -> try to get something on the screen as quick as possible. It will take maxAge into account.
        >ng build --prod

    Note : reload page atleast once
    Now turn off wifi, and refresh page you will get your running app in offline mode.

    Official Angular Service Worker Docs: https://angular.io/guide/service-worker-intro
    Academind Resources on PWAs: https://academind.com/learn/progressive-web-apps


Unit Testing in Angular Apps / created by the CLI
*************************************************
    Does the Component, pipe, directive or service work as intended?

    Analyzing the Testing Setup (as created by the CLI)
    ---------------------------------------------------
        app.component.spec - test file
        each block which begins with 'it' is a test which works independent of each other.
        TestBed -> angular testing utility Object. Which allows us to configure module for our testing.

        Initial config
            imports { TestBed, async } from '@angular/core/testing'
            describe("projectName", () => {
                beforeEach(() => {
                    TestBed.configureTestingModule({
                        //declare all the components which you want to test
                        declarations: [
                            AppComponent
                        ]
                    });
                });

            })

        first test case - ap is existed or not
            1.create component and store it in a variable names fixture.
            2.access components instance and store into variable 'app'
            3.test the app exists or not by passing app to expect() and call toBeTruthy().
                it('should create the app', async( () => {
                    let fixture = TestBed.createComponent(AppComponent);
                    let app = fixture.debugElement.componentInstance;
                    expect(app).toBeTruthy();
                }))

        second test case - app consists of expected title or not
            1.create component and store it in a variable names fixture.
            2.access components instance and store into variable 'app'
            3.test the app contains expected title or not, by passing app.title to expect() and call toEqual().
                it('should have a title 'app works!', async(()=>{
                    let fixture = TestBed.createComponent(AppComponent);
                    // here we also need to compile our code and access out template
                    let app = fixture.debugElement.componentInstance;
                    expect(app.title).toEqual('app works!');
                }));

        third test case - should render title in a h1 tag
            1.create component and store it in a variable names fixture.
            2.call detectChanges() on fixture, to trigger changes detection. Since wont run automatically manually.
            3.access nativeElement and store it into 'compiled' variable.
            4.test the app contains expected title or not inside h1 tag, by passing textContent of h1 tag  to expect() and call toContains().
                it('should render title in a h1 tag', async(()=>{
                    let fixture = TestBed.createComponent(AppComponent);
                    fixed.detectChanges();
                    let compiled = fixture.debugElement.nativeElement;
                    expect(compiled.querySelector('h1').textContent).toContain('app works!');
                }));

    Running Tests (with the CLI)
    ----------------------------
        Run the test using CLI
        >ng test //CLI has built in test runner. karma will start at https://localhost:9876 executes 3 of 3 SUCCESS.

    Testing Dependencies: Components and Services
    --------------------------------------------
        it('should use the user name from the service', () =>{
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            let userService = fixture.debugElement.injector.get(UserService);
            fixture.detectChanges();
            expect(UserService.username).toEqual(app.user.name);
        })

        it('should display the user name if user is logged in',()=>{
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            let UserService = fixture.debugElement.injector.get(UserService);
            fixture.detectChanges();
            // here we also need to compile our code and access out template
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('p').textContent).toContains(app.user.name)

        })
        we will get error here, because we nly need to run test case if the use if logged in.
             it('should display the user name if user is logged in',()=>{
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            app.isLogin = true;
            // here we also need to compile our code and access out template
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('p').textContent).toContains(app.user.name)
        })

        fi we have not logged in
             it('should not display the user name if user is not logged in',()=>{
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            app.isLogin = true;
            // here we also need to compile our code and access out template
            let compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('p').textContent).not.toContains(app.user.name)
        })

    Simulating Async Tasks
    ----------------------
        Write test async test case for the data which is asynchronous.
        fake the asynchronous service data.service.ts
            export class DatService {
                getDetails() {
                    const resultPromise = new Promise((resolve, reject)=>{
                        setTimeout(()=> {
                            resolve('Data');
                        },1500)
                    });
                    return resultPromise;
                }
            }

        it('should not fetch data successfully if not called asynchronously', () => {
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            let dataService = fixture.debugElement.injector.get(DataService);
            let spy = SpyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
            fixture.detectChanges();
            expect(app.data).toBe('Data');
        })
         this will fail, since the function will return undefined.

        How to test such a asynchronous task/state changes during run time?
            it('should not fetch data successfully if not called asynchronously', async(() => {
                let fixture = TestBed.createComponent(UserComponent);
                let app = fixture.debugElement.componentInstance;
                let dataService = fixture.debugElement.injector.get(DataService);
                let spy = SpyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));//here we are still faking it our data
                fixture.detectChanges();
                //whenstable() function allows me to react to all the asynchronous task are finished.
                fixture.whenstable().then(()=> {
                    expect(app.data).toBe('Data');
                });
            }));

    Using "fakeAsync" and "tick"
    ---------------------------
    it allows me to get rid of whenstable() but instead it will provide tick()
        it('should not fetch data successfully if not called asynchronously', fakeAsync(() => {
            let fixture = TestBed.createComponent(UserComponent);
            let app = fixture.debugElement.componentInstance;
            let dataService = fixture.debugElement.injector.get(DataService);
            let spy = SpyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));//here we are still faking it our data
            fixture.detectChanges();
            //whenstable() function allows me to react to all the asynchronous task are finished.
            tick();
            expect(app.data).toBe('Data');
        }));

    Isolated vs Non-Isolated Tests
    ------------------------------
        When you dont have dependency on angular to test.
        Pipe can be tested totally independent of Angular. Because it has a transform function we wll pass value and get transformed value, here no need to involve angular.

        reverse.pipe.ts
            @Pipe({
                name: 'reverse'
            })
            export class ReversePipe {
                transform(value: string) {
                    split with nothing in between, reverse and join with nothing in between.
                    return value.split("").reverse().join("");
                }
            }

    reverse-pipe.spec.ts
    describe('Component: User',()=>{
        it('should reverse the value', ()=>{
            let reversePipe = new ReversePipe();
            expect(reversePipe.transform('hello').toEqual('olleh'))
        });
    })
    This ia called Isolated test.
    

    This Module only provides a brief and basic Introduction to Angular Unit Tests and the Angular Testing Suite. This Course isn't focused on Testing.

        If you want to dive deeper, the official Docs actually are a great place to start. There you'll also find a Non-CLI Setup!

        Official Docs: https://angular.io/docs/ts/latest/guide/testing.html

        I can also recommend the following Article: https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine

        For more Information on how to run Tests with the CLI have a look at their official Docs:

        => Unit Tests: https://github.com/angular/angular-cli/wiki/test

        => E2E Tests: https://github.com/angular/angular-cli/wiki/e2e

Angular as a Platform & Closer Look at the CLI
**********************************************
    A Closer Look at "ng new"
    -------------------------
        >ng new --help
            create-application -> come to  use when we are creating multiple projects
            --dry-run -> useful when you want just check what we will happens when that command runs.
            --inline-template and -inline-style
            --routing, --skip-tests
            --skip-install ->dont install npm dependencies before, i wil do it manually.

    Understanding the Config Files
    ------------------------------
        .editorconfig
            How code should look like.
            indent_size = 2

        .prettierrc
            {
                singleQuote: true
            }
        .gitignore
            file ignore while pushing into github.
            /foldername, *.setting

        angular.json
        
        browserslist
            This file will be picked by angular cli when we are building for production.
            Tell about which browsers application is going to support.

        karma.conf.js
            file thats is use for unit testing in the end.

        package-lock.json and package.json
            generated based on package.json which inturn manages packages that are used in application with there versions.
        package.json
            scripts: {
                "name" : "application-name",
                "version: "1.1.1"
                scripts: {
                    "ng": "ng"//path to ng file
                    "start": "ng start" //to compile and run APPLICATION
                    "build": "ng build" //to build application
                    "test": "ng test" //to run unit test case of spec files
                    "lint": "ng lint" //used for linting, the respective config file tslint.js
                    "e2e": "ng e2e" //end to end testing
                }

                //below are the 3rd part packages used by out application to run
                dependencies: {

                }

                //tools which are only used for building our application
                devDependencies: {
                    
                }

            }
            how to run this file >npm install
                which will  create node_modules folder
                which will also created package.json which stores the "exact version"
        
        tsconfig.json - base configuration file
            this file configure the typescript compiler.
            
            we can also configure angular compiler here
                "angularCompilerOptions" : {

                }
        tsconfig.app.json - specific configuration file which extends tsconfig.json file for testing for real app compilation.

        tslint.json
            linting - check the code quality to follow best practices

    Important CLI Commands
    ----------------------
        --help
        >ng build
        >ng serve
        >ng generate
        >ng lint

    The "angular.json" File - A Closer Look
    ---------------------------------------
        {
            "$schema": schema path,
            "version": version,
            "newProjectRoot": "projects",
            "projects" : {
                //every project has a config block
                "angular-config" : {
                    "projectType" : //here we provide "application" or "library"
                    "prefix": //we can change "app" to "company name"
                    //here the command which we execute can be configured.
                    "architect" : {
                        "build" : {
                            "builder": "tool-name",
                            "options" : {
                               "outputPath": "path to build files",
                               "index": index file path
                               "main": main.ts file path,
                               "polyfills": polyfills.ts file path,
                               "tsConfig": tsconfig.app.json file path,
                               "aot": to build for production,
                               "assets": [
                                   //mention the asset file path(images, .ico font icon libs)
                               ],
                               "style": [
                                   //specify the path of style file
                               ],
                               "scripts": [
                                   //add js files like loadash.js, not required since we will be installing as npmjs registry.
                               ]
                            },
                            //here we can configure different environments
                            "configurations" : {

                            }
                        },
                        "serve" : {

                        },
                        "test" : {

                        },
                        "lint": {
                            
                        },
                        "e2e": {

                        }
                    }
                }
            }
        }

    Angular Schematics - An Introduction
    ------------------------------------
        powerful tool to add 3rd party compo, generate our own and also to update project.
            >ng generate - to generate new components
            >ng add - to add new libraries to the project
            >ng update - to update project and libraries.
        we can build our own Schematics, even 3rd party packages also supports schematics.

        The "ng add" Command
        --------------------
            example >ng add @angular/material - analyse the changed files.

        Using Custom "ng generate" Schematics
        -------------------------------------
            >ng generate @angular/material: nav main-nav //which is schematics implemented by angular material team. Which will download whole component setup, we just need to call that component, thats it!

        Smooth Updating of Projects with "ng update"
        -------------------------------------------
            To keep your application upto date.
            >ng update
                which we list out all the outdated dependencies
            >ng update @angular/core @angular/cli
                this will update all the dependencies ot latest versions.

    Simplified Deployment with "ng deploy"
    -------------------------------------
        build'ers
        --------
            we can build our application for different environment.
            >ng build/ng test/ng lint - perform some build steps
            >ng deploy
                it will build our application for production. we can host into static web server such as firebase etc.

                >firebase login
                >ng add @angular/fire
                >choose fire base project(create account and create project)
                //if you are getting errors 
                >npm install -g firebase-tools
                >ng deploy //build the project and ship the build file on to the firebase server.
                copy paste working project url

        browserslist - This is important to telling angular which browser you want to support

    Understanding "Differential Loading"
    ------------------------------------
    Angular has builtin feature called "differential loading
        
                        Differential loading
                                |
                        Hosting app(Firebase, AWS, Azure,GC)
                |                                           |
        User A: Modern browser               User B: Legacy/old browser   

        User A: needs no/less polyfills, smaller bundle required.
        User B: needs all/more polyfills, bigger bundle required.

        Ofcourse we can always shift a bigger bundle so that we can support both A and B, if shift with smaller bundle for user B the application wont run.

        Angular with differential loading do both. Angular CLI will produces multiple version of our app when we build it for production.

        It will run small code file when user visits index.html page to identify the which browser you are using. With DL the user using modern browser has to download less code tha user using older browser. This gives performance factor for user.

        In dist folder we always see 2 versions of same files ex 2 main, 2 polyfills, runtime.
        es5 - ols JS -  user with older version browser.
        es2015 - modern JS -  smaller, uses recent javascript.

        inside index.html
        <script src="runtime-es2015.14134dsf3413.js" type="module"></script>
        Angular runs this first, then in that it will decide which file needs to loaded next by identifying browser using browserlist file.

        tsconfig.json
            target: es5 //modern one

        polyfills
            auto generated, go through the instruction given to enable and support animation etc.


    Managing Multiple Projects in One Folder
    ----------------------------------------
        >ng generate backend-ui-for-administration
        now angular will add new folder named 'projects'
        bit slimmer since all the projects will share same root and angular.json file
        >ng serve --project=backend-ui-for-administration

        >ng new testApplication --create-application=false

    Angular Libraries - An Introduction
    -----------------------------------
        share the code that can used by others.
            ex: angular material
        >ng generate library iAngular
            <button><ng-content></ng-content></button>
            <ng-content> -> because user can pass values for my component

    Angular elements
    ----------------
        angular component as a web components9custom HTML elements) 
        if we are getting any angular template from backend side and we need to directly make use of if the component.ts file  
        >npm i @angular/elements
        import {createCustomElement} from '@angular/elements'
        uncomment 2 imports statements related to @webcomponents

        constructor(
            private injector: Injector, domeSanitizer: DomSanitizer
        ){
            const alertComponent = createCustomElement(AlertComponent, {inject: injector})
            customElement.define('my-alert', 'alertComponent)//This JS property

            setTimeout(()=>{
                this.content = DomSanitizer.bypassSecurityTrustHtml("<my-alert message='Rendered dynamically'></my-alert>")
                //in the its jS, to avoid XSS attack to make sure the content safe.
            },1000)
        }

Typescript
**********
    What & Why?
    ----------
        Super set of JS. It extends JS.
        It adds static typing to JS.

    without ts
        JS is dynamically type, here it wont expect any type only expects 2 parameter of any type, types will determined at runtime based on the value.
        no-typescript.js
            function add(a, b) {
                return a+b;
            }
            const result = add(2, 5);//it works with number, strings also.
            console.log(result);
        if multiple people are working with same project, there should be criteria to explain about method/function.

    with ts
        we can catch unintended errors of my code, before compiling it.
        alow us to write better code.
        function(a: number, b: number)

    Installing & Using TypeScript
    -----------------------------
        >npm init -y
        >npm i typescript
        twe need invoke ts compiler, since TS wont run in browser. its should converted/compile down to JS. 
        >npx tsc filename.ts
            it will give us a .js file

    Base Types & Primitives
    -----------------------
        primitive types - numbers, string, boolean, null, undefined
            let age: number = 25;

        boolean
            isTest: boolean = true;
        null, undefined we wil use rarely
    
        Array & Object Types
            let months[]: string[];
            months = ['jan', 'feb', 'mar']
        
        The default type for object type is 'any'
            let person:{name: string, age: number}
            person = {
                name: "imam",
                age: 25
            }
        
        Type Inference
        --------------
            if you initialized the variable, the typescript infers the type automatically.

            so if you are initializing dont mention type, its redundant

        Working with Union Types
        ------------------------
            if we have an object with more than one type, allowing multiple types is called union types.

            ex: let name: string | number | boolean = "imam"

        Assigning Type Aliases
        ----------------------
            avoid repeating type definition
            to make code more concise and easier to maintain.

            let person: {
                name: string,
                age: number
            }
            let people: {
                name: string,
                age: number
            }[]

            or

            type Person = {
                name: string,
                age: number
            }

            let people: Person[];

    Diving into Functions & Function Types
    --------------------------------------
        Functions & types
            return type/union
            function add(a: number, b: number): number | string {
                return a+b;
            }

            void
            function printMsg(value: any): void {
                console.log(value);
            }

    Understanding Generics
    ----------------------
        type safe yet flexible/we can pass any type
            function testFunc<T>(a: T[], B: T) {}
            const a = [1,2,3];
            const test1 = testFunc(a, -1);
            const test2 = (['a','b','c'], 'd') 

    Classes
    -------
        class - blueprint of an object, which we have plan on instantiating
        we can add properties and methods to class.

        class Student() {
            firstName: string
            lastName: string

            the default method called when we instantiate new objects based on that class.
            constructor(first: string, last: string) {
                this.firstName = first;
                this.lastName = last;
            }

            //methods
        }

        Student s = new Student('imam', 'hulagur')

        With type script we can control, the property should be private(only access inside that class) or accessible publicly.

        type script short hand
            constructor(private firstName: string, private: lastName: string) {}

    Interfaces
    ----------
        object type definitions
        alternate to 'type' keyword
        
        //no () braces here
        interface Person {
            name: string,
            age: number


            //here we only have method definition, no implementation
            greet(){}// implementation wil be taken care by the class which inherit this interface
        }

        let imam = {
            name: imamhulagur,
            age: 25
            greet(){
                console.log('Have a good time!')
            }
        }

        Diff between interface and type keyword
            interfaces can be implemented. the they will force class to have same type as the interface. help in bigger team with multiple developers.

        class Human implements Person {
            name: string;
            age: number;
            greet() {
                console.log('hello');
            }
        }

    Configuring the TypeScript Compiler
    -----------------------------------
        To compile all the typescript files in one go, instead of specifying single file like >npx tsc test.ts. We need to configure ts compiler in file name tsconfig.json

        >npx tsc --init
        Angular - we dont need to do it, since will automatically created while generating application setup.