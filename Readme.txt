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

Routing
********
    To make user look like they are shifting from one page to another, but in reality
        we are loading single page with different component template based dynamic routing.
        instead of calling statically from HTML templates of other components.
    app.model.ts is a good place to inform angular about the routes of our application.
    each route is just a javascript object inside appRoute: Routed []
        which will accept path and components as a keys
    add 'RouterModule' inside @NgModule and the register appRoutes to RouterModule inside imports.
    To inform angular where to put our routes, use <router-outlet/>(this will mark the place in our document where we want angular to load currently loaded compo)
    put your routes values into special type of directive cal routeLink = ['routeName']
    Absolute path - with '/' in the beginning, which will always gets appended to root domain.
        with './ or ../' will go back one path, or got back another path.
    Active route style - dynamically
    --------------------------------
    The a angular provided an directive, routerLinkActive=""
        for empty path i.e /nothing, is always present in all the path so to avoid this
            we need to use directive - routerLinkActiveOptions
            this need [] because just can not pass JS object directly to directive, so ween to wrap it property binding using[];
                ex: [routerLinkActiveOptions] = "{exact : true}
    Navigate Programmatically
    --------------------------
    If you want to redirect to any other page in other components
        1.first inject the Router 
        2.use this.Router.navigate([]) method
    using relative path
    -------------------
    inject ActivatedRouter to provide relative path and navigate to other components
    why it does not give error this time, but given error while we are using routerLink?
        because unlike 'router' method [routerLink] does not know the active route.
    To tell router where we are currently
        we need to specify relativeTo: "" property.
        Router is a complex JS object with a lots of meta data.
    passing parameters to route
    ---------------------------
    /: will tell router that 'this is out dynamic part of the route'

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
            we cant block our routing. So need ot subscribe to observable.
        observable is 3rd party packages(rxjs) which are used to perform asynchronous task, without having to wait for the task which might happen in future.
        ex : this.router.params
            .subscribe(
                (params: Params)=> {
                    this.user.id = params['id'];
                    this.user.id = params['name'];
                }
            )
            Now this trigger only when there is changes in url/params

    Important note about observables
    ---------------------------------
    Observable will be destroyed even if your component get destroyed from the memory if you moved to other component.
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

    nested/child routing
    --------------------
    if only nest we get error
        the <router-outlet></router-outlet> id only available to top level routes
        child routes also needs a separate outlet, because they simply cant override, instead they should be loaded nested.
    <router-outlet></router-outlet>//this will be new route, which will use on all child routes.

    using queryParams - practice
    ---------------------------

    configuring handling of queryParams
    -----------------------------------
    queryParamsHandling: 'merge'/'preserve - to make sure, we dont loose param info we have before.

    redirecting and wildcard routing and redirectTo
    -----------------------------------------------
    what if user enters un handled url/routes
    create separate component to handle such kind of scenarios
        { path: 'not-found', component: PageNotFoundComponent  },
        { path: 'something', redirectTo: '/not-found'}
    wildcard route(**)
        That mean catch all possible routes which are unknown to Angular ans redirect to mentioned component.
        The order is super important here - 
            If it was in the beginning, you will always redirect to '/not-found'
            make sure it should be last, because our array gets parsed from top to bottom.

    'pathMatch' ing while redirecting
    --------------------------------
    By Default Angular matches the path by prefix. That means the following route will match both / and /recipe
        since path entered in URL 'starts with the path' specified in the route.
        {path: '', redirectTo: './somewhere'}
    To fix this behavior, we need to change matching strategy to 'full'
        {path: '', redirectTo: 'somewhere', pathMatch: 'full'}

    outsourcing the route configuration
    -----------------------------------
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
    so need to angular feature called angular router.

    protecting routes with canActivate
    ----------------------------------
    ->create service, which implements CanActivate interface
        (it will forces us to implements and override canActivate() compulsory)
        it wil take two input ActivatedRouteSnapshot, RouteStateSnapshot
        it return observable<boolean> alternatively it can return promise<boolean> or boolean
        it can run synchronously and also asynchronous.
        create fake auth service since we have not implemented login functionality
        inject auth service into auth guard, to do we need to make auth guard as injectable
        if user is authenticated then return true, or else we should not allow user to access that page 
            redirect him to other page by injecting router and navigate.
    ->To use created guard
        We need to found out which route should be protected by this guard(ex: here servers compo)
        add canActivate[] property, it will take all the guard to which it should apply to all teh child compo.
        asd both services namely authService, AuthGuard to providers[] of app.module.ts
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
        still some of our routes depend on your data they received statically(each type they have loaded) or dynamically
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
        because al our URLs are parsed by the server first(not by the a angular)
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
        all the part after that can be ignored by our web server. 
        therefore it can run on web server even if its not returning index.html file.
    After # tag can be parsed by our client i,r by Angular.

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

