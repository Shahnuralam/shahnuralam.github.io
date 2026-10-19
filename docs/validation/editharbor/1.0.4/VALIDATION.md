# EditHarbor 1.0.4 review validation — 19 October 2026

Review: R order-edit-guard-for-woocommerce/shahnuralam025/8Oct26/T3 19Oct26/4.2 (P0TDX382547HGN).

The pending slug is still `order-edit-guard-for-woocommerce`. This release fixes the reported mismatch against that reservation rather than depending on a reviewer rename. The display name and product website remain EditHarbor. Earlier 1.0.3 slug-change advice is superseded by the current resubmission guide.

All 320 Free gettext domain arguments, the plugin header, POT filename/X-Domain/support URL and ZIP root now use the reserved slug. A source comparison confirms that changes under includes/ are exclusively domain literal substitutions; stored identifiers and historical event values are unchanged. The branded Git checkout remains separate from the directory packaging slug.

Final package: `order-edit-guard-for-woocommerce-1.0.4.zip`, 30 runtime files, SHA-256 `3f29fc22f4f8060eccc95fdf97bee9e6d69cfe6a34f562a0435ad3f567db5c5a`. All archive bytes match the allowlisted source files. No Pro runtime, development tools, tests, Git metadata, QA configuration or credentials are included. The separate directory-assets archive contains 12 PNGs.

Validation used WordPress 7.1.3, WooCommerce 11.1.2, PHP 8.3.6, MySQL and WP_DEBUG=true in isolated oegqa_td104_ and oegqa_td104_clean_ installations. Tests loaded the extracted final ZIPs. No live store activation, orders or schemas were changed by testing.

- Plugin Check 2.1.0: complete run with explicit `--slug=order-edit-guard-for-woocommerce`, no errors found. No checks or finding codes were excluded.
- Free-only clean install: activation succeeds; three audit tables exist; the registered named sanitizer clamps and persists settings; an existing order edit persists with the correct before/after phone audit. Debug log is empty during the final Free activation/settings/audit checks.
- Actual workspace AJAX save callback returns success JSON, persists page size/timezone and leaves the debug log empty.
- An actual MO catalog loaded under the canonical domain translates the real workspace Overview label. The canonical packaged layout and branded development layout both boot Free and Pro and satisfy WordPress dependency resolution.
- With Free inactive, WordPress refuses Pro activation. With Free skipped during bootstrap, Pro safely remains unbooted.
- Final Free/Pro suites: 91 tests / 443 assertions with legacy order storage and again 91 tests / 443 assertions with HPOS. Storage modes were confirmed before testing. Existing coverage includes capture settings, reasons, paid-order warnings, locks, approvals, restore, privacy, notifications, SQL payload filters and escaped audit output.
- PHP syntax checks pass for both plugin runtimes; Git whitespace checks pass.

Pro 1.0.2 requires Free 1.0.4 and declares `order-edit-guard-for-woocommerce` in Requires Plugins. The active Free checkout maps that slug to `editharbor` only when loaded from that branded development folder. Pro keeps its separate package/domain and runtime dependency guard.

WooCommerce's first dependency initialization produces its own early woocommerce translation notice before Free activation. That setup phase was recorded separately; subsequent Free checks do not suppress translation notices and have an empty debug log.

This targeted release does not claim full Pro commercial-spec acceptance or WordPress.org approval. No full PHPCS/PHPStan run is claimed. No reviewer email or WordPress.org upload was sent. Upload the Free ZIP to the existing pending review, then use REVIEW-REPLY.txt in the same email thread.
