# PSITS XI CMS
CMS Backend (RESTFul Web API)

## Why Stateless (RESTFul API)?
Simply because stateless doesn't use any HTTP cookies. It does not send or interpret the cookies thus it aims highest compatibility on most devices.

## How does it remember the user information?
For RESTFul API service endpoints which requires authentication and authorization (role/capability based access), Javascript Web Token (also known as JWT) will be used.
JWT will be issued by the "auth" service endpoint, the JWT will then be used to protected service endpoints.
