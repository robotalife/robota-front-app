function Required(value) {
  return !!value || "The field is required.";
}

function EmailRule(value) {
  // eslint-disable-next-line no-control-regex
  const pattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(value) || "Email address is invalid";
}

function RepeatPasswordRule(value, repeatValue) {
  return value === repeatValue || "passwords aren't matched";
}

export const validation = {
  required: Required,
  email: EmailRule,
  repeatPassword: RepeatPasswordRule,
};
