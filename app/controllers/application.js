import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { resolve } from 'rsvp';
import { run } from '@ember/runloop';

export default class ApplicationController extends Controller {
  @service('my-service') myService;
  @service('flash-message') flashMessageService;

  // --------- Want to write this ---------

  // @action
  // async doSomething() {
  //   await this.myService.doSomething();
  // }

  // ---------  But have to write this ---------

  @action
  doSomething() {
    return resolve(this.myService.doSomething());
  }
}
