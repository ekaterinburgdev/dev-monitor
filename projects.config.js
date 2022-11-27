/** @type {import("./types/projects-config").Config} */
const projectsConfig = {
    organization: 'ekaterinburgdev',
    projects: [
        {
            title: 'ekaterinburg.design',
            url: 'https://ekaterinburg.design/',
            icon: 'logo-site.svg',
            git: 'ekaterinburg.design',
            vercel: 'edesign',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-ekaterinburg.design-Site?node-id=545%3A2' },
                { name: 'CMS', url: 'https://www.notion.so/ekaterinburg/97690fa6b5ce4e0690bf1a61056c0c69' }
            ]
        },
        {
            title: 'ekaterinburg.dev',
            url: 'https://ekaterinburg.dev/',
            icon: 'logo-site.svg',
            git: 'ekaterinburg.dev',
            vercel: 'ekaterinburg-dev',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-ekaterinburg.design-Site?node-id=545%3A2' },
                { name: 'CMS', url: 'https://www.notion.so/ekaterinburg/97690fa6b5ce4e0690bf1a61056c0c69' }
            ]
        },
        {
            title: 'Design Map',
            url: 'https://map.ekaterinburg.design/',
            icon: 'logo-site.svg',
            git: 'design-map',
            vercel: 'emap-ekbdev',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-ekaterinburg.design-Site?node-id=545%3A2' },
                { name: 'CMS', url: 'https://www.notion.so/ekaterinburg/97690fa6b5ce4e0690bf1a61056c0c69' }
            ]
        },
        {
            title: 'Design Guides',
            url: 'https://guides.ekaterinburg.design/',
            icon: 'logo-guides.svg',
            git: 'guides',
            vercel: 'eguides',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-ekaterinburg.design-Site?node-id=2301%3A142' },
                { name: 'API', url: 'https://1862987759-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F5kt6e2DWH50tt51DoJIw%2Fuploads%2FQmH1TLD6G9HucQm0hY9H%2FDesignCode--guides.postman_collection.json?alt=media&token=23c55609-491c-4808-82aa-4517b8538c0b' }
            ]
        },
        {
            title: 'Street Name Plates',
            url: 'https://eplates.vercel.app/',
            icon: 'logo-site.svg',
            git: 'street-name-plates',
            vercel: 'eplates',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/Cqf3JxFmbWxLgzH0TI7PUG/%D0%90%D0%B4%D1%80%D0%B5%D1%81%D0%BD%D1%8B%D0%B5-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%87%D0%BA%D0%B8' },
                { name: 'API', url: 'https://atkishkin.gitbook.io/api-adresnye-tablichki/informaciya-po-tablichke' },
                { name: 'Streets DB', url: 'https://github.com/ekaterinburgdev/street-name-plates/blob/main/data/streets-lower.json' },
                { name: 'History buildings DB', url: 'https://github.com/ekaterinburgdev/street-name-plates/blob/main/data/hist-streets.json' },
                { name: 'Specification', url: 'https://miro.com/app/board/o9J_llO1eIc=/' },
                { name: 'MVP', url: 'https://ekaterinburg.design/street-plates-generator' }
            ]
        },
        {
            title: 'Transport Ecosystem',
            url: 'https://transport.ekaterinburg.io/',
            icon: 'logo-transport.svg',
            git: 'transport',
            vercel: 'ekbdev-transport',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-Ekaterinburg.design?node-id=3044%3A731&t=cc1nK5kKf3zfAcmO-1' },
            ]
        },
        {
            title: 'Multi Map',
            url: 'https://map.ekaterinburg.dev/',
            icon: 'logo-map.svg',
            git: 'map',
            vercel: 'ekbdev-map',
            links: [
                { name: 'Figma', url: 'https://www.figma.com/file/VpUQ8aZanmAIbwlSt5UTKH/%F0%9F%9A%B2-Ekaterinburg.design?node-id=3460%3A2199&t=cc1nK5kKf3zfAcmO-1' },
                { name: 'CMS', url: 'http://51.178.191.76:1337/' },
                { name: 'API', url: 'http://51.178.191.76:1337/documentation/v1.0.0' },
                { name: 'Leaflet docs', url: 'https://map-docs.vercel.app/' }
            ]
        },
    ]
};

export default projectsConfig;
