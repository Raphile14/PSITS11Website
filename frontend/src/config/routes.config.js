/**
 * routes.config.js
 * @author jmquijano
 */

// ReactJS Imports
import React from "react";

// Components Imports
import Home from '../components/home';

/**
 * RouteConfigProvider 
 * @title (string) - This will be attached to <title>@title</title> using React Helmet
 * @pathname (string) - Must start with backslash. This is the route path.
 * @exact (boolean) - Exact props of routes.
 * @component (component) - Component must be imported before declaring it into the array.
 */
const RouteConfigProvider = [
    {
        title: 'Home',
        pathname: '/',
        exact: true,
        component: Home
    }
]

// Exports
export { RouteConfigProvider };