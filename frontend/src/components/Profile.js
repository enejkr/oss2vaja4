import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate} from 'react-router-dom';

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [file, setFile] = useState('');

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image', file);
        const res = await fetch('http://localhost:3001/profile', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        setUploaded(true);
    }

    return (
        <div>
            <>
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                <h1>User profile</h1>
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>

            </>
            <form className="form-group" onSubmit={onSubmit}>
                <label>Izberi sliko</label>
                <input type="file" id="file" onChange={(e) => {
                    setFile(e.target.files[0])
                }}/>
                <input className="btn btn-primary" type="submit" name="submit" value="Naloži"/>
            </form>
        </div>
    );
}

export default Profile;