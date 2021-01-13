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
-model is just a ts file, which represents blueprint of a object we create[like a bean in java]
-it will not contain @Model decorator