﻿var parser = {};

(function()
{
    parser.match = function(
        ruleName,
        input,
        position
        )
    {
        this.ruleName = ruleName;
        this.input    = input;
        this.position = position;
        this.length   = 0;
        this.children = [];
    }

    parser.match.prototype.getValue = function()
    {
        return this.input.substring(
            this.position,
            this.position + this.length);
    };

    parser.match.prototype.select = function(
        selector
        )
    {
        var selected = [];
        if(selector(this))
            selected.push(this);

        this.children.forEach(
            function(
                match
                )
            {
                selected = selected.concat(match.select(selector));
            });

        return selected;
    };

    parser.empty = function()
    {
        this.link = function(){};

        this.parse = function(
            input,
            position
            )
        {
            return new parser.match(
                this.ruleName,
                input,
                position);
        };
    };

    parser.choice = function(
        expressions
        )
    {
        this.link = function(
            rules
            )
        {
            expressions = expressions.map(
                function(
                    expression
                    )
                {
                    if(typeof expression != 'string')
                    {
                        expression.link(rules);
                        return expression;
                    }

                    if(expression in rules)
                        return rules[expression];

                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
                });
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            for(var index = 0;index < expressions.length;++index)
            {
                var childMatch = expressions[index].parse(
                    input,
                    position);

                if(childMatch)
                {
                    m.length += childMatch.length;
                    m.children.push(childMatch);
                    return m;
                }
            }

            return null;
        };
    }

    parser.sequence = function(
        expressions
        )
    {
        this.link = function(
            rules
            )
        {
            expressions = expressions.map(
                function(
                    expression
                    )
                {
                    if(typeof expression != 'string')
                    {
                        expression.link(rules);
                        return expression;
                    }

                    if(expression in rules)
                        return rules[expression];

                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
                });
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            for(var index = 0;index < expressions.length;++index)
            {
                var childMatch = expressions[index].parse(
                    input,
                    position + m.length);

                if(!childMatch)
                    return null;

                m.length += childMatch.length;
                m.children.push(childMatch);
            }

            return m;
        };
    }

    parser.optional = function(
        expression
        )
    {
        this.link = function(
            rules
            )
        {
            if(typeof expression != 'string')
                expression.link(rules);

            else
            {
                if(expression in rules)
                    expression = rules[expression];

                else
                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
            }
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            var childMatch = expression.parse(
                input,
                position);

            if(childMatch)
            {
                m.children.push(childMatch);
                m.length = childMatch.length;
            }

            return m;
        };
    }

    parser.zeroOrMore = function(
        expression
        )
    {
        this.link = function(
            rules
            )
        {
            if(typeof expression != 'string')
                expression.link(rules);

            else
            {
                if(expression in rules)
                    expression = rules[expression];

                else
                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
            }
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            var childMatch = null;
            do
            {
                childMatch = expression.parse(
                    input,
                    position + m.length);

                if(childMatch)
                {
                    m.length += childMatch.length;
                    m.children.push(childMatch);
                }
            }
            while(childMatch)

            return m;
        };
    }

    parser.oneOrMore = function(
        expression
        )
    {
        this.link = function(
            rules
            )
        {
            if(typeof expression != 'string')
                expression.link(rules);

            else
            {
                if(expression in rules)
                    expression = rules[expression];

                else
                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
            }
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            var childMatch = null;
            do
            {
                childMatch = expression.parse(
                    input,
                    position + m.length);

                if(childMatch)
                {
                    m.length += childMatch.length;
                    m.children.push(childMatch);
                }
            }
            while(childMatch)

            if(m.children.length)
                return m;

            return null;
        };
    }

    parser.repetition = function(
        expression,
        min,
        max
        )
    {
        this.link = function(
            rules
            )
        {
            if(typeof expression != 'string')
                expression.link(rules);

            else
            {
                if(expression in rules)
                    expression = rules[expression];

                else
                    throw new SyntaxError(
                        'Unknown rule name: \'' + expression + '\'.');
            }
        };

        this.parse = function(
            input,
            position
            )
        {
            var m = new parser.match(
                this.ruleName,
                input,
                position);

            var childMatch = null;
            do
            {
                childMatch = expression.parse(
                    input,
                    position + m.length);

                if(childMatch)
                {
                    m.length += childMatch.length;
                    m.children.push(childMatch);

                    if(max && m.children.length == max)
                        return m;
                }
            }
            while(childMatch)

            if(m.children.length >= min)
                return m;

            return null;
        };
    }

    parser.terminal = function(
        symbol
        )
    {
        this.link = function(){};

        this.parse = function(
           input,
           position
           )
        {
            if(position >= input.length)
                return null;

            if((symbol.constructor == RegExp && input.charAt(position).match(symbol)) || input.charAt(position) == symbol)
            {
                var m = new parser.match(
                    this.ruleName,
                    input,
                    position);

                m.length = 1;
                return m;
            }

            return null;
        };
    }

    parser.eos = function()
    {
        this.link = function(){};

        this.parse = function(
            input,
            position
            )
        {
            if(position < input.length)
                return null;

            return new parser.match(
                this.ruleName,
                input,
                position);
        };
    };
})();

