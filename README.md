<h1>TYPO3 Extension Gedankenfolger Event<br/>(gedankenfolger-event)</h1>
<p>
    Compact event management extension using Content Blocks (Record Types + Content Elements), Site Set, Bootstrap CSS/SCSS, and vanilla JS.
    Requires TYPO3 14.
</p>
<p>
    First of all many thanks to the hole TYPO3 community, all supporters of TYPO3.
    Especially to <a href="https://typo3.org/" target="_blank">TYPO3-Team</a> and <a href="https://www.gedankenfolger.de/" target="_blank">Gedankenfolger GmbH</a>.
</p>

> **TYPO3 13 support** is maintained on the [`13.x`](../../tree/13.x) branch.

<h3>
    Contents of this file
</h3>
<ol>
    <li>
        <a href="#features">Features</a>
    </li>
    <li>
        <a href="#install">Install</a>
    </li>
    <li>
        <a href="#usage">Usage</a>
    </li>
    <li>
        <a href="#options">Options</a>
    </li>
    <li>
        <a href="#template-overrides">Template Overrides</a>
    </li>
    <li>
        <a href="#changelog">Changelog</a>
    </li>
    <li>
        <a href="#acknowledgements">Acknowledgements</a>
    </li>
    <li>
        <a href="#notes">Notes</a>
    </li>
    <li>
        <a href="#noticetrademark">Notice on Logo / Trademark Use</a>
    </li>
</ol>
<hr/>
<h3 id="features">
    Features:
</h3>
<ol>
    <li>
        Event record type with fields for title, dates (from/to), location, hall, stand, image, teaser, and rich text description
    </li>
    <li>
        Three event categories: Fairs, Conferences, and Webinars with conditional fields (hall/stand for fairs)
    </li>
    <li>
        Event content element: select events from a storage folder with category filtering
    </li>
    <li>
        Multiple layout options: List, Grid (2-column), Grid (3-column), and Grid (4-column)
    </li>
    <li>
        Optional ICS download ("Add to calendar") per event
    </li>
    <li>
        Bootstrap CSS/SCSS integration with flexible loading options
    </li>
</ol>

<h3 id="install">
    Install
</h3>

<h4>1. Require via Composer</h4>

```bash
composer require gedankenfolger/gedankenfolger-event
```

Activate the extension in the TYPO3 backend (Extensions module) if not done automatically.

<h4>2. Include TypoScript via Site Set</h4>

Add the set to your site configuration:

```yaml
# config/sites/my-site/config.yaml
sets:
  - gedankenfolger/gedankenfolger-event
```

<h4>3. (Optional) SCSS compilation</h4>

Only required when <code>GedankenfolgerEvent.cssmode</code> is set to <code>scss_bootstrap</code>, see <a href="#options">Options</a> below.

```bash
composer require wapplersystems/ws-scss
```

<h3 id="usage">
    Usage
</h3>
<ol>
    <li>
        Create event records under the record type "Event" in a storage folder (sysfolder).
    </li>
    <li>
        Fill in the event details:
        <ul>
            <li><strong>Title</strong>: Name of the event</li>
            <li><strong>Date from/to</strong>: Event duration</li>
            <li><strong>Location</strong>: Where the event takes place</li>
            <li><strong>Category</strong>: Choose between Fairs, Conferences, or Webinar</li>
            <li><strong>Hall/Stand</strong>: Additional fields for fairs</li>
            <li><strong>Image</strong>: Event image (jpg, jpeg, png, webp)</li>
            <li><strong>Teaser</strong>: Short description</li>
            <li><strong>Description</strong>: Full rich text description</li>
        </ul>
    </li>
    <li>
        Insert the "Event" content element on your page.
    </li>
    <li>
        Select the storage folder containing your events via "Events folder".
    </li>
    <li>
        Configure display options (layout, category filter, etc.).
    </li>
</ol>

<h3 id="options">
    Options
</h3>

<h4>Content Element Options</h4>
<ul>
  <li><strong>Events folder</strong>: Select the sysfolder containing your event records.</li>
  <li><strong>Category filter</strong>: Show all events or filter by specific category (Fairs, Conferences, Webinar).</li>
  <li><strong>Layout</strong>: Choose between List, Grid (2 columns), Grid (3 columns), or Grid (4 columns).</li>
  <li><strong>ICS download</strong>: When enabled, shows an "Add to calendar" link on each event card.</li>
