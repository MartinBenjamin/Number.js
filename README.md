<h1>Number.js</h1>
<h2>Synopsis</h1>
Localized parsing and formatting of numbers using LDML compliant <a href="http://unicode.org/reports/tr35/tr35-numbers.html#Number_Format_Patterns" target="_blank">Number Format Patterns</a>.
<p>A full specification of Number.js is provided by the tests in NumberSpec.js.  In brief, Number.js provides two functions:</p>
<ul>
<li>formatNumber(pattern, numberString)</li>
<li>parseNumber(pattern, number)</li>
</ul>
The pattern parameter is an LDML compliant Number Format Pattern string.  The parsing functions are built for partial application:
<pre><code>
var format = formatNumber('#,##0.##');
var numberString = format(1000);

var parse = parseNumber('#,##0.##');
var number = parse('1,000.00');
</code></pre>

<h2>Getting Started</h2>
Download the repository and open NumberSpecRunner.html with a browser.

<h2>cldr-json</h2>
Localization is achieved via <a href="https://github.com/unicode-cldr/cldr-json" target="_blank">cldr-json</a>.  The necessary cldr-json for the en-GB locale is embedded within a script tag within NumberSpecRunner.html:

<pre><code>
&lt;script id="cldr" type="application/json">...&lt;/script>
&lt;script type="text/javascript">
  var cldr = JSON.parse(document.getElementById('cldr').innerHTML);
  Number.symbols = cldr.main['en-GB'].numbers['symbols-numberSystem-latn'];
&lt;/script>
</code></pre>

Number.js locates the necessary cldr-json via the property <code>Number.symbols</code>.  cldr-json for numbers for all locales is available within GitHub <a href="https://github.com/unicode-cldr/cldr-numbers-full/tree/master/main" target="_blank">here</a>.
