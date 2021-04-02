import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { dataContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const {users,local} = useContext(dataContext);
    const user = users[0];
    const [Locate, setLocate] = local;
    const location = useLocation();
    setLocate(location.pathname)
    return (
        <Route
            {...rest}
            render={() =>
                user.isSignedIn ? (
                    children
                ) : (
                    <Redirect
                            to={'/login'}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;