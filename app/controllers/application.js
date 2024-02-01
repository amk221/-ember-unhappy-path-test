import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service('my-service') myService;
  @service('flash-message') flashMessageService;

  @action
  async doSomething() {
    await this.myService.doSomething();
  }
}
