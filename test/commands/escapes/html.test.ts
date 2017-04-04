import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    escapeHtml,
    escapeHtmlAll,
    unescapeHtml,
} from '../../../src/__/commands/escapes/html'

suite('Escape HTML Tests', () => {

    test('escapeHtml', () => {
        assert.equal(null, escapeHtml(null))
        assert.equal(undefined, escapeHtml(undefined))
        assert.equal('', escapeHtml(''))
        assert.equal(' ', escapeHtml(' '))

        assert.equal('&quot;', escapeHtml('"'))
        assert.equal('&#039;', escapeHtml('\''))
        assert.equal('&lt;', escapeHtml('<'))
        assert.equal('&gt;', escapeHtml('>'))
        assert.equal('&iexcl;', escapeHtml('¡'))
        assert.equal('&cent;', escapeHtml('¢'))
        assert.equal('&pound;', escapeHtml('£'))
        assert.equal('&curren;', escapeHtml('¤'))
        assert.equal('&yen;', escapeHtml('¥'))
        assert.equal('&brvbar;', escapeHtml('¦'))
        assert.equal('&sect;', escapeHtml('§'))
        assert.equal('&uml;', escapeHtml('¨'))
        assert.equal('&copy;', escapeHtml('©'))
        assert.equal('&ordf;', escapeHtml('ª'))
        assert.equal('&laquo;', escapeHtml('«'))
        assert.equal('&not;', escapeHtml('¬'))
        assert.equal('&reg;', escapeHtml('®'))
        assert.equal('&macr;', escapeHtml('¯'))
        assert.equal('&deg;', escapeHtml('°'))
        assert.equal('&plusmn;', escapeHtml('±'))
        assert.equal('&sup2;', escapeHtml('²'))
        assert.equal('&sup3;', escapeHtml('³'))
        assert.equal('&acute;', escapeHtml('´'))
        assert.equal('&micro;', escapeHtml('µ'))
        assert.equal('&para;', escapeHtml('¶'))
        assert.equal('&middot;', escapeHtml('·'))
        assert.equal('&cedil;', escapeHtml('¸'))
        assert.equal('&sup1;', escapeHtml('¹'))
        assert.equal('&ordm;', escapeHtml('º'))
        assert.equal('&raquo;', escapeHtml('»'))
        assert.equal('&frac14;', escapeHtml('¼'))
        assert.equal('&frac12;', escapeHtml('½'))
        assert.equal('&frac34;', escapeHtml('¾'))
        assert.equal('&iquest;', escapeHtml('¿'))
        assert.equal('&Agrave;', escapeHtml('À'))
        assert.equal('&Aacute;', escapeHtml('Á'))
        assert.equal('&Acirc;', escapeHtml('Â'))
        assert.equal('&Atilde;', escapeHtml('Ã'))
        assert.equal('&Auml;', escapeHtml('Ä'))
        assert.equal('&Aring;', escapeHtml('Å'))
        assert.equal('&AElig;', escapeHtml('Æ'))
        assert.equal('&Ccedil;', escapeHtml('Ç'))
        assert.equal('&Egrave;', escapeHtml('È'))
        assert.equal('&Eacute;', escapeHtml('É'))
        assert.equal('&Ecirc;', escapeHtml('Ê'))
        assert.equal('&Euml;', escapeHtml('Ë'))
        assert.equal('&Igrave;', escapeHtml('Ì'))
        assert.equal('&Iacute;', escapeHtml('Í'))
        assert.equal('&Icirc;', escapeHtml('Î'))
        assert.equal('&Iuml;', escapeHtml('Ï'))
        assert.equal('&ETH;', escapeHtml('Ð'))
        assert.equal('&Ntilde;', escapeHtml('Ñ'))
        assert.equal('&Ograve;', escapeHtml('Ò'))
        assert.equal('&Oacute;', escapeHtml('Ó'))
        assert.equal('&Ocirc;', escapeHtml('Ô'))
        assert.equal('&Otilde;', escapeHtml('Õ'))
        assert.equal('&Ouml;', escapeHtml('Ö'))
        assert.equal('&times;', escapeHtml('×'))
        assert.equal('&Oslash;', escapeHtml('Ø'))
        assert.equal('&Ugrave;', escapeHtml('Ù'))
        assert.equal('&Uacute;', escapeHtml('Ú'))
        assert.equal('&Ucirc;', escapeHtml('Û'))
        assert.equal('&Uuml;', escapeHtml('Ü'))
        assert.equal('&Yacute;', escapeHtml('Ý'))
        assert.equal('&THORN;', escapeHtml('Þ'))
        assert.equal('&szlig;', escapeHtml('ß'))
        assert.equal('&agrave;', escapeHtml('à'))
        assert.equal('&aacute;', escapeHtml('á'))
        assert.equal('&acirc;', escapeHtml('â'))
        assert.equal('&atilde;', escapeHtml('ã'))
        assert.equal('&auml;', escapeHtml('ä'))
        assert.equal('&aring;', escapeHtml('å'))
        assert.equal('&aelig;', escapeHtml('æ'))
        assert.equal('&ccedil;', escapeHtml('ç'))
        assert.equal('&egrave;', escapeHtml('è'))
        assert.equal('&eacute;', escapeHtml('é'))
        assert.equal('&ecirc;', escapeHtml('ê'))
        assert.equal('&euml;', escapeHtml('ë'))
        assert.equal('&igrave;', escapeHtml('ì'))
        assert.equal('&iacute;', escapeHtml('í'))
        assert.equal('&icirc;', escapeHtml('î'))
        assert.equal('&iuml;', escapeHtml('ï'))
        assert.equal('&eth;', escapeHtml('ð'))
        assert.equal('&ntilde;', escapeHtml('ñ'))
        assert.equal('&ograve;', escapeHtml('ò'))
        assert.equal('&oacute;', escapeHtml('ó'))
        assert.equal('&ocirc;', escapeHtml('ô'))
        assert.equal('&otilde;', escapeHtml('õ'))
        assert.equal('&ouml;', escapeHtml('ö'))
        assert.equal('&divide;', escapeHtml('÷'))
        assert.equal('&oslash;', escapeHtml('ø'))
        assert.equal('&ugrave;', escapeHtml('ù'))
        assert.equal('&uacute;', escapeHtml('ú'))
        assert.equal('&ucirc;', escapeHtml('û'))
        assert.equal('&uuml;', escapeHtml('ü'))
        assert.equal('&yacute;', escapeHtml('ý'))
        assert.equal('&thorn;', escapeHtml('þ'))
        assert.equal('&yuml;', escapeHtml('ÿ'))
        assert.equal('&OElig;', escapeHtml('Œ'))
        assert.equal('&oelig;', escapeHtml('œ'))
        assert.equal('&Scaron;', escapeHtml('Š'))
        assert.equal('&scaron;', escapeHtml('š'))
        assert.equal('&Yuml;', escapeHtml('Ÿ'))
        assert.equal('&fnof;', escapeHtml('ƒ'))
        assert.equal('&circ;', escapeHtml('ˆ'))
        assert.equal('&tilde;', escapeHtml('˜'))
        assert.equal('&Alpha;', escapeHtml('Α'))
        assert.equal('&Beta;', escapeHtml('Β'))
        assert.equal('&Gamma;', escapeHtml('Γ'))
        assert.equal('&Delta;', escapeHtml('Δ'))
        assert.equal('&Epsilon;', escapeHtml('Ε'))
        assert.equal('&Zeta;', escapeHtml('Ζ'))
        assert.equal('&Eta;', escapeHtml('Η'))
        assert.equal('&Theta;', escapeHtml('Θ'))
        assert.equal('&Iota;', escapeHtml('Ι'))
        assert.equal('&Kappa;', escapeHtml('Κ'))
        assert.equal('&Lambda;', escapeHtml('Λ'))
        assert.equal('&Mu;', escapeHtml('Μ'))
        assert.equal('&Nu;', escapeHtml('Ν'))
        assert.equal('&Xi;', escapeHtml('Ξ'))
        assert.equal('&Omicron;', escapeHtml('Ο'))
        assert.equal('&Pi;', escapeHtml('Π'))
        assert.equal('&Rho;', escapeHtml('Ρ'))
        assert.equal('&Sigma;', escapeHtml('Σ'))
        assert.equal('&Tau;', escapeHtml('Τ'))
        assert.equal('&Upsilon;', escapeHtml('Υ'))
        assert.equal('&Phi;', escapeHtml('Φ'))
        assert.equal('&Chi;', escapeHtml('Χ'))
        assert.equal('&Psi;', escapeHtml('Ψ'))
        assert.equal('&Omega;', escapeHtml('Ω'))
        assert.equal('&alpha;', escapeHtml('α'))
        assert.equal('&beta;', escapeHtml('β'))
        assert.equal('&gamma;', escapeHtml('γ'))
        assert.equal('&delta;', escapeHtml('δ'))
        assert.equal('&epsilon;', escapeHtml('ε'))
        assert.equal('&zeta;', escapeHtml('ζ'))
        assert.equal('&eta;', escapeHtml('η'))
        assert.equal('&theta;', escapeHtml('θ'))
        assert.equal('&iota;', escapeHtml('ι'))
        assert.equal('&kappa;', escapeHtml('κ'))
        assert.equal('&lambda;', escapeHtml('λ'))
        assert.equal('&mu;', escapeHtml('μ'))
        assert.equal('&nu;', escapeHtml('ν'))
        assert.equal('&xi;', escapeHtml('ξ'))
        assert.equal('&omicron;', escapeHtml('ο'))
        assert.equal('&pi;', escapeHtml('π'))
        assert.equal('&rho;', escapeHtml('ρ'))
        assert.equal('&sigmaf;', escapeHtml('ς'))
        assert.equal('&sigma;', escapeHtml('σ'))
        assert.equal('&tau;', escapeHtml('τ'))
        assert.equal('&upsilon;', escapeHtml('υ'))
        assert.equal('&phi;', escapeHtml('φ'))
        assert.equal('&chi;', escapeHtml('χ'))
        assert.equal('&psi;', escapeHtml('ψ'))
        assert.equal('&omega;', escapeHtml('ω'))
        assert.equal('&thetasym;', escapeHtml('ϑ'))
        assert.equal('&upsih;', escapeHtml('ϒ'))
        assert.equal('&piv;', escapeHtml('ϖ'))
        assert.equal('&ndash;', escapeHtml('–'))
        assert.equal('&mdash;', escapeHtml('—'))
        assert.equal('&lsquo;', escapeHtml('‘'))
        assert.equal('&rsquo;', escapeHtml('’'))
        assert.equal('&sbquo;', escapeHtml('‚'))
        assert.equal('&ldquo;', escapeHtml('“'))
        assert.equal('&rdquo;', escapeHtml('”'))
        assert.equal('&bdquo;', escapeHtml('„'))
        assert.equal('&dagger;', escapeHtml('†'))
        assert.equal('&Dagger;', escapeHtml('‡'))
        assert.equal('&bull;', escapeHtml('•'))
        assert.equal('&hellip;', escapeHtml('…'))
        assert.equal('&permil;', escapeHtml('‰'))
        assert.equal('&prime;', escapeHtml('′'))
        assert.equal('&Prime;', escapeHtml('″'))
        assert.equal('&lsaquo;', escapeHtml('‹'))
        assert.equal('&rsaquo;', escapeHtml('›'))
        assert.equal('&oline;', escapeHtml('‾'))
        assert.equal('&frasl;', escapeHtml('⁄'))
        assert.equal('&euro;', escapeHtml('€'))
        assert.equal('&image;', escapeHtml('ℑ'))
        assert.equal('&weierp;', escapeHtml('℘'))
        assert.equal('&real;', escapeHtml('ℜ'))
        assert.equal('&trade;', escapeHtml('™'))
        assert.equal('&alefsym;', escapeHtml('ℵ'))
        assert.equal('&larr;', escapeHtml('←'))
        assert.equal('&uarr;', escapeHtml('↑'))
        assert.equal('&rarr;', escapeHtml('→'))
        assert.equal('&darr;', escapeHtml('↓'))
        assert.equal('&harr;', escapeHtml('↔'))
        assert.equal('&crarr;', escapeHtml('↵'))
        assert.equal('&lArr;', escapeHtml('⇐'))
        assert.equal('&uArr;', escapeHtml('⇑'))
        assert.equal('&rArr;', escapeHtml('⇒'))
        assert.equal('&dArr;', escapeHtml('⇓'))
        assert.equal('&hArr;', escapeHtml('⇔'))
        assert.equal('&forall;', escapeHtml('∀'))
        assert.equal('&part;', escapeHtml('∂'))
        assert.equal('&exist;', escapeHtml('∃'))
        assert.equal('&empty;', escapeHtml('∅'))
        assert.equal('&nabla;', escapeHtml('∇'))
        assert.equal('&isin;', escapeHtml('∈'))
        assert.equal('&notin;', escapeHtml('∉'))
        assert.equal('&ni;', escapeHtml('∋'))
        assert.equal('&prod;', escapeHtml('∏'))
        assert.equal('&sum;', escapeHtml('∑'))
        assert.equal('&minus;', escapeHtml('−'))
        assert.equal('&lowast;', escapeHtml('∗'))
        assert.equal('&radic;', escapeHtml('√'))
        assert.equal('&prop;', escapeHtml('∝'))
        assert.equal('&infin;', escapeHtml('∞'))
        assert.equal('&ang;', escapeHtml('∠'))
        assert.equal('&and;', escapeHtml('∧'))
        assert.equal('&or;', escapeHtml('∨'))
        assert.equal('&cap;', escapeHtml('∩'))
        assert.equal('&cup;', escapeHtml('∪'))
        assert.equal('&int;', escapeHtml('∫'))
        assert.equal('&there4;', escapeHtml('∴'))
        assert.equal('&sim;', escapeHtml('∼'))
        assert.equal('&cong;', escapeHtml('≅'))
        assert.equal('&asymp;', escapeHtml('≈'))
        assert.equal('&ne;', escapeHtml('≠'))
        assert.equal('&equiv;', escapeHtml('≡'))
        assert.equal('&le;', escapeHtml('≤'))
        assert.equal('&ge;', escapeHtml('≥'))
        assert.equal('&sub;', escapeHtml('⊂'))
        assert.equal('&sup;', escapeHtml('⊃'))
        assert.equal('&nsub;', escapeHtml('⊄'))
        assert.equal('&sube;', escapeHtml('⊆'))
        assert.equal('&supe;', escapeHtml('⊇'))
        assert.equal('&oplus;', escapeHtml('⊕'))
        assert.equal('&otimes;', escapeHtml('⊗'))
        assert.equal('&perp;', escapeHtml('⊥'))
        assert.equal('&sdot;', escapeHtml('⋅'))
        assert.equal('&lceil;', escapeHtml('⌈'))
        assert.equal('&rceil;', escapeHtml('⌉'))
        assert.equal('&lfloor;', escapeHtml('⌊'))
        assert.equal('&rfloor;', escapeHtml('⌋'))
        assert.equal('&lang;', escapeHtml('〈'))
        assert.equal('&rang;', escapeHtml('〉'))
        assert.equal('&loz;', escapeHtml('◊'))
        assert.equal('&spades;', escapeHtml('♠'))
        assert.equal('&clubs;', escapeHtml('♣'))
        assert.equal('&hearts;', escapeHtml('♥'))
        assert.equal('&diams;', escapeHtml('♦'))
        assert.equal('&nbsp;', escapeHtml(' '))
        assert.equal('&amp;', escapeHtml('&'))
        assert.equal('&apos;', escapeHtml('`'))
        assert.equal('&#x2f;', escapeHtml('/'))

        assert.equal('abcdef', escapeHtml('abcdef'))
        assert.equal('あいうえお', escapeHtml('あいうえお'))
        assert.equal('叱', escapeHtml('叱'))
        assert.equal('abc&lt;def&gt;gh&amp;gt;i', escapeHtml('abc<def>gh&gt;i'))
    })

    test('escapeHtmlAll', () => {
        assert.equal(null, escapeHtmlAll(null))
        assert.equal(undefined, escapeHtmlAll(undefined))
        assert.equal('', escapeHtmlAll(''))
        assert.equal('&#x20;', escapeHtmlAll(' '))

        assert.equal('&quot;', escapeHtmlAll('"'))
        assert.equal('&#039;', escapeHtmlAll('\''))
        assert.equal('&lt;', escapeHtmlAll('<'))
        assert.equal('&gt;', escapeHtmlAll('>'))
        assert.equal('&iexcl;', escapeHtmlAll('¡'))
        assert.equal('&cent;', escapeHtmlAll('¢'))
        assert.equal('&pound;', escapeHtmlAll('£'))
        assert.equal('&curren;', escapeHtmlAll('¤'))
        assert.equal('&yen;', escapeHtmlAll('¥'))
        assert.equal('&brvbar;', escapeHtmlAll('¦'))
        assert.equal('&sect;', escapeHtmlAll('§'))
        assert.equal('&uml;', escapeHtmlAll('¨'))
        assert.equal('&copy;', escapeHtmlAll('©'))
        assert.equal('&ordf;', escapeHtmlAll('ª'))
        assert.equal('&laquo;', escapeHtmlAll('«'))
        assert.equal('&not;', escapeHtmlAll('¬'))
        assert.equal('&reg;', escapeHtmlAll('®'))
        assert.equal('&macr;', escapeHtmlAll('¯'))
        assert.equal('&deg;', escapeHtmlAll('°'))
        assert.equal('&plusmn;', escapeHtmlAll('±'))
        assert.equal('&sup2;', escapeHtmlAll('²'))
        assert.equal('&sup3;', escapeHtmlAll('³'))
        assert.equal('&acute;', escapeHtmlAll('´'))
        assert.equal('&micro;', escapeHtmlAll('µ'))
        assert.equal('&para;', escapeHtmlAll('¶'))
        assert.equal('&middot;', escapeHtmlAll('·'))
        assert.equal('&cedil;', escapeHtmlAll('¸'))
        assert.equal('&sup1;', escapeHtmlAll('¹'))
        assert.equal('&ordm;', escapeHtmlAll('º'))
        assert.equal('&raquo;', escapeHtmlAll('»'))
        assert.equal('&frac14;', escapeHtmlAll('¼'))
        assert.equal('&frac12;', escapeHtmlAll('½'))
        assert.equal('&frac34;', escapeHtmlAll('¾'))
        assert.equal('&iquest;', escapeHtmlAll('¿'))
        assert.equal('&Agrave;', escapeHtmlAll('À'))
        assert.equal('&Aacute;', escapeHtmlAll('Á'))
        assert.equal('&Acirc;', escapeHtmlAll('Â'))
        assert.equal('&Atilde;', escapeHtmlAll('Ã'))
        assert.equal('&Auml;', escapeHtmlAll('Ä'))
        assert.equal('&Aring;', escapeHtmlAll('Å'))
        assert.equal('&AElig;', escapeHtmlAll('Æ'))
        assert.equal('&Ccedil;', escapeHtmlAll('Ç'))
        assert.equal('&Egrave;', escapeHtmlAll('È'))
        assert.equal('&Eacute;', escapeHtmlAll('É'))
        assert.equal('&Ecirc;', escapeHtmlAll('Ê'))
        assert.equal('&Euml;', escapeHtmlAll('Ë'))
        assert.equal('&Igrave;', escapeHtmlAll('Ì'))
        assert.equal('&Iacute;', escapeHtmlAll('Í'))
        assert.equal('&Icirc;', escapeHtmlAll('Î'))
        assert.equal('&Iuml;', escapeHtmlAll('Ï'))
        assert.equal('&ETH;', escapeHtmlAll('Ð'))
        assert.equal('&Ntilde;', escapeHtmlAll('Ñ'))
        assert.equal('&Ograve;', escapeHtmlAll('Ò'))
        assert.equal('&Oacute;', escapeHtmlAll('Ó'))
        assert.equal('&Ocirc;', escapeHtmlAll('Ô'))
        assert.equal('&Otilde;', escapeHtmlAll('Õ'))
        assert.equal('&Ouml;', escapeHtmlAll('Ö'))
        assert.equal('&times;', escapeHtmlAll('×'))
        assert.equal('&Oslash;', escapeHtmlAll('Ø'))
        assert.equal('&Ugrave;', escapeHtmlAll('Ù'))
        assert.equal('&Uacute;', escapeHtmlAll('Ú'))
        assert.equal('&Ucirc;', escapeHtmlAll('Û'))
        assert.equal('&Uuml;', escapeHtmlAll('Ü'))
        assert.equal('&Yacute;', escapeHtmlAll('Ý'))
        assert.equal('&THORN;', escapeHtmlAll('Þ'))
        assert.equal('&szlig;', escapeHtmlAll('ß'))
        assert.equal('&agrave;', escapeHtmlAll('à'))
        assert.equal('&aacute;', escapeHtmlAll('á'))
        assert.equal('&acirc;', escapeHtmlAll('â'))
        assert.equal('&atilde;', escapeHtmlAll('ã'))
        assert.equal('&auml;', escapeHtmlAll('ä'))
        assert.equal('&aring;', escapeHtmlAll('å'))
        assert.equal('&aelig;', escapeHtmlAll('æ'))
        assert.equal('&ccedil;', escapeHtmlAll('ç'))
        assert.equal('&egrave;', escapeHtmlAll('è'))
        assert.equal('&eacute;', escapeHtmlAll('é'))
        assert.equal('&ecirc;', escapeHtmlAll('ê'))
        assert.equal('&euml;', escapeHtmlAll('ë'))
        assert.equal('&igrave;', escapeHtmlAll('ì'))
        assert.equal('&iacute;', escapeHtmlAll('í'))
        assert.equal('&icirc;', escapeHtmlAll('î'))
        assert.equal('&iuml;', escapeHtmlAll('ï'))
        assert.equal('&eth;', escapeHtmlAll('ð'))
        assert.equal('&ntilde;', escapeHtmlAll('ñ'))
        assert.equal('&ograve;', escapeHtmlAll('ò'))
        assert.equal('&oacute;', escapeHtmlAll('ó'))
        assert.equal('&ocirc;', escapeHtmlAll('ô'))
        assert.equal('&otilde;', escapeHtmlAll('õ'))
        assert.equal('&ouml;', escapeHtmlAll('ö'))
        assert.equal('&divide;', escapeHtmlAll('÷'))
        assert.equal('&oslash;', escapeHtmlAll('ø'))
        assert.equal('&ugrave;', escapeHtmlAll('ù'))
        assert.equal('&uacute;', escapeHtmlAll('ú'))
        assert.equal('&ucirc;', escapeHtmlAll('û'))
        assert.equal('&uuml;', escapeHtmlAll('ü'))
        assert.equal('&yacute;', escapeHtmlAll('ý'))
        assert.equal('&thorn;', escapeHtmlAll('þ'))
        assert.equal('&yuml;', escapeHtmlAll('ÿ'))
        assert.equal('&OElig;', escapeHtmlAll('Œ'))
        assert.equal('&oelig;', escapeHtmlAll('œ'))
        assert.equal('&Scaron;', escapeHtmlAll('Š'))
        assert.equal('&scaron;', escapeHtmlAll('š'))
        assert.equal('&Yuml;', escapeHtmlAll('Ÿ'))
        assert.equal('&fnof;', escapeHtmlAll('ƒ'))
        assert.equal('&circ;', escapeHtmlAll('ˆ'))
        assert.equal('&tilde;', escapeHtmlAll('˜'))
        assert.equal('&Alpha;', escapeHtmlAll('Α'))
        assert.equal('&Beta;', escapeHtmlAll('Β'))
        assert.equal('&Gamma;', escapeHtmlAll('Γ'))
        assert.equal('&Delta;', escapeHtmlAll('Δ'))
        assert.equal('&Epsilon;', escapeHtmlAll('Ε'))
        assert.equal('&Zeta;', escapeHtmlAll('Ζ'))
        assert.equal('&Eta;', escapeHtmlAll('Η'))
        assert.equal('&Theta;', escapeHtmlAll('Θ'))
        assert.equal('&Iota;', escapeHtmlAll('Ι'))
        assert.equal('&Kappa;', escapeHtmlAll('Κ'))
        assert.equal('&Lambda;', escapeHtmlAll('Λ'))
        assert.equal('&Mu;', escapeHtmlAll('Μ'))
        assert.equal('&Nu;', escapeHtmlAll('Ν'))
        assert.equal('&Xi;', escapeHtmlAll('Ξ'))
        assert.equal('&Omicron;', escapeHtmlAll('Ο'))
        assert.equal('&Pi;', escapeHtmlAll('Π'))
        assert.equal('&Rho;', escapeHtmlAll('Ρ'))
        assert.equal('&Sigma;', escapeHtmlAll('Σ'))
        assert.equal('&Tau;', escapeHtmlAll('Τ'))
        assert.equal('&Upsilon;', escapeHtmlAll('Υ'))
        assert.equal('&Phi;', escapeHtmlAll('Φ'))
        assert.equal('&Chi;', escapeHtmlAll('Χ'))
        assert.equal('&Psi;', escapeHtmlAll('Ψ'))
        assert.equal('&Omega;', escapeHtmlAll('Ω'))
        assert.equal('&alpha;', escapeHtmlAll('α'))
        assert.equal('&beta;', escapeHtmlAll('β'))
        assert.equal('&gamma;', escapeHtmlAll('γ'))
        assert.equal('&delta;', escapeHtmlAll('δ'))
        assert.equal('&epsilon;', escapeHtmlAll('ε'))
        assert.equal('&zeta;', escapeHtmlAll('ζ'))
        assert.equal('&eta;', escapeHtmlAll('η'))
        assert.equal('&theta;', escapeHtmlAll('θ'))
        assert.equal('&iota;', escapeHtmlAll('ι'))
        assert.equal('&kappa;', escapeHtmlAll('κ'))
        assert.equal('&lambda;', escapeHtmlAll('λ'))
        assert.equal('&mu;', escapeHtmlAll('μ'))
        assert.equal('&nu;', escapeHtmlAll('ν'))
        assert.equal('&xi;', escapeHtmlAll('ξ'))
        assert.equal('&omicron;', escapeHtmlAll('ο'))
        assert.equal('&pi;', escapeHtmlAll('π'))
        assert.equal('&rho;', escapeHtmlAll('ρ'))
        assert.equal('&sigmaf;', escapeHtmlAll('ς'))
        assert.equal('&sigma;', escapeHtmlAll('σ'))
        assert.equal('&tau;', escapeHtmlAll('τ'))
        assert.equal('&upsilon;', escapeHtmlAll('υ'))
        assert.equal('&phi;', escapeHtmlAll('φ'))
        assert.equal('&chi;', escapeHtmlAll('χ'))
        assert.equal('&psi;', escapeHtmlAll('ψ'))
        assert.equal('&omega;', escapeHtmlAll('ω'))
        assert.equal('&thetasym;', escapeHtmlAll('ϑ'))
        assert.equal('&upsih;', escapeHtmlAll('ϒ'))
        assert.equal('&piv;', escapeHtmlAll('ϖ'))
        assert.equal('&ndash;', escapeHtmlAll('–'))
        assert.equal('&mdash;', escapeHtmlAll('—'))
        assert.equal('&lsquo;', escapeHtmlAll('‘'))
        assert.equal('&rsquo;', escapeHtmlAll('’'))
        assert.equal('&sbquo;', escapeHtmlAll('‚'))
        assert.equal('&ldquo;', escapeHtmlAll('“'))
        assert.equal('&rdquo;', escapeHtmlAll('”'))
        assert.equal('&bdquo;', escapeHtmlAll('„'))
        assert.equal('&dagger;', escapeHtmlAll('†'))
        assert.equal('&Dagger;', escapeHtmlAll('‡'))
        assert.equal('&bull;', escapeHtmlAll('•'))
        assert.equal('&hellip;', escapeHtmlAll('…'))
        assert.equal('&permil;', escapeHtmlAll('‰'))
        assert.equal('&prime;', escapeHtmlAll('′'))
        assert.equal('&Prime;', escapeHtmlAll('″'))
        assert.equal('&lsaquo;', escapeHtmlAll('‹'))
        assert.equal('&rsaquo;', escapeHtmlAll('›'))
        assert.equal('&oline;', escapeHtmlAll('‾'))
        assert.equal('&frasl;', escapeHtmlAll('⁄'))
        assert.equal('&euro;', escapeHtmlAll('€'))
        assert.equal('&image;', escapeHtmlAll('ℑ'))
        assert.equal('&weierp;', escapeHtmlAll('℘'))
        assert.equal('&real;', escapeHtmlAll('ℜ'))
        assert.equal('&trade;', escapeHtmlAll('™'))
        assert.equal('&alefsym;', escapeHtmlAll('ℵ'))
        assert.equal('&larr;', escapeHtmlAll('←'))
        assert.equal('&uarr;', escapeHtmlAll('↑'))
        assert.equal('&rarr;', escapeHtmlAll('→'))
        assert.equal('&darr;', escapeHtmlAll('↓'))
        assert.equal('&harr;', escapeHtmlAll('↔'))
        assert.equal('&crarr;', escapeHtmlAll('↵'))
        assert.equal('&lArr;', escapeHtmlAll('⇐'))
        assert.equal('&uArr;', escapeHtmlAll('⇑'))
        assert.equal('&rArr;', escapeHtmlAll('⇒'))
        assert.equal('&dArr;', escapeHtmlAll('⇓'))
        assert.equal('&hArr;', escapeHtmlAll('⇔'))
        assert.equal('&forall;', escapeHtmlAll('∀'))
        assert.equal('&part;', escapeHtmlAll('∂'))
        assert.equal('&exist;', escapeHtmlAll('∃'))
        assert.equal('&empty;', escapeHtmlAll('∅'))
        assert.equal('&nabla;', escapeHtmlAll('∇'))
        assert.equal('&isin;', escapeHtmlAll('∈'))
        assert.equal('&notin;', escapeHtmlAll('∉'))
        assert.equal('&ni;', escapeHtmlAll('∋'))
        assert.equal('&prod;', escapeHtmlAll('∏'))
        assert.equal('&sum;', escapeHtmlAll('∑'))
        assert.equal('&minus;', escapeHtmlAll('−'))
        assert.equal('&lowast;', escapeHtmlAll('∗'))
        assert.equal('&radic;', escapeHtmlAll('√'))
        assert.equal('&prop;', escapeHtmlAll('∝'))
        assert.equal('&infin;', escapeHtmlAll('∞'))
        assert.equal('&ang;', escapeHtmlAll('∠'))
        assert.equal('&and;', escapeHtmlAll('∧'))
        assert.equal('&or;', escapeHtmlAll('∨'))
        assert.equal('&cap;', escapeHtmlAll('∩'))
        assert.equal('&cup;', escapeHtmlAll('∪'))
        assert.equal('&int;', escapeHtmlAll('∫'))
        assert.equal('&there4;', escapeHtmlAll('∴'))
        assert.equal('&sim;', escapeHtmlAll('∼'))
        assert.equal('&cong;', escapeHtmlAll('≅'))
        assert.equal('&asymp;', escapeHtmlAll('≈'))
        assert.equal('&ne;', escapeHtmlAll('≠'))
        assert.equal('&equiv;', escapeHtmlAll('≡'))
        assert.equal('&le;', escapeHtmlAll('≤'))
        assert.equal('&ge;', escapeHtmlAll('≥'))
        assert.equal('&sub;', escapeHtmlAll('⊂'))
        assert.equal('&sup;', escapeHtmlAll('⊃'))
        assert.equal('&nsub;', escapeHtmlAll('⊄'))
        assert.equal('&sube;', escapeHtmlAll('⊆'))
        assert.equal('&supe;', escapeHtmlAll('⊇'))
        assert.equal('&oplus;', escapeHtmlAll('⊕'))
        assert.equal('&otimes;', escapeHtmlAll('⊗'))
        assert.equal('&perp;', escapeHtmlAll('⊥'))
        assert.equal('&sdot;', escapeHtmlAll('⋅'))
        assert.equal('&lceil;', escapeHtmlAll('⌈'))
        assert.equal('&rceil;', escapeHtmlAll('⌉'))
        assert.equal('&lfloor;', escapeHtmlAll('⌊'))
        assert.equal('&rfloor;', escapeHtmlAll('⌋'))
        assert.equal('&lang;', escapeHtmlAll('〈'))
        assert.equal('&rang;', escapeHtmlAll('〉'))
        assert.equal('&loz;', escapeHtmlAll('◊'))
        assert.equal('&spades;', escapeHtmlAll('♠'))
        assert.equal('&clubs;', escapeHtmlAll('♣'))
        assert.equal('&hearts;', escapeHtmlAll('♥'))
        assert.equal('&diams;', escapeHtmlAll('♦'))
        assert.equal('&nbsp;', escapeHtmlAll(' '))
        assert.equal('&amp;', escapeHtmlAll('&'))
        assert.equal('&apos;', escapeHtmlAll('`'))
        assert.equal('&#x2f;', escapeHtmlAll('/'))

        assert.equal('&#x61;&#x62;&#x63;&#x64;&#x65;&#x66;', escapeHtmlAll('abcdef'))
        assert.equal('&#x3042;&#x3044;&#x3046;&#x3048;&#x304a;', escapeHtmlAll('あいうえお'))
        assert.equal('&#x29e3d;&#x29e3d;&#x29e3d;', escapeHtmlAll('\u{29e3d}\uD867\uDE3D𩸽'))
        assert.equal('&#x20b9f;&#x20b9f;', escapeHtmlAll('\u{20b9f}𠮟'))
        assert.equal('&#x30a6;&#x30a3;&#x30ad;&#x30da;&#x30c7;&#x30a3;&#x30a2;', escapeHtmlAll('ウィキペディア'))
    })

    test('unescapeHtml', () => {
        assert.equal(null, unescapeHtml(null))
        assert.equal(undefined, unescapeHtml(undefined))
        assert.equal('', unescapeHtml(''))
        assert.equal(' ', unescapeHtml('&#x20;'))
        assert.equal(' ', unescapeHtml('&#32;'))
        assert.equal(' ', unescapeHtml('&#032;'))

        let strings = [
            '&quot;',
            '"',
            '&#039;',
            '\'',
            '&lt;',
            '<',
            '&gt;',
            '>',
            '&iexcl;',
            '¡',
            '&cent;',
            '¢',
            '&pound;',
            '£',
            '&curren;',
            '¤',
            '&yen;',
            '¥',
            '&brvbar;',
            '¦',
            '&sect;',
            '§',
            '&uml;',
            '¨',
            '&copy;',
            '©',
            '&ordf;',
            'ª',
            '&laquo;',
            '«',
            '&not;',
            '¬',
            '&reg;',
            '®',
            '&macr;',
            '¯',
            '&deg;',
            '°',
            '&plusmn;',
            '±',
            '&sup2;',
            '²',
            '&sup3;',
            '³',
            '&acute;',
            '´',
            '&micro;',
            'µ',
            '&para;',
            '¶',
            '&middot;',
            '·',
            '&cedil;',
            '¸',
            '&sup1;',
            '¹',
            '&ordm;',
            'º',
            '&raquo;',
            '»',
            '&frac14;',
            '¼',
            '&frac12;',
            '½',
            '&frac34;',
            '¾',
            '&iquest;',
            '¿',
            '&Agrave;',
            'À',
            '&Aacute;',
            'Á',
            '&Acirc;',
            'Â',
            '&Atilde;',
            'Ã',
            '&Auml;',
            'Ä',
            '&Aring;',
            'Å',
            '&AElig;',
            'Æ',
            '&Ccedil;',
            'Ç',
            '&Egrave;',
            'È',
            '&Eacute;',
            'É',
            '&Ecirc;',
            'Ê',
            '&Euml;',
            'Ë',
            '&Igrave;',
            'Ì',
            '&Iacute;',
            'Í',
            '&Icirc;',
            'Î',
            '&Iuml;',
            'Ï',
            '&ETH;',
            'Ð',
            '&Ntilde;',
            'Ñ',
            '&Ograve;',
            'Ò',
            '&Oacute;',
            'Ó',
            '&Ocirc;',
            'Ô',
            '&Otilde;',
            'Õ',
            '&Ouml;',
            'Ö',
            '&times;',
            '×',
            '&Oslash;',
            'Ø',
            '&Ugrave;',
            'Ù',
            '&Uacute;',
            'Ú',
            '&Ucirc;',
            'Û',
            '&Uuml;',
            'Ü',
            '&Yacute;',
            'Ý',
            '&THORN;',
            'Þ',
            '&szlig;',
            'ß',
            '&agrave;',
            'à',
            '&aacute;',
            'á',
            '&acirc;',
            'â',
            '&atilde;',
            'ã',
            '&auml;',
            'ä',
            '&aring;',
            'å',
            '&aelig;',
            'æ',
            '&ccedil;',
            'ç',
            '&egrave;',
            'è',
            '&eacute;',
            'é',
            '&ecirc;',
            'ê',
            '&euml;',
            'ë',
            '&igrave;',
            'ì',
            '&iacute;',
            'í',
            '&icirc;',
            'î',
            '&iuml;',
            'ï',
            '&eth;',
            'ð',
            '&ntilde;',
            'ñ',
            '&ograve;',
            'ò',
            '&oacute;',
            'ó',
            '&ocirc;',
            'ô',
            '&otilde;',
            'õ',
            '&ouml;',
            'ö',
            '&divide;',
            '÷',
            '&oslash;',
            'ø',
            '&ugrave;',
            'ù',
            '&uacute;',
            'ú',
            '&ucirc;',
            'û',
            '&uuml;',
            'ü',
            '&yacute;',
            'ý',
            '&thorn;',
            'þ',
            '&yuml;',
            'ÿ',
            '&OElig;',
            'Œ',
            '&oelig;',
            'œ',
            '&Scaron;',
            'Š',
            '&scaron;',
            'š',
            '&Yuml;',
            'Ÿ',
            '&fnof;',
            'ƒ',
            '&circ;',
            'ˆ',
            '&tilde;',
            '˜',
            '&Alpha;',
            'Α',
            '&Beta;',
            'Β',
            '&Gamma;',
            'Γ',
            '&Delta;',
            'Δ',
            '&Epsilon;',
            'Ε',
            '&Zeta;',
            'Ζ',
            '&Eta;',
            'Η',
            '&Theta;',
            'Θ',
            '&Iota;',
            'Ι',
            '&Kappa;',
            'Κ',
            '&Lambda;',
            'Λ',
            '&Mu;',
            'Μ',
            '&Nu;',
            'Ν',
            '&Xi;',
            'Ξ',
            '&Omicron;',
            'Ο',
            '&Pi;',
            'Π',
            '&Rho;',
            'Ρ',
            '&Sigma;',
            'Σ',
            '&Tau;',
            'Τ',
            '&Upsilon;',
            'Υ',
            '&Phi;',
            'Φ',
            '&Chi;',
            'Χ',
            '&Psi;',
            'Ψ',
            '&Omega;',
            'Ω',
            '&alpha;',
            'α',
            '&beta;',
            'β',
            '&gamma;',
            'γ',
            '&delta;',
            'δ',
            '&epsilon;',
            'ε',
            '&zeta;',
            'ζ',
            '&eta;',
            'η',
            '&theta;',
            'θ',
            '&iota;',
            'ι',
            '&kappa;',
            'κ',
            '&lambda;',
            'λ',
            '&mu;',
            'μ',
            '&nu;',
            'ν',
            '&xi;',
            'ξ',
            '&omicron;',
            'ο',
            '&pi;',
            'π',
            '&rho;',
            'ρ',
            '&sigmaf;',
            'ς',
            '&sigma;',
            'σ',
            '&tau;',
            'τ',
            '&upsilon;',
            'υ',
            '&phi;',
            'φ',
            '&chi;',
            'χ',
            '&psi;',
            'ψ',
            '&omega;',
            'ω',
            '&thetasym;',
            'ϑ',
            '&upsih;',
            'ϒ',
            '&piv;',
            'ϖ',
            '&ndash;',
            '–',
            '&mdash;',
            '—',
            '&lsquo;',
            '‘',
            '&rsquo;',
            '’',
            '&sbquo;',
            '‚',
            '&ldquo;',
            '“',
            '&rdquo;',
            '”',
            '&bdquo;',
            '„',
            '&dagger;',
            '†',
            '&Dagger;',
            '‡',
            '&bull;',
            '•',
            '&hellip;',
            '…',
            '&permil;',
            '‰',
            '&prime;',
            '′',
            '&Prime;',
            '″',
            '&lsaquo;',
            '‹',
            '&rsaquo;',
            '›',
            '&oline;',
            '‾',
            '&frasl;',
            '⁄',
            '&euro;',
            '€',
            '&image;',
            'ℑ',
            '&weierp;',
            '℘',
            '&real;',
            'ℜ',
            '&trade;',
            '™',
            '&alefsym;',
            'ℵ',
            '&larr;',
            '←',
            '&uarr;',
            '↑',
            '&rarr;',
            '→',
            '&darr;',
            '↓',
            '&harr;',
            '↔',
            '&crarr;',
            '↵',
            '&lArr;',
            '⇐',
            '&uArr;',
            '⇑',
            '&rArr;',
            '⇒',
            '&dArr;',
            '⇓',
            '&hArr;',
            '⇔',
            '&forall;',
            '∀',
            '&part;',
            '∂',
            '&exist;',
            '∃',
            '&empty;',
            '∅',
            '&nabla;',
            '∇',
            '&isin;',
            '∈',
            '&notin;',
            '∉',
            '&ni;',
            '∋',
            '&prod;',
            '∏',
            '&sum;',
            '∑',
            '&minus;',
            '−',
            '&lowast;',
            '∗',
            '&radic;',
            '√',
            '&prop;',
            '∝',
            '&infin;',
            '∞',
            '&ang;',
            '∠',
            '&and;',
            '∧',
            '&or;',
            '∨',
            '&cap;',
            '∩',
            '&cup;',
            '∪',
            '&int;',
            '∫',
            '&there4;',
            '∴',
            '&sim;',
            '∼',
            '&cong;',
            '≅',
            '&asymp;',
            '≈',
            '&ne;',
            '≠',
            '&equiv;',
            '≡',
            '&le;',
            '≤',
            '&ge;',
            '≥',
            '&sub;',
            '⊂',
            '&sup;',
            '⊃',
            '&nsub;',
            '⊄',
            '&sube;',
            '⊆',
            '&supe;',
            '⊇',
            '&oplus;',
            '⊕',
            '&otimes;',
            '⊗',
            '&perp;',
            '⊥',
            '&sdot;',
            '⋅',
            '&lceil;',
            '⌈',
            '&rceil;',
            '⌉',
            '&lfloor;',
            '⌊',
            '&rfloor;',
            '⌋',
            '&lang;',
            '〈',
            '&rang;',
            '〉',
            '&loz;',
            '◊',
            '&spades;',
            '♠',
            '&clubs;',
            '♣',
            '&hearts;',
            '♥',
            '&diams;',
            '♦',
            '&nbsp;',
            ' ',
            '&amp;',
            '&',
            '&apos;',
            '`',
            '&#x2f;',
            '/',

            '&#x61;&#x62;&#x63;&#x64;&#x65;&#x66;',
            'abcdef',
            '&#x3042;&#x3044;&#x3046;&#x3048;&#x304a;',
            'あいうえお',
            '&#x29e3d;&#x29e3d;&#x29e3d;',
            '\u{29e3d}\uD867\uDE3D𩸽',
            '&#x20b9f;&#x20b9f;',
            '\u{20b9f}𠮟',
            '&#x30a6;&#x30a3;&#x30ad;&#x30da;&#x30c7;&#x30a3;&#x30a2;',
            'ウィキペディア',
        ]

        strings.forEach(str => {
            assert.equal(str, unescapeHtml(escapeHtml(str)))
            assert.equal(str, unescapeHtml(escapeHtmlAll(str)))
        })
    })

})
