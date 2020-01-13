# Lesson 1

Let's start creating our actual project. We need to first make sure we have all the requirements stated in `README.md` installed. Now, proceed to install `@vue/cli`:

```sh
yarn global add @vue/cli
```

This will install the CLI globally and will also give us the `vue` command. Let's scaffold a project inside the `app` directory. Make sure you `cd app` and then run the following:

```sh
vue create .
```

This will ask us a couple of questions in order to determine the kind of project to scaffold. For now, choose the `babel + eslint` option and choose `yarn` for package manager. Once done, the project files will be generated and npm packages would be installed.

Once everything is done, you should have a project structure that resembles the following:

```
.
├── README.md
├── babel.config.js
├── package.json
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── App.vue
│   ├── assets/
│   ├── components/
│   └── main.js
└── yarn.lock
```

Let's explore this structure the CLI just generated:

- `public/`: Has the default `index.html` where Vue will bootstrap, and any other static assets such as images, fonts that shouldn't be modified.
- `src/`: Where we will write our Vue components. `main.js` is the entrypoint for our application that.
- `src/assets`: Images, fonts and other stuff that should be pre-processed before used in our components
- `src/components`: All reusable components go here.
- `App.vue`: Root Vue component where other components and logic will be imported.
- `main.js`: Entrypoint JS file where we will initialize Vue.js
- `babel.config.js`: Babel converts modern JS into older one so that users with older browsers can use your app.

Let's start the development server by running the following command:

```
yarn serve
```

Copy the printed URL and paste it into your browser to see the app running.

Great job! Before we head in and start writing our Vue components, we will take a quick detour and refresh our knowledge of modern JavaScript concepts as we'll be using them extensively in this workshop.
