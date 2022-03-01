import { NbMenuItem } from '@nebular/theme';

export const ADMINISTRATOR_MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Rutas',
        icon: 'car-outline',
        children:[
            {
                title: 'Crear',
                link: '/views/users/admin/routes/create-route'
            },
            {
                title: 'Listado de Rutas',
                link: '/views/users/admin'
            }
        ], 
    },
    {
        title: 'Puntos de Control',
        icon: 'home-outline',
        children:[
            {
                title: 'Crear',
                link: '/views/users/admin/create-checkpoint'
            },
            {
                title: 'Listado de Puntos de Control',
                link: '/views/users/admin/checkpoints'
            }
        ], 
    },
    {
        title: 'Destinos',
        icon: 'map-outline',
        children:[
            {
                title: 'Crear',
                link: '/views/users/admin/create-destination'
            },
            {
                title: 'Listado de Destinos',
                link: '/views/users/admin/destinations'
            }
        ], 
    }
];