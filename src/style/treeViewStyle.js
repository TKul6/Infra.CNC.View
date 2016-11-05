/**
 * Created by Tomer on 17/10/2016.
 */
'use strict';

export default {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#ffffff',
            margin: 0,
            padding: 0,
            color: '#424040'
                },
        node: {
            base: {
                position: 'relative',
                backgroundColor: '#ffffff',
                fontSize: '16px'

            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#E3F2FD',
                 'border-radius': '100px',
                display: 'inline-block'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'none',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px',
                    color: '#000000'

                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#ffffff',
                    strokeWidth: 0,
                    fontSize : '5px'
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                   /* color: '#9DA5AB'*/
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
