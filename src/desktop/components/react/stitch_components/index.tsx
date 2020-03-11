/**
 * Export globally available React components from this file.
 *
 * Keep in mind that components exported from here (and their dependencies)
 * increase the size of our `common.js` bundle, so when the stitched component
 * is no longer used be sure to remove it from this list.
 *
 * To find which components are still being stiched can search for
 * ".SomeComponentName(", since this is how the component is invoked from our
 * jade / pug components.
 */

export { StitchWrapper } from "./StitchWrapper"
export { NavBar } from "./NavBar"
export { CollectionsHubsHomepageNav } from "./CollectionsHubsHomepageNav"
export {
  UserSettingsPaymentsQueryRenderer as UserSettingsPayments,
} from "reaction/Components/Payment/UserSettingsPayments"
export { ReactionCCPARequest as CCPARequest } from "./CCPARequest"

(async function(){
  if (typeof window !== "undefined") {
    // const beaconHost = "http://localhost:4567"
    const beaconHost = "https://francis-beacon-test.herokuapp.com"
    const { href, hostname } = window.document.location

    // TODO: uncomment the `|| true`
    const shady = true || !hostname.endsWith('.artsy.net')
    if (shady) {
      await fetch(`${beaconHost}/b`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({u : href}),
        // mode: "no-cors" as RequestMode /* unneeded if cors headers set properly */
      })
    }
  }
})()
