import * as RNLocalize from "react-native-localize";

const localeArr = RNLocalize.getLocales();
const systemLocaleCode = localeArr[ 0 ] ? localeArr[ 0 ].languageCode: null;

export default systemLocaleCode;
