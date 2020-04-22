export default form => {
  const errors = [];
  Object.entries(form).forEach(([name, { value }]) => {
    if (value.trim().length === 0 && name !== "addressOptional") {
      errors.push({
        name: [name],
        error: `${name.charAt(0).toUpperCase() + name.slice(1)} required`
      });
    }
    if (
      name === "email" &&
      !/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/.test(value)
    ) {
      errors.push({ name: "email", error: "Invalid email address" });
    }
  });
  return errors;
};