function numberFormatSpecification(
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    primaryGroupingSize,
    secondaryGroupingSize
    )
{
    this.minimumIntegerDigits  = minimumIntegerDigits;
    this.minimumFractionDigits = minimumFractionDigits;
    this.maximumFractionDigits = maximumFractionDigits;
    this.primaryGroupingSize   = primaryGroupingSize;
    this.secondaryGroupingSize = secondaryGroupingSize;
}

numberFormatSpecification.prototype.format = function(
    number
    )
{
    var specification = this;
    var transformations = [];
    transformations.push(
        function(
            number
            )
        {
            var positive = number >= 0;
            number = positive ? number : -number;
            var components = number.toFixed(specification.maximumFractionDigits).split('.');
            components[0] = components[0].replace(
                /^0+/,
                '');
            return {
                positive: positive,
                integer : components[0],
                fraction: components.length > 1 ? components[1] : ''
            };
        });

    var padding = '';
    while(padding.length < specification.minimumIntegerDigits)
        padding += '0';

    transformations.push(
        function(
            number
            )
        {
            return {
                positive: number.positive,
                integer : padding.substring(number.integer.length) + number.integer,
                fraction: number.fraction
            };
        });

    if(this.primaryGroupingSize)
    {
        var regex = new RegExp(
            '(\\d)(?=(\\d{' + (specification.secondaryGroupingSize ? specification.secondaryGroupingSize : specification.primaryGroupingSize) + '})*\\d{' + specification.primaryGroupingSize + '}$)',
            'g');

        transformations.push(
            function(
                number
                )
            {
                return {
                    positive: number.positive,
                    integer : number.integer.replace(
                        regex,
                        '$1' + Number.prototype.symbols.group),
                    fraction: number.fraction
                };
            });
    }

    if(specification.maximumFractionDigits > specification.minimumFractionDigits)
    {
        var regex = new RegExp(
            '0{1,' + (specification.maximumFractionDigits - specification.minimumFractionDigits) + '}$',
            'g')

        transformations.push(
            function(
                number
                )
            {
                return {
                    positive: number.positive,
                    integer : number.integer,
                    fraction: number.fraction.replace(
                        regex,
                        '')
                };
            });
    }

    var positive =
    {
        prefix: this.prefix ? this.prefix : '',
        suffix: this.suffix ? this.suffix : ''
    };
    var negative =
    {
        prefix: this.negative ? (this.negative.prefix ? this.negative.prefix : '') : '-',
        suffix: this.negative && this.negative.suffix ? this.negative.suffix : ''
    };

    transformations.push(
        function(
            number
            )
        {
            var affixes = number.positive ? positive : negative;
            var formattedNumber =
                affixes.prefix +
                number.integer +
                (number.fraction.length ? Number.prototype.symbols.decimal + number.fraction : '') +
                affixes.suffix;

            formattedNumber = formattedNumber.replace(
                '+',
                Number.prototype.symbols.plusSign)

            formattedNumber = formattedNumber.replace(
                '-',
                Number.prototype.symbols.minusSign)

            return formattedNumber;
        });

    function format(
        number
        )
    {
        transformations.forEach(
            function(
                transformation
                )
            {
                number = transformation(number);
            });

        return number;
    }

    return typeof number == 'undefined' ? format : format(number);
}

