<template>
  <div id="app">
    <NavBar />
    <NewsList v-bind:items="items" />
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import NewsList from './components/NewsList';

export default {
  name: 'app',

  data() {
    return {
      items: [
        {
          title: 'Thank HN: You helped me get a new job',
          author: 'atum47',
          upvotes: 941,
          timestamp: '2019-08-09T05:18:28.802Z',
          commentCount: 357
        },
        {
          title:
            'Patch Critical Cryptographic Vulnerability in Microsoft Windows [pdf] (media.defense.gov)',
          author: 'Moral_',
          upvotes: 610,
          timestamp: '2019-07-05T01:40:47.265Z',
          commentCount: 344
        },
        {
          title:
            'DevDegree: Work at Shopify and get a free CS degree in parallel (devdegree.ca)',
          author: 'PandawanFr',
          upvotes: 190,
          timestamp: '2019-08-01T19:59:59.050Z',
          commentCount: 9
        },
        {
          title: 'Hipmunk Says Goodbye (hipmunk.com)',
          author: 'ienjoythebeach',
          upvotes: 516,
          timestamp: '2019-09-20T21:49:18.323Z',
          commentCount: 112
        },
        {
          title:
            'Apple can be sued by app developers “on a monopsony theory.” (npr.org)',
          author: 'moorage',
          upvotes: 36,
          timestamp: '2019-09-20T12:20:19.440Z',
          commentCount: 315
        },
        {
          title: 'Bug #915: Solved (nedbatchelder.com)',
          author: 'ingve',
          upvotes: 273,
          timestamp: '2019-06-05T00:20:03.958Z',
          commentCount: 134
        },
        {
          title: 'Show HN: A pure reference counting GC in Go (github.com)',
          author: 'sendilkumarn',
          upvotes: 17,
          timestamp: '2019-08-12T06:52:43.795Z',
          commentCount: 425
        },
        {
          title:
            'Stripe can make automatic LLCs but a wire transfer from Citi nearly ended me (abe-winter.github.io)',
          author: 'awinter-py',
          upvotes: 259,
          timestamp: '2019-07-10T19:43:22.348Z',
          commentCount: 143
        },
        {
          title:
            'Show HN: An open-source distributed graph database written in C++ (github.com)',
          author: 'jamie-vesoft',
          upvotes: 66,
          timestamp: '2019-07-30T19:21:12.041Z',
          commentCount: 156
        },
        {
          title: 'NOBUS (Nobody but Us) (en.wikipedia.org)',
          author: 'apsec112',
          upvotes: 107,
          timestamp: '2019-07-21T22:47:48.729Z',
          commentCount: 72
        },
        {
          title: 'Working for someone vs. doing your own thing (tik.dev)',
          author: 'thakobyan',
          upvotes: 242,
          timestamp: '2019-07-18T15:02:51.680Z',
          commentCount: 62
        },
        {
          title: 'Nobody Cares (2011) (a16z.com)',
          author: 'prostoalex',
          upvotes: 70,
          timestamp: '2019-08-22T12:13:36.419Z',
          commentCount: 301
        },
        {
          title:
            'Get Me Off Your Fucking Mailing List [pdf] (scs.stanford.edu)',
          author: 'af16090',
          upvotes: 83,
          timestamp: '2019-06-08T19:49:47.661Z',
          commentCount: 227
        },
        {
          title:
            'Reusable vs. Re-editable Code (2018) [pdf] (hal.archives-ouvertes.fr)',
          author: 'akkartik',
          upvotes: 16,
          timestamp: '2019-08-18T04:36:18.428Z',
          commentCount: 214
        },
        {
          title:
            'Thinking Fast and Slow, Deep Learning, and AI [video] (lexfridman.com)',
          author: 'AlanTuring',
          upvotes: 201,
          timestamp: '2019-05-31T15:56:19.346Z',
          commentCount: 114
        },
        {
          title:
            'How the U.S. military thinks about AI [audio] (changelog.com)',
          author: 'killjoywashere',
          upvotes: 32,
          timestamp: '2019-06-30T23:20:07.371Z',
          commentCount: 363
        },
        {
          title: 'How to Make a Raspberry Pi VPN Server (electromaker.io)',
          author: 'FoxMulder23',
          upvotes: 170,
          timestamp: '2019-08-02T21:40:47.105Z',
          commentCount: 253
        },
        {
          title: 'Real-Time Ray-Tracing in WebGPU (maierfelix.github.io)',
          author: 'Schampu',
          upvotes: 94,
          timestamp: '2019-08-18T05:25:49.419Z',
          commentCount: 367
        },
        {
          title:
            "Life's clockwork: Scientist shows how molecular engines keep us ticking (phys.org)",
          author: 'lelf',
          upvotes: 6,
          timestamp: '2019-07-23T20:32:41.394Z',
          commentCount: 229
        },
        {
          title: 'Video Gaming Will Take Over (matthewball.vc)',
          author: 'thesauri',
          upvotes: 125,
          timestamp: '2019-07-30T07:33:48.879Z',
          commentCount: 247
        }
      ]
    };
  },

  components: {
    NavBar,
    NewsList
  }
};
</script>

<style>
@import 'assets/normalize.css';
@import 'assets/styles.css';
</style>
