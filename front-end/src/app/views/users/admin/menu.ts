import { NbMenuItem } from '@nebular/theme';

export const ADMINISTRATOR_MENU_ITEMS: NbMenuItem[] = [
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
        title: 'Rutas',
        icon: 'car-outline',
        children:[
            {
                title: 'Crear',
                link: '/views/users/admin/routes/create-route'
            },
            {
                title: 'Listado de Rutas',
                link: '/views/users/admin/route-list/'
            }
        ],
    },
    {
        title: 'Tarifas',
        icon: 'trending-up-outline',
        children:[
            {
                title: 'Tarifas Globales',
                link: '/views/users/admin/rates'
            }
        ]
    },
    {
        title: 'Usuarios',
        icon: 'person-outline',
        children:[
            {
                title: 'Lista de Usuarios',
                link: '/views/users/admin/list-users'
            },
            {
              title: 'Registo de usuarios',
              link: '/views/users/admin/register'
            },
            {
              title: 'Activar usuarios',
              link: '/views/users/admin/activate-users'
            },
            // Aca se agregan los links a cada una de las acciones de este apartado
        ]
    }
];
