// This declares a module for *.module.css files, allowing them to be imported into TypeScript files.
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
