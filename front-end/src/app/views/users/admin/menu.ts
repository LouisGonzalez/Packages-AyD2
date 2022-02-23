import { NbMenuItem } from '@nebular/theme';

export const ADMINISTRATOR_MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Rutas',
        icon: 'car-outline',
        children:[
            {
                title: 'Registrar',
                link: '/views/users/admin/routes/add-route'
            },
            {
                title: 'Listado de Rutas',
                link: '/views/users/admin'
            }
        ] 
    }
];