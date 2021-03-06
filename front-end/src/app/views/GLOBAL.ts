export var GLOBAL = {
    url: 'https://api-dummie.herokuapp.com',
    //urlApi: 'http://localhost:8080/api/v1',
    urlApi: 'https://interpackage-gt-backend.herokuapp.com/api/v1',



    /**
     *
     *  URL's mircroservicios desplegados localmente
     */

/*    urlMicroserviceAdministration:  'http://localhost:8080/api/administration/v1',
    urlMicroserviceAuthentication:  'http://localhost:8081/api/authentication/v1',
    urlMicroserviceOperator:        "http://localhost:8082/api/operator/v1",
    urlMicroserviceRecepcionist:    'http://localhost:8083/api/recepcionist/v1',
    urlMicroserviceReports:         'http://localhost:8084/api/reports/v1',
  */
    /**
     * URL's microservicios desplegados en heroku
     */

    urlMicroserviceAdministration:  'https://interpackage-admin.herokuapp.com/api/administration/v1',
    urlMicroserviceAuthentication:  'https://interpackage-auth.herokuapp.com/api/authentication/v1',
    urlMicroserviceOperator:        'https://interpackage-operator.herokuapp.com/api/operator/v1',
    urlMicroserviceRecepcionist:    'https://interpackage-recep.herokuapp.com/api/recepcionist/v1',
    urlMicroserviceReports:         'https://interpackage-reports.herokuapp.com/api/reports/v1',

    querysUrl: 'https://api-dummie.herokuapp.com/',
    ERROR_REQUIRED: 'Este campo es requerido.',
    ERROR_MIN: 'El valor mínimo debe ser 0.',
    ERROR_NUMBER: 'Sólo números.',
    ADMIN_HOME: "/views/users/admin"
}
