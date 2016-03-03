﻿var assert =
{
    strictEquals: function(
        lhs,
        rhs
        )
    {
        it(
            lhs + ' === ' + rhs,
            function()
            {
                expect(eval(lhs)).toBe(eval(rhs));
            });
    }
};

var localizedReplacements = {
    '+': Number.symbols.plusSign,
    '-': Number.symbols.minusSign,
    ',': Number.symbols.group,
    '.': Number.symbols.decimal
};

function transform(
    number
    )
{
    return number.split('').map(
        function(
            char
            )
        {
            return char in localizedReplacements ? localizedReplacements[char] : char;
        }).join('');
}

var testData =
    [
        [        '0', new numberFormatSubpattern(1, 0, 0      )],
        [      '#,0', new numberFormatSubpattern(1, 0, 0, 1   )],
        [    '#,#,0', new numberFormatSubpattern(1, 0, 0, 1, 1)],
        [   '#,##,0', new numberFormatSubpattern(1, 0, 0, 1, 2)],
        [  '#,###,0', new numberFormatSubpattern(1, 0, 0, 1, 3)],
        [     '#,#0', new numberFormatSubpattern(1, 0, 0, 2   )],
        [   '#,#,#0', new numberFormatSubpattern(1, 0, 0, 2, 1)],
        [  '#,##,#0', new numberFormatSubpattern(1, 0, 0, 2, 2)],
        [ '#,###,#0', new numberFormatSubpattern(1, 0, 0, 2, 3)],
        [    '#,##0', new numberFormatSubpattern(1, 0, 0, 3   )],
        [  '#,#,##0', new numberFormatSubpattern(1, 0, 0, 3, 1)],
        [ '#,##,##0', new numberFormatSubpattern(1, 0, 0, 3, 2)],
        ['#,###,##0', new numberFormatSubpattern(1, 0, 0, 3, 3)],

        [       '00', new numberFormatSubpattern(2, 0, 0      )],
        [      '0,0', new numberFormatSubpattern(2, 0, 0, 1   )],
        [    '#,0,0', new numberFormatSubpattern(2, 0, 0, 1, 1)],
        [   '#,#0,0', new numberFormatSubpattern(2, 0, 0, 1, 2)],
        [  '#,##0,0', new numberFormatSubpattern(2, 0, 0, 1, 3)],
        [     '#,00', new numberFormatSubpattern(2, 0, 0, 2   )],
        [   '#,#,00', new numberFormatSubpattern(2, 0, 0, 2, 1)],
        [  '#,##,00', new numberFormatSubpattern(2, 0, 0, 2, 2)],
        [ '#,###,00', new numberFormatSubpattern(2, 0, 0, 2, 3)],
        [    '#,#00', new numberFormatSubpattern(2, 0, 0, 3   )],
        [  '#,#,#00', new numberFormatSubpattern(2, 0, 0, 3, 1)],
        [ '#,##,#00', new numberFormatSubpattern(2, 0, 0, 3, 2)],
        ['#,###,#00', new numberFormatSubpattern(2, 0, 0, 3, 3)],

        [      '000', new numberFormatSubpattern(3, 0, 0      )],
        [     '00,0', new numberFormatSubpattern(3, 0, 0, 1   )],
        [    '0,0,0', new numberFormatSubpattern(3, 0, 0, 1, 1)],
        [   '#,00,0', new numberFormatSubpattern(3, 0, 0, 1, 2)],
        [  '#,#00,0', new numberFormatSubpattern(3, 0, 0, 1, 3)],
        [     '0,00', new numberFormatSubpattern(3, 0, 0, 2   )],
        [   '#,0,00', new numberFormatSubpattern(3, 0, 0, 2, 1)],
        [  '#,#0,00', new numberFormatSubpattern(3, 0, 0, 2, 2)],
        [ '#,##0,00', new numberFormatSubpattern(3, 0, 0, 2, 3)],
        [    '#,000', new numberFormatSubpattern(3, 0, 0, 3   )],
        [  '#,#,000', new numberFormatSubpattern(3, 0, 0, 3, 1)],
        [ '#,##,000', new numberFormatSubpattern(3, 0, 0, 3, 2)],
        ['#,###,000', new numberFormatSubpattern(3, 0, 0, 3, 3)],

        [     '0000', new numberFormatSubpattern(4, 0, 0      )],
        [    '000,0', new numberFormatSubpattern(4, 0, 0, 1   )],
        [   '00,0,0', new numberFormatSubpattern(4, 0, 0, 1, 1)],
        [   '0,00,0', new numberFormatSubpattern(4, 0, 0, 1, 2)],
        [  '#,000,0', new numberFormatSubpattern(4, 0, 0, 1, 3)],
        [    '00,00', new numberFormatSubpattern(4, 0, 0, 2   )],
        [   '0,0,00', new numberFormatSubpattern(4, 0, 0, 2, 1)],
        [  '#,00,00', new numberFormatSubpattern(4, 0, 0, 2, 2)],
        [ '#,#00,00', new numberFormatSubpattern(4, 0, 0, 2, 3)],
        [    '0,000', new numberFormatSubpattern(4, 0, 0, 3   )],
        [  '#,0,000', new numberFormatSubpattern(4, 0, 0, 3, 1)],
        [ '#,#0,000', new numberFormatSubpattern(4, 0, 0, 3, 2)],
        ['#,##0,000', new numberFormatSubpattern(4, 0, 0, 3, 3)],

        [    '00000', new numberFormatSubpattern(5, 0, 0      )],
        [   '0000,0', new numberFormatSubpattern(5, 0, 0, 1   )],
        [  '000,0,0', new numberFormatSubpattern(5, 0, 0, 1, 1)],
        [  '00,00,0', new numberFormatSubpattern(5, 0, 0, 1, 2)],
        [  '0,000,0', new numberFormatSubpattern(5, 0, 0, 1, 3)],
        [   '000,00', new numberFormatSubpattern(5, 0, 0, 2   )],
        [  '00,0,00', new numberFormatSubpattern(5, 0, 0, 2, 1)],
        [  '0,00,00', new numberFormatSubpattern(5, 0, 0, 2, 2)],
        [ '#,000,00', new numberFormatSubpattern(5, 0, 0, 2, 3)],
        [   '00,000', new numberFormatSubpattern(5, 0, 0, 3   )],
        [  '0,0,000', new numberFormatSubpattern(5, 0, 0, 3, 1)],
        [ '#,00,000', new numberFormatSubpattern(5, 0, 0, 3, 2)],
        ['#,#00,000', new numberFormatSubpattern(5, 0, 0, 3, 3)],

        [   '000000', new numberFormatSubpattern(6, 0, 0      )],
        [  '00000,0', new numberFormatSubpattern(6, 0, 0, 1   )],
        [ '0000,0,0', new numberFormatSubpattern(6, 0, 0, 1, 1)],
        [ '000,00,0', new numberFormatSubpattern(6, 0, 0, 1, 2)],
        [ '00,000,0', new numberFormatSubpattern(6, 0, 0, 1, 3)],
        [  '0000,00', new numberFormatSubpattern(6, 0, 0, 2   )],
        [ '000,0,00', new numberFormatSubpattern(6, 0, 0, 2, 1)],
        [ '00,00,00', new numberFormatSubpattern(6, 0, 0, 2, 2)],
        [ '0,000,00', new numberFormatSubpattern(6, 0, 0, 2, 3)],
        [  '000,000', new numberFormatSubpattern(6, 0, 0, 3   )],
        [ '00,0,000', new numberFormatSubpattern(6, 0, 0, 3, 1)],
        [ '0,00,000', new numberFormatSubpattern(6, 0, 0, 3, 2)],
        ['#,000,000', new numberFormatSubpattern(6, 0, 0, 3, 3)],

        [  '0000000', new numberFormatSubpattern(7, 0, 0      )],
        [ '000000,0', new numberFormatSubpattern(7, 0, 0, 1   )],
        ['00000,0,0', new numberFormatSubpattern(7, 0, 0, 1, 1)],
        ['0000,00,0', new numberFormatSubpattern(7, 0, 0, 1, 2)],
        ['000,000,0', new numberFormatSubpattern(7, 0, 0, 1, 3)],
        [ '00000,00', new numberFormatSubpattern(7, 0, 0, 2   )],
        ['0000,0,00', new numberFormatSubpattern(7, 0, 0, 2, 1)],
        ['000,00,00', new numberFormatSubpattern(7, 0, 0, 2, 2)],
        ['00,000,00', new numberFormatSubpattern(7, 0, 0, 2, 3)],
        [ '0000,000', new numberFormatSubpattern(7, 0, 0, 3   )],
        ['000,0,000', new numberFormatSubpattern(7, 0, 0, 3, 1)],
        ['00,00,000', new numberFormatSubpattern(7, 0, 0, 3, 2)],
        ['0,000,000', new numberFormatSubpattern(7, 0, 0, 3, 3)],

        ['0.#'  , new numberFormatSubpattern(1, 0, 1)],
        ['0.0'  , new numberFormatSubpattern(1, 1, 1)],
        ['0.##' , new numberFormatSubpattern(1, 0, 2)],
        ['0.0#' , new numberFormatSubpattern(1, 1, 2)],
        ['0.00' , new numberFormatSubpattern(1, 2, 2)],
        ['0.###', new numberFormatSubpattern(1, 0, 3)],
        ['0.0##', new numberFormatSubpattern(1, 1, 3)],
        ['0.00#', new numberFormatSubpattern(1, 2, 3)],
        ['0.000', new numberFormatSubpattern(1, 3, 3)]
    ];

