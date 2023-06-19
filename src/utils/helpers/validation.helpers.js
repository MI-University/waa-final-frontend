export const mobileValidate = (mobileNumber) => {
  if (mobileNumber?.match(/(^(01){1}[3456789]{1}(\d){8})$/)) {
    return true;
  } else {
    return false;
  }
};

export const emailValidate = (email) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email?.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export function formatMobile(mobileNumber = '') {
  let newN = mobileNumber?.startsWith('88')
    ? mobileNumber?.slice(2)
    : mobileNumber;
  newN = newN.replace('+88', '');
  newN = newN?.startsWith('0') ? newN : '0' + newN;
  return mobileNumber;
}
