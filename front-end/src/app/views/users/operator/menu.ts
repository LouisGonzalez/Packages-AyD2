import { NbMenuItem } from '@nebular/theme';

export const OPERATOR_MENU_ITEMS: NbMenuItem[] = [    
    {
        title: 'Puntos de Control',
        icon: 'home-outline',
        children:[
            {
                title: 'Listado de Puntos de Control',
                link: '/views/users/operator'
            }
        ], 
    }
];