module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
          fontFamily: {
            sans: ['Roboto', 'sans-serif'], // https://github.com/MystPi/ninetails/blob/main/tailwind.config.js
          }
        },
        typography: {
            default: {
                css: {
                    code: {
                        color: 'none',
                        backgroundColor: 'none',
                    },
                    pre: {
                        color: 'none',
                        backgroundColor: 'none',
                        paddingTop: 'auto',
                        paddingLeft: 'auto',
                        paddingBottom: 'auto',
                        paddingRight: 'auto',
                    },
                    'pre code': {
                        padding: 'auto',
                        backgroundColor: 'auto',
                        borderWidth: 'auto',
                        borderRadius: 'auto',
                        color: 'auto',
                        lineHeight: 'auto',
                    },
                },
            },
        },
    },
    variants: {},
    // eslint-disable-next-line global-require
    plugins: [require('@tailwindcss/typography')],
};
