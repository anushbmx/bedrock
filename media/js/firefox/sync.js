/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($) {
    'use strict';

    var $syncSignUp = $('#sync-sign-up');

    setTimeout(Mozilla.syncAnimation, 1000);

    // Firefox Account sign-in automation only available on Firefox 31 and above for desktop only.
    if (window.isFirefox() && !window.isFirefoxMobile() && window.getFirefoxMasterVersion() >= 31) {

        // only show the sign in button if user is not already using Sync
        Mozilla.UITour.getConfiguration('sync', function (config) {

            if (config.setup === false) {
                $syncSignUp.on('click', Mozilla.UITour.showFirefoxAccounts);
                $syncSignUp.show();
            }
        });
    }

})(window.jQuery);
