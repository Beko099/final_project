import { Link, useMatch } from 'react-router-dom'

import React from 'react';

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch(to)

    return (
        <div>
            <Link to={to}
            style={{
                color: match ? 'var(--color-active)' : 'green'
            }}
             {...props}>
                {children}
            </Link>
        </div>
    );
};

export default CustomLink;