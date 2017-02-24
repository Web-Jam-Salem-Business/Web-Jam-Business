import {Dashboard} from '../../src/dashboard-routes/dashboard';
import {Container} from "aurelia-dependency-injection";
import {json} from "aurelia-fetch-client";
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

class HttpMock {
  // this one catches the ajax and then resolves a custom json data.
  // real api calls will have more methods.
  constructor(data) {
    this.user = data || {name: 'John Fitzgerald', age: 20, userType: 'Charity'};
  }
  status = 500;
  headers = {accept: 'application/json', method: '', url: ''}
  fetch(url, obj) {
    this.headers.url = url;
    this.headers.method = obj ? obj.method : 'GET';
    if (obj && obj.method === 'put') {
      this.user = obj.body;
    }
    this.status = 200;
    return Promise.resolve({
      Headers: this.headers,
      json: () => Promise.resolve(this.user)
    });
  }
}

class AuthServiceMock {
  // basic auth functions.
  authenticated = false;
  
  isAuthenticated() {
    return this.authenticated;
  }
  authenticate() {
    this.authenticated = true;
    return Promise.resolve('user is authenticated');
  }
  setToken(token) {
    this.token = token;
    this.authenticate();
  }
  getTokenPayload() {
    return {sub: this.token};
  }
}

class RouterMock {
  map(routes) {
    return this.routes instanceof Array ? this.routes : [this.routes];
  }
  navigate(route) {
    return route;
  }
}

describe('the Dashboard Module', () => {
  let dashboard;
  
  describe('Dashboard DI', () => {
    let auth;
    let http;
    let token = 'mhioj23yr675843ho12yv9852vbbjeywouitryhrcyqo7t89vu';
    beforeEach(() => {
      auth = new AuthServiceMock();
      http = new HttpMock();
      dashboard = new Dashboard(auth, http, null, new RouterMock);
      auth.setToken(token);
    });
    
    it('should authenticate and return feedback', done =>{
      dashboard.auth.authenticate().then(data => {
        expect(data).toContain('authenticated');
      }).catch((e) => {
        expect(e).toThrow();
      });
      done();
    });
    
    it('should check if the user is authenticated', done => {
      expect(dashboard.auth.isAuthenticated()).toBeTruthy();
      done();
    });
    
    it('should fetch some json data after api call', done => {
      dashboard.httpClient.fetch('/some/data').then(data => {
        expect(data).toBeDefined(); // check if the data is defined.
      }, o => {
        // else catch the reject.
        expect(o).toBeUndefined();
      });
      done();
    });
    
    it('should expect change in http status after getUser call', done => {
      dashboard.getUser();
      expect(http.status).toBe(200);
      done();
    });
    
    it('should confirm 200 http status after updateUser call', done => {
      dashboard.getUser();
      setTimeout(function() {
        dashboard.updateUser();
        expect(http.status).toBe(200);
        done();
      }, 5);
    });
    
    it('should return false for configured', done => {
      dashboard.getUser();
      setTimeout(function() {
        expect(dashboard.configured()).toBeFalsy();
        done();
      }, 5);
    });
    
    it('should expect change in http status after activate call', done => {
      http = new HttpMock({name: 'Iddris Elba', age: 22, userType: 'Volunteer'});
      auth = new AuthServiceMock();
      dashboard = new Dashboard(auth, http, null, new RouterMock);
      auth.setToken(token);
      dashboard.activate();
      setTimeout(function() {
        expect(http.status).toBe(200);
        done();
      }, 10);
    });
    
    it('should confirm route by returning the currently navigated route', done => {
      expect(dashboard.router.navigate(dashboard.types[0])).toBe('Charity');
      expect(dashboard.router.navigate(dashboard.types[1])).toBe('Volunteer');
      done();
    });
  });
  
  describe('Staging Dashboard', () => {
    beforeEach(() => {
      dashboard = StageComponent
      .withResources('src/dashboard')
      .inView('<dashboard></dashboard>')
      .boundTo({user: {name: 'John Fitzgerald'}});
    });
    it('staging the dashboard', done => {
      // let strap = dashboard.create(bootstrap)
      // custom element incorporated. must be pure elements.
      // dashboard.create(bootstrap).then(() => {
      // console.log(document);
      // }).catch(e => { console.log(e.toString()); } )
      done();
    });
  });
});
