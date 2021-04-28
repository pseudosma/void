# Void

A dark, dystopian Hugo theme for sci-fi and horror writers.

## Words of caution

* Void uses motion effects that can be turned off in the menu, by specifying a **"?pause"** search parameter at the end of the url, or with your browser's "Prefer Reduced Motion" settings.

* Though this theme was designed to be highly compatible with all devices, it makes heavy use of SVG and Javascript elements. Please view it on a browser that supports both.

:warning: Void must be built using a version of Hugo greater than 0.79.0.

## Usage

### Getting started

  1. [Install hugo](https://gohugo.io/getting-started/installing/).
  1. Create a new hugo project with the following command: `hugo new site yourSiteName`
  1. Void was designed to be used as a git submodule, so navigate to your *themes* folder and install with the following command: `git clone https://github.com/pseudosma/void.git`
  1. Move the *contents* folder and *config.toml* from the *archetypes* folder to your main directory
  1. Run `hugo server`, then navigate to *localhost:1313* in your browser to test.

### Changing the index's title, subtitle, and navigation text

Parts of the index can be changed by editing these fields in the config.toml file.

```toml
title = "void"
baseURL = "http://localhost:1313/"

[params]
  subtitle = "is this from the future or the past?"
  navigationText = "enter"
```

:warning: It is very important to set the *baseUrl* value to the root of your site because references to the CSS and javascript files are built from  absolute paths based on this value. If you're testing a published site locally, 

### Adding a New Story

  1. Add a new entry to config.toml with the name for your story
      * All stories must include an *identifier* with a simplified version of the name and an extra *description* parameter.

      * The *identifier* should match the markdown file name exactly; this value is used for building links.

   ```toml
     [[menu.main]]
        name = "New Story"
        identifier = "new_story"
        weight = 100
        [menu.main.params]
            description = "..."
   ```

  2. Create a new markdown file under you site's **./content** that matches the *identifier*.

  3. Add a title and copyright to your markdown file and start writing.

  ```markdown
  ---
    title: "New Story"
    copyright: "2021, me"
  ---

    # Write stuff

    ...
    ...
  ```

### Adding Chapters

  1. Adding a chapter is similar to adding a new story, except that each chapter specifies the story's *identifier* as its *parent*.
      * Descriptions are optional for chapters.
      * The *weight* for this config entry should match the chapter number.
      * It's not necessary to include a *name* on a chapter, as these will not be displayed.

   ```toml
     [[menu.main]]
        identifier = "new_story_1"
        parent = "new_story"
        url = "new_story/"
        weight = 1
        [menu.main.params]
            description = "..."
   ```
  2. Create a new chapter's folder that matches the *url* and add a single markdown file in it that matches the *identifier*.

  3. Add a title and copyright to your markdown file and start writing.

:warning: All links to stories and chapters combine the *url* and the *identifer* to build the path. Use the *url*, ending in a slash, to specify any parent folders and the *identifier* to specify the file name .

## Further Customization

### Adding more color palettes

The palettes used in Void are described by an array of simple objects in **scripts/common.js**.

```javascript
const palette = [
    {f: "#aaafb9", bg: "none"},
    {f: "#FFF", bg: "none"},
    {f: "#000", bg: "#FFF"},
];
```

Simply add more entries for more color choices, or change the existing ones. Text maps to the *f* value and backgroundColor maps to the *bg* value.


:warning: The actual site files reference the minified version of _common.js_, so you must re-minify the file after changes are made.

### Development Workflow

#### Making revisions to the theme

These instructions assume that you already have node.js installed and have a passing familiarity with javascript development:

  1. Copy the git repository
  1. Make the appropriate file changes
  1. Minify js and css files via webpack by issuing `npm run build` while in Void's root folder
  1. Copy the entire folder for Void into your *themes* folder

## Acknowledgments

A big thank you for inspiring part of the look of this theme, particularly text animations, goes out to [Tee Diang](https://github.com/acupoftee).



