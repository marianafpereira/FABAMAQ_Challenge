import {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {fetchUsers} from '../services/UserService';

export const HomePageContext = createContext(null);

export const HomeProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await fetchUsers();
            setUsers(res);
        };

        fetchAllUsers();
    }, []);

    const getUserById = (userId) => {
        const user = users.find(u => u.userId === parseInt(userId, 10));
        setCurrentUser(user);
        return user;
    };

    return (
        <HomePageContext.Provider value={{users, currentUser, getUserById}}>
            {children}
        </HomePageContext.Provider>
    );
}

export function useHome() {
    return useContext(HomePageContext);
}

HomeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};