# EditHarbor 1.0.5 branding validation — 19 October 2026

The owner explicitly chose editharbor everywhere, including the installed folder, ZIP and text domain. This supersedes release 1.0.4's old-slug packaging choice. The source folder and main file already used the selected brand. The customer-facing Free name is **EditHarbor – Order History & Guard for WooCommerce**; Pro is **EditHarbor Pro – Order History & Guard for WooCommerce**.

Free 1.0.5 is rooted at editharbor/ and uses editharbor.php, the editharbor translation domain in its header and all 320 gettext arguments, and languages/editharbor.pot with matching X-Domain. The separate Pro 1.0.3 package uses editharbor-pro/, editharbor-pro.php and the editharbor-pro text domain, and requires WooCommerce plus editharbor Free 1.0.5. The temporary dependency alias added in 1.0.4 is removed.

**WordPress.org has not confirmed the requested editharbor reservation.** The latest review still names order-edit-guard-for-woocommerce. Plugin Check was explicitly run against the requested editharbor slug; that pass does not resolve the server-side reservation. Send SLUG-CHANGE-REQUEST.txt in the existing thread and wait for confirmation before resubmitting the branded package. No email or WordPress.org upload was sent by this task.

The final ZIPs were extracted and tested in isolated WordPress 7.1.3 / WooCommerce 11.1.2 / PHP 8.3.6 / MySQL sites with WP_DEBUG enabled. Prefixes were oegqa_td104_ for the integration fixture site and oegqa_edhb105_ for the fresh Free install. No live store activation states, customer orders or schemas were changed by testing.

- Plugin Check 2.1.0, complete run with --slug=editharbor: no errors found; no checks or finding codes excluded.
- Fresh Free install: successful activation, audit schema created, named sanitizer clamps and persists settings, an existing order edit persists with the correct before/after audit. Final activation/settings/audit debug log is empty.
- Workspace AJAX save: actual callback returns success JSON and persists page size/timezone; debug log remains empty.
- Actual MO catalog translates the real workspace Overview label under editharbor. WordPress resolves Pro's editharbor dependency, and both service graphs boot. Pro safely remains unbooted if Free is skipped.
- Final Free/Pro regression suite: 91 tests / 443 assertions in legacy order storage; 91 tests / 443 assertions in HPOS. Each storage mode was explicitly confirmed. Tests cover capture settings, reasons, warnings, locks, approvals, restore, privacy, notifications, SQL payloads and escaped audit output.
- Runtime PHP syntax and Git whitespace checks pass. Source comparison confirms includes/ changed only translation-domain literals. All archive file bytes match the allowlisted source files. Free has 30 files, Pro 28; development files and credentials are excluded.

Free SHA-256: fd99762833d31e9f47720bbfa9163d3dd739aeaf31934cc6e78cdc5ea5c22d3f.
Pro SHA-256: 342a4f73fe730ac1c5b1b4218e7ad983143a616eaed101d73c022acbf0c4ce75.
The separate directory-assets archive contains 12 PNGs and is not the plugin installer ZIP.

WooCommerce's initial dependency setup emitted its known early woocommerce translation notice before Free activation. That setup log was recorded separately. Subsequent Free activation/settings/audit tests leave an empty debug log without suppressing translation notices.

Current Free ZIP: /var/www/html/editharbor-1.0.5.zip, also copied into wp-content/plugins. Earlier same-day old-slug ZIPs were moved to /var/www/html/editharbor-releases/archive to avoid selecting the wrong artifact. Historical changelogs and legacy migration identifiers remain for compatibility. Stored settings, audit identifiers and history remain intact.

This targeted release does not claim full Pro commercial acceptance, a full PHPCS/PHPStan run, or WordPress.org approval. The owner still needs to send the slug-change request and upload the branded Free ZIP after confirmation.
