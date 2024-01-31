import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class FlashMessageService extends Service {
  queue = tracked([]);

  add(type, text) {
    this.queue.push({ type, text });
  }
}