var regexTestData =
    [
        [                  '0', /^-?([1-9]\d*)?\d{1}$/g                                                  ],
        [                 '00', /^-?([1-9]\d*)?\d{2}$/g                                                  ],
        [                '000', /^-?([1-9]\d*)?\d{3}$/g                                                  ],
        [                '#,0', /^-?([1-9]\d{0,0},(\d{1},)*|)\d{1}$/g                                    ],
        [                '0,0', /^-?([1-9]\d{0,0},(\d{1},)*|)\d{1},\d{1}$/g                              ],
        [             '#,##,0', /^-?([1-9]\d{0,1},(\d{2},)*|)\d{1}$/g                                    ],
        [             '#,#0,0', /^-?([1-9]\d{0,1},(\d{2},)*\d{1}|[1-9]\d{0,0}|)\d{1},\d{1}$/g            ],
        [             '#,00,0', /^-?([1-9]\d{0,1},(\d{2},)*|)\d{2},\d{1}$/g                              ],
        [              '#,##0', /^-?([1-9]\d{0,2},(\d{3},)*\d{2}|[1-9]\d{0,1}|)\d{1}$/g                  ],
        [              '#,#00', /^-?([1-9]\d{0,2},(\d{3},)*\d{1}|[1-9]\d{0,0}|)\d{2}$/g                  ],
        [              '#,000', /^-?([1-9]\d{0,2},(\d{3},)*|)\d{3}$/g                                    ],
        [              '0,000', /^-?([1-9]\d{0,2},(\d{3},)*\d{2}|[1-9]\d{0,1}|)\d{1},\d{3}$/g            ],
        [         '#,####,##0', /^-?([1-9]\d{0,3},(\d{4},)*\d{2}|[1-9]\d{0,1}|)\d{1}$/g                  ],
        [         '#,####,#00', /^-?([1-9]\d{0,3},(\d{4},)*\d{1}|[1-9]\d{0,0}|)\d{2}$/g                  ],
        [         '#,####,000', /^-?([1-9]\d{0,3},(\d{4},)*|)\d{3}$/g                                    ],
        [         '#,###0,000', /^-?([1-9]\d{0,3},(\d{4},)*\d{3}|[1-9]\d{0,2}|)\d{1},\d{3}$/g            ],
        [         '#,##00,000', /^-?([1-9]\d{0,3},(\d{4},)*\d{2}|[1-9]\d{0,1}|)\d{2},\d{3}$/g            ],
        [         '#,#000,000', /^-?([1-9]\d{0,3},(\d{4},)*\d{1}|[1-9]\d{0,0}|)\d{3},\d{3}$/g            ],
        [    '#,#000,0000,000', /^-?([1-9]\d{0,3},(\d{4},)*\d{1}|[1-9]\d{0,0}|)\d{3},\d{4},\d{3}$/g      ],
        ['#,#000,000,0000,000', /^-?([1-9]\d{0,3},(\d{4},)*\d{2}|[1-9]\d{0,1}|)\d{2},\d{4},\d{4},\d{3}$/g],
        [              '00,00', /^-?([1-9]\d{0,1},(\d{2},)*|)\d{2},\d{2}$/g                              ],
        [               '0.##', /^-?([1-9]\d*)?\d{1}(\.\d{1,2})?$/g                                      ],
        [               '0.0#', /^-?([1-9]\d*)?\d{1}\.\d{1,2}$/g                                         ],
        [               '0.00', /^-?([1-9]\d*)?\d{1}\.\d{2}$/g                                           ],
        [           '#,##0.##', /^-?([1-9]\d{0,2},(\d{3},)*\d{2}|[1-9]\d{0,1}|)\d{1}(\.\d{1,2})?$/g      ]
    ];

