var assert =
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

        testData.forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.maximumFractionDigits", data[1].maximumFractionDigits);
            });

        testData.map(
            function(
                data
                )
            {
                return ['A' + data[0], data[1]];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.prefix"               , "'A'"                        );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.maximumFractionDigits", data[1].maximumFractionDigits);
            });

        testData.map(
            function(
                data
                )
            {
                return [data[0] + 'A', data[1]];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.suffix"               , "'A'"                        );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').positive.maximumFractionDigits", data[1].maximumFractionDigits);
            });


        testData.map(
            function(
                data
                )
            {
                return ['0;' + data[0], data[1]];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.maximumFractionDigits", data[1].maximumFractionDigits);
            });

        testData.map(
            function(
                data
                )
            {
                return ['0;A' + data[0], data[1]];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.prefix"               , "'A'"                        );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.maximumFractionDigits", data[1].maximumFractionDigits);
            });

        testData.map(
            function(
                data
                )
            {
                return ['0;' + data[0] + 'A', data[1]];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.suffix"               , "'A'"                        );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumIntegerDigits" , data[1].minimumIntegerDigits );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.primaryGroupingSize"  , data[1].primaryGroupingSize  );
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.secondaryGroupingSize", data[1].secondaryGroupingSize);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.minimumFractionDigits", data[1].minimumFractionDigits);
                assert.strictEquals("parseNumberFormatPattern('" + data[0] + "').negative.maximumFractionDigits", data[1].maximumFractionDigits);
            });

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
                        assert.strictEquals("parseNumberFormatPattern('A" + data[0] + "').toString()", "'A" + data[0] + "'");
                    });

                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('" + data[0] + "A').toString()", "'" + data[0] + "A'");
                    });

                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('0;" + data[0] + "').toString()", "'0;" + data[0] + "'");
                    });

                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('0;A" + data[0] + "').toString()", "'0;A" + data[0] + "'");
                    });

                testData.forEach(
                    function(
                        data
                        )
                    {
                        assert.strictEquals("parseNumberFormatPattern('0;" + data[0] + "A').toString()", "'0;" + data[0] + "A'");
                    });
            });
    });

describe(
    'formatNumber',
    function()
    {
        assert.strictEquals("typeof formatNumber", "'function'");

        var testData =
        [
            [       '0'      ,             0    ,                 '0'      ],
            [       '0'      ,             1    ,                 '1'      ],
            [      '00'      ,             1    ,                '01'      ],
            [     '000'      ,             1    ,               '001'      ],
            [    '0000'      ,             1    ,              '0001'      ],
            [   '00000'      ,             1    ,             '00001'      ],
            [       '0'      ,             1    ,                 '1'      ],
            [       '0.0'    ,             1    ,                 '1.0'    ],
            [       '0.00'   ,             1    ,                 '1.00'   ],
            [       '0.000'  ,             1    ,                 '1.000'  ],
            [       '0.0000' ,             1    ,                 '1.0000' ],
            [       '0.00000',             1    ,                 '1.00000'],
            [       '0.###'  ,             0    ,                 '0'      ],
            [       '0.###'  ,             0.0  ,                 '0'      ],
            [       '0.###'  ,             0.1  ,                 '0.1'    ],
            [       '0.###'  ,             0.10 ,                 '0.1'    ],
            [       '0.###'  ,             0.12 ,                 '0.12'   ],
            [       '0.###'  ,             0.120,                 '0.12'   ],
            [       '0.###'  ,             0.123,                 '0.123'  ],
            [       '0.0##'  ,             0    ,                 '0.0'    ],
            [       '0.0##'  ,             0.0  ,                 '0.0'    ],
            [       '0.0##'  ,             0.1  ,                 '0.1'    ],
            [       '0.0##'  ,             0.10 ,                 '0.1'    ],
            [       '0.0##'  ,             0.12 ,                 '0.12'   ],
            [       '0.0##'  ,             0.120,                 '0.12'   ],
            [       '0.0##'  ,             0.123,                 '0.123'  ],
            [     '#,0'      ,          1000    ,           '1,0,0,0'      ],
            [    '#,#0'      ,          1000    ,             '10,00'      ],
            [   '#,##0'      ,          1000    ,             '1,000'      ],
            [     '0,0'      ,          1000    ,           '1,0,0,0'      ],
            [    '0,00'      ,          1000    ,             '10,00'      ],
            [   '0,000'      ,          1000    ,             '1,000'      ],
            [   '000,0'      ,             1    ,           '0,0,0,1'      ],
            [   '00,00'      ,             1    ,             '00,01'      ],
            [   '0,000'      ,             1    ,             '0,001'      ],
            [  '#,##,0'      ,        100000    ,         '1,00,00,0'      ],
            [ '#,###,0'      ,        100000    ,          '10,000,0'      ],
            [  '#,#,#0'      ,        100000    ,        '1,0,0,0,00'      ],
            [  '0,00,0'      ,        100000    ,         '1,00,00,0'      ],
            [ '0,000,0'      ,        100000    ,          '10,000,0'      ],
            [  '0,0,00'      ,        100000    ,        '1,0,0,0,00'      ],
            ['000,00,0'      ,             1    ,         '0,00,00,1'      ],
            ['00,000,0'      ,             1    ,          '00,000,1'      ],
            ['000,0,00'      ,             1    ,        '0,0,0,0,01'      ],
            ['#,##0.00'      , 9999999999999.99 , '9,999,999,999,999.99'   ]

        ];

        assert.strictEquals("formatNumber(parseNumberFormatPattern('#,##0'), 1234)", "'1,234'"); 

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

        testData.map(
            function(
                data
                )
            {
                return [
                    'A' + data[0],
                    data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'A" + data[2] + "'");
            });

        testData.map(
            function(
                data
                )
            {
                return [
                    data[0] + 'A',
                    data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'" + data[2] + "A'");
            });

        testData.filter(
            function(
                data
                )
            {
                return data[1] > 0;
            }).map(
            function(
                data
                )
            {
                return [
                    data[0],
                    -data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'-" + data[2] + "'");
            });

        testData.filter(
            function(
                data
                )
            {
                return data[1] > 0;
            }).map(
            function(
                data
                )
            {
                return [
                    data[0] + ';A0',
                    -data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'A" + data[2] + "'");
            });

        testData.filter(
            function(
                data
                )
            {
                return data[1] > 0;
            }).map(
            function(
                data
                )
            {
                return [
                    data[0] + ';0A',
                    -data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'" + data[2] + "A'");
            });

        testData.filter(
            function(
                data
                )
            {
                return data[1] > 0;
            }).map(
            function(
                data
                )
            {
                return [
                    data[0] + ';-0',
                    -data[1],
                    transform(data[2])
                ];
            }).forEach(
            function(
                data
                )
            {
                assert.strictEquals("formatNumber('" + data[0] + "', " + data[1] + ")", "'-" + data[2] + "'");
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

        assert.strictEquals("parseNumber(parseNumberFormatPattern('#,##0'), '1,234')", 1234);

        var testNumbers =
            [
                0
            ].concat(
                [
                    1,
                    11,
                    111,
                    1111,
                    11111,
                    111111,
                    1111111,
                    11111111,
                    111111111,
                    1111111111
                ].map(
                    function(
                        number
                        )
                    {
                        return [1, -2, 3, -4, 5, -6, 7, -8, 9].map(
                            function(
                                multiplier
                                )
                            {
                                return number * multiplier;
                            });
                    }).reduce(
                        function(
                            lhs,
                            rhs
                            )
                        {
                            return lhs.concat(rhs);
                        }));

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