var data = {
    name: 'root',
    children: {
        name: 'server',
        children: {
            name: 'ComponentContainer',
            children: {
                name: 'My Component',
                children:
                {
                    eventsFilter: {
                        name: 'Events Filter',
                        value: 0,
                    },
                    eventsPublished: {
                        name: 'Events published',
                        value: 0,
                    },
                }
            }
        }
    }
}

module.exports = data;