describe(
    'parseNumberFormatPattern',
    function()
    {
        assert.strictEquals("typeof parseNumberFormatPattern", "'function'");
        assert.strictEquals("typeof Number.symbols", "'object'");

        ['positive', 'negative'].map(
            function(
                polarity
                )
            {
                testData.map(
                    function(
                        data
                        )
                    {
                        return polarity == 'positive' ? data : ['0;' + data[0], data[1]];
                    }).forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "')." + polarity + ".minimumIntegerDigits" , data[1].minimumIntegerDigits);
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "')." + polarity + ".primaryGroupingSize"  , data[1].primaryGroupingSize);
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "')." + polarity + ".secondaryGroupingSize", data[1].secondaryGroupingSize);
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "')." + polarity + ".minimumFractionDigits", data[1].minimumFractionDigits);
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "')." + polarity + ".maximumFractionDigits", data[1].maximumFractionDigits);
                    });
            });

        assert.strictEquals("parseNumberFormatPattern('A0B').positive.prefix", "'A'");
        assert.strictEquals("parseNumberFormatPattern('A0B').positive.suffix", "'B'");
        assert.strictEquals("parseNumberFormatPattern('A0B;C0D').negative.prefix", "'C'");
        assert.strictEquals("parseNumberFormatPattern('A0B;C0D').negative.suffix", "'D'");

        describe(
            'Errors',
            function()
            {
                [
                    'a',
                    '##',
                    '##,0',
                    '#,',
                    '#,a',
                    '0,',
                    '0,#',
                    '0,a',
                    '0.',
                    '0.#0'
                ].forEach(
                    function(
                        invalidNumberFormatPattern
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('" + invalidNumberFormatPattern + "')", null);
                    });
            });
    });

