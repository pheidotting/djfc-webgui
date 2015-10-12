define([ "commons/3rdparty/log"],
    function(log) {

        return {
            redirect: function(waarnaartoe, var1, var2, var3, var4, var5) {
                var vars = [{naam: 'LIJST_RELATIES',    url: '#lijstRelaties'},
                            {naam: 'INLOGGEN',          url: '#inloggen'},
                            {naam: 'BEHEREN_RELATIE',   url: '#beherenRelatie'},
                            {naam: 'DASHBOARD',         url: '#dashboard'},
                            {naam: 'TAAK',              url: '#taak'},
                            {naam: 'TAKEN',             url: '#takEN'}
                            ];

                var url = '';

                for (var i = 0; i < vars.length; i++) {
                    if(waarnaartoe === vars[i].naam) {
                        url = vars[i].url;
                        break;
                    }
                }
                log.debug(url);

                if(var1 != undefined){
                    log.debug(var1);
                    url = url + "/" + var1;
                }
                if(var2 != undefined){
                    log.debug(var2);
                    url = url + "/" + var2;
                }
                if(var3 != undefined){
                    log.debug(var3);
                    url = url + "/" + var3;
                }
                if(var4 != undefined){
                    log.debug(var4);
                    url = url + "/" + var4;
                }
                if(var5 != undefined){
                    log.debug(var5);
                    url = url + "/" + var5;
                }

                log.debug(url);
                document.location.hash=url;
            }
        }
    }
);