numberFormatSpecification.prototype.toParser = function()
{
    var rules;
    with(parser)
    {
        rules =
        {
            pattern     : new sequence([new choice(['positiveSubpattern', 'negativeSubpattern']), new eos()]),
            number      : new sequence(['integer', 'fraction']),
            nonZeroDigit: new terminal(/[1-9]/),
            digit       : new choice([new terminal('0'), 'nonZeroDigit']),
            decimal     : new terminal(Number.prototype.symbols.decimal  ),
            group       : new terminal(Number.prototype.symbols.group    ),
            plusSign    : new terminal(Number.prototype.symbols.plusSign ),
            minusSign   : new terminal(Number.prototype.symbols.minusSign)
        };

        // Fraction.
        if(!this.maximumFractionDigits)
            rules.fraction = new empty();

        else if(this.minimumFractionDigits === 0)
            rules.fraction = new optional(
                new sequence([
                    'decimal',
                    new repetition('digit', 1, this.maximumFractionDigits)]));

        else
            rules.fraction = new sequence([
                'decimal',
                new repetition('digit', this.minimumFractionDigits, this.maximumFractionDigits)]);

        if(!this.primaryGroupingSize)
            rules.integer = new choice([
                new repetition('digit', this.minimumIntegerDigits, this.minimumIntegerDigits),
                new sequence(['nonZeroDigit', new repetition('digit', this.minimumIntegerDigits)])]);

        else
        {
            var secondaryGroupingSize = this.secondaryGroupingSize ? this.secondaryGroupingSize : this.primaryGroupingSize;

            rules.secondarygroup = new sequence([new repetition('digit', secondaryGroupingSize, secondaryGroupingSize), 'group']);
            var groupSize = this.primaryGroupingSize;
            var minimumIntegerDigits = this.minimumIntegerDigits;
            var secondary = false;

            var integer = [];
            while(minimumIntegerDigits >= groupSize)
            {
                integer.unshift(secondary ? 'secondarygroup' : new repetition('digit', this.primaryGroupingSize, this.primaryGroupingSize));
                minimumIntegerDigits -= groupSize;
                groupSize = secondaryGroupingSize;
                secondary = true;
            }

            if(minimumIntegerDigits)
            {
                if(secondary)
                    integer.unshift('group');

                integer.unshift(
                    new choice(
                    [
                        new repetition('digit', minimumIntegerDigits, minimumIntegerDigits),
                        new sequence(['nonZeroDigit', new repetition('digit', 0, groupSize - minimumIntegerDigits - 1)]),
                        new sequence(['nonZeroDigit', new repetition('digit', 0, secondaryGroupingSize - 1), 'group', new zeroOrMore('secondarygroup'), new repetition('digit', groupSize - minimumIntegerDigits, groupSize - minimumIntegerDigits)])
                    ]));
            }
            else
                integer.unshift(
                    new choice(
                    [
                        new sequence(['nonZeroDigit', new repetition('digit', 0, secondaryGroupingSize - 1), 'group', new zeroOrMore('secondarygroup')]),
                        new empty()
                    ]));

            rules.integer = new sequence(integer);
        }

        var localizedReplacements = {
            '+': 'plusSign',
            '-': 'minusSign'
        };

        function buildAffix(
            affix
            )
        {
            return new parser.sequence(affix.split('').map(
                function(
                    affixChar
                    )
                {
                    return affixChar in localizedReplacements ? localizedReplacements[affixChar] : new parser.terminal(affixChar);
                }));
        }

        function buildSubpattern(
            numberFormatSpecification
            )
        {
            var subpattern = [];

            if(numberFormatSpecification.prefix)
                subpattern.push(buildAffix(numberFormatSpecification.prefix));

            subpattern.push('number');

            if(numberFormatSpecification.suffix)
                subpattern.push(buildAffix(numberFormatSpecification.suffix));

            return new parser.sequence(subpattern);
        }

        rules.positiveSubpattern = buildSubpattern(this);
        rules.negativeSubpattern = this.negative ? buildSubpattern(this.negative) : new sequence(['minusSign', 'positiveSubpattern']);

        for(var ruleName in rules)
        {
            rules[ruleName].link(rules);
            rules[ruleName].ruleName = ruleName;
        }

        return rules;
    }
};

