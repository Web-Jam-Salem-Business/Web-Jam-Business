export class BandRouter {
  heading = 'Band Router';
  configureRouter(config, router) {
    config.map([
      { route: '', name: 'band', moduleId: './band-routes/band', nav: false, title: 'Band'},
      { route: 'buymusic', name: 'buymusic', moduleId: './band-routes/buymusic', nav: false, title: 'Buy Music'},
      { route: 'missionmusic', name: 'missionmusic', moduleId: './band-routes/missionmusic', nav: false, title: 'Mission Music'},
      { route: 'originalsongs', name: 'originalsongs', moduleId: './band-routes/originalsongs', nav: false, title: 'Original Songs'},
      { route: 'pubsongs', name: 'pubsongs', moduleId: './band-routes/pubsongs', nav: false, title: 'Pub Songs'}
    ]);
    this.router = router;
  }
}
