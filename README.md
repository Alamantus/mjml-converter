# MJML Converter

This is an extremely simple app that uses [Electron](https://electron.atom.io/)
to create an extremely simple desktop application that converts an
[MJML](https://mjml.io) file into an HTML file and nothing else.

## Usage

Literally just launch the app, specify an MJML file and click the button. It'll
prompt you where you want to save the HTML file and what to name it, and then
it saves it where you specified.

## Building the App

Install all the dependencies using [Yarn](https://yarnpkg.com/en/) like this from
Powershell:

```
yarn
```

Yeah, that's it. Yarn will install all the dependencies the project needs. (You
_could_ use NPM instead, but Yarn manages the folders in `node_modules/` much more
efficiently. You'll thank yourself later.)

Then to test the app, just use this command:

```
yarn test
```

The app should pop right up and be usable.

To actually build the thing into an executable application, use this command:

```
yarn build
```

If it complains that the output dir already exists, either delete the directory
or use this command instead:

```
yarn rebuild
```
