export default function isValidPhone(phone) {
  var numberStr = phone.toString().trim();
  const phoneRegex = /^0\d{8}$/;
  return phoneRegex.test(numberStr);
}
