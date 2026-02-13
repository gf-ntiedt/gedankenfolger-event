<h1>TYPO3 Extension Gedankenfolger Event<br/>(gedankenfolger-event)</h1>
<p>
    Compact event management extension using Content Blocks (Record Types + Content Elements), Site Set, Bootstrap CSS/SCSS, and vanilla JS.
</p>
<p>
    First of all many thanks to the hole TYPO3 community, all supporters of TYPO3.
    Especially to <a href="https://typo3.org/" target="_blank">TYPO3-Team</a> and <a href="https://www.gedankenfolger.de/" target="_blank">Gedankenfolger GmbH</a>.
</p>

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
        Multiple layout options: Grid (3-column), Grid (2-column), and List view
    </li>
    <li>
        "Only months with events" toggle to optimize display
    </li>
    <li>
        Bootstrap CSS/SCSS integration with flexible loading options
    </li>
</ol>

<h3 id="install">
    Install
</h3>
<ol>
    <li>
        Require in Composer and activate the extension.
    </li>
    <li>
        Import the site set "Gedankenfolger Event" in your site configuration.
    </li>
    <li>
        (Optional) Ensure <code>ws_scss</code> is installed if you want to use SCSS compilation.
    </li>
</ol>

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
  <li><strong>Layout</strong>: Choose between Grid (3 columns), Grid (2 columns), or List view.</li>
  <li><strong>Only months with events</strong>: When enabled, only displays months that contain events.</li>
</ul>

<h4>Site Set Settings</h4>
<p>Configure in your site settings (<code>config/sites/[yoursite]/settings.yaml</code>):</p>
<ul>
  <li><strong>GedankenfolgerEvent.bootstrapcss</strong>: Load Bootstrap CSS (includes Bootstrap core).</li>
  <li><strong>GedankenfolgerEvent.bootstrapscss</strong>: Load Bootstrap SCSS and compile to CSS (requires <code>ws_scss</code> extension).</li>
  <li><strong>GedankenfolgerEvent.gfsitepackagescss</strong>: Load SCSS with Gedankenfolger Sitepackage integration (requires <code>ws_scss</code> extension).</li>
</ul>

<h4>Event Categories</h4>
<ul>
  <li><strong>Fairs</strong>: Trade shows and exhibitions with additional fields for hall and stand numbers.</li>
  <li><strong>Conferences</strong>: Professional conferences and symposiums.</li>
  <li><strong>Webinar</strong>: Online events and webinars.</li>
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
</p>
