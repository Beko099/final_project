import React, { useState } from 'react';
import './profile.css'
import ProfileLogo from '../../assets/ProfileLogo'

const Profile = () => {

    const [nickname, setNickname] = useState('nickname')
    const [password, setPassword] = useState('')

    return (
        <div className='profile'>
            <div className="block-profile">
                <ProfileLogo />
                <div className="nickname-container">
                    <h1>nickname</h1>
                    <input type="text" placeholder='nick' className='nickname' onChange={e => setNickname(e.target.value)} value={nickname} />
                    <input type="password" placeholder='password' className='nickname' onChange={e => setPassword(e.target.value)} value={password} />
                    <button>сохранить</button>
                </div>

            </div>
        </div>
    );
};

export default Profile;