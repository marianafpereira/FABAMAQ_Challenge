import {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {fetchUsers} from '../services/UserService';

export const HomeContext = createContext(null);

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
        <HomeContext.Provider value={{users, currentUser, getUserById}}>
            {children}
        </HomeContext.Provider>
    );
}

export function useHome() {
    return useContext(HomeContext);
}

HomeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};