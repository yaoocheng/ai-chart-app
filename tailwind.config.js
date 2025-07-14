/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            textColor: {
                primary: '#6C87FF',
                '3c': '#3c3c3c',
                52: '#525252',
                85: '#858585',
                c7: '#C7C7C7',
                ff: '#fff',
                err: '#FF6759',
            },
            backgroundColor: {
                primary: '#6C87FF',
                ff: '#fff',
                f5: '#F5F5F5',
                f7: '#F7F8FB',
                f8: '#F8F8F8',
                eb: '#EBEBEB',
            },
            height: {
                content: 'calc(100% - 56px)',
            },
            lineHeight: {
                22: '22px',
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