describe(
    'numberFormatPattern',
    function()
    {
        describe(
            'toString()',
            function()
            {
                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').toString()", "'" + data[0] + "'");
                    });

                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('0;" + data[0] + "').toString()", "'0;" + data[0] + "'");
                    });

                assert.strictEquals("parseNumberFormatPattern('A0B;C0D').toString()", "'A0B;C0D'");
            });
    });

describe(
    'formatNumber',
    function()
    {
        assert.strictEquals("typeof formatNumber", "'function'");

        var testData =
        [
            [       '0'      ,             0    ,                         '0'      ],
            [      '00'      ,             0    ,                        '00'      ],
            [     '000'      ,             0    ,                       '000'      ],
            [    '0000'      ,             0    ,                      '0000'      ],
            [   '00000'      ,             0    ,                     '00000'      ],
            [       '0'      ,             3    ,                         '3'      ],
            [      '00'      ,             3    ,                        '03'      ],
            [     '000'      ,             3    ,                       '003'      ],
            [    '0000'      ,             3    ,                      '0003'      ],
            [   '00000'      ,             3    ,                     '00003'      ],
            [       '0'      ,            31    ,                        '31'      ],
            [      '00'      ,            31    ,                        '31'      ],
            [     '000'      ,            31    ,                       '031'      ],
            [    '0000'      ,            31    ,                      '0031'      ],
            [   '00000'      ,            31    ,                     '00031'      ],
            [       '0'      ,           314    ,                       '314'      ],
            [      '00'      ,           314    ,                       '314'      ],
            [     '000'      ,           314    ,                       '314'      ],
            [    '0000'      ,           314    ,                      '0314'      ],
            [   '00000'      ,           314    ,                     '00314'      ],
            [       '0'      ,          3141    ,                      '3141'      ],
            [      '00'      ,          3141    ,                      '3141'      ],
            [     '000'      ,          3141    ,                      '3141'      ],
            [    '0000'      ,          3141    ,                      '3141'      ],
            [   '00000'      ,          3141    ,                     '03141'      ],
            [       '0'      ,         31415    ,                     '31415'      ],
            [      '00'      ,         31415    ,                     '31415'      ],
            [     '000'      ,         31415    ,                     '31415'      ],
            [    '0000'      ,         31415    ,                     '31415'      ],
            [   '00000'      ,         31415    ,                     '31415'      ],
            [     '#,0'      , 9999999999999    , '9,9,9,9,9,9,9,9,9,9,9,9,9'      ],
            [    '#,#0'      , 9999999999999    ,       '9,99,99,99,99,99,99'      ],
            [   '#,##0'      , 9999999999999    ,         '9,999,999,999,999'      ],
            [  '#,###0'      , 9999999999999    ,          '9,9999,9999,9999'      ],
            [   '#,#,0'      , 9999999999999    , '9,9,9,9,9,9,9,9,9,9,9,9,9'      ],
            [  '#,##,0'      , 9999999999999    ,       '99,99,99,99,99,99,9'      ],
            [ '#,###,0'      , 9999999999999    ,         '999,999,999,999,9'      ],
            ['#,####,0'      , 9999999999999    ,          '9999,9999,9999,9'      ],
            [       '0'      ,             0    ,                         '0'      ],
            [       '0.0'    ,             0    ,                         '0.0'    ],
            [       '0.00'   ,             0    ,                         '0.00'   ],
            [       '0.000'  ,             0    ,                         '0.000'  ],
            [       '0.0000' ,             0    ,                         '0.0000' ],
            [       '0.00000',             0    ,                         '0.00000'],
            [       '0.###'  ,             0    ,                         '0'      ],
            [       '0.###'  ,             0.0  ,                         '0'      ],
            [       '0.###'  ,             0.1  ,                         '0.1'    ],
            [       '0.###'  ,             0.10 ,                         '0.1'    ],
            [       '0.###'  ,             0.12 ,                         '0.12'   ],
            [       '0.###'  ,             0.120,                         '0.12'   ],
            [       '0.###'  ,             0.123,                         '0.123'  ],
            [       '0.0##'  ,             0    ,                         '0.0'    ],
            [       '0.0##'  ,             0.0  ,                         '0.0'    ],
            [       '0.0##'  ,             0.1  ,                         '0.1'    ],
            [       '0.0##'  ,             0.10 ,                         '0.1'    ],
            [       '0.0##'  ,             0.12 ,                         '0.12'   ],
            [       '0.0##'  ,             0.120,                         '0.12'   ],
            [       '0.0##'  ,             0.123,                         '0.123'  ],
            [       '0.00'   ,             0.120,                         '0.12'   ],
            [       '0.00'   ,             0.121,                         '0.12'   ],
            [       '0.00'   ,             0.122,                         '0.12'   ],
            [       '0.00'   ,             0.123,                         '0.12'   ],
            [       '0.00'   ,             0.124,                         '0.12'   ],
            [       '0.00'   ,             0.125,                         '0.13'   ],
            [       '0.00'   ,             0.126,                         '0.13'   ],
            [       '0.00'   ,             0.127,                         '0.13'   ],
            [       '0.00'   ,             0.128,                         '0.13'   ],
            [       '0.00'   ,             0.128,                         '0.13'   ],
            [       '0.00'   ,             0.129,                         '0.13'   ],
            [       '0'      ,            -1    ,                        '-1'      ],
            [      'A0'      ,             1    ,                        'A1'      ],
            [       '0B'     ,             1    ,                         '1B'     ],
            [       '0;A0'   ,            -1    ,                        'A1'      ],
            [       '0;0B'   ,            -1    ,                         '1B'     ],
            ['#,##0.00'      , 9999999999999.99 ,         '9,999,999,999,999.99'   ],
            ['#,##0.00'      ,-9999999999999.99 ,        '-9,999,999,999,999.99'   ]
        ];

        assert.strictEquals("formatNumber(parseNumberFormatPattern('#,##0'), 1234)", "'" + transform('1,234') + "'"); 

        testData.map(
            function(
                data
                )
            {
                return [
                    data[0],
                    data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'" + data[2] + "'");
            });

        describe(
            'Partial Application',
            function()
            {
                assert.strictEquals("formatNumber('#,##0.00')(1000000)", "'" + transform('1,000,000.00') + "'");
            });
    });

describe(
    'parseNumber',
    function()
    {
        assert.strictEquals("parseNumber('0', '0')", 0);
        assert.strictEquals("parseNumber('0', '1')", 1);
        assert.strictEquals("parseNumber('0', '-1')", -1);
        assert.strictEquals("parseNumber('A0', 'A1')", 1);
        assert.strictEquals("parseNumber('0A', '1A')", 1);
        assert.strictEquals("parseNumber('0;A0', 'A1')", -1);
        assert.strictEquals("parseNumber('0;0A', '1A')", -1);
        assert.strictEquals("parseNumber('+0;-0', '+1')", 1);
        assert.strictEquals("parseNumber('+0;-0', '-1')", -1);
        assert.strictEquals("parseNumber('0+;0-', '1+')", 1);
        assert.strictEquals("parseNumber('0+;0-', '1-')", -1);

        assert.strictEquals("parseNumber(parseNumberFormatPattern('#,##0'), '" + transform('1,234') + "')", 1234);

        var testNumbers =
            [
                0
            ].concat(
                [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ].map(
                    function(
                        power
                        )
                    {
                        return Math.floor(Math.PI * Math.pow(10, power));
                    })
            );
                        
        var maximumDigits = 6;

        var patterns = [];

        for(var minimumDigits = 1;minimumDigits <= maximumDigits;++minimumDigits)
        {
            patterns.push(new numberFormatSubpattern(minimumDigits, 0, 0).toString());

            [1, 2, 3].forEach(
                function(
                    primaryGroupingSize
                    )
                {
                    patterns.push(new numberFormatSubpattern(minimumDigits, 0, 0, primaryGroupingSize).toString());
                    [1, 2, 3].forEach(
                        function(
                            secondaryGroupingSize
                            )
                        {
                            patterns.push(new numberFormatSubpattern(minimumDigits, 0, 0, primaryGroupingSize, secondaryGroupingSize).toString());
                        });
                });
        }

        testNumbers.forEach(
            function(
                testNumber
            )
        {
            patterns.forEach(
                function(
                    pattern
                    )
                {
                    assert.strictEquals("parseNumber('" + pattern + "', '" + formatNumber(pattern, testNumber) + "')", testNumber);
                });
        });

        assert.strictEquals("parseNumber('0.##', '" + transform('12') + "')", 12);
        assert.strictEquals("parseNumber('0.##', '" + transform('12.3') + "')", 12.3);
        assert.strictEquals("parseNumber('0.0#', '" + transform('12.3') + "')", 12.3);
        assert.strictEquals("isNaN(parseNumber('0.00', '" + transform('12.3') + "'))", true);
        assert.strictEquals("parseNumber('0.##', '" + transform('12.34') + "')", 12.34);
        assert.strictEquals("parseNumber('0.0#', '" + transform('12.34') + "')", 12.34);
        assert.strictEquals("parseNumber('0.00','" + transform('12.34') + "')", 12.34);
        assert.strictEquals("isNaN(parseNumber('0.00', '" + transform('12.345') + "'))", true);
        assert.strictEquals("parseNumber('0.00#', '" + transform('12.345') + "')", 12.345);
    });