</ul>

<h4>Site Set Settings</h4>
<p>Configure in your site settings (<code>config/sites/[yoursite]/settings.yaml</code>):</p>
<ul>
  <li>
    <strong>GedankenfolgerEvent.cssmode</strong>: Controls which CSS is loaded. Possible values:
    <ul>
      <li><code>none</code> (default): No CSS is loaded by the extension. Use this when your sitepackage already loads Bootstrap.</li>
      <li><code>css_bootstrap</code>: Load pre-compiled Bootstrap + event CSS. No additional extensions required.</li>
      <li><code>scss_bootstrap</code>: Compile Bootstrap + event SCSS on the fly. Requires <code>EXT:ws_scss</code>.</li>
    </ul>
  </li>
</ul>

<h4>Event Categories</h4>
<ul>
  <li><strong>Fairs</strong>: Trade shows and exhibitions with additional fields for hall and stand numbers.</li>
  <li><strong>Conferences</strong>: Professional conferences and symposiums.</li>
  <li><strong>Webinar</strong>: Online events and webinars.</li>
</ul>

<h3 id="template-overrides">
    Template Overrides
</h3>

The template can be overridden from your site package without modifying the extension.

<h4>Template override</h4>

Set `templateRootPaths.100` directly in your sitepackage TypoScript, pointing to a directory that contains your own `frontend.html`. Content Blocks resolves template root paths by descending index, so index `100` is checked before the extension's own index `20` — if your `frontend.html` exists there, it is used; otherwise the extension default applies.

```typoscript
tt_content.gedankenfolger_event {
    templateRootPaths {
        100 = EXT:my_sitepackage/Resources/Private/Extensions/GedankenfolgerEvent/
    }
}
```

**Available template:**
- `frontend.html` – main content element template

> **Note:** `file = EXT:...` has no effect for Content Blocks v2 content elements — `templateName` and `templateRootPaths` are always set by Content Blocks itself, and `FluidTemplateContentObject` only evaluates `file` when neither is present.

<h3 id="changelog">
    Changelog
</h3>
<p>
    See <a href="CHANGELOG.md">CHANGELOG.md</a> — generated with <a href="https://git-cliff.org">git-cliff</a> from Conventional Commits.
</p>

<h3 id="acknowledgements">
    Acknowledgements
</h3>
<p>
    This extension builds on the following open source projects:
</p>
<ul>
    <li><a href="https://github.com/FriendsOfTYPO3/content-blocks" target="_blank">TYPO3 Content Blocks</a></li>
    <li><a href="https://getbootstrap.com/" target="_blank">Bootstrap Framework</a></li>
    <li><a href="https://github.com/WapplerSystems/ws_scss" target="_blank">SASS Compiler for TYPO3</a></li>
</ul>

<h3 id="notes">
    Notes
</h3>
<ul>
  <li>Events are stored as custom records in the table <code>tx_gedankenfolger_event</code>.</li>
  <li>The extension uses Content Blocks for easy customization and extension.</li>
  <li>Date formatting and display can be customized via Fluid templates.</li>
  <li>Images support common web formats: jpg, jpeg, png, and webp.</li>
</ul>

<h3 id="noticetrademark">
    Notice on Logo / Trademark Use
</h3>
<p>
The logo used in this extension is protected by copyright and, where applicable, trademark law and remains the exclusive property of Gedankenfolger GmbH.

Use of the logo is only permitted in the form provided here. Any changes, modifications, or adaptations of the logo, as well as its use in other projects, applications, or contexts, require the prior written consent of Gedankenfolger GmbH.

In forks, derivatives, or further developments of this extension, the logo may only be used if explicit consent has been granted by Gedankenfolger GmbH. Otherwise, the logo must be removed or replaced with an own, non-protected logo.

All other logos and icons bundled with this extension are either subject to the TYPO3 licensing terms (The MIT License (MIT), see https://typo3.org) or are in the public domain.

For full license terms covering all graphic assets, see <a href="LICENSE-ICONS">LICENSE-ICONS</a>.
</p>
