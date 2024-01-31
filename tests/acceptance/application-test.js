/* eslint-disable qunit/require-expect */

import { module, test } from 'qunit';
import { visit, setupOnerror, resetOnerror, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'example/tests/helpers';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('unhappy path', async function (assert) {
    assert.expect(1);

    setupOnerror((error) => {
      if (error.message.match('failed')) {
        // Allow this intended error, we are testing a this specific
        // failure scenario, and so we know it will happen,
        // but we don't want the test to fail.
        return;
      }

      // Re-throw so we don't accidentally miss anything
      throw error;
    });

    await visit('/');
    await click('button');

    assert.dom('.flash-messages').hasText('failed');
  });
});
