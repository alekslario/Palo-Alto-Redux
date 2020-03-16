export default () => (
  <>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans|Playfair+Display:700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/public/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/public/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/public/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/public/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/public/favicon/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <link rel="shortcut icon" href="/public/favicon/favicon.ico" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta
      name="msapplication-config"
      content="/public/favicon/browserconfig.xml"
    />
    <meta
      name="theme-color"
      content="${({ theme }) => theme.colors.primary}fff"
    />
  </>
);
