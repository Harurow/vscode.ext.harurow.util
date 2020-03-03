import { CharInfo } from '../../../utils'

export function encodeSgml (isHex: boolean, isAll: boolean, isEntryRef: boolean): (text: string) => { result: string, failed: number } {
  const num = isHex
    ? (ci: CharInfo) => `&#x${ci.code.toHex(2)};`
    : (ci: CharInfo) => `&#${ci.code.toString()};`
  const etc = isAll
    ? num
    : (ci: CharInfo) => ci.char
  const esc = isEntryRef
    ? (ci: CharInfo) => escapeSpecialChar(ci.char) ?? etc(ci)
    : (ci: CharInfo) => isSpecialChar(ci.char) ? num(ci) : etc(ci)

  return (text: string) => ({
    result: text.charInfos()
      .map(ci => esc(ci))
      .join(''),
    failed: 0
  })
}

export function decodeSgml (): (text: string) => string {
  const parse = (str: string): RegExpMatchArray =>
    str.match(/&[^;]+;|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []

  const decHex = (str: string): string =>
    String.fromCodePoint(Number.parseInt(str.slice(3, -1), 16))

  const decDec = (str: string): string =>
    String.fromCodePoint(Number.parseInt(str.slice(2, -1), 10))

  const dec = (str: string): string =>
    str.startsWith('&#x')
      ? decHex(str) : str.startsWith('&#')
        ? decDec(str) : unescapeSpecialChar(str)

  return (text: string) =>
    parse(text)
      .map(dec)
      .join('')
}

const htmlSpecialChars = new Map<string, string>([
  ['\xa0', '&nbsp;'],
  ['\'', '&#039;'],
  ['/', '&#x2f;'],
  ['á', '&aacute;'],
  ['Á', '&Aacute;'],
  ['â', '&acirc;'],
  ['Â', '&Acirc;'],
  ['´', '&acute;'],
  ['Æ', '&AElig;'],
  ['æ', '&aelig;'],
  ['À', '&Agrave;'],
  ['à', '&agrave;'],
  ['ℵ', '&alefsym;'],
  ['Α', '&Alpha;'],
  ['α', '&alpha;'],
  ['&', '&amp;'],
  ['∧', '&and;'],
  ['∠', '&ang;'],
  ['`', '&apos;'],
  ['Å', '&Aring;'],
  ['å', '&aring;'],
  ['≈', '&asymp;'],
  ['ã', '&atilde;'],
  ['Ã', '&Atilde;'],
  ['Ä', '&Auml;'],
  ['ä', '&auml;'],
  ['„', '&bdquo;'],
  ['Β', '&Beta;'],
  ['β', '&beta;'],
  ['¦', '&brvbar;'],
  ['•', '&bull;'],
  ['∩', '&cap;'],
  ['ç', '&ccedil;'],
  ['Ç', '&Ccedil;'],
  ['¸', '&cedil;'],
  ['¢', '&cent;'],
  ['Χ', '&Chi;'],
  ['χ', '&chi;'],
  ['ˆ', '&circ;'],
  ['♣', '&clubs;'],
  ['≅', '&cong;'],
  ['©', '&copy;'],
  ['↵', '&crarr;'],
  ['∪', '&cup;'],
  ['¤', '&curren;'],
  ['†', '&dagger;'],
  ['‡', '&Dagger;'],
  ['↓', '&darr;'],
  ['⇓', '&dArr;'],
  ['°', '&deg;'],
  ['Δ', '&Delta;'],
  ['δ', '&delta;'],
  ['♦', '&diams;'],
  ['÷', '&divide;'],
  ['é', '&eacute;'],
  ['É', '&Eacute;'],
  ['ê', '&ecirc;'],
  ['Ê', '&Ecirc;'],
  ['è', '&egrave;'],
  ['È', '&Egrave;'],
  ['∅', '&empty;'],
  ['ε', '&epsilon;'],
  ['Ε', '&Epsilon;'],
  ['≡', '&equiv;'],
  ['η', '&eta;'],
  ['Η', '&Eta;'],
  ['Ð', '&ETH;'],
  ['ð', '&eth;'],
  ['ë', '&euml;'],
  ['Ë', '&Euml;'],
  ['€', '&euro;'],
  ['∃', '&exist;'],
  ['ƒ', '&fnof;'],
  ['∀', '&forall;'],
  ['½', '&frac12;'],
  ['¼', '&frac14;'],
  ['¾', '&frac34;'],
  ['⁄', '&frasl;'],
  ['γ', '&gamma;'],
  ['Γ', '&Gamma;'],
  ['≥', '&ge;'],
  ['>', '&gt;'],
  ['↔', '&harr;'],
  ['⇔', '&hArr;'],
  ['♥', '&hearts;'],
  ['…', '&hellip;'],
  ['í', '&iacute;'],
  ['Í', '&Iacute;'],
  ['î', '&icirc;'],
  ['Î', '&Icirc;'],
  ['¡', '&iexcl;'],
  ['Ì', '&Igrave;'],
  ['ì', '&igrave;'],
  ['ℑ', '&image;'],
  ['∞', '&infin;'],
  ['∫', '&int;'],
  ['ι', '&iota;'],
  ['Ι', '&Iota;'],
  ['¿', '&iquest;'],
  ['∈', '&isin;'],
  ['Ï', '&Iuml;'],
  ['ï', '&iuml;'],
  ['Κ', '&Kappa;'],
  ['κ', '&kappa;'],
  ['Λ', '&Lambda;'],
  ['λ', '&lambda;'],
  ['〈', '&lang;'],
  ['«', '&laquo;'],
  ['←', '&larr;'],
  ['⇐', '&lArr;'],
  ['⌈', '&lceil;'],
  ['“', '&ldquo;'],
  ['≤', '&le;'],
  ['⌊', '&lfloor;'],
  ['∗', '&lowast;'],
  ['◊', '&loz;'],
  ['‹', '&lsaquo;'],
  ['‘', '&lsquo;'],
  ['<', '&lt;'],
  ['¯', '&macr;'],
  ['—', '&mdash;'],
  ['µ', '&micro;'],
  ['·', '&middot;'],
  ['−', '&minus;'],
  ['Μ', '&Mu;'],
  ['μ', '&mu;'],
  ['∇', '&nabla;'],
  ['–', '&ndash;'],
  ['≠', '&ne;'],
  ['∋', '&ni;'],
  ['¬', '&not;'],
  ['∉', '&notin;'],
  ['⊄', '&nsub;'],
  ['ñ', '&ntilde;'],
  ['Ñ', '&Ntilde;'],
  ['Ν', '&Nu;'],
  ['ν', '&nu;'],
  ['Ó', '&Oacute;'],
  ['ó', '&oacute;'],
  ['ô', '&ocirc;'],
  ['Ô', '&Ocirc;'],
  ['œ', '&oelig;'],
  ['Œ', '&OElig;'],
  ['Ò', '&Ograve;'],
  ['ò', '&ograve;'],
  ['‾', '&oline;'],
  ['ω', '&omega;'],
  ['Ω', '&Omega;'],
  ['Ο', '&Omicron;'],
  ['ο', '&omicron;'],
  ['⊕', '&oplus;'],
  ['∨', '&or;'],
  ['ª', '&ordf;'],
  ['º', '&ordm;'],
  ['ø', '&oslash;'],
  ['Ø', '&Oslash;'],
  ['Õ', '&Otilde;'],
  ['õ', '&otilde;'],
  ['⊗', '&otimes;'],
  ['Ö', '&Ouml;'],
  ['ö', '&ouml;'],
  ['¶', '&para;'],
  ['∂', '&part;'],
  ['‰', '&permil;'],
  ['⊥', '&perp;'],
  ['Φ', '&Phi;'],
  ['φ', '&phi;'],
  ['π', '&pi;'],
  ['Π', '&Pi;'],
  ['ϖ', '&piv;'],
  ['±', '&plusmn;'],
  ['£', '&pound;'],
  ['′', '&prime;'],
  ['″', '&Prime;'],
  ['∏', '&prod;'],
  ['∝', '&prop;'],
  ['Ψ', '&Psi;'],
  ['ψ', '&psi;'],
  ['"', '&quot;'],
  ['√', '&radic;'],
  ['〉', '&rang;'],
  ['»', '&raquo;'],
  ['→', '&rarr;'],
  ['⇒', '&rArr;'],
  ['⌉', '&rceil;'],
  ['”', '&rdquo;'],
  ['ℜ', '&real;'],
  ['®', '&reg;'],
  ['⌋', '&rfloor;'],
  ['Ρ', '&Rho;'],
  ['ρ', '&rho;'],
  ['›', '&rsaquo;'],
  ['’', '&rsquo;'],
  ['‚', '&sbquo;'],
  ['Š', '&Scaron;'],
  ['š', '&scaron;'],
  ['⋅', '&sdot;'],
  ['§', '&sect;'],
  ['σ', '&sigma;'],
  ['Σ', '&Sigma;'],
  ['ς', '&sigmaf;'],
  ['∼', '&sim;'],
  ['♠', '&spades;'],
  ['⊂', '&sub;'],
  ['⊆', '&sube;'],
  ['∑', '&sum;'],
  ['⊃', '&sup;'],
  ['¹', '&sup1;'],
  ['²', '&sup2;'],
  ['³', '&sup3;'],
  ['⊇', '&supe;'],
  ['ß', '&szlig;'],
  ['τ', '&tau;'],
  ['Τ', '&Tau;'],
  ['∴', '&there4;'],
  ['θ', '&theta;'],
  ['Θ', '&Theta;'],
  ['ϑ', '&thetasym;'],
  ['Þ', '&THORN;'],
  ['þ', '&thorn;'],
  ['˜', '&tilde;'],
  ['×', '&times;'],
  ['™', '&trade;'],
  ['ú', '&uacute;'],
  ['Ú', '&Uacute;'],
  ['↑', '&uarr;'],
  ['⇑', '&uArr;'],
  ['Û', '&Ucirc;'],
  ['û', '&ucirc;'],
  ['Ù', '&Ugrave;'],
  ['ù', '&ugrave;'],
  ['¨', '&uml;'],
  ['ϒ', '&upsih;'],
  ['Υ', '&Upsilon;'],
  ['υ', '&upsilon;'],
  ['Ü', '&Uuml;'],
  ['ü', '&uuml;'],
  ['℘', '&weierp;'],
  ['ξ', '&xi;'],
  ['Ξ', '&Xi;'],
  ['Ý', '&Yacute;'],
  ['ý', '&yacute;'],
  ['¥', '&yen;'],
  ['Ÿ', '&Yuml;'],
  ['ÿ', '&yuml;'],
  ['ζ', '&zeta;'],
  ['Ζ', '&Zeta;']
])

const htmlSpecialCharsRev = new Map<string, string>()

htmlSpecialChars.forEach((v, k) => {
  htmlSpecialCharsRev.set(v, k)
})

function escapeSpecialChar (char: string): string | undefined {
  return htmlSpecialChars.get(char)
}

function unescapeSpecialChar (str: string): string {
  return htmlSpecialCharsRev.get(str) ?? str
}

function isSpecialChar (char: string): boolean {
  return htmlSpecialChars.has(char)
}
