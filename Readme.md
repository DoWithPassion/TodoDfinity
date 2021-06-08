# Webpack
### Loaders
    - The job of loaders is to work the things while they are loaded.
    - The configuration like loading styles,svg etc... before we convert into a single js file is done by the loader.
### Plugins
    - The load configurations that need to be done after the single output js file is generated is done by plugins.


#### Entry:
    - Specifies the entry point of the app/project
#### Module:
    - Any modules that used in project are mentioned here in the form of rule objects
    - *Rules:*
        - test - like pattern of file extension
        - loader - module loader name (for webpack)
        - use - It is used instead of loader, and it is more recommended because it makes consistency, most of the updated modules will use "use". And the value for it can be a single loader or list of loaders which will be loaded from right to left in the mentioned list

#### Babel loader 
    - It is used to convert code written in modern flavors and supersets of JavaScript into plain old JavaScript code supported by older browsers.

#### output
    - Specifies where to store the output file.
    - path - path to store the generated file
    - filename - filename of the generated file

#### plugins
    - It takes the list of plugin objects that need to handle.
##### HtmlWebPackPlugin
    - It will generate index.html for us and along with that it will also inject the final output js to the index.html in output folder and we can also give our own html template file. So that it will create html based on our template.
    Eg: new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'app', 'index.html') })
##### mode
    -  To specify as production or dev
##### dev-server
    - To watch the changes and update the server without stopping and re running

#### Regenerator run time
 - Your application has been compiled, expecting regeratorRuntime to be available to interpret the async and await. For that we used below plugins.

 - All you need to do is install these two packages:
   -  @babel/plugin-transform-runtime
   -  @babel/runtime
 - Add the below in plugins of the babel loader options
    `'@babel/transform-runtime'`


## Some of References
-  https://andrew-flower.com/blog/Async-Await-with-React