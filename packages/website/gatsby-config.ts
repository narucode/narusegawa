export = {
    pathPrefix: '/narusegawa',
    plugins: [
        { resolve: 'gatsby-plugin-typescript' },
        { resolve: 'gatsby-plugin-linaria' },
        {
            resolve: 'gatsby-plugin-layout',
            options: {
                component: require.resolve('./src/components/Layout.tsx'),
            },
        },
    ],
};
