var data =
    {
        name :'root',
        toggled: false,
        children : [
            {
                name: 'child1',
                children : [
                    {
                        name : 'child11'
                    },
                    {
                        name : 'child12'
                    }
                 ]
            },
            {
                name : 'child2'
            },
            {
                name : 'Tomer',
                children : [
                    {name: 'Khalili'},
                    {name : 'Is Free'}

                ]
            }
        ]

    };

module.exports = data;