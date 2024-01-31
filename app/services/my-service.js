import Service, { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';

export default class MyServiceService extends Service {
  @service('flash-message') flashMessageService;

  async doSomething() {
    try {
      await this._load();
    } catch (error) {
      this.flashMessageService.add('error', error.message);
      throw error;
    }
  }

  @waitFor
  _load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('failed'));
      }, 1000);
    });
  }
}
