import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig{
  constructor(router){
    this.router = router;
  }
  configure(config1, router){
    let theAppRouterConfig = function(config){
      config.title = 'Web Jam LLC';
      config.options.pushState = true;
      config.options.root = '/';
      config.addPipelineStep('authorize', AuthorizeStep);//Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home' },
        { route: 'samples', name: 'samples', moduleId: './samples', nav: true, title: 'Samples' },
        { route: 'band', name: 'band-router', moduleId: './band-router', nav: false, title: 'Band' }
        // { route: 'bookshelf', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Bookshelf'},
        // { route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login'},
        // { route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true}

      ]);
    };

    this.router.configure(theAppRouterConfig);
  }
}
