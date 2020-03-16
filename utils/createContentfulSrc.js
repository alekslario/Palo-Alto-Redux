const defaultSizes = [
  180,
  360,
  540,
  720,
  900,
  1080,
  1296,
  1512,
  1728,
  1950,
  2028
];
export default (
  url,
  { height = false, widthSizes = defaultSizes, heightSizes = defaultSizes } = {}
) => {
  return widthSizes.map(
    (size, index) =>
      `${url}?w=${size} ${size}w${height ? ` ${heightSizes[index]}h` : ""}${
        widthSizes.length - 1 === index ? "" : ","
      }`
  );
};
