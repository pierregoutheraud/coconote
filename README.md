# Install

`yarn`

# Dev

`yarn start`

# Build

`yarn build`

# How does it work ?

## Storage

When state is updated on a tab, the saveMiddleware is executed and the state is saved in google sync with the attribute `from` which contains the `tabId` (example: 2345 or "popup") and the timestamp.
It needs to have the timestamp so that the state changes everytime and we can detect in the google sync listener.
The google sync listener (`chrome.storage.onChanged.addListener(handleChanged)`) listens for updates and we decompress `changes` object and check if the change is coming from the same tabId or not.
If the change is coming from another tab, we render the whole app. (I tried updating only the state by calling an action updateState but the Editor would not render because of how it works right now.)
