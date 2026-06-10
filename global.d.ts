declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "./globals.css";

declare namespace JSX {
  interface IntrinsicElements {
    "planning-component": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