numberFormatSpecification.prototype.parse = function(
    value
    )
{
    var syntaxCharacters = /[\^$\\.*+?()[\]{}|]/g;
    var decimalRegex = Number.prototype.symbols.decimal.replace(
        syntaxCharacters,
        '\\$&');
    var groupRegex = Number.prototype.symbols.group.replace(
        syntaxCharacters,
        '\\$&');
    var minusRegex = Number.prototype.symbols.minusSign.replace(
        syntaxCharacters,
        '\\$&');

    var fractionRegex = '';
    if(this.maximumFractionDigits)
    {
        if(this.minimumFractionDigits === 0)
            fractionRegex = '(' + decimalRegex + '\\d{1,' + this.maximumFractionDigits + '})?';

        else if(this.minimumFractionDigits < this.maximumFractionDigits)
            fractionRegex = decimalRegex + '\\d{' + this.minimumFractionDigits + ',' + this.maximumFractionDigits + '}';

        else
            fractionRegex = decimalRegex + '\\d{' + this.maximumFractionDigits + '}';
    }

    var integerRegex = ''
    if(!this.primaryGroupingSize)
        integerRegex = '([1-9]\\d*)?\\d{' + this.minimumIntegerDigits + '}';

    else
    {
        var secondaryGroupingSize = this.secondaryGroupingSize ? this.secondaryGroupingSize : this.primaryGroupingSize;

        var groupSize = this.primaryGroupingSize;
        var minimumIntegerDigits = this.minimumIntegerDigits;
        var secondary = false;

        while(minimumIntegerDigits >= groupSize)
        {
            integerRegex = secondary ? groupRegex + integerRegex : integerRegex;
            integerRegex = '\\d{' + groupSize + '}' + integerRegex;
            minimumIntegerDigits -= groupSize;
            groupSize = secondaryGroupingSize;
            secondary = true;
        }

        if(minimumIntegerDigits)
            integerRegex = '(' +
                [
                    '[1-9]\\d{0,' + (secondaryGroupingSize - 1) + '}' + groupRegex + '(\\d{' + secondaryGroupingSize + '}' + groupRegex + ')*' + '\\d{' + (groupSize - minimumIntegerDigits) + '}',
                    '[1-9]\\d{0,' + (groupSize - minimumIntegerDigits - 1) + '}',
                    ''
                ].join('|') +
                ')' +
                '\\d{' + minimumIntegerDigits + '}' + (secondary ? groupRegex + integerRegex : integerRegex);

        else
            integerRegex = '(' +
                [
                    '[1-9]\\d{0,' + (secondaryGroupingSize - 1) + '}' + groupRegex + '(\\d{' + secondaryGroupingSize + '}' + groupRegex + ')*',
                    ''
                ].join('|') +
                ')' +
                integerRegex;
    }

    var numberRegex = integerRegex + fractionRegex;

    var localizedReplacements = {
        '+': Number.prototype.symbols.plusSign,
        '-': Number.prototype.symbols.minusSign
    };

    function buildAffixRegex(
        affix
        )
    {
        return affix.split('').map(
            function(
                affixChar
                )
            {
                return affixChar in localizedReplacements ? localizedReplacements[affixChar] : affixChar;
            }).join('').replace(
            syntaxCharacters,
            '\\$&');
    }

    function buildSubpatternRegex(
        numberFormatSpecification,
        numberRegex
        )
    {
        var prefixRegex = '';
        var suffixRegex = '';

        if(numberFormatSpecification.prefix)
            prefixRegex = buildAffixRegex(numberFormatSpecification.prefix);

        if(numberFormatSpecification.suffix)
            suffixRegex = buildAffixRegex(numberFormatSpecification.suffix);

        return prefixRegex + numberRegex + suffixRegex;
    }

    var positiveSubpatternRegex = buildSubpatternRegex(
        this,
        numberRegex);

    var negativeSubpatternRegex = !this.negative ? minusRegex + positiveSubpatternRegex : buildSubpatternRegex(
        this.negative,
        numberRegex);

    positiveSubpatternRegex = new RegExp(
        '^' + positiveSubpatternRegex + '$',
        'g');

    negativeSubpatternRegex = new RegExp(
        '^' + negativeSubpatternRegex + '$',
        'g');

    function parse(
        value
        )
    {
        if(value.match(positiveSubpatternRegex))
            return Number(value.replace(/[^0-9.]/g, ''));

        if(value.match(negativeSubpatternRegex))
            return -Number(value.replace(/[^0-9.]/g, ''));

        return NaN;
    }

    return typeof value == 'undefined' ? parse : parse(value);
};