Observable
**********
    Understanding Observable
    ------------------------
        Its a data source(Events, Http Requests, Triggers) in a code.
        its from 3rd party package rsjx, need ot import it from there.
        It work as following
                                OBSERVABLE 
        
        --------------------------------------------------------->  in between we have stream/timeline, we will get data packates/triggers

                                
        Handle data        Handle error        Handle completion       We have 3 ways to handle data packates                    
                                OBSERVER(our code)/subscriber

    An observable doesnt have to complete like observable for button click.
    But some of the observable will complete like Observable for Http Requests.
    We will use these observables to handle asynchronous tasks.
        since we dont know when they wil happen.
        we dont know how long will it take.
    So if we are executing normal code, we should not to wait for these event response/completion. bcz that will block our program.
    we can use call back or Promises, but Observable the just diff approach to handling asyncs. also angular embraces to use lot.
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
    create observable using crate() 
    -----------------------------
    Here observer is an listen we need to inform observe about the subscription.
        ngOnInit() {
            const customObservable = Observable.create(observer => {
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
    complete
    check the condition
        if(count === 2) {
            observer.complete();
        }
    write 3rd arg clear fun without any arg
        ()=> {
            console.log('Counter completed!');
        }
    Operators(https://www.learnrxjs.io/learn-rxjs/operators)
    ******************************************************
    To change the format of data.
    we can call them using a pipe() method. every observable has this method.
    now we will import Operators from rxjs/Operators lib not from observable, thousands of Operators are there.
    ex pipe(), map()
        note: import { map } from 'rxjs/operators'
    first customise
        customObservable.pipe(map(
        (data: number) => {
        //customise the data format which you needed.
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
    *******
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
    
FORMS
*****
    form is something which we used to submit to server with action or method, but here since Angular is SPA there
        no submitting to server instead we will need to handle the form through Angular.
        and the if you want to submit to server, we need to reach out via Angular Https service.
    Why do we need Angular in Forms
    -------------------------------
    normal HTML form  -> Angular givers us JS object representation of form making it simple for us to retrieve user values.
                        to see the state of form and to work with it.
                        Also it wil store some meta data of form.

    2 ways handling HTML form
    Template Driven(TD) Forms and Reactive Forms
    ********************************************
    Template Driven(TD)
    -------------------
        Here we simply setup the form in template, Angular will automatically infer the Form Object from the DOM.
    Reactive/Complex approach
        Here we actually define the structure of our form i.e form is created Programmatically manually connect with HTML
            and the it will synchronized with DOM.
        Here we can fine tune each and every little piece of our form.
    creating forms and registering controls
    ---------------------------------------
    ->import FormsModule inside imports:[]
        here <form> element is serving as a selector for some Angular directive. The create such a JS representation Object for us.
        Right now its empty, still we need to register our control manually since we really dont want to some of unwanted controls to be registered automatically. 3rd party input fields and all.
        se we need to register controls manually and tell the angular.
            1.add 'ngModel' to required controls.
            2.need to provide controls name using name Attribute.

    submitting and using Form
    -------------------------
        place event listener (ngSubmit)  = "onSubmit()"
            to get access to submitted form, we need to access passing local reference to onSubmit(f) method.
            the local reference name should be start with '#' i.e #f
        To retrieve
            accept form: elementRef in method and log it.
           here we will not JS, we wil HTML from.
        But to retrieve using ref we need to inform Angular hey please convert it JS and provide the object inside this ref.
            #f="ngForm" -> ngForm take care of above task.
            now the from is of type 'ngForm'
    Refering from using @ViewChild()
    ------------------------------
    instead fo refering form local ref in template, we can do it from ts also by storing that local ref in other variable.
    @ViewChild() helps to create a local reference for from in ts.
        @ViewChild('f') signupForm: NgForm;
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

    Setting Default value using ngModel property
    --------------------------------------------
    make ngModel to [ngModel]="variable which had default value'
    we make use of 'property binding' to do this.
    ex  defaultValue = 'pet';
        [ngModel]= 'defaultValue'
    ngModel with two way data binding
        sometimes we should not want to only pre populate default value and also want to react to any changes.
        <div class="form-">
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

    TD - Handling Radio buttons
    --------------------------
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
    setValue() - to override whole frm
        this.signupForm.setValue({
            userData: {
                username : suggestedName,
                email: ''
            },
            select : 'pet',
            questionAnswer: '',
            gender: 'male'
        })
    It has one disadvantage - i.e in ten middle if click on that suggest button it will override all the values.
    Not necessery good approach

    patchValue() - To override part/patch of the form.
        here we can override certain necessery data.
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

    Reactive form
    -------------
    In this approach the from is created 'programmatically'
    ->create form of type FormGroup
    ->to connect our reactive form to HTML we need to import ReactiveFormModule in app.module manually from "@angular/forms
    ->import ReactiveFormsModule in imports[] of app.component
    ->initialize form before rendering inside ngOnInit()
        ngOnInit() {
            this.signupFrom = new FormGroup({
            username: new FormControl(null),
            email: new FormControl(null),
            gender: new FormControl("male"),
            });
        }
        FormControl(init state, [validators], [async validators])
   *The brackets, [], cause Angular to evaluate the right-hand side of the assignment as a dynamic expression. Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.
    Now we some how need to synchronize this form with HTML form, since right out angular doesnt know which of out TS control are related to which input codein our template code.
    ->[FormGroup] - hey angular please take my own created form, dont create one, dont take other.
        we need to bind our TS from to HTML template using property binding.
        <form [formGroup]="signupFrom">
            now the form in synchronized with TS from, but still we need to tell angular which ts 'control' should be connect to which 'input' in template code.
        To do this we get another directive i.e 'FormControlName'{it ll tell hey this is name of control in my TS code}
    Submitting reactive from:
        <form 
            [formGroup]="signupForm"
            (ngSubmit)="onSubmit()"
        >
        The diff with TD is that we dont need to get the form via that local reference
    formGroupName - directive to tell angular this is FormGroup inside FromGroup
        userData: new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
        }),
        wrap control input div inside new form control div and provide the name.
            <div
                formGroupName='userData'
            >
        provide the relative path  
            *ngIf="!signupForm.get('userData.username').valid

    FormArray
    ---------
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
    custom validators
    -----------------
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
    
    using error codes
    -----------------
        angular will add error codes->on the individual controls->on the errors object

        so we can take advantage of this by making use of it inside 'html' more relevant errors messages
            <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
            <span *ngIf="signupForm.get('userData.username').errors['required']">This name is required!</span>
    
    creating custom async validator
    ------------------------------
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
    2.Dont execute it simply pass the reference inside async validator array
        this.forbiddenEmails

    now closely watch the input field, it will change ng-invalid -> ng-pending -> ng-valid/invalid depending the promise value.

    status changes and value changes
    --------------------------------
    The form state actually we can track using status and value changes subscribers, we need to listen to them.
    For every key stroke it will send an updated object.
        this.signupForm.valueChanges.subscribe((value)=> {
            console.log(value);
        })
    statusChanges will give you, status of over all form, so that we analyze and react to it
        this.signupForm.statusChanges.subscribe((status)=> {
            console.log(status);
        })

    setting and patching value in reactive
    ------------------------------------
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

    reset
    -----
    this.signupForm.reset()

    creating your own validator class in diff fields
    ------------------------------------------------
    look at assignment solution video


    TD - shopping list form - implemented

    Reactive - recipe edit form - struck

Pipes
*****
    Pipes used for transforming output data in template
        ex  | uppercase, | date
    Parameterized Pipes
        By adding : infront of pipe with 'string' parameter, if there are multiple then separate each by :
        ex  date: 'fullDate' -> is should be on camelCase
    apply multiple pipes on same content
        order of execution is L->R
    Creating Custom pipes
    ---------------------
        1.create ts file with appropriate pipe name ex  shorten.pipe.ts
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
    *ngFor="let server of servers | filter:filteredStatus:'status'"

    pure and impure pipe
    -------------------
        Thankfully Angular will not rerun our pipe, whenever this data changes.
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

    async pipe
    -----------
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


        




























    

