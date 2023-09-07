module.exports = {
    content: [ "./src/**/*.{js,jsx,ts,tsx}", ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "purple-primary": '#BF40BF',
                    "primary": "#62f751",
                    "secondary": "#87d13e",
                    "accent": "#9abfe2",
                    "neutral": "#1c1f26",
                    "base-100": "#2d2f58",
                    "info": "#538de9",
                    "success": "#239a6e",
                    "warning": "#a68b03",
                    "error": "#f91024",
                },
            },
        ],
    },
    plugins: [
        require('daisyui'),
        require('tailwindcss')
        ],
    }
