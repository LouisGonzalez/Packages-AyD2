import { NbMenuItem } from '@nebular/theme';

export const RECEPTIONIST_MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Clientes',
        icon: 'person-outline',
        children:[
            {
                title: 'Listado de Clientes',
                link: '/views/users/recep/client-list'
            }
        ]
    },
    
    {
        title: 'Paquetes',
        icon: 'cube-outline',
        children:[
            {
                title: 'Ingresar Paquete',
                link: '/views/users/recep/enter-package'
            }
        ] 
    }
];