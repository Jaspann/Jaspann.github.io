// Source https://discourse.gohugo.io/t/replace-hugos-inbuilt-google-analytics-template-with-minimal-analytics-ga4/43704

import params from "@params";

window.minimalAnalytics = {
  trackingId: params.trackingId,
  autoTrack: true, // <-- init tracking
  defineGlobal: true,
};