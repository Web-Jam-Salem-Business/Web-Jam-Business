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
      config.title = 'Our Hands and Feet';
      config.addPipelineStep('authorize', AuthorizeStep);//Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'About' },
        { route: 'news', name: 'news', moduleId: './news', nav: true, title: 'News' },
        { route: 'bookshelf', name: 'bookshelf', moduleId: './bookshelf', nav: true, title: 'Bookshelf'},
        { route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login'},
        { route: 'dashboard', name: 'dashboard-router', moduleId: './dashboard-router', nav: false, title: 'Dashboard', auth: true}
        
      ]);
    };
    
    this.router.configure(theAppRouterConfig);
  }
}
