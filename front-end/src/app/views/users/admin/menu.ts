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
        title: 'Reportes',
        icon: 'clipboard-outline',
        children:[
            {
                title: 'Paquetes en rutas',
                link: '/views/reports/report-1/'
            },
            {
                title: 'Rutas populares',
                link: '/views/reports/report-4/'
            },
            {
                title: 'Ganancias por ruta',
                link: '/views/reports/report-2/'
            },
            {
                title: 'Ganancias por cliente',
                link: '/views/reports/report-3/'
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
                title: 'Listado General',
                link: '/views/users/admin/list-users'
            },
            {
                title: 'Edicion',
                link: '/views/users/admin/list-edit-users'
            },
            {
              title: 'Registo',
              link: '/views/users/admin/register'
            },
            {
              title: 'Activacion',
              link: '/views/users/admin/activate-users'
            },
            // Aca se agregan los links a cada una de las acciones de este apartado
        ]
    }
];
