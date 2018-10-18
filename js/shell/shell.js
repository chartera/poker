var pathname = window.location.pathname;
var name = pathname.replace(/^.*[\\\/]/, '');

var full = window.location.host;
var parts = full.split('.');
var subdomain = parts[0];
console.log("Subdomain ", subdomain);

var network = (function(){

    var bus = "not there";
    var url = "http://delta.workingcopy.de/graphiql";
    var session = null;
    var graphql_payload = {
	headers: {
	    authorization: (function(){
		var session_str = localStorage.getItem("session");
		if(session_str){
		    session = JSON.parse(session_str)
		    console.log("Session there", session.token);
		    return "Bearer " + session.token;
		}else{
		    return "";
		}
	    }())
	}
    };
    var _grapqhql = graphql(url, graphql_payload);



    var setBus = function(vbus){
	bus = vbus;
	session ? setTimeout(function(){bus.$emit('session-set')},1) :
	    setTimeout(function(){bus.$emit('session-no')},1);
    };

    var getBus = function(){
	return bus;
    };

    var getGraphql = function(){
	return _grapqhql;
    };

    var setGraphqlPayload = function(token) {
	graphql_payload.headers.authorization = `Bearer ${token}`;
    };
    
    var setSession = function(payload){
	setGraphqlPayload(payload.login.token);
	_grapqhql = null;
	_grapqhql =  graphql(url, graphql_payload);
	localStorage.setItem('session', JSON.stringify({
	    token: payload.login.token
	}));
	bus.$emit('session-set');
    };

    var deleteSession = function(){
	localStorage.removeItem("session");
	location.reload();
    };
    

    return {
	setSession: setSession,
	deleteSession: deleteSession,
	getGraphql: getGraphql,
	setBus: setBus,
	getBus: getBus,
	JSON: JSON
    }
    
}());

export {network}