numberFormatSpecification.prototype.toString = function()
{
    var numberFormatPattern = '';

    if(this.maximumFractionDigits)
    {
        numberFormatPattern += '.';
        var fractionDigits = 0;
        while(fractionDigits < this.minimumFractionDigits)
        {
            numberFormatPattern += '0';
            ++fractionDigits;
        }

        while(fractionDigits < this.maximumFractionDigits)
        {
            numberFormatPattern += '#';
            ++fractionDigits;
        }
    }

    var integerDigits = 0;
    var requiredDigits = Math.max(this.minimumIntegerDigits, 1);

    if(this.primaryGroupingSize)
        requiredDigits = Math.max(this.minimumIntegerDigits, this.primaryGroupingSize + (this.secondaryGroupingSize ? this.secondaryGroupingSize : 0) + 1);

    while(integerDigits < requiredDigits)
    {
        if(this.primaryGroupingSize)
        {
            if(integerDigits == this.primaryGroupingSize ||
               (this.secondaryGroupingSize && integerDigits == this.primaryGroupingSize + this.secondaryGroupingSize))
                numberFormatPattern = ',' + numberFormatPattern;
        }

        numberFormatPattern = (integerDigits < this.minimumIntegerDigits ? '0' : '#') + numberFormatPattern;
        ++integerDigits;
    }

    if(this.prefix)
        numberFormatPattern = this.prefix + numberFormatPattern;

    if(this.suffix)
        numberFormatPattern += this.suffix;

    return numberFormatPattern + (this.negative ? ';' + this.negative.toString() : '');
}

var numberFormatPatternRules;

with(parser)
    numberFormatPatternRules =
    {
        pattern       : new sequence(['subpattern', new optional(new sequence([new terminal(';'), 'subpattern'])), new eos()]),
        subpattern    : new sequence(['prefix', 'number', 'suffix']),
        prefix        : new optional('affix'),
        suffix        : new optional('affix'),
        affix         : new oneOrMore(new terminal(/^[^#0.,;]$/)),
        number        : new sequence(['integer', new optional(new sequence([new terminal('.'), 'fraction']))]),
        integer       : new sequence([new optional(new sequence(['firstHashGroup', new zeroOrMore('hashGroup'), new optional('hashes')])), 'minimumDigits']),
        minimumDigits : new sequence([new zeroOrMore('zeroGroup'), 'zeros']),
        fraction      : new choice([new sequence([new optional('zeros'), 'hashes']), 'zeros']),
        firstHashGroup: new sequence(['hash', 'group']),
        hashGroup     : new sequence(['hashes', 'group']),
        zeroGroup     : new sequence(['zeros', 'group']),
        hashes        : new oneOrMore('hash'),
        zeros         : new oneOrMore('zero'),
        hash          : new terminal('#'),
        zero          : new terminal('0'),
        group         : new terminal(',')
    };

for(var ruleName in numberFormatPatternRules)
{
    numberFormatPatternRules[ruleName].link(numberFormatPatternRules);
    numberFormatPatternRules[ruleName].ruleName = ruleName;
}

function parseNumberFormatPattern(
    numberFormatPattern
    )
{
    var pattern = numberFormatPatternRules.pattern.parse(
        numberFormatPattern,
        0);

    if(!pattern)
        return null;

    function buildNumberFormatSpecification(
        subpattern
        )
    {
        var specification = new numberFormatSpecification(0, 0, 0);
        var integer  = subpattern.select(function(m) { return m.ruleName == 'integer'; })[0];
        var fraction = subpattern.select(function(m) { return m.ruleName == 'fraction'; })[0];
        var prefix   = subpattern.select(function(m) { return m.ruleName == 'prefix'; });
        var suffix   = subpattern.select(function(m) { return m.ruleName == 'suffix'; });
        specification.minimumIntegerDigits = integer.select(function(m) { return m.ruleName == 'zero'; }).length;

        if(fraction)
        {
            specification.minimumFractionDigits = fraction.select(function(m) { return m.ruleName == 'zero'; }).length;
            specification.maximumFractionDigits = specification.minimumFractionDigits + fraction.select(function(m) { return m.ruleName == 'hash'; }).length;
        }

        var groups = integer.getValue().split(',').reverse();
        if(groups.length > 1)
            specification.primaryGroupingSize = groups[0].length;

        if(groups.length > 2)
            specification.secondaryGroupingSize = groups[1].length;

        if(prefix.length)
            specification.prefix = prefix[0].getValue();

        if(suffix.length)
            specification.suffix = suffix[0].getValue();

        return specification;
    }

    var subpatterns = pattern.select(function(m) { return m.ruleName == 'subpattern'; });
    var specification = buildNumberFormatSpecification(subpatterns[0]);

    if(subpatterns.length == 2)
        specification.negative = buildNumberFormatSpecification(subpatterns[1]);

    return specification;
}

function formatNumber(
    numberFormatPattern,
    number
    )
{
    return parseNumberFormatPattern(numberFormatPattern).format(number);
}

function parseNumber(
    numberFormatPattern,
    value
    )
{
    return parseNumberFormatPattern(numberFormatPattern).parse(value);
}