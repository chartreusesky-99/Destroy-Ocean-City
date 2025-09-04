# destroyoceancity frontend

Sometimes you must destroy what you love to really save it.

See the current production build at [Destroy Ocean City](https://destroyocean.city).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Development server

To start a local development server, run the following in /angular:

```bash
npm install
```
This command installs necessary node packages for developing and building the Angular application.

```bash
npm start
```
This command launches the Angular App in development mode.

Once the server is running, open your browser and navigate to `http://localhost:4400/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project, run the following in /angular:

```bash
ng build --configuration production
```

This will compile the project and store the build artifacts in the `dist/destroyOceanCity` directory. Note that automatic deployments do not use the main branch or the /angular/dist directory, instead favoring the /angular-deploy directory.

## Automatic Deployment with Github Connect

If this is the first time you are using the deployment script, you must first authorize it by running the following in /angular:

```bash
chmod +x deploy.sh
```

Then, you can use the following command within /angular to automate pushing builds to the dist branch and automatic deployment:

```bash
./deploy.sh
```

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For references to Angular 20, visit the [Angular 20 Reference](https://angular.dev) guide.

For help with Bootstrap 4.1 utilities, visit [Bootstrap Getting Started](https://getbootstrap.com/docs/4.1/getting-started/introduction/).

