/**
 * feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /**
     * This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /**
       * This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the page?
       */
      it("are defined", () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /**
       * It tests to make sure that the each feed in the allFeeds
       * object has a URL defined and that URL isn't empty.
       */
      it("URL is defined", () => {
        allFeeds.forEach(feed => {
          console.log(feed);
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      /* It tests to make sure that the each feed in the allFeeds  
        * object has a name defined and that name isn't empty.
        */
      it("name is defined", () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    /* This is a new test suite named "The menu" */
    describe("The menu", () => {
      /* It tests to ensure that menu element is hidden by default. */
      it("hidden by default", () => {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });

      /* It tests to ensure that the menu changes visibility when the menu icon is clicked. */
      it("visibility toggle", () => {
        $(".menu-icon-link").click();
        expect($("body").hasClass("menu-hidden")).toBe(false);

        $(".menu-icon-link").click();
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    /* This a new test suite named "Initial Entries" */
    describe("Initial Entries", () => {
      /**
       * Test to ensure that when the loadFeed function (asynchronous) is called,
       * there's at least a single ".entry" element with the ".feed" container.
       */

      beforeEach(done => {
        loadFeed(0, done);
      });

      it("entries loaded", () => {
        expect($(".feed .entry").length > 0).toBe(true);
      });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe("New Feed Selection", () => {
      /**
       * Test to ensure that the content actually changes when a
       * new feed is loaded by the loadFeed function (asynchronous).
       */

      let initialFirstFeedEntryURL;

      beforeEach(done => {
        loadFeed(0, () => {
          initialFirstFeedEntryURL = $(".entry-link:first-child").attr("href");

          loadFeed(1, done);
        });
      });

      it("content changes", () => {
        expect($(".entry-link:first-child").attr("href")).not.toBe(
          initialFirstFeedEntryURL
        );
      });
    });
  })()
);
