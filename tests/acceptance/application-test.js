/* eslint-disable qunit/require-expect */

import QUnit, { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'example/tests/helpers';

window.__errorHandler__;

window.addEventListener('unhandledrejection', errorHandler);

function setupOnError(handler) {
  window.__errorHandler__ = handler;
}

function resetOnError() {
  window.__errorHandler__ = undefined;
}

function errorHandler(event) {
  let whatWasThrown = event.reason;

  let handler = window.__errorHandler__;

  if (handler?.(whatWasThrown)) {
    QUnit.assert.ok(true, `received an unhandledrejection`);
    event.preventDefault();
    return false;
  }

  QUnit.onUncaughtException(event.reason);
}

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    resetOnError();
  });

  test('unhappy path', async function (assert) {
    assert.expect(3); // URL, DOM, Error
    setupOnError((error) => error.message.match('failed'));

    await visit('/');
    assert.strictEqual(currentURL(), '/');

    await click('button');
    await new Promise((r) => setTimeout(r, 2000));

    assert.dom('.flash-messages').hasText('failed');
  });

  test('unhappy path (without unhandledrejection)', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    await click('button');
    await new Promise((r) => setTimeout(r, 2000));

    assert.dom('.flash-messages').hasText('failed');
  });
});
