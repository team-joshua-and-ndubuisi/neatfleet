import {FunctionComponent, PropsWithChildren} from 'react';

const ProfileContainer: FunctionComponent<PropsWithChildren> =({children})=> {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-30 pb-50">
            {children}
        </div>
    )
}

export default ProfileContainer